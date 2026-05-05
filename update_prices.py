#!/usr/bin/env python3
"""
update_prices.py — 廖家投資看板每日自動更新
用法: python3 update_prices.py
建議在台股收盤後執行 (13:30 CST 之後)

只更新 data.json + history.json，不再改寫 index.html。
持股清單從 portfolios.json 讀取（修改持股不需碰此 .py）。
"""

import yfinance as yf
import json
import sys
import subprocess
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path

BASE_DIR     = Path(__file__).parent
PORTF_PATH   = BASE_DIR / "portfolios.json"
DATA_PATH    = BASE_DIR / "data.json"
HIST_PATH    = BASE_DIR / "history.json"
DATA_JS_PATH = BASE_DIR / "data.js"
LOGS_DIR     = BASE_DIR / "logs"
TAIPEI_TZ    = timezone(timedelta(hours=8))

INDEX_TICKERS = {
    "加權指數": "^TWII",
    "台積電":   "2330.TW",
    "鴻　海":   "2317.TW",
    "S&P 500":  "^GSPC",
    "NASDAQ":   "^IXIC",
    "道　瓊":   "^DJI",
    "日　經":   "^N225",
    "香　港":   "^HSI",
}


# ── Portfolios loader ──────────────────────────────────────
def load_portfolios(log: logging.Logger) -> dict:
    """從 portfolios.json 讀持股；自動去掉 _ 開頭的 metadata key。"""
    if not PORTF_PATH.exists():
        log.error(f"❌ 找不到持股檔: {PORTF_PATH}")
        sys.exit(1)
    raw = json.loads(PORTF_PATH.read_text(encoding="utf-8"))
    return {k: v for k, v in raw.items() if not k.startswith("_")}


def derive_tickers(portfolios: dict) -> list[str]:
    """從持股清單推導出所有需要抓的 ticker（含 .TW 後綴）。"""
    codes = set()
    for holdings in portfolios.values():
        for h in holdings:
            codes.add(h["code"])
    return sorted(f"{c}.TW" for c in codes)


# ── Logging ────────────────────────────────────────────────
def setup_logging():
    LOGS_DIR.mkdir(exist_ok=True)
    log_file = LOGS_DIR / f"update_{datetime.now(TAIPEI_TZ):%Y%m%d}.log"
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler(log_file, encoding="utf-8"),
            logging.StreamHandler(sys.stdout),
        ],
    )
    return logging.getLogger(__name__)


def notify_mac(title: str, msg: str):
    """macOS 通知；非 Mac 環境（如 GitHub Actions Linux）靜默跳過。"""
    if sys.platform != "darwin":
        return
    try:
        subprocess.run(
            ["osascript", "-e", f'display notification "{msg}" with title "{title}"'],
            capture_output=True,
        )
    except FileNotFoundError:
        pass


# ── Fetch prices + fundamentals ────────────────────────────
def fetch_prices(tickers: list[str], log: logging.Logger) -> dict:
    log.info(f"📡 下載 {len(tickers)} 檔股票歷史資料 (1 年)...")
    try:
        df = yf.download(" ".join(tickers), period="1y", interval="1d",
                         auto_adjust=True, progress=False)
        close = df["Close"]
    except Exception as e:
        log.error(f"批次下載失敗: {e}")
        return {}

    prices = {}
    for ticker in tickers:
        code = ticker.removesuffix(".TW")
        try:
            if ticker in close.columns:
                series = close[ticker].dropna()
            elif code in close.columns:
                series = close[code].dropna()
            else:
                log.warning(f"  ⚠ {code}: 不在下載結果中")
                continue
            if len(series) < 2:
                continue

            price      = round(float(series.iloc[-1]), 2)
            prev_close = round(float(series.iloc[-2]), 2)

            # 資料驗證：拒絕零或單日 ±30% 異常
            if price <= 0 or prev_close <= 0:
                log.warning(f"  ⚠ {code}: 價格異常 (price={price}, prev={prev_close})，跳過")
                continue
            pct_change = abs(price - prev_close) / prev_close * 100
            if pct_change > 30:
                log.warning(f"  ⚠ {code}: 單日變動 {pct_change:.1f}% 過大，可能是錯誤資料，跳過")
                continue

            prices[code] = {
                "price":      price,
                "prev_close": prev_close,
                "year_high":  round(float(series.max()), 2),
                "year_low":   round(float(series.min()), 2),
            }
            log.info(f"  ✔ {code:8s}  現價 {price:>10.2f}  漲跌 {price - prev_close:+.2f}")
        except Exception as e:
            log.warning(f"  ⚠ {code}: {e}")

    return prices


def fetch_fundamentals(tickers: list[str], log: logging.Logger) -> dict:
    log.info("📡 抓取基本面資料 (trailingPE, dividendYield)...")
    fundamentals = {}
    for ticker in tickers:
        code = ticker.removesuffix(".TW")
        try:
            t = yf.Ticker(ticker)
            info = t.info
            fundamentals[code] = {
                "trailingPE":    info.get("trailingPE") or None,
                "dividendYield": info.get("dividendYield") or None,
            }
        except Exception as e:
            log.warning(f"  ⚠ {code} fundamentals: {e}")
    log.info(f"  ✅ {len(fundamentals)} 檔基本面更新完成")
    return fundamentals


# ── Fetch indices ───────────────────────────────────────────
def fetch_indices(index_map: dict, log: logging.Logger) -> list:
    log.info("📡 抓取市場指數...")
    syms = list(index_map.values())
    try:
        df = yf.download(" ".join(syms), period="5d", interval="1d",
                         auto_adjust=True, progress=False)
        close = df["Close"]
    except Exception as e:
        log.warning(f"  ⚠ 指數下載失敗: {e}")
        return []

    results = []
    for name, sym in index_map.items():
        try:
            if sym not in close.columns:
                log.warning(f"  ⚠ {sym}: 不在下載結果中")
                continue
            series = close[sym].dropna()
            if len(series) < 2:
                continue
            p    = round(float(series.iloc[-1]), 2)
            prev = round(float(series.iloc[-2]), 2)
            chg  = round(p - prev, 2)
            pct  = round((chg / prev * 100) if prev else 0, 2)
            results.append({"sym": name, "ticker": sym,
                            "price": p, "change": chg, "changePct": pct})
            log.info(f"  ✔ {sym:10s}  {p:>12,.2f}  {chg:+.2f} ({pct:+.2f}%)")
        except Exception as e:
            log.warning(f"  ⚠ {sym}: {e}")
    return results


# ── Calculate totals ───────────────────────────────────────
def calc_totals(prices: dict, portfolios: dict) -> dict:
    totals: dict = {}
    for member, holdings in portfolios.items():
        mv = sum(
            h["shares"] * prices.get(h["code"], {}).get("price", 0)
            for h in holdings
        )
        totals[member] = round(mv)
    totals["Total"] = sum(totals.values())
    return totals


# ── History helpers ────────────────────────────────────────
def load_history() -> dict:
    if HIST_PATH.exists():
        try:
            return json.loads(HIST_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {}


def save_history(history: dict, today: str, totals: dict, log: logging.Logger):
    if today in history:
        log.info(f"今日 {today} 歷史已存在，跳過")
        return
    history[today] = totals
    HIST_PATH.write_text(json.dumps(history, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info(f"✅ 寫入 history.json: {today}")


def update_data_js(log: logging.Logger):
    """將 data.json + history.json 的最新內容寫入 data.js，供 HTML 直接引入。"""
    if not DATA_PATH.exists():
        log.warning("⚠ data.json 不存在，跳過 data.js 更新")
        return
    try:
        data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    except Exception as e:
        log.warning(f"⚠ 讀取 data.json 失敗: {e}")
        return

    prices       = data.get("prices", {})
    fundamentals = data.get("fundamentals", {})
    indices      = data.get("indices", [])
    updated      = data.get("updated", datetime.now(TAIPEI_TZ).isoformat())

    history = {}
    if HIST_PATH.exists():
        try:
            history = json.loads(HIST_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass

    # 從 price_cache.json（Google Drive 版本）讀取準確的 year_high/low
    # 只在本機（macOS）跑時才會有；GitHub Actions 上跳過
    import os
    cache = {}
    gdrive_dir = os.path.expanduser("~/Library/CloudStorage/GoogleDrive-hsien0529@gmail.com/我的雲端硬碟")
    price_cache_path = Path(gdrive_dir) / "price_cache.json"
    if price_cache_path.exists():
        try:
            cache = json.loads(price_cache_path.read_text(encoding="utf-8"))
        except Exception:
            cache = {}

    lines = []
    lines.append("// ================================================================")
    lines.append(f"// data.js — Auto-generated by update_prices.py ({updated})")
    lines.append("// Contains: PRICE_DATA, FUNDAMENTALS, HISTORY_DATA, MARKET_INDICES, NEWS_DATA")
    lines.append("// ================================================================")
    lines.append("")

    # MARKET_INDICES
    lines.append("const MARKET_INDICES = [")
    for idx in indices:
        sym = idx.get("sym", "")
        ticker = idx.get("ticker", "")
        price = idx.get("price", 0)
        change = idx.get("change", 0)
        pct = idx.get("changePct", 0)
        lines.append(f'  {{sym:"{sym}", ticker:"{ticker}", price:{price}, change:{change}, changePct:{pct}}},')
    lines.append("];")
    lines.append("")

    # PRICE_DATA — 使用 price_cache 的準確值（如果存在）
    lines.append("const PRICE_DATA = {")
    for code in sorted(prices.keys()):
        v = prices[code]
        # 優先用 price_cache 的 year_high/low
        cache_entry = cache.get(f"{code}.TW", {}) if cache else {}
        year_high = cache_entry.get("year_high") or v.get("year_high")
        year_low = cache_entry.get("year_low") or v.get("year_low")
        entry = {
            "price": v.get("price"),
            "year_high": year_high,
            "year_low": year_low,
            "prev_close": v.get("prev_close"),
        }
        lines.append(f'  "{code}":{json.dumps(entry)},')
    lines.append("}")
    lines.append("")

    # FUNDAMENTALS
    lines.append("const FUNDAMENTALS = {")
    for code in sorted(fundamentals.keys()):
        v = fundamentals[code]
        entry = {
            "trailingPE":    v.get("trailingPE"),
            "dividendYield": v.get("dividendYield"),
        }
        lines.append(f'  "{code}":{json.dumps(entry)},')
    lines.append("}")
    lines.append("")

    # HISTORY_DATA
    lines.append("const HISTORY_DATA = {")
    for date in sorted(history.keys()):
        d = history[date]
        total = d.get("Total", 0)
        others = [f'"{k}": {v}' for k, v in d.items() if k != "Total"]
        lines.append(f'  "{date}":{{"Total": {total}, {", ".join(others)}}},')
    lines.append("}")
    lines.append("")

    # NEWS_DATA — 靜態市場快訊（可擴展為動態抓取）
    news_items = [
        ("semi", "半導體", "台積電 ADR 暴漲 6.5%！AI 晶片需求超旺，CoWoS 產能吃緊至 2027 年",
         "美科技股昨夜大漲，台積電 ADR 收盤大漲逾 6%，主要受惠 AI 加速器晶片需求持續爆發。法人上調台積電目標價。",
         "pos", ["2330","2308","2382"]),
        ("ai", "AI 概念", "輝達 GB300 規格曝光！供應鏈全員起動，台灣代工廠喜迎大單",
         "輝達下一代 AI 加速器 GB300 規格提前曝光，散熱、電源、載板需求同步放大。鴻海、廣達等代工廠已開始試產。",
         "pos", ["2317","2382","2308","2330"]),
        ("finance", "金融", "新光金整併題材持續發燒！國泰金、玉山金殖利率吸引力浮現",
         "新光金合併議題持續發酵，國泰金殖利率約 4.5%，玉山金 3.8%，吸引存股族目光。",
         "neu", ["2882","2881","2884","2887"]),
        ("etf", "ETF", "00878 除息倒計時！高股息 ETF 買盤踴躍，00881 同步吸睛",
         "00878 將於下週除息，殖利率估值約 4.5%。00881 科技 ETF 年化殖利率達 9.1%。",
         "pos", ["00878","00881","0050"]),
        ("macro", "總經", "美 CPI 數據低於預期！Fed 降息預期升溫，美股四大指數全面收紅",
         "美國 4 月 CPI 年增 2.3%，低於市場預期的 2.4%，聯準會降息預期升溫。有利台股科技供應鏈估值。",
         "pos", ["2330","2317","2308","00646"]),
        ("tech", "光學", "大立光法說會後股價回穩！潛望式鏡頭滲透率提升，下半年展望佳",
         "大立光法說會透露，潛望式長焦鏡頭滲透率持續提升，8P/9P 高規鏡頭訂單看增。",
         "pos", ["3008"]),
        ("macro", "總經", "台積電法說行情啟動！市場聚焦 CoWoS 擴產進度與資本支出展望",
         "台積電法說會將於本週四登場，市場聚焦：CoWoS 先進封裝擴產速度、2nm 量產時程。",
         "pos", ["2330","2308"]),
        ("macro", "總經", "台股 TAIEX 今日大漲逾 4%！AI 供應鏈全面噴出，成交量估破 5000 億",
         "台股今日在台積電、鴻海、聯發科帶領下全面大漲，AI 供應鏈資金簇擁。",
         "pos", ["2330","2317","2308","2382","3008"]),
    ]
    lines.append("const NEWS_DATA = [")
    now = datetime.now(TAIPEI_TZ)
    times = ["12:00","11:30","10:45","10:00","09:30","09:00","08:30","08:00"]
    for i, (cls, tag, title, summary, sentiment, related) in enumerate(news_items):
        obj = {
            "cls": cls, "tagClass": cls, "tag": tag,
            "time": times[i % len(times)],
            "date": now.strftime("%Y-%m-%d"),
            "title": title, "summary": summary,
            "sentiment": sentiment, "related": related
        }
        lines.append(f"  {json.dumps(obj)},")
    lines.append("];")
    lines.append("")

    content = "\n".join(lines)
    DATA_JS_PATH.write_text(content, encoding="utf-8")
    log.info(f"✅ 更新 data.js ({len(content):,} 字元)")


# ── Main ───────────────────────────────────────────────────
def main():
    log = setup_logging()
    today = datetime.now(TAIPEI_TZ).strftime("%Y-%m-%d")
    log.info(f"{'='*50}")
    log.info(f" 廖家投資看板 自動更新 — {today}")
    log.info(f"{'='*50}")

    try:
        portfolios = load_portfolios(log)
        tickers    = derive_tickers(portfolios)
        log.info(f"📋 持股清單: {len(portfolios)} 位成員，{len(tickers)} 檔個股")

        prices = fetch_prices(tickers, log)
        if not prices:
            log.error("❌ 無法取得股價資料，中止更新")
            notify_mac("股票看板", "❌ 更新失敗：無法取得股價資料")
            sys.exit(1)

        fundamentals = fetch_fundamentals(tickers, log)
        indices      = fetch_indices(INDEX_TICKERS, log)
        totals       = calc_totals(prices, portfolios)

        # ── 寫入 data.json ──
        data = {
            "updated":      datetime.now(TAIPEI_TZ).isoformat(),
            "prices":       prices,
            "fundamentals": fundamentals,
            "indices":      indices,
        }
        DATA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        log.info("✅ 寫入 data.json")

        # ── 寫入 history.json ──
        history = load_history()
        save_history(history, today, totals, log)

        # ── 更新 data.js（HTML 直接引入的資料檔）──
        update_data_js(log)

        log.info(f"\n{'='*50}")
        log.info(f"   總市值: ${totals['Total']:>16,}")
        for m, v in totals.items():
            if m != "Total":
                log.info(f"   {m}: ${v:>12,}")
        log.info(f"{'='*50}")
        log.info("✅ 全部完成")

    except Exception as e:
        log.error(f"❌ 更新過程發生錯誤: {e}")
        notify_mac("股票看板", f"❌ 更新失敗: {e}")
        raise


if __name__ == "__main__":
    main()
