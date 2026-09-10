# Current State — StrideLab Consolidated Domain Model

**Status: `APPROVED`** — G7 granted by Diego on 2026-09-10. Authored 2026-09-10 by
Department 01 `domain-workflow-architect` (skill `domain-modeling`) under
`stridelab-ai/departments/01-product-experience/commands/domain/model-domain.md`,
orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md`.
Supersedes the companion **stub** created in the Workflow Architecture v2
correction pass (finding F-21). Approval record:
`stridelab-ai/orchestration/approvals/G7-domain-model.md`.

Canonical artifact: `docs/product/domain-model.md` (one canonical location).
Registry entry: `stridelab-ai/registry/artifacts.yaml` → `domain-model`
(`status: APPROVED`, `approved_by: Diego`, `approved_date: 2026-09-10`). The
Workflow Architecture v2 and the governed product baseline remain separately
approved and unchanged. No repository commit SHA is pinned in the approval record
yet — to be added when the approved artifact and its companion metadata are
committed together.

## What this artifact is

The consolidated semantic model for StrideLab — one place where every Department
means the same thing when naming a StrideLab object, ownership rule, invariant,
lifecycle state, or transition. It **consolidates and restates** content already
normative via **Workflow Architecture v2 §9.1** (G7-approved) and the **APPROVED
governed product baseline**. It creates no new decision and resolves none.

Contents:
- Ubiquitous-language glossary (identity/team/role; training/sessions/personal
  workouts; media/tagging/vault/analysis; communication/safety/commercial).
- Entity and value-object catalogue across all 14 bounded contexts + platform
  capabilities.
- **35 aggregate boundaries and ownership** (A1–A35), with a table of the
  cross-aggregate invariants that need a single-transaction guard or a fail-safe
  ordering rule (Department 03 scope).
- Relationship model (identity / ownership / membership / containment /
  assignment / tagging / sharing / derivation / escalation).
- Invariant-to-aggregate mapping for the 16 §5 cross-workflow invariants plus the
  two hard commercial invariants (baseline §6A).
- Consolidated lifecycles and transitions for every stateful concept.
- Bounded-context map + the translation points (the existing 14 seams; no new
  seam added).
- Nine scenario tests (coach / athlete / multi-Team / offline / media-sharing /
  personal-workout / communication-reach / under-13 / deletion-under-hold).

## Ownership, dependencies, downstream consumers

- **Owner:** Department 01 Product & Experience (`domain-workflow-architect`).
  **Reviewers:** Department 03 (`database-engineer` / `platform-data-reviewer`)
  for persistence & transaction boundaries; Department 04 for the safety/privacy
  invariants restated; `architecture-reviewer` for bounded-context/contract
  consistency.
- **Upstream (approved):** `product-baseline` (APPROVED), `workflow-architecture`
  v2 (APPROVED), `architecture-decision` (APPROVED). Application map consumed.
- **Downstream consumers:** Departments 02, 03, 04, 06 (registry
  `downstream_consumers`). D02/D03 implementation-design (schema, API-contract
  shapes, client features) for a bounded context builds on the aggregate
  boundaries + lifecycles here.

## Work completed (2026-09-10 authoring pass)

- Read `stridelab-ai/project-memory/current-state/`, `ORCHESTRATOR.md`, the
  `model-domain` command, the `domain-modeling` SKILL, the
  `domain-workflow-architect` and `database-engineer` agents, the registry, the
  application map, and all 13 `stridelab-ai/knowledge/workflows/*/WORKFLOWS.md`
  category files (86 workflows) plus `WORKFLOW-ARCHITECTURE-v2.md` §4/§5/§9.1/§9.2
  and the 14 cross-context contracts.
- Authored `docs/product/domain-model.md` (glossary, concept catalogue +
  ownership, 35 aggregates, relationship model, invariant map, lifecycles,
  bounded-context map, scenarios).
- **Department 03 persistence & transaction-boundary review** conducted and
  folded in as §10: **PASS WITH CONDITIONS**. 12 findings (F-D03-01…12); the
  five MAJOR findings (one-Head-Coach transactional guard + uniqueness;
  `PerformedWorkLog` append-only / no in-place update; no denormalised Vault
  `visible` flag; `SafetyNotification` written in the triggering event's
  transaction / outbox; `PreservationHold` fail-safe as an in-transaction
  deletion precondition) were remediated in the artifact. Residual conditions are
  the already-open D03 items (`OQ-MEDIA-CACHE-INVALIDATION`, `OQ-PF-AGG-METHOD`,
  `OQ-SE-OFFLINE-P2P`, `OQ-SE-RECONCILE-UX` UX portion, `OQ-PF-REPORT-OFFLINE`) —
  none created or resolved here.
- Registry `domain-model` entry updated `STUB → AWAITING_HUMAN_APPROVAL` with
  `primary_specialist`, `reviewed_by`, `current_state_record`,
  `downstream_consumers`, and a refreshed `blocking_stage` / `notes`.
- This current-state record created.

## G7 approval (2026-09-10)

**Diego** granted G7 for `docs/product/domain-model.md` as the governed
consolidated domain model. Registry `domain-model.status
AWAITING_HUMAN_APPROVAL → APPROVED` with `approved_by` / `approved_date` /
`approval_record`; approval record
`stridelab-ai/orchestration/approvals/G7-domain-model.md` created; this
current-state record flipped to `APPROVED`.

- **DR-1 — APPROVED.** Adopt the artifact as the governed consolidated domain
  model.
- **DR-2 — APPROVED AS-IS.** The aggregate-ownership decisions in §4 are ratified:
  (a) `SessionExecution` / `PerformedWorkLog` / `ReconciliationRecord` are three
  separate aggregates; (b) `Tag` / `VaultGrant` / `Share` / `Publication` are
  independently represented records, not states/fields on `MediaArtifact`;
  (c) `Membership` is an aggregate distinct from `Team` with `Assignment`s inside
  its boundary; (d) per-level planning roots; (e) `EntitlementSet` a derived
  projection. These are the ratified consistency boundaries D02/D03 design schema
  and API contracts against at G4 per bounded context.
- **DR-3 — CONFIRMED.** Registry `blocking_stage` ratified as
  `before_G4_per_bounded_context`.

Diego also applied three in-session corrections to the artifact:
media-lifecycle representation (§3.6 / §7.9 — attach/tag/publish are
independently represented associated records, not states of the artifact);
ReportCase routing target (§4 A23 — feeds `EscalationCase` A29 and, on
illegal/imminent-harm classification, `IllegalContentCase` A32); and the
`VaultVisibilityResolution` cross-reference in §10 F-D03-05 (now `§3.8 / VS-04`).

**No `OQ-*` / `CD-*` item was resolved, converted, or created by the approval.**
The D03-owned persistence items remain open under their existing IDs. Companion
publication (the `docs/product/workflow-architecture.md` "stub → companion"
pointer refresh) is applied; the commit pin is to be recorded when the change is
committed to `main` via PR (branch protection: PR + `validate` check required).

## Reviews and gate posture (advisory — not human approval)

| Gate / lens | Disposition | Basis |
|---|---|---|
| G1 — Product / workflow (D01, owner) | recommend-approve | consolidates §9.1 + the 16 invariants + all 86 workflow state machines with no semantic drift; no navigation; prescription / execution / performed-work / personal-workout kept structurally distinct |
| G2 — Architecture / contracts | PASS WITH CONDITIONS | no bounded-context boundary changed; no new deployable service; cross-aggregate references by id; dependency direction preserved; consistent with the 14 seams and `ARCHITECTURE.md` |
| G3 — Security / privacy / youth safeguarding (D04) | PASS WITH CONDITIONS | DOB/age restricted to `is_minor`; tag ≠ grant ≠ share ≠ publish structural; Vault visibility never derived; payment ≠ authorization structural; blocking / Platform Safety Administrator / preservation-hold fail-safe / multi-subject-blocked restated intact; conditions = D04-owned §9.2 legal items, each with its safe default, none resolved |
| Department 03 — persistence & transaction boundaries | PASS WITH CONDITIONS | `docs/product/domain-model.md` §10; aggregate/transaction model implementable in PostgreSQL without weakening any invariant given the folded-in remediations |
| **G7 — Human Approval** | **`APPROVED`** | Diego, 2026-09-10 (`stridelab-ai/orchestration/approvals/G7-domain-model.md`); DR-1 APPROVED, DR-2 APPROVED AS-IS, DR-3 CONFIRMED |

## Decision outcomes (recorded in the G7 approval, above)

- **DR-1 — APPROVED.** `docs/product/domain-model.md` is the governed consolidated
  domain model.
- **DR-2 — APPROVED AS-IS.** The five aggregate-ownership decisions in §4 are the
  ratified consistency boundaries for D02/D03 schema and API-contract design at
  G4 per bounded context.
- **DR-3 — CONFIRMED.** `blocking_stage` = `before_G4_per_bounded_context`.

## Blockers / accepted conditions

- **No blockers.** G7 granted 2026-09-10.
- **No `OQ-*` / `CD-*` item is resolved, converted, or created** by the artifact
  or the approval. The complete OPEN register remains
  `WORKFLOW-ARCHITECTURE-v2.md` §9.2 with every safe default in force.
  Persistence-design items (`OQ-MEDIA-CACHE-INVALIDATION`, `OQ-PF-AGG-METHOD`,
  `OQ-SE-OFFLINE-P2P`, `OQ-SE-RECONCILE-UX` UX portion, `OQ-PF-REPORT-OFFLINE`)
  stay D03-owned and open — accepted downstream conditions, each gating its
  implementation sub-area, not this artifact.
- **Pending publication step:** the change (approved artifact + registry flip +
  approval record + this record + the `docs/product/workflow-architecture.md`
  companion-pointer refresh) must land on `main` via PR (branch protection: PR +
  `validate` check, `enforce_admins: true`); the commit pin is then added to the
  approval record and this record.

## Source artifact references

- Canonical: `docs/product/domain-model.md`
- Upstream: `docs/product/product-baseline.md`,
  `docs/product/workflow-architecture.md`,
  `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §4/§5/§9.1/§9.2
- Application map: `stridelab-ai/application-map/bounded-contexts.md`,
  `stridelab-ai/application-map/cross-context-contracts.md`
- Registry: `stridelab-ai/registry/artifacts.yaml`
