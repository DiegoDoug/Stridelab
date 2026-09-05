---
name: ios-ipados-engineering
description: Implement or validate StrideLab's React Native/Expo iPhone and iPad client, native Swift interop, lifecycle, permissions, platform APIs, device behavior, and native-module boundaries. Not for backend or media-domain ownership.
---

# iOS & iPadOS Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Deliver reliable Apple-client behavior that composes approved product, interaction, visual, accessibility, media, offline, and security contracts.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- defining media algorithms or analysis semantics
- changing product, UX, visual, or authorization decisions
- assuming Expo Go supports required native behavior

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved client-facing requirements and interaction states
- Current repository, Expo/React Native versions, and supported iOS/iPadOS matrix
- Native capability, permission, offline, and security contracts

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed repository and device behavior
2. Current official Expo, React Native, Apple SDK, and App Store documentation
3. Accepted architecture, interaction, visual, accessibility, and security artifacts

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inspect the actual dependency graph, app configuration, build mode, native projects, tests, and device support before selecting an implementation path.
2. Map each requirement to JavaScript/TypeScript, Expo module, config plugin, prebuild, or native Swift ownership.
3. Define lifecycle, backgrounding, interruption, permission, memory-pressure, orientation, multitasking, and restoration behavior.
4. Implement the smallest vertical slice using established boundaries and platform-native semantics.
5. Keep native bridges typed, asynchronous, cancellable where needed, and explicit about thread, file, and lifecycle ownership.
6. Verify iPhone and iPad behavior on representative simulators and physical devices for hardware-sensitive paths.
7. Record changed files, validation evidence, platform limitations, and downstream release or compliance needs.

## Decision rules and StrideLab invariants

- Native code is introduced only for a measured capability, performance, or platform gap.
- Camera, microphone, photo-library, notification, and file access have purpose-specific permission and denial behavior.
- iPad multitasking, pointer/keyboard, and size-class behavior are intentional where supported.
- UI state does not claim durable cloud success before offline/sync contracts confirm it.
- Version-sensitive guidance is verified against the repository and current official documentation.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/ios-ipados-implementation.md` with:

- Scope and accepted contracts
- Platform and version evidence
- Client/native boundary
- Lifecycle and permission behavior
- Implementation changes
- Device test matrix
- Limitations and handoffs

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Typecheck, unit/integration tests, native builds, and representative device journeys validate the changed boundary.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `interaction-design`, `visual-ui-design`, `accessibility-design`.

Complementary skills, loaded only when relevant and actually available: `client-engineering`, `software-architecture`.

Consumed artifacts:

- client requirements
- interaction and visual specifications
- accessibility requirements
- platform architecture

Produced artifacts:

- iOS/iPadOS code changes
- native-module contract
- device validation evidence
- platform implementation record

Upstream Departments:

- 01 Product & Experience
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A native entitlement, capability, signing asset, or physical device is unavailable
- The requested behavior conflicts with current Apple or App Store requirements
- A native-module choice changes approved architecture materially

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- Expo Go used as production capability proof
- untyped native bridge
- permission requested before user intent
- iPhone layout stretched onto iPad

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
