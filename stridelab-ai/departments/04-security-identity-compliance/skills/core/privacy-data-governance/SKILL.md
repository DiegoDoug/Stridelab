---
name: privacy-data-governance
description: Define and validate StrideLab data classification, minimization, flows, retention, deletion, consent, DSARs, vendors, and media privacy boundaries. Not for final legal advice or generic database design.
---

# Privacy & Data Governance

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Make personal, youth, biometric-adjacent, performance, communication, and media data collection and lifecycle necessary, explainable, enforceable, and auditable.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- final legal determinations
- authorization implementation alone
- retaining data merely because storage is available

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Data inventory, actors, purposes, flows, processors, and jurisdictions
- Product, authorization, identity, retention, deletion, and youth requirements
- Actual schemas, storage, logs, analytics, exports, backups, and vendor behavior

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed data flows and provider contracts/configuration
2. Accepted product, legal, security, and youth-safety requirements
3. Current statutes, regulator guidance, and official platform privacy documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inventory every personal-data category, subject, source, purpose, lawful/approved basis input, sensitivity, location, recipient, and processor.
2. Map collection-to-deletion flows across device, API, database, object storage, workers, analytics, logs, exports, notifications, backups, and support tools.
3. Challenge necessity and granularity; prefer on-device processing, derived data, short retention, and privacy-safe defaults where compatible with accepted goals.
4. Define audience and purpose boundaries for raw video, audio, frames, drawings, tags, findings, messages, athlete profiles, and performance data.
5. Specify consent/notice, access, correction, export, deletion, retention, legal hold, processor, and breach-response requirements.
6. Translate policy into testable product, API, database, storage, logging, analytics, and support controls.
7. Verify flows against implementation and record gaps, owners, deadlines, jurisdictional questions, and counsel needs.

## Decision rules and StrideLab invariants

- Tagging, sharing, messaging, analytics, and model processing each require an explicit purpose and audience.
- Deletion covers derivatives, indexes, caches, queues, exports, logs, and backup policy—not only the primary row.
- Support and internal tools collect and expose the minimum necessary data.
- Vendor access and retention are documented before sensitive data is sent.
- A privacy requirement is distinguished from a legal conclusion unless qualified counsel approved it.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/privacy/privacy-data-governance.md` with:

- Data inventory and classification
- Purpose and data-flow map
- Minimization decisions
- Media/audience boundaries
- Retention/deletion/DSAR
- Vendor and transfer inventory
- Control verification and legal questions

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Trace representative data from collection through sharing, processing, support, export, deletion, and backup disposition.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `domain-modeling`, `authorization-tenancy`, `security-engineering`.

Complementary skills, loaded only when relevant and actually available: `security-identity`, `deep-research-work:deep-research`.

Consumed artifacts:

- data inventory
- data flows
- authorization and identity model
- legal/youth requirements
- vendor contracts

Produced artifacts:

- data classification
- flow map
- retention/deletion requirements
- DSAR and vendor controls

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering

Downstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Purpose, jurisdiction, consent, or retention basis is legally unresolved
- A vendor cannot meet deletion or youth-data requirements
- A requested feature materially expands sensitive-data use without product and legal approval

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- collect now, decide later
- privacy policy as sole control
- delete primary row only
- Team-wide media assumption
- analytics event with unnecessary identifiers

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
