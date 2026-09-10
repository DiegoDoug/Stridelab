# Independent D02 specialist review — Step 2 (feature prioritization + MVP release scope)

**Reviewer identity:** Independent D02 specialist reviewer (subagent), 2026-09-10 — did not author the artifacts.
**Disposition (first pass):** `FAIL` — driven solely by **D02-IND-B1** (cheap to remediate).
**Disposition (after orchestrator remediation, 2026-09-10):** expected `PASS_WITH_CONDITIONS` — a D02 re-review is queued (`§13.11`).

## Scope

iOS/iPadOS client feasibility; offline honesty (invariant #13; "no UI shell counts as done"); INC-0…INC-11 sequencing (implementable, dependency-correct, acyclic); the INC-3 / INC-3a / INC-3b restructure; F-17 (XL) scoping; S-12 placement + per-increment verification; §12 client-verifiability; whether any increment can pass "done" with authz/persistence/sync absent; the F-10 / F-42 reclassification from a client-build standpoint.

## Authoritative inputs

`ARCHITECTURE.md`; `WORKFLOW-ARCHITECTURE-v2.md` §6 (offline-critical) + §7; `stridelab-ai/application-map/bounded-contexts.md`; `REVIEW-CONTRACT.md`.

## Evidence inspected

`mvp-release-scope.md` §4 devices, J-12/J-13, §9.3, §9.4, INC-0…INC-11, §10.1 graph, §11.1 gates, §11.3, §12; `feature-prioritization.md` F-17 (=XL), the F-10 / F-42 records, S-12; `WORKFLOW-ARCHITECTURE-v2.md` §6, `OQ-SE-RECONCILE-UX` / `OQ-SE-OFFLINE-P2P`.

## Blocking findings

- **D02-IND-B1** — "S-12 verified per increment" was **asserted but not operationalized**: INC-0's acceptance-evidence bullet contained no S-12 (or S-01) test; the G5 exit criteria named only offline-reliability / performance and never accessibility; and of the feature increments only INC-7 listed `ux-research-accessibility-reviewer`. A scope-lock artifact's acceptance framework internally contradicted itself on an MVP-required, youth-relevant capability, deferring VoiceOver / Dynamic Type / hit-target / captions verification to final MVP-completion with no incremental gate.
  - **Orchestrator remediation (2026-09-10):** §10 shared-fields paragraph now makes S-12 an explicit **per-increment G5 exit gate** for INC-1…INC-10, verified by `ux-research-accessibility-reviewer`; §11.1 **G5 exit criteria** now include the accessibility clause "not deferred to §11.3 (D02-IND-B1)"; **INC-0 acceptance evidence** now includes S-01 and an S-12 checklist-authored + dry-run item; `ux-research-accessibility-reviewer` added to the collaborator list of INC-1, INC-2, INC-3, INC-4, INC-5, INC-6, INC-8, INC-9, INC-10 (INC-7 already had it). → **remediated; D02 re-review pending.**

## Non-blocking findings

- **D02-IND-N1** — INC-8 bundles F-26/F-27/F-30 (tier 1) with F-28 (tier 4), forcing all messaging behind the INC-5→INC-6 media/Vault chain. Consider mirroring the INC-3 split (INC-8a channels/DM/prefs, INC-8b attachments). *(Tracked §13.10; not restructured now — F-28 is a small slice and the F-22-joint-block already gates the attachment path.)*
- **D02-IND-N2** — the "INC-3a not externally exposed until INC-3b passes" bar had no named gate owner. *Remediation:* INC-3 "Conditions that block the next increment" now names **D05** as the gate owner, tied to the INC-3b G5 pass.
- **D02-IND-N3** — INC-3b ships F-17 with `OQ-SE-RECONCILE-UX` still open; "done" should be qualified. *Remediation:* INC-3 conditions now state the conflict-presentation UI is **functional-but-provisional**; only the state machine + non-loss/attribution guarantees are "done".
- **D02-IND-N4** — S-04's INC-0 "core state model" is not enumerated though INC-5/6/7/8 depend on it. *(Tracked §13.10 for INC-0 G4 detail.)*
- **D02-IND-N5** — the INC-2 acceptance clause "in-progress → SE-09 (verified against INC-3)" is a forward reference not verifiable at INC-2 G5. *(Tracked; re-worded to "asserted at INC-2, verified at INC-3b".)*
- **D02-IND-N6** — several §12 rows are D03/D05 code/infra assertions, not client-observable; §12 does not distinguish client-verifiable from server-only acceptance. *(Tracked §13.10 for a §12 annotation pass.)*
- **D02-IND-N7** — F-10 and F-42 reclassification to `MVP conditional` is **client-reasonable**: F-10 is a pure convenience layer over F-09/F-11 with no invariant dependency; F-42 is near-zero iOS work and the invariant-#9 clause is better carried by the S-02 build-time lint in INC-0. No client-side objection.

## Conditions

| Condition | Owner | Stage | Safe default | Consequence if unmet |
|---|---|---|---|---|
| S-12 acceptance items in INC-0 + accessibility in G5 exit + `ux-research-accessibility-reviewer` in every feature increment's gate list | D01 + D05 | before G7 (applied) | none — currently unverified | B1 stands; late accessibility backlog |
| Fix the F-10 activation decision before INC-2 client UI design starts, not only at INC-2 G4 | D02 + D03 | INC-2 G1→G4 | no template UI; F-09 + F-11 only | UI rework if decided mid-increment |
| Pin minimum iOS/iPadOS version against the S-03 offline-store, background-capture, and PencilKit API floors before INC-0 G4 (extends D02-N2) | D02 | INC-0 G4 | latest-2 major | substrate built against later-removed APIs |
| Assign a release-gate owner to the "INC-3a not externally exposed until INC-3b" bar | D05 | INC-3b G5 (applied) | treat INC-3a as internal-only | unenforced offline-honesty exposure |

## Downstream effect

Sequencing is otherwise sound — INC-0…INC-11 is implementable, acyclic, and dependency-correct; the INC-3a/INC-3b split correctly answers the F-17 "UI-that-logs-but-does-not-reconcile" risk; F-17's XL scope is honestly flagged and isolated; F-10/F-42 reclassification is client-reasonable. The FAIL was driven solely by D02-IND-B1, now remediated; non-blocking findings feed INC-2/INC-3/INC-8 G4 implementation-design.
