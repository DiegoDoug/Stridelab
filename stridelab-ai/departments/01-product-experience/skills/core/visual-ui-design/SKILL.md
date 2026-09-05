---
name: visual-ui-design
description: Translate approved StrideLab product, IA, and interaction artifacts into an authored visual system and high-fidelity iPhone, iPad, or web design. Not for user research, flow ownership, or production frontend implementation alone.
---

# Visual UI Design

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **EXTEND**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Create a coherent StrideLab visual language whose hierarchy, density, components, and responsive behavior serve coaching, video analysis, and workout tasks rather than a generic fitness aesthetic.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- changing product scope, IA, or behavior silently
- low-fidelity workflow discovery as the primary task
- claiming implementation or accessibility compliance without rendered evidence

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved product purpose, IA, and interaction behavior
- Target platform, form factor, and realistic content
- Brand, accessibility, environmental, and implementation constraints

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted StrideLab design inputs and Design Memory
2. Rendered product evidence and current component implementation
3. Current Apple HIG/WCAG and official platform documentation for compliance claims

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Write a one-line Design Read naming the product, audience, task, intended qualities, outcome, and anti-qualities.
2. Rank design pressures and calibrate familiarity, density, expression, and motion for the exact surface.
3. When direction is open, compare at least two coherent visual theses; select one signature move and one restraint rule.
4. Choose and state the platform system and compliance level: native, adapted, inspired, or custom.
5. Define semantic tokens and a unified system for composition, hierarchy, type, color, spacing, surfaces, iconography, imagery, motion, and states.
6. Map the system to realistic StrideLab screens on the requested form factors without inventing workflow changes.
7. Render, inspect, correct the highest-impact hierarchy, rhythm, contrast, clipping, and generic-template defects, then render again.
8. Persist only accepted reusable rules into the canonical Design Memory.

## Decision rules and StrideLab invariants

- Video remains visually primary in analysis; controls and drawings preserve frame legibility.
- Dense iPad/web coaching surfaces and focused iPhone logging surfaces may differ while sharing tokens and object meaning.
- Role, ownership, share state, sync state, and destructive state never rely on color alone.
- A visual artifact request is not complete with Markdown alone when a rendering surface is available.
- Platform compliance claims match observed behavior and current official guidance.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/design/visual-ui-design.md` with:

- Design Context and Design Read
- Pressures and selected thesis
- Platform system and compliance level
- Semantic tokens and visual rules
- Components and state treatments
- Responsive mappings
- Rendered evidence, critique, and Design Memory changes

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- A critique-and-correction pass verifies focal point, hierarchy, rhythm, contrast, realistic content, state coverage, and product-specific character.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `information-architecture`, `interaction-design`.

Complementary skills, loaded only when relevant and actually available: `evidence-based-ui-ux`.

Consumed artifacts:

- product contract
- information architecture
- interaction specification
- brand and accessibility constraints

Produced artifacts:

- visual system
- semantic tokens
- component and state specification
- rendered design evidence
- Design Memory update

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- An accepted flow conflicts with platform or accessibility constraints
- Brand direction is materially underdetermined and alternatives would diverge
- No rendering capability exists for a requested visual artifact

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- generic fitness dashboard
- neomorphism that destroys contrast or affordance
- same density on iPhone and iPad
- style references treated as evidence
- first-draft delivery

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
