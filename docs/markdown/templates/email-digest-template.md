---
security: team
tags: [email-digest, automation]
date: {{date:YYYY-MM-DD}}
---

# Email Digest: {{date:YYYY-MM-DD}}

## Secret Trees Project Updates
{{#if projectEmails}}
{{#each projectEmails}}
### {{subject}}
**From:** {{from}}
**Date:** {{date}}
**Category:** {{category}}

{{summary}}

[View Full Email]({{emailId}})

---
{{/each}}
{{else}}
*No project updates in this period*
{{/if}}

## Property Management
{{#if propertyEmails}}
{{#each propertyEmails}}
### {{subject}}
**From:** {{from}}
**Date:** {{date}}

{{summary}}

---
{{/each}}
{{else}}
*No property management emails in this period*
{{/if}}

## Family & Personal
{{#if familyEmails}}
{{#each familyEmails}}
### {{subject}}
**From:** {{from}}
**Date:** {{date}}

{{summary}}

---
{{/each}}
{{else}}
*No family emails in this period*
{{/if}}

## Action Items
{{#if actionItems}}
{{#each actionItems}}
- [ ] {{this}}
{{/each}}
{{else}}
*No action items identified*
{{/if}}

## Insights
{{#if insights}}
{{insights}}
{{else}}
*No insights for this period*
{{/if}} 