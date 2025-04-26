#!/usr/bin/env node

/**
 * Secret Trees Dashboard Updater
 * 
 * This script updates the Obsidian workflow dashboard with current n8n workflow status
 * and system health information.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load configuration
let n8nConfig;
try {
  n8nConfig = require('../config/n8n-config.js');
  console.log('Loaded n8n configuration file');
} catch (error) {
  console.error('Error loading n8n configuration:', error.message);
  process.exit(1);
}

// Configuration
const config = {
  dashboardPath: path.join(process.cwd(), n8nConfig.paths.dashboardPath),
  n8nBaseUrl: n8nConfig.n8n.baseUrl,
  webhookBaseUrl: n8nConfig.n8n.webhookBaseUrl,
  workflowIds: n8nConfig.n8n.workflowIds
};

// Verify configuration
console.log(`Dashboard path: ${config.dashboardPath}`);
console.log(`Workflow IDs loaded: ${Object.keys(config.workflowIds).length}`);

// Helper functions
function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

function checkServiceRunning(serviceName) {
  try {
    const output = execSync(`ps aux | grep "${serviceName}" | grep -v grep`).toString();
    return output.length > 0;
  } catch (error) {
    return false;
  }
}

// Main update function
async function updateDashboard() {
  console.log('Updating Secret Trees workflow dashboard...');
  
  // Ensure the dashboard file exists
  if (!fs.existsSync(config.dashboardPath)) {
    console.error(`Dashboard file not found: ${config.dashboardPath}`);
    console.log('Creating a new dashboard file...');
    createNewDashboard();
    return;
  }
  
  // Read the current dashboard file
  let dashboardContent = fs.readFileSync(config.dashboardPath, 'utf-8');
  
  // Update the date
  const currentDate = getCurrentDate();
  dashboardContent = dashboardContent.replace(
    /Last update: \d{4}-\d{2}-\d{2}/g,
    `Last update: ${currentDate}`
  );
  
  // Update workflow status
  for (const [workflowName, workflowId] of Object.entries(config.workflowIds)) {
    const isRunning = checkServiceRunning(`n8n.*${workflowId}`);
    const status = isRunning ? '✅ Active' : '❌ Inactive';
    
    // Update status in the markdown table
    const regex = new RegExp(`\\| \\*\\*${workflowName}\\*\\* \\| .* \\| .* \\|`);
    dashboardContent = dashboardContent.replace(
      regex,
      `| **${workflowName}** | ${status} | ${currentDate} |`
    );
  }
  
  // Update system health
  const n8nRunning = checkServiceRunning('n8n');
  const telegramRunning = checkServiceRunning('telegram-webhook-server.js');
  
  // Update N8N Server status
  dashboardContent = dashboardContent.replace(
    /\*\*N8N Server\*\*: .*$/m,
    `**N8N Server**: ${n8nRunning ? 'Running' : 'Stopped'} on \`http://localhost:5678\``
  );
  
  // Update Telegram Webhook Server status
  dashboardContent = dashboardContent.replace(
    /\*\*Telegram Webhook Server\*\*: .*$/m,
    `**Telegram Webhook Server**: ${telegramRunning ? 'Running' : 'Stopped'} on \`http://localhost:3000\``
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(config.dashboardPath, dashboardContent);
  
  console.log('Dashboard updated successfully!');
  console.log(`Last update: ${currentDate}`);
}

// Create a new dashboard file if one doesn't exist
function createNewDashboard() {
  const currentDate = getCurrentDate();
  
  let dashboardContent = `---
title: n8n Workflow Dashboard
date: ${currentDate}
type: dashboard
tags: n8n, workflow, automation, dashboard
---

# n8n Workflow Dashboard

**Last update: ${currentDate}**

## Workflow Status

| Workflow | Status | Last Check |
|----------|--------|------------|
`;

  // Add each workflow
  for (const [workflowName, workflowId] of Object.entries(config.workflowIds)) {
    const isRunning = checkServiceRunning(`n8n.*${workflowId}`);
    const status = isRunning ? '✅ Active' : '❌ Inactive';
    dashboardContent += `| **${workflowName}** | ${status} | ${currentDate} |\n`;
  }

  // Add system health section
  const n8nRunning = checkServiceRunning('n8n');
  const telegramRunning = checkServiceRunning('telegram-webhook-server.js');
  
  dashboardContent += `
## System Health

**N8N Server**: ${n8nRunning ? 'Running' : 'Stopped'} on \`http://localhost:5678\`
**Telegram Webhook Server**: ${telegramRunning ? 'Running' : 'Stopped'} on \`http://localhost:3000\`

## Recent Activity

*No recent activity recorded.*

---

> [!note]
> This dashboard is automatically updated by the workflow dashboard updater script.
`;

  // Ensure directory exists
  const dir = path.dirname(config.dashboardPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write the new dashboard file
  fs.writeFileSync(config.dashboardPath, dashboardContent);
  console.log(`Created new dashboard at ${config.dashboardPath}`);
}

// Execute the update
updateDashboard().catch(error => {
  console.error('Error updating dashboard:', error);
  process.exit(1);
}); 