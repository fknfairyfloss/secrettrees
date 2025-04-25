# Updating n8n Workflow Names

To better reflect their functionality, please rename the n8n workflows using these steps:

## Current Workflow Names vs. Recommended Names

| Current Name | Recommended Name | Function |
|--------------|-----------------|-----------|
| My workflow 3 | Secret Trees Echo Assistant | Simple Q&A interface for project information |
| My workflow 2 | Carbon Data Tracker | Tracks and updates carbon metrics in documentation |
| Demo: My first AI Agent in n8n | AI Knowledge Base Assistant | More advanced Q&A with knowledge base access |
| My workflow | Obsidian Integration | Updates Obsidian vault with project data |

## How to Rename Workflows

1. Open n8n at http://localhost:5678
2. Click on the workflow you want to rename
3. Click on the name at the top of the editor (e.g., "My workflow 3")
4. Type the new name
5. Press Enter to save
6. Return to the workflow list

## Testing the Workflows

All workflows are currently **Active** (green toggle switch). To test them:

### Method 1: Use the n8n UI
1. Click on the workflow
2. Click "Test" at the bottom of the editor
3. Provide a test payload. Example for Echo Assistant:
   ```json
   {
     "query": "Tell me about eco-tourism in Secret Trees"
   }
   ```
4. Click "Run workflow"
5. View the results

### Method 2: Use curl Commands
Use these commands to test each workflow:

```bash
# Test Echo Assistant
curl -X POST "http://localhost:5678/webhook/echo" \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me about eco-tourism"}'

# Test Knowledge Base Assistant
curl -X POST "http://localhost:5678/webhook/knowledge" \
  -H "Content-Type: application/json" \
  -d '{"query": "How does the carbon tokenization system work?"}'

# Test Obsidian Integration
curl -X POST "http://localhost:5678/webhook/obsidian-update" \
  -H "Content-Type: application/json" \
  -d '{"file": "test-file.md", "operation": "create", "content": "# Test\nThis is a test file"}'
```

> **Note**: After renaming workflows, the webhook paths might change. Check the Webhook node in each workflow for the correct path.

## Documentation

See the [Secret-Trees-Workflow-Map.md](Secret-Trees-Workflow-Map.md) file for a complete overview of how these workflows integrate with your Obsidian documentation and track project work. 