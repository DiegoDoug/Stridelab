# Independent re-verification — remediation of the three BLOCKING findings

**Reviewer identity:** Independent re-review (subagent), 2026-09-10 — did not author the artifacts or the remediations. Reviewed HEAD `3b03e06`.
**Result:** all three previously-BLOCKING findings **CLOSED** (structural, not cosmetic). `validate-step2-artifacts.mjs` and `npm run ai:validate` both **green (exit 0)**.

## Findings re-checked

### D02-IND-B1 — S-12 accessibility per-increment verification — **CLOSED**

- MRS §10 shared-fields paragraph makes S-12 a **per-increment G5 exit gate** for INC-1…INC-10, verified by `ux-research-accessibility-reviewer`; INC-0 authors the checklist.
- §11.1 **G5 exit row** names "accessibility — the §12 S-12 checklist passes for every interactive surface … verified by `ux-research-accessibility-reviewer` (not deferred to §11.3)".
- INC-0 acceptance evidence has an explicit S-12 item (checklist authored, dry-run, wired into the G5 harness).
- `ux-research-accessibility-reviewer` is in the Required-collaborators of INC-1, 2, 3, 4, 5, 6, 8, 9, 10 (INC-7 pre-existing) — all confirmed.
- `validate-step2-artifacts.mjs` enforces (a) the shared §10 section must contain the reviewer string AND "per-increment G5" and (b) the "G5 Quality" line must match `/accessib/`; both run unconditionally and pass only because the conditions are met.

### D05-IND-B1 — the validator's C-IND / honesty guard — **CLOSED**

- The C-IND row detector tolerates markdown emphasis (`| **C-IND** |`).
- `cindClosed` requires an **explicit closure token** ("status: closed" / "\*\*closed\*\*" / "✓ closed" / "C-IND is/now closed|discharged|complete") — the bare substring "closed" inside "not closed" no longer forces `cindOpen = false`. The row says "Status: partial" → `cindOpen = true` and the honesty guard is reachable.
- The "only remaining step" honesty guard is **negation-aware** (scans the 80 chars before the match for `not` / `never` / `pending` / `partial` / `near-final` / `until` / …); §15's "does not claim G7 is the sole remaining step" is correctly **not** flagged.
- New checks all present and exercised: the stale-count guard (`36 user-facing` / `= 48` / `the 7 conditional capabilities` / `40-feature master table` / `40 candidate features` / `J-1…J-11`) across FP / MRS / both current-state records / registry; the §15-numbers check (`35 user-facing` / `11 supporting` / `= 46` / `9 conditional`); the load-bearing-gate presence checks (INC-9-before-media/messaging; INC-3a-not-until-INC-3b); the S-12-as-G5-gate check; the "current-state + registry carry `42-feature` + `35 user-facing`" check.
- `node stridelab-ai/scripts/validate-step2-artifacts.mjs` → `status: PASS`, exit 0. `npm run ai:validate` → all 5 validators PASS, exit 0 (4 pre-existing non-fatal warnings about optional `DEC-*.md` files, unrelated to Step 2).

### CDR-B1 / B2 / B3 — decision-surface integrity — **CLOSED**

- **B1** (validator red) — green now.
- **B2** (§15 stated 36 + 12 / "the 7 conditional" incl. in the verbatim approval statement) — §15 now states "35 user-facing + 11 supporting = 46", "Conditional capabilities (9)", DR-A1…DR-A5, the pending-reviews status; the verbatim approval statement carries the corrected numbers plus "authorises implementation-design only; it is not a legal or compliance sign-off and does not authorise any production release".
- **B3** (lifecycle records + registry notes carried the pre-reclassification counts) — both `current-state/*.md` records and both `artifacts.yaml` `notes` blocks now state 42-feature / 35 user-facing / 46 / 9 (and J-1…J-13 in the MRS record + note); no "40" / "36 + 12" / "seven" / "J-1…J-11" survives in FP, MRS, either current-state record, or the registry.

## Independent recount (from the FP §3 master table)

42 `F-NN` rows, contiguous F-01…F-42, no dup / gap. **35 user-facing + 11 supporting = 46 MVP-required; 9 MVP-conditional (F-10, F-19, F-22, F-33, F-34-cond, F-40, F-42, S-09, S-10); 10 excluded (F-EX-1…F-EX-10); 13 journeys (J-1…J-13); 12 increments (INC-0…INC-11; INC-3a/INC-3b are sub-phases).** All match the artifact bodies, the §5 summary, the §15 decision package, and the validator's computed counts.

## Upstream-artifact check — CLEAN

`5db47f1..3b03e06` touches only: the two Step-2 docs, `package.json`, `stridelab-ai/orchestration/reviews/step2-dept01/*`, the two current-state records, `stridelab-ai/project-memory/current-state/README.md` (one index row), `stridelab-ai/registry/artifacts.yaml`, and the new `stridelab-ai/scripts/validate-step2-artifacts.mjs`. **No** approved upstream artifact (product-baseline / workflow-architecture / domain-model / WORKFLOW-ARCHITECTURE-v2 / application-map / ARCHITECTURE.md / bounded-context-owners / gates.yaml / routing-table / approval-matrix) is modified.

## New blocking findings

**None.** Two non-blocking residuals at `3b03e06`, both fixed in the follow-up commit: (1) §15's C-IND line listed "D05, D06 … pending" while §13.10 / §13.11 record D05 `FAIL → remediated` and D06 `PASS_WITH_CONDITIONS` — internal inconsistency only (C-IND was declared open everywhere, so no false closure); (2) FP §9 DR-A3's parenthetical listed only the seven original activation conditions (F-10, F-42 omitted) — cosmetic.

## Conclusion

All three previously-BLOCKING findings are genuinely remediated. `validate-step2-artifacts.mjs` and `npm run ai:validate` are green. This re-verification, together with the eight lens files (`01`…`08`), completes the independent specialist review pass; **C-IND may be closed** on the follow-up commit that also fixes the two non-blocking residuals above.
