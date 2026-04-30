#!/bin/bash
# 安裝每日自動更新排程 (台股收盤後 14:30 台北時間 = 06:30 UTC)

PLIST_PATH="$HOME/Library/LaunchAgents/com.liao.stock-dashboard.plist"
SCRIPT_PATH="$(cd "$(dirname "$0")" && pwd)/update_prices.py"
LOG_DIR="$HOME/Library/Logs"

cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.liao.stock-dashboard</string>

  <key>ProgramArguments</key>
  <array>
    <string>/opt/homebrew/bin/python3</string>
    <string>$SCRIPT_PATH</string>
  </array>

  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key>   <integer>6</integer>
    <key>Minute</key> <integer>30</integer>
  </dict>

  <key>StandardOutPath</key>
  <string>$LOG_DIR/stock-dashboard.log</string>
  <key>StandardErrorPath</key>
  <string>$LOG_DIR/stock-dashboard-error.log</string>

  <key>RunAtLoad</key>
  <false/>
</dict>
</plist>
EOF

# 載入排程
launchctl unload "$PLIST_PATH" 2>/dev/null
launchctl load "$PLIST_PATH"

echo "✅ 排程已安裝！每天 06:30 UTC (台北 14:30) 自動執行"
echo ""
echo "常用指令："
echo "  立即執行：  python3 \"$SCRIPT_PATH\""
echo "  查看日誌：  tail -f ~/Library/Logs/stock-dashboard.log"
echo "  停用排程：  launchctl unload \"$PLIST_PATH\""
echo "  啟用排程：  launchctl load \"$PLIST_PATH\""
