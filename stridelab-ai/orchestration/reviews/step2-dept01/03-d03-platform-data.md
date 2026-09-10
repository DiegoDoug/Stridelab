# Independent D03 specialist review — Step 2 (feature prioritization + MVP release scope)

**Reviewer identity:** Independent D03 specialist reviewer (subagent), 2026-09-10 — did not author the artifacts.
**Disposition:** `PASS_WITH_CONDITIONS`.

## Scope

Aggregate / seam reality; offline / sync coherence; F-17 vs invariant #4; the domain-model §4.1 guard set carried into the scope; D03-owned `OQ-*` safe-default completeness; `services/media-worker` singularity; increment-graph acyclicity.

## Authoritative inputs

`domain-model.md` §4 (A1–A35), §4.1, §6, §10 (F-D03-01…12); `cross-context-contracts.md` (14 seams); `ARCHITECTURE.md`; `REVIEW-CONTRACT.md`.

## Evidence inspected

`mvp-release-scope.md` §8.2 (A1–A35, cross-checked 1:1 against domain-model §4 — all 35 real), §8.3 (seams 1–14, cross-checked against cross-context-contracts — no seam added / renamed / altered), §9.3 (S-03 / invariant #13 / pending-vs-durable — consistent), §11.1 G4 (requires "§4.1 cross-aggregate guards implemented"), §12 rows S-03/S-07/S-11/F-17/F-23, §10.1 dependency graph, §14 Session-sync row; `feature-prioritization.md` F-17, F-23, F-20 records.

## Blocking findings

**None.** Aggregates and seams are all real and unmodified. The offline model is coherent: S-03, invariant #13, `domain-model.md` §4.1 `grant_pending` / pending-vs-durable, and seams 9 / 14 all state "never last-write-wins" and "pending loses to revoke/hold" consistently. **F-17 is implementable without weakening invariant #4** — A12 append-only (domain-model F-D03-03), A13 layers over A11+A12 without destruction, coach view read-only, departed-athlete conflict held-not-auto-resolved. The §4.1 guards (one-Head-Coach transaction + uniqueness, append-only A12, no denormalised Vault flag, SafetyNotification outbox, hold precondition) are all carried into §8.2 / §12 / §11.1-G4. `services/media-worker` is consistently the sole new deployable workload. The increment graph INC-0 → … → INC-11 is acyclic; every dependency edge points to a lower-numbered increment. No acceptance criterion assumes an unresolved D03 decision — the S-07 / S-11 / F-17 / F-31 rows test the safe-default *property*, not its resolution.

## Non-blocking findings

- **D03-IND-N1** — the §15 decision package stated "36 user-facing + 12 supporting" while §5 / §7.1 said 35 + 11; the mismatched count sat inside the verbatim G7 approval statement. → **Fixed** in §15 (35 + 11 = 46; approval statement updated).
- **D03-IND-N2** — domain-model commit-pin phrasing: the Step-2 artifacts cite `main`@`5db47f1`; `domain-model.md` §13.3 pins `760ca3c` (PR #6). Both are correct (`760ca3c` published the approved domain model; `5db47f1` is the later pin commit, and the current `main` HEAD the Step-2 work was built on). → **Clarified** in §15 ("built on `main`@`5db47f1`, which contains the APPROVED domain model published at `760ca3c` / PR #6").
- **D03-IND-N3** — `OQ-SE-RECONCILE-UX` was listed under "residual open **D03** items", but `domain-model.md` §11 assigns the UX portion to **D01**; only the SE-09 state machine is D03. → **Fixed** in §9.3 and §13.3 (ownership split explicit).

## Conditions

| Condition | Owner | Stage | Safe default | Consequence if unmet |
|---|---|---|---|---|
| Confirm the cohort-suppression / aggregation method (`OQ-PF-AGG-METHOD`) | D03 | INC-10 G4 | suppress re-identifying cohorts; aggregate only over individually-visible athletes | F-33 disabled, PF-03 blocked; re-identification risk |
| Cache-invalidation design (`OQ-MEDIA-CACHE-INVALIDATION`) | D03 | INC-5 / INC-6 G4 | server-authoritative revocation + best-effort purge; online-validated Vault access | revoked media persists in an offline cache (documented limitation, §12 S-07) |
| SE-09 reconciliation state-machine sign-off | D03 | INC-3b G3 / G4 | state machine + non-loss / attribution guarantees | INC-3a cannot be externally exposed |
| Fix N1 / N2 / N3 doc inconsistencies | D01 | pre-G7 (applied) | n/a | human ratifies an inconsistent inventory / pin / ownership |

## Downstream effect

Both Step-2 artifacts are a sound D03 input to G4 implementation-design. The §4.1 guards and the 14 seams carry through unweakened; the offline substrate contract (S-03) is complete. D02/D03 own contract *shapes* per bounded context at G4; the four conditions above are tracked to their named later gates and do not block the G7 product-scope lock.
