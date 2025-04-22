# Templater Scripts for Secret Trees

## Overview

This document contains Templater scripts for automating document creation in the Secret Trees Obsidian vault. These scripts should be placed in the `.obsidian/templater/scripts` directory once the Templater plugin is installed.

## Risk Assessment Creator

```javascript
// risk-creator.js
// Creates a new risk assessment file in the Risk-Assessments folder

module.exports = async (tp) => {
  // Get risk title from user
  const title = await tp.system.prompt("Risk title");
  if (!title) return;
  
  // Get risk category
  const categories = ["regulatory", "technical", "market", "environmental", "operational"];
  const category = await tp.system.suggester(categories, categories);
  
  // Get severity and probability
  const severity = await tp.system.prompt("Severity (1-5)", "3");
  const probability = await tp.system.prompt("Probability (1-5)", "3");
  
  // Calculate risk score
  const score = parseInt(severity) * parseInt(probability);
  
  // Create the new risk file
  const fileName = `${title.replace(/\s+/g, '-')}`;
  const folderPath = "Risk-Assessments";
  
  // Create file and open immediately
  await tp.file.create_new(
    tp.file.find_tfile("enhanced-risk-template"), 
    fileName,
    true,
    app.vault.getAbstractFileByPath(folderPath)
  );
  
  // Replace variables in the template
  const fileContent = await app.vault.read(app.vault.getAbstractFileByPath(`${folderPath}/${fileName}.md`));
  
  let newContent = fileContent
    .replace("risk_category: [regulatory, technical, market, environmental, operational]", `risk_category: ${category}`)
    .replace("severity: ", `severity: ${severity}`)
    .replace("probability: ", `probability: ${probability}`)
    .replace("risk_score: ", `risk_score: ${score}`)
    .replace("tags: [risk, {{VALUE:category:regulatory|technical|market|environmental|operational}}]", `tags: [risk, ${category}]`);
  
  // Write back to file
  await app.vault.modify(app.vault.getAbstractFileByPath(`${folderPath}/${fileName}.md`), newContent);
}
```

## Verification Document Creator

```javascript
// verification-creator.js
// Creates a new hemp verification document

module.exports = async (tp) => {
  // Get project name
  const projectName = await tp.system.prompt("Project name");
  if (!projectName) return;
  
  // Get location
  const location = await tp.system.prompt("Location");
  
  // Get area in hectares
  const area = await tp.system.prompt("Area (hectares)");
  
  // Create the new verification file
  const fileName = `Verification-${projectName.replace(/\s+/g, '-')}`;
  const folderPath = "docs/markdown";
  
  // Create file and open immediately
  await tp.file.create_new(
    tp.file.find_tfile("hemp-verification-template"), 
    fileName,
    true,
    app.vault.getAbstractFileByPath(folderPath)
  );
  
  // Additional processing can be added here if needed
}
```

## Daily Note Enhancer

```javascript
// daily-note-enhancer.js
// Enhances daily notes with project-specific information

module.exports = async (tp) => {
  // Get today's date
  const today = tp.date.now("YYYY-MM-DD");
  
  // Query for upcoming milestones
  const milestones = await tp.obsidian.queryMarkdownFiles(
    "WHERE contains(tags, \"milestone\") AND status != \"completed\""
  );
  
  // Query for high-priority risks
  const risks = await tp.obsidian.queryMarkdownFiles(
    "FROM \"Risk-Assessments\" WHERE severity * probability >= 15"
  );
  
  let milestonesText = "";
  if (milestones && milestones.length > 0) {
    milestonesText = "## Upcoming Milestones\n";
    milestones.slice(0, 3).forEach(m => {
      milestonesText += `- [[${m.path}|${m.name}]]\n`;
    });
  }
  
  let risksText = "";
  if (risks && risks.length > 0) {
    risksText = "## Critical Risks to Address\n";
    risks.slice(0, 3).forEach(r => {
      risksText += `- [[${r.path}|${r.name}]]\n`;
    });
  }
  
  return `---
date: ${today}
tags: [daily]
---

# ${today} - Secret Trees Progress

## Focus Areas Today
- 

${milestonesText}

${risksText}

## Completed Tasks
- [ ] 

## Blockers
- 

## Insights & Decisions
- 

## Questions to Resolve
- 

## Tomorrow's Priorities
- 

## Related Documents
- [[]]`;
}
```

## Installation Steps

1. Install the Templater plugin in Obsidian
2. Go to Settings > Templater
3. Set the template folder to `.obsidian/templates`
4. Create a scripts folder at `.obsidian/templater/scripts`
5. Add the above scripts to that folder
6. Configure Templater to use these scripts:
   - Add a template with the name "Create Risk Assessment" and set the command to `tp.user.risk_creator()`
   - Add a template with the name "Create Verification Document" and set the command to `tp.user.verification_creator()`
   - Configure Daily Notes to use the enhancer script

## Usage

1. Press `Ctrl+P` to open the command palette
2. Type "Templater: Create Risk Assessment" and select it
3. Follow the prompts to create a new risk assessment
4. The file will be automatically created with proper frontmatter and placed in the Risk-Assessments folder 