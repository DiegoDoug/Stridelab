# Practice / Session Execution Workflows

**Category:** session-execution
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Depends on:** training-planning (a published, assigned Session, TP-04/TP-07), team-administration (attendance scoping)

This is the most offline-critical category in the product: practices happen on
fields/tracks with unreliable connectivity. Every workflow here must degrade
gracefully offline and reconcile honestly, never silently, on reconnect.

**v2 normative decision — finalized sessions (finding F-23):** coach
finalization (SE-08) locks the *prescribed Session structure*. It does **not**
permanently lock athlete-owned *performed-work truth*. Athletes retain an
**audited correction/amendment workflow after finalization** (SE-10): the
original value, the amendment, timestamp, actor, and reason are all
preserved, and finalized history is never silently rewritten.

---

## SE-01 — Start Practice

**Purpose:** Transition a published, assigned Session from planned to actively-being-executed.

**Actors:** Head Coach / Event Coach who authored or is assigned to run the Session; Athletes assigned to it.

**Capability / trigger:** Available to a coach with authorship or management scope over the Session's assigned athletes, on a `published`, assigned, locally-cached Session at practice time.

**Preconditions:** Session is `published` (TP-04) and assigned to the actor's scope (TP-07). Device has the Session cached locally (required for offline start).

**Authorization assumptions:** Only a coach with authorship/management scope over the Session's assigned athletes may start a coach-prescribed Session. `OQ-SE-ATHLETE-SELFSTART` (owner: Department 01; **safe default: an athlete cannot self-start a coach-prescribed Session without a coach** — the self-directed path is the personal-workouts category (PW-*); evidence required: a product decision for solo remote athletes; affected: SE-01, SE-02; blocking stage: any athlete-self-start feature).

**Owned resources:** Session-execution record (distinct from the TP-04 prescription record — this is the "performed instance" root that SE-02 through SE-08 attach to).

**States:** `published → in_progress`.

**State transitions:** `published → in_progress`: coach (or authorized actor) starts the session; this also flips the underlying TP-04 Session's state per training-planning.

**Happy path:** Coach opens the assigned Session at practice time → starts it → attendance (SE-02) and prescribed-work delivery (SE-03) become active for all assigned athletes' devices, online or off.

**Alternate paths:** Starting a session with reduced/changed attendance already known (e.g., some athletes absent) — flows into SE-02.

**Errors/failures:** Attempting to start a Session not cached locally while offline → blocked with an explicit, honest error (cannot fabricate a session that was never synced).

**Recovery:** A session started in error can be ended/cancelled; this does not corrupt the underlying TP-04 prescription.

**Offline behavior:** Fully offline-capable provided the Session was synced beforehand — this is the core offline-critical path of the entire product.

**Synchronization implications:** The `in_progress` transition is recorded locally first and reconciled to the server when connectivity returns; if two devices (e.g., a coach and a co-coach) both attempt to start the same session offline, reconciliation must detect and surface the conflict rather than silently picking one.

**Notifications:** Assigned athletes notified practice has started (best-effort; not blocking if offline).

**Audit requirements:** Start event recorded with actor and timestamp for historical accuracy of PF-01/PF-02.

**Exit condition:** Session-execution record exists in `in_progress` with a clear start actor/timestamp, available to all assigned athletes' devices (once synced).

**Downstream artifacts:** Root record for SE-02 through SE-08, plus SE-09 (reconciliation) and SE-10 (post-finalization correction).

**Open questions:** `OQ-SE-ATHLETE-SELFSTART` (stated above; safe default: not permitted).

---

## SE-02 — Attendance

**Purpose:** Record which assigned athletes are present/absent/late for the started session.

**Actors:** Coach running the session (primary). `OQ-SE-SELFCHECKIN` (owner: Department 01; safe default: no athlete self-check-in in v1 — the coach records attendance; evidence required: product need; affected: SE-02; blocking stage: a self-check-in feature).

**Capability / trigger:** Available to the coach running an `in_progress` session, for athletes within their management scope.

**Preconditions:** Session is `in_progress` (SE-01).

**Authorization assumptions:** Coach records attendance for athletes within their management scope (mirrors TA-04 boundary); an athlete self-checking in only affects their own attendance record, never another athlete's.

**Owned resources:** Attendance record per athlete per session-execution instance.

**States:** `unrecorded → present | absent | late | excused`.

**State transitions:** Coach sets the value; may be corrected within the same session or, after SE-08 finalization, via the audited SE-10 correction path.

**Happy path:** Coach marks each assigned athlete present as they arrive → attendance record finalized as part of SE-08 (session completion).

**Alternate paths:** Bulk-mark-all-present shortcut; late arrivals marked individually.

**Errors/failures:** Marking attendance for an athlete not assigned to this session → invalid (attendance scope is bounded by TP-07 assignment).

**Recovery:** Attendance values are correctable until session completion; post-completion correction is handled by SE-10 (audited amendment, original preserved).

**Offline behavior:** Fully offline-capable; attendance is recorded locally and reconciled on sync.

**Synchronization implications:** Concurrent attendance edits (e.g., two coaches present) must merge without data loss — last-write-wins is unacceptable for attendance-record integrity; conflicting entries must be surfaced for coach resolution.

**Notifications:** Not typically required in real time.

**Audit requirements:** Attendance is a factual record consumed by PF-01/PF-02 and, potentially, external reporting; not independently safety-critical but must be accurate.

**Exit condition:** Every assigned athlete has a defined attendance status by session completion.

**Downstream artifacts:** Feeds SE-08 and PF-01 (workout history)/PF-02 (training history).

**Open questions:** `OQ-SE-SELFCHECKIN` (stated above). Post-completion correction is resolved via SE-10 (normative).

---

## SE-03 — Prescribed Work Delivery

**Purpose:** Present the coach-authored prescription (from TP-04) to each assigned athlete during the active session.

**Actors:** Athletes (consumers); the Session-execution record (source).

**Capability / trigger:** Automatic upon SE-01, per assigned athlete.

**Preconditions:** Session is `in_progress`; athlete is assigned (TP-07) and has the content cached locally.

**Authorization assumptions:** An athlete sees only the prescribed work assigned to them (individual-level or via their group), never another athlete's individualized variant unless explicitly shared by the coach.

**Owned resources:** Read-only view binding between the athlete and the TP-04 prescription content for this session-execution instance.

**States:** `not_delivered → delivered → acknowledged` (acknowledgment optional/OPEN).

**State transitions:** `not_delivered → delivered`: content becomes visible on the athlete's device (may have occurred at TP-07 assignment/sync time, well before SE-01, since offline caching happens ahead of practice).

**Happy path:** Athlete opens the active session and sees exactly what the coach prescribed (sets/reps/paces/notes).

**Alternate paths:** Coach delivers a live in-session adjustment (see SE-04) that supersedes the originally cached prescription.

**Errors/failures:** Athlete's device never synced the assignment before going offline → cannot display prescribed work; must fail honestly (not fabricate placeholder content) and prompt reconnection.

**Recovery:** Reconnecting fetches the missed assignment.

**Offline behavior:** This workflow's entire value proposition depends on offline availability — content must have been cached at TP-07 assignment time, not fetched at SE-03 time.

**Synchronization implications:** Directly inherits the TP-04/TP-07/TP-08 synchronization risk: if the coach modified the session after the athlete's last sync, the athlete is executing against a stale version until reconciled (see TP-08).

**Notifications:** N/A (passive delivery).

**Audit requirements:** Not independently audited; the delivered-version identifier should be recorded alongside the athlete's eventual log (SE-05) for accurate reconciliation.

**Exit condition:** Athlete has access to a defined version of the prescribed work for the duration of the session.

**Downstream artifacts:** Basis for SE-05 (athlete logging) and SE-06 (completed/skipped/partial classification).

**Open questions:** Explicit acknowledgment requirement (did-the-athlete-see-it tracking).

---

## SE-04 — Modifications During Session

**Purpose:** Let a coach adjust prescribed work in real time while the session is `in_progress` (e.g., cutting reps due to weather or athlete fatigue).

**Actors:** Coach running the session, within their scope.

**Capability / trigger:** Within an `in_progress` session → edit prescribed work.

**Preconditions:** Session is `in_progress`.

**Authorization assumptions:** Same authorship/scope rules as TP-08, applied to a live session; this is the real-time instance of that same governing rule.

**Owned resources:** In-session modification record, layered on top of (not replacing) the original TP-04 prescription for historical accuracy.

**States:** `original_prescription → modified_prescription(s)` — multiple modifications may stack chronologically within one session.

**State transitions:** Each modification is appended with a timestamp; athletes' devices reflect the latest known modification once synced.

**Happy path:** Coach adjusts the workout mid-practice → change propagates to present athletes' devices in real time (if connected) or on next sync (if not) → athletes complete the adjusted version.

**Alternate paths:** Modification applies only to a subset of athletes (e.g., an injured athlete gets reduced volume) rather than the whole group.

**Errors/failures:** Two coaches issue conflicting modifications concurrently → must be surfaced as a conflict, not silently merged/overwritten (same principle as TP-08 and SE-02).

**Recovery:** A modification can itself be modified/reverted; the original prescription remains part of the historical record regardless.

**Offline behavior:** A coach can issue a modification offline (e.g., no signal at the track); it applies locally to athletes on the same offline local context if using a local sync mechanism, or queues for propagation once any device reconnects. Exact peer-to-peer/local-network behavior is an implementation detail (Department 03) but the *workflow-level requirement* is that offline modification must not be silently lost or silently defaulted back to the original prescription.

**Synchronization implications:** This is the sharpest edge case in the whole product: real-time coaching changes, no connectivity, multiple devices. The workflow-architecture invariant applies directly — offline success is not durable until reconciled, and every athlete's eventual logged record (SE-05) must be honestly tied to *which version* of the prescription they actually executed.

**Notifications:** Athletes notified of the change as immediately as connectivity allows.

**Audit requirements:** Every modification is audited (actor, timestamp, scope, before/after) to support later dispute resolution and coaching-history accuracy.

**Exit condition:** All athletes affected by a modification have a clear, correctly attributed version of what was actually prescribed to them during the session.

**Downstream artifacts:** Feeds SE-05/SE-06 (the version an athlete logs against) and PF-02/PF-03 accuracy.

**Open questions:** Exact device-to-device propagation mechanism while fully offline (local network vs. queue-until-reconnect) is a Department 03 implementation concern, not resolved here.

---

## SE-05 — Athlete Logging

**Purpose:** Let an athlete record what they actually did during the session, against the prescribed (and possibly modified) work.

**Actors:** Athlete (own record only).

**Capability / trigger:** Within an `in_progress` (or recently completed) session → log work.

**Preconditions:** Session is `in_progress`; athlete is assigned.

**Authorization assumptions:** An athlete may only log against their own session-execution record; a coach may view but does not author the athlete's log entry (coach prescription and athlete-performed record are approved as distinct concepts).

**Owned resources:** Athlete performed-work log entry, referencing the specific prescription version it responds to (see SE-03/SE-04).

**States:** `not_logged → logging_in_progress → logged`.

**State transitions:** Athlete begins entering results → saves → `logged`. Entries remain freely editable by the athlete until session completion (SE-08); after finalization the athlete may still amend their own performed-work record through the audited SE-10 correction path (original value preserved).

**Happy path:** Athlete completes a rep/set → logs actual distance/time/reps → repeats through the session → finalizes at SE-08.

**Alternate paths:** Athlete logs retroactively after the session if they didn't log in real time (still bound to the same session-execution record, timestamped honestly as a post-hoc entry).

**Errors/failures:** Athlete attempts to log against a session they are not assigned to → rejected.

**Recovery:** Entries are editable until finalization; accidental entries can be corrected.

**Offline behavior:** Fully offline-capable — this is a core offline-critical workflow given track/field connectivity conditions.

**Synchronization implications:** Local log entries sync opportunistically; must never be lost due to app restart, device switch, or delayed connectivity. Conflicting edits from the same athlete across two devices (rare but possible) must merge without silent data loss.

**Notifications:** Not typically required in real time; a coach may optionally be notified of logged results if actively monitoring.

**Audit requirements:** Not independently audited beyond standard data-integrity tracking; this is the athlete's own performance record and feeds PF-01/PF-04 directly.

**Exit condition:** Athlete's actual performed work is recorded and locally durable pending sync.

**Downstream artifacts:** Feeds SE-06 (completed/skipped/partial classification), SE-07 (effort/notes), PF-01/PF-03/PF-04, SE-10 (post-finalization amendment).

**Open questions:** None. Post-completion correction is resolved normatively via SE-10 (finding F-23).

---

## SE-06 — Completed / Skipped / Partial Work

**Purpose:** Classify each prescribed work item's completion status relative to what was actually logged.

**Actors:** Athlete (self-classification, authoritative for their own record). `OQ-SE-COACH-OVERRIDE` (owner: Department 01; **safe default: no coach override of an athlete's self-classification** — a coach who disagrees adds a separately-attributed coach annotation, or asks the athlete to correct via SE-10; the athlete's self-report is never silently replaced; affected: SE-06; blocking stage: any coach-override feature).

**Capability / trigger:** Derived from SE-05 entries, or explicitly set per prescribed item.

**Preconditions:** Prescribed work item exists (from SE-03/SE-04); session is `in_progress` or recently `completed`.

**Authorization assumptions:** Self-classification by the athlete is authoritative for their own record; coach override, if permitted, must be distinguishable in the record from athlete self-report (do not blend the two into one unattributed value).

**Owned resources:** Per-item completion-status field on the athlete's log entry.

**States:** `pending → completed | partial | skipped`.

**State transitions:** Set directly by athlete entry (SE-05) or explicit classification action; `skipped` may include an optional reason.

**Happy path:** Athlete logs full prescribed volume → item auto-classifies `completed`.

**Alternate paths:** Athlete logs reduced volume → `partial`; athlete does not attempt an item → `skipped`, optionally with a reason (injury, time, coach direction).

**Errors/failures:** N/A beyond standard validation.

**Recovery:** Classification is correctable until finalization (SE-08).

**Offline behavior:** Fully offline-capable, same as SE-05.

**Synchronization implications:** Same as SE-05.

**Notifications:** Coach may be notified of unusual patterns (e.g., a fully `skipped` session) — exact triggers are a product decision, not assumed here.

**Audit requirements:** Feeds accuracy of PF-01/PF-02/PF-03; not independently safety-critical.

**Exit condition:** Every prescribed item assigned to the athlete has a defined completion status by SE-08.

**Downstream artifacts:** Feeds PF-01 (workout history) directly; informs TP-08 future planning decisions.

**Open questions:** `OQ-SE-COACH-OVERRIDE` (stated above; safe default: no override).

---

## SE-07 — Effort / RPE / RIR / Notes

**Purpose:** Capture subjective athlete-reported effort (RPE/RIR) and free-text notes alongside objective logged results.

**Actors:** Athlete (own record); coach (read access within management scope).

**Capability / trigger:** Within logging (SE-05) → effort/notes field.

**Preconditions:** Session is `in_progress` or recently completed; athlete is assigned.

**Authorization assumptions:** Effort/RPE/RIR/notes are athlete-authored subjective data; a coach can read but not author or alter an athlete's subjective entry (distinct from coach's own session notes, which are a separate concept not modeled as athlete data).

**Owned resources:** Subjective-effort fields attached to the athlete's log entry.

**States:** `unset → set` (per field); editable until finalization.

**State transitions:** Athlete sets/edits the value directly.

**Happy path:** Athlete logs an RPE value and optional notes alongside their objective results.

**Alternate paths:** Athlete provides notes without a numeric RPE/RIR, or vice versa — fields are independent, not mutually required.

**Errors/failures:** N/A beyond input validation (e.g., RPE within a defined scale range).

**Recovery:** Editable until finalization.

**Offline behavior:** Fully offline-capable, same as SE-05.

**Synchronization implications:** Same as SE-05; subjective fields carry the same integrity requirements as objective ones.

**Notifications:** Operational class only (see notification-preference workflow MG-07). `OQ-SE-RPE-FLAG` (owner: Department 01 with Department 04 wellbeing input; safe default: **no automatic coach-facing RPE flag in v1** — the managing coach sees RPE within their normal scope but no threshold alert is generated; evidence required: a wellbeing/safety design and consent posture; affected: SE-07; blocking stage: any automatic flagging feature).

**Audit requirements:** Not independently audited; privacy-sensitive as personal athlete-reported wellbeing data — visible only to the managing coach within current scope.

**Exit condition:** Subjective fields, where provided, are attached durably to the athlete's log entry.

**Downstream artifacts:** Feeds PF-03 (performance metrics) and coaching review context.

**Open questions:** `OQ-SE-RPE-FLAG` (stated above; safe default: no automatic flagging).

---

## SE-08 — Session Completion

**Purpose:** Finalize the session-execution instance, closing attendance, logging, and classification for historical record.

**Actors:** Coach running the session (primary finalizer). `OQ-SE-AUTOFINALIZE` (owner: Department 01; safe default: **no auto-finalization in v1** — a session stays `in_progress` until a coach ends it; evidence required: a policy for abandoned sessions; affected: SE-08; blocking stage: an auto-finalize timer).

**Capability / trigger:** Available to the coach who started/manages an `in_progress` session (or a Head Coach) to close it.

**Preconditions:** Session is `in_progress`.

**Authorization assumptions (normative v2):** Only the coach who started/manages the session (or a Head Coach) may finalize it. Finalization **locks the prescribed Session structure** and closes the ordinary edit window. It does **not** retroactively alter athlete-authored data (SE-05/SE-06/SE-07) and does **not** permanently lock athlete-owned performed-work truth — the athlete retains the audited SE-10 amendment path afterward.

**Owned resources:** Session-execution record's terminal state; all attached attendance/logging/classification/effort data becomes the historical record.

**States:** `in_progress → completed`.

**State transitions:** `in_progress → completed`: coach finalizes (or timeout auto-finalizes); this also flips the TP-04 Session's state to `completed`.

**Happy path:** Coach confirms all athletes have logged/attendance is recorded → finalizes → session becomes part of permanent training/performance history.

**Alternate paths:** Session finalized with incomplete athlete logs (some athletes never logged) — the record honestly reflects `not_logged`/`skipped` rather than fabricating completion.

**Errors/failures:** Finalizing while offline is allowed (local completion) but the record is not treated as server-durable until synced (offline-behavior invariant).

**Recovery:** A `completed` session is not reopened wholesale; corrections after finalization go through SE-10 (per-record audited amendment, original preserved) — the finalized session is never treated as if it never happened.

**Offline behavior:** Fully offline-capable; completion is a local-first transition reconciled on sync.

**Synchronization implications:** Once synced, `completed` sessions become the authoritative historical record consumed by performance/reporting; a late-arriving offline completion (e.g., a device that was offline for days) must merge into history without overwriting any interim corrections made elsewhere.

**Notifications:** Coach/athletes optionally notified of session completion summary.

**Audit requirements:** Completion event is recorded with actor/timestamp; this is the anchor point for PF-01/PF-02 historical accuracy.

**Exit condition:** Session-execution record is `completed` with attendance, logging, classification, and effort data captured to the extent athletes provided it.

**Downstream artifacts:** Feeds PF-01 through PF-06 (performance/history/reporting/exports) as the canonical source record; feeds SE-10 (post-finalization amendment).

**Open questions:** `OQ-SE-AUTOFINALIZE` (stated above; safe default: no auto-finalization). The athlete's post-finalization correction path is **resolved** — SE-10 (normative, finding F-23).

---

## SE-09 — Session Reconciliation / Conflict Resolution

**Purpose:** Provide an explicit workflow home for reconciling divergent session state after offline execution — the interaction training-planning and session-execution both flag as the sharpest risk in the architecture (a coach modifies a published/`in_progress` Session via TP-08/SE-04 while assigned athletes execute offline; two devices start or edit the same session offline; one athlete's data diverges across devices). Added in the v1 remediation pass for independent-review finding **F-08**.

**Actors:** Coach who ran/manages the session; affected Athletes (each for their own logged data only); the system (conflict detection).

**Capability / trigger:** Triggered automatically when a device reconnects and the server detects that local session-execution state (SE-01 start, SE-02 attendance, SE-04 modifications, SE-05/SE-06/SE-07 logs, SE-08 completion) diverges from authoritative state or from another device's already-reconciled state.

**Preconditions:** A session-execution record exists (SE-01) and at least one participating device accumulated offline state that cannot be applied by straightforward eventual-consistency merge without loss or ambiguity.

**Authorization assumptions:**
- Reconciliation never changes who owns what: a coach resolves conflicts in coach-owned session/prescription state and attendance; each athlete resolves conflicts only in their own performed-work log (SE-05/SE-06/SE-07). A coach may not overwrite an athlete's logged data during reconciliation (prescription/performance distinction; coach-edit boundary).
- Reconciliation must preserve the honest record of *which prescription version* each athlete executed against (SE-03/SE-04), even when the coach's current prescription now differs (TP-08).
- No authorization decision is made here; reconciliation operates only on already-authorized session data.

**Owned resources:** Reconciliation record (session-execution instance ↔ detected conflicts ↔ resolution decisions ↔ actor/timestamp per decision), layered over the underlying records without destroying pre-reconciliation values.

**States:** `no_conflict` / `conflict_detected → in_reconciliation → reconciled` (and `reconciled → conflict_detected` again if a further late-arriving offline device introduces new divergence).

**State transitions:**
1. `conflict_detected`: reconnect surfaces a divergence the system will not silently auto-resolve — last-write-wins is not acceptable for attendance, logs, or in-progress prescription edits (offline-honesty invariant).
2. `conflict_detected → in_reconciliation`: the conflict is presented to the appropriate actor(s) — coach for session/attendance/prescription conflicts, athlete for their own log conflicts.
3. `in_reconciliation → reconciled`: each conflict has an explicit, attributed resolution; superseded values are retained for audit, not deleted.

**Happy path:** An athlete's device reconnects after a fully offline practice; its logged results and the coach's post-start TP-08 modification are both present; the system flags that the athlete logged against the pre-modification prescription; the athlete's record is kept as-executed with a clear "prescribed version changed after execution" marker; the coach sees the same marker in PF-02.

**Alternate paths:** Two coaches both started the same session offline (SE-01) → one start record is chosen by an explicit coach decision, the other's attendance/notes are merged in, neither is silently discarded. / Same athlete logged on two devices → the athlete is shown both and confirms the correct combined record.

**Errors/failures:** A conflict that cannot be presented to its owning actor (e.g., that athlete has left the Team, IT-06) → the conflict is held and flagged to the coach as unresolved rather than auto-resolved; the athlete's last authoritative self-logged state stands unaltered.

**Recovery:** This workflow *is* the recovery path for offline divergence; a reconciled session can re-enter reconciliation if another stale device appears, without overwriting prior resolutions.

**Offline behavior:** Detection and presentation require connectivity; the pre-reconciliation local state remains intact and usable read-only until the owning actor resolves it.

**Synchronization implications:** This workflow is the architecture's structural answer to the TP-08/SE-04 synchronization risk. It fixes the state machine and the non-loss / honest-attribution guarantees; the exact reconciliation UX (how choices are presented, defaults, timeouts, how much agency each conflict class carries) remains an explicit product decision and is **OPEN**.

**Notifications:** Affected coach and athlete(s) notified that a session needs reconciliation, and again when it is fully reconciled.

**Audit requirements:** Every conflict and its resolution is audited (actor, timestamp, before/after) — this is the evidence base for later prescribed-vs-performed disputes (supports TP-08, PF-02, PF-04).

**Exit condition:** Every detected conflict for the session-execution instance has an explicit, attributed resolution with superseded values retained; the session's history is internally consistent and honestly attributed.

**Downstream artifacts:** Feeds PF-01/PF-02/PF-03/PF-04 (accurate history); closes the shared TP-08/SE-04 reconciliation question at the structural level (the UX decision remains open).

**Open questions:**
- `OQ-SE-RECONCILE-UX` (owner: Department 01; safe default: SE-09's state machine + non-loss / honest-attribution guarantees apply; every conflict is surfaced to its owning actor, never auto-resolved by last-write-wins; evidence required: chosen presentation model and per-class default-resolution policy; affected: TP-08, SE-04, SE-09; blocking stage: reconciliation-UI implementation).
- `OQ-SE-OFFLINE-P2P` (owner: Department 03; safe default: queue-until-reconnect, no device-to-device local propagation in v1; affected: SE-04, SE-09; blocking stage: any local-network sync feature).

---

## SE-10 — Athlete Post-Finalization Correction

**Purpose:** Give an athlete an explicit, audited path to correct or amend their **own** performed-work record (SE-05 logs, SE-06 classification, SE-07 effort/notes, or their own SE-02 attendance) **after** a coach has finalized the session (SE-08). Added in the v2 correction pass for independent-review finding **F-23**.

**Actors:** Athlete (their own records only); the managing coach (read visibility of the amendment, not authorship).

**Capability / trigger:** Available to an Athlete who has a performed-work record on a `completed` session and needs to correct a value they entered (or that reflects their attendance/effort).

**Preconditions:** The session is `completed` (SE-08). The record being amended is athlete-owned (SE-05/SE-06/SE-07, or the athlete's own SE-02 attendance entry).

**Authorization assumptions:**
- Only the owning athlete may initiate an SE-10 amendment. A coach cannot author or silently apply one (coach-edit boundary). A coach who believes a record is wrong asks the athlete to amend, or attaches a separately-attributed coach annotation.
- SE-10 amends the **performed-work record only** — it never edits the finalized prescribed Session structure (TP-04), which stays locked.
- SE-10 is not a re-open of the session; the session stays `completed`.

**Owned resources:** Amendment record (target record ↔ original value ↔ amended value ↔ timestamp ↔ actor ↔ reason), layered over the original without destroying it.

**States:** `finalized_record → amendment_requested → amendment_applied` (the original value is retained alongside every amendment; multiple amendments stack chronologically).

**State transitions:**
1. `amendment_requested`: athlete opens the finalized record, states the corrected value and a reason.
2. `amendment_applied`: the amendment is persisted as a new layer; the record now shows the amended value as current, with the full original-plus-history retained and visible.

**Happy path:** An athlete realizes two days after practice that they logged a 400 m split against the wrong rep → opens SE-10 → enters the corrected split and the reason ("logged against wrong rep") → the amendment is applied; PF-01/PF-03/PF-04 recompute; the coach sees the amendment with its reason and timestamp in PF-02/PF-01.

**Alternate paths:** Amending an SE-06 completion classification (e.g., from `skipped` to `partial` with a note); amending an SE-07 RPE value entered in error.

**Errors/failures:** An athlete attempting to amend another athlete's record → rejected. An attempt to change the finalized prescribed Session structure via SE-10 → not supported (wrong target). An amendment with no stated reason → rejected (reason is mandatory for the audit trail).

**Recovery:** An amendment can itself be amended; every prior value (including the pre-amendment original) is retained. Nothing is silently rewritten.

**Offline behavior:** An athlete may draft an amendment offline; it is applied on reconnect and is not treated as durable until server-confirmed. If it collides with an interim change, it enters SE-09 reconciliation.

**Synchronization implications:** Amendments merge into history without overwriting interim corrections; a late-arriving offline amendment is layered by timestamp, never last-write-wins over an existing amendment.

**Notifications:** The managing coach is notified (operational class) that an athlete amended a finalized record, with the reason. The athlete is notified their amendment was applied.

**Audit requirements:** Mandatory. Each amendment records original value, new value, timestamp, actor, and reason. Finalized history is never silently rewritten — this is the audit anchor for any later prescribed-vs-performed or data-subject-rights question (PS-05/PS-08).

**Exit condition:** The performed-work record reflects the athlete's corrected value with the original and the full amendment history retained and attributable.

**Downstream artifacts:** Recomputes PF-01/PF-03/PF-04; surfaces in PF-02 alongside TP-08 modification history; feeds PS-08 (a data-subject correction request for session data is fulfilled through SE-10).

**Open questions:** `OQ-SE10-WINDOW` (owner: Department 01 with Department 04; safe default: **no time limit** on an athlete correcting their own performed-work truth while the account is active — data-subject-rights framing; evidence required: any operational reason to bound it, e.g. official results submission; affected: SE-10, PF-*; blocking stage: only if a bounded window is ever introduced).
