# G7 Approval Record — StrideLab Consolidated Domain Model

Per `stridelab-ai/orchestration/approvals/approval-policy.md`, an approval must
identify the artifact/action, approver, scope, conditions, and date/version.

| Field | Value |
|---|---|
| **Action** | `approve_product_or_architecture_lock` — G7 (Human Approval) for the StrideLab Consolidated Domain Model as the governed semantic model, plus ratification of the aggregate-ownership decisions that lock downstream schema design. |
| **Artifact** | `docs/product/domain-model.md` — the consolidated semantic model (ubiquitous-language glossary; entity/value-object catalogue across all 14 bounded contexts + platform capabilities; 35 aggregate boundaries + ownership; the 16-invariant-to-aggregate mapping; consolidated lifecycles/transitions; bounded-context map; nine scenario tests), with a Department 03 persistence & transaction-boundary review folded in as §10. Registry id `domain-model` in `stridelab-ai/registry/artifacts.yaml`; lifecycle record `stridelab-ai/project-memory/current-state/domain-model.md`. Supersedes the companion **stub** created at this path in the Workflow Architecture v2 correction pass (finding F-21). |
| **Approver** | Diego |
| **Date** | 2026-09-10 |
| **Version approved** | `docs/product/domain-model.md` as authored 2026-09-10 by Department 01 `domain-workflow-architect` (skill `domain-modeling`), including Diego's three in-session corrections (media-lifecycle representation in §3.6 / §7.9; ReportCase routing target in §4 A23; the `VaultVisibilityResolution` cross-reference in §10 F-D03-05). **No repository commit SHA is asserted by this record** — the approval was given against the artifact content; the commit pin is to be added when this approved artifact and its companion metadata (registry status, `docs/product/workflow-architecture.md` pointer) are committed together. |
| **Relationship to prior G7s** | The 2026-09-07 G7 (`G7-workflow-architecture-v2.md`) approved the **Workflow Architecture v2**; the 2026-09-08 G7 (`G7-product-baseline.md`) approved the **governed product baseline**. Both remain separately approved and unchanged. This domain model **consolidates and restates** content already normative via Workflow Architecture v2 §9.1 and the approved product baseline; it introduces no new product decision. |

## Scope

`docs/product/domain-model.md` is **approved as the governed consolidated domain
model** for StrideLab — the single semantic reference every Department uses when
naming a StrideLab object, ownership rule, invariant, lifecycle state, or
transition. It is authoritative over historical discussion and superseded
material for domain terminology and structure.

Two decision requests were ratified alongside the G7:

- **DR-1 — APPROVED.** Adopt the artifact as the governed consolidated domain
  model.
- **DR-2 — APPROVED AS-IS.** Ratify the aggregate-ownership decisions in §4 that
  lock downstream schema design:
  (a) `SessionExecution` (coach-owned), `PerformedWorkLog` (athlete-owned,
  append-only), and `ReconciliationRecord` are **three separate aggregates**;
  (b) `Tag`, `VaultGrant`, `Share`, and `Publication` are **independently
  represented records**, not states or fields on `MediaArtifact`;
  (c) `Membership` is an aggregate **distinct from `Team`**, with `Assignment`s
  inside the `Membership` boundary;
  (d) planning uses **per-level roots** (Macrocycle / Block / Week / Session),
  not one Season-tree aggregate;
  (e) `EntitlementSet` is a **derived projection** off `TeamSubscription`
  (BE-05), not a stored aggregate.
  These become the ratified consistency boundaries against which Departments 02
  and 03 design schema and API contracts at G4 for each bounded context.
- **DR-3 — CONFIRMED.** The consolidated domain model must exist **before G4
  (Implementation Integrity) sign-off for each bounded context** — before that
  context's schema, API-contract shape, or client-feature design is approved. It
  blocks neither the Workflow Architecture v2 G7 nor the 14 G2 seam
  identifications (only their shape design at G4). Registry `blocking_stage`
  ratified as `before_G4_per_bounded_context`.

## Conditions (accepted at approval — not resolved by this approval)

1. **No `OQ-*` / `CD-*` item is resolved, converted, or created by this
   approval.** The complete OPEN register remains `WORKFLOW-ARCHITECTURE-v2.md`
   §9.2, each item under its named owner (D01 / D03 / D04 / legal / D06) with its
   conservative safe default in force. The items the model leans on are listed in
   `docs/product/domain-model.md` §11.
2. **Department 03-owned persistence items remain open** under their existing
   IDs: `OQ-MEDIA-CACHE-INVALIDATION`, `OQ-PF-AGG-METHOD`, `OQ-SE-OFFLINE-P2P`,
   `OQ-SE-RECONCILE-UX` (UX portion), `OQ-PF-REPORT-OFFLINE`. The §10 D03 review
   is **PASS WITH CONDITIONS**: implementable in PostgreSQL without weakening any
   invariant, provided the F-D03-01/03/05/07/08 remediations (folded into the
   artifact) are honoured at schema-design time.
3. **Repository publication tasks** carried by this approval: flip registry
   `domain-model.status` `AWAITING_HUMAN_APPROVAL → APPROVED` with
   `approved_by` / `approved_date` / `approval_record`; refresh the
   `docs/product/workflow-architecture.md` companion pointer from "stub" to
   "companion"; add the commit pin to this record and to the lifecycle record
   when the change is committed.
4. **The Workflow Architecture v2 and the governed product baseline remain
   separately approved** and are unchanged by this approval.

## Gate record at approval

Advisory gate/lens dispositions (`stridelab-ai/project-memory/current-state/domain-model.md`),
plus this human decision:

| Gate / lens | Disposition |
|---|---|
| G1 — Product / workflow (D01, owner) | recommend-approve — consolidates §9.1 + the 16 invariants + all 86 workflow state machines with no semantic drift; no navigation |
| G2 — Architecture / contracts | `PASS_WITH_CONDITIONS` — no boundary change; no new deployable service; cross-aggregate references by id; dependency direction preserved; consistent with the 14 seams and `ARCHITECTURE.md` |
| G3 — Security / privacy / youth safeguarding (D04) | `PASS_WITH_CONDITIONS` — DOB/age restricted to `is_minor`; tag ≠ grant ≠ share ≠ publish structural; Vault visibility never derived; payment ≠ authorization structural; blocking / Platform Safety Administrator / preservation-hold fail-safe / multi-subject-blocked restated intact |
| Department 03 — persistence & transaction boundaries | `PASS_WITH_CONDITIONS` (`docs/product/domain-model.md` §10) — 12 findings; the five MAJOR remediated in-artifact; residual = already-open D03 items |
| **G7 — Human Approval** | **`APPROVED`** — Diego, 2026-09-10 |

No reviewer found a hard youth-safety, privacy, authorization, or architecture
boundary violation, and no BLOCKING finding was open at approval.

## Verbatim approval

> All §12 decisions are complete:
> DR-1: APPROVED
> DR-2: APPROVED AS-IS
> DR-3: CONFIRMED
> G7: APPROVED — Diego, 2026-09-10
>
> I also corrected three internal inconsistencies involving media lifecycle,
> ReportCase routing, and a mistaken §3.8 reference.

*(Recorded verbatim. "§12 decisions" are the DR-1 / DR-2 / DR-3 decision requests
in `docs/product/domain-model.md` §12. No repository commit was named; the commit
pin is added when the approved artifact and its companion metadata are
committed.)*
