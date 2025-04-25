# Secret Trees n8n API Endpoints

This document provides information on how to interact with the Secret Trees task tracking system using the n8n workflow endpoints.

## Prerequisites

- Ensure the n8n server is running at: `http://localhost:5678`
- Endpoints are available at `/cursor-integration/workflows`

## Task Management Endpoints

### 1. Create New Task

**Endpoint**: `/task-create`  
**Method**: `POST`

**Request Body**:
```json
{
  "title": "Task title",
  "description": "Detailed description of the task",
  "id": "ST-123456",  // Optional, will be auto-generated if not provided
  "dueDate": "2025-05-01",
  "owner": "Technical Architect",
  "status": "To Do",  // "To Do", "In Progress", "Done"
  "priority": "High",  // "Low", "Medium", "High"
  "area": "Construction",  // Area of work (affects file location)
  "criteria": "Criterion 1\nCriterion 2\nCriterion 3",  // Each on a new line
  "relatedTasks": "ST-123, ST-456",  // Comma-separated task IDs
  "resources": "URL1, Document2"  // Comma-separated resources
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5678/task-create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design hempcrete wall structure",
    "description": "Create detailed design specifications for the hempcrete wall structure for the demo cottage",
    "owner": "Construction Lead",
    "dueDate": "2025-05-15",
    "priority": "High",
    "area": "Construction",
    "criteria": "CAD drawings completed\nMaterial specifications documented\nStructural calculations validated"
  }'
```

### 2. Update Task Status

**Endpoint**: `/task-update`  
**Method**: `POST`

**Request Body**:
```json
{
  "id": "ST-123456",  // Required, must match existing task
  "status": "In Progress",  // "To Do", "In Progress", "Done"
  "update": "Added initial design sketches"  // Description of the update
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5678/task-update \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ST-123456",
    "status": "In Progress",
    "update": "Initial wall section designs completed, working on material specifications"
  }'
```

## Team Coordination Endpoints

### 3. Generate Daily Notes

**Endpoint**: `/generate-daily-notes`  
**Method**: `POST`

**Request Body**:
```json
{
  "date": "2025-04-25"  // Optional, defaults to today
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5678/generate-daily-notes \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 4. Generate Weekly Report

**Endpoint**: `/generate-weekly-report`  
**Method**: `POST`

**Request Body**:
```json
{
  "date": "2025-04-25"  // Optional, defaults to today
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:5678/generate-weekly-report \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Workflow Integration

### Using from Obsidian

You can create a templater script in Obsidian to interact with these endpoints. For example:

```javascript
// Example Obsidian Templater script to create a task
const taskData = {
  title: tp.file.title,
  description: "",
  owner: "Project Lead",
  status: "To Do",
  priority: "Medium",
  area: "General"
};

// Send to n8n endpoint
const response = await fetch("http://localhost:5678/task-create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(taskData)
});

const result = await response.json();
console.log("Task created:", result);
```

### Using from Command Line

Create shell scripts to interact with the API more easily:

```bash
# Create a file called create-task.sh
#!/bin/bash
title="$1"
description="$2"
owner="$3"
area="${4:-General}"

curl -X POST http://localhost:5678/task-create \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"$title\",
    \"description\": \"$description\",
    \"owner\": \"$owner\",
    \"area\": \"$area\"
  }"
```

## File Locations

The workflow will create and organize files in the following structure:

```
Secret_Trees/
├── docs/
│   ├── Tasks/
│   │   ├── Construction/  # Tasks by area
│   │   ├── Digital/
│   │   └── General/
│   └── Team/
│       └── WeeklySync/
└── Daily-Notes/
    ├── 2025-04-24/  # Notes by date
    │   ├── Project-Lead.md
    │   ├── Technical-Architect.md
    │   └── ...
    └── 2025-04-25/
```

## Troubleshooting

- If you encounter issues with the API endpoints, check if the n8n server is running
- Verify the correct JSON format in your requests
- Check the n8n workflow execution logs for detailed error information 