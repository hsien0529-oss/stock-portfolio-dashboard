// ================================================================
// trip_data.js — 廖家旅遊監控資料（機票 / 飯店 / 租車）
// 由排程 agent 每日更新，格式為 JS 全域常數供 HTML 讀取
// ================================================================

const TRIP_DATA = {
    "updated": "2026-05-14",
    "flights": {
    "TPE_CTS": {
    "route": "TPE → CTS",
    "dep": "2027-01-28",
    "ret": "2027-02-04",
    "airline": "真航空",
    "bestPrice": 8599.0,
    "bestPriceDate": "2026-05-14",
    "bestPriceUrl": "https://www.google.com/travel/flights?q=TPE+to+CTS&hl=zh-TW&curr=TWD&dt=2027-01-28&dti=8",
    "avgPrice": 9188,
    "records": [
    {
    "date": "2026-05-14",
    "price": 8599.0
    },
    {
    "date": "2026-05-13",
    "price": 9503.0,
    "note": "Google Flights 当前显示 2026年11月航班；2027年1月春节航班尚未开放预订"
    },
    {
    "date": "2026-05-12",
    "price": 9256.0,
    "note": "Google Flights 2027春節票價尚未開放查詢（距今8-9個月）"
    },
    {
    "date": "2026-05-10",
    "price": 9256.0
    },
    {
    "date": "2026-05-10",
    "price": 9256.0
    },
    {
    "date": "2026-05-10",
    "price": 9256.0
    }
    ]
    },
    "TPE_KIX": {
    "route": "TPE → KIX",
    "dep": "2027-02-14",
    "ret": "2027-02-17",
    "airline": "捷星日本航空",
    "bestPrice": 6405.0,
    "bestPriceDate": "2026-05-10",
    "bestPriceUrl": "https://www.google.com/travel/flights?q=TPE+to+KIX&hl=zh-TW&curr=TWD&dt=2027-02-14&dti=4",
    "avgPrice": 6506,
    "records": [
    {
    "date": "2026-05-14",
    "price": 6708.0
    },
    {
    "date": "2026-05-13",
    "price": 6705.0,
    "note": "Google Flights 当前显示 2026年9月航班；2027年2月航班尚未开放预订"
    },
    {
    "date": "2026-05-12",
    "price": 6405.0,
    "note": "Google Flights 2027春節票價尚未開放查詢（距今8-9個月）"
    },
    {
    "date": "2026-05-10",
    "price": 6405.0
    },
    {
    "date": "2026-05-10",
    "price": 6405.0
    },
    {
    "date": "2026-05-10",
    "price": 6405.0
    }
    ]
    },
    "TPE_HND": {
    "route": "TPE → HND",
    "dep": "2027-01-29",
    "ret": "2027-02-04",
    "airline": "樂桃航空",
    "bestPrice": 7552.0,
    "bestPriceDate": "2026-05-10",
    "bestPriceUrl": "https://www.google.com/travel/flights?q=TPE+to+HND&hl=zh-TW&curr=TWD&dt=2027-01-29&dti=7",
    "avgPrice": 7554,
    "records": [
    {
    "date": "2026-05-14",
    "price": 7555.0
    },
    {
    "date": "2026-05-13",
    "price": 7560.0,
    "note": "Google Flights 当前显示 2026年9月航班；2027年1月春节航班尚未开放预订"
    },
    {
    "date": "2026-05-12",
    "price": 7552.0,
    "note": "Google Flights 2027春節票價尚未開放查詢（距今8-9個月）"
    },
    {
    "date": "2026-05-10",
    "price": 7552.0
    },
    {
    "date": "2026-05-10",
    "price": 7552.0
    },
    {
    "date": "2026-05-10",
    "price": 7552.0
    }
    ]
    },
    "TPE_AOJ": {
    "route": "TPE_AOJ",
    "records": [
    {
    "date": "2026-05-14",
    "price": 16802.0
    }
    ],
    "bestPrice": 16802.0,
    "bestPriceDate": "2026-05-14",
    "airline": "大韓航空",
    "bestPriceUrl": "https://www.google.com/travel/flights?q=TPE+to+AOJ&hl=zh-TW&curr=TWD",
    "avgPrice": 16802
    },
    "SDJ_TPE": {
    "route": "SDJ_TPE",
    "records": [
    {
    "date": "2026-05-14",
    "price": 9309.0
    }
    ],
    "bestPrice": 9309.0,
    "bestPriceDate": "2026-05-14",
    "airline": "台灣虎航",
    "bestPriceUrl": "https://www.google.com/travel/flights?q=SDJ+to+TPE&hl=zh-TW&curr=TWD",
    "avgPrice": 9309
    }
    },
    "hotels": {
    "sapporo_ski": {
    "name": "留壽都 / Kiroro / Club Med",
    "checkin": "2027-01-28",
    "checkout": "2027-02-04",
    "rooms": 2,
    "bestPrice": null,
    "bestPriceDate": null,
    "bestPriceUrl": "",
    "records": []
    },
    "osaka": {
    "name": "大阪市區飯店",
    "checkin": "2027-02-14",
    "checkout": "2027-02-17",
    "rooms": 1,
    "bestPrice": null,
    "bestPriceDate": null,
    "bestPriceUrl": "",
    "records": []
    },
    "tokyo": {
    "name": "東京市區飯店",
    "checkin": "2027-01-29",
    "checkout": "2027-02-04",
    "rooms": 1,
    "bestPrice": null,
    "bestPriceDate": null,
    "bestPriceUrl": "",
    "records": []
    }
    },
    "cars": {
    "cts": {
    "pickup": "新千歲機場",
    "dropoff": "新千歲機場",
    "from": "2027-01-28",
    "to": "2027-02-04",
    "type": "SUV/7人座",
    "bestPrice": null,
    "bestPriceDate": null,
    "bestPriceUrl": "",
    "records": []
    }
    }
};
