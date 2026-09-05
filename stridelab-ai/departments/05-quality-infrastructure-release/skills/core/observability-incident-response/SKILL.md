---
name: observability-incident-response
description: Engineer StrideLab logs, metrics, traces, crash monitoring, dashboards, alerts, runbooks, incident triage/review, and production diagnostics tied to user impact. Not reliability design or generic telemetry collection.
---

# Observability & Incident Response

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Detect, diagnose, contain, and learn from failures affecting users, media, data integrity, isolation, safety, billing, and critical journeys without overcollecting personal data.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- collecting telemetry without a decision or owner
- performing unapproved production changes
- replacing backups, tests, or safeguards

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Critical journeys, SLOs, failure model, threats, and safety escalation model
- Runtime topology, data classification, incident roles, and access constraints
- Available telemetry, crash, provider, deployment, and support evidence

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed runtime signals and incident evidence
2. Accepted SLO, security, privacy, safety, and reliability requirements
3. Current official telemetry/provider documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define diagnostic questions for each critical journey and failure mode before choosing signals.
2. Create structured event/log schemas, metrics, traces, crash context, correlation IDs, and sampling/redaction rules.
3. Build service- and user-impact views for client crashes, sync, API, database, upload, workers, messaging, notifications, auth, and billing.
4. Define alerts only with threshold rationale, owner, urgency, runbook, safe first actions, and escalation path.
5. Write incident classification, command, evidence preservation, containment, communication, safety/security escalation, recovery, and closure procedures.
6. Exercise representative incidents and verify signal-to-action continuity without production mutation unless authorized.
7. Produce post-incident analysis that distinguishes trigger, contributing conditions, control gaps, impact, recovery, and tracked actions.

## Decision rules and StrideLab invariants

- No page exists without an accountable responder and actionable runbook.
- Logs and traces minimize message, athlete, media, token, and personal data.
- Correlation supports cross-boundary diagnosis without becoming a global public identifier.
- Security and youth-safety incidents use restricted evidence and escalation paths.
- A post-incident review improves controls rather than assigning blame.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/operations/observability-incident-response.md` with:

- Diagnostic questions and critical signals
- Telemetry schemas/redaction
- Dashboards and SLO views
- Alerts/owners/runbooks
- Incident command and escalation
- Exercise/incident evidence
- Review and corrective actions

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Tabletop or injected-failure exercises show that an actionable signal reaches an authorized responder and leads to verified recovery.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `reliability-disaster-recovery`, `security-engineering`, `infrastructure-devops`.

Complementary skills, loaded only when relevant and actually available: `production-operations`, `vercel:observability`, `vercel:investigation-mode`, `vercel:vercel-api`.

Consumed artifacts:

- failure/threat model
- SLOs
- runtime topology
- privacy/safety escalation rules

Produced artifacts:

- telemetry specification and changes
- dashboards/alerts
- runbooks
- incident and review evidence

Upstream Departments:

- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release

Downstream Departments:

- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- No qualified responder or safety/security escalation owner exists
- Required telemetry would expose sensitive data
- Containment requires production mutation, secret change, or user communication outside authority

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- log everything
- dashboard equals readiness
- alert without action
- PII in traces
- incident review without owned follow-up

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
