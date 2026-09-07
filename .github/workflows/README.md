# CI Workflows

Broader application CI (build, unit/integration tests, deploy) will be added by
Department 05 after CI requirements are approved.

## Present workflows

| Workflow | Scope | Owner |
|---|---|---|
| `workflow-architecture-validation.yml` | Documentation-phase structural verification for the Workflow Architecture (Phase 01). Runs `npm ci --ignore-scripts` then `npm run ai:validate` — the same entry point developers use — which executes the AI-system, orchestration, routing, and workflow-architecture validators. Triggered on pull requests (and pushes to `main`) touching the workflow-architecture documents, `stridelab-ai/orchestration/**`, `stridelab-ai/scripts/**`, `package.json`, or `package-lock.json`. Read-only (`permissions: contents: read`); no build or deploy. | Added in the Phase 01 v2 finalization pass; scope limited to documentation verification. Broader CI remains Department 05's. |

The `validate` job is the status check intended to be marked **required** in `main` branch protection.
