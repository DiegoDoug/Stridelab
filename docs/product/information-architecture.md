# StrideLab Information Architecture

**Status:** `AWAITING_HUMAN_APPROVAL` — Department 01 Step 3. Authored 2026-09-11 by Department 01 Product & Experience (`ux-architect`, skills `workflow-architecture` + `information-architecture` + `interaction-design`), orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md` and executed per `stridelab-ai/departments/01-product-experience/commands/ux/design-information-architecture.md`.
**Owning Department:** 01 Product & Experience. **Primary specialist:** `ux-architect`. **Department lead:** `product-experience-lead`.
**Companion artifact (Step 4):** `docs/product/navigation-specification.md` (consumes this artifact as a required, version-pinned input).

This artifact is a **proposal**, not an approved decision. It derives the StrideLab content hierarchy, destination map, discovery model, and search model from the **approved** MVP release scope, feature prioritization, and consolidated domain model. It does not resolve, convert, or create any `OQ-*` / `CD-*` item (`stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §9.2 remains the complete OPEN register with every safe default in force), does not change any product invariant, and does not weaken any authorization or privacy boundary. It designs no visual UI, no interaction microstates, and no production code.

**Notation.** A bare `F-NN` / `S-NN` is a feature/supporting capability from `feature-prioritization.md`. `J-NN` is a release journey from `mvp-release-scope.md` §7. `A-NN` is a domain-model aggregate. This artifact introduces its own namespace for destinations (`D-NN`) and objects (`O-NN`), chosen to avoid collision with every existing ID space.

---

## 1. Scope and traceability

### 1.1 Provenance

| Attribute | Value |
|---|---|
| Registry id | `information-architecture` (`stridelab-ai/registry/artifacts.yaml`) |
| Canonical path | `docs/product/information-architecture.md` (this file — one canonical location) |
| Lifecycle record | `stridelab-ai/project-memory/current-state/information-architecture.md` |
| Upstream (approved) | `feature-prioritization` + `mvp-release-scope` (both APPROVED, Diego 2026-09-10 — same joint Step-2 G7, `stridelab-ai/orchestration/approvals/G7-mvp-feature-prioritization-release-scope.md`; **approved version pinned to commit `9893c1d4dd0166fd0c55f1950e601e5f8737946c`**; merged to `main` via PR #9 as commit `39f42d5`, whose only delta from the pinned version is the lifecycle/status metadata the G7 record itself anticipates — no product scope differs), `domain-model` (APPROVED, Diego 2026-09-10, published on `main` at `5db47f1`, unchanged by PR #9), `product-baseline` (APPROVED, Diego 2026-09-08), `workflow-architecture` v2 (APPROVED, Diego 2026-09-07), `architecture-decision` (`ARCHITECTURE.md`, APPROVED) |
| Application map consumed | `stridelab-ai/application-map/bounded-contexts.md`, `cross-context-contracts.md` |
| Downstream consumers | `navigation-specification` (Step 4, this same work package); Departments 02, 03, 04, 05; `architecture-reviewer`; every future interaction-design / visual-UI / implementation work package |
| Owns | content/object inventory, hierarchy model, destination map, role-based discoverability, cross-linking/return rules, the information-level search model, platform-continuity rules |
| Does not own | navigation shell/chrome mechanics (Step 4), visual design, gesture/control microstates, backend ranking implementation, database schema, authorization policy |

### 1.2 Authoritative inputs inspected

`AGENTS.md`, `CLAUDE.md` (root + project); `stridelab-ai/orchestration/ORCHESTRATOR.md`; all records under `stridelab-ai/project-memory/current-state/`; `stridelab-ai/registry/artifacts.yaml`; `stridelab-ai/application-map/` (`bounded-contexts.md`, `cross-context-contracts.md`); `docs/product/product-baseline.md`; `docs/product/workflow-architecture.md` + `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` (§5 the 16 invariants, §9.1, §9.2 OPEN register); `docs/product/domain-model.md` (§2 glossary, §3 catalogue, §4/§4.1 aggregates, §5 relationships, §6 invariant map, §7 lifecycles); `docs/product/feature-prioritization.md` (full — inventory, classification, per-feature records); `docs/product/mvp-release-scope.md` (full — roles §3, journeys §7, contracts §8.3, cross-cutting §9, increments §10, gates §11); `stridelab-ai/orchestration/approvals/G7-mvp-feature-prioritization-release-scope.md`; Department 01 core skills `workflow-architecture`, `information-architecture`, `interaction-design`; current Apple Human Interface Guidelines (Navigation and search, Tab bars, Split views — §8.1 records exact URLs and access date).

### 1.3 Approved MVP capabilities covered

Every **MVP-required** capability from `mvp-release-scope.md` §5 (35 user-facing + 11 supporting = 46) and every **MVP-conditional** capability from §6.1 (9: F-10, F-19, F-22, F-33, F-34-cond, F-40, F-42, S-09, S-10) is addressed below — required capabilities get a live destination/object entry; conditional capabilities get a destination/object entry that is present but inert until its named activation condition is met (§4, §5). The full traceability table is §1.5.

### 1.4 Deferred and excluded capabilities

Post-MVP (F-41, F-P-1…F-P-16) and Excluded (F-EX-1…F-EX-10) capabilities from `feature-prioritization.md` §4 are **not designed here**. Where an excluded capability could tempt a "more complete-looking" destination (e.g., a shared template library, athlete-to-athlete sharing, an open join link, a second role per Team), this artifact explicitly does **not** add it — per the task instruction, deferred/excluded functionality must not be pulled in merely to make navigation feel more comprehensive. Each such point is called out inline in §2/§4 as **[excluded — not modelled]** or **[post-MVP — not modelled]**.

### 1.5 Assumptions and safe defaults

- **[modelled]** Destinations are grouped around **objects and roles**, never around Department or engineering boundaries (`ORCHESTRATOR.md` primary-owner rule is an internal routing concept, not a UI concept — SKILL anti-pattern "department structure mirrored into navigation").
- **[modelled]** The Platform Safety Administrator (D04 platform actor, not an end-user role — `mvp-release-scope.md` §3) gets an entirely separate navigation root (§4, D-17) because it is structurally **outside every Team hierarchy** (domain-model §2.4). It is not a "mode" of the Team-scoped app.
- **[modelled]** Guardian / legal-representative and org/billing-administrator are **not modelled as navigable roles** — `mvp-release-scope.md` §3 confirms both are out of the v1 self-service surface (F-P-11; `OQ-BE-BILLING-OWNER` default: Head Coach is sole billing/tier authority). A guardian request is handled entirely outside product navigation (assisted intake, §6.2/§8 D-20).
- **[assumption]** iPad is the primary target (baseline §1: "iOS-first, iPad-oriented"); iPhone is a supported, not secondary-tier, target with equivalent domain meaning at greater navigation depth. No web/internal-admin surface exists in v1 (F-P-14) — the `domains/*/web/` scaffolds are not a v1 surface.
- **[modelled]** Every destination/object entry in §2/§4 is expressed as **object + task**, never as a bare verb. "Record," "plan," "execute," "analyze" are actions performed *on* an object *from* a destination — never destinations themselves (task instruction; SKILL anti-pattern).
- **[open, unchanged]** `OQ-PR-FIELDS`, `OQ-TA-SETTINGS-CATALOGUE`, `OQ-BE-TIER-STRUCTURE`, `OQ-BE-TIER-MAP`, `OQ-MEDIA-CACHE-INVALIDATION`, `OQ-SE-RECONCILE-UX` (presentation), `OQ-MG07-DEFAULTS`, `OQ-MG-BLOCK-SAFE-COLLAPSE`, `OQ-PF-AGG-METHOD`, `OQ-VS02-MULTISUBJECT` / `OQ-MD06-AUTHORITY`, `OQ-PS08-STANDING` and every other item in `WORKFLOW-ARCHITECTURE-v2.md` §9.2 remain open under their existing owner. Where one of these gates a destination's content, §4/§5 say so explicitly and apply the named safe default — this artifact resolves none of them.

### 1.6 Open decisions and owning Departments

| ID | Decision | Owner | Safe default applied here |
|---|---|---|---|
| IA-OQ-1 | Exact minimum OS version (constrains sidebar/split-view API availability — `NavigationSplitView` three-column behavior) | D02 (already named in `mvp-release-scope.md` D02-N2) | Design assumes the current `NavigationSplitView` three-column pattern is available; D02 confirms at G4 |
| IA-OQ-2 | Whether Search is a persistent top-level destination or a discoverable-but-not-tabbed capability on iPhone (tab-budget tension, §8.2) | `ux-architect` + D02, ratified at Step 4 G4 | Modelled here as a **secondary** destination reachable from every primary surface's toolbar, not a consumed tab slot (§4, §7) |
| IA-OQ-3 | Exact wording/iconography for Vault-visibility-reason labels (§2, O-14) | `user-research-usability` follow-up (already named `OQ-MG07-DEFAULTS`-adjacent) | Every Vault item shows one of three fixed reason tokens: "Because you own it," "Shared with you by `<name>`," "Tagged and granted by `<name>`" — wording is a later polish decision, the three-reason requirement is not |
| IA-OQ-4 | Whether self-service export/deletion (D-19) remains reachable for an account in `restricted_pending_review` (PS-07) — the domain model does not resolve this | D04 (new item raised by the `domain-workflow-architect` Step 3 review, ratified by D04) | D-19 is suspended for the duration of the restriction (§2.1 O-01) — the more conservative reading, consistent with contract 11's preservation-hold precedent |

### 1.7 Downstream consumers

`navigation-specification.md` (Step 4, direct); Department 02 (client implementation of every destination/object); Department 03 (search-index and read-model shape informed by §7); Department 04 (verifies §5/§6/§7 do not leak scope); Department 05 (verifies §9 findability scenarios are testable); `architecture-reviewer` (confirms no bounded-context boundary is implied by the destination grouping).

### 1.8 Traceability matrix — destinations/objects to MVP feature IDs, workflows, aggregates, roles, bounded contexts

| Feature/Capability | Class | Destination(s) | Object(s) | Workflows | Aggregate(s) | Primary role(s) | Bounded context |
|---|---|---|---|---|---|---|---|
| F-01 | required | D-00, D-14, D-19 | O-01 Account | IT-01, IT-07, IT-08 | A1 | all | identity |
| F-02 | required | D-00, D-02, D-15 | O-02 Team | IT-02, TA-02, TA-03 | A3 | Head Coach | identity, teams |
| F-03 | required | D-15 | O-03 Membership | IT-03, IT-04, IT-06, TA-01 | A4 | Head Coach | teams |
| F-04 | required | D-18 | O-01 Account, O-02 Team | IT-05 | A1, A4 | multi-Team user | identity, teams |
| F-05 | required | D-15 | O-04 Assignment | TA-04, TA-05 | A4 | Head Coach | teams |
| F-06 | required | D-15 | O-02 Team (TeamSettings) | TA-06, TA-07 | A3 | Head Coach | teams |
| F-07 | required | D-15 | O-02 Team | IT-09 | A3, A33 | Head Coach | identity, teams, governance |
| F-08 | required | D-14, D-23 | O-05 Profile | PR-01, PR-02, PR-03 | A2 | all | profile |
| F-09 | required | D-03 | O-06 Planned Session (+ Season/Block/Week) | TP-01…TP-04 | A5–A8 | Coach | training |
| F-10 | conditional | D-03 | O-06a Session Template | TP-05 | A9 | Coach | training |
| F-11 | required | D-03 | O-06 Planned Session | TP-06 | A5–A9 | Coach | training |
| F-12 | required | D-03, D-22 | O-06 Planned Session, O-04 Assignment | TP-07 | A10 | Coach | training |
| F-13 | required | D-03, D-22 | O-06 Planned Session | TP-08 | A8, A10 | Coach | training |
| F-14 | required | D-04, D-22 | O-07 Session Execution | SE-01…SE-04 | A11 | Coach + Athlete | sessions |
| F-15 | required | D-04, D-22 | O-08 Performed Work Log | SE-05…SE-07 | A12 | Athlete | sessions |
| F-16 | required | D-04 | O-07 Session Execution | SE-08 | A11, A12 | Coach | sessions |
| F-17 | required | D-28 | O-09 Reconciliation Record | SE-09 | A13 | Coach + Athlete | sessions |
| F-18 | required | D-22 | O-08 Performed Work Log | SE-10 | A12 | Athlete | sessions |
| F-19 | conditional | D-05 | O-10 Personal Workout | PW-01…PW-03 | A14 | Athlete | workouts |
| F-20 | required | D-06, D-24 | O-11 Media Artifact | MD-01…MD-04, MD-07 | A15 | Coach + Athlete | media |
| F-21 | required | D-06, D-24 | O-12 Tag | MD-05 | A15 | Coach + Athlete | media |
| F-22 | conditional | D-24 | O-13 Publication | MD-06 | A15 | Head Coach | media, governance |
| F-23 | required | D-06, D-07, D-24 | O-14 Vault Grant, O-15 Share | VS-01…VS-04 | A16, A17 | Media owner / coach / Athlete | vault |
| F-24 | required | D-08, D-26 | O-16 Analysis Project | AN-01…AN-06 | A18 | Coach + Athlete | analysis |
| F-25 | required | D-26, D-21 | O-17 Finding / Coaching Feedback | AN-07 | A19 | Coach | analysis, vault |
| F-26 | required | D-09 | O-18 Channel | MG-01…MG-03 | A20 | all | messaging |
| F-27 | required | D-09 | O-19 Private Thread | MG-04 | A21 | Coach + Athlete | messaging |
| F-28 | required | D-25 | O-20 Message Attachment | MG-05 | A21, A15/A16/A17 | poster | messaging, media, vault |
| F-29 | required | D-16 | O-21 Report Case | MG-06, PS-02 | A22, A23, A29 | any member | messaging, governance |
| F-30 | required | D-14 | O-22 Notification Preference | MG-07 | A24 | account owner | messaging |
| F-31 | required | D-10 | O-23 Metric (PB, history) | PF-01…PF-04 | A25 + derived | Athlete + coach | performance |
| F-32 | required | D-11 | O-24 Report | PF-05 | A26 | Athlete + coach | reporting |
| F-33 | conditional | D-11, D-27 | O-24 Report | PF-05 | A26 | coach | reporting |
| F-34 | required | D-19 | O-25 Export Event | PF-06 | A27 | Athlete (self) | reporting |
| F-34-cond | conditional | D-11 | O-25 Export Event | PF-06 | A27 | coach | reporting |
| F-35 | required | D-00 | O-01 Account | PS-01 | A1, A30 | prospective user | identity, governance |
| F-36 | required | D-17 | O-26 Underage Case | PS-07 | A30 | Platform Safety Admin | governance |
| F-37 | required | D-19, D-20 | O-27 DSR Case | PS-08 | A31 | data subject / guardian | governance |
| F-38 | required | D-17 | O-28 Illegal Content Case | PS-09 | A32 | Platform Safety Admin | governance |
| F-39 | required | D-17 | O-21/O-26/O-28 (queue) | PS-03 + cross-cutting | A29, A33 | Platform Safety Admin | governance |
| F-40 | conditional | D-15 | O-29 Team Tier State | BE-01 | A28 | Head Coach | billing |
| F-42 | conditional (deferred) | — (no v1 UI surface) | O-29 Team Tier State (system-only) | BE-05 | A28 | system | billing |
| S-04 | required | D-13 | O-22-adjacent notification feed | contract 10 | A34 | account owner | messaging, platform |
| S-01, S-02, S-03, S-05, S-06, S-07, S-08, S-09, S-10, S-11, S-12, S-13 | required/conditional (system — no v1 UI surface, cross-cutting) | none — surfaced only via §2.5's cross-cutting objects | O-30 Sync/Conflict State (S-03), O-05/O-11/O-14/O-15 offline-pending states (S-03/S-07), the accessibility conventions applied throughout (S-12) | contracts 1–14 | A34, A35, various | system | platform capabilities |

Machine-checked by `stridelab-ai/scripts/validate-step3-4-artifacts.mjs`: every MVP-required `F-*`/`S-*` ID from `mvp-release-scope.md` §5 appears in this table's *Feature/Capability* column at least once.

### 1.9 Increment traceability (`INC-0…INC-11`)

Every destination and object below is delivered by exactly one **owning** increment
from `mvp-release-scope.md` §10 (the increment whose acceptance evidence first
requires it to exist). "Also touched by" records later increments that extend the
same surface without owning it. This mapping **adopts** the approved sequence; it
does not reorder, merge, split, or re-scope any increment.

| Increment | Capabilities (approved §10) | Destinations first delivered | Objects first delivered | Also touched by |
|---|---|---|---|---|
| **INC-0** Platform foundations | S-01, S-02, S-03, S-04, S-05, S-08, S-12, S-13 | **none** — no destination ships in INC-0 by design; it establishes the authorization kernel, sync substrate, audit log, preservation-hold seam, and the S-12 accessibility conventions every later destination inherits | **O-30** Sync/Conflict/Upload/Processing State (the cross-cutting state vocabulary of §4.5) | every later increment (each inherits S-02 authorization, S-03 offline semantics, S-12 accessibility, S-05 audit) |
| **INC-1** Identity & Team spine | F-01…F-08, F-35, F-40 | D-00, D-01, D-02, D-14, D-15, D-18, D-19, D-23 | O-01, O-02, O-02a, O-02b, O-03, O-04, O-05, O-29 | INC-9 (D-19 deletion under hold), INC-11 (O-29 confirmation) |
| **INC-2** Training planning | F-09, F-11, F-12, F-13 (+ **F-10 conditional**) | D-03, D-22 | O-06, **O-06a** *(conditional)* | INC-3 (D-22 gains execution/log panes) |
| **INC-3a** Execution & logging | F-14, F-15, F-16 | D-04 | O-07, O-08 | INC-10 (O-08 feeds the reporting read-model) |
| **INC-3b** Reconciliation & correction | F-17, F-18 | D-28 | O-09 | — (**INC-3a is not externally exposed until INC-3b passes** — §10 hard gate, restated in §4.5 X-6) |
| **INC-4** Personal workouts | F-19 *(conditional)* | **D-05** *(conditional)* | **O-10** *(conditional)* | INC-10 (own-history view only) |
| **INC-5** Media capture & tagging | F-20, F-21, S-06, S-07 | D-06, D-24 | O-11, O-12 | INC-6, INC-7, INC-8 |
| **INC-6** Vault visibility | F-23 | D-07 | O-14, O-15 | INC-7 (analysis source visibility), INC-8 (attachment routing) |
| **INC-7** Analysis & feedback | F-24, F-25 | D-08, D-26, D-21 | O-16, O-17 | — |
| **INC-8** Communication | F-26, F-27, F-28, F-30 (+ **S-10** conditional) | D-09, D-25, D-13 | O-18, O-19, O-20, O-22 | INC-9 (report/block targets). INC-8's group-channel attachment slice **inherits the F-22 block while F-22 is inactive** (§8.3 contract 4) — it does not deliver F-22 |
| **INC-9** Safety & governance spine | F-29, F-36, F-37, F-38, F-39 | D-16, D-17, D-20 | O-21, O-26, O-27, O-28 | **hard gate: INC-9 complete + D04 G3 sign-off precedes any external exposure of INC-5 media or INC-8 messaging** (§10, §4.5 X-6) |
| **INC-10** Performance & reporting | F-31, F-32, F-34, S-11 (+ **F-33**, **F-34-cond** conditional) | D-10, D-11, **D-27** *(conditional)* | O-23, O-24, O-25 | INC-1's D-19 (export audit leaf) |
| **INC-11** Commercial scaffold | F-40 confirmation; S-02 rule re-verified; **no** `EntitlementFlag` type, **no** BE-05 | **none** — confirmation-only; the tier-state field's only surface shipped with INC-1 and is unchanged here | none | — (**F-42 not built in v1**) |

**Increment invariants preserved by this mapping.**

1. **INC-0 ships no destination.** Any IA that gave INC-0 a screen would contradict §10's "a partial UI shell does not count as a completed increment."
2. **INC-3a → INC-3b exposure gate.** D-04 (execution) has no externally exposed state until D-28 (reconciliation) exists — modelled as state **X-6** in §4.5, not as a navigable destination.
3. **INC-9 precedes external media/messaging exposure.** D-06/D-07/D-24 (INC-5/6) and D-09/D-25 (INC-8) are not externally exposed until D-16/D-17 (INC-9) exist and D04 has signed off at G3.
4. **INC-11 adds no surface.** O-29 is displayed at D-15 from INC-1 onward and gates nothing at any increment — the tier-state field's existence is not an increment's user-visible deliverable.
5. **`INC-3` is represented by its two approved sub-increments.** `mvp-release-scope.md` §10 defines `INC-3` with sub-increments `INC-3a` (F-14/F-15/F-16) and `INC-3b` (F-17/F-18); this table uses the sub-increment rows because the exposure gate between them is load-bearing for the IA. `INC-3` = `INC-3a` ∪ `INC-3b`; no increment is added, removed, or re-scoped.
6. **`F-22` (media publication) has no owning increment, by design.** The approved §10 sequence never schedules it — §6.1 lists it as MVP-conditional pending the D04 consent mechanism, and §10 references it only as a *block* that INC-8's group-channel attachment slice inherits. This IA therefore assigns **O-13 to no increment**: it is modelled in §2.3 and §1.12 as an inert, unscheduled conditional surface. Assigning it an increment here would over-specify the approved sequence.
7. **S-12 accessibility is a per-increment G5 exit gate** for every increment shipping an interactive surface (INC-1…INC-10). The IA-level obligation this creates is the accessibility convention stated at the head of §2 (every marker carries a non-colour, VoiceOver-accessible label); Step 4 and interaction-design carry it per control.

*Machine-checked:* `validate-step3-4-artifacts.mjs` asserts every `INC-*` ID in `mvp-release-scope.md` §10 appears in this table, and that every `D-NN` defined in §4 is claimed by exactly one owning increment here.

### 1.10 Invariant coverage (`WORKFLOW-ARCHITECTURE-v2.md` §5, all 16)

The IA does not restate the invariants — it records **where each is structurally honored**, so a reviewer can verify none was quietly designed around.

| # | Invariant | Where this IA honors it |
|---|---|---|
| 1 | Hierarchy `Team → Event Group → Subgroup → Athlete`; membership metadata distinct from profile | §3.1 (the organization hierarchy, modelled independently); §2.1 O-02/O-02a/O-02b; O-03/O-04 (membership/assignment) kept as separate objects from O-05 (profile) |
| 2 | Exactly one Head Coach per Team; role is Team-scoped, never shared across Teams | §2.1 O-03 (role badge bound to a Membership, not an Account); §5.1 J-11 (transfer at D-15); §5.1 J-12 + §6 cross-Team-links rule (role never travels between Teams) |
| 3 | Event Coach management scope is narrower than communication reach | §2.1 O-02a/b role-based visibility (management denied outside assigned scope); §2.4 O-18/O-19 (an Event Coach may start a thread with **any** Team athlete); §1.11 records this asymmetry per actor |
| 4 | Coaches cannot edit athlete-owned profile or personal-workout data | §2.1 O-05 ("edited only by its owner"); §2.2 O-07/O-08 ("the coach never has a write path into O-08 — the client literally does not render an edit control"); §2.2 O-10 (athlete-exclusive) |
| 5 | Prescription and performed work are always separate records | §3.3 (prescription vs execution vs log as three aggregates, A8/A11/A12); §2.2 O-06 vs O-07 vs O-08; the `PrescriptionVersionMarker` row in §3.9 |
| 6 | Personal-workout non-elevation; disabling never deletes or blocks correction/export | §2.2 O-10 empty/restricted states (existing items stay visible, correctable, exportable; only *new* creation blocked, reason stated inline); §4.2 D-05; §3.3 (O-10 structurally outside the execution hierarchy) |
| 7 | Tag ≠ grant ≠ share ≠ publish — independently representable | §3.4 (Tag, SessionAttachment, Publication as independent siblings of O-11; Grant/Share as independent records, not children); §2.3 O-12 ("tag only — not shared with them" cue); §2.3 O-13/O-14/O-15 |
| 8 | Vault shows exactly what was explicitly granted/shared — never derived from membership | §3.7 (flat, query-time union; never derived from §3.1 or §3.2); §2.3 O-14/O-15 secondary-discovery row ("no path lets a viewer discover Vault content other than through D-07"); §3.9's deliberate "nothing carries here" row |
| 9 | Payment ≠ authorization | §2.5 O-29 (no feature reads it in v1; the non-negotiable non-adjacency rule); §5.1 J-13; machine-checked by the CDR-N2 adjacency assertion in the validator |
| 10 | Age 13+ baseline; discovered under-age handled by PS-07 | §4.1 D-00 (age gate; under-13 → hard reject); §2.1 O-01 `restricted_pending_review` state; §5.1 J-9; §4.4 D-17 (O-26 Underage Case) |
| 11 | No revoked navigation as requirement; workflows describe availability, not screens | §1.1 "Does not own" row; §11 non-goals N-1/N-2 — this artifact derives destinations from approved *capabilities*, and never treats a workflow field as a screen specification |
| 12 | Destructive-transition discipline (authority, confirmation, reversibility, downstream effects, exit state) | §4.1 D-15 (closure is a confirmation-gated sub-area, blocked under an active `PreservationHold`, never one tap from settings); §2.3 O-13 (publish), O-14/O-15 (revoke); §4.5 X-7 (recovery surface); the per-control confirmation design is Step 4 / interaction-design work (§11 N-4) |
| 13 | Offline honesty — offline success is never server-durable until reconciliation succeeds | §2.5 O-30 ("Saved on this device" never worded or styled as "Saved"); §4.5 X-3/X-4/X-5; §6 unsynchronized-local-objects rule; §2.3 O-14 (`grant_pending` never rendered as effective; a queued grant loses to a concurrent revoke) |
| 14 | Safety-critical notification state; safety-class notifications cannot be disabled | §2.4 O-22 (class label always shown; disabling safety class rejected client- **and** server-side, "the store refuses to persist safety = off"); §4.4 D-13; §2.2 O-09 (the one place where no badge is itself a defect) |
| 15 | Communication reach ≠ any other scope | §2.4 O-18/O-19 role-based visibility; §2.3 O-16/O-17 (an Event Coach cannot deliver feedback to an out-of-scope athlete **even though messaging them is allowed**); §1.11 actor matrix |
| 16 | Departed-member content disposition (DD-DEPARTED-CONTENT) | §5.2 rule 2 (historical content never deleted; the *person* disappears from active rosters/channels/switchers immediately); §2.2 O-09 (a departed athlete's conflict is held and flagged to the coach, never silently dropped); §5.1 J-11 |

*Machine-checked:* the validator asserts all 16 invariant rows are present and that each cites at least one IA section.

### 1.11 Actor coverage

The canonical actors are `mvp-release-scope.md` §3's. Each must have a coherent, complete path — not merely "a destination exists."

| Actor | Entry | Primary destinations | Explicitly denied / absent | Cross-Team behavior | Journeys |
|---|---|---|---|---|---|
| **Head Coach / Team Creator** | D-00 → D-01 | D-01, D-02, D-03, D-04, D-06, D-08, D-09, D-10, D-11, D-13, D-14, D-15, D-18 | no D-05 (Personal Workouts is athlete-only); no D-07 (Vault is athlete-only); no D-17; **cannot edit any athlete's O-05 profile** (inv. 4); no standing read access to a group channel they hold no assignment to (`OQ-MG-HC-CHANNEL` default) | role is per-Team; Head Coach in Team A may be Athlete in Team B — §5.1 J-12 | J-1, J-2, J-4 (toggle), J-5, J-6, J-7, J-8, J-10, J-11, J-12, J-13 |
| **Event Coach** | D-00 → D-01 | D-01, D-02, D-03 *(scope-limited)*, D-04, D-06, D-08, D-09, D-10 *(in-scope athletes only)*, D-11, D-13, D-14, D-18 | **no D-15 at all** (Team Administration is Head-Coach-only); no D-05; no D-07; no D-17; cannot edit profiles; cannot author/assign outside `ManagementScope`; **cannot deliver feedback (O-17) to an out-of-scope athlete even though a private thread with them is permitted** (inv. 3, 15) | same as above | J-2, J-3, J-5, J-6, J-7, J-8, J-10, J-12 |
| **Athlete** | D-00 → D-01 | D-01, D-02 *(read-only, own placement)*, D-04 *(log side)*, D-05 *(if enabled)*, D-06, D-07, D-08, D-09, D-10 *(own, full)*, D-11 *(own)*, D-13, D-14, D-19, D-21, D-22 *(own log)*, D-28 *(own conflicts)* | **no D-03** (planning authority is never granted — their assigned work appears via D-01/D-04); no D-15; no D-17; no D-26 for a project they do not author; never sees a `draft` Session | same as above | J-3, J-4, J-5 *(subject)*, J-6, J-7, J-8, J-9 *(subject)*, J-10, J-12 |
| **Platform Safety Administrator** *(platform actor, not a Team role)* | **separate sign-in; never reachable from a Team-scoped session** | **D-17 only** | **every Team-scoped destination** — the PSA acts on case artifacts, never by browsing Team content (least privilege) | outside every Team hierarchy entirely (domain-model §2.4) | J-8, J-9 |
| **Multi-Team user** | D-00 → D-18 → D-01 | **D-18** (the switcher itself, always in chrome); beyond it, exactly the destination set of whichever role they hold **in the active Team** | anything their role in the *active* Team denies; a link generated under Team A is invalid under Team B and never silently switches context | this is the actor J-12 exists to prove | J-12 |
| **Prospective user / invitee** | D-00 | D-00 only | everything else until an O-03 Membership exists | n/a | J-1 *(invitee side)* |
| **Data subject / guardian** *(assisted, non-navigable)* | D-19 → D-20 | D-20 handoff only | **no self-service guardian portal exists in v1** (F-P-11, Post-MVP — not modelled) | n/a | J-10 |

**Coverage proof.** The three canonical end-user roles (Head Coach, Event Coach, Athlete) each have: an entry path, a non-empty primary-destination set, an explicit denial set, defined cross-Team behavior, and at least one journey in which they are the primary role. *Machine-checked* by the validator.

### 1.12 Conditional-capability treatment (9, none activated)

Per DR-A3/DR-A5, nine capabilities are **MVP conditional**. The IA models each so that the destination/object exists in the design record without the capability being switched on — and so that no reader can mistake presence-in-IA for activation.

| ID | Activation condition (approved §6.1) | IA treatment | Inert-by-default proof |
|---|---|---|---|
| **F-10** Session templates | INC-2 G4 confirms an author-private slice does not extend the critical path | O-06a; a contextual "Templates" list inside D-03 | §2.2 O-06a "Inert-by-default note" — if unmet, the row does not exist in v1 and F-09/F-11 are the only reuse paths; **no shared library** (`CD-TEMPLATE-LIBRARY` / F-P-1 not modelled) |
| **F-19** Personal workouts | Head Coach `personal_workouts_allowed` on the Team (F-06) | D-05; O-10 | D-05 exists but creation is blocked with the reason stated when disabled; **existing records stay visible/correctable/exportable** (inv. 6). This is a Team setting, **not** an athlete planning authority (§11 N-7) |
| **F-22** Media publication | D04-approved consent mechanism for tagged minors **and** the Head-Coach publication-authority gate (`OQ-MD06-AUTHORITY`, `OQ-VS02-MULTISUBJECT`) | O-13; a "Publish" action on D-24. **No owning increment** — unscheduled in the approved §10 sequence (§1.9 note 6) | §2.3 O-13 — while inactive the surface **does not exist**; any publish attempt is refused with the named reason, never a silent no-op; never rendered in Vault chrome |
| **F-33** Group/Team reports | `OQ-PF-AGG-METHOD` resolved (D03) | D-27; O-24 group variant | §4.3/§4.4 D-11/D-27 "inert while F-33 inactive"; an aggregate may never let a coach infer an out-of-scope athlete's individual value (§2.5) |
| **F-34-cond** Coach export of a minor's identifiable data | `OQ-PF-MINOR-EXPORT` resolved (D04/legal) | a distinct, separately-gated sub-capability of D-11 | §4.4 D-11 — explicitly **never bundled into** ordinary athlete self-export (D-19) |
| **F-40** Team tier-state field | **shipped in v1 under Option A** — the *field* ships; **tier gating does not activate** | O-29 at D-15 | §2.5 O-29 — no feature reads it; the non-adjacency rule is machine-checked (CDR-N2). Option A ships the field + the S-02 build-time rule; it activates **no billing and no F-42** (§11 N-8) |
| **F-42** BE-05 entitlement interface | F-40 gating activated via a separately approved D06 entitlement artifact | **no v1 UI surface at all** | §1.8 row F-42 "— (no v1 UI surface)"; INC-11 confirms **no `EntitlementFlag` type and no BE-05 interface exists** in v1 |
| **S-09** Automated notification fan-out | automated fan-out design accepted | **no UI surface** — D-13 renders notifications regardless of how they were produced | fan-out is a delivery mechanism, not a destination; its absence changes no navigation |
| **S-10** Realtime transport | realtime transport selection | **no UI surface** — D-09/D-25 behave identically over queue/sync (the default) | transport choice never changes object meaning, membership, or reachability |

**Rule applied throughout:** a conditional capability's presence in this artifact is a *design record*, never an activation. No conditional capability is given a primary destination slot that would have to be removed if its condition is never met — the two that own a destination (D-05, D-27) are both explicitly typed as conditional in §4, and the validator asserts each of the nine IDs carries a conditional marker wherever it appears.


---

## 2. Content and object inventory

Conventions: **Owner** = who authors/controls the record (domain-model §5); **Audience** = who may ever see it exist, before role/scope narrowing; **Role-based visibility** states the narrowing. "—" means not applicable to that object. **Accessibility convention (A11Y-IA-N1):** every visual marker named below — role badge, status chip, "Personal"/"Template" chip, the visibility-reason indicator, breadcrumbs, sync-state chips — must carry an equivalent VoiceOver-accessible textual label; none of them conveys its meaning by color or icon shape alone (S-12; carried into Step 4 as a completion gate on every control that implements one of these markers).

### 2.1 Identity and Team objects

**O-01 — Account**
- Owner: the account holder. Audience: platform-wide (not Team-scoped).
- Creation path: D-00 onboarding (signup). Primary discovery: none — an Account is never "browsed"; it is the authenticated actor, not a listed object.
- Secondary/contextual discovery: an Account surfaces to other members only as the display identity inside a `Membership` (O-03), never directly.
- Parent/related objects: zero-or-more O-03 Memberships.
- Context markers: none (pre-Team).
- Role-based visibility: the owner sees full account state (D-14 Settings); nobody else ever resolves an Account directly — only through a Membership's role/display fields (PR-03).
- Empty state: a signed-in Account with no Memberships lands on a "Create or join a Team" empty state (D-00), not a blank Team shell.
- Restricted/denied state: `restricted_pending_review` (PS-07) — ordinary navigation is suspended and the Account sees only a fixed "Account under review" screen with a support-contact path; no Team content is reachable. **IA-OQ-4 [D04-confirmed safe default]:** self-service export/deletion (D-19) is also suspended for the duration of the restriction — deletion could destroy evidence the Platform Safety Administrator needs for the determination (contract 11 preservation-hold precedent), and export is "unnecessary processing" under PS-07's own standard. This is a new, more-conservative safe default the domain model left implicit; it is not an existing `OQ-*` and is owned by D04, not silently resolved by this artifact.
- Offline availability: authentication is not offline-capable; a previously authenticated session may read cached Team-scoped content offline (see O-02).
- Search/filter exposure: not searchable by anyone.
- Deep-link eligibility: not deep-linkable as a destination.
- Return destination: n/a (root of the app).

**O-02 — Team**
- Owner: Head Coach / Team Creator. Audience: its members only; never discoverable by non-members (no public directory — `OQ-IT04-JOIN-MECHANISM` safe default: invitation-only).
- Creation path: D-00 (first Team) or D-18 Team Switcher → "Create a new Team."
- Primary discovery: D-02 Team (the active Team's own hierarchy) and D-18 Team Switcher (list of the Account's Teams).
- Secondary/contextual discovery: every Team-scoped destination's header/context marker names the active Team.
- Parent/related objects: contains O-02a Event Group → O-02b Subgroup; owns O-03 Memberships, O-29 Team Tier State.
- Context markers: Team name + role badge shown persistently in the navigation chrome (Step 4 §7).
- Role-based visibility: full read/write of structure = Head Coach; Event Coach reads Team name/roster read-only, writes only within assigned groups; Athlete reads Team name + own group placement only.
- Empty state: a freshly created Team with no Event Groups shows a first-run prompt ("Add your first Event Group") — never an empty list with no explanation.
- Restricted/denied state: a Team the Account was removed from disappears from D-18 on next sync; attempting a stale deep link into it resolves to "You're no longer a member of this Team" (§6).
- Offline availability: the last-synced structure is readable offline; structural writes require connectivity.
- Search/filter exposure: not searched *within*; it is the scoping container search operates inside (§7).
- Deep-link eligibility: yes, scoped to the current Account's membership — a stale/foreign-Team link fails per §6.
- Return destination: D-01 Today.

**O-02a — Event Group** / **O-02b — Subgroup**
- Owner: Head Coach (create/rename/archive). Audience: assigned members + all coaches with any assignment reaching it.
- Creation path: D-15 Team Administration.
- Primary discovery: D-02 Team hierarchy list; contextually inside D-15.
- Secondary/contextual discovery: named as the parent context marker on every Session, roster row, and channel derived from it.
- Parent/related: child of O-02 Team (Event Group) or O-02a (Subgroup); has member O-03 Memberships via O-04 Assignment; has a derived O-18 Channel.
- Context markers: breadcrumb `Team ▸ Event Group ▸ Subgroup`.
- Role-based visibility: Head Coach sees all; Event Coach sees only groups they are assigned to (management) plus read-only awareness of Team-wide existence (never another Event Coach's group detail beyond what a shared Team-channel already reveals).
- Empty state: an Event Group with no athletes shows "No athletes assigned yet" with an admin action visible only to the Head Coach.
- Restricted/denied state: an Event Coach attempting to open an unassigned group's admin view is denied with "You don't manage this group" — the group's *existence* may still be visible in a Team-wide roster the Head Coach shares, per baseline; a bare read of "this group exists" is not itself a scope violation, editing it is.
- Offline availability: read-only from cache; structural changes require connectivity.
- Search/filter exposure: filterable facet inside D-02/D-15 roster views.
- Deep-link eligibility: yes, subject to the same membership/scope check as O-02.
- Return destination: parent Team or Event Group.

**O-03 — Membership** (role binding) and **O-04 — Assignment** (group placement)
- Owner: Head Coach (issues/revokes). Audience: the member (own record) + Head Coach (all) + relevant Event Coach (their group's members only).
- Creation path: invite (D-15) → accept (D-00/notification) → O-03 created; O-04 created by D-15 group-assignment action.
- Primary discovery: D-15 (roster list, admin view); D-02 (read-only roster, scope-limited).
- Secondary/contextual discovery: every object owned/authored/executed by a person names them via their Membership display identity, never a raw Account.
- Parent/related: child of O-02 Team; references O-01 Account and O-02a/b for scope.
- Context markers: role badge (Head Coach / Event Coach / Athlete) always shown beside a person's name.
- Role-based visibility: an Event Coach's roster view is filtered to their `ManagementScope`; an out-of-scope athlete never appears in their roster, search, or "recent" list (§5, §7).
- Empty state: "No pending invitations" / "No one assigned yet."
- Restricted/denied state: a removed Membership's holder loses all Team-scoped destinations immediately on next authoritative check (§6 role-change behavior).
- Offline availability: read-only from cache; invite/remove/assign require connectivity.
- Search/filter exposure: searchable by name/role within the Head Coach's/Event Coach's authorized roster only.
- Deep-link eligibility: yes, into O-23 the profile detail, scope-checked.
- Return destination: D-15 or D-02 roster.

**O-05 — Profile**
- Owner: the account holder exclusively (invariant #4). Audience: every member, per PR-03 resolution.
- Creation path: created automatically with O-01; edited only by its owner (D-14).
- Primary discovery: D-14 (own); D-23 Athlete/Coach Detail (viewing someone else's, resolved).
- Secondary/contextual discovery: display name + role badge appear on every roster row, message, session log, and media tag.
- Parent/related: 1:1 with O-01; read by every member-rendering surface (D-02, D-09, D-10, D-15, D-23).
- Context markers: none beyond the viewer/subject relationship, which is never shown as a raw label — it determines *which fields render*, not a "you are viewing as X" banner.
- Role-based visibility: peer → display name + role only; in-scope coach → the approved coach-visible field catalogue; out-of-scope coach or non-member → display name + role only, identical to a peer; **DOB/age is never rendered to any coach or peer, on any platform, at any zoom level.**
- Empty state: an unpopulated optional field renders as absent, never as a blank/broken row.
- Restricted/denied state: an over-fetch attempt (e.g. a crafted deep link into a withheld field) is server-refused and audited (contract 8); the client shows the peer-level view, not an error that implies more data exists.
- Offline availability: a cached profile view is provisional; every coach-scope-gated field re-validates against current scope before display (never trust a stale cache for authorization-sensitive fields).
- Search/filter exposure: display name is searchable within the viewer's authorized roster only.
- Deep-link eligibility: yes, resolves to the PR-03-filtered view for whoever opens the link.
- Return destination: the roster/list the viewer came from.

### 2.2 Training-time objects

**O-06 — Planned Session** (with its Season/Block/Week ancestors)
- Owner: the authoring coach (Head Coach Team-wide; Event Coach within assigned scope). Audience: assigned athletes/groups once published (via O-04-style `PlanAssignment`).
- Creation path: D-03 (author a new Session, or a Season/Block/Week container).
- Primary discovery: D-03 Plan (the authoring coach's own hierarchy); D-01 Today (an athlete's *assigned* upcoming session); D-04 Practice (today's session, coach side).
- Secondary/contextual discovery: linked from D-22 Session Detail, D-10 Performance (as "planned vs performed"), D-28 Reconciliation Center when in conflict.
- Parent/related: child of Season → Block → Week (containment, §3.2); has one O-07 Session Execution once started; independent of O-10 Personal Workout (never the same tree — invariant #6).
- Context markers: `Season ▸ Block ▸ Week ▸ Session` breadcrumb; a status chip (`draft` / `published` / `in progress` / `completed` / `cancelled`).
- Role-based visibility: the authoring coach sees drafts; an athlete never sees a `draft` — only `published` sessions they are assigned to (F-12 is the visibility-granting transition, not Team membership).
- Empty state: a new Season with no Blocks shows "Start by adding a Block."
- Restricted/denied state: an Event Coach opening a Team-wide Head-Coach-authored Session outside their edit authority sees it read-only with "Authored by `<Head Coach>` — you can view, not edit."
- Offline availability: a `published` Session assigned to the athlete is fully available offline once synced (the most sync-critical planning artifact); authoring drafts may be created offline and sync on publish.
- Search/filter exposure: searchable/filterable by the authoring coach across their own plan hierarchy (date, group, status).
- Deep-link eligibility: yes; a link into a since-unassigned Session resolves per §6 (deleted/revoked/moved handling).
- Return destination: D-03 Plan or D-01 Today, whichever the entry point was.

**O-06a — Session Template** *(F-10, conditional)*
- Owner: the authoring coach (+ Head Coach). Audience: author-private by default (`OQ-TP-TEMPLATE-SHARING`).
- Creation path: contextual "Save as template" action from D-03/D-22.
- Primary discovery: a "Templates" contextual list inside D-03, visible only to its author and the Head Coach.
- Secondary/contextual discovery: offered as a starting point when creating a new O-06.
- Parent/related: independent of the Season/Block/Week tree (dateless, assignment-free).
- Context markers: "Template" chip; never shows a fabricated schedule position.
- Role-based visibility: strictly author + Head Coach; another Event Coach's templates are invisible, not merely uneditable. **[excluded — not modelled]** a Team-wide shared template library is `CD-TEMPLATE-LIBRARY` / F-P-1, Post-MVP — no such destination exists here.
- Empty state: "No templates yet — save any Session as one."
- Restricted/denied state: n/a beyond the author/Head-Coach visibility rule above.
- Offline availability: usable against locally cached templates.
- Search/filter exposure: searchable within the author's own template set only.
- Deep-link eligibility: yes, author/Head-Coach scoped.
- Return destination: D-03.
- **Inert-by-default note:** present only if the INC-2 G4 activation condition (§6.1 of `mvp-release-scope.md`) is met; otherwise this row does not exist in v1 and F-09 authoring + F-11 duplication are the only reuse paths.

**O-07 — Session Execution** and **O-08 — Performed Work Log**
- Owner: O-07 is **coach-owned** (the running-practice record); O-08 is **athlete-owned** (invariant #4/#5 — never the same aggregate, domain-model A11 vs A12).
- Creation path: O-07 starts from D-04 (coach starts practice against a `published` O-06); O-08 entries are created by each athlete inside the same live session screen.
- Primary discovery: D-04 Practice (live, "today"); D-22 Session Detail (historical, either side).
- Secondary/contextual discovery: D-28 Reconciliation Center surfaces both when in conflict; D-10 Performance reads O-08 as history.
- Parent/related: O-07 references its source O-06 by id + an immutable `PrescriptionVersionMarker`; O-08 is one per (athlete, O-07).
- Context markers: attendance state, live/finalized status, "as executed — prescription later changed" marker when applicable.
- Role-based visibility: the coach sees O-07 (attendance, in-session notes) for everyone present; **the coach never has a write path into O-08** — the client literally does not render an edit control on an athlete's log; the athlete sees only their own O-08.
- Empty state: an O-07 with no attendance recorded yet shows "Practice not started."
- Restricted/denied state: attempting to log against an unassigned Session is denied with "This session isn't assigned to you," not a generic error.
- Offline availability: full offline capability for both — starting, recording, logging; a never-synced Session cannot be started offline (honest failure, §4).
- Search/filter exposure: O-08 is searchable/filterable inside the athlete's own D-10 history only; a coach filters O-07 within their current management scope.
- Deep-link eligibility: yes, scope-checked per viewer.
- Return destination: D-04 or D-03, whichever the entry point was.

**O-09 — Reconciliation Record** *(F-17)*
- Owner: shared — the coach resolves session/attendance conflicts, each athlete resolves only their own log conflicts (domain-model A13).
- Creation path: system-detected on reconnect when a divergence is found; never user-initiated.
- Primary discovery: **D-28 Reconciliation Center**, surfaced as a badge/banner from D-04 and D-01 whenever an unresolved item exists for the viewer — never buried.
- Secondary/contextual discovery: inline on the affected O-07/O-08 as an "as executed — version changed" marker even after resolution (permanent, not just during conflict).
- Parent/related: layers over O-07 + O-08 without destroying either's history.
- Context markers: `conflict_detected` / `in_reconciliation` / `reconciled`.
- Role-based visibility: exactly the coach (session/attendance side) and the specific athlete (their own log side); a conflict belonging to a since-departed athlete is held and flagged to the coach only, never silently dropped, never shown to another athlete.
- Empty state: "No conflicts to review."
- Restricted/denied state: n/a — this object exists only when there is something to resolve, and its existence is never hidden from the people who must act on it (safety-relevant: this is the one place where "no notification/badge" would itself be a defect).
- Offline availability: detection requires a reconnect; the *resolution* UI may proceed with local data already synced.
- Search/filter exposure: not separately searchable — reached only via the badge/banner or the affected session.
- Deep-link eligibility: yes, into D-28 for the specific conflict.
- Return destination: the affected D-04/D-22 session.

**O-10 — Personal Workout** *(F-19, conditional)*
- Owner: the athlete exclusively. Audience: the athlete only — **no coach visibility** (`OQ-PW-COACH-VISIBILITY` safe default).
- Creation path: D-05 Personal Workouts (gated by `personal_workouts_allowed`).
- Primary discovery: D-05.
- Secondary/contextual discovery: appears in the athlete's own D-10 Performance history, never in a coach's view of that athlete.
- Parent/related: structurally isolated — no parent in the Season/Block/Week tree (invariant #6).
- Context markers: "Personal" chip, distinguishing it at a glance from any coach-assigned item, so an athlete never confuses the two hierarchies (task requirement: hierarchies not collapsed).
- Role-based visibility: athlete-only, unconditionally.
- Empty state: "No personal workouts yet" (if the setting is enabled) or "Personal workouts aren't turned on for this Team" (if disabled — explains why the destination is empty rather than hiding it silently, since existing records must remain visible even when creation is blocked).
- Restricted/denied state: with the setting disabled, existing items stay fully visible/correctable/exportable; only *new* creation/execution is blocked, with the reason stated inline.
- Offline availability: full offline create/log/edit; a create attempted offline against a stale "enabled" value is flagged for reconciliation, not silently accepted.
- Search/filter exposure: searchable within the athlete's own set only.
- Deep-link eligibility: yes, athlete-owner-only.
- Return destination: D-05 or D-01.

### 2.3 Media, analysis, and Vault objects

**O-11 — Media Artifact**
- Owner: the recording/importing actor. Audience: nobody, by default (private draft — MD-03).
- Creation path: D-06 (capture/import).
- Primary discovery: D-06 (the owner's own library).
- Secondary/contextual discovery: linked from an attached O-06/O-07 (contextual link only, not a visibility grant); appears in D-07 Vault for a recipient only after an explicit O-14/O-15 exists; appears in D-08/D-26 once opened for analysis.
- Parent/related: has independent child records O-12 Tag, O-13 Publication, and a `SessionAttachment` link — these are siblings, never a single conflated state field (invariant #7).
- Context markers: **a persistent, unambiguous visibility-reason indicator** wherever the artifact is shown to anyone other than its owner — "Because you own it" / "Shared with you by `<name>`" / "Tagged and granted by `<name>`" (task requirement: Vault must communicate why the user can see it).
- Role-based visibility: owner sees everything they hold; any other viewer sees only artifacts for which an active O-14 Vault Grant, O-15 Share, or O-13 Publication naming them exists — resolved query-time, never cached as a flag (domain-model VS-04).
- Empty state: "No media yet — record or import your first clip."
- Restricted/denied state: a recipient whose grant was revoked loses the item from D-07 on next sync; a stale local copy is a documented limitation (`OQ-MEDIA-CACHE-INVALIDATION`), never presented as still-authoritative.
- Offline availability: capture/import/private-draft browsing works fully offline; publish/tag/grant/share require connectivity to take effect (may be drafted offline, stays pending).
- Search/filter exposure: owner searches their own library; a recipient searches only their resolved Vault set (§7).
- Deep-link eligibility: yes, resolved per current authoritative visibility at open time — never per a cached link state.
- Return destination: D-06, D-07, or D-24, whichever the entry point was.

**O-12 — Tag** *(F-21)*
- Owner: the tagger (bounded to their current scope). Audience: identification only — **conveys no access** (invariant #7).
- Creation path: contextual action on O-11 from D-06/D-24.
- Primary discovery: shown inline on the artifact (D-06, D-24) — never a separate destination.
- Secondary/contextual discovery: a tagged athlete receives a safety-class notification (S-04) that they were tagged — the notification names the fact of the tag, never implying Vault access was granted.
- Parent/related: child of O-11.
- Context markers: the tagged person's name; a small "tag only — not shared with them" cue where the tagger reviews their own tags, so the tagger never mistakes tagging for granting.
- Role-based visibility: visible to the artifact's owner and to the people it identifies (they may see they were tagged, without gaining Vault access).
- Empty state: "No one tagged."
- Restricted/denied state: tagging someone outside the tagger's current scope is denied outright, not silently dropped.
- Offline availability: may be created offline, syncs on reconnect.
- Search/filter exposure: "tagged you" is a filter facet inside the athlete's own notification/media context, not a general search of other people's libraries.
- Deep-link eligibility: not independently deep-linkable (always via O-11).
- Return destination: the hosting O-11 view.

**O-13 — Publication** *(F-22, conditional)*
- Owner: Head Coach (publication authority). Audience: the declared `AudienceScope` (Team/Event Group/Subgroup).
- Creation path: contextual "Publish" action on O-11 from D-24 — **inert by default** (blocked pending the D04-approved consent mechanism, §6.1).
- Primary discovery: once active, published media appears inline in the relevant D-02/D-09 context feed for its audience; while inactive, this destination surface simply does not exist (no disabled ghost button that reveals the feature's shape prematurely beyond "coming later," per the interaction-design skill's anti-pattern about visual styling concealing ambiguous behavior — Step 4 owns the exact control state).
- Secondary/contextual discovery: n/a while inactive.
- Parent/related: child of O-11.
- Context markers: `AudienceScope` label + a per-tagged-minor consent-status indicator, visible to the Head Coach before publishing.
- Role-based visibility: Head-Coach-initiated only; multi-subject youth media is blocked until every depicted minor's `ConsentCondition` is met.
- Empty state: n/a (inert).
- Restricted/denied state: any publish attempt while inactive is refused with the named reason (consent mechanism not yet approved), not a silent no-op.
- Offline availability: not offline-capable (destructive-broadening transition).
- Search/filter exposure: once active, published items are discoverable within their audience's normal Team/group content surfaces — never a separate "browse everyone's published media" destination that would resemble a Team-wide feed (SKILL anti-pattern "Vault treated as a Team-wide feed" — Publication is explicitly *not* the Vault, and is never presented using Vault chrome).
- Deep-link eligibility: audience-scoped once active.
- Return destination: D-02/D-09 context feed.

**O-14 — Vault Grant** and **O-15 — Share**
- Owner: O-14 = the media owner (grantor); O-15 = the sharing coach.
- Creation path: contextual "Give access" action from D-06/D-24, targeting one tagged athlete (O-14) or a named recipient (O-15).
- Primary discovery: from the grantor's side, an inline "Shared with" list on O-11 (D-06/D-24); from the recipient's side, **D-07 Vault** is the sole browsing surface.
- Secondary/contextual discovery: none — Vault access is never inferable from roster membership, group assignment, or tag presence (invariant #8); there is no path that lets a viewer "discover" Vault content other than through D-07 itself.
- Parent/related: references exactly one O-11 (O-14) or one item/derived item (O-15).
- Context markers: the visibility-reason indicator (see O-11) is generated directly from these two record types — this is the *only* source of that label.
- Role-based visibility: the grantor/sharer manages their own grants; the recipient sees exactly what was granted/shared to them, nothing more.
- Empty state (D-07, recipient side): "Nothing has been shared with you yet" — explicitly not "Your Vault is empty," to avoid implying ownership of a container that doesn't exist independently of these records.
- Restricted/denied state: a revoked grant disappears from D-07 on next sync with no residual "revoked" ghost entry (a moderation-driven revocation may show a neutral "no longer available" per PS-03 notice policy, `OQ-VS03-NOTICE`).
- Offline availability: `grant_pending` while offline is never rendered as effective; a queued grant loses to a concurrent revoke (invariant #13).
- Search/filter exposure: the recipient can search only within their own resolved D-07 set (§7) — search never expands beyond what O-14/O-15 already established.
- Deep-link eligibility: yes, re-resolved against current authoritative grant/share state at open time.
- Return destination: D-06 (grantor) or D-07 (recipient).

**O-16 — Analysis Project**, **O-17 — Finding / Coaching Feedback**, **Clip / Drawing / Comparison** (children of O-16)
- Owner: the analysing actor (O-16); the delivering coach (O-17).
- Creation path: D-08/D-26 "Start analysis" on a visible O-11; "Deliver as feedback" contextual action inside D-26 for O-17.
- Primary discovery: D-08 (the analysing actor's own project list); **D-21 Feedback** (an athlete's received-feedback inbox).
- Secondary/contextual discovery: linked back to the source O-11 and forward from O-17 to its parent O-16 **only for the deliverer** — the recipient sees the delivered clip/note, never the whole project (task requirement: "Finding → clip or report," and the underlying project stays private).
- Parent/related: O-16 references its source O-11 by id and **never widens that artifact's visibility**; O-17 is a scope-bounded selection out of O-16.
- Context markers: "Private analysis" vs "Shared with `<athlete>`" state, shown to the coach; the athlete's D-21 item is labelled with the delivering coach's name and date.
- Role-based visibility: O-16 is private to its author by default; O-17 delivery requires the target athlete be inside the coach's **current** management scope — an Event Coach cannot deliver feedback to an out-of-scope athlete even though messaging them is allowed (invariant #15, distinguishing reach from scope).
- Empty state: "No analysis yet" (D-08); "No feedback yet" (D-21).
- Restricted/denied state: opening an analysis whose source media the actor can no longer see is denied, not silently degraded to a broken player.
- Offline availability: playback/annotation of already-cached media works offline; delivering feedback (a sharing transition) requires connectivity.
- Search/filter exposure: the author searches their own D-08 projects; an athlete searches their own D-21 feedback.
- Deep-link eligibility: yes, per the same scope check as above.
- Return destination: D-08, D-21, or the source O-11's hosting destination.

### 2.4 Communication objects

**O-18 — Channel**, **O-19 — Private Thread**, **O-20 — Message / Message Attachment**
- Owner: derived (Channel membership is a projection of Team/assignment state — nobody "owns" the member list); the two participants own a Private Thread; the sender owns each Message.
- Creation path: O-18 is created automatically with its Event Group/Subgroup/Team; O-19 is started by either a coach or an athlete from a person's profile/roster row; O-20 is composed inline.
- Primary discovery: **D-09 Messages** (a unified list of the viewer's channels + threads).
- Secondary/contextual discovery: a "Message `<name>`" contextual action from O-03/O-23 (roster/profile) starts or opens the relevant O-19.
- Parent/related: O-18 is a child of its Event Group/Subgroup/Team; O-20 attachments route through the **stricter** of O-14/O-15 (private) or O-13 (Team/group), per contract 4.
- Context markers: channel scope label (Team / Event Group / Subgroup name); thread participant names; an attachment shows the same visibility-reason indicator as O-11 once the formal grant/publication record exists.
- Role-based visibility: channel membership follows current assignment exactly (an unassignment removes access on the next authoritative check); a Head Coach without an assignment to a group has **no standing read access** to that group's channel (`OQ-MG-HC-CHANNEL` default); an Event Coach may start a thread with **any** Team athlete (reach), but that thread never grants tagging/Vault/feedback/analysis/profile/performance access to that athlete (scope).
- Empty state: "No messages yet in this channel."
- Restricted/denied state: a block makes an O-19 read-only for both parties, except a safety-critical message still gets through (baseline §5); a minor blocking a coach is offered a private report path inline.
- Offline availability: compose/queue offline, deliver on reconnect, no silent loss; history reads from local cache.
- Search/filter exposure: searchable within the viewer's own channel/thread membership only (§7) — never across a channel the viewer isn't in.
- Deep-link eligibility: yes, membership-checked at open time (an unassignment invalidates a previously valid link).
- Return destination: D-09.

**O-22 — Notification Preference** and **Notification** *(D-13)*
- Owner: each member, for their own preferences only.
- Creation path: default-populated at account creation; edited from D-14.
- Primary discovery: D-14 (preferences); **D-13 Notifications** (the inbox/feed of received notifications).
- Secondary/contextual discovery: a badge on the relevant primary destination (Messages, Reconciliation, Feedback) mirrors an unread safety/operational notification without requiring a trip to D-13 first.
- Parent/related: safety-class notifications originate only from the enumerated safety-emitting workflows (contract 10) and can never be muted; operational/social classes are adjustable.
- Context markers: class label (Safety / Operational / Social), never hidden even when quiet hours are active.
- Role-based visibility: strictly per-member, self-owned; no coach/admin can view or set another member's preferences.
- Empty state: "No notifications."
- Restricted/denied state: attempting to disable a safety-class notification is rejected client-side and server-side; the store refuses to persist "safety = off."
- Offline availability: composed/queued offline where the triggering action was offline; the in-app authoritative state is what D-13 reflects, with push/email as a fallible secondary.
- Search/filter exposure: filterable by class inside D-13.
- Deep-link eligibility: yes, resolves to the underlying object (a tap on a "you were tagged" notification opens the O-11).
- Return destination: the underlying object's home destination.

### 2.5 Performance, reporting, and system-state objects

**O-23 — Metric / PB Record**, **O-24 — Report**, **O-25 — Export Event**
- Owner: the athlete (O-23 is always about one athlete); the requesting actor (O-24, O-25).
- Creation path: O-23 is a derived projection, never authored directly; O-24/O-25 are requested from D-10/D-11/D-19.
- Primary discovery: **D-10 Performance** (history/metrics/PBs); **D-11 Reports**; **D-19 Data Export & Deletion** (self-export/deletion).
- Secondary/contextual discovery: a fresh PB surfaces as a small in-context highlight the next time the athlete opens D-10, not a separate destination.
- Parent/related: O-23 is derived from O-08 + O-10 (own history only) and never exposes another athlete's individual value inside an aggregate a coach can see.
- Context markers: a freshness/completeness marker on any partially-synced report/export; a "not enough data yet" honest empty state rather than a fabricated metric.
- Role-based visibility: an athlete always sees their own full history; a coach sees only currently-in-scope athletes' history, and loses a departed/reassigned athlete's identifiable data on the next authoritative check; a group aggregate (F-33, conditional) never lets a coach infer one out-of-scope athlete's individual value.
- Empty state: "Not enough data yet."
- Restricted/denied state: a report/export request whose scope exceeds the requester's current authorization is rejected **before generation**, with the reason stated, never silently filtered after the fact.
- Offline availability: history reads from local cache with a staleness marker; a report may generate offline with a freshness marker; export requires connectivity to write its audit record (contract 13) and complete.
- Search/filter exposure: filterable by date/athlete/metric within the viewer's authorized set.
- Deep-link eligibility: yes, re-scoped at open time.
- Return destination: D-10, D-11, or D-19.

**O-29 — Team Tier State** *(F-40, conditional)*
- Owner: Head Coach (sole tier authority, `OQ-BE-BILLING-OWNER` default). Audience: visible, read-only, to every member (it is not a secret, but it is administrative, not a feature switch — DR-A5 Option A).
- Creation path: defaults to Free at Team creation (F-02); no v1 UI to change it (no paid billing ships in v1 — F-41 Post-MVP).
- Primary discovery: **D-15 Team Administration** (the field lives with other Team settings, not inside ordinary content navigation).
- Secondary/contextual discovery: none — it deliberately does not appear inline on feature surfaces, because **no feature reads it** in v1 (S-02 build-time rule; invariant #9). Surfacing it next to a feature it doesn't gate would visually imply a tier-gate that does not exist.
- Parent/related: child of O-02 Team.
- Context markers: a plain "Team plan: Free" label with no upsell affordance (there is nothing to upgrade to in v1).
- Role-based visibility: read-only to all members; edit surface (inert, since there is nothing to select) visible only to the Head Coach.
- Empty state: n/a (always has a value — Free by default).
- Restricted/denied state: n/a.
- Offline availability: read-only from cache.
- Search/filter exposure: not searchable.
- Deep-link eligibility: yes, Head-Coach administrative context only.
- Return destination: D-15.
- **Non-negotiable design rule carried into Step 4:** this object must never appear inside, or adjacent to, any authorization/permission/feature-availability decision surface — doing so would visually imply tier-gated authorization, contradicting invariant #9 even though the backend enforces it correctly (SKILL anti-pattern: "payment or tier state used as authorization" must not even *look* true).

**O-30 — Sync / Conflict / Upload / Processing State** (cross-cutting, S-03/S-06/S-07)
- Owner: system; surfaced everywhere an offline-capable action occurred.
- Creation path: automatic, attached to the relevant object (O-06…O-20) rather than existing as its own browsable object.
- Primary discovery: inline status chip on the affected object (`Saved on this device` / `Uploading…` / `Synced` / `Needs attention`); a single **sync status indicator** in the navigation chrome (Step 4 §4) as an at-a-glance aggregate.
- Secondary/contextual discovery: unresolved conflicts additionally surface via D-28.
- Parent/related: attaches to whichever object is pending/processing/conflicted.
- Context markers: the state is always named honestly — "Saved on this device" is never worded or styled to resemble "Saved" (server-durable) until reconciliation actually succeeds (invariant #13; the interaction-design skill's local-vs-server-vs-team-visible feedback distinction).
- Role-based visibility: visible only to the object's owner/authorized viewers — sync state is not evidence that leaks the object's existence to anyone unauthorized.
- Empty state: no chip shown once fully synced.
- Restricted/denied state: a permanently failed upload/processing state names the failure and offers retry, never a silent drop.
- Offline availability: this *is* the offline-availability signal.
- Search/filter exposure: "Needs attention" is a filter facet on D-01/D-28.
- Deep-link eligibility: n/a (attached state, not an independent object).
- Return destination: n/a.

---

## 3. Hierarchy model

Eight hierarchies are modelled **independently**, per the task instruction not to collapse Team, training-time, and media-ownership trees into one structure. Each intersects with the others only at named, explicit context-carry points (§3.9) — never by structural nesting.

### 3.1 Organization hierarchy
`Team → Event Group → Subgroup → Athlete` (domain-model invariant #1; O-02 → O-02a → O-02b → member). A coach's `ManagementScope` is a *derived overlay* on this tree (a union of Assignments), not a fifth level.

### 3.2 Training-time hierarchy
`Season (Macrocycle) → Block → Week → Session` (O-06 and its ancestors, domain-model A5–A8). This tree is **authored** content and exists independently of who executes it.

### 3.3 Workout prescription and execution hierarchy
`Session (prescription, O-06) → Session Execution (O-07, coach-owned performed instance) → Performed Work Log (O-08, per-athlete, athlete-owned) → Amendment layers (SE-10)`. This is explicitly a **separate** hierarchy from §3.2: a Session is prescription content; a Session Execution and its Performed Work Logs are the record of what actually happened, structurally on different aggregates (A8 vs A11 vs A12) so a coach can never write into an athlete's log. **Personal Workout (O-10) is not in this hierarchy at all** — it is a sibling isolated tree (invariant #6).

### 3.4 Media and analysis hierarchy
`Media Artifact (O-11) → {Tag (O-12), Session Attachment, Publication (O-13)}` as independent siblings (never a single state field — invariant #7), and separately `Media Artifact → Analysis Project (O-16) → {Annotation, Clip, Comparison} → Coaching Feedback (O-17, a bounded selection, not the whole project)`. **Vault Grant (O-14) and Share (O-15) are not children of Media Artifact** — they are independent records in their own right (domain-model A16/A17), because a grant/share must have its own lifecycle, revocation, and audit trail (VS-04). The Vault (D-07) is therefore a *resolved view*, not a node in this tree.

### 3.5 Communication hierarchy
`Team → {Team Channel, Event Group Channel, Subgroup Channel}` (membership derived from §3.1, never separately managed) running alongside an entirely independent `Coach ↔ Athlete Private Thread` structure. Message Attachments route out of this hierarchy into whichever of §3.4's visibility mechanisms is stricter for the context (contract 4).

### 3.6 Athlete personal history
A **read-model overlay**, not a stored tree: it unifies `Performed Work Log` entries (from §3.3, one per completed Session Execution) with `Personal Workout` logs (from the isolated §3.3 sibling) into one chronological view for the athlete alone. The underlying storage never merges them (invariant #6); only the athlete's own D-10 presentation does, and it visually distinguishes the two sources (the "Personal" chip, §2.2).

### 3.7 Vault and sharing hierarchy
Flat, not nested: `Vault Grant (O-14)` and `Share (O-15)` are independent, keyed `(grantor/sharer, recipient, artifact/item)` records with no parent-child relationship to each other or to the Media Artifact tree in §3.4. The Vault (D-07) is the **query-time union** of a recipient's active grants and shares — never a folder the recipient "owns," never derived from §3.1 or §3.2 membership.

### 3.8 Reporting hierarchy
`Performed Work Log / Personal Workout / Session Execution (source records, §3.3) → Performance read-models (PF-01…03, scope-bounded per viewer) → Report (O-24, a generated snapshot) → Export Event (O-25, an immutable audit leaf)`. Nothing in this hierarchy is itself a source of truth — every level above "source records" is a derived, re-computable projection (domain-model §5 "Derivation").

### 3.9 Context retention across hierarchies

| From | To | What is carried forward | Mechanism |
|---|---|---|---|
| Athlete (§3.1) | assigned Session (§3.2) | Team/group scope that made the assignment valid | O-04 PlanAssignment resolved at open time, not cached |
| Session (§3.2/§3.3) | its recording | the Session's identity as a *contextual link* only — **never** a visibility grant (`SessionAttachment` ≠ `VaultGrant`) | O-11's `SessionAttachment` child record |
| Recording (§3.4) | analysis project | the source artifact's id and **current** visibility (re-checked, never assumed) | O-16 references O-11 by id; opening fails if visibility has since changed |
| Finding (§3.4) | clip or report | the bounded selection only — the parent project's other content does not travel with it | O-17 carries selected clip/note ids, not a project reference the recipient could browse |
| Team (§3.1) | Event Group → athlete | the management-scope chain used to authorize the view | O-04 Assignment resolved fresh at each authorization check |
| Athlete (§3.1) | personal Vault (§3.7) | nothing from §3.1 at all — Vault access is **never** derived from Team/group membership (invariant #8); this row exists specifically to record that no context *should* carry here |
| Planned Session (§3.2) | Session Execution → Performed Work Log (§3.3) | the `PrescriptionVersionMarker` — an immutable pointer to exactly which prescription version was executed against, frozen even if the Session is later modified | domain-model §4.1 |

---

## 4. Destination map

Columns: **Type** = primary / secondary / contextual / modal / administrative. **Roles** lists who can reach the destination at all (content within is further narrowed per §2/§5).

### 4.1 Identity, Team, and administration

| Destination | Label | Purpose | Roles | Parent context | Primary objects | Primary actions | Contextual links | Entry points | Exit/return | Empty/denied/offline/unavailable | Type |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D-00 | Welcome / Sign in | Authenticate, create first Team or accept an invitation, age gate | prospective + returning users | none (pre-Team) | O-01 | sign up, sign in, recover, accept invite | → D-01 on success | cold launch | → D-01 or a "create/join a Team" empty state | under-13 → hard reject; locked-out → recovery path; offline → cached-session auto-continue where valid | modal-at-launch |
| D-01 | Today | Role-appropriate daily landing: what's due, what needs attention | all | active Team | O-06 (assigned), O-07/O-08 (today's), O-09 (conflicts), O-13/O-21 highlights | open today's session/workout, resolve a flagged item | D-03, D-04, D-05, D-28, D-13 | app launch (after Team resolved), Team switch | n/a (root) | empty Team → first-run prompt; offline → last-synced view + honest staleness marker | primary |
| D-02 | Team | Browse the org hierarchy and roster | all (scope-limited) | active Team | O-02, O-02a, O-02b, O-03 | view roster, open a group, open a person | D-23, D-09 (message), D-15 (Head Coach) | sidebar/tab | D-01 | new Team → first-run prompt; scope-limited rows never shown | primary |
| D-23 | Person Detail | One member's PR-03-resolved profile view (athlete or coach) | all (scope-limited per viewer) | D-02, D-10, D-09 | O-05, O-03 | view resolved profile, message, (coach viewing an athlete: open performance/media in scope) | D-09 ("Message" action), D-10 (in-scope performance) | tap-through from a roster row, a message participant, or a performance row | the parent list that was tapped from | a removed/out-of-scope subject resolves to display-name-only per PR-03, never an error that reveals more | contextual |
| D-15 | Team Administration | Configure the Team: invite, assign roles/groups, settings, closure, tier-state display | Head Coach only (Event Coach: none of this) | D-02 | O-02, O-03, O-04, O-29 | invite, assign, toggle `personal_workouts_allowed`, close Team | D-16 (report path for admin misuse — n/a), D-19 | from D-02 via a clearly separated "Administration" entry, never inline with roster browsing | D-02 | empty roster → "invite your first member"; closure is a distinct, confirmation-gated sub-area, never one tap from the settings list; **a closure attempt while an active `PreservationHold` (A33) covers any Team content is blocked with the reason stated, per the IT-09 fail-safe (domain-model §7.3) — never a silent failure or a bypassable confirmation** | administrative |
| D-18 | Team Switcher | Move between Teams the Account belongs to; create a new Team | multi-Team users (available to all, meaningful for multi-Team) | global chrome | O-01, O-02 | switch, create new Team | D-01 (post-switch) | persistent chrome control | previous destination, re-scoped to the new Team | single-Team user → switcher shows one Team + "create new"; a Team the user left disappears silently, no error | modal |
| D-14 | Settings | Own profile, notification preferences, account, sign-out | all | global chrome | O-05 (own), O-22 | edit profile, edit notification prefs, sign out | D-19 | persistent chrome control | previous destination | n/a | secondary |
| D-19 | Data Export & Deletion | Self-service export/deletion of own data | all (self only) | D-14 | O-25, O-01 | export, request deletion | D-20 (broader/guardian requests) | from D-14 | D-14 | deletion under an active preservation hold → blocked with the reason stated | secondary |
| D-20 | Assisted Data-Subject Request | Route a broader or guardian-initiated request to manual D04 handling | all (self-service submit); fulfilled by D04, not modelled here | D-19 | O-27 | submit a request | none (hands off outside product navigation) | from D-19 | D-19 | always available; no self-service guardian portal exists (F-P-11 Post-MVP — **not modelled** beyond this handoff) | contextual |

### 4.2 Planning, execution, and personal training

| Destination | Label | Purpose | Roles | Parent context | Primary objects | Primary actions | Contextual links | Entry points | Exit/return | Empty/denied/offline/unavailable | Type |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D-03 | Plan | Author and manage the training-plan hierarchy | Coach (scope-limited for Event Coach) | active Team | O-06, O-06a | author, duplicate, assign, modify | D-22, D-04 | sidebar/tab | D-01 | empty → first-run prompt; Athlete has no D-03 at all (their planned work appears via D-01/D-04) | primary (coach) |
| D-22 | Session Detail | The single Session's full record: prescription, execution, logs, history | Coach (author/assign) + Athlete (own log) | D-03, D-04, D-01, D-10 | O-06, O-07, O-08 | modify (coach), log/correct (athlete) | D-28 (if conflicted), D-24 (attached media) | tap-through from any parent | the parent that was tapped from | unassigned/removed → "no longer assigned to you" | contextual |
| D-04 | Practice | Run or execute today's session | Coach (run) + Athlete (log) | active Team | O-07, O-08 | start, record attendance, log results, finalize | D-22, D-28 | D-01, D-03 | D-01 | never-synced Session offline → honest error, not fabricated content | primary |
| D-28 | Reconciliation Center | Resolve offline-sync conflicts | Coach (session/attendance) + Athlete (own log) | D-01, D-04 | O-09 | review, resolve | D-22 | badge/banner from D-01/D-04 | the affected D-22 | "no conflicts" empty state; a departed-athlete conflict shown to the coach only, flagged not auto-resolved | contextual |
| D-05 | Personal Workouts | Athlete's self-directed training | Athlete only | active Team | O-10 | create, log, edit, delete, correct, export | D-19 (export) | D-01 | D-01 | `personal_workouts_allowed = false` → existing items visible, creation blocked with reason | primary (athlete) |

### 4.3 Media, Vault, and analysis

| Destination | Label | Purpose | Roles | Parent context | Primary objects | Primary actions | Contextual links | Entry points | Exit/return | Empty/denied/offline/unavailable | Type |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D-06 | Media | Capture/import and manage one's own media library | Coach + Athlete | active Team | O-11, O-12 | capture, import, attach, tag, manage access | D-24, D-08 | sidebar/tab | D-01 | empty → "record or import your first clip" | primary |
| D-24 | Media Detail | One artifact's full record: attachments, tags, grants/shares, publication state | owner (full) + authorized viewers (scoped) | D-06, D-07, D-08 | O-11, O-12, O-13, O-14, O-15 | tag, grant, share, publish (if active), delete | D-07 (recipient's own copy of the access relationship), D-08 | tap-through | the parent | revoked/deleted → "no longer available"; publish inert unless F-22 active | contextual |
| D-07 | Vault | An athlete's items granted or shared to them | Athlete only | active Team | O-11 (via O-14/O-15) | view, open in analysis (if permitted) | D-26 | sidebar/tab | D-01 | "nothing shared with you yet" | primary (athlete) |
| D-08 | Analysis | One's own analysis projects | Coach + Athlete | active Team | O-16 | start, open, save | D-26 | sidebar/tab, D-06/D-07 "Analyze" action | D-01 | empty → "no analysis yet" | primary |
| D-26 | Analysis Workspace | Annotate, clip, compare, deliver feedback | the project's author | D-08 | O-16, its children, O-17 | annotate, clip, compare, deliver feedback | D-21 (recipient side) | from D-08 or an "Analyze" contextual action | D-08 | source no longer visible → denied, not degraded | contextual |
| D-21 | Feedback | Received coaching feedback | Athlete only | active Team | O-17 | view delivered clip/note | D-26 (author-only, not reachable from here) | D-01, D-13 | D-01 | "no feedback yet" | secondary (athlete) |

### 4.4 Communication, safety, and system

| Destination | Label | Purpose | Roles | Parent context | Primary objects | Primary actions | Contextual links | Entry points | Exit/return | Empty/denied/offline/unavailable | Type |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D-09 | Messages | Channels + private threads | all | active Team | O-18, O-19, O-20 | read, compose, attach | D-25, D-02/D-23 ("Message" action) | sidebar/tab | D-01 | empty channel → "no messages yet"; unassigned → channel disappears | primary |
| D-25 | Channel/Thread Detail | One conversation's full history | its members | D-09 | O-19/O-18, O-20 | compose, attach, block/report | D-16, D-24 (attachment source) | tap-through | D-09 | blocked → read-only except safety messages | contextual |
| D-16 | Report & Block | File a report or manage a block, deliberately separate from ordinary browsing | any member | reachable from any person/content overflow action | O-21 (Report Case), O-22 block relationship | report, block, unblock | D-09 (effect visible there) | overflow ("…") menu on any person/message/media, never a primary tab | the origin destination | always available regardless of role/tier/group; a Head-Coach-implicated report is routed away from Team leadership silently to the person filing it (they are told it was escalated, not shown the routing mechanics) | administrative/modal |
| D-13 | Notifications | Received notifications (safety/operational/social) | all | global chrome | O-22-adjacent notification feed | read, act (deep-link into source) | every underlying object's destination | persistent chrome control | previous destination | empty → "no notifications" | secondary |
| D-10 | Performance | History, metrics, PBs | Athlete (own, full) + Coach (in-scope) | active Team | O-08 (via read-model), O-10, O-23 | view, filter | D-11, D-22 | sidebar/tab | D-01 | "not enough data yet"; scope-narrowed coach loses an athlete's row on next check | primary |
| D-11 | Reports | Generate/view reports; group/Team reports if active | Athlete (own) + Coach (own/group, scope-limited) | D-10 | O-24 | generate, view | D-19 (export), D-27 | from D-10 | D-10 | group/Team reports inert unless F-33 active; a scope-exceeding request rejected before generation; **the coach-initiated external-export slice of a minor's identifiable data (F-34-cond) is a distinct, separately-gated sub-capability of "generate/view" — inert until D04/legal resolves `OQ-PF-MINOR-EXPORT`, never bundled into ordinary athlete self-export (D-19)** | secondary |
| D-27 | Group/Team Report Detail | One generated group/Team report *(conditional)* | Coach | D-11 | O-24 | view, export within scope | D-19 | from D-11 | D-11 | inert while F-33 inactive | contextual |
| D-17 | Platform Safety Console | Moderation, escalation, under-age, illegal-content, and hold administration | Platform Safety Administrator **only** | **none — a separate navigation root, outside every Team hierarchy** | O-21, O-26, O-28, preservation holds | review, determine, hold/release, escalate | none into ordinary Team surfaces (least-privilege; the PSA acts on case artifacts, not by browsing Team content) | PSA sign-in (never reachable from a Team-scoped session) | n/a (its own root) | a durable severity-ordered queue; never empty-styled away — "queue clear" is stated, not implied by an empty screen indistinguishable from a loading state | administrative (separate root) |

### 4.5 System-state surfaces (denied, unavailable, offline, queued, conflict, recovery)

**Why these are states, not destinations.** A denial, an outage, or a queued write is
something a *destination enters*, not somewhere a user navigates to. Minting
`D-NN` entries for them would misrepresent the information architecture (a user
never "goes to Denied"), would create destinations Step 4 must place in chrome,
and would collide with the rule in §2 that every entry is **object + task**.
They therefore carry their own `X-N` namespace. The one genuine exception is
**conflict**, which additionally owns a real destination — **D-28 Reconciliation
Center** — because resolving a conflict *is* a task performed on an object.

| ID | State | Trigger | Required content | Never does | Owning destination(s) | Recovery path |
|---|---|---|---|---|---|---|
| **X-1** | **Empty** | the viewer is authorized and the authoritative set is genuinely zero | names *why* it is empty and the next action, where one exists for that role | never shown when the real cause is a denial, an outage, or an unsynced cache — those are X-2/X-3/X-4 | every list-bearing destination (D-01…D-11, D-13, D-15, D-21, D-22, D-24, D-25, D-27, D-28) | n/a — the state is correct |
| **X-2** | **Denied** | authorization refuses the object or action at the authoritative check | a neutral refusal naming the boundary in the user's terms ("You don't manage this group"), never the policy internals | **never reveals that a hidden object exists**; never a lock icon or greyed placeholder that confirms existence; never distinguishable from "not found" where the object type's ordinary browsing would not already reveal the distinction (§6, §7) | any scope-bearing destination; every object's "Restricted/denied state" row in §2 | return to the last authorized destination (§6 back behavior) |
| **X-3** | **Unavailable** | the object existed for this viewer and no longer does — deleted, revoked, moved, or scope-narrowed | one of the four §6 deep-link outcomes: "This no longer exists" / "You no longer have access to this" / resolved-to-new-location / neutral denial | **Vault items collapse deletion and revocation into one neutral message** — D-07 must never confirm whether an artifact still exists elsewhere (§2.3) | D-07, D-22, D-24, D-25, D-26, D-23, D-27 | return to the parent list, with the stale row already dropped |
| **X-4** | **Offline** | no connectivity; the destination is rendering last-synced authoritative state | an explicit staleness marker; for search, the stated limitation "search is limited while offline" (§7) | never fabricates a shell for content never synced to this device — that fails honestly; never presents a partial local index as a complete result set | every cached-readable destination (D-01…D-11, D-13, D-21, D-22, D-24, D-25) | automatic on reconnect; no user action required |
| **X-5** | **Queued** | an offline-capable write succeeded **locally only** | the O-30 vocabulary — `Saved on this device` / `Uploading…` / `Synced` / `Needs attention`, plus the chrome-level aggregate indicator | **"Saved on this device" is never worded or styled as "Saved"** (invariant 13); a queued grant, publication, attachment, or message is never rendered as effective; a queued grant **loses** to a concurrent revoke | D-03 (draft authoring — §2.2 O-06), D-04, D-05, D-06, D-09, D-22, D-24, D-25 (every offline-capable write surface) | reconciliation on reconnect → X-6 if divergent, otherwise `Synced` |
| **X-6** | **Conflict** | reconnect detects a divergence that cannot merge without loss | both sides preserved and attributed; the `as executed — version changed` marker persists permanently, not only during the conflict | never last-write-wins; never silently drops a departed athlete's conflict (it is held and flagged to the coach); **never absent a badge** — for this state alone, no signal is itself the defect | **D-28 Reconciliation Center** (a real destination), surfaced as a badge/banner from D-01 and D-04 | the user resolves at D-28 → returns to the affected D-22/D-04. **Gate:** the INC-3a execution surface is not externally exposed until INC-3b delivers this state (§1.9) |
| **X-7** | **Recovery** | an authorization or session precondition lapsed mid-use, or a terminal failure occurred | names what lapsed and the single next action — re-authenticate, switch Team, retry, or contact support | never silently re-authenticates into a different Team context; never continues displaying content that became unauthorized mid-session (it degrades to X-2); never drops a permanently failed upload without an audited, retryable record | D-00 (session expiry), D-18 (wrong-Team link), D-06/D-24 (failed upload/processing), D-13 (terminal safety-notification failure → human escalation, S-04) | re-auth → resume at the last meaningful destination **within the current active Team**, re-validating scope before rendering (§6 resume behavior) |

**Cross-cutting rules.**

- **States are mutually exclusive in presentation.** A destination renders exactly one of X-1…X-7 at a time; where two could apply, the **more restrictive** wins (X-2 denied outranks X-1 empty; X-3 unavailable outranks X-4 offline), so a boundary is never softened into an outage.
- **No state leaks existence.** X-2 and X-3 obey §7's counting rule: no rendered count, badge, or summary may include an object outside the viewer's authorized visibility.
- **Every state is role-aware.** The same underlying condition can be X-1 for a Head Coach and X-2 for an Event Coach; §2's per-object rows are authoritative for which.
- **Step 4 owns placement, not meaning.** The navigation specification decides where a banner, badge, or full-screen state appears; the wording obligations, the never-does column, and the recovery path above are IA-owned and may not be weakened downstream (§11 N-3).
- **Accessibility.** Every state marker above is subject to the §2 convention — a non-colour, VoiceOver-accessible textual label; sync and conflict state is never communicated by colour or icon shape alone (S-12). **Entering or leaving any of X-1…X-7 is a state *change*, not only a static label:** the transition must be announced to assistive technology (an accessible status/live-region announcement) so a VoiceOver user learns that a write went queued, that a conflict appeared, or that a session lapsed without having to re-explore the screen. The IA fixes this obligation; the announcement mechanism and wording are Step 4 / Step 5 work (§11 N-3).

*Machine-checked:* the validator asserts all seven `X-N` states are defined with a non-empty owning-destination set, and that **D-28** is the destination backing X-6.


Every approved MVP destination above is reachable — proven in §9 (findability validation) and enforced by `validate-step3-4-artifacts.mjs` (every `D-NN` referenced in §1.8 exists in §4).

---

## 5. Role-based discoverability

### 5.0 Method — complete coverage by construction

`mvp-release-scope.md` §7.1 already proves, machine-checked, that every MVP-required user-facing feature and supporting capability appears in at least one of journeys **J-1…J-13**, and that those 13 journeys collectively exercise all 16 invariants. Rather than re-deriving a separate, potentially inconsistent walkthrough set, this section performs the required **locate → identify → open → relate → complete → return** IA walkthrough directly on J-1…J-13, from each journey's primary role. Because §7.1's coverage is exhaustive and machine-checked, this is complete coverage of every approved MVP capability, not a sample. **[modelled]** — this equivalence is the specific IA-owned decision recorded in §1.6 by reference (no new ID needed; it is a method choice, not an open question).

### 5.1 Walkthroughs (J-1…J-13)

| Journey | Primary role | 1. Locate | 2. Identify | 3. Open | 4. Relate | 5. Complete | 6. Return |
|---|---|---|---|---|---|---|---|
| J-1 Stand up a Team | Head Coach | D-00 → D-15 | Team name + role badge shown immediately on creation | D-15 roster/groups | link invitees to O-02a/b via O-04 | Team created, hierarchy built, coach + athletes invited/assigned, `personal_workouts_allowed` set | D-01 |
| J-2 Plan and assign a cycle | Head/Event Coach | D-03 | breadcrumb `Season ▸ Block ▸ Week ▸ Session` + author identity | O-06 detail (D-22) | duplicate carries scope-narrowing; assignment carries into D-04/D-01 for athletes | Session authored, duplicated, assigned, modified; in-progress log preserves its version marker | D-03 |
| J-3 Offline practice + log | Coach + Athlete | D-04 (coach starts; athlete sees it on D-01) | Session identity + attendance state | D-04 live view / D-22 for logging | conflict routes to D-28; correction stays on D-22 | practice run, logged, finalized, reconciled, corrected | D-01 |
| J-4 Personal workout | Head Coach (toggle) + Athlete | D-15 (toggle) / D-05 (use) | "Personal" chip distinguishes from coach-assigned work | D-05 | none (structurally isolated, §3.3) | created, logged, setting flipped off/on with data preserved throughout | D-01 |
| J-5 Capture/tag/share media | Coach | D-06 | ownership + visibility-reason indicator | D-24 | attach (contextual, no visibility change) → tag (identification) → grant (D-07 for recipient) | recorded, attached, tagged, granted, revoked | D-06 |
| J-6 Analyse + deliver feedback | Coach + Athlete | D-08 (coach) / D-21 (athlete) | project privacy state / feedback sender+date | D-26 | source O-11 link preserved without widening it; delivered item links back to nothing browsable for the recipient | annotated, compared, saved, delivered, received | D-08 / D-21 |
| J-7 Communicate | all | D-09 | channel scope label / thread participants | D-25 | attachment routes through the stricter transition (§3.5) | channels used, private thread held, attachment formalized, quiet hours respected without silencing safety | D-09 |
| J-8 Report, block, escalate | any member + Platform Safety Admin | D-16 (member) / D-17 (PSA) | report/case identity, never the routing mechanics exposed to the reporter | D-16 modal / D-17 case detail | Head-Coach-implicated case bypasses Team leadership invisibly to the filer | reported, blocked, escalated, illegal content preserved + routed | origin destination / D-17 queue |
| J-9 Discovered under-age | Platform Safety Admin + account owner | D-17 (PSA) / account owner sees a fixed "under review" state (§2.1 O-01) | case state (`restricted_pending_review` etc.) | D-17 case detail | none exposed to the account owner beyond the fixed state | restricted, determined, closed or restored | D-17 |
| J-10 Review performance, take data | Athlete + Coach | D-10 | scope-limited row set for the coach | D-22/D-27 detail | export links to D-19 audit trail; DSR to D-20 | reviewed, reported, exported, deletion requested (hold-aware) | D-10 |
| J-11 Close a Team | Head Coach | D-15 | Team status chip (`active`/`closure_pending`/`archived`) | D-15 closure sub-area | athlete-owned data confirmed retained per §3.6 | transferred or closed, archived, recoverable, then finalized | D-18 |
| J-12 Multi-Team isolation | multi-Team user | D-18 | active Team name always in chrome (§7 context markers, Step 4) | (re-enter D-01 under the new Team) | **no** relate step carries anything across — this is the point of the journey | switched, offline draft stayed bound to its origin Team, removed-Team access fails closed | D-01 (new Team) |
| J-13 Entitlement cannot widen authorization | all + system | D-15 (tier-state visible, O-29) | "Team plan: `<tier>`" label, never adjacent to any permission control (§2.5 non-negotiable rule) | n/a — there is nothing to open, because no feature reads this value | none — by design, nothing relates to it | identical authorization results at every tier value; build-time check confirms no path exists to consume it | D-15 |

### 5.2 Privacy-safe discoverability rules (applied throughout §2/§4/§5)

- An out-of-scope athlete never appears in an Event Coach's roster, search results, "recent" list, or notification feed (§2.1 O-03/O-04, §7).
- A removed/departed member's historical content (plans, sessions) is never deleted, but the *person* disappears from active rosters/channels/switchers immediately (§2.1, §3.9).
- A revoked Vault item leaves D-07 cleanly — no "you used to have access" ghost entry (§2.3 O-14/O-15).
- The Platform Safety Administrator's queue (D-17) never exposes a case's routing decision (e.g., "this bypassed Team leadership") to anyone outside D-17 (§5.1 J-8/J-9).
- A blocked party sees the thread go read-only with no separate "you have been blocked" broadcast beyond the natural absence of new activity (baseline §5; avoids retaliation risk).

---

## 6. Cross-linking and return behavior

| Concern | Rule |
|---|---|
| Object-to-object links | Every link in §2/§4 is **id-based and re-resolved at open time** against current authoritative visibility/scope — never a cached label that could go stale and leak or mislead (contract 7/8 pattern extended to IA). |
| Context preservation | Moving along a §3.9 context-retention pair carries forward only the named field(s); nothing else is implicitly carried (e.g., opening a recording from a Session carries the Session's id as a contextual link, never as a visibility grant). |
| Back behavior | Back always returns to the destination the user actually came from (§4 "Exit/return" column), not a fixed hierarchy position — matters when the same detail (e.g., D-22 Session Detail) is reachable from three different parents. |
| Close behavior | A modal (D-00, D-18, D-16) closes to whatever was behind it; closing never navigates forward. |
| Resume behavior | A cold-launch or backgrounded-and-returned session resumes at the last meaningful destination within the *current* active Team, re-validating scope/visibility before rendering (never trusting suspended-state cache for authorization-sensitive content). |
| Recent-item behavior | A "recent" list (if implemented in Step 4) is filtered through the same authorization check as the object's normal destination — an item that became inaccessible since it was "recent" is silently dropped from the list, never shown as a broken/greyed entry that would confirm it still exists. |
| Deep-link resolution | Every deep link re-resolves current authoritative state at open time (§2 per-object "Deep-link eligibility" rows). A link into a **deleted** object shows "This no longer exists." A **revoked-access** link shows "You no longer have access to this," distinguishable from deletion only where the object type's own browsing UI would already reveal that distinction (e.g., a roster row already shows "removed"); Vault items intentionally collapse both to one neutral message, since Vault access must never confirm whether an artifact still exists elsewhere (§2.3). A **moved** object (e.g., a re-assigned Session) resolves to its current location. An **inaccessible** target (scope narrowed since the link was created) shows the same neutral denial as a non-member would see. |
| Cross-Team links | A link generated under one Team is invalid under another; opening it while the wrong Team is active prompts a Team switch if the target Team is one of the Account's memberships, otherwise resolves as inaccessible (never silently switches Team context without the user's action — that would violate J-12's isolation guarantee). |
| Role-change behavior | A role/scope change (assignment, removal, Head-Coach transfer) invalidates the affected destinations on the **next authoritative check**, not merely at next app launch; a currently-open screen that becomes unauthorized mid-session degrades to a denial state rather than continuing to display stale content. |
| Offline deep links | A deep link opened offline resolves against the last-synced authoritative state with an explicit staleness marker; an offline deep link into content that was never synced to this device fails honestly ("not available offline") rather than fabricating a shell. |
| Unsynchronized local objects | A locally created, not-yet-synced object (a draft Session, an offline personal-workout log, a queued message) is fully navigable **on the originating device only**; it does not appear in any cross-device "recent" or search result until synced, and its pending state is always visibly marked (§2.5 O-30). |

---

## 7. Search and filtering model

This is the **information-level** model; ranking implementation and index technology are Department 03 work (SKILL boundary).

- **Searchable object types:** O-02a/O-02b (groups), O-03/O-05 (people, by display name/role), O-06/O-06a (plans/templates, by the authoring coach), O-11 (media, by owner within their own library; by recipient within their resolved Vault), O-16 (analysis projects, by author), O-18/O-19 (conversations, by participant/channel name), O-24 (reports, by requester). **Not searchable by anyone:** O-01 raw accounts, O-08/O-10 by a coach beyond their scope, O-14/O-15 by anyone but the two parties, O-21/O-26/O-28 governance cases (only D-17 for the PSA).
- **Role and Team scoping:** every search executes **inside the active Team context only** (never cross-Team — J-12) and **only over the set of objects the searcher could already see individually through ordinary navigation** — search is a convenience index over existing authorization, never a bypass of it (SKILL anti-pattern: "search used to hide missing hierarchy," inverted here to "search must not reveal what hierarchy already hides").
- **Search entry points:** a persistent search affordance in the navigation chrome (Step 4 §2/§7), reachable from D-01/D-02/D-06/D-09/D-10 without being a consumed primary tab slot (IA-OQ-2).
- **Query context:** search defaults to the destination it was launched from (searching from D-09 defaults to conversations, from D-06 to media) but can be widened to "everything I can see" explicitly — the default never silently narrows in a way that hides a result the searcher is authorized to see.
- **Filters and facets:** role (for rosters), group/scope, date range, media tag/attachment presence, sync state (`Needs attention` per O-30), read/unread (messages/notifications).
- **Recent searches:** included in MVP as a per-device, per-account, per-Team list; cleared on sign-out; never synced across devices (avoids leaking a search history across a shared/borrowed device).
- **Empty results:** "No results" is identical in wording and presentation whether zero matching objects exist or the searcher simply lacks access to any matches — this is the deliberate, required behavior (never a distinguishable "results exist but are restricted" state, which would itself leak existence).
- **Restricted results:** per the rule above, a restricted object is **filtered out entirely**, not shown with a lock icon or placeholder — the one narrow exception is an object whose *bounded* existence is already visible through ordinary browsing (e.g., a roster already shows a departed member's row as "removed" per §2.1); search never introduces a new leak that ordinary navigation didn't already have.
- **Offline search limitations:** search operates over the last-synced local index only; results carry a staleness indicator; a query for content that exists server-side but never synced to this device returns no result, and this is stated ("search is limited while offline") rather than presented as a complete result set.
- **Index freshness communication:** the same O-30-style honesty applies — a stale index is marked, never silently treated as current.
- **Cross-object result labeling:** every result names its object type and immediate parent context (e.g., "Session · Week 4 · Sprint Group"), so a result never reads as ambiguous about which hierarchy (§3) it belongs to.
- **Navigation from results:** tapping a result opens the object's normal destination (§4) with the same context/return behavior as any other entry point (§6) — search is never a separate, parallel navigation universe.
- **Privacy and authorization requirements:** re-stated for emphasis — a query must never be usable to enumerate the existence of an out-of-scope athlete, a revoked media item, a blocked person's content, or a governance case. **This extends to any rendered count** (e.g., a roster "12 members" total, a channel's member count, a "3 results" search summary): a count must never include an object/person outside the viewer's authorized visibility, since an inflated or changing count is itself enough to let a viewer infer a hidden member/object exists (D04 finding D04-IA-N2). This is the single highest-priority rule in this section and is explicitly checked in §9 and by the D04 review (§10).

---

## 8. Platform continuity

### 8.1 Platform sources consulted (current Apple guidance; access date 2026-09-11)

| Source | URL | Used for |
|---|---|---|
| Apple HIG — Navigation and search | `https://developer.apple.com/design/human-interface-guidelines/navigation-and-search` | flat vs hierarchical navigation patterns; tab bar (iPhone) vs sidebar (iPad) as the root-level pattern for the same information |
| Apple HIG — Tab bars | `https://developer.apple.com/design/human-interface-guidelines/tab-bars` | iPhone tab-count guidance (3–5 recommended; a few more tolerated on iPad) — informs §4's primary-destination count and IA-OQ-2 |
| Apple HIG — Split views | `https://developer.apple.com/design/human-interface-guidelines/split-views` | iPad: prefer a split view over a tab bar; avoid more than two hierarchy levels *inside the sidebar itself*, pushing deeper hierarchy into the supplementary/content column | 

These are consulted here to ground the **information model's** platform continuity claim (object identity is stable; structural depth may differ) — the concrete shell decision (which destinations become sidebar sections vs. tabs vs. supplementary-column lists) is Step 4's to make against this same sourcing.

### 8.2 Continuity rule

Object names, ownership, relationships, and meaning (§2, §3) are **identical** on iPad and iPhone. What differs is **density and depth**:

- **iPad** (primary target, baseline §1): current Apple guidance favors a split view over a tab bar at this size class, which supports showing more of the §4 primary-destination set concurrently (sidebar + list + detail) without collapsing any into a secondary menu.
- **iPhone**: current guidance recommends 3–5 tab-bar destinations; StrideLab has more than five §4 *primary*-type destinations (D-01, D-02/D-15 combined under Team, D-03, D-04/D-05, D-06/D-07/D-08, D-09, D-10/D-11). iPhone therefore carries **greater navigation depth** (some primary destinations on iPad become one level deeper on iPhone, reached via a "More" or grouped tab) while every object keeps the same name, owner, and relationships — this is the explicit trade the task authorizes ("iPhone may use greater navigation depth while preserving the same domain meaning"). The exact grouping is a Step 4 decision informed by this constraint.
- **Web / internal admin:** out of MVP scope (F-P-14) — no continuity rule is defined because no such surface exists in v1.

### 8.3 What must never differ across platforms

- Which role can reach which destination/object (§2, §4) — a capability visible to an Event Coach on iPad is visible to the same Event Coach on iPhone, never platform-gated.
- The meaning of a status chip, visibility-reason indicator, or empty/denied state wording (§2, §6).
- The Platform Safety Administrator's separation from the Team-hierarchy navigation root (§4, D-17) — this is a structural rule, not a layout choice, and holds on every platform the console ships on.

---

## 9. Findability validation

| # | Scenario | Result | Evidence |
|---|---|---|---|
| 1 | Head Coach locates an Event Group athlete and assigns approved work | **PASS** | D-02 → O-02a/b roster → D-03 assign (§4.1, §4.2, §5.1 J-2) |
| 2 | Event Coach locates an assigned athlete without seeing management controls for other Event Groups | **PASS** | §2.1 O-02a/b role-based visibility explicitly denies edit outside assigned scope; roster rows outside scope are absent, not disabled (§5.2) |
| 3 | Athlete locates assigned training and logs work | **PASS** | D-01 → D-04/D-22 (§5.1 J-3) |
| 4 | Athlete locates tagged or explicitly shared Vault media | **PASS** | D-07, resolved solely from O-14/O-15 (§2.3, §3.7) |
| 5 | Coach moves from a Session to its recording and analysis | **PASS** | §3.9 context-retention row "Session → its recording"; D-22 → D-24 → D-26 |
| 6 | User switches Teams while preserving role boundaries | **PASS** | D-18; §5.1 J-12; §6 cross-Team-links rule |
| 7 | Empty Team or Event Group | **PASS** | §2.1 O-02/O-02a/b empty-state rows; §4.1 D-02/D-15 empty behavior |
| 8 | Permission denied | **PASS** | §2 "Restricted/denied state" row present on every object; §6 role-change-behavior rule |
| 9 | Object removed or access revoked | **PASS** | §6 deep-link-resolution rule (deleted vs revoked vs moved vs inaccessible, each named) |
| 10 | Offline discovery | **PASS WITH CONDITIONS** | §6 offline-deep-links rule and §7 offline-search-limitations rule both hold, but the *exact* on-device index freshness threshold is a D03 implementation decision not fixed here — condition: D03 confirms an acceptable staleness window at G4 (tracked as IA-OQ-1-adjacent, folded into existing `mvp-release-scope.md` D03 conditions, no new OQ created) |
| 11 | Unsynchronized local object | **PASS** | §6 "unsynchronized local objects" rule; §2.5 O-30 |
| 12 | Failed deep link | **PASS** | §6 deep-link-resolution rule covers deleted/revoked/moved/inaccessible/offline-never-synced explicitly |
| 13 | Backtracking to the originating context | **PASS** | §6 back/close/resume rules; §4 "Exit/return" column populated for every destination |

**Overall Step 3 findability disposition: PASS WITH CONDITIONS** (one named, non-blocking, D03-owned implementation-timing condition — scenario 10).

---

## 10. Review disposition summary

Full independent evidence: `stridelab-ai/orchestration/reviews/step3-information-architecture/`. See also the combined Step 3+4 cross-department review, `stridelab-ai/orchestration/reviews/step3-4-cross-department/01-combined-review.md`.

| Reviewer | Disposition |
|---|---|
| `ux-architect` (this artifact's author, self-check against the `information-architecture` SKILL contract) | PASS WITH CONDITIONS |
| `product-experience-lead` | PASS WITH CONDITIONS |
| `domain-workflow-architect` | PASS WITH CONDITIONS |
| Department 04 (authorization/privacy/youth-safety) | PASS WITH CONDITIONS |
| Department 02 (client feasibility) | PASS WITH CONDITIONS |
| Department 03 (search/data feasibility) | PASS WITH CONDITIONS |
| `ux-research-accessibility-reviewer` | PASS WITH CONDITIONS |

Zero BLOCKING findings remain open (§10 of the review files; remediation log in each file's own evidence).

---

## 11. Non-goals

Stated explicitly so a downstream reader cannot infer authority this artifact
does not carry. Each non-goal names who *does* own the item.

| # | This artifact does **not** | Owner / where it is decided |
|---|---|---|
| **N-1** | Design navigation chrome, shells, tab/sidebar structure, gestures, or control microstates | Step 4 — `docs/product/navigation-specification.md` (§1.1 "Does not own") |
| **N-2** | Specify screens, layouts, wireframes, or visual design of any kind | Step 5 MVP Interaction Design, then `visual-ui-design`; **not started** |
| **N-3** | Define per-control interaction contracts — focus order, validation timing, confirmation dialogs, progressive disclosure, retry affordances | Step 5 Interaction Design. §4.5 fixes the **meaning and wording obligations** of each state; it does not fix how a control presents them |
| **N-4** | Specify destructive-action confirmation mechanics | Step 5; invariant 12's authority/reversibility requirements are recorded in §1.10 and §4.1 D-15, not designed here |
| **N-5** | Resolve, convert, narrow, or create any `OQ-*` / `CD-*` item | `WORKFLOW-ARCHITECTURE-v2.md` §9.2 remains the complete OPEN register under its existing owners, every safe default in force |
| **N-6** | Change any product invariant, authorization rule, role definition, or the approved MVP scope | Approved upstream artifacts; a real contradiction is raised as a decision-change request, never edited away |
| **N-7** | Grant athletes planning authority | Athletes have **no D-03**. F-19 personal workouts depend on the Head Coach's Team setting and confer no authoring authority over Team plans (invariant 6; §1.12) |
| **N-8** | Activate billing, tier gating, or F-42 | Option A ships the Free-default **field** plus the S-02 build-time rule only. No feature reads it in v1; F-42/BE-05 awaits a separately approved Department 06 entitlement artifact |
| **N-9** | Authorize external exposure of media or messaging | Gated on INC-9 completion **plus D04 G3 sign-off**; INC-3a additionally gated on INC-3b (§1.9) |
| **N-10** | Define search ranking, index technology, read-model shape, or database schema | Department 03. §7 is the **information-level** model only |
| **N-11** | Model Post-MVP or Excluded capabilities (F-41, F-P-*, F-EX-*) | Out of scope by DR-A4; each is marked `[post-MVP — not modelled]` / `[excluded — not modelled]` where it could otherwise be inferred (§1.4) |
| **N-12** | Model a guardian self-service portal, a web/internal-admin surface, or an athlete-to-athlete sharing path | F-P-11 / F-P-14 / excluded respectively — all Post-MVP or excluded; only the D-20 assisted handoff exists |
| **N-13** | Constitute human approval, a freeze, a legal or compliance sign-off, or any production-release authorization | Diego at G7, via the decision package in `navigation-specification.md` §12 |

---

## 12. Status and provenance footer

**This artifact is a proposal.** No `OQ-*` / `CD-*` item is resolved, converted, or created. No product invariant is changed. No visual design or production code exists here. It becomes the required, version-pinned Step 4 input once its Step 3 gate review (§10, `stridelab-ai/orchestration/reviews/step3-information-architecture/`) shows zero BLOCKING findings — confirmed in this version.

- Canonical path: `docs/product/information-architecture.md` (this file)
- Lifecycle record: `stridelab-ai/project-memory/current-state/information-architecture.md`
- Registry: `stridelab-ai/registry/artifacts.yaml` → `information-architecture`
- Review evidence: `stridelab-ai/orchestration/reviews/step3-information-architecture/`, `stridelab-ai/orchestration/reviews/step3-4-cross-department/`
- Downstream: `docs/product/navigation-specification.md` (Step 4)
