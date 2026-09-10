# Independent cross-department review — Step 2 (feature prioritization + MVP release scope)

**Reviewer identity:** Independent cross-department reviewer (subagent), 2026-09-10 — did not author the artifacts.
**Disposition (first pass):** `FAIL` — three decision-surface integrity defects (no scope or safety defect).
**Disposition (after orchestrator remediation, 2026-09-10):** expected `PASS_WITH_CONDITIONS` — a cross-department re-review is queued (`§13.11`).

## Scope

Adversarial synthesis: count / coverage integrity, cross-artifact consistency of the decision surface, journey / invariant coverage, the increment graph, `OQ`/`CD` honesty, validator enforcement, and whether any approved upstream artifact is altered.

## Authoritative inputs

`product-baseline.md`; `workflow-architecture.md` + `WORKFLOW-ARCHITECTURE-v2.md` §5 / §9.1 / §9.2 + the `*/WORKFLOWS.md` tree; `domain-model.md`; `ORCHESTRATOR.md`, `approval-policy.md`, `phase-gates/gates.yaml`; `REVIEW-CONTRACT.md`.

## Blocking findings (first pass)

- **B1** — `npm run ai:validate` / `validate-step2-artifacts.mjs` **failed (exit 1)**: the `| **C-IND** |` row's bold defeated the `/^\|\s*C-IND\s*\|/` guard, and the substring "closed" (in "is **not closed**") forced `cindOpen = false`, so the script demanded ≥ 8 review files and went red. §11.3 clause 10 / G6 require the validators to pass.
  - **Remediated:** the C-IND guard now tolerates markdown emphasis and parses an **explicit** closure token; the "only remaining step" guard is negation-aware. Validator is green.
- **B2** — the G7 **decision package (§15)** numerically contradicted the artifact bodies and FP's own DR-A5: "36 user-facing + 12 supporting", "the 7 conditional capabilities", and a verbatim approval statement carrying those numbers — while §5 / §6.1 / §7.1 / the validator and FP §9 DR-A5 all say **35 + 11 = 46 / 9**.
  - **Remediated:** §15 rewritten — "MVP inclusions" 35 + 11 = 46; "Conditional capabilities (9)" listing F-10, F-19, F-22, F-33, F-40, F-42, F-34-cond, S-09, S-10; "Decision requests" DR-A1…DR-A5; "Review dispositions" split into the orchestrator advisory pass and the independent specialist pass (with the pending lenses named); the verbatim approval statement now says "35 user-facing + 11 supporting", "9 conditional capabilities", "DR-A5", and "authorises implementation-design only; not a legal or compliance sign-off and does not authorise any production release".
- **B3** — the lifecycle records and the two registry `notes` still carried the pre-reclassification counts ("40-feature master table", "36 user-facing + 12 supporting", "the 7 conditional", "J-1…J-11").
  - **Remediated:** both `current-state/*.md` records, both `artifacts.yaml` notes, and FP §9 DR-A3 now state 42 candidate / 35 + 11 = 46 / 9 conditional / J-1…J-13; the validator's new stale-count guard fails closed on any recurrence.

## Non-blocking findings (first pass)

- **N1** — stale "J-11" journey range at §11.1 G8, §13.4 evidence-inspected, §13.5 D05-N4. → **swept** to J-1…J-13 (the §13.4 "J-5…J-11" evidence range is a real sub-range and left).
- **N2** — "four validators" is now five. → **fixed** in FP §1.1, MRS §13.5, `current-state/feature-prioritization.md`.
- **N3** — INC-3a / INC-3b are not first-class `### INC-` increments, so the validator's `\bINC-\d+\b` matcher skips "INC-3b". → INC-3a / INC-3b are kept as **documented sub-phases of INC-3** (all of F-14…F-18 are in INC-3's `Included` line); the INC-10 dependency is re-worded to "INC-3 (INC-3b's reconciled record)"; the INC-3a-not-exposed-until-INC-3b gate is now checked by name by the validator's load-bearing-gate presence check.
- **N4** — the validator did not check §15 numbers, the current-state / registry prose, or the load-bearing safety gates. → **extended:** §15-numbers check, stale-count guard across FP / MRS / both lifecycle records / registry, INC-9-before-media/messaging + INC-3a/3b gate presence checks, S-12-is-a-G5-gate check.
- **N5** — §15 called G7 "the remaining governance step" while §13.11 says C-IND closes only when all 8 lenses are recorded. → §15 reworded to "near-final, pending the last independent reviews and any remediation they trigger"; the validator's negation-aware honesty guard confirms no artifact asserts G7 is the sole remaining step while C-IND is open.
- **N6** — concurrent edits during review. → all remediation lands in one commit on which the validator is green; this evidence file is pinned to that commit.

## Positive confirmations (unchanged by remediation)

Master table F-01…F-42 contiguous, no dup / gap, matches "42 candidate features". §5 / §6.1 bodies, the §7.1 matrix, and the validator all agree at 35 / 11 / 46 / 9. Every MVP-required user-facing feature (35) is in ≥ 1 journey; **F-04 → J-12 and #9 → J-13 are genuine end-to-end**; #11 "by construction" is defensible (no navigation / IA / screen section in either file). No journey depends on a Post-MVP / Excluded capability; F-22 and the F-28 group-channel slice appear only blocked. The increment graph INC-0…INC-11 is acyclic, every dependency resolves, every MVP-required F/S is assigned. All `OQ-*` / `CD-*` tokens resolve to §9.2 / the workflow tree; none is asserted resolved / approved / closed. The INC-9-complete-with-D04-G3 gate before any external media / messaging exposure and the INC-3a-before-INC-3b gate are stated in the increment conditions, §10.1, §11.1 G3 / G6 and §11.3 clause 3. **Product-scope approval is not conflated with legal / launch approval** (§11.4 + §15). **No approved upstream artifact is modified** — the worktree diff is limited to the two Step-2 docs, both current-state records + the index, `stridelab-ai/registry/artifacts.yaml`, `package.json` (the 5th validator), and the new `stridelab-ai/scripts/validate-step2-artifacts.mjs` + `stridelab-ai/orchestration/reviews/step2-dept01/`.

## Conditions

| Condition | Owner | Stage | Safe default | Consequence if unmet |
|---|---|---|---|---|
| C-IND — record the D06 + architecture independent reviews; re-run the D02 / D05 / cross-department lenses on the remediated commit | root orchestrator | before C-IND closes | §13.1–§13.9 orchestrator lenses stand in | G7 on dispositions no independent reviewer confirmed |
| Keep the §15 numbers, current-state prose, and registry notes in lock-step with the master table (validator enforces) | D01 / project-memory-manager | ongoing | validator fails closed | decision surface drifts from canon |

## APPENDIX — exact counts (independently recounted)

Candidate features **42** (F-01…F-42, contiguous, 0 dup, 0 gap) · supporting capabilities **13** (S-01…S-13) · MVP-required user-facing **35** · MVP-required supporting **11** (S-01–08, 11, 12, 13) · MVP-required total **46** · MVP conditional **9** (F-10, F-19, F-22, F-33, F-34-cond, F-40, F-42, S-09, S-10) · Post-MVP **F-41 + F-P-1…F-P-16** (validator counts the one master-table row F-41 = 1) · Excluded **10** (F-EX-1…F-EX-10) · journeys **13** (J-1…J-13) · invariants covered **16/16** (#11 by construction) · increments **12** (INC-0…INC-11; INC-3a / INC-3b are sub-phases).
