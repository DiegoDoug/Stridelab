# Step 3 remediation review — `quality-engineering`

- **Scope:** confirms the delta's claims are **proven by machine**, not asserted in prose, and that the validator genuinely fails closed.
- **Authoritative inputs:** the task's validation mandate; `stridelab-ai/scripts/validate-step3-4-artifacts.mjs`; `package.json` `ai:validate`; `.github/workflows/`.
- **Evidence inspected:** the seven new/extended check blocks and the extended `counts` payload; the negative-test results below.

## Checks added this pass

| Check | Proves |
|---|---|
| 8b | Step-3 remediation evidence exists (13 lenses) and **every `RP-B*` BLOCKING row is marked CLOSED** |
| 9 | every approved `INC-*` is mapped; every `D-NN` has **exactly one** owning increment |
| 9b | every approved `J-*` has a walkthrough naming a primary role and non-empty Locate/Open/Complete/Return steps |
| 10 | all 16 invariants covered, each citing an IA section |
| 11 | every canonical actor has a primary destination, a non-empty denial set; the three end-user actors each own a journey |
| 12 | all 9 MVP-conditional capabilities have a treatment row |
| 13 | non-goals exist (≥10) and address navigation, interaction design, `OQ-*`, and Option A |
| 14 | all 7 `X-N` states defined with an owning destination and a non-empty prohibition; **D-28 backs X-6** |
| 15 | destination IDs are unique |
| 16 | the IA cites the **live** Step-2 approved-version pin, read from the G7 record itself — a stale pin fails |
| 17 | no `OQ-*`/`CD-*` ID is cited that does not already exist in a governed upstream register |

## Fail-closed evidence (negative tests)

Each defect was injected into a scratch copy, the validator run, and the artifact restored.

| Injected defect | Result |
|---|---|
| drop invariant #12 row | **CAUGHT** (exit 1) |
| remove the X-6 conflict state | **CAUGHT** (exit 1) |
| replace the upstream pin with a stale SHA | **CAUGHT** (exit 1) |
| invent `OQ-TOTALLY-INVENTED` | **CAUGHT** (exit 1) |
| delete the non-goals section | **CAUGHT** (exit 1) |
| drop INC-9 from the increment map | **CAUGHT** (exit 1) |
| duplicate a destination row | **CAUGHT** (exit 1) |
| drop the J-12 walkthrough | **CAUGHT** (exit 1) |

Two further defects were caught **by these checks during authoring, before any commit** —
RP-B1 (D-15 claimed by two increments) and RP-B2 (an actor with no primary destination).
The checks therefore have demonstrated real defect-detection value, not only synthetic.

- **Blocking findings:** none.
- **Non-blocking findings:**
  - **RP-N4** — the validator proved feature, destination, actor, invariant and increment coverage but **not journey coverage**, even though J-1…J-13 is the IA's own completeness argument (§5.0). *Remediation applied:* check 9b added; `journeys_walked: 13`; negative-tested.
- **Disposition:** **`PASS`** — every coverage claim in the delta is now machine-proven and fail-closed; `ai:validate` remains wired into CI.
- **Reviewer identity:** `quality-release-lead`, Department 05 (independent pass).
