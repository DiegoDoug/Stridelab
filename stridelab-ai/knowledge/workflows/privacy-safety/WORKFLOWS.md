# Privacy / Safety Workflows

**Category:** privacy-safety
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect) for workflow structure; substantive policy content is owned by Department 04 (Security, Identity & Compliance).
**Skills applied:** domain-modeling, workflow-architecture
**Cross-department dependency:** Department 04 review is mandatory for every workflow in this category without exception.

This category states the *cross-cutting implications* of identity, media,
vault-sharing and messaging mechanics for age-13+ compliance, moderation,
media privacy, and deletion/export; PS-07/PS-08/PS-09 additionally carry
their own state machines.

**v2 normative decisions applied to this category:**
- The canonical platform moderation actor is the **`Platform Safety Administrator`** — a least-privilege platform actor owned by Department 04. Reports involving a Head Coach bypass Team leadership. Suspected illegal content is access-restricted, protected from redistribution, securely preserved, and routed to qualified safety/legal review (PS-09). Staffing, SLA values, classification thresholds, and jurisdiction-specific external-reporting duties remain OPEN.
- **PS-07 (discovered under-age):** a credible signal moves the account to `restricted_pending_review` — ordinary product use and unnecessary processing stop **immediately**, but **global account termination is not the first consequence**. The Platform Safety Administrator performs the determination; confirmed ineligibility then proceeds to *governed* account closure and data handling; mistaken determinations permit audited restoration.
- **Notifications:** safety-critical notification state is transactionally-created authoritative in-app state + durable retry + idempotent processing + delivery/acknowledgement state + audited terminal failure + human escalation for unresolved safety-critical failure. There is no literal "guaranteed delivery" promise. Safety notifications cannot be disabled (MG-07).

---

## PS-01 — Age 13+ Enforcement

**Purpose:** Ensure the age-13+ product baseline is enforced at the point of account creation and consistently respected thereafter.

**Actors:** Prospective user (IT-01); Department 04 (policy owner).

**Capability / trigger:** IT-01 (signup/account creation) age-assertion step.

**Preconditions:** N/A (this is the enforcement checkpoint for IT-01, not an independent entry point).

**Authorization assumptions:** No workflow anywhere in the product may create a durable account or Team-scoped identity for an asserted age below 13; this is a hard product-baseline invariant, not a configurable Team-level setting.

**Owned resources:** The age-assertion field and its consequence (IT-01 `rejected_underage` state).

**States:** Mirrors IT-01: `pending_verification → active | rejected_underage`.

**State transitions:** Mirrors IT-01.

**Happy path:** User asserts age ≥13 → proceeds normally.

**Alternate paths:** N/A beyond IT-01's own alternate paths.

**Errors/failures:** Age assertion below 13 → hard rejection (IT-01 `rejected_underage`); no workaround path (e.g., parental-consent-based under-13 accounts) exists in the governed product baseline — if such a path is ever desired, it is a new product decision requiring explicit approval, not an extension of this workflow.

**Recovery:** N/A — rejection is by design, not a defect requiring recovery.

**Offline behavior:** N/A (inherits IT-01, not offline-capable).

**Synchronization implications:** N/A.

**Notifications:** N/A beyond IT-01's own handling.

**Audit requirements:** Age-gate decisions are audited (IT-01), with minimal data retention for rejected attempts per Department 04 policy.

**Exit condition:** No account exists for an asserted age below 13.

**Downstream artifacts:** Gates every other workflow in the product, since all require an `active` account.

**Open questions:** Verification-strength mechanism (inherited from IT-01) — Department 04 owned.

---

## PS-02 — Report / Block

**Purpose:** State the privacy-safety framing of the report/block mechanism already defined mechanically in MG-06, emphasizing its role as a youth-safety control, not merely a messaging feature.

**Actors:** Any Team member; Department 04 (policy owner for escalation/consequence design).

**Capability / trigger:** MG-06 (report/block/moderation path).

**Preconditions:** Same as MG-06.

**Authorization assumptions:** Same as MG-06; emphasized here that report/block availability must not be gated by role, tier, or Event Group scope — every Team member, regardless of role or assigned group, must be able to report/block, since safety concerns can arise anywhere in the Team structure.

**Owned resources:** Same as MG-06 (report record, block record).

**States/transitions/happy path/alternate paths/errors/recovery/offline/sync/notifications:** Identical to MG-06; this entry does not redefine the mechanism, only its cross-cutting safety framing.

**Audit requirements:** Mandatory, per MG-06, with explicit Department 04 (`youth-safeguarding-trust-safety`) ownership of the audit-content standard (what must be captured to support a later safety investigation).

**Exit condition:** Same as MG-06.

**Downstream artifacts:** Feeds PS-03 (moderation/escalation).

**Open questions:** Same as MG-06's open questions, restated here for emphasis: moderation authority hierarchy, reported-individual notification policy, retention of reported content.

---

## PS-03 — Moderation / Escalation

**Purpose:** Define the escalation path from a Team-level report (MG-06/PS-02) to a resolution, including potential platform-level (StrideLab-operations) involvement beyond a single Team's Head Coach.

**Actors:** Head Coach (Team-level first responder for ordinary reports); **Platform Safety Administrator** — the canonical **least-privilege platform actor** owned by Department 04, sitting outside any single Team's hierarchy. Its existence, remit, and the two mandatory bypass routes (reports implicating a Head Coach; illegal-content / imminent-harm via PS-09) are **fixed** by this architecture. Its staffing, SLA values, and classification thresholds are **OPEN**. Also: the reported individual.

**Capability / trigger:** MG-06 `reported → under_review` transition.

**Preconditions:** A report exists (MG-06).

**Authorization assumptions:**
- Team-level moderation authority (Head Coach) is bounded. Some categories of report **structurally bypass Team-level review and route directly to the Platform Safety Administrator** — this routing is not discretionary:
  - a report implicating the Head Coach / Team Creator, or implicating the only Team-level reviewer available — a Team-internal model cannot resolve a report *about* its own top authority;
  - a report classified as potential illegal content or imminent harm — routed via **PS-09**, not this workflow.
- The escalation path's existence and the Head-Coach-implicated routing are fixed by this architecture. What remains **OPEN**: the finer escalation-trigger criteria (severity classification, automated vs manual) and the platform authority's ownership/staffing/SLA. These open items must not be used as an excuse to ship with no escalation recipient — the structural recipient (Platform Safety Administrator) is named.

**Owned resources:** Escalation record (report ↔ escalation tier ↔ resolving authority).

**States:** `under_review(team-level) → escalated(platform-level) → resolved`; or `under_review(team-level) → resolved` without escalation for lower-severity cases.

**State transitions:** A team-level reviewer (or an automated severity signal, if adopted — OPEN) determines whether escalation is warranted.

**Happy path:** A routine Team-level report is reviewed and resolved by the Head Coach without escalation.

**Alternate paths:** A report implicating the Head Coach, or involving a legal/safety threshold, escalates to platform-level review.

**Errors/failures:** A report that should have escalated but didn't (e.g., no clear escalation trigger defined) is a **product-safety gap**, not merely a workflow edge case — this is precisely why this workflow is flagged as mandatory Department 04 review material rather than left implicit inside MG-06.

**Recovery:** N/A — escalation design must prevent this failure mode by construction, not rely on after-the-fact recovery.

**Offline behavior:** Not offline-capable; moderation review requires connectivity to the authoritative report record.

**Synchronization implications:** Escalation state must be reliably and promptly visible to the Platform Safety Administrator once triggered. Per master §5 invariant #14 (v2 formulation) this is backed by transactionally-created authoritative in-app state, durable retry, idempotent processing, explicit delivery + acknowledgement state, an audited terminal-failure record, and human escalation if the escalation signal stays undelivered — not a best-effort UX nicety and not a literal delivery guarantee.

**Notifications:** Notification policy to the reported individual is `OQ-MG-REPORTED-NOTICE` (safe default: no automatic notice). The escalation signal to the Platform Safety Administrator is safety-critical and follows the invariant #14 state model above; push/email are secondary and fallible.

**Audit requirements:** Mandatory, comprehensive audit trail across both team-level and platform-level stages.

**Exit condition:** Report reaches `resolved` at the appropriate authority level, with an auditable trail showing why that level was sufficient (or why escalation occurred).

**Downstream artifacts:** May trigger IT-06 (removal), TA-01 (role change), account-level action beyond a single Team (a platform-level consequence, not modeled as a specific workflow here since it exceeds Team-scoped identity-team mechanics), or legal/compliance handoff (Department 04/06).

**Open questions (Department 04-owned; the *role* and the two mandatory bypass routes are fixed, not open):**
- `OQ-PS-MOD-STAFFING` (Platform Safety Administrator staffing model and response-time SLA; safe default: escalations queue durably and are worked in severity order; affected: PS-03, PS-07, PS-09; blocking stage: a production launch that exposes the report path to real users).
- `OQ-MG-MOD-THRESHOLD` (finer severity-classification / automated-vs-manual triage; safe default: Head Coach handles what they can, everything else escalates; owned jointly with MG-06).
- `OQ-PS-HC-IMPLICATED-PROCESS` (the process *after* a Head-Coach-implicated report is routed to the Platform Safety Administrator; safe default: platform review with possible IT-06/TA-01 outcome and legal handoff; affected: PS-03; blocking stage: production moderation ops).

---

## PS-04 — Media Privacy

**Purpose:** State the cross-cutting privacy framing of the media/vault-sharing categories, emphasizing that default-private capture and the tagging-is-not-sharing invariant are youth-privacy controls, not merely product-design choices.

**Actors:** All media/vault-sharing actors (MD-*, VS-*); Department 04 (policy owner).

**Capability / trigger:** MD-01/MD-02 (capture/import) through VS-01/VS-02/VS-03.

**Preconditions:** Same as the referenced media/vault-sharing workflows.

**Authorization assumptions:** Restated for emphasis: capture defaults to private (MD-03); tagging identifies a subject without granting broad visibility beyond the tagged item itself (MD-05/VS-01); explicit sharing is item-scoped (VS-02); publication is the only Team-wide-visibility transition and is gated by explicit, currently-undecided policy (MD-06). Given that tagged/shared/published subjects are frequently minors (age 13–17 within the 13+ baseline), any weakening of these boundaries during implementation is a Department 04 blocking concern, not a Department 01/02/03 implementation-convenience trade-off.

**Owned resources:** N/A directly (cross-cutting framing over MD-*/VS-* owned resources).

**States/transitions:** N/A (framing entry, not a new mechanism).

**Happy path/alternate paths/errors/recovery/offline/sync/notifications:** Inherit entirely from MD-* and VS-*.

**Audit requirements:** Inherit entirely from MD-05, MD-06, VS-01, VS-02, VS-03, restated here as collectively mandatory for Department 04 review as a *set*, not workflow-by-workflow in isolation, since privacy risk here is cumulative across the whole media lifecycle.

**Exit condition:** N/A (standing framing, not a completed task) — mirrors VS-04's role as a verification checkpoint.

**Downstream artifacts:** Serves as an explicit cross-reference for Department 04's review scope.

**Open questions:** All open questions already flagged in MD-06, VS-02, and VS-03 apply here collectively.

---

## PS-05 — Deletion / Export

**Purpose:** State the cross-cutting privacy-rights framing of account deletion (IT-08) and data export (PF-06), ensuring both are recognized as data-subject-rights mechanisms, not merely account-management or reporting features.

**Actors:** Account owner (or authorized guardian/legal representative path — OPEN, since the 13+ baseline includes minors whose legal data rights may involve a parent/guardian depending on jurisdiction); Department 04 (policy owner).

**Capability / trigger:** IT-08 (account deletion), PF-06 (exports).

**Preconditions:** Same as IT-08/PF-06.

**Authorization assumptions:** Deletion/export rights belong to the data subject (the account owner); whether a minor's parent/guardian has an independent or overriding right to request deletion/export on the minor's behalf is a **jurisdiction-dependent legal question** explicitly owned by Department 04 (`legal-regulatory-compliance`) and is not resolved by this architecture. This workflow does not assume either answer.

**Owned resources:** N/A directly (cross-cutting framing over IT-08/PF-06 owned resources).

**States/transitions:** N/A (framing entry).

**Happy path/alternate paths/errors/recovery/offline/sync/notifications:** Inherit from IT-08/PF-06.

**Audit requirements:** Deletion/export events must be retained in a form that demonstrates compliance with applicable data-subject-rights obligations (exact retention/format is Department 04-owned).

**Exit condition:** N/A (standing framing).

**Downstream artifacts:** Serves as an explicit cross-reference for Department 04's review scope. The dedicated data-subject-request intake workflow now **exists** as PS-08 (added for finding F-09).

**Open questions:** `OQ-PS08-STANDING` and `OQ-PS08-JURISDICTION` (both owned in PS-08) — parent/guardian rights for minors and jurisdiction-specific obligations. Safe default: honour a data subject's own access/export/deletion; guardian requests are accepted and worked manually with legal review.

---

## PS-06 — Coach-Athlete Communication Safety

**Purpose:** State the cross-cutting safety framing of MG-04 (private coach-athlete chat), consolidating why it is treated as a risk-sensitive workflow rather than an ordinary messaging feature.

**Actors:** Coaches, Athletes (MG-04 actors); Department 04 (policy owner).

**Capability / trigger:** MG-04.

**Preconditions:** Same as MG-04.

**Authorization assumptions:** Restated for emphasis: Event Coaches' Team-wide private-messaging reach (broader than their Event Group management scope) is a governed product baseline invariant (Workflow Architecture v2 §9.1), but it is precisely this breadth that makes MG-04's open questions (oversight/visibility, retention policy) safety-material rather than cosmetic. This workflow does not resolve those open questions; it exists to ensure they cannot be silently dropped during implementation because they live only inside a "messaging feature" document.

**Owned resources:** N/A directly (cross-cutting framing over MG-04's owned resources).

**States/transitions/happy path/alternate paths/errors/recovery/offline/sync/notifications:** Inherit entirely from MG-04.

**Audit requirements:** Inherit from MG-04, with explicit Department 04 (`youth-safeguarding-trust-safety`) ownership of whatever oversight/retention design is ultimately adopted.

**Exit condition:** N/A (standing framing).

**Downstream artifacts:** Serves as an explicit cross-reference for Department 04's review scope.

**Open questions:** All open questions already flagged in MG-04 apply here collectively (third-party oversight/visibility, retention policy, membership-end behavior).

---

## PS-07 — Discovered Under-Age Account

**Purpose:** Handle the case where an account asserted age ≥13 at IT-01 but is later identified as belonging to someone under 13. Added for independent-review finding **F-07**; consequence sequencing corrected in the v2 pass so that immediate global termination is **not** the first step.

**Actors:** Any member or StrideLab operations as the *source of the signal* (detection design out of scope); **Platform Safety Administrator** (Department 04) as the sole determiner; the affected account owner; a parent/guardian where applicable (rights OPEN, per PS-05).

**Capability / trigger:** A credible signal that an active account belongs to a user under 13 (via an MG-06 report, operations review, or another workflow).

**Preconditions:** An `active` account exists and a credible under-13 signal has been raised.

**Authorization assumptions (normative v2 — consequence sequencing corrected):**
- No account may remain permanently active for a user established to be under 13 — the PS-01/IT-01 hard baseline, applied after creation.
- Only the Platform Safety Administrator — never a Team Head Coach — may make the determination. A Team-scoped role can only file the report (MG-06) and must escalate.
- The **first** consequence of a credible signal is `restricted_pending_review`, **not** termination: ordinary product use and any unnecessary processing stop immediately; the account is preserved intact and no irreversible action is taken while the review is pending.
- Confirmed ineligibility then proceeds to **governed** account closure (IT-08/IT-09 mechanics) and data handling per approved retention, guardian, safety-evidence, and legal-hold policy.
- A mistaken determination permits **audited restoration**.

**Owned resources:** Under-age case record (account ↔ signal ↔ restriction ↔ determination ↔ consequence ↔ any restoration), audited comprehensively.

**States:** `signal_raised → restricted_pending_review → confirmed_ineligible | not_substantiated`; `confirmed_ineligible → governed_closure`; `not_substantiated → active` (restriction lifted); `governed_closure → restored` (mistaken determination reversed via the audited path).

**State transitions:**
1. `signal_raised → restricted_pending_review`: ordinary use and unnecessary processing stop; the account is preserved intact pending review.
2. `restricted_pending_review → confirmed_ineligible`: Platform Safety Administrator determines, on an auditable basis, that the user is under 13.
3. `confirmed_ineligible → governed_closure`: account and Team memberships close per IT-08/IT-09; data deletion/anonymisation follows approved retention, guardian, safety-evidence, and legal-hold policy.
4. `restricted_pending_review → not_substantiated → active`: no ineligibility found; restriction lifted, case retained minimally.
5. `governed_closure → restored`: a determination later shown to be wrong is reversed through an audited Department 04 restoration path.

**Happy path:** A report indicates an athlete is 11 → account enters `restricted_pending_review` (use stops, data preserved) → Platform Safety Administrator reviews → `confirmed_ineligible` → governed closure with policy-driven data handling and guardian notification per legal guidance, audit trail retained.

**Alternate paths:** Signal not substantiated → restriction lifted, account returns to `active`, minimal case retention.

**Errors/failures:** A Head Coach attempting to determine or close → not authorized. A determination without an auditable basis → process failure. An attempt to hard-delete before determination → blocked (the account is only *restricted* pending review).

**Recovery:** `not_substantiated` restores full use; a wrong `confirmed_ineligible` is reversible via the audited `restored` path.

**Offline behavior:** Not offline-capable.

**Synchronization implications:** The `restricted_pending_review` state must propagate to the user's devices promptly (authorization-sensitive); closure, if reached, follows IT-08/IT-09 semantics.

**Notifications:** Account owner notified of the restriction and of the outcome (safety class, invariant #14 state model). Parent/guardian notification per Department 04 legal guidance.

**Audit requirements:** Mandatory comprehensive audit trail (signal, restriction, reviewer, basis, determination, consequence, data-handling actions, any restoration).

**Exit condition:** The account is either restored to `active` (not substantiated / mistaken determination reversed) or reaches `governed_closure` with policy-driven data handling — in every case auditable, and never via an un-reviewed immediate termination.

**Downstream artifacts:** Feeds IT-08/IT-09 (governed closure mechanics), PS-05 (deletion/export framing), PS-08 (any concurrent data request).

**Open questions (Department 04-owned; the restricted-first sequencing is fixed, not open):**
- `OQ-PS07-GUARDIAN` (guardian verification methods and involvement; safe default: notify a guardian where one is on record and legal guidance requires, no self-service guardian action in v1; affected: PS-07, PS-08; blocking stage: guardian-facing features).
- `OQ-PS07-RETENTION` (retention periods; deletion vs anonymisation for a confirmed-ineligible account; safe default: preserve safety-evidence and legal-hold data, delete/anonymise the rest per the account-level policy; affected: PS-07, PS-05; blocking stage: the deletion implementation).
- `OQ-PS07-JURISDICTION` (jurisdiction-specific duties on discovering an under-13 user; owner: Department 04 legal; safe default in force: apply the strictest known duty, preserve safety evidence, and escalate to counsel pending analysis; blocking stage: production launch legal sign-off).
- `OQ-PS07-DETECTION` (proactive vs purely report-driven age-signal detection; safe default: report-driven only in v1).

---

## PS-08 — Data Subject Request Intake

**Purpose:** Provide an explicit intake and routing workflow for data-subject-rights requests (access/export, correction, deletion) that are broader than the self-service paths (IT-08 account deletion, PF-06 report/history export). v1 acknowledged this was missing (PS-05). Added in the v1 remediation pass for independent-review finding **F-09**.

**Actors:** Data subject (account owner); parent/guardian or legal representative where applicable (standing per `OQ-PS08-STANDING`); Department 04 (`privacy-data-governance`, `legal-regulatory-compliance`) as owner; Department 06 support-operations as intake handler.

**Capability / trigger:** A data-subject request raised through a support/privacy channel. Self-service IT-08 / PF-06 remain the primary path for the cases they cover; PS-08 is the catch-all for everything else and for guardian-initiated requests.

**Preconditions:** A request has been received and the requester's relationship to the account (self / guardian / representative) can be established or is pending verification.

**Authorization assumptions:**
- A request is honoured only after the requester's identity and standing are verified — self via authenticated session or an IT-07-equivalent proof; guardian/representative per `OQ-PS08-STANDING`.
- Fulfilling a request never exceeds the data subject's own authorization scope: an export returns the subject's data only; media depicting other athletes is handled per the MD-* / VS-* boundaries (explicit-grant tagging, athlete-to-athlete sharing disabled, re-share consent — all now normative in the media/vault categories).
- This workflow routes and tracks; retention periods, legal bases, and applicable jurisdictions are Department 04-owned.

**Owned resources:** DSR case record (requester, subject, request type, verification status, routing, fulfillment artifacts, closure), audited.

**States:** `received → identity_pending → in_fulfillment → fulfilled | partially_fulfilled | refused`.

**State transitions:**
1. `received → identity_pending`: intake logs the request and initiates standing/identity verification.
2. `identity_pending → in_fulfillment`: verification succeeds; the request is routed — access/export → a PF-06-style export scoped to *all* the subject's data (profile, membership metadata, session and personal-workout logs, media they own, messages they authored, derived history), not just reports; deletion → IT-08 mechanics plus any data outside the account boundary; correction → PR-02 for profile fields, or the owning workflow for other records.
3. `in_fulfillment → fulfilled | partially_fulfilled | refused`: completion, with reasons recorded for any refusal or partial fulfillment (e.g., data under a legal/moderation hold, or data whose deletion would violate another obligation).

**Happy path:** A subject requests a full export → identity confirmed via authenticated session → an export covering all their data is produced → case closed with an audit record.

**Alternate paths:** A parent/guardian requests deletion on behalf of a 14-year-old → standing verified per the (OPEN) guardian path → routed to IT-08 mechanics with guardian-specific handling → fulfilled or partially fulfilled with reasons.

**Errors/failures:** Identity/standing not verified within policy window → request not fulfilled; non-disclosing closure. Request for data the requester has no rights to → refused with reason.

**Recovery:** A refused/partially-fulfilled request can be re-raised with additional verification or narrowed scope.

**Offline behavior:** Not offline-capable.

**Synchronization implications:** A deletion fulfilled here propagates with IT-08/IT-06 semantics across the subject's devices and any Team context.

**Notifications:** Requester notified at receipt, at verification outcome, and at closure, with the fulfillment artifact or the reason for refusal/partial fulfillment.

**Audit requirements:** Mandatory — the case record must demonstrate compliance (who requested what, standing basis, what was provided or refused and why, timing).

**Exit condition:** The request reaches a terminal state with an auditable trail and, where applicable, a delivered export or completed deletion.

**Downstream artifacts:** Uses PF-06 (export mechanics), IT-08 (deletion mechanics), PR-02 (profile correction); feeds PS-05 (data-subject-rights framing).

**Open questions (Department 04 legal ownership; each carries a safe default):**
- `OQ-PS08-STANDING` (guardian/representative standing and proof path; safe default: only the authenticated account owner may act in v1; a guardian request is accepted, logged, and worked manually by Department 04 with legal review; affected: PS-08, PS-07; blocking stage: a self-service guardian portal).
- `OQ-PS08-JURISDICTION` (which jurisdictions' rights apply and their SLAs; safe default: honour access/export/deletion for every requester, on a best-effort timeline, pending a formal matrix; owner: Department 04 legal).
- `OQ-PS08-HOLD-INTERACTION` (deletion vs legal/moderation holds and data other members depend on; safe default: deletion is `partially_fulfilled` for held or dependency-critical data with a recorded reason, never a silent skip; shared with IT-06/IT-08/IT-09).
- `OQ-PS08-SELFSERVICE` (whether a broader-than-PF-06 self-service export surface is offered; safe default: assisted intake only in v1).

---

## PS-09 — Illegal Content & Mandatory-Escalation Path

**Purpose:** Ensure that reports or signals indicating potentially illegal content or an imminent-harm situation (e.g., child sexual abuse material, credible threats, grooming indicators) are access-restricted, protected from redistribution, securely preserved, and routed past ordinary Team-level moderation to qualified safety/legal review. Added for independent-review finding **F-10**.

**Actors:** Any member (as reporter, via MG-06); **Platform Safety Administrator** (Department 04, least-privilege platform actor); external authorities / legal counsel (handoff only — adjudication is explicitly outside StrideLab's scope).

**Capability / trigger:** An MG-06 report or an operations signal classified as potential illegal content / imminent harm (`OQ-PS-CLASSIFY`).

**Preconditions:** A report/signal exists and has been classified into this path.

**Authorization assumptions:**
- This path is **not** resolvable at Team level. A Team Head Coach cannot review, dismiss, or adjudicate it — their role is limited to filing the report and preserving access context; the case routes directly to the Platform Safety Administrator.
- Content relevant to such a case is placed under a preservation / legal hold (interacts with MD-07 retention and MG-06 investigation-retention open questions) — ordinary deletion (IT-08, MD-07, PS-08, IT-09) does not purge held content until the hold is released.
- Any handoff to external authorities is performed only by the platform authority under legal guidance — never by a Team-level actor and never automatically without that guidance.

**Owned resources:** Escalation case record (classified report ↔ preservation hold ↔ platform-authority actions ↔ external handoff, if any), audited comprehensively.

**States:** `classified → preserved → platform_review → resolved`, with a parallel `hold_active ↔ hold_released` on the associated content.

**State transitions:**
1. `classified → preserved`: associated content and context are placed under a preservation hold immediately on classification, and made inaccessible pending review.
2. `preserved → platform_review`: the Platform Safety Administrator takes the case, bypassing Team-level review entirely.
3. `platform_review → resolved`: platform-side action taken (content removal, account action beyond a single Team, external handoff under legal guidance); hold released or maintained per legal guidance.

**Happy path:** A member reports an image they believe is CSAM → the report is classified into this path → content is preserved and made inaccessible pending review → the platform authority reviews and takes action including any legally-required external handoff → case resolved with a complete audit trail.

**Alternate paths:** Classification on review turns out to be incorrect (content is not illegal) → the case exits to ordinary MG-06/PS-03 handling or is dismissed; the preservation hold is released per policy.

**Errors/failures:** A case that should have been classified into this path but was handled as ordinary moderation is a **product-safety failure** (same framing as PS-03's escalation-gap language) — the classification step must be designed so this cannot happen silently. A Team-level actor attempting to dismiss such a case → not authorized.

**Recovery:** Escalation design must prevent the mis-classification failure by construction, not rely on after-the-fact recovery.

**Offline behavior:** Not offline-capable.

**Synchronization implications:** Preservation holds and access restrictions must propagate promptly and reliably. Per master §5 invariant #14 (v2 formulation): transactional authoritative state, durable retry, idempotent processing, delivery/ack state, audited terminal failure, human escalation on unresolved safety-critical failure. A stale device must not retain access to held content.

**Notifications:** Reporter receipt acknowledgement per MG-06, backed by the invariant #14 state model (not a literal delivery guarantee). Notification of the reported individual is a sensitive legal decision and is **not** assumed — over-notification could impede an investigation or create harm.

**Audit requirements:** Mandatory, comprehensive, and retained per legal guidance regardless of ordinary retention policy.

**Exit condition:** The case reaches `resolved` at the platform authority level with a complete audit trail and an explicit decision on the preservation hold.

**Downstream artifacts:** May trigger IT-06 (removal), IT-08-equivalent account termination beyond a single Team, PS-07 (if age is also implicated), and legal/compliance handoff (Department 04/06).

**Open questions (Department 04-owned; the *bypass + preserve + restrict + route* behaviour is fixed, not open):**
- `OQ-PS-CLASSIFY` (classification criteria and who/what performs classification — automated, human, or both; safe default: any reporter-selected "illegal / imminent harm" category, plus operations review, routes here and is preserved pending human review — over-inclusion is safer than under-inclusion; affected: MG-06, PS-09; blocking stage: automated classification).
- `OQ-PS-MOD-STAFFING` (Platform Safety Administrator staffing / SLA; shared with PS-03).
- `OQ-PS09-EXTERNAL` (external-reporting obligations by jurisdiction and the legal-guidance process for any handoff; owner: Department 04 legal; safe default: no automated external reporting — every handoff is human- and legal-counsel-gated).
- `OQ-PS09-HOLD` (preservation-hold duration, storage, access controls; safe default: hold indefinitely until Department 04 legal releases it; access limited to the Platform Safety Administrator).
