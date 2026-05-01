#!/usr/bin/env node
/**
 * 日本亞馬遜暢銷商品 vs 台灣售價比較表
 * Puppeteer 抓 Amazon JP 暢銷榜（日幣）→ 與台灣售價比價
 *
 * 安裝依賴：
 *   cd /tmp && npm install puppeteer cheerio
 *
 * 執行：
 *   NODE_PATH=/tmp/node_modules node ~/Desktop/stock-portfolio-dashboard/amazon_jp_deals.js
 */

const puppeteer = require('puppeteer');
const cheerio   = require('cheerio');
const https     = require('https');
const fs        = require('fs');
const path      = require('path');

// ── 設定 ────────────────────────────────────────────
const CATEGORIES = [
  { key: 'fashion',     label: 'Sunglasses' },
  { key: 'apparel',     label: 'Clothing' },
  { key: 'hpc',         label: 'Health & Personal Care' },
  { key: 'electronics', label: 'Electronics' },
  { key: 'sports',      label: 'Sports & Golf' },
  { key: 'shoes',       label: 'Sneakers' },
];

const JPY_TO_TWD = 0.21;
const OUTPUT_DIR = '/Users/sushi/Desktop/stock-portfolio-dashboard/amazon_deals';
const PUPPETEER_MODULE = '/tmp/node_modules/puppeteer';

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── HTTP GET ─────────────────────────────────────────
function httpGet(url, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : require('http');
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'ja-JP,ja;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        ...extraHeaders,
      },
    };
    mod.get(url, opts, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location, extraHeaders).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

// ── 抓暢銷榜（使用 puppeteer + JPY cookie）────────────
async function fetchBestsellersWithPuppeteer(categoryKey) {
  const puppeteer = require(PUPPETEER_MODULE);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    // 強制顯示日幣價格
    await page.setCookie(
      { name: 'i18n-prefs',  value: 'JPY',  domain: '.amazon.co.jp' },
      { name: 'lc-acbjp',    value: 'ja_JP', domain: '.amazon.co.jp' },
    );
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'ja-JP,ja' });

    const url = `https://www.amazon.co.jp/gp/bestsellers/${categoryKey}/`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000 }).catch(() => {});
    // 先等卡片出现（最多12秒）
    try { await page.waitForSelector('div.p13n-sc-uncoverable-faceout', { timeout: 12000 }); } catch { /* 可能卡片稍晚出现 */ }

    // 等待一下讓 JS 渲染完
    await new Promise(r => setTimeout(r, 2000));

    const items = await page.evaluate(() => {
        const JPY_TO_TWD = 0.21;
        const cards = Array.from(document.querySelectorAll('div.p13n-sc-uncoverable-faceout')).slice(0, 12);
      return cards.map(c => {
        // 名稱：partial class match for line-clamp
        const nameEl = c.querySelector('[class*="line-clamp"]');
        const name = nameEl ? nameEl.textContent.trim() : '';

        // 日幣價格：partial class match for p13n-sc-price
        const priceEl = c.querySelector('[class*="p13n-sc-price"]');
        let priceJpy = null;
        if (priceEl) {
          const m = priceEl.textContent.match(/([\d,]+)/);
          if (m) priceJpy = parseInt(m[1].replace(',', ''), 10);
        }
        // fallback: scan innerText for ¥ or ￥ sign
        if (!priceJpy) {
          const innerText = c.innerText || '';
          const match = innerText.match(/[¥￥][\d,]+/);
          if (match) priceJpy = parseInt(match[0].replace(/[¥￥,]/g, ''), 10);
        }

        const asin = c.id || '';
        const linkEl = c.querySelector('a[href*="/dp/"]');
        const href = linkEl ? linkEl.getAttribute('href') : '';
        const asinFromHref = (href.match(/\/dp\/([A-Z0-9]{10})/) || ['', ''])[1];
        const finalAsin = asin || asinFromHref;

        return {
          name: name.substring(0, 120),
          priceJpy,
          priceTwd: priceJpy ? Math.round(priceJpy * JPY_TO_TWD) : null,
          asin: finalAsin,
          url: finalAsin ? `https://www.amazon.co.jp/dp/${finalAsin}` : '',
          twPrice: null,
          twMarket: null,
          shipToTw: null,
        };
      }).filter(c => c.name && c.priceJpy && c.asin);
    });

    return items;
  } finally {
    await browser.close();
  }
}

// ── 檢查是否可送台灣 ────────────────────────────────
async function checkShipToTaiwan(asin) {
  const { body } = await httpGet(`https://www.amazon.co.jp/dp/${asin}`);
  if (!body) return null;
  const lc = body.toLowerCase();
  if (/ship.*taiwan|taiwan.*deliver|台湾.*配送|配送.*台湾/.test(lc)) return true;
  if (/cannot.*ship|not.*deliver|不了.*達|無法.*配送/.test(lc)) return false;
  return null;  // 不確定
}

// ── 搜尋台灣售價 ──────────────────────────────────
async function searchTaiwanPrice(name) {
  const query = encodeURIComponent(name.substring(0, 55) + ' NT$ site:pchome.com.tw OR site:momo.com.tw OR site:shopee.tw');
  const { body } = await httpGet(
    `https://www.google.com/search?q=${query}&num=4&hl=zh-TW`,
    { 'Accept-Language': 'zh-TW,zh;q=0.9' }
  );
  if (!body) return [null, null];
  const priceMatch = body.match(/(?:NT\$|TWD)\s*([\d,]+)/);
  const twPrice = priceMatch ? parseInt(priceMatch[1].replace(',', ''), 10) : null;
  let market = '';
  if (body.includes('pchome')) market = 'PChome';
  else if (body.includes('momo')) market = 'Momo';
  else if (/shopee|蝦皮/.test(body)) market = 'Shopee';
  return [twPrice, market];
}

// ── 主程式 ─────────────────────────────────────────
(async () => {
  const today = new Date().toISOString().split('T')[0];
  console.log(`\n日本亞馬遜暢銷 vs 台灣售價 — ${today}`);
  console.log('='.repeat(60));

  const allResults = [];

  for (const { key, label } of CATEGORIES) {
    console.log(`\n[${label}] 抓取中...`);
    let items = [];
    try {
      items = await fetchBestsellersWithPuppeteer(key);
      console.log(`  → 取得 ${items.length} 筆`);
    } catch (e) {
      console.log(`  → 抓取失敗: ${e.message.replace(/\n.*/,'')}`);
    }

    const enriched = [];
    for (const it of items) {
      process.stdout.write(`  → ${it.name.substring(0, 38)}... ¥${it.priceJpy.toLocaleString()} `);

      // 檢查可否送台灣
      try {
        const ships = await checkShipToTaiwan(it.asin);
        it.shipToTw = ships;
        process.stdout.write(`| ${ships === true ? '✅' : ships === false ? '❌' : '?'} `);

        if (ships !== false) {
          const [twPrice, twMarket] = await searchTaiwanPrice(it.name);
          it.twPrice  = twPrice;
          it.twMarket = twMarket;
          if (twPrice) process.stdout.write(`| NT$ ${twPrice.toLocaleString()} ${twMarket}`);
        }
      } catch (e) {
        process.stdout.write(` [err: ${e.message}]`);
      }
      console.log('');
      enriched.push(it);

      // 禮貌性延遲，避免對 Amazon 造成負擔
      await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
    }

    const filtered = enriched.filter(it => it.shipToTw !== false);
    console.log(`  ✓ ${filtered.length} 件可送台灣`);
    allResults.push({ category: label, items: filtered.slice(0, 10) });
  }

  // 存 JSON
  const dataFile = `${OUTPUT_DIR}/deals_${today}.json`;
  fs.writeFileSync(dataFile, JSON.stringify({ date: today, results: allResults }, null, 2), 'utf8');
  console.log(`\nJSON: ${dataFile}`);

  // 產生 HTML
  generateHTML(allResults, today);
  console.log('HTML 完成！');
  console.log(`\n打開：file://${OUTPUT_DIR}/index.html`);
})().catch(e => { console.error(e); process.exit(1); });

// ── HTML 產生 ─────────────────────────────────────
function generateHTML(data, date) {
  let rows = '';
  for (const catBlock of data) {
    const items = catBlock.items;
    if (!items || !items.length) continue;
    rows += `<tr class="cat-header"><td colspan="7">${catBlock.category}</td></tr>\n`;
    for (const it of items) {
      const twPriceStr = it.twPrice ? `NT$ ${it.twPrice.toLocaleString()}` : '—';
      let diffHtml = '';
      if (it.twPrice && it.priceTwd) {
        const diff = it.twPrice - it.priceTwd;
        const sign = diff >= 0 ? '+' : '';
        const cls  = diff <= 0 ? 'green' : 'red';
        const pct  = `${sign}${Math.round(diff / it.priceTwd * 100)}%`;
        diffHtml = `<span class="${cls}">${sign}NT$${diff.toLocaleString()} (${pct})</span>`;
      }
      const shipIcon = it.shipToTw === true ? '✅' : '⚠️';
      const twMarket = it.twMarket || '';
      rows += `<tr>
  <td class="icon">${shipIcon}</td>
  <td class="name">${it.name}</td>
  <td>¥${it.priceJpy.toLocaleString()}</td>
  <td>NT$ ${it.priceTwd.toLocaleString()}</td>
  <td>${twPriceStr}<br><small>${twMarket}</small></td>
  <td>${diffHtml}</td>
  <td><a href="${it.url}" target="_blank">亞馬遛</a></td>
</tr>\n`;
    }
  }

  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>日本亞馬遜暢銷 vs 台灣售價 — ${date}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0f0f0f;color:#e0e0e0;padding:20px}
h1{text-align:center;color:#fff;margin-bottom:6px}
.subtitle{text-align:center;color:#888;margin-bottom:20px;font-size:14px}
.updated{text-align:right;color:#555;font-size:12px;margin-bottom:10px}
table{width:100%;border-collapse:collapse;background:#1a1a1a;border-radius:8px;overflow:hidden}
th{background:#222;color:#aaa;padding:10px 8px;text-align:left;font-size:12px}
td{padding:9px 8px;border-bottom:1px solid #2a2a2a;font-size:13px;vertical-align:top}
tr:hover td{background:#1f1f1f}
.cat-header td{background:#2a2a2a;color:#fff;font-weight:bold;font-size:13px;padding:8px}
.name{max-width:300px;word-break:break-word}
.green{color:#4cd964}
.red{color:#ff3b30}
a{color:#4d9fff;text-decoration:none}
a:hover{text-decoration:underline}
.icon{text-align:center}
small{color:#666}
</style>
</head>
<body>
<h1>🇯🇵 日本亞馬遜暢銷 vs 🇹🇼 台灣售價</h1>
<p class="subtitle">每天自動更新 · 只列出可直送台灣或台灣有類似商品的項目</p>
<p class="updated">更新：${new Date().toLocaleString('zh-TW')}</p>
<table>
<thead>
<tr><th class="icon">📦</th><th>商品名稱</th><th>🇯🇵 日幣</th><th>≈ 台幣</th><th>🇹🇼 台灣售價</th><th>差價</th><th>連結</th></tr>
</thead>
<tbody>
${rows}
</tbody>
</table>
<p style="text-align:center;color:#555;font-size:11px;margin-top:16px">
日幣匯率 1 JPY ≈ 0.21 TWD | 台灣售價取自 Google 搜尋結果，僅供參考
</p>
</body>
</html>`;

  fs.writeFileSync(`${OUTPUT_DIR}/index.html`, html, 'utf8');
}
