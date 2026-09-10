# StrideLab Consolidated Domain Model

**Status:** `APPROVED` — authored 2026-09-10 by Department 01 `domain-workflow-architect` (skill `domain-modeling`), with a Department 03 persistence & transaction-boundary review folded in (§10). Human approval by Diego recorded 2026-09-10 in §12. Replaces the former **stub** at this canonical path (created in the v2 correction pass, finding F-21) and is now the governed consolidated domain model. Repository publication metadata — registry status, companion pointer, and commit pin — must be written against the actual repository commit; no commit SHA is asserted from this uploaded file alone.

**Owning Department:** 01 Product & Experience (`domain-workflow-architect`). **Reviewers:** Department 03 Platform & Data Engineering (`database-engineer` / `platform-data-reviewer`) for persistence-adjacent aggregate/transaction boundaries; Department 04 for the safety/privacy invariants restated here; `architecture-reviewer` for bounded-context/contract consistency.

**Command:** `stridelab-ai/departments/01-product-experience/commands/domain/model-domain.md`. **Skill output contract:** `domain-modeling` SKILL — glossary, concept catalogue + ownership, relationship model, invariants, lifecycle + events, bounded-context map, ambiguities + decision requests.

---

## 1. What this artifact is (and is not)

This is the **consolidated semantic model** for StrideLab: one place where product, design, and every engineering, security, and operations Department can mean the same thing when they name a StrideLab object, ownership rule, invariant, lifecycle state, or transition.

- It **consolidates and restates** material that is already normative in **Workflow Architecture v2 §9.1** (G7-approved) and the **governed product baseline** (`docs/product/product-baseline.md`, APPROVED). Where wording differs, `docs/product/workflow-architecture.md` governs, then `docs/product/product-baseline.md`, then this file.
- It **does not** create, resolve, convert, or weaken any decision. Every `OQ-*` / `CD-*` item in `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §9.2 remains open under its named owner with its conservative safe default in force. §11 confirms nothing was closed.
- It is **not** a database schema, an ER diagram, an API contract, a screen inventory, or an authorization implementation. Aggregate boundaries here are **domain consistency boundaries** — the physical table/transaction mapping is Department 03 / Department 02 work at implementation-design time (§10 records the D03 review of that mapping).
- **Navigation:** none is designed or revived here (ORCHESTRATOR.md authority order; finding F-13).

### Authoritative inputs used

| Input | Status | Role here |
|---|---|---|
| `docs/product/product-baseline.md` §1–§7 | APPROVED (Diego, 2026-09-08) | product invariants, ownership rules, commercial rules |
| `docs/product/workflow-architecture.md` + `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §4, §5, §9.1, §9.2 | APPROVED (Diego, 2026-09-07) | lifecycles, the 16 cross-workflow invariants, the normative decisions, the OPEN register |
| `stridelab-ai/knowledge/workflows/*/WORKFLOWS.md` (13 category files, 86 workflows) | supporting spec | per-workflow states, transitions, owned resources, failure paths |
| `stridelab-ai/application-map/bounded-contexts.md`, `cross-context-contracts.md` | MINIMUM_POPULATED | bounded-context → `domains/*` map; the 14 public contract seams |
| `ARCHITECTURE.md` (registry id `architecture-decision`) | APPROVED | modular-monolith constraint; dependency direction; extraction-friendliness |

**Evidence discipline (per the `domain-modeling` SKILL):** every concept, ownership assignment, and invariant below traces to one of the rows above. Statements are labelled **[normative]** (traces to §9.1 / the baseline / an invariant), **[modelled]** (a domain-modelling decision within D01 ownership — consolidation, aggregate boundary, glossary term — offered for ratification in §12), or **[open]** (an existing `OQ-*`/`CD-*`, unchanged).

---

## 2. Ubiquitous-language glossary

One term, one meaning. Synonyms are collapsed to the **canonical** term; overloaded words are disambiguated.

### 2.1 Identity, team, role

| Term | Meaning | Not to be confused with |
|---|---|---|
| **Account** | A durable, authenticated StrideLab identity, independent of any Team. Baseline age **13+** asserted at creation. | A Team **Membership** — an Account has zero-or-more Memberships. |
| **Profile** | The Account owner's own descriptive data. **User-owned**; no coach/admin may edit it. | **Roster metadata** (role, group assignment) — Team-scoped, Head-Coach-managed, *not* profile data. |
| **Date of birth / age assertion** | The age evidence captured at signup. Restricted to the identity subsystem and authorized safety functions. | **`is_minor`** — the derived boolean flag, the *only* age signal any other context receives. No age band is approved (`OQ-PR-AGE-BAND`). |
| **Team** | The top of the org hierarchy: `Team → Event Group → Subgroup → Athlete`. | An **organisation** — StrideLab models the Team, not a parent org. |
| **Event Group** | A container beneath a Team (e.g. "sprints"). Contains Subgroups and/or Athletes. | A **Subgroup** (one level deeper) or a chat **Channel** (derived from it). |
| **Subgroup** | A container beneath exactly one Event Group. | An Event Group. |
| **Head Coach / Team Creator** | The single, always-present top authority on a Team. Exactly **one** per Team at all times. Canonical name — not "Team Creator" alone, not "Owner", not "Admin". | An **Event Coach**. The role is **Team-scoped**; the same Account may hold a different role on another Team. |
| **Event Coach** | A coach whose **management scope** is exactly the Athletes assigned to their Event Groups/Subgroups. May **communicate** with any Athlete on the Team. Cannot assign athletes/coaches or administer groups in v1. | The Head Coach. **Communication reach ≠ management scope** — see below. |
| **Athlete** | A Team member who consumes coach prescription, owns their performed-work truth and personal workouts, and owns their profile. | A "user" — every Athlete is an Account; not every Account is an Athlete. |
| **Membership** | The record binding one Account to one Team with one **Role** and an optional group scope. Lifecycle `invited → member_active → member_removed | member_left`. | The Account. Removal (`member_removed`) ends Team access only, never the global Account. |
| **Assignment** | A record placing an Athlete into a group, or an Event Coach in charge of a group. Determines management scope and plan/session targeting. | **Membership** — an Assignment cannot outlive its Membership. |
| **Management scope** | The set of Athletes a coach may manage, tag, give feedback to, analyse, and see identifiable performance data for. Head Coach = Team-wide; Event Coach = assigned groups (a union over the coach's Assignments). | **Communication reach**. |
| **Communication reach** | A coach's ability to start a private thread with any Athlete on the Team. **Never widens** tagging, Vault sharing, feedback, analysis, profile visibility, performance visibility, or management scope (invariant #15). | Management scope. |

### 2.2 Training, sessions, personal workouts

| Term | Meaning | Not to be confused with |
|---|---|---|
| **Macrocycle / Season** | Top-level planning container (`draft → active → completed | archived`). | A **Block**. |
| **Block / Mesocycle** | Mid-length block nested in a Macrocycle. | A **Week**. |
| **Week / Microcycle** | One week's structure nested in a Block. | A **Session**. |
| **Session / Training Day** | The concrete **prescription** unit a coach authors (TP-04) and session-execution operationalises. `draft → published → in_progress → completed | cancelled` (the last two driven by session-execution). | A **Session Execution** (the performed instance) and a **Performed-Work Log** (what the athlete did). Never collapsed. |
| **Prescription** | Coach-authored intended work (Session content + in-session modifications). | **Performed work** — what the athlete logged. Always a separate record (invariants #4, #5). |
| **Session Template** | A dateless, assignment-free reusable prescription pattern. **Author-private** (+ Head Coach) by default (`OQ-TP-TEMPLATE-SHARING`). | A Session. |
| **Plan Assignment** | The record binding a published planning artifact to Athletes/groups (TP-07). This — not Team membership — is what gives an Athlete visibility into a Session. | Authorship. Authoring ≠ assigning. |
| **Session Execution** (a.k.a. "performed instance") | The **coach-owned** root created at SE-01: start, attendance, in-session modifications, finalization. Finalization (SE-08) locks the **prescribed structure only**. | The **Performed-Work Log** (athlete-owned). |
| **Performed-Work Log** | The **athlete-owned** record of what the athlete actually did (SE-05 results, SE-06 completion status, SE-07 effort/notes) plus post-finalization **Amendments** (SE-10). A coach may read but never author or overwrite it. | The Session Execution / the prescription. |
| **Prescription version marker** | An immutable value on a Performed-Work Log recording exactly which prescription version the athlete executed against — preserved even after TP-08/SE-04 changes the prescription. | The current prescription. |
| **Finalization** | SE-08: coach closes the ordinary edit window and locks the prescribed structure. Does **not** lock athlete performed-work truth. | Deletion or archival. |
| **Reconciliation** | SE-09: the explicit workflow for divergent offline session state. Never last-write-wins; superseded values retained; a coach never overwrites an athlete's log. | A silent merge. |
| **Post-finalization correction / Amendment** | SE-10: an athlete's audited correction to their own performed-work record after finalization. Original + amended value + timestamp + actor + **mandatory reason** retained. Never rewrites finalized history. | A re-open of the session — the session stays `completed`. |
| **Personal Workout** | An **athlete-authored, athlete-owned** self-directed workout. Never coach-prescribed, never in the planning hierarchy, never a coach-visible template. Gated by the Team's `personal_workouts_allowed` for *new* creation/execution only. | A Session / a Template. |
| **`personal_workouts_allowed`** | The Head-Coach-controlled Team setting. Disabling blocks new personal-workout creation/execution in the Team context; never deletes existing workouts, never blocks private correction or export. | A tier/entitlement flag. |

### 2.3 Media, tagging, vault, analysis

| Term | Meaning | Not to be confused with |
|---|---|---|
| **Media Artifact** | A recorded or imported video/media item. Default resting state **private draft** (MD-03). Owned by the recording/importing actor. | Any of the five transitions below. |
| **Attach** | MD-04: a contextual link between a Media Artifact and a Session. **Does not change who can view the media.** | A visibility grant. |
| **Tag** | MD-05: identification of which Athlete(s) appear in a Media Artifact. **Metadata only. Never grants Vault access.** Bounded to the tagger's current scope. | A **Grant** or a **Share**. |
| **Grant (Vault access)** | VS-01: an **explicit, server-authoritative** decision by the media owner to let one tagged Athlete see **one** artifact in their Vault. Not automatic on tag. | A Tag. A grant conveys exactly one artifact. |
| **Share** | VS-02: an explicit, **item-scoped** grant of Vault-equivalent visibility to a named recipient, independent of tagging. **In-scope coaches only in v1; athlete-to-athlete sharing disabled.** | A Grant (tag-referenced) or a Publication (broad). |
| **Publish** | MD-06: the **broadest** visibility transition — media visible to a defined Team/group audience. Never implicit. **Multi-subject youth media is blocked by default** until every depicted Athlete's consent condition is met. | Tag / Grant / Share. |
| **Revoke** | VS-03: termination of a Grant or Share for a specific recipient/item pair. Reachable as a moderation action by the Platform Safety Administrator. | "Untagging" — removing a tag does not revoke an existing grant. |
| **Vault** | The **derived view** showing an Athlete exactly the artifacts they were explicitly **granted** or **shared** — never derived from membership, group assignment, tag presence, or publication (invariant #8). | A folder the Athlete owns. It is a resolution over Grant + Share records. |
| **Analysis Project** | Annotations, clips, drawings, comparisons layered on a Media Artifact. Private to the analysing actor. **Never changes the media's visibility.** | A Share. Saving ≠ sharing. |
| **Coaching Finding / Feedback** | AN-07: the deliberate act of delivering selected analysis output to an Athlete **within the coach's current management scope**. A specialised VS-02. | An analysis project (the whole project is never shared, only selected items). |

### 2.4 Communication, safety, commercial

| Term | Meaning | Not to be confused with |
|---|---|---|
| **Channel** | A Team / Event Group / Subgroup group chat. Membership is **derived** from Team/assignment state, not separately managed. | A **Private Thread**. |
| **Private Thread** | Exactly one coach + one Athlete (MG-04). | A group Channel. |
| **Block (relationship)** | MG-06: a member stops DMs / @mentions / tags / shares / proactive discovery from another. Does **not** delete evidence or alter membership. Safety/critical messages keep an honest path. | A **Report** — independent of a block. |
| **Report** | MG-06/PS-02: a flag on content/behaviour. Available to **every** member regardless of role, tier, or group. | Moderation / escalation (the response). |
| **Platform Safety Administrator** | The canonical **least-privilege** platform moderation actor, owned by Department 04, **outside** any Team hierarchy. Sole authority for under-age determinations (PS-07), illegal-content/imminent-harm handling (PS-09), Head-Coach-implicated reports, and moderation Vault revocation (VS-03). | The Head Coach. A Head-Coach-implicated report bypasses Team leadership. |
| **Preservation hold** | A legal/moderation hold that **blocks** deletion (IT-08/IT-09/MD-07/PS-08) until Department 04 releases it. **Fails safe** — if the hold state cannot be confirmed, deletion is blocked. | Ordinary retention. |
| **Restricted pending review** | PS-07: the **first** consequence of a credible under-13 signal — ordinary use and unnecessary processing stop; the account is preserved intact; no irreversible action. Not termination. | Governed closure (which only follows a confirmed determination). |
| **Governed closure** | A policy-driven account/Team teardown (IT-08/IT-09 mechanics) with retention, guardian, safety-evidence, and legal-hold handling. Reversible via an **audited restoration** path if the determination was wrong. | An immediate hard delete. |
| **DSR (Data Subject Request)** | PS-08: assisted intake for access/export/correction/deletion requests broader than the IT-08 / PF-06 self-service paths, including guardian-initiated. | IT-08 (self-service deletion) / PF-06 (self-service export). |
| **DD-DEPARTED-CONTENT** | The single normative rule for content disposition on any departure/removal/closure: athlete-owned data stays with the athlete; Team plans/records stay with the Team; membership-derived access ends immediately; no indiscriminate cascading deletion; retention durations OPEN (`OQ-DD-RETENTION`). | A cascade delete. |
| **Tier** | A Team's commercial level. The **Free / Mid / Top** three-tier skeleton (count + names) is a **working structure**, **not** ratified as a commercial invariant (`OQ-BE-TIER-STRUCTURE`, owner D06). | An authorization level. |
| **Entitlement / feature-availability flag** | The output of the single BE-05 derivation point. Gates **feature availability only** — never a role, scope, membership, profile-field, or Vault-visibility check (invariant #9; "payment ≠ authorization"). Structurally non-consumable as an authorization predicate. | Authorization. |
| **Downgrade** | A move to a lower tier (BE-04) or the effect of failed payment (BE-06). **Never** revokes data or restructures the hierarchy/authorization — constrains *future* feature use only. | Account/Team deletion. |
| **Notification class** | **Safety** (cannot be disabled or quieted), **Operational** (channel-adjustable, always lands in-app), **Social** (bundle / mute / quiet-hours allowed). Notification-preference state is **never** consulted by any authorization or entitlement check. | An entitlement. |
| **Safety-notification state** | Invariant #14 / contract 10: transactionally-created authoritative in-app state + durable retry + idempotent processing + explicit delivery/acknowledgement state + audited terminal failure + human escalation for unresolved safety-critical failure. Push/email are secondary and fallible. | A "guaranteed delivery" promise — that phrasing does not exist anywhere. |
| **Offline honesty** | Invariant #13: an offline success is never server-durable until reconciliation succeeds; unmergeable divergence goes through SE-09, never last-write-wins; offline attachment submissions and Vault grants stay **pending** until server confirmation. | Optimistic-then-authoritative local state. |

---

## 3. Entity and value-object catalogue

Grouped by bounded context (`stridelab-ai/application-map/bounded-contexts.md`). **E** = entity with identity and lifecycle; **VO** = value object (no identity, compared by value, immutable); **DS** = domain service (stateless resolution / policy, not a stored record). Cross-context references are **by identifier only** — no context reads another's internal persistence (ARCHITECTURE.md).

### 3.1 identity (`domains/identity/`) — product owner D01, policy owner D04

| Concept | Kind | Notes / authority |
|---|---|---|
| Account | E | Global identity; `AccountStatus` lifecycle; holds the credential reference and the restricted age evidence. **[normative]** age 13+ at creation (invariant #10, PS-01). |
| Credential | E (child of Account) | Reset via IT-07; never grants access from knowledge of Team membership alone. |
| Profile | E | **User-owned** (`§9.1` profile ownership). One per Account. Field catalogue beyond the IT-01 shell is **[open]** (`OQ-PR-FIELDS`). |
| ProfileField | VO | A single field value + its `VisibilityClass`. |
| DateOfBirth / AgeAssertion | VO (restricted) | Identity + authorized safety functions only (`§9.1` profile visibility). Frozen after IT-01 verification (`OQ-PR-DOB-EDIT`). |
| `is_minor` | VO (derived boolean) | The **only** age signal other contexts receive (`OQ-PR-AGE-BAND`, default: boolean only). |
| AccountStatus | VO | `unauthenticated → pending_verification → active` (`| rejected_underage | expired`); `active → deletion_pending → deleted`; recovery states (IT-07). |
| ContactIdentifier | VO | Verified channel; change triggers a security notification. |
| **ProfileVisibilityResolution** | DS | PR-03. Per (viewer, subject, field), server-side withholding. Peers → display name + role only; in-scope coaches → the catalogue's coach-visible fields; **DOB/age never emitted**. Never authoritatively cached; never derived from tier state; evaluated only in the viewer's active Team context. |

### 3.2 teams (`domains/teams/`) — product owner D01, policy owner D04

| Concept | Kind | Notes / authority |
|---|---|---|
| Team | E | Root of `Team → Event Group → Subgroup → Athlete` (invariant #1). `TeamStatus` lifecycle (IT-09). |
| EventGroup | E (child of Team) | Belongs to exactly one Team. `active → archived | deleted`. |
| Subgroup | E (child of EventGroup) | Belongs to exactly one Event Group; cannot span groups. Re-parenting disabled in v1 (`OQ-TA-REPARENT`). |
| TeamSettings | VO | `personal_workouts_allowed` (boolean) + a reference to the commercial tier state. Only these two are recognised settings in v1 (`OQ-TA-SETTINGS-CATALOGUE`). |
| Membership | E | Account ↔ Team ↔ `Role` ↔ optional scope. Lifecycle `invited → member_active → member_removed | member_left`. Distinct from personal-profile data (invariant #1). |
| Invitation | E | `issued → accepted | declined | expired | revoked`. Head-Coach-only in v1; **direct invitation only** (`OQ-IT04-JOIN-MECHANISM`). |
| AthleteGroupAssignment | E (child of Membership) | Athlete ↔ Event Group/Subgroup. Cannot outlive the Membership. Multi-group allowed at Head-Coach discretion (`OQ-TA-MULTIGROUP`). |
| EventCoachAssignment | E (child of Membership) | Event Coach ↔ Event Group/Subgroup. Head-Coach-set only; not self-expandable. |
| Role | VO | `Head Coach / Team Creator | Event Coach | Athlete`. Team-scoped; never implicitly shared across a user's other Teams (invariant #2). |
| ManagementScope | VO (derived) | Union of an Event Coach's `EventCoachAssignment` group targets (Head Coach = Team-wide). |
| CommunicationReach | VO | Team-wide for coaches. Distinct from ManagementScope (invariants #3, #15). |
| **HeadCoachTransfer** | DS | TA-01a. Atomic: new Head Coach set **and** prior Head Coach downgraded in one transition; the Team never has zero or two. Departed authorship re-owned per DD-DEPARTED-CONTENT. |

### 3.3 training (`domains/training/`) — product owner D01

| Concept | Kind | Notes / authority |
|---|---|---|
| Macrocycle / Block / Week | E (each) | Container hierarchy; child date range must fall within the parent's. `draft → active → completed | archived`. Overlaps in the same scope allowed; coach owns coherence (`OQ-TP-OVERLAP`). |
| Session (prescription) | E | TP-04. `draft → published → in_progress → completed | cancelled` (`in_progress`/`completed` driven by session-execution). Holds `PrescribedWorkItem`s and a `TargetScope`. |
| PrescribedWorkItem | VO | Sets/reps/paces/distances/notes. |
| SessionTemplate | E | TP-05. Dateless, assignment-free. Author-private (+ Head Coach) default (`OQ-TP-TEMPLATE-SHARING`). `active → archived`. |
| PlanAssignment | E | TP-07. Planning artifact ↔ Athlete/Subgroup/Event Group targets. `unassigned → assigned`. Carries the normative **scope-narrowing effect** (future not-started prescriptions withdrawn; in-progress → SE-09; historical truth preserved). |
| PlanModification | E (child of the planning artifact) | TP-08. Attributed, timestamped, audited content mutation; prior versions recoverable; never silently overwrites an athlete's in-progress logged data. |
| TargetScope | VO | `Team | Event Group | Subgroup | individual athletes`. A duplicate never inherits a scope broader than the duplicator holds (TP-06, finding F-15). |

### 3.4 sessions (`domains/sessions/`) — product owner D01

| Concept | Kind | Notes / authority |
|---|---|---|
| SessionExecution ("performed instance") | E | **Coach-owned** root (SE-01). `published → in_progress → completed`. Owns start, attendance, in-session modifications, finalization. Finalization (SE-08) locks the **prescribed structure only**. |
| Attendance | E (child of SessionExecution) | Per Athlete per instance. `unrecorded → present | absent | late | excused`. Coach-authored; the Athlete's *own* entry carries an SE-10 amendment path. |
| InSessionModification | E (child of SessionExecution) | SE-04. Stacked chronologically over the original prescription; never replaces it. |
| PrescriptionVersionMarker | VO | Immutable; binds a Performed-Work Log to the exact prescription version executed. |
| PerformedWorkLog | E | **Athlete-owned** (SE-05/06/07). One per (Athlete, SessionExecution). **Append-only**: log entries + `AmendmentRecord` layers; the "current" value is a projection over the chain. A coach may read but never author or overwrite it (invariants #4, #5). |
| AmendmentRecord | VO | SE-10. `{ target record, original value, amended value, timestamp, actor, reason }`. Reason **mandatory**. |
| CompletionStatus | VO | `pending → completed | partial | skipped` (per prescribed item). Athlete self-classification is authoritative (`OQ-SE-COACH-OVERRIDE`: no silent coach override). |
| EffortReport (RPE / RIR / notes) | VO | Athlete-authored subjective data; coach read-only. No automatic coach-facing RPE flag in v1 (`OQ-SE-RPE-FLAG`). |
| ReconciliationRecord | E | SE-09. Layered over SessionExecution + PerformedWorkLog without destroying pre-reconciliation values. `no_conflict | conflict_detected → in_reconciliation → reconciled` (re-entrant). Reconciliation UX is **[open]** (`OQ-SE-RECONCILE-UX`); offline P2P propagation is **[open]** (`OQ-SE-OFFLINE-P2P`, D03). |

### 3.5 workouts (`domains/workouts/`) — product owner D01

| Concept | Kind | Notes / authority |
|---|---|---|
| PersonalWorkout | E | Athlete-owned definition + execution logs + edits. `nonexistent → draft → saved`; execution `not_started → in_progress → completed`; `saved → edited`, `any → deleted`. Structurally isolated from the planning hierarchy (invariant #6). |
| — creation / new-execution gate | rule | `personal_workouts_allowed` = enabled, checked against the current authoritative value (TA-07). Correction (PW-03) and export are **not** gated. |
| — coach visibility | **[open]** | `OQ-PW-COACH-VISIBILITY`, default: **not visible to any coach**. |

### 3.6 media (`domains/media/` + `services/media-worker`) — product owner D01, policy owner D04

| Concept | Kind | Notes / authority |
|---|---|---|
| MediaArtifact | E | Raw media. Owner = recorder/importer. Storage lifecycle: `nonexistent → recording/importing → draft → deleted | archived` (archive only if a legal hold requires it — `OQ-MD07-ARCHIVE-STATE`). Attachment, tagging, and publication are independently represented associated records; they are not states or fields on the artifact. |
| Tag | E (child of MediaArtifact) | MD-05. `untagged → tagged`. Identification only; bounded to the tagger's current scope. **Never** a Vault-access grant. |
| SessionAttachment | E (child of MediaArtifact) | MD-04. Contextual link to a Session. **Not** a visibility grant; a client must never treat it as one. |
| Publication | E (child of MediaArtifact) | MD-06. `draft | tagged → published`, plus a reversible `published → unpublished` (`OQ-MD06-UNPUBLISH`). Carries an `AudienceScope` and a per-tagged-minor `ConsentCondition`. |
| MediaState | VO | The five distinct transitions (tag / grant / share / publish / revoke) are **independently representable** — no single boolean or combined field may conflate them (VS-04). |
| AudienceScope | VO | `Team | Event Group | Subgroup`. |
| ConsentCondition | VO | Per depicted/tagged minor. Multi-subject youth media: onward re-share and publication **blocked** until satisfied (`OQ-VS02-MULTISUBJECT`, `OQ-MD06-AUTHORITY`). Known limitation: enforcement keys on the tag; an untagged-but-depicted minor is not system-detectable. |

### 3.7 analysis (`domains/analysis/`) — product owner D01

| Concept | Kind | Notes / authority |
|---|---|---|
| AnalysisProject | E | AN-01..06. `nonexistent → open → saved` (re-openable). References source media by id; **inherits, never widens, the source's visibility**. |
| Annotation / Clip / ComparisonLayout | E (children) | AN-03/04/05. Private to the project by default; creating one is not sharing. |
| CoachingFeedback | E | AN-07. `private_analysis → shared_feedback`. Specialised VS-02: target Athlete must be **within the coach's current management scope**; obeys VS-02 / VS-03. |

### 3.8 vault (`domains/vault/`) — product owner D01, policy owner D04

| Concept | Kind | Notes / authority |
|---|---|---|
| VaultGrant | E | VS-01. Grantor ↔ recipient Athlete ↔ **one** MediaArtifact. `no_access → grant_pending → vault_access_granted → revoked` (`→ no_access` on MD-07 deletion). Offline: `grant_pending` is not effective. |
| Share | E | VS-02. Sharer (in-scope coach) ↔ recipient ↔ specific item/derived item. `not_shared → shared → revoked`. Athlete-to-athlete disabled in v1. View-only in v1 (`OQ-VS02-RIGHTS`). |
| Revocation | E (transition record) | VS-03. By the original grantor, or by the Platform Safety Administrator on a moderation basis. No ordinary Head-Coach revoke of another member's grant (`OQ-VS03-HC-REVOKE`). Ordinary revocation is silent; moderation revocation follows PS-03 notice (`OQ-VS03-NOTICE`). |
| **VaultVisibilityResolution** | DS | Invariant #8 / VS-04. The Vault view is resolved over `VaultGrant` + `Share` **only** — never membership, group assignment, tag presence, or publication. Favours online-validated access over long-lived local cache; hard local-cache removal is **[open]** (`OQ-MEDIA-CACHE-INVALIDATION`, D03). |

### 3.9 messaging (`domains/messaging/`) — product owner D01, policy owner D04

| Concept | Kind | Notes / authority |
|---|---|---|
| Channel (Team / Event Group / Subgroup) | E | Membership **derived** from Team / TA-04 / TA-05 assignment state; an assignment change immediately changes access. Standing Head-Coach read access **not** granted (`OQ-MG-HC-CHANNEL`). |
| PrivateThread | E | MG-04. Exactly one coach + one Athlete. `nonexistent → active`; read-only if a block is in place or a party's membership ends. No standing third-party oversight in v1 (`OQ-MG-OVERSIGHT`). |
| Message | E (child of a Channel/Thread) | Composed offline → queued → delivered; no silent loss. Retention **[open]** (`OQ-MG-RETENTION`). |
| MessageAttachment | E (child of a Message) | MG-05. If it broadens media visibility it routes through the **stricter** of VS-02 (private thread) or MD-06 (group/Team channel) and creates that formal record; pending until server-confirmed. |
| BlockRelationship | E | MG-06. Blocker ↔ blocked. `not_blocked ↔ blocked`. Effects normative (§9.1 blocking): stops DMs/mentions/tags/shares/discovery; preserves evidence; does not alter membership; safety/critical messages keep an honest path; a minor blocking a coach is offered a private report path; restricted safety telemetry to the Platform Safety Administrator with no automatic punishment and no disclosure to Team leadership. |
| ReportCase | E | MG-06 / PS-02. `none → reported → under_review → resolved | dismissed`. Available to every member regardless of role/tier/group. |
| NotificationPreference | E | MG-07. Per-member, **self-owned only**. `default → customised`. Safety class not member-configurable; the store **refuses to persist** "safety = off". **Not consulted by any authorization or entitlement check** (invariants #9, #15). |
| NotificationClass | VO | `Safety | Operational | Social` (see §2.4). |

### 3.10 performance (`domains/performance/`) & reporting (`domains/reporting/`) — product owner D01 (reporting policy owner D04)

| Concept | Kind | Notes / authority |
|---|---|---|
| WorkoutHistoryView / TrainingHistoryView / PerformanceMetricsView | DS (derived read models) | PF-01/02/03. Own no primary data. Coach visibility is bounded to **current** management scope (finding F-15); an Athlete always sees their own full history. Aggregates never reveal an out-of-scope Athlete's individual data; aggregation method is **[open]** (`OQ-PF-AGG-METHOD`, D03). Personal workouts appear only in the owning Athlete's own views (default). |
| PBRecord | E | PF-04. Athlete ↔ event/metric ↔ best value ↔ date. `no_pb → pb_set → pb_broken`; prior bests retained. |
| Report | E | PF-05. `requested → generating → ready | failed`. Scope-bounded; rejected before generation if scope is exceeded. Offline generation **[open]** (`OQ-PF-REPORT-OFFLINE`, D03). |
| ExportEvent | E (immutable audit record) | PF-06. The point in-app visibility becomes data outside the system's controls. Never expands scope; always audited. Coach external export of a minor's identifiable data is **[open]** (`OQ-PF-MINOR-EXPORT`, D04/legal). |

### 3.11 billing (`domains/billing/`) — product owner **D06**, policy owner D04

| Concept | Kind | Notes / authority |
|---|---|---|
| TeamSubscription | E | BE-01..04, BE-06. `TierState` + subscription state (`none → trial_active → subscription_active | trial_expired`; `subscription_active → cancelled | payment_failed → grace_period → resolved | downgraded_to_free`). Head Coach is the sole billing owner + tier-change authority by default (`OQ-BE-BILLING-OWNER`). `cancelled` also reached from IT-09 teardown. |
| TierState | VO | `Free | Mid | Top` — **working skeleton, not ratified** (`OQ-BE-TIER-STRUCTURE`, owner D06). |
| EntitlementSet | DS (derived) | BE-05. The **single** entitlement-derivation point. Emits `EntitlementFlag`s. Recompute fails toward the more restrictive state; a stale cache never grants paid-tier access indefinitely. |
| EntitlementFlag | VO | Feature-availability only. **Structurally non-consumable as an authorization predicate** — typed/namespaced separately from role/scope checks (contract 6, C-5). Feature→tier mapping is **[open]** (`OQ-BE-TIER-MAP`); provider/prices/taxes/refunds/IAP/limits/trial/grace are **[open]** D06 content; **no paid billing ships in v1**. |

### 3.12 governance (`domains/governance/`) — product owner **D04**

| Concept | Kind | Notes / authority |
|---|---|---|
| EscalationCase | E | PS-03. `under_review(team) → escalated(platform) → resolved` (or `→ resolved` without escalation). Head-Coach-implicated and illegal/imminent-harm reports **structurally bypass** Team review. |
| UnderageCase | E | PS-07. `signal_raised → restricted_pending_review → confirmed_ineligible | not_substantiated`; `confirmed_ineligible → governed_closure → restored`; `not_substantiated → active`. Only the Platform Safety Administrator determines. |
| DSRCase | E | PS-08. `received → identity_pending → in_fulfillment → fulfilled | partially_fulfilled | refused`. Fan-out to every context holding the subject's data; held/dependency-critical data → `partially_fulfilled` with a recorded reason, never a silent skip. |
| IllegalContentCase | E | PS-09. `classified → preserved → platform_review → resolved`, with a parallel `hold_active ↔ hold_released` on the content. Not resolvable at Team level; external handoff only under legal counsel. |
| PreservationHold | E | Contract 11. Scoped to specific artifacts / account / thread. `hold_active ↔ hold_released`. **Fails safe** — an unconfirmed hold blocks deletion/closure. Placed/released only by the Platform Safety Administrator. |
| Platform Safety Administrator | actor / role (not an aggregate) | Least-privilege; outside every Team hierarchy; owned by D04. |

### 3.13 platform capabilities

| Concept | Kind | Home | Notes / authority |
|---|---|---|---|
| SafetyNotification | E | `platform/notifications/` | Contract 10 / invariant #14. Transactionally-created authoritative in-app state + durable retry + idempotent processing (`(workflow, event, recipient)`) + explicit delivery/ack state + audited terminal failure + human escalation. Only the enumerated safety-emitting workflows (MG-06, PS-03, PS-07, PS-09, MD-05, VS-01, MD-06) may create safety-class state. |
| OperationalNotification / SocialNotification | E | `platform/notifications/` | Operational: channel-adjustable, always in-app. Social: bundle / mute / quiet-hours. |
| AuditRecord | E (append-only) | `platform/observability/` | Every destructive/consequential transition and every authorization-sensitive event (invariant #12). |
| EntitlementCache | VO | `platform/entitlements/` | Per-connect / periodic revalidation; never trusted indefinitely. |

---

## 4. Aggregate boundaries and ownership

An **aggregate** here is a **domain consistency boundary**: the set of entities that must be transactionally consistent and are mutated through a single root. Cross-aggregate references are **by id**; cross-aggregate consistency is either a **single-transaction cross-aggregate invariant** (explicitly flagged for Department 03 in §10) or **eventual, with the consumer re-validating against current authoritative state** (never trusting a stale cache — contracts 7, 8).

| # | Aggregate root | Bounded context | Owns (entities) | Owning actor of the data | Key rationale **[modelled]** |
|---|---|---|---|---|---|
| A1 | Account | identity | Credential, AccountStatus | the account owner | Global identity lifecycle; the age gate lives here. |
| A2 | Profile | identity | ProfileField values | the account owner | Separate from A1 so the **coach-edit boundary** (invariant #4) and PR-03 resolution attach to one clean root; roster metadata is deliberately elsewhere (A4). |
| A3 | Team | teams | EventGroup, Subgroup, TeamSettings | Head Coach / Team Creator | The hierarchy (invariant #1) is one consistency boundary; re-parenting disabled in v1 keeps it simple. |
| A4 | Membership | teams | AthleteGroupAssignment, EventCoachAssignment, Invitation(accepted) | Head Coach (role/scope); the member (join/leave) | Assignments **cannot outlive the membership** (IT-06 terminates them in the same transition) → they belong inside this boundary. References A1 + A3 by id. |
| A5 | Macrocycle / A6 Block / A7 Week | training | their own metadata + child-of-parent link | the authoring coach | Per-level roots (not one Season tree) keep transactions bounded and the context extraction-friendly; the "child within parent bounds" rule is validated at authoring time. |
| A8 | Session (prescription) | training | PrescribedWorkItem, PlanModification, TargetScope | the authoring coach (Head Coach may override, attributed) | The prescription is one boundary; **never** merged with execution or performed work. |
| A9 | SessionTemplate | training | its structure | the author (+ Head Coach) | Dateless, assignment-free; author-private default. |
| A10 | PlanAssignment | training | assignment targets | the assigning coach | Gates athlete visibility; carries scope-narrowing effects. Separate root because its lifecycle is independent of the prescription's. |
| A11 | SessionExecution | sessions | Attendance, InSessionModification, PrescriptionVersionMarker | the coach running the session | **Coach-owned** performed instance. Finalization locks the prescribed structure **only**. |
| A12 | PerformedWorkLog | sessions | log entries, EffortReport, AmendmentRecord (SE-10) | **the Athlete** | **Separate from A11.** This is the structural enforcement of invariants #4/#5 and the SKILL anti-pattern "Session, plan, and performed workout collapsed together": a coach-owned aggregate must not contain athlete-owned, athlete-writable records. **Append-only.** |
| A13 | ReconciliationRecord | sessions | detected conflicts ↔ attributed resolutions | the coach (session/attendance conflicts) + each Athlete (their own log conflicts) | Layers over A11 + A12 without destroying values; re-entrant. |
| A14 | PersonalWorkout | workouts | definition + execution logs | the Athlete | Structurally isolated (invariant #6). No coach or Team artifact depends on its existence. |
| A15 | MediaArtifact | media | Tag, SessionAttachment, Publication | the recording/importing actor | The five media transitions are **independently representable** here — Tag/Attachment/Publication are children, but **Grant and Share are not** (A16/A17). |
| A16 | VaultGrant | vault | grant record | the media owner (grantor) | Independent lifecycle, independent revocation, independent audit; per invariant #7 / VS-04 a grant must be its own representable, auditable thing — not a flag on A15. |
| A17 | Share | vault | share record | the sharing coach | Same rationale as A16; second, independent path to Vault-equivalent visibility. |
| A18 | AnalysisProject | analysis | Annotation, Clip, ComparisonLayout | the analysing actor | Never mutates A15's visibility. |
| A19 | CoachingFeedback | analysis | the delivered selection + commentary | the coach | Specialised VS-02; obeys A17's rules. |
| A20 | Channel | messaging | Message | derived (Team/assignment) — no owner writes the membership | Membership is a **projection** of A3/A4 state, never a stored parallel list. |
| A21 | PrivateThread | messaging | Message, MessageAttachment | the two participants | Exactly one coach + one Athlete. |
| A22 | BlockRelationship | messaging | block record + restricted safety telemetry | the blocker (telemetry: Platform Safety Administrator only) | Independent of A23. |
| A23 | ReportCase | messaging / governance boundary | report record | the reporter (then moderation authority) | Feeds A29 and, for illegal/imminent-harm classification, A32. |
| A24 | NotificationPreference | messaging | per-class settings | **the member only** | Store refuses "safety = off"; never read by authz/entitlement. |
| A25 | PBRecord | performance | best-value history | the Athlete | The one stateful performance entity; all other performance/reporting views are **derived, non-authoritative projections** (no aggregate). |
| A26 | Report | reporting | generated report artifact | the requesting actor | Scope-bounded at request time. |
| A27 | ExportEvent | reporting | the immutable export audit record | — (append-only) | The data-leaving-the-system fact. |
| A28 | TeamSubscription | billing | tier + subscription + grace state | Head Coach (billing owner, default) | Commercial state only. `EntitlementSet` is a **derived projection** off this (BE-05) — not a stored aggregate; consumers read `EntitlementFlag`s, never A28's raw fields. |
| A29 | EscalationCase | governance | escalation record | Platform Safety Administrator / Head Coach (team-level) | — |
| A30 | UnderageCase | governance | signal ↔ restriction ↔ determination ↔ restoration | Platform Safety Administrator | Its own state machine. |
| A31 | DSRCase | governance | request ↔ verification ↔ per-context fulfilment | D04 (owner) + D06 support-ops (intake) | Fan-out orchestration (contract 12). |
| A32 | IllegalContentCase | governance | classified report ↔ hold ↔ platform actions ↔ handoff | Platform Safety Administrator | Not resolvable at Team level. |
| A33 | PreservationHold | governance | the hold, scoped to specific targets | Platform Safety Administrator | **Fails safe**; blocks A1/A3/A15 deletion transitions. |
| A34 | SafetyNotification | platform (`platform/notifications/`) | in-app authoritative state + delivery/ack + terminal-failure record | the notification capability | Created **in the same transaction** as its triggering safety event (§10 F-D03-07). |
| A35 | AuditRecord | platform (`platform/observability/`) | append-only events | — | Cross-cutting. |

### 4.1 Cross-aggregate invariants and consistency rules — Department 03 scope

| Invariant | Aggregates spanned | Consistency requirement **[modelled]** |
|---|---|---|
| Exactly one Head Coach per Team at all times (invariant #2) | A3 + N×A4 | **Single transaction** for TA-01a transfer (new HC + old HC downgrade together) **plus** a persistence-level uniqueness guard on "Head Coach for team T". Eventual consistency is not acceptable. |
| Assignments cannot outlive their Membership (IT-06) | A4 (internal) + downstream A10/A20/performance | Cascade termination of assignments is **transactional inside the teams context**; downstream contexts react to a published `membership_ended` event and **re-validate** — a stale cache must never keep granting access (contract 7). |
| Departed-member content disposition (DD-DEPARTED-CONTENT, invariant #16) | A2/A12/A14 (stay with athlete) vs A8/A11/A26 (stay with Team) | No cascading delete. Authorship re-ownership (A8 → new Head Coach) is part of the same transaction as the departure; athlete-owned aggregates are untouched. |
| Offline honesty (invariant #13) | A16 (`grant_pending`), A21 attachment, A12 SE-10 draft, A14 offline draft | Each carries an explicit **pending vs server-durable** state; the pending state is never rendered as effective; a collision with an interim revoke/hold resolves in favour of the revoke/hold. |
| `personal_workouts_allowed` create/execute gate (TA-07) | A3 (TeamSettings) → A14 | The gate is evaluated **server-side against the current authoritative value** on the create/execute transition; an offline draft made against a stale "enabled" is flagged, not silently persisted as authorized. |
| Payment ≠ authorization (invariant #9 / baseline §6A) | A28 → every feature-gated context | No authorization path in identity/teams/vault/profile may take an `EntitlementFlag` input. Enforced by typing/namespacing flags separately and a documented, testable "no authz path consumes a BE-05 flag" rule (contract 6). |
| Preservation hold fails safe (contract 11) | A33 → A1/A3/A15/A31 deletion transitions | A deletion transition takes "no active hold" as a **precondition inside the deletion transaction**; if the hold state cannot be confirmed, the deletion is blocked, not allowed. |
| Safety-notification state is transactional (invariant #14) | A34 ⟷ triggering event in A15/A16/A22/A23/A29/A30/A32 | The `SafetyNotification` in-app authoritative state is written **in the same transaction (outbox pattern)** as the triggering safety event — never best-effort afterward. |
| Prescribed-vs-performed honesty (invariants #4, #5) | A8/A11 (prescription mutable) vs A12 (`PrescriptionVersionMarker` immutable) | A later A8/A11 mutation must not alter historical A12 records; the marker is captured at delivery/execution time and frozen. |

---

## 5. Relationship model

Explicit relationship semantics (the `domain-modeling` SKILL requires identity, ownership, membership, containment, assignment, sharing, and tagging to be distinguished):

- **Identity:** `Account` is the sole global identity. Everything else is scoped to a Team via a `Membership`. `Team` context is never a union across Teams (IT-05).
- **Ownership (data authorship + edit authority):**
  - `Account` owns its `Profile` and (as an Athlete) its `PerformedWorkLog`s, `PersonalWorkout`s, `EffortReport`s, `AmendmentRecord`s, and its `PBRecord`s. No coach/admin path may edit these.
  - A coach owns the `Session` prescriptions and `SessionExecution` instances they author/run, `AnalysisProject`s they open, and `CoachingFeedback` they deliver. A Head Coach may override an Event Coach's planning artifact, **attributed and audited** (`OQ-TP-HC-OVERRIDE`).
  - The `Team` owns its hierarchy, roster/administrative records, and `Publication` records for Team/group audiences; the underlying `MediaArtifact` remains owned by its recorder/importer. The Head Coach is the acting Team authority.
  - The **platform** (D04) owns `PreservationHold`, `UnderageCase`, `IllegalContentCase`, and the Platform Safety Administrator role.
- **Membership:** `Account —(Membership: Role, scope)→ Team`. One Role per Membership; multi-Team ⇒ independent Memberships; multi-role within one Team is not supported.
- **Containment (part-of, cannot exist independently):** `Team ▷ Event Group ▷ Subgroup`; `Macrocycle ▷ Block ▷ Week ▷ Session`; `SessionExecution ▷ Attendance, InSessionModification`; `MediaArtifact ▷ Tag, SessionAttachment, Publication`; `AnalysisProject ▷ Annotation, Clip, ComparisonLayout`; `Channel/Thread ▷ Message ▷ MessageAttachment`.
- **Assignment (scoping decisions, Head-Coach-set in v1):** `Athlete —(AthleteGroupAssignment)→ Event Group/Subgroup`; `Event Coach —(EventCoachAssignment)→ Event Group/Subgroup`; `PlanningArtifact —(PlanAssignment)→ Athletes/groups`. Assignment determines **management scope** and **visibility**, never planning authority for the assignee.
- **Tagging (identification):** `MediaArtifact —(Tag)→ Athlete`. Conveys **no** access.
- **Sharing / granting (visibility):** `MediaArtifact —(VaultGrant)→ tagged Athlete` (one artifact); `item/derived-item —(Share)→ recipient` (in-scope coach → managed Athlete or authorized coach); `MediaArtifact —(Publication: AudienceScope, ConsentCondition)→ Team/group audience`. Each is explicit, independently revocable, independently audited.
- **Derivation (read-only projections, never a source of truth):** `Vault` ← VaultGrant + Share; `ProfileVisibilityResolution` ← Profile + viewer relationship; `ManagementScope` ← EventCoachAssignments; `Channel membership` ← Team/assignment state; performance/training/metrics views ← SE-08 + PW-02 + TP-* records; `EntitlementSet` ← TeamSubscription.
- **Escalation:** `ReportCase → EscalationCase → (Platform Safety Administrator | Head Coach)`; Head-Coach-implicated or illegal/imminent-harm ⇒ structural bypass to `IllegalContentCase` / the Platform Safety Administrator.

---

## 6. Invariant-to-aggregate mapping

The 16 cross-workflow invariants (`WORKFLOW-ARCHITECTURE-v2.md` §5) plus the two hard commercial invariants (baseline §6A). "Consistency" = where the invariant must hold atomically.

| # | Invariant (abridged) | Enforcing aggregate(s) / domain service | Consistency |
|---|---|---|---|
| 1 | Team → Event Group → Subgroup → Athlete; membership/assignment metadata ≠ profile data | A3 (containment), A4 (assignments), A2 kept separate | within A3 / A4; A2 isolation is structural |
| 2 | Exactly one Head Coach per Team; role is Team-scoped | A4.Role + `HeadCoachTransfer` DS | **single-transaction cross-aggregate** (A3 + A4) + uniqueness guard — §4.1 |
| 3 | Event Coach management scope (narrow) ≠ communication reach (Team-wide) | A4.ManagementScope vs A4.CommunicationReach; A20/A21 use reach, A8/A10/A15.Tag/A17/A19/performance use scope | per-check evaluation against current A4 state |
| 4 | Coaches cannot edit athlete-owned profile/performed-work; SE-08 locks prescribed structure only; SE-09 never lets a coach overwrite an athlete log | A2 (edit-authority), A11 vs A12 (**separate aggregates**), A13 | structural (separate roots) + append-only A12 |
| 5 | Coach-authored Session ≠ athlete performed-work log | A8 vs A12; `PrescriptionVersionMarker` | structural |
| 6 | `personal_workouts_allowed` grants authoring/logging only; disabling never deletes or blocks correction/export | A14 + A3.TeamSettings gate | server-side gate on create/execute transition |
| 7 | tag ≠ grant ≠ share ≠ publish — independently representable, independently auditable | A15.Tag / A16 / A17 / A15.Publication / A16-A17 Revocation; VS-04 checkpoint | structural — no conflated field |
| 8 | Vault shows exactly what was granted or shared — never derived from membership/group/tag | `VaultVisibilityResolution` DS over A16 + A17 | query-time resolution; no denormalised "visible" flag |
| 9 | Payment ≠ authorization; downgrade/failed payment never revokes data or restructures hierarchy | A28 → `EntitlementSet` (flags only); no authz path consumes a flag | **cross-cutting rule** — §4.1; contract 6 C-5 |
| 10 | Age 13+ at creation; discovered under-age → PS-07 restricted-first | A1 age gate; A30 `UnderageCase` | A1 at creation; A30 state machine |
| 11 | No revoked navigation as requirement; no navigation designed here | n/a (modelling constraint) | — |
| 12 | Every destructive/consequential transition names authority, confirmation, reversibility, downstream effects, exit state | every aggregate's lifecycle (§7) + A35 AuditRecord | per-transition |
| 13 | Offline honesty — never server-durable until reconciled; unmergeable divergence → SE-09 | A16 `grant_pending`, A21 attachment pending, A12 SE-10 draft, A14 draft, A13 | **pending vs durable state** on each — §4.1 |
| 14 | Safety-critical notification state model; safety class cannot be disabled | A34 `SafetyNotification` + A24 refusing "safety = off" | **transactional with the triggering event** — §4.1 |
| 15 | Communication reach never widens tagging/sharing/feedback/analysis/profile/performance/management scope | A20/A21 (reach) strictly separated from the scope-gated aggregates; A24 not an authz input | per-check |
| 16 | Departed-member content disposition (DD-DEPARTED-CONTENT); no cascading deletion | A2/A12/A14 vs A8/A11/A26; departure transaction re-owns A8 authorship | **cross-aggregate, transactional at the departure** — §4.1 |
| §6A-a | Tier/entitlement state may gate feature availability only — never any authorization path | A28 / `EntitlementSet`; contract 6 | cross-cutting rule |
| §6A-b | Downgrade / failed payment never revokes data or restructures hierarchy/authorization | A28 lifecycle (BE-04/BE-06) leaves A3/A4/A15 untouched | structural — commercial state is a separate boundary |

---

## 7. Lifecycles and transitions

Consolidated from `WORKFLOW-ARCHITECTURE-v2.md` §4 and the 13 category files. Every destructive/consequential transition (bold) satisfies invariant #12 (authority · confirmation · reversibility · downstream effects · exit state) and writes an `AuditRecord`.

### 7.1 Account (A1)
`unauthenticated → pending_verification → active` · `pending_verification → rejected_underage | expired` · `active → deletion_pending → deleted` · **`deletion_pending → active`** (cancel within the grace window — `OQ-IT08-GRACE`, default 30 days) · recovery: `active(locked-out) → recovery_pending → active` (IT-07).
Sole-Head-Coach deletion must resolve Team continuity (successor or IT-09) **before** `deleted`.

### 7.2 Profile (A2)
`shell → partially_populated → populated`; fields re-editable via PR-02 (self only). DOB/age frozen after verification. PR-03 resolution is stateless with a `stale ↔ current` freshness marker.

### 7.3 Team (A3) — IT-09 closure
`active → closure_pending → archived → deletion_eligible → deleted_or_anonymized`, with **`closure_pending → active`** and **`archived → active`** recovery. Membership-derived access ends **immediately** at `closure_pending`. Archive-first; recoverable until `deletion_eligible`. Held content stays under hold past `deletion_eligible`. Event Group / Subgroup: `active → archived | deleted` (archive preferred where history matters; delete blocked while children/assignments/plan references exist).

### 7.4 Membership (A4)
`invited → member_active → member_removed | member_left`. **`member_active → member_removed`** (Head-Coach-only; terminates all group assignments in the same transition; queued offline writes racing removal resolve in favour of removal). Role: `Athlete ↔ Event Coach ↔ Head Coach` via TA-01; a `→ Head Coach` transition co-transitions the prior Head Coach away atomically.

### 7.5 Planning artifacts (A5–A10)
Macrocycle / Block / Week / Session: `draft → active/published → completed | archived/cancelled`. Session specifically: `draft → published → in_progress → completed | cancelled` (`in_progress`/`completed` driven by SE-01/SE-08). **PlanAssignment scope-narrowing:** removing an assignment (or narrowing scope) withdraws **future not-started** prescriptions outside the new scope; an **in-progress** execution enters SE-09; **historical athlete-authored truth is preserved**; the Athlete always retains their own historical data. **TP-08 modification** of a `published`/`in_progress` artifact: attributed, timestamped, propagated as connectivity allows, never silently overwriting in-progress logged data; prior versions recoverable.

### 7.6 SessionExecution (A11) & PerformedWorkLog (A12)
A11: `published → in_progress → completed`. Attendance: `unrecorded → present | absent | late | excused`. **SE-08 finalization** locks the prescribed structure; ordinary edit window closes.
A12 (append-only): `not_logged → logging_in_progress → logged`; after finalization, `finalized_record → amendment_requested → amendment_applied` (SE-10) — original retained, amendments stack chronologically, **reason mandatory**, session stays `completed`. Offline SE-10 draft applied only on server-confirmed reconnect; a collision enters SE-09.

### 7.7 ReconciliationRecord (A13)
`no_conflict | conflict_detected → in_reconciliation → reconciled`; `reconciled → conflict_detected` again if a further stale device appears. Coach resolves session/attendance/prescription conflicts; each Athlete resolves only their own log conflicts. Superseded values retained. A conflict that cannot be shown to its owning actor (e.g. that Athlete left the Team) is **held and flagged unresolved to the coach**, never auto-resolved.

### 7.8 PersonalWorkout (A14)
Definition `nonexistent → draft → saved`; `saved → edited`; **`any → deleted`**. Execution `not_started → in_progress → completed`. Create/new-execute gated by `personal_workouts_allowed`; **edit/delete/correction/export never gated**. A post-hoc definition edit preserves the version each log was performed against.

### 7.9 MediaArtifact (A15) & derived visibility (A16/A17)
A15 storage lifecycle: `nonexistent → recording/importing → draft → deleted | archived`. `draft` is a valid permanent local-only state. Attachment, Tag, and Publication have independent record lifecycles and may coexist; they never replace the artifact's storage state. **MD-06 publish** (destructive-broadening): `Publication` records `not_published → published → unpublished` with a defined `AudienceScope`; publication is **blocked** for multi-subject youth media without every depicted minor's consent. Unpublish removes the artifact from the authoritative audience view + best-effort cache invalidation. **MD-07 delete** (destructive): blocked under a `PreservationHold`; must resolve dependent Tag/Grant/Share/Publication records rather than orphan them.
A16 VaultGrant: `no_access → grant_pending → vault_access_granted → revoked` (`→ no_access` on A15 deletion). A17 Share: `not_shared → shared → revoked`. **VS-03 revoke** (destructive): by the grantor or, on a moderation basis, the Platform Safety Administrator. Revocation propagation + local-cache handling is the most safety-critical sync property (`OQ-MEDIA-CACHE-INVALIDATION`, D03).

### 7.10 AnalysisProject (A18) & CoachingFeedback (A19)
A18: `nonexistent → open → saved` (re-openable; `discarded` leaves no artifact). A19: `private_analysis → shared_feedback`; **revocable** via VS-03 semantics; target must be within the coach's **current** management scope.

### 7.11 Messaging (A20–A24)
Channel: access follows Team/assignment state directly (no independent join/leave). PrivateThread: `nonexistent → active`; `active → read_only` on block or membership end. BlockRelationship: `not_blocked ↔ blocked` (blocker-set, reversible). ReportCase: `none → reported → under_review → resolved | dismissed`. NotificationPreference: `default ↔ customised`; safety class immutable-off.

### 7.12 Performance / reporting (A25–A27)
PBRecord: `no_pb → pb_set → pb_broken` (prior bests retained; recompute on an SE-05 correction or SE-10 amendment). Report: `requested → generating → ready | failed`. **ExportEvent** (destructive-adjacent — data leaves the system): `not_exported → exporting → exported | failed`; no "unexport"; always audited; never expands scope.

### 7.13 Commercial (A28) & entitlement
TeamSubscription: `no_tier (default Free) → tier_selected(Free|Mid|Top)`; subscription `none → trial_active → subscription_active | trial_expired`; `subscription_active → cancelled | payment_failed → grace_period → resolved | downgraded_to_free`. **BE-04 downgrade** (destructive-adjacent for feature access; data/structure preserved): over-limit content → soft-lock default (`OQ-BE-OVERLIMIT`). `cancelled` also entered from IT-09 teardown. `EntitlementSet` recomputes on every A28 transition, failing toward the more restrictive state.

### 7.14 Governance (A29–A33)
EscalationCase: `under_review(team) → escalated(platform) → resolved` (or resolve without escalation). **UnderageCase** (PS-07): `signal_raised → restricted_pending_review → confirmed_ineligible | not_substantiated`; **`confirmed_ineligible → governed_closure`**; `not_substantiated → active`; **`governed_closure → restored`** (audited reversal of a wrong determination). DSRCase: `received → identity_pending → in_fulfillment → fulfilled | partially_fulfilled | refused`. IllegalContentCase: `classified → preserved → platform_review → resolved`, parallel `hold_active ↔ hold_released`. **PreservationHold**: `hold_active ↔ hold_released` — placed/released by the Platform Safety Administrator only; **unconfirmed ⇒ deletion blocked**.

### 7.15 SafetyNotification (A34)
Created transactionally with its triggering safety event → durable retry → idempotent processing → `delivered` + `acknowledged` state → on exhaustion, `terminal_failure` (audited) → `human_escalation`. Never disabled; push/email are a fallible secondary; the in-app state is authoritative.

---

## 8. Bounded-context map and translation points

Contexts map 1:1 to `stridelab-ai/application-map/bounded-contexts.md`. Translation happens **only** at the 14 published seams in `stridelab-ai/application-map/cross-context-contracts.md` — this model adds no new seam.

| Domain concept | Home context | Consumed elsewhere as | Seam |
|---|---|---|---|
| `Role`, `ManagementScope`, active-Team-context, `Membership` state, closure state | identity / teams | read-only authorization inputs (never a per-context copy; re-validated against current state) | contract 7 |
| `is_minor`, per-field profile visibility | identity (profile) | `is_minor` flag + withheld fields; **DOB/age never crosses** | contract 8 |
| `MediaArtifact` + `Tag` | media | analysis source, messaging attachment, Vault-grant subject | contracts 1, 4 |
| `VaultGrant` / `Share` / `Revocation` | vault | the recipient Athlete's Vault view; analysis/messaging read paths | contracts 1, 2, 3 |
| `PrescribedWorkItem` + `PrescriptionVersionMarker` | training | sessions (offline execution); performance (prescribed-vs-actual) | contract 14 |
| `PerformedWorkLog`, `ReconciliationRecord`, `AmendmentRecord` | sessions | performance/reporting read models; governance (SE-10 fulfils a PS-08 correction) | contracts 5, 9 |
| performance/training/metrics visibility set | each source context | the source supplies the viewer's per-athlete visible set; the consumer must not aggregate beyond it or re-derive scope | contract 5 |
| `EntitlementFlag` | billing | feature-availability flags only; **no authz path may take one** | contract 6 |
| `SafetyNotification` state | platform notifications | the enumerated safety-emitting workflows only | contract 10 |
| `PreservationHold`, moderation revocation, account restriction | governance | media/vault/messaging/sessions/identity/billing deletion + access paths; **fails safe** | contract 11 |
| DSR fan-out / erasure orchestration | governance | every context holding the subject's data | contract 12 |
| report → external export egress | reporting | external recipients; governance (audit) | contract 13 |

**Dependency direction (ARCHITECTURE.md):** domain modules depend only on published contracts of other domains, never on an application shell or another domain's internal persistence. Every aggregate above is designed so its context stays **extraction-friendly** without premature service split; only `services/media-worker` is independently deployable today.

---

## 9. Scenario tests

The `domain-modeling` SKILL requires the model to survive coach, athlete, multi-Team, offline, media-sharing, and personal-workout narration without semantic contradiction.

1. **Coach prescribes, athlete performs, coach reviews.** Coach authors `Session` (A8) → `PlanAssignment` (A10) to a Subgroup → SE-01 opens a `SessionExecution` (A11) → each Athlete's `PerformedWorkLog` (A12) records results against a frozen `PrescriptionVersionMarker` → SE-08 finalizes A11 (prescribed structure locked) → A12 stays athlete-amendable via SE-10 → performance views (derived) recompute. **No aggregate is co-owned; the coach never writes A12.** ✔ invariants #4, #5.
2. **Offline practice, late modification.** Coach issues a TP-08 modification while Athletes execute offline → on reconnect the divergence is detected → `ReconciliationRecord` (A13) surfaces it → the Athlete's log is kept "as executed" with a "prescribed version changed after execution" marker; **last-write-wins never occurs**. ✔ invariants #13, #4.
3. **Multi-Team user.** An Account holds `Membership` A (Head Coach, Team X) and `Membership` B (Athlete, Team Y). `IT-05` switches the active Team context; authorization is evaluated against the active `Membership` only, never a union; local drafts stay bound to their originating Team. ✔ invariant #2, IT-05.
4. **Tag vs Vault access.** Coach records a clip (A15, draft) → tags Athlete (A15.Tag — identification only) → the Athlete sees **nothing** in their Vault → coach makes an explicit `VaultGrant` (A16) → server confirms → `VaultVisibilityResolution` now returns exactly that one artifact. Untagging later does **not** revoke the grant (needs VS-03). ✔ invariants #7, #8.
5. **Multi-subject youth media.** A relay clip tags three Athletes → publication (A15.Publication) and onward VS-02 re-share are **blocked** until each `ConsentCondition` is met (default). ✔ `OQ-VS02-MULTISUBJECT`, `OQ-MD06-AUTHORITY`.
6. **Personal workout under a setting flip.** Athlete creates `PersonalWorkout` (A14) while `personal_workouts_allowed` = enabled → Head Coach disables it → new PW-01/PW-02 blocked (server-authoritative check) → existing A14 records **retained**, still privately correctable (PW-03) and exportable → re-enable restores full access, no data loss. ✔ invariant #6.
7. **Communication reach vs scope.** An Event Coach DMs an Athlete outside their groups (allowed — `CommunicationReach`) but cannot tag, share with, give structured feedback to, analyse, see the profile detail of, or see identifiable performance data for that Athlete (all gated by `ManagementScope`). ✔ invariants #3, #15.
8. **Under-13 discovered.** A report raises a credible signal → `UnderageCase` (A30) → `restricted_pending_review` (use stops, **account preserved**) → Platform Safety Administrator determines → `confirmed_ineligible → governed_closure`, or `not_substantiated → active`; a wrong determination → `restored`. ✔ invariant #10.
9. **Deletion under a hold.** An Athlete requests account deletion (A1) while a `PreservationHold` (A33) covers some of their messages → the deletion transitions honour the hold; the DSR fan-out (A31) returns `partially_fulfilled` **with a recorded reason** for the held data. ✔ contracts 11, 12.

No scenario produces a contradiction; every important workflow narrates cleanly with the §2 glossary.

---

## 10. Department 03 review — persistence and transaction boundaries

**Reviewer lens:** Department 03 Platform & Data Engineering (`database-engineer`, skill `database-engineering`; `platform-data-reviewer`). **Scope (per the task):** the aggregate boundaries in §4 and the cross-aggregate invariants in §4.1, assessed against PostgreSQL persistence and transaction-boundary feasibility. D03 **does not** own the product-domain rules — it reviews whether the model's consistency claims are implementable without weakening them.

**Method:** each aggregate in §4 and each cross-aggregate invariant in §4.1 was walked for (a) transaction scope, (b) referential integrity across context boundaries, (c) append-only / non-loss requirements, (d) offline/eventual-consistency handling, (e) fail-safe ordering.

### Findings and remediation

| ID | Severity | Finding | Remediation (applied in this artifact) |
|---|---|---|---|
| F-D03-01 | MAJOR | The one-Head-Coach-per-Team invariant (#2) spans A3 + N×A4. Stated only as "atomic transition" it is ambiguous about eventual vs strong consistency, and a concurrent TA-01 + TA-01a could momentarily produce two Head Coaches. | §4.1 now requires **both** a single DB transaction for the TA-01a co-transition **and** a persistence-level uniqueness guard ("one Head Coach per team"), e.g. a partial unique index. Eventual consistency is explicitly disallowed here. |
| F-D03-02 | MINOR | "Assignments cannot outlive their Membership" is transactional inside `teams`, but §4 did not say how downstream contexts (channels, performance, plan assignment) learn of a removal without a shared transaction. | §4.1 + §8 now state: cascade is transactional **inside `teams`**; downstream contexts consume a published `membership_ended` event and **re-validate against current authoritative state** (contract 7) — a stale cache must never keep granting access. No distributed transaction is required. |
| F-D03-03 | MAJOR | `PerformedWorkLog` (A12) was described as append-only but §4 did not forbid a destructive `UPDATE` of a logged value, which SE-09/SE-10 non-loss depends on. | §3.4 / §4 / §7.6 now state A12 is **append-only**: log entries and `AmendmentRecord` layers are inserted, never updated in place; the "current" value is a projection over the chain. This is a hard schema constraint (no in-place mutation of a committed logged value), not a convention. |
| F-D03-04 | MINOR | The SE-10 amendment is a 3-part write (retain original + new layer + audit). A partial commit would corrupt the audit trail. | §7.6 + §4.1 now mark a single amendment application as **one atomic transaction**; a partial application is not a valid state. |
| F-D03-05 | MAJOR | `VaultVisibilityResolution` (§3.8 / VS-04) risks an implementer denormalising a `visible` boolean onto `MediaArtifact` for query performance, which VS-04 forbids and which would make revocation lag a privacy failure. | §3.8 / §4 / §7.9 now state resolution is **query-time over `VaultGrant` + `Share` only**, with **no denormalised visibility flag** on `MediaArtifact`. Any read-model projection must be invalidated on VS-03; the hard local-cache-removal guarantee remains D03-owned and **[open]** (`OQ-MEDIA-CACHE-INVALIDATION`) — unchanged, not resolved here. |
| F-D03-06 | MINOR | Offline-created records (`VaultGrant` grant_pending, `MessageAttachment`, SE-10 draft, `PersonalWorkout` draft) need a first-class "not yet server-durable" state or invariant #13 cannot be enforced at the data layer. | §3 / §4.1 / §7 now give each an explicit **pending vs server-durable** state; the pending state is never rendered effective; a collision with an interim revoke/hold resolves in favour of the revoke/hold. |
| F-D03-07 | MAJOR | "Transactionally-created authoritative in-app state" (invariant #14) was not tied to a mechanism; a best-effort post-event notification write would violate it under failure. | §3.13 / §4.1 / §7.15 now require the `SafetyNotification` in-app authoritative state to be written **in the same transaction as its triggering safety event (transactional outbox)** — never a separate best-effort call. |
| F-D03-08 | MAJOR | `PreservationHold` (A33) fail-safe was stated as a property but not as an ordering rule; a deletion racing a hold-placement could win. | §4.1 / §7.9 / §7.14 now state a deletion transition takes **"no active hold" as a precondition evaluated inside the deletion transaction**; if the hold state cannot be confirmed, the deletion is **blocked**, not allowed. |
| F-D03-09 | MINOR | `PrescriptionVersionMarker` immutability (invariants #4/#5) needed an explicit "frozen at capture" statement so a later `Session` (A8) mutation cannot retro-alter history. | §3.4 / §4.1 / §6 now state the marker is a value captured at delivery/execution time and **frozen**; A8 mutation never touches historical A12 records. |
| F-D03-10 | MINOR | Multi-group athlete assignment (`OQ-TA-MULTIGROUP`, default allowed) means an Athlete can have several `AthleteGroupAssignment` rows; performance aggregation (contract 5) must not double-count and `ManagementScope` must be a set-union. | §3.2 / §3.10 / §5 now state `ManagementScope` is a **union over the coach's assignments** and derived performance views aggregate over the **distinct** set of individually-visible Athletes. Aggregation method stays **[open]** (`OQ-PF-AGG-METHOD`, D03) — unchanged. |
| F-D03-11 | INFO | Per-level planning roots (A5–A8) vs one Season-tree aggregate: D03 confirms per-level roots keep transactions bounded and are the better fit for offline caching of a single assigned `Session`; the "child within parent date bounds" check is an authoring-time validation, not a DB constraint spanning aggregates. | Recorded as a ratified modelling choice (§4, §12 DR-2). |
| F-D03-12 | INFO | `EntitlementSet` as a derived projection (not a stored aggregate) with consumers reading only `EntitlementFlag`s is consistent with contract 6 and keeps payment-≠-authorization structurally enforceable (flags typed separately from authz predicates). | Endorsed; no change. Feature→tier mapping and the separate D06 entitlement artifact remain **[open]** preconditions — unchanged. |

### D03 disposition

**PASS WITH CONDITIONS.** The aggregate and transaction-boundary model in §4 is implementable in PostgreSQL without weakening any product invariant, **provided** the F-D03-01/03/05/07/08 remediations (now folded in) are honoured at schema-design time. Residual conditions are the **already-open** D03 items, none created or resolved here: `OQ-MEDIA-CACHE-INVALIDATION`, `OQ-PF-AGG-METHOD`, `OQ-SE-OFFLINE-P2P`, `OQ-SE-RECONCILE-UX` (UX portion), `OQ-PF-REPORT-OFFLINE`. Concrete table shapes, indexes, and migration/rollback plans are Department 03 / Department 02 work at G4 implementation-design time for each bounded context — this review does not pre-empt them.

---

## 11. Ambiguities and decision requests

**No `OQ-*` or `CD-*` item is resolved, converted to a decision, or newly created by this artifact.** The complete OPEN register is `WORKFLOW-ARCHITECTURE-v2.md` §9.2 (ID · owner · evidence required · safe default · affected · blocking stage); every item's conservative safe default remains in force. The items this model **leans on** (and leaves open):

- **D01-owned:** `OQ-PR-FIELDS`, `OQ-PR-AGE-BAND` (default: boolean `is_minor` only), `OQ-IT04-JOIN-MECHANISM`, `OQ-PW-COACH-VISIBILITY`, `OQ-TA-MULTIGROUP`, `OQ-SE-RECONCILE-UX`, `OQ-TP-TEMPLATE-SHARING`, `OQ-TP-HC-OVERRIDE`, `CD-EC-DELEGATION`, `CD-PLAN-COAUTHOR`, `OQ-IT08-GRACE`.
- **D03-owned:** `OQ-MEDIA-CACHE-INVALIDATION`, `OQ-PF-AGG-METHOD`, `OQ-SE-OFFLINE-P2P`, `OQ-PF-REPORT-OFFLINE`.
- **D04 / legal-owned:** `OQ-VS02-MULTISUBJECT` / `OQ-MD06-AUTHORITY` (default: blocked), `OQ-MG-OVERSIGHT` (default: no standing visibility), `OQ-DD-RETENTION` and all retention-duration items, `OQ-PF-MINOR-EXPORT`, the PS-07/PS-08/PS-09 jurisdiction items, `OQ-PS-MOD-STAFFING`.
- **D06-owned:** `OQ-BE-TIER-STRUCTURE` (Free/Mid/Top not ratified), `OQ-BE-TIER-MAP`, `OQ-BE-BILLING-OWNER`, `OQ-BE-PROVIDER/PRICING/TAX/IAP/TRIAL/GRACE/OVERLIMIT`, plus a separate approved D06 entitlement artifact as a hard precondition to any BE-05 implementation. **No paid billing ships in v1.**

---

## 12. Human approval record

Explicit human approval was provided by Diego on 2026-09-10. This section is the content-level G7 approval record for the consolidated domain model. Its repository commit pin must be added when this approved artifact and its companion metadata are committed together.

| ID | Approved decision | Disposition | Governed effect |
|---|---|---|---|
| **DR-1** | Adopt this artifact as the **governed consolidated domain model** for StrideLab. | **APPROVED** — consolidation only; the D03 review is folded in and no accepted invariant is weakened. | `domain-model.status` becomes `APPROVED`; this is the G7 content approval record. Repository publication must refresh the `docs/product/workflow-architecture.md` pointer from "stub" to "companion" and pin this record to the resulting commit. |
| **DR-2** | Ratify the **aggregate-ownership decisions** in §4: (a) `SessionExecution`, `PerformedWorkLog`, and `ReconciliationRecord` are three separate aggregates; (b) `Tag`, `VaultGrant`, `Share`, and `Publication` are independently represented records, not fields on `MediaArtifact`; (c) `Membership` is distinct from `Team`, with `Assignment`s inside the Membership boundary; (d) planning uses per-level roots; (e) `EntitlementSet` is a derived projection. | **APPROVED AS-IS** — each boundary traces to a §5 invariant or §10 D03 finding. | These are the ratified consistency boundaries against which D02/D03 must design schema and API contracts at G4 for each bounded context. |
| **DR-3** | The consolidated domain model must exist before **G4 (Implementation Integrity) sign-off for each bounded context** — before that context's schema, API-contract shape, or client-feature design is approved. It blocks neither Workflow Architecture v2 G7 nor the 14 G2 seam identifications. | **CONFIRMED**. | The registry `blocking_stage` is ratified as `before_G4_per_bounded_context`. |

**Approval boundary:** no `OQ-*` or `CD-*` item was resolved by these approvals. The D03-owned persistence items in §11 remain open under their existing IDs and owners.

---

## 13. Verification, provenance, downstream consumers

### 13.1 Production assessment (`domain-modeling` SKILL)

**PASS WITH CONDITIONS.**

- **PASS basis:** the six required deliverables (glossary §2; concept catalogue + ownership §3; relationship model §5; invariants §6; lifecycle + events §7; bounded-context map §8) are complete and internally consistent; all nine scenarios (§9) narrate without contradiction; every conclusion traces to an approved input and is labelled [normative] / [modelled] / [open]; the D03 review (§10) returned PASS WITH CONDITIONS with its MAJOR findings folded in.
- **Conditions (named external/environmental limits, effect explicit):** (1) the §11 open register — each item carries a conservative safe default, so v1 modelling can proceed, but a schema/API/UI approval for a bounded context must resolve the §9.2 items that gate it first, as confirmed by DR-3; (2) the D03-owned persistence items in §10's disposition; (3) repository publication must update the registry, workflow-architecture companion pointer, and G7 commit pin against the actual commit containing this approved artifact.
- **Not FAIL:** no critical invariant, evidence requirement, or safety boundary is unmet or weakened; the highest-risk invariants (#4/#5 coach-edit boundary, #7/#8 media visibility, #9 payment≠authorization, #10 age gate, #13 offline honesty, #14 safety notifications) are each mapped to a structural enforcement point and exercised by a denied/offline/empty-path scenario.

### 13.2 Gate posture

| Gate / lens | Disposition | Basis |
|---|---|---|
| G1 — Product / workflow (D01, owner) | recommend-approve | consolidates §9.1 + the 16 invariants + all 86 workflow state machines with no semantic drift; no navigation; prescription / execution / performed-work / personal-workout kept structurally distinct |
| G2 — Architecture / contracts | PASS WITH CONDITIONS | no bounded-context boundary changed; no new deployable service; cross-aggregate refs by id; dependency direction preserved; consistent with the 14 seams and ARCHITECTURE.md; conditions = table shapes at G4 |
| G3 — Security / privacy / youth safeguarding (D04) | PASS WITH CONDITIONS | DOB/age restricted to `is_minor`; tag ≠ grant ≠ share ≠ publish structural; Vault visibility never derived; payment ≠ authorization structural; blocking / Platform Safety Administrator / preservation-hold fail-safe / multi-subject-blocked all restated intact; conditions = the D04-owned §9.2 legal items, each with its safe default, none resolved here |
| **Department 03 — persistence & transaction boundaries** | **PASS WITH CONDITIONS** (§10) | aggregate/transaction model implementable without weakening any invariant, given the F-D03-01/03/05/07/08 remediations (folded in); residual = already-open D03 items |
| G7 — Human Approval | **APPROVED** | Diego, 2026-09-10; DR-1 and DR-2 approved, DR-3 confirmed in §12 |

### 13.3 Provenance

- **Canonical path:** `docs/product/domain-model.md` (this file). **Registry:** `stridelab-ai/registry/artifacts.yaml` → `domain-model`. **Lifecycle record:** `stridelab-ai/project-memory/current-state/domain-model.md`. **Human approval:** Diego, 2026-09-10 (§12). **Commit pin:** to be recorded from the repository commit containing this approved artifact; unavailable in the supplied file-only workspace.
- **Upstream (approved):** `docs/product/product-baseline.md`, `docs/product/workflow-architecture.md` (+ `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md`), `ARCHITECTURE.md`. **Application map:** `stridelab-ai/application-map/`.
- **No application code, schema, API, UI component, or navigation was created or modified.** Development-time infrastructure under `stridelab-ai/` is not production runtime.

### 13.4 Downstream consumers

- **Department 02 (Client & Feature Engineering)** — feature/interaction design must honour the aggregate ownership + lifecycle states here; consumes the glossary.
- **Department 03 (Platform & Data Engineering)** — schema, constraints, indexes, migrations, sync/reconciliation, and notification-state implementation build on §4 / §4.1 / §10; the flagged cross-aggregate invariants are hard schema-design inputs.
- **Department 04 (Security, Identity & Compliance)** — reviews every future change to the media/vault/messaging/governance concepts against §6; owns the §11 legal open items.
- **Department 06 (Business Operations & Governance)** — owns `TierState` ratification and the entitlement model; consumes the payment-≠-authorization mapping.
- **Department 01** — maintains this artifact as the canonical semantic reference; any future workflow change updates the glossary and the affected aggregate/lifecycle here.
