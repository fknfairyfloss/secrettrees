const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const PRIVATE_MARKERS = [
    'API_KEY',
    'SECRET',
    'PRIVATE',
    'PASSWORD',
    'TOKEN'
];

const ALLOWED_FILES = [
    'check-private.js',      // Needed for checking
    'example.config.js',     // Public examples
    'test-config.js'         // Test configurations
];

const PRIVATE_DIRS = [
    'secrettrees-private',
    'personal',
    'private',
    'secret-trees/private'
];

function checkPrivateContent(filePath) {
    if (ALLOWED_FILES.some(file => filePath.endsWith(file))) {
        return [];
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];

    PRIVATE_MARKERS.forEach(marker => {
        if (content.includes(marker)) {
            findings.push({
                marker,
                file: filePath,
                type: 'sensitive'
            });
        }
    });

    return findings;
}

function scanDirectory(dir = '.') {
    const issues = [];
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules')) {
                if (PRIVATE_DIRS.some(dir => fullPath.includes(dir))) {
                    console.log(`Skipping private directory: ${fullPath}`);
                    return [];
                }
                issues.push(...scanDirectory(fullPath));
            }
        } else {
            issues.push(...checkPrivateContent(fullPath));
        }
    });

    return issues;
}

// Run check and report
const issues = scanDirectory();
if (issues.length > 0) {
    console.log(chalk.red('⚠️ Found potential private content:'));
    issues.forEach(issue => {
        console.log(chalk.yellow(`- ${issue.file}: contains "${issue.marker}"`));
    });
    process.exit(1);
} else {
    console.log(chalk.green('✅ No private content detected'));
    process.exit(0);
} 