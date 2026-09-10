# Independent D06 specialist review — Step 2 (feature prioritization + MVP release scope)

**Reviewer identity:** Independent D06 specialist reviewer (subagent), 2026-09-10 — did not author the artifacts.
**Disposition:** `PASS_WITH_CONDITIONS`. No blocking findings.

## Scope

Structural preservation of "payment ≠ authorization" (invariant #9 / baseline §6A) now that the load-bearing v1 rule sits in **S-02**, not F-42; unambiguity that no BE-02/03/04/06 workflow and no billing implementation ship in v1; soundness of deferring F-42 vs shipping zero commercial concept; D06 ownership of `OQ-BE-TIER-STRUCTURE` / `OQ-BE-BILLING-OWNER`; fairness of J-13; framing of DR-A5.

## Authoritative inputs

`product-baseline.md` §6A / §6B; `WORKFLOW-ARCHITECTURE-v2.md` §9.2 `OQ-BE-*` rows, §8b; `cross-context-contracts.md` contract 6 / C-5; `billing-entitlements/WORKFLOWS.md`; `REVIEW-CONTRACT.md`.

## Verified

- **Payment ≠ authorization is preserved structurally and arguably strengthened:** the negative rule is in S-02 (MVP-required, INC-0), covers all five paths incl. `performance` (§9.1), and F-40 is read only by the deferred F-42, never by an authorization path.
- **Unambiguous that no BE-02/03/04/06 and no billing implementation ship:** INC-11 acceptance, §6.2, §11.3, §13.6. F-40 is a Free-default data field that gates nothing and needs no D06 entitlement artifact — correctly stated.
- **Deferring F-42 is sound.** Its only consumer (F-40 gating) is itself conditional; its one v1 obligation is fully carried by S-02; building an all-enabled no-op projection + a flag type with no consumer would be exactly the dead entitlement scaffolding invariant #9 exists to exclude. The circular-necessity basis for the first draft's "required" is correctly rejected (§2.1).
- **`OQ-BE-TIER-STRUCTURE` and `OQ-BE-BILLING-OWNER` are clearly D06-owned and unresolved** (WA2 §9.2; MRS §14; §13.6 / §13.10 D06-N2; §3 role table).
- **J-13 is a fair v1 test of invariant #9** (runtime tier-flip invariance + "no flag type exists" + the S-02 build-time rule; the §7.1 matrix over-credit was corrected). It proves v1 state is clean; it is a weak *forward* regression barrier until Condition 1 (the lint anchor) is met — acceptable for MVP since the full contract-6-C-5 discipline attaches at F-42 activation.
- **DR-A5 is correctly framed** as a pre-approval scope adjustment the human confirms or reverts, with the net effect stated (46 / 9; was 48 / 7) and Option A / B recorded.

## Blocking findings

None.

## Non-blocking findings

- **D06-IND-N1** — the S-02 build-time rule is testable in principle, but with no `EntitlementFlag` type in v1 the check reduces to "no such type exists" (green-by-vacuity); neither artifact enumerates the "authorization path" module set or the flag-type namespace the linter keys on. *(Tracked §13.10 → D03 + architecture-reviewer define both at INC-0 G4.)*
- **D06-IND-N2** — upstream contract 6 C-5 names four paths (`identity`/`teams`/`vault`/`profile`); the Step-2 artifacts add `performance` (D04-IND-N3). This **tightens** (consistent with invariant #15), it does not weaken — but the provenance should be explicit: `performance` is a Step-2 hardening of contract 6 C-5, not a claim that contract 6 already lists five. *(Noted in §9.1 and the S-02 §12 row.)*
- **D06-IND-N3** — F-40 risks baking the unratified Mid/Top enumeration (`OQ-BE-TIER-STRUCTURE`) into the v1 schema. *(Tracked §13.10 → the v1 tier-state field persists an **opaque tier value** defaulting to "Free", no 3-value enum migration; D06 → D03 at INC-1 / INC-11 G4.)*
- **D06-IND-N4** — §2 says only "paid billing" generally; D06-N1 in §13.6 claims §2 states "no BE-02/03/04/06" explicitly. Substantive coverage is in INC-11 + §6.2. *(§2 tightened to name the deferred BE workflows.)*
- **D06-IND-N5** — §13.10 C-IND row said D02 / D03 "pending" while §13.11 + §15 treat them recorded. *(§13.10 C-IND row updated to the live per-lens status.)*
- **D06-IND-N6** — process: freeze both artifacts before the decision package is presented final. *(All remediation lands in one commit on which the validator is green.)*

## Conditions

| Condition | Owner | Stage | Safe default | Consequence if unmet |
|---|---|---|---|---|
| Define the authorization-path module inventory + the entitlement-flag-type namespace the S-02 lint asserts against | D03 + architecture-reviewer | INC-0 G4 | structural code review of authz modules; no flag type exists | the J-13 build-time leg is vacuous; no regression barrier as code grows |
| v1 tier-state field stores an opaque tier value (default "Free"), no hard-coded Mid/Top enum migration | D06 → D03 | INC-1 / INC-11 G4 | Free/Mid/Top skeleton used as-is | `OQ-BE-TIER-STRUCTURE` ratification forces a schema change |
| `OQ-BE-TIER-STRUCTURE` / `OQ-BE-TIER-MAP` / `OQ-BE-BILLING-OWNER` remain D06-owned, unresolved; the tier field does not ratify the structure | D06 | §14 / human approval of baseline §6 | skeleton as-is, no gating, Head Coach sole billing owner | the tier field is mistaken for a ratified commercial model |
| Confirm no BE-05 interface / `EntitlementFlag` type in the v1 codebase at INC-11 G-D06 | D06 | INC-11 | none built | latent entitlement scaffolding enters authorization reach |

## Downstream effect

Satisfies the pending D06 row of C-IND (§13.11). Conditions are implementation-design-time obligations (INC-0 / INC-1 / INC-11 G4, G-D06) — none blocks G7 product-scope approval. No `OQ-*` / `CD-*` item resolved. C-IND remains open pending architecture and the re-runs of D02 / D05 / cross-department on the remediated commit.
