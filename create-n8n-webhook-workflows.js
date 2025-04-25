const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const config = {
  n8nApiUrl: 'http://127.0.0.1:5678/api/v1',
  n8nApiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYmMyY2ZmNi1lM2ZkLTQzOGQtYTc1Mi04NGI4YmQ2NjgwNDAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzQ1NTE0NjQ0fQ.GSG13EfgKfLwC9PuXJIZ8JpI6PFmJg7FVcV7Vt3rB3E',
  webhookPaths: [
    '/webhook/task-create',
    '/webhook/task-update',
    '/webhook/generate-daily-notes',
    '/webhook/generate-weekly-report'
  ]
};

// Sample workflow template for task creation
const createTaskWorkflow = {
  name: 'Task Create via MCP',
  nodes: [
    {
      parameters: {
        authentication: 'basicAuth',
        httpMethod: 'POST',
        path: 'task-create',
        options: {},
        responseMode: 'onReceived',
        responseData: 'allEntries'
      },
      name: 'Webhook',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 1,
      position: [250, 300]
    },
    {
      parameters: {
        content: '=# {{$json.title}}\n\n## Description\n{{$json.description}}\n\n## Priority\n{{$json.priority}}\n\n## Status\n{{$json.status}}\n\n## Created\n{{$now}}',
        fileName: '={{$json.title.replace(/[^a-zA-Z0-9]/g, "-")}}.md',
        fileFormat: 'md'
      },
      name: 'Write Task File',
      type: 'n8n-nodes-base.writeBinaryFile',
      typeVersion: 1,
      position: [500, 300]
    },
    {
      parameters: {
        destinationPath: './tasks',
        fileName: '={{$node["Write Task File"].json.fileName}}'
      },
      name: 'Move File',
      type: 'n8n-nodes-base.moveFiles',
      typeVersion: 1,
      position: [750, 300]
    },
    {
      parameters: {
        fields: {
          values: [
            {
              name: 'success',
              value: true
            },
            {
              name: 'message',
              value: '=Task "{{$json.title}}" created successfully'
            },
            {
              name: 'taskId',
              value: '={{$node["Write Task File"].json.fileName}}'
            }
          ]
        },
        options: {}
      },
      name: 'Return Response',
      type: 'n8n-nodes-base.set',
      typeVersion: 2,
      position: [1000, 300]
    }
  ],
  connections: {
    Webhook: {
      main: [
        [
          {
            node: 'Write Task File',
            type: 'main',
            index: 0
          }
        ]
      ]
    },
    'Write Task File': {
      main: [
        [
          {
            node: 'Move File',
            type: 'main',
            index: 0
          }
        ]
      ]
    },
    'Move File': {
      main: [
        [
          {
            node: 'Return Response',
            type: 'main',
            index: 0
          }
        ]
      ]
    }
  },
  settings: {
    executionOrder: 'v1'
  }
};

// Function to create a workflow in n8n
function createWorkflow(workflow) {
  return new Promise((resolve, reject) => {
    // Create a copy of the workflow without the 'active' property
    const workflowCopy = JSON.parse(JSON.stringify(workflow));
    if (workflowCopy.active !== undefined) {
      delete workflowCopy.active;
    }
    
    // Send the workflow directly, not inside a 'workflow' object
    const data = JSON.stringify(workflowCopy);
    
    const options = {
      hostname: '127.0.0.1',
      port: 5678,
      path: '/api/v1/workflows',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': config.n8nApiKey
      }
    };
    
    const req = http.request(options, (res) => {
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log(`Workflow "${workflow.name}" created successfully`);
        resolve();
      } else {
        console.error(`Failed to create workflow: ${res.statusCode}`);
        
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          console.error('Response:', responseData);
          reject(new Error(`Failed to create workflow: ${res.statusCode}`));
        });
      }
    });
    
    req.on('error', (error) => {
      console.error('Error creating workflow:', error);
      reject(error);
    });
    
    req.write(data);
    req.end();
  });
}

// Function to check if a workflow with the same path already exists
function checkWorkflowExists(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 5678,
      path: '/api/v1/workflows',
      method: 'GET',
      headers: {
        'X-N8N-API-KEY': config.n8nApiKey
      }
    };
    
    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const workflows = JSON.parse(data);
            
            // Check if a workflow with the webhook path already exists
            const existingWorkflow = workflows.data.find(workflow => {
              try {
                const webhookNode = workflow.nodes.find(node => 
                  node.type === 'n8n-nodes-base.webhook' && 
                  node.parameters.path === path.substring(path.lastIndexOf('/') + 1)
                );
                return !!webhookNode;
              } catch (e) {
                return false;
              }
            });
            
            resolve(existingWorkflow);
          } catch (error) {
            console.error('Error parsing workflows data:', error);
            reject(error);
          }
        });
      } else {
        console.error(`Failed to fetch workflows: ${res.statusCode}`);
        reject(new Error(`Failed to fetch workflows: ${res.statusCode}`));
      }
    });
    
    req.on('error', (error) => {
      console.error('Error fetching workflows:', error);
      reject(error);
    });
    
    req.end();
  });
}

// Create duplicate workflows for other actions
const createWorkflows = async () => {
  try {
    // Task Create
    if (await checkWorkflowExists('/webhook/task-create')) {
      console.log('Task Create workflow already exists');
    } else {
      await createWorkflow(createTaskWorkflow);
    }
    
    // Task Update (based on task create)
    const updateTaskWorkflow = JSON.parse(JSON.stringify(createTaskWorkflow));
    updateTaskWorkflow.name = 'Task Update via MCP';
    updateTaskWorkflow.nodes[0].parameters.path = 'task-update';
    
    if (await checkWorkflowExists('/webhook/task-update')) {
      console.log('Task Update workflow already exists');
    } else {
      await createWorkflow(updateTaskWorkflow);
    }
    
    // Generate Daily Notes
    const dailyNotesWorkflow = JSON.parse(JSON.stringify(createTaskWorkflow));
    dailyNotesWorkflow.name = 'Generate Daily Notes via MCP';
    dailyNotesWorkflow.nodes[0].parameters.path = 'generate-daily-notes';
    dailyNotesWorkflow.nodes[1].parameters.content = '=# Daily Notes: {{$json.summary}}\n\n## Summary\n{{$json.summary}}\n\n## Tasks\n{{$json.tasks}}\n\n## Notes\n{{$json.notes}}\n\n## Generated\n{{$now}}';
    dailyNotesWorkflow.nodes[1].parameters.fileName = '={{$json.title || "daily-notes"}}.md';
    dailyNotesWorkflow.nodes[2].parameters.destinationPath = './Daily-Notes';
    
    if (await checkWorkflowExists('/webhook/generate-daily-notes')) {
      console.log('Generate Daily Notes workflow already exists');
    } else {
      await createWorkflow(dailyNotesWorkflow);
    }
    
    // Generate Weekly Report
    const weeklyReportWorkflow = JSON.parse(JSON.stringify(createTaskWorkflow));
    weeklyReportWorkflow.name = 'Generate Weekly Report via MCP';
    weeklyReportWorkflow.nodes[0].parameters.path = 'generate-weekly-report';
    weeklyReportWorkflow.nodes[1].parameters.content = '=# Weekly Report: {{$json.title}}\n\n## Summary\n{{$json.summary}}\n\n## Accomplishments\n{{$json.accomplishments}}\n\n## Challenges\n{{$json.challenges}}\n\n## Next Week\n{{$json.nextWeek}}\n\n## Generated\n{{$now}}';
    weeklyReportWorkflow.nodes[1].parameters.fileName = '={{$json.title || "weekly-report"}}.md';
    weeklyReportWorkflow.nodes[2].parameters.destinationPath = './Weekly-Reports';
    
    if (await checkWorkflowExists('/webhook/generate-weekly-report')) {
      console.log('Generate Weekly Report workflow already exists');
    } else {
      await createWorkflow(weeklyReportWorkflow);
    }
    
    console.log('All workflows created successfully');
  } catch (error) {
    console.error('Error creating workflows:', error);
  }
};

createWorkflows(); 