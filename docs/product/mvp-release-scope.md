# StrideLab MVP Release Scope

**Status:** `AWAITING_HUMAN_APPROVAL` — Department 01 Step 2, Phase B. Authored 2026-09-10 by Department 01 Product & Experience (`product-strategist`, skills `product-strategy` + `user-research-usability`), orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md` and executed per `stridelab-ai/departments/01-product-experience/commands/strategy/scope-release.md`.
**Owning Department:** 01 Product & Experience. **Primary specialist:** `product-strategist`. **Department lead:** `product-experience-lead`.
**Upstream (Phase A):** `docs/product/feature-prioritization.md` (`AWAITING_HUMAN_APPROVAL`; Department 01 review PASS WITH CONDITIONS).

This artifact translates the Phase A prioritization into **one governed MVP release scope** and an **ordered implementation sequence**. It is a **proposal**, not an approved decision. No `OQ-*` / `CD-*` item is resolved, converted, or created; every conservative safe default remains in force. No product invariant is changed or contradicted. No navigation, schema, API, or UI is designed.

---

## 1. Provenance & traceability

| Attribute | Value |
|---|---|
| Registry id | `mvp-release-scope` (`stridelab-ai/registry/artifacts.yaml`) |
| Canonical path | `docs/product/mvp-release-scope.md` (this file — one canonical location) |
| Lifecycle record | `stridelab-ai/project-memory/current-state/mvp-release-scope.md` |
| Upstream (approved) | `product-baseline` (APPROVED 2026-09-08), `workflow-architecture` v2 (APPROVED 2026-09-07), `domain-model` (APPROVED 2026-09-10, `main`@`5db47f1`), `architecture-decision` (`ARCHITECTURE.md`, APPROVED) |
| Upstream (proposed) | `feature-prioritization` (`AWAITING_HUMAN_APPROVAL`) — feature IDs `F-*`, `S-*`, `F-P-*`, `F-EX-*` are defined there |
| Application map consumed | `stridelab-ai/application-map/bounded-contexts.md`, `cross-context-contracts.md` |
| Downstream consumers | Departments 02, 03, 04, 05, 06; `architecture-reviewer`; `cross-department-reviewer`; every implementation work package for a v1 bounded context |
| Owns | MVP objective, included/conditional/deferred/excluded scope, end-to-end journeys, acceptance criteria, implementation increments, gate entry/exit criteria, MVP-completion definition |
| Does not own | schema, API contract shapes, navigation/IA, billing mechanics, authorization policy, legal interpretations, release-gate outcomes, engineering estimates |

Authoritative inputs inspected: the full §1.1 list in `feature-prioritization.md`, plus `stridelab-ai/orchestration/workflows/feature-delivery.md`, `release-flow.md`, `research-to-implementation.md`; `stridelab-ai/orchestration/phase-gates/gates.yaml` + `gate-execution.md`; `stridelab-ai/orchestration/dependency-graph/departments.yaml`; `stridelab-ai/shared/contracts/REVIEW-CONTRACT.md` + `HANDOFF-CONTRACT.md` + `WORK-PACKAGE-CONTRACT.md`.

---

## 2. MVP objective

**Deliver the smallest coherent StrideLab release that a Head Coach, an Event Coach, and an Athlete can use end to end on iOS/iPadOS — to organise a Team, plan training, execute and log practice offline, capture and analyse practice media, communicate, and review athlete performance — with every approved safety, authorization, privacy, youth-safety, offline-honesty, and architectural invariant preserved and independently verifiable.**

The release is **not** a UI shell: a capability counts as delivered only when its domain behaviour, authorization enforcement, persistence, synchronization, and acceptance evidence are all present (`scope-release` command constraint; §11 completion definition).

**Out of the MVP objective by design:** paid billing; a web client; athlete↔athlete DMs and media sharing; any non-invitation join path; under-13 accounts; automated moderation triage; standing coach↔athlete thread oversight; Event Coach delegation. See §6.

---

## 3. Target users and supported roles

| Role | In v1 | Primary jobs served end to end |
|---|---|---|
| **Head Coach / Team Creator** | Yes — full | Create + structure a Team; invite + assign members; author + assign + modify training plans (Team-wide or any group); run practices; capture/tag/analyse media; grant Vault access; deliver feedback; communicate Team-wide; review performance for any Team athlete; close the Team; first-responder moderation for ordinary reports; sole tier-state authority. |
| **Event Coach** | Yes — full within assigned scope | Author + assign + modify plans for assigned Event Groups/Subgroups; run practices for managed athletes; capture/tag/analyse media within scope; grant/share within scope; deliver feedback within scope; communicate with **any** Team athlete (reach is Team-wide) without that widening any other scope; review performance for currently-managed athletes. |
| **Athlete** | Yes — full | View assigned prescriptions; execute + log practice offline; correct own finalized records (audited); create/log/edit personal workouts where the Team enables it; capture media; view own Vault (granted/shared items only); receive coaching feedback; communicate in group channels + with coaches; review own full history/metrics/PBs; generate + export own reports; report/block any member; self-service account deletion + data export. |
| **Platform Safety Administrator** | Yes — platform actor (D04-owned), not an end-user role | Receive escalations; determine under-age cases; handle illegal-content cases; place/release preservation holds; perform moderation revocation. Least-privilege; outside every Team hierarchy. Staffing/SLA is a production-launch condition (§10, `OQ-PS-MOD-STAFFING`). |
| Guardian / legal representative | Assisted only | A guardian-initiated data-subject request is accepted, logged, and worked **manually** by D04 with legal review (`OQ-PS08-STANDING` safe default). No self-service guardian surface in v1 (F-P-11). |
| Org / billing administrator (distinct from Head Coach) | No | `OQ-BE-BILLING-OWNER` safe default: the Head Coach is the sole billing/tier authority in v1. |

**[assumption]** The primary audience skews 13–17 (baseline age 13+); youth-safety, privacy, and offline-honesty are treated as product constraints, not polish.

---

## 4. Supported devices and platforms

| Dimension | v1 scope |
|---|---|
| Platforms | **iOS and iPadOS** ("iOS-first, iPad-oriented" — baseline §1). iPad is a first-class target (Apple Pencil analysis annotation is a named capability — F-24 / AN-03 — with a required touch fallback). |
| Web client | **Out of MVP scope** (F-P-14; finding P-F-04). `domains/*/web/` scaffold directories do not imply a v1 web surface; a web client is a later D02-owned release decision. |
| Minimum OS versions | Not fixed here — a D02 decision at implementation-design time, constrained by the offline-storage, media-capture, and Apple Pencil capabilities the MVP requires. |
| Offline | **Required** for the execution path (F-14–F-18) and personal workouts (F-19); degrade-to-queue-and-sync for messaging (F-26–F-28); read-from-cache for history (F-31). See §9. |
| Native media subsystem | Permitted per `ARCHITECTURE.md` (a subsystem, not a second product architecture); `services/media-worker` is the one independently-deployable workload (§10, S-06). |
| Federated / SSO sign-in | Out of MVP scope (F-P-15); direct credential + verified-channel proof is the v1 path. |

---

## 5. Included capabilities (MVP required)

All feature records, per-feature acceptance evidence, and the classification method are in `docs/product/feature-prioritization.md` §4. This section is the **scope index**; §12 gives the per-capability acceptance criterion.

**User-facing (30):** F-01 account lifecycle · F-02 Team + hierarchy · F-03 membership/roles/transfer · F-04 multi-Team switching · F-05 group assignment (management scope) · F-06 Team settings + `personal_workouts_allowed` · F-07 Team closure · F-08 profile + PR-03 visibility · F-09 plan-hierarchy authoring · F-10 templates (author-private) · F-11 plan duplication · F-12 plan assignment · F-13 plan modification · F-14 practice execution · F-15 athlete logging · F-16 finalization · F-17 offline session reconciliation · F-18 post-finalization correction · F-20 media capture/library/lifecycle/attach · F-21 media tagging · F-23 Vault grant/share/revoke + VS-04 · F-24 analysis tooling · F-25 coaching feedback · F-26 group channels · F-27 coach↔athlete private chat · F-28 chat attachments (stricter-transition routing) · F-29 report/block/moderation · F-30 notification preferences · F-31 performance & history views · F-32 own-data reports · F-34 data export (athlete self-export) · F-35 age 13+ enforcement · F-36 discovered under-age handling · F-37 DSR intake (assisted) · F-38 illegal-content escalation · F-39 Platform Safety Administrator role + tooling.

**Supporting / platform (12):** S-01 auth + active-Team-context · S-02 authorization & tenant-isolation kernel · S-03 offline/local-first sync substrate · S-04 durable safety-notification capability · S-05 audit-log capability · S-06 media-processing worker (independently deployable) · S-07 media storage + revocation-aware delivery · S-08 preservation-hold / governance safety-enforcement seam · S-11 reporting read-model pipeline (PF-01…04 level) · S-12 accessibility baseline (VoiceOver, Dynamic Type, contrast, hit targets, Apple Pencil + touch fallback, media captions/transcripts posture) · S-13 release readiness (CI, environments, observability, backup/restore, rollback, acceptance-gate harness) · **F-42** entitlement derivation interface + flag-typing discipline (single BE-05 point; emits an all-features-enabled projection in v1).

---

## 6. Conditional, deferred, and excluded capabilities

### 6.1 Conditional capabilities (ship behind a named activation condition)

| ID | Capability | Activation condition | Safe default while inactive |
|---|---|---|---|
| F-19 | Personal workouts | The athlete's Team has `personal_workouts_allowed = enabled` (F-06), checked server-side against the current authoritative value. | Capability present but PW-01/PW-02 blocked; existing records retained; PW-03 correction + export always available. |
| F-22 | Team media publication | D04 approves the per-tagged-minor consent/notice mechanism (`OQ-MD06-AUTHORITY`, `OQ-VS02-MULTISUBJECT`) **and** the Head-Coach publication-authority gate is implemented. **Joint condition with the F-28 group-channel-attachment slice** (finding P-F-02) — activate both together or neither. | Publication **disabled**; multi-subject youth media onward re-share **blocked**; a group-channel media attachment that would broaden visibility is blocked. |
| F-33 | Group / Team reports | D03 confirms an aggregation method that suppresses re-identifying cohorts and aggregates only over individually-visible athletes (`OQ-PF-AGG-METHOD`), **or** D01+D04 explicitly accept the safe default for the group slice; report generated online. | Own-data reports (F-32) ship; group/Team reports unavailable. |
| F-34-cond | Coach-initiated external export of a minor's identifiable performance data | D04/legal resolves `OQ-PF-MINOR-EXPORT` (consent/notice + jurisdiction restriction). | Athlete self-export (F-34) ships; a coach may export only within current scope for in-app use; the external-recipient slice is not a distinct feature. |
| F-40 (gating) | Tier-based feature gating | A D06-approved entitlement artifact defines `OQ-BE-TIER-MAP`. | The tier-state field exists (Free default); nothing is tier-gated; F-42 emits an all-enabled projection. |
| S-09 | Automated DSR cross-context fan-out | D03/D04 design the automated fan-out (per-context erasure-vs-anonymisation, `OQ-DD-RETENTION`, `OQ-PS07-RETENTION`). | F-37 assisted intake routes to owning workflows with manual/assisted coordination. |
| S-10 | Realtime messaging transport | D03 selects a realtime transport (`platform/realtime/`) that passes reliability review. | Messaging delivered on the queue/sync substrate (S-03); no workflow semantics change. |

### 6.2 Explicitly deferred capabilities (Post-MVP)

F-41 paid billing (BE-02/03/04/06 — "no paid billing ships in v1"; needs a separate approved D06 entitlement artifact) · F-P-1 shared template library · F-P-2 Event Coach delegation · F-P-3 VS-02 recipient-analysis rights · F-P-4 athlete self-start · F-P-5 coach override of self-classification · F-P-6 session auto-finalization · F-P-7 coach-facing personal-workout visibility · F-P-8 coach↔athlete thread oversight / guardian visibility / supervised messaging · F-P-9 automated moderation triage & illegal-content classification · F-P-10 proactive age-signal detection · F-P-11 self-service guardian DSR portal · F-P-12 automatic coach-facing RPE flag · F-P-13 athlete self-check-in / cycle promotion / subgroup re-parenting / plan co-authorship handoff · F-P-14 web client · F-P-15 federated sign-in · F-P-16 `archived` soft-retained media state. Each carries a conservative `§9.2` safe default that is an acceptable v1 experience (`feature-prioritization.md` §4 Post-MVP table).

### 6.3 Explicit exclusions (out of the current release)

F-EX-1 athlete↔athlete DMs · F-EX-2 athlete↔athlete media sharing · F-EX-3 open join code/link/queue · F-EX-4 under-13 accounts · F-EX-5 navigation redesign / revoked navigation decisions · F-EX-6 payment state as authorization · F-EX-7 multiple roles for one account within one Team · F-EX-8 coach edit of athlete-owned profile / performed-work truth · F-EX-9 broadening Event Coach data access beyond assigned scope · F-EX-10 tagged/private media Team-visible by default. Each is invariant-mandated or requires a separate new product decision + human approval (`feature-prioritization.md` §4 Excluded table).

---

## 7. End-to-end release journeys

Each journey is achievable end to end by the named roles in v1, preserving every invariant. Journeys reference the feature IDs and the supporting capabilities they exercise.

| # | Journey | Roles | Features exercised | Invariants proven |
|---|---|---|---|---|
| J-1 | **Stand up a Team.** Create account → create Team → build Event Groups + Subgroups → invite a coach and athletes → assign athletes to groups → assign an Event Coach → set `personal_workouts_allowed`. | Head Coach; invitees | F-01, F-02, F-03, F-05, F-06, F-08; S-01, S-02, S-05 | #1 hierarchy; #2 one Head Coach + one role per Team; #3 management scope; #15 reach ≠ scope; #12 audited transitions |
| J-2 | **Plan and assign a training cycle.** Author a Macrocycle → Blocks → Weeks → Sessions (Event Coach within scope; Head Coach anywhere) → save a template → duplicate a prior block → assign a Session to a Subgroup → modify a published Session. | Head Coach; Event Coach | F-09, F-10, F-11, F-12, F-13; S-03 | #5 prescription ≠ performance; #3/#15 scope on authoring + assignment; #11 no navigation; #12 |
| J-3 | **Run an offline practice and log it.** Athlete's device caches the assigned Session → coach starts practice on a track with no signal → records attendance → makes an in-session cut → athletes log results, completion status, RPE → coach finalizes → devices reconnect → a mid-session plan change is reconciled honestly (athlete log kept as executed, version-changed marker) → an athlete corrects a finalized value two days later (audited amendment). | Coach; Athlete | F-12, F-13, F-14, F-15, F-16, F-17, F-18; S-03, S-05 | #4 coach-edit boundary + SE-08 locks structure only; #5; #13 offline honesty, never last-write-wins; #12 |
| J-4 | **Personal workout (Team-enabled).** Head Coach enables `personal_workouts_allowed` → athlete creates and logs a personal workout offline → Head Coach later disables the setting → new creation/execution blocked, existing records retained, athlete still corrects + exports them → re-enable, no data loss. | Head Coach; Athlete | F-06, F-19; S-03 | #6 personal-workout non-elevation + non-destructive disable; #4 |
| J-5 | **Capture, tag, and share practice media.** Coach records a clip (private draft, no upload) → attaches it to today's Session (no visibility change) → tags two athletes (identification only — neither sees it) → grants Vault access to one athlete deliberately (server-confirmed) → the other athlete still sees nothing → coach revokes the grant → the clip leaves that athlete's Vault. | Coach; Athlete | F-20, F-21, F-23; S-06, S-07, S-08 | #7 tag ≠ grant ≠ share ≠ publish; #8 Vault visibility only from an explicit grant/share; #13 (queued offline grant loses to a revoke) |
| J-6 | **Analyse and deliver feedback.** Coach opens a granted clip in analysis → slow-motion + Apple Pencil annotations + a comparison against a prior attempt → saves a private project → shares one annotated clip + note as coaching feedback to a **managed** athlete → the athlete sees exactly that item, not the project → an Event Coach cannot deliver feedback to an out-of-scope athlete even though they can message them. | Coach; Athlete | F-24, F-25, F-23; S-06, S-12 | #15 reach ≠ feedback/analysis scope; #7/#8 (analysis never widens visibility); saving ≠ sharing |
| J-7 | **Communicate.** Team, Event Group, and Subgroup channels (membership derived from assignment) → a coach↔athlete private thread → an attachment in the private thread creates a formal VS-02 record (revocable, audited); an attachment to a Team channel would create an MD-06 publication record and is **blocked** if a tagged minor's consent is missing (F-22 inactive) → a member sets quiet hours; a safety notification still arrives immediately in-app. | All members | F-26, F-27, F-28, F-30; S-04, S-10(cond) | #15; #7 (attachment routes through the stricter transition); #14 safety-notification state model + safety class cannot be disabled |
| J-8 | **Report, block, and escalate.** An athlete reports an inappropriate DM from a coach → because it implicates a coach it bypasses Team leadership to the Platform Safety Administrator → the athlete blocks the coach (DMs stop; shared-channel safety messages still get through; a private report path is offered) → a report of suspected illegal content is preserved under a hold, made inaccessible, and routed past Team-level review. | Any member; Platform Safety Administrator | F-29, F-38, F-39; S-04, S-08 | #14; baseline §5 blocking semantics + restricted telemetry (no auto-punishment, no Team-leadership disclosure); illegal-content bypass + preserve + restrict + route |
| J-9 | **Discovered under-age account.** A report raises a credible under-13 signal → the account is restricted (use stops, data preserved, no irreversible action) → the Platform Safety Administrator determines → confirmed → governed closure with policy-driven data handling; or not substantiated → restriction lifted; a wrong determination → audited restoration. | Platform Safety Administrator; account owner | F-35, F-36, F-01/F-07 (governed-closure mechanics); S-08 | #10 age 13+; restricted-first, never immediate termination; audited restoration |
| J-10 | **Review performance and take your data.** Athlete reviews own full history/metrics/PBs → coach reviews an in-scope athlete's history → after a scope change the coach loses that athlete's identifiable data on the next check → athlete generates an own-season report → exports it as a file (immutable audit event) → requests full account deletion; a preservation hold on some messages makes the DSR `partially_fulfilled` with a recorded reason. | Athlete; Coach | F-31, F-32, F-34, F-01, F-37; S-08, S-11 | #15 current-scope-only + aggregation boundary; #16 DD-DEPARTED-CONTENT; export never expands scope; hold fail-safe |
| J-11 | **Close a Team.** Final Head Coach transfers ownership to a successor **or** initiates closure → members lose access immediately → Team archives (read-only, recoverable) → athlete-owned data confirmed retained with each athlete → after the recovery window, Team-side non-owned data is deleted/anonymised; held content survives. | Head Coach | F-03 (TA-01a), F-07; S-08 | #2 never ownerless; #16 DD-DEPARTED-CONTENT + no cascading deletion; #12 archive-first recoverable-then-irreversible |

**Coverage check:** every MVP-required user-facing feature appears in at least one journey; J-1…J-11 collectively exercise all 16 invariants + baseline §6A. No journey depends on a Post-MVP or Excluded capability. F-22 and the F-28 group-channel-attachment slice appear only in their **inactive** (blocked) form (J-7).

---

## 8. Required domain aggregates, bounded contexts, and cross-context contracts

### 8.1 Bounded contexts in v1 scope (all already mapped — `stridelab-ai/application-map/bounded-contexts.md`; no boundary changes)

`identity` (+ `profile`), `teams`, `training`, `sessions`, `workouts`, `media` (+ `services/media-worker`), `analysis`, `vault`, `messaging`, `performance`, `reporting`, `billing` (D06-owned; minimal in v1), `governance` (D04-owned). Platform capabilities: `platform/auth`, `platform/database`, `platform/entitlements`, `platform/notifications`, `platform/realtime` (conditional), `platform/storage`, `platform/sync`, `platform/observability`.

### 8.2 Required aggregates (domain-model §4; ratified by DR-2)

A1 Account · A2 Profile · A3 Team · A4 Membership (+ assignments) · A5–A8 per-level planning roots · A9 SessionTemplate · A10 PlanAssignment · A11 SessionExecution · A12 PerformedWorkLog (append-only) · A13 ReconciliationRecord · A14 PersonalWorkout · A15 MediaArtifact (+ Tag, SessionAttachment, Publication) · A16 VaultGrant · A17 Share · A18 AnalysisProject · A19 CoachingFeedback · A20 Channel · A21 PrivateThread · A22 BlockRelationship · A23 ReportCase · A24 NotificationPreference · A25 PBRecord · A26 Report · A27 ExportEvent · A28 TeamSubscription (+ `EntitlementSet` derived projection) · A29 EscalationCase · A30 UnderageCase · A31 DSRCase · A32 IllegalContentCase · A33 PreservationHold · A34 SafetyNotification · A35 AuditRecord.

The cross-aggregate invariants requiring a single-transaction guard or a fail-safe ordering rule (domain-model §4.1) are **hard schema-design inputs** for D03 at G4: one-Head-Coach-per-Team; assignments cannot outlive their Membership; DD-DEPARTED-CONTENT disposition; offline pending-vs-durable state; `personal_workouts_allowed` server-side gate; payment ≠ authorization typing; preservation-hold fail-safe precondition; SafetyNotification transactional-outbox; prescribed-vs-performed marker immutability.

### 8.3 Cross-context contract seams consumed (authoritative matrix: `stridelab-ai/application-map/cross-context-contracts.md` — 14 seams, 8 fields each; no seam added or changed)

| Seam | Used by MVP features | v1 obligation / accepted safe default |
|---|---|---|
| 1 Media tag → Vault grant | F-21, F-23 | grantor authority + tag existence server-side; grant conveys exactly one artifact; `OQ-MEDIA-CACHE-INVALIDATION` safe default accepted (server-authoritative + best-effort purge). |
| 2 Media / Vault revocation | F-23 | revoker = grantor or moderation authority; best-effort cache purge; **favour online-validated Vault access over long-lived local cache** (accepted for v1). |
| 3 Analysis → Vault sharing (AN-07) | F-25 | sharer owns the finding AND recipient within current management scope; view-only (`OQ-VS02-RIGHTS`). |
| 4 Messaging → media/Vault access (MG-05) | F-28 | stricter of VS-02 / MD-06; group-channel slice inherits the F-22 block while F-22 is inactive. |
| 5 Performance/reporting → sessions/training/workouts/teams | F-31, F-32, F-33(cond) | source context supplies the viewer's per-athlete visible set; consumer must not aggregate beyond it; personal workouts never visible to any coach; `OQ-PF-AGG-METHOD` safe default in force. |
| 6 Entitlement source of truth (BE-05) | F-42 | consumers read typed feature-availability flags only; **no identity/teams/vault/profile authorization path takes a BE-05 input** (documented, testable rule); v1 emits an all-enabled projection. |
| 7 Identity/Team lifecycle handoffs | F-01…F-08, F-26, F-31 | consumers evaluate against current authoritative state; stale cache never grants broader access; `OQ-DD-RETENTION` / `OQ-IT08-GRACE` safe defaults. |
| 8 Profile visibility resolution (PR-03) | F-08, every member-rendering surface | server-side per-field withholding; DOB/age never in a client cache; `OQ-PR-FIELDS` default-deny. |
| 9 Offline / session reconciliation (SE-09/SE-10) | F-17, F-18, F-31 | reconciliation operates only on already-authorized data; a coach never overwrites an athlete record; `OQ-SE-RECONCILE-UX` (presentation) + `OQ-SE-OFFLINE-P2P` (D03) safe defaults. |
| 10 Durable safety-notification state | F-21, F-22(cond), F-23, F-29, F-36, F-38; S-04 | only the enumerated safety-emitting workflows may create safety-class state; transactional in-app state + retry + idempotent + ack + audited terminal failure + human escalation. |
| 11 Governance safety-enforcement & preservation-hold | F-07, F-20, F-23, F-29, F-36, F-38, F-39; S-08 | only the Platform Safety Administrator places/releases a hold or forces a moderation revocation/account restriction; **holds fail safe** — unconfirmed ⇒ deletion/closure blocked. |
| 12 Data-subject erasure & portability orchestration (PS-05/PS-08) | F-01, F-34, F-37; S-09(cond) | fan-out with per-context outcome + reason; held/dependency-critical data → `partially_fulfilled` with a recorded reason, never a silent skip; v1 fan-out is manual/assisted. |
| 13 Reporting → export egress (PF-06) | F-34 | export never expands the actor's authorized scope; rejected before generation if scope exceeded; immutable audit event; `OQ-PF-MINOR-EXPORT` safe default (coach export bounded to current scope). |
| 14 Training → sessions prescription & modification (TP-04/07/08) | F-09, F-12, F-13, F-14 | an athlete receives only assigned prescriptions; a device that never synced cannot fabricate prescribed content; a mid-stream modification creates a surfaced reconciliation window (→ seam 9). |

**Contract shapes** (schemas, transport) are produced by D02/D03 at G4 per bounded context — not defined here.

---

## 9. Cross-cutting requirements

### 9.1 Authorization and tenant isolation (S-02)

- Every authorization decision is evaluated against the **current authoritative state** (role, management scope, communication reach, membership, closure state, active-Team context) — never a per-context copy or a stale cache; a stale cache must never grant broader access (contracts 7, 8).
- **Management scope** (Athletes a coach may manage/tag/give feedback to/analyse/see identifiable performance data for) and **communication reach** (Team-wide for coaches) are kept structurally distinct; reach never widens any other scope (invariants #3, #15).
- **Exactly one Head Coach per Team at all times**, enforced by a single-transaction TA-01a co-transition **and** a persistence-level uniqueness guard (domain-model §4.1 / F-D03-01).
- **One role per Team**; multiple roles across Teams are independent Memberships; authorization is never a union across Teams (F-04; invariant #2).
- **Payment ≠ authorization**: no identity/teams/vault/profile authorization path consumes a BE-05 flag; flags are typed/namespaced separately from role/scope checks, with a documented, testable rule (contract 6 C-5; F-42).
- Every destructive/authorization-sensitive transition writes an `AuditRecord` naming authority, confirmation, reversibility, downstream effects, and exit state (invariant #12; S-05).

### 9.2 Privacy, youth-safety, media, and Vault

- **Age 13+** is a hard gate at account creation, not a Team setting (F-35); a discovered under-age account is restricted-first, PSA-determined, governed-closure-on-confirmation, audited-restoration-on-error (F-36).
- **Profiles** are user-owned, not discoverable; peers get display name + role only; in-scope coaches get the catalogue's coach-visible fields; **DOB/age evidence never reaches a coach or peer and is never in a client cache** — other contexts get only a derived `is_minor` flag (F-08; contract 8).
- **Media** defaults to a private draft; recording never triggers background upload; the five transitions (tag / grant / share / publish / revoke) are independently representable and auditable — no single boolean conflates them (F-20, F-21, F-23; invariant #7; VS-04 checkpoint).
- **Vault visibility** is resolved query-time over `VaultGrant` + `Share` records only — never derived from membership, group, tag presence, or publication; **no denormalised `visible` flag** on `MediaArtifact` (F-23; domain-model F-D03-05).
- **Athlete-to-athlete media sharing is disabled**; **multi-subject youth media** onward re-share and Team publication are **blocked** by default (F-EX-2; F-22 inactive).
- **Report / block** is available to every member regardless of role, tier, or group; block semantics per baseline §5 (stops DMs/mentions/tags/shares/discovery; preserves evidence; does not alter membership; safety messages get through; minor-blocks-coach offers a private report path; restricted telemetry with no auto-punishment and no Team-leadership disclosure) (F-29).
- **Illegal content / imminent harm** is preserved, made inaccessible, and routed past Team-level review to the Platform Safety Administrator; external handoff only under legal counsel (F-38).
- **Preservation holds fail safe** — an unconfirmed hold blocks deletion/closure (S-08; contract 11).
- **Safety-critical notification state** is transactionally created with its triggering event, durably retried, idempotently processed, with explicit delivery/ack state, an audited terminal-failure record, and human escalation; the safety class cannot be disabled or quieted (S-04; invariant #14).

### 9.3 Offline and synchronization expectations

| Class | v1 expectation |
|---|---|
| **Execution-blocking if unavailable offline** — F-14–F-18 (SE-01…SE-08 + reconciliation), F-19 (personal workouts), F-09 published-Session caching (via F-12), F-20 media capture | Fully offline-capable provided upstream sync occurred; every transition recorded locally first, reconciled on reconnect; starting a never-synced Session offline **fails honestly** (never fabricates content). |
| **Offline honesty** (invariant #13) | An offline success is never server-durable until reconciliation succeeds; unmergeable divergence goes through SE-09 (F-17) — **never last-write-wins**; offline attachment submissions (F-28) and offline Vault grants (F-23) stay **pending** until server confirmation; a queued write racing a revoke/hold/removal **loses**. |
| **Degrade to queue-and-sync** — F-26–F-28 messaging, F-24 analysis, F-31/F-32 read views | Compose/queue offline; history read from local cache; no silent message loss; realtime (S-10) is a latency enhancement only. |
| **Not offline-capable by design** | F-01/F-02/F-03/F-04/F-05/F-06/F-07 (identity/team admin), F-08 authoritative persistence + all of PR-03, F-13 taking effect for athletes, F-22, F-23 grant/share, F-28 visibility grant, F-35/F-36/F-37/F-38/F-39, F-40/F-41. |
| Accepted D03 design items (safe defaults in force, not resolved here) | `OQ-MEDIA-CACHE-INVALIDATION` (server-authoritative revocation + best-effort purge; favour online-validated access), `OQ-SE-OFFLINE-P2P` (queue-until-reconnect; no device-to-device propagation), `OQ-SE-RECONCILE-UX` (state machine + non-loss guarantees; presentation is a follow-up), `OQ-PF-AGG-METHOD`, `OQ-PF-REPORT-OFFLINE`. |

### 9.4 Accessibility (S-12)

VoiceOver labels + rotor support on every interactive surface; Dynamic Type; sufficient contrast; minimum hit-target sizing; **Apple Pencil annotation with a mandatory touch fallback** (F-24 / AN-03); a captions/transcripts posture for media playback; conflict-/amendment-surfacing interactions (F-17/F-18) that are operable without a mouse and never let a coach edit an athlete-logged value. `OQ-MG07-DEFAULTS`, the `OQ-SE-RECONCILE-UX` presentation model, and the `OQ-MG-BLOCK-SAFE-COLLAPSE` classifier are named `user-research-usability` follow-ups for a 13–17 audience (finding P-F-03) — safe defaults ship and are tuned.

### 9.5 Data lifecycle, deletion, retention, and export

- **DD-DEPARTED-CONTENT** (invariant #16) governs every departure/removal/closure: athlete-owned profiles, performed-work logs, and personal workouts stay with the athlete; Team plans/records stay with the Team (archived); membership-derived access ends immediately; **no indiscriminate cascading deletion**; a departed coach's plans are re-owned by the Head Coach with authorship attribution retained.
- **Self-service** account deletion (F-01 / IT-08, 30-day recoverable grace — `OQ-IT08-GRACE` default) and data export (F-34 / PF-06) are data-subject-rights mechanisms; **assisted DSR intake** (F-37 / PS-08) covers broader and guardian-initiated requests, worked manually with legal review in v1.
- **Retention durations and the deletion-vs-anonymisation choice remain OPEN** (`OQ-DD-RETENTION`, `OQ-PS07-RETENTION`, `OQ-MG-RETENTION`, `OQ-PW-RETENTION-DURATION`, `OQ-MD07-RETENTION`) — safe default: retain while an owning account is active, follow the account-level policy on final deletion; **these gate the deletion/retention implementation, not the v1 build of the capabilities** (their safe defaults are in force).
- **Preservation holds** (S-08) survive ordinary deletion/closure across F-01/F-07/F-20/F-37 until D04 releases them; unconfirmed ⇒ blocked.
- **Export** never expands the actor's authorized scope; a scope-exceeding request is rejected before generation; every export writes an immutable `ExportEvent` (F-34; contract 13).

### 9.6 Required infrastructure and independently-deployable workloads

- **`services/media-worker`** (S-06) — the **one** independently-deployable workload in v1 (transcode/thumbnail/derivation; `ARCHITECTURE.md`).
- Platform capabilities as directories, not new services: `platform/auth`, `platform/database`, `platform/sync`, `platform/storage`, `platform/notifications`, `platform/observability`, `platform/entitlements`, `platform/realtime` (conditional S-10).
- **CI + environments + observability + backup/restore + rollback + an acceptance-gate harness** (S-13) — required for G5/G6/G8.
- **No new bounded context, no other service extraction** — the modular monolith stands; extraction stays possible when operational evidence justifies it.

---

## 10. Ordered implementation sequence (increments)

Increments are **dependency-ordered, not effort-ordered** (finding P-F-06 — no engineering estimates exist). Each increment provides a meaningful, verifiable capability. **A partial UI shell does not count as a completed increment** — the required domain behaviour, authorization, persistence, synchronization, and verification must all be present (`scope-release` command constraint).

Shared per-increment fields: **Owner** = D01 owns the product requirement; **D02 + D03** implement at G4; **D04** is a mandatory collaborator/reviewer for every increment except INC-0's non-security parts and INC-11; **D05** verifies (G5) and owns release readiness (G6); **`architecture-reviewer`** where a seam/boundary/topology is touched; **`cross-department-reviewer`** at the end. **Gates per increment:** G1 (D01), G2 (architecture, where applicable), G3 (D04, where applicable), G4 (D02/D03), G5 (D05). G6/G7/G8 are release-level (§11).

---

### INC-0 — Platform foundations

- **Included:** S-01 auth + active-Team-context · S-02 authorization & tenant-isolation kernel · S-03 offline/local-first sync substrate · S-05 audit-log capability · **S-08 preservation-hold / governance safety-enforcement seam (fail-safe)** · S-04 durable safety-notification capability (core state model) · F-42 entitlement-flag interface + typing discipline (all-enabled projection) · S-13 release readiness (CI, environments, observability, backup/restore, rollback, acceptance-gate harness).
- **Upstream dependencies:** none (this is the foundation).
- **Owning Department:** D03 (platform/data) for S-01/S-02/S-03/S-04/S-05/S-08/F-42; D05 for S-13. **Required collaborators:** D02 (client sync + auth surfaces), D04 (S-02 authorization model, S-04/S-08 safety semantics — mandatory), architecture-reviewer (topology, contract-6 typing, no service extraction).
- **Required reviews / gates:** G2 (architecture — dependency direction, no new service beyond `services/media-worker` which lands in INC-5, entitlement typing), G3 (D04 — S-02 kernel + S-04 + S-08), G4, G5.
- **Acceptance evidence:** per-request authorization evaluated against current authoritative state (stale-cache-does-not-elevate test); offline queue with explicit pending-vs-server-durable state + no-last-write-wins guarantee; append-only audit log with a destructive-transition assertion; **preservation-hold fail-safe test** — an unconfirmed hold blocks a deletion transition; SafetyNotification transactional-outbox test (state written in the triggering transaction) + audited-terminal-failure + human-escalation path; entitlement interface emits typed flags + a static check that no authorization path references a BE-05 flag type; CI runs `npm run ai:validate` + the acceptance-gate harness; backup/restore + rollback rehearsed in a non-production environment.
- **Conditions that block the next increment:** G3 sign-off on the S-02 authorization kernel and the S-08 fail-safe; the offline substrate (S-03) passes its no-last-write-wins + pending-state tests. INC-1 must not begin authorization-bearing work against an un-signed-off kernel.

---

### INC-1 — Identity & Team spine

- **Included:** F-01 account lifecycle · F-02 Team + hierarchy · F-03 membership/roles/Head-Coach transfer · F-04 multi-Team switching · F-05 group assignment (management scope) · F-06 Team settings + `personal_workouts_allowed` · F-07 Team closure · F-08 profile + PR-03 visibility · F-35 age 13+ enforcement · F-40 tier-state field (Free default, no gating).
- **Upstream dependencies:** INC-0 (S-01, S-02, S-05, S-08).
- **Owning Department:** D01 (product) → D02 + D03 (implement). **Required collaborators:** D04 (mandatory — identity, minors, profile PII, the coach-edit boundary, closure/retention/holds; policy owner for identity/teams/profile contexts), architecture-reviewer (contracts 7, 8; the one-Head-Coach transactional guard), D03 (`database-engineer` — the F-D03-01 uniqueness guard).
- **Required reviews / gates:** G1, G2 (contracts 7, 8), G3 (D04 — full), G4, G5.
- **Acceptance evidence (per capability, §12):** the §12 rows for F-01…F-08, F-35, F-40 — each with happy + denied + empty + (where applicable) offline-reconnect + audit assertions; specifically: under-13 hard-reject; one-Head-Coach concurrent-transfer test; remove-terminates-assignments-atomically + offline-write-racing-removal-denied; multi-Team isolation (Team B check never sees Team A grants); coach/admin profile-edit denied + audited; DOB/age never on a coach/peer path; closure archive-first + recoverable + athlete-owned-data-retained + held-content-survives.
- **Conditions that block the next increment:** G3 sign-off; F-05 (management scope) verified — INC-2 authoring/assignment scoping depends on it; F-02/F-03 hierarchy + membership verified — every later Team-scoped context depends on them.

---

### INC-2 — Training planning

- **Included:** F-09 plan-hierarchy authoring · F-10 templates (author-private) · F-11 plan duplication · F-12 plan assignment · F-13 plan modification.
- **Upstream dependencies:** INC-1 (F-02, F-05); INC-0 (S-03).
- **Owning Department:** D01 → D02 + D03. **Required collaborators:** D04 (scope on authoring/assignment; the scope-narrowing normative effects), architecture-reviewer (contract 14).
- **Required reviews / gates:** G1, G2 (contract 14), G3, G4, G5.
- **Acceptance evidence:** §12 rows for F-09…F-13 — nested authoring with child-within-parent date bounds; Event-Coach out-of-scope authoring/assignment denied; duplication never inherits a broader scope; assign → athlete gains visibility + cached content; unassign a not-started Session withdraws it, an in-progress one routes to SE-09 (verified against INC-3); published/in-progress modification propagates on sync + prior version recoverable + in-progress athlete log preserved with a version-changed marker; every assignment/modification audited.
- **Conditions that block the next increment:** G1 + G4 on F-12 (assignment is the transition that caches a Session for offline execution) and F-13 (the origin of the SE-09 case) — INC-3 cannot be verified without them.

---

### INC-3 — Session execution & reconciliation

Split into two sub-increments (raised by the D02 review, §13 finding D02-N1): **INC-3a** is not released to any external user until **INC-3b** passes.

- **INC-3a — execution + logging + finalization:** F-14 practice execution · F-15 athlete logging · F-16 finalization.
- **INC-3b — reconciliation + correction:** F-17 offline session reconciliation (XL) · F-18 athlete post-finalization correction.
- **Upstream dependencies:** INC-2 (F-09, F-12, F-13); INC-0 (S-03, S-05).
- **Owning Department:** D01 → D02 + D03. **Required collaborators:** **D03 (`sync-offline-engineer` — mandatory; this increment is the structural answer to the offline-sync risk)**, D04 (attendance is minor data; the coach-edit boundary; no coach overwrite of an athlete log), architecture-reviewer (contracts 9, 14).
- **Required reviews / gates:** G1, G2 (contracts 9, 14), G3, G4, G5. INC-3b additionally requires D03 sign-off that the reconciliation state machine honours non-loss + honest-attribution + re-entrancy.
- **Acceptance evidence:** §12 rows for F-14…F-18 — start a cached assigned Session offline; start a never-synced Session offline → honest error; in-session modification stacks (never replaces); athlete log is append-only (no destructive UPDATE); coach view is read-only (no write path); **F-17:** TP-08-change-plus-offline-logs kept-as-executed with a marker; two-device concurrent start surfaced + neither discarded; same-athlete-two-device combined-record confirmation; departed-athlete conflict held + flagged; every conflict + resolution audited (before/after); re-entrancy without overwriting prior resolutions; **F-18:** amendment with mandatory reason applied as a new layer + original retained + PF-* recompute + coach notified; amend-another-athlete denied; edit-prescribed-structure-via-SE-10 denied.
- **Conditions that block the next increment:** INC-3b G3 + D03 sign-off — **no external user exposure of INC-3a until INC-3b passes** (offline honesty is dishonest without reconciliation). INC-10 (performance) depends on INC-3b's finalized, reconciled record.

---

### INC-4 — Personal workouts (conditional-by-design)

- **Included:** F-19 personal workouts — create, log, edit/delete (active only where `personal_workouts_allowed = enabled`).
- **Upstream dependencies:** INC-1 (F-06 gate); INC-0 (S-03). May run in parallel with INC-3.
- **Owning Department:** D01 → D02 + D03. **Required collaborators:** D04 (athlete-owned data boundary), D03 (offline).
- **Required reviews / gates:** G1, G3, G4, G5.
- **Acceptance evidence:** §12 row for F-19 — enabled: create/log/edit/delete; disabled: PW-01/PW-02 blocked, existing records retained, PW-03 + export still available; re-enable → no data loss; offline draft against a stale "enabled" flagged, not silently persisted; a coach has no visibility into any personal workout (`OQ-PW-COACH-VISIBILITY` safe default asserted).
- **Conditions that block the next increment:** none (INC-4 is a leaf; INC-10 personal-workout-in-own-history depends on it if F-19 is active for the test Team).

---

### INC-5 — Media capture, library, tagging + media worker & storage

- **Included:** F-20 media capture/import/private-draft/lifecycle/attach · F-21 media tagging · S-06 media-processing worker (independently deployable) · S-07 media storage + revocation-aware delivery.
- **Upstream dependencies:** INC-0 (S-03, S-05, S-08), INC-1 (F-02, F-05 for tag scope).
- **Owning Department:** D01 → D02 + D03 + `services/media-worker`. **Required collaborators:** **D04 (mandatory — youth media; the private-default anchor; tagging a minor)**, D03 (storage, `OQ-MEDIA-CACHE-INVALIDATION` design), architecture-reviewer (contracts 1, 11; the `services/media-worker` topology — the one new deployable workload).
- **Required reviews / gates:** G1, G2 (contracts 1, 11; deployable-topology review for `services/media-worker`), G3, G4, G5.
- **Acceptance evidence:** §12 rows for F-20, F-21 — capture → private draft, no upload until an explicit later act; attach to a Session → no visibility change (client cannot read it as a grant); tag in-scope athlete → identification only, **no** Vault access appears; tag out of scope / non-member denied; tagged athlete notified (safety class, S-04); delete a draft → clean; delete shared/published media → dependent records resolved; **delete under a hold → blocked with reason** (S-08); all visibility-changing events independently audited; the worker deploys and scales independently and never becomes a second product architecture.
- **Conditions that block the next increment:** G3 sign-off on the private-default posture + tag ≠ grant; S-06/S-07 operational. INC-6 (Vault) and INC-7 (analysis) depend on media existing.

---

### INC-6 — Vault visibility (grant / share / revoke)

- **Included:** F-23 Vault grant/share/revoke + `VaultVisibilityResolution` + VS-04 checkpoint.
- **Upstream dependencies:** INC-5 (F-20, F-21), INC-0 (S-04, S-07, S-08).
- **Owning Department:** D01 → D02 + D03. **Required collaborators:** **D04 (mandatory — the single highest-sensitivity surface in the product)**, **D03 (`OQ-MEDIA-CACHE-INVALIDATION`; revocation propagation is a first-class requirement)**, architecture-reviewer (contracts 1, 2, 3; the VS-04 data-model checkpoint — no denormalised visibility flag).
- **Required reviews / gates:** G1, G2 (contracts 1, 2, 3; VS-04), G3, G4, G5.
- **Acceptance evidence:** §12 row for F-23 — tag then **no** Vault access until an explicit grant; grant server-confirmed → athlete's Vault returns exactly that one artifact; grant to an untagged non-authorized athlete denied; VS-02 share within scope succeeds, out of scope denied, athlete-to-athlete denied; multi-subject onward re-share blocked; revoke → item leaves the recipient's authoritative Vault view + best-effort cache purge; **queued offline grant loses to a concurrent revoke**; **VS-04 test: no denormalised `visible` flag on `MediaArtifact`**; every grant/share/revoke audited.
- **Conditions that block the next increment:** G3 sign-off on VS-01/VS-02/VS-03 + VS-04; the revocation propagation test passes. INC-7 feedback and INC-8 attachments depend on Vault visibility.

---

### INC-7 — Analysis & coaching feedback

- **Included:** F-24 analysis tooling (playback, markers/drawings/Pencil, clips, comparison, save) · F-25 coaching feedback delivery.
- **Upstream dependencies:** INC-5 (F-20), INC-6 (F-23).
- **Owning Department:** D01 → D02 (client). **Required collaborators:** D04 (source-visibility inheritance; scope-bounded feedback), `ux-research-accessibility-reviewer` (S-12 — Apple Pencil + touch fallback), architecture-reviewer (contract 3).
- **Required reviews / gates:** G1, G2 (contract 3), G3, G4, G5.
- **Acceptance evidence:** §12 rows for F-24, F-25 — open analysis on a visible clip; open on a clip the actor cannot see denied; annotate (Pencil + touch fallback), extract a clip, add a visible comparison source, add an invisible one → denied; save → private project, no visibility change; deliver a selected clip+note to a **managed** athlete → athlete sees exactly that item, not the project; deliver to an out-of-scope athlete denied (even though messaging is allowed); revoke a finding → athlete loses access; share audited.
- **Conditions that block the next increment:** none (leaf toward INC-8's attachment path, which also depends on INC-6).

---

### INC-8 — Communication

- **Included:** F-26 group channels · F-27 coach↔athlete private chat · F-28 chat attachments (stricter-transition routing) · F-30 notification preferences · S-10 realtime transport (**conditional** — queue/sync is the default).
- **Upstream dependencies:** INC-1 (F-02, F-05 — derived channel membership), INC-5/INC-6 (F-20, F-23 — attachments), INC-0 (S-03, S-04).
- **Owning Department:** D01 → D02 + D03. **Required collaborators:** **D04 (mandatory — minors in channels; coach↔athlete threads; the reach ≠ scope asymmetry; the F-04 stricter-transition finding)**, D03 (message delivery, realtime), architecture-reviewer (contract 4).
- **Required reviews / gates:** G1, G2 (contract 4), G3, G4, G5.
- **Acceptance evidence:** §12 rows for F-26…F-28, F-30 — channel membership derived from assignment (assignment change immediately changes access); post after unassignment denied; offline-composed messages queue and deliver without loss; Head Coach without assignment has no standing read access; coach starts a thread with any Team athlete but cannot tag/Vault-share/give feedback to/analyse/see profile detail of/see identifiable performance data for an out-of-scope athlete; block → thread read-only; coach→minor DM notification lands at least in-app even when muted; **F-28:** private-thread attachment → formal VS-02 record (revocable, audited); Team-channel attachment → MD-06 publication record, **blocked if a tagged minor's consent is missing** (F-22 inactive); offline attachment stays pending, broadened visibility not shown until server-confirmed; **F-30:** disable a safety-class notification → rejected, store refuses to persist; a coach/admin cannot view/set another member's preferences.
- **Conditions that block the next increment:** INC-9 report/block targets exist (channels + threads). **No external user exposure of INC-5–INC-8 (media + messaging) until INC-9 is complete and D04-signed-off** (§13 finding D04-B1).

---

### INC-9 — Safety & governance spine

- **Included:** F-29 report/block/moderation · F-38 illegal-content & mandatory-escalation · F-39 Platform Safety Administrator role + moderation/escalation tooling · F-36 discovered under-age handling (full) · F-37 DSR intake (assisted); S-04 (full delivery/ack/escalation surface) · S-08 (moderation revocation + account restriction surface).
- **Upstream dependencies:** INC-8 (report/block targets), INC-5 (media evidence), INC-1 (F-01/F-07 governed-closure mechanics), INC-0 (S-04, S-05, S-08).
- **Owning Department:** **D04 (governance context is D04-owned)** → D02 + D03 (implement the tooling). **Required collaborators:** D01 (report/block affordance availability to every member), `legal-compliance-researcher` (`OQ-PS07-JURISDICTION`, `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL` — production-launch sign-off), `architecture-reviewer` (contract 11; the least-privilege access model), D06 (`support-operations-specialist` — PS-08 intake handling).
- **Required reviews / gates:** G1, G2 (contract 11; least-privilege model), **G3 (D04 — full; this is the increment D04 owns)**, G4, G5.
- **Acceptance evidence:** §12 rows for F-29, F-36, F-37, F-38, F-39 — any role reports any accessible content; a report implicating the Head Coach bypasses Team leadership; block semantics per baseline §5 (evidence preserved, membership unaltered, safety path retained, minor→coach private report path, restricted telemetry with no auto-punishment / no Team-leadership disclosure); an escalated case lands in a **durable queue** worked in severity order; the Platform Safety Administrator can perform exactly its enumerated authorities and no Team-scoped action beyond them; illegal-content classification → preserved + inaccessible + Team-level dismiss denied + hold blocks deletion across IT-08/MD-07/PS-08/IT-09; **under-age:** restricted-first (no irreversible action) → PSA determines → governed closure or restriction lifted → wrong determination audited-restored; **DSR:** identity + standing verified → routed to owning workflows → held data `partially_fulfilled` with a recorded reason; every safety action audited comprehensively; the S-04 durable state model backs every report-receipt + escalation signal.
- **Conditions that block release:** INC-9 **complete + D04 G3 sign-off** is a hard precondition to any external user exposure of media (INC-5) or messaging (INC-8). `OQ-PS-MOD-STAFFING` (staffing/SLA) and the jurisdiction legal sign-offs are **production-launch gate conditions** (§11), not build blockers.

---

### INC-10 — Performance, history, reports, export

- **Included:** F-31 performance & history views · F-32 own-data reports · F-34 data export (athlete self-export slice) · S-11 reporting read-model pipeline (PF-01…04 level).
- **Upstream dependencies:** INC-3b (finalized, reconciled records), INC-4 (personal-workout logs if F-19 active for the test Team).
- **Owning Department:** D01 → D02 + D03. **Required collaborators:** D04 (current-scope-only visibility; the aggregation boundary; minor data leaving the system on export), D03 (S-11; `OQ-PF-AGG-METHOD`), architecture-reviewer (contracts 5, 13).
- **Required reviews / gates:** G1, G2 (contracts 5, 13), G3, G4, G5.
- **Acceptance evidence:** §12 rows for F-31, F-32, F-34 — athlete sees own full history/metrics/PBs; coach sees an in-scope athlete's history; out-of-scope access denied; scope-narrow → coach loses that athlete's identifiable data on the next check; a group aggregate cannot be used to infer an out-of-scope athlete's individual value; personal-workout entries appear only in the owner's own views; insufficient data → honest "not enough data"; own-data report generates (offline with a freshness marker allowed); a scope-exceeding report/export is rejected **before** generation; export writes an immutable `ExportEvent`; no "unexport".
- **Conditions that block release:** none (leaf); F-33 group reports and F-34-cond remain **conditional** (§6.1).

---

### INC-11 — Commercial scaffold (minimal)

- **Included:** F-40 tier-state field confirmation (if not already in INC-1) · F-42 confirmation that consumers read only typed flags and no authorization path consumes one.
- **Upstream dependencies:** INC-0 (F-42 interface), INC-1 (F-40 field).
- **Owning Department:** **D06** (`operations-governance-reviewer` / `billing-entitlements-engineer`) → D03. **Required collaborators:** D04 (payment ≠ authorization — mandatory), architecture-reviewer (contract 6).
- **Required reviews / gates:** G1, G2 (contract 6), G-D06, G4, G5.
- **Acceptance evidence:** the tier-state field defaults to Free and gates nothing; a static/lint check asserts no identity/teams/vault/profile authorization path references a BE-05 flag type; recompute failure falls to the restrictive state; **no BE-02/BE-03/BE-04/BE-06 workflow is implemented** (no paid billing in v1); D06 confirms this is **not** a billing implementation and requires no D06 entitlement artifact yet.
- **Conditions that block release:** none.

### 10.1 Increment dependency summary

```
INC-0 ──┬─► INC-1 ──┬─► INC-2 ──► INC-3a ──► INC-3b ──► INC-10
        │           ├─► INC-4
        │           ├─► INC-5 ──► INC-6 ──► INC-7
        │           │       └────────────┐
        │           └─► INC-8 ◄──────────┤ (attachments need INC-5/INC-6)
        │                   │
        │           INC-9 ◄─┴─ (needs INC-8 targets + INC-5 evidence)
        └─► INC-11 (parallel; depends on INC-0 F-42 + INC-1 F-40)

Hard release gate: INC-9 complete + D04 G3 sign-off  BEFORE any external user
exposure of INC-5..INC-8 (media + messaging).
INC-3a not externally exposed until INC-3b passes.
```

---

## 11. Gate entry / exit criteria and definition of MVP completion

### 11.1 Release-level gate criteria (per `stridelab-ai/orchestration/phase-gates/gates.yaml`)

| Gate | Entry criteria | Exit criteria for the MVP release |
|---|---|---|
| **G1 Product / Workflow** | This scope + `feature-prioritization.md` exist and pass Department 01 review. | Every included capability traces to an approved workflow + requirement; actors/states/ownership defined; open product decisions explicit (§6.1 conditions, §14 open questions). |
| **G2 Architecture / Contracts** | Per-increment seam list (§8.3) identified. | Dependency direction preserved on every seam; the 14 contract *shapes* designed by D02/D03 per bounded context; `services/media-worker` is the only new deployable workload; no unjustified extraction; migration/rollback considered. |
| **G3 Security / Privacy / Compliance** | Every increment touching identity/protected data/minors/UGC/media/messaging/deletion/export has a D04 review scheduled. | **D04 sign-off for every such increment**; INC-9 complete before external media/messaging exposure; authorization/privacy/youth-safety requirements approved; legal/compliance open items honestly labelled with conservative defaults **and** the production-launch legal sign-offs (below) obtained or explicitly accepted at G7. |
| **G4 Implementation Integrity** | Approved contracts + this scope. | Approved contracts implemented per increment; targeted tests pass (§12); no undocumented boundary change; the domain-model §4.1 cross-aggregate guards implemented. |
| **G5 Quality / Performance / Reliability** | Increments feature-complete. | Required test suites pass; the offline-critical paths (F-14…F-18) meet reliability criteria on-device; critical failures have recovery paths; performance acceptable for on-track use. |
| **G6 Release Readiness** | G1–G5 passed for all increments. | Release checklist complete; migrations/backups/rollback ready; **G3 passed**; production observability ready; `OQ-PS-MOD-STAFFING` resolved or an explicit interim staffing plan accepted. |
| **G7 Human Approval** | This scope + `feature-prioritization.md` + the full cross-department review (§13) with zero open BLOCKING findings + the decision package (§15). | **Explicit human approval recorded** — the only step that cannot be self-approved by an AI agent. |
| **G8 Production Verification** | G7 approved; release deployed. | Critical journeys (J-1…J-11) verified in production; telemetry healthy; no blocking regression; release record updated. |

### 11.2 Production-launch legal sign-offs (named conditions on G3/G7 — safe defaults are in force meanwhile)

`OQ-IT01-AGE-VERIFY` (age-verification strength) · `OQ-PS07-JURISDICTION` (duties on discovering an under-13 user) · `OQ-PS08-JURISDICTION` (data-subject-rights jurisdictions + SLAs) · `OQ-PS09-EXTERNAL` (external-reporting obligations + the legal-guidance process for any handoff). Each must be **obtained, or explicitly accepted as a conservative-default launch condition, in the G7 approval** — a youth product does not launch with these merely defaulted and unacknowledged (§13 finding CDR-B1).

### 11.3 Definition of MVP completion

The MVP is complete when **all** of the following hold:

1. Every **MVP-required** feature (`F-*`) and supporting capability (`S-*`) in §5 is implemented with its §12 acceptance criterion met — domain behaviour + authorization + persistence + synchronization + verification all present (no UI shell counts).
2. Every increment INC-0…INC-11 has passed **G1, G2 (where applicable), G3 (where applicable), G4, G5**.
3. **INC-9 (safety & governance spine) is complete with D04 G3 sign-off**, and no external user was exposed to media (INC-5) or messaging (INC-8) before that point; **INC-3a was not externally exposed before INC-3b passed**.
4. **G6 release readiness** passed: CI, environments, observability, backup/restore, rollback, and the acceptance-gate harness are operational (S-13).
5. All 16 cross-workflow invariants + baseline §6A are demonstrably preserved — proven by the J-1…J-11 journeys' acceptance evidence, each exercising at least one denied / offline / empty path.
6. Every `§9.2` OPEN item that **gates an included capability** is either resolved **or** its conservative safe default is **explicitly accepted for this release in the G7 approval** (the §14 register); no OPEN item was silently converted to an assumption.
7. The **production-launch legal sign-offs** (§11.2) are obtained or explicitly accepted as named conditions at G7.
8. The **cross-department review (§13)** shows **zero open BLOCKING findings**; every non-blocking condition has a named owner.
9. **G7 human approval** is recorded (`stridelab-ai/orchestration/approvals/`).
10. Durable project state is updated: registry + `stridelab-ai/project-memory/current-state/` records for both artifacts; downstream-consumer references; review + verification evidence; the repository validators pass.

**Not in the completion definition:** paid billing (F-41), tier gating (F-40 gating), F-22 publication, F-33 group reports, F-34-cond, S-09 automation, S-10 realtime, and every Post-MVP / Excluded item. Their conditional activation or deferral is recorded, not delivered.

---

## 12. Acceptance criteria for every included capability

Each capability's **full acceptance evidence** is in `feature-prioritization.md` §4. The criterion below is the **definition-of-done gate** — all clauses must hold. Shared clause (every row): *a destructive/authorization-sensitive transition writes an `AuditRecord`; the capability is exercised by a happy path, a denied/authorization path, an empty/insufficient-data state, and — where the workflow is offline-critical — an offline→reconnect path.*

| Capability | Definition-of-done (in addition to the shared clause) |
|---|---|
| F-01 | Under-13 signup hard-rejected with minimal retention; recovery only via verified-channel proof + rate limit; sole-Head-Coach deletion blocked without a successor; deletion blocked under an unconfirmed preservation hold; 30-day grace cancel restores all memberships. |
| F-02 | Creator is the sole Head Coach; Free tier + `personal_workouts_allowed` default applied; Event Group/Subgroup create/rename/archive; delete-with-children blocked or explicit-cascade; non-Head-Coach create denied. |
| F-03 | Join grants exactly the invited role/scope; join on an expired/revoked invitation denied; remove terminates all group assignments in the same transition; an offline write racing removal loses; Head-Coach transfer keeps exactly one HC under a concurrent-transfer test and re-owns departed plans (DD-DEPARTED-CONTENT). |
| F-04 | Switching reloads Team-scoped state with no cross-Team merge; an authorization check under Team B never sees a Team A grant; switching into a since-removed Team fails to a still-valid Team or a no-Team state; an offline draft from Team A is invisible under Team B. |
| F-05 | Assignment makes an athlete manageable by the group's Event Coach; Event-Coach self-assignment denied; unassignment applies the normative scope-narrowing effects; a scope-narrow test asserts the out-of-scope athlete's performance data + tag authority + feedback authority all drop on the next authoritative check. |
| F-06 | Toggling `personal_workouts_allowed` changes the F-19 gate against the authoritative value; non-Head-Coach toggle denied; disabling does not delete existing personal workouts or block PW-03 / export; an offline PW-01 draft against a stale "enabled" is flagged, not silently persisted. |
| F-07 | Closure ends membership-derived access immediately; Team enters `archived` (read-only, recoverable); athlete-owned data confirmed retained; cancel from `closure_pending`/`archived` restores memberships; held content survives past `deletion_eligible`; non-Head-Coach closure denied. |
| F-08 | Coach/admin edit of an athlete profile denied and audited as a boundary violation; peer view returns display name + role only; in-scope coach view returns catalogue fields; out-of-scope coach view drops to minimum identity on scope narrowing; DOB/age never returned on any coach/peer path and never in a client cache; server-side withholding of a not-permitted field. |
| F-09 | Nested authoring with child-within-parent date bounds enforced at authoring time; Event-Coach out-of-scope authoring denied; publish makes the Session visible to assigned athletes (via F-12); a discarded draft leaves no downstream state; offline authoring drafts and syncs on publish. |
| F-10 | A Session saved as a template instantiates into a new Week/Session; the template is author-private (+ Head Coach) — another Event Coach cannot see it; an archived template is reactivable. |
| F-11 | An Event Coach duplicating a Team-wide Macrocycle gets a draft scoped to their own groups; a Head Coach keeps Team-wide; a cascade duplicate produces `draft` children; the source is untouched by edits to the copy; duplicating into an unowned scope denied. |
| F-12 | Assigning a Session to a Subgroup gives those athletes visibility + cached content; assigning outside authorized scope denied; unassigning a not-started Session withdraws it; unassigning an in-progress Session routes it to SE-09; historical athlete truth preserved. |
| F-13 | A `draft` modifies freely; a `published`/`in_progress` modification propagates on sync, the prior version is recoverable, and the athlete's in-progress log for the pre-modification prescription is preserved with a "prescribed version changed after execution" marker; out-of-authorship modification denied; diff-level audit. |
| F-14 | Start a cached, assigned Session offline; start a never-synced Session offline → honest error (no fabricated content); an athlete sees only their assigned prescription; an in-session modification stacks over the original (never replaces); a two-device concurrent start is surfaced as a conflict (F-17), never silently picked. |
| F-15 | Log results → auto-classify completed/partial/skipped; logging against an unassigned Session denied; edits allowed until finalization; the coach view is read-only (no write path exists in the codebase); offline logging survives an app restart and reconnect-merges without loss; append-only asserted (no destructive UPDATE of a committed value). |
| F-16 | Finalize → prescribed structure locked + `completed`; finalize with incomplete logs → the record honestly shows `not_logged`/`skipped` (no fabricated completion); non-coach finalize denied; the athlete SE-10 path is still open post-finalization. |
| F-17 | TP-08-change + offline logs → the athlete's record is kept as-executed with a version-changed marker and the coach sees the same marker; two coaches started offline → one start chosen explicitly, the other's attendance/notes merged, neither discarded; the same athlete on two devices → both shown, athlete confirms the combined record; a departed-athlete conflict is held and flagged to the coach with the athlete's state unaltered; every conflict + resolution audited before/after; a later stale device re-enters reconciliation without overwriting prior resolutions. |
| F-18 | An amendment with a mandatory reason is applied as a new layer, the original is retained, PF-* recompute, and the coach is notified with the reason; an amendment without a reason denied; amending another athlete's record denied; editing the prescribed structure via SE-10 denied; an offline draft applies on reconnect and enters SE-09 on collision. |
| F-19 | Enabled: create/log/edit/delete works; disabled: PW-01/PW-02 blocked, existing records retained, PW-03 + export still available; re-enable → no data loss; a coach has no visibility into any personal workout. |
| F-20 | Capture → private draft with no upload until an explicit later act; import → the same private-draft posture; attach to a Session → no visibility change and a client cannot read the attachment as a grant; delete a draft → clean; delete shared/published media → dependent tag/grant/share/publication records resolved (not orphaned); delete under an active hold → blocked with a reason; visibility-changing events independently audited. |
| F-21 | Tag an in-scope athlete → identification recorded, **no** Vault access appears for that athlete; tag out of scope / a non-member denied; the tagged athlete is notified (safety class); untag does not revoke an existing grant. |
| F-23 | Tag then **no** Vault access until an explicit server-confirmed grant; the grant conveys exactly one artifact; grant to an untagged non-authorized athlete denied; VS-02 share within scope succeeds, out of scope denied, athlete-to-athlete denied; multi-subject onward re-share blocked; revoke → the item leaves the recipient's authoritative Vault view + best-effort cache purge; a queued offline grant loses to a concurrent revoke; **no denormalised `visible` flag on `MediaArtifact`** (VS-04). |
| F-24 | Open analysis only on media the actor can already see; add markers/drawings with an Apple Pencil **and** a working touch fallback; extract a clip; add a comparison source the actor can see, and one they cannot → denied; save → a private project; nothing in F-24 changes the source media's visibility. |
| F-25 | Deliver a selected clip + note to a **managed** athlete → the athlete sees exactly that item, not the project; deliver to an out-of-scope athlete denied (even though messaging that athlete is allowed); revoke a finding → the athlete loses access. |
| F-26 | Channel membership is derived from assignment (an assignment change immediately changes access); posting after unassignment denied; offline-composed messages queue and deliver without loss; a Head Coach without an assignment has no standing read access; a blocked party's ordinary content collapses but a safety message does not. |
| F-27 | A coach starts a thread with any Team athlete (reach is Team-wide) but cannot tag / Vault-share / give structured feedback to / analyse / see profile detail of / see identifiable performance data for an out-of-scope athlete; an athlete can initiate; a block makes the thread read-only; a coach→minor DM notification lands at least in-app even when muted. |
| F-28 | A private-thread attachment that broadens visibility creates a formal VS-02 record (revocable via VS-03, audited); a Team-channel attachment creates an MD-06 publication record and is **blocked** if a tagged minor's consent is missing (F-22 inactive); attaching a file the actor cannot share denied; an offline attachment stays pending and the broadened visibility is not shown until server-confirmed. |
| F-29 | Any role reports any accessible content; a report implicating the Head Coach routes to the Platform Safety Administrator, not Team leadership; a block stops DMs/mentions/tags/shares/discovery, preserves evidence, does not alter membership; a minor blocking a coach is offered a private report path; block-safety telemetry is stored without punishment and without Team-leadership disclosure; report-receipt + escalation signals use the S-04 durable state model. |
| F-30 | Quiet hours + bundling apply to social notifications while a safety notification arrives immediately in-app; disabling all push leaves operational + safety in-app; disabling a safety-class notification is rejected and the store refuses to persist "safety = off"; a coach/admin cannot view or set another member's preferences. |
| F-31 | An athlete sees their own full history/metrics/PBs; a coach sees an in-scope athlete's history; out-of-scope access denied; a scope narrow drops the now-out-of-scope athlete's identifiable data on the next check; a group aggregate cannot be used to infer an out-of-scope athlete's individual value; personal-workout entries appear only in the owner's own views; insufficient data → honest "not enough data"; a PB from a reconciliation-flagged result is flagged, not silently counted. |
| F-32 | An own-data report generates (offline with a freshness marker allowed); a request whose scope exceeds authorization is rejected **before** generation; a partially-synced report is marked with its freshness. |
| F-34 | An athlete exports own history → a file plus an immutable `ExportEvent` audit record; a scope-exceeding export is rejected before generation; a partially-synced export is marked with completeness; there is no "unexport" path. |
| F-35 | An asserted age below 13 → hard rejection, no durable account, minimal retention; no Team-level override exists; the age-gate decision is audited. |
| F-36 | A credible under-13 signal → `restricted_pending_review` (use stops, data preserved, no irreversible action); a Head-Coach attempt to determine/close denied; the Platform Safety Administrator confirms → governed closure with policy-driven data handling; not substantiated → the restriction is lifted; a wrong determination → audited `restored`; a comprehensive audit trail throughout. |
| F-37 | A full-export request → identity verified → an export covering all the subject's data → case closed with an audit record; a guardian request → standing verified via the manual path → routed → fulfilled or `partially_fulfilled` with reasons; held/dependency-critical data → `partially_fulfilled` with a recorded reason, never a silent skip. |
| F-38 | A report classified into this path → content preserved + inaccessible + the case bypasses Team-level review + routed to the Platform Safety Administrator; a Team-level actor attempting to dismiss it denied; the hold blocks deletion across IT-08/MD-07/PS-08/IT-09 until released; an incorrect classification exits to ordinary MG-06/PS-03 and the hold is released per policy. |
| F-39 | An escalated report / under-age case / illegal-content case lands in a durable queue visible to the Platform Safety Administrator and worked in severity order; the actor can perform exactly its enumerated authorities and no Team-scoped action beyond them; a Head-Coach-implicated report never reaches Team leadership. |
| F-42 | Exactly one entitlement-derivation point exists; consumers read only typed feature-availability flags, never raw billing state; a static/lint check asserts no identity/teams/vault/profile authorization path references a BE-05 flag type; a recompute failure falls to the restrictive state; the v1 projection returns all features available. |
| S-01 | A session resolves exactly one active Team context; every downstream authorization check scopes to it; re-authentication does not merge or leak another Team's state. |
| S-02 | Every authorization decision reads current authoritative state; a stale cached role/scope never grants broader access (explicit test); management scope and communication reach are separate code paths; no path consumes a BE-05 flag. |
| S-03 | An offline write carries an explicit pending-vs-server-durable state and is never rendered as effective while pending; unmergeable divergence enters SE-09; a queued write racing a revoke/hold/removal loses; no last-write-wins anywhere in the substrate. |
| S-04 | A safety-class notification's authoritative in-app state is written in the same transaction as its triggering safety event (transactional outbox); processing is idempotent by (workflow, event, recipient); a terminal delivery failure is audited and escalated to a human; push/email are treated as a fallible secondary; the safety class cannot be disabled. |
| S-05 | Every destructive/authorization-sensitive transition appends an immutable audit record naming authority, confirmation, reversibility, downstream effects, and exit state; the log is append-only (no in-place mutation). |
| S-06 | The media worker deploys, scales, and fails independently of the app; it holds no product authorization logic; it is a subsystem, not a second product architecture. |
| S-07 | Vault-content reads favour an online-validated check over a long-lived local cache; a revocation best-effort-purges derived/cached copies; a device offline-cached copy that survives a server-side revocation is a known, documented limitation (`OQ-MEDIA-CACHE-INVALIDATION` safe default), not a silent failure. |
| S-08 | A deletion/closure transition takes "no active hold" as a precondition evaluated inside the deletion transaction; if the hold state cannot be confirmed, the transition is blocked; only the Platform Safety Administrator places/releases a hold. |
| S-11 | A derived read model never exposes data the viewer could not see at the individual-record level; a cohort small enough to re-identify is suppressed; the model owns no primary data and recomputes idempotently over the same underlying records. |
| S-12 | Every interactive surface has VoiceOver labels + rotor support and honours Dynamic Type + contrast + minimum hit-target sizing; Apple Pencil features have a working touch fallback; media playback has a captions/transcripts posture; F-17/F-18 conflict/amendment interactions are operable without a pointer and never permit a coach to edit an athlete-logged value. |
| S-13 | CI runs `npm run ai:validate` + the project test suites + the acceptance-gate harness on every PR; environments are reproducible; observability covers the safety-critical paths; backup/restore and rollback are rehearsed in a non-production environment before G6. |

---

## 13. Cross-department review

Both artifacts (`feature-prioritization.md` and this scope) were routed through the required review process per `stridelab-ai/shared/contracts/REVIEW-CONTRACT.md`. Each review below states: scope · authoritative inputs · evidence inspected · blocking findings · non-blocking findings · conditions · disposition · reviewer identity · downstream effect. Findings are classified **BLOCKING** / **non-blocking** with direct repository evidence. Every BLOCKING finding was remediated **in these artifacts** and the affected reviews re-run; the remediation log is §13.9.

**Reviewer-independence note (residual condition):** these review lenses were executed by the root orchestrator applying each Department's agent + skill boundary against the actual artifacts (not summaries). This mirrors the repository's practice before independent specialists are engaged. An **independent specialist reviewer per Department**, separate from the authoring pass, should confirm these dispositions before G7 — recorded as non-blocking condition **C-IND** (§13.10). No disposition below is stronger than `PASS_WITH_CONDITIONS`.

### 13.1 Department 01 — product coherence, workflow coverage, domain-model alignment, usability, release-scope integrity

- **Scope:** the two artifacts as a whole; inventory completeness; method soundness; journey coverage; no invariant contradicted; no OPEN item resolved.
- **Authoritative inputs:** `feature-prioritization.md` §1.1 list.
- **Evidence inspected:** §3/§3.1 inventory vs the 86-workflow list + 16 invariants; §7 journeys vs the invariant set; §10 increments vs the §3 dependency graph; §2 method vs the `product-strategy` SKILL.
- **BLOCKING findings:** none.
- **Non-blocking findings:** **D01-N1** — F-10 (templates) is the weakest "MVP required" necessity claim (`feature-prioritization.md` A-06). *Condition:* revisit at G4 increment planning; may move to `MVP conditional` on increment budget. **D01-N2** — the `user-research-usability` follow-ups (`OQ-MG07-DEFAULTS`, `OQ-SE-RECONCILE-UX` presentation, `OQ-MG-BLOCK-SAFE-COLLAPSE` classifier) are named but a research work package is not scheduled. *Condition:* D01 to open a `user-research-usability` work package post-approval; safe defaults ship meanwhile (P-F-03).
- **Conditions:** D01-N1, D01-N2; C-IND.
- **Disposition:** **`PASS_WITH_CONDITIONS`.**
- **Reviewer identity:** Department 01 `product-experience-lead` lens (orchestrator-executed).
- **Downstream effect:** confirms both artifacts as the governed input to implementation; feeds the decision package (§15).

### 13.2 Department 02 — client feasibility and implementation sequencing

- **Scope:** whether the §10 increments are implementable in coherent client increments on iOS/iPadOS; sequencing risk; the "no UI shell" rule.
- **Authoritative inputs:** §10, §12; `ARCHITECTURE.md`; `bounded-contexts.md`.
- **Evidence inspected:** §10 increment dependencies; F-17 complexity band (`feature-prioritization.md` F-17 = XL); §9.3 offline classes; §4 devices.
- **BLOCKING findings:** none.
- **Non-blocking findings:** **D02-N1** — F-17 (offline session reconciliation, XL) landing in a single increment alongside F-14/F-15/F-16 is a sequencing risk: an execution increment could be declared "done" with a UI that logs but does not reconcile, which the `scope-release` constraint forbids. *Remediation applied:* §10 INC-3 split into **INC-3a** (execution + logging + finalization) and **INC-3b** (reconciliation + correction), with **INC-3a not externally exposed until INC-3b passes**. **D02-N2** — minimum OS versions are unspecified; the offline-storage, media-capture, and Apple Pencil requirements constrain them. *Condition:* D02 fixes minimum OS versions at G4 implementation-design against the §5 capability set. **D02-N3** — the native media subsystem (`ARCHITECTURE.md`) vs the cross-platform client boundary needs a G4 design note so the subsystem stays a subsystem. *Condition:* architecture-reviewer confirms at INC-5 G2.
- **Conditions:** D02-N2, D02-N3; C-IND.
- **Disposition:** **`PASS_WITH_CONDITIONS`.**
- **Reviewer identity:** Department 02 `client-feature-lead` lens.
- **Downstream effect:** INC-3 split applied to §10; INC-5 gets an explicit subsystem-boundary G2 check.

### 13.3 Department 03 — backend, persistence, sync, media-processing, contract feasibility

- **Scope:** whether the required aggregates + cross-aggregate guards + seams are implementable; the offline substrate; media processing/storage; the D03-owned OPEN items.
- **Authoritative inputs:** §8, §9.3, §9.6; `domain-model.md` §4/§4.1/§10; `cross-context-contracts.md`.
- **Evidence inspected:** §8.2 aggregates + §8.3 seams; the domain-model §4.1 cross-aggregate invariants (one-Head-Coach guard, append-only A12, no denormalised Vault flag, SafetyNotification outbox, preservation-hold precondition); §9.3 accepted D03 safe defaults.
- **BLOCKING findings:** none.
- **Non-blocking findings:** **D03-N1** — `OQ-MEDIA-CACHE-INVALIDATION` is a hard design item for F-23/S-07; the scope must state the safe default is **accepted for v1**. *Remediation applied:* §8.3 seams 1/2, §9.3, and §14 now state explicitly that the safe default (server-authoritative revocation + best-effort purge; favour online-validated Vault access) is accepted for the v1 release, and S-07's §12 definition-of-done names the surviving-offline-copy case as a **documented known limitation, not a silent failure**. **D03-N2** — S-03 (offline substrate) must land before INC-3; §10 places it in INC-0 — confirmed adequate. **D03-N3** — contract *shapes* (schemas, transport) for seams 1–14 are D02/D03 work at G4 per bounded context; this scope must not be read as fixing them. *Condition:* stated in §8.3; re-confirmed. **D03-N4** — the reporting read-model pipeline (S-11) and `OQ-PF-AGG-METHOD` gate F-33 (already `MVP conditional`) and PF-03 (`MVP required`); PF-03's v1 safe default (suppress re-identifying cohorts; aggregate only over individually-visible athletes) is accepted. *Condition:* D03 confirms the suppression method at INC-10 G4.
- **Conditions:** D03-N3, D03-N4; C-IND. Residual open D03 items: `OQ-MEDIA-CACHE-INVALIDATION`, `OQ-PF-AGG-METHOD`, `OQ-SE-OFFLINE-P2P`, `OQ-SE-RECONCILE-UX` (UX), `OQ-PF-REPORT-OFFLINE` — all with safe defaults in force.
- **Disposition:** **`PASS_WITH_CONDITIONS`.**
- **Reviewer identity:** Department 03 `platform-data-lead` + `database-engineer` lens.
- **Downstream effect:** §8.3 / §9.3 / §12 (S-07) / §14 updated to state the accepted safe defaults explicitly.

### 13.4 Department 04 — authn, authz, tenant isolation, privacy, youth safety, communication, UGC, Vault visibility, retention, deletion, export

- **Scope:** every safety/authz/privacy surface; the ordering of user exposure vs the safety spine; the coach-edit boundary; Vault visibility; deletion/holds/export; legal open items.
- **Authoritative inputs:** baseline §2–§5, §6A; `WORKFLOW-ARCHITECTURE-v2.md` §5 (#1–#16), §7, §8, §8a.2, §9.1, §9.2; `domain-model.md` §6; `cross-context-contracts.md` 6, 8, 10, 11, 12, 13.
- **Evidence inspected:** §5 included set; §7 journeys J-5…J-11; §9.1/§9.2; **§10 increment ordering — media (INC-5), Vault (INC-6), communication (INC-8) vs the safety spine (INC-9)**; §11 completion definition; §11.2 legal sign-offs.
- **BLOCKING findings:**
  - **D04-B1** *(BLOCKING; remediated)* — an earlier draft of §10 sequenced the safety & governance spine (report/block, illegal-content escalation, Platform Safety Administrator tooling — F-29/F-38/F-39) **after** media (INC-5) and communication (INC-8) with no hard exposure gate. Shipping media or messaging for a 13–17 audience with no report/block path and no escalation recipient violates baseline §5 ("report/block available to every member ... regardless of role, tier, or group") and invariant #14. **Evidence:** `privacy-safety/WORKFLOWS.md` PS-02/PS-03 ("must not be used as an excuse to ship with no escalation recipient — the structural recipient ... is named"); `messaging/WORKFLOWS.md` MG-06 severity MAJOR. **Remediation applied:** §10 now states a **hard release gate** — *INC-9 complete + D04 G3 sign-off before any external user exposure of INC-5…INC-8* — repeated in §10.1, §11.1 (G3/G6 exit), and §11.3 clause 3. INC-9's "Conditions that block release" states it explicitly. **Re-run:** D04 re-review confirms the gate is now unambiguous and testable → finding **closed**.
  - **D04-B2** *(BLOCKING; remediated)* — an earlier draft's "Definition of MVP completion" did not require S-08 (preservation-hold fail-safe) to be in place before F-01 self-service deletion shipped; F-01 was in INC-1 and the governance spine (incl. the hold surface) in INC-9, so self-service deletion could ship ~8 increments before any hold enforcement, contradicting contract 11 ("holds fail safe — if the hold state cannot be confirmed, deletion/closure is blocked"). **Evidence:** `cross-context-contracts.md` contract 11; `identity-team/WORKFLOWS.md` IT-08 ("Deleting ... subject to a retention/legal hold ... is **blocked** until Department 04 releases the hold"). **Remediation applied:** §10 moved **S-08 into INC-0** (foundation), and INC-1's F-01/F-07 acceptance evidence + §12 now require the preservation-hold fail-safe to be integrated from INC-1 ("deletion blocked under an unconfirmed preservation hold"). The *assisted DSR intake* (F-37) may still follow in INC-9, but the hold fail-safe cannot. **Re-run:** D04 re-review confirms S-08 is a foundation dependency of F-01/F-07 and the §12 F-01 row tests it → finding **closed**.
- **Non-blocking findings:** **D04-N1** — `OQ-PS-MOD-STAFFING` (moderation staffing/SLA) is unresolved (P-F-01). *Condition:* a production-launch gate condition (§11.1 G6, §11.2 by reference); interim: escalations queue durably and are worked in severity order. **D04-N2** — the F-22 publication mechanism and the F-28 group-channel-attachment slice share the same D04-owned consent block and must activate together (P-F-02). *Condition:* §6.1 records the joint activation condition. **D04-N3** — the coach→minor DM un-suppressible-notification requirement (`OQ-MG-OVERSIGHT` compensating control) must be explicit in F-27's acceptance. *Remediation applied:* §12 F-27 row now states "a coach→minor DM notification lands at least in-app even when muted". **D04-N4** — `OQ-PR-FIELDS` default-deny (only display name + role coach-visible) must be the F-08 acceptance baseline. *Confirmed present* in §12 F-08.
- **Conditions:** D04-N1, D04-N2; C-IND; the §11.2 production-launch legal sign-offs.
- **Disposition:** **`PASS_WITH_CONDITIONS`** (after D04-B1 and D04-B2 remediation). **No hard youth-safety, privacy, or authorization boundary is violated by the scope as remediated.**
- **Reviewer identity:** Department 04 `security-compliance-lead` + `youth-trust-safety-specialist` lens.
- **Downstream effect:** the INC-9 exposure gate and the S-08-in-INC-0 move are now load-bearing in §10/§11; §12 F-27 tightened.

### 13.5 Department 05 — testability, CI, environments, observability, release readiness, acceptance gates

- **Scope:** whether every included capability is verifiable; CI/environment/observability adequacy; G5/G6/G8 criteria.
- **Authoritative inputs:** §11, §12; `gates.yaml`; `feature-delivery.md`; `stridelab-ai/scripts/validate-*.mjs`.
- **Evidence inspected:** §12 definition-of-done table (44 rows); §11.1 gate criteria; §10 per-increment acceptance evidence; the four repository validators.
- **BLOCKING findings:** none.
- **Non-blocking findings:** **D05-N1** — the §12 acceptance criteria need an explicit shared "happy + denied + empty + offline-reconnect + audit" clause so each row is not read in isolation. *Remediation applied:* §12 now opens with that shared clause. **D05-N2** — S-13 (release readiness) must be in the foundation increment, not deferred. *Confirmed:* §10 INC-0 includes S-13. **D05-N3** — the offline-critical paths (F-14…F-18) need on-device reliability criteria at G5, not just functional tests. *Condition:* D05 defines the on-device reliability bar at G5 for INC-3a/INC-3b. **D05-N4** — G8 production verification should map to the J-1…J-11 journeys. *Remediation applied:* §11.1 G8 exit criteria now name "critical journeys (J-1…J-11)".
- **Conditions:** D05-N3; C-IND.
- **Disposition:** **`PASS_WITH_CONDITIONS`.**
- **Reviewer identity:** Department 05 `quality-release-lead` + `production-readiness-reviewer` lens.
- **Downstream effect:** §12 shared clause added; §11.1 G8 mapped to journeys.

### 13.6 Department 06 — entitlement and operational implications (billing is not authorization)

- **Scope:** F-40 / F-42 / F-41; confirm no billing implementation is smuggled into v1; confirm `payment ≠ authorization` structurally.
- **Authoritative inputs:** baseline §6A/§6B; `WORKFLOW-ARCHITECTURE-v2.md` §8b; `cross-context-contracts.md` contract 6; `billing-entitlements/WORKFLOWS.md`.
- **Evidence inspected:** §5 (F-42 as interface only), §6.1 (F-40 gating conditional), §6.2 (F-41 Post-MVP), §10 INC-11, §12 F-42/F-40 rows.
- **BLOCKING findings:** none.
- **Non-blocking findings:** **D06-N1** — the scope must state unambiguously that **no BE-02/BE-03/BE-04/BE-06 workflow is implemented in v1** and that F-40/F-42 do **not** constitute a billing implementation requiring a D06 entitlement artifact. *Remediation applied:* §2, §6.2, §10 INC-11, and §11.3 now say this explicitly. **D06-N2** — `OQ-BE-TIER-STRUCTURE` (Free/Mid/Top not D06-ratified) and `OQ-BE-BILLING-OWNER` remain D06-owned; the tier-state *field* shipping does not ratify the structure. *Condition:* §14 records both as unresolved D06-owned items; the field is a data placeholder only.
- **Conditions:** D06-N2; C-IND.
- **Disposition:** **`PASS_WITH_CONDITIONS`.** `payment ≠ authorization` is preserved structurally (F-42 typing discipline; no authorization path consumes a BE-05 flag).
- **Reviewer identity:** Department 06 `operations-governance-reviewer` lens.
- **Downstream effect:** §2/§6.2/§10/§11.3 clarified; §14 records the D06 items.

### 13.7 Root architecture reviewer — bounded-context boundaries, dependency direction, deployable-service implications

- **Scope:** does the scope change any boundary, reverse any dependency, or introduce an unjustified deployable workload?
- **Authoritative inputs:** `ARCHITECTURE.md`; `bounded-contexts.md`; `cross-context-contracts.md`; `WORKFLOW-ARCHITECTURE-v2.md` §8c.
- **Evidence inspected:** §8.1 contexts (all pre-existing), §8.3 seams (14, unchanged), §9.6 workloads, §10 INC-5 (`services/media-worker`), F-42 as the single BE-05 derivation point.
- **BLOCKING findings:** none.
- **Non-blocking findings:** **ARCH-N1** — `services/media-worker` is the only new deployable workload; its topology needs an explicit G2 sign-off at INC-5. *Remediation applied:* §10 INC-5 "Required reviews / gates" names a "deployable-topology review for `services/media-worker`". **ARCH-N2** — F-42 as the single entitlement-derivation point matches the G2 ratification of BE-05 (contract 6); the flag-interface *shape* (C-5) is dischargeable at contract-shape time. *Condition:* architecture-reviewer confirms the flag typing at INC-0 / INC-11 G2. **ARCH-N3** — the domain-model §4.1 cross-aggregate guards are architecture-relevant schema-design inputs, not just D03 concerns. *Confirmed:* §8.2 names them as hard G4 inputs.
- **Conditions:** ARCH-N2; C-IND.
- **Disposition:** **`PASS_WITH_CONDITIONS`.** No bounded-context boundary changed; dependency direction preserved on every seam; no unjustified extraction.
- **Reviewer identity:** `architecture-reviewer` lens.
- **Downstream effect:** INC-5 gets an explicit topology G2; INC-0/INC-11 get a flag-typing G2 check.

### 13.8 Cross-department reviewer — contradictions, missing dependencies, hidden assumptions, incomplete end-to-end journeys

- **Scope:** synthesis across §13.1–§13.7; hidden assumptions; journey completeness; the completion definition.
- **Authoritative inputs:** all of the above + `feature-prioritization.md` §7 findings.
- **Evidence inspected:** the §13 dispositions; §7 journeys for missing dependencies; §11.3 completion definition; §14 open-questions register; the P-F-01…P-F-06 findings from Phase A.
- **BLOCKING findings:**
  - **CDR-B1** *(BLOCKING; remediated)* — an earlier draft's "Definition of MVP completion" (§11.3) did not require the **production-launch legal sign-offs** (`OQ-IT01-AGE-VERIFY`, `OQ-PS07-JURISDICTION`, `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`) to be **obtained or explicitly accepted at G7**. A youth product cannot be declared "MVP complete / ready for launch" with jurisdiction-specific age-verification and under-13 / data-subject / illegal-content-reporting duties merely defaulted and unacknowledged. **Evidence:** `WORKFLOW-ARCHITECTURE-v2.md` §9.2 rows for those IDs ("blocking stage: production launch legal sign-off" / "production moderation ops"); baseline §8 ("none is an approved legal interpretation"). **Remediation applied:** §11.2 added ("Production-launch legal sign-offs" — named conditions on G3/G7); §11.3 clause 7 added; the decision package §15 lists them as explicit conditions requiring human acknowledgement. **Re-run:** cross-department re-review confirms the completion definition now cannot be met without addressing them → finding **closed**.
- **Non-blocking findings:** **CDR-N1** — J-7 exercises F-22 and the F-28 group-channel slice only in their *inactive* form; a reader could assume publication is in v1. *Remediation applied:* §7 coverage check + §6.1 state F-22 ships **disabled**. **CDR-N2** — the Phase A findings P-F-01…P-F-06 need explicit carry-through to this scope's open-questions register. *Remediation applied:* §14 now maps each. **CDR-N3** — the reviewer-independence caveat (C-IND) should be visible in the decision package, not only here. *Remediation applied:* §15 lists C-IND as a non-blocking condition.
- **Conditions:** C-IND; the §11.2 legal sign-offs; all inherited §13.1–§13.7 conditions.
- **Disposition:** **`PASS_WITH_CONDITIONS`** (after CDR-B1 remediation).
- **Reviewer identity:** `cross-department-reviewer` lens.
- **Downstream effect:** §11.2 + §11.3 clause 7 + §14 mapping + §15 conditions added.

### 13.9 Remediation log — blocking findings

| Finding | Raised by | Classification | Remediation applied to | Re-run result |
|---|---|---|---|---|
| **D04-B1** — safety spine sequenced after media/messaging with no hard exposure gate | D04 | BLOCKING | §10 (hard release gate: INC-9 + D04 G3 before any external exposure of INC-5…INC-8), §10.1, §11.1 (G3/G6), §11.3 clause 3, INC-9 "Conditions that block release" | D04 re-review → gate unambiguous + testable → **closed** |
| **D04-B2** — S-08 preservation-hold fail-safe not required before F-01 self-service deletion | D04 | BLOCKING | §10 (S-08 moved into INC-0), INC-1 F-01/F-07 acceptance evidence, §12 F-01 row | D04 re-review → S-08 is a foundation dependency; §12 F-01 tests it → **closed** |
| **D02-N1** — F-17 (XL) in one increment; execution increment could pass as a UI shell without reconciliation | D02 | non-blocking (raised to structural fix) | §10 INC-3 split into INC-3a / INC-3b; INC-3a not externally exposed until INC-3b passes | D02 re-review → split accepted → **closed** |
| **CDR-B1** — completion definition omitted the production-launch legal sign-offs | cross-department | BLOCKING | §11.2 (new), §11.3 clause 7 (new), §15 decision package | cross-department re-review → completion definition now requires them → **closed** |

**Open BLOCKING findings after remediation: zero.**

### 13.10 Non-blocking conditions carried forward

| ID | Condition | Owner | Where it lands |
|---|---|---|---|
| C-IND | An independent specialist reviewer per Department (separate from this authoring pass) confirms the §13 dispositions before G7. | root orchestrator + Department leads | §15 decision package |
| D01-N1 | Revisit F-10 (templates) classification at G4 increment planning; may move to `MVP conditional`. | D01 | INC-2 G4 |
| D01-N2 | Open a `user-research-usability` work package for `OQ-MG07-DEFAULTS`, `OQ-SE-RECONCILE-UX` presentation, `OQ-MG-BLOCK-SAFE-COLLAPSE` classifier. | D01 | post-approval work package |
| D02-N2 | Fix minimum iOS/iPadOS versions at G4 against the §5 capability set. | D02 | INC-1 G4 |
| D02-N3 | Native media subsystem boundary G2 note at INC-5. | architecture-reviewer | INC-5 G2 |
| D03-N3 | Contract *shapes* for seams 1–14 designed by D02/D03 at G4 per bounded context (not fixed here). | D02 + D03 | each increment G4 |
| D03-N4 | Confirm the PF-03 cohort-suppression method at INC-10 G4. | D03 | INC-10 G4 |
| D04-N1 | `OQ-PS-MOD-STAFFING` — resolve or accept an interim staffing plan before production launch. | D04 | G6 / §11.2 |
| D04-N2 | Activate F-22 and the F-28 group-channel-attachment slice together, on the D04 consent mechanism. | D01 + D04 | conditional activation |
| D05-N3 | Define the on-device reliability bar for INC-3a/INC-3b at G5. | D05 | INC-3 G5 |
| D06-N2 | `OQ-BE-TIER-STRUCTURE` + `OQ-BE-BILLING-OWNER` remain D06-owned; the tier-state field does not ratify the structure. | D06 | §14 |
| ARCH-N2 | Confirm the BE-05 flag-interface typing (contract 6 C-5) at INC-0 / INC-11 G2. | architecture-reviewer | INC-0 / INC-11 G2 |

---

## 14. Known risks, open questions, and safe defaults

No `§9.2` item is resolved here. Items **gating an included capability** are listed with the safe default that is **accepted for the v1 release** (subject to the G7 approval per §11.3 clause 6). The complete register is `WORKFLOW-ARCHITECTURE-v2.md` §9.2.

| Area | OPEN items (gating an included capability) | Safe default accepted for v1 | Blocking stage |
|---|---|---|---|
| Age / under-13 / legal | `OQ-IT01-AGE-VERIFY`, `OQ-PS07-JURISDICTION`, `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`, `OQ-IT01-REJECT-RETENTION` | self-attestation ≥13 + PS-07 path; strictest known duty + escalate to counsel; best-effort DSR timeline; no automated external reporting (human + legal-counsel-gated); minimal hashed-identifier retention for rejected attempts | **production launch legal sign-off** (§11.2) — obtained or explicitly accepted at G7 |
| Moderation ops | `OQ-PS-MOD-STAFFING`, `OQ-PS-HC-IMPLICATED-PROCESS`, `OQ-MG-MOD-THRESHOLD`, `OQ-PS-CLASSIFY`, `OQ-MG-REPORTED-NOTICE` | escalations queue durably, worked in severity order; platform review with possible IT-06/TA-01 + legal handoff; Head Coach handles what they can, else escalate; reporter-selected illegal/imminent-harm routes to PS-09 (over-inclusion safer); reported individual not auto-notified | production launch of the report path (F-29/F-39); automated triage/classification = Post-MVP |
| Media / Vault sync | `OQ-MEDIA-CACHE-INVALIDATION`, `OQ-VS02-MULTISUBJECT`, `OQ-MD06-AUTHORITY`, `OQ-MD-CAPTURE-NOTICE`, `OQ-VS03-HC-REVOKE`, `OQ-VS03-NOTICE`, `OQ-VS02-RIGHTS` | server-authoritative revocation + best-effort purge; favour online-validated Vault access; multi-subject onward re-share **blocked**; publication **disabled** (Head-Coach + per-minor consent required, else blocked); no capture-time consent step; no ordinary Head-Coach revoke (moderation path only); ordinary revocation silent; VS-02 share view-only | the sync/caching design (D03); F-22 activation (D04 consent mechanism) |
| Session sync | `OQ-SE-RECONCILE-UX`, `OQ-SE-OFFLINE-P2P`, `OQ-SE-COACH-OVERRIDE`, `OQ-SE-AUTOFINALIZE`, `OQ-SE-ATHLETE-SELFSTART`, `OQ-SE-SELFCHECKIN`, `OQ-SE-RPE-FLAG`, `OQ-SE10-WINDOW` | SE-09 state machine + non-loss/attribution guarantees (presentation is a follow-up); queue-until-reconnect, no P2P; no silent coach override; no auto-finalization; no athlete self-start / self-check-in; no automatic RPE flag; no time limit on athlete correction | reconciliation-UI implementation; each feature toggle = Post-MVP |
| Profile / identity | `OQ-PR-FIELDS`, `OQ-PR-DOB-EDIT`, `OQ-PR-AGE-BAND`, `OQ-IT04-JOIN-MECHANISM`, `OQ-IT08-GRACE`, `OQ-IT07-VERIFY-STRENGTH`, `OQ-IT03-PRESCOPE` | only IT-01 shell fields; only display name + role coach-visible; DOB frozen after verification; boolean `is_minor` only; **direct invitation only**; 30-day recoverable grace; verified-channel proof + rate limit; invitation carries a proposal not an authorization | adding any profile field; any non-invitation join path; deletion implementation |
| Retention | `OQ-DD-RETENTION`, `OQ-MG-RETENTION`, `OQ-PW-RETENTION-DURATION`, `OQ-MD07-RETENTION`, `OQ-PS07-RETENTION`, `OQ-MD07-ARCHIVE-STATE`, `OQ-MD06-UNPUBLISH` | retain while an owning account is active; follow the account-level policy on final deletion; held content survives; hard deletion only (no `archived` state); unpublish = remove from the authoritative audience view + best-effort cache invalidation | the deletion/retention implementation |
| Performance / reporting | `OQ-PF-AGG-METHOD`, `OQ-PF-REPORT-OFFLINE`, `OQ-PF-MINOR-EXPORT`, `OQ-PW-COACH-VISIBILITY` | suppress re-identifying cohorts; aggregate only over individually-visible athletes; own-data reports offline OK with a freshness marker, group reports need connectivity; athlete may always export own data, coach export bounded to current scope; personal workouts not visible to any coach | PF-03 implementation; F-33 / F-34-cond activation |
| Team admin | `OQ-TA-MULTIGROUP`, `OQ-TA-REPARENT`, `OQ-TA-SETTINGS-CATALOGUE`, `OQ-TP-OVERLAP`, `OQ-TP-TEMPLATE-SHARING`, `OQ-TP-HC-OVERRIDE`, `OQ-TP-PROMOTE` | multi-group athlete assignment allowed at Head-Coach discretion; re-parenting disabled; only two recognised settings; overlaps allowed (coach owns coherence); templates author-private; Head Coach may modify an Event-Coach artifact (attributed + audited); no in-place cycle promotion | each feature = Post-MVP |
| Messaging | `OQ-MG-OVERSIGHT`, `OQ-MG-HC-CHANNEL`, `OQ-MG-BLOCK-SAFE-COLLAPSE`, `OQ-MG07-DEFAULTS` | no standing third-party visibility into coach↔athlete threads; no standing Head-Coach channel access; collapse ordinary content only (never a safety message); social on + unbundled + no quiet hours until customised | any oversight/visibility feature; the collapse UI |
| Commercial | `OQ-BE-TIER-STRUCTURE`, `OQ-BE-TIER-MAP`, `OQ-BE-BILLING-OWNER`, `OQ-BE-*` (provider/pricing/tax/IAP/trial/grace/overlimit), `OQ-IT09-REFUND` | Free/Mid/Top skeleton unratified; **no feature tier-gated**; Head Coach sole billing owner; **no paid billing ships in v1**; stop future billing on closure, no automatic refund | human approval of baseline §6 (D06); billing implementation |

**Phase A findings carried through:** P-F-01 → §11.2 + D04-N1; P-F-02 → §6.1 joint condition + D04-N2; P-F-03 → §9.4 + D01-N2; P-F-04 → §4 (web client out of scope); P-F-05 → §13.6/§13.7 (F-42 rationale confirmed, not scope creep); P-F-06 → §10 (dependency-ordered, not effort-ordered).

---

## 15. Decision package (for human approval — G7)

Per the task's approval-handling rules: all drafting, review, remediation, verification, and registry/current-state preparation are complete; **human approval is the only unresolved step.**

| Field | Value |
|---|---|
| **Artifacts** | `docs/product/feature-prioritization.md` (Phase A) and `docs/product/mvp-release-scope.md` (Phase B — this file). |
| **Versions** | Both `AWAITING_HUMAN_APPROVAL`, authored 2026-09-10. |
| **Repository state to approve** | The commit on branch `worktree-phase-1+dept01-step2-feature-prioritization-release-scope` that adds both artifacts, their two lifecycle records, the two `stridelab-ai/registry/artifacts.yaml` entries, and the `stridelab-ai/project-memory/current-state/README.md` index rows — built on `main`@`5db47f1`. (Exact SHA recorded in the completion report and to be pinned into the G7 approval record and both lifecycle records on merge.) |
| **Review dispositions** | D01 `PASS_WITH_CONDITIONS` · D02 `PASS_WITH_CONDITIONS` · D03 `PASS_WITH_CONDITIONS` · D04 `PASS_WITH_CONDITIONS` (after D04-B1 + D04-B2 remediation) · D05 `PASS_WITH_CONDITIONS` · D06 `PASS_WITH_CONDITIONS` · architecture-reviewer `PASS_WITH_CONDITIONS` · cross-department-reviewer `PASS_WITH_CONDITIONS` (after CDR-B1 remediation). |
| **Blocking findings** | **Zero open.** Three BLOCKING findings (D04-B1, D04-B2, CDR-B1) were raised and remediated in-artifact; the affected reviews were re-run and closed (§13.9). |
| **MVP inclusions** | 30 user-facing + 12 supporting capabilities (§5). |
| **Conditional capabilities** | F-19, F-22, F-33, F-34-cond, F-40 gating, S-09, S-10 — each with a named activation condition (§6.1). |
| **Major deferrals** | Paid billing (F-41); web client (F-P-14); Event Coach delegation (F-P-2); automated moderation triage (F-P-9); coach↔athlete thread oversight (F-P-8); shared template library (F-P-1); + F-P-3…F-P-16 (§6.2). |
| **Explicit exclusions** | F-EX-1…F-EX-10 (§6.3) — each invariant-mandated or needing a separate new product decision. |
| **Open decisions (not resolved by this approval)** | Every `§9.2` OPEN item in §14 keeps its owner + safe default; the production-launch legal sign-offs (§11.2); the commercial items (§14 Commercial row); `OQ-PS-MOD-STAFFING`. |
| **Non-blocking conditions** | C-IND (independent specialist review before G7) + the §13.10 table. |
| **Exact approval statement requested** | *"G7 APPROVED — the StrideLab MVP Feature Prioritization (`docs/product/feature-prioritization.md`) and the StrideLab MVP Release Scope (`docs/product/mvp-release-scope.md`), at commit `<SHA>`, are approved as the governed input to MVP implementation. The 30 user-facing + 12 supporting MVP-required capabilities, the 7 conditional capabilities with their activation conditions, the Post-MVP deferrals, the F-EX-1…F-EX-10 exclusions, the C1→C5 prioritization method, and the INC-0…INC-11 implementation sequence (with the hard gate that INC-9 completes with D04 G3 sign-off before any external user exposure of media or messaging, and INC-3a is not externally exposed before INC-3b passes) are adopted. Every `WORKFLOW-ARCHITECTURE-v2.md` §9.2 OPEN item that gates an included capability remains open under its named owner with its conservative safe default accepted for this release; no OPEN item is resolved, converted, or created. The production-launch legal sign-offs (`OQ-IT01-AGE-VERIFY`, `OQ-PS07-JURISDICTION`, `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`) and `OQ-PS-MOD-STAFFING` remain named conditions on G6/G7 for the eventual production launch. The Workflow Architecture v2, the governed product baseline, and the consolidated domain model remain separately approved and unchanged."* |

**This artifact does not assert approval.** Until a human records the statement above, both artifacts remain `AWAITING_HUMAN_APPROVAL` and no downstream Department may treat the MVP scope as locked.

---

## 16. Source artifact references

- Canonical (this file): `docs/product/mvp-release-scope.md`
- Upstream (Phase A): `docs/product/feature-prioritization.md`
- Lifecycle records: `stridelab-ai/project-memory/current-state/mvp-release-scope.md`, `stridelab-ai/project-memory/current-state/feature-prioritization.md`
- Approved upstream: `docs/product/product-baseline.md`, `docs/product/workflow-architecture.md` (+ `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md`), `docs/product/domain-model.md`, `ARCHITECTURE.md`
- Application map: `stridelab-ai/application-map/bounded-contexts.md`, `stridelab-ai/application-map/cross-context-contracts.md`
- Governance: `stridelab-ai/orchestration/ORCHESTRATOR.md`, `stridelab-ai/orchestration/phase-gates/gates.yaml`, `stridelab-ai/orchestration/approvals/` (`approval-policy.md`, `approval-matrix.yaml`), `stridelab-ai/shared/contracts/REVIEW-CONTRACT.md`
- Registry: `stridelab-ai/registry/artifacts.yaml`, `stridelab-ai/registry/bounded-context-owners.yaml`
