# Independent D05 specialist review — Step 2 (feature prioritization + MVP release scope)

**Reviewer identity:** Independent D05 specialist reviewer (subagent), 2026-09-10 — did not author the artifacts.
**Disposition (first pass):** `FAIL` — one blocking finding in the validator's C-IND guard.
**Disposition (after orchestrator remediation, 2026-09-10):** expected `PASS_WITH_CONDITIONS` — a D05 re-review is queued (`§13.11`).

## Scope

Verifiability of every included capability; G1–G8 entry/exit completeness + non-circularity; testability of the MVP-completion definition (§11.3) and its exclusion of production-launch authorization (§11.4); CI coverage — does `validate-step2-artifacts.mjs` fail-closed on count / journey / invariant / increment / cycle / status / C-IND regressions and is it wired into `npm run ai:validate` + CI; is any check fragile (sentence search rather than an ID-relationship proof); is the S-12 accessibility gate real; offline-critical reliability criteria at G5; safety-path observability; any "only remaining step" claim while C-IND is partial.

## Authoritative inputs

`stridelab-ai/orchestration/phase-gates/gates.yaml` + `gate-execution.md`; `orchestration/workflows/feature-delivery.md`, `release-flow.md`; `REVIEW-CONTRACT.md`.

## Evidence inspected

`package.json` (`ai:validate` chain ends with `validate-step2-artifacts.mjs`); `.github/workflows/workflow-architecture-validation.yml` (PR + push, paths cover `docs/product/**` and `stridelab-ai/scripts/**`; a required status check) — **CI coverage is real and fail-closed on exit 1**; `validate-step2-artifacts.mjs` end to end (feature count/contiguity, missing-journey, journey→Post-MVP/Excluded, increment coverage, dependency-cycle DFS, status agreement, C-IND guard, invariant coverage, OQ/CD "resolved" scan); `mvp-release-scope.md` §7/§7.1, §10, §11, §12, §13/§13.11; `feature-prioritization.md` §4 pattern + S-13.

## Blocking findings

- **D05-IND-B1** — the C-IND / "only remaining step" honesty guard in `validate-step2-artifacts.mjs` was **negation-blind and partially dead**: `cindOpen` was decided by testing the C-IND row for the substring `/(closed|discharged|complete|✓)/i`, and the row reads "C-IND is **not closed**…", forcing `cindOpen = false` — the script treated C-IND as *closed* and then failed with an inverted message and a green build that depended only on a coincidental file count; the companion "only remaining step" guard was unreachable while the row is worded that way.
  - **Orchestrator remediation (2026-09-10):** the guard now (a) tolerates markdown emphasis in the row id (`| **C-IND** |`); (b) computes `cindClosed` from an **explicit closure token** (`Status: closed` / `**closed**` / `✓ closed` / `C-IND is closed|discharged|complete`) — never from the bare substring; (c) the "only remaining step" honesty guard is **negation-aware** (ignores a match inside a clause containing `not` / `pending` / `partial` / `near-final` / `until` / `when`); (d) two new checks assert the load-bearing gates are present (INC-9-before-external-media/messaging; INC-3a-not-exposed-until-INC-3b); (e) a stale-count guard flags `36 user-facing` / `= 48` / `the 7 conditional` / `40-feature` / `J-1…J-11` anywhere in FP, MRS, both lifecycle records, or the registry; (f) §15 decision-package numbers must equal the computed 35 / 11 / 46 / 9; (g) S-12 must be named as a per-increment G5 exit gate in §11.1 + the §10 shared fields. → **remediated; D05 re-review pending.**

## Non-blocking findings

- **D05-IND-N1** — G5 exit for F-14…F-18 says "meet the D05 on-device reliability bar (D05-N3)", but D05-N3 defines no bar. *(Tracked §13.10 — D05 to define a concrete floor: crash-free reconcile rate, no-loss-under-kill-during-sync, N-device convergence, before INC-3a G5.)*
- **D05-IND-N2** — the §12 shared clause asserts every row is exercised by an empty/insufficient-data state, but several rows (F-03/F-08/F-25/F-26/F-27/F-28) specify none. *(Tracked §13.10 — D01 doc-polish pass: each §12 row names its empty case or marks it N/A.)*
- **D05-IND-N3** — invariant #11 coverage is satisfied by a §7.1 sentence ("by construction"), not a journey Invariants-proven cell; the OQ/CD "resolved" scan is a per-line phrase match. *(Accepted: #11 is a meta/process invariant, not journey-exercisable; the other 15 are cross-checked against journey cells. The OQ/CD scan is a guard, not the primary proof.)*
- **D05-IND-N4** — the S-12 per-increment gate was prose-only. *(Remediated: the validator now asserts it — §11.1 G5 + §10 shared fields; `ux-research-accessibility-reviewer` added to INC-1/2/3/4/5/6/8/9/10; §13.11 row updated.)*
- **D05-IND-N5** — INC-9 acceptance has no observability/alerting assertion for the durable escalation queue / S-04 terminal-failure path. *(Tracked §13.10 — D05+D04 add it at INC-9 G5.)*
- **D05-IND-N6** — "G7" labels two distinct human decisions (§11.4 rows A vs D); `gates.yaml` bundles them. *(§11.4 already disambiguates; approval records should cite "G7 (product-scope)" vs "G7 (release)".)*

## Conditions

| Condition | Owner | Stage | Safe default | Consequence if unmet |
|---|---|---|---|---|
| Rewrite the C-IND guard to a parsed status token + non-stub file check; make the "only remaining step" guard negation-aware | D05 + orchestrator | pre-G7 (applied) | build red / dishonest claim passes | a release-gate control is misrepresented to the approver |
| Define a concrete on-device reliability floor for the offline-critical paths | D05 | before INC-3a G5 | functional tests only | offline-critical paths ship unmeasured |
| Each §12 row names its empty/insufficient-data case or marks it N/A | D01 | pre-G7 doc polish | shared clause only | untestable rows |
| INC-9 G5 adds escalation-queue + safety-notification observability/alerting acceptance | D05 + D04 | INC-9 G5 | S-13 general observability | silent safety-pipeline failure |

## Downstream effect

CI coverage is real and the validator now fail-closes on the semantic classes the task requires (count, journey/invariant coverage, increment assignment + acyclicity, status agreement, decision-surface consistency, load-bearing safety gates, S-12). The FAIL was driven solely by D05-IND-B1 in the guard logic, now remediated. §13.11 row 05 becomes `FAIL → remediated; re-review pending`. The §13.11 enforcement claim and §15 "blocking findings: zero open" are honest only after the D05 (and D02) re-reviews confirm.
