import axios from 'axios';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/monitor.log' }),
    new winston.transports.Console()
  ]
});

const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://0.0.0.0:5678';
const N8N_API_KEY = process.env.N8N_API_KEY;
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkN8nHealth(retryCount = 0) {
  try {
    const response = await axios.get(`${N8N_BASE_URL}/healthz`);
    return response.status === 200;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      logger.warn(`N8n health check failed, retrying (${retryCount + 1}/${MAX_RETRIES})`, { error: error.message });
      await sleep(RETRY_DELAY);
      return checkN8nHealth(retryCount + 1);
    }
    logger.error('N8n health check failed after retries', { error: error.message });
    return false;
  }
}

async function checkWorkflowStatus(retryCount = 0) {
  try {
    const response = await axios.get(`${N8N_BASE_URL}/api/v1/workflows`, {
      headers: {
        'X-N8N-API-KEY': N8N_API_KEY
      }
    });
    
    const activeWorkflows = response.data.data.filter(wf => wf.active);
    logger.info('Active workflows', { 
      count: activeWorkflows.length,
      workflows: activeWorkflows.map(wf => ({ name: wf.name, id: wf.id }))
    });
    
    return activeWorkflows;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      logger.warn(`Failed to check workflow status, retrying (${retryCount + 1}/${MAX_RETRIES})`, { error: error.message });
      await sleep(RETRY_DELAY);
      return checkWorkflowStatus(retryCount + 1);
    }
    logger.error('Failed to check workflow status after retries', { error: error.message });
    return [];
  }
}

async function checkTaskRunners() {
  try {
    const response = await axios.get(`${N8N_BASE_URL}/api/v1/executions/settings`, {
      headers: {
        'X-N8N-API-KEY': N8N_API_KEY
      }
    });
    
    const runnersEnabled = response.data.data.process === 'main';
    if (!runnersEnabled) {
      logger.warn('Task runners are not enabled');
      return false;
    }
    logger.info('Task runners are enabled');
    return true;
  } catch (error) {
    logger.error('Failed to check task runners status', { error: error.message });
    return false;
  }
}

async function monitor() {
  logger.info('Starting monitoring service');
  
  const health = await checkN8nHealth();
  if (!health) {
    logger.error('N8n is not healthy');
    process.exit(1);
  }
  
  const runnersStatus = await checkTaskRunners();
  if (!runnersStatus) {
    logger.error('Task runners are not properly configured');
    process.exit(1);
  }
  
  const workflows = await checkWorkflowStatus();
  if (workflows.length === 0) {
    logger.error('No active workflows found');
    process.exit(1);
  }
  
  logger.info('Monitoring checks passed successfully');
  process.exit(0);
}

monitor().catch(error => {
  logger.error('Monitoring service failed', { error: error.message });
  process.exit(1);
}); 