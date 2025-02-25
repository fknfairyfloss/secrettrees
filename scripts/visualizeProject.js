#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function visualizeProject() {
    const structure = {
        public: {
            diagrams: ['project-structure.drawio'],
            docs: ['STRUCTURE.md'],
            setup: ['setup-workspace.sh'],
            scripts: [
                'check-private.js',
                'track-changes.js',
                'update-graph.js',
                'visualizeProject.js'
            ]
        },
        private: {
            workflows: {
                github: ['component-status.yml', 'notion-sync.yml']
            },
            scripts: {
                root: ['manage-repos.sh', 'sync-mindmaps.sh'],
                setup: ['linux-mint-setup.sh', 'setup-linux.sh'],
                notion: ['sync.js', 'component-tracking.ts']
            },
            services: {
                notion: ['NotionConnection.ts', 'NotionIntegrationService.ts'],
                framer: ['StakeDashboard.tsx']
            }
        }
    };

    function visualizeFiles(files, indent = '') {
        if (Array.isArray(files)) {
            files.forEach((file, i) => {
                const prefix = i === files.length - 1 ? '└──' : '├──';
                console.log(`${indent}${prefix} ${file}`);
            });
        } else {
            Object.entries(files).forEach(([subdir, subfiles]) => {
                console.log(`${indent}├── ${subdir}/`);
                visualizeFiles(subfiles, `${indent}│   `);
            });
        }
    }

    console.log('📊 Project Structure:');
    console.log('===================');
    Object.entries(structure).forEach(([type, contents]) => {
        console.log(`\n${type.toUpperCase()}:`);
        visualizeFiles(contents);
    });
}

visualizeProject(); 