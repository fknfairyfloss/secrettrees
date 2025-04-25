#!/bin/bash

echo "========== Starting n8n Task Management Integration =========="

# Step 1: Check if n8n is running, start if not
if ! pgrep -f "n8n start" > /dev/null; then
  echo "Starting n8n locally with tunnel..."
  cd "$(dirname "$0")"
  npx n8n start --tunnel &
  
  # Wait for n8n to start
  echo "Waiting for n8n to start..."
  sleep 10
else
  echo "n8n is already running"
fi

# Step 2: Check if the MCP bridge is running, start if not
if ! pgrep -f "cursor-n8n-bridge.js" > /dev/null; then
  echo "Starting cursor-n8n bridge..."
  cd "$(dirname "$0")"
  node cursor-n8n-bridge.js &
  
  # Wait for the bridge to start
  echo "Waiting for MCP bridge to start..."
  sleep 2
else
  echo "MCP bridge is already running"
fi

# Step 3: Create necessary directories
mkdir -p tasks Daily-Notes Weekly-Reports

echo "========== Integration Started =========="
echo "n8n running on port 5678"
echo "MCP bridge running on port 5679"
echo ""
echo "Remember to restart Cursor to reload MCP configuration."
echo ""
echo "You can test the integration by asking the Cursor AI:"
echo "  - Create a task called 'Test task'"
echo "  - Generate daily notes for today"
echo "  - Generate a weekly report"
echo ""
echo "Check if files are created in the respective directories:"
echo "  - tasks/"
echo "  - Daily-Notes/"
echo "  - Weekly-Reports/" 