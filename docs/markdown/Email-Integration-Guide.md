---
security: team
tags: email, integration, automation, documentation
created: 2025-04-25
---

# Secret Trees Email Integration Guide

This guide explains how to use the email integration system to organize project communications, property management, and personal emails related to the Secret Trees project.

## Overview

The Secret Trees email integration system automatically:
1. Fetches emails from your configured email accounts
2. Classifies them by project, property, or personal categories
3. Creates digestible summaries in your Obsidian vault
4. Extracts action items for task management
5. Operates with strict privacy controls to keep your data secure

## Important Security Note

**For security and privacy, email data is ONLY available in your private Obsidian vault.**

- ✅ Emails are processed and stored exclusively in your Obsidian vault
- ✅ Personal emails remain completely private
- ✅ No email content is exposed through Telegram
- ✅ Data never leaves your local systems

## Features

- **Automated Classification**: Emails are sorted based on content keywords
- **Daily Digests**: Consolidated views of important emails
- **Action Item Extraction**: Detects to-dos and deadlines
- **Visual Mind Maps**: View email relationships in Obsidian canvas
- **Mobile Access**: Access digests via Obsidian mobile
- **Privacy-Focused**: All data stays on your systems

## Privacy & Security Controls

### Access Level Settings

The email integration system respects three levels of privacy:

1. **Private** - Highest security level
   - Personal emails remain strictly in Obsidian vault
   - No content sent to Telegram
   - Only "IMPORTANT" flag notifications via email
   - Full encryption of sensitive content

2. **Team** - Medium security level
   - Project-related emails accessible to team members
   - Access controlled via team permission settings
   - Sensitive information redacted in shared views

3. **Public** - Lowest security level
   - Only explicitly marked "public" emails shared
   - Used for community updates and newsletters
   - No personal data included
   - Plain text summaries only

### Configuring Privacy Settings

In `bot-config.json`, set privacy levels for email accounts:

```json
"email": {
  "accounts": [
    {
      "name": "Project",
      "host": "imap.gmail.com",
      "port": 993,
      "user": "your-project-email@gmail.com",
      "password": "your-app-password",
      "folders": ["INBOX", "Project"],
      "primaryCategory": "project",
      "privacyLevel": "team",
      "notificationChannels": ["obsidian", "email"]
    },
    {
      "name": "Personal",
      "host": "imap.protonmail.com",
      "port": 993,
      "user": "your-personal-email@protonmail.com",
      "password": "your-mail-password",
      "folders": ["INBOX"],
      "primaryCategory": "personal",
      "privacyLevel": "private",
      "notificationChannels": ["obsidian"]
    }
  ]
}
```

## Setup Instructions

### 1. Email Account Configuration

1. Open `bot-config.json` and locate the `email` section
2. Add your email accounts:
```json
"email": {
  "checkFrequency": "hourly",
  "accounts": [
    {
      "name": "Project",
      "host": "imap.gmail.com",
      "port": 993,
      "user": "your-project-email@gmail.com",
      "password": "your-app-password",
      "folders": ["INBOX", "Project"]
    },
    {
      "name": "Personal",
      "host": "imap.protonmail.com",
      "port": 993,
      "user": "your-personal-email@protonmail.com",
      "password": "your-mail-password",
      "folders": ["INBOX"]
    }
  ]
}
```

3. For Gmail accounts, use an app password instead of your actual password
4. Save the configuration file

### 2. Install Required Obsidian Plugins

Install these Obsidian plugins for the best experience:
- **Dataview**: For querying email digests
- **Calendar**: For viewing digests by date
- **Tasks**: For managing extracted action items
- **Templater**: For custom digest formats
- **Kanban**: For visualizing tasks from emails

### 3. Import the n8n Workflow

1. Open n8n at `http://localhost:5678`
2. Click "Workflows" in the left sidebar
3. Click "Import from File"
4. Upload `n8n-workflows/email-digest-workflow.json`
5. Click "Import"
6. Open the imported workflow and click "Activate" in the top-right

### 4. Customize Email Classification

Modify the keyword filters in the workflow to match your project needs:

```javascript
const filters = {
  projectKeywords: ['Secret Trees', 'Carbon', 'Tokenization', 'Eco-tourism', 'Hempcrete', 'Latvia'],
  propertyKeywords: ['Property', 'Garden', 'Construction', 'Land', 'Real Estate'],
  familyKeywords: ['Family', 'Personal', 'Health', 'Travel']
};
```

## Daily Usage

### Viewing Email Digests

1. Open your Obsidian vault
2. Navigate to the "Daily Notes" folder
3. Open the latest `email-digest-YYYY-MM-DD.md` file

### Working with Action Items

1. All action items are extracted as tasks with checkboxes
2. They are automatically tagged with `#email-task`
3. Use the Dataview plugin to create task views:
```dataview
TASK
FROM #email-task
WHERE !completed
GROUP BY file.link
```

### Mobile Access

1. Install Obsidian mobile app
2. Sync your vault using Obsidian Sync or manually
3. Access your email digests securely from your mobile device

### Creating Custom Views

1. Open the Email-Mind-Map.canvas file in Obsidian
2. Add new nodes or connections as needed
3. Link to specific email digests for quick access

## Troubleshooting

### Email Fetching Issues

- Check your email account credentials
- Verify that IMAP access is enabled for your email provider
- Check n8n logs for connection errors

### Classification Problems

- Adjust the keyword filters to better match your emails
- Check the n8n workflow execution history
- Verify that email content is being properly parsed

### Missing Digests

- Ensure the n8n server is running
- Check workflow execution history in n8n
- Verify that the Obsidian integration webhook is functioning

## Related Documentation

- [[n8n-workflow-dashboard|n8n Workflow Dashboard]]
- [[Canvas-Maps/Email-Mind-Map|Email Integration Mind Map]]
- [[tasks-backlog|Project Task Backlog]]
- [[00-Obsidian-Guide|Obsidian Setup Guide]] 