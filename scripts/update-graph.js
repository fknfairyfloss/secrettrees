#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Update repository structure visualization
function updateGraph() {
    const structure = {
        public: {
            diagrams: ['project-structure.drawio'],
            docs: ['STRUCTURE.md'],
            setup: ['setup-workspace.sh']
        },
        private: {
            diagrams: ['project-structure-v3.drawio'],
            config: ['.env.linux', '.env.windows'],
            private: ['private.config.json']
        }
    };

    // Generate visual representation
    console.log('📊 Repository Structure:');
    console.log('=======================');
    console.log('Public (main):');
    visualizeStructure(structure.public);
    console.log('\nPrivate (secrettrees-private):');
    visualizeStructure(structure.private);
}

function visualizeStructure(structure) {
    Object.entries(structure).forEach(([dir, files]) => {
        console.log(`├── ${dir}/`);
        files.forEach((file, i) => {
            const prefix = i === files.length - 1 ? '└──' : '├──';
            console.log(`│   ${prefix} ${file}`);
        });
    });
}

updateGraph(); 