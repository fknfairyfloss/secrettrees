# Secret Trees Milestone Dashboard

## Upcoming Milestones

```dataview
TABLE target_date as "Target Date", priority as "Priority", status as "Status"
FROM "docs/markdown"
WHERE contains(tags, "milestone") AND status != "completed"
SORT target_date ASC
```

## Recently Completed

```dataview
TABLE date_created as "Created", target_date as "Completed"
FROM "docs/markdown"
WHERE contains(tags, "milestone") AND status = "completed"
SORT target_date DESC
LIMIT 5
```

## Milestone Categories

### Technical Development

```dataview
LIST
FROM "docs/markdown"
WHERE contains(tags, "milestone") AND contains(tags, "technical")
```

### Business Development

```dataview
LIST
FROM "docs/markdown"
WHERE contains(tags, "milestone") AND contains(tags, "business")
```

### Regulatory & Compliance

```dataview
LIST
FROM "docs/markdown"
WHERE contains(tags, "milestone") AND contains(tags, "regulatory")
```

## Related Views

- [[Risk-Dashboard|Risk Assessment Dashboard]]
- [[Canvas-Maps/Project-Timeline|Project Timeline]]
- [[00-Project-Overview|Project Overview]]

## Automated Status Update
*Generated: 4/24/2025, 10:25:57 PM*

### Project Timeline
- Current Quarter: Q2 2025
- Days until next milestone: 19
- Status: Ahead of Schedule

> This milestone data was automatically updated by the Secret Trees tracking system.