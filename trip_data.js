// ================================================================
// trip_data.js — 廖家旅遊監控資料（機票 / 飯店 / 租車）
// 由排程 agent 每日更新，格式為 JS 全域常數供 HTML 讀取
// ================================================================

const TRIP_DATA = {
    "updated": "2026-05-12",
    "flights": {
    "TPE_CTS": {
    "route": "TPE → CTS",
    "dep": "2027-01-28",
    "ret": "2027-02-04",
    "airline": "泰國亞洲航空",
    "bestPrice": 9256.0,
    "bestPriceDate": "2026-05-10",
    "bestPriceUrl": "https://www.google.com/travel/flights?q=TPE+to+CTS&hl=zh-TW&curr=TWD&dt=2027-01-28&dti=8",
    "avgPrice": 9256,
    "records": [
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
    "avgPrice": 6405,
    "records": [
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
    "avgPrice": 7552,
    "records": [
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
