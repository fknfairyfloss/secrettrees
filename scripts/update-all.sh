#!/bin/bash

# Secret Trees Update Script
# This script runs all update scripts in sequence

echo "🔄 Secret Trees Update Script"
echo "==========================="

# Ensure we're in the right directory
cd "$(dirname "$0")/.."
echo "📂 Working in: $(pwd)"

# Update GitHub information
echo "🔍 Updating GitHub information..."
./scripts/update-github-info.sh

# Update n8n workflow dashboard
echo "📊 Updating workflow dashboard..."
node scripts/update-workflow-dashboard.js

# Check for telegram bot process
echo "🤖 Checking Telegram bot status..."
if pgrep -f "simple-telegram-bot.js" > /dev/null; then
  echo "✅ Telegram bot is running"
else
  echo "❌ Telegram bot is not running"
  echo "📲 Would you like to start the Telegram bot? (y/n)"
  read -r start_bot
  if [[ "$start_bot" == "y" ]]; then
    echo "🚀 Starting Telegram bot in background..."
    cd /home/pixiesbase/Development/
    nohup node simple-telegram-bot.js > logs/telegram-bot.log 2>&1 &
    echo "✅ Telegram bot started (PID: $!)"
  fi
fi

echo ""
echo "✅ Update completed at $(date)" 