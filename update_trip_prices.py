#!/usr/bin/env python3
"""
update_trip_prices.py — 更新 trip_data.js 的最低價格
用法：
  python3 update_trip_prices.py --flight TPE_CTS --price 22800 --airline "長榮" --url "https://..."
  python3 update_trip_prices.py --hotel sapporo_ski --price 85000 --url "https://..."
  python3 update_trip_prices.py --car cts --price 12000 --url "https://..."

會自動更新 bestPrice、bestPriceDate，並在 records 留下一筆記錄。
"""

import json
import sys
import os
import re
import argparse
from datetime import datetime, timezone, timedelta

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TRIP_FILE = os.path.join(BASE_DIR, "trip_data.js")

TAIPEI_TZ = timezone(timedelta(hours=8))

def get_today():
    return datetime.now(TAIPEI_TZ).strftime("%Y-%m-%d")


def load_data():
    """讀取 trip_data.js，解析出 JSON 區塊（支援 JS 行內註釋）"""
    if not os.path.exists(TRIP_FILE):
        print(f"⚠  {TRIP_FILE} 不存在，先建立空白結構")
        return None

    content = open(TRIP_FILE, encoding="utf-8").read()

    # 移除真正的 // 行註釋（行首的 //，不是 URL 裡的 //）
    clean = re.sub(r"^\s*//.*$", "", content, flags=re.MULTILINE)

    # 用括號深度法找出最外層 { ... }
    start = clean.find("const TRIP_DATA")
    if start == -1:
        print("⚠ 找不到 const TRIP_DATA")
        return None

    brace_start = clean.find("{", start)
    if brace_start == -1:
        print("⚠ 找不到開括號")
        return None

    depth = 0
    i = brace_start
    while i < len(clean):
        c = clean[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                json_str = clean[brace_start + 1:i]
                break
        i += 1
    else:
        print("⚠ 找不到配對的閉括號")
        return None

    try:
        return json.loads("{" + json_str + "}")
    except json.JSONDecodeError as e:
        print(f"⚠ JSON 解析失敗: {e}")
        return None


def save_data(data):
    """把 data 寫回 trip_data.js"""
    today = get_today()
    data["updated"] = today

    json_str = json.dumps(data, ensure_ascii=False, indent=2)
    # 縮排調整成 4 space
    json_str = re.sub(r'\n +', lambda m: "\n" + " " * 4, json_str)

    content = f"""// ================================================================
// trip_data.js — 廖家旅遊監控資料（機票 / 飯店 / 租車）
// 由排程 agent 每日更新，格式為 JS 全域常數供 HTML 讀取
// ================================================================

const TRIP_DATA = {json_str};
"""

    with open(TRIP_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✓ trip_data.js 已更新 ({today})")


def update_flight(route_key, price, airline="", url="", note=""):
    data = load_data()
    if data is None:
        return
    if "flights" not in data:
        data["flights"] = {}

    if route_key not in data["flights"]:
        data["flights"][route_key] = {"route": route_key, "records": [], "bestPrice": None, "bestPriceDate": None}

    f = data["flights"][route_key]

    # 更新 airline / url
    if airline:
        f["airline"] = airline
    if url:
        f["bestPriceUrl"] = url

    today = get_today()

    # 新低價更新
    if price and (not f.get("bestPrice") or price < f["bestPrice"]):
        f["bestPrice"] = price
        f["bestPriceDate"] = today
        print(f"🆕 新低價！{route_key}: {price:,} TWD")

    # records 追加（最多保留 30 筆）
    record = {"date": today, "price": price}
    if note:
        record["note"] = note
    f.setdefault("records", [])
    f["records"].insert(0, record)
    f["records"] = f["records"][:30]

    # 重算 avgPrice
    prices = [r["price"] for r in f["records"] if r.get("price")]
    if prices:
        f["avgPrice"] = round(sum(prices) / len(prices))

    save_data(data)


def update_hotel(hotel_key, price, url="", note=""):
    data = load_data()
    if data is None:
        return
    if "hotels" not in data:
        data["hotels"] = {}

    if hotel_key not in data["hotels"]:
        data["hotels"][hotel_key] = {"name": hotel_key, "records": [], "bestPrice": None, "bestPriceDate": None}

    h = data["hotels"][hotel_key]

    if url:
        h["bestPriceUrl"] = url

    today = get_today()

    if price and (not h.get("bestPrice") or price < h["bestPrice"]):
        h["bestPrice"] = price
        h["bestPriceDate"] = today
        print(f"🆕 新低價！{hotel_key}: {price:,} TWD")

    record = {"date": today, "price": price}
    if note:
        record["note"] = note
    h.setdefault("records", [])
    h["records"].insert(0, record)
    h["records"] = h["records"][:30]

    prices = [r["price"] for r in h["records"] if r.get("price")]
    if prices:
        h["avgPrice"] = round(sum(prices) / len(prices))

    save_data(data)


def update_car(car_key, price, url="", note=""):
    data = load_data()
    if data is None:
        return
    if "cars" not in data:
        data["cars"] = {}

    if car_key not in data["cars"]:
        data["cars"][car_key] = {"pickup": car_key, "records": [], "bestPrice": None, "bestPriceDate": None}

    c = data["cars"][car_key]

    if url:
        c["bestPriceUrl"] = url

    today = get_today()

    if price and (not c.get("bestPrice") or price < c["bestPrice"]):
        c["bestPrice"] = price
        c["bestPriceDate"] = today
        print(f"🆕 新低價！{car_key}: {price:,} TWD")

    record = {"date": today, "price": price}
    if note:
        record["note"] = note
    c.setdefault("records", [])
    c["records"].insert(0, record)
    c["records"] = c["records"][:30]

    prices = [r["price"] for r in c["records"] if r.get("price")]
    if prices:
        c["avgPrice"] = round(sum(prices) / len(prices))

    save_data(data)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="更新 trip_data.js")
    parser.add_argument("--flight", help="航班 key，例如 TPE_CTS")
    parser.add_argument("--hotel", help="飯店 key，例如 sapporo_ski")
    parser.add_argument("--car", help="租車 key，例如 cts")
    parser.add_argument("--price", type=float, required=True, help="價格（TWD）")
    parser.add_argument("--airline", default="", help="航空公司")
    parser.add_argument("--url", default="", help="報價來源網址")
    parser.add_argument("--note", default="", help="備註")

    args = parser.parse_args()

    if args.flight:
        update_flight(args.flight, args.price, args.airline, args.url, args.note)
    elif args.hotel:
        update_hotel(args.hotel, args.price, args.url, args.note)
    elif args.car:
        update_car(args.car, args.price, args.url, args.note)
    else:
        parser.print_help()
