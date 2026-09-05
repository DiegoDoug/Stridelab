---
name: interaction-design
description: Design StrideLab user and task flows, controls, gestures, forms, feedback, and complete UI states for approved workflows. Not for product scope, visual language, or production implementation.
---

# Interaction Design

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Specify how users accomplish StrideLab tasks with clear feedback and recoverable behavior across touch, pointer, keyboard, Pencil, online, and offline conditions.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- deciding product scope or policy
- colors, typography, spacing system, or decorative treatment
- writing production UI code as the primary task

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Accepted workflow and information architecture
- Target platform, form factor, and input methods
- Permission, offline, accessibility, and data constraints

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted product, workflow, IA, and research artifacts
2. Observed implementation behavior when redesigning
3. Current Apple HIG and accessibility guidance for platform claims

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define the task goal, entry points, preconditions, user intent, and completion criteria.
2. Map the shortest safe primary flow, then add alternate and expert paths only where they reduce real effort.
3. Specify each control's action, availability, feedback, validation, cancellation, undo, and destructive confirmation behavior.
4. Define empty, loading, partial, success, error, denied, stale, syncing, offline, conflict, and resumed states.
5. Map touch, keyboard, pointer, Pencil, and assistive-technology interactions relevant to the surface.
6. Prototype or describe high-risk transitions and test them against user evidence and platform conventions.
7. Hand visual treatment to visual UI design and implementation mechanics to client engineering.

## Decision rules and StrideLab invariants

- The center create/start action does not obscure whether the user is planning, executing, recording, or analyzing.
- A local save, upload, processing step, and Team-visible share have distinct feedback.
- Permission denial explains the scope without exposing inaccessible objects or people.
- Destructive actions are deliberate, reversible when practical, and do not rely on color alone.
- Gesture-only actions have discoverable and accessible alternatives.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/design/interaction-specification.md` with:

- Task and entry conditions
- Flow model
- Control behavior
- State matrix
- Input-method behavior
- Errors and recovery
- Prototype evidence and handoff

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Every actionable state defines enabled, disabled, pending, completed, failed, cancelled, and restored behavior as applicable.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `workflow-architecture`, `information-architecture`.

Complementary skills, loaded only when relevant and actually available: `evidence-based-ui-ux`, `client-engineering`.

Consumed artifacts:

- workflow specification
- information architecture
- research findings
- policy requirements

Produced artifacts:

- interaction specification
- state matrix
- task flows
- prototype requirements

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A flow requires an unapproved product or permission change
- A platform constraint prevents accessible equivalent interaction
- Conflicting offline and server states lack a safe user-facing resolution

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- happy-path wireframes
- gesture without alternative
- spinner without state or recovery
- visual styling used to conceal ambiguous behavior

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
