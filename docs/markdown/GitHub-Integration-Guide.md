---
title: GitHub Integration Guide
date: 2025-04-26
type: documentation
tags: github, integration, automation, tutorial
---

# GitHub Integration Guide

This guide explains how to use the GitHub integration tools in the Secret Trees project.

## Overview

The GitHub integration tools automate the tracking and documentation of GitHub activity in our project. They provide:

- Real-time status updates on repository changes
- Detailed activity summaries with recent commits
- Automated documentation updates in Obsidian
- Integration with n8n workflows for notifications

## Quick Start

### Manual Updates

To manually update GitHub information:

```bash
# Run the update script
./scripts/update-github-info.sh

# Or run individual commands
node scripts/github-integration.js status    # Get current status
node scripts/github-integration.js summary   # Generate detailed summary
```

### Automated Updates

The GitHub information is automatically updated:

1. Every hour via n8n workflow
2. Every 6 hours, a detailed report is generated and sent via Telegram

## Available Tools

### 1. GitHub Integration Script

The core script (`scripts/github-integration.js`) provides two main commands:

- **status**: Shows current repository status (branches, commits, files)
- **summary**: Generates a detailed report of recent activity

### 2. Update Script

The update script (`scripts/update-github-info.sh`) combines multiple operations:

1. Pulls latest changes from the repository
2. Generates status information
3. Creates a detailed summary report
4. Updates Obsidian documentation

### 3. n8n Workflow

The secure n8n workflow (`GitHub Integration Workflow (Secure)`) automates:

- Periodic repository checks
- Documentation updates
- Telegram notifications

## Viewing Results

Generated reports and information can be found in:

- **GitHub Status**: Displayed in terminal when running the status command
- **Activity Summary**: `./docs/markdown/Daily-Notes/github-activity.md`
- **Obsidian Vault**: Updates appear in the Obsidian vault under Daily Notes

## Security Considerations

- Credentials are stored securely in configuration files excluded from git
- Telegram bot tokens are loaded at runtime from secure storage
- All scripts use secure practices to prevent information exposure

## Troubleshooting

If you encounter issues:

1. Check `github-script-debug.log` for detailed logs
2. Ensure configuration files exist at `config/bot-config.js`
3. Verify n8n is running with `ps aux | grep n8n`
4. Check webhook URLs in n8n workflows match current setup

## Customization

To customize the integration:

1. Edit `scripts/github-integration.js` to change output formats
2. Modify `CONFIG` variables in the script to change file locations
3. Update the n8n workflow for different notification schedules
4. Adjust the Telegram message format in the n8n workflow

---

For more information, contact the DevOps team or refer to the project documentation. 