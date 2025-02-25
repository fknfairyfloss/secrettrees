#!/bin/bash

# Make all scripts executable
chmod +x scripts/*.js
chmod +x scripts/*.sh
chmod +x setup-workspace.sh

# Update package.json scripts
sed -i 's/ts-node/node/g' package.json
sed -i 's/\.ts/\.js/g' package.json

echo "✅ Permissions updated" 