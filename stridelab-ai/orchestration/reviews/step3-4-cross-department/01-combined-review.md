# Combined cross-department review — Department 01 Step 3 (Information Architecture) + Step 4 (Navigation Specification)

Per the task's instruction, this is **one combined review event** with the ten required participants, run after both artifacts existed in reviewable, Step-3-gated form. It reviews the actual artifacts (`docs/product/information-architecture.md`, `docs/product/navigation-specification.md`), not summaries, against the specific anti-pattern checklist the task names.

**Scope:** both artifacts in full. **Authoritative inputs:** `feature-prioritization.md`, `mvp-release-scope.md`, `domain-model.md`, `product-baseline.md`, `workflow-architecture.md` + `WORKFLOW-ARCHITECTURE-v2.md`, `ARCHITECTURE.md`, `stridelab-ai/application-map/`, the Step 3 gate evidence (`stridelab-ai/orchestration/reviews/step3-information-architecture/`).

---

## Checklist walkthrough

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Unreachable MVP capabilities | **Finding raised — CDR-N1** | see below |
| 2 | Navigation based on revoked decisions | **CLEAR** | grep of the repository confirms the only "revoked navigation decision" language is the standing invariant-#11 / finding-F-13 authority-order rule (`product-baseline.md` §7, `feature-prioritization.md` F-EX-5, `workflow-architecture.md` §10) — there is no prior concrete navigation artifact anywhere in the repository (no `docs/product/navigation*.md` existed before this work package) for this artifact to have revived. Every IA/Nav decision is derived fresh from the approved Step 1/2 artifacts, never from any superseded design. |
| 3 | Team or role leakage | **CLEAR** | IA §5.2, §7 explicitly forbid leakage via labels/counts/search/breadcrumbs/recent/notifications; Nav §5.2 (search results state), §6 (permission-denial state), §9 (restricted/administrative placement) all re-state and structurally enforce it; D04-IA-N2 (count-leak) already remediated in IA §7 |
| 4 | Event Coach overreach | **CLEAR** | IA §2.1 O-02a/b, §4.1 D-15 (absent, not disabled, for Event Coach); Nav §3.2 explicitly separates "reach" (Team-wide messaging) from "scope" (assigned groups only) with its own dedicated context-marker rule (Nav §8) |
| 5 | Coach access to athlete-owned profile editing | **CLEAR** | IA §2.1 O-05 states coach/admin edit of an athlete profile is structurally absent, not merely denied at submit time; Nav inherits this via the destination-to-navigation mapping (§6) — no edit control is ever rendered for a coach viewing an athlete's O-05 |
| 6 | Vault treated as a Team-wide feed | **CLEAR** | IA §2.3/§3.7 explicitly keep Vault (D-07) as a query-time union of O-14/O-15 only, never Team/group-membership-derived; Publication (O-13) is explicitly barred from reusing Vault chrome (IA §2.3) |
| 7 | Search revealing inaccessible objects | **CLEAR** | IA §7 (identical empty-result wording for zero-match vs. unauthorized; count-leak rule); Nav §5.2 search-results state restates it as a navigation-level guarantee |
| 8 | Payment or tier state used as authorization | **CLEAR, with a structural enforcement gap — Finding CDR-N2** | see below |
| 9 | Offline state shown as server-confirmed success | **CLEAR** | IA §2.5 O-30 and Nav §5.4 (pending-synchronization state) both require honest "Saved on this device" wording distinct from server-durable "Saved," directly implementing invariant #13 |
| 10 | Team and training hierarchies collapsed together | **CLEAR** | IA §3.1–§3.3 model them as three independent hierarchies (org, training-time, execution) with an explicit "Personal Workout is not in this hierarchy at all" callout; the "Personal" chip (Nav §7) gives users a persistent visual/VoiceOver-labelled distinction |
| 11 | Media tagging, sharing, publication, and Vault visibility conflated | **CLEAR** | IA §2.3/§3.4 keep Tag/Grant/Share/Publication as four independent record types with four independent destinations/actions; Nav §7 gives each its own distinct action label and explicitly warns against a combined tag+share step |
| 12 | Ambiguous creation actions | **CLEAR** | Nav §7 (creation/start-action model) names the exact mode (planning/execution/recording/analysis/sharing/communication) for every listed task, with an explicit disambiguation rule per row |
| 13 | Missing back or recovery behavior | **CLEAR** | IA §6, Nav §5 (every state names entry/exit/back/recovery) |
| 14 | Gesture-only navigation | **CLEAR** | Nav §4.2 sidebar-collapse uses a tappable toggle (not an edge-swipe-only gesture); Nav §2 accessibility principle requires pointer-free operability on every navigation control, re-affirmed for D-28/D-22 (A11Y-IA-N2) in Nav §10 |
| 15 | Department structure reflected in the UI | **CLEAR** | IA §1.5 records this as an explicit modelled rule; sidebar/tab groupings (Nav §4) are organized by object domain (Team, Plan, Media, Messages, Performance) which does not correspond 1:1 to any Department boundary — e.g., Media/Vault/Analysis are one Department's ownership (D01) split across three destinations by *object type*, while Team Administration and ordinary Team browsing are the *same* Department's ownership split by *audience/purpose* (administrative vs. content) |
| 16 | One shell forced onto incompatible form factors | **CLEAR** | Nav §4.2/§4.3 define genuinely different shells (three-column split view vs. 5-tab bar with deeper grouping), grounded in current Apple HIG sourcing (Nav §4.1), not a single shell scaled down |
| 17 | Deferred functionality accidentally pulled into MVP | **CLEAR** | IA §1.4 explicitly enumerates every Post-MVP/Excluded temptation point and marks it **[not modelled]**; cross-checked line-by-line against `feature-prioritization.md` §4 Post-MVP/Excluded tables — no F-P-* or F-EX-* ID appears as a live (non-conditional, non-"not modelled") destination or object anywhere in either artifact |

### CDR-N1 — Unreachable MVP capabilities (validator gap, not a content gap)

**Finding:** F-42 (BE-05 entitlement derivation interface) is MVP-conditional and, per `mvp-release-scope.md` §6.1, correctly has **no v1 UI surface at all** — it is a system-only, build-time concern. A naive reachability check (every MVP-required/-conditional feature ID must map to a destination) would incorrectly flag F-42 as "unreachable," when in fact its absence from the destination map is the **correct** design per the approved scope. Likewise S-01, S-02, S-03, S-05, S-06, S-07, S-08, S-09, S-13 are cross-cutting/system capabilities with no direct destination by design (IA §1.8 last row explicitly says so).

**Remediation applied:** `information-architecture.md` §1.8 already lists F-42 with destination "— (no v1 UI surface)" and the cross-cutting `S-*` row with "cross-cutting — see §2.5" rather than a fabricated destination — this was already correct in the drafted artifact. The **process** gap is in the *validator*: `stridelab-ai/scripts/validate-step3-4-artifacts.mjs` must special-case F-42 and the listed system-only `S-*` IDs as "intentionally no destination" rather than either (a) silently ignoring them (which would let a genuinely unreachable feature slip through undetected) or (b) flagging them as false-positive errors. **Applied in the validator** (§ "system-only / no-UI-surface allowlist," sourced directly from `mvp-release-scope.md` §6.1's own F-42 deferral language and §9.6/§10's system-capability list — not invented here).

- **Severity:** non-blocking (the artifacts themselves are correct; this is a validator-implementation instruction, executed before this review closes).
- **Owner:** root orchestrator (validator authorship, this work package).
- **Disposition:** closed by validator construction (see `validate-step3-4-artifacts.mjs`).

### CDR-N2 — Payment/tier state as authorization: content is correct, structural proof needs to exist

**Finding:** IA §2.5 O-29 and Nav §9 both state, in prose, that the tier-state field must never appear "inside, or adjacent to, any authorization/permission/feature-availability decision surface." This is the correct design rule, and manual inspection of both destination maps (`information-architecture.md` §4, `navigation-specification.md` §6) confirms no such adjacency currently exists — D-15's tier-state row is grouped only with other Team-configuration fields, never with role/scope/assignment controls. However, the artifacts describe this as a design intent; nothing yet **proves** it the way `stridelab-ai/scripts/validate-step2-artifacts.mjs`'s S-02 checks proved the equivalent code-level rule for Step 2.

**Remediation applied:** `validate-step3-4-artifacts.mjs` adds a check that the tier-state object (`O-29`) is never named in the same destination-map row, table, or contiguous prose block as an authorization/permission/role/scope keyword — implemented as a structural adjacency check against the actual Markdown tables in both files (not a fragile whole-document sentence search), consistent with the task's "prove ID relationships" instruction from the prior Step 2 work.

- **Severity:** non-blocking (no violation exists today; this closes the gap between "we said we wouldn't" and "we can prove we didn't").
- **Owner:** root orchestrator (validator authorship, this work package).
- **Disposition:** closed by validator construction.

---

## Per-reviewer disposition

| Reviewer | Disposition | Basis |
|---|---|---|
| Department 01 `product-experience-lead` | PASS WITH CONDITIONS | product coherence confirmed; conditions = IA §1.6/§10 carried items |
| Department 01 `ux-architect` | PASS WITH CONDITIONS | author's own artifacts, cross-checked against the checklist above with two process findings (CDR-N1/N2), both closed by validator construction |
| Department 01 `domain-workflow-architect` | PASS WITH CONDITIONS | hierarchy/aggregate fidelity confirmed (checks 6, 10, 11 above); IA-OQ-4 stands as the one live new open item, D04-owned |
| Department 01 `ux-research-accessibility-reviewer` | PASS WITH CONDITIONS | checks 13, 14 above confirmed; A11Y-IA-N1/N2 both applied/carried correctly |
| Department 02 (iOS/iPadOS client engineer) | PASS WITH CONDITIONS | check 16 confirmed; D02-IA-N1/N2 conditions (iPhone grouping engineering confirmation, offline-index threshold) carried to G4, already structurally resolved in Nav §4.3 |
| Department 03 (backend/search/data) | PASS WITH CONDITIONS | check 7 confirmed; D03-IA-N1 (index-maintenance technique) and IA-OQ-1 carried to G4 |
| Department 04 (authorization/privacy/youth-safety) | PASS WITH CONDITIONS | checks 3, 4, 5, 6, 8, 9 confirmed; IA-OQ-4 ratified as the one live condition |
| Department 05 (quality) | PASS WITH CONDITIONS | confirms `navigation-specification.md` §10's validation table is evidence-backed (traces to IA §9 and the J-1…J-13 coverage proof already machine-checked in Step 2), not an assertion; recommends the validator (below) be wired into CI before this package is treated as G4-ready, which is done in this same work package |
| `architecture-reviewer` | PASS WITH CONDITIONS | confirms no bounded-context boundary, dependency direction, or seam is implied or changed by the destination/navigation grouping (check 15); `services/media-worker` remains the only deployable workload referenced (IA §2.3 S-06 cross-reference) |
| Cross-department adversarial reviewer | PASS WITH CONDITIONS | performed the full checklist above independently; concurs with CDR-N1/N2 as the only findings worth raising; found no additional blocking or non-blocking issue beyond what the per-artifact Step 3 reviews and this checklist already surfaced |

**Zero BLOCKING findings.** Both raised findings (CDR-N1, CDR-N2) are process/validator-construction items, not content defects, and are closed within this same work package by `stridelab-ai/scripts/validate-step3-4-artifacts.mjs`.

## Downstream effect

`information-architecture.md` and `navigation-specification.md` are confirmed ready for the combined G7 decision package (`navigation-specification.md` §12). The validator changes described in CDR-N1/N2 are implemented before this review is treated as closed (verified in the final validation battery, recorded in the completion report).
