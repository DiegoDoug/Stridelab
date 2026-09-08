# G7 Approval Record — StrideLab Governed Product Baseline

Per `stridelab-ai/orchestration/approvals/approval-policy.md`, an approval must
identify the artifact/action, approver, scope, conditions, and date/version.

| Field | Value |
|---|---|
| **Action** | `approve_product_or_architecture_lock` — G7 (Human Approval) for the StrideLab Governed Product Baseline as a standalone governed artifact. |
| **Artifact** | `docs/product/product-baseline.md` — the single governed record of the product invariants the Workflow Architecture and all downstream work is validated against (created in the v2 correction pass to close independent-review finding F-20). Registry id `product-baseline` in `stridelab-ai/registry/artifacts.yaml`. |
| **Approver** | Diego |
| **Date** | 2026-09-08 |
| **Version approved** | The `product-baseline.md` content as of `main` at merge commit `3a770ea929b13b0f4362b09dd4dde618cc7a4a65` (Phase 01 Workflow Architecture v2 finalization). The approval statement's `0ac74830100e450939e272548867fa2a940afdbd` reference is not a commit reachable in this repository; per the maintainer's in-session direction the baseline is pinned to current `main` (`3a770ea`), which carries the reviewed baseline content. The `APPROVED` status flip lands on `main` via **PR #4** (`phase-1/approve-product-baseline`, **squash-merged**), which also folds in the 2026-09-07 scope-correction commit `9552651ec242f47ff761a9614b17be2355f5ec23` (originally on the unmerged `phase-1/correct-baseline-approval-scope`). |
| **Relationship to the 2026-09-07 G7** | The 2026-09-07 G7 (`G7-workflow-architecture-v2.md`) approved the **Workflow Architecture v2** only and did **not** independently approve this baseline. A prior commit (`d449b3e`) had over-extended that approval to the baseline; commit `9552651` corrected it back to `AWAITING_HUMAN_APPROVAL`. This record is the separate human decision that commit identified as still open. |

## Scope

`docs/product/product-baseline.md` is **approved as the canonical governed
product baseline** for StrideLab. It is authoritative over historical discussion,
chat transcripts, and superseded artifacts. Downstream product, client, platform,
security, commercial, and release work is validated against it.

The **Workflow Architecture v2 remains separately approved** (2026-09-07 G7);
this approval does not alter it.

## Conditions (accepted at approval — not resolved by this approval)

1. **§6 Commercial invariants — Free / Mid / Top tier structure.** The three-tier
   count and names are the working structure; explicit Department 06 ratification
   of this as a commercial invariant remains an accepted downstream condition
   (`OQ-BE-TIER-STRUCTURE`). Payment status is never authorization — that
   invariant is approved and in force now.
2. **The identified commercial, legal, policy, and implementation-design items**
   — the `WORKFLOW-ARCHITECTURE-v2.md` §9.2 OPEN register and §8 of the baseline
   (age-verification strength, retention durations, jurisdiction-specific
   data-subject duties, moderation staffing/SLA, the multi-subject-media consent
   *mechanism*, `OQ-BE-PROVIDER/PRICING/TAX/IAP/TRIAL`, `OQ-BE-BILLING-OWNER`,
   broadened `OQ-IT09-REFUND`, `OQ-MEDIA-CACHE-INVALIDATION`,
   `OQ-VS02-MULTISUBJECT`, `OQ-MG-OVERSIGHT`, `OQ-PS07-JURISDICTION`,
   `OQ-PF-MINOR-EXPORT`) — remain **accepted downstream conditions under their
   named owners** (D01 / D04 / D06 / D03 / legal). Each retains its conservative
   safe default in force and gates only its specific implementation sub-area, not
   this artifact.

None of the above was converted into an assumption or an approved decision by
this approval; none is an approved legal interpretation.

## Gate record at approval

| Gate | Disposition |
|---|---|
| G0 Authority & Context | `PASS_WITH_CONDITIONS` (carried from the v2 correction/finalization passes; governed baseline established as the F-20 artifact) |
| G1 Product / Workflow | `PASS_WITH_CONDITIONS` (baseline invariants reviewed with the Workflow Architecture v2; independent D01 completeness review) |
| G3 Security / Privacy / Compliance | `PASS_WITH_CONDITIONS` (independent D04 re-review — no hard youth-safety / privacy / authorization boundary violated; conditions are external policy/legal with conservative defaults in force) |
| G-D06 Commercial / Governance | `PASS_WITH_CONDITIONS` (independent D06 review — `payment ≠ authorization` intact; provider/prices/taxes/refunds/IAP/plan-limits/trial and the tier structure not approved by this artifact) |
| **G7 Human Approval** | **`APPROVED`** — Diego, 2026-09-08 |

The baseline's invariants were reviewed as part of the eleven independent reviews
behind the Workflow Architecture v2 (four v2-continuation + seven finalization —
`WORKFLOW-ARCHITECTURE-v2.md` §8a–§8d). No reviewer found a hard boundary
violation in the baseline invariants; no BLOCKING finding was open at approval.

## Verbatim approval

> G7 APPROVED — StrideLab Product Baseline at commit
> 0ac74830100e450939e272548867fa2a940afdbd is approved as the canonical governed
> product baseline. The Workflow Architecture v2 remains separately approved.
> Section 6B's Free/Mid/Top tier structure and the identified commercial, legal,
> policy, and implementation-design items remain accepted downstream conditions
> under their named owners and are not resolved by this approval. — Diego,
> 2026-09-08

*(Recorded verbatim. "Section 6B" corresponds to §6 Commercial invariants of
`docs/product/product-baseline.md`; the cited commit `0ac7483…` is not reachable
in this repository and, per the maintainer's in-session direction, the baseline
is pinned to current `main` `3a770ea`.)*
