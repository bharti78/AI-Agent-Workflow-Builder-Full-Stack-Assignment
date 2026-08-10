# Demo Recording Guide

This guide outlines the full acceptance scenario to demonstrate in the demo recording, covering all implemented features.

## Demo Scenario

### Setup

1. **Create Test Organizations**
   - Sign up as Owner A
   - Create Organization A with quota 100
   - Invite Editor A to Organization A
   - Sign out

   - Sign up as User B
   - Create Organization B
   - Sign out

### Part 1: Workflow Creation (as Owner A)

1. **Sign in as Owner A**
2. **Navigate to Organization A**
3. **Create Workflow A**
   - Name: "Multi-Step AI Workflow"
   - Description: "Demonstrates all step types"

4. **Add Steps in Order**
   - Step 1: LLM Call
     - Provider: Groq
     - Model: llama3-70b-8192
     - Prompt: "Summarize the previous output"
   
   - Step 2: HTTP Request
     - Method: GET
     - URL: https://jsonplaceholder.typicode.com/posts/1
   
   - Step 3: Conditional Branch
     - Field: output.status
     - Operator: equals
     - Value: 200
   
   - Step 4: Approval Gate
     - Note: "Review before proceeding to DB write"
   
   - Step 5: DB Write
     - Label: "Final Result"

5. **Add Webhook Trigger**
   - Type: webhook
   - Token: (auto-generated, note it for later)

6. **Save and Activate Workflow**

### Part 2: Manual Execution with Approval

1. **Run Workflow Manually**
   - Click "Run" button
   - Observe status badges updating in real-time via subscription
   - Watch: LLM → ✓, HTTP → ✓, Conditional → ✓, Approval → ⏸

2. **Demonstrate Approval Gate**
   - Show workflow is paused at approval step
   - Show "Approve" button for owner/editor
   - Click "Approve"
   - Watch: Approval → ✓, DB Write → ✓, Workflow → COMPLETED

3. **Verify Quota**
   - Check home page: Usage increased by 1
   - Check workflows page: Usage displayed prominently

### Part 3: Role-Based Access Control

1. **Sign in as Editor A**
2. **Navigate to Workflow A**
3. **Verify Editor Permissions**
   - Can view workflow
   - Can edit steps (except owner-only types)
   - Can run workflow
   - Can approve steps
   - Cannot delete workflow
   - Cannot add db_write/notify steps

4. **Test Owner-Only Features**
   - Try to add db_write step → should be hidden/disabled
   - Try to add notify step → should be hidden/disabled
   - Try to add webhook trigger → should be hidden/disabled

### Part 4: Webhook Trigger

1. **Using curl or Postman**
   ```bash
   curl -X POST "https://<subdomain>.functions.<region>.nhost.run/v1/webhooks/trigger?token=<token>"
   ```

2. **Verify Webhook Execution**
   - Check Workflow A → Latest run
   - Observe new run created with trigger_type: "webhook"
   - Watch real-time status updates
   - Approve if approval gate pauses it

### Part 5: Cross-Organization Security

1. **Sign in as User B (Organization B)**
2. **Attempt to Access Workflow A**
   - Try direct navigation: `/workflows/<Workflow A id>`
   - Should show "Workflow not found in the selected organization"

3. **Verify Isolation**
   - User B should only see Organization B's workflows
   - User B should not see any data from Organization A

### Part 6: Real-Time Subscription Demo

1. **Open Two Browser Tabs**
   - Tab 1: Workflow builder page
   - Tab 2: Same workflow builder page

2. **Trigger Workflow in Tab 1**
   - Click "Run"
   - Watch status badges update

3. **Observe Tab 2**
   - Status badges should update automatically without refresh
   - Demonstrate GraphQL subscription is working

4. **Check Browser Console**
   - Show "Subscription client connected" message
   - Show subscription data flowing

## Script Outline

### Introduction (30 seconds)
- "Welcome to the AI Agent Workflow Builder demo"
- "This is a multi-tenant workflow automation platform built on Next.js and Nhost"
- "I'll demonstrate the full workflow lifecycle including approval gates and real-time updates"

### Workflow Creation (2 minutes)
- Show organization selection and role display
- Create workflow with all step types
- Explain each step type briefly
- Add webhook trigger
- Save and activate

### Manual Execution (2 minutes)
- Run workflow manually
- Highlight real-time status updates via GraphQL subscription
- Show approval gate pausing execution
- Approve and watch completion
- Verify quota increment

### Role-Based Access (1 minute)
- Sign in as editor
- Show what editor can/cannot do
- Demonstrate owner-only restrictions

### Webhook Trigger (1 minute)
- Trigger workflow via webhook
- Show it executes independently
- Explain token-based auth

### Security Demo (1 minute)
- Sign in as different org user
- Show cross-org isolation
- Explain security layers

### Conclusion (30 seconds)
- "That's the full workflow lifecycle"
- "Key features: multi-tenancy, approval gates, real-time updates, webhook triggers"
- "All with role-based security and quota management"

## Technical Notes for Demo

### Environment Variables
Ensure these are set before recording:
- `NEXT_PUBLIC_NHOST_SUBDOMAIN`
- `NEXT_PUBLIC_NHOST_REGION`
- `LLM_API_KEY`
- `LLM_MODEL`

### Browser Console
Keep console open to show:
- Subscription connection messages
- GraphQL requests/responses
- Any errors (should be none)

### Network Tab
Optionally show:
- WebSocket connection for subscriptions
- GraphQL mutations for actions
- Real-time data flow

## Expected Demo Duration

Total: ~8 minutes

- Setup: 1 min
- Workflow creation: 2 min
- Execution: 2 min
- RBAC: 1 min
- Webhook: 1 min
- Security: 1 min
