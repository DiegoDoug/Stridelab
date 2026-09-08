# Current State — StrideLab Governed Product Baseline

**Status: `APPROVED` — G7 granted by Diego on 2026-09-08.**

`docs/product/product-baseline.md` is the canonical governed product baseline: the
single governed record of the product invariants the Workflow Architecture v2 and
all downstream work are validated against. It is authoritative over historical
discussion, chat transcripts, and superseded artifacts.

Approval record: `stridelab-ai/orchestration/approvals/G7-product-baseline.md`.

## Lineage of the approval

- Created in the **v2 correction pass (2026-09-06)** to close independent-review
  finding **F-20** (invariants previously lived only inside Department agent
  prompts — not a governed source).
- **2026-09-07:** commit `d449b3e` flipped this artifact to `APPROVED` alongside
  the Workflow Architecture v2 G7. That extension was an orchestrator inference,
  not part of the human approval, which named "Workflow Architecture v2".
- **2026-09-07:** commit `9552651` corrected the scope — this artifact reverted to
  `AWAITING_HUMAN_APPROVAL`; its approval as a standalone governed artifact
  recorded as a separate, still-open human decision.
- **2026-09-08:** **Diego granted G7** for this artifact as a standalone governed
  baseline. Status → `APPROVED`. Pinned to `main` merge commit `3a770ea` (the
  approval statement's `0ac7483…` reference is not reachable in this repo; pinned
  to current `main` per the maintainer's in-session direction). The Workflow
  Architecture v2 remains separately approved.

## Accepted downstream conditions (not resolved by this approval)

Under their named owners; each has a conservative safe default in force and gates
only its specific implementation sub-area, not this artifact.

- **§6 Free / Mid / Top tier structure** — `OQ-BE-TIER-STRUCTURE`, Department 06
  ratification. (`payment ≠ authorization` is approved and in force now.)
- **The identified commercial, legal, policy, and implementation-design items** —
  the `WORKFLOW-ARCHITECTURE-v2.md` §9.2 OPEN register and §8 of the baseline
  (age-verification strength; retention durations; jurisdiction-specific
  data-subject duties; moderation staffing/SLA; multi-subject-media consent
  *mechanism*; `OQ-BE-PROVIDER/PRICING/TAX/IAP/TRIAL`, `OQ-BE-BILLING-OWNER`,
  broadened `OQ-IT09-REFUND`; `OQ-MEDIA-CACHE-INVALIDATION`,
  `OQ-VS02-MULTISUBJECT`, `OQ-MG-OVERSIGHT`, `OQ-PS07-JURISDICTION`,
  `OQ-PF-MINOR-EXPORT`) — owned by D01 / D04 / D06 / D03 / legal.

## Gate record at approval

| Gate | Disposition |
|---|---|
| G0 Authority & Context | `PASS_WITH_CONDITIONS` |
| G1 Product / Workflow | `PASS_WITH_CONDITIONS` |
| G3 Security / Privacy / Compliance | `PASS_WITH_CONDITIONS` (no hard youth-safety / privacy / authorization boundary violated) |
| G-D06 Commercial / Governance | `PASS_WITH_CONDITIONS` (`payment ≠ authorization` intact; tier structure + provider/prices/taxes/refunds/IAP/plan-limits/trial not approved by this artifact) |
| G7 Human Approval | `APPROVED` — Diego, 2026-09-08 |

Baseline invariants were reviewed within the eleven independent reviews behind the
Workflow Architecture v2 (`WORKFLOW-ARCHITECTURE-v2.md` §8a–§8d) — no hard
boundary violation found, no BLOCKING finding open at approval.

## Blockers

- **None for this artifact.** The downstream conditions above remain open under
  their named owners as accepted downstream work — none gates this artifact.

## Source artifacts

- **Baseline:** `docs/product/product-baseline.md`
- **Approval record:** `stridelab-ai/orchestration/approvals/G7-product-baseline.md`
- **Registry entry:** `stridelab-ai/registry/artifacts.yaml` (`id: product-baseline`)
- **Validated-against artifact:** `docs/product/workflow-architecture.md` (Workflow
  Architecture v2) and its `§9.2` OPEN register
- **Related current-state record:** `workflow-architecture-v2.md`
