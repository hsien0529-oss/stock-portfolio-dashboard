#!/usr/bin/env python3
"""
research.py — 廖家投資看板優化研究腳本
功能：分析現有程式碼、資料、HTML，找出可優化方向並提出建議（不主動修改）
"""

import json
import sys
from pathlib import Path
from datetime import datetime, timezone, timedelta

BASE_DIR = Path(__file__).parent
TAIPEI_TZ = timezone(timedelta(hours=8))


def load_json(path):
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"  ⚠ 無法讀取 {path.name}: {e}")
        return None


def check_data_quality():
    """檢查 data.json 和 history.json 的資料品質"""
    print("\n" + "=" * 60)
    print("【資料品質檢查】")
    print("=" * 60)

    data = load_json(BASE_DIR / "data.json")
    hist = load_json(BASE_DIR / "history.json")

    if not data:
        print("  ❌ data.json 不存在或格式錯誤")
        return

    # 最後更新時間
    updated = data.get("updated", "未知")
    print(f"  最後更新：{updated}")

    prices = data.get("prices", {})
    fundamentals = data.get("fundamentals", {})
    indices = data.get("indices", [])

    print(f"\n  持股報價：{len(prices)} 檔")
    print(f"  基本面資料：{len(fundamentals)} 檔")
    print(f"  市場指數：{len(indices)} 檔")

    # 檢查缺少基本面的股票
    no_fundamental = [code for code in prices if not fundamentals.get(code) or
                      not fundamentals[code].get("trailingPE")]
    if no_fundamental:
        print(f"\n  ⚠ 缺少本益比的股票（{len(no_fundamental)} 檔）：{', '.join(no_fundamental[:10])}")
        if len(no_fundamental) > 10:
            print(f"    ...還有 {len(no_fundamental) - 10} 檔")

    # 檢查 history.json
    if hist:
        dates = sorted(hist.keys())
        if dates:
            print(f"\n  歷史記錄：{len(dates)} 天 ({dates[0]} ~ {dates[-1]})")
            # 檢查是否有中斷
            if len(dates) > 1:
                from datetime import timedelta
                gaps = []
                for i in range(1, min(len(dates), 10)):
                    d1 = datetime.strptime(dates[i-1], "%Y-%m-%d")
                    d2 = datetime.strptime(dates[i], "%Y-%m-%d")
                    if (d2 - d1).days > 3:
                        gaps.append(f"{dates[i-1]} → {dates[i]}")
                if gaps:
                    print(f"  ⚠ 可能中斷：{gaps}")
    else:
        print("  ⚠ history.json 不存在")


def analyze_portfolios():
    """分析持股結構"""
    print("\n" + "=" * 60)
    print("【持股結構分析】")
    print("=" * 60)

    portf_raw = load_json(BASE_DIR / "portfolios.json")
    if not portf_raw:
        print("  ❌ portfolios.json 不存在")
        return

    portf = {k: v for k, v in portf_raw.items() if not k.startswith("_")}
    codes = set()
    for holdings in portf.values():
        for h in holdings:
            codes.add(h["code"])
    tickers = sorted(f"{c}.TW" for c in codes)

    total_stocks = len(tickers)
    members = {k: v for k, v in portf.items() if not k.startswith("_")}

    print(f"  投資成員：{len(members)} 人")
    print(f"  總持股檔數：{total_stocks} 檔")

    # 各成員持股數
    for member, holdings in members.items():
        print(f"    {member}：{len(holdings)} 檔")

    # 持股分散分析
    all_codes = []
    for holdings in members.values():
        all_codes.extend([h["code"] for h in holdings])
    unique_codes = set(all_codes)
    duplicate = [c for c in unique_codes if all_codes.count(c) > 1]
    if duplicate:
        print(f"\n  📊 共同持股：{len(duplicate)} 檔 ({', '.join(duplicate)})")

    # 估算整體市值
    data = load_json(BASE_DIR / "data.json")
    if data:
        prices = data.get("prices", {})
        total_mv = 0
        for member, holdings in members.items():
            mv = sum(h["shares"] * prices.get(h["code"], {}).get("price", 0) for h in holdings)
            total_mv += mv
        print(f"\n  估算總市值：{total_mv:,.0f} TWD")


def analyze_update_script():
    """分析 update_prices.py 潛在問題"""
    print("\n" + "=" * 60)
    print("【update_prices.py 程式分析】")
    print("=" * 60)

    script = BASE_DIR / "update_prices.py"
    content = script.read_text(encoding="utf-8")

    issues = []

    # 問題 1: fetch_fundamentals 逐個抓，很慢
    if "for ticker in tickers:" in content and "fetch_fundamentals" in content:
        issues.append({
            "severity": "⚡效能",
            "title": "fetch_fundamentals 逐檔順序抓取",
            "detail": "目前對每檔股票獨立呼叫 yf.Ticker(x).info，14 檔約需 14+ 秒。",
            "suggestion": "改用 asyncio + aiohttp 並行抓，或至少用 ThreadPoolExecutor"
        })

    # 問題 2: 沒有重試機制
    if "yf.download" in content and "retry" not in content.lower():
        issues.append({
            "severity": "🔴穩定性",
            "title": "yfinance 失敗無重試",
            "detail": "網路瞬斷或 Yahoo API 異常時直接失敗。",
            "suggestion": "加入 retry 3次 / exponential backoff"
        })

    # 問題 3: INDEX_TICKERS 只有 8 個，fetch_indices 也是順序迴圈
    if "for name, sym in index_map.items()" in content:
        issues.append({
            "severity": "⚡效能",
            "title": "指數 fetch 也逐個順序處理",
            "detail": "8 個指數順序下載，可並行。",
            "suggestion": "用 ThreadPoolExecutor 並行抓"
        })

    # 問題 4: history.json 沒有大小限制
    hist = load_json(BASE_DIR / "history.json")
    if hist and len(hist) > 730:  # 超過2年
        issues.append({
            "severity": "📦資料",
            "title": "history.json 無限增長",
            "detail": f"目前 {len(hist)} 筆，每日增加，長久下來檔案過大。",
            "suggestion": "只保留最近 730 天（約2年）或每月壓縮"
        })

    # 問題 5: data.json 沒有備份
    issues.append({
        "severity": "🔴穩定性",
        "title": "data.json 更新時無原子性保證",
        "detail": "寫入時若程式崩潰，可能只剩空白檔。",
        "suggest": "先用 temp file 寫完再 rename"
    })

    # 問題 6: 本益比和殖利率可能為 None/0
    data = load_json(BASE_DIR / "data.json")
    if data:
        fundamentals = data.get("fundamentals", {})
        null_pe = sum(1 for f in fundamentals.values() if not f.get("trailingPE"))
        null_div = sum(1 for f in fundamentals.values() if not f.get("dividendYield"))
        if null_pe > 0:
            issues.append({
                "severity": "📊資料",
                "title": f"{null_pe} 檔股票缺少本益比",
                "detail": "Yahoo 可能沒回傳，或股票未上市/ETF 沒有本益比。",
                "suggestion": "改用市值帳面價值比(PB)或其他估值指標輔助"
            })
        if null_div > len(fundamentals) * 0.5:
            issues.append({
                "severity": "📊資料",
                "title": "超過50%股票缺少殖利率",
                "detail": "可能是 ETF 特性，或 Yahoo 資料未即時更新。",
                "suggestion": "若主要持股是 ETF，可考慮從別的來源抓取"
            })

    if not issues:
        print("  ✅ 目前未發現明顯問題")
    else:
        for i, issue in enumerate(issues, 1):
            print(f"\n  [{i}] {issue['severity']} — {issue['title']}")
            print(f"      現況：{issue.get('detail', '')}")
            print(f"      建議：{issue.get('suggestion', issue.get('suggest', ''))}")


def analyze_html():
    """分析 index.html 可改進的地方"""
    print("\n" + "=" * 60)
    print("【index.html 前端分析】")
    print("=" * 60)

    html = BASE_DIR / "index.html"
    if not html.exists():
        print("  ❌ index.html 不存在")
        return

    content = html.read_text(encoding="utf-8")
    findings = []

    # 檢查是否使用 CDN Chart.js（可用性）
    if "cdn.jsdelivr.net" in content:
        findings.append({
            "category": "🌐可用性",
            "issue": "依賴 jsDelivr CDN",
            "detail": "若 CDN 失效，圖表完全無法顯示。建議的本機快取或備援 CDN"
        })

    # 檢查是否有 PWA / Service Worker
    if "service-worker" not in content.lower() and "manifest" not in content.lower():
        findings.append({
            "category": "📱體驗",
            "issue": "無離線支援（PWA）",
            "detail": "行動裝置無法離線瀏覽，股價更新時也無即時通知"
        })

    # 檢查 TradingView widget
    if "tradingview.com" in content:
        findings.append({
            "category": "🔴依賴性",
            "issue": "TradingView widget 為第三方外部資源",
            "detail": "若 TradingView API 改變或限流，圖表區塊可能失效或顯示錯誤"
        })

    # 檢查是否用 fetch 而非 local file 直接讀取
    if 'fetch("data.json")' in content or "fetch('data.json')" in content:
        findings.append({
            "category": "⚡效能",
            "issue": "使用 fetch 讀取 data.json",
            "detail": "file:// 協議下可能有 CORS 限制（部分瀏覽器），且無快取機制"
        })

    # Chart.js 版本
    import re
    chart_version = re.search(r"chart\.js@([\d.]+)", content)
    if chart_version:
        v = chart_version.group(1)
        major = int(v.split(".")[0])
        if major < 4:
            findings.append({
                "category": "🔄更新",
                "issue": f"Chart.js 版本較舊 (v{v})",
                "detail": "建議升級到 v4，最新版本有效能改進"
            })

    if not findings:
        print("  ✅ 未發現明顯前端問題")
    else:
        for f in findings:
            print(f"\n  [{f['category']}] {f['issue']}")
            print(f"      {f['detail']}")


def generate_summary():
    """產出研究摘要"""
    print("\n" + "=" * 60)
    print("【優先優化方向摘要】")
    print("=" * 60)

    print("""
  1. ⚡效能加速（更新腳本跑更快）
     - fetch_fundamentals 並行化（14檔約省10秒）
     - 指數並行抓取
     - 加入 yfinance 重試機制

  2. 📊 資料豐富度
     - 補足缺少本益比/殖利率的股票
     - history.json 太久（可限制保留2年）
     - 考慮加入更多基本面欄位（ROE、負債比）

  3. 🌐 前端現代化
     - 評估是否改用本地bundled Chart.js（不用CDN）
     - 加入 PWA（可離線看、股價異動推播）
     - 響應式圖表優化（手機板）

  4. 🛡 穩定性
     - data.json 寫入原子性（temp file + rename）
     - yfinance 重試 + 錯誤隔離
     - 異常時 macOS 通知（已有，可強化）

  5. 📈 儀表板功能增強（視覺化方向）
     - 各成員持股 vs 指數表現對照圖
     - 歷史累計報酬折線圖（vs 大盤）
     - 產業配置圓餅圖
     - 個股 52W 區間預設視覺化
     - 訊號頁面：技術面篩選（RSI、MACD）
""")
    print("  如需深入研究任一方向，請告訴我代號（如「1」、「3-2」）")


if __name__ == "__main__":
    print("🔍 廖家投資看板 — 優化研究分析")
    print("=" * 60)

    check_data_quality()
    analyze_portfolios()
    analyze_update_script()
    analyze_html()
    generate_summary()
