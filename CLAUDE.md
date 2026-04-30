# 廖家投資看板 — Hermes 自動優化指南

## 這是什麼專案
台灣家庭股票投資組合追蹤 dashboard，單一 HTML 檔案 (`index.html`)，
搭配每日更新腳本 (`update_prices.py`)，使用 yfinance 抓取即時股價。

## 每日例行任務（收盤後執行）

```bash
python3 update_prices.py
```

這會更新 `index.html` 內的：
- `PRICE_DATA`：所有持股最新價格、52 週區間、昨收
- `MARKET_INDICES`：8 個市場指數
- `HISTORY_DATA`：今日家庭總市值快照

## 優化工作清單（依優先順序）

### 🔴 高優先（功能缺失）
- [x] 將 `HISTORY_DATA` 移出 `index.html` → 獨立的 `history.json`，避免 HTML 無限膨脹
- [x] 將 `PRICE_DATA` 和 `MARKET_INDICES` 移出 → `data.json`，HTML 改用 `fetch()` 載入

### 🟡 中優先（UX 改善）
- [x] 在 `update_prices.py` 加入失敗時的 macOS 通知：
  ```python
  import subprocess
  subprocess.run(['osascript', '-e', 'display notification "更新失敗" with title "股票看板"'])
  ```
- [x] 在 `fetch_prices()` 額外抓取 `trailingPE`、`dividendYield`，存入 `data.json`
- [x] Dashboard 新增本益比與殖利率顯示欄位

### 🟢 低優先（維護性）
- [x] 建立 `logs/` 資料夾，每次更新寫入執行記錄
- [ ] `update_prices.py` 的 PORTFOLIOS 若持股變動需同步更新

## 安全原則
- 修改 `index.html` 前先備份：`cp index.html index.html.bak`
- `replace_block()` 函數依賴 `start_marker` 找區塊，改變 HTML 結構時要重新驗證
- 不要更動 `PORTFOLIOS` 內的 `cost`（成本價）欄位，這是手動填寫的歷史數據

## 快速指令
```bash
# 手動觸發更新
python3 update_prices.py

# 查看排程日誌
tail -f ~/Library/Logs/stock-dashboard.log
# 查看更新日誌
tail -f ~/Desktop/stock-portfolio-dashboard/logs/update_$(date +%Y%m%d).log

# 安裝/重裝每日排程
bash install_schedule.sh

# 停用排程
launchctl unload ~/Library/LaunchAgents/com.liao.stock-dashboard.plist
```
