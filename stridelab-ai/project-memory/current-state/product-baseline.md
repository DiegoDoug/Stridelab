# Current State — StrideLab Governed Product Baseline

**Status: `AWAITING_HUMAN_APPROVAL`** — a separate, still-open human decision. The
2026-09-07 G7 approval (Diego) was for the **Workflow Architecture v2** only; it
did **not** independently approve this baseline. See
`stridelab-ai/orchestration/approvals/G7-workflow-architecture-v2.md` §Scope.

Canonical artifact: `docs/product/product-baseline.md` (one canonical location).
Registry entry: `stridelab-ai/registry/artifacts.yaml` → `product-baseline`
(`status: AWAITING_HUMAN_APPROVAL`). Header, registry, and this record agree.

## What this artifact is

The governed record of the product invariants the Workflow Architecture v2 (and
all downstream work) is validated against — created in the v2 correction pass to
close independent-review finding **F-20** (previously the invariants lived only
inside Department agent prompts, which is not a governed source). The normative
force of each invariant comes from **Workflow Architecture v2 §9.1** (G7-approved);
this file consolidates and restates them. It is a *proposed* baseline until a
human approves it.

## Ownership, dependencies, downstream consumers

- **Owner:** Department 01 Product & Experience. **Contributors:** Department 04
  (safety/privacy/legal invariants), Department 06 (commercial invariants).
- **Upstream input to:** `workflow-architecture` (v2, APPROVED — its registry
  entry declares `upstream: [product-baseline]`), `domain-model` (stub).
- **Downstream consumers:** `docs/product/workflow-architecture.md`,
  `docs/product/domain-model.md`, `stridelab-ai/application-map/`.

## Work completed

- **v2 correction pass (2026-09-06)** — artifact created (F-20).
- **v2 finalization pass (2026-09-07)** — carried alongside Workflow Architecture
  v2; at the end of that pass it was still awaiting human approval.
- **G7 approval scope correction (PR #2, merged 2026-09-08 as `fdc7767`)** —
  a prior commit (`d449b3e`, in merged PR #1) had over-extended the G7 approval by
  also flipping this file and its registry entry to `APPROVED` with a §6 carve-out.
  That was an orchestrator inference, not part of the human approval. PR #2
  reverted the header and registry entry to `AWAITING_HUMAN_APPROVAL`, corrected
  the G7 record's Scope section, and added a validator cross-check
  (`product-baseline.md` header status must equal its registry status).
- **Product Baseline review + remediation pass (2026-09-08)** — six independent
  specialist reviews (D01 product/workflow + domain, architecture/contracts, D04
  security/privacy/youth-safeguarding, D06 billing/entitlement governance,
  documentation/traceability, adversarial cross-department) against `fdc7767`.
  **No BLOCKING finding; no reviewer found a contradiction with a locked
  Workflow Architecture v2 invariant or normative decision.** Remediation applied
  in this pass:
  - §3 gains an explicit offline-honesty / SE-09 / synchronization invariant; the
    minor-age derived value is reduced to the boolean `is_minor` (no age band);
    "Team Creator" normalised to "Head Coach / Team Creator"; DD-DEPARTED-CONTENT
    gains "membership-derived access ends immediately"; "approved retention
    policy" reworded (durations OPEN).
  - §5 blocking behaviour gains the seventh normative behaviour (restricted safety
    telemetry to the Platform Safety Administrator) and names `MG-06` authoritative.
  - §6 restructured into **6A** hard invariants locked by approval (payment ≠
    authorization; downgrade/failed-payment preserves data and authorization —
    Department 04-owned, invariant #9) and **6B** Department 06-owned working
    defaults **not resolved** by approval (tier structure `OQ-BE-TIER-STRUCTURE`;
    billing owner + tier-change authority `OQ-BE-BILLING-OWNER`;
    provider/prices/taxes/refunds/IAP/plan-limits/trial/grace/over-limit
    `OQ-BE-*`, default "no paid billing ships in v1"; a separate approved D06
    entitlement artifact precedes any BE-05 implementation). §6's payment-≠-
    authorization forbidden-target list generalised to any authorization path and
    cross-referenced to contract 6 / BE-05.
  - §7 restores the dependency-direction rule ("domain modules must not depend on
    application shells") and the "not a second product architecture" and
    "operational evidence" clauses, and cites `ARCHITECTURE.md` (registry id
    `architecture-decision`) as governing.
  - §8 marked non-exhaustive, pointed at `WORKFLOW-ARCHITECTURE-v2.md` §9.2 as the
    complete register, and split into external legal/policy, open D01 product
    decisions, and Department 06 commercial content — each with owner and
    in-force safe default; `OQ-MG-OVERSIGHT`, `OQ-PF-MINOR-EXPORT`,
    `OQ-IT04-JOIN-MECHANISM`, `OQ-PW-COACH-VISIBILITY` named.
  - "the approved baseline" phrasing corrected to "the governed product baseline"
    / "Workflow Architecture v2 §9.1" across the supporting-spec workflow files
    (the invariant content is unchanged and remains normative via §9.1).
  - `G7-workflow-architecture-v2.md` "Artifact" row requalified so the baseline is
    listed as *validated against, not approved by this record*.
  - Validator hardened so the baseline status cross-check fails closed
    (missing / unrecognised header status, missing registry entry, invalid
    registry status, and `APPROVED` without approval-record fields are now
    errors); this current-state record added to the status-agreement set.

## Gate posture (advisory — not human approval)

| Gate / lens | Disposition | Basis |
|---|---|---|
| Product / workflow + domain (D01) | recommend-approve-with-conditions | consistent with all 86 workflows / 16 invariants / §9.1 / §9.2; honestly scoped as proposed |
| Architecture / contracts | PASS WITH CONDITIONS | no boundary change, no new service, no dependency-direction violation; consistent with the 14 seams; payment ≠ authorization coherent with BE-05 / contract 6 |
| Security / privacy / youth safeguarding (D04) | APPROVE-WITH-CONDITIONS-recommendable | no D04 boundary weakened; open legal/policy items honestly labelled with conservative defaults |
| Commercial / governance (D06) | PASS WITH CONDITIONS | no false approval; `OQ-BE-TIER-STRUCTURE` remains D06-owned and unresolved |
| Documentation / traceability | content consistent; governance-infra conditions applied in this pass | one canonical location; header/registry/current-state agree; validator now fail-closed |
| Adversarial cross-department | revise-first items applied this pass; no BLOCKING | 16 invariants walked one-by-one — no contradiction with a locked decision |
| **G7 — Human Approval** | **PENDING** | not granted; only Diego can grant it |

## Blockers / open human decision

- **Open human decision:** whether to approve `docs/product/product-baseline.md`
  as the canonical governed product baseline. Not granted. Nothing in this repo
  impersonates or substitutes for it.
- **Accepted downstream conditions (owners named; not resolved by approving this
  file):** `OQ-BE-TIER-STRUCTURE` (D06 ratification of the Free/Mid/Top tier
  structure into §6); the §8 / §9.2 external policy/legal register; a separate
  approved Department 06 entitlement artifact before any BE-05 implementation.
- Conservative safe defaults remain in force for every open item.

## Source artifact references

- Canonical: `docs/product/product-baseline.md`
- Approval record (Workflow Architecture v2, for scope context):
  `stridelab-ai/orchestration/approvals/G7-workflow-architecture-v2.md`
- Supporting spec / OPEN register: `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §9.1, §9.2
- Registry: `stridelab-ai/registry/artifacts.yaml`
