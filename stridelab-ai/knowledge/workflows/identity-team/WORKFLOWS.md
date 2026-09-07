# Identity & Team Workflows

**Category:** identity-team
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture

Workflows in this file establish the identity and Team-membership lifecycle that every
other category depends on. No workflow here defines UI navigation.

## DD-DEPARTED-CONTENT — Consolidated departed-member content-disposition decision (finding F-16)

A single normative rule, referenced by IT-06 (removal), IT-08 (account
deletion), IT-09 (Team closure), TA-01 (Head Coach transfer), and MD-07
(media lifecycle). When a member leaves, is removed, deletes their account,
or a Team is closed:

- **Stays with the athlete:** the athlete's personal profile (PR-*), their
  performed-work logs (SE-05/06/07, SE-10 amendments), and their personal
  workouts (PW-*). These are athlete-owned and are never deleted as a side
  effect of a Team-side event; they follow the athlete's own account
  lifecycle.
- **Stays with the Team:** coach-authored training plans (TP-*),
  administrative and roster records, session-execution instances as
  historical Team records, and Team-authored analysis. Authorship attribution
  is retained even after the author departs; a departed coach's plans are
  re-owned by the Head Coach (or the successor), not purged.
- **Membership-derived access ends immediately** for the departing member
  (channels, Vault grants they received, plan visibility) — the *records*
  persist per the rules above; only the person's access ends.
- **Authored messages** the departed member posted remain in channel history;
  **restricted audit/safety evidence** (moderation, preservation holds)
  follows the approved retention policy and is not deleted by an ordinary
  departure.
- **No indiscriminate cascading deletion.** Removing a person or closing a
  Team never triggers a blanket delete of dependent content; each class is
  resolved per the rules above.
- **Exact retention durations and the deletion-vs-anonymisation choice
  remain OPEN** under Department 04 / legal ownership (`OQ-DD-RETENTION`;
  safe default: retain while any owning account is active and follow the
  account-level policy on final account deletion; affected: IT-06/08/09,
  TA-01, MD-07, PS-05/PS-08; blocking stage: the deletion/retention
  implementation).

---

## IT-01 — Signup / Account Creation

**Purpose:** Create a durable, authenticated StrideLab identity independent of any Team membership.

**Actors:** Prospective user (future Coach or Athlete).

**Capability / trigger:** Available to an unauthenticated visitor who initiates account creation.

**Preconditions:**
- User is not already authenticated.
- User asserts an age at or above the product baseline (13+).

**Authorization assumptions:**
- No Team-scoped authorization exists yet; this workflow only establishes a global identity.
- Identity creation is independent of, and prerequisite to, any Team role.

**Owned resources:** Account/Identity record; credential record; global profile shell (display name, contact identifier, date-of-birth/age-assertion field).

**States:** `unauthenticated → pending_verification → active` (or `rejected_underage`).

**State transitions:**
1. `unauthenticated → pending_verification`: user submits credential + age assertion.
2. `pending_verification → active`: contact identifier verified (e.g., email/phone confirmation).
3. `pending_verification → rejected_underage`: age assertion fails the 13+ baseline.
4. `pending_verification → expired`: verification not completed within policy window → user must restart.

**Happy path:** User submits credentials and age assertion → verification challenge sent → user confirms → account becomes `active` with zero Team memberships.

**Alternate paths:**
- Sign-up via federated identity provider (governed by Department 04; not modeled here).
- User already holds an account and attempts duplicate signup → redirected to sign-in.

**Errors/failures:**
- Age assertion below 13 → hard rejection, no account created, no personal data retained beyond the minimum required to enforce the rejection (Department 04 owns retention policy).
- Verification challenge undeliverable → retry / alternate contact method.
- Duplicate identifier → conflict error, no new account created.

**Recovery:** Expired verification restarts `pending_verification`; no partial account is left in an ambiguous state.

**Offline behavior:** Not offline-capable; account creation requires connectivity to the identity provider.

**Synchronization implications:** None (pre-sync boundary).

**Notifications:** Verification prompt to the asserted contact identifier.

**Audit requirements:** Account-creation and age-gate decision events are recorded (Department 04 owns retention/format).

**Exit condition:** Account is `active` with no Team membership, or creation is terminated without a durable account.

**Downstream artifacts:** Identity record consumed by IT-02, IT-03, IT-04, and every authorization check across all other categories.

**Open questions:**
- `OQ-IT01-AGE-VERIFY` (owner: Department 04; safe default for v1: self-attestation of age ≥13 at signup, with PS-07 as the discovered-under-age response path; evidence required: a legal decision on whether stronger age verification is required by jurisdiction/App Store; affected: IT-01, PS-01, PS-07; blocking stage: production launch legal sign-off).
- `OQ-IT01-REJECT-RETENTION` (owner: Department 04 `privacy-data-governance`; safe default: retain only the minimum needed to enforce the rejection (a hashed identifier + timestamp), no profile data; affected: IT-01, PS-01; blocking stage: the signup implementation).

---

## IT-02 — Coach Creates Team

**Purpose:** Establish a new Team with its creator installed as Head Coach / Team Creator.

**Actors:** Authenticated user (becomes Head Coach / Team Creator).

**Capability / trigger:** Available to any authenticated identity with an `active` account, to establish a new Team.

**Preconditions:** Actor holds an `active` account (IT-01 complete).

**Authorization assumptions:**
- Any authenticated identity may create a Team; Team creation does not require an existing Team role.
- The creating identity is automatically assigned Head Coach / Team Creator scoped to the new Team only — it does not affect roles the identity holds on other Teams.

**Owned resources:** Team record; root Event Group container (Team itself is the top of the hierarchy); Team settings (including `personal_workouts_allowed`, tier state).

**States:** `draft → active` (a Team with zero athletes may still be `active`; it is not blocked on membership).

**State transitions:**
1. `nonexistent → draft`: creator submits Team name/basic identity.
2. `draft → active`: Team record persists with creator installed as Head Coach.

**Happy path:** User names the Team → Team is created → creator is Head Coach → default Team settings applied (Free tier by default, `personal_workouts_allowed` default per BE/TA baseline) → creator lands in Team administration context.

**Alternate paths:** Creator immediately proceeds to TA-02 (create Event Groups) or IT-03 (invite members) — both optional at creation time.

**Errors/failures:** Team-name collision policy, malformed input — validation errors, no partial Team persisted.

**Recovery:** Failed creation leaves no orphaned Team record.

**Offline behavior:** Team creation requires connectivity (server is authoritative for Team identity/tier state).

**Synchronization implications:** New Team record must propagate to the creator's client before dependent actions (invites, Event Group creation) are enabled.

**Notifications:** Confirmation to creator only; no other actors exist yet.

**Audit requirements:** Team-creation event with creator identity is recorded (ownership/authorization audit trail root).

**Exit condition:** Team exists, is `active`, and has exactly one Head Coach / Team Creator.

**Downstream artifacts:** Team record consumed by TA-01–TA-07, IT-03/IT-04, all training-planning/session/media/messaging/billing workflows (everything is Team-scoped).

**Open questions:** None material — this is a stable invariant per the approved baseline.

---

## IT-03 — Athlete / Coach Invitation

**Purpose:** Authorize a specific person to join a specific Team in a specific prospective role.

**Actors:** Head Coach / Team Creator; prospective Athlete or Event Coach invitee.

**Capability / trigger:** Available to the Head Coach / Team Creator to authorize a specific person to join their Team in a specific prospective role.

**Preconditions:** Actor holds the Head Coach / Team Creator role.

**Authorization assumptions (normative v2):**
- Only the Head Coach / Team Creator may issue invitations in v1. Event Coaches cannot invite (part of candidate decision `CD-EC-DELEGATION`; safe default: no delegation).
- Invitation authority is distinct from membership-assignment authority (TA-04/TA-05).

**Owned resources:** Invitation record (target identity or open contact channel, proposed role, proposed Event Group/Subgroup scope, expiry).

**States:** `issued → accepted | declined | expired | revoked`.

**State transitions:**
1. `issued`: inviter creates invitation with proposed role/scope.
2. `issued → accepted`: invitee acts on IT-04 (join Team).
3. `issued → declined`: invitee explicitly declines.
4. `issued → expired`: invitation exceeds validity window.
5. `issued → revoked`: inviter cancels before acceptance.

**Happy path:** Head Coach issues invitation (role + optional Event Group/Subgroup) → invitee receives it → invitee accepts → IT-04 executes.

**Alternate paths:** Invitation sent to a contact identifier with no existing account → invitee must complete IT-01 before IT-04 can complete.

**Errors/failures:** Invitation to an identity already a member of the Team in an equivalent role → rejected as redundant. Invitation to an already-`active` invitation for the same identity/role → conflict, prior invitation must be revoked or reused.

**Recovery:** Expired/declined invitations can be reissued.

**Offline behavior:** Invitation issuance requires connectivity to persist server-side; local queuing for retry is acceptable but the invitation is not authoritative until server-acknowledged.

**Synchronization implications:** Invitation state must be consistent between inviter and invitee views before IT-04 is allowed to proceed.

**Notifications:** Invitee notified of pending invitation; inviter notified on accept/decline/expiry.

**Audit requirements:** Invitation issuance, acceptance, decline, revocation are all audit events (authorization-sensitive: establishes future Team access).

**Exit condition:** Invitation reaches a terminal state (`accepted` handoff to IT-04, `declined`, `expired`, or `revoked`).

**Downstream artifacts:** Accepted invitation feeds IT-04 (join Team) and TA-01 (role assignment) / TA-04/TA-05 (group assignment) if scope was pre-declared.

**Open questions:**
- Event Coach invitation authority is **resolved** (Head-Coach-exclusive in v1); future delegation is candidate decision `CD-EC-DELEGATION`.
- `OQ-IT03-PRESCOPE` (owner: Department 01; safe default: an invitation **may** pre-declare a proposed Event Group/Subgroup, but the assignment record is only created by a Head Coach TA-04 action after join — the invitation carries a proposal, not an authorization; affected: IT-03, IT-04, TA-04; blocking stage: none — safe default is implementable).

---

## IT-04 — Join Team

**Purpose:** Convert an accepted invitation (or equivalent authorized path) into actual Team membership.

**Actors:** Invitee (Athlete or Event Coach), Team (as authorization boundary).

**Capability / trigger:** Available to an invitee with an `active` account who acts on a valid pending invitation (IT-03).

**Preconditions:** Invitee holds an `active` account. A valid, non-expired, non-revoked invitation exists.

**Authorization assumptions:**
- Joining a Team grants only the role/scope declared in the invitation — never broader.
- Joining one Team does not affect roles the identity holds on other Teams (multi-Team role independence is a hard invariant).

**Owned resources:** Team-membership record (identity ↔ Team ↔ role ↔ optional Event Group/Subgroup scope).

**States:** `invited → member_active`; a member can later move to `member_removed` (IT-06) or `member_left` (self-initiated departure, distinct from removal).

**State transitions:**
1. `invited → member_active`: invitee accepts and membership record is created.
2. `member_active → member_left`: athlete/coach voluntarily leaves the Team (self-service; distinct from IT-06 which is coach-initiated removal).

**Happy path:** Invitee accepts → membership record created with declared role/scope → invitee gains Team-scoped access consistent with that role.

**Alternate paths:** Invitee has multiple pending invitations across different Teams → each accepted independently, producing independent membership records.

**Errors/failures:** Invitation expired/revoked at acceptance time → join fails with explicit reason, no partial membership created. Role conflict (e.g., identity already holds a different role on the same Team) → must be resolved as a role change (TA-01), not a duplicate join.

**Recovery:** Failed join due to expiry prompts inviter to reissue (IT-03).

**Offline behavior:** Join requires server confirmation; a locally optimistic "joined" state must be reconciled and rolled back if the server rejects it.

**Synchronization implications:** Membership record must propagate to Team roster views (coach dashboards, group rosters) before the new member is treated as assignable in TA-04/TA-05.

**Notifications:** Inviter notified of successful join; new member notified of Team context (settings, `personal_workouts_allowed` state, etc.).

**Audit requirements:** Membership creation is an authorization-sensitive audit event (root of all subsequent Team-scoped access checks for this identity).

**Exit condition:** Membership record exists in `member_active` with a defined role and scope, or the join attempt is cleanly terminated with no partial state.

**Downstream artifacts:** Membership record consumed by every Team-scoped workflow (TA-*, TP-*, SE-*, MD-*, MG-*, VS-*, PF-*, BE-*).

**Open questions:** `OQ-IT04-JOIN-MECHANISM` (owner: Department 01 with Department 04; safe default for v1: **direct invitation only** — no open join code, link, or self-serve approval queue, since an uncontrolled join path is a youth-safety risk; evidence required: a vetting design if a broader join path is wanted; affected: IT-03, IT-04; blocking stage: any non-invitation join mechanism).

---

## IT-05 — Team Switching

**Purpose:** Let a user who holds roles/memberships on multiple Teams move their active working context between Teams without cross-contaminating data or authorization.

**Actors:** User holding membership on ≥2 Teams.

**Capability / trigger:** Available to a user with membership on ≥2 Teams who moves their active working context from one Team to another. (This is a workflow-behaviour spec, not a navigation spec.)

**Preconditions:** User holds ≥1 additional Team membership besides the currently active context.

**Authorization assumptions:**
- Switching context changes which Team's data/role scope is active; it never merges roles or data across Teams.
- Authorization checks are always evaluated against the currently active Team context, never a union of Teams.

**Owned resources:** "Active Team context" pointer (session-scoped, not a durable resource by itself).

**States:** `context: Team A active → context: Team B active`.

**State transitions:** `active_context(Team A) → active_context(Team B)` — atomic from the user's perspective; no intermediate state exposes both contexts simultaneously.

**Happy path:** User selects a different Team they belong to → app reloads Team-scoped state (role, groups, plans, media, chats) scoped to the new Team → prior Team's screens/state are discarded or cached separately, never merged.

**Alternate paths:** User has in-progress unsynced local work (e.g., an offline session log or personal workout draft) scoped to Team A when switching to Team B — local drafts remain associated with their originating Team and are not visible under Team B.

**Errors/failures:** Attempt to switch into a Team the user no longer belongs to (e.g., removed since last sync) → switch fails, user is returned to a Team they still belong to (or to a no-Team state if none remain).

**Recovery:** If the previously active Team's data fails to reload cleanly, the switch is retried; the user is never left with mixed-Team state rendered together.

**Offline behavior:** Switching to a Team whose data was previously cached locally is possible offline (read-only against cached state); switching to a Team never cached locally requires connectivity.

**Synchronization implications:** Each Team's sync state (last-synced cursor, pending offline writes) is maintained independently per Team; switching does not reset or merge sync cursors across Teams.

**Notifications:** None required for the switch itself; Team-scoped notification subscriptions may need re-evaluation on switch (e.g., which Team's chat notifications are currently "foregrounded").

**Audit requirements:** Not independently audited beyond normal session activity; authorization checks downstream naturally scope to the active Team.

**Exit condition:** Exactly one Team context is active and all rendered/authorized data belongs to that Team.

**Downstream artifacts:** Active-context pointer consumed by every subsequent authorization check in the session.

**Open questions:** None material. Behaviour when a user's last remaining Team membership is removed while switching → fall back to a "no Team" state (normative); the landing-state UX is a navigation concern, not modeled here.

---

## IT-06 — Team Membership Removal

**Purpose:** Coach-initiated termination of a member's access to a Team, distinct from voluntary departure (IT-04's `member_left`).

**Actors:** Head Coach / Team Creator (sole removal authority in v1); removed member (Athlete or Event Coach).

**Capability / trigger:** Available to the Head Coach / Team Creator to terminate a member's access to the Team.

**Preconditions:** Target is an active member of the Team.

**Authorization assumptions (normative v2):**
- Only the Head Coach / Team Creator may remove a member in v1. Event Coach removal authority is candidate decision `CD-EC-DELEGATION` (safe default: no delegation — an Event Coach may *request* a removal from the Head Coach).
- Removal terminates Team-scoped access only; it does not affect the removed user's global account or their roles on other Teams.
- Content disposition on removal follows **DD-DEPARTED-CONTENT** (athlete-owned data stays with the athlete; Team plans/records stay with the Team; access ends immediately; no cascading deletion).

**Owned resources:** Team-membership record; downstream Event Group/Subgroup assignment records.

**States:** `member_active → member_removed`.

**State transitions:** `member_active → member_removed`: coach confirms removal; all Event Group/Subgroup assignments for that membership are terminated as part of the same transition (they cannot outlive the membership).

**Happy path:** Coach selects member → confirms removal (destructive action requiring explicit confirmation) → membership and all group assignments end → removed user loses Team-scoped access immediately.

**Alternate paths:** Removal of a coach who owns in-flight training-plan authorship — per DD-DEPARTED-CONTENT the plans stay with the Team and are re-owned by the Head Coach (authorship attribution retained), never silently deleted.

**Errors/failures:** Attempt to remove the sole Head Coach / Team Creator without a designated successor → blocked (a Team cannot be left without a Head Coach).

**Recovery:** Removal is intended to be terminal, not reversible via undo; re-establishing access requires a fresh IT-03/IT-04 invitation cycle.

**Offline behavior:** Removal requires server confirmation; offline devices belonging to the removed user must lose access on next sync (their locally cached Team data becomes stale/inaccessible per Department 04 policy).

**Synchronization implications:** Removal must propagate before the removed user's device can execute any further Team-scoped write; a race between a queued offline write and a removal must resolve in favor of removal (deny the write).

**Notifications:** Removed member notified of removal; Head Coach/relevant coaches notified for audit visibility.

**Audit requirements:** Removal is authorization-sensitive and must be audited with actor, target, scope, and timestamp — this is a destructive transition per workflow-architecture invariants (identifies authority, confirmation, reversibility, downstream effects).

**Exit condition:** Membership record is `member_removed`, all dependent scope assignments are ended, and the removed identity can no longer pass Team-scoped authorization checks.

**Downstream artifacts:** Feeds authorization checks across all categories; may trigger content-ownership handoff questions in training-planning and media.

**Open questions:** Event Coach removal authority is **resolved** (Head-Coach-only in v1; `CD-EC-DELEGATION` for future). Content disposition is **resolved** via DD-DEPARTED-CONTENT; only retention durations remain OPEN (`OQ-DD-RETENTION`).

---

## IT-07 — Account Recovery

**Purpose:** Restore access to an existing account when the user has lost their credential, without creating a duplicate identity.

**Actors:** User who previously completed IT-01.

**Capability / trigger:** Available to an unauthenticated visitor who has lost their credential and initiates recovery.

**Preconditions:** A matching account record exists.

**Authorization assumptions:** Recovery must prove control of the original identity's verified contact channel(s) before any credential change; it must never grant access based on knowledge of Team membership alone.

**Owned resources:** Credential record (reset), account record (unchanged identity).

**States:** `active(locked-out) → recovery_pending → active(restored)`.

**State transitions:**
1. `active → recovery_pending`: user initiates recovery with an identifying factor (email/phone).
2. `recovery_pending → active`: verification succeeds and new credential is set.
3. `recovery_pending → expired`: recovery window lapses without completion.

**Happy path:** User requests recovery → verification challenge sent to verified channel → user proves control → sets new credential → regains access with all existing Team memberships intact.

**Alternate paths:** Recovery for an account whose only verified channel is no longer controlled by the user — escalates to a manual/Department 04-owned identity-proofing path (not modeled here as a standard workflow step).

**Errors/failures:** Verification challenge fails repeatedly → rate-limited/locked per Department 04 security policy. Recovery attempted for a non-existent account → generic non-disclosing failure (do not reveal account existence).

**Recovery:** This workflow is itself the recovery path; a failed attempt simply allows retry within policy limits.

**Offline behavior:** Not offline-capable.

**Synchronization implications:** None beyond normal re-authentication; existing Team memberships and local caches are unaffected once access is restored.

**Notifications:** Confirmation to the verified channel when credentials change (security notification, sent regardless of which device initiated recovery).

**Audit requirements:** Credential-reset events are security-audited (account-takeover risk surface).

**Exit condition:** User regains authenticated access to the same identity with unchanged Team memberships, or recovery is cleanly abandoned with no credential change.

**Downstream artifacts:** Re-authenticated session resumes normal use of IT-05 and all Team-scoped workflows.

**Open questions:** `OQ-IT07-VERIFY-STRENGTH` (owner: Department 04 `identity-account-lifecycle` / `security-engineering`; safe default: proof of control of a verified contact channel + rate limiting + a security notification on credential change; a lost-sole-channel case escalates to a manual Department 04 identity-proofing path; affected: IT-07; blocking stage: production auth launch).

---

## IT-08 — Account Deletion

**Purpose:** Let a user permanently terminate their global account, distinct from leaving or being removed from a single Team.

**Actors:** Account owner.

**Capability / trigger:** Available to an authenticated account owner to permanently terminate their own global account.

**Preconditions:** User is authenticated as the account owner.

**Authorization assumptions:**
- Only the account owner (or an authorized Department-04-defined recovery/legal path) may initiate deletion of their own account.
- Deletion of an account that is the sole Head Coach / Team Creator of a Team must resolve Team continuity (successor Head Coach or Team dissolution) before or as part of deletion — a Team must not be left without a Head Coach.

**Owned resources:** Account/identity record; all Team-membership records tied to that identity; personal profile data.

**States:** `active → deletion_pending → deleted`.

**State transitions:**
1. `active → deletion_pending`: user confirms intent (destructive action requiring explicit confirmation, per workflow-architecture invariants).
2. `deletion_pending → deleted`: all required downstream resolution (successor Head Coach where applicable, data-retention/export obligations) completes and the account is terminated.
3. `deletion_pending → active`: user cancels within a grace window (if a grace window is adopted — OPEN).

**Happy path:** User confirms deletion → if sole Head Coach on any Team, is prompted to designate a successor or dissolve the Team → confirms → account and memberships terminate → data handled per Department 04 retention/export policy.

**Alternate paths:** Athlete-only account with no Head Coach role → deletion proceeds without the successor step.

**Errors/failures:** Deletion requested while sole Head Coach and no successor is designated and Team dissolution is not confirmed → blocked pending resolution.

**Recovery:** Whether deletion is immediately irreversible or has a grace/undo window is OPEN; if adopted, cancellation restores `active` with all prior memberships intact.

**Offline behavior:** Not offline-capable; requires server-side finalization.

**Synchronization implications:** All devices previously authenticated as this identity must lose access on next sync; any Team the user belonged to must reflect the membership's termination consistent with IT-06 semantics.

**Notifications:** Confirmation to the user; Head Coach/other coaches notified if a Team-affecting deletion (e.g., successor handoff) occurred.

**Audit requirements:** Deletion is a destructive, privacy-sensitive, audited event; export/retention obligations are Department 04-owned.

**Exit condition:** Account reaches `deleted` with all Team continuity obligations resolved, or the deletion is cancelled and the account remains fully `active`.

**Downstream artifacts:** Feeds PS-05 (deletion/export framing), PS-08 (DSR intake); may trigger IT-09 (Team closure) if the deleter is a sole Head Coach with no successor.

**Open questions:**
- `OQ-IT08-GRACE` (owner: Department 01 with Department 04; **safe default: a 30-day recoverable grace window** before deletion is final — the account is deactivated but restorable during it; evidence required: jurisdiction-specific legal review; affected: IT-08, IT-09, PS-05; blocking stage: the deletion implementation).
- Content disposition is **resolved** via **DD-DEPARTED-CONTENT**; only retention durations / deletion-vs-anonymisation remain OPEN (`OQ-DD-RETENTION`, Department 04 / legal).

---

## IT-09 — Team Closure / Dissolution

**Purpose:** End a Team's lifecycle in a controlled, **archive-first, recoverable-then-irreversible** way, distinct from removing individual members (IT-06) or deleting a global account (IT-08). Added for independent-review finding **F-02**; state model expanded in the v2 pass.

**Actors:** Head Coach / Team Creator (sole initiator); Department 04 (retention/deletion policy owner); Department 06 (billing/subscription teardown, refund policy).

**Capability / trigger:** Available to the current Head Coach / Team Creator to close their Team; also reached from IT-08 when a sole Head Coach deletes their account and designates no successor.

**Preconditions:** Team exists (IT-02). Actor is the current Head Coach / Team Creator.

**Authorization assumptions (normative v2):**
- Only the current Head Coach / Team Creator may close a Team. Not delegable; not conferred or blocked by billing/tier state.
- **The final Head Coach must either transfer ownership (TA-01a) or initiate Team closure** — a Team is never left ownerless.
- Closure is **archive-first** and supports **cancellation/recovery before its irreversible stage**.
- **Membership-derived access ends immediately** at `closure_pending` — the person loses access at once even though records are still being resolved.
- Content disposition follows **DD-DEPARTED-CONTENT**: athlete-owned profiles, performed-work logs, and personal workouts **remain with the athlete**; Team plans and administrative records **remain with the Team** (archived); authored messages and restricted audit/safety evidence follow the approved retention policy.
- **No indiscriminate cascading deletion.**
- Exact retention durations and deletion-vs-anonymisation remain **OPEN** under Department 04 / legal (`OQ-DD-RETENTION`).

**Owned resources:** Team record terminal state; the set of memberships, hierarchy records, and archived Team content.

**States:** `active → closure_pending → archived → deletion_eligible → deleted_or_anonymized` (with a recovery transition back to `active` from `closure_pending` or `archived`).

**State transitions:**
1. `active → closure_pending`: Head Coach confirms intent (destructive/consequential — explicit confirmation, named downstream effects). Membership-derived access ends immediately for all members. Subscription cancellation is initiated via BE-* (Department 06 refund policy applies).
2. `closure_pending → archived`: Team content is placed in a read-only archived state; athlete-owned data is confirmed retained with each athlete; the Team is recoverable up to and for a defined window after this point (`OQ-IT08-GRACE`).
3. `archived → deletion_eligible`: the recovery window lapses without cancellation.
4. `deletion_eligible → deleted_or_anonymized`: Team-side records that are not athlete-owned and not under a legal/audit hold are deleted or anonymised per policy; held/audit data is retained.
- **Recovery:** `closure_pending → active` or `archived → active` — the Head Coach cancels within the recovery window; memberships and access are restored intact.

**Happy path:** Head Coach confirms closure → members lose access, subscription cancels → Team enters `archived` (read-only, recoverable) → after the recovery window it becomes `deletion_eligible` → Team-side non-owned data is deleted/anonymised, athlete-owned data stays with each athlete, audit/held data retained.

**Alternate paths:** Head Coach cancels during `closure_pending`/`archived` → Team returns to `active`, memberships restored. Closure triggered by IT-08 (sole Head Coach deletion, no successor) → same lifecycle from that flow.

**Errors/failures:** Closure by a non-Head-Coach → rejected. Closure while a legal/moderation hold (PS-03/PS-09/MD-07) applies → closure proceeds but held content stays under hold past `deletion_eligible` until Department 04 releases it. An attempt to skip `archived` and hard-delete immediately → not supported.

**Recovery:** Full recovery from `closure_pending`/`archived`; after `deletion_eligible` the Team is not recoverable and re-forming is a fresh IT-02.

**Offline behavior:** Not offline-capable; requires server-side finalization and billing-provider interaction.

**Synchronization implications:** Every member's device must lose Team-scoped access on the `closure_pending` transition; a queued offline write racing closure resolves in favour of closure.

**Notifications:** All members notified of impending closure, of `archived`, and of final data handling (operational/safety class). Head Coach receives confirmation and any export artifact the retention policy provides.

**Audit requirements:** Every transition is a mandatory-audit event (actor, timestamp, per-class disposition summary, retention/hold actions).

**Exit condition:** The Team reaches `deleted_or_anonymized` with athlete-owned data retained by each athlete, Team-side non-owned data deleted/anonymised per policy, held/audit data retained, and commercial state terminated — or closure is cleanly cancelled and the Team returns to `active`.

**Downstream artifacts:** Feeds PS-05 (deletion/export framing), PS-08 (a member's data request around closure), BE-02/BE-06 (subscription teardown + refund policy), DD-DEPARTED-CONTENT.

**Open questions:**
- `OQ-IT08-GRACE` (recovery/undo window length before `deletion_eligible`; safe default 30 days; shared with IT-08; Department 04 legal review).
- `OQ-DD-RETENTION` (retention durations and deletion-vs-anonymisation for Team-side non-owned data; Department 04 / legal).
- `OQ-IT09-REFUND` (owner: Department 06; safe default: cancellation stops future billing with no automatic refund; affected: IT-09, BE-*; blocking stage: billing implementation).
