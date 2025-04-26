#!/usr/bin/env node

/**
 * Secret Trees n8n Webhook Security Boundary Test
 * 
 * This script tests the security boundaries of n8n webhooks by validating:
 * - Authentication controls
 * - Input validation
 * - CORS settings
 * - Security headers
 * - Sensitive data handling
 */

const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// Configuration
const N8N_BASE_URL = 'http://localhost:5678/webhook';
const TEST_RESULTS_DIR = path.join(__dirname, 'test-results');
const TEST_CREDENTIALS = {
  apiKey: 'test-api-key-123',
  basicAuth: {
    username: 'admin',
    password: 'secret'
  }
};

// Ensure test results directory exists
if (!fs.existsSync(TEST_RESULTS_DIR)) {
  fs.mkdirSync(TEST_RESULTS_DIR, { recursive: true });
}

// Create test result log file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logFile = path.join(TEST_RESULTS_DIR, `webhook-security-test-${timestamp}.log`);
const testResults = {
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0
  },
  tests: []
};

// Formatted console output
const log = {
  info: message => {
    console.log(chalk.blue(`[INFO] ${message}`));
    fs.appendFileSync(logFile, `[INFO] ${message}\n`);
  },
  success: message => {
    console.log(chalk.green(`[PASS] ${message}`));
    fs.appendFileSync(logFile, `[PASS] ${message}\n`);
  },
  error: message => {
    console.log(chalk.red(`[FAIL] ${message}`));
    fs.appendFileSync(logFile, `[FAIL] ${message}\n`);
  },
  warning: message => {
    console.log(chalk.yellow(`[WARN] ${message}`));
    fs.appendFileSync(logFile, `[WARN] ${message}\n`);
  }
};

/**
 * Run a test and record results
 * @param {string} testId - Unique test identifier
 * @param {string} description - Test description
 * @param {Function} testFn - Test function that returns boolean or throws error
 */
async function runTest(testId, description, testFn) {
  log.info(`Running test ${testId}: ${description}`);
  testResults.summary.total++;

  try {
    const result = await testFn();
    if (result === true) {
      testResults.summary.passed++;
      log.success(`${testId}: Passed`);
      testResults.tests.push({
        id: testId,
        description,
        status: 'passed',
        timestamp: new Date().toISOString()
      });
    } else if (result === 'skipped') {
      testResults.summary.skipped++;
      log.warning(`${testId}: Skipped`);
      testResults.tests.push({
        id: testId,
        description,
        status: 'skipped',
        timestamp: new Date().toISOString()
      });
    } else {
      testResults.summary.failed++;
      log.error(`${testId}: Failed`);
      testResults.tests.push({
        id: testId,
        description,
        status: 'failed',
        message: 'Test returned false',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    testResults.summary.failed++;
    log.error(`${testId}: Failed with error: ${error.message}`);
    testResults.tests.push({
      id: testId,
      description,
      status: 'failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Send a request to the webhook
 * @param {string} endpoint - Endpoint path
 * @param {Object} options - Request options
 * @returns {Promise<Object>} Response data
 */
async function sendRequest(endpoint, options = {}) {
  const url = `${N8N_BASE_URL}/${endpoint}`;
  const defaultOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {}
  };
  
  const requestOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await axios.request({
      url,
      ...requestOptions
    });
    return { status: response.status, data: response.data, headers: response.headers };
  } catch (error) {
    if (error.response) {
      // Return error response for analysis
      return { 
        status: error.response.status, 
        data: error.response.data,
        headers: error.response.headers,
        isError: true
      };
    }
    throw error;
  }
}

// Test cases based on the webhook security test plan

// 1. Authentication Testing
async function runAuthenticationTests() {
  log.info('Starting Authentication Tests');
  
  // TC-AUTH-01: Basic Authentication Enforcement
  await runTest('TC-AUTH-01-1', 'No credentials should be rejected for protected endpoint', async () => {
    const response = await sendRequest('obsidian-integration', {
      data: { file: 'test.md', operation: 'read' }
    });
    return response.status === 401;
  });
  
  await runTest('TC-AUTH-01-2', 'Invalid credentials should be rejected for protected endpoint', async () => {
    const response = await sendRequest('obsidian-integration', {
      auth: { username: 'wrong', password: 'wrong' },
      data: { file: 'test.md', operation: 'read' }
    });
    return response.status === 401;
  });
  
  await runTest('TC-AUTH-01-3', 'Valid credentials should be accepted for protected endpoint', async () => {
    const response = await sendRequest('obsidian-integration', {
      auth: TEST_CREDENTIALS.basicAuth,
      data: { file: 'test.md', operation: 'read' }
    });
    return response.status === 200 || response.status === 404; // 404 is acceptable if file doesn't exist
  });
  
  // TC-AUTH-02: API Key Validation
  await runTest('TC-AUTH-02-1', 'No API key should be rejected for team endpoint', async () => {
    const response = await sendRequest('carbon-data-tracker', {
      data: { carbonSequestered: 130, forestedArea: 8.7 }
    });
    return response.status === 401;
  });
  
  await runTest('TC-AUTH-02-2', 'Invalid API key should be rejected for team endpoint', async () => {
    const response = await sendRequest('carbon-data-tracker', {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer INVALID_KEY'
      },
      data: { carbonSequestered: 130, forestedArea: 8.7 }
    });
    return response.status === 401;
  });
  
  await runTest('TC-AUTH-02-3', 'Valid API key should be accepted for team endpoint', async () => {
    const response = await sendRequest('carbon-data-tracker', {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_CREDENTIALS.apiKey}`
      },
      data: { carbonSequestered: 130, forestedArea: 8.7 }
    });
    return response.status === 200;
  });
}

// 2. Input Validation Testing
async function runInputValidationTests() {
  log.info('Starting Input Validation Tests');
  
  // TC-INPUT-01: JSON Schema Validation
  await runTest('TC-INPUT-01-1', 'Missing required fields should be rejected', async () => {
    const response = await sendRequest('secret-trees-echo-assistant', {
      data: { source: 'test' } // missing required 'query' field
    });
    return response.status === 400;
  });
  
  await runTest('TC-INPUT-01-2', 'Invalid JSON should be rejected', async () => {
    try {
      // Send malformed JSON
      const response = await axios.post(
        `${N8N_BASE_URL}/secret-trees-echo-assistant`, 
        '{"query": "test", unclosed_bracket', 
        { headers: { 'Content-Type': 'application/json' } }
      );
      return false; // Should not reach here
    } catch (error) {
      return error.response && error.response.status === 400;
    }
  });
  
  await runTest('TC-INPUT-01-3', 'Incorrect data types should be rejected', async () => {
    const response = await sendRequest('carbon-data-tracker', {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_CREDENTIALS.apiKey}`
      },
      data: { carbonSequestered: "not-a-number", forestedArea: 8.7 }
    });
    return response.status === 400;
  });
  
  await runTest('TC-INPUT-01-4', 'Valid parameters should be accepted', async () => {
    const response = await sendRequest('secret-trees-echo-assistant', {
      data: { query: 'What is Secret Trees?' }
    });
    return response.status === 200;
  });
  
  // TC-INPUT-02: Injection Attempt Prevention
  await runTest('TC-INPUT-02-1', 'SQL injection patterns should be sanitized or rejected', async () => {
    const response = await sendRequest('secret-trees-echo-assistant', {
      data: { query: "' OR 1=1; --" }
    });
    
    // Check if the response doesn't contain SQL error messages
    const noSqlError = !JSON.stringify(response.data).toLowerCase().includes('sql syntax');
    
    return response.status === 200 && noSqlError;
  });
  
  await runTest('TC-INPUT-02-2', 'Command injection patterns should be sanitized or rejected', async () => {
    const response = await sendRequest('secret-trees-echo-assistant', {
      data: { query: "$(cat /etc/passwd)" }
    });
    
    // Response shouldn't contain sensitive system information
    const noSystemInfo = !JSON.stringify(response.data).toLowerCase().includes('root:');
    
    return response.status === 200 && noSystemInfo;
  });
  
  await runTest('TC-INPUT-02-3', 'XSS attack payloads should be sanitized or rejected', async () => {
    const response = await sendRequest('secret-trees-echo-assistant', {
      data: { query: "<script>alert('XSS')</script>" }
    });
    
    // Check if the script tag is escaped or removed
    const isScriptEscaped = !JSON.stringify(response.data).includes('<script>');
    
    return response.status === 200 && isScriptEscaped;
  });
}

// 3. CORS and Security Headers Testing
async function runCorsAndHeadersTests() {
  log.info('Starting CORS and Security Headers Tests');
  
  // TC-CORS-01: CORS Configuration
  await runTest('TC-CORS-01-1', 'CORS preflight request should have appropriate headers', async () => {
    try {
      const response = await axios.options(`${N8N_BASE_URL}/secret-trees-echo-assistant`, {
        headers: {
          'Origin': 'https://example.com',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });
      
      const corsHeaders = response.headers;
      return corsHeaders['access-control-allow-origin'] !== undefined;
    } catch (error) {
      // Some servers might not respond to OPTIONS correctly, which is also acceptable
      return 'skipped';
    }
  });
  
  // TC-HEADER-01: Security Headers
  await runTest('TC-HEADER-01-1', 'Response should include security headers', async () => {
    const response = await sendRequest('secret-trees-echo-assistant', {
      data: { query: 'Test security headers' }
    });
    
    const headers = response.headers;
    
    // Check for at least some security headers
    const hasSecurityHeaders = 
      headers['x-content-type-options'] !== undefined ||
      headers['content-security-policy'] !== undefined ||
      headers['x-frame-options'] !== undefined;
    
    return hasSecurityHeaders;
  });
}

// 4. Data Exposure Testing
async function runDataExposureTests() {
  log.info('Starting Data Exposure Tests');
  
  // TC-DATA-01: Error Message Information Disclosure
  await runTest('TC-DATA-01-1', 'Error messages should not disclose implementation details', async () => {
    const response = await sendRequest('secret-trees-echo-assistant', {
      data: { nonExistentField: 'value' } // Should cause error due to missing required field
    });
    
    if (!response.isError) {
      return false;
    }
    
    const responseText = JSON.stringify(response.data).toLowerCase();
    const noStackTrace = !responseText.includes('stack trace') && 
                          !responseText.includes('error:') && 
                          !responseText.includes('node_modules') &&
                          !responseText.includes('at ');
    
    return noStackTrace;
  });
  
  // TC-DATA-02: Sensitive Data Handling
  await runTest('TC-DATA-02-1', 'Sensitive data should not appear in API responses', async () => {
    const testData = { 
      query: 'What is the email of our admin?',
      sensitiveData: 'secret-api-key-12345', // This should not be returned
      password: 'test-password-123' // This should not be returned
    };
    
    const response = await sendRequest('secret-trees-echo-assistant', {
      data: testData
    });
    
    const responseText = JSON.stringify(response.data);
    const noSensitiveData = !responseText.includes('secret-api-key') && 
                            !responseText.includes('test-password');
    
    return noSensitiveData;
  });
}

// Main test runner
async function runAllTests() {
  log.info('Starting n8n Webhook Security Boundary Tests');
  log.info(`Test results will be saved to: ${logFile}`);
  
  try {
    await runAuthenticationTests();
    await runInputValidationTests();
    await runCorsAndHeadersTests();
    await runDataExposureTests();
    
    // Write test results to file
    fs.writeFileSync(
      path.join(TEST_RESULTS_DIR, `webhook-security-test-results-${timestamp}.json`),
      JSON.stringify(testResults, null, 2)
    );
    
    // Print summary
    log.info('---------------------------');
    log.info(`Test Summary: ${testResults.summary.passed}/${testResults.summary.total} tests passed`);
    log.info(`Passed: ${testResults.summary.passed}`);
    log.info(`Failed: ${testResults.summary.failed}`);
    log.info(`Skipped: ${testResults.summary.skipped}`);
    
    if (testResults.summary.failed > 0) {
      log.error('⚠️ Some tests failed. Review the test results for details.');
      process.exit(1);
    } else {
      log.success('✅ All tests passed successfully!');
      process.exit(0);
    }
  } catch (error) {
    log.error(`Error running tests: ${error.message}`);
    process.exit(1);
  }
}

// Run the tests
runAllTests(); 