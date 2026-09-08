# Project Current State

This directory holds the durable, machine- and human-readable record of what
StrideLab's current approved/awaiting-approval project state actually is, per
`stridelab-ai/agents/project-memory-manager.md`. It is authoritative over
historical discussion, chat transcripts, or superseded artifacts.

**This directory did not exist prior to the Workflow Architecture v1 dry run
(2026-09-05).** It was initialized as part of that work package. In the v2
correction pass (2026-09-06), `stridelab-ai/registry/` and
`stridelab-ai/application-map/` were created (finding F-20); Department
routing continues via `stridelab-ai/orchestration/routing/` while the new
registry indexes artifacts and their owners. See
`workflow-architecture-v2.md` and `docs/product/workflow-architecture.md`.

## Convention

One file per tracked artifact/initiative, named for the artifact. Each file
states:
- current status (`PROPOSED` / `AWAITING_HUMAN_APPROVAL` / `APPROVED` / `SUPERSEDED`
  — the registry vocabulary; older records may read `AWAITING APPROVAL`);
- work completed;
- review results and gate statuses;
- blockers;
- open questions requiring human input;
- source artifact references (never copy artifact content here).

## Index

| Artifact | Status | File |
|---|---|---|
| StrideLab Workflow Architecture v2 (canonical: `docs/product/workflow-architecture.md`) | `APPROVED` (G7 granted by Diego, 2026-09-07; §9.2 items are accepted downstream conditions) | `workflow-architecture-v2.md` |
| StrideLab Governed Product Baseline (canonical: `docs/product/product-baseline.md`) | `AWAITING_HUMAN_APPROVAL` (separate human decision; the 2026-09-07 G7 approved Workflow Architecture v2 only; §6 carries the `OQ-BE-TIER-STRUCTURE` D06 condition) | `product-baseline.md` |

The v1 record was renamed to v2 in the 2026-09-06 correction pass (the file was
never committed; version history is preserved in the v2 documents).
