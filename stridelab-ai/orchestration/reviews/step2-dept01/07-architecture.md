# Independent architecture review — Step 2 (feature prioritization + MVP release scope)

**Reviewer identity:** Independent architecture-reviewer (subagent), 2026-09-10 — did not author the artifacts. Reviewed HEAD `3b03e06`.
**Disposition:** `PASS_WITH_CONDITIONS`. No blocking findings.

## Scope

Whether the Step-2 scope changes any bounded-context boundary, reverses any dependency direction, adds an unjustified deployable workload, references aggregates outside A1..A35 or seams outside the 14; soundness of the F-10 / F-42 reclassification to `MVP conditional`; the §4.1 guard carry-through; native-media subsystem status; increment-graph acyclicity; the `performance` 5th-path addition to the contract-6 C-5 rule.

## Authoritative inputs

`ARCHITECTURE.md`; `bounded-contexts.md`; `cross-context-contracts.md` (14 seams); `domain-model.md` §4 / §4.1 / §6 / §8; `WORKFLOW-ARCHITECTURE-v2.md` §8c / §9.2; `REVIEW-CONTRACT.md`.

## Verified

- §8.1 contexts match `bounded-contexts.md` verbatim; every §8.2 aggregate is within A1..A35; every §8.3 seam is within the 14, unchanged (8 fields each).
- `services/media-worker` remains the **sole** independently-deployable workload; native media stays "a subsystem, not a second product architecture" (INC-5); no domain-on-shell dependency introduced.
- The increment graph INC-0…INC-11 is **acyclic** and every dependency names an existing increment.
- The domain-model §4.1 cross-aggregate guards are carried as **hard G4 schema-design inputs** (§8.2, G4 exit criteria).

## Blocking findings

None.

## Non-blocking findings

- **AR-IND-N1** — the `performance` 5th path (§9.1, S-02 §12 row) diverges from the fixed upstream enumeration, which names **four** paths in three authoritative texts (`cross-context-contracts.md` C-5; `domain-model.md` §4.1, §6, §8). It is **tightening-only** and consistent with invariant #15 (`domain-model.md` §6 already lists `performance` among the scope-gated surfaces), and the artifact is transparent about the provenance and routes ratification (ARCH-N2, D06-IND-N1) — but it cites only contract 6's text, and a doc-vs-lint divergence persists until `performance` is ratified into the seam matrix + the domain model through their governance. *(Condition below.)*
- **AR-IND-N2** — F-42 → `MVP conditional` is sound and *resolves a latent conflict*: prior G2 (`WORKFLOW-ARCHITECTURE-v2.md` §8c / §9.2) makes a **separate approved D06 entitlement artifact a hard precondition to any BE-05 implementation**, so F-42-as-`MVP required` contradicted the ratified condition. Deferring the positive interface loses nothing material in v1 (no commercial state to derive; the tier field gates nothing; `domain-model.md` §3.11 already bars raw-A28 reads). Option B (defer the tier field too) is offered as DR-A5. → **positive** confirmation of the reclassification.
- **AR-IND-N3** — the §10.1 diagram draws INC-3a / INC-3b as nodes while the text treats INC-3b as a **sub-phase** depended upon; tidy the wording. *(Applied — §10.1 + INC-10 dependency reworded.)*
- **AR-IND-N4** — "no `EntitlementFlag` type in v1" is **build-scoping**, not a domain-model change (`domain-model.md` §3.11 keeps the VO). *(Stated explicitly in §6.1 F-42 row + §9.1.)*

## Conditions

| Condition | Owner | Stage | Safe default | Consequence if unmet |
|---|---|---|---|---|
| Ratify `performance` in the contract-6 C-5 rule; propagate to `cross-context-contracts.md` §6 + `domain-model.md` §4.1 / §6 / §8 via their governance **before** the S-02 lint module-set is fixed | architecture-reviewer + D03 / D06 | INC-0 / INC-11 G2, INC-0 G4 | the lint covers all 5 paths (stricter than the current text) | the authoritative seam matrix and the implementation lint disagree |
| On F-42 activation, enforce the contract-6 C-5 discipline (single derivation point, typed non-consumable flags, fail-restrictive); a D06 entitlement artifact remains a **hard precondition** | architecture-reviewer + D06 | F-42 activation G2 | no `EntitlementFlag` type / BE-05 interface in v1 | entitlement scaffolding enters authorization reach undisciplined |
| INC-5 deployable-topology G2 sign-off for `services/media-worker` (ARCH-N1 from the advisory pass) | architecture-reviewer | INC-5 G2 | `ARCHITECTURE.md` subsystem rule holds | the worker drifts into a parallel architecture |

## Downstream effect

No bounded-context boundary, dependency direction, seam, or deployable topology is changed; the Step-2 scope is a faithful projection of `ARCHITECTURE.md` + the application map + the domain model. The F-10 / F-42 reclassification (DR-A5) is architecturally sound and removes a latent conflict with the ratified G2 BE-05 precondition. Discharges the pending §13.11 "architecture" row as `PASS_WITH_CONDITIONS`; conditions 1–2 route to INC-0 / INC-11 G2 and do not block the G7 product-scope decision.
