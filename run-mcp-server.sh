#!/bin/bash

# Set environment variables for n8n-mcp-server
export N8N_API_URL="http://127.0.0.1:5678"
export N8N_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYmMyY2ZmNi1lM2ZkLTQzOGQtYTc1Mi04NGI4YmQ2NjgwNDAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzQ1NTE0NjQ0fQ.GSG13EfgKfLwC9PuXJIZ8JpI6PFmJg7FVcV7Vt3rB3E"
export N8N_API_KEY_HEADER="X-N8N-API-KEY"

# Check if API key exists
if [ -z "$N8N_API_KEY" ]; then
  echo "No API key found. Please create one in n8n settings and set it here."
  echo "For now, we'll continue without an API key."
else
  echo "Using API key"
fi

# Start n8n-mcp-server
echo "Starting n8n-mcp-server with:"
echo "N8N_API_URL=$N8N_API_URL"
echo "N8N_API_KEY_HEADER=$N8N_API_KEY_HEADER"
echo "N8N_API_KEY=****" # Don't print the actual key for security reasons
n8n-mcp-server --verbose
