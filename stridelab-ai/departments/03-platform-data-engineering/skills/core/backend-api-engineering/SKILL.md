---
name: backend-api-engineering
description: Engineer StrideLab application services, APIs/RPC, validation, transactions, idempotency, jobs, worker contracts, and service boundaries from approved domain behavior. Not for database internals or authorization-policy ownership.
---

# Backend API Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Implement stable server-side use cases whose contracts preserve domain rules, security context, consistency, retries, and future bounded-context extraction.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- database schema tuning as the primary task
- defining role or tenant policy
- client interaction and visual behavior

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved domain model and workflow
- Architecture, authorization, validation, and consistency requirements
- Existing API contracts, code, tests, jobs, and worker interfaces

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed server implementation and executable tests
2. Accepted domain, architecture, authorization, and reliability artifacts
3. Current official framework/provider documentation for version-sensitive behavior

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Identify the use case, caller, active Team context, preconditions, domain invariants, side effects, and completion semantics.
2. Inspect existing application-service, API, transaction, job, and error conventions before introducing a new path.
3. Design a transport-independent application contract with typed inputs, outputs, errors, authorization context, and idempotency semantics.
4. Place domain decisions in the owning bounded context and coordinate cross-context effects through explicit contracts or events.
5. Define transaction boundary, concurrency behavior, retry safety, partial failure, job handoff, and terminal acknowledgement.
6. Implement validation at trust boundaries and retain server authority over timestamps, versions, ownership, and protected fields.
7. Test success, denial, duplicate, conflict, timeout, worker failure, and retry; record compatibility and downstream migration needs.

## Decision rules and StrideLab invariants

- Every mutation derives tenant and actor context from trusted authentication, not caller-supplied ownership fields.
- Idempotency keys identify one logical operation and yield stable terminal semantics.
- Transactions protect the smallest complete invariant, not an arbitrary repository method.
- Worker dispatch and worker completion are separate durable states.
- Bounded contexts communicate through explicit contracts that can later cross a process boundary.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/backend-api-implementation.md` with:

- Use case and domain contract
- API/RPC and error contract
- Validation and authorization context
- Transaction/idempotency/concurrency
- Jobs and worker boundaries
- Implementation changes
- Integration and failure evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Contract and integration tests prove retry safety, denial, concurrency, rollback, and stable error semantics.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `domain-modeling`, `workflow-architecture`.

Complementary skills, loaded only when relevant and actually available: `backend-data-engineering`, `software-architecture`, `vercel:vercel-functions`, `vercel:workflow`, `vercel:vercel-queues`.

Consumed artifacts:

- domain model
- workflow specification
- architecture decisions
- authorization requirements

Produced artifacts:

- application-service implementation
- API/RPC contract
- job/worker contract
- integration evidence

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- An accepted workflow lacks enforceable domain semantics
- A cross-context transaction requires an architectural decision
- External credentials or irreversible production operations are required

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- controller owns domain policy
- caller supplies tenant identity
- retry creates duplicate side effects
- background job treated as completed work
- distributed monolith boundary

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
