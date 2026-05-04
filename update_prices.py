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
    subprocess.run(
        ["osascript", "-e", f'display notification "{msg}" with title "{title}"'],
        capture_output=True,
    )


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
