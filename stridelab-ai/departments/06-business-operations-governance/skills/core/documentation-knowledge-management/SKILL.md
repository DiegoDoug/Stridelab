---
name: documentation-knowledge-management
description: Govern StrideLab authoritative knowledge, ADRs, decisions, requirements, issues, releases, reviews, verification evidence, current state, source hierarchy, and synchronization. Not a generic note dump.
---

# Documentation & Knowledge Management

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Keep project truth traceable, current, non-duplicative, and usable by humans and AI without promoting discussion or hypotheses into approved decisions.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- making domain decisions on behalf of owners
- copying entire conversations into canonical records
- maintaining competing sources of truth

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- New evidence, decision, change, review, issue, release, or state update
- Existing canonical records and source-of-truth rules
- Record owner, status, provenance, and downstream consumers

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Approved decisions and signed-off artifacts
2. Observed repository/test/release evidence
3. Explicitly labeled discussion, proposals, and hypotheses as non-authoritative inputs

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Identify what actually changed: decision, requirement, ADR, issue, milestone, review, evidence, current state, or nothing durable.
2. Resolve the canonical record before writing; update it instead of creating a duplicate or parallel summary.
3. Preserve provenance, owner, date, status, supersession, related records, affected artifacts, and evidence links.
4. Separate approved, proposed, rejected, superseded, observed, assumed, and unresolved content.
5. Propagate a change only to dependent summaries/indexes whose contract requires it; do not rewrite unrelated records.
6. Check contradictions, stale current-state claims, broken links, orphan requirements, and evidence attached to the wrong version.
7. Report records created/updated, decisions still needed, and material content intentionally not persisted.

## Decision rules and StrideLab invariants

- Discussion, suggestion, and hypothesis never become approved decisions without explicit authority.
- One subject has one canonical record plus links, not copied truth in many places.
- Superseded decisions remain in history and point to their successor.
- Verification evidence identifies the exact code/artifact/environment it supports.
- Canonical knowledge contains no secrets, unnecessary personal data, or unverifiable completion claims.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/project/current-state.md and the affected canonical records` with:

- Change classification
- Canonical records affected
- Provenance and ownership
- Decision/status updates
- Traceability/evidence links
- Conflicts and unresolved items
- Synchronization summary

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- No duplicate canonical record, silent status promotion, broken trace, stale current state, or unversioned verification claim remains.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `product-strategy`.

Complementary skills, loaded only when relevant and actually available: `notion:notion-knowledge-capture`, `notion:notion-research-documentation`, `notion:notion-spec-to-implementation`, `vercel:geistdocs`.

Consumed artifacts:

- approved decisions
- requirements and issues
- repository/review/release evidence
- current-state changes

Produced artifacts:

- canonical record updates
- traceability links
- current project state
- synchronization report

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

Downstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Two records claim canonical authority
- A status or decision owner is ambiguous
- Updating one record would silently reinterpret an accepted decision

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- conversation dump
- new summary instead of update
- proposal marked accepted
- evidence detached from commit/version
- secrets in knowledge base

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
