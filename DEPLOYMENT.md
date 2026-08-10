# Deployment Guide

## Backend (Nhost Cloud)

The backend is already deployed on Nhost Cloud since Phase 1. To verify:

1. Check Nhost Dashboard → Deployments tab
2. Verify all migrations and metadata are applied
3. Verify Actions are registered:
   - `approveStep`
   - `triggerWorkflowRun`
4. Verify Functions are deployed:
   - `actions/approve-step.ts`
   - `actions/trigger-workflow-run.ts`
   - `webhooks/trigger.ts`

### Required Nhost Secrets

Set these in Nhost Dashboard → Settings → Secrets:

- `LLM_API_KEY`: API key for your LLM provider (Groq, OpenRouter, or Gemini)
- `LLM_MODEL`: Model identifier (e.g., `llama3-70b-8192`, `gemini-1.5-flash`)

## Frontend (Vercel)

### Prerequisites

1. Push code to GitHub repository
2. Create Vercel account
3. Connect Vercel to GitHub

### Deployment Steps

1. **Import Project in Vercel**
   - Click "Add New" → "Project"
   - Import from GitHub: `bharti78/AI-Agent-Workflow-Builder-Full-Stack-Assignment`
   - Select `frontend/` as root directory

2. **Configure Environment Variables**
   In Vercel project settings → Environment Variables:
   - `NEXT_PUBLIC_NHOST_SUBDOMAIN`: Your Nhost subdomain (e.g., `rlixouktdanijepxxoqm`)
   - `NEXT_PUBLIC_NHOST_REGION`: Your Nhost region (e.g., `ap-south-1`)

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Note the deployed URL

### Post-Deployment Verification

After deployment, verify on the hosted URL (not localhost):

1. **Auth Flow**
   - Sign up new user
   - Sign in
   - Sign out
   - Verify JWT round-trip works

2. **GraphQL Operations**
   - Create organization
   - Create workflow
   - Add steps
   - Verify all mutations work

3. **Live Subscription**
   - Run a workflow with multiple steps
   - Verify status badges update in real-time without page refresh
   - Check browser console for "Subscription client connected"

4. **Run Button**
   - Verify Run button is hidden for `viewer` role
   - Verify Run button works for `owner` and `editor` roles

5. **Approval Gate**
   - Create workflow with approval_gate step
   - Run workflow - should pause at approval
   - Approve as owner/editor - should resume
   - Verify viewer cannot approve

6. **Webhook Trigger**
   - Create webhook trigger with token
   - Test webhook endpoint: `POST https://<subdomain>.functions.<region>.nhost.run/v1/webhooks/trigger?token=<token>`
   - Verify workflow executes

### CORS Configuration

Currently, Nhost Functions use `Access-Control-Allow-Origin: *`. After frontend deployment:

1. Update CORS headers in all Nhost Functions to use the deployed frontend origin:
   ```typescript
   res.setHeader("Access-Control-Allow-Origin", "https://your-frontend.vercel.app");
   ```

2. Files to update:
   - `nhost/functions/actions/approve-step.ts`
   - `nhost/functions/actions/trigger-workflow-run.ts`
   - `nhost/functions/webhooks/trigger.ts`
   - `nhost/functions/organizations/*.ts`

3. Redeploy functions via Nhost (push to git or use Nhost dashboard)

## Troubleshooting

### Subscription Not Connecting

- Check browser console for WebSocket errors
- Verify `NEXT_PUBLIC_NHOST_SUBDOMAIN` and `NEXT_PUBLIC_NHOST_REGION` are correct
- Ensure Hasura GraphQL endpoint is accessible

### Actions Returning 404

- Verify Action metadata is deployed in Nhost Dashboard
- Check Action handler URL in `actions.yaml` matches deployed function URL
- Verify function is deployed and accessible

### Webhook Not Working

- Verify webhook trigger is `active: true`
- Check token matches exactly
- Verify workflow is `active: true`
- Check Nhost function logs for errors
