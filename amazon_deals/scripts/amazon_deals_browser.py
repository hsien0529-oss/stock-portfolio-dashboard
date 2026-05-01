#!/usr/bin/env python3
"""
日本亞馬遜暢銷商品 vs 台灣售價比較表
使用 browser（Browserbase）自動化克服 anti-bot
"""

import json
import os
import re
import sys
import time
import random
from datetime import datetime

CATEGORIES = [
    ("fashion",       "Sunglasses"),
    ("apparel",       "Clothing"),
    ("hpc",           "Health & Personal Care"),
    ("electronics",   "Electronics"),
    ("sports",        "Sports & Golf"),
    ("shoes",         "Sneakers"),
]

OUTPUT_DIR = os.path.expanduser("~/Desktop/stock-portfolio-dashboard/amazon_deals")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def jpy_to_twd(jpy):
    return round(jpy * 0.21, 0)

def parse_price(text):
    m = re.search(r'([\d,]+)', text)
    return int(m.group(1).replace(",", "")) if m else None

def run():
    today = datetime.now().strftime("%Y-%m-%d")
    print(f"{'='*60}")
    print(f"日本亞馬遜暢銷 vs 台灣售價 — {today}")
    print(f"{'='*60}\n")

    all_results = []

    for cat_key, cat_label in CATEGORIES:
        print(f"[{cat_label}] 抓取中...")
        url = f"https://www.amazon.co.jp/gp/bestsellers/{cat_key}"

        # 用 browser 工具開啟頁面
        import subprocess
        result = subprocess.run(
            ["hermes", "browser", "navigate", "--url", url],
            capture_output=True, text=True, timeout=30
        )
        print(f"  navigate: {result.stdout.strip()}")

        # 等頁面載入
        time.sleep(5)

        # 截圖 / 取 snapshot
        snap_result = subprocess.run(
            ["hermes", "browser", "snapshot", "--full", "true"],
            capture_output=True, text=True, timeout=15
        )
        html = snap_result.stdout

        # 手動解析（不需要 BeautifulSoup，直接正則）
        # 找所有商品卡
        pattern = re.compile(
            r'id="(B[A-Z0-9]{9})".*?'
            r'class="[^"]*p13n-sc-css-line-clamp-2[^"]*">([^<]+)</div>.*?'
            r'class="[^"]*p13n-sc-price[^"]*">([^<]+)</span>',
            re.DOTALL
        )
        items = []
        for m in pattern.finditer(html):
            asin = m.group(1)
            name = m.group(2).strip()[:120]
            price_text = m.group(3).strip()
            price_jpy = parse_price(price_text)
            if name and price_jpy:
                items.append({
                    "name": name, "price_jpy": price_jpy,
                    "price_twd": jpy_to_twd(price_jpy),
                    "asin": asin, "url": f"https://www.amazon.co.jp/dp/{asin}",
                    "ship_to_tw": None, "tw_price": None, "tw_market": None,
                })

        print(f"  找到 {len(items)} 筆")
        all_results.append({"category": cat_label, "items": items[:10]})

    # 儲存 JSON
    data_file = os.path.join(OUTPUT_DIR, f"deals_{today}.json")
    with open(data_file, "w", encoding="utf-8") as f:
        json.dump({"date": today, "results": all_results}, f, ensure_ascii=False, indent=2)
    print(f"\n已儲存: {data_file}")

    return all_results

if __name__ == "__main__":
    run()
