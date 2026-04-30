#!/usr/bin/env python3
"""
update_prices.py — 廖家投資看板每日自動更新
用法: python3 update_prices.py
建議在台股收盤後執行 (13:30 CST 之後)
"""

import yfinance as yf
import json
import re
import sys
import os
import subprocess
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path

BASE_DIR   = Path(__file__).parent
HTML_PATH  = BASE_DIR / "index.html"
DATA_PATH  = BASE_DIR / "data.json"
HIST_PATH  = BASE_DIR / "history.json"
LOGS_DIR   = BASE_DIR / "logs"
TAIPEI_TZ  = timezone(timedelta(hours=8))

STOCK_TICKERS = [
    "0050.TW", "00878.TW", "00881.TW", "00646.TW",
    "1301.TW", "2034.TW", "2308.TW", "2317.TW", "2330.TW",
    "2382.TW", "2618.TW", "2880.TW", "2881.TW", "2882.TW",
    "2884.TW", "2885.TW", "2886.TW", "2887.TW",
    "3008.TW", "3045.TW", "3703.TW", "5880.TW"
]

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

PORTFOLIOS = {
    "👨 爸爸": [
        {"code":"0050.TW","shares":12150},{"code":"00878.TW","shares":9000},
        {"code":"00881.TW","shares":11000},{"code":"2308.TW","shares":749},
        {"code":"2317.TW","shares":16000},{"code":"2330.TW","shares":2020},
        {"code":"2382.TW","shares":500},  {"code":"2618.TW","shares":4000},
        {"code":"2034.TW","shares":55},   {"code":"2880.TW","shares":2163},
        {"code":"2881.TW","shares":3796}, {"code":"2882.TW","shares":4526},
        {"code":"2884.TW","shares":7369}, {"code":"2885.TW","shares":2060},
        {"code":"2886.TW","shares":4374}, {"code":"2887.TW","shares":235},
        {"code":"3008.TW","shares":310},  {"code":"5880.TW","shares":4702},
    ],
    "👩 太太": [
        {"code":"0050.TW","shares":6400}, {"code":"00646.TW","shares":1000},
        {"code":"00878.TW","shares":6000},{"code":"2317.TW","shares":2300},
        {"code":"2330.TW","shares":160},  {"code":"2882.TW","shares":200},
        {"code":"3045.TW","shares":1000},
    ],
    "👦 兒子 (大)": [
        {"code":"0050.TW","shares":5300}, {"code":"00646.TW","shares":2000},
        {"code":"2308.TW","shares":1000}, {"code":"2317.TW","shares":4253},
        {"code":"2330.TW","shares":520},  {"code":"2618.TW","shares":1000},
        {"code":"2884.TW","shares":1659}, {"code":"2886.TW","shares":2172},
        {"code":"3703.TW","shares":1000},
    ],
    "👦 兒子 (小)": [
        {"code":"0050.TW","shares":5700}, {"code":"00646.TW","shares":1000},
        {"code":"1301.TW","shares":600},  {"code":"2317.TW","shares":1000},
        {"code":"2330.TW","shares":1410}, {"code":"2618.TW","shares":1000},
        {"code":"2882.TW","shares":1118},
    ],
}


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
    """Send macOS notification."""
    subprocess.run(
        ["osascript", "-e", f'display notification "{msg}" with title "{title}"'],
        capture_output=True,
    )


# ── Fetch prices + fundamentals ────────────────────────────
def fetch_prices(tickers: list[str], log: logging.Logger) -> dict:
    """用 yf.download 一次抓取所有股票的價格與 52 週區間"""
    log.info(f"📡 下載 {len(tickers)} 檔股票歷史資料 (1 年)...")
    try:
        df = yf.download(" ".join(tickers), period="1y", interval="1d",
                         auto_adjust=True, progress=False)
        close = df["Close"]
    except KeyError:
        log.error("⚠ 無法取得 Close 資料")
        return {}
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

            prices[code] = {
                "price":      round(float(series.iloc[-1]), 2),
                "prev_close": round(float(series.iloc[-2]), 2),
                "year_high":  round(float(series.max()), 2),
                "year_low":   round(float(series.min()), 2),
            }
            log.info(f"  ✔ {code:8s}  現價 {prices[code]['price']:>10.2f}  "
                  f"漲跌 {prices[code]['price'] - prices[code]['prev_close']:+.2f}")
        except Exception as e:
            log.warning(f"  ⚠ {code}: {e}")

    return prices


def fetch_fundamentals(tickers: list[str], log: logging.Logger) -> dict:
    """用 yf.Ticker.info 抓取本益比、殖利率"""
    log.info("📡 抓取基本面資料 (trailingPE, dividendYield)...")
    fundamentals = {}
    for ticker in tickers:
        code = ticker.removesuffix(".TW")
        try:
            t = yf.Ticker(ticker)
            info = t.info
            fundamentals[code] = {
                "trailingPE":       info.get("trailingPE") or None,
                "dividendYield":    info.get("dividendYield") or None,
            }
            log.info(f"  ✔ {code}: PE={fundamentals[code]['trailingPE']}, DIV={fundamentals[code]['dividendYield']}")
        except Exception as e:
            log.warning(f"  ⚠ {code} fundamentals: {e}")
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
def calc_totals(prices: dict) -> dict:
    totals: dict = {}
    for member, holdings in PORTFOLIOS.items():
        mv = sum(
            h["shares"] * prices.get(h["code"].removesuffix(".TW"), {}).get("price", 0)
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
    """寫入 history.json（若今日已有則跳過）"""
    if today in history:
        log.info(f"今日 {today} 歷史已存在，跳過")
        return
    history[today] = totals
    HIST_PATH.write_text(json.dumps(history, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info(f"✅ 寫入 history.json: {today}")


# ── HTML updater ───────────────────────────────────────────
def replace_block(content: str, start_marker: str, end_char: str, new_block: str) -> str:
    """找到 start_marker 開頭的區塊並整段替換，end_char 為 '}' 或 ']'"""
    idx = content.find(start_marker)
    if idx == -1:
        return content
    closing = f"\n{end_char};"
    end_idx = content.find(closing, idx)
    if end_idx == -1:
        return content
    return content[:idx] + new_block + content[end_idx + len(closing):]


def update_html(prices: dict, indices: list, today: str, log: logging.Logger):
    content = HTML_PATH.read_text(encoding="utf-8")

    # ── 1. 更新 PRICE_DATA ──────────────────────────────────────
    lines = [
        f'  "{code}":  {{"price":{d["price"]},  '
        f'"year_high":{d["year_high"]},  '
        f'"year_low":{d["year_low"]},   '
        f'"prev_close":{d["prev_close"]}}}'
        for code, d in prices.items()
    ]
    new_price_block = "const PRICE_DATA = {\n" + ",\n".join(lines) + "\n}"
    content = replace_block(content, "const PRICE_DATA = {", "}", new_price_block)

    # ── 2. 更新 MARKET_INDICES ───────────────────────────────────
    if indices:
        idx_lines = [
            f'  {{sym:"{i["sym"]}", ticker:"{i["ticker"]}",  '
            f'price:{i["price"]},  change:{i["change"]},   changePct:{i["changePct"]}}}'
            for i in indices
        ]
        new_idx_block = "const MARKET_INDICES = [\n" + ",\n".join(idx_lines) + "\n]"
        content = replace_block(content, "const MARKET_INDICES = [", "]", new_idx_block)

    # ── 3. 更新時間戳記 ─────────────────────────────────────────
    now_str = datetime.now(TAIPEI_TZ).strftime("%Y-%m-%d %H:%M:%S")
    content = re.sub(
        r'// PRICE DATA — Updated [^\n]*',
        f'// PRICE DATA — Updated {now_str} (auto-updated by update_prices.py)',
        content
    )

    HTML_PATH.write_text(content, encoding="utf-8")
    log.info(f"✅ HTML 更新完成: {today}")


# ── Main ───────────────────────────────────────────────────
def main():
    log = setup_logging()
    today = datetime.now(TAIPEI_TZ).strftime("%Y-%m-%d")
    log.info(f"{'='*50}")
    log.info(f" 廖家投資看板 自動更新 — {today}")
    log.info(f"{'='*50}")

    try:
        prices  = fetch_prices(STOCK_TICKERS, log)
        if not prices:
            log.error("❌ 無法取得股價資料，中止更新")
            notify_mac("股票看板", "❌ 更新失敗：無法取得股價資料")
            sys.exit(1)

        fundamentals = fetch_fundamentals(STOCK_TICKERS, log)
        indices = fetch_indices(INDEX_TICKERS, log)
        totals  = calc_totals(prices)

        # ── 寫入 data.json ──────────────────────────────────────
        data = {
            "updated": datetime.now(TAIPEI_TZ).isoformat(),
            "prices":  prices,
            "fundamentals": fundamentals,
            "indices": indices,
        }
        DATA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        log.info(f"✅ 寫入 data.json")

        # ── 寫入 history.json ───────────────────────────────────
        history = load_history()
        save_history(history, today, totals, log)

        # ── 更新 HTML ───────────────────────────────────────────
        update_html(prices, indices, today, log)

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
