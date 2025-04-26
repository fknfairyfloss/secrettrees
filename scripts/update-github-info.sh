#!/bin/bash

# Update GitHub Information Script
# This script pulls latest changes and updates GitHub information

echo "🔄 Secret Trees GitHub Update Script"
echo "==================================="

# Ensure we're in the right directory
cd "$(dirname "$0")/.."
echo "📂 Working in: $(pwd)"

# Pull latest changes
echo "🔄 Pulling latest changes from repository..."
git pull

# Run GitHub integration script
echo "🔍 Generating GitHub status information..."
node scripts/github-integration.js status

echo "📝 Generating GitHub summary report..."
node scripts/github-integration.js summary

# Check if the summary report exists
if [ -f "./docs/markdown/Daily-Notes/github-activity.md" ]; then
  echo "✅ GitHub summary report generated at: ./docs/markdown/Daily-Notes/github-activity.md"
else
  echo "❌ Failed to generate GitHub summary report"
fi

echo ""
echo "Process completed at $(date)" 