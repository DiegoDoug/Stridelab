# CI Workflows

Broader application CI (build, unit/integration tests, deploy) will be added by
Department 05 after CI requirements are approved.

## Present workflows

| Workflow | Scope | Owner |
|---|---|---|
| `workflow-architecture-validation.yml` | Documentation-phase structural verification for the Workflow Architecture (Phase 01): runs `stridelab-ai/scripts/validate-workflow-architecture.mjs` plus the existing AI-system / orchestration / routing validators on pull requests that touch the workflow-architecture documents. Read-only; no build or deploy. | Added in the Phase 01 v2 finalization pass (2026-09-07); scope limited to documentation verification. |
