# Risk Dashboard

## Critical Risks

```dataview
TABLE severity as "Severity", probability as "Probability", severity * probability as "Score", owner as "Owner"
FROM "docs/markdown"
WHERE contains(tags, "risk") AND severity * probability >= 15
SORT severity * probability DESC
```

## High Priority Risks

```dataview
TABLE severity as "Severity", probability as "Probability", severity * probability as "Score", owner as "Owner"
FROM "docs/markdown"
WHERE contains(tags, "risk") AND severity * probability >= 8 AND severity * probability < 15
SORT severity * probability DESC
```

## All Risks

```dataview
TABLE risk_category as "Category", severity as "Severity", probability as "Probability", severity * probability as "Score", status as "Status"
FROM "docs/markdown" 
WHERE contains(tags, "risk")
SORT severity * probability DESC
``` 