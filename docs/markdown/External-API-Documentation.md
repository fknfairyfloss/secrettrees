---
security: team
tags: api, integration, webhooks, documentation
created: 2025-05-01
---

# Secret Trees External API Documentation

This document provides comprehensive documentation for external systems to integrate with Secret Trees via our n8n webhook APIs.

## Overview

The Secret Trees platform exposes several API endpoints through n8n webhooks. These endpoints allow external systems to:

1. Query project information
2. Update carbon sequestration metrics
3. Manage documentation
4. Access knowledge base content

## Base URL

All API endpoints are available at:

```
http://localhost:5678/webhook/
```

For production use, this will be replaced with a proper domain and SSL certificate.

## Authentication

Depending on the sensitivity of the endpoint, one of the following authentication methods is used:

- **Public endpoints**: No authentication required
- **Team endpoints**: API key required in header
- **Admin endpoints**: HTTP Basic Authentication required

### API Key Authentication

For endpoints requiring API key authentication:

```
Authorization: Bearer YOUR_API_KEY
```

### Basic Authentication

For endpoints requiring Basic Authentication:

```
Authorization: Basic BASE64_ENCODED_CREDENTIALS
```

## Common Headers

All requests should include:

```
Content-Type: application/json
Accept: application/json
```

## API Endpoints

### 1. Echo Assistant API

Simple Q&A interface for basic project information.

**Endpoint:** `/secret-trees-echo-assistant`  
**Method:** POST  
**Authentication:** None  
**Workflow ID:** bEzczYvRDSz9Pc9O

**Request Body:**
```json
{
  "query": "string", // Required: The question to ask
  "source": "string"  // Optional: Source of the query (e.g., "website", "app")
}
```

**Response:**
```json
{
  "answer": "string", // The response to the query
  "success": true     // Whether the query was successful
}
```

**Example:**
```bash
curl -X POST "http://localhost:5678/webhook/secret-trees-echo-assistant" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is Secret Trees?"}'
```

### 2. Knowledge Base Assistant API

More advanced Q&A with access to the project knowledge base.

**Endpoint:** `/ai-knowledge-base-assistant`  
**Method:** POST  
**Authentication:** API Key (Team level)  
**Workflow ID:** MIN6Xnfoc3nkihM8

**Request Body:**
```json
{
  "query": "string",    // Required: The question to ask
  "context": "string",  // Optional: Additional context for the query
  "maxTokens": 500      // Optional: Maximum response length
}
```

**Response:**
```json
{
  "answer": "string",           // The detailed response to the query
  "sources": ["string"],        // Sources used to generate the answer
  "success": true,              // Whether the query was successful
  "processingTimeMs": 1200      // Time taken to process the query in milliseconds
}
```

**Example:**
```bash
curl -X POST "http://localhost:5678/webhook/ai-knowledge-base-assistant" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"query": "How does carbon tokenization work?", "maxTokens": 1000}'
```

### 3. Carbon Data Tracker API

Track and update carbon sequestration metrics.

**Endpoint:** `/carbon-data-tracker`  
**Method:** POST  
**Authentication:** API Key (Team level)  
**Workflow ID:** sI98Bmo8ccsKcJro

**Request Body:**
```json
{
  "carbonSequestered": 130,    // Required: Amount of carbon sequestered (in tons)
  "forestedArea": 8.7,         // Required: Area forested (in hectares)
  "timestamp": "2025-05-01",   // Optional: Date of measurement (defaults to today)
  "source": "monthly-report"   // Optional: Source of the data
}
```

**Response:**
```json
{
  "success": true,
  "recordId": "2025-05-01-001",
  "totalSequestered": 3240,
  "message": "Carbon data updated successfully"
}
```

**Example:**
```bash
curl -X POST "http://localhost:5678/webhook/carbon-data-tracker" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"carbonSequestered": 130, "forestedArea": 8.7}'
```

### 4. Obsidian Integration API

Update and manage documentation in the Obsidian vault.

**Endpoint:** `/obsidian-integration`  
**Method:** POST  
**Authentication:** Basic Auth (Admin level)  
**Workflow ID:** 79ekrxuSE78LSGKF

**Request Body:**
```json
{
  "file": "string",           // Required: Target file path in the vault
  "operation": "string",      // Required: "create", "append", "replace", or "read"
  "content": "string",        // Required for create/append/replace: Content to add
  "section": "string"         // Optional: Section identifier for targeted updates
}
```

**Response:**
```json
{
  "success": true,
  "file": "Milestone-Dashboard.md",
  "operation": "append",
  "message": "Content appended successfully",
  "timestamp": "2025-05-01T14:22:33Z"
}
```

**Example:**
```bash
curl -X POST "http://localhost:5678/webhook/obsidian-integration" \
  -H "Content-Type: application/json" \
  -u "admin:password" \
  -d '{"file": "Milestone-Dashboard.md", "operation": "append", "content": "## New Milestone\n- Completed forest survey"}'
```

## Error Handling

All APIs follow a consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

Common error codes:

| Error Code | Description |
|------------|-------------|
| AUTH_REQUIRED | Authentication is required |
| INVALID_AUTH | Invalid authentication credentials |
| INVALID_REQUEST | Malformed request or missing fields |
| NOT_FOUND | Requested resource not found |
| INTERNAL_ERROR | Server-side error occurred |

## Rate Limiting

API endpoints are rate-limited to protect the system from abuse:

- Public endpoints: 60 requests per minute
- Team endpoints: 120 requests per minute
- Admin endpoints: 300 requests per minute

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1619712000
```

## Webhooks to External Systems

In addition to the API endpoints, Secret Trees can send webhook notifications to external systems when specific events occur:

### 1. Carbon Update Notification

**Trigger:** New carbon data recorded  
**Payload:**
```json
{
  "event": "carbon-update",
  "timestamp": "2025-05-01T14:22:33Z",
  "data": {
    "carbonSequestered": 130,
    "forestedArea": 8.7,
    "totalSequestered": 3240
  }
}
```

### 2. Milestone Update Notification

**Trigger:** Project milestone updated  
**Payload:**
```json
{
  "event": "milestone-update",
  "timestamp": "2025-05-01T14:22:33Z",
  "data": {
    "milestone": "Q2 Target",
    "status": "Completed",
    "description": "Reached 3000 tons of carbon sequestered"
  }
}
```

## Integration Examples

### Node.js Integration

```javascript
const axios = require('axios');

async function queryKnowledgeBase(question) {
  try {
    const response = await axios.post(
      'http://localhost:5678/webhook/ai-knowledge-base-assistant',
      { query: question },
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error querying knowledge base:', error.message);
    return { success: false, error: error.message };
  }
}
```

### Python Integration

```python
import requests

def update_carbon_data(carbon_sequestered, forested_area):
    url = "http://localhost:5678/webhook/carbon-data-tracker"
    payload = {
        "carbonSequestered": carbon_sequestered,
        "forestedArea": forested_area
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
    
    response = requests.post(url, json=payload, headers=headers)
    return response.json()
```

## Best Practices

1. **Implement Retry Logic**: Add exponential backoff for failed requests
2. **Validate Responses**: Always check the `success` field in responses
3. **Handle Rate Limits**: Respect rate limit headers and implement throttling
4. **Secure API Keys**: Never expose API keys in client-side code
5. **Use HTTPS**: In production, always use HTTPS for API calls

## Support

For API support, contact:
- Email: api-support@secrettrees.io
- Documentation: [http://docs.secrettrees.io/api](http://docs.secrettrees.io/api)

---

> [!note]
> This API documentation is for team use only. External partners need to sign an NDA before receiving API access. 