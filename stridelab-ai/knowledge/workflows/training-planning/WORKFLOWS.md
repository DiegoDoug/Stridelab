# Training Planning Workflows

**Category:** training-planning
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Depends on:** identity-team, team-administration (Event Group/Subgroup/athlete assignment must exist before plans can target them)

**v2 normative decisions applied to this category (were OPEN/confirm-item in v1):**
- **TP-06 scope-narrowing is normative:** duplication produces a `draft` owned by the duplicating actor and scoped to *that actor's* current authority — it never inherits a source scope broader than the duplicator holds. (Finding F-15.)
- **Scope-change effects are normative** (shared with TA-04, TP-07, SE-09, PF-01, AN-07): narrowing a coach's or an athlete's scope revokes *future, not-started* prescriptions that fall outside the new scope; *in-progress* execution enters SE-09 reconciliation; historical athlete-authored truth is always preserved; athletes always retain access to their own data; Head Coaches retain full Team-authorized scope.

This category models the coach-authored planning hierarchy: Season/Macrocycle →
Block/Mesocycle → Week/Microcycle → Session/Training Day, plus templates,
duplication, assignment, and modification. Coach *prescription* here is a
distinct concept from athlete-*performed* work, which is modeled in
session-execution. Personal workouts (personal-workouts category) never
participate in this planning hierarchy.

---

## TP-01 — Season / Macrocycle

**Purpose:** Define the top-level, longest-duration training-planning container for a Team or group (e.g., an outdoor season).

**Actors:** Head Coach / Team Creator, Event Coach (scope: their assigned Event Groups/Subgroups — see authorization assumptions).

**Capability / trigger:** Available to an actor holding a coaching role on the Team who wants to establish a top-level planning container within their authorized scope.

**Preconditions:** Team exists; author holds Head Coach or Event Coach role.

**Authorization assumptions:**
- A Head Coach may create a Macrocycle scoped to the whole Team or to any Event Group/Subgroup.
- An Event Coach may create a Macrocycle scoped only to Event Groups/Subgroups they are assigned to manage (TA-05) — they cannot author a Team-wide Macrocycle or one targeting a group outside their scope.
- Creating a Macrocycle does not itself assign it to athletes (see TP-07) — authorship and assignment are distinct transitions.

**Owned resources:** Macrocycle record (name, date range, Team/group scope, author).

**States:** `draft → active → completed | archived`.

**State transitions:**
1. `nonexistent → draft`: coach begins authoring.
2. `draft → active`: coach publishes it as the operative macrocycle for its scope (may coexist with assignment, TP-07, as a separate step).
3. `active → completed`: end date reached / coach marks complete.
4. `active|completed → archived`: retained for history, no longer editable in the ordinary flow.

**Happy path:** Coach names the Macrocycle, sets date range and scope → saves as `draft` → refines Blocks (TP-02) within it → publishes to `active`.

**Alternate paths:** Coach creates a Macrocycle by duplicating a prior season's structure (see TP-06) rather than starting blank.

**Errors/failures:** Author lacks scope authority (e.g., Event Coach targeting an unassigned group) → rejected. Overlapping date ranges for the same scope — see `OQ-TP-OVERLAP`.

**Recovery:** `draft` may be discarded without downstream effect since nothing has been assigned yet. `active` cycles are corrected via TP-08 (plan modification), not deletion, once athletes are assigned.

**Offline behavior:** Authoring may begin offline as a local draft; publishing to `active` and any state visible to other Team members requires synchronization.

**Synchronization implications:** Must propagate to Event Coaches/Athletes in scope before Block/Week/Session content beneath it is visible to them.

**Notifications:** Optional — coaches likely want awareness of new Team-wide macrocycles; per-athlete notification depends on TP-07 assignment, not authorship.

**Audit requirements:** Authorship and scope are recorded for traceability of the planning hierarchy; not independently safety/authorization-critical beyond standard Event Coach scope enforcement.

**Exit condition:** Macrocycle exists with defined scope and a clear authorship trail; or the draft is discarded with no residual state.

**Downstream artifacts:** Container for TP-02 (Blocks); referenced by reporting (PF-02 training history).

**Open questions:**
- `OQ-TP-OVERLAP` (owner: Department 01; safe default for v1: overlapping Macrocycles/Blocks/Weeks in the same scope are **allowed** — the app does not block them, and the coach is responsible for coherence; evidence required: a product decision that overlaps should be prevented or warned; affected: TP-01/02/03; blocking stage: only an overlap-prevention feature).
- `OQ-TP-PROMOTE` (owner: Department 01; safe default: an Event Coach's Macrocycle **cannot** be auto-promoted to Team-wide — a Head Coach who wants Team-wide scope authors or duplicates it themselves via TP-06; evidence required: product need for an in-place promotion; affected: TP-01, TP-06; blocking stage: only a promotion feature).

---

## TP-02 — Block / Mesocycle

**Purpose:** Define a mid-length training block nested within a Macrocycle (e.g., a 4-week strength block).

**Actors:** Same as TP-01, scoped to the parent Macrocycle's author/authority.

**Capability / trigger:** Available to a coach with authorship/scope authority over an existing `draft` or `active` Macrocycle, to add a Block within it.

**Preconditions:** Parent Macrocycle exists and is `draft` or `active`.

**Authorization assumptions:** Authoring a Block requires the same scope authority as the parent Macrocycle. **Normative v2:** an Event Coach cannot add a Block to a Head-Coach-authored Team-wide (or out-of-scope) Macrocycle — co-authorship of another author's planning artifact is **not supported in v1** (default-deny). Cross-author collaboration is candidate decision `CD-PLAN-COAUTHOR`.

**Owned resources:** Block record (name, date range within parent bounds, training focus/metadata, parent Macrocycle reference).

**States:** `draft → active → completed | archived` (mirrors TP-01, one level deeper).

**State transitions:** Same pattern as TP-01, constrained to fall within the parent Macrocycle's date range.

**Happy path:** Coach adds a Block inside the Macrocycle, sets its date range and focus → refines Weeks (TP-03) within it.

**Alternate paths:** Duplicating a Block from a template or prior cycle (TP-06).

**Errors/failures:** Block date range falls outside parent Macrocycle bounds → rejected. Overlapping Blocks within the same Macrocycle scope — governed by `OQ-TP-OVERLAP` (safe default: allowed).

**Recovery:** Same as TP-01, one level deeper; deleting a `draft` Block with no assigned Weeks/Sessions is safe.

**Offline behavior:** Same authoring/publish split as TP-01.

**Synchronization implications:** Must propagate before Weeks/Sessions beneath it are visible downstream.

**Notifications:** Same posture as TP-01.

**Audit requirements:** Same posture as TP-01.

**Exit condition:** Block exists nested correctly within its Macrocycle's bounds.

**Downstream artifacts:** Container for TP-03 (Weeks).

**Open questions:** None for v1 (co-authorship is resolved default-deny; tracked as candidate decision `CD-PLAN-COAUTHOR`).

---

## TP-03 — Week / Microcycle

**Purpose:** Define a single week's training structure nested within a Block.

**Actors:** Same authority pattern as TP-02, one level deeper.

**Capability / trigger:** Available to a coach with authorship/scope authority over an existing Block, to add a Week within it.

**Preconditions:** Parent Block exists.

**Authorization assumptions:** Mirrors TP-02.

**Owned resources:** Week record (date range within parent Block, parent Block reference, weekly load/notes metadata).

**States:** `draft → active → completed | archived`.

**State transitions:** Mirrors TP-01/TP-02, constrained within parent Block bounds.

**Happy path:** Coach adds a Week inside the Block → defines Sessions/Training Days (TP-04) within it.

**Alternate paths:** Duplicating a Week (TP-06), e.g., a recurring taper-week pattern.

**Errors/failures:** Week date range outside parent Block bounds → rejected.

**Recovery:** Same pattern as TP-01/TP-02.

**Offline behavior:** Same authoring/publish split.

**Synchronization implications:** Must propagate before Sessions beneath it are visible downstream, and critically before SE-01 (start practice) can reference a prescribed Session.

**Notifications:** Same posture as TP-01/TP-02; a newly `active` Week is more likely to warrant athlete-facing notification since it's the level closest to daily execution.

**Audit requirements:** Same posture as TP-01/TP-02.

**Exit condition:** Week exists nested correctly within its Block's bounds.

**Downstream artifacts:** Container for TP-04 (Sessions).

**Open questions:** None beyond those inherited from TP-01/TP-02.

---

## TP-04 — Session / Training Day

**Purpose:** Define the concrete, prescribable unit of training — the object that session-execution (SE-*) operationalizes.

**Actors:** Head Coach / Event Coach within their scope; consumed by Athletes via assignment (TP-07) and execution (SE-*).

**Capability / trigger:** Available to a coach with authorship/scope authority over an existing Week (or via a template, TP-05), to define a Session/Training Day.

**Preconditions:** Parent Week exists (or a Session may be authored standalone via a template, see TP-05, and later attached to a Week).

**Authorization assumptions:** Mirrors TP-02/TP-03. Critically, a Session is a **prescription**, not a performed-work record — the distinction between what a coach prescribes here and what an athlete actually does (SE-05/SE-06) must never be collapsed.

**Owned resources:** Session record (date, parent Week reference, prescribed work items — sets/reps/paces/distances/notes, target scope — Team/Event Group/Subgroup/individual athletes via TP-07).

**States:** `draft → published → in_progress → completed | cancelled`. (`in_progress`/`completed` are driven by SE-01/SE-08 in session-execution, not by authoring alone — authoring only reaches `published`.)

**State transitions:**
1. `draft → published`: coach finalizes prescribed content and makes it visible to assigned athletes/coaches.
2. `published → in_progress`: handed off to SE-01 (start practice).
3. `published → cancelled`: coach cancels before execution (e.g., weather, changed plan).

**Happy path:** Coach authors prescribed work for a date → publishes → Session becomes visible to assigned athletes ahead of practice → execution proceeds via SE-*.

**Alternate paths:** Session authored from a template (TP-05) rather than from scratch; Session duplicated from a prior date (TP-06).

**Errors/failures:** Publishing a Session with no assigned scope (TP-07 never run) → athletes have nothing to see; not a hard error but a workflow gap the coach should be prompted about.

**Recovery:** `draft` Sessions may be freely edited/discarded. `published` Sessions require TP-08 (plan modification) semantics once athletes may already be viewing them, especially once `in_progress`.

**Offline behavior:** Authoring may occur offline as a draft; publishing requires sync so assigned athletes/coaches receive it before practice. Once published and cached locally by an athlete's device, the Session must remain usable offline for SE-* (see session-execution offline behavior).

**Synchronization implications:** This is the most synchronization-critical planning artifact — practice frequently happens in low/no-connectivity environments (tracks, fields), so a published Session must be fully available offline once synced, and any last-minute coach edit (TP-08) made close to practice time creates a reconciliation risk that must be surfaced, not silently dropped.

**Notifications:** Assigned athletes/coaches notified when a Session is published or materially modified close to its date.

**Audit requirements:** Not independently safety-critical, but prescription content changes close to/during practice should be traceable to support SE-04 (modifications during session).

**Exit condition:** Session exists in `published` state, ready for TP-07 assignment and SE-01 execution, or is cleanly `cancelled`.

**Downstream artifacts:** Directly consumed by SE-01 through SE-08 (session-execution); referenced by PF-01/PF-02 (history) and MD-04 (media attach to Session).

**Open questions:** Exact behavior when a coach edits a `published` Session after an athlete has already begun offline execution — see TP-08 and SE-04 for the shared conflict-resolution question.

---

## TP-05 — Workout / Session Template Creation

**Purpose:** Let a coach save a reusable prescription pattern independent of any specific date, for reuse across Sessions.

**Actors:** Head Coach / Event Coach within their scope.

**Capability / trigger:** Available to an actor holding a coaching role who wants to save a reusable prescription pattern, from an authored Session or built directly.

**Preconditions:** Author holds Head Coach or Event Coach role.

**Authorization assumptions:** **Normative v2 default:** a template is **private to its author** (and to the Head Coach, who has Team-wide authoring authority) unless explicitly shared. A Team-wide shared template library is candidate decision `CD-TEMPLATE-LIBRARY` (`OQ-TP-TEMPLATE-SHARING` — owner: Department 01; safe default: author-private; evidence required: a product decision on curation/ownership of shared templates; affected: TP-05, TP-06; blocking stage: only a shared-library feature).

**Owned resources:** Template record (prescribed work structure, author, sharing scope, no date/no assignment).

**States:** `active → archived`.

**State transitions:** `active → archived` when no longer useful; templates are not deleted destructively by default (archival preferred, since past Sessions may reference the template as their origin for audit/history purposes).

**Happy path:** Coach authors a Session or a standalone structure → saves it as a named template → later instantiates it into TP-04 Sessions on demand.

**Alternate paths:** Instantiating a template directly into a new Week/Session (this *is* a form of TP-06 duplication, applied to a template rather than a dated Session).

**Errors/failures:** N/A beyond standard authorization/scope checks.

**Recovery:** Archived templates can be reactivated; nothing destructive occurs on archival.

**Offline behavior:** Template authoring/use may occur against locally cached templates; new templates require sync to be usable by other coaches sharing them.

**Synchronization implications:** Shared templates must propagate before other in-scope coaches can see/use them.

**Notifications:** Not typically required.

**Audit requirements:** Not safety-critical; standard authorship tracking suffices.

**Exit condition:** Template exists and is instantiable into TP-04 Sessions.

**Downstream artifacts:** Feeds TP-04 (Session authoring) and TP-06 (duplication).

**Open questions:** `OQ-TP-TEMPLATE-SHARING` (stated above; safe default author-private).

---

## TP-06 — Duplication

**Purpose:** Copy an existing planning artifact (Macrocycle, Block, Week, or Session) to accelerate authoring of similar future cycles.

**Actors:** Head Coach / Event Coach within their scope.

**Capability / trigger:** Available to a coach to copy a planning artifact visible/owned within their scope; the copy is scoped to the duplicating actor's own authority.

**Preconditions:** Source artifact exists and is visible/owned within the actor's scope.

**Authorization assumptions (normative v2 — finding F-15):** Duplication produces a new `draft` artifact owned by the duplicating actor and scoped to that actor's own current authority. It **never** inherits a source scope that exceeds the duplicator's authority — e.g., an Event Coach duplicating a Head-Coach-authored Team-wide Macrocycle produces a draft scoped to the Event Coach's own managed groups; only a Head Coach duplicating it keeps Team-wide scope.

**Owned resources:** New artifact record referencing the source as its duplication origin (for traceability), independent thereafter.

**States:** New artifact starts at `draft`, following the state machine of its artifact type (TP-01/02/03/04).

**State transitions:** `nonexistent → draft` (copy), then follows the normal lifecycle of that artifact type.

**Happy path:** Coach selects a prior Season/Block/Week/Session → duplicates → adjusts dates/content → publishes as a new independent artifact.

**Alternate paths:** Duplicating a whole Macrocycle cascades to duplicate its contained Blocks/Weeks/Sessions as `draft` copies; duplicating a single Session does not affect its siblings.

**Errors/failures:** Duplicating into a scope the actor doesn't own → rejected per authorization assumptions above.

**Recovery:** The duplicate is independent — editing or discarding it never affects the source artifact.

**Offline behavior:** Duplication of locally cached artifacts may occur offline as a draft; publishing requires sync as usual for the resulting artifact type.

**Synchronization implications:** Same as the resulting artifact type's own rules (TP-01 through TP-04).

**Notifications:** None required for the duplication act itself.

**Audit requirements:** Traceability to source is retained for history but is not independently safety/authorization-critical.

**Exit condition:** New artifact exists independently, correctly scoped to the duplicating actor's authority.

**Downstream artifacts:** Produces artifacts consumed exactly as their type dictates (TP-01 through TP-05 downstream lists apply).

**Open questions:** None. The scope-narrowing rule (a duplicate never inherits a scope broader than the duplicator holds) is a **normative v2 decision** (finding F-15), not a confirmation item.

---

## TP-07 — Athlete / Group Assignment

**Purpose:** Bind a published planning artifact (most commonly a Session, but potentially a Week/Block/Macrocycle) to the specific Athletes, Subgroups, or Event Groups who should see and act on it.

**Actors:** Head Coach / Event Coach within their scope.

**Capability / trigger:** Available to a coach with authorship/assignment authority over a planning artifact, to bind it to athletes/groups within their authorized scope.

**Preconditions:** Planning artifact exists (`draft` or `published`); target Athletes/groups exist and are within the assigning coach's authorized scope (per TA-04/TA-05).

**Authorization assumptions:**
- An Event Coach may only assign to Athletes/groups within their own managed Event Groups/Subgroups (hard invariant — this is the same boundary enforced in team-administration).
- Assignment is what actually determines an Athlete's visibility into a Session, not mere Team membership — an Athlete on the Team who is not assigned sees nothing from that artifact.
- Assignment never grants planning authority to the assigned Athlete — they remain a *consumer* of the prescription (contrast with personal-workouts, where the athlete is the author).

**Owned resources:** Assignment record (planning artifact ↔ Athlete/Subgroup/Event Group targets).

**States:** `unassigned → assigned`.

**State transitions:** `unassigned → assigned` on coach confirmation; `assigned → unassigned` if the coach later narrows scope (distinct from TP-08 content modification).

**Scope-narrowing effect (normative v2):** when an assignment is removed, or an athlete/coach scope is narrowed such that a previously-assigned Session now falls outside scope:
- a Session in `published` state that the athlete has **not started** is revoked from that athlete's visibility (future not-started prescriptions outside the new scope are withdrawn);
- a Session the athlete has already **started** (`in_progress`, SE-01) enters SE-09 reconciliation rather than being yanked mid-execution;
- the athlete's already-logged performed-work truth for any past session is **preserved** and remains visible to the athlete regardless of the scope change;
- the athlete always retains access to their own historical data (PF-01).

**Happy path:** Coach publishes a Session → assigns it to a Subgroup → all current Athletes in that Subgroup gain visibility into the Session ahead of practice.

**Alternate paths:** Individual-athlete assignment (bypassing group-level targeting) for athlete-specific prescriptions within an otherwise group session.

**Errors/failures:** Assigning outside authorized scope → rejected. Assigning to an Athlete removed from the Team/group after assignment → assignment is implicitly voided by the membership/assignment removal (IT-06/TA-04), not left dangling.

**Recovery:** Unassignment is non-destructive to the underlying planning artifact.

**Offline behavior:** Assignment changes require sync to reach the affected athletes' devices; an athlete's device must treat a previously cached assignment as provisional until reconciled if it was later revoked.

**Synchronization implications:** This is the transition that actually triggers an athlete's client to fetch/cache the Session content for offline execution — it must complete before the athlete can rely on SE-01 offline availability.

**Notifications:** Assigned athletes notified of new/changed assignment, especially close to the Session date.

**Audit requirements:** Authorization-sensitive (defines who can see what); audited consistent with TA-04/TA-05.

**Exit condition:** Assignment record accurately reflects current authorized targeting for the planning artifact.

**Downstream artifacts:** Directly gates SE-01 (an athlete can only start a prescribed practice they are assigned to) and athlete-facing visibility throughout session-execution.

**Open questions:** None. Scope-narrowing effects are normative (stated above). Event Coach assignment-delegation is candidate decision `CD-EC-DELEGATION`.

---

## TP-08 — Plan Modification

**Purpose:** Change a planning artifact's content after it has been published and possibly already assigned/synced/execution-started.

**Actors:** Head Coach / Event Coach within their scope (authorship authority, not merely assignment authority).

**Capability / trigger:** Available to the planning artifact's author (or a Head Coach within Team-wide authority), to modify its content.

**Preconditions:** Artifact exists in `draft`, `published`, or `in_progress` state (editing a `completed` artifact is treated as a correction, see errors/failures).

**Authorization assumptions:** Only the artifact's author (or a Head Coach overriding an Event Coach's artifact within Team-wide authority) may modify it; assignment authority (TP-07) does not by itself confer content-edit authority.

**Owned resources:** The planning artifact's content fields.

**States:** No new states are introduced; modification is a content mutation that may occur in `draft`, `published`, or `in_progress`.

**State transitions:** N/A (content mutation within existing states) — except that a `draft` remains `draft` while a `published`/`in_progress` modification is the higher-risk case this workflow exists to govern.

**Happy path:** Coach edits a `draft` artifact freely with no downstream impact since nothing has been assigned/executed yet.

**Alternate paths / higher-risk case:** Coach edits a `published` or `in_progress` Session that assigned athletes have already synced or begun executing offline (SE-01 already underway) — this is the case workflow-architecture flags explicitly: **a destructive/consequential transition must identify authority, confirmation, reversibility, and downstream effects.** The modification must:
1. Be clearly attributed and timestamped.
2. Propagate to affected athletes' devices as soon as connectivity allows.
3. Never silently overwrite an athlete's in-progress logged data (SE-05/SE-06) for the pre-modification prescription — the athlete's actual performed-work record remains a historically accurate account of what was prescribed *at the time they executed it* (see session-execution reconciliation).

**Errors/failures:** Editing a `completed` artifact is not a normal modification path — it is a correction and should be distinguishable in audit trail from a live in-progress edit. Editing outside authorship scope → rejected.

**Recovery:** Prior content versions should be recoverable for audit/dispute purposes (exact versioning mechanism is an implementation detail, not specified here).

**Offline behavior:** A coach may draft a modification offline, but it does not take effect for athletes until synced; conversely, an athlete already executing offline against a previously synced version continues against that version until their device reconciles with the coach's update.

**Synchronization implications:** This is the highest-risk synchronization case in the entire planning category — a same-day modification to an in-progress Session while athletes are executing offline on a field with no connectivity creates a reconciliation window that must be surfaced to both coach and athlete (e.g., "athlete logged against an outdated version") rather than silently resolved by last-write-wins.

**Notifications:** Assigned athletes/coaches notified of the modification, with urgency scaled to proximity to/during practice.

**Audit requirements:** Modification events, especially to `published`/`in_progress` artifacts, are audited with actor, timestamp, and diff-level traceability sufficient to explain a later discrepancy between prescribed and logged work.

**Exit condition:** Artifact content reflects the confirmed modification, and any athletes who executed against a stale version have a clear, honest record of what they actually did versus what is now prescribed.

**Downstream artifacts:** Directly affects SE-03 (prescribed work delivery) and SE-04 (modifications during session); feeds PF-02/PF-03 history accuracy.

**Open questions:**
- `OQ-SE-RECONCILE-UX` (owner: Department 01; safe default: SE-09's state machine and non-loss / honest-attribution guarantees apply — every conflict is surfaced to its owning actor and never auto-resolved by last-write-wins; evidence required: a chosen presentation model and default-resolution policy per conflict class; affected: TP-08, SE-04, SE-09; blocking stage: implementation of the reconciliation UI). The **structural** home for this case is SE-09.
- `OQ-TP-HC-OVERRIDE` (owner: Department 01; safe default: a Head Coach **may** modify an Event Coach's authored artifact within the Head Coach's Team-wide authoring authority, and every such edit is attributed, timestamped, and audited; a formal request-and-handoff mechanism is candidate decision `CD-PLAN-COAUTHOR`; evidence required: whether teams want an explicit handoff step; affected: TP-08, PF-02; blocking stage: only a handoff feature).
