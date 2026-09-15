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
| StrideLab Governed Product Baseline (canonical: `docs/product/product-baseline.md`) | `APPROVED` (G7 granted by Diego, 2026-09-08 — separate from the 2026-09-07 Workflow Architecture v2 G7; §6B tier structure + §8/§9.2 items are accepted downstream conditions) | `product-baseline.md` |
| StrideLab Consolidated Domain Model (canonical: `docs/product/domain-model.md`) | `APPROVED` (G7 granted by Diego, 2026-09-10; DR-1 APPROVED, DR-2 APPROVED AS-IS, DR-3 CONFIRMED; consolidation only — no `OQ-*`/`CD-*` item resolved) | `domain-model.md` |
| StrideLab MVP Feature Prioritization (canonical: `docs/product/feature-prioritization.md`) | `APPROVED` (G7 granted by Diego, 2026-09-10; approved version `9893c1d4dd0166fd0c55f1950e601e5f8737946c`; DR-A1…DR-A5 APPROVED; DR-A5 Option A selected; no `OQ-*`/`CD-*` item resolved) | `feature-prioritization.md` |
| StrideLab MVP Release Scope (canonical: `docs/product/mvp-release-scope.md`) | `APPROVED` (same joint Step-2 G7; implementation-design only, not legal/compliance, launch, or production-release authorization; zero open BLOCKING findings; no `OQ-*`/`CD-*` item resolved) | `mvp-release-scope.md` |
| StrideLab Information Architecture (canonical: `docs/product/information-architecture.md`) | `APPROVED` (G7 granted by Diego, 2026-09-15 — combined Steps 3-4 decision; approved version `ad8c45bddace1d5307f5ef492e563ee2814513fe`; no `OQ-*`/`CD-*` item resolved; Department 01 Step 3; Step 3 gate + combined cross-department review both PASS WITH CONDITIONS, zero open BLOCKING findings; no `OQ-*`/`CD-*` item resolved) | `information-architecture.md` |
| StrideLab Navigation Specification (canonical: `docs/product/navigation-specification.md`) | `APPROVED` (same joint Steps 3-4 G7; approved version `ad8c45bddace1d5307f5ef492e563ee2814513fe`; interaction-design and implementation-design only, not legal/compliance, launch, or production-release authorization; Department 01 Step 4; consumes the reviewed, version-pinned Information Architecture; combined cross-department review PASS WITH CONDITIONS, zero open BLOCKING findings; no `OQ-*`/`CD-*` item resolved) | `navigation-specification.md` |

The v1 record was renamed to v2 in the 2026-09-06 correction pass (the file was
never committed; version history is preserved in the v2 documents).
