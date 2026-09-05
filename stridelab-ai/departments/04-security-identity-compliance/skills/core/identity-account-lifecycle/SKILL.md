---
name: identity-account-lifecycle
description: Engineer StrideLab signup, login, age declaration, invitations, Team membership/switching, recovery, export, deletion, removal, and multi-Team identity. Not for resource authorization semantics or UI styling.
---

# Identity & Account Lifecycle

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Create an auditable identity and membership lifecycle that keeps person identity, account, authentication session, Team membership, role, and active-Team context distinct.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- object-level access policy ownership
- billing customer lifecycle
- visual design of auth screens

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Identity, age, invitation, membership, and deletion requirements
- Authorization decision model and Team-role rules
- Current identity provider, client, backend, privacy, and audit architecture

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed identity-provider configuration and end-to-end behavior
2. Accepted authorization, privacy, legal, youth, and product requirements
3. Current official identity-provider and platform documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Model person, account, credential/provider identity, session, age declaration, invitation, Team membership, role, active Team, and recovery factors separately.
2. Define signup/login/verification, declared-age boundary, invitation issuance/expiry/claim, first-Team creation, and Team switching.
3. Derive active Team server-side or bind it cryptographically; make cross-Team role changes explicit.
4. Define recovery, email/phone change, reauthentication, session rotation/revocation, device loss, and provider-linking behavior.
5. Define membership removal versus account deletion, data export, legal holds, ownership transfer, anonymization, and delayed deletion workflows.
6. Implement idempotent lifecycle transitions with audit events and safe user-visible recovery.
7. Test invitation races, reuse, wrong account, role conflict, stale session, multi-Team switch, removal, recovery takeover attempts, export, and deletion.

## Decision rules and StrideLab invariants

- Role belongs to a Team membership, never to the global account.
- The same account may hold different roles across Teams but not multiple roles in one Team.
- Age declaration and 13+ eligibility are recorded without collecting unnecessary birth data.
- Membership removal does not silently delete the underlying account or unrelated Team data.
- Recovery and sensitive account changes require fresh, risk-appropriate proof.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/security/identity-account-lifecycle.md` with:

- Identity and membership model
- Signup/login/age flow
- Invitation and Team switching
- Recovery and sensitive changes
- Removal/export/deletion
- Audit and security controls
- End-to-end lifecycle evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- End-to-end tests cover multi-Team identity, invitation abuse, session revocation, recovery, removal, export, deletion, and retained-data explanations.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `authorization-tenancy`, `workflow-architecture`.

Complementary skills, loaded only when relevant and actually available: `security-identity`.

Consumed artifacts:

- identity requirements
- authorization model
- privacy/deletion rules
- Team lifecycle

Produced artifacts:

- identity lifecycle model
- auth/membership implementation
- deletion/export workflow
- lifecycle evidence

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A youth-age flow or consent requirement is legally unresolved
- Account deletion conflicts with Team ownership or retention obligations
- Identity-provider behavior cannot satisfy required isolation or recovery assurance

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- global role claim
- client-selected Team trusted
- invitation equals authorization forever
- membership removal equals account deletion
- recovery bypasses recent authentication

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
