
// START marker for main script
console.log('[MAIN SCRIPT] Starting at line 3110...');
// GLOBAL ERROR HANDLER
window.__mainScriptErrors = [];
window.onerror = function(msg, src, line, col, err) {
  window.__mainScriptErrors.push({ msg, line, col, err: err ? err.message : null });
  console.error('[MAIN SCRIPT ERROR at line', line + ']', msg, err ? err.message : '');
  return false;
};
window.addEventListener('unhandledrejection', function(e) {
  window.__mainScriptErrors.push({ type: 'unhandledrejection', msg: String(e.reason) });
  console.error('[MAIN SCRIPT unhandled rejection]', e.reason);
});
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
// 家庭成員索引（給 updateFamilyCards / 歷史圖表等用）
// ============================================================
const FAMILY_KEYS = Object.keys(PORTFOLIOS);
const FAMILY_CLASS = {
  '👨 爸爸':      'family-dad',
  '👩 太太':      'family-mom',
  '👦 兒子 (大)': 'family-son1',
  '👦 兒子 (小)': 'family-son2'
};
const FAMILY_COLOR = {
  '👨 爸爸':      '#4d9fff',
  '👩 太太':      '#b066ff',
  '👦 兒子 (大)': '#00d68f',
  '👦 兒子 (小)': '#ffb020'
};

// ============================================================
// DATA — loaded from data.js (external script tag)
// NEWS_DATA fallback — data.js declares it as const, so we must NOT
// redeclare here (would throw SyntaxError and kill the whole script).
// ============================================================
window.NEWS_DATA = (typeof NEWS_DATA !== 'undefined') ? NEWS_DATA : [];


// ============================================================
// LIVE RSS NEWS FEED (Taiwan market news)
// ============================================================
const RSS_FEEDS = [
  { url: 'https://news.cnyes.com/rss/tw_stock.rss', label: 'Yahoo股市', tag: 'cnyes' },
  { url: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=^TWII&region=US&lang=en-US', label: 'Yahoo TWII', tag: 'yahoo' },
  { url: 'https://money.udn.com/rss/feed.daily?pitch=101', label: '經濟日報', tag: 'udn' },
];
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

async function fetchRSS(url) {
  try {
    const resp = await fetch(CORS_PROXY + encodeURIComponent(url), { signal: AbortSignal.timeout(8000) });
    if (!resp.ok) return null;
    const text = await resp.text();
    return parseRSS(text, url);
  } catch (e) {
    return null;
  }
}

function parseRSS(xml, srcUrl) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const items = doc.querySelectorAll('item');
  const results = [];
  items.forEach(item => {
    const title = item.querySelector('title')?.textContent?.trim() || '';
    const link = item.querySelector('link')?.textContent?.trim() || '';
    const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
    const description = item.querySelector('description')?.textContent?.trim() || '';
    const rawDesc = description.replace(/<[^>]+>/g, '').slice(0, 200);
    const sentiment = detectSentiment(title + ' ' + rawDesc);
    const related = detectRelatedTickers(title + ' ' + rawDesc);
    const tag = srcUrl.includes('cnyes') ? 'cnyes' : 'yahoo';
    results.push({
      title, link, pubDate, description: rawDesc,
      sentiment, related, tag,
      source: tag === 'cnyes' ? 'Yahoo股市' : 'Yahoo財經',
      time: pubDate ? new Date(pubDate).toLocaleString('zh-TW') : '',
    });
  });
  return results;
}

function detectSentiment(text) {
  // Taiwan-specific positive keywords — ordered by specificity (more specific first)
  const posKw = [
    '漲停','利多','突破新高','創高','成長','獲利','上升','買超','法人買超','法人買','護國',
    'AI','紅盤','揚升','增','擴張','反彈','反轉','回升','反攻','帶量','護盤','除息','填息',
    '殖利率','股息','季報亮眼','超標','優於','首季','上半年','下半年','併購','擴廠',
    '新訂單','擴產','轉盈','超額配息','配息','樂觀','看俏','攻','目標價','調升','升級',
    '訂單回升','需求增','產能滿','客戶追單','EPS','營收創高','毛利率','護國神山','高殖利率',
    '低本益比','便宜','低估','價值','殖利率高','除息行情','填息行情','獲利佳','展望佳','後市看好',
    '漲','多頭','強','大漲','急漲','續漲','攻','量增'
  ];
  // Taiwan-specific negative keywords — ordered by specificity
  const negKw = [
    '跌停','利空','新低','衰退','虧損','下降','賣超','法人賣超','法人賣','警示','跳水',
    '重挫','暴跌','砍單','庫存','降價','失守','破底','假跌破','假突破','烏雲','夜星',
    '避險','逃命','法人調節','護國神山倒','地緣','戰爭','軍事','制裁','華為',
    '禁令','出口管制','PCE','CPI','Fed','升息','降息','縮表','寬鬆','庫存調整',
    '景氣','衰退','軟著陸','硬著陸','停滯','停滯性通膨','烏雲蓋頂','烏雲','夜星',
    '死亡交叉','跌破','重跌','大跌','急跌','續跌','崩','跌','空頭','弱','空','假突破'
  ];
  // Build regex: specific multi-char phrases first, then single chars
  const specificPos = posKw.filter(k => k.length > 1);
  const specificNeg = negKw.filter(k => k.length > 1);
  const singlePos = posKw.filter(k => k.length === 1);
  const singleNeg = negKw.filter(k => k.length === 1);

  // Check specific phrases first (multi-char)
  const hasNeg = specificNeg.some(k => text.includes(k));
  const hasPos = specificPos.some(k => text.includes(k));

  // Single chars — only count if NOT part of a longer word
  // E.g. "抗跌" should NOT count as neg because of "跌"
  const negRegex = new RegExp(`(?<![\\u4e00-\\u9fa5])${singleNeg.join('|(?![\\u4e00-\\u9fa5])')}(?![\\u4e00-\\u9fa5])`);
  const posRegex = new RegExp(`(?<![\\u4e00-\\u9fa5])${singlePos.join('|(?![\\u4e00-\\u9fa5])')}(?![\\u4e00-\\u9fa5])`);

  const posSingle = posRegex.test(text);
  const negSingle = negRegex.test(text);

  const posScore = (hasPos ? 2 : 0) + (posSingle ? 1 : 0);
  const negScore = (hasNeg ? 2 : 0) + (negSingle ? 1 : 0);

  if (negScore > posScore) return 'neg';
  if (posScore > negScore) return 'pos';
  return 'neu';
}

function detectRelatedTickers(text) {
  const known = ['2330','2308','3008','2317','2882','2881','2884','2880','2885','2886','2887','2887A','0050','00646','00878','00881','00981A','1301','2034','2382','2618','3045','3703','5880'];
  return known.filter(t => text.includes(t));
}

async function loadLiveRSS() {
  try {
    const all = await Promise.allSettled(RSS_FEEDS.map(f => fetchRSS(f.url)));
    const liveNews = all.filter(r => r.status === 'fulfilled' && r.value).flatMap(r => r.value);
    if (liveNews.length === 0) return;
    // Show LIVE badge
    const badge = document.getElementById('rssLiveBadge');
    if (badge) badge.style.display = 'inline';
    // Merge with existing NEWS_DATA, avoid duplicates by title
    const existingTitles = new Set(NEWS_DATA.map(n => n.title.slice(0, 30)));
    const newItems = liveNews.filter(n => !existingTitles.has(n.title.slice(0, 30)));
    newItems.slice(0, 15).forEach(n => NEWS_DATA.unshift(n));
    if (typeof filterNews === 'function') filterNews();
    updateNewsTicker();
    updateNewsSummaryInOverview();
    // Rebuild news-dependent UI components immediately
    if (typeof buildOverviewStrip === 'function') buildOverviewStrip();
    if (typeof buildPortfolioNewsDigest === 'function') buildPortfolioNewsDigest();
    if (typeof buildNews === 'function') buildNews();
    if (typeof buildMarketBreadth === 'function') buildMarketBreadth();
  } catch (e) {
    console.warn('[loadLiveRSS] RSS load failed:', e);
  }
}

function updateNewsSummaryInOverview() {
  const el = document.getElementById('newsSummaryGrid');
  if (!el || NEWS_DATA.length === 0) return;
  buildNewsSummary();
}

function updateNewsTicker() {
  const el = document.getElementById('rntMarqueeContent');
  if (!el || NEWS_DATA.length === 0) return;
  // Add RSS items to buildNewsTicker sources, then rebuild
  if (typeof buildNewsTicker === 'function') {
    buildNewsTicker(); // rebuild with RSS headlines mixed in
  }
}


// ============================================================
// UTILITIES
// ============================================================
function fmt(n){if(n>=1e6)return(n/1e6).toFixed(2)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n>0?Math.round(n).toLocaleString('zh-TW'):'0';}
function fmtTWD(n){return 'NT$'+Math.round(n).toLocaleString('zh-TW');}
function fmtTWDShort(val){
  if(Math.abs(val)>=100000000)return(val/100000000).toFixed(1)+'億';
  if(Math.abs(val)>=10000000)return(val/10000000).toFixed(1)+'千萬';
  if(Math.abs(val)>=10000)return(val/10000).toFixed(0)+'萬';
  return Math.round(val).toLocaleString('zh-TW');
}
function fmtPct(n){return(n>=0?'+':'')+parseFloat(n).toFixed(2)+'%';}
function fmtPrice(n){return n>=1000?Math.round(n).toLocaleString('zh-TW'):parseFloat(n).toFixed(2);}

 function getPrice(code){
  if(!code)return{price:0,year_high:0,year_low:0,prev_close:0};
  code=String(code).replace(/\.TW$/,'').replace(/^0+/,'');
  // PRICE_DATA keys are numeric strings like "2330", "0050" — strip leading zeros too
  const d=PRICE_DATA[code];
  if(d)return{price:d.price??0,year_high:d.year_high??0,year_low:d.year_low??0,prev_close:d.prev_close??0};
  // Try with leading zeros preserved (0050, 00646)
  const match=Object.keys(PRICE_DATA).find(k=>k.replace(/^0+/,'')===code);
  if(match)return{price:PRICE_DATA[match].price??0,year_high:PRICE_DATA[match].year_high??0,year_low:PRICE_DATA[match].year_low??0,prev_close:PRICE_DATA[match].prev_close??0};
  return{price:0,year_high:0,year_low:0,prev_close:0};
 }

function getFundamental(code){
  if(!code)return{trailingPE:null,dividendYield:null};
  code=String(code).replace(/\.TW$/,'').replace(/^0+/,'');
  const d=FUNDAMENTALS[code];
  if(d)return{trailingPE:d.trailingPE??null,dividendYield:d.dividendYield??null};
  const match=Object.keys(FUNDAMENTALS).find(k=>k.replace(/^0+/,'')===code);
  if(match)return{trailingPE:FUNDAMENTALS[match].trailingPE??null,dividendYield:FUNDAMENTALS[match].dividendYield??null};
  return{trailingPE:null,dividendYield:null};
}

const INDUSTRY_ICON = {
  '半導體':'🔲','電子':'📱','金融':'🏦','ETF':'📊',
  '航空':'✈️','光學':'📷','電信':'📡','化工':'⚗️',
  '營建':'🏗️','鋼鐵':'🔩','汽車':'🚗','農業':'🌾',
  '製藥':'💊','紡織':'🧵','食品':'🍎','航運':'🚢',
  '油電':'⚡','水資源':'💧','再生能源':'🌱','其他':'📦'
};
function getIndustryIcon(industry){return INDUSTRY_ICON[industry]||INDUSTRY_ICON['其他'];}

function getAllHoldings(){
  const result = {};
  Object.values(PORTFOLIOS).forEach(member => {
    member.forEach(s => {
      const t = s.code.replace('.TW', '');
      if (!result[t]) {
        result[t] = { name: s.name, shares: 0, cost: 0, industry: s.industry || '' };
      }
      result[t].shares += s.shares;
      result[t].cost  += (s.cost > 0 ? s.cost : 0) * s.shares;
    });
  });
  return result;
}

function getNameByCode(code){
  return getAllHoldings()[code.replace('.TW','')]?.name||code.replace('.TW','');
}

// Industry beta estimates for portfolio risk analysis
const INDUSTRY_BETAS = {
  半導體: 1.35, 光電: 1.25, 機電: 1.10, '通信網路': 1.20,
  '電子零組件': 1.15, 電子通路: 1.05, 資訊服務: 0.90,
  金融: 1.15, 鋼鐵: 1.20, 其他: 1.00,
  ETF: 0.95, INDEX: 1.00
};

// Get beta for a stock code by industry
function getBetaByCode(code){
  const ind = getIndustryByCode(code) || '其他';
  return INDUSTRY_BETAS[ind] || 1.0;
}

// Calculate weighted portfolio beta (fixed: use price data for market value)
function getPortfolioBeta(){
  const h = getAllHoldings();
  let totalMV = 0;
  const withMV = {};
  Object.entries(h).forEach(([code,d]) => {
    const p = getPrice(code);
    const mv = d.shares * (p.price||0);
    totalMV += mv;
    withMV[code] = { ...d, mv };
  });
  if(totalMV <= 0) return 1.0;
  return Object.values(withMV).reduce((s,x) => s + x.mv * getBetaByCode(x.industry || ''), 0) / totalMV;
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
function animateTotalValueCounter(totalMV, totalPrevMV){
  const el=document.getElementById('totalValue');
  if(!el) return;
  const startVal=Math.max(0,totalMV-(totalMV-totalPrevMV)*0.5); // Start at midpoint
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
  const tsmc=MARKET_INDICES.find(i=>i.ticker==='2330.TW');
  const isDown=dayPct<-0.3;
  const isUp=dayPct>0.3;
  // Use local variable to avoid referencing outer scope
  const totalVals=dates.map(d=>HISTORY_DATA[d]?.Total||0);
  const maxVal=Math.max(...totalVals);
  const localIsNewHigh=today>=maxVal;

  if(localIsNewHigh){
    title.textContent='🎉 歷史新高';
    text.textContent=`總市值突破 NT$${Math.round(today/10000).toLocaleString('zh-TW')}萬！`;
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
    text.textContent=`日增 NT$${Math.abs(Math.round(dayChg)).toLocaleString('zh-TW')} (${dayPct>=0?'+':''}${dayPct.toFixed(2)}%)，台積電 ${tsmc?.changePct>=0?'▲':'▼'} ${Math.abs(tsmc?.changePct||0).toFixed(2)}%`;
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

  // Market regime detection
  const winRate=totalStocks>0?winners/totalStocks:0.5;
  let regime='牛皮整理',regBg='rgba(255,176,32,0.1)',regColor='var(--amber)';
  if(dayChg>1.5&&winRate>0.7){regime='多頭🚀';regBg='rgba(0,214,143,0.1)';regColor='var(--green)';}
  else if(dayChg>0.5&&winRate>0.6){regime='穩漲📈';regBg='rgba(0,214,143,0.08)';regColor='var(--green)';}
  else if(dayChg<-1.5&&winRate<0.3){regime='空頭🔻';regBg='rgba(255,68,68,0.1)';regColor='var(--red)';}
  else if(dayChg<-0.5&&winRate<0.4){regime='回調📉';regBg='rgba(255,68,68,0.08)';regColor='var(--red)';}
  else if(Math.abs(dayChg)<0.3){regime='觀望👀';regBg='rgba(255,255,255,0.03)';regColor='var(--text3)';}

  // === NEW: Sector performance summary ===
  const sectorPerf={};
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);
    if(!p.price)return;
    const sector=d.industry||'其他';
    const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
    if(!sectorPerf[sector])sectorPerf[sector]={count:0,totalChg:0,totalMV:0};
    sectorPerf[sector].count++;
    sectorPerf[sector].totalChg+=chgPct;
    const mv=d.shares*p.price;
    sectorPerf[sector].totalMV+=mv;
  });
  const sectorEntries=Object.entries(sectorPerf).sort((a,b)=>b[1].totalChg-a[1].totalChg);
  const bestSector=sectorEntries[0];
  const worstSector=sectorEntries[sectorEntries.length-1];
  let theme='個股分化';
  if(dayChg>1)theme='全面上漲';
  else if(dayChg<-1)theme='普遍下跌';
  else if(bestSector&&bestSector[1].totalChg>1.5)theme=bestSector[0]+'領漲';
  else if(worstSector&&worstSector[1].totalChg<-1.5)theme=worstSector[0]+'拖累';
  else if(winRate>0.65)theme='結構偏多';
  else if(winRate<0.35)theme='結構偏空';

  // Build sector performance chips for the banner
  const sectorChipsHtml = sectorEntries.slice(0,4).map(([sector,data])=>{
    const avgChg=data.count>0?(data.totalChg/data.count):0;
    const color=avgChg>0?'var(--green)':avgChg<0?'var(--red)':'var(--text3)';
    const icon=getIndustryIcon(sector);
    return `<span style="display:inline-flex;align-items:center;gap:3px;font-size:0.62rem;color:${color};background:${avgChg>0?'rgba(0,214,143,0.08)':avgChg<0?'rgba(255,68,68,0.08)':'rgba(255,255,255,0.04)'};padding:2px 7px;border-radius:10px;border:1px solid ${avgChg>0?'rgba(0,214,143,0.15)':avgChg<0?'rgba(255,68,68,0.15)':'var(--border)'}">${icon} ${sector} ${avgChg>=0?'+':''}${avgChg.toFixed(1)}%</span>`;
  }).join('');

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
    <div style="width:1px;height:28px;background:var(--border);flex-shrink:0"></div>
    <div>
      <div style="font-size:0.58rem;color:var(--text3)">市場主題</div>
      <div style="font-size:0.7rem;font-weight:700;color:var(--text)">${theme}</div>
    </div>
    <div style="margin-left:auto;display:flex;align-items:center;gap:6px;flex-wrap:wrap">
      <span style="font-size:0.62rem;color:${regColor};background:${regBg};padding:2px 8px;border-radius:10px;font-weight:700">${regime}</span>
      <span id="marketAlertTag" style="font-size:0.62rem;color:var(--amber);background:rgba(255,176,32,0.1);padding:2px 8px;border-radius:10px">⚠️</span>
    </div>
  </div>
  ${sectorChipsHtml ? `<div style="padding:4px 20px 6px;border-top:1px solid var(--border);display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:0.6rem;color:var(--text3)"><span style="font-weight:600;text-transform:uppercase;letter-spacing:0.04em;flex-shrink:0">產業:</span>${sectorChipsHtml}</div>` : ''}
  `;
  // Dynamic market alert
  const alertTag = document.getElementById('marketAlertTag');
  if(alertTag){
    const tslaPct = (MARKET_INDICES.find(i=>i.ticker==='2330.TW')||{}).changePct||0;
    const twiiPct = (MARKET_INDICES.find(i=>i.ticker==='^TWII')||{}).changePct||0;
    let msg = '';
    const localDayChg = portfolioDayChg; // use local var to avoid scope confusion
    const localIsNewHigh = totalMV >= Math.max(...dates.map(d=>HISTORY_DATA[d]?.Total||0));
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
  const isLateAfter=isWeekday&&timeInMins>=830; // After 13:50 — after market hours
  const marketOpen=isWeekday&&timeInMins>=540&&timeInMins<=810; // 9:00-13:30
  const isPre=isWeekday&&timeInMins>=480&&timeInMins<540; // 8:00-9:00 pre-market
  const isAfter=isWeekday&&timeInMins>810&&timeInMins<830; // 13:30-13:50 after market

  const nextDate=new Date(taipeiDate);
  nextDate.setDate(nextDate.getDate()+(day===6?2:day===0?1:1));
  const nextStr=nextDate.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',weekday:'short'});

  if(isWeekend){
    banner.className='status-banner weekend';
    status.textContent='台股市場休市中 ⛱';
    dateEl.textContent=dateStr+' · 下一交易: '+nextStr;
  }else if(marketOpen){
    banner.className='status-banner open';
    status.textContent='台股市場交易中 🔴';
    dateEl.textContent=dateStr;
  }else if(isPre){
    banner.className='status-banner upcoming';
    status.textContent='台股即將開盤';
    dateEl.textContent=dateStr+' · 盤前 8:30';
  }else if(isAfter || isLateAfter){
    banner.className='status-banner closed';
    status.textContent='台股盤後報價中 📊';
    dateEl.textContent=dateStr+' · 13:30收盤';
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

  // Update navbar market badge
  const badge=document.getElementById('marketBadge');
  if(badge){
    if(isWeekend){
      badge.className='market-badge weekend';
      badge.textContent='🌴 休市';
    }else if(marketOpen){
      badge.className='market-badge open';
      badge.textContent='🔴 盤中';
    }else if(isPre){
      badge.className='market-badge upcoming';
      badge.textContent='🟡 盤前';
    }else if(isAfter || isLateAfter){
      badge.className='market-badge closed';
      badge.textContent='🌙 盤後';
    }else{
      badge.className='market-badge closed';
      badge.textContent='💤 收盤';
    }
  }
  // Navbar brand market status chip
  const chip=document.getElementById('marketStatusChip');
  if(chip){
    if(isWeekend){
      chip.textContent='🌴 休市';
      chip.style.background='rgba(255,176,32,0.1)';
      chip.style.color='var(--amber)';
    }else if(marketOpen){
      chip.textContent='🔴 交易中';
      chip.style.background='rgba(255,68,68,0.15)';
      chip.style.color='#ff6b6b';
    }else if(isPre){
      chip.textContent='🟡 盤前';
      chip.style.background='rgba(255,176,32,0.15)';
      chip.style.color='var(--amber)';
    }else{
      chip.textContent='📊 收盤';
      chip.style.background='var(--bg3)';
      chip.style.color='var(--text3)';
    }
  }
}

// ============================================================
// HEADER UPDATE
// ============================================================
function updateHeader(){
  // Use LIVE calculation (same as updateGlobalSummary) instead of HISTORY_DATA snapshot
  const allHoldings = getAllHoldings();
  let totalMV = 0, totalPrevMV = 0;
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if (p.price > 0) {
      totalMV += d.shares * p.price;
      totalPrevMV += d.shares * (p.prev_close || p.price);
    }
  });
  const chg = totalMV - totalPrevMV;
  const chgPct = totalPrevMV > 0 ? (chg / totalPrevMV) * 100 : 0;

  // Animated counter on first load
  const el=document.getElementById('totalValue');
  if(el&&el.textContent==='--'){
    animateTotalValueCounter(totalMV, totalPrevMV);
  } else {
    el.textContent=fmtTWD(totalMV);
  }

  const chgEl=document.getElementById('totalChange');
  chgEl.textContent=(chg>=0?'▲ ':'▼ ')+fmtTWD(Math.abs(chg))+' ('+fmtPct(chgPct)+')';
  chgEl.className='navbar-stat-change '+(chg>=0?'up':'down');
  if(chg<0)chgEl.classList.add('down','glow');else chgEl.classList.remove('down','glow');

  const lu=document.getElementById('lastUpdated');
  const now=new Date();
  lu.textContent=now.toLocaleString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
  lu.dataset.ts=now.toISOString(); // Store timestamp for relative time

  // Update browser tab title date
  const titleEl=document.getElementById('docTitleDate');
  if(titleEl) titleEl.textContent=new Date().toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'});

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

  // Update index chips in navbar
  const chipDefs = [
    {priceId:'navTWIIPrice',chgId:'navTWIIChg',ticker:'^TWII',fmt:(v)=>Math.round(v).toLocaleString('zh-TW')},
    {priceId:'navSPXPrice',chgId:'navSPXChg',ticker:'^GSPC',fmt:(v)=>v.toLocaleString('zh-TW',{minimumFractionDigits:2,maxFractionDigits:2})},
    {priceId:'navNDXPrice',chgId:'navNDXChg',ticker:'^IXIC',fmt:(v)=>v.toLocaleString('zh-TW',{minimumFractionDigits:2,maxFractionDigits:2})},
    {priceId:'navTSMPrice',chgId:'navTSMChg',ticker:'2330.TW',fmt:(v)=>v>=1000?Math.round(v).toLocaleString():v.toFixed(2)},
    // TX futures - estimate from TAIEX daily change
    {priceId:'navTXPrice',chgId:'navTXChg',ticker:'TX',fmt:(v)=>v>0?Math.round(v).toLocaleString():'--'},
    // USD/TWD - show from TWXRP or estimate
    {priceId:'navUSDPrice',chgId:'navUSDChg',ticker:'USD',fmt:(v)=>v>0?v.toFixed(2):'32.5'},
  ];
  chipDefs.forEach(def=>{
    const idx=MARKET_INDICES.find(i=>i.ticker===def.ticker);
    if(idx){
      const pe=document.getElementById(def.priceId);
      const ce=document.getElementById(def.chgId);
      if(pe)pe.textContent=def.fmt(idx.price);
      if(ce){
        const up=idx.changePct>=0;
        ce.textContent=(up?'▲ ':'▼ ')+Math.abs(idx.changePct).toFixed(2)+'%';
        ce.className='index-chg '+(up?'up':'down');
      }
    }
  });

  // Build ticker tape
  buildTickerTape();
}

function buildTickerTape(){
  const el=document.getElementById('tickerContent');
  if(!el) return;

  // Build items from MARKET_INDICES + portfolio holdings
  const items=[];

  // Market indices
  MARKET_INDICES.forEach(idx=>{
    const up=idx.changePct>=0;
    const priceStr=idx.price>=10000?Math.round(idx.price).toLocaleString('zh-TW'):idx.price.toFixed(2);
    const chgStr=(up?'+':'')+idx.changePct.toFixed(2)+'%';
    items.push({label:idx.sym,price:priceStr,chg:chgStr,up});
  });

  // Top portfolio holdings by market value
  const allHoldings=getAllHoldings();
  const sorted=Object.entries(allHoldings)
    .map(([t,d])=>{const p=getPrice(t);return{ticker:t,name:d.name,price:p.price||0,prev:p.prev_close||p.price};})
    .filter(x=>x.price>0)
    .sort((a,b)=>(b.price-b.prev)*b.price-(a.price-a.prev)*a.price);

  // Show top 8 holdings
  sorted.slice(0,8).forEach(item=>{
    const chg=item.prev>0?((item.price-item.prev)/item.prev*100):0;
    const up=chg>=0;
    const priceStr=item.price>=1000?Math.round(item.price).toLocaleString('zh-TW'):item.price.toFixed(2);
    const chgStr=(up?'+':'')+chg.toFixed(2)+'%';
    items.push({label:item.ticker+'  '+item.name,price:priceStr,chg:chgStr,up});
  });

  // Duplicate for seamless loop
  const doubled=[...items,...items];
  const html=doubled.map(it=>{
    const cls=it.up?'up':'down';
    return `<span class="ticker-item ${cls}"><b>${it.label}</b> $${it.price} <span style="font-size:0.6rem">${it.chg}</span><span class="ticker-sep">|</span></span>`;
  }).join('');

  el.innerHTML=html;
}

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
// BENCHMARK COMPARISON STRIP
// ============================================================
function buildBenchmarkStrip(){
  const map={
    'bmTWII': {ticker:'^TWII', fmt: v => v>=10000 ? v.toLocaleString('zh-TW',{maximumFractionDigits:0}) : v.toFixed(2)},
    'bmNASDAQ': {ticker:'^IXIC', fmt: v => v>=10000 ? v.toLocaleString('zh-TW',{maximumFractionDigits:0}) : v.toFixed(2)},
    'bmSPX': {ticker:'^GSPC', fmt: v => v.toFixed(2)},
    'bmTSMC': {ticker:'2330.TW', fmt: v => v>=1000 ? v.toLocaleString('zh-TW',{maximumFractionDigits:0}) : v.toFixed(2)},
    'bmHNH': {ticker:'2317.TW', fmt: v => v>=1000 ? v.toLocaleString('zh-TW',{maximumFractionDigits:0}) : v.toFixed(2)},
  };

  Object.entries(map).forEach(([id, cfg]) => {
    const idx = MARKET_INDICES.find(i => i.ticker === cfg.ticker);
    const el = document.getElementById(id);
    const chgEl = document.getElementById(id + 'Chg');
    if (!el || !idx) return;
    el.textContent = cfg.fmt(idx.price);
    if (chgEl) {
      const pct = idx.changePct;
      chgEl.textContent = (pct >= 0 ? '▲ ' : '▼ ') + Math.abs(pct).toFixed(2) + '%';
      chgEl.className = 'benchmark-delta ' + (pct >= 0 ? 'up' : 'down');
    }
  });
}

// ============================================================
// SECTOR ALLOCATION MINI VIEW
// ============================================================
function buildSectorAllocationMini(){
  const allHoldings = getAllHoldings();
  const sectorMV = {};
  let totalMV = 0;
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if (!p.price) return;
    const mv = d.shares * p.price;
    totalMV += mv;
    const sec = d.industry || '其他';
    if (!sectorMV[sec]) sectorMV[sec] = 0;
    sectorMV[sec] += mv;
  });

  const sorted = Object.entries(sectorMV).sort((a, b) => b[1] - a[1]);
  const count = sorted.length;

  const container = document.getElementById('sectorAllocationMini');
  const barsEl = document.getElementById('sectorBarsMini');
  const countEl = document.getElementById('sectorCountMini');
  if (!container || !barsEl) return;

  if (count === 0) { container.style.display = 'none'; return; }
  container.style.display = 'block';
  if (countEl) countEl.textContent = `${count} 個產業`;

  const colors = {
    '半導體': '#4d9fff', '金融': '#00d68f', '電子': '#b066ff',
    'AI/科技': '#e040fb', 'ETF': '#00c9d4', '其他': '#9a9a9a',
    '製造業': '#ffb020', '電腦/光學': '#60a5fa', '通信': '#f472b6',
  };

  barsEl.innerHTML = sorted.slice(0, 6).map(([sec, mv]) => {
    const pct = totalMV > 0 ? (mv / totalMV * 100) : 0;
    const color = colors[sec] || '#9a9a9a';
    return `<div style="display:flex;align-items:center;gap:8px">
      <div style="font-size:0.65rem;color:var(--text2);width:52px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${sec}</div>
      <div style="flex:1;height:5px;background:var(--surface3);border-radius:3px;overflow:hidden">
        <div style="width:${pct.toFixed(1)}%;height:100%;background:${color};border-radius:3px;transition:width 0.6s"></div>
      </div>
      <div style="font-family:var(--font-mono);font-size:0.62rem;font-weight:700;color:${color};min-width:32px;text-align:right">${pct.toFixed(0)}%</div>
    </div>`;
  }).join('');
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
    const shortName={'👨 爸爸':'爸爸','👩 太太':'太太','👦 兒子 (大)':'兒子(大)','👦 兒子 (小)':'兒子(小)'}[m];

    // Historical market value from HISTORY_DATA
    const mvHist=today?.[m]||0;
    const mvY=yesterday?.[m]||mvHist;

    // Live calculation: recompute from current prices for today's P/L
    const mData=loadMemberPortfolio(m);
    let liveMV=0,livePrevMV=0,totalCost=0;
    mData.forEach(st=>{
      const p=getPrice(st.code);
      const curPrice=p.price||0;
      const prevPrice=p.prev_close||curPrice;
      const shares=st.shares||0;
      liveMV+=shares*curPrice;
      livePrevMV+=shares*prevPrice;
      if(st.cost>0)totalCost+=st.cost*shares;
    });

    const liveDayGain=liveMV-livePrevMV;
    const liveDayPct=livePrevMV>0?(liveDayGain/livePrevMV*100):0;
    const unrealizedGain=liveMV-totalCost;
    const unrealizedPct=totalCost>0?(unrealizedGain/totalCost*100):0;
    const pct=totalToday>0?(mvHist/totalToday*100):0;

    return `<div class="family-card ${cls}">
      <div class="family-card-avatar">${avatar}</div>
      <div class="family-card-name">${shortName}</div>
      <div class="family-card-amount">${fmtTWD(liveMV)}</div>
      <div class="family-card-pct">佔比 <span>${pct.toFixed(1)}%</span></div>
      <div class="family-card-change ${liveDayPct>=0?'up':'down'}">${liveDayPct>=0?'▲':'▼'} ${fmtPct(liveDayPct)}</div>
      <div class="family-card-daily ${liveDayGain>=0?'text-green':'text-red'}">${liveDayGain>=0?'+':''}${fmtTWD(Math.abs(liveDayGain))}</div>
      <div class="family-card-gain ${unrealizedGain>=0?'text-green':'text-red'}">成本 ${fmtTWDShort(totalCost)} (${unrealizedGain>=0?'+':''}${fmtPct(unrealizedPct)})</div>
      <div class="family-card-meta" style="font-size:0.58rem;color:var(--text3);margin-top:4px;border-top:1px solid var(--border);padding-top:4px">
        ${(PRICE_DATA['2330']?.updated || '').slice(11, 16) || ''} 更新
      </div>
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

  const el=document.getElementById('dailyPLContent');
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
// DAILY P/L HISTORY (14-day bar chart)
// ============================================================
function buildDailyPLHistory(){
  const el=document.getElementById('dailyPLHistory');
  if(!el)return;
  const dates=Object.keys(HISTORY_DATA).sort().slice(-14);
  if(dates.length<2){el.innerHTML='<div style="color:var(--text3);font-size:0.75rem;padding:8px">歷史資料不足</div>';return;}
  const d0=HISTORY_DATA[dates[0]];
  const d1=HISTORY_DATA[dates[dates.length-1]];
  const total0=d0?.Total||0;
  const total1=d1?.Total||0;
  const pctChange=total0>0?((total1-total0)/total0*100):0;
  const color=pctChange>=0?'var(--green)':'var(--red)';
  const bars=dates.map((date,i)=>{
    const d=HISTORY_DATA[date];
    const prev=dates[i-1]?HISTORY_DATA[dates[i-1]]:null;
    const prevT=prev?.Total||d?.Total||0;
    const curT=d?.Total||0;
    const chg=prevT>0?((curT-prevT)/prevT*100):0;
    const barH=Math.max(3,Math.min(26,Math.abs(chg)*5));
    const barColor=chg>=0?'var(--green)':'var(--red)';
    const label=date.slice(5).replace('-','/');
    return `<div class="dph-bar-col" title="${date} ${fmtTWDShort(curT)} (${chg>=0?'+':''}${chg.toFixed(2)}%)">
      <div style="height:26px;display:flex;align-items:center;justify-content:center">
        <div style="width:5px;height:${barH}px;background:${barColor};border-radius:1px"></div>
      </div>
      <div style="font-size:0.5rem;color:var(--text3);margin-top:2px;text-align:center">${label}</div>
    </div>`;
  }).join('');
  el.innerHTML=`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
      <span style="font-size:0.62rem;color:var(--text3)">近14日每日P/L</span>
      <span style="font-size:0.7rem;font-weight:700;font-family:var(--font-mono);color:${color}">${pctChange>=0?'+':''}${pctChange.toFixed(2)}%</span>
    </div>
    <div style="display:flex;align-items:flex-end;gap:2px">${bars}</div>
  `;
}

// ============================================================
// OVERVIEW STRIP: Top Movers + Latest News
// ============================================================
function buildOverviewStrip(){
  // ── Helpers ────────────────────────────────────────────────────────
  function calcRSI14(ticker) {
    try {
      const p = PRICE_DATA[ticker];
      if (!p || !p._hist) return null;
      const h = p._hist;
      if (h.length < 15) return null;
      const closes = h.map(r => typeof r === 'object' ? (r.Close || r.close) : r);
      const last = closes.slice(-14);
      let gain = 0, loss = 0;
      for (let i = 1; i < last.length; i++) {
        const d = last[i] - last[i-1];
        if (d > 0) gain += d; else loss -= d;
      }
      const avgGain = gain / 14, avgLoss = loss / 14;
      if (avgLoss === 0) return 100;
      const rs = avgGain / avgLoss;
      return Math.round((100 - 100 / (1 + rs)) * 10) / 10;
    } catch(e) { return null; }
  }

  // ── Precompute RSI for all holdings ──────────────────────────────
  const rsiCache = {};
  Object.keys(PRICE_DATA).forEach(t => { rsiCache[t] = calcRSI14(t); });

  function rsiLabel(rsi) {
    if (rsi === null) return '';
    if (rsi >= 70) return '<span style="font-size:0.55rem;color:var(--red);margin-left:3px">🟥</span>';
    if (rsi <= 30) return '<span style="font-size:0.55rem;color:var(--green);margin-left:3px">🟩</span>';
    if (rsi >= 60) return '<span style="font-size:0.55rem;color:var(--amber);margin-left:3px">🟨</span>';
    return '';
  }

  // ── Precompute YTD return from HISTORY_DATA ──────────────────────
  const dates = Object.keys(HISTORY_DATA).sort();
  const ytdStartMV = dates.length > 0 ? HISTORY_DATA[dates[0]]?.Total || 0 : 0;
  const latestMV = dates.length > 0 ? HISTORY_DATA[dates[dates.length-1]]?.Total || 0 : 0;
  const ytdPct = ytdStartMV > 0 ? ((latestMV - ytdStartMV) / ytdStartMV * 100) : 0;

  // ── Precompute win/loss count ─────────────────────────────────────
  const allHoldings = getAllHoldings();
  let winCount = 0, lossCount = 0;
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if (!p.price) return;
    if (p.price > p.prev_close) winCount++;
    else if (p.price < p.prev_close) lossCount++;
  });

  // ── 52W position helper ───────────────────────────────────────────
  function w52Badge(code) {
    const p = PRICE_DATA[code];
    if (!p) return '';
    const { price, year_high, year_low } = p;
    if (!price || !year_high || !year_low) return '';
    const range = year_high - year_low;
    if (range <= 0) return '';
    const pos = (price - year_low) / range; // 0=low, 1=high
    if (pos >= 0.95) return '<span style="font-size:0.55rem;color:var(--amber);margin-left:2px" title="近52週高點">✨</span>';
    if (pos <= 0.05) return '<span style="font-size:0.55rem;color:var(--blue);margin-left:2px" title="近52週低點">💎</span>';
    return '';
  }

  const items = Object.entries(allHoldings)
    .map(([t, d]) => {
      const p = getPrice(t);
      const chgPct = p.prev_close ? ((p.price - p.prev_close) / p.prev_close * 100) : 0;
      return { ticker: t, name: d.name, chgPct, price: p.price, prevClose: p.prev_close };
    })
    .filter(d => d.price > 0)
    .sort((a, b) => b.chgPct - a.chgPct);

  const topEl = document.getElementById('overviewTopMovers');
  const botEl = document.getElementById('overviewBottomMovers');
  const newsEl = document.getElementById('overviewLatestNews');

  // ── Top movers: gainers ───────────────────────────────────────────
  if (topEl) {
    topEl.innerHTML = items.slice(0, 3).map(d => {
      const c = d.chgPct >= 0 ? 'var(--green)' : 'var(--red)';
      const s = d.chgPct >= 0 ? '+' : '';
      const rsi = rsiCache[d.ticker];
      const badge = w52Badge(d.ticker);
      return `<div style="font-size:0.65rem;display:flex;justify-content:space-between;align-items:center;padding:2px 0">
        <span style="color:var(--text2);max-width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${d.name}">${d.name}</span>
        <span style="font-family:var(--font-mono);font-weight:700;color:${c}">${s}${d.chgPct.toFixed(1)}%${rsiLabel(rsi)}${badge}</span>
      </div>`;
    }).join('');
  }

  // ── Bottom movers: losers ─────────────────────────────────────────
  if (botEl) {
    botEl.innerHTML = [...items].reverse().slice(0, 3).map(d => {
      const c = d.chgPct >= 0 ? 'var(--green)' : 'var(--red)';
      const s = d.chgPct >= 0 ? '+' : '';
      const rsi = rsiCache[d.ticker];
      const badge = w52Badge(d.ticker);
      return `<div style="font-size:0.65rem;display:flex;justify-content:space-between;align-items:center;padding:2px 0">
        <span style="color:var(--text2);max-width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${d.name}">${d.name}</span>
        <span style="font-family:var(--font-mono);font-weight:700;color:${c}">${s}${d.chgPct.toFixed(1)}%${rsiLabel(rsi)}${badge}</span>
      </div>`;
    }).join('');
  }

  // ── Portfolio stats strip ─────────────────────────────────────────
  const statsEl = document.getElementById('overviewPortfolioStats');
  if (statsEl) {
    const twii = MARKET_INDICES.find(i => i.ticker === '^TWII') || {};
    const ytdColor = ytdPct >= 0 ? 'var(--green)' : 'var(--red)';
    const ytdIcon = ytdPct >= 0 ? '▲' : '▼';
    statsEl.innerHTML = `
      <span style="font-size:0.6rem;color:var(--text3)">YTD</span>
      <span style="font-family:var(--font-mono);font-size:0.7rem;font-weight:700;color:${ytdColor}">${ytdIcon} ${Math.abs(ytdPct).toFixed(1)}%</span>
      <span style="font-size:0.7rem;color:var(--border2)">|</span>
      <span style="font-size:0.6rem;color:var(--text3)">勝/敗</span>
      <span style="font-family:var(--font-mono);font-size:0.7rem;font-weight:700;color:var(--green)">${winCount}↑</span>
      <span style="font-family:var(--font-mono);font-size:0.7rem;font-weight:700;color:var(--text3)">/</span>
      <span style="font-family:var(--font-mono);font-size:0.7rem;font-weight:700;color:var(--red)">${lossCount}↓</span>
      <span style="font-size:0.7rem;color:var(--border2)">|</span>
      <span style="font-size:0.6rem;color:var(--text3)">加權</span>
      <span style="font-family:var(--font-mono);font-size:0.7rem;font-weight:700;color:${(twii.changePct||0)>=0?'var(--green)':'var(--red)'}">${(twii.changePct||0)>=0?'▲':'▼'} ${Math.abs(twii.changePct||0).toFixed(2)}%</span>
    `;
  }

  // ── News section ──────────────────────────────────────────────────
  if (newsEl) {
    const liveNews = NEWS_DATA.slice(0, 3).filter(n => n && n.title);
    if (liveNews.length > 0) {
      newsEl.innerHTML = liveNews.map(n => {
        const sentIcon = n.sentiment === 'pos' ? '🟢' : n.sentiment === 'neg' ? '🔴' : '⚪';
        const tlen = n.title.length > 45 ? n.title.substring(0, 45) + '…' : n.title;
        return `<div style="font-size:0.6rem;line-height:1.35;padding:2px 0;display:flex;align-items:flex-start;gap:4px">
          <span style="color:var(--text3);flex-shrink:0">${sentIcon}</span>
          <span style="color:var(--text2);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical" title="${n.title}">${tlen}</span>
        </div>`;
      }).join('');
    } else {
      const fallback = [
        { label: '台積電', text: 'AI需求續旺，先進製程產能滿載' },
        { label: '鴻海', text: 'GB200出貨放量，Q2營收有望季增' },
        { label: '國泰金', text: '升息尾聲，壽險避險成本下滑' },
      ];
      newsEl.innerHTML = fallback.map(n => `<div style="font-size:0.6rem;line-height:1.35;padding:2px 0">
        <span style="color:var(--amber);font-weight:700">[${n.label}]</span>
        <span style="color:var(--text2)">${n.text}</span>
      </div>`).join('');
    }
  }
}

// ============================================================
// TOP MOVERS
// TOP MOVERS
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
    const upStocks=items.filter(d=>d.chgPct>0).length;
    const downStocks=items.filter(d=>d.chgPct<0).length;
    const avgChg=items.length>0?items.reduce((s,d)=>s+d.chgPct,0)/items.length:0;
    const sectorContext=avgChg<-0.5?'空方主導，半導體、金融族群全線走低':avgChg>0.3?'多方占優，AI/科技股帶頭反攻':topLoser?.chgPct<-2?'半導體股承壓，金融股相對抗跌':'市場震盪';
    const winnerStr=topWinner?`${topWinner.name} ↑${topWinner.chgPct.toFixed(1)}%`:'';
    const loserStr=topLoser?`${topLoser.name} ↓${Math.abs(topLoser.chgPct).toFixed(1)}%`:'';
    const parts=[sectorContext];
    if(winnerStr) parts.push(winnerStr);
    if(loserStr) parts.push(loserStr);
    noteEl.textContent=`📌 加權指數 ${twiiPct>=0?'▲':'▼'} ${Math.abs(twiiPct).toFixed(2)}%｜${parts.slice(0,2).join('｜')}｜${upStocks}漲 ${downStocks}跌`;
    noteEl.style.color=twiiPct<-1?'var(--red)':twiiPct>0.5?'var(--green)':'var(--text3)';
  }
}

// ============================================================
// PIE CHART
// ============================================================
let pieChartInstance = null;
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

// ============================================================
// CONCENTRATION RISK & POSITION ALERTS
// ============================================================
function buildConcentrationRisk() {
  const el = document.getElementById('concentrationRiskList');
  if (!el) return;
  const allHoldings = getAllHoldings();
  const totalMV = Object.entries(allHoldings).reduce((s, [t, d]) => {
    const p = getPrice(t);
    return s + d.shares * (p.price || 0);
  }, 0);

  const risks = [];
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    const mv = d.shares * (p.price || 0);
    if (mv <= 0) return;
    const pct = totalMV > 0 ? mv / totalMV * 100 : 0;
    const f = getFundamental(t);

    // 52W position
    let w52Pos = null, w52Alert = '';
    if (p.year_high && p.year_low && p.year_high !== p.year_low) {
      w52Pos = (p.price - p.year_low) / (p.year_high - p.year_low) * 100;
      if (w52Pos >= 95) w52Alert = '⚠️ 接近52W高點';
      if (w52Pos <= 5) w52Alert = '⚠️ 接近52W低點';
    }

    // PE ratio analysis
    let peAlert = '';
    if (f && f.trailingPE !== null && f.trailingPE > 0) {
      if (f.trailingPE > 40) peAlert = 'PE過高';
      if (f.trailingPE < 12) peAlert = 'PE偏低';
    }

    // Concentration risk
    let riskLevel = 'safe', riskLabel = '';
    if (pct >= 20) { riskLevel = 'critical'; riskLabel = '🚨 過度集中'; }
    else if (pct >= 15) { riskLevel = 'warning'; riskLabel = '⚠️ 高度集中'; }
    else if (pct >= 8) { riskLevel = 'caution'; riskLabel = '⚡ 注意集中'; }

    if (riskLevel !== 'safe' || w52Alert || peAlert) {
      risks.push({ ticker: t, name: d.name, pct, mv, riskLevel, riskLabel, w52Alert, w52Pos, peAlert, f });
    }
  });

  risks.sort((a, b) => {
    const order = { critical: 0, warning: 1, caution: 2, safe: 3 };
    return (order[a.riskLevel] || 3) - (order[b.riskLevel] || 3);
  });

  const riskColors = {
    critical: { color: 'var(--red)', bg: 'rgba(255,68,68,0.1)', border: 'rgba(255,68,68,0.25)' },
    warning:  { color: 'var(--amber)', bg: 'rgba(255,176,32,0.08)', border: 'rgba(255,176,32,0.18)' },
    caution:  { color: 'var(--blue)', bg: 'rgba(77,159,255,0.06)', border: 'rgba(77,159,255,0.15)' },
    safe:     { color: 'var(--text2)', bg: 'var(--surface2)', border: 'var(--border)' }
  };

  el.innerHTML = risks.slice(0, 10).map(r => {
    const rc = riskColors[r.riskLevel] || riskColors.safe;
    const f = r.f || {};
    const badges = [];
    if (r.riskLabel) badges.push(`<span style="font-size:0.6rem;color:${rc.color};background:${rc.bg};padding:1px 5px;border-radius:3px;margin-right:2px">${r.riskLabel}</span>`);
    if (r.w52Alert) badges.push(`<span style="font-size:0.6rem;color:var(--amber);background:rgba(255,176,32,0.08);padding:1px 5px;border-radius:3px;margin-right:2px">${r.w52Alert} (${r.w52Pos.toFixed(0)}%)</span>`);
    if (r.peAlert) badges.push(`<span style="font-size:0.6rem;color:var(--purple);background:rgba(176,102,255,0.08);padding:1px 5px;border-radius:3px;margin-right:2px">${r.peAlert}</span>`);
    if (f && f.dividendYield) badges.push(`<span style="font-size:0.6rem;color:var(--green);background:rgba(0,214,143,0.06);padding:1px 5px;border-radius:3px">殖 ${f.dividendYield.toFixed(1)}%</span>`);
    return `<div style="padding:7px 10px;background:${rc.bg};border:1px solid ${rc.border};border-radius:7px;margin-bottom:5px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <span style="font-weight:700;font-size:0.82rem;color:${rc.color};font-family:var(--font-mono)">${r.ticker}</span>
          <span style="font-size:0.72rem;color:var(--text2);margin-left:5px">${r.name}</span>
        </div>
        <span style="font-size:0.82rem;font-weight:700;color:${rc.color};font-family:var(--font-mono)">${r.pct.toFixed(1)}%</span>
      </div>
      <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap">${badges.join('')}</div>
    </div>`;
  }).join('');

  if (risks.length === 0) {
    el.innerHTML = '<div style="color:var(--text3);font-size:0.72rem;text-align:center;padding:10px">✅ 組合配置健康，無重大風險警示</div>';
  }
}


// SECTOR ALLOCATION
// ============================================================
const SECTOR_COLORS = {
  '半導體':'#4d9fff','電子':'#00d68f','金融':'#b066ff',
  'ETF':'#ffb020','航空':'#00c9d4','光學':'#ff8c00',
  '電信':'#ff4444','化工':'#9966ff','營建':'#66cc99',
  '鋼鐵':'#999999','其他':'#666666'
};

function buildSectorList(){
  const sectors={};
  const allHoldings=getAllHoldings();
  Object.entries(allHoldings).forEach(([t,d])=>{const p=getPrice(t); const mv=d.shares*(p.price||0); if(mv<=0)return; if(!sectors[d.industry])sectors[d.industry]=0; sectors[d.industry]+=mv; });
  const total=Object.values(sectors).reduce((a,b)=>a+b,0);
  const sorted=Object.entries(sectors).sort((a,b)=>b[1]-a[1]);
  const el=document.getElementById('sectorList');
  el.innerHTML=sorted.map(([sec,mv])=>{
    const pct=total>0?(mv/total*100):0;
    const color=SECTOR_COLORS[sec]||'#666666';
    const isHigh=pct>=40;
    const riskLabel=isHigh?'⚠️ 集中':'💡';
    return `<div class="sector-item" title="${sec}: ${fmtTWDShort(mv)}">
      <div class="sector-name">${riskLabel} ${sec}</div>
      <div class="sector-bar-wrap">
        <div class="sector-bar" style="width:${pct.toFixed(1)}%;background:${color}"></div>
      </div>
      <div class="sector-pct" style="color:${color}">${pct.toFixed(1)}%</div>
    </div>`;
  }).join('');
}

// ============================================================
// PORTFOLIO METRICS
// ============================================================
function buildPortfolioMetrics(){
  const allHoldings=getAllHoldings();
  let totalCost=0,totalMV=0,winning=0,total=0,totalGain=0,totalLoss=0;
  let totalDivYield=0,totalPE=0,peCount=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t); if(!p||p.price<=0)return;
    const f=getFundamental(t);
    const mv=d.shares*p.price;
    const gain=mv-(d.cost>0?d.cost*d.shares:0);
    totalMV+=mv;
    if(d.cost>0){totalCost+=d.cost*d.shares; total++; if(gain>0){winning++;totalGain+=gain;}else if(gain<0){totalLoss+=gain;}}
    if(f&&f.dividendYield&&f.dividendYield>0){totalDivYield+=f.dividendYield*mv; peCount++;}
    if(f&&f.trailingPE&&f.trailingPE>0){totalPE+=f.trailingPE*mv; peCount++;}
  });
  const gainPct=totalCost>0?((totalMV-totalCost)/totalCost*100):0;
  const winRate=total>0?(winning/total*100):0;
  const stockCount=Object.keys(allHoldings).filter(t=>getPrice(t).price>0).length;

  // Calculate max drawdown and Sharpe-like score from HISTORY_DATA
  const dates=Object.keys(HISTORY_DATA).sort();
  const vals=dates.map(d=>HISTORY_DATA[d]?.Total||0);
  // YTD return: compare Jan 1 to latest
  const ytdDate=dates.find(d=>d>='2026-01-01')||dates[dates.length-1];
  const ytdStart=HISTORY_DATA['2026-01-01']?.Total||vals[0]||0;
  const ytdEnd=HISTORY_DATA[ytdDate]?.Total||vals[vals.length-1]||0;
  const ytdReturn=ytdStart>0?(ytdEnd-ytdStart)/ytdStart*100:0;
  let peak=vals[0]||0,maxDrawdown=0;
  for(const v of vals){
    if(v>peak)peak=v;
    const dd=(peak>0?(v-peak)/peak*100:0);
    if(dd<maxDrawdown)maxDrawdown=dd;
  }
  const totalReturn=dates.length>=2&&vals[0]>0?((vals[vals.length-1]-vals[0])/vals[0]*100):0;
  // Annualized return approximation (trading days)
  const annDays=Math.max(1,vals.length);
  const annReturn=totalReturn*(252/annDays);
  const riskFree=2.0;
  const sharpeRatio=annReturn>0&&maxDrawdown<0?(annReturn-riskFree)/Math.abs(maxDrawdown):0;

  const metrics=[
    {label:'總檔數',value:stockCount,sub:'含 ETF'},
    {label:'整體報酬',value:fmtPct(gainPct),sub:'成本法',up:gainPct>=0},
    {label:'勝率',value:winRate.toFixed(0)+'%',sub:'獲利/總檔數',up:winRate>=50},
    {label:'平均殖利率',value:(totalDivYield>0&&totalMV>0?(totalDivYield/totalMV):0).toFixed(2)+'%',sub:'持倉加權',up:true},
    {label:'平均本益比',value:(totalPE>0&&totalMV>0?totalPE/totalMV:0).toFixed(1),sub:'持倉加權'},
    {label:'總市值',value:fmtTWD(totalMV),sub:'即時估值'},
    {label:'未實現損益',value:(totalMV>=totalCost?'+':'')+fmtTWD(totalMV-totalCost),sub:'成本 vs 市值',up:totalMV>=totalCost},
    {label:'夏普比率',value:sharpeRatio.toFixed(2),sub:'年化/波動',up:sharpeRatio>=1},
    {label:'組合β值',value:(getPortfolioBeta()||1.0).toFixed(2),sub:'系統風險',up:(getPortfolioBeta()||1.0)<1.2},
    {label:'最大回檔',value:maxDrawdown.toFixed(1)+'%',sub:'歷史最大',up:false},
    {label:'YTD報酬',value:fmtPct(totalReturn),sub:'追蹤期間',up:totalReturn>=0},
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
    if(f.dividendYield&&f.dividendYield>0){totalDiv+=mv*f.dividendYield;count++;}
  });

  const avgYield=totalMV>0?(totalDiv/totalMV*100):0;
  const annualDiv=totalDiv;
  const portfolioYield=totalCost>0?(annualDiv/totalCost*100):0;
  // Quarterly estimate
  const quarterlyDiv=annualDiv/4;
  // Monthly passive income estimate
  const monthlyDiv=annualDiv/12;

  el.innerHTML=`
    <div class="div-item">
      <div class="div-label">加權平均殖利率</div>
      <div class="div-value">${avgYield.toFixed(2)}%</div>
      <div class="div-sub">${count} 檔有股息</div>
    </div>
    <div class="div-item">
      <div class="div-label">年化股息收入</div>
      <div class="div-value">${fmtTWDShort(annualDiv)}</div>
      <div class="div-sub">月均 ${fmtTWDShort(monthlyDiv)}</div>
    </div>
    <div class="div-item">
      <div class="div-label">成本殖利率</div>
      <div class="div-value">${portfolioYield.toFixed(2)}%</div>
      <div class="div-sub">股息/總成本</div>
    </div>
  `;
}

// ============================================================
// REAL-TIME NEWS TICKER
// ============================================================
function buildNewsTicker(){
  const el=document.getElementById('rntMarqueeContent');
  if(!el)return;
  const allHoldings=getAllHoldings();
  const now=new Date();
  const timeStr=now.toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'});

  // Generate market headlines based on actual price movements
  const movers=Object.entries(allHoldings)
    .map(([t,d])=>{
      const p=getPrice(t);if(!p.price||!p.prev_close)return null;
      const chg=((p.price-p.prev_close)/p.prev_close*100);
      return {ticker:t,name:d.name,chg,absChg:Math.abs(chg),mv:d.shares*p.price,price:p.price};
    })
    .filter(x=>x&&x.absChg>=0.3)
    .sort((a,b)=>b.absChg-a.absChg)
    .slice(0,8);

  if(movers.length===0){
    el.innerHTML=`<div class="rnt-item"><span class="rnt-sym">📊</span><span class="rnt-headline">市場持平，關注明晨美國 CPI 數據</span><span class="rnt-dot neu"></span></div>`;
    startTickerAnimation();
    return;
  }

  // Build headline items
  const headlines=movers.map(m=>{
    const dir=m.chg>=0?'pos':'neg';
    const icon=m.chg>=0?'▲':'▼';
    const colorClass=dir;
    const label=m.name.length>5?m.name.slice(0,5):m.name;
    const headline=`${label} ${icon} ${Math.abs(m.chg).toFixed(1)}%`;
    return `<div class="rnt-item">
      <span class="rnt-sym">${m.ticker}</span>
      <span class="rnt-headline">${headline}</span>
      <span class="rnt-dot ${colorClass}"></span>
    </div>`;
  });

  // Add a few context items
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII');
  if(twii){
    const dir=twii.changePct>=0?'pos':'neg';
    headlines.push(`<div class="rnt-item">
      <span class="rnt-sym">加權</span>
      <span class="rnt-headline">加權指數 ${twii.changePct>=0?'▲':'▼'} ${Math.abs(twii.changePct).toFixed(2)}% → ${twii.price.toLocaleString('zh-TW',{maximumFractionDigits:0})}</span>
      <span class="rnt-dot ${dir}"></span>
    </div>`);
  }

  const tsmc=MARKET_INDICES.find(i=>i.ticker==='2330.TW');
  if(tsmc){
    const dir=tsmc.changePct>=0?'pos':'neg';
    headlines.push(`<div class="rnt-item">
      <span class="rnt-sym">2330</span>
      <span class="rnt-headline">台積電 ${tsmc.changePct>=0?'▲':'▼'} ${Math.abs(tsmc.changePct).toFixed(2)}%</span>
      <span class="rnt-dot ${dir}"></span>
    </div>`);
  }

  // Add RSS live news headlines if available
  if (NEWS_DATA && NEWS_DATA.length > 0) {
    const rssHeadlines = NEWS_DATA.slice(0, 5).map(n => {
      const dotClass = n.sentiment === 'pos' ? 'up' : n.sentiment === 'neg' ? 'down' : 'neu';
      return `<div class="rnt-item">
        <span class="rnt-tag" style="flex-shrink:0;font-size:0.6rem">📰</span>
        <span class="rnt-headline" style="max-width:220px">${n.title.slice(0, 60)}</span>
        <span class="rnt-dot ${dotClass}"></span>
      </div>`;
    });
    headlines.push(...rssHeadlines);
  }

  // Duplicate for seamless loop
  el.innerHTML=headlines.join('')+headlines.join('');
  startTickerAnimation();
}

let _tickerAnimFrame=null;
function startTickerAnimation(){
  const wrapper=document.querySelector('.rnt-marquee-wrapper');
  const content=document.getElementById('rntMarqueeContent');
  if(!wrapper||!content)return;
  if(_tickerAnimFrame)cancelAnimationFrame(_tickerAnimFrame);

  let pos=0;
  const speed=0.5; // px per frame
  const contentWidth=content.scrollWidth/2;

  function animate(){
    pos+=speed;
    if(pos>=contentWidth){
      pos=0;
    }
    content.style.transform=`translateX(-${pos}px)`;
    _tickerAnimFrame=requestAnimationFrame(animate);
  }
  animate();
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

  // ── YTD from HISTORY_DATA ────────────────────────────────────────
  const histDates = Object.keys(HISTORY_DATA).sort();
  const ytdStartMV = histDates.length > 0 ? HISTORY_DATA[histDates[0]]?.Total || 0 : 0;
  const latestMV2  = histDates.length > 0 ? HISTORY_DATA[histDates[histDates.length-1]]?.Total || 0 : 0;
  const ytdPct = ytdStartMV > 0 ? ((latestMV2 - ytdStartMV) / ytdStartMV * 100) : 0;

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
  // ── YTD gauge value ────────────────────────────────────────────
  const ytdEl=document.getElementById('gaugeYTD');
  if(ytdEl){
    ytdEl.textContent=(ytdPct>=0?'+':'')+ytdPct.toFixed(1)+'%';
    ytdEl.style.color=ytdPct>=0?'var(--green)':'var(--red)';
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

  // Draw arc gauge — improved with gradient segments and better labels
  const canvas=document.getElementById('gaugeChart');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=160,H=100;
  canvas.width=W;canvas.height=H;
  const cx=80,cy=85,r=55;
  const startA=Math.PI,endA=0;

  // Clamp to reasonable range (-3% to +3% is the "normal" market move)
  const clampedPct=Math.max(-5,Math.min(5,dayChg));
  const normVal=clampedPct/5; // normalize to -1..1
  const angle=startA-normVal*(startA-endA); // counterclockwise from PI toward 0

  // Background arc (dark)
  ctx.beginPath();
  ctx.arc(cx,cy,r,startA,endA,false);
  ctx.strokeStyle='#2a2a2a';
  ctx.lineWidth=8;
  ctx.lineCap='round';
  ctx.stroke();

  // Gradient arc — red zone on left, amber in middle, green on right
  const grad=ctx.createLinearGradient(10,0,150,0);
  grad.addColorStop(0,'#ff4444');
  grad.addColorStop(0.5,'#ffb020');
  grad.addColorStop(1,'#00d68f');
  ctx.beginPath();
  ctx.arc(cx,cy,r,startA,angle,false);
  ctx.strokeStyle=grad;
  ctx.lineWidth=8;
  ctx.lineCap='round';
  ctx.stroke();

  // Tick marks (perpendicular to arc at each point)
  for(let t=-5;t<=5;t+=1){
    const tNorm=t/5;
    // Clockwise from PI to 0: angle decreases as t increases
    const tAngle=startA-tNorm*(startA-endA);
    // Arc goes clockwise (y positive downward in canvas), so sin has sign flip
    const cosA=Math.cos(tAngle);
    const sinA=-Math.sin(tAngle); // flip for clockwise arc direction
    const inner=r-9,outer=r+9;
    const x1=cx+inner*cosA,y1=cy+inner*sinA;
    const x2=cx+outer*cosA,y2=cy+outer*sinA;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle=t===0?'#555':'#333';
    ctx.lineWidth=t===0?2:1;
    ctx.stroke();
  }

  // Center text
  const valColor=dayChg>=0?'#00d68f':'#ff4444';
  ctx.fillStyle=valColor;
  ctx.font='bold 17px Consolas,monospace';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.fillText((dayChg>=0?'+':'')+dayChg.toFixed(1)+'%',cx,cy+1);
  ctx.fillStyle='#666';
  ctx.font='8px Inter,sans-serif';
  ctx.fillText('日報酬',cx,cy+15);
}

// ============================================================
// MARKET NEWS FEED — Taiwan stock market headlines
// ============================================================
let twNewsTimer = null;
async function loadTaiwanStockNews() {
  const el = document.getElementById('twStockNewsFeed');
  if (!el) return;
  el.innerHTML = '<div style="font-size:0.72rem;color:var(--text3);text-align:center;padding:12px">📡 載入中...</div>';
  
  // Strategy: Try Google News RSS via allorigins first (most reliable), then portfolio-based fallback
  const rssSources = [
    { url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://news.google.com/rss/search?q=%E5%8F%B0%E8%82%A1&hl=zh-TW&gl=TW&opic=1001'), label: 'GoogleNews' },
    { url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://feeds.finance.yahoo.com/rss/2.0/headline?s=^TWII&region=US&lang=en-US'), label: 'Yahoo' },
  ];
  
  let newsData = [];
  
  // Try RSS sources
  for (const src of rssSources) {
    try {
      const resp = await fetch(src.url, { signal: AbortSignal.timeout(5000) });
      if (!resp.ok) continue;
      const text = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/xml');
      const items = Array.from(doc.querySelectorAll('item')).slice(0, 8);
      
      if (items.length > 0) {
        newsData = items.map(item => {
          const rawTitle = item.querySelector('title')?.textContent?.trim() || '';
          const link = item.querySelector('link')?.textContent?.trim() || item.querySelector('a')?.getAttribute('href') || '';
          const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
          // Clean Google News title artifacts (often prefixed with source)
          const title = rawTitle.replace(/^[^:？!！]+[：:]/, '').trim();
          return { title, link, pubDate, sentiment: detectSentiment(title), source: src.label };
        }).filter(n => n.title && n.title.length > 5);
        break;
      }
    } catch(e) { continue; }
  }
  
  // Generate intelligent portfolio-based news when RSS fails
  if (newsData.length === 0) {
    const holdings = getAllHoldings();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'});
    const today = now.toISOString().split('T')[0];
    
    // Get top movers with context
    const movers = Object.entries(holdings)
      .map(([t,d]) => {
        const p = getPrice(t);
        if (!p.price || !p.prev_close) return null;
        const chg = (p.price - p.prev_close) / p.prev_close * 100;
        const w52pct = p.year_high && p.year_low ? (p.price - p.year_low) / (p.year_high - p.year_low) * 100 : 50;
        const f = getFundamental(t.replace('.TW',''));
        return { ticker: t, name: d.name, industry: d.industry, chg, w52pct, pe: f?.trailingPE, div: f?.dividendYield, shares: d.shares, price: p.price };
      })
      .filter(x => x && Math.abs(x.chg) >= 0.3)
      .sort((a,b) => Math.abs(b.chg) - Math.abs(a.chg));
    
    const gainers = movers.filter(x => x.chg > 0);
    const losers = movers.filter(x => x.chg < 0);
    const nearHigh = movers.filter(x => x.w52pct >= 85);
    const nearLow = movers.filter(x => x.w52pct <= 20);
    const twii = MARKET_INDICES.find(i => i.ticker === '^TWII');
    
    const makeItem = (title, summary, sentiment, source, tags) => ({ 
      title, link: '#', pubDate: '', sentiment, source, summary, tags
    });
    
    // Build intelligent news from actual portfolio data
    if (gainers.length > 0) {
      const g = gainers[0];
      newsData.push(makeItem(
        `${g.name}(${g.ticker.replace('.TW','')}) ${g.chg >= 3 ? '🚀' : '📈'} 大漲 ${g.chg.toFixed(1)}%！${g.industry}族群跟進`,
        `法人青睞 ${g.industry} 供應鏈 ${g.ticker.replace('.TW','')}，今日價量齊揚創近期新高。P/E ${g.pe?.toFixed(1) || '--'}，殖利率 ${g.div ? (g.div*100).toFixed(1)+'%' : '--'}`,
        g.chg >= 2 ? 'pos' : 'neu', '📊 市場觀察', [g.ticker.replace('.TW','')]
      ));
    }
    if (losers.length > 0) {
      const l = losers[0];
      const abs = Math.abs(l.chg);
      newsData.push(makeItem(
        `${l.name}(${l.ticker.replace('.TW','')}) ${abs >= 3 ? '📉' : '⬇️'} 下跌 ${abs.toFixed(1)}%！注意短線風險`,
        `投資人獲利了結 ${l.ticker.replace('.TW','')}，${abs >= 2 ? '引發市場情緒降溫' : '技術面短線轉弱'}，建議觀察關鍵支撐價位。`,
        abs >= 2 ? 'neg' : 'neu', '📊 市場觀察', [l.ticker.replace('.TW','')]
      ));
    }
    if (nearHigh.length > 0) {
      const names = nearHigh.slice(0,2).map(x=>x.name).join('、');
      newsData.push(makeItem(
        `🔥 ${names}等創 52W 新高！短線超買風險升溫`,
        `${nearHigh.length} 檔持股處於 52W 高點區間(>85%)，建議漲多獲利了結或設停利。`,
        'neu', '📊 市場觀察', nearHigh.map(x=>x.ticker.replace('.TW',''))
      ));
    }
    if (nearLow.length > 0) {
      const names = nearLow.slice(0,2).map(x=>x.name).join('、');
      newsData.push(makeItem(
        `💡 ${names}等股價處低檔！價值投資買點浮現`,
        `${nearLow.length} 檔持股處於 52W 低點(<20%)，本益比修正至相對低檔，長線投資者可留意。`,
        'pos', '📊 市場觀察', nearLow.map(x=>x.ticker.replace('.TW',''))
      ));
    }
    if (twii) {
      const sentiment = twii.changePct >= 0.5 ? 'pos' : twii.changePct <= -0.5 ? 'neg' : 'neu';
      newsData.push(makeItem(
        `加權指數${twii.changePct >= 0 ? '▲' : '▼'} ${Math.abs(twii.changePct).toFixed(2)}% 收於 ${twii.price?.toLocaleString('zh-TW',{maximumFractionDigits:0})} 點`,
        `台股今日${twii.changePct >= 0 ? '在科技股帶動下上漲' : '震盪整理'}${gainers.length > 0 && losers.length > 0 ? '，' + gainers[0].name + '領漲、' + losers[0].name + '承壓' : ''}。`,
        sentiment, '🌏 大盤觀察', []
      ));
    }
    // Sector summary
    const semi = movers.filter(x => x.industry === '半導體');
    if (semi.length > 0) {
      const avgSemi = semi.reduce((s,x) => s + x.chg, 0) / semi.length;
      newsData.push(makeItem(
        `💾 AI需求帶動半導體供應鏈！${semi[0].name}(${semi[0].ticker.replace('.TW','')})領軍`,
        `AI 晶片、先進封裝需求續旺，半導體股平均${avgSemi >= 0 ? '上漲' : '下跌'} ${Math.abs(avgSemi).toFixed(1)}%。`,
        avgSemi >= 0 ? 'pos' : 'neg', '🏭 產業觀察', semi.map(x=>x.ticker.replace('.TW',''))
      ));
    }
    // ETF theme
    const etf = Object.entries(holdings).filter(([,d]) => d.industry === 'ETF');
    if (etf.length > 0) {
      newsData.push(makeItem(
        `📊 ETF存股熱！${etf[0][0].replace('.TW','')}等高股息ETF受益人數續增`,
        `定期定額投資持續受到小資族青睐，ETF長期績效穩健，建議持續紀律扣款。`,
        'pos', '📈 投資理財', etf.map(x=>x[0].replace('.TW',''))
      ));
    }
    if (newsData.length < 4) {
      newsData.push(makeItem(
        `🏦 金融股利多！國銀存放款利差擴大，壽險避險收益可期`,
        `Fed 利率按兵不動，台灣央行政策利率維持，利差環境穩定。金融股殖利率 3.5%~5% 吸引存股族。`,
        'pos', '💰 金融觀察', ['2882','2881']
      ));
    }
  }
  
  const today = new Date().toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'});
  el.innerHTML = newsData.slice(0, 6).map((n, i) => {
    const col = n.sentiment === 'pos' ? 'var(--green)' : n.sentiment === 'neg' ? 'var(--red)' : 'var(--blue)';
    const time = n.pubDate ? (() => {
      try { return new Date(n.pubDate).toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'}); } 
      catch(e) { return today; }
    })() : (i === 0 ? today : '');
    const isFirst = i === 0 && !n.pubDate;
    return `<div class="news-item" style="padding:6px 0;border-bottom:1px solid var(--border)">
      <div style="display:flex;align-items:flex-start;gap:6px">
        <span style="width:4px;min-height:4px;border-radius:2px;background:${col};flex-shrink:0;margin-top:5px"></span>
        <div style="flex:1;min-width:0">
          <a href="${n.link}" target="_blank" class="news-item-title" style="font-size:0.7rem;line-height:1.4;${n.summary ? '-webkit-line-clamp:1;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden' : ''}">
            ${n.title.length > 50 ? n.title.slice(0, 50) + '…' : n.title}
          </a>
          ${n.summary ? `<div style="font-size:0.62rem;color:var(--text3);line-height:1.35;margin-top:2px;-webkit-line-clamp:1;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden">${n.summary}</div>` : ''}
          <div class="news-item-meta" style="display:flex;align-items:center;gap:5px;margin-top:3px">
            ${time ? `<span style="font-size:0.58rem;color:var(--text3)">${time}</span>` : ''}
            ${n.source ? `<span style="font-size:0.58rem;padding:1px 5px;background:var(--surface3);color:var(--text3);border-radius:3px">${n.source}</span>` : ''}
            ${n.tags && n.tags.length > 0 ? n.tags.slice(0,2).map(t=>`<span style="font-size:0.58rem;padding:1px 4px;background:${col}22;color:${col};border-radius:3px">$${t}</span>`).join('') : ''}
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
  
  // Update badge
  const badge = document.getElementById('twNewsUpdatedBadge');
  if (badge) badge.textContent = `📡 ${today}`;
  
  if (twNewsTimer) clearTimeout(twNewsTimer);
  twNewsTimer = setTimeout(loadTaiwanStockNews, 300000); // 5 min
}
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

  // Dynamic market theme based on sector performance + macro context
  const themeEl=document.getElementById('mcTheme');
  if(themeEl){
    const allHoldings=getAllHoldings();
    // Use actual holdings data for sector grouping
    const sectors={};
    Object.entries(allHoldings).forEach(([t,d])=>{
      const p=getPrice(t);
      if(!p.price||!p.prev_close)return;
      const chg=((p.price-p.prev_close)/p.prev_close*100);
      const mv=d.shares*p.price;
      const sec=d.industry||'其他';
      if(!sectors[sec])sectors[sec]={sum:0,mv:0};
      sectors[sec].sum+=chg*mv;
      sectors[sec].mv+=mv;
    });
    const secAvg=Object.entries(sectors)
      .filter(([,d])=>d.mv>0)
      .map(([s,d])=>({sector:s,avg:d.sum/d.mv}))
      .sort((a,b)=>b.avg-a.avg);

    // US + Asia context
    const nasdaq=MARKET_INDICES.find(i=>i.ticker==='^IXIC');
    const spx=MARKET_INDICES.find(i=>i.ticker==='^GSPC');
    const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII');
    const sox=MARKET_INDICES.find(i=>i.ticker==='SOXX');
    const usAvg=(nasdaq?.changePct||0)+(spx?.changePct||0)/2;
    const twiiAvg=twii?.changePct||0;
    const soxAvg=sox?.changePct||0;

    let theme='區間整理';
    let themeColor='var(--amber)';
    if(secAvg.length===0){theme='資料載入中';themeColor='var(--text3)';}
    else if(secAvg[0].avg<-2&&twiiAvg<-1){theme='🌙 全市場下跌';themeColor='var(--red)';}
    else if(secAvg[0].sector==='半導體'&&secAvg[0].avg<-1.5){theme='💻 科技股領跌';themeColor='var(--blue)';}
    else if(secAvg[0].sector==='金融'&&secAvg[0].avg<-1.5){theme='🏦 金融股承壓';themeColor='var(--purple)';}
    else if(secAvg[0].sector==='半導體'&&secAvg[0].avg>1.5){theme='🤖 AI/半導體領漲';themeColor='var(--green)';}
    else if(secAvg[0].sector==='金融'&&secAvg[0].avg>1.5){theme='💰 金融股強勢';themeColor='var(--green)';}
    else if(secAvg[0].sector==='半導體'&&secAvg[0].avg>0.5){theme='💾 科技股偏多';themeColor='var(--green)';}
    else if(secAvg[0].sector==='ETF'&&secAvg[0].avg>0.5){theme='📊 ETF 資金流入';themeColor='var(--cyan)';}
    else if(secAvg[0].avg>1){theme='📈 結構性多頭';themeColor='var(--green)';}
    else if(secAvg[0].avg<-0.5){theme='⚠️ 謹慎偏空';themeColor='var(--red)';}

    themeEl.textContent=theme;
    themeEl.style.color=themeColor;
  }

  // Update time
  const timeEl=document.getElementById('mcTime');
  if(timeEl) timeEl.textContent=new Date().toLocaleTimeString('zh-TW',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit'})+' 更新';
}


// ============================================================
// PORTFOLIO INSIGHT CARD
// ============================================================
function buildPortfolioInsight(){
  const insightCard=document.getElementById('portfolioInsightCard');
  const insightIcon=document.getElementById('insightIcon');
  const insightTitle=document.getElementById('insightTitle');
  const insightText=document.getElementById('insightText');
  const insightMetrics=document.getElementById('insightMetrics');
  if(!insightCard) return;

  const allHoldings=getAllHoldings();
  let totalMV=0,totalPrevMV=0,winners=0,totalStocks=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);
    if(!p.price) return;
    totalMV+=d.shares*p.price;
    totalPrevMV+=d.shares*(p.prev_close||p.price);
    totalStocks++;
    if(p.price>p.prev_close) winners++;
  });

  const dayPct=totalPrevMV>0?((totalMV-totalPrevMV)/totalPrevMV*100):0;
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII');
  const twiiPct=twii?.changePct||0;
  const alpha=dayPct-twiiPct;
  const winRate=totalStocks>0?(winners/totalStocks*100):0;

  const winColor=winRate>=60?'var(--green)':winRate<=40?'var(--red)':'var(--amber)';
  const alphaColor=alpha>=0?'var(--green)':'var(--red)';

  // Determine insight type
  let icon='🤔',title='市場觀察',text='';
  let bgStyle='linear-gradient(135deg,var(--surface2) 0%,var(--bg) 100%)';

  if(dayPct>1.5&&winRate>70){
    icon='🚀';title='多頭格局';
    text=`組合全面上漲，${winners}/${totalStocks} 檔走揚，超額報酬 α ${alpha>=0?'+':''}${alpha.toFixed(2)}%，市場情緒偏多`;
    bgStyle='linear-gradient(135deg,rgba(0,214,143,0.08) 0%,var(--bg) 100%)';
  } else if(dayPct>0.5){
    icon='📈';title='穩健上行';
    text=`${winners} 檔上漲，勝率 ${winRate.toFixed(0)}%，注意是否出現滞漲訊號`;
    bgStyle='linear-gradient(135deg,rgba(0,214,143,0.04) 0%,var(--bg) 100%)';
  } else if(dayPct<-1.5&&winRate<30){
    icon='🔻';title='空頭承壓';
    text=`組合普遍下跌，${totalStocks-winners} 檔收黑，注意止损或分散風險`;
    bgStyle='linear-gradient(135deg,rgba(255,68,68,0.08) 0%,var(--bg) 100%)';
  } else if(dayPct<-0.5){
    icon='📉';title='回調整理';
    text=`日減 ${Math.abs(dayPct).toFixed(2)}%，${totalStocks-winners} 檔走跌，可逢低佈局核心持股`;
    bgStyle='linear-gradient(135deg,rgba(255,68,68,0.04) 0%,var(--bg) 100%)';
  } else if(Math.abs(dayPct)<0.3){
    icon='⚖️';title='牛皮整理';
    text=`加權指數 ${twiiPct>=0?'▲':'▼'} ${Math.abs(twiiPct).toFixed(2)}%，組合胜率 ${winRate.toFixed(0)}%，观望为主`;
    bgStyle='linear-gradient(135deg,rgba(255,176,32,0.04) 0%,var(--bg) 100%)';
  } else {
    icon='📊';title='市場觀察';
    text=`日報酬 ${dayPct>=0?'+':''}${dayPct.toFixed(2)}%，α ${alpha>=0?'+':''}${alpha.toFixed(2)}%，胜率 ${winRate.toFixed(0)}%`;
  }

  insightCard.style.background=bgStyle;
  if(insightIcon) insightIcon.textContent=icon;
  if(insightTitle){
    insightTitle.textContent=title;
    insightTitle.style.color=icon==='🚀'||icon==='📈'?'var(--green)':icon==='🔻'||icon==='📉'?'var(--red)':'var(--amber)';
  }
  if(insightText) insightText.textContent=text;

  // Show LIVE badge during market hours (9am-1:30pm Taipei)
  const badge=document.getElementById('insightLiveBadge');
  const now=new Date();
  const taipeiHour=parseFloat(now.toLocaleString('en-US',{timeZone:'Asia/Taipei',hour:'2-digit',hour12:false}));
  const taipeiMinute=parseFloat(now.toLocaleString('en-US',{timeZone:'Asia/Taipei',minute:'2-digit'}));
  const isMarketTime=(taipeiHour===9&&taipeiMinute>=30)||(taipeiHour>=10&&taipeiHour<13)||(taipeiHour===13&&taipeiMinute<=30);
  if(badge){
    badge.style.display=isMarketTime?'inline':'none';
  }

  // Right-side metrics
  if(insightMetrics){
    // Check for 52-week high/low alerts
    const nearHigh=allHoldings.filter(([t,d])=>{
      const p=getPrice(t);
      return p.price&&p.year_high&&p.price>=p.year_high*0.97;
    });
    const nearLow=allHoldings.filter(([t,d])=>{
      const p=getPrice(t);
      return p.price&&p.year_low&&p.price<=p.year_low*1.03;
    });
    const alerts=[];
    if(nearHigh.length>0) alerts.push({icon:'🏆',text:`${nearHigh.length}檔創年度高`,color:'var(--amber)'});
    if(nearLow.length>0) alerts.push({icon:'⚠️',text:`${nearLow.length}檔近低點`,color:'var(--red)'});

    insightMetrics.innerHTML=`
      <div style="text-align:center">
        <div style="font-size:0.55rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.04em">勝率</div>
        <div style="font-size:1.1rem;font-weight:800;font-family:var(--font-mono);color:${winColor}">${winRate.toFixed(0)}%</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:0.55rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.04em">α</div>
        <div style="font-size:1.1rem;font-weight:800;font-family:var(--font-mono);color:${alphaColor}">${alpha>=0?'+':''}${alpha.toFixed(2)}%</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:0.55rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.04em">上漲</div>
        <div style="font-size:1.1rem;font-weight:800;font-family:var(--font-mono);color:var(--green)">${winners}</div>
      </div>
      ${alerts.length>0?`<div style="text-align:center;border-left:1px solid var(--border);padding-left:10px">
        ${alerts.map(a=>`<div style="font-size:0.6rem;color:${a.color}">${a.icon} ${a.text}</div>`).join('')}
      </div>`:''}
    `;
  }
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

  // Concentration check — alert if any single holding > 30% of portfolio MV
  let totalMVAll = 0;
  const holdingMVRatios = [];
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if (!p.price) return;
    const mv = d.shares * p.price;
    totalMVAll += mv;
    holdingMVRatios.push({ ticker: t, name: getNameByCode(t), mv, pct: 0 });
  });
  holdingMVRatios.forEach(h => { h.pct = totalMVAll > 0 ? h.mv / totalMVAll * 100 : 0; });
  holdingMVRatios.sort((a, b) => b.pct - a.pct);
  const topHolder = holdingMVRatios[0];
  if (topHolder && topHolder.pct >= 30) {
    alerts.push({
      icon: '⚖️',
      title: `${topHolder.ticker} 集中度過高 (${topHolder.pct.toFixed(1)}%)`,
      desc: `${topHolder.name} 佔投資組合 ${topHolder.pct.toFixed(1)}%，建議適度分散風險。`,
      badge: '集中度警示',
      badgeColor: 'var(--amber)',
      priority: 1
    });
  }
  if (holdingMVRatios[1] && holdingMVRatios[1].pct >= 25) {
    alerts.push({
      icon: '📊',
      title: `${holdingMVRatios[1].ticker} 集中度偏高 (${holdingMVRatios[1].pct.toFixed(1)}%)`,
      desc: `${holdingMVRatios[1].name} 佔組合 ${holdingMVRatios[1].pct.toFixed(1)}%，建議關注。`,
      badge: '分散建議',
      badgeColor: 'var(--text2)',
      priority: 3
    });
  }

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
// TODAY AT A GLANCE — quick portfolio snapshot
// ============================================================
function buildTodayGlance(){
  const el=document.getElementById('todayGlanceContent');
  if(!el)return;
  const allHoldings=getAllHoldings();
  let totalMV=0,totalPrev=0,totalCost=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t);
    if(!p.price)return;
    totalMV+=d.shares*p.price;
    totalPrev+=d.shares*(p.prev_close||p.price);
    if(d.cost>0)totalCost+=d.shares*d.cost;
  });
  const dayChg=totalMV-totalPrev;
  const dayChgPct=totalPrev>0?(dayChg/totalPrev*100):0;
  const totalGain=totalMV-totalCost;
  const totalGainPct=totalCost>0?(totalGain/totalCost*100):0;

  const movers=Object.entries(allHoldings)
    .map(([t,d])=>{
      const p=getPrice(t);
      const chg=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
      return {ticker:t,name:d.name||t,chg,price:p.price};
    })
    .filter(x=>x.chg&&Math.abs(x.chg)>=0.5)
    .sort((a,b)=>Math.abs(b.chg)-Math.abs(a.chg));

  const topGainer=movers.find(x=>x.chg>0);
  const topLoser=movers.find(x=>x.chg<0);
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII');
  const tsmc=MARKET_INDICES.find(i=>i.ticker==='2330.TW');

  const items=[];
  items.push({label:'總市值',value:fmtTWDShort(totalMV),sub:'NT$',up:null});
  items.push({label:'日報酬',value:(dayChgPct>=0?'+':'')+dayChgPct.toFixed(2)+'%',sub:dayChg>=0?'+'+fmtTWDShort(dayChg):fmtTWDShort(dayChg),up:dayChgPct>=0});
  items.push({label:'總報酬',value:(totalGainPct>=0?'+':'')+totalGainPct.toFixed(1)+'%',sub:totalGain>=0?'+'+fmtTWDShort(totalGain):fmtTWDShort(totalGain),up:totalGainPct>=0});
  if(topGainer)items.push({label:'今日最強',value:topGainer.name.slice(0,4),sub:'+'+topGainer.chg.toFixed(1)+'%',up:true});
  if(topLoser)items.push({label:'今日最弱',value:topLoser.name.slice(0,4),sub:topLoser.chg.toFixed(1)+'%',up:false});
  if(twii)items.push({label:'加權指數',value:(twii.changePct>=0?'+':'')+twii.changePct.toFixed(2)+'%',sub:Math.round(twii.price).toLocaleString(),up:twii.changePct>=0});
  if(tsmc)items.push({label:'台積電',value:(tsmc.changePct>=0?'+':'')+tsmc.changePct.toFixed(2)+'%',sub:tsmc.price>=1000?Math.round(tsmc.price).toLocaleString():tsmc.price.toFixed(0),up:tsmc.changePct>=0});

  el.innerHTML=items.map(item=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:8px;text-align:center">
      <div style="font-size:0.55rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:3px">${item.label}</div>
      <div style="font-size:0.85rem;font-weight:700;font-family:var(--font-mono);color:${item.up===true?'var(--green)':item.up===false?'var(--red)':'var(--text)'}">${item.value}</div>
      <div style="font-size:0.6rem;color:var(--text3);margin-top:2px">${item.sub}</div>
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
      color:'#ff4444'
    });
  }
  if(topSectorPct > 50){
    alerts.push({
      icon:'⚠️',
      type:'amber',
      title:'產業集中：'+topSector[0]+' 佔比 '+topSectorPct.toFixed(1)+'%',
      desc:'建議：半導體+電子佔比偏高，可考慮增加金融、傳產、ETF 配置以分散風險。',
      color:'#ffb020'
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
      color:'#4d9fff'
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
      color:'#00d68f'
    });
  }
  if(alerts.length === 0){
    el.innerHTML = '<div style="text-align:center;padding:16px;color:var(--green);font-size:0.78rem">✅ 組合配置良好，集中度適中，無需立即再平衡</div>';
    return;
  }
  el.innerHTML = alerts.map(a=>`
    <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 12px;background:var(--surface2);border:1px solid ${a.color}33;border-radius:8px;margin-bottom:6px;border-left:3px solid ${a.color}">
      <div style="font-size:1rem;flex-shrink:0">${a.icon}</div>
      <div style="flex:1">
        <div style="font-size:0.75rem;font-weight:700;color:${a.color};margin-bottom:2px">${a.title}</div>
        <div style="font-size:0.68rem;color:var(--text3);line-height:1.4">${a.desc}</div>
      </div>
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

  // Compute 20-day portfolio volatility
  const recentDates = dates.slice(-20);
  const recentVals = recentDates.map(d=>HISTORY_DATA[d]?.Total||0).filter(v=>v>0);
  let volColor='var(--text2)',volLabel='中波動';
  if(recentVals.length>=10){
    const rets=recentVals.slice(1).map((v,i)=>(v-recentVals[i])/recentVals[i]*100);
    const avgR=rets.reduce((a,b)=>a+b,0)/rets.length;
    const stdR=Math.sqrt(rets.reduce((s,r)=>s+(r-avgR)**2,0)/rets.length);
    if(stdR<0.8){volColor='var(--green)';volLabel='低波動';}
    else if(stdR>1.5){volColor='var(--red)';volLabel='高波動';}
    else{volColor='var(--amber)';volLabel='中波動';}
  }

  const chips = [
    {label:'組合日報酬', val:(dayChg>=0?'+':'')+dayChg.toFixed(2)+'%', color:dayColor},
    {label:'α 超額', val:(alpha>=0?'+':'')+alpha.toFixed(2)+'%', color:alpha>=0?'var(--green)':'var(--red)'},
    {label:'TAIEX', val:(twii.changePct>=0?'+':'')+(twii.changePct||0).toFixed(2)+'%', color:(twii.changePct||0)>=0?'var(--green)':'var(--red)'},
    {label:'上漲', val:winners+' 檔', color:'var(--green)'},
    {label:'下跌', val:losers+' 檔', color:'var(--red)'},
    {label:'波動度', val:volLabel, color:volColor},
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
    if(!p.price||!p.year_high||!p.year_low)return;
    const w52pct=((p.price-p.year_low)/(p.year_high-p.year_low))*100;
    const chgPct=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
    const name=getNameByCode(t);
    if(w52pct>=95)alerts.push({type:'red-alert',msg:`🔴 ${t} ${name} 處歷史高點 (${w52pct.toFixed(0)}%) ⚠️ 注意風險`});
    else if(w52pct>=85)alerts.push({type:'amber-alert',msg:`⚠️ ${t} ${name} 接近 52W 高點 (${w52pct.toFixed(0)}%) — 考慮部分獲利了結`});
    if(w52pct<=5)alerts.push({type:'green-alert',msg:`🟢 ${t} ${name} 處歷史低點 (${w52pct.toFixed(0)}%) 💡 長線買點訊號`});
    else if(w52pct<=15)alerts.push({type:'green-alert',msg:`💡 ${t} ${name} 接近 52W 低點 (${w52pct.toFixed(0)}%) — 低檔承接區`});
    if(chgPct<=-4)alerts.push({type:'red-alert',msg:`📉 ${t} ${name} 今日重挫 ${fmtPct(chgPct)} — 設停損`});
    if(chgPct<=-2&&chgPct>-4)alerts.push({type:'amber-alert',msg:`⬇️ ${t} ${name} 今日下跌 ${fmtPct(chgPct)}`});
    if(chgPct>=4)alerts.push({type:'green-alert',msg:`🚀 ${t} ${name} 今日大漲 ${fmtPct(chgPct)}`});
    if(chgPct>=2&&chgPct<4)alerts.push({type:'blue-alert',msg:`📈 ${t} ${name} 今日上漲 ${fmtPct(chgPct)}`});
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
              return `<tr data-industry="${st.industry}">
                <td class="ticker-cell" onclick="jumpToChart('${t}')">${t}</td>
                <td class="name-cell">${st.name}</td>
                <td><span class="industry-tag">${getIndustryIcon(st.industry)}${st.industry}</span></td>
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

// Industry filter for stocks table
let currentStockIndustryFilter = 'all';
function filterStocksByIndustry(btn, industry){
  currentStockIndustryFilter = industry;
  document.querySelectorAll('[data-ind]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const activePanel = document.querySelector('.member-panel.active');
  if(!activePanel) return;
  const rows = activePanel.querySelectorAll('tbody tr[data-industry]');
  let shown = 0;
  rows.forEach(row => {
    const match = industry === 'all' || row.getAttribute('data-industry') === industry;
    row.style.display = match ? '' : 'none';
    if(match) shown++;
  });
  const countEl = document.getElementById('stockIndustryCount');
  if(countEl) countEl.textContent = industry === 'all' ? '' : `顯示 ${shown} 檔`;
}

// ============================================================
// HISTORY CHARTS
// ============================================================
let historyChartInstance = null;
let historyFamilyChartInstance = null;
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
// BUILD MARKET PULSE RIBBON
// ============================================================
function initMarketPulseRibbon(){
  const ribbon=document.getElementById('marketPulseRibbon');
  if(!ribbon)return;
  const now=new Date();
  const twHours=now.getUTCHours()+8; // Taipei UTC+8
  const isMarketOpen=twHours>=9 && (twHours<13 || (twHours===13&&now.getUTCMinutes()<30));
  ribbon.innerHTML=MARKET_INDICES.map(idx=>{
    const isUp=idx.change>=0;
    const pct=idx.changePct;
    const w52Bar=(idx.price/(idx.price-idx.change||idx.price)*50).toFixed(0);
    const barColor=isUp?'var(--green)':'var(--red)';
    return `<div class="market-pulse-item">
      <div class="market-pulse-dot ${isMarketOpen?'open':'closed'}"></div>
      <div>
        <div class="market-pulse-name">${idx.sym}</div>
        <div class="market-pulse-price">${idx.price>=1000?idx.price.toLocaleString('zh-TW',{maximumFractionDigits:0}):idx.price.toFixed(2)}</div>
      </div>
      <div class="market-pulse-chg ${isUp?'up':'down'}">${isUp?'+':''}${pct.toFixed(2)}%</div>
      <div class="market-pulse-bar" title="${isUp?'漲':'跌'}幅進度">
        <div class="market-pulse-bar-inner" style="width:${Math.min(100,Math.abs(pct)/3*100)}%;background:${barColor}"></div>
      </div>
    </div>`;
  }).join('');
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
  // Use marquee approach: inner wrapper scrolls horizontally
  // Double content for seamless loop — CSS animates translateX from 0 to -50%
  const doubled = items + (newsItem?`<div class="ticker-sep" style="width:20px;flex-shrink:0"></div>`+newsItem:'') + `<div class="ticker-sep" style="width:20px;flex-shrink:0"></div>` + items;
  el.innerHTML = `<div class="ticker-inner" style="display:flex;white-space:nowrap">${doubled}</div>`;
}

// ============================================================
// BUILD INDICES GRID
// ============================================================
function buildIndicesGrid(){
  const el=document.getElementById('indicesGrid');
  if (!el) return;
  el.innerHTML=MARKET_INDICES.map(idx=>{
    const cls=idx.changePct>=0?'up':'down';
    const chg=idx.changePct;
    return `<div class="index-item">
      <div class="index-name">${idx.sym}</div>
      <div class="index-value">${idx.price>=10000?Math.round(idx.price).toLocaleString('zh-TW'):idx.price.toFixed(2)}</div>
      <div class="index-change ${cls}">${idx.changePct>=0?'▲':'▼'} ${Math.abs(idx.change).toFixed(2)} (${fmtPct(chg)})</div>
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

  _signalsCache=Object.entries(allHoldings).map(([ticker,holdData])=>{
    const d=PRICE_DATA[ticker]||{price:0,prev_close:0,year_low:0,year_high:0};
    const price=d.price||0;
    const prev=d.prev_close||price||0;
    const w52pct=d.year_low&&d.year_high?((price-d.year_low)/(d.year_high-d.year_low)*100):50;
    const chgPct=prev?(price-prev)/prev*100:0;

    // Simulated RSI: combine 52W position + momentum + volatility
    // Higher RSI when near 52W high + positive momentum
    const rangePct=(d.year_high-d.year_low)/d.year_low*100||20;
    const volFactor=Math.min(rangePct/20,1.5);
    let rsi=50+(w52pct-50)*0.5+(chgPct*3/volFactor);
    rsi=Math.max(10,Math.min(90,rsi));
    const rsiTag=rsi<30?'超賣':rsi>70?'超買':'中立';
    const rsiState=rsi<30?'tag-oversold':rsi>70?'tag-overbought':'tag-neutral';

    // Approximate MA levels using 52W range as anchor
    // sma20 ≈ mid of recent range (~mid-high of 52W)
    const sma20=d.year_low+(d.year_high-d.year_low)*(0.55+chgPct*0.02);
    // sma50 ≈ lower-mid of 52W range (~45% position)
    const sma50=d.year_low+(d.year_high-d.year_low)*0.45;
    // sma200 ≈ near year-low anchor (historical anchor)
    const sma200=d.year_low+(d.year_high-d.year_low)*0.25;
    const priceVsMA20=price>sma20;
    const priceVsMA50=price>sma50;
    const maTag=priceVsMA20&&priceVsMA50?'均線多頭':priceVsMA20?'均線偏多':priceVsMA50?'均線震盪':'均線偏空';
    const maState=priceVsMA20&&priceVsMA50?'tag-bull':priceVsMA20?'tag-bull':priceVsMA50?'tag-neutral':'tag-bear';

    // MACD approximation: EMA(12)-EMA(26) as % of price
    const ema12=d.year_low+(d.year_high-d.year_low)*(0.58+chgPct*0.025);
    const ema26=d.year_low+(d.year_high-d.year_low)*0.50;
    const macdVal=((price-ema12)-(price-ema26))/price*100;
    const macdTag=macdVal>0?'MACD多':'MACD空';
    const macdState=macdVal>0?'tag-bull':'tag-bear';

    let posTag='區間整理',posState='tag-neutral';
    if(w52pct>90){posTag='歷史新高';posState='tag-overbought';}
    else if(w52pct>80){posTag='創高檔';posState='tag-overbought';}
    else if(w52pct<10){posTag='歷史新低';posState='tag-oversold';}
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
    if(s.maTag.includes('多'))sc++;else if(s.maTag.includes('空'))sc--;
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
          <span style="font-size:0.62rem;color:var(--text3)">${s.name} ${getIndustryIcon(s.industry)}${s.industry}</span>
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
// ENHANCED NEWS: Market Breadth Card
// ============================================================
function buildMarketBreadth(){
  const allHoldings = getAllHoldings();
  let gainers = 0, losers = 0, unchanged = 0;
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if(!p.price || !p.prev_close) return;
    if(p.price > p.prev_close) gainers++;
    else if(p.price < p.prev_close) losers++;
    else unchanged++;
  });
  const total = gainers + losers + unchanged || 1;
  const upPct = (gainers / total * 100).toFixed(0);
  const downPct = (losers / total * 100).toFixed(0);
  const ratio = losers > 0 ? (gainers / losers).toFixed(2) : gainers > 0 ? '∞' : '—';

  const elUp = document.getElementById('breadthUp');
  const elDown = document.getElementById('breadthDown');
  const elBar = document.getElementById('breadthBar');
  const elRatio = document.getElementById('breadthRatio');

  if(elUp) elUp.textContent = gainers;
  if(elDown) elDown.textContent = losers;
  if(elBar) {
    elBar.style.width = upPct + '%';
    elBar.style.background = parseFloat(upPct) >= 50 ? 'var(--green)' : 'var(--red)';
  }
  if(elRatio) {
    const r = parseFloat(ratio);
    elRatio.textContent = ratio === '∞' ? '∞:1' : ratio + ':1';
    elRatio.style.color = r >= 1 ? 'var(--green)' : r > 0 ? 'var(--amber)' : 'var(--text3)';
  }
}

// ============================================================
// ENHANCED NEWS: Portfolio vs TAIEX mini cards
// ============================================================
function buildPVBCards(){
  const el = document.getElementById('pvbCards');
  if(!el) return;
  const allHoldings = getAllHoldings();
  let totalMV = 0, totalPrevMV = 0, totalCost = 0;
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if(!p.price) return;
    totalMV += d.shares * p.price;
    totalPrevMV += d.shares * (p.prev_close || p.price);
    if(d.cost > 0) totalCost += d.shares * d.cost;
  });
  const dayChgPct = totalPrevMV > 0 ? ((totalMV - totalPrevMV) / totalPrevMV * 100) : 0;
  const twii = MARKET_INDICES.find(i => i.ticker === '^TWII');
  const twiiChg = twii ? twii.changePct : 0;
  const alpha = dayChgPct - twiiChg;
  const totalGain = totalMV - totalCost;
  const totalGainPct = totalCost > 0 ? (totalGain / totalCost * 100) : 0;

  const cards = [
    { label:'日 α', value:(alpha >= 0 ? '+' : '') + alpha.toFixed(2) + '%', color: alpha >= 0 ? 'var(--green)' : 'var(--red)', sub:'vs 大盤' },
    { label:'總報酬', value:(totalGainPct >= 0 ? '+' : '') + totalGainPct.toFixed(1) + '%', color: totalGainPct >= 0 ? 'var(--green)' : 'var(--red)', sub:'未實現' },
    { label:'日報酬', value:(dayChgPct >= 0 ? '+' : '') + dayChgPct.toFixed(2) + '%', color: dayChgPct >= 0 ? 'var(--green)' : 'var(--red)', sub:'今日 P/L' },
  ];

  el.innerHTML = cards.map(c => `
    <div style="background:var(--surface3);border:1px solid var(--border);border-radius:6px;padding:6px 8px;min-width:70px;flex:1">
      <div style="font-size:0.58rem;color:var(--text3)">${c.label}</div>
      <div style="font-family:var(--font-mono);font-size:0.78rem;font-weight:700;color:${c.color}">${c.value}</div>
      <div style="font-size:0.55rem;color:var(--text3)">${c.sub}</div>
    </div>
  `).join('');
}

// ============================================================
// ENHANCED NEWS: Sector industry insight strip
// ============================================================
function buildSectorIndustryInsight(){
  const el = document.getElementById('sectorInsightStrip');
  if(!el) return;
  const allHoldings = getAllHoldings();
  const sectorData = {};
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if(!p.price || !p.prev_close) return;
    const mv = d.shares * p.price;
    const chgPct = (p.price - p.prev_close) / p.prev_close * 100;
    const sec = d.industry || '其他';
    if(!sectorData[sec]) sectorData[sec] = { mv: 0, weightedChg: 0, count: 0 };
    sectorData[sec].mv += mv;
    sectorData[sec].weightedChg += chgPct * mv;
    sectorData[sec].count++;
  });

  const sorted = Object.entries(sectorData)
    .map(([sec, d]) => ({ sec, avgChg: d.mv > 0 ? d.weightedChg / d.mv : 0, mv: d.mv }))
    .sort((a, b) => b.avgChg - a.avgChg);

  const icons = {
    '半導體':'🔲','電子':'📱','金融':'🏦','ETF':'📊',
    '航空':'✈️','光學':'📷','電信':'📡','化工':'⚗️',
    '營建':'🏗️','鋼鐵':'🔩','汽車':'🚗','其他':'📦'
  };

  el.innerHTML = sorted.slice(0, 6).map(s => {
    const color = s.avgChg >= 0 ? 'var(--green)' : 'var(--red)';
    const bg = s.avgChg >= 0 ? 'rgba(0,214,143,0.08)' : 'rgba(255,68,68,0.08)';
    const border = s.avgChg >= 0 ? 'rgba(0,214,143,0.15)' : 'rgba(255,68,68,0.15)';
    return `<div style="background:${bg};border:1px solid ${border};border-radius:6px;padding:6px 10px;display:flex;align-items:center;gap:6px">
      <span style="font-size:0.8rem">${icons[s.sec]||'📦'}</span>
      <div>
        <div style="font-size:0.65rem;color:var(--text2);font-weight:600">${s.sec}</div>
        <div style="font-family:var(--font-mono);font-size:0.72rem;font-weight:700;color:${color}">${s.avgChg >= 0 ? '+' : ''}${s.avgChg.toFixed(2)}%</div>
      </div>
    </div>`;
  }).join('');
}

// ============================================================
// NEWS SECTION
// ============================================================
let _currentNewsTag='all';
let _currentNewsSentiment='all';
let currentSignalFilter='all';
let _signalsCache=[];

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
  const todayStr=now.toISOString().split('T')[0];
  el.innerHTML=filtered.map((n,i)=>{
    const isToday=n.date===todayStr;
    const sentBadge={pos:'利多',neg:'利空',neu:'中性'}[n.sentiment]||'中性';
    const sentIcon={pos:'🟢',neg:'🔴',neu:'⚪'}[n.sentiment]||'⚪';
    const tag = (n.tags&&n.tags[0])||n.tag||'';
    const tagClass = tag ? tag.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g,'-') : 'tech';
    const cls2 = n.cls || 'tech';
    const timeStr = n.time||'';
    const summary = n.summary || '';
    const related = n.related || [];
    const dateDisplay = isToday ? `<span style="color:var(--green);font-weight:700">今日</span>` : (n.date||'');
    const isNew = isToday && i === 0;
    return `
    <div class="news-item ${cls2} news-card" data-sentiment="${n.sentiment}">
      <div class="news-meta">
        ${tag?`<span class="news-tag ${tagClass}">${tag}</span>`:''}
        <span class="news-time">⏱ ${timeStr}</span>
        <span style="font-size:0.6rem;color:var(--text3)">${dateDisplay}</span>
        ${isNew?'<span class="news-date-badge" style="background:rgba(0,214,143,0.15);color:var(--green);font-weight:700;font-size:0.58rem;padding:1px 5px;border-radius:8px">即時</span>':''}
        <span class="news-sentiment-badge ${n.sentiment}">${sentIcon} ${sentBadge}</span>
      </div>
      <div class="news-title">${n.title}</div>
      ${summary?`<div class="news-summary">${summary}</div>`:''}
      ${related.length>0?`<div class="news-related">${related.map(t=>`<span class="news-ticker-chip" style="cursor:pointer" onclick="jumpToChart('${t}')">${t}</span>`).join('')}</div>`:''}
      <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
        <div class="news-sentiment ${n.sentiment}">
          ${n.sentiment==='pos'?'🟢 利多':
            n.sentiment==='neg'?'🔴 利空':'⚪ 中性'}
        </div>
        ${related.length>0?'<span style="font-size:0.6rem;color:var(--text3)">· 影響: '+related.map(r=>`<span style="cursor:pointer;color:var(--amber)" onclick="jumpToChart('${r}')">${r}</span>`).join(' ')+'</span>':''}
      </div>
    </div>`;
  }).join('');
  if(filtered.length===0){
    el.innerHTML='<div style="text-align:center;padding:24px;color:var(--text3);font-size:0.8rem">沒有找到符合的新聞</div>';
  }
  // Update news freshness indicator
  const newsFreshEl=document.getElementById('newsFreshness');
  if(newsFreshEl){
    const latestNews=NEWS_DATA&&NEWS_DATA[0];
    if(latestNews&&latestNews.date){
      const newsDate=new Date(latestNews.date+'T'+((latestNews.time||'00:00')+':00'));
      const now2=new Date();
      const diffMin=Math.round((now2-newsDate)/(1000*60));
      if(diffMin<60)newsFreshEl.textContent=`📰 ${diffMin}分鐘前更新`;
      else if(diffMin<1440)newsFreshEl.textContent=`📰 ${Math.round(diffMin/60)}小時前更新`;
      else newsFreshEl.textContent=`📰 ${latestNews.date} 新聞`;
    }
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
      (n.summary||'').toLowerCase().includes(query)||
      (n.tags||[]).some(t=>t.toLowerCase().includes(query))||
      (n.related||[]).some(r=>r.toLowerCase().includes(query))
    );
  }
  renderNews(filtered);
  // Also update live sentiment counts based on filtered data
  const posC=filtered.filter(n=>n.sentiment==='pos').length;
  const negC=filtered.filter(n=>n.sentiment==='neg').length;
  const neuC=filtered.filter(n=>n.sentiment==='neu').length;
  const posEl=document.getElementById('newsPosCount');
  const negEl=document.getElementById('newsNegCount');
  const neuEl=document.getElementById('newsNeuCount');
  if(posEl)posEl.textContent='🟢 '+(posC>0?posC:'-');
  if(negEl)negEl.textContent='🔴 '+(negC>0?negC:'-');
  if(neuEl)neuEl.textContent='⚪ '+(neuC>0?neuC:'-');
}

function filterNewsByTag(btn,tag){
  document.querySelectorAll('[data-tag]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _currentNewsTag=tag;
  filterNews();
}

function refreshNews(){
  const btn=document.getElementById('refreshNewsBtn');
  if(btn){btn.textContent='⏳';btn.disabled=true;}
  const now=new Date();
  const todayStr=now.toISOString().split('T')[0];
  const timeStr=now.toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'});

  // Dynamically generate portfolio-relevant news based on current price movements
  const allHoldings=getAllHoldings();
  const topMovers=Object.entries(allHoldings)
    .map(([t,d])=>{
      const p=getPrice(t);
      if(!p.price)return null;
      const chg=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):0;
      const w52pct=p.year_low&&p.year_high?(p.price-p.year_low)/(p.year_high-p.year_low)*100:50;
      return {ticker:t,name:d.name,industry:d.industry,chg,absChg:Math.abs(chg),w52pct,price:p.price};
    })
    .filter(x=>x&&x.absChg>=0.5)
    .sort((a,b)=>b.absChg-a.absChg)
    .slice(0,6);

  const gainers=topMovers.filter(x=>x.chg>0).slice(0,3);
  const losers=topMovers.filter(x=>x.chg<0).slice(0,3);
  const nearHigh=topMovers.filter(x=>x.w52pct>=85);
  const nearLow=topMovers.filter(x=>x.w52pct<=20);

  const makeNewsItem=(title,summary,sentiment,related,cls)=>({
    cls,tagClass:cls,tag:cls.charAt(0).toUpperCase()+cls.slice(1),time:timeStr,date:todayStr,title,summary,sentiment,related
  });

  const news=[];

  // Dynamic: Top movers news
  if(gainers.length>0){
    const top=gainers[0];
    const emoji=top.chg>=3?'🚀':top.chg>=1?'📈':'⬆️';
    news.push(makeNewsItem(
      `${emoji} ${top.name}(${top.ticker.replace('.TW','')})大漲 ${top.chg.toFixed(1)}%！${top.industry}族群跟進`,
      `${top.name}今日跳空上漲，股價創近期新高。法人買盤青睞 ${top.industry} 供應鏈，短线技術面轉強。`,
      top.chg>=2?'pos':'neu',
      [top.ticker.replace('.TW','')],
      top.industry==='半導體'?'semi':top.industry==='金融'?'finance':top.industry==='ETF'?'etf':'tech'
    ));
  }
  if(losers.length>0){
    const top=losers[0];
    const emoji=top.absChg>=3?'📉':'⬇️';
    const abs=Math.abs(top.chg);
    news.push(makeNewsItem(
      `${emoji} ${top.name}(${top.ticker.replace('.TW','')})下跌 ${abs.toFixed(1)}%！注意短線風險`,
      `${top.name}今日回落，${abs>=3?'引發市場獲利了結賣壓':'短線技術面轉弱'}。建議持續觀察關鍵支撐價位。`,
      abs>=3?'neg':'neu',
      [top.ticker.replace('.TW','')],
      top.industry==='半導體'?'semi':top.industry==='金融'?'finance':'macro'
    ));
  }

  // Near 52W high stocks
  if(nearHigh.length>0){
    const names=nearHigh.map(x=>x.name).join('、').slice(0,20);
    news.push(makeNewsItem(
      `🔥 多檔個股創 52 週新高！${names}等挑戰歷史高點`,
      `近 ${nearHigh.length} 檔持股處於 52 週高點區間（>85%），短線超買風險升溫，建議漲多獲利了結或設停利。`,
      'neu',nearHigh.map(x=>x.ticker.replace('.TW','')),'tech'
    ));
  }
  // Near 52W low stocks
  if(nearLow.length>0){
    const names=nearLow.map(x=>x.name).join('、').slice(0,20);
    news.push(makeNewsItem(
      `💡 ${names}等股價處低檔！價值投資買點浮現`,
      `${nearLow.length} 檔持股處於 52 週低點區間（<20%），本益比修正至相對低檔，長線價值投資者可留意布局時機。`,
      'pos',nearLow.map(x=>x.ticker.replace('.TW','')),'finance'
    ));
  }

  // TAIEX context
  const twii=MARKET_INDICES.find(i=>i.ticker==='^TWII');
  if(twii){
    const sentiment2=twii.changePct>=0.5?'pos':twii.changePct<=-0.5?'neg':'neu';
    news.push(makeNewsItem(
      `加權指數${twii.changePct>=0?'上漲':'下跌'} ${twii.changePct>=0?'▲':'▼'} ${Math.abs(twii.changePct).toFixed(2)}%`,
      `加權指數收盤 ${twii.price.toLocaleString('zh-TW',{maximumFractionDigits:0})} 點，今日${twii.changePct>=0?'表現亮眼':'震盪整理'}。`,
      sentiment2,[],'macro'
    ));
  }

  // Sector theme
  const semi=topMovers.filter(x=>x.industry==='半導體');
  const fin=topMovers.filter(x=>x.industry==='金融');
  if(semi.length>0){
    news.push(makeNewsItem(
      `💾 AI 需求帶動半導體供應鏈！${semi[0].name}領漲`,
      `AI 晶片、先進封裝需求續旺，半導體供應鏈訂單能見度佳。台積電先進製程產能維持高檔，相關供應商雨露均霑。`,
      'pos',semi.map(x=>x.ticker.replace('.TW','')),'semi'
    ));
  }
  if(fin.length>0){
    news.push(makeNewsItem(
      `🏦 金融股利多！${fin[0].name}殖利率吸引存股族`,
      `金融股今年配息行情啟動，多檔金控股殖利率達 3.5%~5%，吸引長線存股族青睞。壽險業受惠台幣貶值，避險收益可期。`,
      'pos',fin.map(x=>x.ticker.replace('.TW','')),'finance'
    ));
  }

  // ETF theme
  const etf=Object.entries(allHoldings).filter(([,d])=>d.industry==='ETF');
  if(etf.length>0){
    news.push(makeNewsItem(
      `📊 ETF 定期定額熱度不退！00878 受益人數突破新高`,
      `高股息 ETF 持續受到存股族青睐，00878、0050 等熱門 ETF 受益人數穩步增加，顯示小額投資、長期持有觀念深入人心。`,
      'pos',['00878','0050'],'etf'
    ));
  }

  // Generic fallback if too few
  if(news.length<6){
    news.push(makeNewsItem(
      `央行利率決策符合預期，台股資金面無虞`,
      `美國聯準會利率決策符合市場預期，台灣央行利率按兵不动，整體資金環境維持寬鬆，有利台股後市。`,
      'neu',[],'macro'
    ));
  }

  NEWS_DATA.length=0;
  news.slice(0,12).forEach(n=>NEWS_DATA.push(n));
  if(btn){btn.textContent='✅';setTimeout(()=>{btn.textContent='🔄';btn.disabled=false;},2000);}
  showToast('新聞已刷新 ('+timeStr+')',2000);
  buildMarketBreadth();
  buildPVBCards();
  buildSectorIndustryInsight();
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
  buildNewsSentimentBanner();
  buildNewsSummary();
  buildMarketBreadth();
  buildPVBCards();
  buildSectorIndustryInsight();
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
      <button id="refreshNewsBtn2" class="btn btn-sm" onclick="refreshNews()" style="flex-shrink:0">🔄</button>
    </div>
  `;
}

// ============================================================
// TRADINGVIEW WIDGET
// ============================================================
function buildTVSelector(){
  const sel=document.getElementById('tvSymbol');
  const allTickers = Object.values(PORTFOLIOS).flatMap(a=>a.map(s=>s.code.replace('.TW','')));
  // Deduplicate and sort: 2330 first, then others alphabetically
  const unique = [...new Set(allTickers)].sort((a,b) => {
    if(a==='2330') return -1;
    if(b==='2330') return 1;
    return a.localeCompare(b);
  });
  sel.innerHTML=unique.map(t=>{
    const name=getNameByCode(t);
    return `<option value="TWSE:${t}"${t==='2330'?' selected':''}>${t} ${name}</option>`;
  }).join('');
}

// ============================================================
// INTERVAL SHORTCUT BUTTONS
// ============================================================
function setTVInterval(ival,btn){
  document.getElementById('tvInterval').value=ival;
  document.querySelectorAll('.tv-ival-btn').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  // Reload with new interval - reset tvLoaded so widget knows to reinit
  tvLoaded = false;
  const widget = document.getElementById('tradingview-widget');
  const loading = document.getElementById('tvLoading');
  if (widget) widget.innerHTML = '';
  if (loading) loading.style.display = 'flex';
  loadTVWidget();
}


// Dynamic document title date
function updateDocTitle() {
  const now = new Date();
  const tw = new Date(now.toLocaleString('en-US', {timeZone: 'Asia/Taipei'}));
  const el = document.getElementById('docTitleDate');
  if (el) {
    el.textContent = tw.toLocaleDateString('zh-TW', {year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g, '-');
  }
}

// TradingView Widget Library Loader — improved with CDN fallbacks and duplicate prevention
const scriptId = 'tv-widget-script';

let tvInterval=null;
let tvLoaded=false;
let tvFallbackChart=null;

function loadTVWidget(){
  if(tvInterval)clearTimeout(tvInterval);
  tvLoaded = false; // reset so fallback chain works on each symbol change
  tvInterval=setTimeout(()=>{
    const sym=document.getElementById('tvSymbol').value; // e.g. "TWSE:2330"
    const interval=document.getElementById('tvInterval').value;
    const container=document.getElementById('tradingview-widget');
    const loading=document.getElementById('tvLoading');
    if(loading)loading.style.display='none';

    // Track navigation history
    trackTVNav(sym);

    // Populate status bar (new unified bar)
    const tickerSym=sym.replace('TWSE:','').replace('.TW','');
    const tvSymbol='TWSE:'+tickerSym;
    const p=getPrice(tickerSym);
    const name=getNameByCode(tickerSym);

    // Apply proper CSS class to chips for colored styling
    const applyChipClass = (el, dir) => {
      if (!el) return;
      el.classList.remove('up', 'down', 'near-high', 'near-low');
      if (dir === 'up') el.classList.add('up');
      else if (dir === 'down') el.classList.add('down');
    };

    // Update status bar elements with proper styling
    const setStatusBar = (label, price, chgPct, pe, div, w52) => {
      const dot = document.getElementById('tvStatusDot');
      const text = document.getElementById('tvStatusText');
      const nameEl = document.getElementById('tvStockName2');
      const priceEl = document.getElementById('tvStockPrice2');
      const changeEl = document.getElementById('tvStockChange2');
      const peEl2 = document.getElementById('tvStockPE2');
      const divEl2 = document.getElementById('tvStockDiv2');
      const w52El2 = document.getElementById('tvStock52W2');
      const volEl2 = document.getElementById('tvStockVol2');
      const rsiEl2 = document.getElementById('tvStockRSI2');
      if (dot) {
        if (label.includes('失敗') || label.includes('逾時')) {
          dot.className = 'tv-status-dot error';
        } else if (label.includes('已載入') || label.includes('成功')) {
          dot.className = 'tv-status-dot';
          dot.style.background = 'var(--green)';
        } else {
          dot.className = 'tv-status-dot loading';
        }
      }
      if (text) text.textContent = label;
      if (nameEl) nameEl.textContent = name;
      if (priceEl) {
        const priceStr = p.price >= 1000 ? p.price.toLocaleString('zh-TW', { maximumFractionDigits: 0 }) : p.price?.toFixed(2) || '--';
        priceEl.textContent = '$' + priceStr;
      }
      if (changeEl && chgPct !== null) {
        changeEl.textContent = (chgPct >= 0 ? '▲ ' : '▼ ') + Math.abs(chgPct).toFixed(2) + '%';
        changeEl.style.color = chgPct >= 0 ? 'var(--green)' : 'var(--red)';
        if (priceEl) priceEl.style.color = chgPct >= 0 ? 'var(--green)' : 'var(--red)';
      }
      // P/E chip coloring: green if < 15, red if > 30
      if (peEl2) {
        applyChipClass(peEl2, null);
        const span = peEl2.querySelector('span:last-child');
        if (span) span.textContent = pe || '--';
        const peNum = parseFloat(pe);
        if (!isNaN(peNum)) {
          if (peNum > 30) { peEl2.style.borderColor = 'rgba(255,68,68,0.3)'; peEl2.style.color = 'var(--red)'; }
          else if (peNum < 15) { peEl2.style.borderColor = 'rgba(0,214,143,0.3)'; peEl2.style.color = 'var(--green)'; }
          else { peEl2.style.borderColor = 'rgba(77,159,255,0.2)'; peEl2.style.color = 'var(--text2)'; }
        }
      }
      // Dividend chip: green tint if > 3%
      if (divEl2) {
        applyChipClass(divEl2, null);
        const span = divEl2.querySelector('span:last-child');
        if (span) span.textContent = div ? div.toFixed(2) + '%' : '--';
        if (div > 3) { divEl2.style.borderColor = 'rgba(0,214,143,0.3)'; divEl2.style.color = 'var(--green)'; }
        else { divEl2.style.borderColor = 'rgba(77,159,255,0.2)'; divEl2.style.color = 'var(--text2)'; }
      }
      // 52W chip coloring
      if (w52El2) {
        const w52Num = parseInt(w52);
        if (!isNaN(w52Num)) {
          if (w52Num >= 80) {
            w52El2.classList.remove('down');
            w52El2.classList.add('up', 'near-high');
            w52El2.style.borderColor = 'rgba(0,214,143,0.3)';
            w52El2.style.color = 'var(--green)';
          } else if (w52Num <= 20) {
            w52El2.classList.remove('up');
            w52El2.classList.add('down', 'near-low');
            w52El2.style.borderColor = 'rgba(255,68,68,0.3)';
            w52El2.style.color = 'var(--red)';
          } else {
            w52El2.classList.remove('up', 'down', 'near-high', 'near-low');
            w52El2.style.borderColor = 'rgba(255,176,32,0.2)';
            w52El2.style.color = 'var(--amber)';
          }
        }
        const span = w52El2.querySelector('span:last-child');
        if (span) span.textContent = w52 || '--';
      }
      // Volume chip
      if (volEl2) {
        const span = volEl2.querySelector('span:last-child');
        // w52 here is actually a string with attached metadata
        const vol = (typeof w52 === 'object' && w52 !== null) ? (w52.__volume || null) : null;
        const volStr = vol ? (vol >= 1e8 ? (vol/1e8).toFixed(1)+'E' : vol >= 1e6 ? (vol/1e6).toFixed(1)+'M' : vol >= 1e3 ? (vol/1e3).toFixed(0)+'K' : vol) : '--';
        if (span) span.textContent = volStr;
      }
      // RSI chip — calculate from price history if available
      if (rsiEl2) {
        const span = rsiEl2.querySelector('span:last-child');
        let rsiVal = null;
        // Try to get RSI from the p object if it has historical data
        if (p && p.price_history && p.price_history.length >= 15) {
          const closes = p.price_history.map(d => typeof d === 'number' ? d : d.close || d.c || 0);
          if (closes.length >= 15) {
            let gains = 0, losses = 0;
            for (let i = closes.length - 14; i < closes.length; i++) {
              const diff = closes[i] - closes[i-1];
              if (diff >= 0) gains += diff; else losses += Math.abs(diff);
            }
            const avgGain = gains / 14, avgLoss = losses / 14;
            rsiVal = avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
          }
        }
        if (rsiVal !== null) {
          const rsiColor = rsiVal > 70 ? 'var(--red)' : rsiVal < 30 ? 'var(--green)' : rsiVal > 60 ? 'var(--amber)' : 'var(--text2)';
          if (span) { span.textContent = rsiVal.toFixed(0); span.style.color = rsiColor; }
          rsiEl2.style.color = rsiColor;
          rsiEl2.style.borderColor = rsiVal > 70 ? 'rgba(255,68,68,0.3)' : rsiVal < 30 ? 'rgba(0,214,143,0.3)' : 'rgba(77,159,255,0.2)';
        } else {
          if (span) { span.textContent = '--'; span.style.color = ''; }
          rsiEl2.style.color = 'var(--text3)';
          rsiEl2.style.borderColor = 'rgba(77,159,255,0.2)';
        }
      }
    };

    // External links
    const extLink=document.getElementById('tvExternalLink');
    const yhooLink=document.getElementById('tvYhooLink');
    const goodinfoLink=document.getElementById('tvGoodinfoLink');
    if(extLink)extLink.href=`https://www.tradingview.com/chart/?symbol=TWSE:${tickerSym}`;
    if(yhooLink)yhooLink.href=`https://tw.stock.yahoo.com/quote/${tickerSym}.TW`;
    if(goodinfoLink)goodinfoLink.href=`https://goodinfo.tw/StockDetail.asp?STOCK_ID=${tickerSym}`;
    const newsLink=document.getElementById('tvNewsLink');
    if(newsLink)newsLink.href=`https://news.google.com/search?q=${encodeURIComponent(tickerSym + ' ' + name)}&hl=zh-TW&gl=TW`;

    // Calculate values for status bar
    let chgPctVal=null, peVal=null, divVal=null, w52Val=null;
    if(p.price){
      chgPctVal=p.prev_close?((p.price-p.prev_close)/p.prev_close*100):null;
      const f=getFundamental(tickerSym);
      peVal=f?.trailingPE?f.trailingPE.toFixed(1):null;
      divVal=f?.dividendYield||null;
      if(p.year_high&&p.year_low&&p.year_high!==p.year_low){
        w52Val=((p.price-p.year_low)/(p.year_high-p.year_low)*100).toFixed(0)+'%';
        // Attach volume to w52Val for the chip renderer
        w52Val.__volume = p.volume || null;
        w52Val.__price = p;
      }
    }
    setStatusBar(name+' 已載入', p.price, chgPctVal, peVal, divVal, w52Val);
    container.innerHTML = '';
    // TradingView widget with multi-source fallback chain
    const tvScriptId = 'tv-widget-script';
    // Pre-start iframe fallback immediately so user sees chart fast
    setTimeout(() => {
      if (!tvLoaded) {
        console.log('[TV] Loading iframe fallback in background...');
        loadTVFallback(tickerSym);
      }
    }, 3000);
    const clearOldScript = () => {
      ['tv-widget-script','tv-lib-loaded'].forEach(id => {
        document.getElementById(id)?.remove();
      });
    };
    clearOldScript();

    setStatusBar('正在載入 TradingView...', null, null, null, null, null);

    // Method 1: TradingView already preloaded via <script> tag in <head>
    const tryPreloaded = () => {
      return new Promise((resolve) => {
        if (typeof TradingView !== 'undefined') {
          console.log('[TV] Preloaded TradingView detected');
          resolve(true);
        } else if (window.__tvLoadFailed) {
          console.warn('[TV] Preloaded script failed');
          resolve(false);
        } else {
          // Poll for TradingView to become available (preloaded async)
          let attempts = 0;
          const poll = setInterval(() => {
            attempts++;
            if (typeof TradingView !== 'undefined') {
              clearInterval(poll);
              console.log('[TV] TradingView loaded via polling');
              resolve(true);
            } else if (attempts >= 12) { // ~3.6 seconds max — fast fallback
              clearInterval(poll);
              resolve(false);
            }
          }, 300);
        }
      });
    };

    // Method 2: Dynamic script injection as fallback
    const tryDynamicLoad = () => {
      return new Promise((resolve) => {
        const s = document.createElement('script');
        s.id = 'tv-widget-script-dynamic';
        s.src = 'https://s.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        s.type = 'text/javascript';
        s.async = true;
        s.onload = () => { console.log('[TV] Dynamic script loaded'); resolve(true); };
        s.onerror = () => { console.warn('[TV] Dynamic script failed'); resolve(false); };
        document.head.appendChild(s);
        // If it doesn't load in 10s, give up
        setTimeout(() => resolve(false), 5000);
      });
    };

    const initWidget = () => {
      try {
        if (typeof TradingView === 'undefined') {
          setStatusBar('TradingView 未就緒，使用本地圖表...', p.price, chgPctVal, peVal, divVal, w52Val);
          loadTVFallback(tickerSym);
          return;
        }
        container.innerHTML = '';
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
          withdateranges: true,
          studies: ['RSI@tv-basicstudies', 'MASimple@tv-basicstudies', 'MACD@tv-basicstudies'],
          container_id: 'tradingview-widget',
          autosize: true,
        });
        tvLoaded = true;
        setStatusBar('已載入 TradingView', p.price, chgPctVal, peVal, divVal, w52Val);
        const dot = document.getElementById('tvStatusDot');
        if (dot) { dot.className = 'tv-status-dot'; dot.style.background = 'var(--green)'; }
      } catch(e) {
        console.warn('[TV] Widget init error:', e);
        setStatusBar('Widget 初始化失敗，使用本地圖表...', p.price, chgPctVal, peVal, divVal, w52Val);
        loadTVFallback(tickerSym);
      }
    };

    (async () => {
      let success = false;
      // Step 1: Check if already preloaded
      const preloaded = await tryPreloaded();
      if (preloaded) {
        success = true;
      } else {
        // Step 2: Try dynamic load
        const dynamic = await tryDynamicLoad();
        if (dynamic) {
          // Wait a moment for TradingView to be ready
          await new Promise(r => setTimeout(r, 800));
          success = typeof TradingView !== 'undefined';
        }
      }

      if (success) {
        setTimeout(() => initWidget(), 300);
      } else {
        // Step 3: Use iframe fallback (most reliable, works everywhere)
        setStatusBar('TradingView 載入逾時，使用 iframe 嵌入...', p.price, chgPctVal, peVal, divVal, w52Val);
        loadTVFallback(tickerSym);
      }
    })();

  }, 300);
}

async function loadTVFallback(tickerSym){
  if(tvFallbackChart)tvFallbackChart.destroy();
  const container=document.getElementById('tradingview-widget');
  const loading=document.getElementById('tvLoading');
  if(loading)loading.style.display='none';

  const code=tickerSym.replace('.TW','').replace('TSE:','').replace(/^TWSE:/,'');
  const price=getPrice(code);
  if(!price||!price.price)return;

  // Respect the user's selected interval from the dropdown
  const selectedInterval = document.getElementById('tvInterval')?.value || 'D';
  // Update button active states to reflect current selection
  document.querySelectorAll('.tv-ival-btn').forEach(b=>b.classList.remove('active'));
  const btnMap = {'5':'5','15':'15','60':'60','D':'D','W':'W'};
  document.querySelectorAll('.tv-ival-btn').forEach(b=>{
    if(b.getAttribute('onclick')?.includes(`'${selectedInterval}'`))b.classList.add('active');
  });

  // Map interval to TradingView widget interval ID
  const tvInterval = selectedInterval === '5' ? '5' :
                     selectedInterval === '15' ? '15' :
                     selectedInterval === '60' ? '60' :
                     selectedInterval === 'W' ? 'W' : 'D';

  // Reliable iframe-based chart using TWSE widget embed format (no API key required)
  const tickerRaw = tickerSym.replace('.TW','').replace('TSE:','').replace(/^TWSE:/,'');
  const tvSym = `TWSE:${tickerRaw}`;
  const iframeUrl = `https://www.tradingview.com/widgetembed/?symbol=${encodeURIComponent(tvSym)}&interval=${tvInterval}&theme=dark&style=1&locale=zh_TW&toolbar_bg=%231a1a1a&hide_top_toolbar=false&save_image=true&studies=MASimple%40tv-basicstudies%2CRSI%40tv-basicstudies%2CMACD%40tv-basicstudies&autosize=true`;
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;height:100%">
      <iframe
        id="tvIframeFallback"
        src="${iframeUrl}"
        style="flex:1;border:none;min-height:360px"
        allow="fullscreen"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        onload="
          var dot=document.getElementById('tvStatusDot');
          var txt=document.getElementById('tvStatusText');
          if(dot){dot.className='tv-status-dot';dot.style.background='var(--green)';}
          if(txt)txt.textContent='已載入 TradingView (iframe)';
        "
        onerror="
          var dot=document.getElementById('tvStatusDot');
          var txt=document.getElementById('tvStatusText');
          if(dot){dot.className='tv-status-dot error';}
          if(txt)txt.textContent='iframe 載入失敗，使用本地圖表';
        "
      ><\/iframe>
      <div style="display:flex;gap:6px;padding:6px 10px;background:#111;border-top:1px solid var(--border);flex-wrap:wrap;align-items:center">
        <button class="btn btn-sm" onclick="loadTVWidget()" style="background:var(--surface3)" title="重試 TradingView widget">🔄 重試</button>
        <a href="https://tw.stock.yahoo.com/quote/${code}" target="_blank" class="btn btn-sm" style="text-decoration:none">📈 Yahoo</a>
        <a href="https://goodinfo.tw/StockDetail.asp?STOCK_ID=${code}" target="_blank" class="btn btn-sm" style="text-decoration:none">📊 GoodInfo</a>
        <a href="https://www.tradingview.com/chart/?symbol=TWSE:${code}" target="_blank" class="btn btn-sm btn-green" style="text-decoration:none">🌐 完整版</a>
        <span style="margin-left:auto;font-size:0.62rem;color:var(--text3)">iframe 模式 · ${tvInterval==='D'?'日線':tvInterval==='W'?'週線':tvInterval==='60'?'60分':tvInterval==='15'?'15分':'5分'}</span>
      </div>
    </div>`;
  tvLoaded=true;
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
  const dpr=window.devicePixelRatio||1;
  const W=canvas.offsetWidth;
  const H=canvas.offsetHeight;
  canvas.width=W*dpr;
  canvas.height=H*dpr;
  canvas.style.width=W+'px';
  canvas.style.height=H+'px';
  ctx.scale(dpr,dpr);

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
    // Force TV re-init so widget reloads even if already initialized
    _tvInitialized = false;
    const widget = document.getElementById('tradingview-widget');
    const loading = document.getElementById('tvLoading');
    if (widget) widget.innerHTML = '';
    if (loading) loading.style.display = 'flex';
    loadTVWidget();
  },150);
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

// OLD buildPEDistribution removed — replaced by v2.9 version below targeting peDistributionGrid

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

  // Compute weighted dividend yield and PE within buildAnalytics
  let totalDivYield=0,totalPE=0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p=getPrice(t); if(p.price<=0)return;
    const mv=d.shares*p.price;
    const f=getFundamental(t);
    if(f?.dividendYield){totalDivYield+=f.dividendYield*mv;}
    if(f?.trailingPE){totalPE+=f.trailingPE*mv;}
  });
  const divYieldPct=(totalDivYield>0&&totalMV>0?(totalDivYield/totalMV):0).toFixed(2);
  const avgPE2=(totalPE>0&&totalMV>0?totalPE/totalMV:0).toFixed(1);

  const metrics=[
    {label:'整體報酬率',value:fmtPct(gainPct),sub:'成本基礎',up:gainPct>=0},
    {label:'日報酬率',value:fmtPct(dayReturn),sub:'今日 P/L',up:dayReturn>=0},
    {label:'最大回撤',value:'-'+maxDrawdown.toFixed(1)+'%',sub:'歷史最大',up:false},
    {label:'最大產業',value:maxSector?.[0]||'--',sub:maxSector?fmtPct((maxSector[1]/totalMV)*100):''},
    {label:'持股檔數',value:stockCount,sub:'勝率 '+(totalStocks>0?(winningStocks/totalStocks*100).toFixed(0):0)+'%'},
    {label:'最大持股',value:topStock?.ticker||'--',sub:topStock?fmtPct((topStock.mv/totalMV)*100):''},
    {label:'平均殖利率',value:divYieldPct+'%',sub:'持倉加權',up:parseFloat(divYieldPct)>=2},
    {label:'平均本益比',value:avgPE2,sub:'持倉加權'},
    {label:'總市值',value:fmtTWD(totalMV),sub:'即時估值'},
    {label:'未實現損益',value:(gain>=0?'+':'')+fmtTWD(gain),sub:'成本 vs 市值',up:gain>=0},
    {label:'起始資金',value:fmtTWD(totals[0]||0),sub:'2025-12-22'},
    {label:'夏普指數',value:sharpe!=='--'?sharpe:'--',sub:'年化 252日',up:parseFloat(sharpe)>=1},
    {label:'最佳月報酬',value:(bestMonth>=0?'+':'')+bestMonth.toFixed(1)+'%',sub:'近月數據',up:bestMonth>=0},
    {label:'最差月報酬',value:(worstMonth>=0?'+':'')+worstMonth.toFixed(1)+'%',sub:'近月數據',up:false},
    {label:'Beta (vs TAIEX)',value:portfolioBeta,sub:'今日估算',up:parseFloat(portfolioBeta)<=1.2},
    {label:'Top5 集中度',value:top5Pct+'%',sub:'前5大持股佔比',up:parseFloat(top5Pct)<=50},
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

let currentSort = 'mv';
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
  const btn=document.getElementById('refreshBtn');
  const spinner=document.getElementById('refreshSpinner');
  const text=document.getElementById('refreshText');
  if(!btn||!spinner||!text)return;
  if(btn.disabled)return; // Prevent double-click
  spinner.style.display='inline-block';
  text.textContent='更新中...';
  btn.classList.add('refreshing');
  btn.disabled=true;
  _countdown = 30 * 60; // Reset countdown after manual refresh
  setTimeout(async ()=>{
    _holdingsCache=null;
    sectionsBuilt.clear();
    await loadData(); // Refresh from JSON
    init();
    // Rebuild all sections to ensure fresh data across the board
    buildHistoryCharts(); sectionsBuilt.add('history');
    buildSignals(); sectionsBuilt.add('signals');
    buildNews(); sectionsBuilt.add('news');
    buildAnalytics(); buildHeatmap(); buildMoversTable(); buildCompare(); buildRiskMeter(); buildPEDistribution(); buildMonthlyTable(); sectionsBuilt.add('analytics');
    buildPortfolioInsight();
    buildDailyPLSummary();
    buildDailyPLHistory();
    buildOverviewStrip();
    buildMarketBreadth();
    // Re-sync TV chart to current symbol if on chart tab
    const activeTab=document.querySelector('.tab.active')?.dataset?.tab;
    if(activeTab==='chart'){
      // Reload TV widget to reflect new price data
      const tvSym=document.getElementById('tvSymbol')?.value;
      if(tvSym){/* widget auto-refreshes on tab visibility */ }
    }
    spinner.style.display='none';
    text.textContent='✅ 已更新';
    btn.classList.remove('refreshing');
    btn.disabled=false;
    showToast('資料已更新 ✓',2200);
    // Revert text after 2s
    setTimeout(()=>{if(text)text.textContent='🔄 更新';},2000);
  },600);
}

// ============================================================
// TV CHART INIT — called when chart tab is first shown
// ============================================================
let _tvInitialized = false;
function showTVChart() {
  // Reset the TradingView container so the widget can reinitialize cleanly
  const widget = document.getElementById('tradingview-widget');
  const loading = document.getElementById('tvLoading');
  if (widget) {
    widget.innerHTML = '';
    if (loading) loading.style.display = 'flex';
  }
  _tvInitialized = true;
  loadTVWidget();
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
    if(tab.dataset.tab==='chart'){
      if(!_tvInitialized){showTVChart();}
      else{setTimeout(loadTVWidget,100);}
    }
    if(tab.dataset.tab==='history'&&!sectionsBuilt.has('history')){buildHistoryCharts();sectionsBuilt.add('history');}
    if(tab.dataset.tab==='signals'&&!sectionsBuilt.has('signals')){buildSignals();sectionsBuilt.add('signals');}
    if(tab.dataset.tab==='news'&&!sectionsBuilt.has('news')){buildNews();buildMarketBreadth();buildPVBCards();buildSectorIndustryInsight();sectionsBuilt.add('news');}
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
    if(!e.ctrlKey&&!e.metaKey){
      const activeTab=document.querySelector('.tab.active')?.dataset?.tab;
      if(activeTab==='chart'){reloadTVWidget();}
      else{loadData().then(()=>refreshData());}
    }
  }
  // Chart interval shortcuts + TV navigation
  const activeTab=document.querySelector('.tab.active')?.dataset?.tab;
  if(activeTab==='chart'){
    if(e.key==='ArrowLeft'){navigateTVPrev();}
    else if(e.key==='ArrowRight'){navigateTVNext();}
    else if(e.key==='d'||e.key==='D'){document.getElementById('tvInterval').value='D';setTVInterval('D',null);}
    else if(e.key==='w'||e.key==='W'){document.getElementById('tvInterval').value='W';setTVInterval('W',null);}
    else if(e.key==='m'||e.key==='M'){document.getElementById('tvInterval').value='M';loadTVWidget();}
    else if(e.key==='h'||e.key==='H'){document.getElementById('tvInterval').value='60';setTVInterval('60',null);}
    else if(e.key==='2'){document.getElementById('tvInterval').value='120';loadTVWidget();}
    else if(e.key==='1'){document.getElementById('tvInterval').value='5';setTVInterval('5',null);}
    else if(e.key==='4'){document.getElementById('tvInterval').value='240';loadTVWidget();}
  }
  if(e.key==='q'||e.key==='Q'){document.getElementById('quickSearch')?.focus();}
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
  if(_tvHistoryIdx>0){_tvHistoryIdx--;const sel=document.getElementById('tvSymbol');sel.value=_tvHistory[_tvHistoryIdx];loadTVWidget();updateTVMiniCard();}
}
function navigateTVNext(){
  if(_tvHistoryIdx<_tvHistory.length-1){_tvHistoryIdx++;const sel=document.getElementById('tvSymbol');sel.value=_tvHistory[_tvHistoryIdx];loadTVWidget();updateTVMiniCard();}
}

// Track TV navigation history
function trackTVNav(sym){
  // Remove future entries if we're not at the end
  if(_tvHistoryIdx < _tvHistory.length-1){_tvHistory=_tvHistory.slice(0,_tvHistoryIdx+1);}
  if(_tvHistory[_tvHistory.length-1]!==sym){_tvHistory.push(sym);}
  _tvHistoryIdx=_tvHistory.length-1;
}

// Update the mini stock info card shown in the chart header
// This shows price/change/PE/52W immediately without waiting for chart load
function updateTVMiniCard(){
  const sym = document.getElementById('tvSymbol')?.value?.replace('TWSE:','') || '2330';
  const code = sym.replace('.TW','');
  const p = getPrice(code);
  const f = getFundamental(code);
  const symEl = document.getElementById('tvMiniSymbol');
  const priceEl = document.getElementById('tvMiniPrice');
  const changeEl = document.getElementById('tvMiniChange');
  const peEl = document.getElementById('tvMiniPE');
  const w52El = document.getElementById('tvMini52W');
  const name = getNameByCode(code);
  const industry = getIndustryByCode(code);
  const industryLabel = industry ? ` ${getIndustryIcon(industry)}${industry}` : '';

  if(symEl) symEl.textContent = code + industryLabel;
  if(p.price > 0){
    const priceStr = p.price >= 1000 ? p.price.toLocaleString('zh-TW',{maximumFractionDigits:0}) : p.price.toFixed(2);
    if(priceEl){ priceEl.textContent = '$' + priceStr; priceEl.style.color = 'var(--text)'; }
    if(p.prev_close){
      const chg = (p.price - p.prev_close) / p.prev_close * 100;
      const up = chg >= 0;
      if(changeEl){
        changeEl.textContent = (up?'▲ ':'▼ ')+Math.abs(chg).toFixed(2)+'%';
        changeEl.style.color = up ? 'var(--green)' : 'var(--red)';
      }
      if(priceEl) priceEl.style.color = up ? 'var(--green)' : 'var(--red)';
      // Also update the status bar via setStatusBar
      if(typeof setStatusBar === 'function'){
        setStatusBar(name, p.price, chg, f?.trailingPE||null, f?.dividendYield||null, p);
      }
    } else {
      // Update status bar even without prev_close
      if(typeof setStatusBar === 'function'){
        setStatusBar(name, p.price, 0, f?.trailingPE||null, f?.dividendYield||null, p);
      }
    }
  } else {
    if(priceEl){ priceEl.textContent = '--'; priceEl.style.color = 'var(--text)'; }
    if(changeEl){ changeEl.textContent = '--'; changeEl.style.color = 'var(--text3)'; }
  }
  if(f?.trailingPE){
    const peColor = f.trailingPE < 15 ? 'var(--green)' : f.trailingPE > 25 ? 'var(--amber)' : 'var(--blue)';
    if(peEl){ peEl.textContent = 'P/E ' + f.trailingPE.toFixed(1); peEl.style.color = peColor; }
  } else {
    if(peEl){ peEl.textContent = 'P/E --'; peEl.style.color = 'var(--text3)'; }
  }
  if(p.year_high && p.year_low && p.year_high !== p.year_low){
    const w52 = ((p.price - p.year_low) / (p.year_high - p.year_low) * 100).toFixed(0);
    const w52Color = w52 >= 80 ? 'var(--green)' : w52 <= 20 ? 'var(--red)' : 'var(--amber)';
    if(w52El){ w52El.textContent = '52W ' + w52 + '%'; w52El.style.color = w52Color; }
  } else {
    if(w52El){ w52El.textContent = '52W --'; w52El.style.color = 'var(--text3)'; }
  }
}

// ============================================================
// ENHANCED: TV WIDGET RELOAD ON DEMAND
// ============================================================
function reloadTVWidget() {
  const widget = document.getElementById('tradingview-widget');
  const loading = document.getElementById('tvLoading');
  // Reset tvLoaded flag so fresh load happens
  window.tvLoaded = false;
  if (widget) {
    // Clear widget and show original loading overlay
    widget.innerHTML = '';
    if (loading) {
      loading.style.display = 'flex';
    }
  }
  setTimeout(() => loadTVWidget(), 150);
}

// ============================================================
// ENHANCED: PORTFOLIO VS BENCHMARK CARD
// ============================================================
function buildPortfolioVsBenchmark() {
  const el = document.getElementById('portfolioVsBench');
  if (!el) return;
  const allHoldings = getAllHoldings();
  const t0050 = getPrice('0050');
  let totalMV = 0, totalCost = 0, totalPrev = 0;
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t); if (!p.price) return;
    totalMV += d.shares * p.price;
    totalPrev += d.shares * (p.prev_close || p.price);
    if (d.cost > 0) totalCost += d.shares * d.cost;
  });
  const dayChg = totalMV - totalPrev;
  const dayPct = totalPrev > 0 ? (dayChg / totalPrev * 100) : 0;
  const benchChg = t0050.prev_close ? ((t0050.price - t0050.prev_close) / t0050.prev_close * 100) : 0;
  const alpha = dayPct - benchChg;
  const totalGain = totalMV - totalCost;
  const totalGainPct = totalCost > 0 ? (totalGain / totalCost * 100) : 0;
  const tsmc = getPrice('2330');
  const tsmcChg = tsmc.prev_close ? ((tsmc.price - tsmc.prev_close) / tsmc.prev_close * 100) : 0;

  el.innerHTML = `
    <div class="pvb-card">
      <div class="pvb-label">日 α 超額</div>
      <div class="pvb-value" style="color:var(--${alpha >= 0 ? 'green' : 'red'})">${alpha >= 0 ? '+' : ''}${alpha.toFixed(2)}%</div>
      <div class="pvb-sub">vs ${benchChg >= 0 ? '+' : ''}${benchChg.toFixed(2)}% (0050)</div>
    </div>
    <div class="pvb-card">
      <div class="pvb-label">總報酬率</div>
      <div class="pvb-value" style="color:var(--${totalGainPct >= 0 ? 'green' : 'red'})">${totalGainPct >= 0 ? '+' : ''}${totalGainPct.toFixed(1)}%</div>
      <div class="pvb-sub">${totalGain >= 0 ? '+' : ''}${fmtTWD(totalGain)}</div>
    </div>
    <div class="pvb-card">
      <div class="pvb-label">台積電影響</div>
      <div class="pvb-value" style="color:var(--${tsmcChg >= 0 ? 'green' : 'red'})">${tsmcChg >= 0 ? '+' : ''}${tsmcChg.toFixed(2)}%</div>
      <div class="pvb-sub">${tsmc.price >= 1000 ? Math.round(tsmc.price).toLocaleString() : tsmc.price.toFixed(1)}</div>
    </div>
  `;
}

// ============================================================
// ENHANCED: NEWS TAG FILTER (improved filter pills)
// ============================================================
const NEWS_TAGS = [
  { id: 'all', label: '全部', color: '#9a9a9a' },
  { id: 'semi', label: '半導體', color: '#60a5fa' },
  { id: 'ai', label: 'AI/科技', color: '#b066ff' },
  { id: 'finance', label: '金融', color: '#00d68f' },
  { id: 'macro', label: '總經', color: '#ff4444' },
  { id: 'etf', label: 'ETF', color: '#00c9d4' },
  { id: 'aero', label: '航運', color: '#ffb020' }
];

function buildNewsTagFilter() {
  const el = document.getElementById('newsTagFilter');
  if (!el) return;
  el.innerHTML = NEWS_TAGS.map(tag => `
    <button class="news-filter-btn ${tag.id === 'all' ? 'active' : ''}"
            onclick="filterNewsByTag(this, '${tag.id}')"
            style="${tag.id !== 'all' ? `--tag-color:${tag.color}` : ''}"
            data-tag="${tag.id}">
      ${tag.label}
    </button>
  `).join('');
}

// ============================================================
// ENHANCED: MARKET SESSION STATUS BADGE
// ============================================================
function getMarketSessionStatus() {
  const now = new Date();
  const taipeiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
  const day = taipeiTime.getDay();
  const hour = taipeiTime.getHours();
  const minute = taipeiTime.getMinutes();
  const timeInMinutes = hour * 60 + minute;
  const isWeekend = day === 0 || day === 6;

  if (isWeekend) return { status: 'weekend', label: '週末休市', class: 'holiday' };
  if (timeInMinutes >= 540 && timeInMinutes < 870) return { status: 'open', label: '台股交易中', class: 'open' };
  if (timeInMinutes >= 870) return { status: 'after-hours', label: '盤後', class: 'closed' };
  return { status: 'pre-market', label: '開盤前', class: 'closed' };
}

function updateMarketSessionBadge() {
  const el = document.getElementById('marketSessionBadge');
  if (!el) return;
  const { label, class: cls } = getMarketSessionStatus();
  el.innerHTML = `<span class="session-pill ${cls}"><span class="session-market-dot ${cls === 'open' ? 'open' : 'closed'}"></span>${label}</span>`;
}

// ============================================================
// PE DISTRIBUTION CHART (v2.9) — shows PE range distribution of portfolio
// ============================================================
function buildPEDistribution() {
  const el = document.getElementById('peDistributionGrid');
  if (!el) return;
  const allHoldings = getAllHoldings();
  
  const ranges = [
    { label: '極低 (<10)', min: 0, max: 10, color: '#00d68f' },
    { label: '低 (10-18)', min: 10, max: 18, color: '#4d9fff' },
    { label: '中 (18-25)', min: 18, max: 25, color: '#ffb020' },
    { label: '高 (25-40)', min: 25, max: 40, color: '#ff8c00' },
    { label: '極高 (>40)', min: 40, max: 9999, color: '#ff4444' }
  ];
  
  let totalMV = 0;
  const peStocks = [];
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    const f = getFundamental(t);
    if (!p.price || !f?.trailingPE) return;
    const mv = d.shares * p.price;
    totalMV += mv;
    peStocks.push({ ticker: t, name: d.name, mv, pe: f.trailingPE });
  });
  
  const bucketCounts = ranges.map(() => ({ count: 0, mv: 0 }));
  peStocks.forEach(s => {
    const idx = ranges.findIndex(r => s.pe > r.min && s.pe <= r.max);
    if (idx >= 0) { bucketCounts[idx].count++; bucketCounts[idx].mv += s.mv; }
  });
  
  const maxMV = Math.max(...bucketCounts.map(b => b.mv), 1);
  
  el.innerHTML = `
    <div class="pe-dist-summary" style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
      ${ranges.map((r, i) => {
        const pct = totalMV > 0 ? (bucketCounts[i].mv / totalMV * 100) : 0;
        const barW = bucketCounts[i].mv > 0 ? (bucketCounts[i].mv / maxMV * 100) : 0;
        return `<div style="flex:1;min-width:80px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:6px">
          <div style="font-size:0.55rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.03em">${r.label}</div>
          <div style="font-family:var(--font-mono);font-size:0.78rem;font-weight:700;color:${r.color}">${bucketCounts[i].count}檔</div>
          <div style="height:3px;background:var(--surface3);border-radius:2px;overflow:hidden;margin-top:3px">
            <div style="height:100%;width:${barW}%;background:${r.color};border-radius:2px;transition:width 0.5s"></div>
          </div>
          <div style="font-size:0.58rem;font-family:var(--font-mono);color:var(--text3);margin-top:2px">${pct.toFixed(1)}%</div>
        </div>`;
      }).join('')}
    </div>
  `;
}

// ============================================================
// NEWS SENTIMENT SUMMARY (v2.9) — count badges on news tab
// ============================================================
function updateNewsTabBadges() {
  const data = NEWS_DATA || [];
  const pos = data.filter(n => n.sentiment === 'pos').length;
  const neg = data.filter(n => n.sentiment === 'neg').length;
  const neu = data.filter(n => n.sentiment === 'neu').length;
  
  // Update tab badges if they exist
  const newsTab = document.querySelector('[data-tab="news"]');
  if (newsTab && !newsTab.querySelector('.news-tab-badge')) {
    const badge = document.createElement('span');
    badge.className = 'news-tab-badge neu';
    badge.id = 'newsTabBadge';
    newsTab.appendChild(badge);
  }
  
  const badge = document.getElementById('newsTabBadge');
  if (badge) {
    if (pos > neg) {
      badge.textContent = pos + ' 🟢';
      badge.className = 'news-tab-badge pos';
    } else if (neg > pos) {
      badge.textContent = neg + ' 🔴';
      badge.className = 'news-tab-badge neg';
    } else {
      badge.textContent = data.length + ' 🔵';
      badge.className = 'news-tab-badge neu';
    }
  }
}

// ============================================================
// ENHANCED: PORTFOLIO PEAK-TROUGH INDICATOR
// ============================================================
function buildPortfolioPeakTrough() {
  const el = document.getElementById('peakTroughCard');
  if (!el) return;
  const dates = Object.keys(HISTORY_DATA).sort();
  if (dates.length < 2) return;
  const values = dates.map(d => HISTORY_DATA[d]?.Total || 0).filter(v => v > 0);
  if (values.length === 0) return;
  const peak = Math.max(...values);
  const trough = Math.min(...values);
  const current = values[values.length - 1];
  const peakDate = dates[values.indexOf(peak)];
  const troughDate = dates[values.indexOf(trough)];
  const pctFromTrough = trough > 0 ? ((current - trough) / trough * 100) : 0;
  const pctFromPeak = peak > 0 ? ((current - peak) / peak * 100) : 0;
  const position = peak > trough ? ((current - trough) / (peak - trough) * 100) : 50;

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <div style="flex:1;min-width:120px">
        <div style="font-size:0.6rem;color:var(--text3);margin-bottom:4px">歷史區間定位</div>
        <div class="peak-trough-bar">
          <div class="peak-trough-peak"></div>
          <div class="peak-trough-trough"></div>
          <div class="peak-trough-current" style="left:${Math.max(0,Math.min(92,position))}%;background:${current >= peak * 0.95 ? 'var(--green)' : current <= trough * 1.05 ? 'var(--red)' : 'var(--blue)'}"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.55rem;color:var(--text3);margin-top:2px">
          <span>低 ${fmtTWDShort(trough)}</span>
          <span>高 ${fmtTWDShort(peak)}</span>
        </div>
      </div>
      <div style="text-align:center;min-width:60px">
        <div style="font-size:0.58rem;color:var(--text3)">距高點</div>
        <div style="font-family:var(--font-mono);font-size:0.8rem;font-weight:700;color:var(--${pctFromPeak >= -5 ? 'green' : 'amber'})">${pctFromPeak >= 0 ? '+' : ''}${pctFromPeak.toFixed(1)}%</div>
      </div>
      <div style="text-align:center;min-width:60px">
        <div style="font-size:0.58rem;color:var(--text3)">距低點</div>
        <div style="font-family:var(--font-mono);font-size:0.8rem;font-weight:700;color:var(--green)">+${pctFromTrough.toFixed(1)}%</div>
      </div>
    </div>
  `;
}

// ============================================================
// ENHANCED: DIVIDEND YIELD TRACKER
// ============================================================
function buildDividendTracker() {
  const el = document.getElementById('dividendTracker');
  if (!el) return;
  const allHoldings = getAllHoldings();
  const withDividend = Object.entries(allHoldings)
    .map(([t, d]) => {
      const p = getPrice(t); const f = getFundamental(t);
      const mv = d.shares * (p.price || 0);
      const divYield = f?.dividendYield || 0;
      const annualDiv = mv * divYield / 100;
      return { ticker: t, name: d.name, mv, divYield, annualDiv };
    })
    .filter(d => d.mv > 0 && d.divYield > 0)
    .sort((a, b) => b.divYield - a.divYield)
    .slice(0, 8);

  const maxYield = withDividend[0]?.divYield || 1;
  const totalAnnualDiv = withDividend.reduce((s, d) => s + d.annualDiv, 0);
  const totalMV = withDividend.reduce((s, d) => s + d.mv, 0);
  const avgYield = totalMV > 0 ? (totalAnnualDiv / totalMV * 100) : 0;

  el.innerHTML = `
    <div style="margin-bottom:8px;display:flex;gap:8px;flex-wrap:wrap">
      <div class="dp-item" style="flex:1;min-width:80px">
        <div class="dp-label">估算年配息</div>
        <div class="dp-value" style="font-size:0.95rem">${fmtTWDShort(totalAnnualDiv)}</div>
        <div class="dp-sub">${avgYield.toFixed(2)}% 平均殖利率</div>
      </div>
    </div>
    ${withDividend.map(d => `
      <div class="dividend-ticker-row">
        <div class="dividend-ticker">${d.ticker}</div>
        <div class="dividend-yield-bar" title="${d.name}">
          <div class="dividend-yield-fill" style="width:${(d.divYield / maxYield * 100).toFixed(0)}%;background:${d.divYield >= 5 ? 'var(--green)' : d.divYield >= 3 ? 'var(--blue)' : 'var(--amber)'}"></div>
        </div>
        <div class="dividend-yield-val" style="color:${d.divYield >= 5 ? 'var(--green)' : d.divYield >= 3 ? 'var(--blue)' : 'var(--amber)'}">${d.divYield.toFixed(2)}%</div>
      </div>
    `).join('')}
  `;
}

// ============================================================
// ENHANCED: IMPROVED SIGNAL CARDS with 52W bars
// ============================================================
function buildEnhancedSignalRow() {
  const el = document.getElementById('enhancedSignalRow');
  if (!el) return;
  const allHoldings = getAllHoldings();
  const sortedSignals = Object.entries(allHoldings)
    .map(([t, d]) => {
      const p = getPrice(t);
      const mv = d.shares * (p.price || 0);
      const w52pct = p.year_low && p.year_high ? ((p.price - p.year_low) / (p.year_high - p.year_low) * 100) : 50;
      const chg = p.prev_close ? ((p.price - p.prev_close) / p.prev_close * 100) : 0;
      return { ticker: t, name: d.name, mv, w52pct, chg, price: p.price };
    })
    .filter(d => d.mv > 0)
    .sort((a, b) => b.mv - a.mv)
    .slice(0, 6);

  el.innerHTML = sortedSignals.map(s => {
    const w52Color = s.w52pct >= 80 ? 'var(--green)' : s.w52pct <= 20 ? 'var(--red)' : 'var(--blue)';
    const cls = s.chg >= 0 ? 'up' : 'down';
    const priceVal = s.price >= 1000 ? Math.round(s.price).toLocaleString('zh-TW') : s.price.toFixed(2);
    return `
      <div class="signal-card" style="cursor:pointer" onclick="jumpToChart('${s.ticker}')">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
          <span style="font-weight:700;font-family:var(--font-mono);font-size:0.78rem;color:var(--blue)">${s.ticker}</span>
          <span style="font-size:0.62rem;color:var(--text3)">${s.name.slice(0, 4)}</span>
          <span class="${cls}" style="margin-left:auto;font-family:var(--font-mono);font-weight:700;font-size:0.78rem">${fmtPct(s.chg)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px">
          <span style="font-size:0.65rem;font-family:var(--font-mono)">$${priceVal}</span>
          <div class="signal-52w-wrap" style="flex:1">
            <span class="signal-52w-label">52W</span>
            <div class="signal-52w-bar">
              <div class="signal-52w-fill" style="width:${s.w52pct.toFixed(0)}%;background:${w52Color}"></div>
            </div>
            <span class="signal-52w-pct" style="color:${w52Color}">${s.w52pct.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
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
  
  // Update pvDateLabel with dynamic date
  const pvDateEl=document.getElementById('pvDateLabel');
  if(pvDateEl){
    const now=new Date();
    pvDateEl.textContent=now.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',month:'2-digit',day:'2-digit'});
  }
  
  // Update overview news slots from NEWS_DATA
  if(typeof NEWS_DATA!=='undefined' && NEWS_DATA.length>0){
    const liveItems=NEWS_DATA.slice(0,3);
    liveItems.forEach((item,i)=>{
      const el=document.getElementById('ovNews'+(i+1));
      if(el){
        const title=item.title||'';
        const shortTitle=title.length>28?title.substring(0,28)+'…':title;
        const sentIcon=item.sentiment==='pos'?'🟢':item.sentiment==='neg'?'🔴':'⚪';
        const sentColor=item.sentiment==='pos'?'var(--green)':item.sentiment==='neg'?'var(--red)':'var(--blue)';
        el.innerHTML=`<span class="news-compact-title" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical" title="${title}">${sentIcon} ${shortTitle}</span><span class="news-compact-time" style="color:${sentColor}">${item.sentiment==='pos'?'利多':item.sentiment==='neg'?'利空':'中性'}</span>`;
      }
    });
  }
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

  // Update timestamp
  const qsUpdated=document.getElementById('qsUpdated');
  if(qsUpdated){
    const now=new Date();
    const taipei=now.toLocaleString('en-US',{timeZone:'Asia/Taipei'});
    const d=new Date(taipei);
    qsUpdated.textContent=d.toLocaleTimeString('zh-TW',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit'});
  }
}



// ============================================================
// MARKET HOURS CLOCK — shows if Taiwan market is open/closed
// ============================================================
function updateMarketHoursClock(){
  const now = new Date();
  const taipeiTime = new Date(now.toLocaleString('en-US', {timeZone: 'Asia/Taipei'}));
  const day = taipeiTime.getDay(); // 0=Sun, 6=Sat
  const hour = taipeiTime.getHours();
  const minute = taipeiTime.getMinutes();
  const timeInMinutes = hour * 60 + minute;
  
  // Taiwan market hours: Mon-Fri 9:00-13:30 (540-810 mins)
  const isWeekday = day >= 1 && day <= 5;
  const isOpen = isWeekday && timeInMinutes >= 540 && timeInMinutes <= 810;
  const isPreMarket = isWeekday && timeInMinutes >= 480 && timeInMinutes < 540; // 8:00-9:00
  const isAfterMarket = isWeekday && timeInMinutes > 810 && timeInMinutes <= 900; // 13:30-15:00 after market
  
  const clockEl = document.getElementById('marketBadge');
  if(clockEl){
    if(isOpen){
      clockEl.className = 'market-badge open';
      clockEl.innerHTML = '<div class="live-dot"></div><span>盤中</span>';
    } else if(isPreMarket){
      clockEl.className = 'market-badge open';
      clockEl.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:var(--amber);animation:pulse-dot 1.5s infinite"></span><span>盤前</span>';
    } else if(isAfterMarket){
      clockEl.className = 'market-badge open';
      clockEl.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:var(--amber)"></span><span>盤後</span>';
    } else if(day === 0 || day === 6){
      clockEl.className = 'market-badge weekend';
      clockEl.innerHTML = '<span>休市</span>';
    } else {
      clockEl.className = 'market-badge closed';
      clockEl.innerHTML = '<span>已收盤</span>';
    }
  }
  
  // Update status banner
  const statusBanner = document.getElementById('statusBanner');
  const marketStatus = document.getElementById('marketStatus');
  const marketDate = document.getElementById('marketDate');
  if(statusBanner && marketStatus){
    if(isOpen){
      statusBanner.className = 'status-banner open';
      marketStatus.textContent = '台股市場交易中';
    } else if(isPreMarket){
      statusBanner.className = 'status-banner upcoming';
      marketStatus.textContent = '台股盤前交易';
    } else if(day === 0 || day === 6){
      statusBanner.className = 'status-banner closed';
      marketStatus.textContent = '台股週末休市';
    } else {
      statusBanner.className = 'status-banner closed';
      marketStatus.textContent = '台股市場已收盤';
    }
    if(marketDate){
      marketDate.textContent = taipeiTime.toLocaleDateString('zh-TW', {month:'numeric',day:'numeric'});
    }
  }
}

// Update every minute
setInterval(updateMarketHoursClock, 60000);


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
    el.innerHTML = results.map(function(e, idx){
      var t = e[0], d = e[1];
      var p = getPrice(t);
      var chg = p.prev_close ? ((p.price - p.prev_close) / p.prev_close * 100) : 0;
      var cls = chg >= 0 ? 'var(--green)' : 'var(--red)';
      return '<div data-search-item="1" data-fn="jumpToChart" data-arg="' + t + '" onclick="jumpToChart(\'' + t + '\'); document.getElementById(\'searchResults\').style.display=\'none\'; document.getElementById(\'quickSearch\').value=\'\';" style="padding:7px 12px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;border-bottom:1px solid var(--border);transition:background 0.1s;font-size:0.75rem" onmouseover="this.style.background=\'var(--surface2)\'" onmouseout="this.style.background=\'transparent\'">        <div><span style="font-weight:700;font-family:var(--font-mono);color:var(--blue)">' + t + '</span> <span style="color:var(--text2)">' + d.name + '</span></div>        <span style="font-family:var(--font-mono);font-weight:600;color:' + cls + '">' + (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%</span>      </div>';
    }).join('');
  }
  el.style.display = 'block';
}
function hideSearchResults(){
  var el = document.getElementById('searchResults');
  if(el) el.style.display = 'none';
}

// Keyboard navigation for quick search
let searchSelectedIndex = -1;
function handleSearchKeydown(e, inputEl){
  var el = document.getElementById('searchResults');
  if(!el || el.style.display === 'none') return;
  var items = el.querySelectorAll('[data-search-item]');
  if(e.key === 'ArrowDown'){
    e.preventDefault();
    items.forEach(i => i.style.background = 'transparent');
    searchSelectedIndex = Math.min(searchSelectedIndex + 1, items.length - 1);
    if(items[searchSelectedIndex]) items[searchSelectedIndex].style.background = 'var(--surface2)';
  } else if(e.key === 'ArrowUp'){
    e.preventDefault();
    items.forEach(i => i.style.background = 'transparent');
    searchSelectedIndex = Math.max(searchSelectedIndex - 1, 0);
    if(items[searchSelectedIndex]) items[searchSelectedIndex].style.background = 'var(--surface2)';
  } else if(e.key === 'Enter' && searchSelectedIndex >= 0){
    e.preventDefault();
    if(items[searchSelectedIndex]){
      var fn = items[searchSelectedIndex].getAttribute('data-fn');
      var arg = items[searchSelectedIndex].getAttribute('data-arg');
      if(fn && arg){ eval(fn + "('" + arg + "')"); }
      el.style.display = 'none';
      inputEl.value = '';
    }
  } else if(e.key === 'Escape'){
    el.style.display = 'none';
    inputEl.blur();
  }
}


// News sentiment summary banner
function buildNewsSentimentBanner(){
  const el = document.getElementById('newsSentimentItems');
  if(!el || !NEWS_DATA || NEWS_DATA.length === 0) return;
  const pos = NEWS_DATA.filter(n => n.sentiment === 'pos').length;
  const neg = NEWS_DATA.filter(n => n.sentiment === 'neg').length;
  const neu = NEWS_DATA.filter(n => n.sentiment === 'neu').length;
  const total = NEWS_DATA.length;
  const posPct = total > 0 ? Math.round(pos / total * 100) : 0;
  const negPct = total > 0 ? Math.round(neg / total * 100) : 0;
  const overall = pos > neg ? '偏多' : neg > pos ? '偏空' : '中立';
  const overallColor = pos > neg ? 'var(--green)' : neg > pos ? 'var(--red)' : 'var(--amber)';
  el.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><span style="font-size:0.7rem;font-weight:700;color:' + overallColor + '">' + overall + '</span><div style="height:5px;background:var(--surface3);border-radius:3px;overflow:hidden;width:80px"><div style="height:100%;width:' + posPct + '%;background:var(--green);display:inline-block"></div><div style="height:100%;width:' + negPct + '%;background:var(--red);display:inline-block"></div></div></div><div style="font-size:0.62rem;color:var(--green)">🟢 ' + pos + '篇</div><div style="font-size:0.62rem;color:var(--red)">🔴 ' + neg + '篇</div><div style="font-size:0.62rem;color:var(--text3)">⚪ ' + neu + '篇</div><div style="font-size:0.62rem;color:var(--text3);margin-left:4px">| ' + total + '篇總計</div>';
}


// AUTO-REFRESH COUNTDOWN TIMER
let refreshCountdown = 30 * 60; // 30 minutes in seconds
let sectionsBuilt = new Set(); // tracks which lazy sections have been built
let _holdingsCache = null; // cache for getAllHoldings()
function startRefreshTimer() {
  const el = document.getElementById('refreshTimer');
  const badge = document.getElementById('autoRefreshBadge');
  const navbarBadge = document.getElementById('nextRefreshBadge');
  if (!el) return;
  setInterval(() => {
    refreshCountdown--;
    if (refreshCountdown <= 0) {
      refreshCountdown = 30 * 60;
      if (document.visibilityState !== 'hidden') {
        const el2 = document.getElementById('refreshTimer');
        if (el2) el2.textContent = '重新整理中...';
        fetch(window.location.href, {cache: 'no-store'}).then(() => {
          window.location.reload();
        }).catch(() => {
          window.location.reload();
        });
      }
    }
    const m = Math.floor(refreshCountdown / 60);
    const s = refreshCountdown % 60;
    const ts = m + ':' + (s < 10 ? '0' : '') + s;
    if (el) el.textContent = ts + 's';
    // Update navbar next-refresh badge
    if (navbarBadge) {
      if (refreshCountdown <= 60) {
        navbarBadge.textContent = '🔄 ' + ts;
        navbarBadge.style.color = 'var(--red)';
        navbarBadge.style.borderColor = 'rgba(255,68,68,0.3)';
      } else if (refreshCountdown <= 300) {
        navbarBadge.textContent = '🔄 ' + ts;
        navbarBadge.style.color = 'var(--amber)';
        navbarBadge.style.borderColor = 'rgba(255,176,32,0.3)';
      } else {
        navbarBadge.textContent = ts;
        navbarBadge.style.color = 'var(--text3)';
        navbarBadge.style.borderColor = 'var(--border)';
      }
    }
    // Color warning: amber < 5min, red < 1min
    const spinner = document.getElementById('refreshSpinner');
    if (refreshCountdown <= 60) {
      if (el) el.style.color = 'var(--red)';
      if (badge) badge.style.borderColor = 'rgba(255,68,68,0.4)';
      if (spinner) spinner.style.borderTopColor = 'var(--red)';
    } else if (refreshCountdown <= 300) {
      if (el) el.style.color = 'var(--amber)';
      if (badge) badge.style.borderColor = 'rgba(255,176,32,0.4)';
      if (spinner) spinner.style.borderTopColor = 'var(--amber)';
    } else {
      if (el) el.style.color = '';
      if (badge) badge.style.borderColor = '';
      if (spinner) spinner.style.borderTopColor = 'var(--green)';
    }
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

// ============================================================
// PORTFOLIO NEWS DIGEST — shows news related to held stocks
// ============================================================
function buildPortfolioNewsDigest(){
  var el = document.getElementById('portfolioNewsDigest');
  if(!el) return;

  // Get all held tickers
  var holdings = getAllHoldings();
  var heldTickers = Object.keys(holdings);

  // Filter news related to held stocks
  var relevantNews = [];
  NEWS_DATA.forEach(function(n) {
    if(!n.title) return;
    var isRelated = false;
    // Check by related tickers
    if(n.related && Array.isArray(n.related)){
      n.related.forEach(function(t){
        if(heldTickers.indexOf(String(t)) >= 0) isRelated = true;
      });
    }
    // Check by title keyword matching
    if(!isRelated){
      heldTickers.forEach(function(t){
        var name = holdings[t]?.name || '';
        // Check for ticker in title
        if(n.title.indexOf(t) >= 0 || n.title.indexOf(name.slice(0,4)) >= 0) isRelated = true;
      });
    }
    if(isRelated) relevantNews.push(n);
  });

  // Generate intelligent fallback when no news available
  if(relevantNews.length === 0){
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'});
    
    // Build from actual portfolio data
    const movers = heldTickers.map(t => {
      const d = holdings[t];
      const p = getPrice(t);
      if (!p.price || !p.prev_close) return null;
      const chg = (p.price - p.prev_close) / p.prev_close * 100;
      const mv = d.shares * p.price;
      const f = getFundamental(t.replace('.TW',''));
      return { ticker: t, name: d.name, industry: d.industry, chg, mv, pe: f?.trailingPE, div: f?.dividendYield };
    }).filter(x => x && Math.abs(x.chg) >= 0.3).sort((a,b) => Math.abs(b.chg) - Math.abs(a.chg));
    
    const gainers = movers.filter(x => x.chg > 0).slice(0,2);
    const losers = movers.filter(x => x.chg < 0).slice(0,2);
    const twii = MARKET_INDICES.find(i => i.ticker === '^TWII');
    
    const digestItems = [];
    if (gainers.length > 0) {
      digestItems.push({ title: `📈 ${gainers[0].name}(${gainers[0].ticker.replace('.TW','')})大漲 ${gainers[0].chg.toFixed(1)}%`, sentiment: 'pos', time: timeStr });
    }
    if (losers.length > 0) {
      digestItems.push({ title: `📉 ${losers[0].name}(${losers[0].ticker.replace('.TW','')})下跌 ${Math.abs(losers[0].chg).toFixed(1)}%`, sentiment: 'neg', time: timeStr });
    }
    if (twii) {
      digestItems.push({ title: `🌏 加權指數 ${twii.changePct >= 0 ? '▲' : '▼'} ${Math.abs(twii.changePct).toFixed(2)}%`, sentiment: twii.changePct >= 0 ? 'pos' : 'neg', time: timeStr });
    }
    // Top holdings by MV
    const topMV = heldTickers.map(t => ({ t, d: holdings[t], p: getPrice(t) }))
      .filter(x => x.p.price)
      .sort((a,b) => (b.d.shares * b.p.price) - (a.d.shares * a.p.price))
      .slice(0, 1)[0];
    if (topMV) {
      digestItems.push({ title: `💎 最大持股：${topMV.d.name} 市值 NT$ ${(topMV.d.shares * topMV.p.price).toLocaleString('zh-TW', {maximumFractionDigits:0})}`, sentiment: 'neu', time: timeStr });
    }
    
    el.innerHTML = '<div style="display:flex;flex-direction:column;gap:8px;padding:4px 0">'
      + digestItems.map(n => {
        const col = n.sentiment === 'pos' ? 'var(--green)' : n.sentiment === 'neg' ? 'var(--red)' : 'var(--text2)';
        const bg = n.sentiment === 'pos' ? 'rgba(0,214,143,0.06)' : n.sentiment === 'neg' ? 'rgba(255,68,68,0.06)' : 'var(--surface3)';
        const border = n.sentiment === 'pos' ? 'rgba(0,214,143,0.15)' : n.sentiment === 'neg' ? 'rgba(255,68,68,0.15)' : 'var(--border)';
        return `<div style="display:flex;align-items:center;gap:8px;padding:8px;background:${bg};border-left:3px solid ${col};border-radius:4px">
          <div style="flex:1">
            <div style="font-size:0.75rem;color:${col};font-weight:600">${n.title}</div>
            <div style="font-size:0.6rem;color:var(--text3);margin-top:2px">⏱ ${n.time}</div>
          </div>
        </div>`;
      }).join('')
      + '<div style="text-align:center;padding:8px;font-size:0.62rem;color:var(--text3)">📰 點擊右上角 🔄 更新新聞資料</div>'
      + '</div>';
    return;
  }

  // Sort: pos first, then neu, then neg; limit to 8
  var sorted = relevantNews.sort(function(a,b){
    var order = {pos:0, neu:1, neg:2};
    return (order[a.sentiment]||1) - (order[b.sentiment]||1);
  }).slice(0, 8);

  el.innerHTML = '<div class="portfolio-news-digest" style="background:transparent;border:none;padding:0;margin:0">'
    + sorted.map(function(n){
      var sentClass = n.sentiment || 'neu';
      var sentLabel = {pos:'利多',neg:'利空',neu:'中立'}[sentClass] || '中立';
      var sentColor = {pos:'var(--green)',neg:'var(--red)',neu:'var(--text3)'}[sentClass] || 'var(--text3)';
      var timeStr = n.time ? '<span class="portfolio-news-time">' + n.time + '</span>' : '';
      var relatedHtml = '';
      if(n.related && n.related.length > 0){
        var chips = n.related.slice(0,3).map(function(t){
          var name = holdings[t]?.name || t;
          return '<span class="portfolio-news-ticker" style="margin-right:3px">' + t + '</span>';
        }).join('');
        relatedHtml = '<div style="margin-top:3px">' + chips + '</div>';
      }
      return '<div class="portfolio-news-item">'
        + '<div class="portfolio-news-sentiment ' + sentClass + '" title="' + sentLabel + '"></div>'
        + '<div class="portfolio-news-text">'
        + '<div style="font-weight:600;color:var(--text);line-height:1.4;margin-bottom:2px">' + n.title + '</div>'
        + '<div style="display:flex;align-items:center;gap:6px;margin-top:2px">'
        + '<span style="font-size:0.6rem;padding:1px 5px;border-radius:6px;font-weight:700;background:' + (sentClass==='pos'?'rgba(0,214,143,0.1)':sentClass==='neg'?'rgba(255,68,68,0.1)':'var(--surface3)') + ';color:' + sentColor + '">' + sentLabel + '</span>'
        + timeStr
        + '</div>'
        + relatedHtml
        + '</div></div>';
    }).join('')
    + '</div>';
}



// ============================================================
// PERFORMANCE SCORE CARD — overview panel
// ============================================================
function buildPerformanceScoreCard(){
  const allHoldings = getAllHoldings();
  const dates = Object.keys(HISTORY_DATA).sort();
  
  // Win rate: how many stocks are up today
  let stocksUp = 0, totalStocks = 0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p = getPrice(t);
    if(!p.price || !p.prev_close) return;
    totalStocks++;
    if(p.price >= p.prev_close) stocksUp++;
  });
  const winRate = totalStocks > 0 ? (stocksUp / totalStocks * 100) : 50;
  
  // Alpha: portfolio day return vs TAIEX
  let totalMV = 0, totalPrevMV = 0;
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p = getPrice(t);
    if(!p.price) return;
    totalMV += d.shares * p.price;
    totalPrevMV += d.shares * (p.prev_close || p.price);
  });
  const dayChgPct = totalPrevMV > 0 ? ((totalMV - totalPrevMV) / totalPrevMV * 100) : 0;
  const twii = MARKET_INDICES.find(i => i.ticker === '^TWII');
  const twiiChg = twii ? twii.changePct : 0;
  const alpha = dayChgPct - twiiChg;
  
  // Annualized return (from history)
  if(dates.length >= 2){
    const firstTotal = HISTORY_DATA[dates[0]].Total;
    const lastTotal = HISTORY_DATA[dates[dates.length-1]].Total;
    const totalDays = (new Date(dates[dates.length-1]) - new Date(dates[0])) / 86400000;
    if(firstTotal > 0 && totalDays > 0){
      const annReturn = (Math.pow(lastTotal / firstTotal, 365 / totalDays) - 1) * 100;
      const el = document.getElementById('psAnnual');
      if(el){
        el.textContent = (annReturn >= 0 ? '+' : '') + annReturn.toFixed(1) + '%';
        el.style.color = annReturn >= 0 ? 'var(--green)' : 'var(--red)';
      }
    }
  }
  
  // Win rate
  const wrEl = document.getElementById('psWinRate');
  if(wrEl){
    wrEl.textContent = winRate.toFixed(0) + '%';
    wrEl.style.color = winRate >= 50 ? 'var(--green)' : 'var(--red)';
  }
  
  // Alpha
  const alphaEl = document.getElementById('psAlpha');
  if(alphaEl){
    alphaEl.textContent = (alpha >= 0 ? '+' : '') + alpha.toFixed(2) + '%';
    alphaEl.style.color = alpha >= 0 ? 'var(--green)' : 'var(--red)';
  }
  
  // Risk: based on top sector concentration
  const sectorMV = {};
  Object.entries(allHoldings).forEach(([t,d])=>{
    const p = getPrice(t);
    if(!p.price) return;
    const mv = d.shares * p.price;
    const sec = d.industry || '其他';
    sectorMV[sec] = (sectorMV[sec] || 0) + mv;
  });
  const topSectorPct = Object.values(sectorMV).sort((a,b)=>b-a)[0] / totalMV * 100;
  const riskEl = document.getElementById('psRisk');
  const riskSubEl = document.getElementById('psRiskSub');
  if(riskEl){
    if(topSectorPct > 50){
      riskEl.textContent = '高';
      riskEl.style.color = 'var(--red)';
      if(riskSubEl) riskSubEl.textContent = '產業集中';
    } else if(topSectorPct > 35){
      riskEl.textContent = '中';
      riskEl.style.color = 'var(--amber)';
      if(riskSubEl) riskSubEl.textContent = '適中';
    } else {
      riskEl.textContent = '低';
      riskEl.style.color = 'var(--green)';
      if(riskSubEl) riskSubEl.textContent = '分散良好';
    }
  }
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

  // ── Load live price data ────────────────────────────────────────
  // data.js (loaded via <script> tag) already contains complete PRICE_DATA,
  // FUNDAMENTALS, HISTORY_DATA, MARKET_INDICES. We MERGE live updates from
  // data.json on top — but ONLY if data.json is at least as complete as what
  // we already have (guarded by a minimum ticker-count threshold).
  // This prevents a sparse / failed fetch from wiping out data.js content.
  try {
    const text = await fetchText('data.json');
    const d = JSON.parse(text);
    const fetchedTickers = d.prices ? Object.keys(d.prices).length : 0;
    const existingTickers = Object.keys(PRICE_DATA).length;

    if (fetchedTickers > 0 && fetchedTickers >= existingTickers) {
      // data.json is at least as complete — safe to merge
      if (d.prices) Object.assign(PRICE_DATA, d.prices);
      if (d.fundamentals) Object.assign(FUNDAMENTALS, d.fundamentals);
      if (d.indices && d.indices.length > 0) {
        MARKET_INDICES.splice(0, MARKET_INDICES.length, ...d.indices);
      }
      const updated = d.updated || new Date().toISOString();
      const el = document.getElementById('lastUpdated');
      if (el) {
        el.textContent = new Date(updated).toLocaleString('zh-TW', {timeZone:'Asia/Taipei', month:'numeric', day:'numeric', hour:'2-digit', minute:'2-digit'});
        el.dataset.ts = updated;
      }
      console.log(`[loadData] Merged ${fetchedTickers} tickers from live data.json`);
    } else {
      console.warn(`[loadData] data.json has only ${fetchedTickers} tickers (data.js has ${existingTickers}) — keeping data.js content`);
    }
  } catch (e) {
    console.warn('[loadData] data.json fetch/parse failed, using data.js content:', e.message);
    // Fallback: read FUNDAMENTALS from the inline script tag if available
    const fundEl = document.getElementById('fundamentals-data');
    if (fundEl) {
      try {
        const fd = JSON.parse(fundEl.textContent);
        Object.assign(FUNDAMENTALS, fd);
      } catch(e2) { console.warn('[loadData] FUNDAMENTALS parse failed:', e2); }
    }
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

  // Refresh market context banner and status after data is loaded
  if (typeof updateMarketContextBanner === 'function') updateMarketContextBanner();
  if (typeof buildPortfolioInsight === 'function') buildPortfolioInsight();
  if (typeof updateMarketStatus === 'function') updateMarketStatus();
}

// ============================================================
// ENHANCED PORTFOLIO METRICS (v2.7)
// ============================================================
function buildEnhancedPortfolioMetrics() {
  const el = document.getElementById('enhancedMetricsBar');
  if (!el) return;
  const allHoldings = getAllHoldings();
  const dates = Object.keys(HISTORY_DATA).sort();
  const todayKey = dates[dates.length - 1];
  const prevKey = dates.length >= 2 ? dates[dates.length - 2] : todayKey;
  const todayTotal = HISTORY_DATA[todayKey]?.Total || 0;
  const prevTotal = HISTORY_DATA[prevKey]?.Total || todayTotal;
  const dayChg = todayTotal - prevTotal;
  const dayPct = prevTotal > 0 ? (dayChg / prevTotal * 100) : 0;

  // Since inception (first entry)
  const firstEntry = dates[0];
  const startTotal = HISTORY_DATA[firstEntry]?.Total || todayTotal;
  const totalReturn = startTotal > 0 ? ((todayTotal - startTotal) / startTotal * 100) : 0;

  // Peak tracking
  const allVals = dates.map(d => HISTORY_DATA[d]?.Total || 0);
  const peak = Math.max(...allVals);
  const drawdown = peak > 0 ? ((peak - todayTotal) / peak * 100) : 0;

  // Portfolio beta
  const beta = getPortfolioBeta();

  // Portfolio yield (weighted avg dividend yield)
  let totalMV = 0, weightedYield = 0;
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if (!p.price) return;
    const mv = d.shares * p.price;
    totalMV += mv;
    const f = getFundamental(t);
    if (f?.dividendYield) weightedYield += mv * f.dividendYield;
  });
  const portfolioYield = totalMV > 0 ? (weightedYield / totalMV * 100) : 0;

  el.innerHTML = `
    <div class="em-item">
      <div class="em-label">日報酬</div>
      <div class="em-value ${dayPct >= 0 ? 'up' : 'down'}">${dayPct >= 0 ? '+' : ''}${dayPct.toFixed(2)}%</div>
      <div class="em-sub">${dayChg >= 0 ? '+' : ''}${fmtTWDShort(Math.abs(dayChg))}</div>
    </div>
    <div class="em-item">
      <div class="em-label">總報酬</div>
      <div class="em-value ${totalReturn >= 0 ? 'up' : 'down'}">${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(1)}%</div>
      <div class="em-sub">自 ${firstEntry ? firstEntry.substring(5) : '--'}</div>
    </div>
    <div class="em-item">
      <div class="em-label">帳面回檔</div>
      <div class="em-value ${drawdown > 5 ? 'down' : drawdown > 0 ? '' : 'up'}">${drawdown > 0 ? '-' : ''}${drawdown.toFixed(1)}%</div>
      <div class="em-sub">峰: ${fmtTWDShort(peak)}</div>
    </div>
    <div class="em-item">
      <div class="em-label">組合β值</div>
      <div class="em-value" style="color:${beta > 1.2 ? 'var(--red)' : beta < 0.9 ? 'var(--green)' : 'var(--text)'}">${beta.toFixed(2)}</div>
      <div class="em-sub">${beta > 1.2 ? '高風險' : beta < 0.9 ? '防御型' : '均衡'}</div>
    </div>
    <div class="em-item">
      <div class="em-label">殖利率</div>
      <div class="em-value" style="color:var(--green)">${portfolioYield.toFixed(2)}%</div>
      <div class="em-sub">加權平均</div>
    </div>
  `;
}

// ============================================================
// SECTOR RISK BAR (v2.7) — shows portfolio sector concentration
// ============================================================
function buildSectorRiskBar() {
  const el = document.getElementById('sectorRiskBar');
  if (!el) return;
  const allHoldings = getAllHoldings();
  const sectors = {};
  let totalMV = 0;
  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    if (!p.price) return;
    const mv = d.shares * p.price;
    totalMV += mv;
    const ind = d.industry || '其他';
    sectors[ind] = (sectors[ind] || 0) + mv;
  });

  const sorted = Object.entries(sectors).sort((a, b) => b[1] - a[1]);
  const sectorColors = {
    '半導體': '#4d9fff', '電子': '#b066ff', '光電': '#60a5fa',
    '金融': '#00d68f', 'ETF': '#00c9d4', '航空': '#ffb020',
    '通信網路': '#ff8c00', '其他': '#9a9a9a'
  };

  el.innerHTML = sorted.slice(0, 5).map(([sector, mv]) => {
    const pct = totalMV > 0 ? (mv / totalMV * 100) : 0;
    const color = sectorColors[sector] || '#9a9a9a';
    return `
      <div class="sr-row">
        <div class="sr-label" style="color:${color}">${sector}</div>
        <div class="sr-bar-wrap"><div class="sr-bar" style="width:${pct.toFixed(1)}%;background:${color}"></div></div>
        <div class="sr-pct">${pct.toFixed(1)}%</div>
      </div>
    `;
  }).join('');
}

// ============================================================
// PORTFOLIO DIVIDEND PROJECTION (v2.7)
// ============================================================
function buildPortfolioDividendProjection() {
  const el = document.getElementById('divProjectionBar');
  if (!el) return;
  const allHoldings = getAllHoldings();

  let totalShares = 0, totalCost = 0, totalMV = 0;
  let projectedDiv = 0;
  const divStocks = [];

  Object.entries(allHoldings).forEach(([t, d]) => {
    const p = getPrice(t);
    const f = getFundamental(t);
    if (!p.price || !d.shares) return;
    const mv = d.shares * p.price;
    totalMV += mv;
    totalShares += d.shares;
    totalCost += d.shares * d.cost;
    if (f?.dividendYield && d.cost > 0) {
      const annualDiv = d.shares * d.cost * f.dividendYield / 100;
      projectedDiv += annualDiv;
      divStocks.push({ ticker: t, name: d.name, yield: f.dividendYield, annualDiv });
    }
  });

  const costBasis = totalCost;
  const divYield = costBasis > 0 ? (projectedDiv / costBasis * 100) : 0;
  const topDivStocks = divStocks.sort((a, b) => b.yield - a.yield).slice(0, 4);

  el.innerHTML = `
    <div class="dp-summary">
      <div class="dp-stat">
        <div class="dp-label">預估年配息</div>
        <div class="dp-value">NT$ ${Math.round(projectedDiv).toLocaleString('zh-TW')}</div>
      </div>
      <div class="dp-stat">
        <div class="dp-label">殖利率</div>
        <div class="dp-value" style="color:${divYield > 4 ? 'var(--green)' : 'var(--text)'}">${divYield.toFixed(2)}%</div>
      </div>
      <div class="dp-stat">
        <div class="dp-label">月均息</div>
        <div class="dp-value" style="color:var(--green)">NT$ ${Math.round(projectedDiv / 12).toLocaleString('zh-TW')}</div>
      </div>
    </div>
    ${topDivStocks.length > 0 ? `
    <div class="dp-stocks">
      ${topDivStocks.map(s => `
        <div class="dp-stock-row">
          <span class="dp-ticker">${s.ticker}</span>
          <span class="dp-stock-name">${s.name}</span>
          <span class="dp-yield">${s.yield.toFixed(1)}%</span>
          <span class="dp-annual">NT$ ${Math.round(s.annualDiv).toLocaleString()}</span>
        </div>
      `).join('')}
    </div>` : ''}
  `;
}

// ================================================================
// INIT — now async, waits for loadData before rendering
// ================================================================

async function init() {
  // Note: loadData() already called by DOMContentLoaded handler before init()
  // Prices are already merged into PRICE_DATA/FUNDAMENTALS/HISTORY_DATA/MARKET_INDICES
  updateMarketStatus();
  updateMarketHoursClock();
  initMarketPulseRibbon();
  buildMarketContextBanner();
  buildPortfolioInsight();
  buildDailyPLSummary();
  buildDailyPLHistory();
  buildOverviewStrip();
  updateHeader();
  buildPortfolioAlertBanner();
  updateGlobalSummary();
  buildBenchmarkStrip();
  buildSectorAllocationMini();
  updateFamilyCards();
  buildSectorList();
  buildMemberPanels();
  buildPie();
  buildHoldingSummary();
  buildTVSelector();
  // Update mini stock info card immediately
  if(typeof updateTVMiniCard==='function') updateTVMiniCard();
  setTimeout(()=>{
    if(typeof updateTVMiniCard==='function') updateTVMiniCard();
  },500);
  buildIndicesGrid();
  buildTickerStrip();
  buildPortfolioMetrics();
  buildAlerts();
  buildConcentration();
  buildConcentrationRisk();
  buildPortfolioHealth();
  buildSparkline();
  buildActionableAlerts();
  buildMarketPulse();
  buildSectorPulseBars();
  buildDividendSummary();
  buildNewsTicker(); // Animated ticker with top movers + market data
  buildPortfolioGauge();
  buildRebalancingSuggestions();
  buildQuickStatsStrip();
  buildTAIEXMiniSparkline();
  buildTodayGlance();
  updateQuickSummary();
  updateMarketMood();
  buildMoverCards();
  buildTopMovers();
  buildNews(); // News sentiment + sector impact
  buildPortfolioNewsDigest(); // Portfolio-specific news digest
  buildPerformanceScoreCard(); // Performance score card
  buildMarketBreadth(); // Market breadth indicator
  buildPVBCards(); // Portfolio vs benchmark mini cards
  buildSectorIndustryInsight(); // Sector performance strip
  buildEnhancedSignalRow(); // New enhanced functions
  buildPortfolioVsBenchmark();
  buildNewsTagFilter();
  updateMarketSessionBadge();
  buildPortfolioPeakTrough();
  buildDividendTracker();
  // NEW v2.7: Enhanced metrics
  buildEnhancedPortfolioMetrics();
  buildSectorRiskBar();
  buildPortfolioDividendProjection();
  buildPEDistribution();
  updateNewsTabBadges();
  // Taiwan news feed
  setTimeout(() => { loadTaiwanStockNews(); }, 1500);
  startRefreshTimer(); // Auto-refresh countdown

  // Load live RSS news feeds for real-time market headlines
  setTimeout(() => { loadLiveRSS(); }, 2000);

  // Eagerly start TradingView chart loading so it's ready faster when user visits chart tab
  setTimeout(() => {
    // Pre-build the TV selector if not already done
    if (typeof buildTVSelector === 'function') buildTVSelector();
    // Start loading the chart in the background
    setTimeout(() => {
      if (typeof loadTVWidget === 'function') {
        loadTVWidget();
      }
    }, 500);
  }, 100);
}

// Auto-refresh every 30 minutes
// Refresh data from JSON every 30 min, then re-init
let _refreshInterval = null;
function scheduleAutoRefresh() {
  if (_refreshInterval) clearInterval(_refreshInterval);
  _refreshInterval = setInterval(async () => {
    await loadData();
    refreshData();
    // Show toast notification
    const toastEl = document.getElementById('toastContainer') || (function() {
      const c = document.createElement('div'); c.id = 'toastContainer'; c.className = 'toast-container'; document.body.appendChild(c); return c;
    })();
    const t = document.createElement('div');
    t.className = 'toast';
    t.style.background = 'rgba(0,214,143,0.12)';
    t.style.borderColor = 'rgba(0,214,143,0.3)';
    t.style.color = 'var(--green)';
    t.style.opacity = '0';
    t.style.transform = 'translateY(16px)';
    t.style.transition = 'opacity 0.25s, transform 0.25s';
    t.textContent = `✅ 自動更新完成 — ${new Date().toLocaleTimeString('zh-TW')}`;
    toastEl.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateY(0)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(-8px)';
      setTimeout(() => t.remove(), 300);
    }, 4000);
  }, 30 * 60 * 1000);
}
scheduleAutoRefresh();

// Countdown badge in navbar showing next refresh
let _countdown = 30 * 60;
setInterval(() => {
  _countdown--;
  const el = document.getElementById('refreshCountdown');
  if (el) {
    const m = Math.floor(_countdown / 60);
    const s = _countdown % 60;
    el.textContent = `⏱ ${m}:${s.toString().padStart(2,'0')}`;
    if (_countdown <= 0) _countdown = 30 * 60;
  }
}, 1000);

// Live update portfolio insight every 5 minutes (lighter-weight refresh)
setInterval(() => {
  if (typeof buildPortfolioInsight === 'function') buildPortfolioInsight();
  if (typeof updateMarketContextBanner === 'function') updateMarketContextBanner();
  if (typeof updateMarketStatus === 'function') updateMarketStatus();
}, 5*60*1000);
// Footer time + market session update
function updateFooterTime(){
  const el=document.getElementById('footerTime');
  if(el){el.textContent=new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});}
  // Update market session in footer
  const msfEl=document.getElementById('marketSessionFooter');
  if(msfEl){
    const {label} = getMarketSessionStatus();
    msfEl.textContent=label;
  }
}
updateFooterTime();
setInterval(updateFooterTime,60000);

// Keyboard shortcut: R to refresh
document.addEventListener('keydown',e=>{if(e.key==='r'&&!e.ctrlKey&&!e.metaKey&&document.activeElement.tagName!=='INPUT'){loadData().then(()=>refreshData());}});

// Scroll to top button
window.addEventListener('scroll',()=>{
  const btn=document.getElementById('scrollTopBtn');
  if(btn){btn.classList.toggle('visible',window.scrollY>200);}
});
document.addEventListener('DOMContentLoaded', async () => { try { await loadData(); if (typeof init === 'function') init(); else console.warn('[init] not found, checking via eval...'); } catch(e) { console.error('[init] error:', e); } });

// CRITICAL FALLBACK: init() may not be defined when the main script fails to parse
// completely due to CDN blocking or slow networks. Keep retrying until it succeeds.
(function() {
  let attempts = 0;
  const tryInit = () => {
    attempts++;
    if (typeof init === 'function') {
      console.log('[init-fallback] init() found after', attempts, 'attempt(s)');
      try { init(); } catch(e) { console.error('[init-fallback] error:', e); }
    } else if (attempts < 60) {
      // Retry up to 60 times (~15 seconds) — enough for slow CDN/GitHub Pages
      setTimeout(tryInit, 250);
    } else {
      console.warn('[init-fallback] Giving up after', attempts, 'attempts');
      // Last resort: try to eval the init function from inline script
      const scripts = document.querySelectorAll('script');
      for (const s of scripts) {
        if (!s.src && s.textContent.includes('async function init()')) {
          try { eval(s.textContent); if (typeof init === 'function') init(); } catch(e2) { console.error('[init-eval] error:', e2); }
          break;
        }
      }
    }
  };
  // Start trying after DOM is mostly ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(tryInit, 100));
  } else {
    setTimeout(tryInit, 100);
  }
})();

// CRITICAL FIX for v2.14.0: Main script block may silently fail to parse in file:// mode
// When init() is undefined but PRICE_DATA is loaded, re-evaluate the main inline script
(function initFix() {
  function doEval() {
    if (typeof init === 'function') return; // Already working
    const scripts = document.querySelectorAll('script');
    for (const s of scripts) {
      if (!s.src && s.textContent.includes('async function init()')) {
        try {
          eval(s.textContent);
          if (typeof init === 'function') {
            console.log('[init-fix] Successfully recovered init() via eval');
            try { init(); } catch(e) { console.error('[init-fix] init() error:', e); }
            return;
          }
        } catch(e) { console.error('[init-fix] eval error:', e); }
        break;
      }
    }
    // Retry after delay
    if (typeof init !== 'function') setTimeout(doEval, 500);
  }
  setTimeout(doEval, 500);
})();
