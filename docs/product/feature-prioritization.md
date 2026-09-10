# StrideLab MVP Feature Prioritization

**Status:** `AWAITING_HUMAN_APPROVAL` — Department 01 Step 2, Phase A. Authored 2026-09-10 by Department 01 Product & Experience (`product-strategist`, skills `product-strategy` + `user-research-usability`), orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md` and executed per `stridelab-ai/departments/01-product-experience/commands/strategy/prioritize-features.md`.
**Owning Department:** 01 Product & Experience. **Primary specialist:** `product-strategist`. **Department lead:** `product-experience-lead`.
**Companion artifact (Phase B):** `docs/product/mvp-release-scope.md` (translates this prioritization into one governed MVP release scope).

This artifact **prioritizes candidate capabilities** for the first StrideLab release. It is a **proposal**, not an approved decision. No `OQ-*` / `CD-*` item in `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §9.2 is resolved, converted, or created here; every conservative safe default remains in force. No product invariant is changed or contradicted. No navigation is designed (invariant #11; `ORCHESTRATOR.md` authority order).

---

## 1. Provenance & traceability

| Attribute | Value |
|---|---|
| Registry id | `feature-prioritization` (`stridelab-ai/registry/artifacts.yaml`) |
| Canonical path | `docs/product/feature-prioritization.md` (this file — one canonical location) |
| Lifecycle record | `stridelab-ai/project-memory/current-state/feature-prioritization.md` |
| Upstream (approved) | `product-baseline` (APPROVED, Diego 2026-09-08), `workflow-architecture` v2 (APPROVED, Diego 2026-09-07), `domain-model` (APPROVED, Diego 2026-09-10 — `stridelab-ai/orchestration/approvals/G7-domain-model.md`; published on `main` at commit `5db47f1`), `architecture-decision` (`ARCHITECTURE.md`, APPROVED) |
| Application map consumed | `stridelab-ai/application-map/bounded-contexts.md`, `stridelab-ai/application-map/cross-context-contracts.md` |
| Downstream consumers | `mvp-release-scope` (Phase B); Departments 02, 03, 04, 05, 06; `architecture-reviewer` |
| Owns | feature inventory, MVP-necessity classification, prioritization method, inclusion/deferral/exclusion rationale |
| Does not own | database schema, navigation/IA, billing mechanics, authorization policy, legal interpretations, release gate outcomes |

### 1.1 Authoritative inputs inspected

`AGENTS.md`; `CLAUDE.md` (root + project); `stridelab-ai/orchestration/ORCHESTRATOR.md`; `stridelab-ai/project-memory/current-state/` (README, `product-baseline.md`, `workflow-architecture-v2.md`, `domain-model.md`); `stridelab-ai/registry/artifacts.yaml`; `stridelab-ai/registry/bounded-context-owners.yaml`; `stridelab-ai/application-map/*`; `docs/product/product-baseline.md`; `docs/product/workflow-architecture.md`; `docs/product/domain-model.md`; `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` (§1–§12, incl. §5 the 16 invariants, §9.1 normative decisions, §9.2 the full OPEN register); all 13 `stridelab-ai/knowledge/workflows/*/WORKFLOWS.md` category files (86 workflows); `stridelab-ai/orchestration/approvals/` (`approval-policy.md`, `approval-matrix.yaml`, `G7-product-baseline.md`, `G7-workflow-architecture-v2.md`, `G7-domain-model.md`); `stridelab-ai/orchestration/phase-gates/gates.yaml` + `gate-execution.md`; `stridelab-ai/orchestration/dependency-graph/departments.yaml`; `stridelab-ai/orchestration/routing/routing-table.yaml`; `stridelab-ai/orchestration/workflows/feature-delivery.md`; `stridelab-ai/shared/contracts/*` (`WORK-PACKAGE-CONTRACT.md`, `HANDOFF-CONTRACT.md`, `REVIEW-CONTRACT.md`); Department 01 core skills `product-strategy`, `user-research-usability`; Department 01 agents `product-strategist`, `product-experience-lead`; `stridelab-ai/scripts/validate-*.mjs` (five validators, incl. the new `validate-step2-artifacts.mjs`).

### 1.2 Recorded status of the Step-1 domain model (confirmed per task instruction)

`docs/product/domain-model.md` is **APPROVED** (Diego, 2026-09-10). Confirmed from three governed sources that agree: the registry (`artifacts.yaml` → `domain-model.status: APPROVED` with `approved_by` / `approved_date` / `approval_record`), the approval record `stridelab-ai/orchestration/approvals/G7-domain-model.md` (verbatim human approval; DR-1 APPROVED, DR-2 APPROVED AS-IS, DR-3 CONFIRMED), and the artifact header (§12/§13). The Step-1 publication (registry flip, lifecycle record `stridelab-ai/project-memory/current-state/domain-model.md`, `docs/product/workflow-architecture.md` companion-pointer refresh, and the commit pin) is complete and internally consistent on `main` as of commit `5db47f1`. **Approval scope:** consolidation only — it restates content already normative via Workflow Architecture v2 §9.1 and the approved baseline, ratifies the five aggregate-ownership decisions in §4 (DR-2), and confirms `blocking_stage: before_G4_per_bounded_context` (DR-3). It resolves **no** `OQ-*` / `CD-*` item. This prioritization uses its aggregates (A1–A35), entities/value objects, ownership rules, lifecycles, glossary, the 16→aggregate invariant mapping, and the bounded-context/seam map as primary input, and **does not silently change or contradict it**.

---

## 2. Prioritization method

### 2.1 Evidence posture (stated, per the `product-strategy` skill)

There is **no** StrideLab user research, market study, analytics, production telemetry, or engineering effort estimate in the repository. Per the skill's anti-patterns ("Do not invent market evidence, user research, effort estimates, or implementation facts"), this prioritization is **derived entirely from approved artifacts**: the governed product baseline, Workflow Architecture v2 (86 workflows + 16 invariants + §9.1 decisions + §9.2 OPEN register), the approved consolidated domain model (35 aggregates + lifecycles + contracts), and `ARCHITECTURE.md`. Every necessity claim traces to one of those. Complexity is a **qualitative relative band**, explicitly not an engineering estimate — Departments 02/03 own real estimates at G4.

### 2.2 Method: invariant-and-dependency-driven MVP-necessity classification

Each candidate capability is scored against five criteria, then classified. The criteria are applied in a **fixed tie-break order** (lexicographic) rather than a weighted numeric sum, because a weighted score would imply a precision the available evidence does not support and could let "value" points override a safety obligation.

| # | Criterion | What it asks | Source of truth |
|---|---|---|---|
| C1 | **Invariant-completion necessity** | Does an approved safety / authorization / privacy / youth-safety / offline / architectural invariant *require* this capability to exist for any included user-facing capability to ship **honestly**? (e.g. media capture cannot ship without VS-01/VS-03 revocation and MG-06 report/block.) | baseline §2–§7; §5 invariants #1–#16 + §6A; domain-model §6 |
| C2 | **Core-value necessity** | Is the capability on the critical path of the stated core value loop — *organize teams → plan training → execute & log workouts → record & analyse practice media → communicate → review athlete performance* — for at least one primary role, end to end? | product objective; baseline §1; workflow dependency graph (WORKFLOW-ARCHITECTURE-v2.md §3) |
| C3 | **Dependency position** | What must exist upstream (bounded context, aggregate, contract seam) before this can function? Used for *sequencing*, and to reject "UI-shell-only" completion. | domain-model §4/§8; app-map contracts 1–14; §3 dependency graph |
| C4 | **Risk & uncertainty** | Which `§9.2` OPEN items gate it, and does a conservative safe default let v1 proceed? Youth-safety sensitivity. Higher risk → tighter scope slice or a `MVP conditional` activation condition, never a silent assumption. | §9.2 register; risk-sensitive routing (`ORCHESTRATOR.md`) |
| C5 | **Engineering complexity (relative, qualitative)** | Rough build weight **S / M / L / XL**. **Not an engineering estimate** — a labelled assumption for sequencing only; D02/D03 own real estimates. | orchestrator judgement over domain-model lifecycles + offline criticality (WORKFLOW-ARCHITECTURE-v2.md §6) |

**Tie-break order:** C1 → C2 → C3 → C4 → C5. A capability that C1 makes mandatory is **MVP required** regardless of its C2 "value", because shipping the thing that needs it without it would violate an approved invariant.

### 2.3 Classification vocabulary

| Class | Meaning |
|---|---|
| **MVP required** | Must be in the first release. Either C1 (an included capability structurally requires it) or C2 (core-value critical path) holds, and C3 dependencies are satisfiable in the release, and C4 has a safe default that lets v1 proceed. |
| **MVP conditional** | In scope **only if a named activation condition is met** (an OPEN item resolves; a Department artifact lands; a Team opts in via an existing product control). Ships behind that condition — never as a silent assumption. The safe default (usually "disabled / not activated") holds until the condition is met. |
| **Post-MVP** | Real capability, deferred to a later release. Not on the core-value critical path and not required by an included capability's invariant; its `§9.2` safe default is an acceptable v1 experience. |
| **Excluded from the current release** | Explicitly out of scope: contradicts an approved invariant, is a revoked decision, needs a new product decision + human approval, or is named out of scope by the baseline. |

### 2.4 Limitations and assumptions (labelled)

- **[assumption]** The primary roles to serve end-to-end in v1 are **Head Coach / Team Creator**, **Event Coach**, and **Athlete** (baseline §2). The **Platform Safety Administrator** (D04) is a required platform actor, not an end-user role.
- **[assumption]** Target surface is **iOS / iPadOS** ("iOS-first, iPad-oriented", baseline §1). A web client and federated-identity sign-in are treated as out of the MVP surface (F-P-14, F-P-15). `domains/*/web/` scaffolds existing in the repo do not imply a web client in scope.
- **[assumption]** Complexity bands (C5) are relative orchestrator judgement, **not** estimates. Any figure a reader infers as effort is out of scope for D01 and owned by D02/D03 at G4.
- **[limitation]** No usability evidence exists for a 13–17 primary audience; UX-detail decisions (`OQ-MG07-DEFAULTS`, reconciliation UX `OQ-SE-RECONCILE-UX`, block-collapse UI `OQ-MG-BLOCK-SAFE-COLLAPSE`) are named as `user-research-usability` follow-ups, not resolved here.
- **[limitation]** "No paid billing ships in v1" (baseline §6B) is an approved-in-force default, not a D06-ratified commercial decision; the commercial-tier *structure* (`OQ-BE-TIER-STRUCTURE`) and mapping (`OQ-BE-TIER-MAP`) remain D06-owned and unresolved.
- **[assumption]** "Feature" = a coherent user- or system-capability that can be accepted as a unit. One feature may span several workflow IDs; some workflow IDs (PS-02/04/05/06, VS-04) are cross-cutting framing/checkpoints folded into the feature that owns their mechanism.

### 2.5 Notation — citing Workflow Architecture v2 independent-review findings

`docs/product/workflow-architecture.md` §Closure records 24 independent-review findings whose canonical identifiers are **`F-01`…`F-24`**. Those collide with the feature IDs `F-01`…`F-42` introduced in this artifact. To keep every reference unambiguous, this artifact and `docs/product/mvp-release-scope.md` cite a Workflow-Architecture-v2 independent-review finding as **`WA2-F-NN`** (e.g. `WA2-F-04` = the MG-05 chat-attachment finding). This is a **citation label only** — it does not rename, re-scope, or change the status of the upstream finding, which retains its canonical `F-NN` identity in `docs/product/workflow-architecture.md`. A bare `F-NN` in these two artifacts always means the feature. The domain-model persistence findings keep their own distinct prefix `F-D03-NN`.

---

## 3. Candidate feature inventory — master table

**42 candidate features** (`F-01`…`F-42`), plus **13 cross-cutting supporting capabilities** (`S-01`…`S-13`, §3.1). Every ID's classification is tallied in §5 and enforced by `stridelab-ai/scripts/validate-step2-artifacts.mjs`. Columns: **Ctx** = bounded context(s); **Agg** = principal domain-model aggregates; **Actor** = primary actor; **Dep** = dependency tier (0 = platform foundation, 1 = identity/team, 2 = planning, 3 = execution, 4 = media, 5 = downstream/derived, X = cross-cutting); **Cx** = relative complexity band; **Class** = classification.

| ID | Feature | Workflows | Ctx | Agg | Actor | Dep | Cx | Class |
|---|---|---|---|---|---|---|---|---|
| F-01 | Account lifecycle (signup, recovery, deletion) | IT-01, IT-07, IT-08 | identity | A1 | Account owner | 1 | M | **MVP required** |
| F-02 | Team creation + `Team→EventGroup→Subgroup` hierarchy | IT-02, TA-02, TA-03 | identity, teams | A3 | Head Coach | 1 | M | **MVP required** |
| F-03 | Membership: invite, join, leave, remove, role assign, Head-Coach transfer | IT-03, IT-04, IT-06, TA-01 | teams | A4 | Head Coach / invitee | 1 | L | **MVP required** |
| F-04 | Multi-Team context switching | IT-05 | identity, teams | A1, A4 | Multi-Team user | 1 | S | **MVP required** |
| F-05 | Athlete + Event-Coach group assignment (management scope) | TA-04, TA-05 | teams | A4 | Head Coach | 1 | M | **MVP required** |
| F-06 | Team settings + `personal_workouts_allowed` toggle | TA-06, TA-07 | teams | A3 | Head Coach | 1 | S | **MVP required** |
| F-07 | Team closure / dissolution (archive-first, recoverable) | IT-09 | identity, teams, governance | A3, A33 | Head Coach | 1 | L | **MVP required** |
| F-08 | User-owned profile + visibility resolution (PR-03) | PR-01, PR-02, PR-03 | profile (in identity) | A2 | Account owner | 1 | M | **MVP required** |
| F-09 | Training-plan hierarchy authoring (Macro/Block/Week/Session) | TP-01, TP-02, TP-03, TP-04 | training | A5–A8 | Coach | 2 | L | **MVP required** |
| F-10 | Session/workout templates | TP-05 | training | A9 | Coach | 2 | S | **MVP conditional** |
| F-11 | Plan duplication (scope-narrowing enforced) | TP-06 | training | A5–A9 | Coach | 2 | S | **MVP required** |
| F-12 | Plan assignment to athletes/groups | TP-07 | training | A10 | Coach | 2 | M | **MVP required** |
| F-13 | Plan modification (published / in-progress) | TP-08 | training | A8, A10 | Coach | 2 | M | **MVP required** |
| F-14 | Practice execution — start, attendance, delivery, in-session mods | SE-01, SE-02, SE-03, SE-04 | sessions | A11 | Coach + Athlete | 3 | L | **MVP required** |
| F-15 | Athlete logging — results, completion status, effort/RPE/notes | SE-05, SE-06, SE-07 | sessions | A12 | Athlete | 3 | M | **MVP required** |
| F-16 | Session finalization | SE-08 | sessions | A11, A12 | Coach | 3 | S | **MVP required** |
| F-17 | Offline session reconciliation | SE-09 | sessions, sync | A13 | Coach + Athlete | 3 | XL | **MVP required** |
| F-18 | Athlete post-finalization correction (audited amendment) | SE-10 | sessions | A12 | Athlete | 3 | M | **MVP required** |
| F-19 | Personal workouts — create, log, edit/delete | PW-01, PW-02, PW-03 | workouts | A14 | Athlete | 3 | M | **MVP conditional** |
| F-20 | Media capture, import, private draft library, lifecycle/delete, session-attach | MD-01, MD-02, MD-03, MD-04, MD-07 | media, media-worker, storage | A15 | Coach + Athlete | 4 | L | **MVP required** |
| F-21 | Tag athlete(s) in media | MD-05 | media | A15 (Tag) | Coach + Athlete | 4 | S | **MVP required** |
| F-22 | Team media publication (consent-gated) | MD-06 | media, governance | A15 (Publication) | Head Coach | 4 | M | **MVP conditional** |
| F-23 | Vault grant / share / revoke + visibility resolution (VS-04 checkpoint) | VS-01, VS-02, VS-03, VS-04 | vault | A16, A17 | Media owner / coach | 4 | L | **MVP required** |
| F-24 | Video analysis tooling — playback, markers/drawings/Pencil, clips, comparison, save | AN-01…AN-06 | analysis | A18 | Coach + Athlete | 4 | L | **MVP required** |
| F-25 | Coaching feedback delivery (scope-bounded share of analysis output) | AN-07 | analysis, vault | A19 | Coach | 4 | S | **MVP required** |
| F-26 | Group channels (Team / Event Group / Subgroup) | MG-01, MG-02, MG-03 | messaging | A20 | All members | 1 | M | **MVP required** |
| F-27 | Coach ↔ athlete private chat | MG-04 | messaging | A21 | Coach + Athlete | 1 | M | **MVP required** |
| F-28 | Chat attachments (stricter-transition routing) | MG-05 | messaging, media, vault | A21, A15/A16/A17 | Poster | 4 | M | **MVP required** |
| F-29 | Report / block / moderation path | MG-06, PS-02 | messaging, governance | A22, A23, A29 | Any member | X | L | **MVP required** |
| F-30 | Notification preferences (safety / operational / social classes) | MG-07 | messaging | A24 | Account owner | 1 | S | **MVP required** |
| F-31 | Performance & history views (workout, training, metrics, PB/PR) | PF-01, PF-02, PF-03, PF-04 | performance | A25 + derived | Athlete + coach | 5 | M | **MVP required** |
| F-32 | Reports (own-data) | PF-05 | reporting | A26 | Athlete + coach | 5 | S | **MVP required** |
| F-33 | Reports (group / Team) | PF-05 | reporting | A26 | Coach | 5 | M | **MVP conditional** |
| F-34 | Data export | PF-06 | reporting | A27 | Athlete (self) / coach | 5 | M | **MVP required** (athlete self) / **conditional** (coach ext. minor data) |
| F-35 | Age 13+ enforcement | PS-01 | identity, governance | A1, A30 | Prospective user | 1 | S | **MVP required** |
| F-36 | Discovered under-age handling (restricted-first, governed closure) | PS-07 | governance | A30 | Platform Safety Admin | X | M | **MVP required** |
| F-37 | Data Subject Request intake (assisted) | PS-08 | governance | A31 | Data subject / guardian | X | M | **MVP required** (assisted) |
| F-38 | Illegal-content & mandatory-escalation path | PS-09 | governance | A32 | Platform Safety Admin | X | M | **MVP required** |
| F-39 | Platform Safety Administrator role + moderation/escalation tooling | PS-03 + cross-cutting | governance | A29, A33 | Platform Safety Admin | X | L | **MVP required** (role + tooling; staffing = launch condition) |
| F-40 | Commercial tier state (Free/Mid/Top skeleton; no gating) | BE-01 | billing | A28 | Head Coach | 1 | S | **MVP conditional** |
| F-41 | Paid billing (trial/subscription, upgrade/downgrade, failed-payment/grace) | BE-02, BE-03, BE-04, BE-06 | billing | A28 | Head Coach | 5 | L | **Post-MVP** |
| F-42 | Entitlement derivation interface (BE-05 single point; flag ≠ authz predicate) | BE-05 | billing, entitlements | A28 (EntitlementSet DS) | System | X | S | **MVP conditional** (deferred with F-40 gating; the one load-bearing v1 rule moves into S-02) |

### 3.1 Cross-cutting supporting capabilities (system, not screens) — required for the user-facing set to function

| ID | Capability | Serves | Contract / invariant | Class |
|---|---|---|---|---|
| S-01 | Authentication + active-Team-context resolution | every Team-scoped feature | contract 7; IT-05 | **MVP required** |
| S-02 | Authorization & tenant-isolation kernel (role / management-scope / communication-reach kept distinct; per-request evaluation against current authoritative state; no stale-cache elevation; **+ the build-time rule that no `identity` / `teams` / `vault` / `profile` / `performance` authorization path references a commercial / entitlement flag type — the one load-bearing v1 clause of invariant #9, absorbed here when F-42 was reclassified conditional**) | every feature | invariants #2, #3, #9, #15; contracts 6 (C-5), 7, 8 | **MVP required** |
| S-03 | Offline / local-first sync substrate (queue, pending-vs-server-durable state, reconciliation hooks, no last-write-wins) | F-14…F-19, F-20, F-26…F-28 | invariant #13; contracts 9, 14 | **MVP required** |
| S-04 | Durable safety-notification capability (transactional in-app state + retry + idempotent processing + delivery/ack state + audited terminal failure + human escalation) | F-21, F-22, F-23, F-29, F-36, F-38 | invariant #14; contract 10 | **MVP required** |
| S-05 | Audit-log capability (append-only; every destructive/authorization-sensitive transition) | F-01…F-39 | invariant #12; A35 | **MVP required** |
| S-06 | Media-processing worker(s) — independently deployable | F-20, F-22, F-23, F-24, F-28 | `ARCHITECTURE.md`; `services/media-worker/` | **MVP required** |
| S-07 | Media storage + revocation-aware delivery (favour online-validated access over long-lived local cache) | F-20, F-22, F-23, F-24 | contracts 1, 2; `OQ-MEDIA-CACHE-INVALIDATION` (safe default in force) | **MVP required** |
| S-08 | Preservation-hold / governance safety-enforcement seam (fail-safe: unconfirmed hold blocks deletion) | F-07, F-20, F-23, F-36, F-38, F-01 | contract 11; A33 | **MVP required** |
| S-09 | DSR fan-out / erasure orchestration | F-01, F-34, F-37 | contract 12; A31 | **MVP conditional** (manual-assisted fan-out in v1; automated fan-out Post-MVP) |
| S-10 | Realtime messaging transport (low-latency delivery) | F-26, F-27, F-28 | `platform/realtime/` | **MVP conditional** (messaging required; realtime latency is a quality target — queue/sync delivery is the safe default) |
| S-11 | Reporting / analytics read-model pipeline (scope-bounded projections; suppress re-identifying cohorts) | F-31, F-32, F-33 | contract 5; `OQ-PF-AGG-METHOD` (safe default in force) | **MVP required** (at PF-01…04 level) |
| S-12 | Accessibility baseline — iOS/iPadOS: VoiceOver, Dynamic Type, contrast, hit targets, Apple Pencil with a touch fallback (AN-03), captions/transcripts posture for media | F-08, F-14, F-15, F-24, F-26, F-27, F-31 | `product-strategy` skill ("privacy, offline, role scope, media sensitivity are constraints, not polish"); `accessibility-design` skill; AN-03 | **MVP required** |
| S-13 | Release readiness — CI, environments, observability, backup/restore, rollback, acceptance-gate harness | whole release | gates G5/G6/G8; `feature-delivery.md` step 7–10 | **MVP required** |

---

## 4. Per-feature records

Shared conventions (stated once; per-feature entries note only deviations):

- **Required Department owners / reviewers (default):** product owner **D01** (`product-strategist`); implementers **D02** (client) + **D03** (platform/data) at G4; **D04** (`security-compliance-reviewer`) is a **mandatory reviewer** for every feature touching identity, protected data, minors, media, messaging, deletion/export, or authorization (routing-table `mandatory_collaboration`); **D05** (`production-readiness-reviewer`) for testability/release; **`architecture-reviewer`** where a contract seam or boundary is touched; **`cross-department-reviewer`** for synthesis. **D06** (`operations-governance-reviewer`) for any feature reading commercial state.
- **Acceptance-evidence pattern (per `product-strategy` / `user-research-usability` skills):** each included capability must be exercised by (a) a **happy path**, (b) a **denied/authorization path**, (c) an **empty / insufficient-data state**, (d) an **offline → reconnect path** where the workflow is offline-critical (WORKFLOW-ARCHITECTURE-v2.md §6), and (e) an **audit-record assertion** for every destructive/authorization-sensitive transition. Contract-touching features additionally need a **contract-conformance test** against the relevant seam (app-map contracts 1–14).
- **Complexity** is the C5 relative band — **not** an engineering estimate.

### MVP required

---

**F-01 — Account lifecycle (signup, recovery, deletion)**
- User problem / outcome: a coach or athlete needs one durable identity independent of any Team; needs to recover it without creating a duplicate; needs to end it and take their data.
- Primary actor: Account owner. Workflows: IT-01, IT-07, IT-08. Requirement refs: baseline §1, §5 (age 13+), §3 (DD-DEPARTED-CONTENT), invariant #10, #16; PS-01, PS-05.
- Aggregates / contexts: A1 Account (+ Credential, AccountStatus); identity context. Contract 7 (lifecycle handoffs).
- User value: foundational — nothing else exists without it.
- MVP necessity: **C2** (every workflow requires an `active` account) and **C1** (age-13 gate + data-subject deletion right are invariants).
- Dependency position: tier 1; upstream = S-01, S-02, S-05, S-08.
- Risk / uncertainty: `OQ-IT01-AGE-VERIFY` (safe default: self-attestation ≥13 + PS-07 path; legal sign-off gates production launch, not the build), `OQ-IT01-REJECT-RETENTION` (minimal hashed identifier), `OQ-IT07-VERIFY-STRENGTH` (verified-channel proof + rate limit), `OQ-IT08-GRACE` (safe default 30-day recoverable window), `OQ-DD-RETENTION` (durations open; retain-while-active default). All have safe defaults that let v1 proceed.
- Security / privacy / youth-safety / authz impact: **high.** Age gate is a hard baseline; deletion interacts with preservation holds (S-08 fail-safe: unconfirmed hold blocks deletion); sole-Head-Coach deletion must resolve Team continuity before `deleted` (→ F-07). D04 mandatory reviewer.
- Offline / sync: not offline-capable (IT-01/07/08); all devices lose access on next sync after deletion.
- Media-processing: none directly; deletion triggers DD-DEPARTED-CONTENT media disposition via F-20/F-23.
- Complexity: **M.**
- Additional reviewers: D04 (identity + privacy), architecture-reviewer (contract 7).
- Acceptance evidence: signup happy + under-13 hard-reject + duplicate-identifier conflict; recovery via verified channel + rate-limit lockout; deletion happy + sole-Head-Coach-blocked-without-successor + deletion-blocked-under-preservation-hold + grace-window cancel; audit records for account-creation, age-gate decision, credential reset, deletion.
- Rationale: **include.** Non-negotiable foundation; every safe default is protective and lets the build proceed; production-launch legal sign-off is a Phase-B gate condition, not a reason to defer the capability.

---

**F-02 — Team creation + `Team → Event Group → Subgroup` hierarchy**
- User problem / outcome: a coach needs to stand up a Team and organise it into event groups and finer subgroups that everything else (plans, sessions, channels, assignment) hangs off.
- Actor: Head Coach / Team Creator. Workflows: IT-02, TA-02, TA-03. Requirement refs: baseline §2 (hierarchy invariant #1), §2 (exactly one Head Coach), domain-model A3.
- Aggregates / contexts: A3 Team (owns EventGroup, Subgroup, TeamSettings); identity + teams contexts.
- User value: high — the container for all Team-scoped work.
- MVP necessity: **C1** (hierarchy invariant #1) + **C2** ("organize teams").
- Dependency position: tier 1; upstream = F-01, S-01, S-02, S-05.
- Risk / uncertainty: `OQ-TA-REPARENT` (safe default: re-parenting disabled in v1 — delete-and-recreate); `OQ-TA-SETTINGS-CATALOGUE` (only `personal_workouts_allowed` + tier state recognised). Low risk under safe defaults.
- Security / privacy / youth-safety / authz: hierarchy is one consistency boundary; structural changes are authorization-scoping changes (audited). D04 reviewer (policy owner for teams context).
- Offline / sync: administrative — connectivity-required for authoritative persistence; local name-drafting acceptable.
- Media-processing: none.
- Complexity: **M.**
- Acceptance evidence: create Team → creator is sole Head Coach + Free tier default + `personal_workouts_allowed` default; create/rename/archive Event Group + Subgroup; delete-with-children blocked or explicit-cascade; non-Head-Coach create attempt denied; audit on every structural change.
- Rationale: **include.** Invariant-mandated and core-value-critical.

---

**F-03 — Membership: invite, join, leave, remove, role assignment, Head-Coach transfer**
- User problem / outcome: a coach needs to bring people onto the Team in a role, change roles, remove people, and hand off ownership so a Team is never left ownerless.
- Actor: Head Coach (invite/role/remove/transfer); invitee (join/leave). Workflows: IT-03, IT-04, IT-06, TA-01 (incl. TA-01a transfer). Requirement refs: baseline §2 (one Head Coach; one role per Team; multi-Team role independence; final Head Coach must transfer or close), invariant #2, #16; DD-DEPARTED-CONTENT.
- Aggregates / contexts: A4 Membership (owns Invitation, assignments); `HeadCoachTransfer` DS; teams context. Contract 7.
- User value: high.
- MVP necessity: **C1** (single-Head-Coach invariant #2; DD-DEPARTED-CONTENT invariant #16) + **C2**.
- Dependency position: tier 1; upstream = F-01, F-02, S-02, S-05.
- Risk / uncertainty: `OQ-IT03-PRESCOPE` (invitation carries a proposal, not an authorization — safe default); `OQ-IT04-JOIN-MECHANISM` (safe default: **direct invitation only** — no join code/link/queue; a non-invitation join path is Excluded, F-EX-3); `CD-EC-DELEGATION` (candidate decision — Event-Coach delegation of invite/remove/assign is **Post-MVP**, F-P-2); `OQ-DD-RETENTION`.
- Security / privacy / youth-safety / authz: **high.** Membership creation is the root of every Team-scoped authorization check; removal must terminate all group assignments in the same transition and a queued offline write racing removal must lose; Head-Coach transfer must be atomic (one HC at all times) with a persistence-level uniqueness guard (domain-model §4.1, D03 finding F-D03-01). D04 reviewer.
- Offline / sync: administrative — connectivity-required. Removal/transfer must propagate before the affected client enforces the new scope; stale cached role must never grant broader access.
- Media-processing: none directly; departure triggers DD-DEPARTED-CONTENT disposition.
- Complexity: **L.**
- Additional reviewers: D04, architecture-reviewer (contract 7), D03 (transactional guard).
- Acceptance evidence: invite → join grants exactly the declared role/scope; join on expired/revoked invitation denied; leave vs remove distinguished; remove terminates assignments atomically + offline-write-racing-removal denied; Head-Coach transfer keeps exactly one HC (concurrent-transfer test) + re-owns departed plans per DD-DEPARTED-CONTENT; every role/membership change audited.
- Rationale: **include.** Multiple hard invariants depend on it.

---

**F-04 — Multi-Team context switching**
- User problem / outcome: a person who is (say) Head Coach of one Team and Athlete on another needs to move between Teams without data or authorization bleeding across.
- Actor: multi-Team user. Workflow: IT-05. Requirement refs: baseline §2 (multi-role across orgs, not within a Team; Team-context isolation), invariant #2; domain-model scenario 3.
- Aggregates / contexts: active-Team-context pointer (session-scoped); identity + teams. Contract 7.
- User value: medium — but the isolation guarantee it enforces is high-value.
- MVP necessity: **C1** (authorization is always evaluated against the active Team context, never a union) + **C2** (a real user population holds multiple memberships — coaches who also compete, athletes on club + school teams).
- Dependency position: tier 1; upstream = F-01, F-03, S-01, S-02.
- Risk / uncertainty: minimal; behaviour is normative (fall back to a no-Team state when the last membership is lost). Landing-state UX is a navigation concern, out of scope here.
- Security / privacy / youth-safety / authz: **high.** Local drafts stay bound to their originating Team; per-Team sync cursors never merge; switching into a Team the user was removed from fails closed.
- Offline / sync: switching into a previously-cached Team works offline read-only; a never-cached Team needs connectivity; sync state is per-Team.
- Media-processing: none.
- Complexity: **S** (but the isolation tests are non-trivial).
- Acceptance evidence: switch reloads Team-scoped state with no cross-Team merge; authorization check under Team B never sees Team A grants; switch into a since-removed Team fails to a still-valid Team or no-Team state; offline draft from Team A is invisible under Team B.
- Rationale: **include.** Small build, but omitting it forces either single-Team-only accounts (contradicts baseline §2) or an unsafe union model.

---

**F-05 — Athlete + Event-Coach group assignment (management scope)**
- User problem / outcome: the Head Coach needs to place athletes into event groups/subgroups and put Event Coaches in charge of groups — this is what defines who a coach manages, tags, gives feedback to, and sees performance data for.
- Actor: Head Coach (sole assignment authority in v1). Workflows: TA-04, TA-05. Requirement refs: baseline §2 (Event Coach scope = assigned groups only; Head-Coach-only assignment in v1), invariants #1, #3, #15; `WA2-F-18` (Event Coach removed from TA-04 authority).
- Aggregates / contexts: A4 Membership (AthleteGroupAssignment, EventCoachAssignment); `ManagementScope` VO (derived union); teams context. Contract 7.
- User value: high — without it the Event Coach role and every scope-gated capability (tagging, feedback, performance visibility) has no meaning.
- MVP necessity: **C1** (management scope = invariant #3; the boundary every scope-gated feature reads) + **C2**.
- Dependency position: tier 1; upstream = F-02, F-03, S-02, S-05.
- Risk / uncertainty: `OQ-TA-MULTIGROUP` (safe default: multi-group athlete assignment allowed at Head-Coach discretion; performance aggregation must de-duplicate — domain-model F-D03-10); `CD-EC-DELEGATION` (Post-MVP). Low risk.
- Security / privacy / youth-safety / authz: **high.** These records directly define an Event Coach's data-access boundary; changes are authorization-sensitive and audited; scope-narrowing has normative downstream effects (future not-started prescriptions withdrawn; in-progress → SE-09; historical truth preserved) shared with F-12/F-17/F-31.
- Offline / sync: administrative — connectivity-required; a just-revoked assignment must promptly remove access (authorization-sensitive propagation, not a UX nicety).
- Media-processing: none.
- Complexity: **M.**
- Additional reviewers: D04, D03 (scope propagation).
- Acceptance evidence: assign athlete → appears in group roster and becomes manageable by the group's Event Coach; Event-Coach self-assignment attempt denied; unassign narrows scope with the normative downstream effects; scope-narrow test asserts an out-of-scope athlete's performance data + tag authority + feedback authority all drop on the next authoritative check; every assignment change audited.
- Rationale: **include.** The Event Coach role is in the baseline; it is inert without this.

---

**F-06 — Team settings + `personal_workouts_allowed`**
- User problem / outcome: the Head Coach needs to configure Team-level behaviour, notably whether athletes may create/execute personal workouts in this Team context.
- Actor: Head Coach. Workflows: TA-06, TA-07. Requirement refs: baseline §3 (`personal_workouts_allowed` is Head-Coach-controlled; disabling blocks new create/execute but never deletes or blocks private correction/export), invariant #6.
- Aggregates / contexts: A3 TeamSettings; teams context.
- User value: medium; the `personal_workouts_allowed` control is a required gate for F-19.
- MVP necessity: **C1** (invariant #6; the gate that makes F-19 a `MVP conditional` capability) + **C2** (Head-Coach control surface).
- Dependency position: tier 1; upstream = F-02, S-02, S-05.
- Risk / uncertainty: `OQ-TA-SETTINGS-CATALOGUE` (only these two settings recognised in v1 — any new setting is a new product decision); `OQ-PW-RETENTION-DURATION`. Low.
- Security / privacy / youth-safety / authz: authorization-sensitive setting; its propagation delay is a create-time race window for F-19 — the gate is evaluated server-side against the current authoritative value, never a stale offline cache (domain-model §4.1).
- Offline / sync: connectivity-required for authoritative persistence; the *effect* is checked against the last-synced authoritative value.
- Media-processing: none.
- Complexity: **S.**
- Acceptance evidence: toggle enable/disable → PW-01/PW-02 gate follows the authoritative value; non-Head-Coach toggle denied; disable does **not** delete existing personal workouts and does **not** block PW-03 correction or export; offline PW-01 draft against a stale "enabled" is flagged, not silently persisted; toggle audited.
- Rationale: **include.** Cheap, and it is the activation gate for F-19.

---

**F-07 — Team closure / dissolution (archive-first, recoverable)**
- User problem / outcome: a Head Coach needs a controlled way to end a Team without leaving members ownerless, destroying athlete-owned data, or bypassing legal holds — distinct from leaving a Team or deleting an account.
- Actor: Head Coach. Workflow: IT-09 (also reached from IT-08 when a sole Head Coach deletes with no successor). Requirement refs: baseline §3 (DD-DEPARTED-CONTENT; archive-first, recoverable-then-irreversible; membership-derived access ends immediately), §5 (preservation holds), invariants #12, #16.
- Aggregates / contexts: A3 Team terminal lifecycle; A33 PreservationHold interaction; identity + teams + governance + billing (teardown). Contracts 7, 11.
- User value: medium (used rarely) but the guarantees it enforces are high-value and legally material.
- MVP necessity: **C1** (invariant #16 / DD-DEPARTED-CONTENT; the "a Team is never ownerless" invariant; PS-07 governed closure depends on it) + **C2** (a Team lifecycle without an end state is dishonest).
- Dependency position: tier 1; upstream = F-01, F-02, F-03, S-08 (holds), S-05.
- Risk / uncertainty: `OQ-IT08-GRACE` (safe default 30-day recovery window), `OQ-DD-RETENTION` (durations open; retain-while-active default), `OQ-IT09-REFUND` (D06: stop future billing, no automatic refund — but no paid billing in v1 so this is inert). Safe defaults let v1 proceed.
- Security / privacy / youth-safety / authz: **high.** Athlete-owned profiles/logs/personal-workouts stay with the athlete; Team plans/records archived; held content stays under hold past `deletion_eligible` (fail-safe); no cascading deletion; every transition audited with a per-class disposition summary.
- Offline / sync: not offline-capable; every member's device loses Team-scoped access on `closure_pending`; a queued offline write racing closure loses.
- Media-processing: media disposition follows DD-DEPARTED-CONTENT (F-20/F-23).
- Complexity: **L.**
- Additional reviewers: D04 (retention/holds), D06 (commercial teardown — inert in v1), architecture-reviewer (contracts 7, 11).
- Acceptance evidence: closure → members lose access immediately + Team enters `archived` (read-only, recoverable) + athlete-owned data confirmed retained; cancel from `closure_pending`/`archived` restores memberships intact; closure under an active hold → held content survives past `deletion_eligible`; non-Head-Coach closure denied; every transition audited.
- Rationale: **include.** Required to close the identity/team lifecycle honestly and to give PS-07 a governed-closure mechanism.

---

**F-08 — User-owned profile + visibility resolution (PR-03)**
- User problem / outcome: a member needs to own and edit their own profile; other members need to see exactly the right amount (peers: display name + role; in-scope coaches: catalogue fields; nobody gets DOB/age); no coach can edit an athlete's profile.
- Actor: Account owner (edit); any member (view). Workflows: PR-01, PR-02, PR-03. Requirement refs: baseline §3 (profiles user-owned; not discoverable; peers get minimum identity; coach access = current role + scope; DOB/age restricted; `is_minor` only), invariants #1, #4 (coach-edit boundary), #15; `WA2-F-01` (profile category + normative visibility model).
- Aggregates / contexts: A2 Profile; `ProfileVisibilityResolution` DS; profile (in identity). Contract 8.
- User value: high — identity surface; and the visibility model is a core youth-privacy control.
- MVP necessity: **C1** (profile ownership + non-discoverability + DOB restriction are invariants; every member-rendering surface calls PR-03) + **C2**.
- Dependency position: tier 1; upstream = F-01, S-02, S-05.
- Risk / uncertainty: `OQ-PR-FIELDS` (safe default: only IT-01 shell fields; only display name + role coach-visible until a field is classified), `OQ-PR-DOB-EDIT` (frozen after verification), `OQ-PR-AGE-BAND` (safe default: boolean `is_minor` only). Safe defaults are default-deny — v1 proceeds.
- Security / privacy / youth-safety / authz: **very high.** Server-side per-field withholding (never returned-then-hidden client-side); DOB/age never in a client cache; PR-03 never derived from tier state; evaluated only in the viewer's active Team context; MG-04 communication reach must **not** widen profile access (invariant #15).
- Offline / sync: PR-01/02 authoritative persistence connectivity-required; PR-03 fully online (DOB/age never cached); a cached profile view is provisional and coach-scope-gated fields re-validate before display.
- Media-processing: none.
- Complexity: **M.**
- Additional reviewers: D04 (policy owner — mandatory), architecture-reviewer (contract 8).
- Acceptance evidence: self-edit persists; coach/admin edit of an athlete profile denied + audited as a boundary violation; peer view returns display name + role only; in-scope coach view returns catalogue fields; out-of-scope coach view drops to minimum identity on scope narrowing; DOB/age never returned on any coach/peer path; over-fetch of a withheld field is server-blocked.
- Rationale: **include.** Invariant-mandated; the visibility resolution is a published contract every surface consumes.

---

**F-09 — Training-plan hierarchy authoring (Macrocycle / Block / Week / Session)**
- User problem / outcome: a coach needs to plan training over a season — nested containers down to the concrete Session (training day) that practice executes.
- Actor: Head Coach (Team-wide or any group); Event Coach (their assigned groups only). Workflows: TP-01, TP-02, TP-03, TP-04. Requirement refs: baseline §1 ("plan training cycles and workouts"); invariant #5 (prescription ≠ performance); domain-model A5–A8, §7.5.
- Aggregates / contexts: A5 Macrocycle / A6 Block / A7 Week / A8 Session (per-level roots — DR-2(d)); PrescribedWorkItem, TargetScope VOs; training context.
- User value: **highest single coach value** — the reason a coach adopts the product.
- MVP necessity: **C2** (core-value critical path — "plan training") + **C1** (the prescription/performance distinction the plan hierarchy anchors is invariant #5).
- Dependency position: tier 2; upstream = F-02, F-05 (targeting), S-02, S-03.
- Risk / uncertainty: `OQ-TP-OVERLAP` (safe default: overlaps allowed; coach owns coherence), `OQ-TP-PROMOTE` (no auto-promotion of an Event-Coach cycle to Team-wide), `OQ-TP-HC-OVERRIDE` (Head Coach may modify an Event-Coach artifact, attributed + audited). Safe defaults let v1 proceed.
- Security / privacy / youth-safety / authz: Event-Coach authoring is bounded to assigned scope; a Session is a **prescription**, structurally never merged with execution (A8 vs A11 vs A12).
- Offline / sync: authoring may begin offline as a local draft; publishing requires sync; a published Session must be fully available offline once synced (this is the most sync-critical planning artifact — practice happens without connectivity).
- Media-processing: none directly (media attaches via F-20/MD-04).
- Complexity: **L.**
- Acceptance evidence: author nested hierarchy with child-within-parent date bounds enforced at authoring; Event-Coach authoring out of scope denied; publish → visible to assigned athletes/coaches (via F-12); draft discard leaves no downstream state; offline authoring drafts and syncs on publish.
- Rationale: **include.** Core value; nothing downstream (execution, history, analysis-in-context) has meaning without a plan.

---

**F-10 — Session / workout templates** · **RECLASSIFIED `MVP conditional`** (independent D01 review finding N-1, §13.11 of the release scope; DR-A5). *Activation condition: at INC-2 G4, D02/D03 confirm an author-private template save+instantiate slice does **not** extend the increment's critical path — else F-10 defers to Post-MVP (F-P-1 covers the shared-library form). Safe default meanwhile: F-09 authoring + F-11 duplication cover v1 prescription reuse.*
- User problem / outcome: a coach re-uses prescription patterns (a taper week, a tempo session) across the season without rebuilding them.
- Actor: Coach. Workflow: TP-05. Requirement refs: domain-model A9; `OQ-TP-TEMPLATE-SHARING` (safe default: author-private + Head Coach).
- Aggregates / contexts: A9 SessionTemplate; training context.
- User value: medium-high — an efficiency lever for coaches, who prescribe repetitively in track & field.
- MVP necessity: **C2** only, and weakly — it accelerates F-09 but is **not** on the core-value critical path (F-09 delivers "plan training" end to end) and **no invariant requires it**. The first draft's "required" rested on an adoption-risk assertion, which §2.1 prohibits (no user-research / market evidence exists). F-11 duplication already covers the dominant v1 reuse case. → **conditional**.
- Dependency position: tier 2; upstream = F-09.
- Risk / uncertainty: `OQ-TP-TEMPLATE-SHARING` — safe default **author-private (+ Head Coach)**; a Team-wide shared template library (`CD-TEMPLATE-LIBRARY`) is **Post-MVP** (F-P-1).
- Security / privacy / youth-safety / authz: templates carry no athlete data, no assignment, no date; author-private by default.
- Offline / sync: usable against locally cached templates; new templates sync for cross-device use.
- Media-processing: none.
- Complexity: **S.**
- Acceptance evidence (if activated): save a Session as a template → instantiate into a new Week/Session; template is author-private (+ Head Coach) — another Event Coach cannot see it; archived template reactivable.
- Rationale: **conditional.** Author-private slice only; shared library deferred (F-P-1). Ships only if INC-2 has the budget; otherwise Post-MVP. Not in any end-to-end journey — F-09 + F-11 carry J-2.

---

**F-11 — Plan duplication (scope-narrowing enforced)**
- User problem / outcome: a coach copies a prior season/block/week/session to accelerate authoring the next one.
- Actor: Coach. Workflow: TP-06. Requirement refs: `WA2-F-15` (normative): a duplicate is a `draft` owned by the duplicating actor, scoped to *that actor's* authority — never inheriting a broader source scope.
- Aggregates / contexts: A5–A9 (new draft referencing source as origin); training context.
- User value: medium-high — same efficiency rationale as F-10.
- MVP necessity: **C2** (accelerates F-09) + **C1** (the scope-narrowing rule is normative and must be enforced wherever duplication exists — so if duplication ships, it must ship correctly).
- Dependency position: tier 2; upstream = F-09.
- Risk / uncertainty: none open — scope-narrowing is normative (F-15).
- Security / privacy / youth-safety / authz: an Event Coach duplicating a Head-Coach Team-wide Macrocycle gets a draft scoped to their own groups only; duplicating into an unowned scope is denied.
- Offline / sync: duplication of cached artifacts may occur offline as a draft; publish per the resulting artifact type.
- Media-processing: none.
- Complexity: **S.**
- Acceptance evidence: Event Coach duplicates a Team-wide Macrocycle → result scoped to the Event Coach's groups; Head Coach duplicating keeps Team-wide; cascade duplicate of a Macrocycle produces `draft` children; source is untouched by edits to the copy.
- Rationale: **include (thin).** Small, high coach value, and the scope-narrowing invariant is cheap to honour here and expensive to retrofit.

---

**F-12 — Plan assignment to athletes / groups**
- User problem / outcome: a coach binds a published plan/Session to the specific athletes or groups who should see and execute it — this, not Team membership, is what gives an athlete visibility into a Session.
- Actor: Coach (within authorized scope). Workflow: TP-07. Requirement refs: baseline §2/§3 (Event-Coach scope; scope-narrowing effects), invariant #3, #15; domain-model A10, §7.5.
- Aggregates / contexts: A10 PlanAssignment; training context. Contract 14 (training → sessions).
- User value: high — without it, authored plans reach nobody.
- MVP necessity: **C2** (the transition that makes F-09 usable) + **C1** (carries the normative scope-narrowing effect).
- Dependency position: tier 2; upstream = F-05, F-09, S-03.
- Risk / uncertainty: none open at the product level; scope-narrowing is normative. `OQ-SE-RECONCILE-UX` (the *presentation* of the in-progress case) sits downstream in F-17.
- Security / privacy / youth-safety / authz: Event Coach may assign only within their managed groups; assignment is authorization-sensitive and audited; removing an assignment withdraws future not-started prescriptions and routes in-progress executions to SE-09 (F-17), preserving historical athlete truth.
- Offline / sync: assignment is the transition that triggers an athlete's device to cache the Session content for offline execution — it must complete before F-14 can rely on offline availability; a since-revoked assignment is provisional on the athlete's device until reconciled.
- Media-processing: none.
- Complexity: **M.**
- Additional reviewers: D04, architecture-reviewer (contract 14).
- Acceptance evidence: assign a Session to a Subgroup → those athletes gain visibility and cached content; assign outside authorized scope denied; unassign a not-started Session → withdrawn from the athlete; unassign an in-progress Session → SE-09 (not yanked); historical truth preserved; assignment changes audited.
- Rationale: **include.** Core-value-critical; a plan with no assignment is a UI shell.

---

**F-13 — Plan modification (published / in-progress)**
- User problem / outcome: a coach changes a plan after it is published and possibly already synced or being executed — the sharpest synchronization case in the product.
- Actor: Coach (authorship authority). Workflow: TP-08. Requirement refs: invariant #12 (destructive-transition discipline), #13 (offline honesty), #4 (never silently overwrite in-progress logged data); domain-model §7.5; contract 14.
- Aggregates / contexts: A8 Session content, PlanModification child; A10; training context. Contract 14; feeds contract 9 (SE-09).
- User value: high — plans change; a plan you cannot safely revise is not usable.
- MVP necessity: **C1** (you cannot ship published, assigned plans (F-09/F-12) without a modification path, and TP-08 is the origin of the SE-09 reconciliation case) + **C2**.
- Dependency position: tier 2; upstream = F-09, F-12, S-03; downstream = F-17.
- Risk / uncertainty: `OQ-SE-RECONCILE-UX` (safe default: SE-09 state machine + non-loss/attribution guarantees; every conflict surfaced, never last-write-wins — the *UI* is a `user-research-usability` follow-up). `OQ-TP-HC-OVERRIDE` (safe default: Head Coach may modify an Event-Coach artifact, attributed + audited).
- Security / privacy / youth-safety / authz: only the artifact's author (or a Head Coach within Team-wide authority) may modify; assignment authority alone does not confer edit authority; modification is attributed, timestamped, audited to diff level.
- Offline / sync: a coach may draft a modification offline; it takes effect for athletes only on sync; an athlete already executing offline against a prior version continues against that version until reconcile — the divergence is **surfaced**, not silently resolved.
- Media-processing: none.
- Complexity: **M** (the reconciliation edge is scored under F-17).
- Additional reviewers: D04, D03 (sync), architecture-reviewer (contract 14).
- Acceptance evidence: modify a `draft` freely; modify a `published`/`in_progress` Session → change propagates on sync + prior version recoverable + the athlete's in-progress log for the pre-modification prescription is preserved with a "prescribed version changed after execution" marker; out-of-authorship modification denied; modification audited with diff-level traceability.
- Rationale: **include.** Required for F-09/F-12 to be usable; the safe default governs the open UX question.

---

**F-14 — Practice execution — start, attendance, delivery, in-session modifications**
- User problem / outcome: a coach runs a practice from a phone/iPad on a track with no signal; athletes see exactly what was prescribed; the coach records attendance and makes live adjustments.
- Actor: Coach (start/attendance/mods); Athlete (delivery). Workflows: SE-01, SE-02, SE-03, SE-04. Requirement refs: baseline §3 (offline honesty), invariants #4, #5, #13; domain-model A11, §7.6; contract 14.
- Aggregates / contexts: A11 SessionExecution (coach-owned; Attendance, InSessionModification, PrescriptionVersionMarker children); sessions context; S-03 sync.
- User value: **highest single athlete/coach value in the field** — the product's defining use.
- MVP necessity: **C2** (core-value critical path — "execute ... workouts") + **C1** (offline honesty invariant #13; the prescription/performed distinction #4/#5).
- Dependency position: tier 3; upstream = F-09, F-12, S-03; hard requires a cached, assigned Session.
- Risk / uncertainty: `OQ-SE-ATHLETE-SELFSTART` (safe default: no athlete self-start of a coach Session — personal workouts are the self-directed path; a self-start feature is **Post-MVP**, F-P-4), `OQ-SE-SELFCHECKIN` (no athlete self-check-in in v1 — Post-MVP), `OQ-SE-OFFLINE-P2P` (D03: queue-until-reconnect, no device-to-device propagation in v1).
- Security / privacy / youth-safety / authz: only a coach with authorship/management scope may start a coach Session; attendance is scoped by F-12 assignment; concurrent starts/edits from two devices must be **detected and surfaced** (→ F-17), never silently picked.
- Offline / sync: **highest criticality** — SE-01…SE-08 are execution-blocking if unavailable offline (WORKFLOW-ARCHITECTURE-v2.md §6); every transition is recorded locally first and reconciled on reconnect; starting a Session not cached locally while offline fails with an honest error (never fabricates content).
- Media-processing: none (media capture is F-20, independent).
- Complexity: **L.**
- Additional reviewers: D03 (sync/offline — mandatory), D04 (attendance is minor data).
- Acceptance evidence: start a cached assigned Session offline → attendance + delivery active for assigned athletes' devices; start a non-cached Session offline → honest error; athlete sees only their assigned prescription; in-session modification stacks over the original (never replaces); two-device concurrent start → conflict surfaced (F-17); every start/mod audited with actor + timestamp + version.
- Rationale: **include.** The product does not exist without it.

---

**F-15 — Athlete logging — results, completion status, effort / RPE / notes**
- User problem / outcome: an athlete records what they actually did, against the prescribed (and possibly modified) work, including subjective effort.
- Actor: Athlete (own record only). Workflows: SE-05, SE-06, SE-07. Requirement refs: invariants #4 (coach cannot author/overwrite), #5 (prescription ≠ performed); domain-model A12 (athlete-owned, append-only), §7.6.
- Aggregates / contexts: A12 PerformedWorkLog (athlete-owned, append-only; log entries, CompletionStatus, EffortReport, AmendmentRecord); sessions context.
- User value: high — the "log workouts" half of the core value.
- MVP necessity: **C2** (core-value critical path — "log workouts") + **C1** (the coach-edit boundary #4 and the separate-aggregate structural enforcement #5).
- Dependency position: tier 3; upstream = F-14, S-03.
- Risk / uncertainty: `OQ-SE-COACH-OVERRIDE` (safe default: **no** silent coach override of an athlete's self-classification — a coach adds an attributed annotation or requests an SE-10 correction; a coach-override feature is **Post-MVP**, F-P-5), `OQ-SE-RPE-FLAG` (safe default: no automatic coach-facing RPE flag in v1 — Post-MVP), `OQ-SE10-WINDOW`.
- Security / privacy / youth-safety / authz: an athlete may log only against their own execution record; a coach may **read** but never author or overwrite it (structurally — separate aggregate A12, append-only, no in-place update per domain-model F-D03-03); RPE/notes are athlete-authored subjective wellbeing data visible only to the managing coach within current scope.
- Offline / sync: fully offline-capable (core offline-critical); local entries must survive app restart / device switch / delayed connectivity; same-athlete two-device edits merge without silent loss.
- Media-processing: none.
- Complexity: **M.**
- Additional reviewers: D04 (minor subjective wellbeing data), D03 (offline/append-only).
- Acceptance evidence: log results → auto-classify completed/partial/skipped; log against an unassigned Session denied; edits allowed until finalization; coach view is read-only (no write path exists); offline logging survives restart and reconnect-merges without loss; append-only asserted (no destructive UPDATE of a committed value).
- Rationale: **include.** Core value; the structural enforcement of #4/#5.

---

**F-16 — Session finalization**
- User problem / outcome: a coach closes the ordinary edit window on a session and locks the prescribed structure for the historical record.
- Actor: Coach. Workflow: SE-08. Requirement refs: `WA2-F-23` (finalization locks the prescribed structure **only**, never athlete performed-work truth — SE-10 path remains); invariant #12.
- Aggregates / contexts: A11 terminal state; A12 stays amendable via F-18; sessions context.
- User value: medium; the honesty guarantee (finalization ≠ locking athlete truth) is high-value.
- MVP necessity: **C2** (a session lifecycle needs a close) + **C1** (F-23 normative decision; the anchor for PF-* history and F-18).
- Dependency position: tier 3; upstream = F-14, F-15.
- Risk / uncertainty: `OQ-SE-AUTOFINALIZE` (safe default: **no** auto-finalization in v1 — a session stays `in_progress` until a coach ends it; an auto-finalize timer is **Post-MVP**, F-P-6).
- Security / privacy / youth-safety / authz: only the running coach (or a Head Coach) may finalize; finalization does not retroactively alter athlete-authored data; a session finalized offline is not server-durable until synced.
- Offline / sync: offline-capable (local-first transition); a late-arriving offline completion must merge into history without overwriting interim corrections.
- Media-processing: none.
- Complexity: **S.**
- Acceptance evidence: finalize → prescribed structure locked + `completed`; finalize with incomplete logs → record honestly shows `not_logged`/`skipped` (no fabricated completion); non-coach finalize denied; athlete SE-10 path still open post-finalization (F-18); completion audited.
- Rationale: **include.** Closes the session lifecycle; required anchor for history and correction.

---

**F-17 — Offline session reconciliation**
- User problem / outcome: after a fully-offline practice, divergent state (a coach's mid-session TP-08 change vs athletes' logs; two devices that both started the session; one athlete's data on two devices) is resolved **honestly** — every conflict surfaced to its owning actor, never last-write-wins, and a coach never overwrites an athlete's log.
- Actor: Coach (session/attendance/prescription conflicts); Athlete (own-log conflicts); system (detection). Workflow: SE-09. Requirement refs: baseline §3 (offline honesty; SE-09 for unmergeable divergence), invariants #4, #13; contract 9.
- Aggregates / contexts: A13 ReconciliationRecord (layered over A11 + A12 without destroying values; re-entrant); sessions + sync contexts. Contract 9.
- User value: high — it is what makes the offline-first promise honest rather than lossy.
- MVP necessity: **C1** (invariant #13 — "the most offline-critical category in the product"; you cannot ship F-13/F-14/F-15 offline without it) + **C2**.
- Dependency position: tier 3; upstream = F-13, F-14, F-15, S-03.
- Risk / uncertainty: `OQ-SE-RECONCILE-UX` (safe default in force: state machine + non-loss/honest-attribution guarantees hold; the presentation model + per-class default-resolution policy is a `user-research-usability` + D01 follow-up — **does not block the mechanism**), `OQ-SE-OFFLINE-P2P` (D03: queue-until-reconnect in v1).
- Security / privacy / youth-safety / authz: reconciliation changes no ownership — a coach resolves coach-owned state, each athlete resolves only their own log; a conflict that cannot be shown to its owning actor (athlete left the Team) is **held and flagged to the coach**, never auto-resolved; the athlete's last authoritative self-logged state stands unaltered.
- Offline / sync: detection/presentation require connectivity; pre-reconciliation local state stays intact and read-only until the owning actor resolves; superseded values retained for audit.
- Media-processing: none.
- Complexity: **XL** — highest in the release. The state machine, conflict detection, per-actor routing, retention of superseded values, re-entrancy, and the audit trail are all first-class requirements.
- Additional reviewers: D03 (mandatory — this is the structural answer to the sync risk), D04 (no coach overwrite of athlete data).
- Acceptance evidence: TP-08 change + offline logs → athlete's record kept as-executed with a version-changed marker + coach sees the same marker; two coaches started offline → one start chosen by explicit decision, other's attendance/notes merged, neither discarded; same athlete on two devices → both shown, athlete confirms combined record; departed-athlete conflict → held + flagged to coach, athlete state unaltered; every conflict + resolution audited (before/after); re-entrancy: a later stale device re-enters reconciliation without overwriting prior resolutions.
- Rationale: **include.** Non-negotiable — the offline promise is dishonest without it. It is the single largest build item and the primary driver of the execution increment's schedule risk.

---

**F-18 — Athlete post-finalization correction (audited amendment)**
- User problem / outcome: an athlete realises days later they logged a value wrong on a now-finalized session and needs an audited way to correct **their own** record without re-opening the session or touching the prescribed structure.
- Actor: Athlete (own records only). Workflow: SE-10. Requirement refs: `WA2-F-23` (audited amendment; original + amended + timestamp + actor + mandatory reason preserved; finalized history never silently rewritten), invariant #4; data-subject-correction framing (PS-08).
- Aggregates / contexts: A12 AmendmentRecord (layered, chronological, never destroying the original); sessions context. Contract 9 (→ PS-08).
- User value: medium-high — it is the athlete's guaranteed correction path and the fulfilment mechanism for a data-subject correction request on session data.
- MVP necessity: **C1** (F-23 normative decision; invariant #4 — the athlete's audited correction path is part of what "coach cannot overwrite athlete truth" means; and PS-08 correction of session data is fulfilled through SE-10) + **C2**.
- Dependency position: tier 3; upstream = F-15, F-16.
- Risk / uncertainty: `OQ-SE10-WINDOW` (safe default: **no** time limit while the account is active — data-subject-rights framing; a bounded window is Post-MVP).
- Security / privacy / youth-safety / authz: only the owning athlete may initiate; a coach cannot author or silently apply one; amendment never edits the locked prescribed structure; a reason is **mandatory** (rejected without one); the session stays `completed`.
- Offline / sync: an athlete may draft an amendment offline; applied on reconnect, not durable until server-confirmed; a collision enters SE-09 (F-17); late amendments layer by timestamp, never last-write-wins.
- Media-processing: none.
- Complexity: **M.**
- Additional reviewers: D04 (data-subject-rights framing), D03 (append-only layering).
- Acceptance evidence: amend a finalized log value with a reason → applied as a new layer + original retained + PF-* recomputes + coach notified with reason; amend without a reason denied; amend another athlete's record denied; attempt to edit the prescribed structure via SE-10 denied; offline draft applies on reconnect; amendment audited (original, new, timestamp, actor, reason).
- Rationale: **include.** Required by the F-23 normative decision and by the PS-08 correction path.

---

**F-20 — Media capture, import, private-draft library, lifecycle/delete, session attachment**
- User problem / outcome: a coach or athlete records or imports practice video, keeps it as a private draft, optionally links it to a session for context, and can delete it — with capture defaulting to private and no background upload.
- Actor: Coach + Athlete. Workflows: MD-01, MD-02, MD-03, MD-04, MD-07. Requirement refs: baseline §4 (five distinct transitions; capture defaults to private; MD-04 attach ≠ visibility grant), invariant #7; domain-model A15, §7.9; contracts 1, 11.
- Aggregates / contexts: A15 MediaArtifact (owns Tag, SessionAttachment, Publication); media context + `services/media-worker` (S-06) + `platform/storage` (S-07). Contract 11 (holds block delete).
- User value: high — "record ... practice media" is core value; the private-by-default posture is a core youth-privacy control.
- MVP necessity: **C2** (core value) + **C1** (MD-03 private-default is the safety anchor the whole media category depends on; MD-07 delete must honour preservation holds).
- Dependency position: tier 4; upstream = F-02, S-06, S-07, S-08.
- Risk / uncertainty: `OQ-MD-CAPTURE-NOTICE` (safe default: **no** capture-time consent step in v1 — capture stays a private draft; every downstream visibility transition is separately gated; a capture-time consent feature is Post-MVP), `OQ-MD07-RETENTION` / `OQ-MD07-ARCHIVE-STATE` (safe default: hard deletion only in v1; held media survives), `OQ-MEDIA-CACHE-INVALIDATION` (D03: server-side revocation authoritative + best-effort purge).
- Security / privacy / youth-safety / authz: **very high.** No other member — including a Head Coach — sees another actor's private draft; recording alone never causes background upload to shared storage; MD-04 attachment is a contextual link and must never be treated by a client as a visibility grant; deleting tagged/published/shared media must cleanly resolve dependent records (F-21/F-22/F-23), not orphan them; deletion under a hold is blocked (S-08).
- Offline / sync: capture + local draft storage require no connectivity; a draft is a valid permanent local-only state; deletion of a never-synced draft is immediate offline; deletion of synced/shared media requires connectivity to revoke access on other devices.
- Media-processing: **yes** — transcode/thumbnail/derivation via S-06; storage via S-07; the independently-deployable worker is a required workload.
- Complexity: **L.**
- Additional reviewers: D04 (mandatory — youth media), D03 (storage/cache), architecture-reviewer (contracts 1, 11; `services/media-worker` topology).
- Acceptance evidence: capture → private draft, no upload until an explicit later act; import → same private-draft posture; attach to a session → no visibility change (client cannot read it as a grant); delete a draft → clean; delete shared/published media → dependent records resolved + access revoked; delete under a hold → blocked with reason; all visibility-changing downstream events audited independently.
- Rationale: **include.** Core value; the private-default posture is the safety anchor for F-21/F-22/F-23/F-28.

---

**F-21 — Tag athlete(s) in media**
- User problem / outcome: a coach or athlete identifies which athletes appear in a clip — an identification act, explicitly **not** a visibility grant.
- Actor: Coach + Athlete (within tagging scope). Workflow: MD-05. Requirement refs: baseline §4 (tagging is metadata only; never grants Vault access; bounded to the tagger's current scope), invariant #7; `WA2-F-11` (VS-01 is an explicit server-authoritative grant, not automatic).
- Aggregates / contexts: A15 Tag child; media context. Contract 1.
- User value: medium — enables the athlete-facing grant (F-23) and multi-subject-consent enforcement (F-22).
- MVP necessity: **C1** (the tag ≠ grant boundary is invariant #7; the tag is the identification a later VS-01 grant references and the key multi-subject enforcement uses) + **C2**.
- Dependency position: tier 4; upstream = F-20, F-05 (scope), S-04 (tagged-athlete notice).
- Risk / uncertainty: `OQ-MD05-ATHLETE-TAG-EDGE` (safe default: an athlete may tag only teammates in a currently-shared group).
- Security / privacy / youth-safety / authz: **high.** Head Coach tags any member; Event Coach tags only within current management scope; MG-04 communication reach does **not** widen tag authority (invariant #15); tagging a minor is a privacy-relevant audited event; the tagged athlete is notified (safety class, S-04); "untagging" never revokes an existing grant (that needs F-23/VS-03).
- Offline / sync: may occur offline against cached roster; reconciled on sync; a tag must propagate before a VS-01 grant against it can be evaluated.
- Media-processing: none directly.
- Complexity: **S.**
- Additional reviewers: D04 (mandatory).
- Acceptance evidence: tag an in-scope athlete → identification recorded, **no** Vault access appears for that athlete; tag out of scope denied; tag a non-member denied; tagged athlete notified (safety class); tag audited; untag does not revoke an existing grant.
- Rationale: **include.** The identification primitive the whole media-visibility model builds on; the tag ≠ grant boundary is invariant.

---

**F-23 — Vault grant / share / revoke + visibility resolution (VS-04 checkpoint)**
- User problem / outcome: a media owner deliberately lets a specific athlete see a specific clip in their Vault (grant); an in-scope coach shares a specific item with a managed athlete or authorized coach (share); either can be revoked; the athlete's Vault shows exactly what was granted or shared — never inferred from membership, group, or tag.
- Actor: Media owner / in-scope coach (grant/share); grantor or Platform Safety Administrator (revoke). Workflows: VS-01, VS-02, VS-03, VS-04. Requirement refs: baseline §4 (explicit server-authoritative grant; in-scope coaches only; athlete-to-athlete disabled; multi-subject blocked by default; Vault visibility never derived), invariants #7, #8; `WA2-F-11` (VS-01 explicit server-authoritative grant); contracts 1, 2, 3, 11.
- Aggregates / contexts: A16 VaultGrant, A17 Share (independent aggregates — DR-2(b)); `VaultVisibilityResolution` DS (query-time over A16 + A17 only, **no** denormalised `visible` flag — domain-model F-D03-05); vault context. Contracts 1, 2, 3.
- User value: high — "review and analyse athlete media" for the athlete depends on it; and it is the single highest-sensitivity surface in the product.
- MVP necessity: **C1** (invariants #7, #8; VS-03 revocation is "the most safety-critical synchronization property in the entire product"; you cannot ship F-20/F-24/F-25/F-28 without it) + **C2**.
- Dependency position: tier 4; upstream = F-20, F-21, S-04, S-07, S-08.
- Risk / uncertainty: `OQ-VS02-RIGHTS` (safe default: VS-02 share is **view-only** in v1 — recipient-analysis rights are Post-MVP, F-P-3), `OQ-VS02-MULTISUBJECT` (safe default: **blocked** — onward re-share of multi-subject youth media until each depicted athlete's consent condition is met; the consent *mechanism* is D04-owned and open — see F-22), `OQ-VS03-HC-REVOKE` (safe default: no ordinary Head-Coach revoke of another member's grant — safety concerns route via F-29 → PS-03), `OQ-VS03-NOTICE` (safe default: ordinary revocation silent; moderation revocation follows PS-03 notice), `OQ-MEDIA-CACHE-INVALIDATION` (D03 design item — safe default: server-authoritative revocation + best-effort purge; favour online-validated Vault access over long-lived local cache).
- Security / privacy / youth-safety / authz: **highest in the product.** Grant is a deliberate server-confirmed owner action, one artifact only, independent of assignment; a coach may VS-02-share only within current management scope; **athlete-to-athlete media sharing is disabled in v1** (Excluded, F-EX-2); multi-subject youth media onward re-share is blocked by default; VS-04 is a standing checkpoint that no single boolean conflates tag/grant/share/publish; every transition independently auditable.
- Offline / sync: **not offline-capable for the grant/share** — a queued grant is not effective until server-confirmed and loses to a concurrent revoke; a device must validate Vault content against the current authoritative grant, not a cached flag; revocation propagation + local-cache handling is a first-class requirement, not an afterthought.
- Media-processing: consumes S-06/S-07; VS-03 must best-effort-purge derived/cached copies.
- Complexity: **L.**
- Additional reviewers: D04 (mandatory — highest sensitivity), D03 (cache invalidation), architecture-reviewer (contracts 1, 2, 3; VS-04 data-model checkpoint).
- Acceptance evidence: tag then **no** Vault access until an explicit grant; grant → server-confirmed → athlete's Vault returns exactly that one artifact; grant to an untagged non-authorized athlete denied (use VS-02); VS-02 share within scope succeeds, out of scope denied, athlete-to-athlete denied; multi-subject onward re-share blocked; revoke → item leaves the recipient's authoritative Vault view + best-effort cache purge; queued offline grant loses to a concurrent revoke; VS-04 test: no denormalised visibility flag on MediaArtifact; every grant/share/revoke audited.
- Rationale: **include.** The enforcement point for the two highest-risk media invariants; nothing media-facing for athletes can ship without it.

---

**F-24 — Video analysis tooling — playback, markers/drawings/Pencil, clips, comparison, save**
- User problem / outcome: a coach (or athlete, on media they can see) reviews technique frame-by-frame, annotates with markers/drawings/Apple Pencil, extracts clips, compares two attempts side by side, and saves the project — without any of this changing who can see the underlying media.
- Actor: Coach + Athlete (with visibility into the source media). Workflows: AN-01, AN-02, AN-03, AN-04, AN-05, AN-06. Requirement refs: baseline §1 ("analyze media"), §4 (analysis never changes media visibility; saving ≠ sharing); domain-model A18, §7.10.
- Aggregates / contexts: A18 AnalysisProject (owns Annotation, Clip, ComparisonLayout; inherits, never widens, source visibility); analysis context.
- User value: high — a primary coach differentiator for a track & field product; "analyse practice media" is core value.
- MVP necessity: **C2** (core value — "analyze media") + **C1** (the analysis-never-widens-visibility discipline is normative and must hold wherever analysis exists).
- Dependency position: tier 4; upstream = F-20, F-23 (visibility of the source); S-12 (Apple Pencil + touch fallback).
- Risk / uncertainty: none open at the product level; `OQ-VS02-RIGHTS` (whether a VS-02 recipient may build their own analysis) is a **downstream** F-23 item — safe default view-only means a shared-item recipient cannot open their own analysis project in v1.
- Security / privacy / youth-safety / authz: opening/comparing requires the visibility the actor already has into every source (never a backdoor); annotations/clips are private to the analysing actor's project by default; a saved project is private — saving is not sharing.
- Offline / sync: fully offline-capable against locally cached source media; the project syncs only on save (AN-06); local save is authoritative for the owning actor immediately, cross-device access needs sync.
- Media-processing: playback/frame-stepping and clip extraction lean on S-06/S-07; Apple Pencil is a named capability with a **required touch fallback** on unsupported hardware (S-12).
- Complexity: **L.**
- Additional reviewers: D04 (source-visibility inheritance), S-12 accessibility (`ux-research-accessibility-reviewer`).
- Acceptance evidence: open analysis on a visible clip; open on a clip the actor cannot see denied; add markers/drawings (Pencil + touch fallback), extract a clip, add a comparison source the actor can see, add one they cannot → denied; save → private project, reopenable; no annotation/clip/save changes the source media's visibility.
- Rationale: **include.** Core value; the analysis-discipline invariant must be enforced from the start.

---

**F-25 — Coaching feedback delivery (scope-bounded share of analysis output)**
- User problem / outcome: a coach turns private analysis into an explicit athlete-facing finding — sharing exactly the selected clip/drawing/note with a managed athlete, not the whole project.
- Actor: Coach → Athlete (within current management scope). Workflow: AN-07. Requirement refs: baseline §2/§4 (feedback requires current management scope; MG-04 reach does not widen it), invariant #15; a specialised VS-02; contract 3.
- Aggregates / contexts: A19 CoachingFeedback (specialised VS-02; obeys VS-02/VS-03); analysis + vault. Contract 3.
- User value: high — it is the point of doing analysis; without it F-24 is a private coach tool with no athlete benefit.
- MVP necessity: **C2** (delivers the value of F-24 to the athlete) + **C1** (the scope-bounded delivery is normative; feedback must obey VS-02/VS-03).
- Dependency position: tier 4; upstream = F-24, F-23, F-05 (scope), S-04.
- Risk / uncertainty: none open — feedback is bounded by current management scope (normative); rights conveyed are `OQ-VS02-RIGHTS` (view-only in v1).
- Security / privacy / youth-safety / authz: an Event Coach cannot deliver feedback to an athlete outside their management scope even though they could message that athlete (invariant #15); only explicitly selected items are shared — the rest of the analysis stays private; a shared finding is revocable (VS-03).
- Offline / sync: the coach may compose offline; the share is not effective for the athlete until server-confirmed (same as VS-02).
- Media-processing: none beyond the shared derived item.
- Complexity: **S.**
- Additional reviewers: D04.
- Acceptance evidence: deliver a selected clip+drawing to a managed athlete → athlete gains Vault-equivalent view of exactly that item, not the project; deliver to an out-of-scope athlete denied (even though messaging is allowed); revoke a finding → athlete loses access; share audited.
- Rationale: **include.** Realises F-24's value; the scope boundary is an invariant.

---

**F-26 — Group channels (Team / Event Group / Subgroup)**
- User problem / outcome: members communicate in channels scoped to the Team and to each event group/subgroup, with membership derived from Team/assignment state.
- Actor: all active members (channel membership derived). Workflows: MG-01, MG-02, MG-03. Requirement refs: baseline §2 ("communicate"), invariant #15; `OQ-MG-HC-CHANNEL` (safe default: no standing Head-Coach read access to group channels).
- Aggregates / contexts: A20 Channel (Message child; membership is a projection of A3/A4, never a stored list); messaging context. Contract 7.
- User value: high — "communicate" is core value; group coordination is table stakes for a team product.
- MVP necessity: **C2** (core value) + **C1** (channel membership must be a projection of current assignment state — an assignment change immediately changes access).
- Dependency position: tier 1 (needs Team/assignment); upstream = F-02, F-05, S-03; S-10 realtime is conditional.
- Risk / uncertainty: `OQ-MG-HC-CHANNEL` (safe default: Head Coach needs the same explicit assignment as any member — **no** blanket visibility), `OQ-MG-RETENTION` (safe default: retained while the channel exists; account-level policy on exit), `OQ-MG-BLOCK-SAFE-COLLAPSE` (safe default: collapse a blocked party's ordinary content, never a critical/safety message — the classifier is a follow-up).
- Security / privacy / youth-safety / authz: access follows TA-04/TA-05 assignment directly; a just-revoked assignment must promptly remove chat access (authorization-sensitive); blocked-party content is muted/collapsed for the blocker when safe (F-29); a removed member's authored messages remain in history.
- Offline / sync: messages composed offline queue and send on reconnect; history available read-only from local cache; no silent message loss; realtime (S-10) is a latency enhancement, not a structural requirement — queue/sync delivery is the safe default.
- Media-processing: attachments are F-28.
- Complexity: **M.**
- Additional reviewers: D04 (mandatory — minors in channels), D03 (message delivery / realtime).
- Acceptance evidence: post to a Team/group channel → delivered to current members; post after unassignment denied; assignment change immediately changes channel access; offline-composed messages queue and deliver without loss; Head Coach without assignment has no standing read access; blocked-party content collapses but a safety message does not.
- Rationale: **include.** Core value; the derived-membership rule is a structural requirement.

---

**F-27 — Coach ↔ athlete private chat**
- User problem / outcome: a coach and an individual athlete need a direct private thread (e.g. an athlete reports an injury; a coach discusses a training adjustment).
- Actor: Head Coach / Event Coach ↔ Athlete. Workflow: MG-04. Requirement refs: baseline §2 (Event Coaches may communicate with **any** athlete on the Team — Team-wide communication reach — but this **never** widens tagging/sharing/feedback/analysis/profile/performance/management scope), invariant #15; PS-06.
- Aggregates / contexts: A21 PrivateThread (exactly one coach + one athlete); messaging context.
- User value: high — the primary coach↔athlete channel; enables timely, private coaching contact.
- MVP necessity: **C2** (core value — "communicate") + **C1** (the communication-reach-≠-any-other-scope asymmetry is invariant #15 and must be enforced structurally — the private thread must not become a scope-widening backdoor).
- Dependency position: tier 1; upstream = F-03, S-03, S-04.
- Risk / uncertainty: `OQ-MG-OVERSIGHT` (safe default: **no** third-party standing visibility into coach↔athlete threads in v1 — content reachable only via F-29 report / PS-03 / PS-09; guardian visibility / supervised-messaging mode is **Post-MVP**, F-P-8), `OQ-MG-RETENTION` (safe default: thread becomes read-only for the remaining party on membership end, not deleted).
- Security / privacy / youth-safety / authz: **high — mandatory D04 review.** Either party may start; exactly one coach + one athlete; a block (F-29) makes it read-only; a coach→minor DM notification is never fully suppressed (stays at least in-app) so unwanted contact is visible and reportable; the thread confers **no** tagging/sharing/feedback/analysis/profile/performance authority.
- Offline / sync: offline composition queues for delivery (same as F-26).
- Media-processing: attachments are F-28.
- Complexity: **M.**
- Additional reviewers: D04 (mandatory), D03.
- Acceptance evidence: coach starts a thread with any Team athlete (reach is Team-wide) but cannot tag / Vault-share / give structured feedback to / analyse / see profile detail of / see identifiable performance data for an out-of-scope athlete; athlete initiates a thread with a coach; block → read-only; membership end → read-only for the remaining party; coach→minor DM notification lands at least in-app even when muted.
- Rationale: **include.** Core value; invariant #15 is only meaningfully testable once this exists.

---

**F-28 — Chat attachments (stricter-transition routing)**
- User problem / outcome: a member attaches a file or media clip to a message — and if that broadens a media artifact's visibility, it creates a **formal, revocable, auditable** VS-02 (private thread) or MD-06 (group/Team channel) record, routing through the *stricter* transition, never a chat-only lightweight grant.
- Actor: same as the hosting channel. Workflow: MG-05. Requirement refs: `WA2-F-04` (attachment broadening visibility → formal VS-02 / MD-06 record; offline submission pending until server-confirmed), invariant #7; contract 4.
- Aggregates / contexts: A21 MessageAttachment; routes to A16/A17 (VS-02) or A15 Publication (MD-06); messaging + media + vault. Contract 4.
- User value: medium — attachments are expected in any chat; the guarantee is that they cannot bypass media-visibility safeguards.
- MVP necessity: **C1** (if F-26/F-27 ship, attachments must be handled — and an attachment must never reach a Team/group audience while bypassing MD-06's minor-consent gate; `WA2-F-04`).
- Dependency position: tier 4; upstream = F-26, F-27, F-20, F-23, S-03.
- Risk / uncertainty: inherits `OQ-MD06-AUTHORITY` / `OQ-VS02-MULTISUBJECT` for group-channel attachments of media depicting a tagged minor (safe default: blocked); an attachment whose broadened-visibility transition the actor cannot perform is rejected at that transition's boundary.
- Security / privacy / youth-safety / authz: **high.** Private-thread attachment → VS-02 semantics (authority, audit, VS-03 revocation); group/Team attachment → MD-06 semantics (publication authority, minor-consent gate, audience scoping, audit); a member cannot attach another member's private draft; athlete-to-athlete media routing rejected (no athlete-to-athlete channel; VS-02 disabled for athletes).
- Offline / sync: a queued attachment that broadens media visibility is **not authoritative** until the server confirms and applies the corresponding VS-02/MD-06 record; the broadened visibility must not be presented as effective on any device until then; a queued attachment colliding with an interim revoke/hold loses.
- Media-processing: uses S-06/S-07 for the attached media item.
- Complexity: **M.**
- Additional reviewers: D04 (mandatory), architecture-reviewer (contract 4).
- Acceptance evidence: attach a clip to a private thread → a formal VS-02 record created, revocable via VS-03, audited; attach to a Team channel → an MD-06 publication record, minor-consent gate applied (blocked if consent missing — see F-22), audited; attach a file the actor cannot share denied; offline attachment stays pending, broadened visibility not shown until server-confirmed.
- Rationale: **include.** Required the moment F-26/F-27 ship; `WA2-F-04` forbids a lightweight bypass.

---

**F-29 — Report / block / moderation path**
- User problem / outcome: any member can flag concerning content/behaviour in any channel and block unwanted contact from a specific person; reports route to the Head Coach, or bypass Team leadership to the Platform Safety Administrator when they implicate the Head Coach or are classified illegal/imminent-harm.
- Actor: any member (report/block); Head Coach (first responder); Platform Safety Administrator (escalated). Workflows: MG-06, PS-02. Requirement refs: baseline §5 (report/block available to **every** member regardless of role/tier/group; block semantics; restricted safety telemetry; MG-06 authoritative), invariant #14; `WA2-F-17` (blocking behaviour reclassified MAJOR in the Workflow Architecture v2 review).
- Aggregates / contexts: A22 BlockRelationship, A23 ReportCase, A29 EscalationCase; messaging + governance. Contract 11; S-04.
- User value: high — it is a youth-safety control, not a convenience; the product cannot responsibly carry minors + messaging + media without it.
- MVP necessity: **C1** (an approved safety invariant; you cannot ship F-20…F-28 for a 13–17 audience without report/block/moderation) + **C2** (trust prerequisite).
- Dependency position: cross-cutting; upstream = F-26, F-27, F-39 (escalation recipient), S-04, S-08.
- Risk / uncertainty: `OQ-MG-MOD-THRESHOLD` / `OQ-MG-REPORTED-NOTICE` / `OQ-MG-BLOCK-SAFE-COLLAPSE` / `OQ-PS-CLASSIFY` (all D04-owned; safe defaults: escalate anything the Head Coach can't resolve or that names them; reported individual not auto-notified; collapse ordinary content only; any reporter-selected "illegal/imminent-harm" category routes to PS-09 — over-inclusion is safer). Automated triage/classification is **Post-MVP** (F-P-9).
- Security / privacy / youth-safety / authz: **highest safety weight.** Block stops DMs/mentions/tags/shares/discovery between the parties; does not delete evidence or alter membership; safety/critical messages retain an honest path; a minor blocking a coach is offered a private report path in the same flow; restricted safety telemetry to the Platform Safety Administrator with **no** automatic punishment and **no** disclosure to Team leadership; reports implicating the Head Coach bypass Team leadership.
- Offline / sync: report/block may be composed offline and submitted on reconnect; the block's **effect** is not authoritative until server-confirmed; a block must propagate promptly (safety-relevant, not UX); moderation review requires connectivity.
- Media-processing: preserves media evidence (no deletion) under a hold (S-08).
- Complexity: **L.**
- Additional reviewers: D04 (mandatory — `youth-safeguarding-trust-safety`), architecture-reviewer (contract 11).
- Acceptance evidence: any role reports any accessible content; report implicating the Head Coach routes to the Platform Safety Administrator; block stops DM/mention/tag/share/discovery + preserves evidence + does not alter membership; minor-blocks-coach offers the private report path; block-safety telemetry stored without punishment or Team-leadership disclosure; report-receipt + escalation signals backed by the S-04 durable state model; every report/block/escalation audited.
- Rationale: **include.** An approved safety invariant and a hard prerequisite for shipping any UGC to minors.

---

**F-30 — Notification preferences (safety / operational / social classes)**
- User problem / outcome: a member controls how they receive non-safety notifications (bundle, mute, quiet hours) while safety and operationally-required notifications always reach them; nobody can set or view another member's preferences; safety class cannot be disabled.
- Actor: Account owner (own preferences only). Workflow: MG-07. Requirement refs: baseline §5 (three classes; safety cannot be disabled; operational stays in-app; social may be bundled/muted/quiet-hours), invariant #14; anchored to invariants #9 and #15 (preference state is never an authorization/entitlement input).
- Aggregates / contexts: A24 NotificationPreference (per-member, self-owned; store refuses "safety = off"); messaging context.
- User value: medium — expectation-level for any messaging product; the safety-lock is a youth-safety requirement.
- MVP necessity: **C1** (the safety-class un-disable-able rule + the three-class model are normative; every workflow that emits a notification references this class model; a 13–17 audience needs quiet-hours/bundling for social noise) + **C2**.
- Dependency position: tier 1; upstream = F-01, S-04.
- Risk / uncertainty: `OQ-MG07-DEFAULTS` (safe default: social on + unbundled, no quiet hours, until the member customises — defaults can ship and be tuned; UX research on a 13–17 audience is a `user-research-usability` follow-up, not a blocker).
- Security / privacy / youth-safety / authz: a member may read/change only their own record; safety class is not member-configurable and the store **refuses to persist** a "safety = off" state; preference state is **never** consulted by any authorization or entitlement check (invariants #9, #15).
- Offline / sync: preference edits queue offline and apply on reconnect; delivery semantics are unaffected by a pending edit; a not-yet-synced quiet-hours window may briefly over-notify social items only, never safety.
- Media-processing: none.
- Complexity: **S.**
- Additional reviewers: D04 (safety-class lock review point).
- Acceptance evidence: set quiet hours + bundle social → social respects it, a safety notification still arrives immediately in-app; disable all push → operational + safety still in-app; attempt to disable a safety-class notification → rejected, store refuses to persist; a coach/admin cannot view or set another member's preferences.
- Rationale: **include.** The class model and safety lock are normative and referenced product-wide.

---

**F-31 — Performance & history views (workout, training, metrics, PB/PR)**
- User problem / outcome: an athlete reviews their own full history, metrics, and personal bests; a coach reviews the same for athletes **currently** within their management scope; group aggregates never leak an out-of-scope athlete's individual data.
- Actor: Athlete (own full history); coach (current-scope athletes). Workflows: PF-01, PF-02, PF-03, PF-04. Requirement refs: baseline §2/§3 (current-scope-only for coaches; athletes always retain their own data; aggregates never reveal out-of-scope individuals), invariant #15; `WA2-F-15` (PF-01 current-scope-only made normative); contract 5.
- Aggregates / contexts: A25 PBRecord (the one stateful performance entity) + derived read models (WorkoutHistoryView, TrainingHistoryView, PerformanceMetricsView — own no primary data); performance context; S-11 pipeline. Contract 5.
- User value: high — "review athlete performance" is core value and a primary athlete motivator (PB tracking).
- MVP necessity: **C2** (core value — "review athlete performance") + **C1** (current-scope-only visibility and the aggregation-boundary rule are normative).
- Dependency position: tier 5; upstream = F-14, F-15, F-16, F-19 (personal-workout logs, athlete-only), S-11.
- Risk / uncertainty: `OQ-PF-AGG-METHOD` (D03: safe default — suppress re-identifying cohorts; aggregate only over individually-visible athletes), `OQ-PW-COACH-VISIBILITY` (safe default: personal workouts appear **only** in the owning athlete's own views — no coach sees them; a coach-facing personal-workout view is **Post-MVP**, F-P-7).
- Security / privacy / youth-safety / authz: a coach's view is bounded by **current** management scope (historical-scope-at-time-of-record is not used in v1); an athlete always sees their own full history; metrics never aggregate data the viewer could not see at the individual-record level; personal-workout entries are visually/structurally distinguished and athlete-only.
- Offline / sync: viewable from locally cached synced history; must reflect the authoritative SE-08 record including late-arriving offline completions merged per F-17; provisional local PB detection is provisional until reconciled.
- Media-processing: none.
- Complexity: **M.**
- Additional reviewers: D04 (scope + aggregation boundary), D03 (S-11 pipeline; `OQ-PF-AGG-METHOD`), architecture-reviewer (contract 5).
- Acceptance evidence: athlete sees own full history + metrics + PBs; coach sees an in-scope athlete's history; out-of-scope access denied; scope-narrow → the coach loses the now-out-of-scope athlete's identifiable data on the next check; a group aggregate cannot be used to infer an out-of-scope athlete's individual value; personal-workout entries appear only in the owner's own views; insufficient data → honest "not enough data", not a fabricated metric; a PB from a reconciliation-flagged result is flagged, not silently counted.
- Rationale: **include.** Core value; the scope + aggregation invariants must be enforced from day one.

---

**F-32 — Reports (own-data)**
- User problem / outcome: an athlete (or a coach for their own coaching data) compiles their own history/metrics into a structured report — e.g. a personal season summary or a recruiting profile input.
- Actor: Athlete (own data); coach (own-scope). Workflow: PF-05 (own-data slice). Requirement refs: baseline §3; contract 5; `OQ-PF-REPORT-OFFLINE`.
- Aggregates / contexts: A26 Report; reporting context. Contract 5.
- User value: medium-high — a tangible athlete takeaway (recruiting, personal records).
- MVP necessity: **C2** (a concrete "review performance" output; low complexity; own-data only) — borderline; classified required for the athlete self-report slice because it is the visible payoff of F-31 and is small.
- Dependency position: tier 5; upstream = F-31.
- Risk / uncertainty: `OQ-PF-REPORT-OFFLINE` (D03: safe default — an athlete's own-data report may generate from cached data offline with a freshness marker; group/Team reports need connectivity → that slice is F-33).
- Security / privacy / youth-safety / authz: a report can never include data outside the requester's authorized scope — rejected **before** generation, not filtered after.
- Offline / sync: own-data report may generate offline with an explicit data-freshness/completeness marker.
- Media-processing: none.
- Complexity: **S.**
- Acceptance evidence: athlete generates an own-season report; a request whose scope exceeds authorization is rejected before generation; a partially-synced report is marked with its freshness.
- Rationale: **include (own-data slice only).** Group/Team reports are F-33 (`MVP conditional`).

---

**F-34 — Data export (athlete self-export slice)**
- User problem / outcome: an athlete extracts their own history/metrics/report as a file for external use (recruiting, personal records); a coach exports only within current scope; export never expands scope.
- Actor: Athlete (self). Workflow: PF-06 (athlete-self slice). Requirement refs: baseline §5 (self-service export PF-06 is a data-subject right — PS-05), invariant #12; contract 13; `OQ-PF-MINOR-EXPORT`.
- Aggregates / contexts: A27 ExportEvent (immutable audit record — the data-leaving-the-system fact); reporting context. Contract 13.
- User value: medium-high — a data-subject right and a concrete athlete benefit.
- MVP necessity: **C1** (self-service export is named in baseline §5 as a data-subject-rights mechanism alongside self-service deletion; PS-05) + **C2**.
- Dependency position: tier 5; upstream = F-31, F-32.
- Risk / uncertainty: `OQ-PF-MINOR-EXPORT` (safe default: an athlete may **always** export their own data; a **coach**-initiated external export of a minor's identifiable performance data is the OPEN part → that slice is `MVP conditional` — see F-34-cond below).
- Security / privacy / youth-safety / authz: export never expands the actor's in-app scope; a scope-exceeding request is rejected **before** generation; export is a mandatory audit event (who, what, when, at what scope) — the point in-app visibility becomes data outside the system's controls.
- Offline / sync: export of already-cached own data may be possible offline; freshness/completeness must be marked honestly.
- Media-processing: none (media export is out of the PF-06 scope).
- Complexity: **M.**
- Additional reviewers: D04 (mandatory — minor data leaving the system), architecture-reviewer (contract 13).
- Acceptance evidence: athlete exports own history → file produced + immutable ExportEvent audit record; a scope-exceeding export rejected before generation; a partially-synced export marked with completeness; no "unexport" path.
- Rationale: **include (athlete self-export).** The coach-initiated external export of minor data slice is `MVP conditional` (F-34-cond, §"MVP conditional").

---

**F-35 — Age 13+ enforcement**
- User problem / outcome: no account exists for an asserted age below 13; a discovered under-age account is handled (→ F-36).
- Actor: prospective user (IT-01 age step). Workflow: PS-01. Requirement refs: baseline §5 (hard gate at account creation; not a Team-level setting), invariant #10; no parental-consent under-13 path exists (that would be a new product decision — Excluded, F-EX-4).
- Aggregates / contexts: A1 age gate; governance context (A30 for the discovered case → F-36).
- User value: not a user feature — a legal/safety baseline the whole product rests on.
- MVP necessity: **C1** (hard invariant #10) — non-optional.
- Dependency position: tier 1; upstream = F-01.
- Risk / uncertainty: `OQ-IT01-AGE-VERIFY` (safe default in force: self-attestation ≥13 + PS-07 response path; jurisdiction-specific stronger verification is a **production-launch legal sign-off** condition — a Phase-B gate, not a reason to defer the gate itself).
- Security / privacy / youth-safety / authz: a hard product-baseline invariant, not a configurable setting; age-gate decisions are audited; minimal data retention for rejected attempts.
- Offline / sync: N/A (inherits IT-01, not offline-capable).
- Media-processing: none.
- Complexity: **S.**
- Additional reviewers: D04 (mandatory — policy owner), legal-compliance-researcher (`OQ-IT01-AGE-VERIFY` at launch).
- Acceptance evidence: asserted age <13 → hard rejection, no durable account, minimal retention; no Team-level override exists; age-gate decision audited.
- Rationale: **include.** Hard invariant; the whole product depends on it.

---

**F-36 — Discovered under-age handling (restricted-first, governed closure)**
- User problem / outcome: when a credible signal says an active account belongs to someone under 13, the account is **restricted first** (use + unnecessary processing stop, data preserved), the Platform Safety Administrator determines, and only a confirmed determination proceeds to governed closure; a wrong determination is reversible via an audited restoration path.
- Actor: Platform Safety Administrator (sole determiner); any member/ops as signal source. Workflow: PS-07. Requirement refs: baseline §5 (restricted-first; not immediate termination; PSA determines; governed closure on confirmation; audited restoration), invariant #10.
- Aggregates / contexts: A30 UnderageCase (own state machine); governance context. Feeds F-01/F-07 (governed closure mechanics), S-08.
- User value: not a user feature — a required safety response the moment accounts exist.
- MVP necessity: **C1** (invariant #10; a product carrying minors needs this the moment F-01 ships) — non-optional.
- Dependency position: cross-cutting; upstream = F-01, F-29 (report as a signal source), F-39 (PSA), S-08, S-04.
- Risk / uncertainty: `OQ-PS07-GUARDIAN` / `OQ-PS07-RETENTION` / `OQ-PS07-JURISDICTION` / `OQ-PS07-DETECTION` (all D04/legal; safe defaults in force: notify a guardian where on record + legally required; preserve safety-evidence + legal-hold data, delete/anonymise the rest; apply the strictest known duty + escalate to counsel; **report-driven only** in v1 — proactive detection is **Post-MVP**, F-P-10). Jurisdiction sign-off gates production launch.
- Security / privacy / youth-safety / authz: only the Platform Safety Administrator — never a Head Coach — may determine or close; the first consequence is `restricted_pending_review` (no irreversible action); a determination without an auditable basis is a process failure; a wrong `confirmed_ineligible` is reversible via the audited `restored` path; comprehensive mandatory audit trail.
- Offline / sync: not offline-capable; the `restricted_pending_review` state must propagate to the user's devices promptly (authorization-sensitive).
- Media-processing: media held under the case per S-08.
- Complexity: **M.**
- Additional reviewers: D04 (mandatory — policy owner), legal-compliance-researcher.
- Acceptance evidence: signal → `restricted_pending_review` (use stops, data preserved, no irreversible action); Head-Coach attempt to determine/close denied; PSA confirms → governed closure with policy-driven data handling; not substantiated → restriction lifted, account `active`; wrong determination → audited `restored`; full audit trail (signal, restriction, reviewer, basis, determination, consequence, restoration).
- Rationale: **include.** Invariant #10; required the moment the product holds accounts.

---

**F-37 — Data Subject Request intake (assisted)**
- User problem / outcome: a data subject (or a guardian) raises an access/export/correction/deletion request broader than the self-service paths; it is verified, routed to the owning workflow (PF-06 export, IT-08 deletion, PR-02 / SE-10 correction), and tracked to a terminal state with reasons recorded for any refusal or partial fulfilment.
- Actor: data subject / guardian; D04 owner; D06 support-ops intake handler. Workflow: PS-08. Requirement refs: baseline §5 (assisted DSR intake alongside self-service IT-08 / PF-06), contracts 12, 13; PS-05.
- Aggregates / contexts: A31 DSRCase (fan-out to every context holding the subject's data); governance context. Contract 12; S-09.
- User value: not a user feature — a legal-rights mechanism.
- MVP necessity: **C1** (baseline §5 names PS-08 as a required companion to the self-service paths; the moment the product holds minor data, a broader-than-self-service request path must exist) — at **assisted** level (the workflow's own safe default: "assisted intake only in v1").
- Dependency position: cross-cutting; upstream = F-01, F-34, S-08, S-09.
- Risk / uncertainty: `OQ-PS08-STANDING` (safe default: only the authenticated owner acts in v1; a guardian request is accepted, logged, worked **manually** by D04 with legal review — a self-service guardian portal is **Post-MVP**, F-P-11), `OQ-PS08-JURISDICTION` (best-effort timeline pending a formal matrix — legal sign-off gates launch), `OQ-PS08-HOLD-INTERACTION` (deletion is `partially_fulfilled` for held/dependency-critical data with a recorded reason, never a silent skip), `OQ-PS08-SELFSERVICE` (assisted intake only in v1). Automated fan-out is S-09 conditional.
- Security / privacy / youth-safety / authz: a request is honoured only after identity + standing verification; fulfilment never exceeds the subject's own authorization scope; media depicting other athletes follows the MD-*/VS-* boundaries; held data → `partially_fulfilled` with a recorded reason.
- Offline / sync: not offline-capable; a deletion fulfilled here propagates with IT-08/IT-06 semantics.
- Media-processing: none directly.
- Complexity: **M.**
- Additional reviewers: D04 (mandatory — owner), D06 (support-ops intake), legal-compliance-researcher.
- Acceptance evidence: a full-export request → identity verified → export covering all the subject's data produced → case closed with an audit record; a guardian request → standing verified per the manual path → routed → fulfilled or `partially_fulfilled` with reasons; held/dependency-critical data → `partially_fulfilled` with a recorded reason, never a silent skip; every case audited (who, standing basis, per-context outcome, timing).
- Rationale: **include (assisted).** Baseline-named; safe defaults keep the manual path viable for v1; automated fan-out (S-09) is conditional/Post-MVP.

---

**F-38 — Illegal-content & mandatory-escalation path**
- User problem / outcome: a report/signal indicating potential illegal content or imminent harm is access-restricted, protected from redistribution, securely preserved under a legal/preservation hold, and routed past Team-level moderation to the Platform Safety Administrator and, under legal counsel, to external authorities.
- Actor: any member (reporter, via F-29); Platform Safety Administrator; external authorities (handoff only). Workflow: PS-09. Requirement refs: baseline §5 (suspected illegal content is access-restricted, protected, securely preserved, routed to qualified safety/legal review), invariant #14; contract 11.
- Aggregates / contexts: A32 IllegalContentCase (not resolvable at Team level); A33 PreservationHold; governance context. Contract 11; S-08; S-04.
- User value: not a user feature — a mandatory safety obligation for a youth product carrying UGC and media.
- MVP necessity: **C1** (the moment F-20…F-29 carry user media/messages for minors, this path must exist) — non-optional.
- Dependency position: cross-cutting; upstream = F-29, F-39, S-08, S-04.
- Risk / uncertainty: `OQ-PS-CLASSIFY` (safe default: any reporter-selected "illegal/imminent-harm" category + ops review routes here and is preserved pending human review — over-inclusion is safer; automated classification is **Post-MVP**), `OQ-PS09-EXTERNAL` (safe default: **no** automated external reporting — every handoff human- and legal-counsel-gated; legal sign-off gates production moderation ops), `OQ-PS09-HOLD` (safe default: hold indefinitely until D04 legal releases; access limited to the Platform Safety Administrator).
- Security / privacy / youth-safety / authz: **highest.** Not resolvable at Team level — a Head Coach cannot review/dismiss/adjudicate; content placed under a preservation hold on classification and made inaccessible pending review; ordinary deletion (IT-08/MD-07/PS-08/IT-09) does not purge held content; any external handoff is performed only by the platform authority under legal guidance.
- Offline / sync: not offline-capable; holds + access restrictions must propagate promptly and reliably (S-04 model); a stale device must not retain access to held content.
- Media-processing: preserves media evidence (no deletion) under S-08; access-restricts derived copies.
- Complexity: **M** (mechanism); the classification/legal process is largely OPEN with a safe default.
- Additional reviewers: D04 (mandatory — `youth-safeguarding-trust-safety` + `legal-regulatory-compliance`), architecture-reviewer (contract 11).
- Acceptance evidence: a report classified into this path → content preserved + inaccessible + case bypasses Team-level review + routed to the Platform Safety Administrator; a Team-level actor attempting to dismiss denied; hold blocks deletion across IT-08/MD-07/PS-08/IT-09 until released; incorrect classification → case exits to ordinary MG-06/PS-03 and the hold is released per policy; comprehensive audit retained per legal guidance.
- Rationale: **include.** Non-negotiable for a youth product with UGC and media; the safe defaults keep v1 viable while legal specifics are resolved.

---

**F-39 — Platform Safety Administrator role + moderation / escalation tooling**
- User problem / outcome: there must be a named, least-privilege platform actor **outside** any Team hierarchy that receives escalations, determines under-age cases, handles illegal-content cases, and can perform moderation revocation (VS-03) — otherwise F-29/F-36/F-38 have no recipient.
- Actor: Platform Safety Administrator (D04-owned). Workflow: PS-03 + cross-cutting (MG-06 escalation, PS-07, PS-09, VS-03 moderation). Requirement refs: baseline §5 (canonical `Platform Safety Administrator`; least-privilege; Head-Coach-implicated bypass; the role, remit, and two mandatory bypass routes are **fixed**), `bounded-context-owners.yaml` `platform_actors`.
- Aggregates / contexts: A29 EscalationCase, A33 PreservationHold; governance context. Contract 11.
- User value: not a user feature — the structural recipient every safety flow needs.
- MVP necessity: **C1** (you cannot ship F-29 with no one to receive escalations; the role + remit are fixed by the architecture — only staffing/SLA/thresholds are OPEN).
- Dependency position: cross-cutting; upstream = S-05, S-08; downstream recipient for F-29, F-36, F-38, F-23 (moderation VS-03).
- Risk / uncertainty: `OQ-PS-MOD-STAFFING` (safe default: escalations queue durably and are worked in severity order — **staffing/SLA is a production-launch condition**, not a build blocker; the queue + tooling must exist), `OQ-PS-HC-IMPLICATED-PROCESS` (safe default: platform review with possible IT-06/TA-01 outcome + legal handoff), `OQ-MG-MOD-THRESHOLD`.
- Security / privacy / youth-safety / authz: **least-privilege** — the actor has exactly the authority its enumerated cases require, no more; sits outside every Team hierarchy; sole authority for under-age determinations, illegal-content routing, Head-Coach-implicated escalations, and moderation revocation.
- Offline / sync: not offline-capable; escalation state must be reliably and promptly visible to the actor (S-04 model).
- Media-processing: can force VS-03 revocation and access-restrict case media (S-07/S-08).
- Complexity: **L** (durable queue, case tooling, least-privilege access model, audit).
- Additional reviewers: D04 (mandatory — owner), architecture-reviewer (least-privilege access model; contract 11).
- Acceptance evidence: an escalated report/under-age case/illegal-content case lands in a durable queue visible to the Platform Safety Administrator and worked in severity order; the actor can perform exactly its enumerated authorities and no Team-scoped action beyond them; a Head-Coach-implicated report never reaches Team leadership; every action audited.
- Rationale: **include (role + tooling).** The role and remit are fixed by the architecture; only staffing/SLA are OPEN and become a Phase-B launch-gate condition.

---

**F-42 — Entitlement derivation interface (BE-05 single point; flag ≠ authz predicate)** · **RECLASSIFIED `MVP conditional`** (independent D01 review finding N-2, §13.11 of the release scope; DR-A5). *Activation condition: F-40 tier gating is activated (a D06-approved entitlement artifact defines `OQ-BE-TIER-MAP`) — i.e., the BE-05 derivation interface + `EntitlementFlag` type are built when there is commercial state to derive flags from. Safe default in v1: there is **no** `EntitlementFlag` type and **no** BE-05 interface; the one load-bearing rule — no `identity`/`teams`/`vault`/`profile`/`performance` authorization path references a commercial/entitlement flag type — is carried by **S-02** and enforced by a build-time lint check (S-02, INC-0).*
- User problem / outcome: when commercial state eventually gates features, there must be exactly **one** place it translates into feature-availability flags, and those flags must be **structurally non-consumable** as authorization predicates.
- Actor: system. Workflow: BE-05. Requirement refs: baseline §6A (payment ≠ authorization — invariant #9), contract 6 (C-5: flags typed/namespaced separately from role/scope checks, with a documented testable "no authz path consumes a BE-05 flag" rule).
- Aggregates / contexts: A28 TeamSubscription → `EntitlementSet` DS (DR-2(e)); billing + `platform/entitlements`. Contract 6.
- User value: not a user feature — an architectural control point for a commercial model that does not ship in v1.
- MVP necessity: **not C1 in v1.** The circular reasoning the first draft used ("required so no authz path can grow a dependency on billing state") is answered more directly by the fact that **v1 has no billing/entitlement flag type at all** — there is nothing to depend on. The only rule that must exist now is the *negative* build-time constraint, which is cheap and lives in S-02. The derivation interface itself is built with F-40 gating. → **conditional**.
- Dependency position: cross-cutting; upstream = F-40 (which is itself conditional), S-02.
- Risk / uncertainty: `OQ-BE-TIER-MAP`, `OQ-BE-TIER-STRUCTURE` (D06 not ratified). A separate approved D06 entitlement artifact is a hard precondition to F-42 activation and to any billing implementation (F-41).
- Security / privacy / youth-safety / authz: **structural** — see the S-02 row and J-13. In v1, invariant #9 holds vacuously (no flag type) *and* by the S-02 build-time rule.
- Offline / sync: n/a in v1 (nothing built).
- Media-processing: none.
- Complexity: **S** (when activated).
- Additional reviewers: D04 (payment ≠ authorization — mandatory), D06 (`operations-governance-reviewer`), architecture-reviewer (contract 6 ratified BE-05 as the single derivation point).
- Acceptance evidence (v1): the S-02 build-time check finds **no** `identity`/`teams`/`vault`/`profile`/`performance` authorization path referencing any commercial/entitlement flag type, **and** no such type exists (J-13). (On activation: exactly one derivation point; typed flags only; recompute fails restrictive.)
- Rationale: **conditional.** Resolves finding P-F-05. The negative rule (S-02) is the v1 invariant-#9 control; the positive interface is deferred with F-40.

---

### MVP conditional

---

**F-19 — Personal workouts — create, log, edit/delete** · *activation condition: the Team's `personal_workouts_allowed` is enabled (F-06).*
- User problem / outcome: an athlete authors and logs self-directed workouts, independent of any coach prescription, when their Team permits it.
- Actor: Athlete (own records only). Workflows: PW-01, PW-02, PW-03. Requirement refs: baseline §3 (personal workouts are athlete-owned; disabling blocks new create/execute but never deletes or blocks private correction/export; never grants planning authority), invariant #6; domain-model A14 (structurally isolated), §7.8.
- Aggregates / contexts: A14 PersonalWorkout (isolated from the planning hierarchy — no coach or Team artifact depends on it); workouts context.
- User value: medium-high for athletes on Teams that enable it; a differentiator for self-motivated athletes.
- MVP necessity: **C2** (a distinct athlete value stream) — **conditional** because it is, by product design, gated by the Team setting (F-06 / TA-07); the capability ships, active only where a Team enables it.
- Dependency position: tier 3; upstream = F-06 (the gate), F-01, S-03.
- Activation condition: `personal_workouts_allowed = enabled` for the athlete's Team, checked server-side against the current authoritative value.
- Risk / uncertainty: `OQ-PW-COACH-VISIBILITY` (safe default: **not visible to any coach** — a coach-facing personal-workout view is Post-MVP, F-P-7), `OQ-PW-RETENTION-DURATION` (retain in the athlete's private library while the account is active). The one genuine authorization-timing race is PW-01 create against a stale "enabled" — flagged, not silently persisted (domain-model §4.1).
- Security / privacy / youth-safety / authz: only the owning athlete may create/log/edit/delete; no coach authors or alters; a personal workout never appears as a prescribable/reusable coach template; PW-03 correction and export are **not** gated by the setting.
- Offline / sync: fully offline-capable (same offline-critical posture as F-15); single-owner record — no cross-athlete conflict; same-athlete two-device edits merge without loss; a post-hoc definition edit preserves the version each log was performed against.
- Media-processing: none.
- Complexity: **M.**
- Additional reviewers: D04 (athlete-owned data boundary), D03 (offline).
- Acceptance evidence: with the setting enabled — create/log/edit/delete works; with it disabled — PW-01/PW-02 blocked, existing records retained, PW-03 correction + export still available; re-enable restores full access with no data loss; offline draft against a stale "enabled" is flagged; a coach has no visibility into any personal workout.
- Rationale: **conditional (ships; gated by F-06).** The capability is built once; whether an athlete can use it is a per-Team Head-Coach decision that already exists as a product control.

---

**F-22 — Team media publication (consent-gated)** · *activation condition: a D04-approved per-tagged-minor consent/notice mechanism + a Head-Coach publication-authority gate exist.*
- User problem / outcome: a media owner makes a clip visible to a defined Team/group audience — the broadest visibility transition — with per-tagged-minor consent enforced and multi-subject youth media blocked until every depicted athlete's consent condition is met.
- Actor: media owner + Head Coach (authority/approval gate). Workflow: MD-06. Requirement refs: baseline §4 (publication is never implicit; multi-subject youth media blocked by default), invariants #7, #12; contract 4.
- Aggregates / contexts: A15 Publication child (AudienceScope, per-tagged-minor ConsentCondition); media + governance. Contract 4; S-04.
- User value: medium — Team highlight sharing; not on the core individual coaching/review loop.
- MVP necessity: **C4-gated.** The mechanism is normative but its enabling policy is unresolved: `OQ-MD06-AUTHORITY` (safe default: **publication requires Head-Coach authority/approval + an explicit per-tagged-minor consent/notice step; missing consent → blocked**) and `OQ-VS02-MULTISUBJECT` (safe default: **blocked**). Both are D04-owned and open. Until the consent mechanism is approved, publication stays **disabled**.
- Dependency position: tier 4; upstream = F-20, F-21, F-23, S-04; activation gated by the D04 consent-mechanism decision.
- Activation condition: D04 approves the per-tagged-minor consent/notice mechanism (who consents for a minor, how it is recorded) **and** the Head-Coach publication-authority gate is implemented. Absent that, F-22 ships **disabled** (the safe default), and chat-attachment-to-a-Team-channel (F-28) inherits the same block.
- Risk / uncertainty: `OQ-MD06-AUTHORITY`, `OQ-VS02-MULTISUBJECT`, `OQ-MD06-UNPUBLISH` (safe default: unpublish removes from the authoritative audience view + best-effort cache invalidation), `OQ-MD-CAPTURE-NOTICE`. **Known limitation:** enforcement keys on the tag — an untagged-but-depicted minor is not system-detectable; capture-time notice + the publication-authority gate are the compensating controls, and a publisher attesting "no other minors depicted" is on record for that attestation.
- Security / privacy / youth-safety / authz: **very high.** Broadest visibility change of youth-relevant media; mandatory audit; D04 blocking concern.
- Offline / sync: not offline-capable; a queued publish is not authoritative until server-confirmed and propagated; propagation must be authorization-atomic.
- Media-processing: uses S-06/S-07; unpublish best-effort-invalidates cached copies.
- Complexity: **M** (mechanism); the consent policy is the gating unknown.
- Additional reviewers: D04 (mandatory — blocking authority), architecture-reviewer (contract 4).
- Acceptance evidence: publication attempt with any required minor consent missing → **blocked**; publication where Team policy disallows it → rejected; a published clip is visible only to the defined audience with an attributable publication record + recorded per-minor consent; unpublish reverts visibility + best-effort cache purge; every publication audited.
- Rationale: **conditional.** The mechanism is normative but its enabling policy (`OQ-MD06-AUTHORITY`, `OQ-VS02-MULTISUBJECT`) is D04-owned and open; the safe default (blocked / disabled) is a legitimate v1 experience. Ship the mechanism disabled; activate on the D04 decision.

---

**F-33 — Reports (group / Team)** · *activation condition: `OQ-PF-AGG-METHOD` resolved (or its safe default explicitly accepted for group scope) + connectivity assumed.*
- User problem / outcome: a coach compiles a group/Team season report (attendance, completion rates, PB counts) across athletes within their current scope.
- Actor: coach (current-scope) / Head Coach (Team-wide). Workflow: PF-05 (group/Team slice). Requirement refs: baseline §3 (aggregates never reveal an out-of-scope athlete's individual data), contract 5.
- Aggregates / contexts: A26 Report over derived read models; reporting context. Contract 5.
- User value: medium-high for Head Coaches (end-of-season school/club reporting).
- MVP necessity: **C4-gated.** The aggregation-boundary rule is normative but the aggregation *method* (`OQ-PF-AGG-METHOD`, D03) and offline behaviour (`OQ-PF-REPORT-OFFLINE`, D03) are open; group reports "require connectivity" per the safe default.
- Dependency position: tier 5; upstream = F-31, S-11.
- Activation condition: D03 confirms an aggregation method that suppresses re-identifying cohorts and aggregates only over individually-visible athletes (or D01/D04 explicitly accept the safe default for the group slice), and the report is generated online.
- Risk / uncertainty: `OQ-PF-AGG-METHOD`, `OQ-PF-REPORT-OFFLINE` (both D03).
- Security / privacy / youth-safety / authz: a report can never include data outside the requester's authorized scope — rejected before generation; a small cohort is suppressed to avoid re-identification.
- Offline / sync: group/Team reports need connectivity; a partially-synced report is marked with its freshness.
- Media-processing: none.
- Complexity: **M.**
- Additional reviewers: D04 (aggregation boundary), D03 (`OQ-PF-AGG-METHOD`).
- Acceptance evidence: a group report over in-scope athletes; a report request exceeding scope rejected before generation; a cohort small enough to re-identify is suppressed; offline group-report request is refused with an honest reason.
- Rationale: **conditional.** Own-data reports (F-32) ship as MVP-required; the group/Team slice waits on the D03 aggregation-method confirmation (or explicit acceptance of the safe default).

---

**F-34-cond — Coach-initiated external export of a minor's identifiable performance data** · *activation condition: `OQ-PF-MINOR-EXPORT` resolved (consent/notice + jurisdiction restrictions).*
- Scope: the slice of PF-06 where a **coach** exports a minor's identifiable performance data for an **external** recipient.
- MVP necessity: **C4-gated.** Athlete self-export (F-34) is MVP-required; a coach may export within current scope for in-app use; the OPEN part is whether coach-initiated **external** export of a minor's identifiable data needs additional consent/notice + jurisdiction-specific restriction (`OQ-PF-MINOR-EXPORT`, D04/legal).
- Activation condition: D04/legal resolves `OQ-PF-MINOR-EXPORT`. Until then, the safe default holds: a coach export is bounded to current scope, audited, never expands scope; the specific "external recipient" consent question is unresolved and this slice is not activated as a distinct feature.
- Reviewers: D04 (mandatory), legal-compliance-researcher.
- Rationale: **conditional.** Named OPEN item; the safe default covers coach in-app-scope export; the external-recipient slice waits on legal.

---

**F-40 — Commercial tier state (Free / Mid / Top skeleton; no gating)** · *activation condition of any tier gating: a D06-approved entitlement artifact defining `OQ-BE-TIER-MAP`.*
- User problem / outcome: a Team records a commercial tier (defaulting to Free); no feature is gated by it in v1.
- Actor: Head Coach. Workflow: BE-01. Requirement refs: baseline §6B (Free/Mid/Top is a D06-owned working skeleton, **not** ratified; `OQ-BE-TIER-STRUCTURE`), §6A (payment ≠ authorization).
- Aggregates / contexts: A28 TeamSubscription (TierState VO); billing context.
- User value: none direct in v1 (no gating); it is a data field the future commercial model needs.
- MVP necessity: **C4-gated.** The tier-state field can ship (Free default, no gating). `OQ-BE-TIER-STRUCTURE` (structure not D06-ratified) and `OQ-BE-TIER-MAP` (no feature tier-gated until D06's artifact) are both open; **no paid billing ships in v1** (F-41).
- Dependency position: tier 1; upstream = F-02, S-02.
- Activation condition (for *gating*, not the field): a D06-approved entitlement artifact defining the feature→tier mapping. Until then the field exists and gates nothing.
- Risk / uncertainty: `OQ-BE-TIER-STRUCTURE`, `OQ-BE-TIER-MAP`, `OQ-BE-BILLING-OWNER` (safe default: Head Coach is sole billing owner + tier-change authority).
- Security / privacy / youth-safety / authz: tier state gates **feature availability only** — never authorization (invariant #9); the field is read only by F-42 (BE-05), never by an authorization path.
- Offline / sync: tier state must propagate so feature checks read the current authoritative value; a stale cache never grants paid-tier access indefinitely (moot in v1 with no gating).
- Media-processing: none.
- Complexity: **S.**
- Additional reviewers: D06 (`operations-governance-reviewer` — owns the structure), D04 (payment ≠ authorization).
- Acceptance evidence: a Team has a tier-state field defaulting to Free; changing it changes nothing user-visible in v1; the field is read only by F-42, never by an authorization check.
- Rationale: **conditional.** The field is cheap and future-proofs the data model; all gating and structure ratification are D06-owned and out of v1 scope.

---

**S-09 — DSR fan-out / erasure orchestration (automated)** · *activation condition: a designed automated fan-out across all contexts holding a subject's data.*
- Scope: automating the contract-12 fan-out that F-37 (PS-08) performs. In v1, F-37 routes to the owning workflows with **manual/assisted** coordination (the workflow's safe default: "assisted intake only in v1").
- MVP necessity: **C4-gated.** The seam (contract 12) must be honoured; a fully **automated** cross-context erasure/portability orchestration is a larger build than assisted intake needs.
- Activation condition: D03/D04 design the automated fan-out (per-context erasure-vs-anonymisation responsibility, `OQ-DD-RETENTION`, `OQ-PS07-RETENTION`).
- Rationale: **conditional / leaning Post-MVP.** Assisted intake (F-37) covers the v1 legal obligation; automation is an efficiency improvement.

---

**S-10 — Realtime messaging transport** · *activation condition: a chosen realtime transport; the queue/sync fallback is the safe default.*
- Scope: low-latency delivery for F-26/F-27/F-28.
- MVP necessity: **C4-gated.** Messaging is MVP-required; realtime *latency* is a quality target. The workflow-architecture offline model for messaging is "queue and sync" (WORKFLOW-ARCHITECTURE-v2.md §6, "moderate criticality — degrade to read-only / queue-and-sync"), so queue/sync delivery is the safe default and a legitimate v1 experience.
- Activation condition: D03 selects a realtime transport (`platform/realtime/`) and it passes reliability review.
- Rationale: **conditional.** Ship messaging on queue/sync; add realtime as a quality improvement without changing any workflow semantics.

---

### Post-MVP

| ID | Deferred capability | Workflows / decision | Why deferred (safe default that holds in v1) |
|---|---|---|---|
| F-41 | Paid billing — trial/subscription, upgrade/downgrade, failed-payment/grace | BE-02, BE-03, BE-04, BE-06 | Baseline §6B: **"no paid billing ships in v1."** A separate approved D06 entitlement artifact (provider, prices, taxes, refunds, IAP, plan limits, trial, grace, over-limit) is a hard precondition. `OQ-BE-PROVIDER/PRICING/TAX/IAP/TRIAL/GRACE/OVERLIMIT`, `OQ-IT09-REFUND`. |
| F-P-1 | Team-wide shared template library | `CD-TEMPLATE-LIBRARY` / `OQ-TP-TEMPLATE-SHARING` | Safe default: templates are author-private (+ Head Coach). Curation/ownership model undecided. F-10 ships author-private. |
| F-P-2 | Event Coach delegation (invite / remove / assign / group admin) | `CD-EC-DELEGATION` | Candidate decision; safe default: no delegation in v1 — an Event Coach may *request* actions from the Head Coach. |
| F-P-3 | VS-02 recipient-analysis rights | `OQ-VS02-RIGHTS` | Safe default: a VS-02 share is view-only in v1. |
| F-P-4 | Athlete self-start of a coach-prescribed Session | `OQ-SE-ATHLETE-SELFSTART` | Safe default: no athlete self-start — personal workouts (F-19) are the self-directed path. |
| F-P-5 | Coach override of an athlete's self-classification | `OQ-SE-COACH-OVERRIDE` | Safe default: no silent override — a coach adds an attributed annotation or requests an SE-10 correction. |
| F-P-6 | Session auto-finalization | `OQ-SE-AUTOFINALIZE` | Safe default: no auto-finalization — a session stays `in_progress` until a coach ends it. |
| F-P-7 | Coach-facing personal-workout visibility | `OQ-PW-COACH-VISIBILITY` | Safe default: personal workouts are not visible to any coach. Requires a product decision + athlete consent model. |
| F-P-8 | Coach ↔ athlete private-thread oversight / guardian visibility / supervised messaging | `OQ-MG-OVERSIGHT` | Safe default: no standing third-party visibility in v1 — content reachable only via report / PS-03 / PS-09. |
| F-P-9 | Automated moderation triage & illegal-content classification | `OQ-MG-MOD-THRESHOLD`, `OQ-PS-CLASSIFY` | Safe default: manual — Head Coach handles what they can, everything else escalates; reporter-selected illegal/imminent-harm routes to PS-09. |
| F-P-10 | Proactive age-signal detection | `OQ-PS07-DETECTION` | Safe default: report-driven only in v1. |
| F-P-11 | Self-service guardian portal (DSR) | `OQ-PS08-STANDING`, `OQ-PS08-SELFSERVICE` | Safe default: only the authenticated owner acts; guardian requests worked manually by D04 with legal review. |
| F-P-12 | Automatic coach-facing RPE/wellbeing flag | `OQ-SE-RPE-FLAG` | Safe default: no automatic flag — the managing coach sees RPE within normal scope. |
| F-P-13 | Athlete self-check-in; in-place Event-Coach cycle promotion; Subgroup re-parenting; plan co-authorship handoff | `OQ-SE-SELFCHECKIN`, `OQ-TP-PROMOTE`, `OQ-TA-REPARENT`, `CD-PLAN-COAUTHOR` | Each has a conservative safe default in force; none is on the core loop. |
| F-P-14 | Web client | — | Objective is "iOS-first, iPad-oriented". `domains/*/web/` scaffolds do not imply a v1 web surface. D02-owned; a later release decision. |
| F-P-15 | Federated identity provider sign-in | IT-01 alt path ("governed by D04; not modeled") | Not modeled as a v1 workflow; D04-owned. Direct credential + verified-channel is the v1 path. |
| F-P-16 | `archived` soft-retained media state | `OQ-MD07-ARCHIVE-STATE` | Safe default: hard deletion only in v1; no separate archived state unless a legal hold requires it. |
| S-09 | Automated DSR fan-out (see MVP conditional) | contract 12 | Assisted intake (F-37) covers the v1 obligation. |
| S-10 | Realtime transport (see MVP conditional) | `platform/realtime/` | Queue/sync delivery is the safe default. |

### Excluded from the current release

| ID | Excluded item | Basis |
|---|---|---|
| F-EX-1 | Athlete ↔ athlete private DMs | Baseline: "athlete-to-athlete private DMs are **not** baseline functionality — out of scope in v1" (`messaging/WORKFLOWS.md`). |
| F-EX-2 | Athlete ↔ athlete media sharing | Baseline §4 / VS-02: "athlete-to-athlete media sharing is **disabled in v1**." |
| F-EX-3 | Open join code / link / self-serve approval queue | `OQ-IT04-JOIN-MECHANISM` safe default: **direct invitation only** — an uncontrolled join path is a youth-safety risk; a non-invitation join mechanism needs a vetting design + new decision. |
| F-EX-4 | Under-13 accounts (e.g. with parental consent) | Baseline §5 / PS-01: age 13+ is a hard gate; "no workaround path ... exists in the governed product baseline — if such a path is ever desired, it is a new product decision requiring explicit approval." |
| F-EX-5 | Any navigation redesign / reinstating a revoked navigation decision | Invariant #11; `ORCHESTRATOR.md` authority order ("Never revive revoked navigation decisions"). No navigation is designed at this layer. |
| F-EX-6 | Payment / subscription state as an authorization mechanism | Invariant #9 / baseline §6A — a hard rule, not a scoping choice. |
| F-EX-7 | Multiple roles for one account within a single Team | Baseline §2 / invariant #2 — "one role per Team". (Multiple roles **across** Teams are supported — F-04.) |
| F-EX-8 | Coach edit of an athlete-owned personal profile or performed-work truth | Invariant #4 — structural; not a feature that can be scoped in. |
| F-EX-9 | Broadening Event Coach data access beyond assigned Event Group scope (via communication reach or otherwise) | Invariants #3, #15; `product-strategist` prohibited actions. |
| F-EX-10 | Making tagged/private media Team-visible by default | Baseline §4 / invariant #7; `product-strategist` prohibited actions. Publication is always explicit and consent-gated (F-22, conditional). |

---

## 5. Prioritization summary

| Class | Count | Feature IDs |
|---|---|---|
| **MVP required** | 35 user-facing features + 11 supporting capabilities = 46 | F-01, F-02, F-03, F-04, F-05, F-06, F-07, F-08, F-09, F-11, F-12, F-13, F-14, F-15, F-16, F-17, F-18, F-20, F-21, F-23, F-24, F-25, F-26, F-27, F-28, F-29, F-30, F-31, F-32, F-34 (athlete self), F-35, F-36, F-37 (assisted), F-38, F-39 (35 user-facing); S-01, S-02, S-03, S-04, S-05, S-06, S-07, S-08, S-11, S-12, S-13 (11 supporting) |
| **MVP conditional** | 9 | F-10 (increment budget at INC-2 G4, else Post-MVP), F-19 (gated by F-06), F-22 (D04 consent mechanism), F-33 (`OQ-PF-AGG-METHOD`), F-40 (tier gating → D06 artifact), F-42 (BE-05 derivation interface — deferred with F-40; the one load-bearing v1 rule lives in S-02), F-34-cond (`OQ-PF-MINOR-EXPORT`), S-09 (automated fan-out), S-10 (realtime) |
| **Post-MVP** | F-41 + F-P-1…F-P-16 (+ the S-09 / S-10 automated/realtime layers; F-10 falls here if INC-2 has no budget) | see §4 table |
| **Excluded from current release** | 10 | F-EX-1…F-EX-10 |

**Highest-risk / highest-attention MVP items (for Phase B sequencing):**
1. **F-17 (offline session reconciliation)** — XL; the single largest build; the honesty guarantee for the whole offline-first product.
2. **F-23 (Vault grant/share/revoke)** — the highest-sensitivity surface; revocation propagation + local-cache handling is a first-class requirement.
3. **F-29 + F-38 + F-39 (safety spine)** — a hard prerequisite for shipping any UGC/media to a 13–17 audience; several D04-owned OPEN items with safe defaults, and `OQ-PS-MOD-STAFFING` becomes a production-launch gate condition.
4. **F-02 + F-03 + F-05 (identity/team spine)** — the single-Head-Coach transactional guard and scope-propagation are load-bearing for every downstream authorization check.
5. **S-02 + S-03 (authorization kernel + offline substrate)** — every feature depends on them; they must land in the foundation increment.

---

## 6. Department 01 review (Phase A) and remediation log

Per the command contract, Phase A is reviewed by Department 01 before Phase B. This review was run by the `product-experience-lead` lens against the actual artifact (not a summary), using the `product-strategy` and `user-research-usability` skill validation checklists.

### 6.1 Review record

- **Scope:** product coherence; completeness of the candidate inventory (screens + supporting capabilities); alignment with the approved baseline, workflow architecture, and domain model; correctness of the method; honesty of the classification (no OPEN item silently resolved; no invariant contradicted).
- **Authoritative inputs:** §1.1 list.
- **Evidence inspected:** every row of §3 and §3.1 against the 86-workflow inventory and the 16 invariants; §4 records against `WORKFLOW-ARCHITECTURE-v2.md` §9.1/§9.2 and `domain-model.md` §3/§4/§6/§7; §2 method against the `product-strategy` SKILL operating procedure and decision rules.
- **Blocking findings:** none.
- **Non-blocking findings (all remediated in this artifact):**

| ID | Finding | Remediation |
|---|---|---|
| A-01 | First draft omitted several supporting capabilities the user-facing set structurally requires (durable safety-notification capability; preservation-hold seam; entitlement-flag typing discipline). | Added S-04, S-08, and F-42; each traced to a contract seam / invariant. |
| A-02 | "MVP required" initially included Team media publication (F-22), but its enabling policy (`OQ-MD06-AUTHORITY`, `OQ-VS02-MULTISUBJECT`) is D04-owned and open. | Reclassified F-22 to **MVP conditional** with an explicit activation condition; safe default (disabled/blocked) documented. |
| A-03 | Export (PF-06) was a single "required" item, conflating athlete self-export with coach-initiated external export of minor data (`OQ-PF-MINOR-EXPORT`, open). | Split into F-34 (MVP required — athlete self) and F-34-cond (MVP conditional). |
| A-04 | Complexity bands risked being read as effort estimates. | Added explicit "not an engineering estimate — D02/D03 own real estimates at G4" labelling in §2.2/§2.4 and per-feature. |
| A-05 | The Step-1 domain-model status needed confirmation from governed sources, and an earlier draft had noticed a lifecycle-record sync gap. | §1.2 confirms APPROVED from three agreeing sources; the lifecycle-record sync (registry flip, current-state record, companion-pointer refresh, commit pin) was completed on `main` at commit `5db47f1` before this artifact was authored — no residual finding. |
| A-06 | F-10 (templates) as "MVP required" is the weakest necessity claim in the required set. | **Superseded by the independent D01 review (finding N-1) — F-10 reclassified `MVP conditional` (§6.3, DR-A5).** |

- **Conditions:** (1) the independent specialist reviews (recorded in `stridelab-ai/orchestration/reviews/step2-dept01/` and synthesised in `mvp-release-scope.md` §13.11) confirm the classification — condition **C-IND**; (2) the human **G7 product-scope decision** is the final governance step (it is **not** a legal review or a launch authorization — `mvp-release-scope.md` §11.4); (3) `user-research-usability` follow-ups (`OQ-MG07-DEFAULTS`, `OQ-SE-RECONCILE-UX` presentation, `OQ-MG-BLOCK-SAFE-COLLAPSE` classifier) are named, not resolved.
- **Disposition:** **PASS WITH CONDITIONS** (`product-strategy` production assessment: PASS WITH CONDITIONS — usable; named external/environmental limits remain and their effect is explicit).
- **Reviewer identity:** Department 01 `product-experience-lead` lens, orchestrator-executed (this §6.1 pass). The **independent** D01 specialist review is `stridelab-ai/orchestration/reviews/step2-dept01/01-d01-product.md` (`PASS_WITH_CONDITIONS`; findings N-1…N-4 applied — F-10 and F-42 reclassified, §7.1 matrix aligned).
- **Downstream effect:** this artifact is the input to `docs/product/mvp-release-scope.md` (Phase B) and to the cross-department + independent specialist reviews recorded there (§13).

### 6.3 Product challenge — necessity re-examination of seven capabilities

Per the review mandate ("do not rubber-stamp 'smallest coherent MVP'; a capability required only because another *optional* capability was included must not become 'required' through circular reasoning"), the seven flagged capabilities were re-examined by the independent D01 lens (`.../step2-dept01/01-d01-product.md`).

| Capability | Verdict | Basis |
|---|---|---|
| **F-10 Session/workout templates** | **Reclassified `MVP conditional`** (was "MVP required"). | Not on the core-value critical path (F-09 delivers "plan training" end to end); no invariant requires it; F-11 duplication covers the dominant v1 reuse case. The "required" justification used an adoption-risk claim, which §2.1 prohibits (no user-research / market evidence). Activation condition + safe default in §4 and `mvp-release-scope.md` §6.1. |
| **F-42 Entitlement derivation interface** | **Reclassified `MVP conditional`** (was "MVP required"); the one load-bearing v1 rule moved into **S-02**. | Circular: "required so no authz path can grow a dependency on billing state" is answered directly by the fact that v1 has **no** entitlement-flag type at all. The negative build-time constraint (no `identity`/`teams`/`vault`/`profile`/`performance` authz path references a commercial/entitlement flag type) is cheap and lives in S-02 (MVP required, INC-0). The BE-05 derivation interface is built with F-40 gating. Resolves finding **P-F-05**. |
| **F-26 / F-27 messaging** | **Kept `MVP required`.** | "Communicate" is named in the approved product objective (`mvp-release-scope.md` §2) and baseline §1. Removing it contradicts approved scope. Invariant #15 (reach ≠ scope) is only testable once F-27 exists. |
| **F-30 Notification preferences** | **Kept `MVP required`**, scope stated precisely. | Not circular: invariant #14 (safety class cannot be disabled) + the three-class model apply the moment **any** notification is emitted — and S-04 safety notifications are emitted by F-21/F-23/F-36, not only by messaging. The v1 scope is the class model + the safety-lock enforcement (store refuses "safety = off") + operational-always-in-app + a basic social on/off; quiet-hours/bundling polish is `OQ-MG07-DEFAULTS` (a `user-research-usability` follow-up, D01-N2). |
| **F-31 Performance & history views** | **Kept `MVP required`.** | "Review athlete performance" is in the approved objective. Removing it contradicts approved scope. The current-scope-only + aggregation-boundary invariants must be enforced from day one. |
| **F-32 Own-data reports** | **Kept `MVP required`, flagged the weakest of the kept set (DR-A5 note).** | F-31 (views) + F-34 (export) already deliver "review performance" + "take your data" end to end; a formatted report *document* (PF-05) is a convenience layer. Retained because it is small (complexity S) and is the visible athlete/coach payoff of F-31; if increment budget is tight it is the first "kept" capability to defer — recorded for Diego in DR-A5. |
| **F-34 Data export (athlete self-export)** | **Kept `MVP required`.** | Baseline §5 names self-service export (PF-06) as a **data-subject right** alongside self-service deletion. Removing it contradicts baseline §5 and a data-subject-rights obligation. |
| **F-39 Platform Safety Administrator role + tooling** | **Kept `MVP required` — not circular.** | Required because F-29 (report/block) needs a recipient — and F-29 is itself required by baseline §5 ("report/block available to every member") + invariant #14, which apply the moment any UGC/media reaches minors (F-20, F-26). A real safety dependency chain rooted in baseline §5, not in an optional capability. Staffing/SLA (`OQ-PS-MOD-STAFFING`) is a separate production-launch condition. |

**Alternative recorded for the human (F-42 / F-40).** *Option A (adopted, recommended):* ship the Free-default tier-state field (F-40) + the S-02 build-time rule in v1; defer the BE-05 interface (F-42) to the paid-billing release. *Option B:* defer **all** commercial/entitlement concept (no tier-state field, no BE-05, no flag type) to the paid-billing release — invariant #9 then holds vacuously in v1. Baseline §6B / IT-02 ("a new Team defaults to Free") leans toward Option A, so A is adopted; Option B is a legitimate Diego decision (DR-A5).

No `OQ-*` / `CD-*` item is resolved by any of the above. The reclassifications are pre-approval draft-state changes made by the owning Department's review and are put to the human in **DR-A5**.

---

## 7. Findings register (contradictions / gaps found during prioritization)

Per the task: "If prioritization reveals a real contradiction, register it as a finding and route it through the correct governance workflow." No finding contradicts an approved invariant or normative decision; none is resolved here.

| ID | Type | Finding | Evidence | Severity | Owner / route |
|---|---|---|---|---|---|
| P-F-01 | gap (non-blocking) | The safety spine (F-29/F-36/F-38/F-39) is a hard prerequisite for shipping any UGC/media to a 13–17 audience, but `OQ-PS-MOD-STAFFING` (staffing/SLA) is unresolved. | `WORKFLOW-ARCHITECTURE-v2.md` §9.2 `OQ-PS-MOD-STAFFING`; baseline §5. | non-blocking (safe default: queue durably, work in severity order) | D04; becomes a **production-launch gate condition** in `mvp-release-scope.md` §gate criteria. Not a build blocker. |
| P-F-02 | sequencing note | F-22 (publication) and the group-channel slice of F-28 share the same D04-owned consent-mechanism block; activating one without the other would be inconsistent. | `messaging/WORKFLOWS.md` MG-05 open questions; `media/WORKFLOWS.md` MD-06; `OQ-MD06-AUTHORITY`. | non-blocking | D01 + D04; recorded as a joint activation condition in Phase B. |
| P-F-03 | evidence gap | No usability evidence exists for a 13–17 primary audience; several UX-detail OPEN items (`OQ-MG07-DEFAULTS`, `OQ-SE-RECONCILE-UX` presentation, `OQ-MG-BLOCK-SAFE-COLLAPSE`) depend on it. | `product-strategy` / `user-research-usability` SKILLs; §9.2. | non-blocking (safe defaults ship and are tuned) | D01 `user-research-usability`; a research work package, not a v1 blocker. |
| P-F-04 | scope clarification | The repo carries `domains/*/web/` scaffold directories, but the product objective is "iOS-first, iPad-oriented". | `stridelab-ai/application-map/bounded-contexts.md` (scaffold note); baseline §1. | informational | D01 + D02; recorded as F-P-14 (Post-MVP) and stated in `mvp-release-scope.md` §devices/platforms. |
| P-F-05 | dependency note | F-42 (BE-05 entitlement interface) was classified MVP-required as a *typing/discipline* control even though no paid billing ships; a reviewer could read this as scope creep. | contract 6 C-5; baseline §6A; invariant #9. | **RESOLVED** — the independent D01 review (finding N-2) reclassified F-42 `MVP conditional`; the one load-bearing v1 rule is now in S-02 (§3.1, §6.3, DR-A5). | closed |
| P-F-06 | method limitation | Complexity bands (C5) are qualitative orchestrator judgement with no engineering input; increment sequencing in Phase B inherits this uncertainty. | §2.2, §2.4 `[assumption]` labels. | non-blocking | D02 + D03 own real estimates at G4; Phase B increments are dependency-ordered, not effort-ordered, to limit the exposure. |

---

## 8. Gate posture (advisory — not human approval)

| Gate / lens | Disposition | Basis |
|---|---|---|
| G0 — Authority & Context | `PASS_WITH_CONDITIONS` | Primary owner (D01) resolved; all authoritative artifacts identified (§1.1); Step-1 domain-model status confirmed APPROVED from three agreeing governed sources (§1.2). |
| G1 — Product / Workflow (D01, owner) | **recommend-approve-with-conditions** | Inventory covers all 86 workflows + the supporting authorization/sync/media/notification/audit/release capabilities; classification method stated with criteria, tie-break order, limitations, assumptions; no OPEN item resolved; no invariant contradicted; conditions = the §6.1 conditions + §7 findings' safe defaults. |
| G2 — Architecture / Contracts | `PASS_WITH_CONDITIONS` | No bounded-context boundary changed; no new deployable service beyond the already-approved `services/media-worker`; every feature mapped to its aggregates + contract seams; the F-42 scope-creep concern (P-F-05) is **resolved** — F-42 reclassified `MVP conditional`, the contract-6-C-5 rule now carried by S-02 (§6.3). |
| G3 — Security / Privacy / Youth safeguarding (D04) | `PASS_WITH_CONDITIONS` | Every safety/authz/privacy/media/messaging feature carries a D04-mandatory-reviewer note and its `§9.2` safe default; F-22/F-34-cond reclassified conditional where a D04 policy is open; `OQ-PS-MOD-STAFFING` routed as a launch-gate condition (P-F-01). Conditions = the D04-owned OPEN items, each defaulted conservatively. |
| Department 03 — persistence / sync / media feasibility | `PASS_WITH_CONDITIONS` | Features reference the domain-model aggregates + the D03-reviewed §10 remediations; F-17/F-23/S-03/S-07 flagged as the D03-critical items; residual = already-open D03 items (`OQ-MEDIA-CACHE-INVALIDATION`, `OQ-PF-AGG-METHOD`, `OQ-SE-OFFLINE-P2P`, `OQ-PF-REPORT-OFFLINE`). |
| **G7 — Human Approval** | **PENDING** | Requested after Phase B, the full cross-department review, and remediation — see `mvp-release-scope.md` §decision package. |

---

## 9. Decisions requiring human approval (deferred to the Phase B decision package)

This artifact proposes; it does not decide. The following are put to a human at G7 **together with** `docs/product/mvp-release-scope.md`:

- **DR-A1** — Adopt this feature prioritization (the §3/§3.1 inventory and the §4/§5 classification) as the governed input to the MVP release scope.
- **DR-A2** — Accept the stated prioritization **method** (§2): invariant-and-dependency-driven necessity with the C1→C5 lexicographic tie-break, given the absence of user research / market evidence / engineering estimates.
- **DR-A3** — Accept the **MVP conditional** activation conditions in §4 (F-19 ← F-06; F-22 ← D04 consent mechanism; F-33 ← `OQ-PF-AGG-METHOD`; F-34-cond ← `OQ-PF-MINOR-EXPORT`; F-40 gating ← D06 entitlement artifact; S-09 ← automated fan-out design; S-10 ← realtime transport selection).
- **DR-A4** — Confirm the **Excluded** list (§4, F-EX-1…F-EX-10) as out of scope for the current release, noting each is invariant-mandated or requires a separate new product decision.
- **DR-A5** — Confirm the **review-driven reclassifications** (§6.3, from the independent D01 specialist review): **F-10 templates** and **F-42 entitlement interface** move from `MVP required` to `MVP conditional` (the one load-bearing v1 rule of F-42 is absorbed into S-02). Net effect: MVP-required = **35 user-facing + 11 supporting = 46** (was 48); MVP-conditional = **9** (was 7). Optionally decide **Option A vs Option B** for the v1 commercial scaffold (§6.3): A (adopted) ships a Free-default tier-state field + the S-02 rule; B defers all commercial/entitlement concept to the paid-billing release.

No `OQ-*` / `CD-*` item is resolved by any of the above. DR-A5 is a pre-approval scope adjustment by the owning Department's review; the human confirms or reverts it.

---

## 10. Source artifact references

- Canonical (this file): `docs/product/feature-prioritization.md`
- Companion (Phase B): `docs/product/mvp-release-scope.md`
- Lifecycle record: `stridelab-ai/project-memory/current-state/feature-prioritization.md`
- Upstream: `docs/product/product-baseline.md`, `docs/product/workflow-architecture.md` (+ `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §5/§9.1/§9.2), `docs/product/domain-model.md`, `ARCHITECTURE.md`
- Application map: `stridelab-ai/application-map/bounded-contexts.md`, `stridelab-ai/application-map/cross-context-contracts.md`
- Approvals: `stridelab-ai/orchestration/approvals/G7-product-baseline.md`, `G7-workflow-architecture-v2.md`, `G7-domain-model.md`
- Registry: `stridelab-ai/registry/artifacts.yaml`, `stridelab-ai/registry/bounded-context-owners.yaml`
