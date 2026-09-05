---
name: workflow-architecture
description: Specify StrideLab end-to-end workflows across actors, permissions, states, transitions, failures, recovery, offline operation, and exit conditions. Use before detailed interaction or implementation design.
---

# Workflow Architecture

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Turn product intent into complete behavioral paths that remain coherent across client, backend, media, authorization, and offline boundaries.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- pixel-level screens and gestures
- API or database implementation
- defining security policy without security-owner review

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Accepted product outcome
- Relevant actors and domain concepts
- Known policy, platform, offline, and failure constraints

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted product and domain artifacts
2. Observed current workflow behavior
3. Approved authorization, privacy, safety, and platform requirements when available

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Name the user goal, initiating actor, affected actors, preconditions, and completion signal.
2. Describe the happy path as state transitions, not merely a screen sequence.
3. Attach permission checks, ownership rules, and audience changes to the exact transition where they matter.
4. Add alternate, empty, denied, cancellation, retry, conflict, timeout, partial-success, and resume paths.
5. Model offline creation, local confirmation, background transfer, reconciliation, and user-visible recovery separately.
6. Define notifications, audit events, and cross-context handoffs without choosing transport prematurely.
7. Walk the workflow from every affected role and verify that every branch has a safe exit condition.

## Decision rules and StrideLab invariants

- Event Coach management scope and Team-wide communication scope are not conflated.
- Recording, tagging, explicit sharing, Vault visibility, and Team publication are separate transitions.
- Offline success is not represented as server durability until reconciliation succeeds.
- A destructive transition identifies authority, confirmation, reversibility, and downstream effects.
- Every failure branch ends in retry, recovery, rollback, escalation, or an honest terminal state.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/product/workflow-architecture.md` with:

- Goal, actors, and preconditions
- State and transition model
- Permission checkpoints
- Happy and alternate paths
- Failure and recovery
- Offline behavior
- Events, handoffs, and exit conditions

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- State-machine walkthroughs cover each canonical role and at least one denied and one interrupted path.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `product-strategy`, `domain-modeling`.

Complementary skills, loaded only when relevant and actually available: `evidence-based-ui-ux`, `software-architecture`, `security-identity`.

Consumed artifacts:

- product contract
- domain model
- policy requirements

Produced artifacts:

- workflow specification
- state model
- recovery contract
- permission checkpoints

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A permission is unresolved or contradictory
- A workflow could expose youth or media data to the wrong audience
- Offline and server outcomes cannot be reconciled without a product decision

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- happy-path-only flow
- screens used as states
- tagging used as implicit sharing
- retry without idempotency or user-visible status

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
