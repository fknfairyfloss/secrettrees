---
security: team
tags: dashboard, n8n, workflows, project-management
created: 2025-04-25
last_updated: 2025-05-02
---

# Secret Trees N8N Workflows Dashboard

This dashboard provides a centralized view of all automated workflows, their status, and upcoming tasks for the Secret Trees project.

## 🟢 Active Workflows

| Workflow | Status | Last Run | Description | Webhook URL |
| -------- | ------ | -------- | ----------- | ----------- |
| **AI Knowledge Base Assistant** | ❌ Inactive | 2025-05-01 |
| **Obsidian Integration** | ❌ Inactive | 2025-05-01 |
| **Carbon Data Tracker** | ❌ Inactive | 2025-05-01 |
| **Secret Trees Echo Assistant** | ❌ Inactive | 2025-05-01 |
| **BotFather** | ✅ Active | 2025-05-02 | Telegram bot management | `/webhook/botfather` |

## 📊 System Health

- **N8N Server**: Running on `http://localhost:5678`
- **Task Broker**: Active on `127.0.0.1:5679`
- **Telegram Bot**: Active (using webhook method)
- **Security System**: Implemented with three-tier access (public, team, admin)
- **Obsidian Vault**: Organized with security frontmatter tags
- **OpenAI**: Integrated for enhanced natural language capabilities

## 📝 Current Tasks

- [x] Set up basic N8N workflows
- [x] Configure Telegram bot with commands
- [x] Implement security system for sensitive information
- [x] Fix Telegram bot integration issue (polling vs webhook conflict)
- [x] Implement OpenAI integration for advanced NLP capabilities
- [x] Create specialized forest analysis workflow
- [x] Enable task runners for improved performance
- [ ] **NEXT PRIORITY:** Fix OpenAI Assistant webhook registration
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

### Phase 3: Expansion (In Progress)
- ✅ AI-enhanced response capabilities with OpenAI
- [ ] Multi-platform integration (Discord, Slack)
- ✅ Advanced data processing for carbon metrics
- [ ] Public API for carbon data access

## 📈 Usage Analytics (Manual Update)

- **Knowledge Assistant Queries**: ~50/day
- **Telegram Bot Interactions**: ~100/day
- **Carbon Data Points Collected**: ~200/day
- **Obsidian Updates Generated**: ~30/day
- **OpenAI Queries**: ~20/day

## 🔄 Workflow Maintenance Guide

### Daily Checks
- Verify N8N server is running: `ps aux | grep n8n`
- Check Telegram bot status: `curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getMe"`
- Review error logs: `tail n8n-error.log`

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
# Start N8N server with task runners
cd ~/Development/Secret_Trees && N8N_RUNNERS_ENABLED=true n8n start

# Test knowledge assistant
curl -X POST "http://localhost:5678/webhook/knowledge-assistant" -H "Content-Type: application/json" -d '{"query": "What is the Secret Trees project about?"}'

# Test Obsidian integration
curl -X POST "http://localhost:5678/webhook/obsidian" -H "Content-Type: application/json" -d '{"action": "search", "query": "carbon credits"}'

# Test Carbon Tracker
curl -X POST "http://localhost:5678/webhook/carbon-tracker" -H "Content-Type: application/json" -d '{"metric": "tree_planted", "value": 100}'

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
> This dashboard is automatically updated weekly with current status information. Last update: 2025-05-01 