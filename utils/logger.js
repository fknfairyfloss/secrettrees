/**
 * Logger Utility
 * 
 * A structured logging utility based on Pino for consistent
 * log management throughout the application.
 */
const pino = require('pino');
const path = require('path');
const fs = require('fs');
const config = require('../config/bot-config');

// Ensure logs directory exists
const logDir = path.join(__dirname, '..', config.paths.logs);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Configure log file transport
const transport = pino.transport({
  targets: [
    // Console output with pretty printing in development
    {
      target: 'pino-pretty',
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      options: {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname'
      }
    },
    // File output for persistency
    {
      target: 'pino/file',
      level: 'info',
      options: {
        destination: path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`),
        mkdir: true
      }
    }
  ]
});

// Create the logger
const logger = pino(
  {
    name: 'secret-trees-bot',
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    base: { pid: process.pid },
    timestamp: pino.stdTimeFunctions.isoTime
  },
  transport
);

module.exports = logger; 