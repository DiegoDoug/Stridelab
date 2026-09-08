# StrideLab Governed Product Baseline

**Status:** `APPROVED` — as the canonical governed product baseline (Diego, 2026-09-08; record `stridelab-ai/orchestration/approvals/G7-product-baseline.md`; approved at `main` merge commit `3a770ea`). The Workflow Architecture v2 remains separately approved. **Downstream conditions — not resolved by this approval:** §6's Free / Mid / Top tier structure (`OQ-BE-TIER-STRUCTURE`) and the identified commercial, legal, policy, and implementation-design items (`WORKFLOW-ARCHITECTURE-v2.md` §9.2; §8 of this file) remain accepted downstream conditions under their named owners.
**Owning Department:** 01 Product & Experience, with Department 04 (safety/privacy/legal invariants) and Department 06 (commercial invariants).
**Purpose:** the single governed record of the product invariants the Workflow Architecture (and all downstream work) is validated against. Created in the v2 correction pass to close independent-review finding **F-20** — previously these invariants lived only inside Department agent prompts, which is not a governed source.

This baseline is authoritative over historical discussion, chat transcripts, and superseded artifacts, per `stridelab-ai/agents/project-memory-manager.md`. The 2026-09-07 G7 approval of the Workflow Architecture v2 (`stridelab-ai/orchestration/approvals/G7-workflow-architecture-v2.md`) did **not** itself approve this artifact; it was approved as a **standalone governed baseline** by a separate human decision on 2026-09-08 (`stridelab-ai/orchestration/approvals/G7-product-baseline.md`). The downstream conditions named in the Status line above remain open under their named owners and are not resolved by this approval.

## 1. Product summary

StrideLab is an iOS-first track-and-field platform for coaches and athletes to plan training cycles and workouts, execute/log sessions, record practice video, analyse media, communicate, and review performance. Baseline age is **13+**.

## 2. Team & role invariants

- **Team hierarchy:** `Team → Event Group → Subgroup → Athlete`.
- **Team roles:** Head Coach / Team Creator, Event Coach, Athlete. Exactly **one** Head Coach / Team Creator per Team at all times.
- **Multiple roles** are supported across different Teams/organisations, **not** within the same Team.
- **Event Coach scope:** manages only athletes assigned to their Event Groups/Subgroups; **may communicate with any athlete on the Team**. Communication reach never widens management, tagging, sharing, feedback, analysis, profile, or performance-data scope.
- In v1, Event Coaches **cannot** assign athletes or administer Event Groups/Subgroups; the Head Coach owns those transitions (future delegation is candidate decision `CD-EC-DELEGATION`).
- The final Head Coach must transfer ownership or initiate Team closure — a Team is never left ownerless.

## 3. Ownership & data invariants

- **Profiles are user-owned.** Coaches/administrators cannot edit an athlete's personal profile. Roster/assignment metadata is separate from personal-profile data.
- **Profiles are not publicly discoverable.** Peers receive only minimum Team identity information. Coach profile access follows current role + management scope. Date-of-birth/age evidence is restricted to the identity subsystem and authorized safety functions; other contexts receive only a derived eligibility flag / approved age band.
- **Coach prescription** (training-planning) and **athlete performed-work** (session-execution logs, personal workouts) are always distinct records. A coach cannot edit athlete-owned performed-work truth; finalization locks the prescribed structure only, and the athlete retains an audited correction path (SE-10).
- **Personal workouts:** the Team Creator controls `personal_workouts_allowed`. Enabled athletes may create/log/edit/delete personal workouts but may not plan training cycles like coaches. Disabling the setting blocks new creation/execution in the Team context but does not delete existing private workouts and does not block private correction or export.
- **Departed-member content (DD-DEPARTED-CONTENT):** athlete-owned profiles, performed-work logs, and personal workouts stay with the athlete; Team plans and administrative records stay with the Team; authored messages and restricted audit evidence follow the approved retention policy; no indiscriminate cascading deletion.

## 4. Media, tagging, and Vault invariants

- Recording/importing, tagging, granting Vault access, explicit sharing, and Team publication are **distinct transitions**, each independently representable and auditable.
- **Tagging is metadata/identification only and never grants Vault access.**
- **Vault access requires a distinct, explicit, server-authoritative grant** by the media owner. Athlete Vault visibility is limited to explicitly-granted media and explicitly-shared clips/frames/drawings/videos.
- **Team-wide communication permission does not grant media access.** Event Coaches may tag/share media only within their current management scope. **Athlete-to-athlete media sharing is disabled in v1.**
- **Multi-subject youth media cannot be peer-reshared or broadly published by default** — onward re-share to a third party and Team publication are blocked until each depicted athlete's consent condition is met.
- Chat attachments that broaden a media artifact's visibility create a formal, independently revocable and auditable share/publication record; offline attachment submission stays pending until server confirmation.

## 5. Safety & compliance invariants

- **Age 13+** is a hard gate at account creation and is not a Team-level configurable setting. A discovered under-age account is moved to `restricted_pending_review` (ordinary use and unnecessary processing stop immediately, no irreversible action), determined by the Platform Safety Administrator, then governed closure on confirmation or audited restoration on error.
- The canonical platform moderation actor is the **`Platform Safety Administrator`** — a least-privilege platform actor owned by Department 04. Reports implicating a Head Coach bypass Team leadership. Suspected illegal content is access-restricted, protected from redistribution, securely preserved, and routed to qualified safety/legal review.
- **Report/block** is available to every member regardless of role, tier, or group. A block stops DMs/mentions/tags/shares/discovery between the parties; it does not delete evidence or alter membership; in shared operational channels the blocked party's content is muted/collapsed when safe; critical Team and safety communications retain an honest path; a minor blocking a coach is offered a private report path.
- **Safety-critical notification state** is transactionally-created authoritative in-app state + durable retry + idempotent processing + delivery/acknowledgement state + audited terminal failure + human escalation for unresolved safety-critical failure. Push/email/device delivery is secondary and fallible. Safety-class notifications cannot be disabled.
- **Data-subject rights:** self-service account deletion (IT-08) and export (PF-06), plus an assisted Data Subject Request intake (PS-08) for broader/guardian-initiated requests.

## 6. Commercial invariants

- Commercial architecture supports **Free / Mid / Top** Team tiers. Exact entitlements may remain undecided. *(The three-tier count and names are the working structure; explicit Department 06 ratification of this as a commercial invariant is a condition on approval of this section — `OQ-BE-TIER-STRUCTURE`.)*
- Billing/payment ownership sits with the Head Coach / Team Creator in v1; whether a distinct org/billing-administrator role is needed is a Department 06 decision (`OQ-BE-BILLING-OWNER`).
- **Payment status is never authorization.** Tier state may gate feature availability only, never a role, management scope, or Vault-visibility check.
- Downgrade / failed payment never revokes data or restructures the hierarchy/authorization; a downgrade constrains future feature use only.
- Provider, prices, taxes, refunds, in-app-purchase mechanics, and exact plan limits are **Department 06 decision content** and are not approved by the Workflow Architecture.

## 7. Architecture constraint

StrideLab is a **domain-driven modular monolith in a monorepo**, with independently deployable media-processing workers and a native iOS media subsystem. Cross-domain access uses public contracts/application services, not internal persistence details. Bounded contexts remain extraction-friendly without premature microservices. `stridelab-ai/` is development-time infrastructure only and never production runtime code. **Previous navigation decisions were revoked and must not be treated as authoritative.**

## 8. Open at baseline level

The exact age-verification strength, retention durations, jurisdiction-specific data-subject duties, moderation staffing/SLA, the multi-subject-media consent *mechanism*, and all Department 06 commercial specifics are **open external policy/legal decisions** — each carries a conservative safe default in `docs/product/workflow-architecture.md` and `WORKFLOW-ARCHITECTURE-v2.md` §9.2. None is an approved legal interpretation.
