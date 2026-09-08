# Team Administration Workflows

**Category:** team-administration
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Depends on:** identity-team (IT-02 Team must exist; IT-04 members must exist to be assigned)

**v2 normative decisions applied to this category (were OPEN in v1):**
- Event Coaches **cannot** assign athletes (TA-04) or create/administer Event Groups/Subgroups (TA-02/TA-03) in v1. The Head Coach / Team Creator owns these transitions. Future delegation of any of these to Event Coaches is a separately identified **candidate decision** (`CD-EC-DELEGATION`), not a v1 OPEN item.
- Disabling `personal_workouts_allowed` (TA-07) prevents **new Team-context creation and execution** of personal workouts; it does **not** delete existing private workouts and does **not** prevent private correction or export. Existing workouts stay in the athlete's private library but cannot be newly scheduled or executed inside the restricted Team context.

---

## TA-01 — Assign Team Role

**Purpose:** Set or change a member's role on a specific Team (Head Coach / Event Coach / Athlete).

**Actors:** Head Coach / Team Creator (sole authority to assign/change roles).

**Capability / trigger:** Available to an actor holding the Head Coach / Team Creator role, acting on an active membership of that Team.

**Preconditions:** Target is an active member of the Team (post IT-04).

**Authorization assumptions:**
- Role assignment is exclusively a Head Coach / Team Creator action; Event Coaches do not assign roles.
- Role is scoped to this Team only; it has no effect on the identity's role on any other Team.
- Transferring the Head Coach / Team Creator role is a special case of this workflow (see alternate paths) and must guarantee exactly one Head Coach at all times.

**Owned resources:** Team-membership record's role field.

**States:** `role: Athlete | Event Coach | Head Coach` (single active value per membership).

**State transitions:** `role(X) → role(Y)` on Head Coach confirmation; if `Y = Head Coach`, the previous Head Coach's role must simultaneously transition away from Head Coach (see TA-01a below) to preserve single-Head-Coach invariant.

**Happy path:** Head Coach selects member → selects new role → confirms → membership record updates → member's authorization scope changes on next check/sync.

**Alternate paths (TA-01a — Head Coach transfer):** Current Head Coach designates another member as the new Head Coach → new Head Coach role takes effect → prior Head Coach's role is downgraded (to Event Coach or Athlete, coach's choice) in the same atomic transition — the Team must never have zero or two Head Coaches. Content re-ownership on transfer follows **DD-DEPARTED-CONTENT** (`identity-team/WORKFLOWS.md`): the outgoing Head Coach's Team-authored plans and administrative records stay with the Team and are re-owned by the new Head Coach with authorship attribution retained; the outgoing person's athlete-owned data (if they also hold an athlete record) stays with them.

**Errors/failures:** Attempt to leave a Team with zero Head Coaches → blocked. Attempt to assign a role to a non-member → invalid (must join first, IT-04).

**Recovery:** Role changes are not silently reversible; correcting a mistaken assignment is simply another TA-01 action by the (possibly new) Head Coach.

**Offline behavior:** Role is server-authoritative; role changes made while offline are not supported — this is a connectivity-required administrative action.

**Synchronization implications:** Role changes must propagate before the member's client enforces the new authorization scope; a stale cached role must never grant broader access than currently approved.

**Notifications:** Affected member notified of role change; other coaches notified for Head Coach transfers.

**Audit requirements:** All role changes are authorization-sensitive audit events, especially Head Coach transfer.

**Exit condition:** Membership record reflects exactly one role, Team has exactly one Head Coach.

**Downstream artifacts:** Feeds TA-04/TA-05 (assignment eligibility depends on role), all authorization checks Team-wide.

**Open questions:** None material to the invariant itself; whether Event Coaches can be granted narrower sub-permissions beyond the three baseline roles is OPEN and out of scope for v1.

---

## TA-02 — Create / Manage Event Groups

**Purpose:** Define the Event Group containers that sit beneath a Team in the hierarchy (e.g., a sprints group, a distance group).

**Actors:** Head Coach / Team Creator (sole authority to create, rename, archive, delete Event Groups in v1).

**Capability / trigger:** Available to an actor holding the Head Coach / Team Creator role on the Team, operating on that Team's hierarchy. (No navigation surface is specified here.)

**Preconditions:** Team exists (IT-02); actor holds the Head Coach / Team Creator role.

**Authorization assumptions:**
- Head Coach / Team Creator may create, rename, archive, and delete any Event Group. **Event Coaches cannot create or administer Event Groups in v1** (normative). Delegating group-metadata self-management to an assigned Event Coach is candidate decision `CD-EC-DELEGATION`, not a v1 OPEN item — the safe default is no delegation.
- Event Group existence is independent of whether any Event Coach or Athlete is currently assigned to it.

**Owned resources:** Event Group record (name, Team reference, optional Subgroup collection, assigned Event Coach(es), assigned Athletes).

**States:** `active → archived | deleted`.

**State transitions:**
1. `nonexistent → active`: Head Coach creates the group.
2. `active → archived`: group retained for historical training-plan/session reference but no longer accepts new assignments (used when a group is discontinued but its history matters).
3. `active|archived → deleted`: group and its direct membership associations removed (Subgroups must be handled first — see errors).

**Happy path:** Head Coach creates Event Group → names it → optionally assigns an Event Coach (TA-05) and Athletes (TA-04) in follow-on steps.

**Alternate paths:** Renaming a group does not affect Subgroup, athlete, or plan associations — those references key on the group's identity, not its name.

**Errors/failures:** Deleting an Event Group that still contains Subgroups, assigned Athletes, or referenced training plans → blocked or requires explicit cascade confirmation (destructive-transition rule: identify downstream effects before allowing deletion).

**Recovery:** `archived` is the recommended reversible alternative to `deleted` when historical integrity matters.

**Offline behavior:** Administrative action; requires connectivity for authoritative creation, though local drafting of a group name before submission is acceptable.

**Synchronization implications:** New/changed groups must propagate to coach and athlete rosters before assignment workflows (TA-04/TA-05) can reference them.

**Notifications:** Assigned Event Coaches notified when a group they lead is archived/deleted.

**Audit requirements:** Structural changes to Team hierarchy are audited (affects authorization scoping for every Event Coach assigned to the group).

**Exit condition:** Event Group exists in a well-defined state consistent with the Team hierarchy invariant (Team → Event Group → Subgroup → Athlete).

**Downstream artifacts:** Feeds TA-03 (Subgroups), TA-04/TA-05 (assignment), TP-07 (group-level plan assignment), MG-02 (Event Group chat).

**Open questions:** None for v1. Event Coach self-management of their own group's metadata is deferred as candidate decision `CD-EC-DELEGATION` (owner: Department 01; safe default: no delegation; affected: TA-02/TA-03/TA-04; blocking stage: only if a future release proposes Event Coach group administration).

---

## TA-03 — Create / Manage Subgroups

**Purpose:** Define Subgroups nested under an Event Group for finer-grained athlete organization (e.g., "Sprints — Freshmen").

**Actors:** Head Coach / Team Creator (sole authority to create/administer Subgroups in v1).

**Capability / trigger:** Available to an actor holding the Head Coach / Team Creator role, operating on an `active` Event Group of that Team.

**Preconditions:** Parent Event Group exists (TA-02) and is `active`; actor holds the Head Coach / Team Creator role.

**Authorization assumptions:** A Subgroup always belongs to exactly one Event Group; it cannot exist independently or span multiple Event Groups. **Event Coaches cannot create or administer Subgroups in v1** (normative; part of candidate decision `CD-EC-DELEGATION`, safe default no delegation). A Subgroup's coach coverage is the parent Event Group's assigned Event Coach(es) (TA-05); Subgroup-specific coach scoping distinct from the parent group is not modeled in v1.

**Owned resources:** Subgroup record (name, parent Event Group reference, assigned Athletes).

**States:** `active → archived | deleted` (same semantics as TA-02).

**State transitions:** Mirrors TA-02, scoped one level deeper.

**Happy path:** Head Coach creates a Subgroup under an existing Event Group → assigns Athletes (TA-04).

**Alternate paths:** Moving a Subgroup between Event Groups (re-parenting) — treated as a structural change requiring the same destructive-transition scrutiny as deletion (downstream plan/assignment references must be reconciled).

**Errors/failures:** Creating a Subgroup under an `archived` or `deleted` Event Group → blocked. Deleting a Subgroup with assigned Athletes or referenced plans → requires explicit cascade confirmation.

**Recovery:** `archived` preferred over `deleted` where history matters.

**Offline behavior:** Same as TA-02 — administrative, connectivity-required for authoritative persistence.

**Synchronization implications:** Must propagate before TA-04 can assign Athletes into the Subgroup.

**Notifications:** Assigned Event Coach(es) of the parent group notified of structural changes.

**Audit requirements:** Structural/authorization-scoping change, audited.

**Exit condition:** Subgroup exists nested correctly under exactly one Event Group, consistent with the Team hierarchy invariant.

**Downstream artifacts:** Feeds TA-04 (athlete assignment), TP-07 (plan assignment), MG-03 (Subgroup chat).

**Open questions:** Re-parenting semantics — `OQ-TA-REPARENT` (owner: Department 01; safe default: re-parenting disabled in v1, delete-and-recreate instead; evidence required: product need + downstream-reference reconciliation design; affected: TA-03, TP-07; blocking stage: implementation of re-parenting only). Subgroup-specific coach scoping is folded into candidate decision `CD-EC-DELEGATION`.

---

## TA-04 — Assign Athletes (to Event Groups / Subgroups)

**Purpose:** Place an Athlete member into one or more Event Groups and/or Subgroups, which determines which Event Coaches manage them and which plans/sessions they receive.

**Actors:** Head Coach / Team Creator (**sole** athlete-assignment authority in v1 — normative; independent-review finding F-18).

**Capability / trigger:** Available to an actor holding the Head Coach / Team Creator role, operating on that Team's roster and an `active` Event Group/Subgroup.

**Preconditions:** Athlete holds active Team membership (IT-04). Target Event Group/Subgroup exists and is `active` (TA-02/TA-03). Actor holds the Head Coach / Team Creator role.

**Authorization assumptions:**
- Assignment determines Event Coach management scope: an Event Coach manages exactly the Athletes assigned to their Event Group(s)/Subgroup(s), no more.
- **Event Coaches cannot perform assignment in v1** — assignment is Head-Coach-only. Delegating assignment to Event Coaches within their own managed groups is candidate decision `CD-EC-DELEGATION` (safe default: no delegation).
- Assignment is Team-scoped membership metadata, kept separate from the athlete's personal profile data (approved invariant; PR-* profile category).

**Open questions:** Whether an Athlete may hold simultaneous assignments to more than one Event Group/Subgroup — `OQ-TA-MULTIGROUP` (owner: Department 01; safe default for v1: **allowed** at Head Coach discretion, since nothing in the baseline prohibits a multi-event athlete and each assignment is an independent record; evidence required: confirmation there is no conflicting scheduling/roster-count constraint; affected: TA-04, TP-07, PF-03 aggregation boundary, MG-02/MG-03; blocking stage: none for v1 under the safe default — revisit only if a restriction is later desired).

**Owned resources:** Assignment record (Athlete ↔ Event Group/Subgroup).

**States:** `unassigned → assigned` (per group); an athlete may hold multiple independent assignment records.

**State transitions:** `unassigned → assigned`: coach adds athlete to group. `assigned → unassigned`: coach removes athlete from group (distinct from IT-06 Team removal — this only affects group scope, not Team membership).

**Happy path:** Head Coach selects Athlete → selects target Event Group/Subgroup → confirms → assignment record created → Athlete now appears in that group's roster and becomes visible/manageable to the group's assigned Event Coach(es).

**Alternate paths:** Bulk assignment of multiple Athletes to a group in one Head Coach action.

**Errors/failures:** Assigning to a group outside the Team the Athlete belongs to → invalid (cross-Team assignment is impossible by construction, since groups are Team-scoped). An Event Coach attempting to assign → rejected (not authorized in v1).

**Recovery:** Unassignment is non-destructive to the Athlete's Team membership or personal data. When scope is narrowed, downstream effects are governed by the scope-change rules in TP-07 / SE-09 / PF-01 (future not-started prescriptions outside the new scope are revoked; in-progress execution enters SE-09 reconciliation; historical athlete-authored truth is preserved).

**Offline behavior:** Administrative action; requires connectivity for authoritative persistence.

**Synchronization implications:** Assignment changes must propagate to the affected Event Coach's roster/session-planning views before they can plan/manage for that Athlete (TP-07, SE-*).

**Notifications:** Newly assigned Event Coach notified of a new athlete under their management; Athlete notified of group placement (relevant to which coach can prescribe work to them). Operational notification class (see notification-preference workflow MG-07): channel may vary but remains in-app.

**Audit requirements:** Assignment changes are authorization-sensitive (they directly define Event Coach data-access scope) and must be audited.

**Exit condition:** Athlete's group assignments accurately reflect coach management scope with no orphaned or duplicate assignment records.

**Downstream artifacts:** Feeds TP-07 (plan assignment), SE-01/SE-02 (session/attendance scoping), MG-02/MG-03 (group chat membership), the authorization boundary enforced throughout session-execution and messaging.

**Open questions:** `OQ-TA-MULTIGROUP` (stated above). Event Coach delegated assignment authority is candidate decision `CD-EC-DELEGATION` — not a v1 OPEN item.

---

## TA-05 — Assign Event Coaches

**Purpose:** Place an Event Coach member in charge of one or more Event Groups/Subgroups.

**Actors:** Head Coach / Team Creator (sole authority — an Event Coach cannot assign themselves or another coach to a group, since that would let a coach expand their own authorization scope).

**Capability / trigger:** Available to an actor holding the Head Coach / Team Creator role, acting on an existing Event Group/Subgroup and a member who holds the Event Coach role.

**Preconditions:** Target member holds the Event Coach role on the Team (TA-01). Target Event Group/Subgroup exists.

**Authorization assumptions:**
- Only Head Coach / Team Creator may assign Event Coaches — this is a hard invariant, since Event Coach management scope is exactly defined by these assignments and must not be self-expandable.
- An Event Coach may be assigned to more than one Event Group/Subgroup.
- Event Coach assignment does not, by itself, grant Team-wide administrative rights (TA-01/TA-02/TA-05/TA-06/TA-07 remain Head-Coach-exclusive).

**Owned resources:** Coach-assignment record (Event Coach ↔ Event Group/Subgroup).

**States:** `unassigned → assigned`.

**State transitions:** `unassigned → assigned` / `assigned → unassigned`, Head-Coach-driven.

**Happy path:** Head Coach selects an Event Coach → selects target group(s) → confirms → Event Coach gains management scope over Athletes assigned to that group (per TA-04) and communication reach unaffected (Event Coaches can already message any Team athlete per the governed product baseline (Workflow Architecture v2 §9.1) — this assignment governs *management*, not messaging reach).

**Alternate paths:** Reassigning an Event Coach from one group to another — prior group loses that coach's management scope immediately.

**Errors/failures:** Assigning a non-Event-Coach member (e.g., an Athlete) as a group's coach → invalid; role must be corrected via TA-01 first.

**Recovery:** Unassignment is reversible via a subsequent TA-05 action.

**Offline behavior:** Administrative, connectivity-required.

**Synchronization implications:** Must propagate before the coach's client enforces the new/removed management scope; a stale cached assignment must never grant access beyond the current authoritative scope.

**Notifications:** Affected Event Coach notified of assignment/removal.

**Audit requirements:** Authorization-sensitive; audited (this is the workflow that directly defines an Event Coach's data-access boundary).

**Exit condition:** Event Coach's set of managed Event Groups/Subgroups accurately reflects Head Coach decisions.

**Downstream artifacts:** Feeds TA-04 scope, TP-07, SE-*, all Event-Coach-authorization checks.

**Open questions:** None material; this is a stable invariant per the governed product baseline (Workflow Architecture v2 §9.1).

---

## TA-06 — Configure Team Settings

**Purpose:** Manage Team-level configuration not covered by a more specific workflow (Team name, general preferences, tier-adjacent display settings).

**Actors:** Head Coach / Team Creator.

**Capability / trigger:** Available to an actor holding the Head Coach / Team Creator role, acting on that Team's configuration.

**Preconditions:** Team exists.

**Authorization assumptions:** Team-level settings are Head-Coach-exclusive; no delegation is defined in v1.

**Owned resources:** Team settings record (excludes `personal_workouts_allowed`, which is broken out as TA-07 due to its cross-cutting authorization impact, and excludes tier/billing state, owned by billing-entitlements).

**States:** `configured(value=v1) → configured(value=v2)` per setting.

**State transitions:** Direct value updates on Head Coach confirmation.

**Happy path:** Head Coach edits a setting → confirms → change takes effect Team-wide.

**Alternate paths:** N/A — settings changes are generally independent of each other.

**Errors/failures:** Invalid values rejected at input; no partial-setting states.

**Recovery:** Settings are simply re-editable; no special recovery path beyond standard validation.

**Offline behavior:** Requires connectivity for authoritative persistence; local edit drafts acceptable.

**Synchronization implications:** Must propagate to all Team members' clients in a timely manner since some settings affect shared behavior.

**Notifications:** Team notified only for settings with material behavioral impact (case-by-case; not all settings warrant a push notification).

**Audit requirements:** Audited when a setting has authorization, privacy, or safety impact; routine cosmetic settings need not be audited.

**Exit condition:** Team settings record reflects the confirmed configuration.

**Downstream artifacts:** Consumed wherever Team-level configuration affects behavior (varies by setting).

**Open questions:** `OQ-TA-SETTINGS-CATALOGUE` (owner: Department 01; safe default: only `personal_workouts_allowed` (TA-07) and tier state (BE-*) are recognised Team settings in v1 — any further setting is a new product decision; evidence required: a proposed setting with its behavioural spec and audit classification; affected: TA-06; blocking stage: only when a new setting is proposed). This workflow is a structural placeholder, not a settings catalogue.

---

## TA-07 — Configure `personal_workouts_allowed`

**Purpose:** Head-Coach-controlled toggle determining whether Athletes on this Team may create and execute personal workouts **inside this Team context** (see personal-workouts category).

**Actors:** Head Coach / Team Creator (sole authority — approved invariant).

**Capability / trigger:** Available to an actor holding the Head Coach / Team Creator role, acting on that Team's configuration.

**Preconditions:** Team exists.

**Authorization assumptions:**
- This setting is exclusively Head-Coach-controlled; Event Coaches cannot change it.
- Enabling this setting grants Athletes personal-workout *authoring and logging* capability only — it never grants training-cycle planning authority (hard invariant; personal workouts and coach-prescribed training plans remain categorically distinct).
- **Disabling this setting (normative v1 decision):** it prevents **new** creation of personal workouts in this Team context and prevents **execution** (scheduling/starting/logging a new session) of personal workouts inside this restricted Team context. It does **not** delete existing personal-workout records, does **not** remove them from the athlete's private library, and does **not** prevent the athlete from privately correcting an already-logged personal workout or exporting their own personal-workout data (PS-08 / PF-06). Existing workouts remain visible to their owning athlete but cannot be newly scheduled or executed while the Team's setting is disabled.

**Owned resources:** `personal_workouts_allowed` boolean on the Team settings record.

**States:** `disabled → enabled` and reverse.

**State transitions:** Head Coach toggles the value; takes effect Team-wide for all current and future Athlete members.

**Happy path:** Head Coach enables the setting → all Athletes on the Team gain access to PW-01 (create personal workout) and PW-02 (execute/log) → Head Coach may later disable it.

**Alternate paths:** Disabling the setting after Athletes have already created personal workouts — existing personal-workout definitions and their logs are **retained** in each athlete's private library; PW-01 (new creation) and PW-02 (new execution) are blocked in this Team context; PW-03 private correction of an already-logged workout and export of the athlete's own personal-workout data remain available. Re-enabling restores PW-01/PW-02 access with no data loss.

**Errors/failures:** N/A beyond standard authorization checks (non-Head-Coach attempts are rejected).

**Recovery:** Fully reversible toggle; no destructive data loss occurs from toggling alone.

**Offline behavior:** Requires connectivity for authoritative persistence; the *effect* of the setting (whether PW-01 is available) must be checked against the last-synced authoritative value, not a stale offline cache, to avoid an athlete creating personal workouts after the coach has disabled the capability.

**Synchronization implications:** This is a security/authorization-relevant setting — its propagation delay directly determines a window in which an Athlete's client might incorrectly allow or disallow PW-01 offline. The workflow-architecture invariant applies: offline success is not treated as authoritative until reconciled against the current server-side value.

**Notifications:** Athletes notified when the capability is enabled or disabled, since it changes what they can do with their own data going forward.

**Audit requirements:** Authorization-sensitive; audited.

**Exit condition:** Team settings record reflects the confirmed `personal_workouts_allowed` value and all client authorization checks for PW-01/PW-02/PW-03 key off the authoritative server value.

**Downstream artifacts:** Gates PW-01 (creation) and PW-02 (new execution) in this Team context; does not gate PW-03 private correction or export.

**Open questions:** `OQ-PW-RETENTION-DURATION` (owner: Department 04 / legal; safe default: personal-workout data is retained in the athlete's private library indefinitely while the account is active and follows the account-level retention/deletion policy on IT-08/PS-08 — no Team-triggered purge; evidence required: any jurisdiction-specific minimisation obligation; affected: TA-07, PW-01/02/03, PS-05/PS-08; blocking stage: only a retention/legal implementation, not v1 behaviour). No other v1 OPEN item — the retroactive-effect question is now resolved normatively above.
