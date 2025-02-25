const { diffChars } = require('diff');
const chalk = require('chalk');

function visualizeDiff(oldContent, newContent) {
    const diff = diffChars(oldContent, newContent);
    
    let output = '';
    diff.forEach((part) => {
        const color = part.added ? chalk.green :
                     part.removed ? chalk.red : chalk.grey;
        output += color(part.value);
    });

    return output;
}

function generateChangeReport(changes) {
    console.log(chalk.blue('📊 Change Report'));
    console.log('================');
    console.log(`🕒 Time: ${changes.timestamp}`);
    console.log(`📈 Nodes Updated: ${changes.nodesUpdated}`);
    console.log(`🏷️ Version: ${changes.version}`);
    
    if (changes.diff) {
        console.log('\n📝 Changes:');
        console.log(visualizeDiff(changes.diff.before, changes.diff.after));
    }
}

module.exports = { visualizeDiff, generateChangeReport }; 