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
- current status (`PROPOSED` / `AWAITING APPROVAL` / `APPROVED` / `SUPERSEDED`);
- work completed;
- review results and gate statuses;
- blockers;
- open questions requiring human input;
- source artifact references (never copy artifact content here).

## Index

| Artifact | Status | File |
|---|---|---|
| StrideLab Governed Product Baseline (`docs/product/product-baseline.md`) | `APPROVED` (G7 granted by Diego, 2026-09-08; §6 tier structure + identified commercial/legal/policy/implementation-design items are accepted downstream conditions) | `product-baseline.md` |
| StrideLab Workflow Architecture v2 (canonical: `docs/product/workflow-architecture.md`) | `APPROVED` (G7 granted by Diego, 2026-09-07; §9.2 items are accepted downstream conditions) | `workflow-architecture-v2.md` |

The v1 record was renamed to v2 in the 2026-09-06 correction pass (the file was
never committed; version history is preserved in the v2 documents).
