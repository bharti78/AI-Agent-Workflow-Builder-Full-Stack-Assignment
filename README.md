# AI Agent Workflow Builder

A mini n8n-style workflow builder for chaining AI-agent steps (LLM calls, HTTP
requests, controlled DB writes, notifications, conditional branches, and
human-in-the-loop approval gates), built on Next.js + Nhost + Hasura +
PostgreSQL.

> **Status:** Work in progress, built phase-by-phase. This README is a stub
> and will be filled out fully in the README/write-up phase once every
> phase has been implemented and tested.

## Phases completed so far

- [x] Phase 1 — Database schema + migrations (deployed & verified on Nhost Cloud)
- [x] Phase 2 — Hasura relationships & Layer-1/Layer-2 row permissions (deployed & verified on Nhost Cloud)
- [x] Phase 3 — Nhost authentication (verified: sign-up, sign-in, sign-out, live JWT round-trip to Hasura all working)
- [x] Phase 4 — Organization and role permissions (org creation, invites, member management)
- [ ] Phase 5 — Workflow CRUD
- [ ] Phase 6 — Workflow runner
- [ ] Phase 7 — `triggerWorkflowRun` Action
- [ ] Phase 8 — LLM + HTTP steps
- [ ] Phase 9 — Conditional branching
- [ ] Phase 10 — Approval pause/resume
- [ ] Phase 11 — GraphQL subscriptions
- [ ] Phase 12 — Webhook trigger
- [ ] Phase 13 — Frontend workflow builder
- [ ] Phase 14 — Usage/quota
- [ ] Phase 15 — Cross-org security testing
- [ ] Phase 16 — Deployment
- [ ] Phase 17 — README + write-up + demo recording

## Repo structure

```text
ai-workflow-builder/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── graphql/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── backend/
│   ├── actions/
│   └── workflow-runner/
├── nhost/
│   ├── functions/
│   │   └── organizations/   (create, invite, members — Phase 4)
│   ├── migrations/
│   ├── metadata/
│   └── config.yaml
├── README.md
└── .env.example
```
