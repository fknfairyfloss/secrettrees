---
security: team
tags: project-management, tasks, documentation, guide
created: 2025-04-28
---

# Secret Trees Task Tracking Guide

This guide explains how to use our new task tracking system for real-time updates to the task backlog.

## Quick Start

Our new task management system allows you to update task status from the command line, which automatically updates the `tasks-backlog.md` file and logs all changes.

### Basic Commands

```bash
# View task status overview
./scripts/task status

# Mark a task as in-progress
./scripts/task start "Task description" "Optional comment"

# Mark a task as completed
./scripts/task done "Task description" "Details about completion"

# Mark a task as blocked
./scripts/task block "Task description" "Reason for blockage"

# Reset a task to todo status
./scripts/task todo "Task description" "Reason for resetting"

# View recent task updates
./scripts/task log
```

## Task Status Flow

Tasks typically follow this progression:

1. **To Do** `[ ]` - Task is identified but not started
2. **In Progress** `[⏳]` - Work has begun on the task
3. **Completed** `[✅]` - Task has been successfully completed
4. **Blocked** `[❌]` - Task is blocked by a dependency or issue

## Detailed Usage

### Updating Task Status

When updating a task's status, you should provide:
1. The exact task description as it appears in the tasks-backlog.md file
2. A comment explaining the change or progress

Example:
```bash
./scripts/task start "Implement workflow automation" "Starting with the webhook configuration"
```

This will:
1. Find the task in tasks-backlog.md
2. Update its status to "in-progress"
3. Add a timestamped comment
4. Log the change in obsidian-integration-log.md

### Viewing Task Status

The `task status` command provides a quick overview of tasks by status:

```bash
./scripts/task status
```

This shows:
- Tasks currently in progress
- Blocked tasks
- Recently completed tasks
- Next to-do tasks

### Tracking Changes

All task updates are logged in `obsidian-integration-log.md` with:
- Timestamp
- Task description
- Status change
- Comment

View recent task updates with:
```bash
./scripts/task log
```

## Best Practices

1. **Update in Real-Time**: Update task status as soon as you start or complete work
2. **Be Specific**: Include meaningful comments with status changes
3. **Use Exact Descriptions**: Copy task descriptions exactly as they appear in the file
4. **Check Status Regularly**: Run `task status` at the beginning of your work session

## Integration with n8n

This task tracking system integrates with our n8n workflows:

1. Task status updates are logged in Obsidian
2. Logs can be accessed via the n8n Obsidian Integration workflow
3. Updates can trigger notifications via the workflow dashboard

### API Integration

You can also update tasks programmatically via our n8n webhook:

```bash
curl -X POST "http://localhost:5678/webhook/obsidian-integration" \
  -H "Content-Type: application/json" \
  -d '{
    "file": "tasks-backlog.md", 
    "operation": "task-update", 
    "taskDescription": "Task description", 
    "newStatus": "done", 
    "comment": "Task completed successfully"
  }'
```

## Troubleshooting

### Task Not Found
If you get a "Task not found" error:
1. Check the exact wording in tasks-backlog.md
2. Make sure to include the complete task description
3. Verify there are no extra spaces or special characters

### Changes Not Showing
If your changes don't appear:
1. Check obsidian-integration-log.md for errors
2. Verify file permissions on tasks-backlog.md
3. Check that the n8n server is running

## Future Enhancements

We plan to enhance this system with:
1. Email notifications for task updates
2. Integration with the Telegram bot
3. Automated weekly status reports
4. Task assignment and due date tracking

---

> [!note]
> This guide will be updated as the task tracking system evolves. For technical details on the implementation, see the scripts in the `/scripts` directory. 