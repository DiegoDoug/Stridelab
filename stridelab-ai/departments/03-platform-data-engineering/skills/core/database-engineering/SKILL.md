---
name: database-engineering
description: Engineer StrideLab PostgreSQL schemas, constraints, indexes, migrations, queries, and transaction correctness. Consume authorization requirements but do not redefine role, ownership, or tenant policy.
---

# Database Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Create a persistence model that makes accepted domain invariants enforceable, migrations reversible or recoverable, and critical queries correct and measurable.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- owning authorization semantics
- modeling product meaning solely from tables
- choosing client state or interaction behavior

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved domain and API contracts
- Authorization/RLS requirements and data lifecycle rules
- Current schema, migrations, queries, data volumes, and database version

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed schema, migration, query plan, and database test evidence
2. Accepted domain, API, authorization, privacy, and reliability artifacts
3. Current PostgreSQL and selected platform documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inspect the complete migration chain, extensions, functions, triggers, constraints, policies, representative data, and query plans.
2. Translate domain identity, relationships, lifecycle, uniqueness, versioning, tombstones, and provenance into database-enforced invariants.
3. Design keys and constraints before indexes; design indexes from measured query shapes and selectivity.
4. Define transaction isolation, locking or optimistic concurrency, retry behavior, and server-authoritative metadata.
5. Write forward migration, compatibility/backfill plan, validation queries, rollback or recovery plan, and deployment ordering.
6. Implement authorization requirements supplied by authorization-tenancy as RLS/grants without inventing policy semantics.
7. Run migration, constraint, RLS allow/deny, concurrency, query-plan, and rollback/restore tests against representative data.

## Decision rules and StrideLab invariants

- Schema constraints backstop domain invariants that must survive every write path.
- Tenant isolation is deny-by-default on every exposed relation and storage metadata surface.
- Server-maintained timestamps, versions, and ownership fields cannot be forged by ordinary clients.
- Soft deletion and tombstones preserve sync semantics until all required consumers can reconcile.
- A migration is not complete without compatibility, data-validation, and recovery evidence.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/database-implementation.md` with:

- Data and query evidence
- Schema and invariant mapping
- Constraints/indexes
- Transactions and concurrency
- Migration/backfill/recovery
- RLS implementation trace
- Database validation evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Fresh, upgrade, downgrade/recovery, allow/deny, concurrency, and representative query-plan tests pass on the target PostgreSQL version.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `domain-modeling`, `backend-api-engineering`.

Complementary skills, loaded only when relevant and actually available: `backend-data-engineering`, `security-identity`, `vercel:vercel-storage`.

Consumed artifacts:

- domain and API contracts
- authorization/RLS requirements
- data lifecycle and query workload

Produced artifacts:

- database migrations
- constraints and indexes
- query implementation
- database correctness evidence

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 03 Platform & Data Engineering
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Authorization semantics are absent or contradictory
- A migration can destroy or reinterpret production data without approved recovery
- Required performance cannot be demonstrated with representative scale

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- application-only invariant
- index added without query evidence
- RLS policy invented from UI
- destructive migration without backfill and recovery
- timestamp-only pagination with collisions

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
