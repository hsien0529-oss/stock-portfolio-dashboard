// ================================================================
// trip_data.js — 廖家旅遊監控資料（機票 / 飯店 / 租車）
// 由排程 agent 每日更新，格式為 JS 全域常數供 HTML 讀取
// ================================================================

const TRIP_DATA = {
    "updated": "2026-05-08",
    "flights": {
    "TPE_CTS": {
    "route": "TPE → CTS",
    "dep": "2027-01-28",
    "ret": "2027-02-04",
    "airline": "長榮",
    "bestPrice": 22800.0,
    "bestPriceDate": "2026-05-08",
    "bestPriceUrl": "https://skyscanner.com",
    "avgPrice": 22800,
    "records": [
    {
    "date": "2026-05-08",
    "price": 22800.0
    }
    ]
    },
    "TPE_KIX": {
    "route": "TPE → KIX",
    "dep": "2027-02-14",
    "ret": "2027-02-17",
    "airline": "虎航",
    "bestPrice": null,
    "bestPriceDate": null,
    "bestPriceUrl": "",
    "avgPrice": null,
    "records": []
    },
    "TPE_HND": {
    "route": "TPE → HND",
    "dep": "2027-01-29",
    "ret": "2027-02-04",
    "airline": "國泰",
    "bestPrice": null,
    "bestPriceDate": null,
    "bestPriceUrl": "",
    "avgPrice": null,
    "records": []
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
