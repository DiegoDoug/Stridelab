# Independent D01 specialist review — Step 2 (feature prioritization + MVP release scope)

**Reviewer identity:** Independent D01 specialist reviewer (subagent), 2026-09-10 — did not author the artifacts.
**Disposition:** `PASS_WITH_CONDITIONS`.

## Scope

Product coherence; user outcomes; honesty of method (no user research / market data / engineering estimates exist); scope integrity; workflow coverage; classification honesty — circular-necessity test on F-10, F-26/F-27, F-30, F-31/F-32, F-34, F-39, F-42; reality of the MVP-conditional activation conditions; no silent `OQ-*`/`CD-*` resolution; no invariant contradiction; §7 journey end-to-end completeness for Head Coach / Event Coach / Athlete.

## Authoritative inputs

`docs/product/product-baseline.md` §1–§8; `WORKFLOW-ARCHITECTURE-v2.md` §5 (invariants #1–#16), §9.1, §9.2; `docs/product/domain-model.md`; `REVIEW-CONTRACT.md`.

## Evidence inspected

`feature-prioritization.md` master table (all F-01…F-42), per-feature records, §5 summary, §6.1 review, §7 findings; `mvp-release-scope.md` §2 objective, §3 roles, §5/§6 scope index + exclusions, §7 J-1…J-13 + §7.1 coverage matrix, §10 INC-0…INC-11, §11.3 completion, §12 acceptance table, §13 reviews, §14 OQ register; `product-baseline.md` §1, §2–§7; `WORKFLOW-ARCHITECTURE-v2.md` §5, §9.1–§9.2.

## Verified

- Master table F-01…F-42 contiguous = 42, matches "42 candidate features". §5 tallies internally consistent and consistent with the release scope §5.
- Every MVP-required user-facing feature appears in ≥ 1 journey; all 16 invariants + §6A mapped; #9 genuinely exercised end-to-end by J-13; F-04 genuinely exercised by J-12.
- Journeys are genuinely end-to-end for all three primary roles (Head Coach J-1/2/11 +; Event Coach J-2/6/7 with the scope boundary tested in J-6; Athlete J-3/4/5/6/7/10).
- No `OQ-*`/`CD-*` silently resolved (spot-checked `OQ-IT04-JOIN-MECHANISM`, `OQ-PW-COACH-VISIBILITY`, `OQ-BE-TIER-STRUCTURE`, `OQ-SE-RECONCILE-UX`, `CD-EC-DELEGATION` — all retain owner + safe default).
- No invariant contradicted (#4/#5 vs F-15; #7/#8 vs F-21/F-23; #13 vs S-03; #9 vs J-13).
- All 7 (now 9) MVP-conditional activation conditions carry owner + safe default + consequence.

## Blocking findings

None.

## Non-blocking findings

- **N-1 (F-10 templates).** "MVP required" rested on "a coach authoring every session from scratch is a credible adoption risk" — an invented user/market claim, which the artifact's own §2.1 prohibits. F-10 is not on the approved core loop (F-09 delivers "plan training" end to end) and no invariant requires it. → reclassify to `MVP conditional` (increment budget) or `Post-MVP`.
- **N-2 (F-42 entitlement interface).** Classified MVP-required although no billing/entitlements ship in v1; its v1 output is a no-op all-enabled projection; its sole upstream is the MVP-*conditional* F-40; its only load-bearing v1 clause (no authz path references a billing-flag type) is already carried by S-02. The "cheap now, expensive to retrofit" justification is an engineering-cost claim §2.1/C5 disclaim. → reclassify to `MVP conditional` (activate with F-40 gating); keep only the S-02 rule in INC-0.
- **N-3.** The §7.1 coverage matrix over-credited J-13 with F-08/F-23/F-31 whose behaviour J-13 does not exercise; underlying coverage is intact via J-1/J-5/J-6. → align the matrix cells to the journeys.
- **N-4.** Soft C2 over-claims: F-32 own-data reports ("borderline" in its own record); F-06's justification leans partly on the conditional F-19; F-30's invariant load is actually carried by S-04; "#11 proven by J-2" is a category error — a no-navigation constraint is upheld by construction, not journey-proven.

## Conditions

| Condition | Owner | Stage | Safe default | Consequence if unmet |
|---|---|---|---|---|
| Reclassify F-10 to `MVP conditional` (increment budget; else Post-MVP), or re-justify without adoption-risk evidence | D01 `product-strategist` | at G7; revisit INC-2 G4 | F-09 ships without templates; F-11 duplication covers reuse | scope lock includes a "required" feature justified by §2.1-prohibited evidence |
| Reclassify F-42 to `MVP conditional` (activate with F-40 gating / a D06 entitlement artifact); keep only the S-02 build-time rule in INC-0 | D01 + architecture-reviewer + D06 | at G7 | S-02 enforces "no authz path references a commercial/entitlement flag type"; the BE-05 interface is built when entitlements exist | the MVP-required set contains a no-op capability gated on a conditional feature |
| Align J-13 "Features exercised" cell with the §7.1 matrix claims | D01 | pre-G7 doc fix | underlying coverage holds via J-1/J-5/J-6 | §7.1 over-states J-13 coverage |
| C-IND — independent per-department confirmation before G7 (this file discharges the D01 lens) | root orchestrator + Department leads | pre-G7 | — | dispositions unconfirmed by an independent reviewer |

## Downstream effect

Both artifacts remain sound governed input to the G7 decision package. If F-10 and/or F-42 are reclassified, update the §5 counts, the release-scope §5 scope index, the INC-2 / INC-0 / INC-11 scope notes, and §11.3. No re-architecture, no invariant or `OQ-*`/`CD-*` impact.

## Orchestrator disposition of this review (2026-09-10)

All four conditions **accepted and applied** to the artifacts: F-10 → `MVP conditional` (feature-prioritization.md §3/§4/§5; mvp-release-scope.md §5/§6.1/§10 INC-2); F-42 → `MVP conditional` with the load-bearing rule absorbed into **S-02** (feature-prioritization.md §3.1 S-02 / §4 F-42; mvp-release-scope.md §5/§6.1/§8.3 contract 6/§9.1/§10 INC-0+INC-11/§12 S-02); §7.1 matrix aligned to the journeys; #11 reframed as "upheld by construction" in J-2 and §7.1. Recorded as **DR-A5** in the decision package. Counts move to 35 user-facing + 11 supporting = 46 MVP-required; 9 MVP-conditional.
