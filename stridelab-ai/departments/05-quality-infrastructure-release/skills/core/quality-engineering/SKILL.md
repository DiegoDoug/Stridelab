---
name: quality-engineering
description: Build StrideLab requirement- and risk-traceable test strategy, acceptance criteria, unit/integration/E2E/device/regression evidence, defect classification, and quality gates. Not for redefining accepted requirements.
---

# Quality Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **EXTEND**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Provide the cheapest reliable evidence that critical StrideLab journeys and invariants work across domain, client, server, data, security, offline, media, and device boundaries.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- changing product requirements to make tests pass
- specialist implementation ownership
- equating green test count with release confidence

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Accepted requirements, risks, workflows, and specialist invariants
- Actual implementation changes and existing tests
- Target environments, devices, browsers, data, and release criteria

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted requirements and domain-owner contracts
2. Observed test/runtime/device/browser evidence
3. Current platform and testing-tool documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Build a risk inventory from critical user journeys, changed boundaries, data sensitivity, youth/media exposure, offline behavior, and failure modes.
2. Trace each material requirement and invariant to the cheapest test layer that can observe it reliably.
3. Define deterministic fixtures, environment needs, allow/deny cases, failure injection, device/browser matrix, and evidence retention.
4. Implement or improve tests without mocking away the boundary being claimed; use production logic for cross-run or golden-fact comparisons.
5. Execute focused suites first, then integration, E2E, device, accessibility, performance, security, migration, and regression gates as risk requires.
6. Classify defects by impact, likelihood, scope, recoverability, and release consequence; route implementation defects to owners.
7. Issue PASS, PASS WITH CONDITIONS, or FAIL with requirement coverage, evidence paths, residual risk, and explicit gate status.

## Decision rules and StrideLab invariants

- Every release-critical requirement has direct evidence or an explicit unaccepted gap.
- A mocked boundary cannot prove that boundary's integration.
- Allow paths and deny/failure/recovery paths receive symmetric attention for security- and offline-critical behavior.
- Rendered UI changes require visual and accessibility evidence, not typecheck alone.
- Quality may challenge upstream decisions with evidence but cannot silently rewrite them.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/quality/release-quality.md` with:

- Scope and risk inventory
- Requirements-to-evidence matrix
- Test architecture and fixtures
- Execution results and evidence
- Defects and owner routing
- Residual risk and conditions
- Quality status and gate recommendation

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- The evidence matrix covers critical journeys end-to-end and states what each test does and does not prove.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `product-strategy`, `workflow-architecture`.

Complementary skills, loaded only when relevant and actually available: `vercel:verification`, `vercel:agent-browser-verify`, `vercel:investigation-mode`.

Consumed artifacts:

- requirements and acceptance criteria
- specialist invariants
- implementation diff
- target matrix

Produced artifacts:

- test strategy
- traceability matrix
- test changes and evidence
- defect and gate assessment

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A critical requirement has no feasible evidence path
- Required hardware, environment, credentials, or data are unavailable
- Acceptance criteria conflict or a risk requires human waiver

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- coverage percentage as quality claim
- snapshot-heavy verification of behavior
- flaky retry until green
- mock server used as end-to-end proof
- quality owner changes scope

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
