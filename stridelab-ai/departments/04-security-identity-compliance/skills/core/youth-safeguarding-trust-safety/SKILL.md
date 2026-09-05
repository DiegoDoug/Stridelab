---
name: youth-safeguarding-trust-safety
description: Design and validate StrideLab age-13+ safeguards, coach-athlete communication safety, reporting, blocking, moderation, escalation, anti-grooming controls, UGC safety, and auditability. Not generic community management.
---

# Youth Safeguarding, Trust & Safety

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Reduce foreseeable harm in coach/minor, peer, media, messaging, and Team-power relationships through prevention, reporting, response, evidence preservation, and accountable escalation.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- final legal advice
- automatic accusation or punitive action without policy and evidence
- engagement optimization that conflicts with safety

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- User ages, roles, communication/media workflows, and geographic/organizational context
- Authorization, privacy, identity, moderation, support, and incident capabilities
- Human safety owner, escalation contacts, and response authority

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted safeguarding and organizational policy
2. Current authoritative child-safety, platform, and regulator guidance
3. Observed product behavior and incident/support evidence with privacy controls

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Map power relationships, contact pathways, audience expansion, private communication, media creation/sharing, discovery, and evasion opportunities.
2. Model misuse including grooming, harassment, coercion, bullying, impersonation, sexual content, doxxing, retaliation, and report abuse.
3. Define preventive defaults, age-aware boundaries, transparency, rate/friction controls, block/mute/report behavior, and safe bystander paths.
4. Specify report categories, evidence capture, acknowledgement, triage severity, responder access, response times, escalation, emergency handling, and appeal.
5. Define moderation actions, notification, audit, retention, legal hold, privacy, and anti-retaliation rules with human authority.
6. Translate safeguards into requirements for messaging, media, Vault, search, notifications, admin tools, observability, and release gates.
7. Run adversarial scenarios involving minors, compromised coach accounts, cross-Team contact, blocked users, repeated reports, and urgent threats.

## Decision rules and StrideLab invariants

- Coach/minor communication is a high-risk workflow with explicit reporting and accountable response.
- Blocking changes delivery/discovery behavior without erasing evidence needed for authorized safety review.
- Reports are private, acknowledged, auditable, and protected against retaliation and unauthorized access.
- Automation may assist triage but does not make unreviewed high-impact accusations or sanctions.
- Safety controls cannot broaden media visibility or collect unnecessary sensitive data.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/safety/youth-safeguarding-trust-safety.md` with:

- Risk and power map
- Misuse/abuse cases
- Preventive product controls
- Report/block/moderation workflows
- Severity and escalation model
- Audit/privacy/retention
- Adversarial verification and unresolved risks

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Adversarial walkthroughs prove reporting, block, urgent escalation, evidence access, appeals, and cross-Team protections with named human ownership.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `workflow-architecture`, `authorization-tenancy`, `identity-account-lifecycle`, `privacy-data-governance`.

Complementary skills, loaded only when relevant and actually available: `security-identity`, `deep-research-work:deep-research`.

Consumed artifacts:

- communication/media workflows
- age and identity model
- authorization/privacy requirements
- support and incident capabilities

Produced artifacts:

- safeguarding requirements
- report/block/moderation workflow
- severity/escalation model
- safety release gates

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

- An imminent-harm or mandatory-reporting scenario is encountered
- No qualified human owner exists for high-severity reports
- Legal, school, or jurisdictional obligations are unresolved

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- report button without response operation
- private coach/minor channel with no safeguards
- blocking deletes evidence
- AI-only moderation
- safety status exposed to accused or peers

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
