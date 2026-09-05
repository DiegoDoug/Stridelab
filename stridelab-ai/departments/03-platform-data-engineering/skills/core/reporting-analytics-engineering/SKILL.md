---
name: reporting-analytics-engineering
description: Engineer StrideLab operational and athlete/team reports, aggregations, longitudinal queries, analytics events, exports, and derived metrics with correctness and provenance. Not for product KPI selection alone.
---

# Reporting & Analytics Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Produce reproducible performance and operational insights whose definitions, source records, authorization, freshness, and export behavior are explicit.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- selecting product success metrics without product ownership
- visual dashboard styling
- billing cost forecasting

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved report questions and metric definitions
- Source domain records, authorization, privacy, and correction semantics
- Freshness, scale, export, retention, and accuracy requirements

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Canonical source records and executable derivation tests
2. Accepted domain, product, authorization, privacy, and reporting definitions
3. Current statistical or provider standards only when explicitly adopted

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define each report audience, decision, eligible cohort, grain, time window, dimensions, filters, and freshness expectation.
2. Write metric contracts with formula, source fields, inclusion/exclusion, unit normalization, missing-data behavior, correction behavior, and version.
3. Choose transactional query, view, materialization, event pipeline, or batch derivation based on correctness and latency needs.
4. Preserve lineage from displayed/exported value to source records and derivation version.
5. Apply row/object authorization and privacy minimization before aggregation; define small-cohort or youth-sensitive protections.
6. Implement idempotent events and reproducible backfills; distinguish event time, ingestion time, and correction time.
7. Validate golden facts, boundary dates, units, nulls, duplicates, corrections, exports, scale, and access denial.

## Decision rules and StrideLab invariants

- Prescription never counts as performed work.
- Every derived metric is versioned and traceable to canonical source records.
- Aggregation does not bypass object or cohort privacy rules.
- Exports use the same definitions and authorization snapshot as the report or state their differences.
- Unknown, zero, not-applicable, and missing remain distinct.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/reporting-analytics.md` with:

- Report audiences and decisions
- Metric dictionary
- Lineage and derivation architecture
- Authorization/privacy
- Events/backfills/freshness
- Export contract
- Golden-fact and scale evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Golden-fact tests recompute production logic and verify units, time boundaries, corrections, cohort privacy, and export parity.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `database-engineering`, `backend-api-engineering`, `domain-modeling`, `workout-performance-engineering`.

Complementary skills, loaded only when relevant and actually available: `backend-data-engineering`, `vercel:observability`.

Consumed artifacts:

- report requirements
- canonical domain records
- metric definitions
- authorization/privacy rules

Produced artifacts:

- reporting queries/services
- metric dictionary
- analytics event schema
- golden-fact evidence

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Metric definitions are ambiguous or politically contested
- Source data cannot support the promised accuracy
- A report creates re-identification or youth privacy risk

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- dashboard value without metric contract
- event count used as canonical domain fact
- zero substituted for missing
- aggregate bypasses authorization
- cached PB without source provenance

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
