---
name: offline-local-first-engineering
description: Engineer StrideLab SQLite persistence, durable outbox, push/pull sync, cursors, retries, conflicts, tombstones, reconciliation, and offline/online equivalence. Not for generic caching or product conflict-policy invention.
---

# Offline & Local-First Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Make critical capture, analysis, planning, and workout tasks durable offline and convergent online without hiding uncertainty or losing user work.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- ephemeral UI cache alone
- inventing business conflict winners
- network transport tuning without local durability semantics

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Offline-capable workflows and explicit conflict policy
- Local and server data models, identity, version, and deletion semantics
- Transport, authentication, background-execution, and storage constraints

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed client/server sync implementation and cross-run tests
2. Accepted workflow, domain, API, database, and authorization contracts
3. Current SQLite, platform background-task, and transport documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define offline promises per workflow: what can start, complete locally, remain pending, be viewed, or require connectivity.
2. Map local identity, server identity, operation identity, causal/version metadata, tombstones, and cursor ordering.
3. Design atomic local writes and a durable outbox whose dispatched operations remain immutable until terminal acknowledgement.
4. Define push ordering, idempotency, retries, backoff, auth expiry, transport failure, partial batches, and crash recovery.
5. Define pull cursor, deterministic ordering, pagination, tombstone retention, replay, and full reconciliation.
6. Implement per-domain conflict behavior from approved policy; preserve both sides or escalate when automatic resolution is unsafe.
7. Run multi-client, cross-run, interruption, clock-skew, duplicate, conflict, deletion, reinstall, and long-offline simulations.

## Decision rules and StrideLab invariants

- One logical mutation keeps one stable operation ID across retries.
- Dispatched operations are immutable until applied, duplicate, conflict, or another explicit terminal result.
- Pull ordering uses a total cursor such as updated_at plus stable ID, not timestamp alone.
- Transport error never implies the server did not apply the operation.
- User-visible state distinguishes local durability, queued sync, server confirmation, and conflict.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/offline-local-first.md` with:

- Offline capability matrix
- Local model and identities
- Outbox/push protocol
- Pull cursor and tombstones
- Conflict/reconciliation policy
- User-visible sync states
- Cross-run and failure evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Cross-run tests execute production sync logic against golden facts and compare client/server results directly.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `backend-api-engineering`, `database-engineering`, `workflow-architecture`.

Complementary skills, loaded only when relevant and actually available: `backend-data-engineering`, `client-engineering`.

Consumed artifacts:

- offline workflow contract
- domain conflict policy
- API/database versioning and tombstone semantics

Produced artifacts:

- local schema and sync engine
- outbox protocol
- conflict/reconciliation contract
- cross-run evidence

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A domain conflict policy is undefined
- Background or storage limits prevent an accepted offline promise
- Deletion/tombstone retention cannot guarantee convergence

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- last-write-wins by accident
- new operation ID on retry
- pending row mutated after dispatch
- network response treated as sole durability
- static constants used instead of production sync logic

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
