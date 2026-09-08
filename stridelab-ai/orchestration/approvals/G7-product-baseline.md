# G7 Approval Record — StrideLab Governed Product Baseline

Per `stridelab-ai/orchestration/approvals/approval-policy.md`, an approval must
identify the artifact/action, approver, scope, conditions, and date/version.

| Field | Value |
|---|---|
| **Action** | `approve_product_or_architecture_lock` — G7 (Human Approval) for the StrideLab Governed Product Baseline as a standalone governed artifact. |
| **Artifact** | `docs/product/product-baseline.md` — the single governed record of the product invariants the Workflow Architecture v2 and all downstream work are validated against (created in the v2 correction pass to close independent-review finding F-20). Registry id `product-baseline` in `stridelab-ai/registry/artifacts.yaml`; lifecycle record `stridelab-ai/project-memory/current-state/product-baseline.md`. |
| **Approver** | Diego |
| **Date** | 2026-09-08 |
| **Version approved** | `product-baseline.md` as of `main` at merge commit `0ac74830100e450939e272548867fa2a940afdbd` — the commit named in the approval statement (PR #3, "Product Baseline review remediation", merged 2026-09-08). The `APPROVED` status flip lands on `main` via **PR #5** (branch `phase-1/g7-approve-product-baseline`, **squash-merged**). |
| **Relationship to the 2026-09-07 G7** | The 2026-09-07 G7 (`stridelab-ai/orchestration/approvals/G7-workflow-architecture-v2.md`) approved the **Workflow Architecture v2** only and did **not** independently approve this baseline. A prior commit (`d449b3e`, PR #1) had over-extended that approval to the baseline; PR #2 (`fdc7767`) reverted it to `AWAITING_HUMAN_APPROVAL` as a separate, still-open human decision; PR #3 (`0ac7483`) ran six independent reviews and remediated the baseline, still `AWAITING_HUMAN_APPROVAL`. This record is that separate human decision, now granted. |

## Scope

`docs/product/product-baseline.md` is **approved as the canonical governed
product baseline** for StrideLab. It is authoritative over historical discussion,
chat transcripts, and superseded artifacts. Downstream product, client, platform,
security, commercial, and release work is validated against it.

The **Workflow Architecture v2 remains separately approved** (2026-09-07 G7); this
approval does not alter it.

## Conditions (accepted at approval — not resolved by this approval)

1. **§6B Department 06-owned commercial working defaults.** The Free / Mid / Top
   tier structure (`OQ-BE-TIER-STRUCTURE`, owner: Department 06), billing owner
   and tier-change authority (`OQ-BE-BILLING-OWNER`), and provider / prices /
   taxes / refunds / IAP mechanics / plan limits / trial / grace / over-limit
   (`OQ-BE-PROVIDER` / `OQ-BE-PRICING` / `OQ-BE-TAX` / `OQ-IT09-REFUND` /
   `OQ-BE-IAP` / `OQ-BE-TRIAL` / `OQ-BE-GRACE` / `OQ-BE-OVERLIMIT`) are **not**
   ratified by this approval. Each keeps its Department 06 owner and its in-force
   conservative safe default (**no paid billing ships in v1**). A separate
   approved Department 06 entitlement artifact is a hard precondition to any
   BE-05 / billing implementation.
2. **§6A hard invariants are locked by this approval** and in force now: payment
   status is never authorization (any authorization path — role, management
   scope, profile-field visibility, Vault visibility, membership); downgrade /
   failed payment never revokes data or restructures the hierarchy/authorization.
   (Department 04-owned, cross-workflow invariant #9.)
3. **The identified commercial, legal, policy, and implementation-design items**
   — the `WORKFLOW-ARCHITECTURE-v2.md` §9.2 OPEN register and §8 of the baseline
   (age-verification strength; retention durations; jurisdiction-specific
   data-subject / under-13 / illegal-content duties; moderation staffing / SLA;
   the multi-subject-media consent *mechanism*; coach↔athlete private-thread
   oversight `OQ-MG-OVERSIGHT`; coach-initiated minor-data export
   `OQ-PF-MINOR-EXPORT`; Team join mechanism `OQ-IT04-JOIN-MECHANISM`;
   personal-workout coach visibility `OQ-PW-COACH-VISIBILITY`; and the rest of
   §9.2) — remain **accepted downstream conditions under their named owners**
   (D01 / D04 / D06 / D03 / legal). Each retains its conservative safe default in
   force and gates only its specific implementation sub-area, not this artifact.

None of the above was converted into an assumption or an approved decision by this
approval; none is an approved legal interpretation.

## Gate record at approval

Advisory gate/lens dispositions from the six independent reviews behind PR #3
(`stridelab-ai/project-memory/current-state/product-baseline.md` §Gate posture),
plus this human decision:

| Gate / lens | Disposition |
|---|---|
| Product / workflow + domain (D01) | recommend-approve-with-conditions |
| Architecture / contracts | `PASS_WITH_CONDITIONS` (no boundary change, no new service, no dependency-direction violation; payment ≠ authorization coherent with BE-05 / contract 6) |
| Security / privacy / youth safeguarding (D04) | APPROVE-WITH-CONDITIONS-recommendable (no D04 boundary weakened; open legal/policy items honestly labelled with conservative defaults) |
| Commercial / governance (D06) | `PASS_WITH_CONDITIONS` (`OQ-BE-TIER-STRUCTURE` remains D06-owned and unresolved; no false approval) |
| Documentation / traceability | consistent — one canonical location; header / registry / current-state agree; validator fail-closed |
| Adversarial cross-department | no BLOCKING; 16 invariants walked one-by-one, no contradiction with a locked decision |
| **G7 — Human Approval** | **`APPROVED`** — Diego, 2026-09-08 |

No reviewer found a hard youth-safety, privacy, authorization, or architecture
boundary violation, and no BLOCKING finding was open at approval.

## Verbatim approval

> G7 APPROVED — StrideLab Product Baseline at commit
> 0ac74830100e450939e272548867fa2a940afdbd is approved as the canonical governed
> product baseline. The Workflow Architecture v2 remains separately approved.
> Section 6B's Free/Mid/Top tier structure and the identified commercial, legal,
> policy, and implementation-design items remain accepted downstream conditions
> under their named owners and are not resolved by this approval. — Diego,
> 2026-09-08

*(Recorded verbatim. The cited commit `0ac7483…` is `main` at the time of
approval — the merge of PR #3. "Section 6B" is §6B of
`docs/product/product-baseline.md` — the Department 06-owned commercial working
defaults, created in PR #3's §6 restructure.)*
