#!/usr/bin/env node

/**
 * Secret Trees Bot Interaction Summary Generator
 * 
 * This script analyzes Telegram bot logs to generate daily summaries
 * of user interactions and stores them in the Obsidian vault.
 * 
 * Usage: node generate-bot-summary.js [date]
 * If date is not provided, it defaults to today.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Configuration
const config = {
  // Log files
  telegramLogFile: path.resolve(__dirname, '../secret-trees-n8n-workflows/telegram-bot.log'),
  
  // Output paths
  obsidianVaultPath: path.resolve(__dirname, '../docs/markdown'),
  summaryDir: 'Bot-Summaries',
  
  // Integration script
  updateObsidianScript: path.resolve(__dirname, '../scripts/update-obsidian.js')
};

// Helper functions
function getDateString(date) {
  return date.toISOString().split('T')[0];
}

function getCurrentDate() {
  return getDateString(new Date());
}

function getPreviousDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getDateString(date);
}

// Process command line arguments
const targetDate = process.argv[2] || getPreviousDate();
console.log(`Generating summary for date: ${targetDate}`);

// Function to extract interactions from log file
async function extractInteractions(logFile, date) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(logFile)) {
      reject(new Error(`Log file not found: ${logFile}`));
      return;
    }

    const interactions = {
      commands: {},
      messages: [],
      users: new Set(),
      totalInteractions: 0
    };

    const fileStream = fs.createReadStream(logFile);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      // Only process lines from the target date
      if (!line.includes(date)) {
        return;
      }

      // Track command usage
      const commandMatch = line.match(/Command received: \/(\w+) from user (\w+)/);
      if (commandMatch) {
        const command = commandMatch[1];
        const user = commandMatch[2];
        
        interactions.commands[command] = (interactions.commands[command] || 0) + 1;
        interactions.users.add(user);
        interactions.totalInteractions++;
        return;
      }

      // Track messages
      const messageMatch = line.match(/Message received from user (\w+): "(.*?)"/);
      if (messageMatch) {
        const user = messageMatch[1];
        const message = messageMatch[2];
        
        interactions.messages.push({ user, message });
        interactions.users.add(user);
        interactions.totalInteractions++;
        return;
      }
    });

    rl.on('close', () => {
      // Convert Set to array for easier handling
      interactions.users = Array.from(interactions.users);
      resolve(interactions);
    });
  });
}

// Generate a markdown summary
function generateSummary(interactions, date) {
  const { commands, messages, users, totalInteractions } = interactions;
  
  // Format the date for display
  const displayDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let markdown = `---
date: ${date}
type: bot-summary
---

# Bot Interaction Summary - ${displayDate}

## Overview
- **Total Interactions**: ${totalInteractions}
- **Unique Users**: ${users.length}
- **Commands Used**: ${Object.keys(commands).length}
- **Messages Received**: ${messages.length}

## Command Usage
`;

  // Add command usage table
  if (Object.keys(commands).length > 0) {
    markdown += '\n| Command | Usage Count |\n|---------|-------------|\n';
    for (const [command, count] of Object.entries(commands)) {
      markdown += `| /${command} | ${count} |\n`;
    }
  } else {
    markdown += '\nNo commands were used on this date.\n';
  }

  // Add sample messages (up to 5)
  markdown += '\n## Sample Messages\n';
  if (messages.length > 0) {
    const sampleMessages = messages.slice(0, Math.min(5, messages.length));
    for (const { user, message } of sampleMessages) {
      markdown += `- **${user}**: "${message}"\n`;
    }
    
    if (messages.length > 5) {
      markdown += `\n*...and ${messages.length - 5} more messages*\n`;
    }
  } else {
    markdown += '\nNo messages were received on this date.\n';
  }

  // Add active users section
  markdown += '\n## Active Users\n';
  if (users.length > 0) {
    for (const user of users) {
      markdown += `- ${user}\n`;
    }
  } else {
    markdown += '\nNo users were active on this date.\n';
  }

  // Add insights section
  markdown += `
## Insights
- ${totalInteractions > 10 ? 'High' : 'Low'} engagement day with ${totalInteractions} total interactions
- Most used command: ${Object.entries(commands).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'}
- ${users.length > 3 ? 'Good user diversity' : 'Limited user engagement'} with ${users.length} unique users
`;

  return markdown;
}

// Save summary to Obsidian vault
function saveSummaryToObsidian(summary, date) {
  const summaryFileName = `${date}-bot-summary.md`;
  const summaryFilePath = path.join(config.summaryDir, summaryFileName);
  
  // Use the update-obsidian.js script to save the file
  try {
    console.log(`Saving summary to Obsidian: ${summaryFilePath}`);
    
    // Escape the content for passing as a command line argument
    const escapedContent = summary.replace(/"/g, '\\"');
    
    // Create or replace the file
    const command = `node ${config.updateObsidianScript} create "${summaryFilePath}" "${escapedContent}"`;
    execSync(command, { encoding: 'utf8' });
    
    console.log('Summary saved successfully!');
    return summaryFilePath;
  } catch (error) {
    console.error('Error saving summary to Obsidian:', error.message);
    throw error;
  }
}

// Main execution function
async function main() {
  try {
    console.log('Starting Bot Interaction Summary Generator...');
    
    // Extract interactions from logs
    const interactions = await extractInteractions(config.telegramLogFile, targetDate);
    console.log(`Found ${interactions.totalInteractions} interactions from ${interactions.users.length} users`);
    
    // Generate summary markdown
    const summary = generateSummary(interactions, targetDate);
    
    // Save to Obsidian
    const summaryPath = saveSummaryToObsidian(summary, targetDate);
    
    console.log(`Summary generated successfully for ${targetDate}`);
    console.log(`Saved to: ${summaryPath}`);
    
  } catch (error) {
    console.error('Error generating bot summary:', error.message);
    process.exit(1);
  }
}

// Execute the script
main(); 