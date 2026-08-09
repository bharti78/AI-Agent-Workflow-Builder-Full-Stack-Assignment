-- =========================================================================
-- AI Agent Workflow Builder — Initial Schema
-- =========================================================================
-- Notes:
--   * We rely on Nhost's built-in `auth.users` table for identity.
--   * All org-scoped tables carry an `org_id` (directly or transitively)
--     so Hasura permission rules can join back to `org_members` and
--     verify `X-Hasura-User-Id` is actually a member of that org.
--   * Enums are implemented as CHECK constraints (text) rather than
--     native Postgres ENUM types, so Hasura Action handlers and the
--     frontend can treat them as plain strings without migration pain
--     when new values are added later.
-- =========================================================================

create extension if not exists "pgcrypto";

-- -------------------------------------------------------------------------
-- organizations
-- -------------------------------------------------------------------------
create table public.organizations (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null,
  quota_allowed       integer not null default 100,
  quota_used          integer not null default 0,
  quota_period_start  timestamptz not null default date_trunc('month', now()),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.organizations is 'Tenant boundary. Every protected resource traces back to exactly one organization.';

-- -------------------------------------------------------------------------
-- org_members
-- -------------------------------------------------------------------------
create table public.org_members (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references public.organizations(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  role        text not null check (role in ('owner', 'editor', 'viewer')),
  created_at  timestamptz not null default now(),
  unique (org_id, user_id)
);

create index idx_org_members_user_id on public.org_members(user_id);
create index idx_org_members_org_id on public.org_members(org_id);

comment on table public.org_members is 'Layer-1 authorization source of truth: (org_id, user_id) -> role.';

-- -------------------------------------------------------------------------
-- workflows
-- -------------------------------------------------------------------------
create table public.workflows (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid not null references public.organizations(id) on delete cascade,
  name         text not null,
  description  text,
  active       boolean not null default true,
  created_by   uuid not null references auth.users(id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index idx_workflows_org_id on public.workflows(org_id);

-- -------------------------------------------------------------------------
-- workflow_steps
-- -------------------------------------------------------------------------
create table public.workflow_steps (
  id            uuid primary key default gen_random_uuid(),
  workflow_id   uuid not null references public.workflows(id) on delete cascade,
  step_order    integer not null,
  name          text not null,
  type          text not null check (type in (
                  'llm_call', 'http_request', 'db_write',
                  'notify', 'conditional_branch', 'approval_gate'
                )),
  config        jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (workflow_id, step_order)
);

create index idx_workflow_steps_workflow_id on public.workflow_steps(workflow_id);

-- -------------------------------------------------------------------------
-- workflow_triggers
-- -------------------------------------------------------------------------
create table public.workflow_triggers (
  id            uuid primary key default gen_random_uuid(),
  workflow_id   uuid not null references public.workflows(id) on delete cascade,
  trigger_type  text not null check (trigger_type in (
                  'manual', 'webhook', 'scheduled', 'database_event'
                )),
  config        jsonb not null default '{}'::jsonb,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

create index idx_workflow_triggers_workflow_id on public.workflow_triggers(workflow_id);

-- Webhook triggers need to be looked up by a secret/public token without
-- knowing the workflow_id up front. We store that token inside `config`
-- (config->>'token') and index it for fast lookup by the webhook handler.
create index idx_workflow_triggers_webhook_token
  on public.workflow_triggers (((config ->> 'token')))
  where trigger_type = 'webhook';

-- -------------------------------------------------------------------------
-- workflow_runs
-- -------------------------------------------------------------------------
create table public.workflow_runs (
  id            uuid primary key default gen_random_uuid(),
  workflow_id   uuid not null references public.workflows(id) on delete cascade,
  status        text not null check (status in (
                  'pending', 'running', 'paused', 'completed', 'failed'
                )),
  triggered_by  uuid references auth.users(id),
  trigger_type  text not null check (trigger_type in (
                  'manual', 'webhook', 'scheduled', 'database_event'
                )),
  started_at    timestamptz,
  completed_at  timestamptz,
  error         text,
  created_at    timestamptz not null default now()
);

create index idx_workflow_runs_workflow_id on public.workflow_runs(workflow_id);
create index idx_workflow_runs_status on public.workflow_runs(status);

-- -------------------------------------------------------------------------
-- step_runs
-- -------------------------------------------------------------------------
create table public.step_runs (
  id                 uuid primary key default gen_random_uuid(),
  workflow_run_id    uuid not null references public.workflow_runs(id) on delete cascade,
  workflow_step_id   uuid not null references public.workflow_steps(id) on delete cascade,
  status             text not null check (status in (
                       'pending', 'running', 'completed', 'failed', 'paused', 'skipped'
                     )),
  input              jsonb,
  output             jsonb,
  error              text,
  attempt_count      integer not null default 0,
  started_at         timestamptz,
  completed_at       timestamptz,
  approved_by        uuid references auth.users(id),
  approved_at        timestamptz,
  created_at         timestamptz not null default now()
);

create index idx_step_runs_workflow_run_id on public.step_runs(workflow_run_id);
create index idx_step_runs_status on public.step_runs(status);

-- -------------------------------------------------------------------------
-- workflow_results  (the ONLY table db_write steps are allowed to touch)
-- -------------------------------------------------------------------------
create table public.workflow_results (
  id                uuid primary key default gen_random_uuid(),
  workflow_run_id   uuid not null references public.workflow_runs(id) on delete cascade,
  workflow_id       uuid not null references public.workflows(id) on delete cascade,
  data              jsonb not null,
  created_at        timestamptz not null default now()
);

create index idx_workflow_results_workflow_run_id on public.workflow_results(workflow_run_id);
create index idx_workflow_results_workflow_id on public.workflow_results(workflow_id);

comment on table public.workflow_results is
  'db_write steps may ONLY insert here. No workflow config is ever interpreted as SQL.';

-- -------------------------------------------------------------------------
-- updated_at triggers
-- -------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_organizations_updated_at
  before update on public.organizations
  for each row execute function public.set_updated_at();

create trigger trg_workflows_updated_at
  before update on public.workflows
  for each row execute function public.set_updated_at();

create trigger trg_workflow_steps_updated_at
  before update on public.workflow_steps
  for each row execute function public.set_updated_at();

-- =========================================================================
-- Aggregation: organization monthly usage
-- =========================================================================
create view public.org_monthly_usage as
select
  o.id                                   as organization_id,
  o.quota_used                           as usage_this_month,
  o.quota_allowed                        as quota_allowed,
  greatest(o.quota_allowed - o.quota_used, 0) as remaining_quota,
  o.quota_period_start                   as period_start
from public.organizations o;

comment on view public.org_monthly_usage is
  'Exposed read-only through Hasura for the Usage widget: org_id, usage_this_month, quota_allowed, remaining_quota.';
