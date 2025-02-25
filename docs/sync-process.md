# 🔄 Mindmap Sync Process

## Overview
Automatically syncs SecretTrees-related content between the main project mindmap and private repository.

## Features
- 🔒 Secure content separation
- 📊 Progress tracking
- 🕒 Timestamp tracking
- 🧪 Automated testing

## Usage
```bash
# Manual sync
./scripts/sync-mindmaps.sh

# Auto-sync on commit
git commit -m "Update SecretTrees components"
```

## File Structure
```
FairyFloss/
├── diagrams/
│   └── project-structure-v3.drawio    # Main mindmap
├── scripts/
│   ├── sync-mindmaps.sh              # Sync script
│   └── extract-secrettrees.js        # Node extractor
└── tests/
    └── sync-mindmaps.test.js         # Sync tests
```

## Status Codes
- ✅ Success: Sync completed
- 🟡 Warning: Partial sync
- ❌ Error: Sync failed 