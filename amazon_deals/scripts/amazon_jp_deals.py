#!/usr/bin/env python3
"""
日本亞馬遜暢銷商品 vs 台灣售價比較表
策略：
  1. Amazon JP Best Sellers RSS（繞過 anti-bot）
  2. 個別商品頁面用 requests（帶 Accept-Language）
  3. 台灣售價用 SerpAPI（Google Shopping搜尋）
"""

import requests
import json
import re
import os
import time
import random
from datetime import datetime

# ── 設定 ────────────────────────────────────────────
CATEGORIES = [
    ("fashion",       "Sunglasses"),
    ("apparel",       "Clothing"),
    ("hpc",           "Health & Personal Care"),
    ("electronics",   "Electronics"),
    ("sports",        "Sports & Golf"),
    ("shoes",         "Sneakers"),
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "ja-JP,ja;q=0.9,en;q=0.8",
    "Accept": "application/rss+xml,application/xml,text/xml,*/*;q=0.1",
}

OUTPUT_DIR = os.path.expanduser("~/Desktop/stock-portfolio-dashboard/amazon_deals")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── 工具 ────────────────────────────────────────────
def jpy_to_twd(jpy):
    return round(jpy * 0.21, 0)

def parse_price_jpy(text):
    text = text.replace("￥", "").replace(",", "").strip()
    m = re.search(r"([\d]+)", text)
    return int(m.group(1)) if m else None

def fetch(url, headers=None, timeout=15):
    try:
        h = headers or {}
        r = requests.get(url, headers={**HEADERS, **h}, timeout=timeout, allow_redirects=True)
        if r.status_code == 200 and len(r.text) > 500:
            return r.text
        return None
    except Exception as e:
        print(f"  [!] fetch error: {e}", file=__import__('sys').stderr)
        return None

def amazon_rss_bestellers(cat_key, limit=10):
    """用 RSS feed 抓暢銷榜（繞過 anti-bot）"""
    url = f"https://www.amazon.co.jp/rss/bestsellers/{cat_key}/"
    xml = fetch(url, {"Accept": "application/rss+xml"})
    if not xml:
        return []
    # 解析 RSS item
    items = []
    # 取出各 item 區塊
    item_texts = re.split(r"<item>", xml)
    for block in item_texts[1:limit+1]:
        title_m  = re.search(r"<title><!\[CDATA\[([^\]]+)\]\]></title>", block)
        link_m   = re.search(r"<link>https://www\.amazon\.co\.jp/[^<]+/dp/([A-Z0-9]{10})", block)
        price_m  = re.search(r"<price>(\$?[\d,]+)</price>", block)
        asin     = link_m.group(1) if link_m else ""
        name     = title_m.group(1).strip() if title_m else ""
        price_jpy = parse_price_jpy(price_m.group(1)) if price_m else None
        if name and price_jpy and asin:
            items.append({
                "name": name[:120], "price_jpy": price_jpy,
                "price_twd": jpy_to_twd(price_jpy),
                "asin": asin,
                "url": f"https://www.amazon.co.jp/dp/{asin}",
                "ship_to_tw": None, "tw_price": None, "tw_market": None,
            })
    return items

def check_ships_to_taiwan(asin):
    """帶特定 header 查商品頁面是否可送台灣"""
    url = f"https://www.amazon.co.jp/dp/{asin}?language=zh_TW"
    html = fetch(url, {"Accept-Language": "ja-JP,ja;q=0.9"})
    if not html:
        return None
    # 頁面裡出現這些關鍵字代表可/不可送
    if re.search(r"ship.*taiwan|taiwan.*deliver|台湾.*配送|配送.*台湾", html, re.I):
        return True
    if re.search(r"not.*deliver|does.*not.*ship|cannot.*ship|配送.*不可", html, re.I):
        return False
    return None

def google_shopping_tw(product_name, asin):
    """用 Google Shopping 搜尋台灣售價（不回傳 API key 時用 text 模式）"""
    query = f"{product_name[:60]} site:pchome.com.tw OR site:momo.com.tw OR site:shopee.tw"
    # 用 html 模式搜尋
    search_url = f"https://www.google.com/search?q={requests.utils.quote(query)}&num=3&hl=zh-TW"
    html = fetch(search_url, {"Accept-Language": "zh-TW,zh;q=0.9"})
    if not html:
        return None, None
    # 找價格
    prices = re.findall(r"(?:NT\$|US\$|TWD)\s*([\d,]+)", html)
    # 找商城名
    shops = re.findall(r"(?:pchome|momo|shopee|蝦皮|松果|鮮食)", html, re.I)
    tw_price = int(prices[0].replace(",", "")) if prices else None
    tw_market = shops[0] if shops else None
    return tw_price, tw_market

# ── 主程式 ──────────────────────────────────────────
def run():
    today = datetime.now().strftime("%Y-%m-%d")
    print(f"\n{'='*60}")
    print(f"日本亞馬遜暢銷 vs 台灣售價 — {today}")
    print(f"{'='*60}\n")

    all_results = []

    for cat_key, cat_label in CATEGORIES:
        print(f"[{cat_label}] 抓取中...")
        items = amazon_rss_bestellers(cat_key, limit=12)
        print(f"  RSS 取得 {len(items)} 筆")

        enriched = []
        for it in items:
            print(f"  → {it['name'][:45]}... ¥{it['price_jpy']:,}")
            # 檢查可否送台灣
            ships = check_ships_to_taiwan(it["asin"])
            it["ship_to_tw"] = ships
            time.sleep(random.uniform(0.5, 1.2))

            # 查台灣售價
            if ships is not False:
                tw_price, tw_market = google_shopping_tw(it["name"], it["asin"])
                it["tw_price"]  = tw_price
                it["tw_market"] = tw_market
                time.sleep(random.uniform(0.5, 1.2))

            enriched.append(it)

        # 只留可送或未確定（明確不可送的排除）
        filtered = [it for it in enriched if it["ship_to_tw"] is not False]
        print(f"  ✓ {len(filtered)} 件可參考\n")
        all_results.append({"category": cat_label, "items": filtered[:10]})

    # 存 JSON
    data_file = os.path.join(OUTPUT_DIR, f"deals_{today}.json")
    with open(data_file, "w", encoding="utf-8") as f:
        json.dump({"date": today, "results": all_results}, f, ensure_ascii=False, indent=2)
    print(f"JSON: {data_file}")

    # 產生 HTML
    generate_html(all_results, today)
    print("HTML 完成！")

def generate_html(data, date):
    rows = ""
    for cat_block in data:
        cat = cat_block["category"]
        items = cat_block["items"]
        if not items:
            continue
        rows += f'<tr class="cat-header"><td colspan="7">{cat}</td></tr>\n'
        for it in items:
            tw_price_str = f"NT$ {it['tw_price']:,}" if it["tw_price"] else "—"
            diff_html = ""
            if it["tw_price"] and it["price_twd"]:
                diff = it["tw_price"] - it["price_twd"]
                sign = "+" if diff > 0 else ""
                cls = "green" if diff <= 0 else "red"
                pct = f"{sign}{diff/it['price_twd']*100:.0f}%"
                diff_html = f'<span class="{cls}">{sign}NT${diff:,} ({pct})</span>'
            ship_icon = "✅" if it["ship_to_tw"] == True else ("⚠️" if it["ship_to_tw"] is None else "❌")
            tw_market = it["tw_market"] or ""
            rows += f"""<tr>
  <td class="icon">{ship_icon}</td>
  <td class="name">{it['name']}</td>
  <td>¥{it['price_jpy']:,}</td>
  <td>NT$ {it['price_twd']:.0f}</td>
  <td>{tw_price_str}<br><small>{tw_market}</small></td>
  <td>{diff_html}</td>
  <td><a href="{it['url']}" target="_blank">亞馬遛</a></td>
</tr>\n"""

    html = f"""<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>日本亞馬遜暢銷 vs 台灣售價 — {date}</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0f0f0f;color:#e0e0e0;padding:20px}}
h1{{text-align:center;color:#fff;margin-bottom:6px}}
.subtitle{{text-align:center;color:#888;margin-bottom:20px;font-size:14px}}
.updated{{text-align:right;color:#555;font-size:12px;margin-bottom:10px}}
table{{width:100%;border-collapse:collapse;background:#1a1a1a;border-radius:8px;overflow:hidden}}
th{{background:#222;color:#aaa;padding:10px 8px;text-align:left;font-size:12px}}
td{{padding:9px 8px;border-bottom:1px solid #2a2a2a;font-size:13px;vertical-align:top}}
tr:hover td{{background:#1f1f1f}}
.cat-header td{{background:#2a2a2a;color:#fff;font-weight:bold;font-size:13px;padding:8px}}
.name{{max-width:300px;word-break:break-word}}
.green{{color:#4cd964}}
.red{{color:#ff3b30}}
a{{color:#4d9fff;text-decoration:none}}
a:hover{{text-decoration:underline}}
.icon{{text-align:center}}
small{{color:#666}}
</style>
</head>
<body>
<h1>🇯🇵 日本亞馬遜暢銷 vs 🇹🇼 台灣售價</h1>
<p class="subtitle">每天自動更新 · 只列出可直送台灣或台灣有類似商品的項目</p>
<p class="updated">更新：{datetime.now().strftime('%Y-%m-%d %H:%M')}</p>
<table>
<thead>
<tr><th class="icon">📦</th><th>商品名稱</th><th>🇯🇵 日幣</th><th>≈ 台幣</th><th>🇹🇼 台灣售價</th><th>差價</th><th>連結</th></tr>
</thead>
<tbody>
{rows}
</tbody>
</table>
<p style="text-align:center;color:#555;font-size:11px;margin-top:16px">
日幣匯率 1 JPY ≈ 0.21 TWD | 台灣售價取自 Google Shopping 搜尋結果，僅供參考
</p>
</body>
</html>"""
    out = os.path.join(OUTPUT_DIR, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"HTML: {out}")

if __name__ == "__main__":
    run()
