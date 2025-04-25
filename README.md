# Secret Trees Gardens

This repository contains the development files for the Secret Trees Gardens project, an eco-tourism initiative with hempcrete construction and carbon credit tokenization based in Latvia.

## n8n Task Management Integration with Cursor

This section describes the configuration and scripts required to integrate n8n workflow automation with Cursor's AI assistant through the Model Context Protocol (MCP).

### Overview

This integration allows you to:

1. Create tasks directly from Cursor's AI assistant
2. Update existing tasks
3. Generate daily notes
4. Generate weekly reports

All these actions will trigger workflows in n8n that create or update markdown files in appropriate directories.

### Components

The integration consists of the following components:

1. **n8n Server**: Handles the workflow automation (running on port 5678)
2. **Custom MCP Bridge**: A Node.js server that implements the MCP protocol and forwards requests to n8n (running on port 5679)
3. **Cursor Configuration**: Configuration in Cursor to connect to the MCP server

### Setup

#### Prerequisites

- Node.js 18 or later
- n8n installed
- Cursor IDE

#### Steps to Install

1. **Configure n8n**:
   ```bash
   # Start n8n in the background with tunnel access
   npx n8n start --tunnel
   ```

2. **Setup MCP Bridge**:
   ```bash
   # Run the custom MCP bridge server
   node cursor-n8n-bridge.js
   ```

3. **Restart Cursor** to load the MCP configuration from `.cursor/mcp.json`.

### Usage

Once the integration is set up, you can interact with it through Cursor's AI assistant with natural language commands:

#### Creating Tasks

Ask the AI assistant to create a task:

```
Create a task called "Implement login feature" with high priority
```

This will:
1. Send a request to the MCP server
2. Forward the request to n8n
3. Create a markdown file in the `tasks` directory

#### Updating Tasks

Ask the AI assistant to update a task:

```
Update the "Implement login feature" task to "in progress" status
```

#### Generating Daily Notes

Ask the AI assistant to generate daily notes:

```
Generate daily notes for today with a summary of what I've accomplished
```

This will create a markdown file in the `Daily-Notes` directory.

#### Generating Weekly Reports

Ask the AI assistant to generate a weekly report:

```
Generate a weekly report including the features implemented this week
```

This will create a markdown file in the `Weekly-Reports` directory.

### Troubleshooting

#### Checking Component Status

You can check if all components are running properly:

```bash
# Check if n8n is running
ps aux | grep n8n | grep -v grep

# Check if the MCP bridge is running
ps aux | grep cursor-n8n-bridge | grep -v grep

# Test the MCP server directly
curl http://localhost:5679/mcp
```

#### Restarting Components

If any component is not working, you can restart it:

```bash
# Restart n8n
npx n8n start --tunnel

# Restart the MCP bridge
node cursor-n8n-bridge.js
```

### Architecture

```
┌─────────┐      ┌───────────────┐      ┌──────────┐
│ Cursor  │─────▶│ MCP Bridge    │─────▶│ n8n      │
│         │◀─────│ (Port 5679)   │◀─────│ (Port 5678) │
└─────────┘      └───────────────┘      └──────────┘
                                            │
                                            ▼
                                        ┌──────────┐
                                        │ Markdown │
                                        │ Files    │
                                        └──────────┘
```

### Files

- `cursor-n8n-bridge.js`: The custom MCP bridge server
- `.cursor/mcp.json`: Cursor configuration for MCP
- `setup-integration.sh`: Script to set up the integration
- `run-mcp-server.sh`: Script to run the n8n-mcp-server (alternative approach)
