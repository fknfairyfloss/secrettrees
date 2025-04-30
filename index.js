#!/usr/bin/env node
/**
 * Secret Trees CLI Entry Point
 * 
 * Main entry point for the Secret Trees bot with CLI argument handling.
 * This allows different components of the system to be started
 * independently if needed.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const config = require('./config/bot-config');
const logger = require('./utils/logger');

// Ensure data directories exist
const dirs = [
  path.join(__dirname, config.paths.logs),
  path.join(__dirname, config.paths.data),
  path.join(__dirname, config.paths.pid)
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Process command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'bot';

// Write PID file for the running process
const pidFile = path.join(__dirname, config.paths.pid, `${command}.pid`);
fs.writeFileSync(pidFile, process.pid.toString());

// Handle process termination
process.on('SIGINT', () => {
  logger.info(`Shutting down ${command}...`);
  
  // Clean up PID file
  if (fs.existsSync(pidFile)) {
    fs.unlinkSync(pidFile);
  }
  
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info(`Shutting down ${command}...`);
  
  // Clean up PID file
  if (fs.existsSync(pidFile)) {
    fs.unlinkSync(pidFile);
  }
  
  process.exit(0);
});

// Display startup banner
console.log(`
🌲 Secret Trees Bot 🌲
Command: ${command}
Environment: ${process.env.NODE_ENV || 'development'}
Node.js: ${process.version}
PID: ${process.pid}
`);

// Execute the requested component
switch (command) {
  case 'bot':
    // Start the full bot (default)
    require('./bot');
    logger.info('Starting Secret Trees bot');
    break;
    
  case 'ai-service':
    // Start only the AI service
    const aiService = require('./services/ai-service');
    const port = process.env.AI_SERVICE_PORT || 5678;
    
    aiService.start(port)
      .then(() => {
        logger.info(`AI service started on port ${port}`);
      })
      .catch(error => {
        logger.error({
          event: 'ai_service_start_error',
          error: error.message,
          stack: error.stack
        });
        process.exit(1);
      });
    break;
    
  case 'help':
    // Display help information
    console.log(`
Usage: node index.js [command]

Available commands:
  bot           Start the complete bot (default)
  ai-service    Start only the AI service component
  help          Display this help message

Environment variables:
  TELEGRAM_BOT_TOKEN    Your Telegram bot token
  OPENAI_API_KEY        Your OpenAI API key
  OBSIDIAN_VAULT_PATH   Path to Obsidian vault for knowledge base
  AI_SERVICE_PORT       Port for the AI service (default: 5678)
  NODE_ENV              Environment (development/production)
  LOG_LEVEL             Logging level (default: info)
    `);
    break;
    
  default:
    console.error(`Unknown command: ${command}`);
    console.log('Use "node index.js help" to see available commands');
    process.exit(1);
} 