#!/bin/bash
# 安裝每日自動更新排程
# - 14:30 台北時間（台股收盤後 1 小時）
# - 17:00 台北時間（備援，避免 14:30 電腦在睡眠）
# - RunAtLoad: 電腦開機/喚醒時會跑一次（補抓錯過的更新）

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
  <array>
    <dict>
      <key>Hour</key>   <integer>14</integer>
      <key>Minute</key> <integer>30</integer>
    </dict>
    <dict>
      <key>Hour</key>   <integer>17</integer>
      <key>Minute</key> <integer>0</integer>
    </dict>
  </array>

  <key>StandardOutPath</key>
  <string>$LOG_DIR/stock-dashboard.log</string>
  <key>StandardErrorPath</key>
  <string>$LOG_DIR/stock-dashboard-error.log</string>

  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
EOF

# 載入排程
launchctl unload "$PLIST_PATH" 2>/dev/null
launchctl load "$PLIST_PATH"

echo "✅ 排程已安裝！"
echo "   - 每天 14:30 台北（台股收盤後 1 小時）"
echo "   - 每天 17:00 台北（備援）"
echo "   - 開機/喚醒時補跑一次"
echo ""
echo "常用指令："
echo "  立即執行：  python3 \"$SCRIPT_PATH\""
echo "  查看日誌：  tail -f ~/Library/Logs/stock-dashboard.log"
echo "  查看更新：  tail -f \"$(dirname "$SCRIPT_PATH")/logs/update_\$(date +%Y%m%d).log\""
echo "  停用排程：  launchctl unload \"$PLIST_PATH\""
echo "  啟用排程：  launchctl load \"$PLIST_PATH\""
