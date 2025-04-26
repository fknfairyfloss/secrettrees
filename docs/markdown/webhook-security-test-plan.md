---
security: team
tags: security, testing, webhooks, n8n
created: 2025-05-01
---

# n8n Webhook Security Boundary Test Plan

This document outlines the test plan for validating the security boundaries of our n8n webhooks to ensure proper isolation and protection of sensitive data.

## Test Objectives

1. Verify that webhook endpoints properly validate input data
2. Ensure authenticated endpoints reject unauthorized requests
3. Test that security headers are correctly implemented
4. Verify that CORS settings are properly configured
5. Validate that sensitive data is not exposed in responses

## Test Environment

- Environment: Development
- n8n instance: http://localhost:5678
- Test workflow IDs:
  - Secret Trees Echo Assistant: bEzczYvRDSz9Pc9O
  - Carbon Data Tracker: sI98Bmo8ccsKcJro
  - AI Knowledge Base Assistant: MIN6Xnfoc3nkihM8
  - Obsidian Integration: 79ekrxuSE78LSGKF

## Test Cases

### 1. Authentication Testing

#### TC-AUTH-01: Basic Authentication Enforcement

**Steps:**
1. Configure the Obsidian Integration webhook to use Basic Auth
2. Attempt to access the webhook without credentials
3. Attempt to access with invalid credentials
4. Attempt to access with valid credentials

**Expected Results:**
- Unauthenticated requests should be rejected with 401
- Invalid credentials should be rejected with 401
- Valid credentials should be accepted with 200

#### TC-AUTH-02: API Key Validation

**Steps:**
1. Configure the Carbon Data Tracker webhook to use API Key
2. Attempt to access without API key
3. Attempt to access with invalid API key
4. Attempt to access with valid API key

**Expected Results:**
- Missing API key requests should be rejected with 401
- Invalid API key should be rejected with 401
- Valid API key should be accepted with 200

### 2. Input Validation Testing

#### TC-INPUT-01: JSON Schema Validation

**Steps:**
1. Send a POST request to the Echo Assistant webhook with valid JSON format but missing required fields
2. Send a POST request with invalid JSON
3. Send a POST request with valid JSON but incorrect data types
4. Send a POST request with all valid parameters

**Expected Results:**
- Missing required fields should be rejected with 400
- Invalid JSON should be rejected with 400
- Incorrect data types should be rejected with 400
- Valid parameters should be accepted with 200

#### TC-INPUT-02: Injection Attempt Prevention

**Steps:**
1. Send requests with SQL injection patterns in input fields
2. Send requests with command injection patterns
3. Send requests with XSS attack payloads

**Expected Results:**
- All injection attempts should be sanitized or rejected
- No error messages revealing implementation details should be returned

### 3. CORS and Security Headers Testing

#### TC-CORS-01: CORS Configuration

**Steps:**
1. Send a cross-origin request from a non-whitelisted domain
2. Send a cross-origin request from an allowed domain
3. Test preflight OPTIONS requests

**Expected Results:**
- Non-whitelisted domains should be rejected
- Whitelisted domains should be allowed
- OPTIONS requests should return appropriate CORS headers

#### TC-HEADER-01: Security Headers

**Steps:**
1. Inspect response headers for all webhooks
2. Check for presence of security headers (Content-Security-Policy, X-Content-Type-Options, etc.)

**Expected Results:**
- Appropriate security headers should be present in responses

### 4. Data Exposure Testing

#### TC-DATA-01: Error Message Information Disclosure

**Steps:**
1. Generate errors in webhook requests (invalid format, authentication failures, etc.)
2. Analyze error responses for sensitive information

**Expected Results:**
- Error messages should not disclose implementation details, stack traces, or sensitive data

#### TC-DATA-02: Sensitive Data Handling

**Steps:**
1. Set up a workflow with sensitive data
2. Verify that sensitive data is properly redacted in logs
3. Verify that sensitive data is not returned in responses

**Expected Results:**
- Sensitive data should be redacted or encrypted in logs
- Sensitive data should not appear in API responses unless explicitly requested

## Automated Test Script

A test script will be created at `~/Development/Secret_Trees/webhook-security-test.js` to automate these tests. The script will:

1. Run all test cases in sequence
2. Log results for each test
3. Provide a summary of passed/failed tests
4. Include detailed error information for failed tests

## Execution Plan

1. Set up webhook configurations in n8n according to test requirements
2. Develop the automated test script
3. Execute tests in development environment
4. Document results in test report
5. Fix any identified security issues
6. Re-run tests to verify fixes

## Success Criteria

The webhook security boundaries will be considered successfully implemented if:

1. All authentication mechanisms properly reject unauthorized requests
2. All input validation correctly rejects malformed or malicious data
3. CORS and security headers are correctly configured
4. No sensitive data is exposed in error messages or responses
5. 100% of test cases pass

## Reporting

Test results will be documented in a report that includes:

1. Summary of test objectives
2. Results for each test case (pass/fail)
3. Detailed description of any failures
4. Recommendations for addressing security issues
5. Overall security assessment

## Timeline

- Test script development: May 1-2, 2025
- Test execution: May 3, 2025
- Results analysis and reporting: May 4, 2025
- Issue resolution: May 5-6, 2025
- Verification testing: May 7, 2025 