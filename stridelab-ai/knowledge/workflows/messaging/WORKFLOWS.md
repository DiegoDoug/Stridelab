# Communication Workflows

**Category:** messaging
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Cross-department dependency:** Department 04 review mandatory — private chat and coach-athlete communication involving minors is risk-sensitive routing per ORCHESTRATOR.md.
**Depends on:** team-administration (channel membership derives from Team/Event Group/Subgroup structure)

Per the task baseline, athlete-to-athlete private DMs are **not** baseline
functionality — out of scope in v1. Athlete-to-athlete media sharing is
likewise **disabled in v1** (VS-02).

**v2 normative decisions applied to this category:**
- **Blocking (MG-06, classified MAJOR — finding F-17):** a block stops DMs,
  @mentions, tagging, direct shares, and proactive discovery **between the two
  parties**. It does **not** delete evidence and does **not** silently alter
  Team membership. In shared operational channels that must remain (Team /
  Event Group / Subgroup), the blocked party's content is muted or collapsed
  for the blocker *when safe to do so*; critical Team and safety
  communications always retain an honest path to the blocker. When a **minor
  blocks a coach**, a private report path (MG-06 → PS-03/PS-09) is offered in
  the same flow. Restricted safety telemetry about the block is stored for
  the Platform Safety Administrator **without** automatic punishment and
  **without** disclosure to Team leadership.
- **Notifications (finding F-12 correction):** there is no literal
  "guaranteed delivery" promise anywhere. Safety-critical notification state
  is instead: transactionally-created authoritative in-app state; durable
  retry; idempotent processing; explicit delivery + acknowledgement state;
  audited terminal failure; human escalation for unresolved safety-critical
  failure. Push / email / device delivery is secondary and fallible. Safety
  notifications cannot be disabled; operational notifications may change
  channel but stay in-app; social notifications may be bundled, muted, or
  placed under quiet hours (MG-07).
- **Chat attachments (MG-05):** if an attachment broadens a media artifact's
  visibility it creates a formal, independently revocable and auditable
  VS-02 (private thread) or MD-06 (Team/group channel) record; offline
  attachment submission stays pending until server confirmation.

---

## MG-01 — Team Chat

**Purpose:** Provide a communication channel scoped to the entire Team.

**Actors:** All active Team members (Head Coach, Event Coaches, Athletes).

**Capability / trigger:** Available to any active Team member for Team-wide communication.

**Preconditions:** Actor is an active Team member (IT-04).

**Authorization assumptions:** Membership in Team chat is automatic and coextensive with Team membership — joining the Team (IT-04) grants Team chat access; removal (IT-06) revokes it immediately.

**Owned resources:** Team chat channel and message history.

**States:** `member → posting_enabled` (all active members can post, subject to PS-02/PS-03 moderation actions that may restrict an individual).

**State transitions:** Membership-driven; channel access follows Team-membership state directly (no independent join/leave action beyond IT-04/IT-06/IT-04's `member_left`).

**Happy path:** Any Team member posts a message visible to the whole Team.

**Alternate paths:** A member who left/was removed (IT-04 `member_left` / IT-06) loses access; historical messages they posted remain in the channel record (retention/redaction follows `OQ-MG-RETENTION`). If a viewer has blocked another member who is still in this shared channel, the blocked member's messages are **muted/collapsed** for the blocker (expandable on demand); a message the system classifies as a critical Team or safety communication is **not** collapsed and retains an honest path to the blocker.

**Errors/failures:** Attempting to post after membership ends → rejected.

**Recovery:** N/A beyond standard message-delivery retry.

**Offline behavior:** Messages composed offline are queued locally and sent on reconnect; the channel's history should be available read-only from local cache while offline.

**Synchronization implications:** Standard eventual-consistency message delivery; ordering/merge conflicts across offline-queued messages from multiple members must preserve a coherent, non-lossy timeline (Department 03 implementation concern; workflow-level requirement is no silent message loss).

**Notifications:** Social class (see MG-07) — may be bundled, muted, or placed under quiet hours per the member's preferences. A new-message notification is never treated as safety-critical.

**Audit requirements:** Standard message-retention audit posture; escalates to mandatory audit under PS-02/PS-03/PS-09 (report/block/moderation).

**Exit condition:** Message is durably delivered to all current Team members' channel views, or queued for delivery pending connectivity.

**Downstream artifacts:** Feeds MG-06 (report/block/moderation) if content is flagged.

**Open questions:** `OQ-MG-RETENTION` (owner: Department 04 `privacy-data-governance` / legal; safe default: messages are retained while the channel exists and follow the account-level retention/deletion policy on member exit — no automatic redaction; reported content follows the PS-09 preservation-hold rule; evidence required: jurisdiction-specific retention/minimisation obligations; affected: MG-01/02/03/04, PS-05; blocking stage: a retention/redaction implementation).

---

## MG-02 — Event Group Chat

**Purpose:** Provide a communication channel scoped to a specific Event Group.

**Actors:** Members assigned to the Event Group (Event Coach(es) assigned via TA-05, Athletes assigned via TA-04). Standing Head Coach read access is governed by `OQ-MG-HC-CHANNEL` (safe default: **not granted**).

**Capability / trigger:** Available to a member holding a current assignment to this Event Group (athlete via TA-04, coach via TA-05).

**Preconditions:** Event Group exists (TA-02) and actor holds a current assignment to it (TA-04/TA-05).

**Authorization assumptions (normative v2):** Channel membership is derived directly from TA-04/TA-05 assignment state — not a separately managed list; an assignment change immediately changes chat access. `OQ-MG-HC-CHANNEL` (owner: Department 01 with Department 04 privacy; **safe default: a Head Coach does NOT get standing, unassigned read access to Event Group/Subgroup channels** — they need the same explicit assignment as any other member; evidence required: an explicit product/privacy decision, given these channels may hold athlete-specific discussion; affected: MG-02, MG-03; blocking stage: any feature granting blanket Head-Coach channel visibility).

**Owned resources:** Event Group chat channel and message history.

**States:** Mirrors MG-01, scoped to the group.

**State transitions:** Access follows TA-04/TA-05 assignment transitions directly (assigned → posting_enabled; unassigned → access revoked).

**Happy path:** An Event Coach posts guidance to their assigned athletes in the group channel.

**Alternate paths:** An athlete assigned to multiple Event Groups has access to each group's channel independently. Blocked-party content is muted/collapsed for the blocker per the category-level blocking rule; critical Team/safety communications retain an honest path.

**Errors/failures:** Posting after unassignment → rejected.

**Recovery:** N/A beyond standard delivery retry.

**Offline behavior:** Same posture as MG-01.

**Synchronization implications:** Same posture as MG-01; additionally, a just-revoked assignment must promptly remove chat access — this is an authorization-sensitive propagation, not merely a UX nicety.

**Notifications:** Social class (MG-07), scoped to group members.

**Audit requirements:** Same posture as MG-01.

**Exit condition:** Message delivered to all current group members; access accurately reflects current assignment state.

**Downstream artifacts:** Feeds MG-06 if flagged.

**Open questions:** `OQ-MG-HC-CHANNEL` (stated above; safe default: no standing Head-Coach visibility).

---

## MG-03 — Subgroup Chat

**Purpose:** Provide a communication channel scoped to a specific Subgroup, nested beneath its parent Event Group.

**Actors:** Members assigned to the Subgroup, plus the parent Event Group's assigned Event Coach(es). Standing Head Coach read access is governed by `OQ-MG-HC-CHANNEL` (safe default: not granted).

**Capability / trigger:** Available to a member holding a current assignment to this Subgroup, or to the parent Event Group's assigned Event Coach(es).

**Preconditions:** Subgroup exists (TA-03) and actor holds a current assignment to it or its parent Event Group's coach assignment.

**Authorization assumptions (normative v2):** Mirrors MG-02, one level deeper — access derives from TA-04 Subgroup assignment (athletes) and TA-05 parent-group coach assignment (coaches). `OQ-MG-HC-CHANNEL` applies (safe default: no standing Head-Coach visibility).

**Owned resources:** Subgroup chat channel and message history.

**States/transitions/happy path/alternate paths/errors/recovery/offline/sync/notifications/audit:** Mirror MG-02 exactly, scoped one level deeper in the hierarchy.

**Exit condition:** Message delivered to all current Subgroup members; access accurately reflects current assignment state.

**Downstream artifacts:** Feeds MG-06 if flagged.

**Open questions:** `OQ-MG-HC-CHANNEL` (safe default: no standing Head-Coach visibility, applied at the Subgroup level).

---

## MG-04 — Coach ↔ Athlete Private Chat

**Purpose:** Provide a direct, private communication channel between a coach and an individual athlete.

**Actors:** Head Coach or Event Coach; individual Athlete.

**Capability / trigger:** Available to a coach and an athlete who are both active members of the same Team, when neither has blocked the other.

**Preconditions:** Both parties are active members of the same Team; no active block between them (MG-06).

**Authorization assumptions:**
- Per the approved baseline, Event Coaches may **communicate** with any athlete on the Team — private-chat initiation authority is Team-wide for coaches, distinct from and broader than their group-management scope. **This communication reach does not widen tagging, Vault sharing, structured feedback, analysis, profile, or management scope** (v2 cross-cutting rule).
- A Head Coach may message any Team athlete.
- Either party may start the thread; it is exactly one coach and one athlete, never a group.
- A block (MG-06) stops all DM/mention/tag/share/discovery between the two parties; an existing thread becomes read-only for the remaining party per `OQ-MG-RETENTION`.
- `OQ-MG-OVERSIGHT` (owner: Department 04 `youth-safeguarding-trust-safety`; **safe default: no third-party standing visibility into coach↔athlete private threads in v1** — content is accessible only through an MG-06 report / PS-03 / PS-09 path; evidence required: a youth-safety design (e.g., guardian visibility, supervised-messaging mode) with its consent model; affected: MG-04, PS-06; blocking stage: any oversight/visibility feature).

**Owned resources:** Private-chat channel and message history between the two specific parties.

**States:** `nonexistent → active`.

**State transitions:** `nonexistent → active`: either party sends the first message.

**Happy path:** A coach messages an athlete about upcoming training adjustments; the athlete replies.

**Alternate paths:** An athlete initiates contact with a coach (e.g., reporting an injury) rather than the coach initiating.

**Errors/failures:** Attempting to initiate with a non-Team-member → rejected. Attempting to initiate after either party's membership ends (IT-06) → rejected; existing thread becomes read-only/archived for the remaining party per retention policy (OPEN).

**Recovery:** N/A beyond standard delivery retry.

**Offline behavior:** Same as MG-01 — offline composition queues for delivery.

**Synchronization implications:** Same general posture as MG-01, with the added sensitivity that any future oversight/visibility mechanism (if adopted) would itself be a significant synchronization/authorization design point not resolved here.

**Notifications:** Both parties notified of new messages — social class (MG-07), muteable, but a coach→athlete DM notification is never fully suppressed for a minor athlete (it remains at least in-app) so that unwanted contact is visible and reportable.

**Audit requirements:** Mandatory Department 04 review subject. Ordinary message content is retained per `OQ-MG-RETENTION`; reported content follows the PS-09 preservation-hold rule.

**Exit condition:** Message delivered between the two parties, or the thread is read-only because a block is in place or one party's Team membership has ended.

**Downstream artifacts:** Feeds MG-06 (report/block/moderation) if flagged; feeds PS-06 (coach-athlete communication safety implications) directly.

**Open questions:**
- `OQ-MG-OVERSIGHT` (stated above; safe default: no standing third-party visibility).
- `OQ-MG-RETENTION` (stated at MG-01; also governs thread behaviour when membership ends — safe default: thread becomes read-only for the remaining party, not deleted).

---

## MG-05 — Attachments

**Purpose:** Allow media/file attachments within any of the chat channels above (Team, Event Group, Subgroup, private).

**Actors:** Same actors as the hosting channel (MG-01 through MG-04).

**Capability / trigger:** Available to an actor with posting access to a channel who attaches a file/media item to a message, and who is authorized to perform the broadened-visibility transition the attachment implies.

**Preconditions:** Actor has posting access to the hosting channel and (if the attachment broadens media visibility) holds the authority for the corresponding VS-02 / MD-06 transition.

**Authorization assumptions:**
- An attachment shared via chat must obey the same "explicit act, item-scoped" discipline as vault-sharing — it never grants access beyond the attached item, and the chat channel is never an implicit visibility grant broader than the applicable transition authorizes.
- **When an attachment broadens the visibility of a media artifact beyond an existing grant, it routes through the *stricter* of the two visibility transitions, not the lighter one (independent-review finding F-04):**
  - Attachment to a **private coach-athlete thread (MG-04)** → functionally a **VS-02** item-scoped share; inherits VS-02's authority, audit, and revocation (VS-03) rules.
  - Attachment to a **Team-wide (MG-01)** or **Event Group / Subgroup (MG-02/MG-03)** channel → functionally an **MD-06 Team/audience publication**; inherits MD-06's controls — publication authority, any minor-consent requirement (OPEN, Department 04-gated), audience scoping, and mandatory audit. A chat attachment must not be used to reach a Team/group-wide audience while bypassing MD-06's safeguards.
- An attachment whose corresponding broadened-visibility transition the actor is not authorized to perform (e.g., an MD-06 publication where Team policy disallows publication) is rejected at the same boundary as that transition.

**Owned resources:** Attachment record linked to a specific message.

**States:** `composing → attached → sent`.

**State transitions:** Actor attaches a file/media item to a message → sends.

**Happy path:** A coach attaches an analysis clip (AN-04) to a private message giving the athlete feedback with context.

**Alternate paths:** Attaching a document/image unrelated to media analysis (e.g., a schedule PDF) to a Team chat message.

**Errors/failures:** Attaching a file the actor does not have rights to share (e.g., another member's private draft, per MD-03) → rejected. An athlete attempting to route media to another athlete via an attachment → rejected: athlete-to-athlete media sharing is disabled in v1 (VS-02), and there is no athlete-to-athlete channel. An attachment whose broadened-visibility transition (MD-06 publication / VS-02 share) the actor is not authorized to perform → rejected at that transition's boundary.

**Recovery:** N/A beyond standard message-send retry.

**Offline behavior:** Composing with an attachment offline queues the full message+attachment for send on reconnect; large media attachments may require explicit user awareness of pending upload size/time (implementation detail, not modeled here). Consistent with MD-06/VS-02 (not offline-capable for the visibility grant): a queued chat attachment that broadens media visibility is **not authoritative** until the server confirms and applies the corresponding VS-02 or MD-06 record; the message may show as pending, and the broadened visibility must not be presented as effective on any device until server-confirmed.

**Synchronization implications:** Attachment delivery must be atomic with the message it's attached to — a message should not appear "sent" with a missing/failed attachment without honest status indication.

**Notifications:** Same as the hosting channel.

**Audit requirements:** Same as the hosting channel, plus the underlying media item's own audit trail (MD-05/VS-02) if the attachment constitutes a new share.

**Exit condition:** Message with attachment is durably delivered, or fails with an honest, visible status; any broadened-visibility grant it carries is recorded as an independent VS-02 or MD-06 record.

**Downstream artifacts:** Creates a formal **VS-02** share record (private-thread attachment) or an **MD-06** publication record (Team/group-channel attachment) for the attached item when it broadens visibility beyond an existing grant.

**Open questions (OPEN / UNDECIDED):**
- **Resolved in this revision (F-04):** an attachment that broadens a media artifact's visibility creates a formal, independently auditable and revocable VS-02 or MD-06 record (per the hosting channel's audience scope) — no lighter-weight, chat-only visibility grant.
- **Still OPEN:** the exact minor-consent requirement inherited from MD-06 for Team-wide / Event Group / Subgroup channel attachments of media depicting a tagged minor — Department 04 owns this, same as the MD-06 open question.

---

## MG-06 — Report / Block / Moderation Path

**Severity of this workflow:** MAJOR (independent-review finding **F-17**) — blocking behaviour is a youth-safety control, not a UX convenience, and is specified normatively below.

**Purpose:** Let any Team member flag concerning content or behaviour in any channel, and block further unwanted contact from a specific individual.

**Actors:** Any Team member (reporter); Head Coach (Team-level first responder for ordinary reports); **Platform Safety Administrator** (the canonical least-privilege platform actor owned by Department 04; PS-03); the reported/blocked individual. Reports implicating a Head Coach bypass Team leadership; reports classified as potential illegal content / imminent harm route via **PS-09** and are not resolvable at Team level.

**Capability / trigger:** A report or block action is available to an active Team member against any message, channel, or member they have legitimate access-context to. Availability is never gated by role, tier, or Event Group scope (PS-02).

**Preconditions:** Actor is an active Team member; target content/individual is within a channel or context the actor has access to.

**Authorization assumptions (normative v2):**
- Reporting is available to **every** Team member regardless of role — an athlete can report a coach, a coach an athlete, either a peer.
- **Blocking (normative):** a block between two parties:
  - stops **DMs, @mentions, tagging, direct shares, and proactive discovery** between them;
  - does **not** delete any evidence (messages, media, prior reports remain for moderation/audit);
  - does **not** silently alter Team membership or roles;
  - in shared operational channels that must remain (Team / Event Group / Subgroup): the blocked party's content is **muted or collapsed** for the blocker *when safe to do so* (expandable on demand);
  - never suppresses a **critical Team communication or a safety communication** — those retain an honest path to the blocker;
  - when a **minor blocks a coach**, the same flow offers a **private report path** (into this workflow / PS-03 / PS-09);
  - generates **restricted safety telemetry** for the Platform Safety Administrator — stored **without automatic punishment** of either party and **without disclosure to Team leadership**.
- Moderation authority beyond the reporter's own block: ordinary reports are first-responded by the Head Coach; anything implicating the Head Coach, or classified illegal/imminent-harm, routes to the Platform Safety Administrator (PS-03/PS-09). `OQ-MG-MOD-THRESHOLD` (owner: Department 04; safe default: any report the Head Coach cannot resolve, or that names the Head Coach, escalates to the Platform Safety Administrator; evidence required: a severity-classification scheme and SLA; affected: MG-06, PS-03, PS-09; blocking stage: automated triage).

**Owned resources:** Report record (reporter, target, content reference, reason, timestamps); block record (blocking user ↔ blocked user, effect scope); restricted block-safety telemetry (Platform-Safety-Administrator-only).

**States:** `none → reported → under_review → resolved | dismissed`; independently, `not_blocked → blocked → not_blocked` for the block relationship.

**State transitions:**
1. `none → reported`: reporter submits a report with the flagged reference and reason.
2. `reported → under_review`: a moderation-authorised actor (Head Coach, or Platform Safety Administrator for escalated/illegal cases) begins evaluation.
3. `under_review → resolved`: action taken (content removed, IT-06 removal, TA-01 role change, PS-03 escalation, PS-09 preservation + platform action).
4. `under_review → dismissed`: no action warranted; re-reporting new incidents remains possible.
5. `not_blocked → blocked` / `blocked → not_blocked`: the blocker sets or clears the block at any time.

**Happy path:** An athlete reports an inappropriate DM from a coach → the report routes to the Platform Safety Administrator (implicates a coach) → reviewed → action taken → resolved with an audit trail; the athlete may also block the coach, which stops further DM contact while leaving shared-channel safety messages intact.

**Alternate paths:** A member blocks another without filing a report, purely to stop unwanted contact. A minor blocks a coach and is offered the private report path in the same flow.

**Errors/failures:** A report referencing content the reporter has no legitimate access-context to → flagged invalid at review time, not silently actioned. A block that would suppress a safety/critical Team communication → the block still applies to DMs but the safety message path is preserved.

**Recovery:** A block is reversible by the blocker; a dismissed report does not preclude re-reporting.

**Offline behavior:** A report/block may be composed offline and submitted on reconnect; the block's *effect* is not authoritative until server-confirmed. Moderation review requires connectivity.

**Synchronization implications:** A block must propagate promptly to stop further contact reaching the blocked-from party, especially in MG-04 — a safety-relevant propagation, not merely UX.

**Notifications (F-12 formulation — no literal "guaranteed delivery"):** the report-receipt acknowledgement to the reporter, and the escalation signal to the Platform Safety Administrator, are safety-critical: they are backed by transactionally-created authoritative in-app state, durable retry, idempotent processing, explicit delivery + acknowledgement state, an audited terminal-failure record, and human escalation if a safety-critical delivery stays unresolved. Push/email/device delivery is a secondary, fallible channel. The reported individual is **not** automatically notified — over-notification risks retaliation; any such notice is a Department-04-owned decision (`OQ-MG-REPORTED-NOTICE`, safe default: no automatic notice).

**Audit requirements:** Mandatory audit trail — the core youth-safety escalation mechanism; explicit Department 04 (`youth-safeguarding-trust-safety`) scope.

**Exit condition:** Report reaches `resolved`/`dismissed` with an auditable trail; a block relationship is established or cleared with the normative effects above.

**Downstream artifacts:** May trigger IT-06 (removal), TA-01 (role change), PS-03 (moderation/escalation), PS-09 (illegal-content / imminent-harm path), or legal/compliance handoff (Department 04).

**Open questions:**
- `OQ-MG-MOD-THRESHOLD` (stated above; safe default: escalate anything the Head Coach can't resolve or that names them).
- `OQ-MG-REPORTED-NOTICE` (owner: Department 04; safe default: the reported individual is not automatically notified; affected: MG-06, PS-03, PS-09; blocking stage: any notify-the-reported feature).
- `OQ-MG-BLOCK-SAFE-COLLAPSE` (owner: Department 01 with Department 04; safe default: in a shared channel, collapse the blocked party's ordinary content for the blocker but never a message classified critical/safety; evidence required: the classifier for "critical/safety"; affected: MG-01/02/03, MG-06; blocking stage: the collapse UI).
- Illegal-content classification criteria — `OQ-PS-CLASSIFY` (owned in PS-09).

---

## MG-07 — Notification Preferences

**Purpose:** Give a member control over how they receive non-safety notifications — bundling, muting, and quiet hours — while guaranteeing that safety and operationally-required notifications are never lost. Added in the v2 correction pass for independent-review finding **F-19**.

**Actors:** Account owner (their own preferences only).

**Capability / trigger:** Available to any account owner adjusting their own notification behaviour.

**Preconditions:** Account is `active`.

**Authorization assumptions (normative v2):** A member may read and change **only their own** notification-preference record — no coach, Head Coach, administrator, or platform actor can set, view, or override another member's preferences. The safety class is not member-configurable: no actor (including the account owner) can disable, mute, or quiet-hours a safety-class notification, and the preference store refuses to persist such a state (consistent with invariant #14 and the Safety bullet below). Preference state grants no Team-scoped authority; per invariants #9 (payment ≠ authorization) and #15 (communication reach ≠ any other scope), authorization derives only from role + current management scope + explicit grants, so notification-preference state is not consulted by any authorization or entitlement check.

**Notification classes (normative v2):**
- **Safety** — report-receipt acknowledgement, moderation/escalation status (MG-06, PS-03, PS-09), tag / Vault-access notice to a tagged athlete (MD-05, VS-01), tagged-minor notice on Team publication (MD-06), under-age review outcome (PS-07), block-related safety telemetry outcomes. **Cannot be disabled or placed under quiet hours.** Backed by the F-12 delivery-state model (transactional in-app state, durable retry, idempotent processing, delivery+ack state, audited terminal failure, human escalation on unresolved safety-critical failure). Push/email are secondary and fallible; the authoritative state is always in-app.
- **Operational** — session started/modified/cancelled, assignment changes, plan modifications close to practice, entitlement/billing status to the Head Coach, DSR/closure status. The member may change *channel* (e.g., disable push) but the notification still lands **in-app**; it cannot be fully suppressed.
- **Social** — new chat messages, new PB, session summary, "you were added to a group". May be **bundled**, **muted**, or placed under **quiet hours** entirely.

**Owned resources:** Per-member notification-preference record (per class: enabled channels; per social sub-type: bundle / mute; quiet-hours window).

**States:** `default → customised` per preference; a member may reset to default.

**State transitions:** Member toggles channels, bundling, mute, and quiet-hours; changes take effect on next sync and never retroactively drop an already-queued safety notification.

**Happy path:** An athlete sets quiet hours 22:00–07:00 and mutes "new PB" bundling to a daily digest → social notifications respect this; a safety notification (e.g., they were tagged in published media) still arrives immediately in-app.

**Alternate paths:** A member disables all push → operational and safety notifications still appear in-app; only social ones are affected as configured.

**Errors/failures:** An attempt (by the member or by a client bug) to disable a safety-class notification → rejected; the preference store refuses to persist a "safety = off" state.

**Recovery:** Preferences are re-editable; reset-to-default restores the standard behaviour.

**Offline behavior:** Preference edits queue offline and apply on reconnect; notification *delivery* semantics are unaffected by the edit being pending.

**Synchronization implications:** Preference state syncs across the member's devices; a device that has not yet synced a new quiet-hours window may briefly over-notify for social items only — never for safety items.

**Notifications:** A confirmation that preferences were saved (social class).

**Audit requirements:** Not independently audit-critical; the safety-class "cannot disable" rule is a Department 04 review point.

**Exit condition:** The member's notification behaviour reflects their saved preferences, with safety and operational classes still guaranteed to reach them.

**Downstream artifacts:** Consumed by every workflow that emits a notification (the "Notifications" field elsewhere references the class defined here).

**Open questions:** `OQ-MG07-DEFAULTS` (owner: Department 01; safe default: social notifications on and unbundled, no quiet hours, until the member customises; evidence required: UX research on sensible defaults for a 13–17 audience; affected: MG-07; blocking stage: none — defaults can ship and be tuned).
