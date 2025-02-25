#!/usr/bin/env node
const { execSync } = require('child_process');

function runTests() {
    console.log('🧪 Running all tests...');
    
    const tests = [
        'test:private',
        'test:changes',
        'test:graph',
        'visualize'
    ];

    tests.forEach(test => {
        console.log(`\nRunning ${test}...`);
        try {
            execSync(`npm run ${test}`, { stdio: 'inherit' });
            console.log(`✅ ${test} passed`);
        } catch (error) {
            console.error(`❌ ${test} failed:`, error.message);
        }
    });
}

runTests(); 