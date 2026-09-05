---
name: product-strategy
description: Define or validate StrideLab users, value, outcomes, release scope, priorities, tier hypotheses, roadmaps, and success measures. Use for product decisions; not for UX detail, visual styling, or technical architecture.
---

# Product Strategy

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **EXTEND**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Own the decision-ready product contract: why StrideLab should exist, who it serves, what outcome a release must create, and which work is deliberately excluded.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- screen flows, interaction states, or visual language
- technology, schema, API, or deployment choices
- turning an unapproved idea into committed scope

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- User or stakeholder objective
- Target user evidence or a labeled user hypothesis
- Business, schedule, safety, and platform constraints

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted StrideLab decisions and requirements
2. Direct user, coach, athlete, market, and product evidence
3. Current primary market or platform evidence when an external fact affects scope

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inventory existing product artifacts and classify each relevant element as accepted fact, evidence-backed inference, hypothesis, or unresolved decision.
2. Define primary actors and jobs without collapsing Head Coach, Event Coach, and Athlete into one generic user.
3. Write the problem, value proposition, goals, non-goals, and observable release outcomes before proposing features.
4. Prioritize capabilities by user value, risk reduction, dependency order, and evidence strength; expose tradeoffs instead of hiding them in a feature list.
5. Treat Free, Mid, and Top as commercial hypotheses until their value, limits, and unit economics are approved.
6. Define leading and lagging success measures with owner, event or data source, time window, and decision threshold.
7. Produce the product contract and route interaction, technical, security, legal, and pricing implementation questions to their owners.

## Decision rules and StrideLab invariants

- Product requirements describe outcomes and constraints; solution details appear only when indispensable to the outcome.
- Age 13+, privacy, offline use, role scope, and media sensitivity are product constraints, not optional polish.
- A roadmap separates committed, candidate, and excluded work.
- A metric without a decision it informs is not a success criterion.
- No hypothesis becomes an approved product decision without human authority.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/product/product-strategy.md` with:

- Vision, problem, users, and jobs
- Evidence and confidence
- Goals, non-goals, and release scope
- Priorities and roadmap
- Tier hypotheses
- Numbered requirements and success measures
- Risks, assumptions, dependencies, and open decisions

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Each requirement is observable, prioritized, non-contradictory, and traceable to a user need or constraint.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: none.

Complementary skills, loaded only when relevant and actually available: `deep-research-work:deep-research`.

Consumed artifacts:

- user intent
- market or user evidence
- existing product decisions

Produced artifacts:

- product contract
- release scope
- prioritized roadmap
- success-measure specification

Upstream Departments:

None.

Downstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Stakeholders assert mutually exclusive product goals
- No defensible target user or outcome can be established
- A legal, safety, or commercial interpretation would materially change the release

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- feature inventory without problem or priority
- solution-shaped requirements
- vanity metrics
- silently treating tier ideas as approved pricing

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
