#!/usr/bin/env node

/**
 * Script to update task status in the tasks-backlog.md file
 * 
 * Usage:
 *   node update-task-status.js "Task description" "new-status" "Optional comment"
 * 
 * Status Options:
 *   - todo: Task is pending
 *   - in-progress: Task is being worked on
 *   - done: Task is completed
 *   - blocked: Task is blocked
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const TASKS_FILE = 'docs/markdown/tasks-backlog.md';
const BASE_PATH = path.resolve(__dirname, '..');
const TASK_FILE_PATH = path.join(BASE_PATH, TASKS_FILE);

/**
 * Update task status in the tasks-backlog.md file
 * @param {string} taskDescription - Description of the task to find
 * @param {string} newStatus - New status ('todo', 'in-progress', 'done', 'blocked')
 * @param {string} comment - Optional comment to add
 */
function updateTaskStatus(taskDescription, newStatus, comment = '') {
  try {
    // Read tasks file
    const tasksContent = fs.readFileSync(TASK_FILE_PATH, 'utf8');
    
    // Map status to symbols
    const statusMap = {
      'todo': '[ ]',
      'in-progress': '[⏳]',
      'done': '[✅]',
      'blocked': '[❌]'
    };
    
    // Validate status
    if (!statusMap[newStatus]) {
      console.error(`Invalid status: ${newStatus}. Must be one of: todo, in-progress, done, blocked`);
      process.exit(1);
    }
    
    const statusSymbol = statusMap[newStatus];
    
    // Find task by description (supporting multiple checkbox types)
    const escapedDesc = taskDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const taskRegExp = new RegExp(`- \\[([ x✅⏳❌])\\] ${escapedDesc}`, 'g');
    
    if (!taskRegExp.test(tasksContent)) {
      console.error(`Task not found: "${taskDescription}"`);
      process.exit(1);
    }
    
    // Update task status
    let updatedContent = tasksContent.replace(taskRegExp, `- ${statusSymbol} ${taskDescription}`);
    
    // Add timestamp and comment if provided
    const timestamp = new Date().toISOString().split('T')[0];
    
    if (comment) {
      const commentLine = `  - *${timestamp}*: ${comment}`;
      
      // Find task line with the updated status
      const lines = updatedContent.split('\n');
      const taskLineIndex = lines.findIndex(line => 
        line.includes(`- ${statusSymbol} ${taskDescription}`)
      );
      
      if (taskLineIndex !== -1) {
        // Insert comment after the task line
        lines.splice(taskLineIndex + 1, 0, commentLine);
        updatedContent = lines.join('\n');
      } else {
        console.error('Error updating task status. Could not add comment.');
        process.exit(1);
      }
    }
    
    // Write updated content back to file
    fs.writeFileSync(TASK_FILE_PATH, updatedContent);
    
    // Log the change
    const logEntry = `${timestamp} | TASK STATUS | "${taskDescription}" | ${newStatus}${comment ? ` | ${comment}` : ''}`;
    console.log(logEntry);
    
    // Also append to the log file
    try {
      execSync(`node ${path.join(__dirname, 'update-obsidian.js')} append obsidian-integration-log.md "${logEntry}"`);
    } catch (logError) {
      console.error(`Warning: Could not log to obsidian-integration-log.md: ${logError.message}`);
    }
    
    console.log(`✅ Updated task status: "${taskDescription}" → ${newStatus}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to update task status: ${error.message}`);
    return false;
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node update-task-status.js "Task description" "new-status" "Optional comment"');
    process.exit(1);
  }
  
  const taskDescription = args[0];
  const newStatus = args[1].toLowerCase();
  const comment = args[2] || '';
  
  updateTaskStatus(taskDescription, newStatus, comment);
}

// Run the main function
main(); 