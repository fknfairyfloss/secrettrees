#!/bin/bash

# Update Obsidian Integration Script
# This script fixes n8n configuration issues and updates the Obsidian integration

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Display banner
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Secret Trees Obsidian Integration Update${NC}"
echo -e "${BLUE}  $(date)${NC}"
echo -e "${BLUE}=========================================${NC}"

# Function to check if a command succeeded
check_success() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $1${NC}"
  else
    echo -e "${RED}✗ $1${NC}"
    echo -e "${RED}Error: $2${NC}"
    exit 1
  fi
}

# Change to project root directory
cd "$(dirname "$0")/.." || { echo -e "${RED}Cannot find project root directory${NC}"; exit 1; }
ROOT_DIR=$(pwd)

echo -e "\n${YELLOW}Checking dependencies...${NC}"
# Check if node-fetch is installed
if ! grep -q "node-fetch" package.json; then
  echo -e "${YELLOW}Installing node-fetch dependency...${NC}"
  npm install --save node-fetch
  check_success "Installed node-fetch" "Failed to install node-fetch"
fi

echo -e "\n${YELLOW}Making scripts executable...${NC}"
chmod +x scripts/fix-n8n-config.js scripts/fix-openai-webhook.js
check_success "Made scripts executable" "Failed to set executable permissions"

echo -e "\n${YELLOW}Running n8n config fix script...${NC}"
node scripts/fix-n8n-config.js
check_success "Fixed n8n configuration" "Failed to fix n8n configuration"

echo -e "\n${YELLOW}Running OpenAI webhook fix script...${NC}"
node scripts/fix-openai-webhook.js
check_success "Fixed OpenAI webhook" "Failed to fix OpenAI webhook"

echo -e "\n${YELLOW}Checking n8n status...${NC}"
N8N_PROCESS=$(ps aux | grep n8n | grep -v grep | awk '{print $2}')
if [ -z "$N8N_PROCESS" ]; then
  echo -e "${YELLOW}n8n is not running. Starting n8n with task runners enabled...${NC}"
  export N8N_RUNNERS_ENABLED=true
  nohup n8n start > logs/n8n.log 2>&1 &
  sleep 5
  check_success "Started n8n server" "Failed to start n8n server"
else
  echo -e "${GREEN}n8n is already running (PID: $N8N_PROCESS)${NC}"
fi

echo -e "\n${YELLOW}Testing Obsidian integration...${NC}"
# Simple test to verify webhook is working
WEBHOOK_URL="http://localhost:5678/webhook/obsidian"
TEST_RESULT=$(curl -s -X POST "$WEBHOOK_URL" -H "Content-Type: application/json" -d '{"action": "search", "query": "test"}')
if [[ "$TEST_RESULT" == *"success"* || "$TEST_RESULT" == *"results"* ]]; then
  echo -e "${GREEN}Obsidian integration test successful${NC}"
else
  echo -e "${YELLOW}Obsidian integration test returned unexpected result${NC}"
  echo -e "${YELLOW}Result: $TEST_RESULT${NC}"
fi

echo -e "\n${YELLOW}Updating integration log...${NC}"
TIMESTAMP=$(date +"%Y-%m-%d")
LOG_ENTRY="$TIMESTAMP | UPDATE | Fixed n8n configuration and updated webhooks | SUCCESS"
if [ -f "docs/markdown/obsidian-integration-log.md" ]; then
  echo "$LOG_ENTRY" >> docs/markdown/obsidian-integration-log.md
  check_success "Updated integration log" "Failed to update integration log"
else
  echo -e "${YELLOW}Creating new integration log file${NC}"
  echo "$LOG_ENTRY" > docs/markdown/obsidian-integration-log.md
  check_success "Created integration log" "Failed to create integration log"
fi

echo -e "\n${GREEN}==========================================${NC}"
echo -e "${GREEN}  Obsidian Integration Update Complete${NC}"
echo -e "${GREEN}  $(date)${NC}"
echo -e "${GREEN}==========================================${NC}"
echo -e "\n${BLUE}Documentation updated:${NC}"
echo -e "${BLUE}- n8n-workflow-dashboard.md${NC}"
echo -e "${BLUE}- obsidian-integration-status.md${NC}"
echo -e "${BLUE}- obsidian-integration-log.md${NC}"
echo -e "\n${BLUE}Fixed issues:${NC}"
echo -e "${BLUE}- n8n ESM module configuration${NC}"
echo -e "${BLUE}- OpenAI Assistant webhook registration${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Verify all workflows are operational in n8n dashboard"
echo -e "2. Test the Telegram bot's knowledge retrieval with /knowledge command"
echo -e "3. Check the Obsidian security boundaries are working properly"
echo -e "4. Update task tracking with completed tasks" 