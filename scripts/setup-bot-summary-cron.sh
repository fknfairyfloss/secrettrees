#!/bin/bash

# Script to set up a daily cron job for the bot summary generator
# Creates a cron job that runs at 1:00 AM every day

# Get the absolute paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(dirname "$SCRIPT_DIR")"
SUMMARY_SCRIPT="$SCRIPT_DIR/generate-bot-summary.js"
LOG_FILE="$BASE_DIR/logs/bot-summary-generator.log"

# Create logs directory if it doesn't exist
mkdir -p "$BASE_DIR/logs"

# Make sure the summary script is executable
chmod +x "$SUMMARY_SCRIPT"

# Create the cron job entry
CRON_ENTRY="0 1 * * * cd $BASE_DIR && /usr/bin/node $SUMMARY_SCRIPT >> $LOG_FILE 2>&1"

# Check if the cron job already exists
if crontab -l | grep -q "$SUMMARY_SCRIPT"; then
  echo "Cron job for bot summary generator already exists"
else
  # Add the cron job
  (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -
  echo "Cron job for bot summary generator added successfully"
  echo "It will run daily at 1:00 AM and log to $LOG_FILE"
fi

# Create a n8n workflow JSON file
N8N_WORKFLOW_DIR="$BASE_DIR/n8n-workflows"
N8N_WORKFLOW_FILE="$N8N_WORKFLOW_DIR/bot-summary-workflow.json"

mkdir -p "$N8N_WORKFLOW_DIR"

cat > "$N8N_WORKFLOW_FILE" << EOL
{
  "name": "Bot Summary Generator",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "minutesInterval": 0,
              "hoursInterval": 24
            }
          ]
        }
      },
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "position": [
        250,
        300
      ]
    },
    {
      "parameters": {
        "command": "cd ${BASE_DIR} && node ${SUMMARY_SCRIPT}"
      },
      "name": "Execute Command",
      "type": "n8n-nodes-base.executeCommand",
      "position": [
        470,
        300
      ]
    },
    {
      "parameters": {
        "channel": "#project-updates",
        "text": "=Daily bot interaction summary for {{new Date().toISOString().split('T')[0]}} has been generated and saved to Obsidian vault. Check it out at: Bot-Summaries/{{new Date().toISOString().split('T')[0]}}-bot-summary.md"
      },
      "name": "Send Notification",
      "type": "n8n-nodes-base.slack",
      "position": [
        690,
        300
      ]
    }
  ],
  "connections": {
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Execute Command",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Execute Command": {
      "main": [
        [
          {
            "node": "Send Notification",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {}
}
EOL

echo "n8n workflow file created at: $N8N_WORKFLOW_FILE"
echo "To import this workflow, go to n8n dashboard and import the file"

# Create a documentation entry
DOC_FILE="$BASE_DIR/docs/markdown/Bot-Summaries/README.md"

mkdir -p "$(dirname "$DOC_FILE")"

cat > "$DOC_FILE" << EOL
# Bot Interaction Summaries

This directory contains daily summaries of Telegram bot interactions for the Secret Trees project.

## Overview

These summaries are automatically generated every day at 1:00 AM by the bot summary generator script. They contain information about:

- Total number of interactions
- Unique users who interacted with the bot
- Commands used and their frequencies
- Sample of messages received
- Active users list
- Basic insights about the day's activity

## Files

Each file follows the naming convention: \`YYYY-MM-DD-bot-summary.md\` where \`YYYY-MM-DD\` is the date for which the summary was generated.

## Integration

The summaries are generated through:

1. A cron job that runs daily
2. A Node.js script that analyzes the Telegram bot logs
3. An n8n workflow that can be triggered manually if needed

## Manual Generation

To manually generate a summary for a specific date:

\`\`\`bash
cd $(dirname "${BASE_DIR}")
node scripts/generate-bot-summary.js YYYY-MM-DD
\`\`\`

If no date is provided, the script will generate a summary for the previous day.

## Related Files

- Summary Generator Script: \`${SUMMARY_SCRIPT}\`
- Cron Setup Script: \`${SCRIPT_DIR}/setup-bot-summary-cron.sh\`
- n8n Workflow: \`${N8N_WORKFLOW_FILE}\`
EOL

echo "Documentation created at: $DOC_FILE"
echo "All set up! The bot summary generator will run daily and save summaries to the Obsidian vault." 