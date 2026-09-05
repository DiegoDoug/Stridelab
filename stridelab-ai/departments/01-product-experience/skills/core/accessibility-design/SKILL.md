---
name: accessibility-design
description: Define and review StrideLab accessibility behavior for VoiceOver, Dynamic Type, contrast, reduced motion, touch targets, keyboard, Pencil, alternative inputs, and accessible media controls. Not a visual-polish pass.
---

# Accessibility Design

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Ensure critical coaching, media-analysis, communication, and workout tasks are perceivable, operable, understandable, and robust across supported devices and abilities.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- generic visual critique with no accessibility question
- declaring WCAG or HIG conformance from static specs alone
- rewriting product policy or authorization

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Target users, platforms, tasks, and supported input methods
- Interaction and visual artifacts or implemented surfaces
- Media behavior and known accessibility requirements

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Current WCAG/WAI guidance and Apple accessibility/HIG documentation
2. Accepted interaction and visual specifications
3. Device and assistive-technology test evidence

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Identify critical tasks and the sensory, motor, cognitive, and situational barriers each surface may create.
2. Define semantic structure, labels, values, hints, reading/focus order, announcements, and rotor or grouping behavior.
3. Specify Dynamic Type, reflow, contrast, non-color cues, target size, focus visibility, reduced motion, and timeout behavior.
4. Design keyboard, switch, pointer, Pencil, and gesture alternatives appropriate to iPhone, iPad, and web.
5. Specify accessible playback, scrubbing, timestamps, annotation descriptions, captions/transcripts, and audio-control alternatives.
6. Test representative tasks with automated checks plus real VoiceOver, keyboard, text-size, contrast, and reduced-motion behavior.
7. Classify defects by blocked task and user impact; hand fixes to interaction, visual, client, or media owners.

## Decision rules and StrideLab invariants

- Every critical gesture and drag operation has a non-gesture alternative.
- Frame position, playback state, markers, and sharing state are exposed semantically.
- Dynamic Type does not hide actions or force two-dimensional scrolling for primary content unless the task requires it.
- Motion-dependent meaning has a reduced-motion equivalent.
- Conformance claims require traceable criteria and observed test evidence.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/design/accessibility-requirements.md` with:

- Critical tasks and user barriers
- Semantic and focus specification
- Visual and motion requirements
- Alternative input behavior
- Accessible media requirements
- Test matrix and evidence
- Defects, owners, and residual risk

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- At least one complete critical journey is exercised with VoiceOver, keyboard or alternative input, maximum text size, reduced motion, and denied/error states as relevant.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `interaction-design`, `visual-ui-design`.

Complementary skills, loaded only when relevant and actually available: `evidence-based-ui-ux`.

Consumed artifacts:

- interaction specification
- visual system
- implemented UI
- media behavior

Produced artifacts:

- accessibility requirements
- assistive-technology behavior
- test matrix
- accessibility findings

Upstream Departments:

- 01 Product & Experience

Downstream Departments:

- 02 Client & Feature Engineering
- 05 Quality, Infrastructure & Release
- 04 Security, Identity & Compliance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A critical task cannot be made accessible without changing accepted interaction or architecture
- A conformance target or supported platform is undefined
- Required device or assistive-technology evidence cannot be obtained

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- automated score treated as conformance
- labels copied from visual text without state
- color-only status
- canvas annotations with no semantic alternative

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
