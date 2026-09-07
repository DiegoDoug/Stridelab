# Current State — StrideLab Workflow Architecture v2

**Status: `AWAITING HUMAN APPROVAL` (conditional — see gate table).**

Do not treat as approved. Do not implement application code, database schema,
APIs, UI components, or navigation against this artifact until a human
explicitly approves it and the remaining external policy/legal OPEN items are
resolved by their owners.

## Source artifacts

- **Canonical entry point:** `docs/product/workflow-architecture.md`
- **Governed product baseline:** `docs/product/product-baseline.md`
- **Domain model (companion stub):** `docs/product/domain-model.md`
- **Supporting spec index:** `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md`
- **Supporting per-category specs:** `stridelab-ai/knowledge/workflows/*/WORKFLOWS.md` (13 files, 86 workflows)
- **Registry:** `stridelab-ai/registry/` (`artifacts.yaml`, `bounded-context-owners.yaml`)
- **Application map:** `stridelab-ai/application-map/` (`bounded-contexts.md`, `cross-context-contracts.md`)

86 workflows: IT-01…09, PR-01…03, TA-01…07, TP-01…08, SE-01…10, PW-01…03, MD-01…07, AN-01…07, VS-01…04, MG-01…07, PF-01…06, BE-01…06, PS-01…09.

## Lineage

- v1 draft (2026-09-05) — 76 workflows. Uncommitted; never approved. Superseded.
- v1 remediation pass (2026-09-06) — findings F-01…F-12; 84 workflows. Superseded.
- **v2 correction pass (2026-09-06)** — this record. Findings F-13…F-24 completed; authorized product decisions made normative; SE-10 + MG-07 added (86); canonical entry point + governed baseline + registry + application-map created; G2 completed by `architecture-reviewer`; independent Department 06 review run. The v1-era working files were superseded in place; no v1 file was ever committed, so there is no v1 blob in version history — the v1 → v2 lineage is preserved as prose in the v2 documents, not as a git rename.
- **v2 finalization pass (2026-09-07)** — this record advanced. Repository/VCS state reconciled (see *Repository state* below); automated documentation verification added (`stridelab-ai/scripts/validate-workflow-architecture.mjs` + GitHub Actions); MG-07 given an explicit authorization block; "no merge was performed" wording corrected to distinguish a VCS fact from a G7 approval. No workflow content, count, invariant, gate disposition, or OPEN item changed. Still `AWAITING HUMAN APPROVAL`; G7 still `PENDING`.

## Repository state (2026-09-07 reconciliation)

- Commit `393f60ce6ce59be23afd6c5290a7c39df7eb9ba7` (the v2 correction pass) is present on **both** `main` and the phase branch. It was committed directly — **there is no pull request and no G7 gate behind it**.
- **Its presence on `main` is a version-control fact only. It does NOT constitute G7 approval.** The Workflow Architecture v2 remains `AWAITING HUMAN APPROVAL` until a human explicitly approves it; nothing downstream (application code, schema, API, UI, navigation) may be built against it before then.
- The default branch is `main` (correct). The stale branch `phase-1/workflow-architecture-v1` holds no unique commits (identical SHA to `main`); its name contradicts the v2 artifact version and it is scheduled for deletion once the finalization PR is open.
- The finalization pass runs on `phase-1/finalize-workflow-architecture-v2` (from `origin/main`) and is offered as a pull request into `main`. That PR is **not** to be merged until G7 is granted.

## Gate record (post independent review)

Per the continuation instruction, the interim record was set conservatively (G1/G3 `FAIL — REVISION REQUIRED`, G2 `PENDING — REQUIRED`, G-D06 `PENDING VALIDATION`, overall `REVISE`) and held there until independent-review evidence supported advancing it. **Four independent reviews have now returned**, each citing inspected-artifact evidence; their conditions are folded into the artifacts. The gate record is advanced to:

| Gate | Disposition | Reviewer & evidence |
|---|---|---|
| G0 — Authority & Context | `PASS_WITH_CONDITIONS` | governed baseline + `stridelab-ai/registry/` + `stridelab-ai/application-map/` created; canonical entry point established. |
| G1 — Product / Workflow | `PASS_WITH_CONDITIONS` | Final **independent** cross-department + workflow-owner completeness review — verified all F-01…F-24 against file content, 86 contiguous IDs, normative decisions, §9.2 register format, invariant spot-checks, Actor-Matrix consistency → *APPROVE-WITH-CONDITIONS-recommendable*; the documentation-accuracy fixes it flagged (F-16 back-refs, broken `§G2` pointer, `OQ-PS07-JURISDICTION` default, capability phrasing, stale dir note) are applied. Conditions = §9.2 OPEN register (external policy/legal, safe defaults in force). |
| G2 — Architecture / Contracts | `PASS_WITH_CONDITIONS`, register **COMPLETE** (not `PENDING`) | Independent `architecture-reviewer` (`WORKFLOW-ARCHITECTURE-v2.md` §8c). Architectural judgement sound (no boundary change, dependency direction preserved on every seam, BE-05 defensible, no service extraction). The reviewer's register defects — 6 rows missing mandated fields, 4 unregistered seams, a broken pointer — were fixed: `stridelab-ai/application-map/cross-context-contracts.md` now has **14 contracts × 8 fields**. Conditions: contract *shapes* by D02/D03; `OQ-MEDIA-CACHE-INVALIDATION` (D03); BE-05 flag-interface shape; separate approved D06 entitlement artifact before BE-05 implementation. |
| G3 — Security / Privacy / Compliance | `PASS_WITH_CONDITIONS` | Independent Department 04 re-review (`WORKFLOW-ARCHITECTURE-v2.md` §8a.2). **No hard youth-safety / privacy / authorization boundary violated.** All ten targeted checks passed (tag≠access; comm-reach≠scope; DOB/age never to coaches/peers; profile not discoverable; multi-subject media blocked by default; PS-07 restricted-first; canonical Platform Safety Administrator; blocking does all seven behaviours; no surviving "guaranteed delivery"; coach cannot edit athlete performed-work truth). Conditions are external policy/legal/D03 (`OQ-MEDIA-CACHE-INVALIDATION`, `OQ-VS02-MULTISUBJECT` mechanism, `OQ-MG-OVERSIGHT`, jurisdiction items, retention durations, moderation staffing/SLA, `OQ-PF-MINOR-EXPORT`), each with a conservative default in force. |
| G-D06 — Commercial / Governance | `PASS_WITH_CONDITIONS` | **Independent** Department 06 review by a separate non-authoring reviewer (`WORKFLOW-ARCHITECTURE-v2.md` §8b). `payment ≠ authorization` confirmed intact — no `BE-*` arrow into any authorization-sensitive category, authority flows into billing only, BE-05 keeps authorization code off raw billing state. provider/prices/taxes/refunds/IAP/plan-limits/trial/grace **not approved by this artifact** — each now its own §9.2 row (`OQ-BE-PROVIDER/PRICING/TAX/IAP/TRIAL/…`). Additional conditions: `OQ-BE-TIER-STRUCTURE` (D06 ratification of Free/Mid/Top), `OQ-BE-BILLING-OWNER`, broadened `OQ-IT09-REFUND` (refund/dunning/cancellation policy). |
| G4 / G5 / G6 / G8 | `NOT_APPLICABLE` | no code/config/data change; not a release candidate; no production change. |
| G7 — Human Approval | `PENDING` | Cannot be self-approved by an AI agent. G7 has not been executed. Commit `393f60c` sits on `main` and the phase branch as a VCS fact only — that is not a G7 approval and no release/merge gate was run; the finalization PR into `main` must not be merged until a human grants G7. |

**Overall recommendation:** `AWAITING HUMAN APPROVAL`. G1, G2, G3, and G-D06 have each independently passed with conditions that are genuinely external policy / legal / commercial-governance / D02-D03 implementation-design matters, each protected by a conservative safe default; G2's contract register is complete and not `PENDING`; no reviewer found a hard boundary violation. The acceptable-final-state criteria for this continuation are met. G7 (human approval) remains outstanding.

## Findings F-01…F-24 — closure matrix

Full matrix with per-finding detail is in `docs/product/workflow-architecture.md` (§Closure). Summary: **all 24 findings closed.**

| Finding | Severity | Change made | Primary artifact(s) | Verification | Resulting status |
|---|---|---|---|---|---|
| F-01 | BLOCKING | `profile/` category; PR-03 visibility model made normative (not discoverable; peers min identity; coach = current role + scope; DOB/age restricted to identity + safety) | `profile/WORKFLOWS.md`, v2 §9.1, product-baseline §3 | grep PR-01…03; §9.1 table; D04 re-review §8a.2 | Closed |
| F-02 | BLOCKING | IT-09 five-state archive-first Team-closure lifecycle + DD-DEPARTED-CONTENT | `identity-team/WORKFLOWS.md` | grep IT-09; state machine present | Closed |
| F-03 | BLOCKING | VS-02 normative: in-scope-coach only; athlete-to-athlete disabled; multi-subject onward re-share blocked by default | `vault-sharing/WORKFLOWS.md`, `media/WORKFLOWS.md` | UNCONFIRMED language removed; §9.1 | Closed |
| F-04 | BLOCKING | MG-05: visibility-broadening attachment creates a formal VS-02/MD-06 record; pending until server-confirmed | `messaging/WORKFLOWS.md` | authorization-assumptions rewrite; §8c contract 4 | Closed |
| F-05 | MAJOR | G2 routed to an **independent** `architecture-reviewer`; architectural judgement sound; the reviewer's register defects (6 rows missing fields, 4 unregistered seams, broken `§G2` pointer) fixed → **14 contracts × 8 fields** | v2 §8c, `application-map/cross-context-contracts.md` (authoritative matrix) | register COMPLETE, not PENDING; reviewer verdict PASS_WITH_CONDITIONS | Closed |
| F-06 | MAJOR | Independent Department 06 review of BE-01…06 (non-authoring reviewer) | v2 §8b, `billing-entitlements/WORKFLOWS.md` header | disposition + conditions recorded | Closed |
| F-07 | MAJOR | PS-07 corrected — `restricted_pending_review` first; governed closure only on confirmation; audited restoration | `privacy-safety/WORKFLOWS.md` | state machine; §8a.2 | Closed |
| F-08 | MAJOR | SE-09 reconciliation workflow (state machine + non-loss/attribution guarantees) | `session-execution/WORKFLOWS.md` | grep SE-09 | Closed |
| F-09 | MAJOR | PS-08 Data Subject Request Intake | `privacy-safety/WORKFLOWS.md` | grep PS-08 | Closed |
| F-10 | MAJOR | Canonical `Platform Safety Administrator` (least-privilege, D04); Head-Coach bypass; PS-09 preserve+restrict+route | `privacy-safety/WORKFLOWS.md`, `messaging/WORKFLOWS.md` | name used everywhere; grep confirms no stray old name | Closed |
| F-11 | MAJOR | VS-01 = explicit server-authoritative grant (renamed "Grant Tagged Athlete Vault Access"); not automatic | `vault-sharing/WORKFLOWS.md`, `media/WORKFLOWS.md` | rename + state machine; §9.1 | Closed |
| F-12 | MAJOR | Every literal "guaranteed delivery" replaced with the transactional-state/retry/idempotent/ack/audited-failure/human-escalation model; safety class un-disable-able | invariant #14, `messaging/`, `media/`, `privacy-safety/` | grep "guaranteed delivery" → 0 in workflow files | Closed |
| F-13 | MINOR | All navigation-shaped "Entry point" fields → capability-based "Capability / trigger" across all 13 category files | all `*/WORKFLOWS.md` | grep "Entry point" → residual only in state-based cases | Closed |
| F-14 | MINOR | TA-07 / PW-01…03 "assumes yes"/"potentially edit" removed; personal-workout-on-disable behaviour normative | `team-administration/`, `personal-workouts/` | grep "assumes yes" → 0 | Closed |
| F-15 | MINOR | TP-06 / AN-07 / PF-01 made normative; duplicate confirmation questions removed | `training-planning/`, `analysis/`, `performance/` | "flagged for confirmation" removed | Closed |
| F-16 | MINOR | Single DD-DEPARTED-CONTENT decision in `identity-team/WORKFLOWS.md`; back-references added to TA-01 (Head Coach transfer re-ownership) and MD-07 (media disposition) after the final review found them claimed-but-missing — now referenced from IT-06, IT-08, IT-09, TA-01, MD-07 | `identity-team/`, `team-administration/`, `media/` | grep confirms all 5 back-references resolve | Closed |
| F-17 | MAJOR (reclassified) | Blocking behaviour specified normatively (MG-01/02/03/06) | `messaging/WORKFLOWS.md` | MG-06 rewrite; §9.1 | Closed |
| F-18 | MINOR | Event Coach removed from TA-04 (+ TA-02/03, IT-03/06) authority; Actor Matrix aligned | `team-administration/`, `identity-team/`, v2 §2 | actors lines updated | Closed |
| F-19 | MINOR | MG-07 Notification Preferences (safety/operational/social classes) | `messaging/WORKFLOWS.md` | grep MG-07 | Closed |
| F-20 | INFORMATIONAL | Governed baseline + `stridelab-ai/registry/` + `stridelab-ai/application-map/` created | `docs/product/product-baseline.md`, `stridelab-ai/registry/*`, `stridelab-ai/application-map/*` | files exist | Closed |
| F-21 | INFORMATIONAL | Canonical location reconciled — `docs/product/workflow-architecture.md` authoritative; supporting spec subordinate; domain-model stub | `docs/product/*` | files exist + cross-links | Closed |
| F-22 | INFORMATIONAL | Overstated v1 D04-completeness claim corrected; independent D04 re-review §8a.2 supersedes it | v2 §8a.2 | wording present | Closed |
| F-23 | MAJOR (reclassified) | SE-10 Athlete Post-Finalization Correction (audited amendment, original preserved, reason mandatory) | `session-execution/WORKFLOWS.md` | grep SE-10 | Closed |
| F-24 | INFORMATIONAL | Preservation checklist added; all listed strengths verified intact | `docs/product/workflow-architecture.md` §F-24 checklist | checklist present | Closed |

## Decisions converted from OPEN to normative in v2

See `WORKFLOW-ARCHITECTURE-v2.md` §9.1 (full table) and `docs/product/workflow-architecture.md`. Headlines: profile ownership + non-discoverability + visibility model; tag ≠ grant (explicit server-authoritative Vault grant); coach-share-in-scope-only + athlete-to-athlete-disabled + multi-subject-not-broadly-shared; chat-attachment formal record; Team-closure five-state archive-first lifecycle; DD-DEPARTED-CONTENT; personal-workout-on-disable behaviour; scope-change effects; Event-Coach-cannot-administer; blocking behaviour; finalized-session athlete correction path; under-13 restricted-first; canonical Platform Safety Administrator; notification-state model; communication-reach ≠ any-other-scope.

## Remaining legitimate OPEN decisions

All external policy / legal / implementation matters, each with a stable ID, owner, evidence-required note, **safe default in force**, affected workflows, and blocking stage. Full register: `WORKFLOW-ARCHITECTURE-v2.md` §9.2. None was converted into an assumption or an approved decision; none is an approved legal interpretation.

## Blockers

- No BLOCKING or MAJOR independent-review finding remains open — F-01…F-24 all closed, and each of the four independent reviews returned PASS_WITH_CONDITIONS (or *APPROVE-WITH-CONDITIONS-recommendable*) with the conditions folded in.
- The remaining conditions on G1/G2/G3/G-D06 are external policy/legal/commercial-governance/D02-D03 implementation-design decisions with conservative safe defaults; they gate specific implementation sub-areas, not this artifact's approval.
- G7 (human approval) is the only remaining approval blocker and cannot be self-granted. Commit `393f60c` being present on `main` is a version-control fact, not an approval; no G7/release gate was run and the finalization PR must not be merged until a human grants G7.

## Next action

Present `docs/product/workflow-architecture.md` (canonical), `docs/product/product-baseline.md`, and the supporting spec for explicit human approval (G7). On approval: update this record to `APPROVED`; resolve the §9.2 OPEN register with the named owners as separate work packages; hand the §8c contract register to Departments 02/03 for contract-shape design; require a separate approved Department 06 commercial artifact before any billing implementation.
