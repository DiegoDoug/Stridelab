---
name: internal-admin-support
description: Design and engineer StrideLab's least-privilege internal console and support workflows for Teams, accounts, billing, abuse, and privacy requests. Not a backdoor around product authorization.
---

# Internal Admin & Support

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Enable accountable support and operations while minimizing privileged access, sensitive-data exposure, irreversible actions, and harm to athletes or Teams.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- granting broad production access for convenience
- moderation or legal decisions without authorized policy owners
- customer-facing admin product features

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Support cases, operator roles, escalation policy, and service objectives
- Authorization, privacy, youth-safety, billing, audit, and data lifecycle requirements
- Actual operational systems, provider capabilities, and access mechanisms

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted support, security, privacy, safety, billing, and legal policies
2. Observed operational tools and audit evidence
3. Current provider/admin API documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inventory support jobs, case types, evidence needs, operator roles, actions, data sensitivity, frequency, and harm if misused.
2. Define least-privilege roles, just-in-time elevation, approval, reason capture, session controls, segregation of duties, and break-glass behavior.
3. Design case-centric workflows for Team/account access, membership, billing, abuse, privacy requests, export/deletion, and incident collaboration.
4. Minimize fields and default redaction; require purpose-specific reveal with audit for messages, youth data, media, tokens, and payment details.
5. Make consequential actions previewable, idempotent, reversible where possible, and confirmed with exact scope and downstream effects.
6. Implement or specify audit events, customer notification, evidence retention, rate limits, and anomaly detection.
7. Test wrong-Team lookup, unauthorized operator, expired elevation, malicious insider, mistaken action, rollback, and sensitive case handling.

## Decision rules and StrideLab invariants

- Internal access is a distinct, deny-by-default authorization domain.
- No universal support impersonation or service-role credential is exposed through the console.
- Every sensitive view or mutation records operator, case, reason, scope, time, and result.
- Youth-safety and legal cases restrict visibility and preserve evidence according to policy.
- Support cannot silently change athlete-owned profiles, security controls, or approved legal status.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/operations/internal-admin-support.md` with:

- Support jobs and case taxonomy
- Operator role/privilege model
- Data minimization and reveal controls
- Workflow/action contracts
- Audit/notification/evidence
- Implementation changes
- Misuse and recovery evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- End-to-end tests cover least privilege, JIT expiry, wrong-Team isolation, redaction/reveal, action preview, audit, rollback, and restricted safety/privacy cases.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `authorization-tenancy`, `privacy-data-governance`, `youth-safeguarding-trust-safety`, `billing-entitlements`.

Complementary skills, loaded only when relevant and actually available: `security-identity`, `production-operations`, `vercel:vercel-api`.

Consumed artifacts:

- support policies and cases
- authorization/privacy/safety/billing requirements
- operational APIs

Produced artifacts:

- support role model
- admin workflow/tool changes
- audit requirements
- support verification evidence

Upstream Departments:

- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 06 Business Operations & Governance

Downstream Departments:

- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A support action requires production access or irreversible mutation beyond granted authority
- No human owner exists for abuse, privacy, billing, or legal escalation
- Provider limitations prevent least privilege or auditability

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- support superuser
- impersonate anyone
- search leaks other Teams
- raw media visible by default
- audit without case/reason
- manual database edit

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
