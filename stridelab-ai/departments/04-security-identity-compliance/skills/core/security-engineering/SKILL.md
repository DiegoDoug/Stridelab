---
name: security-engineering
description: Threat-model, implement, and validate StrideLab secure architecture, secrets, encryption, API security, rate limiting, abuse controls, dependency risk, vulnerabilities, and incident requirements. Not a generic style review.
---

# Security Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Reduce exploitable risk to athlete, youth, Team, media, identity, and operational assets across client, API, database, storage, workers, realtime, and internal tooling.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- final legal interpretation
- unscoped intrusive testing
- silent redesign of product or authorization rules

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Assets, actors, data classes, trust boundaries, interfaces, and deployment model
- Authorization, identity, privacy, youth-safety, and availability requirements
- Repository, dependency, configuration, and runtime evidence

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed code, configuration, dependency, and runtime evidence
2. Accepted security, architecture, privacy, and authorization requirements
3. Current primary standards and official vendor advisories/documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inventory sensitive assets and map trust boundaries, data flows, entry points, privileged paths, and attacker goals.
2. Model threats and abuse cases by likelihood, preconditions, blast radius, detectability, and impact, prioritizing youth/media/tenant risks.
3. Map preventive, detective, and recovery controls to each material threat and identify control ownership.
4. Inspect authentication, authorization, validation, secrets, cryptography, transport, storage, dependency, upload, worker, and internal-admin implementation.
5. Implement authorized fixes with least privilege, secure defaults, key/secret separation, rate limits, and auditable failure behavior.
6. Verify controls through code/config review and safe tests; use non-production or explicitly authorized targets for active testing.
7. Record residual risk, accepted exceptions requiring human authority, monitoring requirements, and incident handoffs.

## Decision rules and StrideLab invariants

- No client-accessible secret or service-role credential can bypass tenant controls.
- Untrusted media, annotations, messages, URLs, and exports are validated at every trust boundary.
- Encryption claims identify scope, key owner, rotation, backup, and failure behavior.
- Security exceptions require named human approval, expiry, compensating controls, and review.
- AI never weakens authorization or performs intrusive external testing without explicit permission.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/security/security-engineering.md` with:

- Scope/assets/trust boundaries
- Threat and abuse model
- Control map
- Implementation findings/changes
- Verification evidence
- Residual risks and exceptions
- Monitoring and incident requirements

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Every high-risk threat has verified prevention/detection/recovery evidence or an explicit unaccepted residual risk.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `authorization-tenancy`, `identity-account-lifecycle`, `backend-api-engineering`.

Complementary skills, loaded only when relevant and actually available: `security-identity`, `vercel:vercel-firewall`, `vercel:investigation-mode`.

Consumed artifacts:

- architecture and data flows
- authorization/identity model
- privacy/youth requirements
- repository/runtime evidence

Produced artifacts:

- threat model
- security requirements and changes
- control evidence
- residual-risk register

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering

Downstream Departments:

- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Intrusive testing, production access, or secret rotation requires new authority
- A high-risk vulnerability lacks a safe bounded fix
- A stakeholder requests an unapproved security exception

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- checklist without threat model
- encryption stated without key lifecycle
- security by client hiding
- severity based only on CVSS
- secret copied into artifacts

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
