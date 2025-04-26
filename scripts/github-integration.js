#!/usr/bin/env node

/**
 * GitHub Integration Script for Secret Trees Project
 * 
 * This script provides integration points between GitHub and the Secret Trees project.
 * 
 * Usage: node scripts/github-integration.js [command]
 *   status - Show current git status (default)
 *   summary - Generate detailed activity summary
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Direct console output test to verify script execution
console.log('GitHub Integration Script starting...');

// Create a debug log file
function debugLog(message) {
  fs.appendFileSync('./github-script-debug.log', `${new Date().toISOString()}: ${message}\n`);
}

// Log the script start
debugLog('Script started');

// Configuration
const CONFIG = {
  repoPath: process.cwd(),
  obsidianDir: './docs/markdown',
  summaryFile: './docs/markdown/Daily-Notes/github-activity.md'
};

// Parse command line arguments
const command = process.argv[2] || 'status';
console.log(`Command: ${command}`);
debugLog(`Command: ${command}`);

// Format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format date and time
function formatDateTime(date) {
  return `${formatDate(date)} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// Main execution
function main() {
  try {
    debugLog('Executing main function');
    
    switch (command) {
      case 'summary':
        return generateSummary();
      case 'status':
      default:
        return getStatus();
    }
  } catch (error) {
    const errorMsg = `Error: ${error.message}`;
    debugLog(errorMsg);
    console.error(errorMsg);
    process.exit(1);
  }
}

// Get Git status information
function getStatus() {
  // Get git info with error handling for each command
  let branch = 'unknown';
  let lastCommit = 'unknown';
  let untrackedCount = 0;
  let modifiedCount = 0;
  
  try {
    branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: CONFIG.repoPath }).toString().trim();
    console.log(`Branch: ${branch}`);
  } catch (error) {
    console.error('Error getting branch:', error.message);
  }
  
  try {
    lastCommit = execSync('git log -1 --pretty=format:"%h - %s (%ar)"', { cwd: CONFIG.repoPath }).toString().trim();
    console.log(`Last commit: ${lastCommit}`);
  } catch (error) {
    console.error('Error getting last commit:', error.message);
  }
  
  try {
    untrackedCount = parseInt(execSync('git ls-files --others --exclude-standard | wc -l', { cwd: CONFIG.repoPath }).toString().trim());
    console.log(`Untracked count: ${untrackedCount}`);
  } catch (error) {
    console.error('Error getting untracked count:', error.message);
  }
  
  try {
    modifiedCount = parseInt(execSync('git ls-files --modified | wc -l', { cwd: CONFIG.repoPath }).toString().trim());
    console.log(`Modified count: ${modifiedCount}`);
  } catch (error) {
    console.error('Error getting modified count:', error.message);
  }
  
  // Generate output
  const statusOutput = `
Secret Trees Project Status
==========================
Current Branch: ${branch}
Last Commit:    ${lastCommit}
Untracked:      ${untrackedCount} files
Modified:       ${modifiedCount} files

Action Items:
${untrackedCount > 0 ? '- You have untracked files to add/commit' : '- No untracked files'}
${modifiedCount > 0 ? '- You have modified files to commit' : '- No modified files'}
`;

  // Print to console
  console.log(statusOutput);
  
  // Also log to debug
  debugLog('Status generated successfully');
  
  return {
    branch,
    lastCommit,
    untrackedCount,
    modifiedCount,
    statusOutput
  };
}

// Generate detailed activity summary
function generateSummary() {
  console.log('Generating GitHub activity summary...');
  debugLog('Generating GitHub activity summary...');
  
  // Ensure the output directory exists
  const dir = path.dirname(CONFIG.summaryFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created output directory: ${dir}`);
  }
  
  // Get recent commits
  let commits = [];
  try {
    const gitLogCmd = `git log -5 --pretty=format:"%h|%an|%ad|%s" --date=short`;
    const logOutput = execSync(gitLogCmd, { cwd: CONFIG.repoPath }).toString().trim();
    
    if (logOutput) {
      commits = logOutput.split('\n').map(line => {
        const [hash, author, date, message] = line.split('|');
        return { hash, author, date, message };
      });
      console.log(`Retrieved ${commits.length} recent commits`);
    }
  } catch (error) {
    console.error('Error retrieving git log:', error.message);
  }
  
  // Get basic repository stats
  let branch = 'unknown';
  let lastCommit = 'unknown';
  let untrackedCount = 0;
  let modifiedCount = 0;
  
  try {
    branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: CONFIG.repoPath }).toString().trim();
    lastCommit = execSync('git log -1 --pretty=format:"%h - %s (%ar)"', { cwd: CONFIG.repoPath }).toString().trim();
    untrackedCount = parseInt(execSync('git ls-files --others --exclude-standard | wc -l', { cwd: CONFIG.repoPath }).toString().trim());
    modifiedCount = parseInt(execSync('git ls-files --modified | wc -l', { cwd: CONFIG.repoPath }).toString().trim());
  } catch (error) {
    console.error('Error getting repository stats:', error.message);
  }
  
  // Format today's date
  const today = new Date();
  const todayStr = formatDate(today);
  
  // Prepare the report content
  let content = `---
title: GitHub Activity Summary
date: ${todayStr}
type: activity
tags: github, activity, summary
---

# GitHub Activity Summary
**Date:** ${todayStr}

## Recent Commits

`;

  if (commits.length > 0) {
    commits.forEach(commit => {
      content += `- **${commit.date}** \`${commit.hash}\` ${commit.message} (${commit.author})\n`;
    });
  } else {
    content += '_No recent commits_\n';
  }
  
  content += `
## Current Status

- **Active Branch:** ${branch}
- **Last Commit:** ${lastCommit}
- **Untracked Files:** ${untrackedCount}
- **Modified Files:** ${modifiedCount}

## Next Steps

1. Review modified files and commit changes
2. Update documentation if necessary
3. Sync with remote repository

---

_This report was automatically generated on ${formatDateTime(today)}_
`;

  // Write the report to file
  try {
    fs.writeFileSync(CONFIG.summaryFile, content);
    console.log(`Activity summary saved to ${CONFIG.summaryFile}`);
  } catch (error) {
    console.error('Error writing summary file:', error.message);
  }
  
  // Also log to debug
  debugLog(`Summary generated successfully and saved to ${CONFIG.summaryFile}`);
  
  return {
    branch,
    lastCommit,
    untrackedCount,
    modifiedCount,
    commits: commits.length,
    summaryFile: CONFIG.summaryFile,
    summaryContent: content
  };
}

// Run the main function synchronously
debugLog('About to call main()');
console.log('Executing main function...');
const result = main();
console.log('Script completed successfully');
process.stdout.write(JSON.stringify(result, null, 2));
