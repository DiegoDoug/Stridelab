---
name: workout-performance-engineering
description: Engineer prescribed workout execution, athlete logging, personal workouts, sets/reps/load/time/distance, effort, history, PBs, and performance views while separating prescription from performed record.
---

# Workout & Performance Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Implement low-friction workout execution and trustworthy performance history whose records remain correct under edits, offline use, unit differences, and personal-workout policy.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- coach training-cycle planning
- analytics/reporting infrastructure beyond feature-level views
- deciding personal-workout authorization policy

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved workout and performance domain semantics
- Execution/logging flows and personal-workout policy
- Units, offline, API, persistence, and reporting contracts

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted product/domain/workflow artifacts
2. Observed implementation, fixtures, and athlete-facing behavior
3. Current exercise/unit standards only when an external standard is explicitly adopted

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Map prescription, assignment, execution instance, exercise, superset, set, metric value, effort, note, and performed record identities.
2. Define start, resume, skip, substitute, add, edit, complete, abandon, reopen, and delete behavior with ownership and history effects.
3. Implement typed measurement and unit conversion without erasing entered precision or source units.
4. Apply the Team Creator's personal-workouts-allowed policy to create/edit/delete paths; athletes never gain cycle-planning authority.
5. Preserve immutable or auditable completion facts while allowing explicit corrections according to policy.
6. Derive PBs and history from performed records with documented qualification, tie, correction, and deletion rules.
7. Test long offline sessions, app restart, duplicate submission, conflict, unit conversion, partial completion, and plan changes after completion.

## Decision rules and StrideLab invariants

- Prescription and performed record never share mutable identity.
- A coach's later edit does not rewrite what the athlete actually performed.
- Effort dimensions such as RPE, RIR, and percentage are named and never silently converted as equivalents.
- PB calculations identify source record, metric, unit normalization, and qualification rule.
- Personal workout permissions are evaluated in the active Team context.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/workout-performance-implementation.md` with:

- Domain and policy contracts
- Execution state model
- Metric/unit model
- Personal-workout behavior
- History and PB derivation
- Implementation changes
- Offline and correctness evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Golden facts verify prescription/performance separation, unit normalization, PB derivation, corrections, deletion, and offline replay.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `domain-modeling`, `workflow-architecture`, `training-planning-engineering`, `ios-ipados-engineering`.

Complementary skills, loaded only when relevant and actually available: `client-engineering`, `backend-data-engineering`.

Consumed artifacts:

- workout domain model
- execution workflow
- personal-workout policy
- sync and persistence contracts

Produced artifacts:

- workout execution changes
- performed-record contract
- PB derivation rules
- golden correctness evidence

Upstream Departments:

- 01 Product & Experience
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 03 Platform & Data Engineering
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Workout metrics or correction policy are semantically undefined
- Personal-workout settings conflict across product and authorization artifacts
- Derived results cannot be reproduced from source records

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- completed log stored as mutable plan
- RPE and effort percent conflated
- floating-point equality used for unit-sensitive records
- PB cached without provenance

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
