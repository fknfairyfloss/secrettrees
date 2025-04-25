#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Secret Trees Integration Setup${NC}"
echo "---------------------------------------"

# Check if config files exist
BOT_CONFIG="../bot-config.json"
if [ ! -f "$BOT_CONFIG" ]; then
  echo -e "${RED}Error: Bot configuration file not found at $BOT_CONFIG${NC}"
  exit 1
fi

# Setup Git repository
echo -e "${YELLOW}Setting up Git repository...${NC}"
git init
git add .
git commit -m "Initial commit for Secret Trees project"

echo -e "${GREEN}Would you like to add a remote repository? (y/n)${NC}"
read -r add_remote

if [[ "$add_remote" =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Enter the remote repository URL:${NC}"
  read -r repo_url
  git remote add origin "$repo_url"
  git branch -M main
  
  echo -e "${YELLOW}Do you want to push to the remote repository now? (y/n)${NC}"
  read -r push_now
  
  if [[ "$push_now" =~ ^[Yy]$ ]]; then
    git push -u origin main
    echo -e "${GREEN}Repository pushed to remote.${NC}"
  else
    echo -e "${GREEN}Skipping push to remote. You can push later with 'git push -u origin main'${NC}"
    git branch --set-upstream-to=origin/main main
  fi
else
  echo -e "${GREEN}Skipping remote repository setup.${NC}"
fi

# Ensure necessary directories exist
echo -e "${YELLOW}Creating required directories...${NC}"
mkdir -p docs/markdown
mkdir -p docs/markdown/telegram-integration-log.md
mkdir -p docs/markdown/project-status.md
mkdir -p docs/markdown/research-log.md
mkdir -p docs/markdown/email-digest.md
mkdir -p docs/markdown/marketing/drafts

# Copy Telegram bot files if they're not already in the project
echo -e "${YELLOW}Setting up Telegram bot integration...${NC}"
if [ ! -f "../telegram-bot.js" ]; then
  echo -e "${RED}Error: Telegram bot script not found at ../telegram-bot.js${NC}"
  exit 1
fi

if [ ! -f "../update-obsidian.js" ]; then
  echo -e "${RED}Error: update-obsidian.js script not found at ../update-obsidian.js${NC}"
  exit 1
fi

if [ ! -f "../ai-helpers.js" ]; then
  echo -e "${RED}Error: ai-helpers.js script not found at ../ai-helpers.js${NC}"
  exit 1
fi

# Start n8n if it's not running
echo -e "${YELLOW}Checking if n8n is running...${NC}"
if ! pgrep -f "n8n start" > /dev/null; then
  echo -e "${YELLOW}Starting n8n...${NC}"
  n8n start &
  sleep 5
else
  echo -e "${GREEN}n8n is already running.${NC}"
fi

# Test the Telegram bot
echo -e "${YELLOW}Testing Telegram bot integration...${NC}"
cd .. && node telegram-bot.js test "Setup test message" 2>&1

echo -e "${GREEN}Setup completed. You can now use the Telegram bot with your Secret Trees project.${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Configure your AI API keys in bot-config.json"
echo "2. Setup the Telegram webhook using: node telegram-bot.js setup-webhook YOUR_WEBHOOK_URL"
echo "3. Or use polling mode by configuring n8n to trigger the bot periodically"

exit 0 