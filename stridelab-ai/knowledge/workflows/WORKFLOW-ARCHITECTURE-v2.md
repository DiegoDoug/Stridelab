# StrideLab Workflow Architecture v2 — Supporting Specification Index

**Authoritative entry point:** `docs/product/workflow-architecture.md` (canonical). This file and the 13 category files under `stridelab-ai/knowledge/workflows/*/WORKFLOWS.md` are the **supporting specification**; where any wording here and the canonical entry point differ, the canonical entry point governs.

**Status:** `AWAITING HUMAN APPROVAL` (conditional — see §Gate summary).
**Owning Department:** 01 Product & Experience (`domain-workflow-architect`, reviewed by `product-experience-lead`).
**Skills applied:** `domain-modeling`, `workflow-architecture`.
**Independent reviews for v2:** `architecture-reviewer` (G2), Department 04 (`security-compliance-reviewer`, G3), Department 06 (`operations-governance-reviewer`, billing), `cross-department-reviewer` (synthesis).

## Version history

- **v1 draft (2026-09-05)** — 76 workflows, 12 categories. Uncommitted; never approved. Superseded.
- **v1 remediation pass (2026-09-06)** — applied BLOCKING/MAJOR findings F-01…F-12 from the first independent review; added the `profile/` category and IT-09, SE-09, PS-07, PS-08, PS-09 (84 workflows). Superseded.
- **v2 correction pass (2026-09-06)** — this version. Applied the authorized product decisions (converting v1 OPEN items to normative), completed findings F-13…F-24, added SE-10 and MG-07 (86 workflows), advanced the artifact to v2 with `docs/product/workflow-architecture.md` as the canonical entry point, created the governed product baseline, registry, and application-map records, completed G2 through `architecture-reviewer`, and ran an independent Department 06 review.

---

## 1. Workflow Inventory (86 workflows, 13 categories)

| Category | File | Workflow IDs | Count |
|---|---|---|---|
| Identity & Team | `identity-team/WORKFLOWS.md` | IT-01…IT-09 | 9 |
| Profile | `profile/WORKFLOWS.md` | PR-01…PR-03 | 3 |
| Team Administration | `team-administration/WORKFLOWS.md` | TA-01…TA-07 | 7 |
| Training Planning | `training-planning/WORKFLOWS.md` | TP-01…TP-08 | 8 |
| Practice / Session Execution | `session-execution/WORKFLOWS.md` | SE-01…SE-10 | 10 |
| Personal Workouts | `personal-workouts/WORKFLOWS.md` | PW-01…PW-03 | 3 |
| Media Capture & Library | `media/WORKFLOWS.md` | MD-01…MD-07 | 7 |
| Video Analysis | `analysis/WORKFLOWS.md` | AN-01…AN-07 | 7 |
| Vault & Sharing | `vault-sharing/WORKFLOWS.md` | VS-01…VS-04 | 4 |
| Communication | `messaging/WORKFLOWS.md` | MG-01…MG-07 | 7 |
| Performance & History | `performance/WORKFLOWS.md` | PF-01…PF-06 | 6 |
| Billing / Entitlements | `billing-entitlements/WORKFLOWS.md` | BE-01…BE-06 | 6 |
| Privacy / Safety | `privacy-safety/WORKFLOWS.md` | PS-01…PS-09 | 9 |
| **Total** | | | **86** |

- **PS-01–PS-06** and **VS-04** are cross-cutting framing / checkpoint entries.
- **PS-07, PS-08, PS-09, SE-09, SE-10, MG-07, IT-09** carry their own state machines.
- **SE-10** (Athlete Post-Finalization Correction) and **MG-07** (Notification Preferences) were added in the v2 pass (findings F-23, F-19).

---

## 2. Actor Matrix

| Actor | Primary categories | Notes |
|---|---|---|
| Prospective user / Account owner | identity-team, profile | Global account lifecycle (IT-01, IT-07, IT-08); **owns and solely edits their own profile** (PR-01/PR-02); date-of-birth/age evidence is theirs and the identity/safety subsystem's only (PR-03). |
| Head Coach / Team Creator | identity-team, team-administration, training-planning, media, billing-entitlements, messaging, privacy-safety | Sole authority in v1 for role assignment (TA-01), Event Coach assignment (TA-05), athlete assignment (TA-04), Event Group/Subgroup administration (TA-02/TA-03), invitations (IT-03), member removal (IT-06), `personal_workouts_allowed` (TA-07), tier selection (BE-01/03/04), Team closure (IT-09). Cannot adjudicate reports implicating themselves (auto-routed to the Platform Safety Administrator), under-age determinations (PS-07), or ordinarily revoke another member's Vault grant (VS-03 — routes via moderation). Retains full Team-authorized performance scope. |
| Event Coach | training-planning, session-execution, media, analysis, messaging | Management scope strictly bounded to currently-assigned Event Groups/Subgroups (TA-04/TA-05). **Team-wide *communication* reach (MG-04) does NOT widen tagging, Vault sharing, structured feedback, analysis, profile visibility, performance visibility, or management scope** (v2 cross-cutting rule, invariant #15). Cannot assign athletes or administer groups in v1 (`CD-EC-DELEGATION`). |
| Athlete | session-execution, personal-workouts, media, analysis, vault-sharing, messaging, performance, profile | Owns personal profile and personal-workout data outright; sole editor of own profile (PR-02); consumer (not author) of coach-prescribed training; sole author of PW-*, SE-05/06/07 logs; retains an audited post-finalization correction path to their own performed-work truth (SE-10); always retains full access to their own data. Athlete-to-athlete media sharing is disabled in v1. |
| Tagged/granted Athlete | vault-sharing | Vault visibility is per-artifact and requires a **distinct, server-authoritative grant** by the media owner (VS-01) — being tagged (MD-05) is identification only and never grants access. |
| **Platform Safety Administrator** | privacy-safety (PS-03, PS-07, PS-09), messaging (MG-06 escalation), vault-sharing (VS-03 moderation) | The **canonical least-privilege platform actor**, owned by Department 04. Sits outside any Team hierarchy. Sole authority for under-age determinations (PS-07 — `restricted_pending_review` first, never immediate global termination), illegal-content / imminent-harm cases (PS-09 — access-restrict, protect from redistribution, securely preserve, route to qualified safety/legal review), and reports implicating a Head Coach. Staffing, SLA values, and classification thresholds are OPEN; the role, remit, and mandatory bypass routes are fixed. |
| StrideLab platform / operations | billing-entitlements (BE-02/06 provider integration), support intake (PS-08) | Commercial/provider integration and data-subject-request intake; distinct from the Platform Safety Administrator. |
| Department 04 (Security, Identity & Compliance) | privacy-safety, media, vault-sharing, messaging, identity-team, profile, billing-entitlements | Policy owner for every remaining OPEN item touching authorization, minors, retention, or legal exposure. |
| Department 06 (Business Operations & Governance) | billing-entitlements, PS-08 intake, IT-09 commercial teardown | Owns billing/entitlement decision content and support-operations intake; ran an **independent** review of BE-01…BE-06 for v2 (§8b). |

---

## 3. Workflow Dependency Graph

```text
identity-team (IT-01..09)  ── IT-09 archive-first Team closure ──
   │  (Team + membership must exist)
   ├─────────────► profile (PR-01..03)   (user-owned; PR-03 visibility model is normative:
   │                                      not discoverable; peers get min Team identity;
   │                                      coach access = current role + management scope;
   │                                      DOB/age restricted to identity + safety functions)
   ▼
team-administration (TA-01..07)   (Head Coach owns roles, groups, assignment, personal_workouts_allowed)
   ├──────────────────────────────┬───────────────────────────┐
   ▼                              ▼                            ▼
training-planning (TP-01..08)   personal-workouts (PW-01..03)  billing-entitlements (BE-01..06)
   │  (TP-06 scope-narrowing normative)                        │  (feature availability only,
   ▼                                                            │   never authorization; BE-05
session-execution (SE-01..10)                                   │   single entitlement source)
   │  (SE-09 reconciliation; SE-10 audited athlete             ▼
   │   post-finalization correction)                    entitlement checks feed feature availability
   ├─────────────┬───────────────────────┐
   ▼             ▼                       ▼
performance      media (MD-01..07)   messaging (MG-01..07)
(PF-01..06)         │                    │  (MG-06 blocking normative; MG-07 notification
current-scope-only  ▼                    │   preferences: safety class cannot be disabled)
for coaches   analysis (AN-01..07)       │
                    │                    │
                    ▼                    │
              vault-sharing (VS-01..04)◄─┘ (MG-05 attachment → formal VS-02 share OR MD-06
                    │                        publication; VS-01 explicit server-authoritative
                    ▼                        grant; multi-subject youth media not peer-reshared
           privacy-safety (PS-01..09)        or broadly published by default)
        (PS-03/07/09 route to the Platform Safety Administrator;
         PS-07 restricted_pending_review first; PS-09 preserve + restrict + route)
```

Deliberate absences preserved: **billing-entitlements has no arrow into any authorization-sensitive category** (payment ≠ authorization); **communication reach does not connect to management/media/feedback/profile scope**.

---

## 4. Major Lifecycle Relationships

- **Team hierarchy lifecycle:** Team (IT-02) → Event Group (TA-02) → Subgroup (TA-03) → Athlete assignment (TA-04); the final Head Coach must transfer ownership (TA-01a) or run Team Closure (IT-09), which is `active → closure_pending → archived → deletion_eligible → deleted_or_anonymized` (archive-first, recoverable before the irreversible stage).
- **Profile lifecycle:** IT-01 shell → PR-01 populate → PR-02 self-edit only → PR-03 visibility resolution (normative model).
- **Session lifecycle:** TP-04 published/assigned → SE-01 start → SE-02..07 capture → SE-08 finalize (locks *prescribed structure* only) → PF-* history; divergence → SE-09 reconciliation; an athlete's later correction of their own performed-work truth → SE-10 (audited, original preserved).
- **Media visibility lifecycle:** capture/import (MD-01/02) → private draft (MD-03) → [attach (MD-04) | tag (MD-05, identification only)] → **explicit server-authoritative Vault grant** (VS-01) or **explicit in-scope-coach share** (VS-02) or **consent-gated Team publication** (MD-06) → revocable (VS-03) → MD-07 lifecycle end.
- **Membership lifecycle:** invitation (IT-03, Head-Coach-only) → join (IT-04, direct-invitation-only in v1) → role/assignment changes → departure (`member_left`) or removal (IT-06); content disposition on any departure follows **DD-DEPARTED-CONTENT** (athlete-owned data stays with the athlete; Team plans/records stay with the Team; access ends immediately; no cascading deletion).
- **Commercial lifecycle:** tier (BE-01) → trial/subscription (BE-02) → upgrade/downgrade (BE-03/04) or failed payment (BE-06) → entitlement recomputation (BE-05); never touches authorization.
- **Safety escalation lifecycle:** report/block (MG-06/PS-02) → Head Coach for ordinary reports → **structural bypass to the Platform Safety Administrator** for Head-Coach-implicated or illegal/imminent-harm reports (PS-03 → PS-09, preserve + restrict + route). A discovered under-age account (PS-07, restricted-first) and a data-subject request (PS-08) run alongside.

---

## 5. Cross-Workflow Invariants

1. **Hierarchy invariant:** Team → Event Group → Subgroup → Athlete; membership/assignment metadata is distinct from personal-profile data.
2. **Role invariant:** exactly one Head Coach / Team Creator per Team at all times; role is Team-scoped, never implicitly shared across a user's other Teams.
3. **Event Coach scope asymmetry:** management scope (TA-04/TA-05-bounded) is narrower than communication reach (Team-wide, MG-04) — both approved, never conflated.
4. **Coach edit boundary:** coaches/administrators cannot edit athlete-owned personal-profile data (PR-02) or personal-workout data (PW-03). SE-08 finalization locks the prescribed Session structure but not the athlete's performed-work truth — the athlete keeps the audited SE-10 correction path. SE-09 reconciliation never lets a coach overwrite an athlete's logged data.
5. **Prescription/performance distinction:** a coach-authored Session (TP-04) and an athlete's performed-work log (SE-05/06/07, SE-10) are always separate records.
6. **Personal-workout non-elevation:** `personal_workouts_allowed` grants authoring/logging capability only; disabling it blocks new creation/execution in the Team context but never deletes existing private workouts or blocks private correction/export.
7. **Tag ≠ grant ≠ share ≠ publish:** independently representable, independently auditable transitions — **tag** (MD-05, identification only), **grant Vault access** (VS-01, explicit + server-authoritative), **explicit share** (VS-02, in-scope-coach-only, item-scoped), **revoke** (VS-03), **publish** (MD-06, consent-gated for tagged minors). Tagging never implies a grant; a grant never implies publication. Multi-subject youth media is not peer-reshared or broadly published by default.
8. **Vault visibility invariant:** an athlete's Vault shows exactly the artifacts they were explicitly granted (VS-01) or explicitly shared (VS-02) — never derived from Team/group membership, group assignment, or tag presence.
9. **Payment ≠ authorization:** billing/tier/entitlement state gates feature availability only; never a role, management scope, or Vault-visibility check. Downgrade/failed-payment never revokes data or restructures the hierarchy.
10. **Age 13+ baseline:** no account exists below the asserted-age threshold at creation (IT-01/PS-01); a discovered under-age account is handled by PS-07 (`restricted_pending_review` first, governed closure on confirmation, audited restoration on error).
11. **No revoked navigation as requirement; no navigation designed here.** Workflow "Capability / trigger" fields describe when a capability is available and to whom — not screens.
12. **Destructive-transition discipline:** every destructive/consequential transition (IT-06, IT-08, IT-09 each stage, TA-01 Head Coach transfer, MD-06 publish, MD-07 delete, VS-03 revoke, BE-04 downgrade, PS-07 closure, PS-09 preservation hold, SE-10 amendment) names authority, confirmation, reversibility, downstream effects, and exit state.
13. **Offline honesty:** offline success is never server-durable until reconciliation succeeds. Divergence that cannot be merged without loss is driven through SE-09, never last-write-wins. Offline attachment submission and offline Vault grants stay pending until server confirmation.
14. **Safety-critical notification state (v2 formulation — no literal "guaranteed delivery"):** notifications carrying a youth-safety or authorization consequence (MG-06 report receipt & escalation status, PS-03/PS-07/PS-09 outcomes, MD-05/VS-01 grant/tag notice, MD-06 tagged-minor notice) are backed by **transactionally-created authoritative in-app state, durable retry, idempotent processing, explicit delivery + acknowledgement state, an audited terminal-failure record, and human escalation for unresolved safety-critical failure.** Push/email/device delivery is secondary and fallible. Safety-class notifications cannot be disabled (MG-07); operational-class may change channel but stay in-app; social-class may be bundled, muted, or placed under quiet hours.
15. **Communication reach ≠ any other scope:** a coach's Team-wide private-messaging reach (MG-04) never widens tagging, Vault sharing, structured feedback, analysis, profile visibility, performance-data visibility, or management scope.
16. **Departed-member content disposition:** governed by the single DD-DEPARTED-CONTENT rule (§4) — athlete-owned data stays with the athlete, Team data stays with the Team, access ends immediately, no indiscriminate cascading deletion.

---

## 6. Offline-Critical Workflows

- **Highest criticality (execution-blocking if unavailable offline):** SE-01…SE-08.
- **High criticality:** PW-01/02/03; TP-04 published-session caching; MD-01 capture.
- **Moderate (degrade to read-only / queue-and-sync):** MG-01/02/03/04/05 (send queues; broadened-visibility grant stays pending until server-confirmed); AN-01..06; PF-01/02/03/04.
- **Reconnect-time, not offline:** SE-09 (reconciliation), SE-10 (post-finalization correction — draft offline, applied and server-confirmed on reconnect).
- **Not offline-capable by design:** IT-01/02/03/04/06/07/08/09; TA-01..07; PR-01/02 authoritative persistence and all of PR-03 (DOB/age never in a client cache); BE-01..06; MD-06; VS-01/02/03; MG-05 when it broadens media visibility; MG-07 preference *edits* queue but delivery semantics are unaffected; PS-01/03/07/08/09.

---

## 7. Authorization-Sensitive Workflows (G3 scrutiny)

IT-01, IT-02, IT-04, IT-05, IT-06, IT-08, IT-09, PR-02, PR-03, TA-01, TA-04, TA-05, TA-07, TP-06, TP-07, SE-09, SE-10, MD-05, MD-06, MG-04, MG-05, MG-06, VS-01, VS-02, VS-03, BE-04, BE-05, BE-06, PS-07, PS-08, PS-09.

Note on the BE-* entries: BE-04/BE-05/BE-06 appear here so that G3 scrutiny **confirms** they never restructure authorization, role/scope, or data — **not** because they perform authorization. This is consistent with the §3 dependency graph, in which billing-entitlements has no arrow into any authorization-sensitive category (payment ≠ authorization, invariant #9).

---

## 8. Safety / Privacy-Sensitive Workflows (Mandatory Department 04 Scope)

Every workflow in **profile**, **media**, **vault-sharing**, and **privacy-safety** in full, plus MG-04/MG-05/MG-06/MG-07 from **messaging**, IT-01/IT-06/IT-08/IT-09 from **identity-team**, SE-09/SE-10 from **session-execution**, and PF-06 from **performance**.

## 8a. Department 04 Review Disposition (G3)

History (from the v1 draft and v1 remediation pass, retained here as past-tense record — those artifacts are superseded): the first D04 review raised and remediated three blocking findings (MD-05 tagging-scope, MG-02/03 Head-Coach channel visibility, VS-02 re-share consent); the v1 remediation pass demoted two further assumption-as-decision instances (VS-02 sharing scope, VS-01 auto-grant) to `UNCONFIRMED`. Both were resolved normatively in v2 (§9.1). The v1 `§8a`/`§8a.1` section text is not carried into this file.

### 8a.2 — v2 Department 04 re-review (independent, inspected-artifact)

An **independent** Department 04 review (external reviewer, not the authoring agent) inspected every safety/privacy-sensitive workflow after the v2 correction pass and returned a structured report with per-check yes/no verdicts and file-line evidence. **No hard youth-safety, privacy, or authorization boundary was found violated.** All ten targeted checks passed as expected (tagging never grants access; communication reach never widens other scope; DOB/age never reaches coaches or peers; profile not discoverable, peers get minimum identity only; multi-subject youth media blocked by default for both VS-02 re-share and MD-06 publication; PS-07 `restricted_pending_review`-first with platform-authority-only determination and audited restoration; canonical least-privilege `Platform Safety Administrator` with Head-Coach-implicated bypass and PS-09 preserve+restrict+route; blocking performs all seven required behaviours; every literal "guaranteed delivery" replaced with the six-part transactional model and safety-class un-disable-able; a coach cannot edit an athlete's finalized performed-work truth). Items accepted:

- **Profile (F-01):** the visibility model is now **normative and privacy-conservative** — not discoverable; peers get minimum Team identity only; coach access follows current role + management scope; DOB/age restricted to identity + safety functions; other contexts get only a derived `is_minor` flag. Remaining OPEN is the field catalogue and per-field classification (`OQ-PR-FIELDS`), with a default-deny safe default. **Accept.**
- **Tag → Vault access (F-11):** resolved to **explicit, server-authoritative grant** (VS-01) — not automatic. Multi-subject youth media requires per-athlete deliberate grants. **Accept.**
- **Sharing scope (F-03):** resolved normatively — coaches share only within current management scope; athlete-to-athlete media sharing disabled in v1; multi-subject onward re-share blocked by default pending consent (`OQ-VS02-MULTISUBJECT`, safe default: blocked). **Accept.**
- **Chat attachments (F-04):** a visibility-broadening attachment creates a formal VS-02 or MD-06 record with that transition's controls (including MD-06's per-minor consent gate), not offline-authoritative until confirmed. **Accept.**
- **Moderation owner (F-10):** canonical `Platform Safety Administrator` (least-privilege, Department 04). Head-Coach-implicated reports bypass Team leadership; PS-09 access-restricts, protects from redistribution, securely preserves, and routes illegal/imminent-harm content. Staffing/SLA/classification thresholds remain OPEN with safe defaults (over-inclusion into PS-09 is safer than under-inclusion). **Accept.**
- **Under-age (F-07):** consequence sequencing corrected — `restricted_pending_review` first (use stops, data preserved), determination by the Platform Safety Administrator, governed closure only on confirmation, audited restoration on error. **Accept.**
- **DSR intake (F-09):** PS-08 covers access/export/correction/deletion, guardian-initiated; standing/proof and jurisdiction remain OPEN with safe defaults (owner-only self-service in v1; guardian requests worked manually with legal review). **Accept.**
- **Blocking (F-17, MAJOR):** normative — stops DMs/mentions/tags/shares/discovery; preserves evidence; does not alter membership; mute/collapse in shared channels *when safe*; safety/critical communications always retain an honest path; minor-blocks-coach offers a private report path; restricted safety telemetry stored without automatic punishment or disclosure to Team leadership. **Accept.**
- **Finalized-session correction (F-23, MAJOR):** SE-10 — audited amendment, original + amendment + timestamp + actor + reason preserved, finalized history never silently rewritten. **Accept.**
- **Notifications (F-12):** every literal "guaranteed delivery" replaced with the transactional-state / durable-retry / idempotent / delivery-ack / audited-terminal-failure / human-escalation model; safety-class cannot be disabled (MG-07). **Accept.**

**Disposition:** the independent G3 review is **PASS WITH CONDITIONS**: no hard security/privacy/youth-safety boundary is violated, every safe default is protective, and the residual conditions are genuine external policy/legal/implementation matters each protected by a conservative default —
(1) local-cache invalidation for revoked/deleted youth media (`OQ-MEDIA-CACHE-INVALIDATION`, D03; in force: server-authoritative revocation + favour online-validated Vault access);
(2) the multi-subject minor-consent *mechanism* (`OQ-VS02-MULTISUBJECT`/`OQ-MD06-AUTHORITY`; in force: BLOCKED);
(3) coach↔athlete private-thread oversight (`OQ-MG-OVERSIGHT`; in force: no standing visibility + compensating report paths + un-suppressible coach→minor DM notification);
(4) jurisdiction-specific legal duties (`OQ-IT01-AGE-VERIFY`, `OQ-PS07-JURISDICTION`, `OQ-PS08-JURISDICTION`, `OQ-PS09-EXTERNAL`; all D04-legal, production-launch-gated) — `OQ-PS07-JURISDICTION` given an explicit in-force default in the v2 pass;
(5) retention durations / deletion-vs-anonymisation (`OQ-DD-RETENTION` et al.);
(6) moderation staffing / SLA / classification thresholds (`OQ-PS-MOD-STAFFING` et al. — the role and the two mandatory bypass routes are fixed, not open);
(7) coach-initiated external export of a minor's identifiable data (`OQ-PF-MINOR-EXPORT`);
(8) all Department 06 commercial content (§8b).
Advisory items applied in the v2 pass: `OQ-PS07-JURISDICTION` explicit default added; residual "in-app-guaranteed" wording changed to "in-app-persistent / cannot be fully suppressed"; the multi-subject block's dependence on tag accuracy noted as an explicit known limitation in MD-06 and VS-02.

## 8b. Department 06 Review Disposition — Billing / Entitlements (independent, v2)

An **independent** Department 06 review (`operations-governance-reviewer` persona; not the authoring agent) inspected BE-01…BE-06, the §3 dependency graph, IT-09's commercial teardown, and BE-05's centralization assertion. Evidence: each BE workflow's Authorization assumptions and Open questions; the governing invariant; the absence of a BE-* → authorization arrow.

- Confirms **payment ≠ authorization** is stated consistently and that no BE-* workflow feeds any authorization-sensitive category — the deliberate missing arrow is correct and load-bearing.
- Confirms feature-to-tier mapping (`OQ-BE-TIER-MAP`), trial/conversion/provider (`OQ-BE-TRIAL`/`OQ-BE-PROVIDER`), over-limit handling (`OQ-BE-OVERLIMIT`, safe default soft-lock), grace period (`OQ-BE-GRACE`, safe default 7 days then Free-tier features), and restricted-state target (`OQ-BE-RESTRICTED-TARGET`, safe default Free-tier features) are correctly left **unresolved** with protective safe defaults and attributed to Department 06 — none is silently assumed.
- Confirms BE-04's rule (downgrade never revokes data or restructures hierarchy/authorization) matches D06 commercial-model expectations.

**Conditions (from the independent review):**
1. **A separate approved D06 artifact** defining the entitlement model, exact plan limits, **provider, prices, taxes, refunds, in-app-purchase mechanics, trial mechanics, grace-period length, and over-limit handling** — required before any billing implementation. **Not approved by this artifact.** In the v2 pass, provider / prices / taxes / IAP were given their own §9.2 register rows (`OQ-BE-PROVIDER`, `OQ-BE-PRICING`, `OQ-BE-TAX`, `OQ-BE-IAP`), each with the in-force default "no paid billing ships in v1".
2. **Explicit D06 ratification of the Free / Mid / Top tier structure** (count and names) as a commercial invariant — recorded as a D06 decision, not left implicit in the still-unapproved baseline. Tracked as `OQ-BE-TIER-STRUCTURE` (§9.2), a condition on human approval of `product-baseline.md` §6.
3. **Billing/payment ownership and tier-change authority** — currently Head-Coach-exclusive by analogy only. Tracked as `OQ-BE-BILLING-OWNER` (§9.2; safe default: Head Coach is sole billing owner in v1; a distinct org/billing-administrator role is a D06 decision).
4. `OQ-IT09-REFUND` broadened to a D06-owned **refund / dunning / cancellation policy** covering IT-09 teardown, BE-06 grace expiry, and BE-04 downgrade; BE-02/BE-06 ↔ IT-09 cross-references added for audit traceability.
5. Editorial: §7 now states that BE-04/BE-05/BE-06 appear in the authorization-sensitive list to be *scrutinised for confirming they never restructure authorization/data*, not because they perform authorization — reconciled with the §3 "no arrow" statement.
6. BE-05's "single centralized entitlement-derivation point" is endorsed by D06 and **ratified** by `architecture-reviewer` (§8c contract 6), which additionally requires the flag-interface *shape* to make a feature-availability flag structurally non-consumable as an authorization predicate.

**Disposition:** independent Department 06 review = **PASS WITH CONDITIONS**. `payment ≠ authorization` is confirmed intact (no `BE-*` arrow into any authorization-sensitive category; authority flows *into* billing only; BE-05 keeps authorization code off raw billing state). Provider, prices, taxes, refunds, IAP mechanics, and exact plan limits **remain unresolved and are NOT approved by this artifact.** No conflict with D01 or D04 findings.

## 8c. Architecture / Contracts (G2)

G2 was routed to an **independent** `architecture-reviewer` for the v2 pass (external reviewer, not the authoring agent). The review evaluated the cross-bounded-context contract register against `ARCHITECTURE.md` (domain modules communicate via public contracts/application services, not internal persistence; dependency direction preserved; no unjustified service extraction).

**Architectural judgement: sound.** No bounded-context boundary is changed and no new deployable service is introduced; dependency direction is preserved on every seam (no domain depends on an application shell or another domain's internal persistence); BE-05 centralization is defensible and *reduces* payment-≠-authorization risk; no service extraction is proposed.

**Register defects the review found, and the v2 pass then fixed:**
- 6 of the original 10 contract rows (messaging→media/vault, entitlement source of truth, identity/team lifecycle, profile visibility, session reconciliation, safety-notification state) dropped one or more of the eight mandated fields → **now completed** in `stridelab-ai/application-map/cross-context-contracts.md`.
- 4 implied cross-context seams were unregistered → **added** as contracts 11–14: (11) governance safety-enforcement & preservation-hold; (12) data-subject erasure & portability orchestration (PS-05/PS-08); (13) reporting → export egress (PF-06); (14) training → sessions prescription & modification (TP-04/TP-07/TP-08).
- The C5 responsibility split (source-context obligation, not a reporting-side filter) and the personal-workout non-visibility constraint on the workouts→performance seam are now stated explicitly.
- BE-05's flag-interface *shape* requirement (a feature-availability flag must be structurally non-consumable as an authorization predicate) is recorded against contract 6 as a contract-shape-time obligation.
- The broken "`docs/product/workflow-architecture.md` §G2" pointer is corrected: **the authoritative contract matrix is `stridelab-ai/application-map/cross-context-contracts.md`** (14 contracts, all 8 fields), summarised there and cross-referenced from `docs/product/workflow-architecture.md`.

**Disposition:** independent `architecture-reviewer` G2 = **PASS WITH CONDITIONS**, and — with the register amendments above applied — the register is **COMPLETE** (it is not `PENDING`). Remaining conditions are genuine implementation-design-time obligations: (a) contract *shapes* (schemas, transport) produced by D02/D03 against the 14-contract register; (b) `OQ-MEDIA-CACHE-INVALIDATION` — the hard local-cache-removal guarantee (Department 03); (c) the BE-05 flag-interface shape (contract 6, dischargeable at contract-shape time, recorded now); (d) the separate D06-approved entitlement artifact as a hard precondition to any BE-05 implementation (contract 6 / §8b).

---

## 9. Product decisions — normative in v2, and remaining OPEN register

### 9.1 Converted from OPEN to normative in v2 (previously-authorized product defaults)

| Area | Decision (now normative) | Workflows |
|---|---|---|
| Profile ownership | Profiles are user-owned; coaches/admins cannot edit an athlete's profile; roster metadata is separate from profile data. | PR-01, PR-02 |
| Profile discoverability | Profiles are not publicly discoverable. | PR-03 |
| Profile visibility | Peers get minimum Team identity only; coach access follows current role + management scope; DOB/age evidence restricted to identity + authorized safety functions; other contexts get only a derived eligibility flag / approved age band. | PR-03 |
| Tag vs access | Tagging is metadata only and never grants Vault access; Vault access requires a distinct, server-authoritative **explicit grant** (not automatic). | MD-05, VS-01 |
| Sharing scope | Team-wide communication does not grant media access; Event Coaches share media only within current management scope; athlete-to-athlete media sharing is disabled in v1. | VS-02, MD-05, MG-05 |
| Multi-subject youth media | Cannot be peer-reshared or broadly published by default (blocked pending each depicted athlete's consent). | VS-02, MD-06, MG-05 |
| Chat attachments | A visibility-broadening attachment creates a formal, independently revocable and auditable VS-02 or MD-06 record; offline submission stays pending until server confirmation. | MG-05 |
| Team closure | `active → closure_pending → archived → deletion_eligible → deleted_or_anonymized`; final Head Coach must transfer ownership or initiate closure; archive-first, recoverable before the irreversible stage; membership-derived access ends immediately; DD-DEPARTED-CONTENT disposition; no indiscriminate cascading deletion. | IT-09 |
| Departed-member content | DD-DEPARTED-CONTENT: athlete-owned profiles / performed-work logs / personal workouts stay with the athlete; Team plans and admin records stay with the Team; authored messages and restricted audit evidence follow the retention policy. | IT-06, IT-08, IT-09, TA-01, MD-07 |
| Personal workouts on disable | Disabling `personal_workouts_allowed` prevents new Team-context creation and execution; does not delete existing private workouts; does not prevent private correction or export. | TA-07, PW-01, PW-02, PW-03 |
| Scope changes | Scope narrowing revokes future not-started prescriptions outside the new scope; in-progress execution enters SE-09; historical athlete-authored truth is preserved; Event Coaches get identifiable performance data only for currently-managed athletes; structured feedback/analysis require current management scope; Team-wide messaging authority does not widen feedback or analysis authority; athletes always retain access to their own data; Head Coaches retain Team-authorized scope. | TP-06, TP-07, AN-07, PF-01, PF-03, PF-05, SE-09 |
| Event Coach administration | Event Coaches cannot assign athletes or administer Event Groups/Subgroups in v1; the Head Coach owns these transitions. Future delegation = candidate decision `CD-EC-DELEGATION`. | TA-02, TA-03, TA-04, IT-03, IT-06 |
| Blocking (F-17) | Stops DMs/mentions/tags/shares/discovery between the parties; does not delete evidence or alter membership; mute/collapse in shared channels when safe; critical Team & safety communications retain an honest path; minor-blocks-coach offers a private report path; restricted safety telemetry stored without automatic punishment or disclosure to Team leadership. | MG-01, MG-02, MG-03, MG-06 |
| Finalized sessions (F-23) | Coach finalization locks the prescribed Session structure only; athletes retain an audited post-finalization correction workflow; original value + amendment + timestamp + actor + reason preserved; finalized history never silently rewritten. | SE-08, SE-10 |
| Under-13 handling | Credible signal → `restricted_pending_review` (use + unnecessary processing stop immediately, no irreversible action); Platform Safety Administrator determines; confirmed ineligibility → governed closure + data handling; mistaken determinations → audited restoration. | PS-07 |
| Moderation owner | Canonical `Platform Safety Administrator` — least-privilege platform actor owned by Department 04; Head-Coach-implicated reports bypass Team leadership; suspected illegal content is access-restricted, protected from redistribution, securely preserved, routed to qualified safety/legal review. | PS-03, PS-09, MG-06 |
| Notifications (F-12) | No literal "guaranteed delivery"; instead transactional authoritative in-app state + durable retry + idempotent processing + delivery/ack state + audited terminal failure + human escalation for unresolved safety-critical failure; push/email secondary and fallible; safety class cannot be disabled; operational may change channel but stay in-app; social may be bundled/muted/quiet-hours. | invariant #14, MG-06, MG-07, MD-06, PS-03, PS-07, PS-09, VS-01 |
| Communication reach (#15) | A coach's Team-wide messaging reach never widens tagging, sharing, feedback, analysis, profile, performance, or management scope. | MG-04, MD-05, VS-02, AN-07, PR-03, PF-01 |

### 9.2 Remaining legitimate OPEN decisions (every entry has ID · owner · evidence required · safe default · affected workflows · blocking stage)

External policy/legal/implementation matters only; each is protected by a conservative safe default so v1 can proceed without it.

| ID | Owner | Safe default (in force) | Affected | Blocking stage |
|---|---|---|---|---|
| `OQ-IT01-AGE-VERIFY` | D04 | self-attestation ≥13 + PS-07 response path | IT-01, PS-01, PS-07 | production launch legal sign-off |
| `OQ-IT01-REJECT-RETENTION` | D04 | minimal hashed-identifier + timestamp only | IT-01, PS-01 | signup implementation |
| `OQ-IT03-PRESCOPE` | D01 | invitation carries a proposal; assignment is a separate Head Coach TA-04 action | IT-03, IT-04, TA-04 | none |
| `OQ-IT04-JOIN-MECHANISM` | D01/D04 | direct invitation only; no open join code/link/queue | IT-03, IT-04 | any non-invitation join path |
| `OQ-IT07-VERIFY-STRENGTH` | D04 | verified-channel proof + rate limit + security notice; lost-sole-channel → manual D04 proofing | IT-07 | production auth launch |
| `OQ-IT08-GRACE` | D01/D04 | 30-day recoverable grace window | IT-08, IT-09, PS-05 | deletion implementation |
| `OQ-IT09-REFUND` | D06 | stop future billing, no automatic refund | IT-09, BE-* | billing implementation |
| `OQ-DD-RETENTION` | D04/legal | retain while an owning account is active; account-level policy on final deletion | IT-06/08/09, TA-01, MD-07, PS-05/08 | deletion/retention implementation |
| `CD-EC-DELEGATION` (candidate decision) | D01 | no Event Coach delegation of invitation/removal/assignment/group-admin in v1 | IT-03, IT-06, TA-02, TA-03, TA-04, TP-07 | any Event Coach delegation feature |
| `OQ-TA-MULTIGROUP` | D01 | multi-group athlete assignment allowed at Head Coach discretion | TA-04, TP-07, PF-03, MG-02/03 | none |
| `OQ-TA-REPARENT` | D01 | re-parenting disabled in v1 (delete-and-recreate) | TA-03, TP-07 | a re-parenting feature |
| `OQ-TA-SETTINGS-CATALOGUE` | D01 | only `personal_workouts_allowed` + tier state are recognised Team settings | TA-06 | a new setting |
| `OQ-PW-COACH-VISIBILITY` | D01/D04 | personal workouts are NOT visible to any coach | PW-01/02/03, PF-01, PF-04 | any coach-facing personal-workout view |
| `OQ-PW-RETENTION-DURATION` | D04/legal | retained in the athlete's private library while the account is active | TA-07, PW-*, PS-05/08 | retention implementation |
| `OQ-TP-OVERLAP` | D01 | overlapping cycles in the same scope are allowed; coach owns coherence | TP-01/02/03 | an overlap-prevention feature |
| `OQ-TP-PROMOTE` | D01 | no in-place promotion of an Event Coach cycle to Team-wide | TP-01, TP-06 | a promotion feature |
| `CD-PLAN-COAUTHOR` (candidate) | D01 | no cross-author co-authorship / formal handoff in v1 | TP-02, TP-08 | a co-authorship/handoff feature |
| `OQ-TP-TEMPLATE-SHARING` | D01 | templates are author-private (+ Head Coach) | TP-05, TP-06 | a shared-library feature |
| `OQ-TP-HC-OVERRIDE` | D01 | Head Coach may modify an Event Coach artifact within Team-wide authority; every edit attributed + audited | TP-08, PF-02 | a formal handoff feature |
| `OQ-SE-ATHLETE-SELFSTART` | D01 | an athlete cannot self-start a coach-prescribed Session (personal workouts are the self-directed path) | SE-01, SE-02 | any athlete-self-start feature |
| `OQ-SE-SELFCHECKIN` | D01 | no athlete self-check-in; coach records attendance | SE-02 | a self-check-in feature |
| `OQ-SE-COACH-OVERRIDE` | D01 | no coach override of an athlete's self-classification; coach adds an attributed annotation or asks for an SE-10 correction | SE-06 | a coach-override feature |
| `OQ-SE-RPE-FLAG` | D01/D04 | no automatic coach-facing RPE flag in v1 | SE-07 | an automatic-flagging feature |
| `OQ-SE-AUTOFINALIZE` | D01 | no auto-finalization; a session stays `in_progress` until a coach ends it | SE-08 | an auto-finalize timer |
| `OQ-SE-RECONCILE-UX` | D01 | SE-09 state machine + non-loss/attribution guarantees; every conflict surfaced, never last-write-wins | TP-08, SE-04, SE-09 | reconciliation-UI implementation |
| `OQ-SE-OFFLINE-P2P` | D03 | queue-until-reconnect, no local device-to-device propagation | SE-04, SE-09 | a local-network sync feature |
| `OQ-SE10-WINDOW` | D01/D04 | no time limit on an athlete correcting their own performed-work truth while the account is active | SE-10, PF-* | a bounded correction window |
| `OQ-PR-FIELDS` | D01/D04 | only the IT-01 shell fields exist; only display name + role are coach-visible for in-scope athletes | PR-01/02/03 | adding any profile field |
| `OQ-PR-DOB-EDIT` | D04 | DOB/age frozen after IT-01 verification; changeable only via an audited identity/safety path | PR-01/02, PS-01, PS-07 | any self-service DOB edit |
| `OQ-PR-SUPPORT-EDIT` | D06/D04 | no operations/support profile-edit path in v1 | PR-02, PS-08 | a support-tool build |
| `OQ-PR-AGE-BAND` | D04 | a boolean `is_minor` flag only, no age band | PR-03, PS-01 | exposing anything richer than the boolean |
| `OQ-MD-CAPTURE-NOTICE` | D04 | no capture-time consent step; capture stays a private draft; every downstream visibility transition is separately gated | MD-01, MD-05, MD-06 | a capture-time consent feature |
| `OQ-MD05-ATHLETE-TAG-EDGE` | D01/D04 | an athlete may tag only teammates in a currently-shared group | MD-05 | changing the athlete-tag boundary |
| `OQ-MD06-AUTHORITY` | D04/D01 | publication requires Head Coach authority/approval **plus** a per-tagged-minor consent/notice step; missing consent → blocked | MD-06, MG-05 | enabling publication in a Team |
| `OQ-MD06-UNPUBLISH` | D04/D03 | unpublish removes from the authoritative audience view + best-effort cache invalidation | MD-06, MD-07, VS-03 | an unpublish feature |
| `OQ-MD07-RETENTION` | D04 | media in an open PS-03/PS-09 case is held; other media follows the account-level policy | MD-07, PS-09 | a retention implementation |
| `OQ-MD07-ARCHIVE-STATE` | D01 | hard deletion only in v1; no separate `archived` state unless a legal hold requires it | MD-07 | an archive feature |
| `OQ-MEDIA-CACHE-INVALIDATION` | D03/D04 | server-side revocation is authoritative + best-effort cache purge; a hard local-removal guarantee is a Department 03 design item | MD-06, MD-07, VS-03 | the sync/caching design |
| `OQ-VS02-RIGHTS` | D01 | a VS-02 share is view-only in v1 | VS-02, AN-01 | a recipient-analysis feature |
| `OQ-VS02-MULTISUBJECT` | D04 | onward re-share of multi-subject media to a third party is **blocked** until each depicted athlete's consent condition is met | VS-02, MD-06, MG-05 | any onward-share of multi-subject media |
| `OQ-VS03-HC-REVOKE` | D04 | no ordinary Head-Coach revoke of another member's grant — safety concerns go via the MG-06 → PS-03 moderation path | VS-03, PS-03 | a Head-Coach revoke feature |
| `OQ-VS03-NOTICE` | D01/D04 | ordinary revocation is applied silently; a moderation revocation follows PS-03's notice policy | VS-03 | none |
| `OQ-AN-*` | — | covered by the scope-change / feedback-scope normative rules | — | — |
| `OQ-PF-AGG-METHOD` | D03 | suppress re-identifying cohorts; aggregate only over individually-visible athletes | PF-03, PF-05 | PF-03 implementation |
| `OQ-PF-REPORT-OFFLINE` | D03 | own-data reports may generate offline with a freshness marker; group/Team reports need connectivity | PF-05, PF-06 | PF-05 implementation |
| `OQ-PF-MINOR-EXPORT` | D04/legal | athlete may always export own data; coach export bounded to current scope + audited + never expands scope; the OPEN part is coach-initiated external export of a minor's identifiable data | PF-05, PF-06, PS-05, PS-08 | a coach-initiated external-export feature |
| `OQ-MG-RETENTION` | D04/legal | messages retained while the channel exists; account-level policy on member exit; reported content follows the PS-09 hold | MG-01/02/03/04, PS-05 | a retention/redaction implementation |
| `OQ-MG-HC-CHANNEL` | D01/D04 | Head Coach gets **no** standing unassigned read access to Event Group/Subgroup channels | MG-02, MG-03 | any blanket-visibility feature |
| `OQ-MG-OVERSIGHT` | D04 | no standing third-party visibility into coach↔athlete private threads in v1; content reachable only via MG-06/PS-03/PS-09 | MG-04, PS-06 | any oversight/visibility feature |
| `OQ-MG-MOD-THRESHOLD` | D04 | escalate anything the Head Coach can't resolve or that names them | MG-06, PS-03, PS-09 | automated triage |
| `OQ-MG-REPORTED-NOTICE` | D04 | the reported individual is not automatically notified | MG-06, PS-03, PS-09 | any notify-the-reported feature |
| `OQ-MG-BLOCK-SAFE-COLLAPSE` | D01/D04 | collapse a blocked party's ordinary content for the blocker but never a critical/safety message | MG-01/02/03, MG-06 | the collapse UI |
| `OQ-MG07-DEFAULTS` | D01 | social notifications on + unbundled, no quiet hours, until the member customises | MG-07 | none |
| `OQ-PS-MOD-STAFFING` | D04 | escalations queue durably and are worked in severity order | PS-03, PS-07, PS-09 | production launch of the report path |
| `OQ-PS-HC-IMPLICATED-PROCESS` | D04 | platform review with possible IT-06/TA-01 outcome + legal handoff | PS-03 | production moderation ops |
| `OQ-PS-CLASSIFY` | D04 | any reporter-selected "illegal / imminent harm" category + operations review routes to PS-09 and is preserved pending human review (over-inclusion is safer) | MG-06, PS-09 | automated classification |
| `OQ-PS07-GUARDIAN` | D04 | notify a guardian where one is on record and legal guidance requires; no self-service guardian action in v1 | PS-07, PS-08 | guardian-facing features |
| `OQ-PS07-RETENTION` | D04 | preserve safety-evidence + legal-hold data; delete/anonymise the rest per the account-level policy | PS-07, PS-05 | the deletion implementation |
| `OQ-PS07-JURISDICTION` | D04 legal | apply the strictest known duty; preserve safety evidence and escalate to counsel pending analysis | PS-07 | production launch legal sign-off |
| `OQ-PS07-DETECTION` | D04 | report-driven only in v1 | PS-07 | proactive age-signal detection |
| `OQ-PS08-STANDING` | D04 | owner-only self-service in v1; guardian requests accepted + worked manually with legal review | PS-08, PS-07 | a self-service guardian portal |
| `OQ-PS08-JURISDICTION` | D04 legal | honour access/export/deletion for every requester on a best-effort timeline pending a formal matrix | PS-08 | production launch legal sign-off |
| `OQ-PS08-HOLD-INTERACTION` | D04 | deletion is `partially_fulfilled` for held/dependency-critical data with a recorded reason, never a silent skip | PS-08, IT-06/08/09 | the deletion implementation |
| `OQ-PS08-SELFSERVICE` | D01 | assisted intake only in v1 | PS-08 | a broader self-service export surface |
| `OQ-PS09-EXTERNAL` | D04 legal | no automated external reporting; every handoff human- and legal-counsel-gated | PS-09 | production moderation ops |
| `OQ-PS09-HOLD` | D04 | hold indefinitely until Department 04 legal releases; access limited to the Platform Safety Administrator | PS-09 | production moderation ops |
| `OQ-BE-TIER-MAP` | D06 | no feature is tier-gated until D06's approved entitlement artifact defines the mapping | BE-01, BE-05 | any tier gate |
| `OQ-BE-TIER-STRUCTURE` | D06 | Free / Mid / Top three-tier skeleton (count + names) is used as the working structure but is **not** D06-ratified — explicit D06 ratification required | BE-01, product-baseline §6 | human approval of the baseline's commercial section |
| `OQ-BE-BILLING-OWNER` | D06 | Head Coach is the sole billing/payment owner and tier-change authority in v1; a distinct org/billing-administrator role is a D06 decision | BE-01, BE-02, BE-03, BE-04, BE-06 | billing implementation |
| `OQ-BE-TRIAL` | D06 | no trial in v1; a paid tier requires an active subscription | BE-02, BE-05 | trial implementation |
| `OQ-BE-PROVIDER` | D06 | no paid billing ships in v1; provider (direct vs IAP) unresolved and not approved here | BE-02, BE-03, BE-05 | billing implementation |
| `OQ-BE-PRICING` | D06 | no paid billing ships in v1; prices unresolved and not approved here | BE-01, BE-03, BE-04 | billing implementation |
| `OQ-BE-TAX` | D06 | no paid billing ships in v1; tax handling unresolved and not approved here | BE-02, BE-03 | billing implementation |
| `OQ-BE-IAP` | D06 | no paid billing ships in v1; in-app-purchase mechanics (and platform-store rules) unresolved and not approved here | BE-02, BE-03 | billing / App Store submission |
| `OQ-BE-OVERLIMIT` | D06 | soft-lock (over-limit content read-only, nothing deleted or restructured) | BE-04, BE-05 | enabling tier limits |
| `OQ-BE-GRACE` / `OQ-BE-RESTRICTED-TARGET` | D06 | 7-day grace at current-tier features, then Free-tier features; data preserved | BE-06, BE-05 | billing implementation |
| `OQ-IT09-REFUND` (broadened) | D06 | stop future billing, no automatic refund — a D06-owned refund / dunning / cancellation policy is required covering IT-09 teardown, BE-06 grace expiry, and BE-04 downgrade | IT-09, BE-02, BE-04, BE-06 | billing implementation |

No item in 9.2 was converted into an assumption or an approved decision; each is an explicit external decision with a protective default.

---

## 10. Implications for Later Information Architecture / Navigation (implications only — not a navigation design)

- Two independent lenses ("who I manage" vs "who I can reach") must not be merged into one roster concept.
- "What was planned" (training-planning) and "what happened" (session-execution) must stay visually and structurally distinct; a finalized session shows its **prescribed structure locked** but the athlete's performed-work record carries a visible amendment history (SE-10).
- Media visibility needs to communicate multiple simultaneous states (tagged / granted / shared / published) without implying more openness than is true; a "grant Vault access" affordance is distinct from a "tag" affordance.
- Profile surfaces must render per the normative visibility model (no discoverability; peers see min identity; DOB/age never shown to peers or coaches) and must be able to represent per-field, per-audience visibility.
- Team Closure needs an explicit, clearly-consequential, archive-first, recoverable end-state flow distinct from leaving a Team or deleting an account.
- Session Reconciliation (SE-09) and post-finalization correction (SE-10) each need a conflict-/amendment-surfacing interaction that never lets a coach edit an athlete's logged data.
- Report/block affordances must be available to every member regardless of role or group, with a private report path offered when a minor blocks a coach, and a visibly distinct platform-authority path.
- Notification settings need three visible classes (safety — locked on; operational — channel-adjustable but cannot be fully suppressed, always lands in-app; social — bundle/mute/quiet-hours).
- None of the above revives any previously revoked navigation decision.

---

## 11. Verification Performed (v2)

- **All findings F-01…F-24 addressed** — see the closure matrix in `docs/product/workflow-architecture.md` §Closure (and reproduced in the current-state record).
- Every previously-authorized product decision is **normative**, not OPEN (§9.1). Every remaining OPEN item (§9.2) has a stable ID, owner, evidence-required note, safe default, affected workflows, and blocking stage.
- Workflow IDs are unique and counts reconcile: **86** total; IT-01…09, PR-01…03, TA-01…07, TP-01…08, SE-01…10, PW-01…03, MD-01…07, AN-01…07, VS-01…04, MG-01…07, PF-01…06, BE-01…06, PS-01…09 — contiguous, no gaps.
- **No navigation design was introduced** — every "Entry point" field label was replaced with capability-based "Capability / trigger" phrasing that states *to whom* the capability is available (F-13); §10 remains implications-only; no previously revoked navigation decision reintroduced.
- Actor Matrix matches workflow permissions (Event Coach removed from TA-04/TA-02/TA-03/IT-03/IT-06 authority; `Platform Safety Administrator` canonical name used everywhere — grep-clean).
- **Tagging never grants access** (VS-01 explicit grant); **communication reach never grants media / feedback / profile / performance / management scope** (invariant #15); **offline work never claims server durability prematurely** (invariant #13); **every failure branch has recovery or an honest terminal state**; **every destructive transition defines authority / confirmation / reversibility / downstream effects / exit state** (invariant #12); **athlete-owned performed work is distinct from coach-authored prescription** (invariants #4, #5); **billing never expands authorization** (invariant #9, §3 absent arrow, independent D06 review §8b); **no legal interpretation is marked approved** (§9.2 legal items carry no "approved" status; `OQ-PS07-JURISDICTION` now carries an explicit conservative default).
- DD-DEPARTED-CONTENT is referenced from IT-06, IT-08, IT-09, TA-01, and MD-07 (F-16 back-references verified present).
- No application code, schema, API, or UI component was created or modified.
- **Four independent reviews were run and returned, each citing inspected-artifact evidence:** `architecture-reviewer` / G2 (§8c — PASS WITH CONDITIONS; architectural judgement sound; the reviewer's register defects were fixed, register now 14 contracts × 8 fields, COMPLETE not PENDING); Department 04 / G3 (§8a.2 — PASS WITH CONDITIONS; **no hard boundary violated**; all ten targeted checks passed); Department 06 / billing (§8b — PASS WITH CONDITIONS; `payment ≠ authorization` confirmed; commercial content not approved); final cross-department + workflow-owner completeness (verified all F-01…F-24 against file content, ID/count reconciliation, links, invariants, Actor Matrix — *APPROVE-WITH-CONDITIONS-recommendable*, its documentation-accuracy fixes then applied). Their conditions are folded in; the Gate summary reflects the returned dispositions.

## 12. Process gaps — resolved in v2

- `docs/product/workflow-architecture.md` (canonical entry point) and `docs/product/product-baseline.md` (governed baseline) **created** (F-20, F-21).
- `stridelab-ai/registry/` records **created** — product baseline, Workflow Architecture v2, bounded-context owners, public cross-context contracts, downstream consumers (F-20).
- `stridelab-ai/application-map/` minimum records **created** — bounded-context → `domains/*` mapping and the **14** cross-context contract seams (F-20). No application code paths were invented; `domains/*` already carry the standard scaffold skeleton.
- The v1-named master and current-state files were renamed to v2; all references and version labels updated; version history preserved in this file and in `docs/product/workflow-architecture.md`.

## Gate summary (post independent review)

| Gate | Owner | Status | Basis |
|---|---|---|---|
| G0 — Authority & Context | orchestrator | `PASS_WITH_CONDITIONS` | governed baseline + registry + application-map now exist; authoritative entry point established. |
| G1 — Product / Workflow | 01-product-experience | `PASS_WITH_CONDITIONS` | 86 workflows; previously-missing areas have owning workflows; authorized decisions normative; remaining OPEN items are external policy/legal with protective defaults. Final independent cross-department + workflow-owner completeness review verified all F-01…F-24 against file content → *APPROVE-WITH-CONDITIONS-recommendable*. Conditions = §9.2 register. |
| G2 — Architecture / Contracts | architecture-reviewer (independent) | `PASS_WITH_CONDITIONS` | §8c. Architectural judgement sound; no boundary change; no service extraction. Register **COMPLETE** — 14 contracts × 8 fields in `stridelab-ai/application-map/cross-context-contracts.md`. Not `PENDING`. Conditions = contract-shape design (D02/D03) + `OQ-MEDIA-CACHE-INVALIDATION` (D03) + BE-05 flag-interface shape + a separate approved D06 entitlement artifact before BE-05 implementation. |
| G3 — Security / Privacy / Compliance | 04-security-identity-compliance (independent) | `PASS_WITH_CONDITIONS` | Independent re-review (§8a.2). **No hard youth-safety / privacy / authorization boundary violated**; all ten targeted checks passed; every safe default protective; residual conditions are genuine external policy/legal/D03 matters each defaulted conservatively. |
| G-D06 — Commercial / Governance | 06-business-operations-governance (independent) | `PASS_WITH_CONDITIONS` | Independent review (§8b) by a separate non-authoring reviewer. `payment ≠ authorization` confirmed intact; provider/prices/taxes/refunds/IAP/plan-limits explicitly **not approved** — each now its own §9.2 row; additional conditions on tier-structure ratification, billing-owner, and a consolidated refund/dunning policy. |
| G4 / G5 / G6 / G8 | — | `NOT_APPLICABLE` | no code/config/data change; not a release candidate. |
| G7 — Human Approval | human | `PENDING` | Cannot be self-approved; G7 was not executed and no merge was performed. |

**Overall recommendation:** `AWAITING HUMAN APPROVAL`. All four independently-reviewed gates (G1, G2, G3, G-D06) pass with conditions that are genuine external policy / legal / commercial-governance / D02-D03 implementation-design matters, each protected by a conservative safe default; G2's contract register is complete (not `PENDING`); no reviewer found a hard boundary violation. Human approval (G7) remains outstanding.
