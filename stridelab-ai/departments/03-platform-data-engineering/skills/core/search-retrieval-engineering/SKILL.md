---
name: search-retrieval-engineering
description: Engineer authorization-aware StrideLab search, indexing, filtering, sorting, pagination, ranking, and structured retrieval. Not for information architecture or policy semantics.
---

# Search & Retrieval Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Return relevant, explainable StrideLab objects without existence leakage, unstable pagination, stale authorization, or ranking that obscures user intent.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- navigation and discovery strategy
- defining who is allowed to access an object
- generic AI retrieval without StrideLab objects

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Search use cases, object model, and relevance expectations
- Authorization/visibility rules and data lifecycle
- Scale, latency, freshness, language, filtering, and pagination requirements

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed query/index behavior and representative corpus evidence
2. Accepted IA, domain, authorization, privacy, and API artifacts
3. Current database/search-provider documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define search intents, eligible object types, fields, filters, sort modes, result metadata, and zero-result recovery.
2. Apply authorization eligibility before ranking and prevent counts, facets, suggestions, snippets, and timing from leaking inaccessible objects.
3. Choose lexical, structured, semantic, or hybrid retrieval from measured needs; document freshness and indexing boundaries.
4. Design normalized query behavior, stable total ordering, cursor pagination, deduplication, and deleted/stale result handling.
5. Define ranking features, tie-breakers, explainability, evaluation set, and relevance metrics for each major intent.
6. Implement indexing/update/rebuild paths with idempotency, backfill, monitoring, and failure recovery.
7. Evaluate relevance, isolation, pagination, latency, freshness, empty queries, misspellings, and adversarial enumeration.

## Decision rules and StrideLab invariants

- Authorization eligibility precedes ranking and snippet generation.
- Pagination ordering is total, stable, and cursor-based for mutable result sets.
- Search does not reveal inaccessible names, tags, counts, membership, or media metadata.
- Ranking changes have a versioned evaluation set and measurable acceptance criterion.
- Index deletion and permission revocation have documented freshness bounds.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/search-retrieval.md` with:

- Search intents and object eligibility
- Authorization and leakage controls
- Index/query architecture
- Filters/sorts/pagination
- Ranking and evaluation
- Freshness/rebuild/recovery
- Security, relevance, and performance evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- A representative evaluation corpus proves allow/deny isolation, stable pagination, deletion freshness, relevance thresholds, and latency budgets.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `backend-api-engineering`, `database-engineering`, `information-architecture`.

Complementary skills, loaded only when relevant and actually available: `backend-data-engineering`, `security-identity`, `vercel:marketplace`.

Consumed artifacts:

- search/IA model
- domain objects
- authorization requirements
- representative query corpus

Produced artifacts:

- retrieval contract
- indexes and query implementation
- relevance evaluation
- isolation evidence

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Authorization-aware retrieval cannot be enforced by the selected engine
- Relevance goals or evaluation data are undefined
- Index freshness violates deletion or safety requirements

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- filtering unauthorized hits after retrieval
- offset pagination on mutable feeds
- ranking tuned without labeled queries
- autocomplete leaks athlete names
- search compensates for broken IA

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
