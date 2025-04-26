#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
console.log("Starting simple bot analytics...");
const logPath = path.join(process.cwd(), "logs/telegram-bot.log");
console.log("Log file path:", logPath);
const reportFile = path.join(process.cwd(), "logs/bot-report.txt");
if (fs.existsSync(logPath)) {
  console.log("Log file exists");
  const content = fs.readFileSync(logPath, "utf8");
  console.log("Content length:", content.length);
  fs.writeFileSync(reportFile, "Bot report generated: " + new Date().toISOString());
  console.log("Report written to:", reportFile);
} else {
  console.log("Log file does not exist");
}
