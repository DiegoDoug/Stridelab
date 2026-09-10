# Current State — StrideLab MVP Feature Prioritization

**Status: `AWAITING_HUMAN_APPROVAL`** — Department 01 Step 2, Phase A. Authored 2026-09-10
by Department 01 Product & Experience (`product-strategist`, skills `product-strategy` +
`user-research-usability`) under
`stridelab-ai/departments/01-product-experience/commands/strategy/prioritize-features.md`,
orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md`.

Canonical artifact: `docs/product/feature-prioritization.md` (one canonical location).
Registry entry: `stridelab-ai/registry/artifacts.yaml` → `feature-prioritization`
(`status: AWAITING_HUMAN_APPROVAL`). Header, registry, and this record agree.

## What this artifact is

A prioritized inventory of candidate capabilities for the first StrideLab release.
It **proposes** an MVP-necessity classification; it is not an approved decision. It
resolves, converts, or creates **no** `OQ-*` / `CD-*` item (`WORKFLOW-ARCHITECTURE-v2.md`
§9.2 remains the complete OPEN register with every safe default in force), changes **no**
product invariant, and designs **no** navigation.

Contents: a five-criterion prioritization method (C1 invariant-completion necessity → C2
core-value necessity → C3 dependency position → C4 risk/uncertainty → C5 relative
complexity, applied in that lexicographic tie-break order); a 40-feature master table
plus 13 cross-cutting supporting capabilities (`S-01…S-13`); per-feature records covering
the ~20 required fields; a classification into **MVP required** (30 user-facing + 12
supporting), **MVP conditional** (7, each with a named activation condition), **Post-MVP**
(F-41 + F-P-1…F-P-16), and **Excluded from the current release** (F-EX-1…F-EX-10); a
Department 01 review + remediation log; and a findings register (P-F-01…P-F-06).

## Ownership, dependencies, downstream consumers

- **Owner:** Department 01 Product & Experience (`product-strategist`). **Department
  lead:** `product-experience-lead`.
- **Upstream (approved):** `product-baseline` (APPROVED 2026-09-08), `workflow-architecture`
  v2 (APPROVED 2026-09-07), `domain-model` (APPROVED 2026-09-10 — `main`@`5db47f1`),
  `architecture-decision` (`ARCHITECTURE.md`). Application map consumed.
- **Downstream consumers:** `mvp-release-scope` (Phase B — consumes the feature IDs +
  classification directly); Departments 02, 03, 04, 05, 06; `architecture-reviewer`;
  `cross-department-reviewer`.

## Work completed (2026-09-10)

- Read every authoritative input in `docs/product/feature-prioritization.md` §1.1 — the
  root + project `CLAUDE.md`, `AGENTS.md`, `ORCHESTRATOR.md`, all four
  `stridelab-ai/project-memory/current-state/` records, the registry, the application map,
  the governed baseline, the canonical workflow architecture + its supporting index
  (§1–§12, incl. §5 the 16 invariants, §9.1 normative decisions, §9.2 the full OPEN
  register), **all 13 `stridelab-ai/knowledge/workflows/*/WORKFLOWS.md` category files (86
  workflows)**, the consolidated domain model (35 aggregates + lifecycles + contracts),
  the three G7 approval records, the phase-gates + dependency-graph + routing +
  feature-delivery files, the shared contracts, the Department 01 `product-strategy` +
  `user-research-usability` SKILLs, the `product-strategist` + `product-experience-lead`
  agents, and the four repository validators.
- Confirmed the Step-1 domain model's status is **APPROVED** from three agreeing governed
  sources (registry + `G7-domain-model.md` + artifact header); the Step-1 publication
  (registry flip, lifecycle record, companion-pointer refresh, commit pin) is complete on
  `main`@`5db47f1`.
- Authored `docs/product/feature-prioritization.md`.
- Ran the Department 01 (`product-experience-lead` lens) review against the artifact:
  **PASS WITH CONDITIONS**; six non-blocking findings (A-01…A-06) remediated in-artifact.
- Registered the findings P-F-01…P-F-06 (non-blocking; each routed to a named owner; none
  contradicts an approved invariant; none resolved here).

## Reviews and gate posture (advisory — not human approval)

| Gate / lens | Disposition | Basis |
|---|---|---|
| G0 — Authority & Context | `PASS_WITH_CONDITIONS` | primary owner (D01) resolved; all authoritative artifacts identified; Step-1 domain-model status confirmed APPROVED |
| G1 — Product / workflow (D01, owner) | recommend-approve-with-conditions | inventory covers all 86 workflows + the supporting authorization/sync/media/notification/audit/release capabilities; method stated with criteria, tie-break order, limitations, assumptions; no OPEN item resolved; no invariant contradicted |
| G2 — Architecture / contracts | `PASS_WITH_CONDITIONS` | no boundary change; no new deployable service beyond the approved `services/media-worker`; every feature mapped to its aggregates + contract seams |
| G3 — Security / privacy / youth safeguarding (D04) | `PASS_WITH_CONDITIONS` | every safety/authz/privacy/media/messaging feature carries a D04-mandatory-reviewer note + its §9.2 safe default; F-22 / F-34-cond reclassified conditional where a D04 policy is open |
| Department 03 — persistence / sync / media feasibility | `PASS_WITH_CONDITIONS` | features reference the domain-model aggregates + the §10 D03-reviewed remediations; F-17 / F-23 / S-03 / S-07 flagged as the D03-critical items |
| **G7 — Human Approval** | **PENDING** | requested after Phase B + the full cross-department review + remediation — decision package in `mvp-release-scope.md` §15 |

## Decisions requiring human approval (deferred to the Phase B decision package)

- **DR-A1** — adopt this feature prioritization as the governed input to the MVP release
  scope.
- **DR-A2** — accept the prioritization method (C1→C5 lexicographic tie-break, given the
  absence of user research / market evidence / engineering estimates).
- **DR-A3** — accept the seven **MVP conditional** activation conditions.
- **DR-A4** — confirm the F-EX-1…F-EX-10 exclusion list.

No `OQ-*` / `CD-*` item is resolved by any of these.

## Blockers / accepted conditions

- **Human decision pending:** DR-A1…DR-A4, folded into the single G7 decision package in
  `mvp-release-scope.md` §15 (zero open BLOCKING findings; conditions each with a named
  owner).
- **No `§9.2` item is resolved.** Every conservative safe default remains in force.
- **Reviewer independence:** the Department 01 review was orchestrator-executed against the
  actual artifact; an independent Department 01 reviewer separate from the authoring pass
  should confirm before G7 (condition C-IND in `mvp-release-scope.md` §13.10).

## Source artifact references

- Canonical: `docs/product/feature-prioritization.md`
- Companion (Phase B): `docs/product/mvp-release-scope.md`
- Upstream: `docs/product/product-baseline.md`, `docs/product/workflow-architecture.md`,
  `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §5/§9.1/§9.2,
  `docs/product/domain-model.md`
- Application map: `stridelab-ai/application-map/bounded-contexts.md`,
  `stridelab-ai/application-map/cross-context-contracts.md`
- Approvals: `stridelab-ai/orchestration/approvals/G7-product-baseline.md`,
  `G7-workflow-architecture-v2.md`, `G7-domain-model.md`
- Registry: `stridelab-ai/registry/artifacts.yaml`
