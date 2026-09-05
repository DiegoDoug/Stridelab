---
name: information-architecture
description: Design StrideLab content hierarchy, destinations, object discovery, cross-linking, navigation foundations, search models, and platform-specific information density. Not for interaction microstates or visual styling.
---

# Information Architecture

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Make StrideLab objects findable and comprehensible across iPhone, iPad, and web without confusing organizational hierarchy, time hierarchy, ownership, or audience.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- gesture behavior and component states
- colors, typography, and visual composition
- backend search implementation or ranking algorithms

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Accepted domain model and workflows
- Target platforms and primary tasks
- Content inventory and user-role needs

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted product, domain, and workflow artifacts
2. User research and content evidence
3. Current Apple platform guidance for native navigation claims

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inventory destinations, objects, actions, metadata, and relationships by actor and task frequency.
2. Separate organization hierarchy, training-time hierarchy, media/analysis hierarchy, and personal history.
3. Define primary, secondary, contextual, and search-based discovery paths for each important object.
4. Choose platform-appropriate navigation structures while preserving conceptual continuity across iPhone, iPad, and web.
5. Specify labels, object titles, breadcrumbs or context markers, deep links, and return behavior.
6. Define search/filter facets and empty discovery models at the information level; hand ranking implementation downstream.
7. Run findability and backtracking walkthroughs for Head Coach, Event Coach, and Athlete.

## Decision rules and StrideLab invariants

- Team/Event Group/Subgroup and Season/Block/Week/Session remain distinguishable hierarchies.
- Vault discovery communicates why an item is visible: tag, explicit share, or ownership.
- The same label does not represent different object types without explicit context.
- iPhone depth and iPad/web density may differ without changing domain meaning.
- Destructive or administrative actions are not placed where discovery implies ordinary content navigation.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/product/information-architecture.md` with:

- Content and object inventory
- Hierarchy model
- Destination map
- Navigation by platform
- Discovery and cross-linking
- Search/filter model
- Findability validation and open issues

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Representative users can locate, identify, open, cross-reference, and return from each critical object.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `domain-modeling`, `workflow-architecture`.

Complementary skills, loaded only when relevant and actually available: `evidence-based-ui-ux`.

Consumed artifacts:

- domain model
- workflow specification
- research findings

Produced artifacts:

- information architecture
- destination map
- navigation foundation
- discovery model

Upstream Departments:

- 01 Product & Experience

Downstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Two bounded contexts expose incompatible labels or ownership
- A platform layout cannot preserve a required relationship
- Navigation implies access the authorization model does not grant

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- department structure mirrored into navigation
- one navigation shell forced on all form factors
- search used to hide missing hierarchy
- Vault treated as a Team-wide feed

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
