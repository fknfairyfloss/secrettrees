#!/usr/bin/env node

/**
 * Script to update Obsidian vault files safely
 * 
 * Usage:
 *   node update-obsidian.js <operation> <file> <content>
 * 
 * Operations:
 *   - create: Create a new file
 *   - append: Append to existing file
 *   - replace: Replace file content
 *   - read: Read file content (no content parameter needed)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Base path for Obsidian vault markdown files
  basePath: path.resolve(__dirname, '../docs/markdown'),
  
  // Log file for tracking operations
  logFile: 'obsidian-integration-log.md'
};

/**
 * Validate the file path to prevent path traversal attacks
 * @param {string} filePath - The file path to validate
 * @returns {boolean} - True if the path is valid
 */
function validatePath(filePath) {
  const normalizedPath = path.normalize(filePath);
  const fullPath = path.resolve(config.basePath, normalizedPath);
  
  // Check if the path is within the base path
  return fullPath.startsWith(config.basePath);
}

/**
 * Log an operation to the log file
 * @param {string} operation - The operation performed
 * @param {string} file - The file that was operated on
 * @param {boolean} success - Whether the operation was successful
 */
function logOperation(operation, file, success) {
  const timestamp = new Date().toISOString();
  const status = success ? 'SUCCESS' : 'FAILED';
  const logEntry = `${timestamp} | ${operation} | ${file} | ${status}\n`;
  
  try {
    const logPath = path.join(config.basePath, config.logFile);
    fs.appendFileSync(logPath, logEntry);
  } catch (error) {
    console.error(`Failed to write to log file: ${error.message}`);
  }
}

/**
 * Create a new file
 * @param {string} file - The file to create
 * @param {string} content - The content to write
 * @returns {boolean} - Success status
 */
function createFile(file, content) {
  try {
    const filePath = path.join(config.basePath, file);
    
    // Check if path is valid
    if (!validatePath(file)) {
      console.error('Invalid file path (potential path traversal attempt)');
      return false;
    }
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.error(`File ${file} already exists`);
      return false;
    }
    
    // Create directory if it doesn't exist
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Write file
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${file}`);
    logOperation('create', file, true);
    return true;
  } catch (error) {
    console.error(`Failed to create file: ${error.message}`);
    logOperation('create', file, false);
    return false;
  }
}

/**
 * Append to an existing file
 * @param {string} file - The file to append to
 * @param {string} content - The content to append
 * @returns {boolean} - Success status
 */
function appendFile(file, content) {
  try {
    const filePath = path.join(config.basePath, file);
    
    // Check if path is valid
    if (!validatePath(file)) {
      console.error('Invalid file path (potential path traversal attempt)');
      return false;
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File ${file} does not exist`);
      return false;
    }
    
    // Append to file
    const existingContent = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(filePath, existingContent + '\n\n' + content);
    console.log(`Appended to file: ${file}`);
    logOperation('append', file, true);
    return true;
  } catch (error) {
    console.error(`Failed to append to file: ${error.message}`);
    logOperation('append', file, false);
    return false;
  }
}

/**
 * Replace file content
 * @param {string} file - The file to replace
 * @param {string} content - The new content
 * @returns {boolean} - Success status
 */
function replaceFile(file, content) {
  try {
    const filePath = path.join(config.basePath, file);
    
    // Check if path is valid
    if (!validatePath(file)) {
      console.error('Invalid file path (potential path traversal attempt)');
      return false;
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File ${file} does not exist`);
      return false;
    }
    
    // Replace file content
    fs.writeFileSync(filePath, content);
    console.log(`Replaced file: ${file}`);
    logOperation('replace', file, true);
    return true;
  } catch (error) {
    console.error(`Failed to replace file: ${error.message}`);
    logOperation('replace', file, false);
    return false;
  }
}

/**
 * Read file content
 * @param {string} file - The file to read
 * @returns {string|null} - File content or null on failure
 */
function readFile(file) {
  try {
    const filePath = path.join(config.basePath, file);
    
    // Check if path is valid
    if (!validatePath(file)) {
      console.error('Invalid file path (potential path traversal attempt)');
      return null;
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File ${file} does not exist`);
      return null;
    }
    
    // Read file
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`Read file: ${file}`);
    logOperation('read', file, true);
    return content;
  } catch (error) {
    console.error(`Failed to read file: ${error.message}`);
    logOperation('read', file, false);
    return null;
  }
}

/**
 * Main function to process command line arguments
 */
function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  // Check if enough arguments are provided
  if (args.length < 2) {
    console.error('Usage: node update-obsidian.js <operation> <file> [content]');
    process.exit(1);
  }
  
  const operation = args[0];
  const file = args[1];
  const content = args.length > 2 ? args[2] : '';
  
  // Perform the requested operation
  switch (operation) {
    case 'create':
      if (!createFile(file, content)) {
        process.exit(1);
      }
      break;
    case 'append':
      if (!appendFile(file, content)) {
        process.exit(1);
      }
      break;
    case 'replace':
      if (!replaceFile(file, content)) {
        process.exit(1);
      }
      break;
    case 'read':
      const fileContent = readFile(file);
      if (fileContent === null) {
        process.exit(1);
      }
      console.log(fileContent);
      break;
    default:
      console.error(`Unknown operation: ${operation}`);
      console.error('Valid operations: create, append, replace, read');
      process.exit(1);
  }
}

// Run the main function
main(); 