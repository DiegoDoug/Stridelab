# Current State — StrideLab Information Architecture

**Status: `APPROVED`** — G7 granted by Diego on 2026-09-15 (combined Steps 3-4 decision); approved version pinned to commit `ad8c45bddace1d5307f5ef492e563ee2814513fe`; approval record `stridelab-ai/orchestration/approvals/G7-information-architecture-navigation.md`. Department 01 Step 3. Authored 2026-09-11 by
Department 01 Product & Experience (`ux-architect`, skills `workflow-architecture` +
`information-architecture` + `interaction-design`) under
`stridelab-ai/departments/01-product-experience/commands/ux/design-information-architecture.md`,
orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md`.

Canonical artifact: `docs/product/information-architecture.md` (one canonical location).
Registry entry: `stridelab-ai/registry/artifacts.yaml` → `information-architecture`
(`status: APPROVED`). Header, registry, and this record agree.

## What this artifact is

The StrideLab content hierarchy, object inventory, destination map, role-based
discoverability model, cross-linking/return rules, information-level search model, and
platform-continuity rules — derived from the **approved** MVP release scope
(`mvp-release-scope.md`), feature prioritization (`feature-prioritization.md`), and
consolidated domain model (`domain-model.md`). It is a **proposal**, not an approved
decision. It resolves, converts, or creates **no** `OQ-*` / `CD-*` item
(`WORKFLOW-ARCHITECTURE-v2.md` §9.2 remains the complete OPEN register with every safe
default in force), changes **no** product invariant, and designs **no** visual UI,
interaction microstate, or production code.

Contents: a traceability matrix from every MVP-required/-conditional capability to a
destination and object (§1.8); a ~29-record object inventory across identity/Team,
training-time, media/analysis/Vault, communication, and performance/system domains (§2);
eight independently-modelled hierarchies with an explicit context-retention map (§3); a
28-destination map spanning primary/secondary/contextual/modal/administrative types (§4);
a role-based discoverability walkthrough reusing the J-1…J-13 release journeys for
complete, machine-checkable coverage (§5); cross-linking/return/deep-link rules (§6); an
information-level search model (§7); platform-continuity rules grounded in current Apple
HIG sourcing (§8); and a 13-scenario findability validation, 12 PASS / 1 PASS WITH
CONDITIONS (§9).

**Step-3 remediation pass (2026-09-15).** After PR #9 merged the approved Step-2 scope to
`main` (`39f42d5`) and that `main` was merged into this branch by a normal merge commit,
the artifact gained the traceability and state semantics the original Step 3 gate had not
reviewed: increment traceability for `INC-0…INC-11` (§1.9), coverage of all 16
cross-workflow invariants (§1.10), an actor-coverage matrix (§1.11), conditional-capability
treatment for all nine conditionals with none activated (§1.12), the `X-1…X-7`
system-state surfaces for empty/denied/unavailable/offline/queued/conflict/recovery
(§4.5), and thirteen explicit non-goals (§11; the provenance footer moved to §12).
Upstream commit pins were refreshed to cite the Step-2 approved-version pin
`9893c1d4dd0166fd0c55f1950e601e5f8737946c`. The destination count was corrected 27 → 28
here, in the registry, and in the navigation-specification record. Independent review of
the delta across 13 lenses is recorded in
`stridelab-ai/orchestration/reviews/step3-remediation/`: four BLOCKING findings
(RP-B1 duplicate destination ownership, RP-B2 an actor with no primary destination, RP-B3
an unapproved increment assignment for F-22, RP-B4 a validator that failed on a CRLF
checkout) were remediated and independently re-verified against a clean clone of the
pushed commit; four non-blocking findings were closed. **Zero open BLOCKING findings.**
No upstream governed artifact was changed — proven byte-identical against `origin/main`. **This is the first navigation-adjacent artifact StrideLab has ever
produced** — Steps 1–2 explicitly avoided designing navigation (invariant #11); this
artifact is the first to do so, and confirms no prior navigation decision exists anywhere
in the repository to have been silently revived (checked explicitly, `stridelab-ai/
orchestration/reviews/step3-4-cross-department/01-combined-review.md`, check #2).

## Ownership, dependencies, downstream consumers

- **Owner:** Department 01 Product & Experience (`ux-architect`). **Department lead:**
  `product-experience-lead`.
- **Upstream (approved):** `feature-prioritization`, `mvp-release-scope` (both APPROVED,
  Diego 2026-09-10 — joint G7, `stridelab-ai/orchestration/approvals/
  G7-mvp-feature-prioritization-release-scope.md`), `domain-model` (APPROVED, Diego
  2026-09-10, `main`@`5db47f1`), `product-baseline` (APPROVED 2026-09-08),
  `workflow-architecture` v2 (APPROVED 2026-09-07), `architecture-decision`
  (`ARCHITECTURE.md`).
- **Downstream consumers:** `navigation-specification` (Step 4, this same work package —
  consumes this artifact as a required, version-pinned input); Departments 02, 03, 04, 05;
  `architecture-reviewer`; every future interaction-design/visual-UI/implementation work
  package.

## Work completed (2026-09-11)

- Read every authoritative input named in `information-architecture.md` §1.2.
- Confirmed the approved Step 2 artifacts (`feature-prioritization.md`,
  `mvp-release-scope.md`) at commit `9f82202` (Diego's G7 approval commit) as the governed
  boundary — no deferred/excluded capability was pulled in (checked line-by-line, combined
  review check #17).
- Authored `docs/product/information-architecture.md`.
- Ran the Step 3 gate: 7 independent reviewer lenses (`ux-architect` self-check,
  `product-experience-lead`, `domain-workflow-architect`, D04, D02, D03, accessibility) —
  see `stridelab-ai/orchestration/reviews/step3-information-architecture/` (`01`…`07`).
  Five non-blocking findings remediated in-artifact (IA-N1, DWA-N1, DWA-N2/IA-OQ-4,
  D04-IA-N2, A11Y-IA-N1); zero BLOCKING findings.
- Participated in the combined Step 3+4 cross-department review (10 required reviewers,
  17-point anti-pattern checklist) — `stridelab-ai/orchestration/reviews/
  step3-4-cross-department/01-combined-review.md`. Two process findings raised (CDR-N1,
  CDR-N2), both closed by the new `stridelab-ai/scripts/validate-step3-4-artifacts.mjs`
  wired into `npm run ai:validate`.

## Reviews and gate posture (advisory — not human approval)

| Reviewer | Disposition |
|---|---|
| `ux-architect` (self-check) | `PASS_WITH_CONDITIONS` |
| `product-experience-lead` | `PASS_WITH_CONDITIONS` |
| `domain-workflow-architect` | `PASS_WITH_CONDITIONS` |
| Department 04 (authorization/privacy/youth-safety) | `PASS_WITH_CONDITIONS` |
| Department 02 (client feasibility) | `PASS_WITH_CONDITIONS` |
| Department 03 (search/data feasibility) | `PASS_WITH_CONDITIONS` |
| `ux-research-accessibility-reviewer` | `PASS_WITH_CONDITIONS` |
| Combined cross-department review (10 participants) | `PASS_WITH_CONDITIONS` |
| **G7 — Human Approval** | **PENDING** — combined decision package in `navigation-specification.md` §12 (IA + Navigation together) |

## Blockers / accepted conditions

- **Human decision pending:** the combined G7 product-design-scope decision for IA +
  Navigation, per `navigation-specification.md` §12. Zero open BLOCKING findings.
- **No `§9.2` item is resolved.** Every conservative safe default remains in force.
- **New conditions raised and dispositioned in this pass:** IA-OQ-4 (D04-confirmed safe
  default — self-service export/deletion suspended during a PS-07 `restricted_pending_review`
  determination); IA-OQ-1 (D03 offline-index-freshness threshold, G4); IA-OQ-3
  (`user-research-usability` Vault-wording follow-up); D02-IA-N1/N2 and D03-IA-N1 (client/
  data implementation technique, G4) — each with a named owner and stage, none blocking.

## Source artifact references

- Canonical: `docs/product/information-architecture.md`
- Companion (Step 4): `docs/product/navigation-specification.md`
- Upstream: `docs/product/feature-prioritization.md`, `docs/product/mvp-release-scope.md`,
  `docs/product/domain-model.md`, `docs/product/product-baseline.md`,
  `docs/product/workflow-architecture.md`
- Application map: `stridelab-ai/application-map/bounded-contexts.md`,
  `stridelab-ai/application-map/cross-context-contracts.md`
- Review evidence: `stridelab-ai/orchestration/reviews/step3-information-architecture/`,
  `stridelab-ai/orchestration/reviews/step3-4-cross-department/`
- Registry: `stridelab-ai/registry/artifacts.yaml`
