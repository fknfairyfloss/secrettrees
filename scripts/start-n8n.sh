#!/bin/bash

# Load environment variables
export $(cat .env | xargs)

# Load n8n configuration
export $(node -e "const config = require('./config/n8n.config.cjs'); Object.entries(config).forEach(([key, value]) => console.log(\`${key}=${value}\`))" | xargs)

# Explicitly enable task runners and execution settings
export N8N_RUNNERS_ENABLED=true
export N8N_EXECUTIONS_PROCESS=main
export N8N_EXECUTIONS_TIMEOUT=3600
export N8N_EXECUTIONS_TIMEOUT_MAX=7200
export N8N_EXECUTIONS_DATA_SAVE_ON_ERROR=all
export N8N_EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
export N8N_EXECUTIONS_DATA_SAVE_ON_PROGRESS=true
export N8N_EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=true

# Start n8n
n8n start 