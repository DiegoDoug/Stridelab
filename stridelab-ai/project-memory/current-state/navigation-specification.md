# Current State — StrideLab Navigation Specification

**Status: `AWAITING_HUMAN_APPROVAL`** — Department 01 Step 4. Authored 2026-09-11 by
Department 01 Product & Experience (`ux-architect`, skills `workflow-architecture` +
`information-architecture` + `interaction-design`) under
`stridelab-ai/departments/01-product-experience/commands/ux/design-navigation.md`,
orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md`.

Canonical artifact: `docs/product/navigation-specification.md` (one canonical location).
Registry entry: `stridelab-ai/registry/artifacts.yaml` → `navigation-specification`
(`status: AWAITING_HUMAN_APPROVAL`). Header, registry, and this record agree.

## What this artifact is

The navigation shell, chrome, state model, and platform structure built around the
**reviewed, Step-3-gated** `docs/product/information-architecture.md` — required and
version-pinned as this artifact's upstream input. It is a **proposal**, not an approved
decision. It resolves, converts, or creates **no** `OQ-*` / `CD-*` item, changes **no**
product invariant, and designs **no** visual styling or production code.

Contents: ten navigation principles (§2); per-role navigation models for Head Coach, Event
Coach, Athlete, and the multi-Team user (§3); a per-platform model — iPad three-column
split view, iPhone 5-tab bar with deeper grouping, no web/admin surface — grounded in
current Apple HIG sourcing (§4); a 19-state navigation state model covering session/auth,
discovery, task-flow, and connectivity/data-integrity states (§5); a full
destination-to-navigation mapping for all 28 IA destinations, none dropped (§6); a
creation/start-action model disambiguating six task modes (§7); context/orientation
signaling rules (§8); restricted/administrative navigation placement rules (§9); and a
navigation-validation table reusing J-1…J-13, all **PASS** (§10).

## Ownership, dependencies, downstream consumers

- **Owner:** Department 01 Product & Experience (`ux-architect`). **Department lead:**
  `product-experience-lead`.
- **Upstream (required, version-pinned):** `information-architecture` — same repository
  commit, Step 3 gate passed with zero BLOCKING findings.
- **Upstream (approved):** `feature-prioritization`, `mvp-release-scope`, `domain-model`,
  `product-baseline`, `workflow-architecture` v2, `architecture-decision`.
- **Downstream consumers:** Department 02 (client implementation), Department 05
  (test/acceptance harness), `architecture-reviewer`, every future interaction-design/
  visual-UI/implementation work package. Explicitly **not yet started**: `/design-user-flow`,
  `/design-system`, `/design-surface`, or production implementation.

## Work completed (2026-09-11)

- Authored `docs/product/navigation-specification.md` against the finalized, Step-3-gated
  `information-architecture.md` — no destination/object purpose was redefined; only shell,
  chrome, state, and placement decisions were made.
- Consulted current Apple Human Interface Guidelines (Navigation and search, Tab bars,
  Split views — access date 2026-09-11) for the platform-specific structural decisions
  (§4.1); recorded source URLs.
- Resolved IA-OQ-2 (Search placement: toolbar affordance, not a consumed tab/sidebar slot)
  and confirmed D02-IA-N1 (iPhone tab-budget tension) via the 5-tab-with-deeper-grouping
  model (§4.3).
- Participated in the combined Step 3+4 cross-department review (10 required reviewers,
  17-point anti-pattern checklist) — `stridelab-ai/orchestration/reviews/
  step3-4-cross-department/01-combined-review.md`. Two process findings raised (CDR-N1
  unreachable-capability validator allowlist; CDR-N2 tier-state/authorization adjacency
  proof), both closed by `stridelab-ai/scripts/validate-step3-4-artifacts.mjs`, wired into
  `npm run ai:validate`.

## Reviews and gate posture (advisory — not human approval)

| Reviewer | Disposition |
|---|---|
| Department 01 `product-experience-lead` | `PASS_WITH_CONDITIONS` |
| Department 01 `ux-architect` | `PASS_WITH_CONDITIONS` |
| Department 01 `domain-workflow-architect` | `PASS_WITH_CONDITIONS` |
| Department 01 `ux-research-accessibility-reviewer` | `PASS_WITH_CONDITIONS` |
| Department 02 (iOS/iPadOS client engineer) | `PASS_WITH_CONDITIONS` |
| Department 03 (backend/search/data) | `PASS_WITH_CONDITIONS` |
| Department 04 (authorization/privacy/youth-safety) | `PASS_WITH_CONDITIONS` |
| Department 05 (quality) | `PASS_WITH_CONDITIONS` |
| `architecture-reviewer` | `PASS_WITH_CONDITIONS` |
| Cross-department adversarial reviewer | `PASS_WITH_CONDITIONS` |
| **G7 — Human Approval** | **PENDING** — combined decision package, `navigation-specification.md` §12 (IA + Navigation together, per the task's guidance for tightly coupled artifacts) |

## Blockers / accepted conditions

- **Human decision pending:** the combined G7 product-design-scope decision for IA +
  Navigation. Zero open BLOCKING findings.
- **No `§9.2` item is resolved.** Every conservative safe default remains in force.
- **Conditions carried from Step 3, confirmed structurally resolved or correctly deferred
  here:** D02-IA-N1 (iPhone grouping — resolved, §4.3), IA-OQ-2 (Search placement —
  resolved, §4.1), A11Y-IA-N2 (pointer-free D-28/D-22 operability — carried as a Step 4
  completion gate, §10), IA-OQ-1 / D03-IA-N1 (offline-index-freshness threshold / index
  maintenance technique — correctly remain D03's G4 decision, not re-opened here).

## Source artifact references

- Canonical: `docs/product/navigation-specification.md`
- Upstream (required): `docs/product/information-architecture.md`
- Upstream (approved): `docs/product/feature-prioritization.md`,
  `docs/product/mvp-release-scope.md`, `docs/product/domain-model.md`,
  `docs/product/product-baseline.md`, `docs/product/workflow-architecture.md`
- Review evidence: `stridelab-ai/orchestration/reviews/step3-information-architecture/`,
  `stridelab-ai/orchestration/reviews/step3-4-cross-department/`
- Registry: `stridelab-ai/registry/artifacts.yaml`
