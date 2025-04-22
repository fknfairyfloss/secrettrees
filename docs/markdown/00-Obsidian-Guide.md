# Secret Trees Obsidian Guide

## Overview

This guide explains how to use our enhanced Obsidian setup for the Secret Trees project documentation and knowledge management.

## Getting Started

1. **Install Obsidian**: Download from [obsidian.md](https://obsidian.md)
2. **Open the Vault**: Navigate to the Secret Trees folder and open as vault
3. **Recommended Plugins**: Install the following Community plugins:
   - Dataview
   - Templater
   - Obsidian Git
   - Tasks
   - Canvas
   - Advanced Tables

## Documentation Structure

- **Numbered Files**: Core project documentation (01-Carbon-Methodology.md, etc.)
- **Templates Folder**: Standard templates for consistency
- **Daily Notes**: Project journal entries
- **Canvas Maps**: Visual project planning and relationships
- **Risk-Assessments**: Dedicated folder for risk documentation

## Using Basic Templates

1. Press `Ctrl+P` (or `Cmd+P` on Mac) to open Command Palette
2. Type "Template" and select "Templater: Create new note from template"
3. Choose the appropriate template:
   - Meeting-Note.md: For team meetings
   - Risk-Assessment.md: For documenting risks
   - Project-Milestone.md: For tracking key deliverables
   - Daily-Note.md: For daily project journaling
   - Hemp-Verification-Template.md: For carbon verification documentation
   - Code-Documentation-Template.md: For linking code with documentation

## Advanced Automation

For more efficient documentation, use these Templater scripts:

1. **Risk Assessment Creator**:
   - Command: "Templater: Create Risk Assessment"
   - Automatically creates risk files with proper scoring
   - Stores in Risk-Assessments folder

2. **Verification Document Creator**:
   - Command: "Templater: Create Verification Document"
   - Streamlines creation of hemp verification docs
   - Prompts for key project details

3. **Enhanced Daily Notes**:
   - Automatically includes upcoming milestones and critical risks
   - Provides structured format for daily progress

See [[Templater-Scripts]] for setup instructions and more details.

## Risk Assessment Process

1. Create new risk documentation using the Enhanced Risk Template
2. Fill in severity (1-5) and probability (1-5) 
3. Complete all relevant fields including impact assessment
4. Link to appropriate mitigation resources
5. View all risks in the [[Risk-Dashboard]] and [[Dynamic-Risk-Matrix]]

## Technical Documentation

For technical components:

1. Use the Code Documentation Template to document key code components
2. Link directly to relevant specifications in the main documentation
3. Review the [[Canvas-Maps/Architecture-Visualization|Technical Architecture]] canvas
4. Maintain bidirectional links between code docs and functional specifications

## Security & Access Control

The Secret Trees documentation has specific access controls:

1. Review the [[Access-Control-Matrix]] for role-based permissions
2. Follow GDPR guidelines for data classification
3. Use appropriate export controls for sensitive information
4. Maintain separate vaults for highly confidential information

## Project Timeline

The Project Timeline canvas provides a visual overview of the project phases:
1. Open `Canvas-Maps/Project-Timeline.canvas`
2. Click on nodes to navigate to related documents
3. Edit as needed to reflect current project status

## Best Practices

1. **Consistent Tags**: Use consistent tags (risk, meeting, milestone, etc.)
2. **Cross-Linking**: Create wiki-links between related documents
3. **Daily Updates**: Maintain project momentum with daily notes
4. **Risk Reviews**: Regularly review and update the Risk Dashboard
5. **Proper Attribution**: Link to reference materials using `[[99-References]]`

## Key Dashboards & Tools

- [[Risk-Dashboard]]: Overview of all project risks
- [[Dynamic-Risk-Matrix]]: Visual risk assessment tool
- [[Milestone-Dashboard]]: Track project milestones and progress
- [[Canvas-Maps/Architecture-Visualization]]: Technical architecture visualization

## Additional Resources

- [[09-Risk-Assessment]]: Current risk assessment document
- [[08-Business-Model]]: Business model documentation
- [[10-Investor-Pitch]]: Investor materials 