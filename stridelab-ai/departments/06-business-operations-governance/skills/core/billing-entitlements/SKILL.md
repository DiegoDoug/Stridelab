---
name: billing-entitlements
description: Model and engineer StrideLab Free/Mid/Top subscriptions, trials, upgrades, downgrades, Team billing, webhooks, plan limits, and entitlements while separating commercial access from security authorization.
---

# Billing & Entitlements

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Keep provider billing state, StrideLab subscription state, feature entitlement, quota usage, and security authorization consistent under delayed, duplicated, reversed, or missing events.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- choosing prices without product/cost inputs
- using a paid tier to bypass security policy
- generic payment UI styling

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved Free/Mid/Top value and limit definitions
- Billing owner, purchaser/Team relationship, provider, platform/IAP, tax/refund, and lifecycle requirements
- Authorization, API, database, webhook, and support contracts

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted product, cost, legal, App Store, and authorization decisions
2. Observed provider events and entitlement implementation
3. Current official billing provider and Apple IAP documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Model billing account/customer, Team purchaser, subscription, price, trial, invoice/transaction, provider event, entitlement, quota, and grace state separately.
2. Define Free/Mid/Top capabilities and limits as versioned product inputs with effective dates and grandfathering rules.
3. Define signup, trial, purchase, renewal, failed payment, grace, upgrade, downgrade, cancellation, refund, dispute, restore, transfer, and deletion behavior.
4. Implement signed webhook ingestion with durable event identity, idempotency, ordering tolerance, replay, audit, and periodic provider reconciliation.
5. Derive entitlements server-side from canonical billing state; combine them with authorization without allowing either to replace the other.
6. Define quota measurement, concurrency, warning, enforcement, release, and customer-visible explanation.
7. Test duplicates, out-of-order events, missing webhooks, refund/reversal, Team ownership change, cross-platform purchase, grace expiry, and reconciliation.

## Decision rules and StrideLab invariants

- Commercial entitlement can narrow product capability but cannot grant access to another Team or resource.
- Provider webhook order is not assumed to be reliable or unique without verification.
- Entitlement decisions are server-authoritative and auditable.
- Downgrade defines future access, retained data, over-limit state, and recovery without silent destructive deletion.
- App Store/IAP behavior is verified against current rules when digital features are sold on Apple platforms.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/business/billing-entitlements.md` with:

- Commercial and entitlement model
- Plan/limit matrix
- Subscription lifecycle
- Webhook/reconciliation protocol
- Authorization integration
- Quota/downgrade behavior
- Financial and integration evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- State-machine and reconciliation tests cover every provider event order, duplicate, reversal, grace, quota, restore, and cross-Team authorization case.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `product-strategy`, `authorization-tenancy`, `backend-api-engineering`, `app-store-platform-compliance`.

Complementary skills, loaded only when relevant and actually available: `vercel:payments`, `backend-data-engineering`, `security-identity`.

Consumed artifacts:

- plan/tier contract
- authorization model
- provider/platform rules
- Team billing lifecycle

Produced artifacts:

- billing state model
- entitlement/limit matrix
- webhook/reconciliation implementation
- billing correctness evidence

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

- Plan value/limits, purchaser ownership, tax/refund, or platform-commerce policy is unresolved
- Provider credentials or live financial mutation is required
- A requested entitlement weakens security or youth/privacy safeguards

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- plan name checked in client
- webhook equals truth without reconciliation
- paid user bypasses Team scope
- downgrade deletes data immediately
- price hard-coded into authorization

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
