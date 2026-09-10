# Current State — StrideLab MVP Release Scope

**Status: `AWAITING_HUMAN_APPROVAL`** — Department 01 Step 2, Phase B. Authored 2026-09-10
by Department 01 Product & Experience (`product-strategist`, skills `product-strategy` +
`user-research-usability`) under
`stridelab-ai/departments/01-product-experience/commands/strategy/scope-release.md`,
orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md`.

Canonical artifact: `docs/product/mvp-release-scope.md` (one canonical location).
Registry entry: `stridelab-ai/registry/artifacts.yaml` → `mvp-release-scope`
(`status: AWAITING_HUMAN_APPROVAL`). Header, registry, and this record agree.

## What this artifact is

One governed MVP release scope + an ordered implementation sequence, translating the
Phase A prioritization (`docs/product/feature-prioritization.md`) into a definition of what
the first StrideLab release delivers. It is a **proposal**, not an approved decision. It
resolves, converts, or creates **no** `OQ-*` / `CD-*` item; changes **no** invariant;
designs **no** navigation, schema, API, or UI.

Contents: the MVP objective; target users + supported roles (Head Coach, Event Coach,
Athlete; Platform Safety Administrator as a platform actor); supported devices/platforms
(iOS/iPadOS; web client out of scope); the included / conditional / deferred / excluded
capability sets (referencing Phase A feature IDs); 11 end-to-end release journeys
(J-1…J-11) that collectively exercise all 16 invariants + baseline §6A; the required
aggregates (A1–A35), bounded contexts, and the 14 cross-context contract seams; the
authorization / tenant-isolation / privacy / youth-safety / media / Vault / offline /
accessibility / data-lifecycle requirements; the required infrastructure and the one
independently-deployable workload (`services/media-worker`); a per-capability
definition-of-done acceptance table (§12); an ordered implementation sequence
**INC-0…INC-11** (dependency-ordered, not effort-ordered), each with feature IDs, upstream
dependencies, owning Department, collaborators, gates, acceptance evidence, and
next-increment-blocking conditions; the gate entry/exit criteria + the definition of MVP
completion; the full cross-department review (§13); the open-questions register (§14); and
the G7 decision package (§15).

## Ownership, dependencies, downstream consumers

- **Owner:** Department 01 Product & Experience (`product-strategist`). **Department
  lead:** `product-experience-lead`.
- **Upstream (approved):** `product-baseline`, `workflow-architecture` v2, `domain-model`
  (all APPROVED), `architecture-decision`. **Upstream (proposed):** `feature-prioritization`
  (`AWAITING_HUMAN_APPROVAL`).
- **Downstream consumers:** Departments 02, 03, 04, 05, 06; `architecture-reviewer`;
  `cross-department-reviewer`; every implementation work package for a v1 bounded context
  (each increment INC-0…INC-11 is a handoff boundary per
  `stridelab-ai/shared/contracts/HANDOFF-CONTRACT.md`).

## Work completed (2026-09-10)

- Consumed the Phase A artifact after its Department 01 review (PASS WITH CONDITIONS).
- Authored `docs/product/mvp-release-scope.md`.
- Routed both artifacts through the required cross-department review per
  `stridelab-ai/shared/contracts/REVIEW-CONTRACT.md` — eight review lenses: Department 01
  (product coherence / workflow coverage / domain-model alignment / usability / scope
  integrity), Department 02 (client feasibility + sequencing), Department 03 (backend /
  persistence / sync / media / contract feasibility), Department 04 (authn / authz /
  tenant isolation / privacy / youth safety / UGC / Vault / retention / deletion /
  export), Department 05 (testability / CI / environments / observability / release
  readiness / acceptance gates), Department 06 (entitlement + operational implications;
  billing ≠ authorization), the root `architecture-reviewer` (boundaries / dependency
  direction / deployable-service implications), and the `cross-department-reviewer`
  (contradictions / missing dependencies / hidden assumptions / incomplete journeys).
- **Three BLOCKING findings raised and remediated in-artifact, affected reviews re-run and
  closed:**
  - **D04-B1** — the safety & governance spine (F-29/F-38/F-39) was sequenced after media
    (INC-5) and communication (INC-8) with no hard exposure gate. Remediation: a **hard
    release gate** — *INC-9 complete + D04 G3 sign-off before any external user exposure of
    INC-5…INC-8* — added to §10, §10.1, §11.1, §11.3.
  - **D04-B2** — S-08 (preservation-hold fail-safe) was not required before F-01
    self-service deletion shipped. Remediation: **S-08 moved into INC-0**; INC-1 F-01/F-07
    acceptance evidence + §12 F-01 now require the fail-safe from INC-1.
  - **CDR-B1** — the "Definition of MVP completion" omitted the production-launch legal
    sign-offs. Remediation: §11.2 ("Production-launch legal sign-offs" — `OQ-IT01-AGE-VERIFY`,
    `OQ-PS07-JURISDICTION`, `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`) + §11.3 clause 7 +
    §15 conditions added.
  - Non-blocking finding **D02-N1** was also raised to a structural fix: INC-3 split into
    **INC-3a** (execution + logging + finalization) and **INC-3b** (reconciliation +
    correction), with INC-3a not externally exposed until INC-3b passes.
- **Open BLOCKING findings after remediation: zero.** Every non-blocking condition has a
  named owner (§13.10).

## Reviews and gate posture (advisory — not human approval)

| Review lens | Disposition |
|---|---|
| Department 01 — product coherence / workflow coverage / domain-model alignment / usability / scope integrity | `PASS_WITH_CONDITIONS` |
| Department 02 — client feasibility + implementation sequencing | `PASS_WITH_CONDITIONS` (INC-3 split applied) |
| Department 03 — backend / persistence / sync / media-processing / contract feasibility | `PASS_WITH_CONDITIONS` (accepted D03 safe defaults stated explicitly) |
| Department 04 — authn / authz / tenant isolation / privacy / youth safety / UGC / Vault / retention / deletion / export | `PASS_WITH_CONDITIONS` (after D04-B1 + D04-B2 remediation; no hard boundary violated) |
| Department 05 — testability / CI / environments / observability / release readiness / acceptance gates | `PASS_WITH_CONDITIONS` |
| Department 06 — entitlement + operational implications (billing ≠ authorization) | `PASS_WITH_CONDITIONS` (`payment ≠ authorization` preserved structurally) |
| Root architecture reviewer — boundaries / dependency direction / deployable-service implications | `PASS_WITH_CONDITIONS` (no boundary change; `services/media-worker` the only new workload) |
| Cross-department reviewer — contradictions / missing dependencies / hidden assumptions / incomplete journeys | `PASS_WITH_CONDITIONS` (after CDR-B1 remediation) |
| **G7 — Human Approval** | **PENDING** — decision package `docs/product/mvp-release-scope.md` §15 |

## Decisions requiring human approval

The single G7 decision package (`docs/product/mvp-release-scope.md` §15) covers both
Step-2 artifacts: the 36 user-facing + 12 supporting MVP-required capabilities; the 7
conditional capabilities + activation conditions; the Post-MVP deferrals; the
F-EX-1…F-EX-10 exclusions; the C1→C5 method; and the INC-0…INC-11 implementation sequence
including the hard INC-9-before-media/messaging-exposure gate and the INC-3a/INC-3b
ordering. The exact requested approval statement is quoted verbatim in §15.

## Blockers / accepted conditions

- **Human decision pending:** G7 (the only unresolved step). Zero open BLOCKING findings.
- **Non-blocking conditions (each with a named owner — `docs/product/mvp-release-scope.md`
  §13.10):** C-IND (independent specialist review per Department before G7); D01-N1/N2;
  D02-N2/N3; D03-N3/N4; D04-N1 (`OQ-PS-MOD-STAFFING`) / D04-N2 (F-22 + F-28 joint
  activation); D05-N3; D06-N2; ARCH-N2.
- **Production-launch legal sign-offs** (`OQ-IT01-AGE-VERIFY`, `OQ-PS07-JURISDICTION`,
  `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`) and `OQ-PS-MOD-STAFFING` remain named
  conditions on G6/G7 for the eventual production launch — safe defaults in force meanwhile.
- **No `§9.2` item is resolved, converted, or created.** The complete OPEN register is
  `WORKFLOW-ARCHITECTURE-v2.md` §9.2 with every safe default in force
  (`docs/product/mvp-release-scope.md` §14).

## Source artifact references

- Canonical: `docs/product/mvp-release-scope.md`
- Upstream (Phase A): `docs/product/feature-prioritization.md`
- Approved upstream: `docs/product/product-baseline.md`,
  `docs/product/workflow-architecture.md`,
  `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md`,
  `docs/product/domain-model.md`, `ARCHITECTURE.md`
- Application map: `stridelab-ai/application-map/bounded-contexts.md`,
  `stridelab-ai/application-map/cross-context-contracts.md`
- Governance: `stridelab-ai/orchestration/ORCHESTRATOR.md`,
  `stridelab-ai/orchestration/phase-gates/gates.yaml`,
  `stridelab-ai/orchestration/approvals/` (`approval-policy.md`, `approval-matrix.yaml`),
  `stridelab-ai/shared/contracts/REVIEW-CONTRACT.md`
- Registry: `stridelab-ai/registry/artifacts.yaml`
