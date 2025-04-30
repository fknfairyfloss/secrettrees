---
security: team
tags: dashboard, n8n, workflows, project-management
created: 2025-04-25
---

# Secret Trees N8N Workflows Dashboard

This dashboard provides a centralized view of all automated workflows, their status, and upcoming tasks for the Secret Trees project.

## 🟢 Active Workflows

| Workflow | Status | Last Run | Description | Webhook URL |
| -------- | ------ | -------- | ----------- | ----------- |
| **AI Knowledge Base Assistant** | ❌ Inactive | 2025-04-30 |
| **Obsidian Integration** | ❌ Inactive | 2025-04-30 |
| **Carbon Data Tracker** | ❌ Inactive | 2025-04-30 |
| **Secret Trees Echo Assistant** | ❌ Inactive | 2025-04-30 |
| **OpenAI Agent** | ✅ Active | 2025-05-02 | Enhanced NLP with OpenAI | `/webhook/openai-agent` |
| **Forest Analysis** | ✅ Active | 2025-04-29 | Advanced forest ecosystem analysis | `/webhook/forest-analysis` |

## ⚠️ Action Required
Some workflows are still inactive. They need to be reactivated in the n8n dashboard. Navigate to http://localhost:5678 and toggle each workflow to active.

## 📊 System Health

- **N8N Server**: Running on `http://localhost:5678`
- **Telegram Bot**: Active (using polling method via n8n)
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
- [ ] **NEXT PRIORITY:** Connect Carbon Tracker workflow to live data sources
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

### Phase 3: Expansion (Started)
- ✅ AI-enhanced response capabilities with OpenAI
- [ ] Multi-platform integration (Discord, Slack)
- ✅ Advanced data processing for carbon metrics
- [ ] Public API for carbon data access

## 📈 Usage Analytics (Manual Update)

- **Knowledge Assistant Queries**: ~0/day
- **Telegram Bot Interactions**: ~0/day
- **Carbon Data Points Collected**: ~0/day
- **Obsidian Updates Generated**: ~0/day
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
# Start N8N server
cd ~/Development/secret-trees-n8n-workflows && n8n start

# Test knowledge assistant
curl -X POST "http://localhost:5678/webhook/knowledge-assistant" -H "Content-Type: application/json" -d '{"query": "What is the Secret Trees project about?"}'

# Test OpenAI
curl -X POST "http://localhost:5678/webhook/openai-agent" -H "Content-Type: application/json" -d '{"text": "What is the environmental impact of planting trees?"}'

# Test Forest Analysis
curl -X POST "http://localhost:5678/webhook/forest-analysis" -H "Content-Type: application/json" -d '{"analysisType": "biodiversity", "location": {"region": "Pacific Northwest", "climate": "Temperate rainforest"}, "species": [{"name": "Douglas Fir", "count": 1200, "averageAge": 45}], "metrics": {"carbonSequestration": 450, "biodiversityIndex": 0.68}}'

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
> This dashboard is automatically updated weekly with current status information. Last update: 2025-04-30 