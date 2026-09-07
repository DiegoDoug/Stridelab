# Performance & History Workflows

**Category:** performance
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Depends on:** session-execution (SE-08 completed sessions), personal-workouts (PW-02 logs), training-planning (TP-* prescriptions for prescribed-vs-actual comparison)

This category is read/derived-data-heavy: it does not introduce new
authorization primitives but must strictly inherit them from the categories
that own the underlying records.

**v2 normative decisions (were OPEN in v1):**
- **Event Coaches receive identifiable performance data only for their currently-managed athletes** (TA-04/TA-05 scope). Historical-scope-at-time-of-record is **not** used in v1 — visibility is evaluated against *current* management scope. (Finding F-15.)
- **Athletes always retain full access to their own data** (history, metrics, PBs, reports, export), regardless of any coach scope change.
- **Head Coaches retain Team-authorized scope** (all athletes/groups on their Team).
- Group-level aggregates must **never** reveal an out-of-scope athlete's individual data (PF-03/PF-05 aggregation-boundary rule is a normative requirement, not an implementation nicety).

---

## PF-01 — Workout History

**Purpose:** Present an athlete's chronological record of completed/skipped/partial coach-prescribed sessions and (per the PW-01 open question) optionally personal workouts, clearly distinguished.

**Actors:** Athlete (own full history); coach (history of athletes within their **current** management scope, TA-04/TA-05).

**Capability / trigger:** Available to an Athlete for their own history, and to a coach for an athlete currently within their management scope (Head Coach: any Team athlete).

**Preconditions:** At least one SE-08-completed session or PW-02 log exists.

**Authorization assumptions (normative v2):** A coach's view is strictly bounded by **current** management scope — an Event Coach cannot see workout history for athletes outside their currently-assigned groups, historical or not. Historical-scope-at-time-of-record is not used in v1. An athlete always sees their own full history. Personal workouts (PW-*) are visually/structurally distinguished from coach-prescribed sessions and, under the safe default of `OQ-PW-COACH-VISIBILITY`, appear **only** in the owning athlete's own history view.

**Owned resources:** Read/derived view; owns no primary data (aggregates SE-08 and, if included, PW-02 records).

**States:** N/A (read view, not a stateful workflow) — data freshness state is `stale ↔ current` relative to sync.

**State transitions:** N/A.

**Happy path:** Athlete opens their history and sees a chronological list of completed sessions with attendance/completion/effort data.

**Alternate paths:** Coach opens an assigned athlete's history for the same view, scoped to sessions the coach has visibility into (their own authored/assigned sessions at minimum; Team-wide-authored sessions the athlete participated in, per the same visibility logic as TP-07).

**Errors/failures:** Attempting to view history for an athlete outside current scope → rejected.

**Recovery:** N/A (read-only).

**Offline behavior:** Viewable from locally cached, already-synced history; newly completed sessions on other devices require sync to appear.

**Synchronization implications:** History must reflect the authoritative SE-08 completion record, including any late-arriving offline completions merged per that workflow's rules.

**Notifications:** Not required.

**Audit requirements:** Access to history is not independently audited beyond standard access logging; the underlying records' audit trail (SE-08, PW-02) is authoritative.

**Exit condition:** N/A (persistent view).

**Downstream artifacts:** Feeds PF-03 (performance metrics), PF-05 (reports), PF-06 (exports).

**Open questions:** None. Current-scope-only visibility is a normative v2 decision (finding F-15).

---

## PF-02 — Training History

**Purpose:** Present the coach-authored planning hierarchy (TP-01 through TP-04) actually delivered over time, as distinct from the athlete-execution view in PF-01.

**Actors:** Coach (own-authored and currently-assigned-scope plans); Head Coach (Team-wide).

**Capability / trigger:** Available to a coach reviewing planning artifacts within their current authorized scope.

**Preconditions:** At least one TP-04 Session has been published/executed.

**Authorization assumptions:** Mirrors PF-01's scope logic, applied to planning artifacts rather than athlete performance — an Event Coach sees training history for groups within their management scope; Head Coach sees all.

**Owned resources:** Read/derived view over TP-01 through TP-08 records.

**States/transitions:** N/A (read view).

**Happy path:** Coach reviews how a Macrocycle's Blocks/Weeks/Sessions actually played out, including any TP-08 modifications made along the way.

**Alternate paths:** Comparing planned vs. modified content for a given Session (surfacing TP-08's audit trail).

**Errors/failures:** Out-of-scope access → rejected.

**Recovery:** N/A (read-only).

**Offline behavior:** Same posture as PF-01.

**Synchronization implications:** Must accurately reflect TP-08 modification history, not just final state, to be useful for coaching retrospectives.

**Notifications:** Not required.

**Audit requirements:** Inherits from TP-08's audit trail.

**Exit condition:** N/A (persistent view).

**Downstream artifacts:** Feeds PF-05 (reports).

**Open questions:** None beyond those inherited from training-planning.

---

## PF-03 — Performance Metrics

**Purpose:** Derive quantitative performance indicators (e.g., pace trends, volume trends, effort trends) from PF-01/PF-02 underlying data.

**Actors:** Athlete (own metrics); coach (metrics for athletes within management scope).

**Capability / trigger:** Available to an Athlete for their own derived metrics, and to a coach for athletes/groups currently within their management scope, when sufficient underlying data exists.

**Preconditions:** Sufficient underlying SE-05/SE-06/SE-07 data exists to derive a metric.

**Authorization assumptions (normative v2):** Same scope inheritance as PF-01; metrics never aggregate data the viewing actor could not see at the individual-record level. A coach cannot see a Team-wide or group aggregate that implicitly reveals an out-of-scope athlete's individual data.

**Owned resources:** Derived metric records (not primary data).

**States/transitions:** N/A (derived/read).

**Happy path:** Athlete views their pace trend over the current training block; coach views aggregate trends for their assigned group.

**Alternate paths:** Metrics segmented by event type, time period, or training block.

**Errors/failures:** Insufficient data → honest "not enough data" state, not a fabricated/misleading metric.

**Recovery:** N/A.

**Offline behavior:** Computable from locally cached, already-synced underlying data; may be stale until sync.

**Synchronization implications:** Metric accuracy depends entirely on underlying record completeness/freshness (PF-01/PF-02).

**Notifications:** Not required, though milestone-based notifications (e.g., a new PB, PF-04) are a related but distinct workflow.

**Audit requirements:** Not independently audited; inherits from underlying data.

**Exit condition:** N/A (persistent/derived view).

**Downstream artifacts:** Feeds PF-04 (PB/PR tracking), PF-05 (reports).

**Open questions:** None as a product decision — the aggregation-boundary rule (a group aggregate must never let a viewer infer an out-of-scope athlete's individual data) is **normative**. `OQ-PF-AGG-METHOD` remains an *implementation* refinement (owner: Department 03; safe default: suppress any aggregate whose cohort is small enough to be re-identifying, and compute aggregates only over athletes the viewer can already see individually; affected: PF-03, PF-05; blocking stage: PF-03 implementation).

---

## PF-04 — PB/PR Tracking

**Purpose:** Identify and surface an athlete's personal-best/personal-record achievements derived from logged results.

**Actors:** Athlete (own PBs/PRs); coach (for athletes within management scope).

**Capability / trigger:** Automatic derivation from SE-05/SE-06 logged results; PW-02 personal-workout logs contribute to the owning athlete's own PB/PR view only (safe default of `OQ-PW-COACH-VISIBILITY`).

**Preconditions:** A logged result exists for a trackable metric (e.g., a timed event, a distance).

**Authorization assumptions:** Same scope inheritance as PF-01/PF-03.

**Owned resources:** PB/PR record (athlete ↔ event/metric ↔ best value ↔ date achieved).

**States:** `no_pb → pb_set → pb_broken` (superseded by a later, better result).

**State transitions:** `no_pb → pb_set`: first qualifying result for a metric. `pb_set → pb_broken`: a later result improves on it, and the record updates to reflect the new best while retaining history of prior bests (not silently overwritten, for accurate longitudinal history).

**Happy path:** Athlete logs a result that beats their prior best → system flags it as a new PB.

**Alternate paths:** A result logged for a metric with no prior record → establishes the first PB.

**Errors/failures:** A result logged against a modified/uncertain prescription version (per TP-08/SE-04 reconciliation issues) that casts doubt on comparability — should be flagged for the athlete/coach's awareness rather than silently counted as a PB, since data integrity here matters to the athlete.

**Recovery:** A mistakenly logged result that inflates a PB can be corrected (per SE-05's edit window), which should recompute PB status accordingly.

**Offline behavior:** Derivable from locally cached, already-synced data; provisional local PB detection before sync should be treated as provisional, not final, until reconciled.

**Synchronization implications:** Cross-device logging (athlete logs on two different devices over time) must merge without missing a true PB or falsely awarding one from unsynced/duplicate data.

**Notifications:** Athlete (and optionally coach) notified of a new PB — a natural motivational touchpoint, though exact notification policy is a product/UX detail not mandated here.

**Audit requirements:** Not independently audited beyond standard data-integrity tracking on the underlying log entry.

**Exit condition:** PB/PR record accurately reflects the athlete's best qualifying result per metric, with history preserved.

**Downstream artifacts:** Feeds PF-05 (reports).

**Open questions:** None as a v1 product decision — personal-workout results count toward the **owning athlete's own** PB/PR view only, per the safe default of `OQ-PW-COACH-VISIBILITY`. Whether coaches ever see personal-workout-derived PBs is that open item, not a separate one.

---

## PF-05 — Reports

**Purpose:** Compile PF-01 through PF-04 data into a structured, shareable report (e.g., a season summary for an athlete or group).

**Actors:** Coach (for athletes/groups within current management scope); Head Coach (Team-wide); Athlete (own data).

**Capability / trigger:** Available to an actor requesting a compiled report over data already within their authorized scope.

**Preconditions:** Sufficient underlying data exists for the requested scope/period.

**Authorization assumptions:** A report can never include data outside the requesting actor's authorized scope — this is the same aggregation-boundary requirement flagged in PF-03, made explicit here because a report is more likely to be exported/shared externally (PF-06) and therefore carries higher leakage risk if scope is violated.

**Owned resources:** Generated report artifact (a derived, potentially exportable document).

**States:** `requested → generating → ready | failed`.

**State transitions:** Actor requests a report with defined scope/period → system compiles it → `ready` or `failed` (e.g., insufficient data).

**Happy path:** A Head Coach generates an end-of-season Team report summarizing attendance, completion rates, and PB counts.

**Alternate paths:** An athlete generates a personal report of their own season for their own reference.

**Errors/failures:** Requested scope exceeds actor's authorization → rejected before generation begins, not filtered after the fact (defense against accidental over-inclusion).

**Recovery:** A `failed` report can be retried once underlying data issues are resolved.

**Offline behavior:** Report generation likely requires connectivity to assemble complete, authoritative data (especially for group/Team-wide reports); an athlete's own already-cached data may support a limited offline personal report — exact offline capability is an implementation choice, not mandated here.

**Synchronization implications:** A report generated from partially-synced data should honestly indicate its data-freshness/completeness rather than presenting itself as a complete record if some devices' data hasn't yet synced.

**Notifications:** Optional notification when a long-running report finishes generating.

**Audit requirements:** Report generation is not independently audit-critical beyond standard access logging, since it only surfaces data the actor is already authorized to see; however, PF-06 (export) of that report is a materially higher-risk transition and is separately audited there.

**Exit condition:** Report exists in `ready` state within the requester's authorized scope, or generation cleanly fails with an honest reason.

**Downstream artifacts:** Feeds PF-06 (exports).

**Open questions:** `OQ-PF-REPORT-OFFLINE` (owner: Department 03; safe default: an athlete's own-data report may generate from already-cached data offline with an explicit freshness/completeness marker; group/Team reports require connectivity; affected: PF-05, PF-06; blocking stage: PF-05 implementation).

---

## PF-06 — Exports

**Purpose:** Let an authorized actor extract report/history data out of the app (e.g., as a file) for external use.

**Actors:** Same actors as PF-05, exporting a report/data set they are authorized to view.

**Capability / trigger:** Available to an actor extracting data that is already within their authorized in-app scope; export never expands scope.

**Preconditions:** A `ready` report (PF-05) or viewable history/metrics data (PF-01/PF-03/PF-04) exists.

**Authorization assumptions:**
- Export never expands the exporting actor's authorization scope — it can only extract data they were already authorized to view.
- This is a data-leaving-the-system transition and is explicitly relevant to Department 04's privacy/data-governance review, especially where the exported data includes minors' performance data.

**Owned resources:** Export artifact (file) and export event record.

**States:** `not_exported → exporting → exported | failed`.

**State transitions:** Actor confirms export (destructive-adjacent transition in the sense that once data leaves the system, StrideLab loses control over its subsequent handling — this must be treated with the same rigor as other consequential transitions: authority, confirmation, downstream effects).

**Happy path:** A Head Coach exports a season report as a file for external record-keeping (e.g., school administration).

**Alternate paths:** An athlete exports their own history/metrics for personal use (e.g., a college recruiting profile).

**Errors/failures:** Attempting to export data outside the actor's authorized scope → rejected at the same boundary as PF-05.

**Recovery:** N/A — once exported, the artifact exists outside StrideLab's control; there is no "unexport."

**Offline behavior:** Export of already-locally-available data may be possible offline (e.g., an athlete's own cached history); export of Team/group-wide data likely requires connectivity to assemble complete data, consistent with PF-05.

**Synchronization implications:** Same freshness/completeness honesty requirement as PF-05.

**Notifications:** Not typically required beyond confirming export completion.

**Audit requirements:** Mandatory audit event — export is the point at which authorized-in-app visibility becomes data outside the system's access controls, which is directly relevant to youth-data-privacy obligations (PS-05) and must be traceable (who exported what, when, at what scope).

**Exit condition:** Export artifact is produced within the actor's authorized scope with a durable audit record, or the export attempt is cleanly rejected/blocked.

**Downstream artifacts:** Feeds PS-05 (deletion/export framing) and PS-08 (DSR intake) as the general mechanism by which export/portability obligations may be satisfied.

**Open questions:** `OQ-PF-MINOR-EXPORT` (owner: Department 04 `privacy-data-governance` / `legal-regulatory-compliance`; **safe default for v1: an athlete may always export their own data; a coach may export data only within current management scope; any export is audited and never expands scope**; the OPEN part is whether a *coach* exporting a minor's identifiable performance data for an external recipient requires additional consent/notice and any jurisdiction-specific restriction; evidence required: legal analysis per operating jurisdiction; affected: PF-05, PF-06, PS-05, PS-08; blocking stage: a coach-initiated external export feature, not an athlete self-export).
