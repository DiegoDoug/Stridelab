# G7 Approval Record — Department 01 Steps 3 & 4 (Information Architecture + Navigation Specification)

Per `stridelab-ai/orchestration/approvals/approval-policy.md`, an approval must
identify the artifact/action, approver, scope, conditions, and date/version.

| Field | Value |
|---|---|
| **Action** | `approve_product_or_architecture_lock` — G7 (Human Approval) for Department 01 **Steps 3 and 4**: the StrideLab Information Architecture and the StrideLab Navigation Specification as the governed information-architecture and navigation input to Step 5 MVP Interaction Design and to client implementation-design. |
| **Artifacts** | `docs/product/information-architecture.md` (Step 3; registry id `information-architecture`) and `docs/product/navigation-specification.md` (Step 4; registry id `navigation-specification`). |
| **Approver** | Diego |
| **Date** | 2026-09-15 |
| **Version approved** | Both artifacts exactly as published at commit `ad8c45bddace1d5307f5ef492e563ee2814513fe` on branch `phase-1/dept01-step3-step4-ia-navigation` for PR #10. The subsequent approval-record and lifecycle-status commit does not change the approved information architecture or navigation model. |
| **Approval boundary** | Information-architecture and navigation lock for Step 5 MVP Interaction Design and implementation-design only. This record is **not** legal or compliance sign-off, **not** launch authorization, **not** production-release authorization, and **not** evidence that any implementation is complete. |
| **Combined decision** | This is a single combined Steps 3–4 decision. It was presented in the Step-3 remediation completion report under a section headed "Step-3 approval statement"; the approver directed that it be recorded as a combined Steps 3 and 4 approval. Both artifacts carry the same approved SHA and the same date. |

## Decision outcomes

- **Information Architecture — APPROVED.** `docs/product/information-architecture.md` at
  `ad8c45bddace1d5307f5ef492e563ee2814513fe`.
- **Navigation Specification — APPROVED.** `docs/product/navigation-specification.md` at
  `ad8c45bddace1d5307f5ef492e563ee2814513fe`.

## Verbatim approval

> **G7 APPROVED** — the StrideLab Information Architecture (`docs/product/information-architecture.md`) and the StrideLab Navigation Specification (`docs/product/navigation-specification.md`), at commit `ad8c45bddace1d5307f5ef492e563ee2814513fe`, are approved as the governed information-architecture and navigation input to Step 5 MVP Interaction Design and to client implementation for the approved MVP scope. The object inventory, eight independent hierarchies, 28-destination map, `INC-0…INC-11` increment traceability, 16-invariant coverage, actor-coverage matrix, treatment of the nine MVP-conditional capabilities as inert, the `X-1…X-7` system-state surfaces, and the thirteen non-goals in the Information Architecture — together with the navigation principles, per-role and per-platform models, state model, destination-to-navigation mapping, creation/start-action model, and restricted/administrative placement rules in the Navigation Specification — are adopted. Every `WORKFLOW-ARCHITECTURE-v2.md` §9.2 OPEN item referenced by either artifact remains open under its named owner with its conservative safe default accepted; **no OPEN item is resolved, converted, or created**. This approval authorises interaction-design and implementation-design against this model only. It is **not** a legal or compliance sign-off, **does not** authorise any production release, and **does not** alter the separately approved product baseline, workflow architecture, domain model, feature prioritization, or MVP release scope.

## Scope and adopted conditions

1. Every `OQ-*` / `CD-*` item remains open under its existing owner with its existing
   conservative safe default. This approval resolves, converts, renames, or creates
   **none** — machine-asserted by `validate-step3-4-artifacts.mjs` check 17 (20 governed
   IDs verified against the upstream registers).
2. The nine MVP-conditional capabilities (F-10, F-19, F-22, F-33, F-34-cond, F-40, F-42,
   S-09, S-10) remain **inert**. Approving their IA treatment activates none of them.
   **F-22 has no owning increment** and remains unscheduled in the approved `mvp-release-scope.md` §10.
3. **DR-A5 Option A is unchanged.** The Free-default Team tier-state field (F-40) and the
   S-02 build-time authorization-isolation rule ship in v1; no feature reads the tier
   value; **no billing is activated and F-42 / BE-05 remains deferred** until tier gating
   is activated through a separately approved Department 06 entitlement artifact.
4. The increment gates are adopted as recorded: INC-0 ships no destination; **INC-3a is
   not externally exposed until INC-3b passes**; **INC-9 complete with D04 G3 sign-off
   precedes any external user exposure of media (INC-5) or messaging (INC-8)**; INC-11
   adds no surface; **S-12 accessibility is a per-increment G5 exit gate** for INC-1…INC-10.
5. The carried conditions remain assigned to their named owners and later gates:
   D03 offline-index-freshness threshold (G4); D02 minimum-OS and iPhone tab grouping (G4);
   D04 F-22 consent mechanism + publication-authority gate, `OQ-PF-MINOR-EXPORT`, IA-OQ-4;
   D06 tier-gating activation; D05 per-increment S-12 verification (G5).
6. The production-launch legal sign-offs (`OQ-IT01-AGE-VERIFY`, `OQ-PS07-JURISDICTION`,
   `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`) and `OQ-PS-MOD-STAFFING` remain named
   conditions for G6 and a separate future G7 production-release decision.
7. The Workflow Architecture v2, governed product baseline, consolidated domain model,
   MVP feature prioritization, and MVP release scope remain approved and **unchanged** —
   verified byte-identical to `origin/main` by blob-hash comparison.
8. **Step numbering is unchanged:** Step 3 Information Architecture, Step 4 Navigation
   Specification, Step 5 MVP Interaction Design. Step 5 is authorised by this record but
   was **not** started in the approving session.

## Gate record at approval

| Gate / lens | Disposition |
|---|---|
| Step 3 gate — 7 independent lenses | `PASS_WITH_CONDITIONS` |
| Step 3 remediation — 13 independent lenses + re-verification | `PASS_WITH_CONDITIONS`; 4 BLOCKING (RP-B1…RP-B4) remediated and independently re-verified, 4 non-blocking closed |
| Combined Step 3+4 cross-department review (10 participants, 17-point checklist) | `PASS_WITH_CONDITIONS` |
| Step 4 navigation validation | `PASS` |
| Semantic validation (`ai:validate`, 6 validators, clean clone) | `PASS` |
| **G7 — Human Approval** | **`APPROVED`** — Diego, 2026-09-15 |

**Zero open BLOCKING findings at approval.**

## Publication note — verifying the approved version after merge

PR #10 is merged to `main` by **squash merge**, the established convention for governed
PRs in this repository (#5, #6, #7, #9). The approved commit
`ad8c45bddace1d5307f5ef492e563ee2814513fe` is therefore **not an ancestor of `main`**,
exactly as `9893c1d…` is not for Step 2.

This is expected and benign. To verify the approved version after merge, compare **blob
hashes**, not ancestry:

```
git rev-parse ad8c45b:docs/product/information-architecture.md
git rev-parse main:docs/product/information-architecture.md
```

The only difference between the approved version and `main` is the lifecycle/status
metadata introduced by this approval commit — the status token, the G7 pointer, and the
pinned SHA. **No element of the approved information architecture or navigation model
differs.** Do not use `git merge-base --is-ancestor` to test the pin; it will correctly
report "no" and mean nothing.

## What this approval is — and is not

- **Is:** a human decision to lock the information architecture and navigation model so
  Step 5 MVP Interaction Design and client implementation-design can proceed against it.
- **Is not:** a production-release authorization; a legal or compliance sign-off; a
  resolution of any `OQ-*` / `CD-*` item; an activation of any conditional capability,
  billing, or tier gating; a change to any separately approved upstream artifact.
