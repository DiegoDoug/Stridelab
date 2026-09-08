# Billing / Entitlements Workflows

**Category:** billing-entitlements
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect) for the workflow boundary; **Department 06 (Business Operations & Governance) owns all commercial decision content.**
**Skills applied:** domain-modeling, workflow-architecture
**Cross-department dependency:** Department 06 owns billing/entitlement decision content; Department 04 owns the hard rule that payment status is never authorization.
**Department 06 review:** An **independent** Department 06 review of this category (BE-01…BE-06) was run in the v2 correction pass — see `WORKFLOW-ARCHITECTURE-v2.md` §8b and `docs/product/workflow-architecture.md`. Provider, prices, taxes, refunds, in-app-purchase mechanics, and exact plan limits are **not approved** by this artifact and remain Department 06 decision content.

Per the task instructions, this section models only the workflow boundary —
no exact prices or plan limits are defined or implied.

**Governing invariant (governed product baseline §6A — normative via Workflow Architecture v2 §9.1 / ORCHESTRATOR.md cross-department rule):** D06 may define commercial entitlements but cannot treat payment status as authorization. A Team's tier state may gate *feature availability* (e.g., how many Event Groups, storage limits, media/analysis feature depth) but must never be the mechanism that determines whether a specific role can perform a specific authorization-sensitive action (e.g., Event Coach management scope, Vault visibility) — those remain governed entirely by identity-team/team-administration/vault-sharing.

---

## BE-01 — Team Chooses Tier

**Purpose:** Let the Head Coach / Team Creator select a commercial tier (Free / Mid / Top) for the Team.

**Actors:** Head Coach / Team Creator (sole authority — tier selection is a Team-level commercial decision, not delegable to Event Coaches or Athletes).

**Capability / trigger:** Available to the Head Coach / Team Creator to select a commercial tier for their Team.

**Preconditions:** Team exists (IT-02).

**Authorization assumptions:** Tier selection is Head-Coach-exclusive, mirroring TA-06/TA-07's authority pattern; tier state affects feature availability only, never authorization/role semantics (per the governing invariant above).

**Owned resources:** Team tier-state record.

**States:** `no_tier_selected (default Free) → tier_selected(Free|Mid|Top)`.

**State transitions:** Head Coach selects/changes tier; a new Team defaults to Free per the working Free/Mid/Top tier skeleton (`OQ-BE-TIER-STRUCTURE` — Department 06-owned, not yet ratified).

**Happy path:** Head Coach reviews tier options and selects one appropriate for the Team's needs.

**Alternate paths:** Team remains on the default Free tier without any explicit selection action.

**Errors/failures:** N/A beyond standard authorization checks (non-Head-Coach attempts rejected).

**Recovery:** Tier selection is changeable at any time via BE-03/BE-04 (upgrade/downgrade).

**Offline behavior:** Tier selection/change requires connectivity to reach the billing/entitlement service authoritatively; not offline-capable.

**Synchronization implications:** Tier state must propagate to all Team members' clients so feature-availability checks are evaluated against the current authoritative tier, not a stale cache.

**Notifications:** Not required at initial default; explicit selection may trigger a confirmation.

**Audit requirements:** Tier selection is a commercial-state change; standard business-record-keeping applies (Department 06 owned).

**Exit condition:** Team has a defined tier state (defaulting to Free if never explicitly selected).

**Downstream artifacts:** Feeds BE-02 (trial/subscription state), gates feature-availability checks throughout the product (exact feature-to-tier mapping is explicitly out of scope for v1 per task instructions).

**Open questions:**
- `OQ-BE-TIER-MAP` (owner: Department 06; safe default: no feature is tier-gated until D06's approved entitlement artifact defines the mapping — the app ships all features to all tiers rather than guess a limit; evidence required: the D06 commercial model; affected: BE-01, BE-05; blocking stage: enabling any tier gate). A separate approved D06 artifact is a **condition** on billing implementation (§8b).
- `OQ-BE-TIER-STRUCTURE` (owner: Department 06; the Free / Mid / Top three-tier skeleton is the working structure but is **not** D06-ratified as a commercial invariant; safe default: use it as-is pending ratification; blocking stage: human approval of `product-baseline.md` §6).
- `OQ-BE-BILLING-OWNER` (owner: Department 06; safe default: the Head Coach / Team Creator is the sole billing/payment owner and tier-change authority in v1; whether a distinct org/billing-administrator role is needed is a D06 decision; affected: BE-01…BE-06; blocking stage: billing implementation).

---

## BE-02 — Trial / Subscription State

**Purpose:** Track whether a Team's selected tier is currently in a trial period, an active paid subscription, or neither.

**Actors:** Head Coach / Team Creator (initiates); billing provider integration (system actor, not further specified here).

**Capability / trigger:** Following BE-01 tier selection for a paid tier.

**Preconditions:** A non-Free tier has been selected (BE-01).

**Authorization assumptions:** Subscription/trial state is a commercial fact tracked alongside, but never substituting for, Team-scoped authorization — an expired trial changes *feature availability*, not any member's role or data-access rights defined elsewhere.

**Owned resources:** Subscription-state record (trial_active, subscription_active, expired, cancelled).

**States:** `none → trial_active → subscription_active | trial_expired`; `subscription_active → cancelled | payment_failed (see BE-06)`.

**State transitions:** Standard subscription lifecycle; exact trial length/conversion mechanics are Department 06-owned and not specified in v1.

**Happy path:** Head Coach selects a paid tier → enters trial → trial converts to an active paid subscription.

**Alternate paths:** Trial expires without conversion → Team reverts to Free-tier feature availability (per the governing invariant, this never revokes any member's role/authorization, only paid-tier feature access).

**Errors/failures:** Billing-provider integration failure → subscription state must fail honestly (not silently assume active) and surface a clear status to the Head Coach.

**Recovery:** A lapsed/expired state can be re-entered via BE-03 (upgrade) at any time.

**Offline behavior:** Not offline-capable; requires connectivity to the billing provider.

**Synchronization implications:** Subscription-state changes (especially expirations/failures) must propagate promptly enough that feature-availability checks don't grant paid-tier access indefinitely past expiration due to stale caching.

**Notifications:** Head Coach notified of trial-ending, conversion, and expiration events.

**Audit requirements:** Standard commercial record-keeping (Department 06).

**Exit condition:** Subscription-state record accurately reflects the Team's current commercial standing.

**Downstream artifacts:** Feeds BE-05 (entitlement changes) and BE-06 (failed payment/grace behavior). The `cancelled` state is also reached from **IT-09** (Team Closure) commercial teardown — closure initiates BE-* cancellation under the D06-owned refund/dunning/cancellation policy (`OQ-IT09-REFUND`, safe default: stop future billing, no automatic refund).

**Open questions:** `OQ-BE-TRIAL` (owner: Department 06; safe default: no trial in v1 — a paid tier requires an active subscription; blocking stage: trial implementation). `OQ-BE-PROVIDER` / `OQ-BE-PRICING` / `OQ-BE-TAX` / `OQ-BE-IAP` (owner: Department 06; safe default: no paid billing ships in v1; provider (direct vs IAP), prices, tax handling, and in-app-purchase mechanics are all unresolved and **not approved** by this artifact; blocking stage: billing implementation / App Store submission). `OQ-BE-BILLING-OWNER` (owner: Department 06; safe default: Head Coach is sole billing owner in v1; a distinct org/billing-administrator role is a D06 decision).

---

## BE-03 — Upgrade

**Purpose:** Move a Team from a lower tier (or Free) to a higher tier.

**Actors:** Head Coach / Team Creator.

**Capability / trigger:** Available to the Head Coach / Team Creator to move the Team to a higher tier.

**Preconditions:** Team exists; current tier is lower than the target tier.

**Authorization assumptions:** Same as BE-01 — Head-Coach-exclusive.

**Owned resources:** Team tier-state and subscription-state records (transitions both).

**States:** `tier(lower) → tier(higher)`.

**State transitions:** Head Coach confirms upgrade → payment/billing-provider interaction (not detailed here) → tier state updates on success.

**Happy path:** Head Coach upgrades from Free to Mid → gains Mid-tier feature availability upon confirmed payment/subscription state.

**Alternate paths:** Upgrading directly from Free to Top, skipping Mid.

**Errors/failures:** Payment failure during upgrade → tier remains at prior state; see BE-06 for the general failed-payment pattern.

**Recovery:** A failed upgrade attempt can be retried.

**Offline behavior:** Not offline-capable.

**Synchronization implications:** New feature availability must propagate promptly upon confirmed upgrade so Team members can use newly unlocked capability.

**Notifications:** Head Coach (and optionally Team) notified of successful upgrade.

**Audit requirements:** Standard commercial record-keeping.

**Exit condition:** Tier/subscription state reflects the new higher tier, or the upgrade attempt cleanly fails with the Team remaining at its prior tier.

**Downstream artifacts:** Feeds BE-05 (entitlement changes).

**Open questions:** None beyond those already deferred (pricing/limits).

---

## BE-04 — Downgrade

**Purpose:** Move a Team from a higher tier to a lower tier (including to Free).

**Actors:** Head Coach / Team Creator.

**Capability / trigger:** Available to the Head Coach / Team Creator to move the Team to a lower tier (including Free).

**Preconditions:** Team exists; current tier is higher than the target tier.

**Authorization assumptions:** Same as BE-01. Critically, downgrade must never retroactively revoke data or restructure Team hierarchy/authorization (e.g., existing Event Groups/Subgroups/media are not deleted merely because a tier-driven *limit* is now exceeded) — the governing invariant that payment status is never authorization extends here to mean a downgrade constrains *future* feature use, not existing structural/authorization state, absent an explicit, separately-approved data-retention policy for over-limit content.

**Owned resources:** Team tier-state and subscription-state records.

**States:** `tier(higher) → tier(lower)`.

**State transitions:** Head Coach confirms downgrade (destructive-adjacent transition regarding feature access — requires confirmation, per workflow-architecture invariants, especially if the Team currently exceeds the lower tier's limits).

**Happy path:** Head Coach downgrades from Top to Mid when Team needs shrink; feature availability adjusts accordingly.

**Alternate paths:** Downgrading to Free at subscription cancellation (see BE-02 `cancelled` state).

**Errors/failures:** Downgrading while current usage exceeds the target tier's limits (e.g., more Event Groups than the lower tier allows) → must be surfaced explicitly to the Head Coach before confirming, with an honest explanation of what becomes read-only/restricted versus what is preserved — exact behavior (soft-lock vs. hard block vs. grace period) is a Department 06 product decision and is **OPEN**.

**Recovery:** A downgrade can be reversed via BE-03 (upgrade) at any time; no data is destroyed by the downgrade itself per the authorization assumption above.

**Offline behavior:** Not offline-capable.

**Synchronization implications:** Feature-restriction changes must propagate promptly and consistently across all Team members' clients to avoid inconsistent enforcement (e.g., one device still showing a restricted feature as available).

**Notifications:** Head Coach notified of downgrade effects; other Team members notified if the downgrade materially restricts a feature they actively use.

**Audit requirements:** Standard commercial record-keeping.

**Exit condition:** Tier/subscription state reflects the new lower tier, with existing structural/authorization data preserved and over-limit content's treatment explicitly communicated.

**Downstream artifacts:** Feeds BE-05.

**Open questions:** `OQ-BE-OVERLIMIT` (owner: Department 06; **safe default: soft-lock** — over-limit content becomes read-only, nothing is deleted or restructured, and the Head Coach is shown exactly what is restricted; evidence required: D06's chosen over-limit model; affected: BE-04, BE-05; blocking stage: enabling tier limits). Downgrade never revokes data or authorization (normative, per the governing invariant).

---

## BE-05 — Entitlement Changes

**Purpose:** Represent the general mechanism by which a change in commercial state (BE-01/BE-02/BE-03/BE-04/BE-06) translates into actual feature-availability changes across the product.

**Actors:** System (derives entitlement state from BE-01/BE-02/BE-03/BE-04/BE-06); all Team members (consumers of the resulting feature availability).

**Capability / trigger:** Triggered automatically by any upstream commercial-state transition.

**Preconditions:** A commercial-state transition has occurred.

**Authorization assumptions:** This is the single, centralized point where tier/subscription state translates into feature-availability flags — no other workflow should independently re-derive entitlement from raw billing data, to avoid inconsistent enforcement. Per the governing invariant, entitlement flags gate *features*, never authorization/role/data-access rules owned by identity-team, team-administration, or vault-sharing.

**Owned resources:** Derived entitlement/feature-flag state for the Team.

**States:** `entitlement(state A) → entitlement(state B)` on any upstream commercial-state change.

**State transitions:** Recomputed whenever BE-01/BE-02/BE-03/BE-04/BE-06 changes.

**Happy path:** A tier upgrade (BE-03) triggers entitlement recomputation, unlocking new feature flags Team-wide.

**Alternate paths:** A failed payment (BE-06) triggers entitlement recomputation toward a restricted state.

**Errors/failures:** Entitlement recomputation failure → must fail toward the safer/more restrictive state, never silently grant access beyond what is currently paid for.

**Recovery:** Recomputation can be retried/forced if it fails.

**Offline behavior:** Entitlement state should be cached for offline feature-availability checks, but a stale cache must not be trusted indefinitely — a periodic/on-connect revalidation is required to prevent extended use of entitlements no longer valid (e.g., after a downgrade or failed payment), mirroring the same integrity concern raised for `personal_workouts_allowed` (TA-07) and Vault access (VS-01/VS-02).

**Synchronization implications:** This is the central propagation point for all commercial-state effects; its timeliness directly determines how quickly a downgrade/failed-payment restriction actually takes effect across devices.

**Notifications:** Not independently required beyond the triggering event's own notification (BE-02/BE-03/BE-04/BE-06).

**Audit requirements:** Standard commercial record-keeping; not independently safety-critical.

**Exit condition:** Entitlement/feature-flag state accurately reflects the Team's current authoritative commercial state.

**Downstream artifacts:** Consumed by feature-availability checks throughout the product (exact mapping deferred per task instructions).

**Open questions:** None beyond the general feature-to-tier mapping already deferred.

---

## BE-06 — Failed Payment / Grace Behavior

**Purpose:** Handle the case where a Team's subscription payment fails, including any grace period before entitlement is restricted.

**Actors:** Head Coach / Team Creator (payment owner); billing provider integration (system actor).

**Capability / trigger:** Billing-provider payment-failure event.

**Preconditions:** Team holds an active paid subscription (BE-02 `subscription_active`).

**Authorization assumptions:** A failed payment affects feature entitlement only, never Team-scoped authorization/role/data-access rights, per the governing invariant — an Event Coach's management scope, Vault access rules, and all identity-team/team-administration invariants remain fully intact regardless of billing state.

**Owned resources:** Subscription-state record (`payment_failed`, optionally `grace_period`).

**States:** `subscription_active → payment_failed → grace_period → resolved | downgraded_to_free`.

**State transitions:**
1. `subscription_active → payment_failed`: billing provider reports failure.
2. `payment_failed → grace_period`: if a grace period is adopted (OPEN — see below), the Team retains current-tier feature access temporarily.
3. `grace_period → resolved`: Head Coach updates payment method successfully within the grace window.
4. `grace_period → downgraded_to_free` (or to the last-paid-and-current tier — mechanism OPEN): grace window lapses without resolution, triggering BE-05 entitlement recomputation.

**Happy path:** Payment fails → Head Coach is notified and updates payment method within the grace window → subscription resumes normally.

**Alternate paths:** Payment fails and is never resolved → Team's paid-tier feature access is restricted per BE-04-equivalent downgrade semantics (data/structure preserved, feature access restricted).

**Errors/failures:** Billing-provider integration failure distinct from an actual payment failure (e.g., a webhook delivery issue) → must not be conflated with a genuine payment failure; the system should avoid falsely restricting entitlement due to a provider/integration fault, though this is an implementation-robustness concern rather than a workflow-level open question.

**Recovery:** Fully recoverable at any point by resolving payment (returns to `subscription_active`).

**Offline behavior:** Not offline-capable for the payment-resolution step itself; entitlement-restriction propagation follows BE-05's offline/caching posture.

**Synchronization implications:** Same as BE-05.

**Notifications:** Head Coach notified promptly of payment failure, grace-period status, and eventual restriction if unresolved.

**Audit requirements:** Standard commercial record-keeping.

**Exit condition:** Subscription state reaches `resolved` (back to normal) or `downgraded_to_free`/restricted state, with Team structural/authorization data fully preserved throughout.

**Downstream artifacts:** Triggers BE-05 (entitlement changes). The grace/dunning behaviour and any refund on final restriction are governed by the same D06-owned refund/dunning/cancellation policy as **IT-09** teardown and **BE-04** downgrade (`OQ-IT09-REFUND`).

**Open questions:** `OQ-BE-GRACE` (owner: Department 06; safe default: a **7-day grace period** at current-tier feature access after a payment failure, then downgrade to Free-tier feature availability with all structural/authorization data preserved (BE-04 semantics); evidence required: D06's dunning policy; affected: BE-06, BE-05; blocking stage: billing implementation). `OQ-BE-RESTRICTED-TARGET` (safe default: restricted state = Free-tier feature availability, not a bespoke reduced tier). `OQ-IT09-REFUND` (broadened — a single D06-owned refund/dunning/cancellation policy covering IT-09 closure teardown, BE-06 grace expiry, and BE-04 downgrade; safe default: stop future billing, no automatic refund).
