const chokidar = require('chokidar');
const notifier = require('node-notifier');
const fs = require('fs');
const path = require('path');

function updateChangeCard(filePath) {
    console.log('🔄 Updating change card for:', filePath);
    
    // Log change to file for diagram updates
    const change = {
        file: filePath,
        time: new Date().toISOString(),
        type: 'update'
    };
    
    fs.appendFileSync(
        path.join(__dirname, '../.changes.log'),
        JSON.stringify(change) + '\n'
    );
}

// Watch for file changes
const watcher = chokidar.watch([
    '.github/profile/README.md',
    '.gitignore',
    'scripts/**/*.js',
    'docs/**/*.md'
]);

watcher.on('change', (path) => {
    notifier.notify({
        title: '🔄 File Updated',
        message: `Changed: ${path}`,
        icon: 'path/to/icon.png'
    });
    
    // Update diagram card
    updateChangeCard(path);
}); 