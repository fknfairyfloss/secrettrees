---
security: team
tags: project-management, decisions, documentation
created: 2025-04-25
---

# Secret Trees Decision Log

This document maintains a record of all key project decisions, their context, and rationale to ensure institutional knowledge is preserved and decisions can be referenced in the future.

## Decision Log Format

Each decision is recorded with the following information:
- **ID**: Unique identifier (YYYY-MM-DD-##)
- **Date**: When the decision was made
- **Title**: Brief description of the decision
- **Context**: Background information and why a decision was needed
- **Options**: Alternatives that were considered
- **Decision**: The actual decision that was made
- **Rationale**: Why this option was chosen over others
- **Impact**: Expected effects on the project
- **Owner**: Person responsible for implementing the decision
- **Status**: Current status (Implemented, In Progress, Deferred, Superseded)

## Project Decisions

### 2025-04-25-01

- **Date**: April 25, 2025
- **Title**: Implementation of Three-Tier Security System
- **Context**: Need to protect sensitive project information while allowing appropriate sharing of public content
- **Options**:
  1. Single security level with manual content filtering
  2. Two-tier system (public/private)
  3. Three-tier system (public/team/admin)
  4. Complex role-based access control
- **Decision**: Implement three-tier security system with public, team, and admin access levels
- **Rationale**: Balances security needs with system complexity; provides sufficient granularity without overwhelming administrative overhead
- **Impact**: Required creation of security folders in Obsidian vault, implementation of access control in Telegram bot, and development of content filtering systems
- **Owner**: Security Team
- **Status**: Implemented

### 2025-04-25-02

- **Date**: April 25, 2025
- **Title**: Technology Stack Selection for Workflow Automation
- **Context**: Need efficient tools for workflow automation and integration between systems
- **Options**:
  1. Custom Node.js scripts
  2. Zapier or similar SaaS
  3. n8n self-hosted workflow engine
  4. Apache Airflow
- **Decision**: Use n8n as the primary workflow automation platform
- **Rationale**: Open-source with no usage limits, self-hosted for data control, visual workflow builder, extensive API support, active community
- **Impact**: Required setting up n8n server, creating workflows for key processes, and developing integration mechanisms with Obsidian and Telegram
- **Owner**: Platform Team
- **Status**: Implemented

### 2025-04-25-03

- **Date**: April 25, 2025
- **Title**: Project Management Framework Adoption
- **Context**: Need structured approach to manage project development and team coordination
- **Options**:
  1. Traditional waterfall methodology
  2. Strict Scrum framework
  3. Kanban system
  4. Hybrid agile approach
- **Decision**: Implement hybrid agile methodology with elements of Scrum and Kanban
- **Rationale**: Provides flexibility while maintaining structure; accommodates both planned development and reactive work
- **Impact**: Established sprint cycles, implemented task backlog, created dashboard for workflow monitoring, and developed templates for consistent planning
- **Owner**: Project Management Office
- **Status**: Implemented

### YYYY-MM-DD-##

- **Date**: 
- **Title**: 
- **Context**: 
- **Options**:
  1. 
  2. 
  3. 
- **Decision**: 
- **Rationale**: 
- **Impact**: 
- **Owner**: 
- **Status**: 

## Decision Review Process

Key decisions should be reviewed quarterly to assess:
1. Whether implementation has proceeded as expected
2. If the actual impact matches anticipated impact
3. If any adjustments are needed based on new information
4. Whether the decision should be superseded by a new approach

## How to Use This Log

1. Before making a new decision, review this log for related precedents
2. After making a significant decision, document it promptly
3. Reference decision IDs in related documentation and communications
4. Update decision status as implementation progresses

---

> [!note]
> This decision log should be maintained as a living document. All team members should contribute by adding new decisions and updating the status of existing ones.

# Decision Log

This document tracks key decisions made during the Secret Trees project development process.

## April 2025

### April 26, 2025 - Security Approach for Token Management
- **Decision**: Implemented configuration file approach for sensitive token storage
- **Context**: GitGuardian detected exposed Telegram bot token in repository
- **Alternatives Considered**: 
  - Environment variables only
  - Encrypted storage with key management
  - Vault service integration
- **Decision Criteria**: Balance between security and ease of development
- **Impact**: Improved security posture while maintaining workflow functionality
- **Responsible**: Security Team
- **Status**: Implemented

### April 25, 2025 - Telegram Bot Token Fix
- **Decision**: Fixed Telegram bot token by correcting case sensitivity issue
- **Context**: The bot was previously non-functional due to incorrect token format
- **Alternatives Considered**: 
  - Creating a new bot token
  - Using a different messaging platform
- **Decision Criteria**: Maintaining continuity with existing bot username and setup
- **Impact**: Bot is now operational at @treekeeper_bot with all command functionality working
- **Responsible**: Svetlana
- **Status**: Implemented

### April 24, 2025 - n8n Workflow Naming Convention
- **Decision**: Standardized n8n workflow naming to reflect functionality
- **Context**: Original workflow names were generic and non-descriptive
- **Alternatives Considered**: 
  - Keeping original names with documentation
  - Using numeric designations
- **Decision Criteria**: Clearer organization and self-documenting system
- **Impact**: Improved workflow management and reduced onboarding time for new team members
- **Responsible**: Alex
- **Status**: Pending implementation

### April 23, 2025 - Documentation Platform Selection
- **Decision**: Selected Obsidian as the primary documentation platform
- **Context**: Needed a flexible, markdown-based system for project documentation
- **Alternatives Considered**: 
  - Notion
  - Confluence
  - GitBook
- **Decision Criteria**: Obsidian's offline-first approach, powerful linking capabilities, and plugin ecosystem
- **Impact**: Created centralized knowledge management system with bidirectional linking
- **Responsible**: Team consensus
- **Status**: Implemented

### April 22, 2025 - Integration Architecture
- **Decision**: Adopted webhook-based integration between system components
- **Context**: Needed to establish communication between n8n, Telegram bot, and documentation
- **Alternatives Considered**: 
  - Message queue system
  - Direct API integrations
  - Database-driven synchronization
- **Decision Criteria**: Simplicity, maintainability, and low operational overhead
- **Impact**: Created standardized approach for all system integrations
- **Responsible**: Alex & Janis
- **Status**: Partially implemented

## March 2025

### March 30, 2025 - Carbon Methodology Approach
- **Decision**: Adopted Verified Carbon Standard (VCS) methodology for hemp cultivation
- **Context**: Needed standardized approach for calculating carbon sequestration
- **Alternatives Considered**: 
  - Gold Standard
  - Climate Action Reserve
  - Custom methodology
- **Decision Criteria**: VCS has best recognition for agricultural projects in EU region
- **Impact**: Defined calculation approach for all carbon metrics in the project
- **Responsible**: Martins
- **Status**: Implemented

### March 15, 2025 - Tokenization Platform Selection
- **Decision**: Selected Polygon for carbon credit tokenization
- **Context**: Needed blockchain platform for token issuance
- **Alternatives Considered**: 
  - Ethereum
  - Solana
  - Cardano
- **Decision Criteria**: Lower fees, faster transactions, and strong ecosystem support
- **Impact**: Defined technical development approach for tokenization platform
- **Responsible**: Kristaps
- **Status**: Design phase

---