#!/usr/bin/env node

// This script registers the missing OpenAI Assistant webhook in n8n
// It addresses the 404 error: "The requested webhook POST openai-assistant is not registered"

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment configuration
const loadEnv = () => {
  try {
    const envFile = path.join(rootDir, '.env');
    if (fs.existsSync(envFile)) {
      const envContent = fs.readFileSync(envFile, 'utf8');
      envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          process.env[match[1]] = match[2].replace(/^['"](.*)['"]$/, '$1');
        }
      });
    }
  } catch (error) {
    console.error('Error loading environment variables:', error.message);
  }
};

// Execute the script
async function main() {
  try {
    loadEnv();
    
    // Get n8n API information
    const n8nUrl = process.env.N8N_BASE_URL || 'http://localhost:5678';
    const n8nApiKey = process.env.N8N_API_KEY;
    
    if (!n8nApiKey) {
      console.error('ERROR: N8N_API_KEY is not set in environment variables');
      console.error('Please set this value in your .env file or environment');
      process.exit(1);
    }
    
    console.log('Checking for existing webhooks...');
    
    // Get all existing webhooks
    const webhooksResponse = await fetch(`${n8nUrl}/api/v1/webhooks`, {
      method: 'GET',
      headers: {
        'X-N8N-API-KEY': n8nApiKey,
        'Content-Type': 'application/json'
      }
    });
    
    if (!webhooksResponse.ok) {
      throw new Error(`Failed to fetch webhooks: ${webhooksResponse.statusText}`);
    }
    
    const webhooks = await webhooksResponse.json();
    
    // Check if the OpenAI Assistant webhook already exists
    const openaiWebhook = webhooks.find(webhook => 
      webhook.path === 'openai-assistant' && webhook.method === 'POST'
    );
    
    if (openaiWebhook) {
      console.log('OpenAI Assistant webhook already exists!');
      console.log('Webhook details:', JSON.stringify(openaiWebhook, null, 2));
      return;
    }
    
    console.log('Creating OpenAI Assistant webhook...');
    
    // Find the workflow ID for the OpenAI Assistant
    const workflowsResponse = await fetch(`${n8nUrl}/api/v1/workflows`, {
      method: 'GET',
      headers: {
        'X-N8N-API-KEY': n8nApiKey,
        'Content-Type': 'application/json'
      }
    });
    
    if (!workflowsResponse.ok) {
      throw new Error(`Failed to fetch workflows: ${workflowsResponse.statusText}`);
    }
    
    const workflows = await workflowsResponse.json();
    const openaiWorkflow = workflows.find(wf => wf.name.includes('OpenAI') || wf.name.includes('AI Knowledge Base Assistant'));
    
    if (!openaiWorkflow) {
      console.error('ERROR: Could not find an OpenAI-related workflow');
      console.error('Please ensure that a workflow containing "OpenAI" in its name exists');
      process.exit(1);
    }
    
    const workflowId = openaiWorkflow.id;
    console.log(`Found workflow "${openaiWorkflow.name}" with ID ${workflowId}`);
    
    // Create the webhook
    const createWebhookResponse = await fetch(`${n8nUrl}/api/v1/webhooks`, {
      method: 'POST',
      headers: {
        'X-N8N-API-KEY': n8nApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workflowId,
        webhookPath: 'openai-assistant',
        method: 'POST',
        pathSegments: [],
        isFullPath: false,
        responseMode: 'lastNode',
        responseCode: 200
      })
    });
    
    if (!createWebhookResponse.ok) {
      const errorText = await createWebhookResponse.text();
      throw new Error(`Failed to create webhook: ${createWebhookResponse.statusText} - ${errorText}`);
    }
    
    const newWebhook = await createWebhookResponse.json();
    console.log('Successfully created OpenAI Assistant webhook!');
    console.log('Webhook details:', JSON.stringify(newWebhook, null, 2));
    
    // Provide the full webhook URL for reference
    console.log('\nFull webhook URL:');
    console.log(`${n8nUrl}/webhook/openai-assistant`);
    
    console.log('\nTo test the webhook, run:');
    console.log(`curl -X POST "${n8nUrl}/webhook/openai-assistant" -H "Content-Type: application/json" -d '{"query": "Tell me about carbon sequestration"}'`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 