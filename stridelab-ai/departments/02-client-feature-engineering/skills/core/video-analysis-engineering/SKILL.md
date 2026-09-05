---
name: video-analysis-engineering
description: Engineer StrideLab frame-accurate scrubbing, markers, drawings, Pencil input, clips, comparisons, overlays, timestamp persistence, analysis projects, and export. Not for capture/upload pipeline or product permission policy.
---

# Video Analysis Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Implement analysis interactions whose visual, temporal, and exported results remain stable across devices, playback sessions, edits, and offline reconciliation.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- camera capture and file-transfer ownership
- authorization or sharing policy decisions
- general-purpose video editing unrelated to coaching analysis

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved analysis workflow and interaction specification
- Media asset/timebase contract and target device matrix
- Persistence, export, sharing, and accessibility requirements

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed playback and rendering behavior on target devices
2. Current Apple media/drawing APIs and selected player framework documentation
3. Accepted domain, interaction, media, persistence, and authorization contracts

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define timebase, frame identity, precision guarantees, variable-frame-rate handling, and acceptable fallback before implementing controls.
2. Map AnalysisProject, source asset, marker, annotation, clip, comparison, overlay, and export identities and lifecycles.
3. Implement scrubbing, stepping, seeking, playback-rate, zoom, and selection behavior against measured player behavior.
4. Persist drawings in a stable coordinate space with transform, orientation, viewport, timestamp/range, author, and version context.
5. Keep nondestructive edits and source media separate; make clip boundaries and export precision explicit.
6. Support Pencil/touch/pointer/keyboard and accessible alternatives without gesture ambiguity.
7. Verify golden frames, annotation round trips, comparisons, offline edits, conflicts, exports, and device performance.

## Decision rules and StrideLab invariants

- Frame-accurate means a documented guarantee against a known timebase, not a UI label.
- Stored annotations survive viewport, orientation, and device changes without drift.
- Source media remains immutable; analysis edits are versioned domain data.
- Clip boundaries preserve provenance to the source asset and analysis project.
- Export and share never exceed the caller's approved audience or source rights.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/video-analysis-implementation.md` with:

- Precision and timebase contract
- Analysis object model
- Control and input behavior
- Annotation coordinate/persistence model
- Clip/comparison/export behavior
- Performance and accessibility
- Golden-fixture and device evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Golden media and frame fixtures demonstrate seek/step tolerance, annotation round-trip accuracy, export boundaries, and cross-device transforms.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `media-engineering`, `interaction-design`, `accessibility-design`.

Complementary skills, loaded only when relevant and actually available: `client-engineering`, `software-architecture`.

Consumed artifacts:

- analysis workflow
- media/timebase contract
- interaction and accessibility specifications
- persistence contract

Produced artifacts:

- analysis client changes
- precision contract
- annotation model
- golden-fixture evidence

Upstream Departments:

- 01 Product & Experience
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 03 Platform & Data Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Target codecs or devices cannot meet the required precision
- A drawing or export format loses required semantics
- The workflow requires sharing authority not present in accepted policy

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- milliseconds equated with frames
- screen pixels stored without transform context
- destructive edits to source
- player callbacks accepted without measurement

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
