---
name: cost-engineering
description: Model and optimize StrideLab unit economics across video storage, egress, transcoding, database, realtime, compute, and plan tiers using current provider pricing and explicit workload assumptions.
---

# Cost Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Make product and architecture cost tradeoffs visible per Team, athlete, video, analysis, message, report, and subscription tier before they become operational surprises.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- price-setting without product strategy
- cost cuts that silently weaken quality, security, privacy, or durability
- static estimates using stale provider prices

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Workload units, adoption scenarios, retention, quality, geographic, and growth assumptions
- Architecture/provider topology and current pricing terms
- Free/Mid/Top value, limits, margins, and business guardrails

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Current official provider pricing/calculators and contracts
2. Measured production or benchmark usage where available
3. Accepted product, architecture, retention, reliability, and tier assumptions

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define cost units and workload drivers: captured minutes, stored GB-months, derivatives, egress, transcode minutes, active users, queries, realtime events, notifications, support, and backups.
2. Record provider region, tier, included usage, unit price, minimums, free allowances, taxes/fees exclusions, effective date, and source.
3. Build low/base/high scenarios with formulas and explicit adoption, retention, retry, failure, and peak assumptions.
4. Allocate shared and marginal costs to Team/athlete/video/tier while separating cash cost from accounting or labor assumptions.
5. Run sensitivity and break-even analysis to identify dominant drivers and thresholds.
6. Propose optimizations with quantified savings and product, quality, privacy, durability, latency, and engineering tradeoffs.
7. Define budgets, alerts, forecast update triggers, and evidence needed to replace assumptions with measurements.

## Decision rules and StrideLab invariants

- Every price input includes source and as-of date.
- Database backup and object-media backup costs are modeled separately.
- Retries, failed uploads, derivative storage, CDN/egress, and deletion lag are included where material.
- Free/Mid/Top economics distinguish plan limits from expected actual usage.
- Optimization cannot reduce a safety, security, privacy, or recovery requirement without owner approval.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/business/cost-engineering.md` with:

- Scope/as-of/source register
- Cost units and workload model
- Low/base/high forecast
- Tier/unit economics
- Sensitivity and break-even
- Optimization options/tradeoffs
- Budgets, alerts, and update triggers

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Formulas reconcile to scenario totals, unit dimensions are consistent, dominant assumptions receive sensitivity tests, and current pricing sources are linked.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `billing-entitlements`, `media-engineering`, `infrastructure-devops`.

Complementary skills, loaded only when relevant and actually available: `vercel:observability`, `vercel:vercel-storage`, `vercel:marketplace`.

Consumed artifacts:

- workload assumptions
- provider topology/pricing
- tier limits
- retention and SLO requirements

Produced artifacts:

- cost model
- unit economics
- forecast and sensitivities
- optimization/budget recommendations

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release

Downstream Departments:

- 01 Product & Experience
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Provider pricing, contracts, or architecture are unavailable
- A product-quality or retention tradeoff is required
- A financial commitment or pricing decision needs human authority

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- monthly total without units
- free tier treated as permanent
- storage only, no egress/processing
- single forecast
- cost optimization weakens retention or isolation

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
