# Secret Trees Task Tracking System

## Overview

This document provides a comprehensive guide to the Secret Trees task tracking system, which integrates n8n workflows with Obsidian for seamless project management.

## System Components

1. **Obsidian Knowledge Base**
   - Central repository for project documentation
   - Task templates and daily note templates
   - Project history and decision logs

2. **n8n Workflow Integration**
   - Automated task creation and management
   - Daily notes generation for team members
   - Weekly report compilation

3. **API Interface**
   - HTTP endpoints for programmatic access
   - Integration with command-line tools and scripts
   - Webhook capabilities for external services

## Getting Started

### For Team Members

1. **Set up Obsidian**
   - Install [Obsidian](https://obsidian.md/) on your system
   - Open the Secret Trees vault from `/home/pixiesbase/Development/Secret_Trees`
   - Familiarize yourself with the vault structure

2. **Daily Workflow**
   - Start each day by checking your daily note in `Daily-Notes/YYYY-MM-DD/Your-Name.md`
   - Update your tasks and progress
   - Document any blockers with the `#blocker` tag

3. **Task Management**
   - Create tasks using the task template
   - Update task status through the API or manual edits
   - Link related tasks and resources

### For Team Leads

1. **Weekly Process**
   - Run the weekly report generation endpoint
   - Review all team member daily notes from the past week
   - Lead the weekly sync meeting with the generated report

2. **Project Tracking**
   - Monitor overall progress using the status dashboards
   - Assign and prioritize tasks for team members
   - Address blockers and risks promptly

## Task Lifecycle

1. **Creation**
   - Tasks are created either manually in Obsidian or via the n8n API
   - Each task is assigned an ID, owner, and status
   - Tasks are categorized by area and priority

2. **Tracking**
   - Task status is updated regularly (To Do → In Progress → Done)
   - Progress updates are logged in the task file
   - Related tasks and dependencies are managed

3. **Completion**
   - Completed tasks are marked as "Done"
   - Acceptance criteria are verified
   - Task completion is reflected in reports

## Daily Updates Workflow

1. **Morning**
   - Check your daily note for the day
   - Review your assigned tasks and priorities
   - Plan your day's activities

2. **During the Day**
   - Update task statuses as you make progress
   - Document any blockers immediately
   - Collaborate with team members on shared tasks

3. **End of Day**
   - Complete your daily note with progress made
   - Plan for the next day
   - Ensure all task updates are committed

## Weekly Team Sync

1. **Preparation**
   - Generate the weekly report using the API
   - Team members review their contributions
   - Project lead prepares discussion topics

2. **During the Meeting**
   - Walk through the report sections
   - Discuss blockers and risks
   - Make decisions and assign action items

3. **Follow-up**
   - Document decisions and action items
   - Update task priorities based on discussions
   - Prepare for the next sprint

## Best Practices

1. **Knowledge Management**
   - Use consistent tagging (`#task`, `#blocker`, `#decision`)
   - Link related documents and tasks
   - Maintain the file organization structure

2. **Task Writing**
   - Write clear, specific task descriptions
   - Define measurable acceptance criteria
   - Include necessary context and resources

3. **Communication**
   - Use daily notes for asynchronous updates
   - Flag blockers early and clearly
   - Document decisions and rationales

## Integrating with Development Workflow

1. **Code Changes**
   - Link tasks to relevant code repositories
   - Reference task IDs in commit messages
   - Update task status when code is committed

2. **Documentation Updates**
   - Keep documentation in sync with development
   - Document architectural decisions
   - Maintain technical specifications

3. **Testing and Verification**
   - Link test results to tasks
   - Document testing procedures
   - Verify acceptance criteria

## Folder Structure Reference

```
Secret_Trees/
├── docs/
│   ├── Tasks/                 # Task files organized by area
│   │   ├── Construction/
│   │   ├── Digital/
│   │   └── General/
│   │   └── TaskTrackingSystem.md  # This document
│   ├── Team/                  # Team coordination documents
│   │   ├── WeeklySync/        # Weekly reports
│   │   ├── ApiEndpoints.md    # API documentation
│   │   └── TeamStructure.md   # Team roles and responsibilities
│   └── Templates/             # Reusable templates
│       ├── DailyUpdate.md
│       ├── TaskTemplate.md
│       └── WeeklyTeamSync.md
├── Daily-Notes/              # Daily updates by team members
│   ├── 2025-04-24/
│   │   ├── Project-Lead.md
│   │   ├── Technical-Architect.md
│   │   └── ...
│   └── ...
└── n8n-workflows/           # Automation workflows
    └── cursor-integration/
        └── workflows/
            └── task-tracking-workflow.json
```

## Troubleshooting

1. **Task Not Appearing**
   - Check if the task was created with the correct format
   - Verify the file location in the appropriate area folder
   - Ensure proper tagging (#task and area tags)

2. **Daily Notes Issues**
   - Check if the n8n server is running
   - Verify the directory structure exists
   - Try manually generating notes using the template

3. **API Connectivity**
   - Confirm the n8n server is running on port 5678
   - Check network connectivity
   - Validate JSON format in requests

## Additional Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Obsidian Help](https://help.obsidian.md/)
- Secret Trees project documentation in `/docs` 