# StrideLab Governed Product Baseline

**Status:** `AWAITING_HUMAN_APPROVAL`.
**Owning Department:** 01 Product & Experience, with Department 04 (safety/privacy/legal invariants) and Department 06 (commercial invariants).
**Purpose:** the governed record of the product invariants the Workflow Architecture v2 (and all downstream work) is validated against — *proposed* until a human approves it (see Status above). Created in the v2 correction pass to close independent-review finding **F-20** — previously these invariants lived only inside Department agent prompts, which is not a governed source.

The G7 approval of 2026-09-07 (`stridelab-ai/orchestration/approvals/G7-workflow-architecture-v2.md`) was for the **Workflow Architecture v2** — it did **not** independently approve this baseline. This file records what the Workflow Architecture v2 was validated against; its own approval as a standalone governed artifact is a **separate, still-open human decision**. §6 commercial invariants additionally carry the Department 06 tier-structure ratification condition (`OQ-BE-TIER-STRUCTURE`). Until a human approves this file, it is a *proposed* baseline.

**Provenance & traceability.**
- **Owner:** Department 01 Product & Experience. **Contributors:** Department 04 (safety/privacy/legal invariants), Department 06 (commercial invariants).
- **Registry entry:** `stridelab-ai/registry/artifacts.yaml` → `product-baseline` (`status: AWAITING_HUMAN_APPROVAL`). **Lifecycle record:** `stridelab-ai/project-memory/current-state/product-baseline.md`.
- **Downstream consumers:** `docs/product/workflow-architecture.md` (Workflow Architecture v2 — APPROVED; declares this file as `upstream`), `docs/product/domain-model.md` (stub), `stridelab-ai/application-map/`.
- **Conditions carried into this file's own approval:** the §6 Department 06 tier-structure ratification condition (`OQ-BE-TIER-STRUCTURE`, owner: Department 06) and the external policy/legal items in §8 and `WORKFLOW-ARCHITECTURE-v2.md` §9.2 — none resolved here, each with a conservative safe default in force.
- The normative force of every invariant below comes from **Workflow Architecture v2 §9.1** (which is G7-approved); this file consolidates and restates them. Where wording differs, `docs/product/workflow-architecture.md` governs, then this file, then the supporting spec.

## 1. Product summary

StrideLab is an iOS-first track-and-field platform for coaches and athletes to plan training cycles and workouts, execute/log sessions, record practice video, analyse media, communicate, and review performance. Baseline age is **13+**.

## 2. Team & role invariants

- **Team hierarchy:** `Team → Event Group → Subgroup → Athlete`.
- **Team roles:** Head Coach / Team Creator, Event Coach, Athlete. Exactly **one** Head Coach / Team Creator per Team at all times.
- **Multiple roles** are supported across different Teams/organisations, **not** within the same Team.
- **Event Coach scope:** manages only athletes assigned to their Event Groups/Subgroups; **may communicate with any athlete on the Team**. Communication reach never widens management, tagging, sharing, feedback, analysis, profile, or performance-data scope.
- In v1, Event Coaches **cannot** assign athletes or administer Event Groups/Subgroups; the Head Coach owns those transitions (future delegation is candidate decision `CD-EC-DELEGATION`).
- The final Head Coach must transfer ownership or initiate Team closure — a Team is never left ownerless.

## 3. Ownership, data & execution invariants

- **Profiles are user-owned.** Coaches/administrators cannot edit an athlete's personal profile. Roster/assignment metadata is separate from personal-profile data.
- **Profiles are not publicly discoverable.** Peers receive only minimum Team identity information. Coach profile access follows current role + management scope. Date-of-birth/age evidence is restricted to the identity subsystem and authorized safety functions; other contexts receive only a **derived `is_minor` flag** (no age band is approved — an age band is gated behind `OQ-PR-AGE-BAND`, in-force default: boolean `is_minor` only).
- **Coach prescription** (training-planning) and **athlete performed-work** (session-execution logs, personal workouts) are always distinct records. A coach cannot edit athlete-owned performed-work truth; finalization locks the prescribed structure only, and the athlete retains an audited correction path (SE-10).
- **Personal workouts:** the Head Coach / Team Creator controls `personal_workouts_allowed`. Enabled athletes may create/log/edit/delete personal workouts but may not plan training cycles like coaches. Disabling the setting blocks new creation/execution in the Team context but does not delete existing private workouts and does not block private correction or export.
- **Departed-member content (DD-DEPARTED-CONTENT):** athlete-owned profiles, performed-work logs, and personal workouts stay with the athlete; Team plans and administrative records stay with the Team; membership-derived access ends immediately on departure; authored messages and restricted audit evidence follow the retention policy once approved (durations are OPEN — `WORKFLOW-ARCHITECTURE-v2.md` §9.2); no indiscriminate cascading deletion.
- **Offline honesty & synchronization.** Offline success is never server-durable until reconciliation succeeds. Divergence that cannot be merged without loss is driven through the SE-09 reconciliation state machine — never last-write-wins — and never lets a coach overwrite an athlete's logged data. An athlete's performed-work log stays honestly tied to the prescription version executed; an SE-10 post-finalization correction may be drafted offline and is applied only on server-confirmed reconnect. Offline attachment submission and offline Vault grants stay pending until server confirmation.

## 4. Media, tagging, and Vault invariants

- Recording/importing, tagging, granting Vault access, explicit sharing, revocation (VS-03), and Team publication are **distinct transitions**, each independently representable and auditable.
- **Tagging is metadata/identification only and never grants Vault access.**
- **Vault access requires a distinct, explicit, server-authoritative grant** by the media owner. Athlete Vault visibility is limited to explicitly-granted media and explicitly-shared clips/frames/drawings/videos.
- **Team-wide communication permission does not grant media access.** Event Coaches may tag/share media only within their current management scope. **Athlete-to-athlete media sharing is disabled in v1.**
- **Multi-subject youth media cannot be peer-reshared or broadly published by default** — onward re-share to a third party and Team publication are blocked until each depicted athlete's consent condition is met.
- Chat attachments that broaden a media artifact's visibility create a formal, independently revocable and auditable share/publication record; offline attachment submission stays pending until server confirmation.

## 5. Safety & compliance invariants

- **Age 13+** is a hard gate at account creation and is not a Team-level configurable setting. A discovered under-age account is moved to `restricted_pending_review` (ordinary use and unnecessary processing stop immediately, no irreversible action), determined by the Platform Safety Administrator, then governed closure on confirmation or audited restoration on error.
- The canonical platform moderation actor is the **`Platform Safety Administrator`** — a least-privilege platform actor owned by Department 04. Reports implicating a Head Coach bypass Team leadership. Suspected illegal content is access-restricted, protected from redistribution, securely preserved, and routed to qualified safety/legal review.
- **Report/block** is available to every member regardless of role, tier, or group. A block stops DMs/mentions/tags/shares/discovery between the parties; it does not delete evidence or alter membership; in shared operational channels the blocked party's content is muted/collapsed when safe; critical Team and safety communications retain an honest path; a minor blocking a coach is offered a private report path; a block generates restricted safety telemetry for the Platform Safety Administrator, stored without automatic punishment of either party and without disclosure to Team leadership. `MG-06` is authoritative for the full blocking semantics.
- **Safety-critical notification state** is transactionally-created authoritative in-app state + durable retry + idempotent processing + delivery/acknowledgement state + audited terminal failure + human escalation for unresolved safety-critical failure. Push/email/device delivery is secondary and fallible. Safety-class notifications cannot be disabled.
- **Data-subject rights:** self-service account deletion (IT-08) and export (PF-06), plus an assisted Data Subject Request intake (PS-08) for broader/guardian-initiated requests.

## 6. Commercial invariants

This section has two parts. **(A)** hard commercial-governance invariants that human approval of this baseline would lock. **(B)** Department 06-owned working defaults that human approval of this baseline **does not resolve** — each keeps its `OQ-BE-*` id, its Department 06 owner, and its in-force conservative safe default.

### 6A. Hard invariants (Department 04-owned rule — cross-workflow invariant #9; locked by approval of this baseline)

- **Payment status is never authorization.** Tier/entitlement state may gate feature availability only — never a role, management scope, profile-field visibility, Vault-visibility, or membership check, and never any other authorization path. (See `stridelab-ai/application-map/cross-context-contracts.md` contract 6: no identity / teams / vault / profile authorization path may take a BE-05 input; BE-05 is the single entitlement-derivation point.)
- **Downgrade / failed payment never revokes data or restructures the hierarchy/authorization;** a downgrade constrains future feature use only.

### 6B. Department 06-owned working defaults — NOT resolved by approval of this baseline

- **Tier structure** — the **Free / Mid / Top** three-tier skeleton (count and names) is a Department 06-owned working structure (`OQ-BE-TIER-STRUCTURE`, owner: Department 06; in-force default: use the skeleton as-is). It is **not** ratified as a commercial invariant by human approval of this baseline; ratification is a separate, explicit Department 06 decision recorded into this section. Exact entitlements/tier→feature mapping (`OQ-BE-TIER-MAP`) are undecided; in-force default: nothing is tier-gated until Department 06's approved entitlement artifact defines the mapping.
- **Billing/payment ownership and tier-change authority** (`OQ-BE-BILLING-OWNER`, owner: Department 06). In-force safe default: the Head Coach / Team Creator is the sole billing/payment owner **and tier-change authority** in v1 (by analogy to Team settings). Whether a distinct org/billing-administrator role is needed is an unresolved Department 06 decision.
- **Provider, prices, taxes, refunds, in-app-purchase mechanics, exact plan limits, trial mechanics, grace-period length, and over-limit handling** are **Department 06 decision content** (`OQ-BE-PROVIDER` / `OQ-BE-PRICING` / `OQ-BE-TAX` / `OQ-IT09-REFUND` / `OQ-BE-IAP` / `OQ-BE-TRIAL` / `OQ-BE-GRACE` / `OQ-BE-OVERLIMIT`). In-force default: **no paid billing ships in v1.** Not approved by the Workflow Architecture, and not resolved by human approval of this baseline.
- **A separate approved Department 06 entitlement artifact** (entitlement model, exact plan limits, provider, prices, taxes, refunds, IAP mechanics, trial, grace, over-limit) is a hard precondition to any BE-05 / billing implementation (`WORKFLOW-ARCHITECTURE-v2.md` §8b condition 1; §8c/G2). It is an accepted downstream condition under Department 06 ownership; it is not discharged by this baseline.

## 7. Architecture constraint

Restated from `ARCHITECTURE.md` (registry id `architecture-decision`, `status: APPROVED`), which **governs on any conflict**.

StrideLab is a **domain-driven modular monolith in a monorepo**, with independently deployable media-processing workers and a native iOS media subsystem; the native layer remains a subsystem, **not a second product architecture**. Applications may compose domain modules and platform adapters; **domain modules must not depend on application shells**, and cross-domain access should use public contracts/application services rather than internal persistence details. Bounded contexts are designed so service extraction remains possible **when operational evidence justifies it** — no premature microservices. `stridelab-ai/` is development-time infrastructure only and never production runtime code.

Per `stridelab-ai/orchestration/ORCHESTRATOR.md` (authority order) and finding F-13: **previously revoked navigation decisions must never be revived or treated as authoritative, and no navigation is designed at this layer.**

## 8. Open at baseline level

This list is **non-exhaustive** — `WORKFLOW-ARCHITECTURE-v2.md` §9.2 is the complete OPEN register (ID · owner · evidence required · safe default · affected workflows · blocking stage). Every item below carries a conservative safe default in force in `docs/product/workflow-architecture.md` and §9.2; **none is an approved legal interpretation and none is resolved by approval of this baseline.**

- **External policy / legal (owner: Department 04 / legal):** age-verification strength (`OQ-IT01-AGE-VERIFY`); retention durations and deletion-vs-anonymisation (`OQ-DD-RETENTION` and related); jurisdiction-specific duties — data-subject/DSR (`OQ-PS08-JURISDICTION`), under-13 discovery (`OQ-PS07-JURISDICTION`), illegal-content external reporting (`OQ-PS09-EXTERNAL`); moderation staffing / SLA / classification thresholds (`OQ-PS-MOD-STAFFING` and related); the multi-subject-media consent **mechanism** (`OQ-VS02-MULTISUBJECT` / `OQ-MD06-AUTHORITY`, default: blocked); coach↔athlete private-thread oversight (`OQ-MG-OVERSIGHT`, default: no standing visibility); coach-initiated external export of a minor's identifiable data (`OQ-PF-MINOR-EXPORT`).
- **Product decisions still open at baseline level (owner: Department 01, unless noted):** Team join mechanism (`OQ-IT04-JOIN-MECHANISM`, default: direct invitation only — no open join code/link/queue); personal-workout coach visibility (`OQ-PW-COACH-VISIBILITY`, default: personal workouts are not visible to any coach); Event Coach delegation (`CD-EC-DELEGATION`, candidate decision, default: none in v1); account-deletion grace window (`OQ-IT08-GRACE`); profile field catalogue and per-field classification (`OQ-PR-FIELDS`).
- **Department 06 commercial decision content (owner: Department 06):** tier structure and tier→feature mapping, billing owner, provider, prices, taxes, refunds, IAP mechanics, plan limits, trial, grace, over-limit — see §6B; in-force default: no paid billing ships in v1.
