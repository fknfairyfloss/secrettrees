/**
 * Secret Trees n8n Configuration
 * This file contains configuration information for n8n workflows
 */

module.exports = {
  n8n: {
    baseUrl: 'http://localhost:5678/api/v1',
    webhookBaseUrl: 'http://localhost:3000',
    workflowIds: {
      'AI Knowledge Base Assistant': 'MIN6Xnfoc3nkihM8',
      'Obsidian Integration': '79ekrxuSE78LSGKF',
      'Carbon Data Tracker': 'sI98Bmo8ccsKcJro',
      'Secret Trees Echo Assistant': 'bEzczYvRDSz9Pc9O'
    }
  },
  paths: {
    dashboardPath: './docs/markdown/n8n-workflow-dashboard.md',
    obsidianDir: './docs/markdown'
  }
}; 