---
name: training-planning-engineering
description: Engineer StrideLab Season → Block → Week → Session planning, templates, duplication, assignments, calendars, targeting, scheduling, and coach editing workflows. Not for athlete personal-workout policy or generic calendar infrastructure.
---

# Training Planning Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Implement coach-authored training plans that preserve hierarchy, assignment scope, schedule intent, revisions, and athlete-visible meaning.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- athlete workout execution and performance-record semantics
- defining authorization policy
- generic calendar UI without training-domain behavior

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved training hierarchy and coach workflows
- Assignment, role, scheduling, revision, and offline rules
- Client, API, database, and notification contracts

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted product/domain/workflow artifacts
2. Observed implementation and tests
3. Current platform/framework documentation where implementation depends on it

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Map Season, Block/Mesocycle, Week/Microcycle, Session/Training Day, template, assignment, and target semantics.
2. Define create, edit, reorder, duplicate, reschedule, publish/assign, unassign, archive, and revision behavior.
3. Preserve the distinction between reusable template, scheduled prescription, athlete assignment, and later performed record.
4. Apply Event Group/Subgroup targeting through accepted authorization contracts and preview the affected audience before mutation.
5. Implement calendar and hierarchy interactions with atomic or clearly partial bulk operations and recoverable errors.
6. Handle concurrent/offline edits, notification triggers, timezone/date boundaries, and historical revisions explicitly.
7. Test cross-level duplication, reassignment, denied scope, conflicts, athlete read-back, and schedule edge cases.

## Decision rules and StrideLab invariants

- Only coach-authorized workflows plan training cycles.
- Duplicating a plan creates new identity and preserves provenance; it does not alias mutable children.
- Editing a prescription never rewrites an athlete's completed performance record.
- Assignment scope is explicit and previewable.
- Date/time behavior defines locale, timezone, all-day meaning, and daylight-saving expectations.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/training-planning-implementation.md` with:

- Training concepts and contracts
- Hierarchy and revision behavior
- Template and duplication semantics
- Assignment and targeting
- Calendar/time behavior
- Implementation changes
- Scenario and integration evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Tests cover hierarchy integrity, deep duplication, audience scope, history preservation, conflicts, and time-boundary behavior.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `domain-modeling`, `workflow-architecture`, `interaction-design`, `ios-ipados-engineering`, `web-engineering`.

Complementary skills, loaded only when relevant and actually available: `client-engineering`, `backend-data-engineering`, `software-architecture`.

Consumed artifacts:

- training domain model
- planning workflow
- authorization matrix
- API and persistence contracts

Produced artifacts:

- training planning feature changes
- revision/duplication contract
- assignment evidence
- implementation record

Upstream Departments:

- 01 Product & Experience
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Product artifacts disagree on training hierarchy or editing authority
- Bulk assignment cannot be made atomic or safely resumable
- Historical prescriptions and performed records cannot remain distinguishable

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- shared mutable children after duplication
- completed log overwritten by plan edit
- Event Group inferred only from UI route
- timezone-naive calendar logic

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
