const { execSync } = require('child_process');
const chalk = require('chalk');

function getRepoStatus() {
    // Get current branch
    const branch = execSync('git branch --show-current').toString().trim();
    
    // Get latest commit
    const commit = execSync('git rev-parse HEAD').toString().trim();
    
    // Get changed files
    const changes = execSync('git status --porcelain').toString()
        .split('\n')
        .filter(Boolean)
        .map(line => {
            const [status, file] = [line.slice(0, 2), line.slice(3)];
            return { status, file };
        });

    return { branch, commit, changes };
}

function visualizeDiff() {
    console.log(chalk.blue('📊 Repository Status'));
    console.log('==================');

    const status = getRepoStatus();
    
    // Show branch
    console.log(`🌿 Branch: ${status.branch}`);
    console.log(`📌 Commit: ${status.commit.slice(0, 7)}`);
    
    // Show changes
    console.log('\n📝 Changes:');
    status.changes.forEach(change => {
        const icon = change.status.includes('M') ? '🔄' :
                    change.status.includes('A') ? '✨' :
                    change.status.includes('D') ? '🗑️' : '❓';
        
        const color = change.status.includes('M') ? chalk.yellow :
                     change.status.includes('A') ? chalk.green :
                     change.status.includes('D') ? chalk.red : chalk.grey;
        
        console.log(color(`${icon} ${change.file}`));
    });
}

visualizeDiff(); 