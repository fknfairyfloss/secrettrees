---
security: team
tags: dashboard, n8n, workflows, project-management
created: 2025-04-25
---

# N8N Workflow Dashboard

This dashboard provides an overview of our n8n workflow status and integration services.

## Current Status

| Service | Status | Last Check | Notes |
|---------|--------|------------|-------|
| Telegram Bot | ✅ Active | 2025-04-25 | Fixed missing update-obsidian.js script |
| n8n Server | ✅ Active | 2025-04-25 | Running on port 5678 |
| Git Integration | ⚠️ Warning | 2025-04-25 | Repository needs upstream tracking branch |
| Email Integration | 🔄 Pending | - | Needs configuration |
| AI Services | ⚠️ Warning | 2025-04-25 | API keys need to be configured |

## Telegram Bot Commands

The following commands are available in our Telegram bot:

- `/help` - Provides information about available commands
- `/about` - Returns information about the Secret Trees project
- `/carbon` - Provides details about carbon credits (admin only)
- `/updates` - Shows recent project updates (team only)
- `/roadmap` - Shares project roadmap (team only)
- `/contact` - Returns contact information
- `/ip` - Intellectual property documentation (admin only)
- `/financials` - Financial projections (admin only)
- `/partners` - Collaboration details (admin only)

## Recent Logs

```
2025-04-25: Fixed issue with missing update-obsidian.js script
2025-04-25: Configured Telegram bot integration
2025-04-25: Created setup script for easier deployment
2025-04-24: Initial n8n workflow setup
```

## n8n Workflows

### Task Management

- **Task Create**: Creates new task files in the Obsidian vault
- **Task Update**: Updates existing task statuses and details
- **Generate Daily Notes**: Creates daily notes for team members
- **Generate Weekly Report**: Compiles weekly team sync documents

### Communication

- **Telegram Community**: Handles Telegram community interactions
- **Research Assistant**: Processes research queries and stores findings

## Maintenance Tasks

- [ ] Configure Git repository with upstream tracking
- [ ] Set API keys for AI services in bot-config.json
- [ ] Create n8n workflow for email integration 
- [ ] Set up monitoring for service health checks
- [ ] Create backup and recovery procedure for n8n workflows

## 🟢 Active Workflows

| Workflow | Status | Last Run | Description | Webhook URL |
| -------- | ------ | -------- | ----------- | ----------- |
| **AI Knowledge Base Assistant** | ❌ Inactive | 2025-04-25 |
| **Obsidian Integration** | ❌ Inactive | 2025-04-25 |
| **Carbon Data Tracker** | ❌ Inactive | 2025-04-25 |
| **Secret Trees Echo Assistant** | ❌ Inactive | 2025-04-25 |

## 📊 System Health

- **N8N Server**: Running on `http://localhost:5678`
- **Telegram Webhook Server**: Stopped on `http://localhost:3000`
- **Security System**: Implemented with three-tier access (public, team, admin)
- **Obsidian Vault**: Organized with security frontmatter tags

## 📝 Current Tasks

- [x] Set up basic N8N workflows
- [x] Configure Telegram bot with commands
- [x] Implement security system for sensitive information
- [ ] Create automated daily summaries of bot interactions
- [ ] Implement analytics tracking for bot usage
- [ ] Set up automated backups of workflow configurations
- [ ] Integrate carbon data collection with visualization dashboard

## 🗓️ Development Timeline

### Phase 1: Foundation (Completed)
- Basic workflow setup
- Telegram bot integration
- Security implementation

### Phase 2: Enhancement (Current)
- **Week 1-2:** Analytics and tracking
- **Week 3-4:** Automated reporting
- **Week 5-6:** Dashboard visualizations

### Phase 3: Expansion
- AI-enhanced response capabilities
- Multi-platform integration (Discord, Slack)
- Advanced data processing for carbon metrics
- Public API for carbon data access

## 📈 Usage Analytics (Manual Update)

- **Knowledge Assistant Queries**: ~0/day
- **Telegram Bot Interactions**: ~0/day
- **Carbon Data Points Collected**: ~0/day
- **Obsidian Updates Generated**: ~0/day

## 🔄 Workflow Maintenance Guide

### Daily Checks
- Verify N8N server is running: `ps aux | grep n8n`
- Check Telegram webhook: `curl http://localhost:3000/health`
- Review error logs: `tail telegram-bot.log`

### Weekly Tasks
- Review usage analytics for unusual patterns
- Update content in knowledge base as needed
- Backup workflow configurations

### Monthly Tasks
- Assess workflow effectiveness and optimize
- Update security configurations as needed
- Review and update automation roadmap

## 🛠️ Quick Commands

```bash
# Start N8N server
cd ~/Development/secret-trees-n8n-workflows && n8n start

# Start Telegram webhook server
node telegram-webhook-server.js > telegram-bot.log 2>&1 &

# Test knowledge assistant
./test-knowledge-assistant.sh "What is the Secret Trees project about?"

# Secure Obsidian vault
./secure-vault.js

# Check system status
ps aux | grep -E 'n8n|telegram'

# Run integration tests
./test-workflow-integration.js
```

## 📚 Resources

- [N8N Documentation](https://docs.n8n.io/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Secret Trees Project Documentation](../00-Project-Overview.md)

---

> [!note]
> This dashboard is automatically updated weekly with current status information. Last update: 2025-04-25 