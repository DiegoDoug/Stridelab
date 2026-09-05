---
name: realtime-messaging-notifications
description: Engineer StrideLab messaging, realtime channels, read state, subscriptions, push notifications, retries, routing, and consistency. Not for trust-and-safety policy or client chat styling.
---

# Realtime Messaging & Notifications

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Deliver permission-aware Team communication and notifications with explicit message, delivery, read, subscription, and push semantics under retries and offline use.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- moderation and safeguarding policy ownership
- visual design of conversations
- using realtime transport as the source of truth

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved messaging and notification workflows
- Audience, authorization, safety, retention, and audit requirements
- Backend, database, realtime provider, APNs, and client contracts

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed delivery implementation and integration evidence
2. Accepted workflow, authorization, safety, privacy, and retention artifacts
3. Current APNs and selected realtime/provider documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define conversation, membership, sender, recipient/audience, message, delivery, read, notification, and device-token lifecycles.
2. Apply the distinction between Event Coach management scope and Team-wide communication permission at the service boundary.
3. Persist authoritative messages before fan-out; use realtime and push as delivery mechanisms, not canonical storage.
4. Define idempotent send, ordering scope, pagination, unread/read semantics, duplicate delivery, reconnect, and missed-event recovery.
5. Route notification type, audience, privacy-safe preview, preferences, quiet behavior, badge state, and deep link explicitly.
6. Integrate reporting, blocking, retention, and audit hooks from the safeguarding policy without reinterpreting it.
7. Test denial, blocked users, retries, reconnect, multiple devices, token rotation, delayed push, duplicate events, and deleted membership.

## Decision rules and StrideLab invariants

- A realtime subscription never grants data access beyond the server-authorized query.
- Persisted message identity is stable across send retries and fan-out.
- Read state is scoped to user and conversation and is monotonic unless an explicit unread feature exists.
- Push payloads minimize sensitive athlete or media content on lock screens.
- Removing membership revokes future delivery and access without rewriting required audit history.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/realtime-messaging-notifications.md` with:

- Messaging and audience model
- Persistence and ordering
- Realtime subscription/recovery
- Read state
- Notification routing and privacy
- Safety and audit hooks
- Integration/failure evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Multi-device integration tests cover authorized/denied subscription, retry dedupe, reconnect gap recovery, block/report, token rotation, and privacy-safe push.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `backend-api-engineering`, `database-engineering`, `offline-local-first-engineering`, `workflow-architecture`.

Complementary skills, loaded only when relevant and actually available: `backend-data-engineering`, `security-identity`, `vercel:vercel-queues`, `vercel:workflow`.

Consumed artifacts:

- messaging workflow
- authorization matrix
- safeguarding policy
- notification preferences

Produced artifacts:

- messaging backend
- realtime recovery contract
- notification routing
- delivery evidence

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Coach/minor communication safeguards are undefined
- Provider delivery semantics cannot satisfy required ordering or recovery
- A notification preview would expose sensitive content

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- websocket event as database
- client-chosen audience trusted
- PII-rich lock-screen payload
- read receipts without privacy decision
- reconnect without gap recovery

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
