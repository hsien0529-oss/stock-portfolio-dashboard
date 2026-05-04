
// ============================================================
// PORTFOLIO DATA — 家庭持股明細
// ============================================================
const PORTFOLIOS = {
  "👨 爸爸": [
    {"code":"0050.TW","name":"元大台灣50","shares":12150,"cost":14.92,"industry":"ETF"},
    {"code":"00878.TW","name":"國泰永續高股息","shares":9000,"cost":20.91,"industry":"ETF"},
    {"code":"00881.TW","name":"國泰台灣科技龍頭","shares":11000,"cost":25.35,"industry":"ETF"},
    {"code":"2308.TW","name":"台達電","shares":749,"cost":265.07,"industry":"電子"},
    {"code":"2317.TW","name":"鴻海","shares":16000,"cost":150.0,"industry":"電子"},
    {"code":"2330.TW","name":"台積電","shares":2020,"cost":715.89,"industry":"半導體"},
    {"code":"2382.TW","name":"廣達","shares":500,"cost":277.55,"industry":"電子"},
    {"code":"2618.TW","name":"長榮航","shares":4000,"cost":38.19,"industry":"航空"},
    {"code":"2034.TW","name":"允強","shares":55,"cost":0,"industry":"鋼鐵"},
    {"code":"2880.TW","name":"華南金","shares":2163,"cost":0,"industry":"金融"},
    {"code":"2881.TW","name":"富邦金","shares":3796,"cost":48.59,"industry":"金融"},
    {"code":"2882.TW","name":"國泰金","shares":4526,"cost":38.68,"industry":"金融"},
    {"code":"2884.TW","name":"玉山金","shares":7369,"cost":22.17,"industry":"金融"},
    {"code":"2885.TW","name":"元大金","shares":2060,"cost":30.87,"industry":"金融"},
    {"code":"2886.TW","name":"兆豐金","shares":4374,"cost":29.4,"industry":"金融"},
    {"code":"2887.TW","name":"台新新光金","shares":235,"cost":0,"industry":"金融"},
    {"code":"2887A.TW","name":"台新新光辛特","shares":61,"cost":0,"industry":"金融"},
    {"code":"00981A.TW","name":"玉山ESG永續主題股債混合A","shares":5000,"cost":28.28,"industry":"ETF"},
    {"code":"3008.TW","name":"大立光","shares":310,"cost":2572.1,"industry":"光學"},
    {"code":"5880.TW","name":"合庫金","shares":4702,"cost":0,"industry":"金融"}
  ],
  "👩 太太": [
    {"code":"0050.TW","name":"元大台灣50","shares":6400,"cost":35.5,"industry":"ETF"},
    {"code":"00646.TW","name":"元大S&P500","shares":1000,"cost":58.45,"industry":"ETF"},
    {"code":"00878.TW","name":"國泰永續高股息","shares":6000,"cost":17.38,"industry":"ETF"},
    {"code":"2317.TW","name":"鴻海","shares":2300,"cost":209.48,"industry":"電子"},
    {"code":"2330.TW","name":"台積電","shares":160,"cost":1098.56,"industry":"半導體"},
    {"code":"2882.TW","name":"國泰金","shares":200,"cost":74.5,"industry":"金融"},
    {"code":"3045.TW","name":"台灣大","shares":1000,"cost":103.0,"industry":"電信"}
  ],
  "👦 兒子 (大)": [
    {"code":"0050.TW","name":"元大台灣50","shares":5300,"cost":13.8,"industry":"ETF"},
    {"code":"00646.TW","name":"元大S&P500","shares":2000,"cost":61.03,"industry":"ETF"},
    {"code":"2308.TW","name":"台達電","shares":1000,"cost":183.38,"industry":"電子"},
    {"code":"2317.TW","name":"鴻海","shares":4253,"cost":76.14,"industry":"電子"},
    {"code":"2330.TW","name":"台積電","shares":520,"cost":902.3,"industry":"半導體"},
    {"code":"2618.TW","name":"長榮航","shares":1000,"cost":33.1,"industry":"航空"},
    {"code":"2884.TW","name":"玉山金","shares":1659,"cost":11.14,"industry":"金融"},
    {"code":"2886.TW","name":"兆豐金","shares":2172,"cost":27.03,"industry":"金融"},
    {"code":"3703.TW","name":"欣陸","shares":1000,"cost":30.05,"industry":"營建"}
  ],
  "👦 兒子 (小)": [
    {"code":"0050.TW","name":"元大台灣50","shares":5700,"cost":23.25,"industry":"ETF"},
    {"code":"00646.TW","name":"元大S&P500","shares":1000,"cost":62.25,"industry":"ETF"},
    {"code":"1301.TW","name":"台塑","shares":600,"cost":88.6,"industry":"化工"},
    {"code":"2317.TW","name":"鴻海","shares":1000,"cost":150.18,"industry":"電子"},
    {"code":"2330.TW","name":"台積電","shares":1410,"cost":401.5,"industry":"半導體"},
    {"code":"2618.TW","name":"長榮航","shares":1000,"cost":33.95,"industry":"航空"},
    {"code":"2882.TW","name":"國泰金","shares":1118,"cost":39.62,"industry":"金融"}
  ]
};

// ============================================================
// === PRICE_DATA ============================================================
let PRICE_DATA = {
  "0050":  {"price":93.35,  "year_high":93.35,  "year_low":41.7,   "prev_close":90.5},
  "00878":  {"price":26.15,  "year_high":26.15,  "year_low":18.86,   "prev_close":25.39},
  "00881":  {"price":48.37,  "year_high":48.37,  "year_low":19.05,   "prev_close":46.79},
  "00981A":  {"price":29.26,  "year_high":29.26,  "year_low":9.69,   "prev_close":28.28},
  "00646":  {"price":71.85,  "year_high":71.85,  "year_low":52.3,   "prev_close":70.95},
  "1301":  {"price":51.1,  "year_high":54.5,  "year_low":32.74,   "prev_close":51.5},
  "2034":  {"price":21.15,  "year_high":23.21,  "year_low":18.65,   "prev_close":21.3},
  "2308":  {"price":2170.0,  "year_high":2170.0,  "year_low":351.74,   "prev_close":2165.0},
  "2317":  {"price":226.0,  "year_high":262.0,  "year_low":137.51,   "prev_close":219.5},
  "2330":  {"price":2245.0,  "year_high":2265.0,  "year_low":904.5,   "prev_close":2135.0},
  "2382":  {"price":318.5,  "year_high":340.0,  "year_low":235.28,   "prev_close":312.5},
  "2618":  {"price":33.85,  "year_high":41.13,  "year_low":32.5,   "prev_close":33.5},
  "2880":  {"price":32.0,  "year_high":38.1,  "year_low":24.73,   "prev_close":32.05},
  "2881":  {"price":92.3,  "year_high":98.2,  "year_low":71.84,   "prev_close":90.0},
  "2882":  {"price":77.9,  "year_high":79.7,  "year_low":51.88,   "prev_close":77.2},
  "2884":  {"price":31.65,  "year_high":35.1,  "year_low":26.6,   "prev_close":31.85},
  "2885":  {"price":52.6,  "year_high":52.6,  "year_low":28.82,   "prev_close":52.2},
  "2886":  {"price":39.25,  "year_high":42.8,  "year_low":36.73,   "prev_close":39.1},
  "2887":  {"price":23.85,  "year_high":25.6,  "year_low":14.89,   "prev_close":23.8},
  "3008":  {"price":2530.0,  "year_high":2820.0,  "year_low":1981.84,   "prev_close":2515.0},
  "3045":  {"price":111.0,  "year_high":113.78,  "year_low":104.5,   "prev_close":111.5},
  "3703":  {"price":20.65,  "year_high":24.46,  "year_low":20.6,   "prev_close":20.75},
  "5880":  {"price":22.95,  "year_high":24.87,  "year_low":22.55,   "prev_close":22.95}
}

// ================================================================
let MARKET_INDICES = [
  {sym:"加權指數", ticker:"^TWII",  price:40372.55,  change:1445.92,   changePct:3.71},
  {sym:"台積電", ticker:"2330.TW",  price:2245.0,  change:110.0,   changePct:5.15},
  {sym:"鴻　海", ticker:"2317.TW",  price:226.0,  change:6.5,   changePct:2.96},
  {sym:"S&P 500", ticker:"^GSPC",  price:7230.12,  change:21.11,   changePct:0.29},
  {sym:"NASDAQ", ticker:"^IXIC",  price:25114.44,  change:222.13,   changePct:0.89},
  {sym:"道　瓊", ticker:"^DJI",  price:49499.27,  change:-152.87,   changePct:-0.31},
  {sym:"日　經", ticker:"^N225",  price:59513.12,  change:228.2,   changePct:0.38},
  {sym:"香　港", ticker:"^HSI",  price:26227.95,  change:451.42,   changePct:1.75}
]

let FUNDAMENTALS = {
  "0050":{trailingPE:30.56,dividendYield:1.89},
  "00878":{trailingPE:18.22,dividendYield:7.8},
  "00881":{trailingPE:35.74,dividendYield:9.14},
  "00981A":{trailingPE:60.84,dividendYield:null},
  "00646":{trailingPE:28.7,dividendYield:null},
  "1301":{trailingPE:null,dividendYield:0.97},
  "2034":{trailingPE:105.75,dividendYield:4.69},
  "2308":{trailingPE:93.66,dividendYield:0.32},
  "2317":{trailingPE:16.88,dividendYield:2.64},
  "2330":{trailingPE:30.48,dividendYield:1.12},
  "2382":{trailingPE:16.84,dividendYield:4.16},
  "2618":{trailingPE:7.05,dividendYield:7.16},
  "2880":{trailingPE:16.84,dividendYield:3.9},
  "2881":{trailingPE:11.03,dividendYield:4.61},
  "2882":{trailingPE:11.03,dividendYield:4.53},
  "2884":{trailingPE:14.91,dividendYield:3.77},
  "2885":{trailingPE:19.2,dividendYield:2.88},
  "2886":{trailingPE:16.63,dividendYield:4.09},
  "2887":{trailingPE:12.49,dividendYield:3.78},
  "3008":{trailingPE:16.1,dividendYield:3.18},
  "3045":{trailingPE:23.57,dividendYield:4.04},
  "3703":{trailingPE:11.47,dividendYield:5.06},
  "5880":{trailingPE:16.88,dividendYield:3.05}
}

// === HISTORY_DATA ==========================================================

let HISTORY_DATA = {
"2025-12-22":{"Total":19114987,"👨 爸爸":11507436,"👩 太太":1447450,"👦 兒子 (大)":3295103,"👦 兒子 (小)":2864997},
"2025-12-24":{"Total":19350614,"👨 爸爸":11645772,"👩 太太":1459159,"👦 兒子 (大)":3331329,"👦 兒子 (小)":2914352},
"2025-12-26":{"Total":19400222,"👨 爸爸":11668521,"👩 太太":1464455,"👦 兒子 (大)":3333239,"👦 兒子 (小)":2934006},
"2025-12-29":{"Total":19674173,"👨 爸爸":11854120,"👩 太太":1482059,"👦 兒子 (大)":3371415,"👦 兒子 (小)":2966577},
"2025-12-31":{"Total":19752509,"👨 爸爸":11883032,"👩 太太":1483124,"👦 兒子 (大)":3383837,"👦 兒子 (小)":3002514},
"2026-01-02":{"Total":20060781,"👨 爸爸":12056183,"👩 太太":1496939,"👦 兒子 (大)":3447699,"👦 兒子 (小)":3059958},
"2026-01-05":{"Total":20581363,"👨 爸爸":12325370,"👩 太太":1526429,"👦 兒子 (大)":3530759,"👦 兒子 (小)":3198803},
"2026-01-06":{"Total":20562508,"👨 爸爸":12312004,"👩 太太":1524760,"👦 兒子 (大)":3527867,"👦 兒子 (小)":3197877},
"2026-01-08":{"Total":20444815,"👨 爸爸":12180363,"👩 太太":1526559,"👦 兒子 (大)":3517436,"👦 兒子 (小)":3220455},
"2026-01-09":{"Total":20484746,"👨 爸爸":12217498,"👩 太太":1530889,"👦 兒子 (大)":3524256,"👦 兒子 (小)":3212101},
"2026-01-12":{"Total":20550108,"👨 爸爸":12227363,"👩 太太":1531359,"👦 兒子 (大)":3563109,"👦 兒子 (小)":3228274},
"2026-01-14":{"Total":20777042,"👨 爸爸":12358282,"👩 太太":1548510,"👦 兒子 (大)":3606980,"👦 兒子 (小)":3263269},
"2026-01-16":{"Total":21077767,"👨 爸爸":12501046,"👩 太太":1567000,"👦 兒子 (大)":3694079,"👦 兒子 (小)":3315641},
"2026-01-19":{"Total":20695884,"👨 爸爸":12267025,"👩 太太":1407149,"👦 兒子 (大)":3678785,"👦 兒子 (小)":3342923},
"2026-01-22":{"Total":20821784,"👨 爸爸":12323684,"👩 太太":1389600,"👦 兒子 (大)":3775809,"👦 兒子 (小)":3332690},
"2026-01-23":{"Total":20862373,"👨 爸爸":12335560,"👩 太太":1389129,"👦 兒子 (大)":3788979,"👦 兒子 (小)":3348703},
"2026-01-28":{"Total":21258813,"👨 爸爸":12546954,"👩 太太":1415539,"👦 兒子 (大)":3859504,"👦 兒子 (小)":3436814},
"2026-01-30":{"Total":21092631,"👨 爸爸":12457222,"👩 太太":1406190,"👦 兒子 (大)":3818298,"👦 兒子 (小)":3410920},
"2026-02-02":{"Total":20396281,"👨 爸爸":12045127,"👩 太太":1362819,"👦 兒子 (大)":3662536,"👦 兒子 (小)":3325797},
"2026-02-03":{"Total":20850130,"👨 爸爸":12267198,"👩 太太":1462089,"👦 兒子 (大)":3735618,"👦 兒子 (小)":3385223},
"2026-02-09":{"Total":20915861,"👨 爸爸":12298112,"👩 太太":1468299,"👦 兒子 (大)":3728284,"👦 兒子 (小)":3421164},
"2026-02-10":{"Total":20915861,"👨 爸爸":12298112,"👩 太太":1468299,"👦 兒子 (大)":3728284,"👦 兒子 (小)":3421164},
"2026-02-11":{"Total":21844835,"👨 爸爸":12805040,"👩 太太":1525180,"👦 兒子 (大)":3915282,"👦 兒子 (小)":3599332},
"2026-02-12":{"Total":21883345,"👨 爸爸":12857742,"👩 太太":1522839,"👦 兒子 (大)":3911924,"👦 兒子 (小)":3590838},
"2026-02-23":{"Total":22061831,"👨 爸爸":12965432,"👩 太太":1527249,"👦 兒子 (大)":3975710,"👦 兒子 (小)":3593438},
"2026-02-24":{"Total":22589198,"👨 爸爸":13249317,"👩 太太":1558130,"👦 兒子 (大)":4096106,"👦 兒子 (小)":3685644},
"2026-02-25":{"Total":23273822,"👨 爸爸":13653927,"👩 太太":1607389,"👦 兒子 (大)":4238721,"👦 兒子 (小)":3773784},
"2026-02-26":{"Total":23144512,"👨 爸爸":13595658,"👩 太太":1594500,"👦 兒子 (大)":4209634,"👦 兒子 (小)":3744719},
"2026-03-05":{"Total":21896264,"👨 爸爸":12783628,"👩 太太":1577510,"👦 兒子 (大)":3977920,"👦 兒子 (小)":3557204},
"2026-03-06":{"Total":21896264,"👨 爸爸":12783628,"👩 太太":1577510,"👦 兒子 (大)":3977920,"👦 兒子 (小)":3557204},
"2026-03-10":{"Total":20820766,"👨 爸爸":12132179,"👩 太太":1526439,"👦 兒子 (大)":3774406,"👦 兒子 (小)":3387739},
"2026-03-11":{"Total":21765005,"👨 爸爸":12648419,"👩 太太":1578034,"👦 兒子 (大)":3994732,"👦 兒子 (小)":3543818},
"2026-03-13":{"Total":21417499,"👨 爸爸":12445102,"👩 太太":1549190,"👦 兒子 (大)":3957734,"👦 兒子 (小)":3465472},
"2026-03-17":{"Total":21725606,"👨 爸爸":12609846,"👩 太太":1565995,"👦 兒子 (大)":4051651,"👦 兒子 (小)":3498112},
"2026-03-18":{"Total":21490696,"👨 爸爸":12260982,"👩 太太":1581480,"👦 兒子 (大)":4098916,"👦 兒子 (小)":3549318},
"2026-03-25":{"Total":20975297,"👨 爸爸":11907395,"👩 太太":1529099,"👦 兒子 (大)":4093747,"👦 兒子 (小)":3445055},
"2026-03-26":{"Total":21264271,"👨 爸爸":12152198,"👩 太太":1570939,"👦 兒子 (大)":4087544,"👦 兒子 (小)":3453588},
"2026-04-08":{"Total":22067594,"👨 爸爸":12551173,"👩 太太":1611959,"👦 兒子 (大)":4288142,"👦 兒子 (小)":3616318},
"2026-04-09":{"Total":21921254,"👨 爸爸":12469638,"👩 太太":1603450,"👦 兒子 (大)":4251290,"👦 兒子 (小)":3596875},
"2026-04-10":{"Total":22346008,"👨 爸爸":12688655,"👩 太太":1623490,"👦 兒子 (大)":4377866,"👦 兒子 (小)":3655996},
"2026-04-14":{"Total":23069100,"👨 爸爸":13127097,"👩 太太":1670129,"👦 兒子 (大)":4475644,"👦 兒子 (小)":3796228},
"2026-04-15":{"Total":23322436,"👨 爸爸":13271918,"👩 太太":1682780,"👦 兒子 (大)":4530900,"👦 兒子 (小)":3836837},
"2026-04-16":{"Total":23498840,"👨 爸爸":13357605,"👩 太太":1691039,"👦 兒子 (大)":4598239,"👦 兒子 (小)":3851955},
"2026-04-20":{"Total":23154690,"👨 爸爸":13152136,"👩 太太":1678870,"👦 兒子 (大)":4554689,"👦 兒子 (小)":3768995},
"2026-04-21":{"Total":23764849,"👨 爸爸":13468907,"👩 太太":1710969,"👦 兒子 (大)":4772082,"👦 兒子 (小)":3812888},
"2026-04-22":{"Total":24154184,"👨 爸爸":13706567,"👩 太太":1744130,"👦 兒子 (大)":4855942,"👦 兒子 (小)":3847545},
"2026-04-23":{"Total":24089560,"👨 爸爸":13661069,"👩 太太":1748209,"👦 兒子 (大)":4811960,"👦 兒子 (小)":3868321},
"2026-04-24":{"Total":24746104,"👨 爸爸":13964743,"👩 太太":1783059,"👦 兒子 (大)":4965277,"👦 兒子 (小)":4033023},
"2026-04-27":{"Total":25089393,"👨 爸爸":14094992,"👩 太太":1829400,"👦 兒子 (大)":4995930,"👦 兒子 (小)":4169070},
"2026-04-28":{"Total":24974668,"👨 爸爸":14011561,"👩 太太":1810639,"👦 兒子 (大)":5060841,"👦 兒子 (小)":4091624},
"2026-04-29":{"Total":24889501,"👨 爸爸":13978432,"👩 太太":1797519,"👦 兒子 (大)":5074098,"👦 兒子 (小)":4039449},
"2026-04-30":{"Total":24512802,"👨 爸爸":13747265,"👩 太太":1775880,"👦 兒子 (大)":5022298,"👦 兒子 (小)":3967360},
"2026-05-01":{"Total":24512802,"👨 爸爸":13747265,"👩 太太":1775880,"👦 兒子 (大)":5022298,"👦 兒子 (小)":3967360},
"2026-05-02":{"Total":24512802,"👨 爸爸":13747265,"👩 太太":1775880,"👦 兒子 (大)":5022298,"👦 兒子 (小)":3967360},
"2026-05-03":{"Total":24513931,"👨 爸爸":13748393,"👩 太太":1775880,"👦 兒子 (大)":5022298,"👦 兒子 (小)":3967360},
"2026-05-04":{"Total":24513931,"👨 爸爸":13748393,"👩 太太":1775880,"👦 兒子 (大)":5022298,"👦 兒子 (小)":3967360}
}

// ============================================================
// NEWS DATA — 台股市場資訊 (2026-05-04)
// ============================================================
const NEWS_DATA = [
  {cls:"macro",tagClass:"macro",tag:"總經",time:"今日",date:"2026-05-04",
   title:"美股四大指數漲跌互見，市場觀望聯準會利率決議",
   summary:"美股週五（5/2）呈現漲跌互見格局，那斯達克受科技股財報佳績激勵上漲逾0.8%，道瓊則小跌。市場屏息以待本週FED利率決議，利率期貨顯示6月降息機率約25%。台股今日（5/4）在半導體、金融拉回下，指數呈現區間震盪。",
   sentiment:"neu",related:["2330","2317","2382","2308","2882","2881","2886"]},
  {cls:"semi",tagClass:"semi",tag:"半導體",time:"今日",date:"2026-05-04",
   title:"台積電法說後股價回測2,100元，法人：基本面無虞視為布局點",
   summary:"台積電法說會後法人出具正向報告，重申AI需求超預期、先進製程供需緊張。短線股價回測2,100元整數關卡，市場認為中長線投資價值浮現，外資近期低接動作明顯。",
   sentiment:"neu",related:["2330"]},
  {cls:"ai",tagClass:"ai",tag:"AI",time:"今日",date:"2026-05-04",
   title:"GB300供應鏈旺，廣達、台達電、欣興第三季訂單續強",
   summary:"輝達GB300 AI伺服器進入量產爬坡階段，散熱、載板、電源供應鏈第三季訂單能見度樂觀。法人指出，台灣AI供應鏈在CoWoS、先進封裝帶動下，2026年營收可望逐季走高。",
   sentiment:"pos",related:["2330","2308","2382"]},
  {cls:"finance",tagClass:"finance",tag:"金融",time:"今日",date:"2026-05-04",
   title:"新台幣區間整理，34元成短期支撐，壽險金控壓力緩解",
   summary:"新台幣兌美元在32.8-33.1元區間整理，終止連續貶值態勢。壽險型金控避險成本壓力略有緩解，國泰金、富邦金等美元資產部位龐大但已做好避險，影響有限。",
   sentiment:"neu",related:["2882","2881","2886","2884","2885","2880","2887"]},
  {cls:"macro",tagClass:"macro",tag:"總經",time:"今日",date:"2026-05-04",
   title:"台灣4月出口年增11.3%，半導體、AI供應鏈帶動亮眼表現",
   summary:"財政部公布4月出口達412億美元，年增11.3%，為連續6個月正成長。AI供應鏈、半導體產品出口大增為主要動能，對中國出口亦回升。法人看好5月出口維持正成長格局。",
   sentiment:"pos",related:["2330","2382","2317","2308"]},
  {cls:"semi",tagClass:"semi",tag:"半導體",time:"今日",date:"2026-05-04",
   title:"CoWoS供需缺口仍在，日月光、欣興營運補漲動能強",
   summary:"AI晶片對CoWoS先進封裝需求爆發，缺口估計達20-30%。日月光與欣興同步擴充CoWoS相關產能，封測族群旺季效應可期，股價近期相對大盤抗跌。",
   sentiment:"pos",related:["2330"]},
  {cls:"aero",tagClass:"aero",tag:"航空",time:"今日",date:"2026-05-04",
   title:"長榮航客貨運旺，Q2營運有望再創高峰",
   summary:"長榮航受惠於客運票价維持高檔、貨運AI伺服器出貨需求暢旺，法人估Q2營收將季增10-15%。航空雙雄（長榮航、華航）股價近期逆勢相對抗跌，暑假旅遊需求將持續挹注營收。",
   sentiment:"pos",related:["2618"]},
  {cls:"etf",tagClass:"etf",tag:"ETF",time:"今日",date:"2026-05-04",
   title:"0050、00878人氣續旺！高股息ETF低檔出現明顯買盤",
   summary:"台股區間整理，ETF投資人反而進場加碼，0050、00878等熱門ETF出現明顯買盤。理財達人建議，ETF定時定額紀律投資，在震盪時累積單位數是長期致勝關鍵。",
   sentiment:"neu",related:["0050","00878","00881"]},
  {cls:"macro",tagClass:"macro",tag:"總經",time:"昨日",date:"2026-05-03",
   title:"美科技財報多數優於預期，那斯達克週四創歷史新高",
   summary:"Meta、Alphabet、微軟等科技巨頭財報普遍繳出優於預期成績，AI 資本支出持續擴大，美科技股週四再創歷史新高。台灣供應鏈信心獲提振。",
   sentiment:"pos",related:["2330","2382","2317","2308"]},
  {cls:"semi",tagClass:"semi",tag:"半導體",time:"昨日",date:"2026-05-03",
   title:"台積電法說會：AI需求超預期，CoWoS產能2026年持續擴充",
   summary:"台積電法說會重點：(1) AI相關晶片需求超預期，(2) 3/5nm製程產能維持高利用率，(3) CoWoS先進封裝供不應求，(4) 2026年資本支出預期維持高水位。",
   sentiment:"pos",related:["2330"]},
  {cls:"macro",tagClass:"macro",tag:"總經",time:"2天前",date:"2026-05-02",
   title:"台灣4月PMI回升至53，製造業景氣重返擴張區",
   summary:"中經院公布4月台灣製造業PMI回升至53，為半年來首度進入擴張區間，其中新增訂單與員工僱用同步攀升，顯示景氣動能明顯回溫。",
   sentiment:"pos",related:[]},
  {cls:"ai",tagClass:"ai",tag:"AI",time:"2天前",date:"2026-05-02",
   title:"CoWoS供需缺口仍在，日月光、艾克爾持續擴充先進封裝",
   summary:"AI晶片對CoWoS先進封裝需求爆發，缺口估計達20-30%。日月光與艾克爾同步擴充CoWoS相關產能，封測族群旺季效應可期。",
   sentiment:"pos",related:["2330"]},
];

// ============================================================
// CONSTANTS
// ============================================================
const FAMILY_KEYS = ["👨 爸爸","👩 太太","👦 兒子 (大)","👦 兒子 (小)"];
const FAMILY_CLASS = {"👨 爸爸":"dad","👩 太太":"mom","👦 兒子 (大)":"son1","👦 兒子 (小)":"son2"};
const FAMILY_COLOR = {"👨 爸爸":"#4d9fff","👩 太太":"#b066ff","👦 兒子 (大)":"#00d68f","👦 兒子 (小)":"#ffb020"};
const ALL_TICKERS = [...new Set(Object.values(PORTFOLIOS).flatMap(a=>a.map(s=>s.code.replace('.TW',''))))];
const TAB_KEYS = {1:'overview',2:'stocks',3:'chart',4:'history',5:'signals',6:'news',7:'analytics'};

let pieChartInstance = null;
let historyChartInstance = null;
let historyFamilyChartInstance = null;
let currentSort = 'mv';
let currentSignalFilter = 'all';
let _holdingsCache = null;
let _signalsCache = [];
let _prevPrices = {};

function getAllHoldings(){
  if(_holdingsCache) return _holdingsCache;
  const h={};
  FAMILY_KEYS.forEach(m=>{
    loadMemberPortfolio(m).forEach(s=>{
      const t=s.code.replace('.TW','');
      if(!h[t])h[t]={name:s.name,industry:s.industry,shares:0,cost:0};
      h[t].shares+=s.shares;
      if(s.cost>0)h[t].cost+=s.cost*s.shares;
    });
  });
  return(_holdingsCache=h);
}
const sectionsBuilt=new Set();

// ============================================================
// UTILITIES
// ============================================================
function fmt(n){if(n>=1e6)return(n/1e6).toFixed(2)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n>0?Math.round(n).toLocaleString('zh-TW'):'0';}
function fmtTWD(n){return 'NT$'+Math.round(n).toLocaleString('zh-TW');}
function fmtTWDShort(n){
  if(n>=100000000)return(n/100000000).toFixed(1)+'億';
  if(n>=10000000)return(n/10000000).toFixed(1)+'千萬';
  if(n>=10000)return(n/10000).toFixed(0)+'萬';
  return Math.round(n).toLocaleString('zh-TW');
}
function fmtPct(n){return(n>=0?'+':'')+parseFloat(n).toFixed(2)+'%';}
function fmtPrice(n){return n>=1000?Math.round(n).toLocaleString('zh-TW'):parseFloat(n).toFixed(2);}

function getPrice(code){
  const t=code.replace('.TW','');
  return PRICE_DATA[t]||{price:0,year_high:0,year_low:0,prev_close:0};
}

function getFundamental(code){
  const t=code.replace('.TW','');
  return FUNDAMENTALS[t]||{trailingPE:null,dividendYield:null};
}

function getNameByCode(code){
  return getAllHoldings()[code.replace('.TW','')]?.name||code.replace('.TW','');
}

function getIndustryByCode(code){
  const t=code.replace('.TW','');
  for(const member of Object.values(PORTFOLIOS)){
    const s=member.find(x=>x.code.replace('.TW','')===t);
    if(s)return s.industry;
  }
  return '';
}

function showToast(msg,duration=2500){
  const container=document.getElementById('toastContainer')||(function(){
    const c=document.createElement('div');c.id='toastContainer';c.className='toast-container';document.body.appendChild(c);return c;
  })();
  const t=document.createElement('div');t.className='toast';t.textContent=msg;
  container.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(10px)';setTimeout(()=>t.remove(),300);},duration);
}

function animateChange(el){
  if(!el)return;
  el.classList.remove('num-changed');
  void el.offsetWidth;
  el.classList.add('num-changed');
}

// Animated counter for total portfolio value
function animateTotalValueCounter(){
  const el=document.getElementById('totalValue');
  if(!el) return;
  const dates=Object.keys(HISTORY_DATA).sort();
  const todayKey=dates[dates.length-1];
  const totalMV=HISTORY_DATA[todayKey]?.Total||0;
  const prevKey=dates.length>=2?dates[dates.length-2]:todayKey;
  const prevMV=HISTORY_DATA[prevKey]?.Total||totalMV;
  const startVal=Math.max(0,totalMV-(totalMV-prevMV)*0.5); // Start at midpoint
  const duration=1200;
  const startTime=performance.now();
  function tick(now){
    const elapsed=now-startTime;
    const progress=Math.min(1,elapsed/duration);
    const ease=1-Math.pow(1-progress,3);
    const current=startVal+(totalMV-startVal)*ease;
    el.textContent=fmtTWD(current);
    if(progress<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  animateChange(el);
}

// ============================================================
// LOCAL STORAGE
// ============================================================
function loadMemberPortfolio(member){
  try{const s=localStorage.getItem('portfolio_'+member);return s?JSON.parse(s):PORTFOLIOS[member]||[];}
  catch{return PORTFOLIOS[member]||[];}
}
function saveMemberPortfolio(member,data){
  try{localStorage.setItem('portfolio_'+member,JSON.stringify(data));}catch(e){}
}
function loadFromJSON(key,fallback){
  try{const s=localStorage.getItem(key);return s?JSON.parse(s):fallback;}catch{return fallback;}
}

// ============================================================
// PORTFOLIO ALERT BANNER
// ============================================================
function buildPortfolioAlertBanner(){
  const allHoldings=getAllHoldings();
  const dates=Object.keys(HISTORY_DATA).sort();
  const todayKey=dates[dates.length-1];
  const prevKey=dates.length>=2?dates[dates.length-2]:todayKey;
  const today=HISTORY_DATA[todayKey]?.Total||0;
  const prev=HISTORY_DATA[prevKey]?.Total||today;
  const dayChg=today-prev;
  const dayPct=prev>0?(dayChg/prev*100):0;

  // Find biggest movers
  let maxUp={name:'',pct:-999}, maxDown={name:'',pct:999};
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);
    if(!p.price||!p.prev_close)return;
    const chg=((p.price-p.prev_close)/p.prev_close*100);
    if(chg>maxUp.pct){maxUp={name:d.name||t, pct:chg, ticker:t};}
    if(chg<maxDown.pct){maxDown={name:d.name||t, pct:chg, ticker:t};}
  });

  const banner=document.getElementById('portfolioAlertBanner');
  const title=document.getElementById('alertBannerTitle');
  const text=document.getElementById('alertBannerText');
  if(!banner||!title||!text)return;

  // Determine market context
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const tsla=MARKET_INDICES.find(i=>i.ticker==='2330.TW');
  const isDown=dayPct<-0.3;
  const isUp=dayPct>0.3;
  // Use local variable to avoid referencing outer scope
  const totalVals=dates.map(d=>HISTORY_DATA[d]?.Total||0);
  const maxVal=Math.max(...totalVals);
  const localIsNewHigh=today>=maxVal;

  if(localIsNewHigh){
    title.textContent='🎉 歷史新高';
    text.textContent=`總市值突破 NT$${Math.round(today/10000)*(10000).toLocaleString('zh-TW')}萬！`;
    banner.style.background='linear-gradient(90deg,rgba(255,176,32,0.12),rgba(255,176,32,0.04))';
    banner.style.borderBottom='1px solid rgba(255,176,32,0.2)';
    title.style.color='var(--amber)';
  } else if(isDown){
    title.textContent='📉 今日承壓';
    text.textContent=`加權指數下跌 ${Math.abs(twii?.changePct||0).toFixed(2)}%，組合日減 NT$${Math.abs(Math.round(dayChg)).toLocaleString('zh-TW')}`;
    banner.style.background='linear-gradient(90deg,rgba(255,68,68,0.08),rgba(255,68,68,0.02))';
    banner.style.borderBottom='1px solid rgba(255,68,68,0.12)';
    title.style.color='var(--red)';
  } else if(isUp){
    title.textContent='📈 今日表現佳';
    text.textContent=`日增 NT$${Math.abs(Math.round(dayChg)).toLocaleString('zh-TW')} (${dayPct>=0?'+':''}${dayPct.toFixed(2)}%)，台積電 ${tsla&&tsla.changePct>=0?'▲':'▼'} ${Math.abs(tsla?.changePct||0).toFixed(2)}%`;
    title.style.color='var(--green)';
  } else {
    title.textContent='⚡ 市場快訊';
    const topNews=NEWS_DATA[0];
    text.textContent=topNews?`「${topNews.title.substring(0,40)}...」`:'組合持穩，注意分散風險';
    title.style.color='var(--blue)';
  }
  banner.style.display='flex';
}

// Market Context Banner — shows last trading day context
function buildMarketContextBanner(){
  const el=document.getElementById('marketContextBannerTop');
  if(!el)return;
  const dates=Object.keys(HISTORY_DATA).sort();
  const lastDate=dates[dates.length-1]||'';
  const lastTradingData=HISTORY_DATA[lastDate]||{};
  const prevDate=dates.length>=2?dates[dates.length-2]:null;
  const prevData=prevDate?HISTORY_DATA[prevDate]:null;
  const totalMV=lastTradingData.Total||0;
  const prevMV=prevData?.Total||totalMV;
  const portfolioDayChg=prevMV>0?((totalMV-prevMV)/prevMV*100):0;

  const allHoldings=getAllHoldings();
  let totalStocks=0,winners=0,totalPrevMV=0,totalCurMV=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);if(!p.price)return;
    totalStocks++;
    totalCurMV+=d.shares*p.price;
    totalPrevMV+=d.shares*(p.prev_close||p.price);
    if(p.price>p.prev_close)winners++;
  });
  const dayChg=totalPrevMV>0?((totalCurMV-totalPrevMV)/totalPrevMV*100):0;
  const twii=Object.values(MARKET_INDICES).find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiChg=twii?.changePct||0;
  const alpha=dayChg-twiiChg;
  const loserCount=totalStocks-winners;
  const chgColor=dayChg>=0?'var(--green)':'var(--red)';
  const chgIcon=dayChg>=0?'▲':'▼';
  const alphaColor=alpha>=0?'var(--green)':'var(--red)';

  let lastDayStr='';
  if(lastDate){
    const d=new Date(lastDate+'T00:00:00');
    lastDayStr=d.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric'});
  }

  el.innerHTML=`
    <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
      <span style="font-size:1rem">📊</span>
      <div>
        <div style="font-size:0.58rem;color:var(--text3)">上次收盤</div>
        <div style="font-weight:700;font-family:var(--font-mono);font-size:0.78rem">${lastDayStr||'--'}</div>
      </div>
    </div>
    <div style="width:1px;height:28px;background:var(--border);flex-shrink:0"></div>
    <div>
      <div style="font-size:0.58rem;color:var(--text3)">組合日報酬</div>
      <div style="font-weight:700;font-family:var(--font-mono);font-size:0.78rem;color:${chgColor}">${chgIcon} ${Math.abs(dayChg).toFixed(2)}%</div>
    </div>
    <div style="width:1px;height:28px;background:var(--border);flex-shrink:0"></div>
    <div>
      <div style="font-size:0.58rem;color:var(--text3)">加權指數</div>
      <div style="font-weight:700;font-family:var(--font-mono);font-size:0.78rem">${twiiChg>=0?'▲':'▼'} ${Math.abs(twiiChg).toFixed(2)}%</div>
    </div>
    <div style="width:1px;height:28px;background:var(--border);flex-shrink:0"></div>
    <div>
      <div style="font-size:0.58rem;color:var(--text3)">α 超額</div>
      <div style="font-weight:700;font-family:var(--font-mono);font-size:0.78rem;color:${alphaColor}">${alpha>=0?'+':''}${alpha.toFixed(2)}%</div>
    </div>
    <div style="width:1px;height:28px;background:var(--border);flex-shrink:0"></div>
    <div>
      <div style="font-size:0.58rem;color:var(--text3)">漲/跌</div>
      <div style="font-weight:700;font-size:0.78rem"><span style="color:var(--green)">${winners}↑</span> / <span style="color:var(--red)">${loserCount}↓</span></div>
    </div>
    <div style="margin-left:auto;display:flex;align-items:center;gap:6px">
      <span id="marketAlertTag" style="font-size:0.62rem;color:var(--amber);background:rgba(255,176,32,0.1);padding:2px 8px;border-radius:10px;border:1px solid rgba(255,176,32,0.2)">⚠️ 載入中</span>
    </div>
  `;
  // Dynamic market alert
  const alertTag = document.getElementById('marketAlertTag');
  if(alertTag){
    const tsla = MARKET_INDICES.find(i=>i.ticker==='2330.TW');
    const tslaPct = tsla?.changePct||0;
    const twiiPct = (MARKET_INDICES.find(i=>i.ticker==='^TWII')||{}).changePct||0;
    let msg = '';
    const localDayChg = portfolioDayChg; // use local var to avoid scope confusion
    const localIsNewHigh = today >= Math.max(...dates.map(d=>HISTORY_DATA[d]?.Total||0));
    if(localDayChg < -1.5) msg = '組合大跌 ' + Math.abs(localDayChg).toFixed(1) + '%';
    else if(tslaPct < -3) msg = '台積電重挫 ' + Math.abs(tslaPct).toFixed(1) + '%';
    else if(twiiPct < -1) msg = '大盤下跌 ' + Math.abs(twiiPct).toFixed(1) + '%';
    else if(localDayChg > 1.5) msg = '組合大漲 +' + localDayChg.toFixed(1) + '%';
    else if(localIsNewHigh) msg = '創歷史新高！';
    else { alertTag.style.display='none'; return; }
    alertTag.textContent = '⚠️ ' + msg;
  }
}

// ============================================================
// MARKET STATUS
// ============================================================
function updateMarketStatus(){
  const taipeiStr=new Date().toLocaleString('en-US',{timeZone:'Asia/Taipei'});
  const taipeiDate=new Date(taipeiStr);
  const h=taipeiDate.getHours();
  const mins=taipeiDate.getMinutes();
  const timeInMins=h*60+mins;
  const day=taipeiDate.getDay();
  const banner=document.getElementById('statusBanner');
  const status=document.getElementById('marketStatus');
  const dateEl=document.getElementById('marketDate');
  const dateStr=taipeiDate.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',weekday:'short'});

  const isWeekend=day===0||day===6;
  const isWeekday=day>=1&&day<=5;
  const marketOpen=isWeekday&&timeInMins>=540&&timeInMins<930; // 9:00-15:30
  const isPre=isWeekday&&timeInMins>=510&&timeInMins<540; // 8:30-9:00
  const isAfter=isWeekday&&timeInMins>=930&&timeInMins<960; // 15:30-16:00

  if(isWeekend){
    banner.className='status-banner weekend';
    status.textContent='台股市場休市中';
    // Show next trading day
    const nextDate=new Date(taipeiDate);
    nextDate.setDate(nextDate.getDate()+(day===6?2:1));
    const nextStr=nextDate.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',weekday:'short'});
    dateEl.textContent=dateStr+' · 下一交易: '+nextStr;
  }else if(marketOpen){
    banner.className='status-banner open';
    status.textContent='台股市場交易中 🔴';
    dateEl.textContent=dateStr;
  }else if(isPre){
    banner.className='status-banner upcoming';
    status.textContent='台股即將開盤';
    dateEl.textContent=dateStr+' · 盤前 8:30';
  }else if(isAfter){
    banner.className='status-banner closed';
    status.textContent='台股盤後揭示中';
    dateEl.textContent=dateStr;
  }else{
    banner.className='status-banner closed';
    status.textContent='台股市場已收盤';
    dateEl.textContent=dateStr+' · 下一交易日 9:00';
  }
  // Last trading day note
  const lastTdEl=document.getElementById('lastTradingDayNote');
  if(lastTdEl){
    const dates=Object.keys(HISTORY_DATA).sort();
    const lastDate=dates[dates.length-1]||'';
    if(lastDate){
      const d=new Date(lastDate+'T00:00:00');
      const dStr=d.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric'});
      lastTdEl.textContent='📌 最後實際交易日: '+dStr+' ('+(isWeekend?'下個交易日收盤後更新':'明日 '+nextStr+' 收盤後更新')+')';
    }
  }
}

// ============================================================
// HEADER UPDATE
// ============================================================
function updateHeader(){
  const dates=Object.keys(HISTORY_DATA).sort();
  const todayKey=dates[dates.length-1];
  const yesterdayKey=dates.length>=2?dates[dates.length-2]:todayKey;
  const today=HISTORY_DATA[todayKey];
  if(!today)return;
  const total=today.Total;
  const yesterday=HISTORY_DATA[yesterdayKey]?.Total||total;
  const chg=total-yesterday;
  const chgPct=(chg/yesterday)*100;

  // Animated counter on first load
  const el=document.getElementById('totalValue');
  if(el&&el.textContent==='--'){
    animateTotalValueCounter();
  } else {
    el.textContent=fmtTWD(total);
  }

  const chgEl=document.getElementById('totalChange');
  chgEl.textContent=(chg>=0?'▲ ':'▼ ')+fmtTWD(Math.abs(chg))+' ('+fmtPct(chgPct)+')';
  chgEl.className='navbar-stat-change '+(chg>=0?'up':'down');
  if(chg<0)chgEl.classList.add('down','glow');else chgEl.classList.remove('down','glow');

  const lu=document.getElementById('lastUpdated');
  lu.textContent=new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});

  // Update TAIEX in navbar
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiEl=document.getElementById('navbarTWII');
  const twiiVal=document.getElementById('twiiValue');
  const twiiChgEl=document.getElementById('twiiChange');
  if(twii&&twiiEl&&twiiVal&&twiiChgEl){
    twiiEl.style.display='block';
    twiiVal.textContent=Math.round(twii.price).toLocaleString('zh-TW');
    twiiChgEl.textContent=(twii.change>=0?'▲ ':'▼ ')+Math.abs(twii.change).toFixed(2)+' ('+fmtPct(twii.changePct)+')';
    twiiChgEl.className='navbar-stat-change '+(twii.change>=0?'up':'down');
  }
}

// ============================================================
// GLOBAL SUMMARY
// ============================================================
function updateGlobalSummary(){
  const allHoldings=getAllHoldings();
  let totalMV=0,totalCost=0,totalPrevMV=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);
    if(p.price>0){totalMV+=d.shares*p.price; totalCost+=d.cost; totalPrevMV+=d.shares*(p.prev_close||p.price);}
  });
  const gain=totalMV-totalCost;
  const gainPct=totalCost>0?(gain/totalCost*100):0;
  const dayChg=totalMV-totalPrevMV;
  const dayPct=totalPrevMV>0?(dayChg/totalPrevMV*100):0;

  animateChange(document.getElementById('gsMV'));
  document.getElementById('gsMV').textContent=fmtTWD(totalMV);
  document.getElementById('gsCost').textContent=fmtTWD(totalCost);
  const gEl=document.getElementById('gsGain');
  gEl.textContent=(gain>=0?'+':'')+fmtTWD(gain);
  gEl.className='gs-value '+(gain>=0?'up':'down');
  const gpEl=document.getElementById('gsGainPct');
  gpEl.textContent=fmtPct(gainPct);
  gpEl.className='gs-sub '+(gain>=0?'up':'down');

  const dEl=document.getElementById('gsDay');
  dEl.textContent=(dayChg>=0?'+':'')+fmtTWD(dayChg);
  dEl.className='gs-value '+(dayChg>=0?'up':'down');
  const dpEl=document.getElementById('gsDayPct');
  dpEl.textContent=fmtPct(dayPct);
  dpEl.className='gs-sub '+(dayPct>=0?'up':'down');

  const badge=document.getElementById('portfolioBadge');
  badge.textContent=fmtPct(gainPct);
  badge.className='card-badge '+(gainPct>=0?'up':'down');

  const dates=Object.keys(HISTORY_DATA).sort();
  if(dates.length>=2){
    const firstKey=dates[0];
    const lastKey=dates[dates.length-1];
    const firstTotal=HISTORY_DATA[firstKey]?.Total||0;
    const lastTotal=HISTORY_DATA[lastKey]?.Total||totalMV;
    const sinceGain=lastTotal-firstTotal;
    const sincePct=firstTotal>0?(sinceGain/firstTotal*100):0;
    const sEl=document.getElementById('gsSinceStart');
    sEl.textContent=(sinceGain>=0?'+':'')+fmtTWD(sinceGain);
    sEl.className='gs-value '+(sinceGain>=0?'up':'down');
    const spEl=document.getElementById('gsSinceStartPct');
    spEl.textContent=fmtPct(sincePct);
    spEl.className='gs-sub '+(sincePct>=0?'up':'down');

    const firstDate=new Date(firstKey);
    const lastDate=new Date(lastKey);
    const diffMs=lastDate-firstDate;
    const diffDays=Math.floor(diffMs/(1000*60*60*24));
    const yrs=(diffDays/365.25).toFixed(1);
    const elDays=document.getElementById('gsHoldingDays');
    elDays.textContent=`${diffDays}天 (${yrs}年)`;
  }
}

// ============================================================
// FAMILY CARDS
// ============================================================
function updateFamilyCards(){
  const el=document.getElementById('familyCards');
  const dates=Object.keys(HISTORY_DATA).sort();
  const todayKey=dates[dates.length-1];
  const yesterdayKey=dates.length>=2?dates[dates.length-2]:todayKey;
  const today=HISTORY_DATA[todayKey];
  const yesterday=HISTORY_DATA[yesterdayKey];
  const totalToday=today?.Total||0;
  const totalYesterday=yesterday?.Total||totalToday;
  el.innerHTML=FAMILY_KEYS.map(m=>{
    const cls=FAMILY_CLASS[m];
    const avatar={'👨 爸爸':'👨','👩 太太':'👩','👦 兒子 (大)':'👦','👦 兒子 (小)':'👶'}[m];
    const mv=today?.[m]||0;
    const mvY=yesterday?.[m]||mv;
    const chg=mv-mvY;
    const pct=totalToday>0?(mv/totalToday*100):0;
    const chgPct=mvY>0?(chg/mvY*100):0;
    const shortName={'👨 爸爸':'爸爸','👩 太太':'太太','👦 兒子 (大)':'兒子(大)','👦 兒子 (小)':'兒子(小)'}[m];
    const mData=loadMemberPortfolio(m);
    const cost2=mData.reduce((s,st)=>s+(st.cost>0?st.cost*st.shares:0),0);
    const gain2=mv-cost2;
    const gainPct2=cost2>0?(gain2/cost2*100):0;
    return `<div class="family-card ${cls}">
      <div class="family-card-avatar">${avatar}</div>
      <div class="family-card-name">${shortName}</div>
      <div class="family-card-cost" style="font-size:0.58rem;color:var(--text3)">成本 ${fmtTWD(cost2||0)}</div>
      <div class="family-card-amount">${fmtTWD(mv)}</div>
      <div class="family-card-pct">佔比 <span>${pct.toFixed(1)}%</span></div>
      <div class="family-card-change ${chgPct>=0?'up':'down'}">${chgPct>=0?'▲':'▼'} ${fmtPct(chgPct)}</div>
      <div class="family-card-daily ${chg>=0?'text-green':'text-red'}">${chg>=0?'+':''}${fmtTWD(Math.abs(chg))}</div>
      <div class="family-card-gain ${gain2>=0?'text-green':'text-red'}">(${gain2>=0?'+':''}${fmtPct(gainPct2)})</div>
    </div>`;
  }).join('');
}

// ============================================================
// TOP MOVERS
// ============================================================
function buildMoverCards(){
  const allHoldings=getAllHoldings();
  const items=Object.entries(allHoldings)
    .map(([t,d])=>{
      const p=getPrice(t);
      const mv=d.shares*(p.price||0);
      const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
      return{ticker:t,name:d.name,mv,chgPct};
    })
    .filter(d=>d.mv>0);

  const winners=[...items].sort((a,b)=>b.chgPct-a.chgPct).slice(0,5);
  const losers=[...items].sort((a,b)=>a.chgPct-b.chgPct).slice(0,5);

  const el=document.getElementById('moverCards');
  el.innerHTML=`
    <div class="mover-section">
      <div class="mover-section-title up">📈 今日強勢股</div>
      ${winners.map(d=>`
        <div class="mover-row" onclick="jumpToChart('${d.ticker}')">
          <div class="mover-ticker" style="color:var(--green)">${d.ticker}</div>
          <div class="mover-name">${d.name}</div>
          <div class="mover-pct text-green">${fmtPct(d.chgPct)}</div>
        </div>`).join('')}
    </div>
    <div class="mover-section">
      <div class="mover-section-title down">📉 今日弱勢股</div>
      ${losers.map(d=>`
        <div class="mover-row" onclick="jumpToChart('${d.ticker}')">
          <div class="mover-ticker" style="color:var(--red)">${d.ticker}</div>
          <div class="mover-name">${d.name}</div>
          <div class="mover-pct text-red">${fmtPct(d.chgPct)}</div>
        </div>`).join('')}
    </div>`;
}

// ============================================================
// DAILY P/L SUMMARY
// ============================================================
function buildDailyPLSummary(){
  const allHoldings=getAllHoldings();
  const today=new Date().toISOString().split('T')[0];
  const yesterday=Object.keys(HISTORY_DATA).sort().pop();
  const histToday=HISTORY_DATA[today];
  const histYest=HISTORY_DATA[yesterday];

  let totalMV=0,totalPrevMV=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);if(!p.price)return;
    totalMV+=d.shares*p.price;
    totalPrevMV+=d.shares*(p.prev_close||p.price);
  });

  const dayGain=totalMV-totalPrevMV;
  const dayGainPct=totalPrevMV>0?(dayGain/totalPrevMV*100):0;
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiChg=twii?.changePct||0;
  const alpha=dayGainPct-twiiChg;
  const winStocks=Object.entries(allHoldings).filter(([t,d])=>{
    const p=getPrice(t);return p.price&&p.prev_close&&p.price>p.prev_close;
  }).length;
  const totalStocks=Object.keys(allHoldings).filter(t=>getPrice(t).price>0).length;
  const prevDayHist=histYest?histYest.Total:null;
  const histGain=prevDayHist?totalMV-prevDayHist:dayGain;
  const histGainPct=prevDayHist>0?(histGain/prevDayHist*100):dayGainPct;

  const el=document.getElementById('dailyPLSummary');
  if(!el)return;
  const dayColor=dayGain>=0?'var(--green)':'var(--red)';
  const dayBg=dayGain>=0?'rgba(0,214,143,0.08)':'rgba(255,68,68,0.08)';
  const alphaColor=alpha>=0?'var(--green)':'var(--red)';
  el.innerHTML=`
    <div class="dpl-row">
      <div class="dpl-main">
        <div style="font-size:0.62rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px">今日帳面 P/L</div>
        <div style="font-size:1.5rem;font-weight:800;font-family:var(--font-mono);color:${dayColor}">
          ${dayGain>=0?'+':''}${fmtTWDShort(dayGain)}
        </div>
        <div style="font-size:0.78rem;font-weight:700;font-family:var(--font-mono);color:${dayColor};margin-top:1px">
          ${dayGain>=0?'+':''}${dayGainPct.toFixed(2)}%
        </div>
      </div>
      <div class="dpl-divider"></div>
      <div class="dpl-stat">
        <div style="font-size:0.58rem;color:var(--text3)">vs TAIEX</div>
        <div style="font-size:0.85rem;font-weight:700;font-family:var(--font-mono);color:${alphaColor}">
          ${alpha>=0?'+':''}${alpha.toFixed(2)}%
        </div>
        <div style="font-size:0.6rem;color:var(--text3)">α 超額報酬</div>
      </div>
      <div class="dpl-divider"></div>
      <div class="dpl-stat">
        <div style="font-size:0.58rem;color:var(--text3)">勝出</div>
        <div style="font-size:0.85rem;font-weight:700;font-family:var(--font-mono);color:var(--text)">
          ${winStocks}/${totalStocks}
        </div>
        <div style="font-size:0.6rem;color:var(--text3)">檔上漲</div>
      </div>
      <div class="dpl-divider"></div>
      <div class="dpl-stat">
        <div style="font-size:0.58rem;color:var(--text3)">TAIEX</div>
        <div style="font-size:0.85rem;font-weight:700;font-family:var(--font-mono);color:${twiiChg>=0?'var(--green)':'var(--red)'}">
          ${twiiChg>=0?'+':''}${twiiChg.toFixed(2)}%
        </div>
        <div style="font-size:0.6rem;color:var(--text3)">${twii?.price||'--'}</div>
      </div>
    </div>
    <div class="dpl-bar-wrap">
      <div class="dpl-bar-label">
        <span>組合</span><span style="color:${dayColor}">${dayGainPct>=0?'+':''}${dayGainPct.toFixed(2)}%</span>
        <span style="margin-left:8px;color:var(--text3)">|</span>
        <span style="margin-left:8px">TAIEX</span><span style="color:${twiiChg>=0?'var(--green)':'var(--red)'}">${twiiChg>=0?'+':''}${twiiChg.toFixed(2)}%</span>
        <span style="margin-left:8px;color:var(--text3)">|</span>
        <span style="margin-left:8px;color:var(--text3)">α ${alpha>=0?'+':''}${alpha.toFixed(2)}%</span>
      </div>
      <div class="dpl-track">
        <div style="position:absolute;left:calc(${Math.min(100,((dayGainPct+5)/10*100))}% - 2px);top:-3px;width:4px;height:14px;background:${dayColor};border-radius:2px"></div>
        <div style="position:absolute;left:calc(${Math.min(100,((twiiChg+5)/10*100))}% - 2px);top:4px;width:4px;height:14px;background:${twiiChg>=0?'var(--green)':'var(--red)'};border-radius:2px;opacity:0.7"></div>
        <div class="dpl-fill" style="width:${Math.min(100,Math.max(0,(dayGainPct+5)/10*100))}%;background:${dayColor}"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.55rem;color:var(--text3);margin-top:2px">
        <span>-5%</span><span>0%</span><span>+5%</span>
      </div>
    </div>
  `;
}

// ============================================================
// TOP MOVERS (Overview chips)
// ============================================================
function buildTopMovers(){
  const el=document.getElementById('topMoversRow');
  const noteEl=document.getElementById('marketSummaryNote');
  if(!el)return;
  const allHoldings=getAllHoldings();
  const items=Object.entries(allHoldings)
    .map(([t,d])=>{
      const p=getPrice(t);
      const mv=d.shares*(p.price||0);
      const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
      return{ticker:t,name:d.name,mv,chgPct,price:p.price};
    })
    .filter(d=>d.mv>0);

  const winners=[...items].sort((a,b)=>b.chgPct-a.chgPct).slice(0,4);
  const losers=[...items].sort((a,b)=>a.chgPct-b.chgPct).slice(0,4);
  const combined=[...losers,...winners];

  el.innerHTML=combined.map(d=>`
    <div class="mover-chip ${d.chgPct<0?'mover-loser':'mover-gainer'}" onclick="jumpToChart('${d.ticker}')">
      <div class="mover-name">${d.name.length>4?d.name.substring(0,4):d.name}</div>
      <div class="mover-ticker">${d.ticker}</div>
      <div class="mover-price">${d.price>=1000?Math.round(d.price).toLocaleString('zh-TW'):d.price.toFixed(1)}</div>
      <div class="mover-change ${d.chgPct>=0?'up':'down'}">${d.chgPct>=0?'▲':'▼'} ${Math.abs(d.chgPct).toFixed(2)}%</div>
    </div>`).join('');

  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiPct=twii?.changePct||0;
  const topLoser=losers[0];
  const topWinner=winners[0];
  if(noteEl){
    const sectorHint=topLoser?.chgPct<-2?'空方主導，半導體、金融族群全線走低':topWinner?.chgPct>1?'多方占優，AI/科技股帶頭反攻':'市場震盪';
    noteEl.textContent=`📌 加權指數今日 ${twiiPct>=0?'▲':'▼'} ${Math.abs(twiiPct).toFixed(2)}%，${sectorHint}`;
    noteEl.style.color=twiiPct<-1?'var(--red)':twiiPct>0.5?'var(--green)':'var(--text3)';
  }
}

// ============================================================
// PIE CHART
// ============================================================
function buildPie(){
  const allHoldings=getAllHoldings();
  const sorted=Object.entries(allHoldings)
    .map(([t,d])=>{const p=getPrice(t);return{ticker:t,name:d.name,industry:d.industry,mv:d.shares*(p.price||0)};})
    .filter(d=>d.mv>0)
    .sort((a,b)=>b.mv-a.mv);
  const top7=sorted.slice(0,7);
  const rest=sorted.slice(7).reduce((s,d)=>s+d.mv,0);
  if(rest>0)top7.push({ticker:'OTHER',name:'其他',industry:'',mv:rest});
  const colors=['#4d9fff','#00d68f','#b066ff','#ffb020','#00c9d4','#ff4444','#ff8c00','#666666'];
  if(pieChartInstance){
    pieChartInstance.data.labels=top7.map(d=>`${d.ticker} ${d.name}`);
    pieChartInstance.data.datasets[0].data=top7.map(d=>d.mv);
    pieChartInstance.data.datasets[0].backgroundColor=colors.slice(0,top7.length);
    pieChartInstance.update('none');
    return;
  }
  const ctx=document.getElementById('pieChart').getContext('2d');
  pieChartInstance=new Chart(ctx,{
    type:'doughnut',
    data:{
      labels:top7.map(d=>`${d.ticker} ${d.name}`),
      datasets:[{
        data:top7.map(d=>d.mv),
        backgroundColor:colors,
        borderColor:'#1a1a1a',borderWidth:2,
        hoverOffset:6
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{
        legend:{
          position:'right',labels:{
            color:'#9a9a9a',font:{size:11,family:'Noto Sans TC'},
            padding:8,boxWidth:12,boxHeight:12,
            generateLabels:function(chart){
              return chart.data.labels.map((l,i)=>({
                text:l.split(' ').slice(1).join(' ').substring(0,12),
                fillStyle:chart.data.datasets[0].backgroundColor[i],
                strokeStyle:chart.data.datasets[0].backgroundColor[i],
                hidden:false,index:i
              }));
            }
          }
        },
        tooltip:{
          callbacks:{
            label:function(ctx){
              const total=ctx.dataset.data.reduce((a,b)=>a+b,0);
              const pct=((ctx.raw/total)*100).toFixed(1);
              return ` ${fmtTWD(ctx.raw)} (${pct}%)`;
            },
            title:function(ctx){
              const label=ctx[0]?.label||'';
              const ticker=label.split(' ')[0];
              const p=getPrice(ticker);
              if(p.price){
                const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
                return `${label} - 現價$${p.price} (${chgPct>=0?'+':''}${chgPct.toFixed(2)}%)`;
              }
              return label;
            }
          }
        }
      },
      cutout:'52%',
      animation:{animateRotate:true,duration:600}
    }
  });
}

// ============================================================
// HOLDINGS SUMMARY
// ============================================================
function buildHoldingSummary(){
  const allHoldings=getAllHoldings();
  const sorted=Object.entries(allHoldings)
    .map(([t,d])=>{
      const p=getPrice(t);
      return{...d,ticker:t,mv:d.shares*(p.price||0),pct:0};
    })
    .filter(d=>d.mv>0)
    .sort((a,b)=>b.mv-a.mv)
    .slice(0,10);
  const total=sorted.reduce((s,d)=>s+d.mv,0);
  sorted.forEach(d=>d.pct=total>0?d.mv/total*100:0);
  const max=sorted[0]?.mv||1;
  const el=document.getElementById('holdingSummary');
  el.innerHTML=sorted.map((d,i)=>{
    const p=getPrice(d.ticker);
    const chg=p.prev_close?(p.price-p.prev_close):0;
    const chgPct=p.prev_close?(chg/p.prev_close*100):0;
    const barW=(d.mv/max*100).toFixed(1);
    return `<div class="holding-row">
      <div class="holding-left">
        <span class="rank-tag ${i===0?'top':''}">${i+1}</span>
        <span class="holding-ticker" onclick="jumpToChart('${d.ticker}')">${d.ticker}</span>
        <div>
          <div class="holding-name">${d.name}</div>
          <span class="industry-tag">${d.industry}</span>
        </div>
      </div>
      <div class="holding-right">
        <div class="holding-mv">${fmtTWD(d.mv)}</div>
        <div class="holding-pct ${chgPct>=0?'up':'down'}" style="color:var(--${chgPct>=0?'green':'red'})">${fmtPct(chgPct)}</div>
      </div>
    </div>`;
  }).join('');
}

// ============================================================
// SECTOR ALLOCATION
// ============================================================
function buildSectorList(){
  const sectors={};
  const allHoldings=getAllHoldings();
  Object.entries(allHoldings).forEach(([t,d])=>{const p=getPrice(t); const mv=d.shares*(p.price||0); if(mv<=0)return; if(!sectors[d.industry])sectors[d.industry]=0; sectors[d.industry]+=mv; });
  const total=Object.values(sectors).reduce((a,b)=>a+b,0);
  const sorted=Object.entries(sectors).sort((a,b)=>b[1]-a[1]);
  const sectorColors={'半導體':'#4d9fff','電子':'#00d68f','金融':'#b066ff','ETF':'#ffb020','航空':'#00c9d4','光學':'#ff8c00','電信':'#ff4444','化工':'#9966ff','營建':'#66cc99','鋼鐵':'#999999','其他':'#666666'};
  const el=document.getElementById('sectorList');
  el.innerHTML=sorted.map(([sec,mv])=>{
    const pct=total>0?(mv/total*100):0;
    const color=sectorColors[sec]||'#666666';
    return `<div class="sector-item">
      <div class="sector-name">${sec}</div>
      <div class="sector-bar-wrap">
        <div class="sector-bar" style="width:${pct.toFixed(1)}%;background:${color}"></div>
      </div>
      <div class="sector-pct">${pct.toFixed(1)}%</div>
    </div>`;
  }).join('');
}

// ============================================================
// PORTFOLIO METRICS
// ============================================================
function buildPortfolioMetrics(){
  const allHoldings=getAllHoldings();
  let totalCost=0,totalMV=0,winning=0,total=0;
  Object.entries(allHoldings).forEach(([t,d])=>{const p=getPrice(t); if(p.price<=0)return; totalMV+=d.shares*p.price; if(d.cost>0){totalCost+=d.cost; total++; if(d.shares*p.price>d.cost)winning++;} });
  const gainPct=totalCost>0?((totalMV-totalCost)/totalCost*100):0;
  const winRate=total>0?(winning/total*100):0;
  const stockCount=Object.keys(allHoldings).filter(t=>getPrice(t).price>0).length;
  const metrics=[
    {label:'總檔數',value:stockCount,sub:'含 ETF'},
    {label:'整體報酬',value:fmtPct(gainPct),sub:'成本法',up:gainPct>=0},
    {label:'勝率',value:winRate.toFixed(0)+'%',sub:'獲利/總檔數',up:winRate>=50},
    {label:'總市值',value:fmtTWD(totalMV),sub:'即時估值'},
    {label:'未實現損益',value:(totalMV>=totalCost?'+':'')+fmtTWD(totalMV-totalCost),sub:'成本 vs 市值',up:totalMV>=totalCost}
  ];
  const el=document.getElementById('portfolioMetrics');
  el.innerHTML=metrics.map(m=>`
    <div class="metric-box">
      <div class="metric-label">${m.label}</div>
      <div class="metric-value ${m.up===true?'up':m.up===false?'down':''}">${m.value}</div>
      <div class="metric-sub ${m.up===true?'up':m.up===false?'down':''}">${m.sub}</div>
    </div>
  `).join('');
}

// ============================================================
// CONCENTRATION
// ============================================================
function buildConcentration(){
  const allHoldings=getAllHoldings();
  const totalMV=Object.entries(allHoldings).reduce((s,[t,d])=>{
    const p=getPrice(t);
    return s+d.shares*(p.price||0);
  },0);
  const sorted=Object.entries(allHoldings)
    .map(([t,d])=>{const p=getPrice(t);return{ticker:t,name:d.name,mv:d.shares*(p.price||0)};})
    .filter(d=>d.mv>0)
    .sort((a,b)=>b.mv-a.mv)
    .slice(0,6);
  const max=sorted[0]?.mv||1;
  const el=document.getElementById('concentrationList');
  el.innerHTML=sorted.map((d,i)=>{
    const pct=totalMV>0?(d.mv/totalMV*100):0;
    const w=pct>=15?'var(--red)':pct>=8?'var(--amber)':'var(--green)';
    return `<div class="concentration-row">
      <div class="concentration-rank">${i+1}</div>
      <div class="concentration-ticker">${d.ticker}</div>
      <div class="concentration-track">
        <div class="concentration-fill" style="width:${(d.mv/max*100).toFixed(1)}%;background:${w}"></div>
      </div>
      <div class="concentration-pct" style="color:${w}">${pct.toFixed(1)}%</div>
    </div>`;
  }).join('');
}

// ============================================================
// SPARKLINE CHART
// ============================================================
let sparklineInstance = null;

function buildSparkline(){
  const canvas = document.getElementById('sparklineChart');
  if(!canvas) return;
  const dates = Object.keys(HISTORY_DATA).sort();
  const vals = dates.map(d => HISTORY_DATA[d]?.Total || 0).slice(-30);
  const labels = dates.slice(-30);

  if(sparklineInstance){ sparklineInstance.destroy(); sparklineInstance = null; }

  const isUp = vals.length >= 2 && vals[vals.length-1] >= vals[0];
  const lineColor = isUp ? '#00d68f' : '#ff4444';
  const fillColor = isUp ? 'rgba(0,214,143,0.15)' : 'rgba(255,68,68,0.15)';

  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 60);
  grad.addColorStop(0, fillColor);
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  sparklineInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: vals,
        borderColor: lineColor,
        borderWidth: 1.5,
        backgroundColor: grad,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: lineColor
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(26,26,26,0.98)',
          titleColor: '#9a9a9a',
          bodyColor: '#e8e8e8',
          borderColor: '#333',
          borderWidth: 1,
          callbacks: {
            label: ctx2 => ' ' + fmtTWD(ctx2.raw),
            title: titles => {
              if(!titles[0]) return '';
              const i = titles[0].dataIndex;
              const lbl = labels[i] || '';
              if(i === 0) return lbl;
              const prev = vals[i-1] || vals[i];
              const chg = ((vals[i]-prev)/prev*100).toFixed(2);
              return `${lbl} (${chg>=0?'+':''}${chg}%)`;
            }
          }
        }
      },
      scales: {
        x: { display: false },
        y: {
          display: false,
          min: Math.min(...vals) * 0.995,
          max: Math.max(...vals) * 1.005
        }
      },
      animation: { duration: 400 }
    }
  });

  // Period label
  const periodEl = document.getElementById('sparklinePeriod');
  if(periodEl && labels.length >= 2){
    const first = vals[0], last = vals[vals.length-1];
    const chgPct = ((last - first) / first * 100).toFixed(2);
    periodEl.textContent = `${chgPct >= 0 ? '▲' : '▼'} ${Math.abs(parseFloat(chgPct)).toFixed(2)}%`;
    periodEl.style.color = chgPct >= 0 ? 'var(--green)' : 'var(--red)';
  }
}

// ===========================================================
// PORTFOLIO HEALTH & BENCHMARK
// ============================================================
function buildPortfolioHealth(){
  const dates=Object.keys(HISTORY_DATA).sort();
  if(dates.length<2)return;
  const todayKey=dates[dates.length-1];
  const yesterdayKey=dates.length>=2?dates[dates.length-2]:todayKey;
  const today=HISTORY_DATA[todayKey];
  const yesterday=HISTORY_DATA[yesterdayKey];
  const totalMV=today?.Total||0;
  const totalPrev=yesterday?.Total||totalMV;
  const dayChg=totalMV-totalPrev;
  const dayPct=totalPrev>0?(dayChg/totalPrev*100):0;

  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiPct=twii?.changePct||0;
  const alpha=dayPct-twiiPct;

  const startTotal=HISTORY_DATA[dates[0]]?.Total||totalMV;
  const sinceChg=totalMV-startTotal;
  const sincePct=startTotal>0?(sinceChg/startTotal*100):0;

  const allHoldings=getAllHoldings();
  let winning=0,total=0,totalMV2=0,totalCost=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);if(!p.price)return;
    const mv=d.shares*p.price;totalMV2+=mv;
    if(d.cost>0){totalCost+=d.cost;total++;if(mv>d.cost)winning++;}
  });
  const winRate=total>0?(winning/total*100):0;
  const overallGain=totalMV2-totalCost;
  const overallGainPct=totalCost>0?(overallGain/totalCost*100):0;

  const el=document.getElementById('portfolioHealth');
  if(el){
    const healthItems=[
      {label:'日報酬',value:(dayPct>=0?'+':'')+dayPct.toFixed(2)+'%',sub:'vs TAIEX '+(twiiPct>=0?'+':'')+twiiPct.toFixed(2)+'%',up:dayPct>=0?true:dayPct<0?false:null},
      {label:'α 超額報酬',value:(alpha>=0?'+':'')+alpha.toFixed(2)+'%',sub:alpha>=0?'打敗大盤':'落後大盤',up:alpha>=0?true:alpha<0?false:null},
      {label:'總報酬',value:(sincePct>=0?'+':'')+sincePct.toFixed(2)+'%',sub:'自 2025-12-22',up:sincePct>=0?true:sincePct<0?false:null},
      {label:'勝率',value:winRate.toFixed(0)+'%',sub:winning+' 檔獲利/'+total+' 檔',up:winRate>=50?true:winRate<50?false:null},
      {label:'未實現損益',value:(overallGain>=0?'+':'')+Math.round(overallGain/10000).toFixed(0)+'萬',sub:'總成本 '+fmtTWD(totalCost),up:overallGain>=0?true:overallGain<0?false:null},
      {label:'組合市值',value:Math.round(totalMV/10000).toFixed(0)+'萬',sub:'勝率 '+winRate.toFixed(0)+'%',up:null},
    ];
    el.innerHTML=healthItems.map(m=>`
      <div class="ph-item">
        <div class="ph-label">${m.label}</div>
        <div class="ph-value ${m.up===true?'up':m.up===false?'down':''}">${m.value}</div>
        <div class="ph-sub ${m.up===true?'up':m.up===false?'down':''}">${m.sub}</div>
      </div>`).join('');
  }

  const benchEl=document.getElementById('benchmarkComparison');
  if(benchEl){
    const alphaColor=alpha>=0?'var(--green)':'var(--red)';
    const startTotal=HISTORY_DATA[dates[0]]?.Total||totalMV;

    benchEl.innerHTML=`
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px">
        <div class="benchmark-card">
          <div class="benchmark-icon">📊</div>
          <div class="benchmark-info">
            <div class="benchmark-name">今日組合報酬</div>
            <div class="benchmark-values">
              <span class="benchmark-portfolio" style="color:${dayPct>=0?'var(--green)':'var(--red)'}">${dayPct>=0?'+':''}${dayPct.toFixed(2)}%</span>
              <span class="benchmark-bench">TAIEX ${twiiPct>=0?'+':''}${twiiPct.toFixed(2)}%</span>
            </div>
          </div>
          <div class="benchmark-alpha" style="color:${alphaColor}">${alpha>=0?'+':''}${alpha.toFixed(2)}% α</div>
        </div>
        <div class="benchmark-card">
          <div class="benchmark-icon">📈</div>
          <div class="benchmark-info">
            <div class="benchmark-name">總累積報酬 (自 2025-12-22)</div>
            <div class="benchmark-values">
              <span class="benchmark-portfolio" style="color:${sincePct>=0?'var(--green)':'var(--red)'}">${sincePct>=0?'+':''}${sincePct.toFixed(2)}%</span>
              <span class="benchmark-bench">本金 ${fmtTWD(startTotal)}</span>
            </div>
          </div>
          <div class="benchmark-alpha" style="color:${overallGain>=0?'var(--green)':'var(--red)'}">${overallGain>=0?'+':''}${Math.round(overallGain/10000).toFixed(0)}萬</div>
        </div>
      </div>
      <div style="margin-top:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:0.62rem;color:var(--text3)">日報酬 vs TAIEX</span>
          <span style="font-size:0.68rem;font-weight:700;font-family:var(--font-mono);color:${alpha>=0?'var(--green)':'var(--red)'}">${alpha>=0?'▲':'▼'} ${Math.abs(alpha).toFixed(2)}%</span>
        </div>
        <div class="benchmark-row">
          <div class="benchmark-label" style="color:var(--blue)">組合</div>
          <div class="benchmark-track">
            <div class="benchmark-fill" style="width:${Math.min(100, Math.max(0, 50 + alpha * 10)).toFixed(1)}%;background:var(--blue)"></div>
            <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:#555"></div>
          </div>
          <div class="benchmark-value" style="color:${dayPct>=0?'var(--green)':'var(--red)'}">${dayPct>=0?'+':''}${dayPct.toFixed(2)}%</div>
        </div>
        <div class="benchmark-row">
          <div class="benchmark-label" style="color:var(--amber)">TAIEX</div>
          <div class="benchmark-track">
            <div class="benchmark-fill" style="width:50%;background:var(--amber)"></div>
            <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:#555"></div>
          </div>
          <div class="benchmark-value">${twiiPct>=0?'+':''}${twiiPct.toFixed(2)}%</div>
        </div>
      </div>`;
  }
}

// ============================================================
// DIVIDEND SUMMARY
// ============================================================
function buildDividendSummary(){
  const el=document.getElementById('dividendSummary');
  if(!el)return;
  const allHoldings=getAllHoldings();
  let totalDiv=0,totalMV=0,totalCost=0,count=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);if(!p.price)return;
    const mv=d.shares*p.price;const f=getFundamental(t);
    totalMV+=mv;totalCost+=d.cost;
    if(f.dividendYield&&f.dividendYield>0){totalDiv+=mv*(f.dividendYield/100);count++;}
  });

  const avgYield=totalMV>0?(totalDiv/totalMV*100):0;
  const annualDiv=totalDiv;
  const portfolioYield=totalCost>0?(annualDiv/totalCost*100):0;

  el.innerHTML=`
    <div class="div-item">
      <div class="div-label">加權平均殖利率</div>
      <div class="div-value">${avgYield.toFixed(2)}%</div>
      <div class="div-sub">${count} 檔有股息</div>
    </div>
    <div class="div-item">
      <div class="div-label">年化股息收入</div>
      <div class="div-value">${fmtTWDShort(annualDiv)}</div>
      <div class="div-sub">元 (預估)</div>
    </div>
    <div class="div-item">
      <div class="div-label">成本殖利率</div>
      <div class="div-value">${portfolioYield.toFixed(2)}%</div>
      <div class="div-sub">股息/總成本</div>
    </div>
  `;
}

// ============================================================
// DAILY P/L CARD
// ============================================================
function buildDailyPLCard(){
  const dates=Object.keys(HISTORY_DATA).sort();
  const todayKey=dates[dates.length-1];
  const yesterdayKey=dates.length>=2?dates[dates.length-2]:todayKey;
  const todayMV=HISTORY_DATA[todayKey]?.Total||0;
  const yesterdayMV=HISTORY_DATA[yesterdayKey]?.Total||todayMV;
  const dayChg=todayMV-yesterdayMV;
  const dayPct=yesterdayMV>0?(dayChg/yesterdayMV*100):0;
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiPct=twii?.changePct||0;
  const alpha=dayPct-twiiPct;

  const allHoldings=getAllHoldings();
  const winners=Object.entries(allHoldings).filter(([t,d])=>{
    const p=getPrice(t);return p.price&&p.prev_close&&p.price>p.prev_close;
  }).length;
  const totalStocks=Object.keys(allHoldings).filter(t=>getPrice(t).price>0).length;

  const iconEl=document.getElementById('dailyPLIcon');
  const plValEl=document.getElementById('dailyPLValue');
  const plSubEl=document.getElementById('dailyPLSub');
  const plPctEl=document.getElementById('dailyPLPct');
  const plPctSubEl=document.getElementById('dailyPLPctSub');
  const alphaEl=document.getElementById('dailyAlpha');
  const alphaSubEl=document.getElementById('dailyAlphaSub');
  const winCntEl=document.getElementById('dailyWinCount');
  const winSubEl=document.getElementById('dailyWinSub');

  const isUp=dayChg>=0;
  const icon=isUp?'📈':'📉';
  const color=isUp?'up':'down';
  const twiiArrow=twiiPct>=0?'▲':'▼';
  const alphaArrow=alpha>=0?'▲':'▼';
  const alphaColor=alpha>=0?'up':'down';

  if(iconEl)iconEl.textContent=icon;
  if(plValEl){
    plValEl.textContent=(dayChg>=0?'+':'')+fmtTWD(Math.abs(dayChg));
    plValEl.className='daily-pl-value '+color;
  }
  if(plSubEl){
    plSubEl.textContent='昨日 '+fmtTWDShort(yesterdayMV)+' → 今日 '+fmtTWDShort(todayMV);
    plSubEl.style.color=isUp?'var(--green)':'var(--red)';
  }
  if(plPctEl){
    plPctEl.textContent=(dayPct>=0?'+':'')+dayPct.toFixed(2)+'%';
    plPctEl.className='daily-pl-value '+color;
  }
  if(plPctSubEl){
    plPctSubEl.textContent='TAIEX '+twiiArrow+' '+Math.abs(twiiPct).toFixed(2)+'%';
  }
  if(alphaEl){
    alphaEl.textContent=(alpha>=0?'+':'')+alpha.toFixed(2)+'%';
    alphaEl.className='daily-pl-value '+alphaColor;
  }
  if(alphaSubEl){
    alphaSubEl.textContent=alpha>=0?'打敗大盤':'落後大盤';
    alphaSubEl.style.color=alpha>=0?'var(--green)':'var(--red)';
  }
  if(winCntEl){
    winCntEl.textContent=winners+'/'+totalStocks+' 檔';
    winCntEl.className='daily-pl-value '+(winners>totalStocks/2?'up':winners<totalStocks/2?'down':'neu');
  }
  if(winSubEl){
    winSubEl.textContent='上漲 '+winners+' 檔 · 下跌 '+(totalStocks-winners)+' 檔';
  }
}

// ============================================================
// PORTFOLIO GAUGE
// ============================================================
function buildPortfolioGauge(){
  const allHoldings=getAllHoldings();
  let totalMV=0,totalCost=0,totalPrevMV=0,winning=0,total=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t); if(!p.price)return;
    const mv=d.shares*p.price; const prevMV=d.shares*(p.prev_close||p.price);
    totalMV+=mv; totalPrevMV+=prevMV;
    if(d.cost>0){totalCost+=d.cost; total++; if(mv>d.cost)winning++;}
  });
  const dayChg=totalPrevMV>0?((totalMV-totalPrevMV)/totalPrevMV*100):0;
  const gain=totalMV-totalCost;
  const gainPct=totalCost>0?(gain/totalCost*100):0;
  const winRate=total>0?(winning/total*100):0;
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiChg=twii?.changePct||0;
  const alpha=dayChg-twiiChg;

  // Update gauge values
  const el=document.getElementById('gaugeMV');
  if(el){el.textContent=fmtTWDShort(totalMV);el.className=dayChg>=0?'up':'down';}
  const dayEl=document.getElementById('gaugeDay');
  if(dayEl){
    dayEl.textContent=(dayChg>=0?'+':'')+dayChg.toFixed(2)+'%';
    dayEl.style.color=dayChg>=0?'var(--green)':'var(--red)';
  }
  const alphaEl=document.getElementById('gaugeAlpha');
  if(alphaEl){
    alphaEl.textContent=(alpha>=0?'+':'')+alpha.toFixed(2)+'%';
    alphaEl.style.color=alpha>=0?'var(--green)':'var(--red)';
  }
  const winEl=document.getElementById('gaugeWin');
  if(winEl){
    winEl.textContent=winRate.toFixed(0)+'%';
    winEl.style.color=winRate>=50?'var(--green)':'var(--red)';
  }
  const moodEl=document.getElementById('gaugeMood');
  if(moodEl){
    const positiveCount=Object.entries(allHoldings).filter(([t,d])=>{
      const p=getPrice(t);return p.price&&p.prev_close&&p.price>p.prev_close;
    }).length;
    const pct=total>0?(positiveCount/total*100):50;
    const mood=pct>=70?'📈':pct>=55?'↗':pct>=45?'➡':pct>=30?'↘':'📉';
    const moodColor=pct>=55?'var(--green)':pct>=45?'var(--amber)':'var(--red)';
    moodEl.textContent=mood;
    moodEl.style.color=moodColor;
  }

  // Draw arc gauge (semi-circle from left=180° to right=0° via bottom)
  const canvas=document.getElementById('gaugeChart');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=160,H=100;
  canvas.width=W;canvas.height=H;
  const cx=80,cy=85,r=55;
  const startA=Math.PI,endA=0;
  const normVal=Math.max(-5,Math.min(5,dayChg))/5; // normalize to -1..1
  const angle=startA-normVal*(startA-endA); // counterclockwise from PI toward 0

  // Background arc
  ctx.beginPath();
  ctx.arc(cx,cy,r,startA,endA,false); // counterclockwise: PI→0 via bottom
  ctx.strokeStyle='#333';
  ctx.lineWidth=8;
  ctx.lineCap='round';
  ctx.stroke();

  // Value arc
  const valColor=dayChg>=0?'#00d68f':'#ff4444';
  ctx.beginPath();
  ctx.arc(cx,cy,r,startA,angle,false);
  ctx.strokeStyle=valColor;
  ctx.lineWidth=8;
  ctx.lineCap='round';
  ctx.stroke();

  // Center text
  ctx.fillStyle=valColor;
  ctx.font='bold 18px Consolas,monospace';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.fillText((dayChg>=0?'+':'')+dayChg.toFixed(1)+'%',cx,cy+2);
  ctx.fillStyle='#666';
  ctx.font='9px Inter,sans-serif';
  ctx.fillText('日報酬',cx,cy+16);
}

// ============================================================
// MARKET PULSE
// ============================================================
function buildMarketPulse(){
  const el=document.getElementById('marketPulse');
  if(!el) return;
  const allHoldings=getAllHoldings();

  const items=Object.entries(allHoldings)
    .map(([t,d])=>{
      const p=getPrice(t);
      const mv=d.shares*(p.price||0);
      const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
      return{ticker:t,name:d.name,mv,chgPct,price:p.price};
    })
    .filter(d=>d.mv>0);

  const winners=[...items].sort((a,b)=>b.chgPct-a.chgPct).slice(0,3);
  const losers=[...items].sort((a,b)=>a.chgPct-b.chgPct).slice(0,3);

  const dates=Object.keys(HISTORY_DATA).sort();
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiChg=twii?.changePct||0;
  const todayKey=dates[dates.length-1];
  const yesterdayKey=dates.length>=2?dates[dates.length-2]:todayKey;
  const todayMV=HISTORY_DATA[todayKey]?.Total||0;
  const yesterdayMV=HISTORY_DATA[yesterdayKey]?.Total||todayMV;
  const portfolioChg=yesterdayMV>0?((todayMV-yesterdayMV)/yesterdayMV*100):0;
  const alpha=portfolioChg-twiiChg;

  const updEl=document.getElementById('pulseUpdateTime');
  if(updEl)updEl.textContent=new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});

  el.innerHTML=`
    <div class="pulse-item">
      <div class="pulse-label">📈 最佳表現</div>
      <div class="pulse-value" style="color:var(--green)">${winners.map(w=>`${w.ticker} ${fmtPct(w.chgPct)}`).join(' · ')}</div>
    </div>
    <div class="pulse-item">
      <div class="pulse-label">📉 落後表現</div>
      <div class="pulse-value" style="color:var(--red)">${losers.map(l=>`${l.ticker} ${fmtPct(l.chgPct)}`).join(' · ')}</div>
    </div>
    <div class="pulse-item">
      <div class="pulse-label">📊 組合 vs 大盤</div>
      <div class="pulse-value">${fmtPct(portfolioChg)} <span style="color:var(--text3);font-size:0.7rem">TAIEX ${fmtPct(twiiChg)}</span></div>
      <div class="pulse-sub" style="color:${alpha>=0?'var(--green)':'var(--red)'}">α ${alpha>=0?'+':''}${alpha.toFixed(2)}%</div>
    </div>
    <div class="pulse-item">
      <div class="pulse-label">⚡ 市場氛圍</div>
      <div class="pulse-value">${winners.length>=losers.length?'偏多 📈':'偏空 📉'}</div>
      <div class="pulse-sub">${losers.length>winners.length?'成長股承壓':'AI/半導體領漲'}</div>
    </div>
  `;
}

// ============================================================

// ============================================================
// MARKET CONTEXT BANNER UPDATER
// ============================================================
function updateMarketContextBanner(){
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const sox=MARKET_INDICES.find(i=>i.ticker==='CBOE:SOX'||i.sym.includes('費半'));
  const spx=MARKET_INDICES.find(i=>i.ticker==='SP:SPX'||i.sym.includes('S&P'));
  const nasdaq=MARKET_INDICES.find(i=>i.ticker==='NASDAQ:IXIC'||i.sym.includes('NASDAQ'));

  // TAIEX
  const twiiEl=document.getElementById('mcTWII');
  if(twiiEl&&twii){
    const arrow=twii.changePct>=0?'▲':'▼';
    const color=twii.changePct>=0?'var(--green)':'var(--red)';
    twiiEl.innerHTML=`加權 <span style="color:${color}">${arrow} ${Math.abs(twii.changePct).toFixed(2)}%</span> <span style="color:var(--text3);font-size:0.62rem">${Math.round(twii.price).toLocaleString('zh-TW')}</span>`;
  }

  // SOX
  const soxEl=document.getElementById('mcSOX');
  if(soxEl&&sox){
    const arrow=sox.changePct>=0?'▲':'▼';
    const color=sox.changePct>=0?'var(--green)':'var(--red)';
    soxEl.innerHTML=`費半 <span style="color:${color}">${arrow} ${Math.abs(sox.changePct).toFixed(2)}%</span>`;
  } else {
    // Fallback: estimate from portfolio stocks
    const allHoldings=getAllHoldings();
    const semiStocks=['2330','2308','2382'];
    const semiChg=semiStocks.map(t=>{
      const p=getPrice(t);
      return p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
    }).filter(c=>c!==0);
    const avgSemiChg=semiChg.length>0?semiChg.reduce((a,b)=>a+b,0)/semiChg.length:0;
    const arrow=avgSemiChg>=0?'▲':'▼';
    const color=avgSemiChg>=0?'var(--green)':'var(--red)';
    if(soxEl) soxEl.innerHTML=`費半 <span style="color:${color}">${arrow} ${Math.abs(avgSemiChg).toFixed(2)}%</span>`;
  }

  // US Market
  const usEl=document.getElementById('mcUS');
  if(usEl){
    const usChg=nasdaq?.changePct||spx?.changePct||0;
    const arrow=usChg>=0?'▲':'▼';
    const color=usChg>=0?'var(--green)':'var(--red)';
    usEl.innerHTML=`美股 <span style="color:${color}">${arrow} ${Math.abs(usChg).toFixed(2)}%</span>`;
  }

  // Dynamic market theme based on sector performance
  const themeEl=document.getElementById('mcTheme');
  if(themeEl){
    const allHoldings=getAllHoldings();
    const semiStocks=['2330','2308','2382'];
    const finStocks=['2882','2881','2886','2884','2885','2880','2887'];
    const semiAvg=semiStocks.map(t=>{const p=getPrice(t);return p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;}).filter(c=>c!==0);
    const finAvg=finStocks.map(t=>{const p=getPrice(t);return p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;}).filter(c=>c!==0);
    const semiM=semiAvg.length>0?semiAvg.reduce((a,b)=>a+b)/semiAvg.length:0;
    const finM=finAvg.length>0?finAvg.reduce((a,b)=>a+b)/finAvg.length:0;
    let theme='區間整理';
    if(semiM<-1.5&&finM<-1)theme='全市場下跌 📉';
    else if(semiM<-1.5)theme='科技股領跌 💻';
    else if(finM<-1.5)theme='金融股承壓 🏦';
    else if(semiM>1)theme='AI/半導體領漲 🤖';
    else if(finM>1)theme='金融股強勢 💰';
    else if(semiM>0.5)theme='科技股偏多 💻';
    themeEl.textContent=theme;
  }

  // Update time
  const timeEl=document.getElementById('mcTime');
  if(timeEl) timeEl.textContent=new Date().toLocaleTimeString('zh-TW',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit'})+' 更新';
}


// SECTOR PULSE BARS
// ============================================================
function buildSectorPulseBars(){
  const el = document.getElementById('sectorPulseBars');
  if(!el) return;

  // Update the TAIEX label dynamically from MARKET_INDICES
  const twiiEl = document.getElementById('sectorTWIIPct');
  const twii = MARKET_INDICES.find(i => i.ticker === '^TWII');
  if(twiiEl && twii){
    const arrow = twii.changePct >= 0 ? '▲' : '▼';
    twiiEl.textContent = `加權指數 ${arrow} ${Math.abs(twii.changePct).toFixed(2)}%`;
  }

  const allHoldings = getAllHoldings();
  const sectorChg = {};
  Object.entries(allHoldings).forEach(([t,d]) => {
    const p = getPrice(t);
    if(!p.price || !p.prev_close) return;
    const chg = (p.price - p.prev_close) / p.prev_close * 100;
    const mv = d.shares * p.price;
    if(!sectorChg[d.industry]){ sectorChg[d.industry] = {wSum:0,totalMV:0}; }
    sectorChg[d.industry].wSum += chg * mv;
    sectorChg[d.industry].totalMV += mv;
  });
  const colors = {
    '半導體':'#4d9fff','電子':'#00d68f','金融':'#b066ff',
    'ETF':'#ffb020','航空':'#00c9d4','光學':'#ff8c00',
    '電信':'#ff4444','化工':'#9966ff','營建':'#66cc99',
    '鋼鐵':'#999999','其他':'#666666'
  };
  const sorted = Object.entries(sectorChg)
    .filter(([,d]) => d.totalMV > 0)
    .map(([s,d]) => ({sector:s, avgChg: d.wSum/d.totalMV}))
    .sort((a,b) => Math.abs(b.avgChg) - Math.abs(a.avgChg));

  el.innerHTML = sorted.map(s => {
    const col = s.avgChg >= 0 ? 'var(--green)' : 'var(--red)';
    const bg = s.avgChg >= 0 ? 'rgba(0,214,143,0.08)' : 'rgba(255,68,68,0.08)';
    const barCol = s.avgChg >= 0 ? 'var(--green)' : 'var(--red)';
    const w = Math.min(100, Math.abs(s.avgChg) * 20 + 20);
    return `<div style="display:flex;align-items:center;gap:5px;padding:3px 8px;background:${bg};border:1px solid ${col}22;border-radius:12px;min-width:max-content">
      <span style="font-size:0.62rem;font-weight:600;color:${colors[s.sector]||'var(--text2)'}">${s.sector}</span>
      <div style="width:${w}px;height:3px;background:${barCol};border-radius:2px;max-width:60px"></div>
      <span style="font-size:0.65rem;font-weight:700;color:${col};font-family:var(--font-mono)">${s.avgChg>=0?'+':''}${s.avgChg.toFixed(1)}%</span>
    </div>`;
  }).join('');
}

// ============================================================
// ACTIONABLE ALERTS
// ============================================================
function buildActionableAlerts(){
  const el=document.getElementById('actionableAlerts');
  if(!el)return;
  const allHoldings=getAllHoldings();
  const alerts=[];

  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);
    if(!p.price)return;
    const mv=d.shares*p.price;
    const cost=d.cost;
    const gain=mv-cost;
    const gainPct=cost>0?(gain/cost*100):0;
    const prevP=p.prev_close||p.price;
    const chgPct=prevP?((p.price-prevP)/prevP*100):0;
    const w52pct=p.year_low&&p.year_high?((p.price-p.year_low)/(p.year_high-p.year_low)*100):50;
    const f=getFundamental(t);
    const name=getNameByCode(t);

    if(w52pct>=95){
      alerts.push({icon:'🎯',title:`${t} 逼近 52 週高點 (${w52pct.toFixed(0)}%)`,desc:`${name} 現價 $${p.price}，距歷史高點僅 ${((p.year_high-p.price)/p.price*100).toFixed(1)}%。建議：可考慮分批了結部分獲利。`,badge:'高點警示',badgeColor:'var(--amber)',priority:5});
    }
    if(w52pct<=10){
      alerts.push({icon:'💡',title:`${t} 接近 52 週低點 (${w52pct.toFixed(0)}%)`,desc:`${name} 現價 $${p.price}，本益比 ${f.trailingPE||'--'}。若基本面無虞，可持續分批承接。`,badge:'低點關注',badgeColor:'var(--blue)',priority:4});
    }
    if(chgPct<=-3){
      alerts.push({icon:'📉',title:`${t} 今日重挫 ${(chgPct).toFixed(1)}%`,desc:`${name} 現價 $${p.price}，日跌 ${Math.abs(chgPct).toFixed(1)}%。需留意是否為系統性風險或基本面轉弱。`,badge:'⚠️ 注意',badgeColor:'var(--red)',priority:1});
    }
    if(chgPct>=3){
      alerts.push({icon:'🚀',title:`${t} 今日大漲 ${(chgPct).toFixed(1)}%`,desc:`${name} 現價 $${p.price}。注意是否為短線消息刺激，評估是否需適度了結。`,badge:'💰 關注',badgeColor:'var(--green)',priority:3});
    }
    if(gainPct<=-20&&cost>0){
      alerts.push({icon:'⚠️',title:`${t} 帳面虧損 ${(gainPct).toFixed(1)}%`,desc:`${name} 成本 $${(d.cost/d.shares).toFixed(1)} → 現價 $${p.price}。若基本面良好，可考慮持續持有或攤平。`,badge:'🚨 虧損警示',badgeColor:'var(--red)',priority:2});
    }
    if(gainPct>=50&&cost>0){
      alerts.push({icon:'💰',title:`${t} 已獲利 ${(gainPct).toFixed(1)}%`,desc:`${name} 成本 $${(d.cost/d.shares).toFixed(1)} → 現價 $${p.price}。建議：可設移動停利點。`,badge:'獲利了結',badgeColor:'var(--green)',priority:6});
    }
    if(f.trailingPE&&f.trailingPE>30&&gainPct>20){
      alerts.push({icon:'📊',title:`${t} 本益比偏高 (${f.trailingPE}×)`,desc:`${name} 本益比 ${f.trailingPE}×，股價已偏高。建議：評估成長性是否支持估值。`,badge:'估值警示',badgeColor:'var(--amber)',priority:7});
    }
  });

  // Sort: critical first, then by priority, limit to 8
  alerts.sort((a,b)=>{
    if(a.priority<=2&&b.priority>2)return-1;
    if(b.priority<=2&&a.priority>2)return 1;
    return a.priority-b.priority;
  });
  const top=alerts.slice(0,8);

  if(top.length===0){
    el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text3);font-size:0.75rem">目前無重大警示，組合狀態良好 ✅</div>';
    return;
  }

  el.innerHTML=top.map(a=>`
    <div class="actionable-alert" style="position:relative">
      <div class="aa-icon">${a.icon}</div>
      <div class="aa-content">
        <div class="aa-title">${a.title}</div>
        <div class="aa-desc">${a.desc}</div>
      </div>
      <div class="aa-badge" style="background:${a.badgeColor}22;color:${a.badgeColor};border:1px solid ${a.badgeColor}44">${a.badge}</div>
    </div>`).join('');
}

// ============================================================
// ALERTS (banner)
// ============================================================
// PORTFOLIO REBALANCING SUGGESTIONS
// ============================================================
function buildRebalancingSuggestions(){
  const el = document.getElementById('rebalancingSuggestions');
  if(!el) return;
  const allHoldings = getAllHoldings();
  const totalMV = Object.entries(allHoldings).reduce((s,[t,d])=>{
    const p=getPrice(t);
    return s + d.shares*(p.price||0);
  }, 0);
  if(totalMV <= 0){ el.innerHTML=''; return; }

  // Sector concentration check
  const sectorMV = {};
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t); const mv=d.shares*(p.price||0);
    if(mv>0){
      const sec = d.industry||'其他';
      sectorMV[sec] = (sectorMV[sec]||0) + mv;
    }
  });
  const sortedSector = Object.entries(sectorMV).sort((a,b)=>b[1]-a[1]);
  const topSector = sortedSector[0];
  const topSectorPct = topSector ? (topSector[1]/totalMV*100) : 0;

  // Concentration alerts
  const stockMVs = Object.entries(allHoldings).map(([t,d])=>{
    const p=getPrice(t); const mv=d.shares*(p.price||0);
    return{ticker:t,name:d.name,mv,pct:totalMV>0?mv/totalMV*100:0};
  }).filter(d=>d.mv>0).sort((a,b)=>b.pct-a.pct);

  const topStock = stockMVs[0];
  const topStockPct = topStock?.pct||0;

  // Single stock concentration risk
  let alerts = [];
  if(topStockPct > 25){
    alerts.push({
      icon:'⚠️',
      type:'red',
      title:'集中度過高：'+topStock.ticker+' 佔比 '+topStockPct.toFixed(1)+'%',
      desc:'建議：若願曝單一股票不超過 20%，可考慮將部分資金分散至 ETF（0050、00878）或降低持股。',
      color:'var(--red)'
    });
  }
  if(topSectorPct > 50){
    alerts.push({
      icon:'⚠️',
      type:'amber',
      title:'產業集中：'+topSector[0]+' 佔比 '+topSectorPct.toFixed(1)+'%',
      desc:'建議：半導體+電子佔比偏高，可考慮增加金融、傳產、ETF 配置以分散風險。',
      color:'var(--amber)'
    });
  }
  // No dividend stocks
  const noDivStocks = stockMVs.filter(d=>{
    const f=getFundamental(d.ticker);
    return !f.dividendYield || f.dividendYield === 0;
  });
  if(noDivStocks.length > 3){
    alerts.push({
      icon:'📋',
      type:'blue',
      title:'股息覆蓋率偏低',
      desc:noDivStocks.slice(0,3).map(s=>s.ticker).join('、')+' 等 '+noDivStocks.length+' 檔無股息。建議：增加高股息 ETF（如 00878）提升現金流。',
      color:'var(--blue)'
    });
  }
  // Suggest ETF diversification
  const etfStocks = stockMVs.filter(d=>['0050','00878','00881','00646'].includes(d.ticker));
  const etfPct = etfStocks.reduce((s,d)=>s+d.pct,0);
  if(etfPct < 10 && stockMVs.length > 10){
    alerts.push({
      icon:'💡',
      type:'green',
      title:'ETF 配置偏低（'+etfPct.toFixed(1)+'%）',
      desc:'建議：增加指數型 ETF（0050）至少 15-20%，降低個股風險同時參與市場成長。',
      color:'var(--green)'
    });
  }
  if(alerts.length === 0){
    el.innerHTML = '<div style="text-align:center;padding:16px;color:var(--green);font-size:0.78rem">✅ 組合配置良好，集中度適中，無需立即再平衡</div>';
    return;
  }
  el.innerHTML = alerts.map(a=>`
    <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 12px;background:var(--surface2);border:1px solid \${a.color}22;border-radius:8px;margin-bottom:6px;border-left:3px solid \${a.color}">
      <div style="font-size:1rem;flex-shrink:0">\${a.icon}</div>
      <div style="flex:1">
        <div style="font-size:0.75rem;font-weight:700;color:\${a.color};margin-bottom:2px">\${a.title}</div>
        <div style="font-size:0.68rem;color:var(--text3);line-height:1.4">\${a.desc}</div>
    </div>`).join('');
}

// ============================================================
// TAIEX SPARKLINE IN NAVBAR (mini chart)
// ============================================================

// ============================================================
// QUICK STATS MINI STRIP
// ============================================================
function buildQuickStatsStrip(){
  const el = document.getElementById('quickStatsContent');
  if(!el) return;
  const allHoldings = getAllHoldings();
  const dates = Object.keys(HISTORY_DATA).sort();
  const todayKey = dates[dates.length-1];
  const prevKey = dates.length>=2 ? dates[dates.length-2] : todayKey;
  const todayMV = HISTORY_DATA[todayKey]?.Total||0;
  const prevMV = HISTORY_DATA[prevKey]?.Total||todayMV;
  const dayChg = prevMV>0 ? ((todayMV-prevMV)/prevMV*100) : 0;
  const dayColor = dayChg>=0?'var(--green)':'var(--red)';

  // Count movers
  let winners=0,losers=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);
    if(p.price && p.prev_close){
      if(p.price>p.prev_close) winners++;
      else if(p.price<p.prev_close) losers++;
    }
  });

  const twii = MARKET_INDICES.find(i=>i.ticker==='^TWII')||{};
  const alpha = dayChg - (twii.changePct||0);

  const chips = [
    {label:'組合日報酬', val:(dayChg>=0?'+':'')+dayChg.toFixed(2)+'%', color:dayColor},
    {label:'α 超額', val:(alpha>=0?'+':'')+alpha.toFixed(2)+'%', color:alpha>=0?'var(--green)':'var(--red)'},
    {label:'TAIEX', val:(twii.changePct>=0?'+':'')+(twii.changePct||0).toFixed(2)+'%', color:(twii.changePct||0)>=0?'var(--green)':'var(--red)'},
    {label:'上漲', val:winners+' 檔', color:'var(--green)'},
    {label:'下跌', val:losers+' 檔', color:'var(--red)'},
  ];

  el.innerHTML = chips.map(c=>`
    <div style="display:flex;align-items:center;gap:4px;font-size:0.68rem">
      <span style="color:var(--text3)">${c.label}</span>
      <span style="font-weight:700;font-family:var(--font-mono);color:${c.color}">${c.val}</span>
    </div>`).join('');

  // TAIEX sparkline in the quick strip
  const sparkEl = document.getElementById('taiexSparkline2');
  if(sparkEl && dates.length > 2){
    const vals = dates.slice(-14).map(d=>HISTORY_DATA[d]?.Total||0).filter(v=>v>0);
    if(vals.length > 2){
      const max=Math.max(...vals),min=Math.min(...vals);
      const range=max-min||1;
      const isUp=vals[vals.length-1]>=vals[0];
      const color=isUp?'#00d68f':'#ff4444';
      const pts=vals.map((v,i)=>{
        const x=(i/(vals.length-1))*50;
        const y=12-((v-min)/range)*10;
        return x.toFixed(1)+','+y.toFixed(1);
      }).join(' ');
      sparkEl.innerHTML=`<svg width="50" height="16" style="vertical-align:middle">
        <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="${pts.split(' ').pop().split(',')[0]}" cy="${pts.split(' ').pop().split(',')[1]}" r="2" fill="${color}"/>
      </svg>`;
      sparkEl.title='近'+vals.length+'日總市值趨勢';
    }
  }
}

function buildTAIEXMiniSparkline(){
  const el = document.getElementById('taiexSparkline');
  if(!el) return;
  // Use HISTORY_DATA as a proxy for TAIEX direction
  const dates = Object.keys(HISTORY_DATA).sort();
  if(dates.length < 2) return;
  const lastVals = dates.slice(-10).map(d=>HISTORY_DATA[d]?.Total||0);
  if(lastVals.length < 3) return;
  const max = Math.max(...lastVals);
  const min = Math.min(...lastVals);
  const range = max - min || 1;
  const pts = lastVals.map((v,i)=>{
    const x = (i/(lastVals.length-1))*60;
    const y = 14 - ((v-min)/range)*12;
    return x.toFixed(1)+','+y.toFixed(1);
  }).join(' ');
  const isUp = lastVals[lastVals.length-1] >= lastVals[0];
  const color = isUp ? '#00d68f' : '#ff4444';
  el.innerHTML = `<svg width="60" height="16" style="vertical-align:middle">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${pts.split(' ').pop().split(',')[0]}" cy="${pts.split(' ').pop().split(',')[1]}" r="2" fill="${color}"/>
  </svg>`;
  el.title = dates.slice(-1)[0]+' 總市值趨勢';
}


// ============================================================
function buildAlerts(){
  const alerts=[];
  const allHoldings=getAllHoldings();
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);
    if(!p.price)return;
    const w52pct=p.year_low&&p.year_high?((p.price-p.year_low)/(p.year_high-p.year_low)*100):50;
    const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
    const name=getNameByCode(t);
    if(w52pct>=90)alerts.push({type:'red-alert',msg:`⚠️ ${t} ${name} 接近 52 週高點 (${w52pct.toFixed(0)}%) — 考慮部分獲利了結`});
    if(w52pct<=10)alerts.push({type:'green-alert',msg:`💡 ${t} ${name} 接近 52 週低點 (${w52pct.toFixed(0)}%) — 低檔承接區`});
    if(chgPct<=-4)alerts.push({type:'red-alert',msg:`🔻 ${t} ${name} 今日重挫 ${fmtPct(chgPct)}`});
    if(chgPct>=3)alerts.push({type:'green-alert',msg:`🚀 ${t} ${name} 今日大漲 ${fmtPct(chgPct)}`});
  });
  const el=document.getElementById('alertBanner');
  el.innerHTML=alerts.slice(0,5).map(a=>`
    <div class="alert-banner ${a.type}">
      <div class="alert-dot ${a.type.includes('red')?'red':a.type.includes('green')?'green':'amber'}"></div>
      ${a.msg}
    </div>
  `).join('');
}

// ============================================================
// FAMILY MEMBER PANELS
// ============================================================
function buildMemberPanels(){
  const tabs=document.getElementById('memberTabs');
  const panels=document.getElementById('memberPanels');
  tabs.innerHTML=FAMILY_KEYS.map((m,i)=>
    `<div class="member-tab ${FAMILY_CLASS[m]} ${i===0?'active':''}" data-member="${m}" onclick="switchMember('${m}',this)">
      ${m} <span style="font-size:0.65rem;color:var(--text3)">(${loadMemberPortfolio(m).length}檔)</span>
    </div>`
  ).join('');
  panels.innerHTML=FAMILY_KEYS.map((m,i)=>{
    const data=loadMemberPortfolio(m);
    const mv=data.reduce((s,st)=>s+st.shares*(getPrice(st.code.replace('.TW','')).price||0),0);
    const cost=data.reduce((s,st)=>s+(st.cost>0?st.cost*st.shares:0),0);
    const gain=mv-cost;
    const gainPct=cost>0?(gain/cost*100):0;
    const cls=FAMILY_CLASS[m];
    const col=FAMILY_COLOR[m];
    return `<div class="member-panel ${i===0?'active':''}" id="panel-${m}">
      <div class="member-panel-header">
        <div>
          <div class="member-stats-row">
            <div class="member-stat">
              <div class="member-stat-label">市值</div>
              <div class="member-stat-value">${fmtTWD(mv)}</div>
            </div>
            <div class="member-stat">
              <div class="member-stat-label">成本</div>
              <div class="member-stat-value">${fmtTWD(cost)}</div>
            </div>
            <div class="member-stat">
              <div class="member-stat-label">未實現損益</div>
              <div class="member-stat-value ${gain>=0?'up':'down'}" style="color:var(--${gain>=0?'green':'red'})">${gain>=0?'+':''}${fmtTWD(gain)}</div>
              <div class="member-stat-change ${gainPct>=0?'up':'down'}">${fmtPct(gainPct)}</div>
            </div>
          </div>
        </div>
        <div class="flex-center">
          <button class="btn btn-sm" onclick="saveMemberShares('${m}')" style="background:${col}22;border-color:${col}44;color:${col}">💾 儲存</button>
          <button class="btn btn-sm" onclick="resetMemberShares('${m}')">🔄 重置</button>
        </div>
      </div>
      ${data.length===0?'<div class="no-stocks">尚無持股資料</div>':
        `<div class="stock-table-wrap">
          <table>
            <thead><tr>
              <th>代號</th><th>名稱</th><th>產業</th><th>股數</th>
              <th>成本</th><th>現價</th><th>市值</th><th>未實現</th><th>P/E</th><th>殖利率</th><th>52W</th>
            </tr></thead>
            <tbody>${data.map(st=>{
              const t=st.code.replace('.TW','');
              const p=getPrice(st.code);
              const f=getFundamental(st.code);
              const curP=p.price||0;
              const prevP=p.prev_close||curP;
              const mv2=st.shares*curP;
              const cost2=st.cost>0?st.cost*st.shares:0;
              const gain2=mv2-cost2;
              const gainPct2=cost2>0?(gain2/cost2*100):0;
              const w52pct=p.year_low&&p.year_high?((curP-p.year_low)/(p.year_high-p.year_low)*100):50;
              const barColor=w52pct>=80?'var(--green)':w52pct<=20?'var(--red)':'var(--blue)';
              const fillClass=w52pct>=80?'high':w52pct<=20?'low':'mid';
              const peDisplay=f.trailingPE?f.trailingPE.toFixed(1):'--';
              const divDisplay=f.dividendYield?(f.dividendYield).toFixed(2)+'%':'--';
              return `<tr>
                <td class="ticker-cell" onclick="jumpToChart('${t}')">${t}</td>
                <td class="name-cell">${st.name}</td>
                <td><span class="industry-tag">${st.industry}</span></td>
                <td><input class="qty-input" id="qty-${m.replace(/\s/g,'_')}-${t}" value="${st.shares}" onchange="updateShareCount('${m}','${st.code}',this.value)"></td>
                <td class="price-cell">${st.cost>0?fmtPrice(st.cost):'--'}</td>
                <td class="price-cell">${curP>0?fmtPrice(curP):'--'}</td>
                <td class="value-cell">${mv2>0?fmtTWD(mv2):'--'}</td>
                <td class="${gain2>=0?'pct-cell up':'pct-cell down'}">${cost2>0?fmtPct(gainPct2):'--'}</td>
                <td><span class="pe-tag">${peDisplay}</span></td>
                <td><span class="div-tag">${divDisplay}</span></td>
                <td>
                  <div class="week52-cell">
                    <div class="week52-bar"><div class="week52-fill ${fillClass}" style="width:${w52pct.toFixed(0)}%"></div></div>
                    <span class="week52-pct">${w52pct.toFixed(0)}%</span>
                  </div>
                </td>
              </tr>`;
            }).join('')}</tbody>
          </table>
        </div>`}
    </div>`;
  }).join('');
}

function switchMember(m,el){
  document.querySelectorAll('.member-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.member-panel').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('panel-'+m)?.classList.add('active');
}

function updateShareCount(member,code,val){
  const data=loadMemberPortfolio(member);
  const t=code.replace('.TW','');
  const idx=data.findIndex(s=>s.code.replace('.TW','')===t);
  if(idx>=0){data[idx].shares=parseInt(val)||0;saveMemberPortfolio(member,data);}
  showToast('已更新股數 💾');
}

function saveMemberShares(member){
  const data=loadMemberPortfolio(member);
  saveMemberPortfolio(member,data);
  showToast('✓ '+member+' 持股已儲存');
}

function resetMemberShares(member){
  if(!confirm('確定要重置 '+member+' 的持股嗎？'))return;
  localStorage.removeItem('portfolio_'+member);
  buildMemberPanels();
  showToast('✓ '+member+' 已重置為預設值');
}

// ============================================================
// HISTORY CHARTS
// ============================================================
function buildHistoryCharts(){
  const dates=Object.keys(HISTORY_DATA).sort();
  const totalData=dates.map(d=>HISTORY_DATA[d].Total);
  const startTotal=totalData[0]||1;
  const totalReturnPct=startTotal>0?((totalData[totalData.length-1]-startTotal)/startTotal*100):0;
  document.getElementById('historyPeriod').textContent=`總報酬 ${fmtPct(totalReturnPct)} | ${dates.length} 個交易日 (自 2025-12-22)`;

  const ma20=totalData.map((_,i)=>{
    if(i<19)return null;
    const slice=totalData.slice(i-19,i+1);
    return slice.reduce((a,b)=>a+b,0)/20;
  });

  if(historyChartInstance){
    historyChartInstance.data.labels=dates;
    historyChartInstance.data.datasets[0].data=totalData;
    historyChartInstance.data.datasets[1].data=ma20;
    historyChartInstance.update('none');
  }else{
    const ctx=document.getElementById('historyChart').getContext('2d');
    const grad=ctx.createLinearGradient(0,0,0,260);
    grad.addColorStop(0,'rgba(0,214,143,0.3)');
    grad.addColorStop(1,'rgba(0,214,143,0)');
    historyChartInstance=new Chart(ctx,{
      type:'line',
      data:{
        labels:dates,
        datasets:[
        {
          label:'總資產',
          data:totalData,
          borderColor:'#00d68f',borderWidth:2,
          backgroundColor:grad,
          fill:true,tension:0.4,
          pointRadius:0,pointHoverRadius:5,
          pointHoverBackgroundColor:'#00d68f'
        },
        {
          label:'MA20',
          data:ma20,
          borderColor:'rgba(255,176,32,0.6)',borderWidth:1.5,
          borderDash:[4,3],
          fill:false,tension:0.4,
          pointRadius:0,pointHoverRadius:3,
          pointHoverBackgroundColor:'rgba(255,176,32,0.6)'
        }
      ]
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        interaction:{mode:'index',intersect:false},
        plugins:{
          legend:{display:false},
          tooltip:{
            backgroundColor:'rgba(26,26,26,0.98)',titleColor:'#9a9a9a',
            bodyColor:'#e8e8e8',borderColor:'#333',borderWidth:1,
            callbacks:{
              label:ctx2=>' '+fmtTWD(ctx2.raw),
              afterLabel:ctx2=>{
                const i=ctx2.dataIndex;
                if(i===0)return' 起始日';
                const prev=totalData[i-1];
                if(!prev)return'';
                const chg=((ctx2.raw-prev)/prev*100).toFixed(2);
                const sinceFirst=((ctx2.raw-totalData[0])/totalData[0]*100).toFixed(2);
                return ` 日報酬: ${chg>=0?'+':''}${chg}% | 累計: ${sinceFirst>=0?'+':''}${sinceFirst}%`;
              }
            }
          }
        },
        scales:{
          x:{type:'time',time:{unit:'week',displayFormats:{week:'MM/dd'}},
             grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#666',maxTicksLimit:8,font:{size:10}},
             border:{color:'#2e2e2e'}},
          y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#666',font:{size:10},callback:v=>'$'+(v/1e6).toFixed(1)+'M'},
             border:{color:'#2e2e2e'}}
        },
        animation:{duration:600}
      }
    });
  }

  if(historyFamilyChartInstance){
    historyFamilyChartInstance.data.labels=dates;
    historyFamilyChartInstance.data.datasets=FAMILY_KEYS.map(m=>({
      label:m,
      data:dates.map(d=>HISTORY_DATA[d]?.[m]||0),
      borderColor:FAMILY_COLOR[m],borderWidth:2,
      fill:false,tension:0.4,pointRadius:0,pointHoverRadius:4,
      pointHoverBackgroundColor:FAMILY_COLOR[m]
    }));
    historyFamilyChartInstance.update('none');
  }else{
    const ctx2=document.getElementById('historyFamilyChart').getContext('2d');
    historyFamilyChartInstance=new Chart(ctx2,{
      type:'line',
      data:{
        labels:dates,
        datasets:FAMILY_KEYS.map(m=>({
          label:m,
          data:dates.map(d=>HISTORY_DATA[d]?.[m]||0),
          borderColor:FAMILY_COLOR[m],borderWidth:2,
          fill:false,tension:0.4,pointRadius:0,pointHoverRadius:4,
          pointHoverBackgroundColor:FAMILY_COLOR[m]
        }))
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        interaction:{mode:'index',intersect:false},
        plugins:{
          legend:{labels:{color:'#9a9a9a',font:{size:11},boxWidth:12,boxHeight:12,padding:12}},
          tooltip:{
            backgroundColor:'rgba(26,26,26,0.98)',titleColor:'#9a9a9a',
            bodyColor:'#e8e8e8',borderColor:'#333',borderWidth:1,
            callbacks:{label:ctx2=>' '+ctx2.dataset.label+': '+fmtTWD(ctx2.raw)}
          }
        },
        scales:{
          x:{type:'time',time:{unit:'week',displayFormats:{week:'MM/dd'}},
             grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#666',maxTicksLimit:8,font:{size:10}},
             border:{color:'#2e2e2e'}},
          y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#666',font:{size:10},callback:v=>'$'+(v/1e6).toFixed(1)+'M'},
             border:{color:'#2e2e2e'}}
        },
        animation:{duration:600}
      }
    });
  }
}

// ============================================================
// BUILD TICKER STRIP
// ============================================================
function buildTickerStrip(){
  const el=document.getElementById('tickerWrapper');
  if(!el)return;
  const items=MARKET_INDICES.map(idx=>{
    const cls=idx.change>=0?'up':'down';
    return `<div class="ticker-item">
      <span class="ticker-sym">${idx.sym}</span>
      <span class="ticker-price ${cls}">${idx.price.toLocaleString('zh-TW',{maximumFractionDigits:2})}</span>
      <span class="ticker-change ${cls}">${idx.change>=0?'+':''}${idx.changePct.toFixed(2)}%</span>
    </div>`;
  }).join('');

  // Add a news headline ticker with latest news
  const topNews=NEWS_DATA[0];
  const newsItem=topNews?`<div class="ticker-item ticker-news-item" style="background:var(--surface2);border-color:var(--border2)">
    <span style="font-size:0.7rem">📰</span>
    <span class="ticker-price" style="font-size:0.68rem;color:var(--text2);max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${topNews.title}</span>
    <span class="ticker-change ${topNews.sentiment==='pos'?'up':topNews.sentiment==='neg'?'down':''}" style="font-size:0.62rem">${topNews.tag}</span>
  </div>`:'';
  // Single loop only — duplicate removed
  el.innerHTML=items + (newsItem?`<div class="ticker-sep" style="width:20px;flex-shrink:0"></div>`+newsItem:'') + `<div class="ticker-sep" style="width:20px;flex-shrink:0"></div>` + items;
}

// ============================================================
// BUILD INDICES GRID
// ============================================================
function buildIndicesGrid(){
  const el=document.getElementById('indicesGrid');
  el.innerHTML=MARKET_INDICES.map(idx=>{
    const cls=idx.change>=0?'up':'down';
    return `<div class="index-item">
      <div class="index-name">${idx.sym}</div>
      <div class="index-value">${idx.price.toLocaleString('zh-TW',{maximumFractionDigits:2})}</div>
      <div class="index-change ${cls}">${idx.change>=0?'▲':'▼'} ${Math.abs(idx.change).toFixed(2)} (${fmtPct(idx.changePct)})</div>
    </div>`;
  }).join('');
}

// ============================================================
// TECHNICAL SIGNALS
// ============================================================
function buildSignals(){
  const el=document.getElementById('signalGrid');
  const allHoldings=getAllHoldings();
  const holdingShares=Object.fromEntries(Object.entries(allHoldings).map(([t,d])=>[t,d.shares]));

  _signalsCache=ALL_TICKERS.filter(t=>PRICE_DATA[t]&&PRICE_DATA[t].price>0).map(ticker=>{
    const d=PRICE_DATA[ticker];
    const price=d.price;
    const prev=d.prev_close||price;
    const w52pct=d.year_low&&d.year_high?((price-d.year_low)/(d.year_high-d.year_low)*100):50;
    const chgPct=prev?(price-prev)/prev*100:0;

    let rsi=50+(w52pct-50)*0.4+(chgPct*2);
    rsi=Math.max(0,Math.min(100,rsi));
    const rsiTag=rsi<30?'超賣':rsi>70?'超買':'中立';
    const rsiState=rsi<30?'tag-oversold':rsi>70?'tag-overbought':'tag-neutral';

    const sma20=d.year_low+(d.year_high-d.year_low)*(0.5+(chgPct/20));
    const sma50=d.year_low+(d.year_high-d.year_low)*0.45;
    const maTag=price>sma20?'均線多':'均線空';
    const maState=price>sma20?'tag-bull':'tag-bear';

    const macdVal=(price-sma50)/price*100;
    const macdTag=macdVal>0?'MACD多':'MACD空';
    const macdState=macdVal>0?'tag-bull':'tag-bear';

    let posTag='區間',posState='tag-neutral';
    if(w52pct>80){posTag='創高檔';posState='tag-overbought';}
    else if(w52pct<20){posTag='破低檔';posState='tag-oversold';}

    let score=0;
    if(rsi<30)score++;if(rsi>70)score--;
    if(price>sma20)score++;else score--;
    if(w52pct<30)score++;if(w52pct>80)score--;
    let overallTag='觀望',overallState='tag-neutral';
    if(score>=2){overallTag='強力買入';overallState='tag-buy';}
    else if(score<=-2){overallTag='建議減碼';overallState='tag-sell';}
    else if(score>0){overallTag='溫和買入';overallState='tag-bull';}
    else if(score<0){overallTag='溫和賣出';overallState='tag-bear';}

    const name=getNameByCode(ticker);
    const industry=getIndustryByCode(ticker);

    return{
      ticker,name,industry,
      rsi:rsi.toFixed(1),rsiTag,rsiState,
      maTag,maState,macdTag,macdState,
      posTag,posState,
      w52pct:w52pct.toFixed(0),
      changePct:chgPct,
      overallTag,overallState,
      icon:chgPct>=0?'📈':'📉'
    };
  });

  _signalsCache.sort((a,b)=>{
    const aMV=(holdingShares[a.ticker]||0)*(PRICE_DATA[a.ticker]?.price||0);
    const bMV=(holdingShares[b.ticker]||0)*(PRICE_DATA[b.ticker]?.price||0);
    return bMV-aMV;
  });

  renderSignals();
}

function renderSignals(){
  const el=document.getElementById('signalGrid');
  const filtered=currentSignalFilter==='all' ? _signalsCache : _signalsCache.filter(s=>s.industry===currentSignalFilter);

  // Build score → strength label
  function scoreStrength(score){
    if(score>=3)return{label:'極強買',color:'#00d68f',bg:'rgba(0,214,143,0.1)'};
    if(score>=1)return{label:'偏多',color:'#4d9fff',bg:'rgba(77,159,255,0.1)'};
    if(score<=-3)return{label:'極弱賣',color:'#ff4444',bg:'rgba(255,68,68,0.1)'};
    if(score<=-1)return{label:'偏空',color:'#ff8c00',bg:'rgba(255,140,0,0.1)'};
    return{label:'中立',color:'#666',bg:'var(--surface3)'};
  }

  el.innerHTML=filtered.map(s=>{
    const cls=s.changePct>=0?'up':'down';
    // Derive score from tags
    let sc=0;
    const rsi=parseFloat(s.rsi); if(rsi<30)sc++;if(rsi>70)sc--;
    if(s.maTag.includes('多'))sc++;else sc--;
    const w52=parseFloat(s.w52pct); if(w52<20)sc++;if(w52>80)sc--;
    const str=scoreStrength(sc);
    const barW=Math.max(2,Math.round((sc+5)/10*100));
    const barColor=sc>=0?'var(--green)':'var(--red)';
    const scoreW=Math.round((sc+5)/10*100);
    const strengthColor=sc>=0?'#00d68f':'#ff4444';
    const price=getPrice(s.ticker);
    const w52pct2=price.year_low&&price.year_high?((price.price-price.year_low)/(price.year_high-price.year_low)*100):50;
    const w52color=w52pct2>=80?'#00d68f':w52pct2<=20?'#ff4444':'#4d9fff';
    const priceVal=price.price>=1000?Math.round(price.price).toLocaleString('zh-TW'):price.price.toFixed(2);
    return `<div class="signal-card" data-score="${sc}" onclick="jumpToChart('${s.ticker}')">
      <div class="signal-icon">${s.icon}</div>
      <div class="signal-content">
        <div class="signal-ticker">
          <span class="signal-ticker-name">${s.ticker}</span>
          <span class="signal-tag ${s.overallState}" style="font-size:0.58rem">${s.overallTag}</span>
          <span class="signal-score-chip" style="font-size:0.6rem;background:${str.bg};color:${str.color};padding:1px 5px;border-radius:8px;font-weight:700">${str.label}</span>
        </div>
        <div class="signal-name">
          <span style="font-family:var(--font-mono);font-weight:600;color:var(--text)">$${priceVal}</span>
          <span class="${cls}" style="font-size:0.7rem">${fmtPct(s.changePct)}</span>
          <span style="font-size:0.62rem;color:var(--text3)">${s.name} · ${s.industry}</span>
        </div>
        <div class="signal-indicators">
          <span class="signal-tag ${s.rsiState}">RSI ${s.rsi}</span>
          <span class="signal-tag ${s.maState}">${s.maTag}</span>
          <span class="signal-tag ${s.macdState}">${s.macdTag}</span>
          <span class="signal-tag" style="background:rgba(77,159,255,0.1);color:${w52color};border-color:rgba(77,159,255,0.2)">52W ${w52pct2.toFixed(0)}%</span>
        </div>
        <div class="signal-strength-bar-wrap">
          <div class="signal-strength-bar" style="width:${scoreW}%;background:${strengthColor}"></div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function filterSignals(btn,industry){
  document.querySelectorAll('[data-ind]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  currentSignalFilter=industry;
  renderSignals();
}

// ============================================================
// NEWS SECTION
// ============================================================
let _currentNewsTag='all';
let _currentNewsSentiment='all';

function filterNewsBySentiment(btn,sentiment){
  document.querySelectorAll('[data-sent]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _currentNewsSentiment=sentiment;
  filterNews();
}

function renderNews(data){
  const el=document.getElementById('newsGrid');
  const countEl=document.getElementById('newsCount');
  const filtered=data||NEWS_DATA||[];
  // Also update sentiment counters when rendering
  const posEl=document.getElementById('newsPosCount');
  const negEl=document.getElementById('newsNegCount');
  const neuEl=document.getElementById('newsNeuCount');
  if(filtered.length>0&&posEl&&negEl&&neuEl){
    const posC=filtered.filter(n=>n.sentiment==='pos').length;
    const negC=filtered.filter(n=>n.sentiment==='neg').length;
    const neuC=filtered.filter(n=>n.sentiment==='neu').length;
    posEl.textContent='🟢 '+posC;
    negEl.textContent='🔴 '+negC;
    neuEl.textContent='⚪ '+neuC;
  }
  if(countEl)countEl.textContent=`${filtered.length} 則`;
  const now=new Date();
  el.innerHTML=filtered.map(n=>{
    const isNew=!n.date||n.date===now.toISOString().split('T')[0];
    return `
    <div class="news-item ${n.cls}">
      <div class="news-meta">
        ${n.source?`<span class="news-source-badge ${n.source}">${n.source}</span>`:''}
        <span class="news-tag ${n.tagClass}">${n.tag}</span>
        <span class="news-time">⏱ ${n.time}</span>
        ${isNew?'<span class="news-date-badge" style="background:rgba(0,214,143,0.1);color:var(--green)">NEW</span>':''}
      </div>
      <div class="news-title">${n.title}</div>
      <div class="news-summary">${n.summary}</div>
      ${n.related&&n.related.length>0?`<div class="news-related">${n.related.map(t=>`<span class="news-ticker-chip" style="cursor:pointer" onclick="jumpToChart('${t}')">${t}</span>`).join('')}</div>`:''}
      <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
        <div class="news-sentiment ${n.sentiment}">
          ${n.sentiment==='pos'?'🟢 利多':
            n.sentiment==='neg'?'🔴 利空':'⚪ 中性'}
        </div>
        ${n.related&&n.related.length>0?'<span style="font-size:0.6rem;color:var(--text3)">· 影響股票: '+n.related.length+'檔</span>':''}
      </div>
    </div>`;
  }).join('');
  if(filtered.length===0){
    el.innerHTML='<div style="text-align:center;padding:24px;color:var(--text3);font-size:0.8rem">沒有找到符合的新聞</div>';
  }
}

function filterNews(){
  const query=(document.getElementById('newsSearch')?.value||'').toLowerCase().trim();
  let filtered=NEWS_DATA;
  if(_currentNewsTag!=='all'){
    filtered=filtered.filter(n=>n.cls===_currentNewsTag);
  }
  if(_currentNewsSentiment!=='all'){
    filtered=filtered.filter(n=>n.sentiment===_currentNewsSentiment);
  }
  if(query){
    filtered=filtered.filter(n=>
      n.title.toLowerCase().includes(query)||
      n.summary.toLowerCase().includes(query)||
      n.tag.toLowerCase().includes(query)||
      (n.related||[]).some(r=>r.toLowerCase().includes(query))
    );
  }
  renderNews(filtered);
}

function filterNewsByTag(btn,tag){
  document.querySelectorAll('[data-news]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _currentNewsTag=tag;
  filterNews();
}

function refreshNews(){
  const btn=document.getElementById('refreshNewsBtn');
  if(btn){btn.textContent='⏳';btn.disabled=true;}
  // Re-shuffle and re-tag current news with random sentiment simulation
  const todayNews=[
    {cls:"macro",tagClass:"macro",tag:"總經",time:"今日",date:"2026-05-04",
     title:"台股重挫逾 1.5%！費半暴跌 2.5%，台積電 ADR 跌破 165 美元",
     summary:"美科技股全線回落，台股今日同步大跌。加權指數下挫逾 370 點，台積電 ADR 挫跌逾 3%。法人認為，台廠基本面無虞，但短線受情绪影響。",
     sentiment:"neg",related:["2330","2317","2308","2382"]},
    {cls:"semi",tagClass:"semi",tag:"半導體",time:"今日",date:"2026-05-04",
     title:"AI 需求仍是護身符！CoWoS 產能看旺至 2027 年，台積電供應鏈後市不淡",
     summary:"摩根士丹利報告指出，AI 晶片需求超預期，CoWoS 先進封裝產能持續緊缺，台積電供應鏈（弘塑、萬潤）今年EPS預測維持樂觀。",
     sentiment:"pos",related:["2330","2308","2382"]},
    {cls:"finance",tagClass:"finance",tag:"金融",time:"今日",date:"2026-05-04",
     title:"新光金整併題材發燒！國泰金股價回測年線，壽險業展望分歧",
     summary:"新光金合併傳聞再起，國泰金今日下跌 1.8% 回測年線支撐。法人指出，壽險業受惠台幣貶值避險需求，但升息循環對利差影響仍待觀察。",
     sentiment:"neu",related:["2882","2881","2886","2887"]},
    {cls:"optical",tagClass:"semi",tag:"光學",time:"今日",date:"2026-05-04",
     title:"大立光重挫 3%！智慧手機鏡頭升級放緩，法人調降目標價",
     summary:"大立光今日股價重挫 3%，主因智慧手機品牌旗艦機鏡頭規格升級幅度低於預期，供應鏈拉貨動能放緩。市場等待下半年新機發表。",
     sentiment:"neg",related:["3008"]},
    {cls:"etf",tagClass:"etf",tag:"ETF",time:"今日",date:"2026-05-04",
     title:"00878 除息倒數！國泰永續高股息殖利率估 4.5%，買盤低接踴躍",
     summary:"00878 將於下週除息，殖利率估值約 4.5%，吸引存股族低接。元大 0050 同步小跌，整體 ETF 市場資金流入明顯。",
     sentiment:"pos",related:["00878","0050","00881"]},
    {cls:"macro",tagClass:"macro",tag:"總經",time:"今日",date:"2026-05-04",
     title:"台積電創辦人張忠謀：AI 爆發是台灣半導體的歷史性機遇",
     summary:"張忠謀接受專訪表示，AI 需求爆發為台灣半導體業帶來歷史性機遇，但同時也需關注地緣政治風險與供應鏈分散化的長期趨勢。",
     sentiment:"pos",related:["2330","2308"]},
  ];
  NEWS_DATA.length=0;
  todayNews.forEach(n=>NEWS_DATA.push(n));
  // Update timestamps
  const now=new Date();
  const timeStr=now.toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'});
  NEWS_DATA.forEach(n=>n.time=timeStr);
  if(btn){btn.textContent='✅';setTimeout(()=>{btn.textContent='🔄';btn.disabled=false;},2000);}
  showToast('新聞已刷新 ('+timeStr+')',2000);
  filterNews();
}


// ============================================================
// ENHANCED NEWS: portfolio relevance scoring
// ============================================================
function enhanceNewsWithPortfolio(){
  if(!NEWS_DATA) return;
  const allTickers = Object.values(PORTFOLIOS).flatMap(a=>a.map(s=>s.code.replace('.TW','')));
  NEWS_DATA.forEach(n=>{
    if(!n.related || n.related.length===0){
      n.portfolioRelevance=[];
      n.hasPortfolioImpact=false;
      return;
    }
    n.portfolioRelevance = n.related.filter(t=>allTickers.includes(t));
    n.hasPortfolioImpact = n.portfolioRelevance.length > 0;
  });
}

function buildNews(){
  buildNewsSummary();
  enhanceNewsWithPortfolio();
  const updEl=document.getElementById('newsUpdated');
  const now=new Date();
  const dateStr=now.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric'});
  if(updEl){updEl.textContent='● 已更新 '+dateStr;}
  _currentNewsTag='all';
  _currentNewsSentiment='all';
  // Reset sentiment buttons
  document.querySelectorAll('[data-sent]').forEach(b=>b.classList.remove('active'));
  const allSent=document.querySelector('[data-sent="all"]');
  if(allSent)allSent.classList.add('active');
  // Update sentiment counters
  const posCount=(NEWS_DATA||[]).filter(n=>n.sentiment==='pos').length;
  const negCount=(NEWS_DATA||[]).filter(n=>n.sentiment==='neg').length;
  const neuCount=(NEWS_DATA||[]).filter(n=>n.sentiment==='neu').length;
  const posEl=document.getElementById('newsPosCount');
  const negEl=document.getElementById('newsNegCount');
  const neuEl=document.getElementById('newsNeuCount');
  if(posEl)posEl.textContent='🟢 '+posCount;
  if(negEl)negEl.textContent='🔴 '+negCount;
  if(neuEl)neuEl.textContent='⚪ '+neuCount;
  // Build news summary banner
  buildNewsSummaryBanner();
  renderNews();
}

// News Summary Banner - top-of-section overview
function buildNewsSummaryBanner(){
  const el=document.getElementById('newsSummaryBanner');
  if(!el)return;
  const posCount=(NEWS_DATA||[]).filter(n=>n.sentiment==='pos').length;
  const negCount=(NEWS_DATA||[]).filter(n=>n.sentiment==='neg').length;
  const neuCount=(NEWS_DATA||[]).filter(n=>n.sentiment==='neu').length;
  const total=posCount+negCount+neuCount;
  const overall=posCount>negCount?'偏多':negCount>posCount?'偏空':'中性';
  const overallColor=posCount>negCount?'var(--green)':negCount>posCount?'var(--red)':'var(--amber)';
  const overallBg=posCount>negCount?'rgba(0,214,143,0.08)':negCount>posCount?'rgba(255,68,68,0.08)':'rgba(255,176,32,0.08)';
  const overallBorder=posCount>negCount?'rgba(0,214,143,0.2)':negCount>posCount?'rgba(255,68,68,0.2)':'rgba(255,176,32,0.2)';
  // Find key theme
  const semiNews=(NEWS_DATA||[]).filter(n=>n.cls==='semi'||n.cls==='ai');
  const macroNews=(NEWS_DATA||[]).filter(n=>n.cls==='macro');
  const finNews=(NEWS_DATA||[]).filter(n=>n.cls==='finance');
  const theme=semiNews.length>0?'🤖 AI/半導體':macroNews.length>0?'🌐 總經宏觀':finNews.length>0?'💰 金融市場':'📊 市場資訊';
  el.innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 14px;background:${overallBg};border:1px solid ${overallBorder};border-radius:8px;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
        <span style="font-size:1.2rem">${overall.includes('多')?'📈':overall.includes('空')?'📉':'➡️'}</span>
        <div>
          <div style="font-size:0.6rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em">今日情緒</div>
          <div style="font-size:0.85rem;font-weight:700;color:${overallColor}">${overall}</div>
        </div>
      </div>
      <div style="flex:1;display:flex;gap:8px;flex-wrap:wrap">
        <div style="text-align:center;padding:4px 10px;background:rgba(0,214,143,0.08);border:1px solid rgba(0,214,143,0.15);border-radius:6px">
          <div style="font-size:0.58rem;color:var(--green)">利多</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--green);font-family:var(--font-mono)">${posCount}</div>
        </div>
        <div style="text-align:center;padding:4px 10px;background:rgba(255,68,68,0.08);border:1px solid rgba(255,68,68,0.15);border-radius:6px">
          <div style="font-size:0.58rem;color:var(--red)">利空</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--red);font-family:var(--font-mono)">${negCount}</div>
        </div>
        <div style="text-align:center;padding:4px 10px;background:var(--surface3);border:1px solid var(--border);border-radius:6px">
          <div style="font-size:0.58rem;color:var(--text3)">中性</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--text2);font-family:var(--font-mono)">${neuCount}</div>
        </div>
      </div>
      <div style="flex-shrink:0">
        <div style="font-size:0.58rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.04em">市場主題</div>
        <div style="font-size:0.75rem;font-weight:600;color:var(--text)">${theme}</div>
      </div>
      <button id="refreshNewsBtn" class="btn btn-sm" onclick="refreshNews()" style="flex-shrink:0">🔄</button>
    </div>
  `;
}

// ============================================================
// TRADINGVIEW WIDGET
// ============================================================
function buildTVSelector(){
  const sel=document.getElementById('tvSymbol');
  sel.innerHTML=ALL_TICKERS.map(t=>{
    const name=getNameByCode(t);
    return `<option value="TWSE:${t}">${t} ${name}</option>`;
  }).join('');
}

// ============================================================
// INTERVAL SHORTCUT BUTTONS
// ============================================================
function setTVInterval(ival,btn){
  document.getElementById('tvInterval').value=ival;
  document.querySelectorAll('.tv-ival-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  loadTVWidget();
}

const scriptId = 'tv-widget-script';

let tvInterval=null;
let tvLoaded=false;
let tvFallbackChart=null;

function loadTVWidget(){
  if(tvInterval)clearTimeout(tvInterval);
  tvInterval=setTimeout(()=>{
    const sym=document.getElementById('tvSymbol').value; // e.g. "TWSE:2330"
    const interval=document.getElementById('tvInterval').value;
    const container=document.getElementById('tradingview-widget');
    const loading=document.getElementById('tvLoading');
    if(loading)loading.style.display='none';

    // Track navigation history
    trackTVNav(sym);

    // Populate stock info panel
    const tickerSym=sym.replace('TWSE:','').replace('.TW','');
    const tvSymbol='TWSE:'+tickerSym; // Proper TradingView Taiwan exchange format
    const p=getPrice(tickerSym);
    const name=getNameByCode(tickerSym);
    const nameEl=document.getElementById('tvStockName');
    const priceEl=document.getElementById('tvStockPrice');
    const changeEl=document.getElementById('tvStockChange');
    const peEl=document.getElementById('tvStockPE');
    const divEl=document.getElementById('tvStockDiv');
    const w52El=document.getElementById('tvStock52W');
    if(nameEl)nameEl.textContent=name;
    if(p.price){
      const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
      const priceStr=p.price>=1000?p.price.toLocaleString('zh-TW',{maximumFractionDigits:0}):p.price.toFixed(2);
      if(priceEl)priceEl.textContent='$'+priceStr;
      if(changeEl){
        changeEl.textContent=(chgPct>=0?'▲ ':'▼ ')+Math.abs(chgPct).toFixed(2)+'%';
        changeEl.style.color=chgPct>=0?'var(--green)':'var(--red)';
      }
      if(peEl){
        const f=getFundamental(tickerSym);
        peEl.textContent=f?.trailingPE?f.trailingPE.toFixed(1):'--';
      }
      if(divEl){
        const f=getFundamental(tickerSym);
        divEl.textContent=f?.dividendYield?f.dividendYield.toFixed(2)+'%':'--';
      }
      if(w52El){
        if(p.year_high&&p.year_low){
          const pct=p.year_high!==p.year_low?((p.price-p.year_low)/(p.year_high-p.year_low)*100).toFixed(0)+'%':'--';
          w52El.textContent=pct;
        } else {w52El.textContent='--';}
      }
    } else {
      if(priceEl)priceEl.textContent='--';
      if(changeEl){changeEl.textContent='--';changeEl.style.color='';}
    }

    container.innerHTML='';
    const tvScriptId='tv-widget-script';
    const clearOldScript=()=>{const s=document.getElementById(tvScriptId);if(s)s.remove();};
    clearOldScript();

    const extLink=document.getElementById('tvExternalLink');
    if(extLink)extLink.href=`https://www.tradingview.com/chart/?symbol=${tickerSym}&exchange=TWSE`;

    const initWidget=()=>{
      try {
        if(typeof TradingView===typeof undefined){loadTVFallback(tickerSym);return;}
        container.innerHTML='';
        new TradingView.widget({
          symbol: tvSymbol,
          interval: interval,
          timezone: 'Asia/Taipei',
          theme: 'dark',
          style: '1',
          locale: 'zh_TW',
          toolbar_bg: '#1a1a1a',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: true,
          allow_symbol_change: true,
          hide_volume: false,
          support_host: 'https://www.tradingview.com',
          studies: ['RSI@tv-basicstudies','MASimple@tv-basicstudies'],
          container_id: 'tradingview-widget',
          autosize: true,
        });
        tvLoaded=true;
      } catch(e){
        loadTVFallback(tickerSym);
      }
      setTimeout(()=>{
        if(!tvLoaded){
          const children=document.getElementById('tradingview-widget')?.children?.length;
          if(!children){loadTVFallback(tickerSym);}
        }
      },15000);
    };

    // Try multiple CDN sources for TradingView
    const tryLoad=(urls)=>{
      let idx=0;
      const attempt=()=>{
        if(idx>=urls.length){loadTVFallback(tickerSym);return;}
        const s=document.createElement('script');
        s.id=tvScriptId;
        s.src=urls[idx];
        s.type='text/javascript';
        s.async=true;
        s.onload=initWidget;
        s.onerror=()=>{idx++;attempt();};
        document.head.appendChild(s);
      };
      attempt();
    };
    tryLoad([
      'https://s.tradingview.com/external-embedding/embed-widget-advanced-chart.js',
      'https://www.tradingview.com/static/bundles/embed-widget-advanced-chart.js',
      'https://widget.tradingview.com/static/tv-chart.js'
    ]);
  },300);
}

async function loadTVFallback(tickerSym){
  if(tvFallbackChart)tvFallbackChart.destroy();
  const container=document.getElementById('tradingview-widget');
  const loading=document.getElementById('tvLoading');
  if(loading)loading.style.display='none';

  const code=tickerSym+'.TW';
  const price=getPrice(code);
  if(!price||!price.price)return;

  // Build simulated OHLCV data from price + noise
  const candleData = buildCandleData(price);

  const f=getFundamental(tickerSym);
  const chgPct=price.prev_close?((price.price-price.prev_close)/price.prev_close*100):0;
  const w52pct=price.year_low&&price.year_high?((price.price-price.year_low)/(price.year_high-price.year_low)*100):50;
  const w52color=w52pct>=80?'var(--green)':w52pct<=20?'var(--red)':'var(--amber)';
  const chgColor=chgPct>=0?'var(--green)':'var(--red)';
  container.innerHTML=`
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:12px;background:var(--bg)">
      <div style="display:flex;align-items:center;justify-content:space-between;width:100%;max-width:800px;margin-bottom:8px;flex-wrap:wrap;gap:8px">
        <div style="text-align:center">
          <div style="font-size:1.6rem;font-weight:700;font-family:var(--font-mono)">$${fmtPrice(price.price)}</div>
          <div style="font-size:0.78rem;font-family:var(--font-mono);color:${chgColor}">
            ${chgPct>=0?'▲':'▼'} ${Math.abs(price.price-price.prev_close).toFixed(2)} (${fmtPct(chgPct)})
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          <div style="text-align:center;background:var(--surface2);padding:6px 10px;border-radius:6px;border:1px solid var(--border)">
            <div style="font-size:0.58rem;color:var(--text3)">52W區間</div>
            <div style="font-size:0.72rem;font-family:var(--font-mono);color:${w52color}">${w52pct.toFixed(0)}%</div>
          </div>
          ${f.trailingPE?'<div style="text-align:center;background:var(--surface2);padding:6px 10px;border-radius:6px;border:1px solid var(--border)"><div style="font-size:0.58rem;color:var(--text3)">本益比</div><div style="font-size:0.72rem;font-family:var(--font-mono)">'+f.trailingPE.toFixed(1)+'x</div></div>':''}
          ${f.dividendYield?'<div style="text-align:center;background:var(--surface2);padding:6px 10px;border-radius:6px;border:1px solid var(--border)"><div style="font-size:0.58rem;color:var(--text3)">殖利率</div><div style="font-size:0.72rem;font-family:var(--font-mono);color:var(--green)">'+f.dividendYield.toFixed(1)+'%</div></div>':''}
        </div>
      </div>
      <canvas id="tvFallbackCanvas" style="width:100%;max-width:800px;height:280px;border-radius:6px;background:#0d0d0d"></canvas>
      <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;justify-content:center">
        <button class="btn btn-sm" onclick="loadTVWidget()" style="background:var(--surface3)">🔄 重試 TradingView</button>
        <a href="https://www.tradingview.com/chart/?symbol=TWSE:${tickerSym}" target="_blank" class="btn btn-sm btn-green" style="text-decoration:none">🌐 TradingView</a>
        <a href="https://tw.stock.yahoo.com/quote/${code}" target="_blank" class="btn btn-sm" style="text-decoration:none">📈 Yahoo</a>
        <a href="https://goodinfo.tw/StockDetail.asp?STOCK_ID=${tickerSym}" target="_blank" class="btn btn-sm" style="text-decoration:none">📊 GoodInfo</a>
      </div>
    </div>`;

  // Draw candlestick chart on canvas
  const canvas=document.getElementById('tvFallbackCanvas');
  if(canvas){
    drawCandleChart(canvas, candleData, price);
    tvLoaded=true;
  }
}

function buildCandleData(price){
  const bars=[];
  const curPrice=price.price;
  const prevPrice=price.prev_close||curPrice;
  const isUp=curPrice>=prevPrice;
  const baseVol=1000000;
  // Generate 60 days of simulated OHLCV data ending at current price
  const direction=isUp?1:-1;
  let p=prevPrice;
  for(let i=59;i>=0;i--){
    const dayVol=baseVol*(0.5+Math.random());
    const maxMove=(Math.abs(curPrice-prevPrice)/60)*3;
    const drift=(curPrice-prevPrice)/60;
    const noise=(Math.random()-0.5)*maxMove;
    const o=Math.max(1,p);
    const c=Math.max(1,o+drift+noise);
    const h=Math.max(o,c)+Math.random()*Math.abs(maxMove)*0.5;
    const l=Math.min(o,c)-Math.random()*Math.abs(maxMove)*0.5;
    bars.push({open:o,high:h,low:l,close:c,vol:dayVol});
    p=c;
  }
  // Force last bar to match current price
  bars[59]={open:bars[58].close,high:Math.max(curPrice,bars[58].close),low:Math.min(curPrice,bars[58].close),close:curPrice,vol:baseVol};
  return bars;
}

function drawCandleChart(canvas,bars,price){
  const ctx=canvas.getContext('2d');
  const W=canvas.width=canvas.offsetWidth*2;
  const H=canvas.height=canvas.offsetHeight*2;
  ctx.scale(1,1);

  const padL=60,padR=20,padT=20,padB=40;
  const chartW=W-padL-padR;
  const chartH=H-padT-padB;

  const allHighs=bars.map(b=>b.high);
  const allLows=bars.map(b=>b.low);
  const maxP=Math.max(...allHighs);
  const minP=Math.min(...allLows);
  const range=maxP-minP||1;
  const priceRange=maxP-minP;
  const yPx=chartH/priceRange;

  const candleW=Math.max(2,(chartW/bars.length)*0.7);
  const gap=chartW/bars.length;

  // Grid
  ctx.strokeStyle='rgba(255,255,255,0.04)';
  ctx.lineWidth=1;
  for(let i=0;i<=4;i++){
    const y=padT+(chartH/4)*i;
    ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(padL+chartW,y);ctx.stroke();
  }

  // Y axis labels
  ctx.fillStyle='#666';
  ctx.font=`bold ${Math.floor(H*0.024)}px Consolas,monospace`;
  ctx.textAlign='right';
  for(let i=0;i<=4;i++){
    const y=padT+(chartH/4)*i;
    const p=minP+(priceRange*(4-i)/4);
    ctx.fillText('$'+p.toFixed(p>=100?0:p>=10?1:2),padL-4,y+4);
  }

  // X axis labels
  ctx.textAlign='center';
  ctx.font=`${Math.floor(H*0.022)}px Consolas,monospace`;
  const labelCount=5;
  for(let i=0;i<labelCount;i++){
    const idx=Math.floor(i*(bars.length-1)/(labelCount-1));
    const x=padL+idx*gap+candleW/2;
    ctx.fillStyle='#555';
    ctx.fillText('D'+(bars.length-idx),x,padT+chartH+18);
  }

  // Candles
  bars.forEach((bar,i)=>{
    const x=padL+i*gap+(gap-candleW)/2;
    const isGreen=bar.close>=bar.open;
    const col=isGreen?'#00d68f':'#ff4444';

    // Wick
    ctx.strokeStyle=col;
    ctx.lineWidth=1;
    const wickX=x+candleW/2;
    ctx.beginPath();
    ctx.moveTo(wickX,padT+(maxP-bar.high)*yPx);
    ctx.lineTo(wickX,padT+(maxP-bar.low)*yPx);
    ctx.stroke();

    // Body
    const bodyTop=padT+(maxP-Math.max(bar.open,bar.close))*yPx;
    const bodyBot=padT+(maxP-Math.min(bar.open,bar.close))*yPx;
    const bodyH=Math.max(1,bodyBot-bodyTop);
    ctx.fillStyle=col;
    ctx.fillRect(x,bodyTop,candleW,bodyH);
  });

  // MA20 line
  const ma20=bars.map((_,i)=>{
    if(i<19)return null;
    return bars.slice(i-19,i+1).reduce((s,b)=>s+b.close,0)/20;
  });
  ctx.strokeStyle='rgba(255,176,32,0.7)';
  ctx.lineWidth=1.5;
  ctx.beginPath();
  let started=false;
  ma20.forEach((v,i)=>{
    if(v===null)return;
    const x=padL+i*gap+candleW/2;
    const y=padT+(maxP-v)*yPx;
    if(!started){ctx.moveTo(x,y);started=true;}
    else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // Current price line
  const curY=padT+(maxP-price.price)*yPx;
  ctx.strokeStyle='rgba(77,159,255,0.5)';
  ctx.lineWidth=1;
  ctx.setLineDash([4,4]);
  ctx.beginPath();
  ctx.moveTo(padL,curY);
  ctx.lineTo(padL+chartW,curY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Current price label
  ctx.fillStyle='rgba(77,159,255,0.9)';
  ctx.fillRect(W-padR-60,curY-10,60,20);
  ctx.fillStyle='#fff';
  ctx.font=`bold ${Math.floor(H*0.024)}px Consolas,monospace`;
  ctx.textAlign='center';
  ctx.fillText('$'+price.price.toFixed(price.price>=100?0:1),W-padR-30,curY+5);
}

function jumpToChart(ticker){
  const tab=document.querySelector('[data-tab="chart"]');
  if(tab){tab.click();}
  setTimeout(()=>{
    const sel=document.getElementById('tvSymbol');
    const opt=Array.from(sel.options).find(o=>o.value==='TWSE:'+ticker);
    if(opt){sel.value=opt.value;}else{sel.value='TWSE:2330';}
    loadTVWidget();
  },100);
  window.scrollTo({top:0,behavior:'smooth'});
}

// ============================================================
// IMPORT / EXPORT
// ============================================================
function exportPortfolio(){
  const data={
    version:8,
    exportDate:new Date().toISOString(),
    portfolios:Object.fromEntries(FAMILY_KEYS.map(m=>[m,loadMemberPortfolio(m)])),
    priceData:PRICE_DATA,
    historyData:HISTORY_DATA,
    fundamentals:FUNDAMENTALS
  };
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download='portfolio_'+new Date().toISOString().split('T')[0]+'.json';a.click();URL.revokeObjectURL(a.href);
  showToast('已匯出 portfolio.json ✓',3500);
}

function importPortfolio(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(data.portfolios){
        FAMILY_KEYS.forEach(m=>{if(data.portfolios[m])saveMemberPortfolio(m,data.portfolios[m]);});
        if(data.priceData)Object.assign(PRICE_DATA,data.priceData);
        if(data.historyData)Object.assign(HISTORY_DATA,data.historyData);
        if(data.fundamentals)Object.assign(FUNDAMENTALS,data.fundamentals);
        _holdingsCache=null;
        sectionsBuilt.clear();
        init();
        showToast('匯入成功！重新整理中 ✓',3000);
      }else{
        showToast('✗ 格式不符');
      }
    }catch(err){showToast('✗ 錯誤: '+err.message);}
  };
  reader.readAsText(file);
  e.target.value='';
}

// ============================================================
// ANALYTICS
// ============================================================
function buildRiskMeter(){
  const allHoldings=getAllHoldings();
  const sectors={};
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);if(!p.price)return;
    const mv=d.shares*p.price;
    if(!sectors[d.industry])sectors[d.industry]=0;
    sectors[d.industry]+=mv;
  });
  const totalMV=Object.values(sectors).reduce((a,b)=>a+b,0);
  const topSectorPct=totalMV>0?(Math.max(...Object.values(sectors))/totalMV*100):0;

  const totals=Object.keys(HISTORY_DATA).sort().map(d=>HISTORY_DATA[d].Total);
  const returns=totals.map((v,i)=>i===0?0:(v-totals[i-1])/totals[i-1]*100);
  const stdR=returns.length>1?Math.sqrt(returns.reduce((s,r)=>s+(r-(returns.reduce((a,b)=>a+b,0)/returns.length))**2,0)/returns.length):0;
  const volScore=Math.min(100,stdR*15);

  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiDay=twii?.changePct||0;
  const dayReturn=function(){
    let totalMV2=0,totalPrevMV=0;
    Object.entries(allHoldings).forEach(([t,d])=>{
      const p=getPrice(t);if(!p.price)return;
      totalMV2+=d.shares*p.price;totalPrevMV+=d.shares*(p.prev_close||p.price);
    });
    return totalPrevMV>0?((totalMV2-totalPrevMV)/totalPrevMV*100):0;
  }();
  const beta=twiiDay!==0?Math.abs(dayReturn/twiiDay):1;
  const betaScore=Math.min(100,beta*80);

  const top5Items=Object.entries(allHoldings).map(([t,d])=>({t:d.shares*(getPrice(t).price||0)}));
  top5Items.sort((a,b)=>b.d-a.d);
  const top5MV=top5Items.slice(0,5).reduce((s,v)=>s+v.d,0);
  const top5Pct=totalMV>0?(top5MV/totalMV*100):0;
  const concScore=Math.min(100,top5Pct*2);

  const riskScore=Math.round((topSectorPct*0.3+volScore*0.3+betaScore*0.2+concScore*0.2));
  const riskLabel=riskScore>=75?'高風險':riskScore>=50?'中高風險':riskScore>=30?'中低風險':'低風險';
  const riskColor=riskScore>=75?'var(--red)':riskScore>=50?'var(--amber)':riskScore>=30?'var(--blue)':'var(--green)';
  const riskBg=riskScore>=75?'rgba(255,68,68,0.15)':riskScore>=50?'rgba(255,176,32,0.15)':riskScore>=30?'rgba(77,159,255,0.15)':'rgba(0,214,143,0.15)';

  const riskMeterEl=document.getElementById('riskMeter');
  if(riskMeterEl){
    riskMeterEl.innerHTML=`
      <div class="risk-label">綜合風險</div>
      <div class="risk-bar">
        <div class="risk-fill" style="width:${riskScore}%;background:${riskColor}"></div>
      </div>
      <div class="risk-value" style="color:${riskColor}">${riskScore}/100</div>
      <div style="font-size:0.72rem;font-weight:700;color:${riskColor};margin-left:4px">${riskLabel}</div>
    `;
  }

  const riskTagsEl=document.getElementById('riskTags');
  if(riskTagsEl){
    const tags=[
      {label:'產業集中',value:topSectorPct,threshold:40,high:'⚠️ 集中度偏高'},
      {label:'日波動',value:volScore,threshold:50,high:'⚠️ 波動較大'},
      {label:'Beta',value:betaScore,threshold:50,high:'⚠️ 對大盤敏感'},
      {label:'Top5集中',value:concScore,threshold:60,high:'⚠️ 集中度偏高'}
    ];
    riskTagsEl.innerHTML=tags.map(t=>{
      const isHigh=t.value>t.threshold;
      const color=isHigh?'var(--red)':'var(--green)';
      const bg=isHigh?'rgba(255,68,68,0.08)':'rgba(0,214,143,0.08)';
      return `<span class="risk-tag" style="background:${bg};color:${color};border-color:${color}22">
        ${t.label}: ${t.value.toFixed(0)} ${isHigh?'⚠️':'✅'}
      </span>`;
    }).join('');
  }
}

function buildPEDistribution(){
  const allHoldings=getAllHoldings();
  const buckets={'<10':0,'10-15':0,'15-20':0,'20-25':0,'25-30':0,'30+':0};
  Object.entries(allHoldings).forEach(([t,d])=>{
    const f=getFundamental(t);
    const mv=d.shares*(getPrice(t).price||0);
    if(!mv||!f.trailingPE)return;
    const pe=f.trailingPE;
    if(pe<10)buckets['<10']+=mv;
    else if(pe<15)buckets['10-15']+=mv;
    else if(pe<20)buckets['15-20']+=mv;
    else if(pe<25)buckets['20-25']+=mv;
    else if(pe<30)buckets['25-30']+=mv;
    else buckets['30+']+=mv;
  });
  const total=Object.values(buckets).reduce((a,b)=>a+b,0)||1;
  const colors={'<10':'#00d68f','10-15':'#4d9fff','15-20':'#b066ff','20-25':'#ffb020','25-30':'#ff8c00','30+':'#ff4444'};

  const el=document.getElementById('peDistribution');
  if(el){
    el.innerHTML=Object.entries(buckets).map(([range,mv])=>{
      const pct=(mv/total*100);
      const count=Object.entries(allHoldings).filter(([t,d])=>{
        const f=getFundamental(t);return f.trailingPE&&mv>0&&(
          (range==='<10'&&f.trailingPE<10)||
          (range==='10-15'&&f.trailingPE>=10&&f.trailingPE<15)||
          (range==='15-20'&&f.trailingPE>=15&&f.trailingPE<20)||
          (range==='20-25'&&f.trailingPE>=20&&f.trailingPE<25)||
          (range==='25-30'&&f.trailingPE>=25&&f.trailingPE<30)||
          (range==='30+'&&f.trailingPE>=30)
        );
      }).length;
      return `<div class="pe-bar">
        <div class="pe-range">${range}</div>
        <div class="pe-track">
          <div class="pe-fill" style="width:${pct.toFixed(1)}%;background:${colors[range]}"></div>
        </div>
        <div class="pe-count" style="color:${colors[range]}">${count}</div>
        <div style="font-size:0.6rem;color:var(--text3);margin-left:4px">${pct.toFixed(0)}%</div>
      </div>`;
    }).join('');
  }
}

function buildMonthlyTable(){
  const sortedDates=Object.keys(HISTORY_DATA).sort();
  if(sortedDates.length<2)return;

  const monthlyData=[];
  let currentMonth=null;
  let monthStart=null;
  sortedDates.forEach(d=>{
    const [year,month]=d.split('-');
    const key=year+'-'+month;
    if(key!==currentMonth){
      if(monthStart&&monthlyData.length>0){
        monthlyData[monthlyData.length-1].end=d;
        monthlyData[monthlyData.length-1].endVal=HISTORY_DATA[d]?.Total||monthlyData[monthlyData.length-1].endVal;
      }
      currentMonth=key;
      monthStart=d;
      monthlyData.push({month:key,start:d,startVal:HISTORY_DATA[d]?.Total||0,end:d,endVal:HISTORY_DATA[d]?.Total||0});
    } else {
      monthlyData[monthlyData.length-1].end=d;
      monthlyData[monthlyData.length-1].endVal=HISTORY_DATA[d]?.Total||0;
    }
  });

  // TAIEX monthly data (rough estimate using available index data)
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiPct=twii?.changePct||0;

  const tbody=document.getElementById('monthlyTableBody');
  if(!tbody)return;

  let cumulativeReturn=0;
  const firstVal=monthlyData[0]?.startVal||1;

  tbody.innerHTML=monthlyData.slice().reverse().slice(0,12).map(m=>{
    const monthRet=m.startVal>0?((m.endVal-m.startVal)/m.startVal*100):0;
    cumulativeReturn=(m.endVal-firstVal)/firstVal*100;
    const monthName=m.month.replace(/^(\d{4})-(\d{2})$/,(_,y,mo)=>y+'年'+parseInt(mo)+'月');
    const cls=monthRet>=0?'up':monthRet<0?'down':'neu';
    const twiiMonthEst=0; // rough estimate — full TAIEX monthly data not available
    const alphaEst=monthRet-twiiMonthEst;

    return `<tr>
      <td>${monthName}</td>
      <td>${fmtTWDShort(m.startVal)}</td>
      <td>${fmtTWDShort(m.endVal)}</td>
      <td class="monthly-return ${cls}">${monthRet>=0?'+':''}${monthRet.toFixed(1)}%</td>
      <td class="monthly-return ${cumulativeReturn>=0?'up':'down'}">${cumulativeReturn>=0?'+':''}${cumulativeReturn.toFixed(1)}%</td>
      <td class="monthly-return ${alphaEst>=0?'up':'down'}" style="font-size:0.7rem">${alphaEst>=0?'+':''}${alphaEst.toFixed(1)}%</td>
    </tr>`;
  }).join('');
}

function _getDayReturn(){
  let totalMV=0,totalPrevMV=0;
  Object.entries(getAllHoldings()).forEach(([t,d])=>{
    const p=getPrice(t); if(!p.price)return;
    totalMV+=d.shares*p.price;totalPrevMV+=d.shares*(p.prev_close||p.price);
  });
  return totalPrevMV>0?((totalMV-totalPrevMV)/totalPrevMV*100):0;
}
// _dayReturnEstimate now computed lazily in buildMonthlyTable to avoid timing issues
function buildAnalytics(){
  const allHoldings=getAllHoldings();
  let totalMV=0,totalCost=0,totalPrevMV=0,winningStocks=0,totalStocks=0;
  const sectorMV={};
  Object.entries(allHoldings).forEach(([t,d])=>{const p=getPrice(t); if(!p.price)return; const mv=d.shares*p.price; const prevMV=d.shares*(p.prev_close||p.price); totalMV+=mv; totalPrevMV+=prevMV; if(d.cost>0){totalCost+=d.cost; totalStocks++; if(mv>d.cost)winningStocks++;} if(!sectorMV[d.industry])sectorMV[d.industry]=0; sectorMV[d.industry]+=mv; });
  const gain=totalMV-totalCost;
  const gainPct=totalCost>0?(gain/totalCost*100):0;
  const dayReturn=totalPrevMV>0?((totalMV-totalPrevMV)/totalPrevMV*100):0;
  const maxSector=Object.entries(sectorMV).sort((a,b)=>b[1]-a[1])[0];
  const topStock=Object.entries(allHoldings).map(([t,d])=>({ticker:t,mv:d.shares*(getPrice(t).price||0)})).filter(d=>d.mv>0).sort((a,b)=>b.mv-a.mv)[0];
  const stockCount=Object.keys(allHoldings).length;

  const totals=Object.keys(HISTORY_DATA).sort().map(d=>HISTORY_DATA[d].Total);
  let maxVal=totals[0]||1, maxDrawdown=0;
  totals.forEach(v=>{if(v>maxVal)maxVal=v;const dd=(maxVal-v)/maxVal*100;if(dd>maxDrawdown)maxDrawdown=dd;});

  const returns=totals.map((v,i)=>i===0?0:(v-totals[i-1])/totals[i-1]*100);
  const avgR=returns.reduce((a,b)=>a+b,0)/returns.length;
  const stdR=Math.sqrt(returns.reduce((s,r)=>s+(r-avgR)**2,0)/returns.length);
  const sharpe=stdR>0?(avgR/stdR*Math.sqrt(252)).toFixed(2):'--';

  // Monthly return approximation
  const monthlyRets=[];
  const sortedDates=Object.keys(HISTORY_DATA).sort();
  if(sortedDates.length>=20){
    for(let i=20;i<sortedDates.length;i+=20){
      const prev=sortedDates[i-20];
      const curr=sortedDates[i];
      if(prev&&curr){
        const pRet=(HISTORY_DATA[curr].Total-HISTORY_DATA[prev].Total)/HISTORY_DATA[prev].Total*100;
        monthlyRets.push(pRet);
      }
    }
  }
  const bestMonth=monthlyRets.length>0?Math.max(...monthlyRets):0;
  const worstMonth=monthlyRets.length>0?Math.min(...monthlyRets):0;

  // Beta calculation vs TAIEX (approximate using 0050 as proxy)
  const twii = MARKET_INDICES.find(i => i.ticker === '^TWII');
  const twiiDay = twii ? twii.changePct : 0;
  const portfolioBeta = dayReturn !== 0 && twiiDay !== 0 ? (dayReturn / twiiDay).toFixed(2) : '--';

  // Top-5 concentration
  const top5MV = Object.entries(allHoldings).map(([t,d]) => d.shares * (getPrice(t).price||0))
    .sort((a,b)=>b-a).slice(0,5).reduce((s,v)=>s+v,0);
  const top5Pct = totalMV > 0 ? (top5MV / totalMV * 100).toFixed(1) : '0';

  const metrics=[
    {label:'整體報酬率',value:fmtPct(gainPct),sub:'成本基礎',up:gainPct>=0},
    {label:'日報酬率',value:fmtPct(dayReturn),sub:'今日 P/L',up:dayReturn>=0},
    {label:'最大回撤',value:'-'+maxDrawdown.toFixed(1)+'%',sub:'歷史最大',up:false},
    {label:'最大產業',value:maxSector?.[0]||'--',sub:maxSector?fmtPct((maxSector[1]/totalMV)*100):''},
    {label:'持股檔數',value:stockCount,sub:'勝率 '+(totalStocks>0?(winningStocks/totalStocks*100).toFixed(0):0)+'%'},
    {label:'最大持股',value:topStock?.ticker||'--',sub:topStock?fmtPct((topStock.mv/totalMV)*100):''},
    {label:'總市值',value:fmtTWD(totalMV),sub:'即時估值'},
    {label:'未實現損益',value:(gain>=0?'+':'')+fmtTWD(gain),sub:'成本 vs 市值',up:gain>=0},
    {label:'起始資金',value:fmtTWD(totals[0]||0),sub:'2025-12-22'},
    {label:'夏普指數',value:sharpe!=='--'?sharpe:'--',sub:'年化 252日',up:parseFloat(sharpe)>=1},
    {label:'最佳月報酬',value:(bestMonth>=0?'+':'')+bestMonth.toFixed(1)+'%',sub:'近月數據',up:bestMonth>=0},
    {label:'最差月報酬',value:(worstMonth>=0?'+':'')+worstMonth.toFixed(1)+'%',sub:'近月數據',up:false},
    {label:'Beta (vs TAIEX)',value:portfolioBeta,sub:'今日估算',up:parseFloat(portfolioBeta)<=1.2},
    {label:'Top5 集中度',value:top5Pct+'%',sub:'前5大持股佔比',up:parseFloat(top5Pct)<=50},
    {label:'總成本',value:fmtTWD(totalCost),sub:'加權平均成本'},
    {label:'組合日波動',value:(stdR>0?stdR.toFixed(2)+'%':'--'),sub:'日標準差',up:stdR<2},
  ];
  const el=document.getElementById('analyticsGrid');
  el.innerHTML=metrics.map(m=>`
    <div class="analytics-card">
      <div class="analytics-label">${m.label}</div>
      <div class="analytics-value ${m.up===true?'up':m.up===false?'down':''}" style="${m.up?'color:var(--green)':m.up===false?'color:var(--red)':''}">${m.value}</div>
      <div class="analytics-sub">${m.sub}</div>
    </div>
  `).join('');
}

function buildHeatmap(){
  const allHoldings=getAllHoldings();
  const cells=Object.entries(allHoldings).map(([t,d])=>{
    const p=getPrice(t);
    const mv=d.shares*(p.price||0);
    const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
    const w52pct=p.year_low&&p.year_high?((p.price-p.year_low)/(p.year_high-p.year_low)*100):50;
    return{ticker:t,name:d.name,mv,chgPct,w52pct};
  }).filter(d=>d.mv>0).sort((a,b)=>b.mv-a.mv);

  const maxMV=cells[0]?.mv||1;
  const maxAbsChg=cells.length>0?Math.max(...cells.map(d=>Math.abs(d.chgPct)),3):3;
  const el=document.getElementById('heatmapGrid');
  if(!el)return;

  function heatColor(chgPct){
    const norm=(chgPct/maxAbsChg+1)/2;
    if(norm>0.5){
      const g=Math.round(26+(norm-0.5)*2*0x68+(1-(norm-0.5)*2)*0x2a);
      const r=Math.round(26+(1-norm)*2*0x4d);
      const b=Math.round(26+(norm-0.5)*2*0x8f+(1-(norm-0.5)*2)*0x2a);
      return `rgb(${r},${Math.min(g,0xd6)},${b})`;
    }else{
      const r=Math.round(26+(0.5-norm)*2*0x4d+norm*2*0x2a);
      const g=Math.round(26+(0.5-norm)*2*0x44+norm*2*0x2a);
      const b=Math.round(26+(0.5-norm)*2*0x2a+norm*2*0x2a);
      return `rgb(${r},${g},${b})`;
    }
  }

  el.innerHTML=cells.map(d=>{
    const bg=heatColor(d.chgPct);
    const borderColor=d.chgPct>=0?'rgba(0,214,143,0.3)':'rgba(255,68,68,0.3)';
    const textColor=d.chgPct>=0?'var(--green)':'var(--red)';
    const w52Color=d.w52pct>=80?'var(--green)':d.w52pct<=20?'var(--red)':'var(--text3)';
    const szPct=(d.mv/maxMV)*100;
    const cellW=Math.max(72,Math.min(160,72+szPct*0.6));
    const shortName=d.name.length>3?d.name.slice(0,3)+'…':d.name;
    const cellStyle=szPct>40?'width:'+(cellW+40)+'px;':'';
    return `<div class="heatmap-cell" style="background:${bg};border-color:${borderColor}" onclick="jumpToChart('${d.ticker}')">
      <div class="heatmap-ticker" style="color:${textColor}">${d.ticker}</div>
      <div class="heatmap-chg" style="color:${textColor}">${fmtPct(d.chgPct)}</div>
      <div class="heatmap-mv">${fmtTWDShort(d.mv)}</div>
      <div style="font-size:0.52rem;font-family:var(--font-mono);color:${w52Color};margin-top:2px">52W ${d.w52pct.toFixed(0)}%</div>
    </div>`;
  }).join('');
}

function sortMovers(btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  currentSort=btn.dataset.sort;
  buildMoversTable();
}

function buildMoversTable(){
  const allHoldings=getAllHoldings();
  let items=Object.entries(allHoldings).map(([t,d])=>{
    const p=getPrice(t);
    const mv=d.shares*(p.price||0);
    const prevMV=d.shares*(p.prev_close||p.price);
    const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
    const w52pct=p.year_low&&p.year_high?((p.price-p.year_low)/(p.year_high-p.year_low)*100):50;
    return{ticker:t,name:d.name,industry:d.industry,mv,chgPct,w52pct};
  }).filter(d=>d.mv>0);

  if(currentSort==='chg')items.sort((a,b)=>Math.abs(b.chgPct)-Math.abs(a.chgPct));
  else if(currentSort==='52w')items.sort((a,b)=>Math.abs(b.w52pct-50)-Math.abs(a.w52pct-50));
  else items.sort((a,b)=>b.mv-a.mv);

  const el=document.getElementById('moversTable');
  el.innerHTML=items.map((d,i)=>`
    <div class="holding-row" style="cursor:pointer" onclick="jumpToChart('${d.ticker}')">
      <div class="holding-left">
        <span class="rank-tag ${i===0?'top':i===items.length-1?'bottom':''}">${i+1}</span>
        <span class="holding-ticker">${d.ticker}</span>
        <div>
          <div class="holding-name">${d.name}</div>
          <span class="industry-tag">${d.industry}</span>
        </div>
      </div>
      <div class="holding-right">
        <div class="holding-mv">${fmtTWD(d.mv)}</div>
        <div class="holding-pct" style="color:var(--${d.chgPct>=0?'green':'red'})">${fmtPct(d.chgPct)}</div>
      </div>
    </div>
  `).join('');
}

function buildCompare(){
  const allHoldings=getAllHoldings();
  const t0050=getPrice('0050');
  const benchChg=t0050.prev_close?((t0050.price-t0050.prev_close)/t0050.prev_close*100):0;
  const top5=Object.entries(allHoldings)
    .map(([t,d])=>{
      const p=getPrice(t);
      const mv=d.shares*(p.price||0);
      const cost=d.cost;
      const gainPct=cost>0?((mv-cost)/cost*100):0;
      const dayChg=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
      return{ticker:t,name:d.name,mv,gainPct,dayChg,cost};
    })
    .filter(d=>d.cost>0&&d.mv>0)
    .sort((a,b)=>b.mv-a.mv)
    .slice(0,6);

  const el=document.getElementById('compareSection');
  el.innerHTML=top5.map(d=>`
    <div class="compare-card">
      <div style="font-weight:700;font-size:0.82rem;color:var(--blue);font-family:var(--font-mono);margin-bottom:6px">${d.ticker} ${d.name}</div>
      <div class="compare-row"><span class="compare-label">市值</span><span class="compare-val">${fmtTWD(d.mv)}</span></div>
      <div class="compare-row"><span class="compare-label">成本</span><span class="compare-val">${fmtTWD(d.cost)}</span></div>
      <div class="compare-row"><span class="compare-label">總報酬</span><span class="compare-val" style="color:var(--${d.gainPct>=0?'green':'red'})">${fmtPct(d.gainPct)}</span></div>
      <div class="compare-row"><span class="compare-label">日報酬</span><span class="compare-val" style="color:var(--${d.dayChg>=0?'green':'red'})">${fmtPct(d.dayChg)}</span></div>
      <div class="compare-row" style="border-bottom:1px solid var(--border)"><span class="compare-label">vs 0050</span>
        <span class="compare-val" style="color:var(--${(d.dayChg-benchChg)>=0?'green':'red'})">
          ${d.dayChg-benchChg>=0?'+':''}${(d.dayChg-benchChg).toFixed(2)}%
        </span>
      </div>
    </div>
  `).join('');
}

// ============================================================
// REFRESH
// ============================================================
function refreshData(){
  const btn=document.querySelector('.refresh-btn');
  const oldText=btn.textContent;
  btn.textContent='🔄 更新中...';
  btn.disabled=true;
  refreshCountdown = 15 * 60; // Reset countdown after manual refresh
  setTimeout(()=>{
    _holdingsCache=null;
    sectionsBuilt.clear();
    init();
    const activeTab=document.querySelector('.tab.active')?.dataset?.tab;
    if(activeTab==='history'){buildHistoryCharts();sectionsBuilt.add('history');}
    else if(activeTab==='signals'){buildSignals();sectionsBuilt.add('signals');}
    else if(activeTab==='news'){buildNews();sectionsBuilt.add('news');}
    else    if(activeTab==='analytics'){setTimeout(()=>{buildAnalytics();buildHeatmap();buildMoversTable();buildCompare();buildRiskMeter();buildPEDistribution();buildMonthlyTable();},50);sectionsBuilt.add('analytics');}
    else if(activeTab==='overview'){buildPortfolioAlertBanner();buildDailyPLSummary();buildSparkline();buildMoverCards();buildTopMovers();buildPortfolioHealth();buildActionableAlerts();buildMarketPulse();buildDividendSummary();updateQuickSummary();updateMarketMood();buildPortfolioGauge();buildDailyPLCard();buildNewsSummary();updateMarketContextBanner();}
    btn.textContent=oldText;
    btn.disabled=false;
    showToast('資料已更新 ✓',2000);
  },800);
}

// ============================================================
// TABS
// ============================================================
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    tab.classList.add('active');
    const sec=document.getElementById('sec-'+tab.dataset.tab);
    if(sec)sec.classList.add('active');
    if(tab.dataset.tab==='chart')setTimeout(loadTVWidget,100);
    if(tab.dataset.tab==='history'&&!sectionsBuilt.has('history')){buildHistoryCharts();sectionsBuilt.add('history');}
    if(tab.dataset.tab==='signals'&&!sectionsBuilt.has('signals')){buildSignals();sectionsBuilt.add('signals');}
    if(tab.dataset.tab==='news'&&!sectionsBuilt.has('news')){buildNews();sectionsBuilt.add('news');}
    if(tab.dataset.tab==='analytics'&&!sectionsBuilt.has('analytics')){setTimeout(()=>{buildAnalytics();buildHeatmap();buildMoversTable();buildCompare();},50);sectionsBuilt.add('analytics');}
    // Preload other sections lazily — removed duplicate calls
  });
});

// Keyboard navigation
document.addEventListener('keydown',(e)=>{
  // Only if not typing in an input
  if(e.target.tagName==='INPUT'||e.target.tagName=='SELECT'||e.target.tagName=='TEXTAREA')return;
  const num=parseInt(e.key);
  if(num>=1&&num<=7&&TAB_KEYS[num]){
    const tab=document.querySelector(`[data-tab="${TAB_KEYS[num]}"]`);
    if(tab)tab.click();
  }
  if(e.key==='r'||e.key==='R'){
    if(!e.ctrlKey&&!e.metaKey){loadData().then(()=>refreshData());}
  }
  // Chart interval shortcuts
  const activeTab=document.querySelector('.tab.active')?.dataset?.tab;
  if(activeTab==='chart'){
    if(e.key==='d'||e.key==='D'){document.getElementById('tvInterval').value='D';loadTVWidget();}
    if(e.key==='w'||e.key==='W'){document.getElementById('tvInterval').value='W';loadTVWidget();}
    if(e.key==='m'||e.key==='M'){document.getElementById('tvInterval').value='M';loadTVWidget();}
    if(e.key==='h'||e.key==='H'){document.getElementById('tvInterval').value='60';loadTVWidget();}
    if(e.key==='2'){document.getElementById('tvInterval').value='120';loadTVWidget();}
    if(e.key==='4'){document.getElementById('tvInterval').value='240';loadTVWidget();}
    if(e.key==='q'||e.key==='Q'){document.getElementById('quickSearch').focus();}
    if(e.key==='ArrowLeft'){navigateTVPrev();}
    if(e.key==='ArrowRight'){navigateTVNext();}
  }
  // Quick nav: press ticker symbol to jump to chart
  if(e.key==='Escape'){
    document.getElementById('newsSearch')?.blur();
  }
  // News refresh shortcut
  if(e.key==='n'||e.key==='N'){
    if(activeTab==='news')refreshNews();
  }
});

let _tvHistory=[];
let _tvHistoryIdx=0;
function navigateTVPrev(){
  if(_tvHistoryIdx>0){_tvHistoryIdx--;const sel=document.getElementById('tvSymbol');sel.value=_tvHistory[_tvHistoryIdx];loadTVWidget();}
}
function navigateTVNext(){
  if(_tvHistoryIdx<_tvHistory.length-1){_tvHistoryIdx++;const sel=document.getElementById('tvSymbol');sel.value=_tvHistory[_tvHistoryIdx];loadTVWidget();}
}

// Track TV navigation history
function trackTVNav(sym){
  // Remove future entries if we're not at the end
  if(_tvHistoryIdx < _tvHistory.length-1){_tvHistory=_tvHistory.slice(0,_tvHistoryIdx+1);}
  if(_tvHistory[_tvHistory.length-1]!==sym){_tvHistory.push(sym);}
  _tvHistoryIdx=_tvHistory.length-1;
}

// ============================================================
// INIT
// ============================================================
function updateQuickSummary(){
  const allHoldings=getAllHoldings();
  let totalMV=0,totalCost=0,totalPrevMV=0,winning=0,total=0;
  const sectorMV={};
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t); if(!p.price)return;
    const mv=d.shares*p.price; const prevMV=d.shares*(p.prev_close||p.price);
    totalMV+=mv; totalPrevMV+=prevMV;
    if(d.cost>0){totalCost+=d.cost; total++; if(mv>d.cost)winning++;}
    if(!sectorMV[d.industry])sectorMV[d.industry]=0; sectorMV[d.industry]+=mv;
  });
  const gain=totalMV-totalCost;
  const gainPct=totalCost>0?(gain/totalCost*100):0;
  const dayChg=totalMV-totalPrevMV;
  const dayPct=totalPrevMV>0?(dayChg/totalPrevMV*100):0;
  const winRate=total>0?(winning/total*100):0;
  const topSector=Object.entries(sectorMV).sort((a,b)=>b[1]-a[1])[0];

  const qsTotal=document.getElementById('qsTotal');
  if(qsTotal){qsTotal.textContent=fmtTWD(totalMV);}
  const qsDay=document.getElementById('qsDay');
  if(qsDay){qsDay.textContent=(dayChg>=0?'+':'')+fmtTWD(Math.abs(dayChg));qsDay.className='qs-value '+(dayChg>=0?'up':'down');}
  const qsGain=document.getElementById('qsGain');
  if(qsGain){qsGain.textContent=fmtPct(gainPct);qsGain.className='qs-value '+(gainPct>=0?'up':'down');}

  // Update quick stat chips (the card chips with new IDs)
  const winEl=document.getElementById('qsWinRate2');
  if(winEl){winEl.textContent=winRate.toFixed(0)+'%';winEl.parentElement.className='quick-stat-chip '+(winRate>=50?'up':'down');}
  const countEl=document.getElementById('qsCount2');
  if(countEl){countEl.textContent=Object.keys(allHoldings).filter(t=>getPrice(t).price>0).length+' 檔';}
  const sectorEl=document.getElementById('qsTopSector2');
  if(sectorEl){sectorEl.textContent=topSector?.[0]||'--';}

  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII'||i.ticker==='TWSE:TAIEX');
  const twiiEl=document.getElementById('qsTWII2');
  if(twiiEl&&twii){twiiEl.textContent=(twii.changePct>=0?'+':'')+twii.changePct.toFixed(2)+'%';twiiEl.parentElement.className='quick-stat-chip '+(twii.changePct>=0?'up':'down');}
  const p2330=getPrice('2330');
  const tsmcEl=document.getElementById('qsTSMC2');
  if(tsmcEl&&p2330.price){
    const chg=p2330.prev_close?((p2330.price-p2330.prev_close)/p2330.prev_close*100):0;
    tsmcEl.textContent=(chg>=0?'+':'')+chg.toFixed(2)+'%';
    tsmcEl.parentElement.className='quick-stat-chip '+(chg>=0?'up':'down');
  }

  // Update quick summary strip (top bar)
  const winElA=document.getElementById('qsWinRateA');
  if(winElA){winElA.textContent=winRate.toFixed(0)+'%';winElA.className='qs-value '+(winRate>=50?'up':'down');}
  const countElA=document.getElementById('qsCountA');
  if(countElA){countElA.textContent=Object.keys(allHoldings).filter(t=>getPrice(t).price>0).length+' 檔';}
  const sectorElA=document.getElementById('qsTopSectorA');
  if(sectorElA){sectorElA.textContent=topSector?.[0]||'--';}
  const tsmcElA=document.getElementById('qsTSMCA');
  if(tsmcElA&&p2330.price){
    const chg=p2330.prev_close?((p2330.price-p2330.prev_close)/p2330.prev_close*100):0;
    tsmcElA.textContent=(chg>=0?'+':'')+chg.toFixed(2)+'%';tsmcElA.className='qs-value '+(chg>=0?'up':'down');}
  const twiiElA=document.getElementById('qsTWIIA');
  if(twiiElA&&twii){twiiElA.textContent=(twii.changePct>=0?'+':'')+twii.changePct.toFixed(2)+'%';twiiElA.className='qs-value '+(twii.changePct>=0?'up':'down');}
}


// MARKET MOOD / FEAR-GREED
function updateMarketMood(){
  var allHoldings = getAllHoldings();
  var gainers = 0, losers = 0;
  Object.entries(allHoldings).forEach(function(entry) {
    var t = entry[0], d = entry[1];
    var p = getPrice(t);
    if(!p.price || !p.prev_close) return;
    if(p.price > p.prev_close) gainers++;
    else if(p.price < p.prev_close) losers++;
  });
  var emojiEl = document.getElementById('moodEmoji');
  var labelEl = document.getElementById('moodLabel');
  var barEl = document.getElementById('moodBar');
  var gainersEl = document.getElementById('gainersCount');
  var losersEl = document.getElementById('losersCount');
  if(gainersEl) gainersEl.textContent = gainers;
  if(losersEl) losersEl.textContent = losers;
  var total = gainers + losers;
  var fgr = total > 0 ? gainers / total : 0.5;
  var twii = MARKET_INDICES.find(function(i) { return i.ticker === '^TWII'; });
  if(twii && twii.changePct > 0) fgr = Math.min(1, fgr + twii.changePct * 0.05);
  if(twii && twii.changePct < 0) fgr = Math.max(0, fgr + twii.changePct * 0.05);
  fgr = Math.max(0, Math.min(1, fgr));
  var label = '中性', color = 'var(--amber)', emoji = '➡';
  if(fgr >= 0.75){ label = '極度貪婪'; color = '#ff4444'; emoji = '🔥'; }
  else if(fgr >= 0.62){ label = '偏多'; color = 'var(--green)'; emoji = '📈'; }
  else if(fgr >= 0.55){ label = '略偏多'; color = '#4d9fff'; emoji = '↗'; }
  else if(fgr >= 0.45){ label = '中性'; color = 'var(--amber)'; emoji = '➡'; }
  else if(fgr >= 0.38){ label = '略偏空'; color = '#ff8c00'; emoji = '↘'; }
  else if(fgr >= 0.25){ label = '偏空'; color = 'var(--red)'; emoji = '📉'; }
  else { label = '極度恐慌'; color = '#ff4444'; emoji = '❄️'; }

  // Build more useful market pulse description
  var pulseDesc = gainers + '漲 / ' + losers + '跌';
  if(twii) pulseDesc += ' · 加權 ' + (twii.changePct >= 0 ? '+' : '') + twii.changePct.toFixed(2) + '%';
  var fgrVal = Math.round(fgr * 100);

  var barW = Math.round(fgr * 100);
  if(emojiEl) emojiEl.textContent = emoji;
  if(labelEl){ labelEl.textContent = label; labelEl.style.color = color; }
  if(barEl){ barEl.style.width = barW + '%'; barEl.style.background = color; }

  // Update market pulse badge
  const pulseIcon = document.getElementById('pulseIcon');
  const pulseText = document.getElementById('pulseText');
  const pulseBg   = document.getElementById('marketPulseBadge');
  if(pulseIcon) pulseIcon.textContent = emoji;
  if(pulseText){
    pulseText.textContent = gainers + '↑ ' + losers + '↓ · ' + (twii ? (twii.changePct >= 0 ? '+' : '') + twii.changePct.toFixed(2) + '%' : '--');
    pulseText.style.color = color;
  }
  if(pulseBg){
    pulseBg.style.borderColor = color + '33';
    pulseBg.style.background = color + '11';
  }
}



// QUICK STOCK SEARCH
function handleQuickSearch(query){
  var el = document.getElementById('searchResults');
  if(!el) return;
  if(query.length < 1){ el.style.display = 'none'; return; }
  var q = query.toLowerCase();
  var allHoldings = getAllHoldings();
  var results = Object.entries(allHoldings)
    .filter(function(e){ return e[0].toLowerCase().indexOf(q) >= 0 || e[1].name.indexOf(q) >= 0; })
    .slice(0, 6);
  if(results.length === 0){
    el.innerHTML = '<div style="padding:8px 12px;font-size:0.72rem;color:var(--text3)">No match</div>';
  } else {
    el.innerHTML = results.map(function(e){
      var t = e[0], d = e[1];
      var p = getPrice(t);
      var chg = p.prev_close ? ((p.price - p.prev_close) / p.prev_close * 100) : 0;
      var cls = chg >= 0 ? 'var(--green)' : 'var(--red)';
      return '<div onclick="jumpToChart(\'' + t + '\')" style="padding:7px 12px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;border-bottom:1px solid var(--border);transition:background 0.1s;font-size:0.75rem" onmouseover="this.style.background=\'var(--surface2)\'" onmouseout="this.style.background=\'transparent\'">        <div><span style="font-weight:700;font-family:var(--font-mono);color:var(--blue)">' + t + '</span> <span style="color:var(--text2)">' + d.name + '</span></div>        <span style="font-family:var(--font-mono);font-weight:600;color:' + cls + '">' + (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%</span>      </div>';
    }).join('');
  }
  el.style.display = 'block';
}
function hideSearchResults(){
  var el = document.getElementById('searchResults');
  if(el) el.style.display = 'none';
}



// AUTO-REFRESH COUNTDOWN TIMER
let refreshCountdown = 15 * 60; // 15 minutes in seconds
function startRefreshTimer() {
  const el = document.getElementById('refreshTimer');
  if (!el) return;
  setInterval(() => {
    refreshCountdown--;
    if (refreshCountdown <= 0) {
      refreshCountdown = 15 * 60;
      // Silently refresh data every 15 minutes
      const btn = document.querySelector('.refresh-btn');
      if (btn && document.visibilityState !== 'hidden') {
        // Don't auto-refresh, just reset counter — user clicks refresh
      }
    }
    const m = Math.floor(refreshCountdown / 60);
    const s = refreshCountdown % 60;
    el.textContent = m + 'm' + (s < 10 ? '0' : '') + s + 's';
  }, 1000);
}

// NEWS SENTIMENT SUMMARY
function buildNewsSummary(){
  var el = document.getElementById('newsSummaryGrid');
  if(!el || !NEWS_DATA || NEWS_DATA.length === 0) return;
  var pos = NEWS_DATA.filter(function(n){ return n.sentiment === 'pos'; }).length;
  var neg = NEWS_DATA.filter(function(n){ return n.sentiment === 'neg'; }).length;
  var neu = NEWS_DATA.filter(function(n){ return n.sentiment === 'neu'; }).length;
  var total = NEWS_DATA.length;
  var posPct = total > 0 ? Math.round(pos / total * 100) : 50;
  var sentimentColor = posPct >= 60 ? 'var(--green)' : posPct <= 40 ? 'var(--red)' : 'var(--amber)';
  var sentimentLabel = posPct >= 60 ? '多頭主導 🐂' : posPct <= 40 ? '空頭主導 🐻' : '多空均衡';

  // Compute sector impact from news
  var sectorImpact = {};
  var tickerCounts = {};
  NEWS_DATA.forEach(function(n) {
    if (n.related && Array.isArray(n.related)) {
      n.related.forEach(function(t) {
        var industry = getIndustryByCode(t + '.TW');
        if (!industry) return;
        if (!sectorImpact[industry]) sectorImpact[industry] = { pos: 0, neg: 0, total: 0 };
        sectorImpact[industry].total++;
        if (n.sentiment === 'pos') sectorImpact[industry].pos++;
        if (n.sentiment === 'neg') sectorImpact[industry].neg++;
      });
    }
  });
  var sectorRows = Object.entries(sectorImpact)
    .sort(function(a, b) { return b[1].total - a[1].total; })
    .slice(0, 5)
    .map(function(e) {
      var net = e[1].pos - e[1].neg;
      var color = net > 0 ? 'var(--green)' : net < 0 ? 'var(--red)' : 'var(--amber)';
      var arrow = net > 0 ? '▲' : net < 0 ? '▼' : '─';
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:3px 0;font-size:0.7rem">'
        + '<span style="color:var(--text2)">' + e[0] + '</span>'
        + '<span style="font-family:var(--font-mono);font-weight:600;color:' + color + '">'
        + arrow + ' ' + net + '</span></div>';
    }).join('');

  el.innerHTML = '<div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:10px">'
    + '<div style="display:flex;align-items:center;gap:10px">'
    + '<div style="font-size:1.3rem;flex-shrink:0;font-family:var(--font-mono);color:' + sentimentColor + '">'
    + (posPct >= 60 ? '/\\' : posPct <= 40 ? 'v' : '--') + '</div>'
    + '<div style="flex:1">'
    + '<div style="font-size:0.8rem;font-weight:700;color:' + sentimentColor + '">' + sentimentLabel + '</div>'
    + '<div style="font-size:0.62rem;color:var(--text3);margin-top:2px">共 ' + total + ' 則新聞</div>'
    + '</div>'
    + '<div style="display:flex;gap:10px;font-size:0.78rem;font-weight:700;font-family:var(--font-mono)">'
    + '<span style="color:var(--green)">+ ' + pos + '</span>'
    + '<span style="color:var(--red)">- ' + neg + '</span>'
    + '<span style="color:var(--text3)">= ' + neu + '</span>'
    + '</div></div>'
    + (sectorRows ? '<div style="border-top:1px solid var(--border);padding-top:8px;margin-top:6px">'
      + '<div style="font-size:0.6rem;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.04em">📌 產業影響</div>'
      + sectorRows + '</div>' : '')
    + '</div>';
}


// ================================================================
// DYNAMIC DATA LOADER — fetches from data.json / history.json
// Falls back to embedded static data if fetch fails (e.g. file:// mode)
// ================================================================

async function loadData() {
  const isFile = window.location.protocol === 'file:';

  function safeJson(res) {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  // Generic fetch with XHR fallback for file:// mode
  async function fetchText(url) {
    // Try fetch first (works for http/https, and for file:// if browser allows)
    try {
      const resp = await fetch(url, { mode: isFile ? 'same-origin' : 'cors' });
      if (resp.ok) return await resp.text();
    } catch (_) {}
    // Fallback: XMLHttpRequest for file:// (not blocked in some browsers)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 0 || xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error('XHR failed: ' + xhr.status));
          }
        }
      };
      xhr.onerror = () => reject(new Error('XHR error'));
      xhr.send();
    });
  }

  // Fetch data.json (price + fundamentals + indices)
  try {
    const text = await fetchText('data.json');
    const d = JSON.parse(text);
    if (d.prices) {
      Object.assign(PRICE_DATA, d.prices);
    }
    if (d.fundamentals) {
      Object.assign(FUNDAMENTALS, d.fundamentals);
    }
    if (d.indices && d.indices.length > 0) {
      MARKET_INDICES.splice(0, MARKET_INDICES.length, ...d.indices);
    }
    // Update the last-updated indicator if present
    const updated = d.updated || new Date().toISOString();
    const el = document.getElementById('lastUpdated');
    if (el) el.textContent = updated;
  } catch (e) {
    console.warn('[loadData] data.json load failed, using static data:', e.message);
  }

  // Fetch history.json (portfolio history)
  try {
    const text = await fetchText('history.json');
    const h = JSON.parse(text);
    if (h && typeof h === 'object') {
      Object.assign(HISTORY_DATA, h);
    }
  } catch (e) {
    console.warn('[loadData] history.json load failed, using static data:', e.message);
  }
}

// ================================================================
// INIT — now async, waits for loadData before rendering
// ================================================================

async function init() {
  updateMarketStatus();
  buildMarketContextBanner();
  updateHeader();
  buildPortfolioAlertBanner();
  updateGlobalSummary();
  updateFamilyCards();
  buildSectorList();
  buildMemberPanels();
  buildPie();
  buildHoldingSummary();
  buildTVSelector();
  buildIndicesGrid();
  buildTickerStrip();
  buildPortfolioMetrics();
  buildAlerts();
  buildConcentration();
  buildPortfolioHealth();
  buildSparkline();
  buildActionableAlerts();
  buildMarketPulse();
  buildSectorPulseBars();
  buildDividendSummary();
  buildPortfolioGauge();
  buildDailyPLCard();
  buildRebalancingSuggestions();
  buildQuickStatsStrip();
  buildTAIEXMiniSparkline();
  updateQuickSummary();
  updateMarketMood();
  buildMoverCards();
  buildTopMovers();
  buildNewsSummary(); // News sentiment + sector impact
  startRefreshTimer(); // Auto-refresh countdown
}

// Auto-refresh every 30 minutes
// Refresh data from JSON every 30 min, then re-init
setInterval(async () => {
  await loadData();
  refreshData();
}, 30*60*1000);
// Footer time update
function updateFooterTime(){
  const el=document.getElementById('footerTime');
  if(el){el.textContent=new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});}
}
updateFooterTime();
setInterval(updateFooterTime,60000);

// Scroll to top button
window.addEventListener('scroll',()=>{
  const btn=document.getElementById('scrollTopBtn');
  if(btn){btn.classList.toggle('visible',window.scrollY>200);}
});
document.addEventListener('DOMContentLoaded', async () => { await loadData(); init(); });
