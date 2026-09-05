---
name: domain-modeling
description: Model StrideLab concepts, terminology, ownership, relationships, invariants, boundaries, and lifecycle semantics. Use for product meaning and ubiquitous language; not for PostgreSQL schema or storage design.
---

# Domain Modeling

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Create a stable semantic model that lets product, design, engineering, security, and operations mean the same thing when they discuss StrideLab objects and rules.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- database tables, indexes, migrations, or ORM models
- screen navigation or visual hierarchy
- inventing authorization implementation

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Accepted product scope and actors
- Known StrideLab terms and business rules
- Representative workflows or scenarios

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted product strategy and domain decisions
2. Stakeholder language and observed product behavior
3. Implementation evidence only as evidence of existing semantics, not automatic authority

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Build a terminology inventory and identify synonyms, collisions, overloaded words, and missing concepts.
2. Model entities, value concepts, policies, events, and services at the product-semantic level.
3. Define identity, ownership, membership, containment, assignment, sharing, and tagging relationships explicitly.
4. State lifecycle states, allowed transitions, invariants, and deletion or archival meaning for each material concept.
5. Map concepts to bounded contexts and identify translation points without mirroring Department boundaries.
6. Test the model against coach, athlete, multi-Team, offline, media-sharing, and personal-workout scenarios.
7. Record ambiguity and route storage, UX, authorization enforcement, or billing implementation to the owning skills.

## Decision rules and StrideLab invariants

- Team contains Event Groups; Event Groups may contain Subgroups; Athlete membership and assignment remain distinguishable.
- A Session can participate in planning, execution, and analysis without those records becoming the same concept.
- Prescription and performed workout record remain distinct.
- Tagging a person and sharing an artifact are different semantics.
- The model describes meaning independently of table shape or client component structure.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/product/domain-model.md` with:

- Ubiquitous language glossary
- Concept catalog and ownership
- Relationship model
- Invariants
- Lifecycle and events
- Bounded-context map
- Ambiguities and decision requests

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Every important workflow can be narrated using the glossary without semantic contradiction.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `product-strategy`.

Complementary skills, loaded only when relevant and actually available: `software-architecture`.

Consumed artifacts:

- product contract
- workflow evidence
- accepted terminology

Produced artifacts:

- domain glossary
- concept model
- lifecycle semantics
- bounded-context inputs

Upstream Departments:

- 01 Product & Experience

Downstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Two accepted artifacts assign incompatible meaning or ownership
- A term cannot be resolved without changing product scope
- A lifecycle rule has legal or safety consequences that lack an owner

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- ER diagram presented as the domain model
- one Team role reused across all Teams
- tagging treated as publication
- Session, workout plan, and performed workout collapsed together

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
