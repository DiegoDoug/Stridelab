# Personal Workouts Workflows

**Category:** personal-workouts
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Depends on:** team-administration (TA-07 `personal_workouts_allowed` gate), identity-team

Personal workouts are categorically distinct from coach-prescribed training
(training-planning/session-execution). An athlete authoring and logging a
personal workout never grants them training-cycle planning authority, and a
personal workout is never coach-prescribed content. This category exists to
keep that boundary explicit and enforced end to end.

**v2 normative decision (was OPEN/"assumes yes" in v1):** when a Team's
`personal_workouts_allowed` is **disabled** (TA-07), new creation (PW-01) and
new execution/logging of a new session (PW-02) are blocked in that Team
context; existing personal-workout definitions and logs are **retained** in
the athlete's private library and are **not deleted**; the athlete may still
privately correct an already-logged personal workout (PW-03) and export their
own personal-workout data (PF-06 / PS-08). Re-enabling restores full access
with no data loss.

---

## PW-01 — Athlete Creates Personal Workout (When Allowed)

**Purpose:** Let an athlete author a self-directed workout, independent of any coach prescription.

**Actors:** Athlete (Team member).

**Capability / trigger:** Available to an Athlete member of a Team whose `personal_workouts_allowed` is `enabled`, verified against the current authoritative (synced) value.

**Preconditions:** Team's `personal_workouts_allowed` setting is `enabled` (TA-07) at the time of creation, verified against the current authoritative (synced) value.

**Authorization assumptions:**
- Creation is gated exclusively by the Head-Coach-controlled `personal_workouts_allowed` flag — no other role can override it.
- A personal workout belongs solely to the authoring athlete; it is never visible in coach training-planning surfaces as a prescribable/reusable template (that would collapse the personal/coach-prescribed boundary the baseline explicitly protects).
- Creating a personal workout confers no planning authority over any other athlete or over any Team-level training cycle.

**Owned resources:** Personal-workout record (athlete-owned, Team-scoped for context but not coach-authored).

**States:** `nonexistent → draft → saved`.

**State transitions:** `nonexistent → draft`: athlete begins authoring. `draft → saved`: athlete confirms.

**Happy path:** Athlete opens personal workouts → creates a new one → defines their own structure → saves.

**Alternate paths:** Athlete duplicates a prior personal workout of their own as a starting point (self-scoped duplication; never duplicates a coach-authored TP-04/TP-05 artifact into this category, and never the reverse).

**Errors/failures:** Creation attempted while `personal_workouts_allowed` is `disabled` (per authoritative server state) → rejected with an explicit reason.

**Recovery:** A `draft` may be discarded freely.

**Offline behavior:** An athlete may draft offline against a locally cached value of `personal_workouts_allowed`; however, per the team-administration invariant (TA-07 synchronization implications), the creation is not treated as valid until reconciled against the current authoritative server value — if the setting was disabled since the athlete's last sync, the offline-created draft must be flagged, not silently persisted as if authorized.

**Synchronization implications:** Directly inherits the TA-07 risk window; this is the one personal-workouts workflow with a genuine authorization-timing race.

**Notifications:** Not required — this is a private athlete action.

**Audit requirements:** Not independently audit-critical; standard data-integrity tracking suffices. No coach visibility is implied by creation alone.

**Exit condition:** Personal-workout record exists, owned by the athlete, with no coach-authorship or Team-planning linkage.

**Downstream artifacts:** Feeds PW-02 (execution/logging), PW-03 (edit/delete); may optionally feed PF-01 workout history as an athlete-owned entry, clearly distinguished from coach-prescribed sessions.

**Open questions:** `OQ-PW-COACH-VISIBILITY` (owner: Department 01 with Department 04 privacy input; **safe default: personal workouts are NOT visible to any coach**, not even read-only — creation implies no coach visibility; the athlete-ownership boundary is preserved by default; evidence required: an explicit product decision plus athlete consent model if visibility is ever granted; affected: PW-01/02/03, PF-01, PF-04; blocking stage: any implementation that would surface personal-workout data on a coach-facing view).

---

## PW-02 — Executes / Logs Personal Workout

**Purpose:** Let the athlete record actual performance against their own self-authored workout.

**Actors:** Athlete (own record only).

**Capability / trigger:** Available to the owning Athlete of a saved personal workout when the Team's `personal_workouts_allowed` is `enabled` (verified against the current authoritative value).

**Preconditions:** Personal workout exists (PW-01) and belongs to the acting athlete; Team's `personal_workouts_allowed` is `enabled`.

**Authorization assumptions:** New execution/logging of a personal-workout session requires `personal_workouts_allowed` to be `enabled` (normative v2 decision, per TA-07). If the setting is disabled, the athlete cannot start a new personal-workout session in this Team context; existing definitions and prior logs remain visible and are not deleted, and PW-03 private correction of an already-logged workout remains available. Only the owning athlete may execute/log against their own personal workout; no coach authors or alters the record (coach-edit boundary).

**Owned resources:** Personal-workout execution log entry (mirrors the structure of SE-05/SE-06/SE-07 conceptually, but attached to a personal workout, never to a coach-prescribed Session).

**States:** `not_started → in_progress → completed`.

**State transitions:** Athlete starts → logs results per item → finalizes.

**Happy path:** Athlete starts their personal workout → logs actual results, completion status, and optional effort notes → finalizes.

**Alternate paths:** Athlete logs retroactively after performing the workout without a live in-app session.

**Errors/failures:** Attempting to log against another athlete's personal workout → rejected (strictly self-scoped).

**Recovery:** Entries editable until finalization (or per PW-03 afterward, since the athlete owns the record outright).

**Offline behavior:** Fully offline-capable — same offline-critical posture as SE-05, since athletes may perform personal workouts in the same low-connectivity environments as team practice.

**Synchronization implications:** Local-first with opportunistic sync; no cross-athlete conflict is possible since the record is single-owner, but device-to-device sync for the same athlete must merge without loss.

**Notifications:** Not required.

**Audit requirements:** Not audit-critical; personal, athlete-owned data.

**Exit condition:** Execution/log record reflects what the athlete actually did, durable pending sync.

**Downstream artifacts:** Feeds PW-03 and, subject to `OQ-PW-COACH-VISIBILITY` (safe default: athlete-only), PF-01 workout history as a distinctly labeled personal entry visible only to the owning athlete.

**Open questions:** None specific to PW-02. Inherits `OQ-PW-COACH-VISIBILITY` and `OQ-PW-RETENTION-DURATION` (both stated at PW-01 / TA-07).

---

## PW-03 — Edits / Deletes Own Personal Workout

**Purpose:** Let the athlete modify or remove a personal workout (definition) or its logged execution, since they are the sole owner.

**Actors:** Athlete (own record only).

**Capability / trigger:** Available to the owning Athlete of a personal workout (definition and/or its log), independent of the current `personal_workouts_allowed` value.

**Preconditions:** Personal workout (and/or its log) exists and belongs to the acting athlete.

**Authorization assumptions:** Only the owning athlete may edit/delete; no coach or other role has edit/delete authority over an athlete's personal workout, consistent with the approved invariant that coaches cannot edit athlete-owned data. **Normative v2 decision:** private correction/amendment and deletion of an athlete's *own existing* personal workout (definition or log) remain available **regardless** of the Team's `personal_workouts_allowed` value — only new creation (PW-01) and new execution (PW-02) are gated by that setting. Data ownership persists with the athlete.

**Owned resources:** Personal-workout definition and/or its execution log.

**States:** `saved → edited` (definition) / `completed → deleted` (record removed) — deletion of an executed/logged workout is a destructive transition.

**State transitions:** `saved → edited`: athlete changes structure. `any → deleted`: athlete confirms removal (destructive; requires explicit confirmation per workflow-architecture invariants).

**Happy path:** Athlete edits a personal workout's structure before executing it again, or deletes one they no longer want.

**Alternate paths:** Athlete edits a workout *after* it has already been logged (PW-02) — the historical log entry should retain the version it was actually performed against (same reconciliation principle as TP-08/SE-04), not be silently rewritten by a later definition edit.

**Errors/failures:** Attempting to edit/delete another athlete's personal workout → rejected. (Disabling `personal_workouts_allowed` does **not** block PW-03 private correction/deletion of the athlete's own existing records — normative v2 decision.)

**Recovery:** Deletion is athlete-initiated and treated as intentional; no coach-side recovery path exists since coaches have no visibility/ownership of personal workouts (safe default under `OQ-PW-COACH-VISIBILITY`).

**Offline behavior:** Edits/deletes may occur offline against locally cached data; reconciled on sync, with the same non-destructive-to-history principle as above.

**Synchronization implications:** Single-owner record, so no cross-athlete conflicts; device-to-device conflicts for the same athlete must merge without silently discarding either edit.

**Notifications:** Not required.

**Audit requirements:** Not audit-critical for routine edits; deletion of an existing record should retain a minimal trace sufficient to explain a later data-export/deletion request (PS-05) if applicable.

**Exit condition:** Personal workout reflects the athlete's confirmed edit, or no longer exists after confirmed deletion, with historical logs preserved honestly regardless of later definition changes.

**Downstream artifacts:** None beyond the athlete's own historical record; no coach or Team-level artifact depends on a personal workout's continued existence.

**Open questions:** None. The retroactive-effect question is now resolved normatively (PW-03 correction/deletion of own existing records is always available). `OQ-PW-RETENTION-DURATION` (TA-07) applies to how long deleted records leave a minimal trace.
