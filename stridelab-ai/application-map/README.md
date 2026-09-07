# StrideLab Application Map

Minimum bounded-context map for the Workflow Architecture v2. Created in the v2 correction pass to close independent-review finding **F-20** (root `CLAUDE.md` step 5 requires this to exist before any task that modifies application code).

This map records **ownership and cross-context contract seams only**. It does **not** invent application code paths — it maps bounded contexts to the `domains/*` directories that already exist in the repository, and names the public contract seams the Workflow Architecture implies. Contract *shapes* (schemas, transport) are produced by Departments 02/03 at implementation-design time.

## Contents

| File | Purpose |
|---|---|
| `bounded-contexts.md` | Bounded context → `domains/*` directory → owning Department → workflow IDs. |
| `cross-context-contracts.md` | The **fourteen** public cross-context contract seams (owner, consumer, authorization checkpoint, failure behaviour, idempotency/replay, audit, minimization, deferred choices) and their downstream consumers. This is the **authoritative contract matrix** referenced by the G2 review. |

## Authoritative upstream

- Product baseline: `docs/product/product-baseline.md`
- Workflow Architecture v2 (canonical): `docs/product/workflow-architecture.md`
- Supporting spec: `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md`
- Architecture constraint: `ARCHITECTURE.md` (domain-driven modular monolith; cross-domain access via public contracts)
