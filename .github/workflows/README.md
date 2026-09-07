# CI Workflows

Broader application CI (build, unit/integration tests, deploy) will be added by
Department 05 after CI requirements are approved.

## Present workflows

### `workflow-architecture-validation.yml`

Documentation-phase structural verification for the Workflow Architecture (Phase 01).

- **Runs:** `npm ci --ignore-scripts` then `npm run ai:validate` — the same entry
  point developers use — which executes the AI-system, orchestration, routing, and
  workflow-architecture validators.
- **Triggers on** pull requests (and pushes to `main`) that touch any of:
  `docs/product/**`, `stridelab-ai/knowledge/workflows/**`,
  `stridelab-ai/application-map/**`, `stridelab-ai/registry/**`,
  `stridelab-ai/project-memory/current-state/**`, `stridelab-ai/orchestration/**`,
  `stridelab-ai/scripts/**`, `package.json`, `package-lock.json`, or this workflow
  file itself. Also runnable via `workflow_dispatch`.
- **Hardening:** `permissions: contents: read`; no build or deploy; third-party
  actions pinned to full commit SHAs; `npm ci --ignore-scripts`.
- **Owner:** added in the Phase 01 v2 finalization pass; scope limited to
  documentation verification. Broader CI remains Department 05's.

The `validate` job is the status check marked **required** in `main` branch
protection (PR required, strict check, `enforce_admins: true`).
