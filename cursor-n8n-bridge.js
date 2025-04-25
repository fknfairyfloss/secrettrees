const http = require('http');
const https = require('https');
const url = require('url');

// Configuration
const config = {
  port: 5679,
  n8nApiUrl: 'http://127.0.0.1:5678',
  n8nApiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYmMyY2ZmNi1lM2ZkLTQzOGQtYTc1Mi04NGI4YmQ2NjgwNDAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzQ1NTE0NjQ0fQ.GSG13EfgKfLwC9PuXJIZ8JpI6PFmJg7FVcV7Vt3rB3E',
  endpoints: {
    '/mcp/task-create': '/api/v1/webhooks/task-create',
    '/mcp/task-update': '/api/v1/webhooks/task-update',
    '/mcp/generate-daily-notes': '/api/v1/webhooks/generate-daily-notes',
    '/mcp/generate-weekly-report': '/api/v1/webhooks/generate-weekly-report'
  }
};

// Create the server
const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  
  // Parse the request URL
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;
  
  // Check if the path is in our endpoints map
  if (path in config.endpoints) {
    // Collect request body data
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      // Create the n8n API request options
      const n8nUrl = `${config.n8nApiUrl}${config.endpoints[path]}`;
      console.log(`Forwarding request to: ${n8nUrl}`);
      
      // Parse the URL to determine http vs https
      const parsedN8nUrl = url.parse(n8nUrl);
      const httpModule = parsedN8nUrl.protocol === 'https:' ? https : http;
      
      const options = {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': config.n8nApiKey
        }
      };
      
      // Forward the request to n8n
      const n8nReq = httpModule.request(n8nUrl, options, (n8nRes) => {
        console.log(`n8n response status: ${n8nRes.statusCode}`);
        
        // Set the response headers
        res.writeHead(n8nRes.statusCode, n8nRes.headers);
        
        // Pipe the n8n response to our response
        n8nRes.pipe(res);
      });
      
      // Handle errors
      n8nReq.on('error', (e) => {
        console.error(`Error forwarding request: ${e.message}`);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to communicate with n8n' }));
      });
      
      // Send the body data
      if (body) {
        n8nReq.write(body);
      }
      
      n8nReq.end();
    });
  } else if (path === '/mcp') {
    // Return MCP protocol info for Cursor
    console.log('Returning MCP protocol info');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      version: '1.0.0',
      endpoints: Object.keys(config.endpoints).map(key => ({
        name: key.substring(5), // Remove '/mcp/' prefix
        path: key,
        method: 'POST'
      }))
    }));
  } else {
    // Handle unknown paths
    console.log(`Unknown path: ${path}`);
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start the server
server.listen(config.port, () => {
  console.log(`Cursor-n8n bridge running on port ${config.port}`);
  console.log(`Forwarding requests to ${config.n8nApiUrl}`);
  console.log('Available endpoints:');
  for (const [source, target] of Object.entries(config.endpoints)) {
    console.log(`  ${source} -> ${target}`);
  }
}); 