# G7 Approval Record — Department 01 Step 2 MVP Scope

Per `stridelab-ai/orchestration/approvals/approval-policy.md`, an approval must
identify the artifact/action, approver, scope, conditions, and date/version.

| Field | Value |
|---|---|
| **Action** | `approve_product_or_architecture_lock` — G7 (Human Approval) for Department 01 Step 2: the StrideLab MVP Feature Prioritization and MVP Release Scope as the governed input to MVP implementation-design. |
| **Artifacts** | `docs/product/feature-prioritization.md` (Phase A; registry id `feature-prioritization`) and `docs/product/mvp-release-scope.md` (Phase B; registry id `mvp-release-scope`). |
| **Approver** | Diego |
| **Date** | 2026-09-10 |
| **Version approved** | Both artifacts exactly as published at commit `9893c1d4dd0166fd0c55f1950e601e5f8737946c` on branch `phase-1/dept01-step2-feature-prioritization-release-scope` for PR #9. The subsequent approval-record and lifecycle-status commit does not change the approved product scope. |
| **Approval boundary** | Product-scope lock for implementation-design only. This record is not legal or compliance sign-off, launch authorization, production-release authorization, or evidence that any implementation is complete. |

## Decision outcomes

- **DR-A1 — APPROVED.** Adopt the feature prioritization as the governed input
  to the MVP release scope.
- **DR-A2 — APPROVED.** Accept the C1→C5 lexicographic prioritization method,
  with its stated evidence limitations.
- **DR-A3 — APPROVED.** Accept the nine MVP-conditional capabilities and their
  named activation conditions and safe defaults.
- **DR-A4 — APPROVED.** Confirm F-EX-1…F-EX-10 as excluded from the current
  release.
- **DR-A5 — APPROVED.** Confirm the review-driven F-10 and F-42
  reclassification to `MVP conditional`, producing 35 user-facing + 11
  supporting = 46 MVP-required capabilities and nine conditional capabilities.
  For the commercial-scaffold choice, Diego explicitly selected **Option A**:
  ship the Free-default Team tier-state field and enforce the S-02 build-time
  authorization-isolation rule in v1, while keeping F-42 / BE-05 deferred until
  tier gating is activated through a separately approved Department 06
  entitlement artifact.

## Scope and adopted conditions

The approval adopts the two Step-2 artifacts and the scope, sequencing, gates,
acceptance criteria, deferrals, and exclusions enumerated in the verbatim
statement below. In particular:

1. Every `OQ-*` / `CD-*` item remains open under its existing owner and existing
   conservative safe default. This approval resolves, converts, or creates none.
2. Option A does not ratify pricing, paid-tier entitlements, tier mapping, billing
   mechanics, or any other Department 06 commercial open item. No feature is
   tier-gated in v1. F-42 / BE-05 remains deferred until the separately approved
   Department 06 entitlement artifact activates tier gating.
3. The §13.10 non-blocking conditions remain assigned to their named owners and
   later G2 / G4 / G5 / G6 stages.
4. The production-launch legal sign-offs (`OQ-IT01-AGE-VERIFY`,
   `OQ-PS07-JURISDICTION`, `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`) and
   `OQ-PS-MOD-STAFFING` remain named conditions for G6 and a separate future G7
   production-release decision.
5. The Workflow Architecture v2, governed product baseline, consolidated domain
   model, and their separate G7 records remain approved and unchanged.
6. PR #9 remains subject to its normal review and required checks; this approval
   does not authorize automatic merge.

## Gate record at approval

| Gate / lens | Disposition |
|---|---|
| G0 — Authority & Context | `PASS_WITH_CONDITIONS` |
| G1 — Product / workflow | `PASS_WITH_CONDITIONS` |
| G2 — Architecture / contracts | `PASS_WITH_CONDITIONS` |
| G3 — Security / privacy / youth safeguarding | `PASS_WITH_CONDITIONS` |
| Department 03 — persistence / sync / media feasibility | `PASS_WITH_CONDITIONS` |
| Department 05 — quality / release lens | `PASS_WITH_CONDITIONS` |
| Department 06 — commercial / governance lens | `PASS_WITH_CONDITIONS` |
| Cross-department review | `PASS_WITH_CONDITIONS`; zero open BLOCKING findings after remediation and re-verification |
| **G7 — Human Approval** | **`APPROVED`** — Diego, 2026-09-10 |

## Verbatim approval

> G7 APPROVED — the StrideLab MVP Feature Prioritization (`docs/product/feature-prioritization.md`) and the StrideLab MVP Release Scope (`docs/product/mvp-release-scope.md`), at commit `9893c1d4dd0166fd0c55f1950e601e5f8737946c`, are approved as the governed input to MVP implementation-design. The 35 user-facing + 11 supporting MVP-required capabilities, the 9 conditional capabilities with their activation conditions, the Post-MVP deferrals, the F-EX-1…F-EX-10 exclusions, the C1→C5 prioritization method, the review-driven F-10 + F-42 reclassification (DR-A5), and the INC-0…INC-11 implementation sequence — including the hard gate that INC-9 (safety spine) completes with D04 G3 sign-off before any external user exposure of media or messaging, and INC-3a is not externally exposed before INC-3b passes, and the S-12 accessibility checklist is a per-increment G5 exit gate — are adopted. Every `WORKFLOW-ARCHITECTURE-v2.md` §9.2 OPEN item that gates an included capability remains open under its named owner with its conservative safe default accepted for this release; no OPEN item is resolved, converted, or created. This approval authorises implementation-design only; it is not a legal or compliance sign-off and does not authorise any production release. The production-launch legal sign-offs (`OQ-IT01-AGE-VERIFY`, `OQ-PS07-JURISDICTION`, `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`) and `OQ-PS-MOD-STAFFING` remain named conditions on G6 and a future G7 release decision. The Workflow Architecture v2, the governed product baseline, and the consolidated domain model remain separately approved and unchanged.

## Explicit Option A direction

The following direction was supplied together with the G7 decision and is part
of DR-A5's durable record:

> For the DR-A5 commercial-scaffold choice, I explicitly select Option A: ship
> the Free-default Team tier-state field and enforce the S-02 build-time
> authorization-isolation rule in v1, while keeping F-42/BE-05 deferred until
> tier gating is activated through a separately approved Department 06
> entitlement artifact.
