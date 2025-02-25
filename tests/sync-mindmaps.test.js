const { syncMindmaps } = require('../scripts/extract-secrettrees');
const fs = require('fs');
const path = require('path');

describe('Mindmap Sync Tests', () => {
    const testMainMap = path.join(__dirname, 'fixtures/test-main.drawio');
    const testSecretMap = path.join(__dirname, 'fixtures/test-secret.drawio');

    beforeEach(() => {
        // Setup test files
        fs.copyFileSync(
            path.join(__dirname, 'fixtures/template-main.drawio'),
            testMainMap
        );
    });

    test('should sync SecretTrees nodes', async () => {
        const result = await syncMindmaps(testMainMap, testSecretMap);
        expect(result).toBe(true);
        
        const syncedContent = fs.readFileSync(testSecretMap, 'utf8');
        expect(syncedContent).toContain('lastSync=');
    });

    test('should handle private nodes correctly', async () => {
        const result = await syncMindmaps(testMainMap, testSecretMap);
        const syncedContent = fs.readFileSync(testSecretMap, 'utf8');
        expect(syncedContent).toContain('🔒');
    });

    test('should track version changes', async () => {
        const result = await syncMindmaps(testMainMap, testSecretMap);
        expect(result.version).toBeDefined();
        expect(result.changes).toBeGreaterThan(0);
    });

    test('should maintain private data integrity', async () => {
        const beforeSync = fs.readFileSync(testSecretMap, 'utf8');
        await syncMindmaps(testMainMap, testSecretMap);
        const afterSync = fs.readFileSync(testSecretMap, 'utf8');
        
        expect(afterSync).toContain('API Keys');
        expect(afterSync).toContain('Private Config');
    });
}); 