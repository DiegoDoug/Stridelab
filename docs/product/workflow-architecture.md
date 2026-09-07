# StrideLab Workflow Architecture — Canonical Entry Point (v2)

**This file is the single authoritative location for the StrideLab Workflow Architecture.**
Status: `AWAITING HUMAN APPROVAL` (conditional — see [Gate summary](#gate-summary)).
Owning Department: 01 Product & Experience. Last advanced: 2026-09-06 (v2 correction pass).

## Authoritative vs supporting

| Role | Location |
|---|---|
| **Authoritative entry point** (this file) | `docs/product/workflow-architecture.md` |
| Governed product baseline | `docs/product/product-baseline.md` |
| Supporting specification index | `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` |
| Supporting per-category specs (86 workflows, 13 categories) | `stridelab-ai/knowledge/workflows/*/WORKFLOWS.md` |
| Registry records | `stridelab-ai/registry/` |
| Application map | `stridelab-ai/application-map/` |
| Current state record | `stridelab-ai/project-memory/current-state/workflow-architecture-v2.md` |
| Domain model (companion, stub) | `docs/product/domain-model.md` |

Where wording differs, **this file governs**, then `product-baseline.md`, then the supporting spec. The supporting spec carries the full per-workflow detail (actors, capability/trigger, preconditions, authorization assumptions, states, transitions, happy/alternate paths, errors/recovery, offline behaviour, sync implications, notifications, audit, exit condition, downstream artifacts, open questions). Do **not** duplicate that detail here.

## Version history

- **v1 draft (2026-09-05)** — 76 workflows / 12 categories. Uncommitted; never approved. Superseded.
- **v1 remediation pass (2026-09-06)** — findings F-01…F-12 applied; `profile/` + IT-09/SE-09/PS-07/PS-08/PS-09 added (84 workflows). Superseded.
- **v2 correction pass (2026-09-06)** — this version. Authorized product decisions made normative; findings F-13…F-24 completed; SE-10 + MG-07 added (86 workflows); canonical entry point, governed baseline, registry and application-map created; **four independent reviews run** (architecture-reviewer/G2, Department 04/G3, Department 06/billing, final cross-department + workflow-owner completeness), their conditions folded in, the cross-context contract register completed to 14 seams.

## Scope constraint

Architecture and specification only. No application code, database schema, API, UI component, or navigation was created or modified. "Capability / trigger" fields describe *when a capability is available and to whom*, never a screen. Section [IA implications](#ia-implications) is implications-only.

---

## Inventory (86 workflows, 13 categories)

| Category | IDs | Count |
|---|---|---|
| Identity & Team | IT-01…IT-09 | 9 |
| Profile | PR-01…PR-03 | 3 |
| Team Administration | TA-01…TA-07 | 7 |
| Training Planning | TP-01…TP-08 | 8 |
| Practice / Session Execution | SE-01…SE-10 | 10 |
| Personal Workouts | PW-01…PW-03 | 3 |
| Media Capture & Library | MD-01…MD-07 | 7 |
| Video Analysis | AN-01…AN-07 | 7 |
| Vault & Sharing | VS-01…VS-04 | 4 |
| Communication | MG-01…MG-07 | 7 |
| Performance & History | PF-01…PF-06 | 6 |
| Billing / Entitlements | BE-01…BE-06 | 6 |
| Privacy / Safety | PS-01…PS-09 | 9 |
| **Total** | | **86** |

---

## Cross-workflow invariants

The 16 invariants are maintained in the supporting spec (`WORKFLOW-ARCHITECTURE-v2.md` §5) and are authoritative there by reference. In brief: hierarchy; single Head Coach; Event-Coach management/communication asymmetry; **coach edit boundary** (no coach/admin write of athlete-owned profile or performed-work truth; SE-08 locks prescribed structure only; SE-10 preserves the athlete's audited correction path); prescription ≠ performance; personal-workout non-elevation; **tag ≠ grant ≠ share ≠ publish** (VS-01 is an explicit server-authoritative grant, not automatic); Vault visibility only from an explicit grant/share; **payment ≠ authorization**; age-13+ (PS-07 handles discovery, restricted-first); no navigation designed here; destructive-transition discipline; offline honesty (SE-09 for divergence, never last-write-wins); **safety-critical notification state** (transactional in-app state + durable retry + idempotent processing + delivery/ack state + audited terminal failure + human escalation — no literal "guaranteed delivery"; safety class cannot be disabled); **communication reach ≠ any other scope**; DD-DEPARTED-CONTENT.

---

## Normative product decisions (v2)

The full decision table is in `WORKFLOW-ARCHITECTURE-v2.md` §9.1. Headlines:

- **Profile** is user-owned; not publicly discoverable; peers get minimum Team identity only; coach profile access follows current role + management scope; date-of-birth/age evidence is restricted to the identity subsystem and authorized safety functions; other contexts get only a derived `is_minor` flag.
- **Tagging** (MD-05) is identification only and never grants Vault access. **Vault access requires a distinct, explicit, server-authoritative grant** (VS-01).
- **Media sharing** (VS-02): coaches share only within current management scope; **athlete-to-athlete media sharing is disabled in v1**; **multi-subject youth media cannot be peer-reshared or broadly published by default**.
- **Chat attachments** that broaden visibility create a formal, independently revocable and auditable VS-02 or MD-06 record; offline submission stays pending until server confirmation.
- **Team closure** (IT-09): `active → closure_pending → archived → deletion_eligible → deleted_or_anonymized`; the final Head Coach must transfer ownership or initiate closure; archive-first, recoverable before the irreversible stage; membership-derived access ends immediately; **no indiscriminate cascading deletion**.
- **DD-DEPARTED-CONTENT**: athlete-owned profiles / performed-work logs / personal workouts stay with the athlete; Team plans and administrative records stay with the Team; authored messages and restricted audit evidence follow the approved retention policy.
- **Personal workouts**: disabling `personal_workouts_allowed` blocks new creation and execution in the Team context but never deletes existing private workouts and never blocks private correction or export.
- **Scope changes**: narrowing revokes future not-started prescriptions outside the new scope; in-progress execution enters SE-09; historical athlete-authored truth is preserved; Event Coaches receive identifiable performance data only for currently-managed athletes; structured feedback/analysis require current management scope; athletes always retain access to their own data; Head Coaches retain Team-authorized scope.
- **Event Coach administration**: Event Coaches cannot assign athletes or administer Event Groups/Subgroups in v1 (`CD-EC-DELEGATION`).
- **Blocking** (F-17, MAJOR): stops DMs/mentions/tags/shares/discovery; preserves evidence; does not alter membership; mute/collapse in shared channels when safe; critical Team and safety communications always retain an honest path; minor-blocks-coach offers a private report path; restricted safety telemetry stored without automatic punishment or disclosure to Team leadership.
- **Finalized sessions** (F-23, MAJOR): coach finalization locks the prescribed Session structure only; athletes retain an audited post-finalization correction workflow (SE-10) that preserves original value + amendment + timestamp + actor + reason; finalized history is never silently rewritten.
- **Under-13** (PS-07): a credible signal moves the account to `restricted_pending_review` (ordinary use and unnecessary processing stop immediately, no irreversible action); the Platform Safety Administrator determines; confirmed ineligibility → governed closure and data handling; mistaken determinations permit audited restoration.
- **Moderation owner**: `Platform Safety Administrator` — a least-privilege platform actor owned by Department 04. Reports implicating a Head Coach bypass Team leadership. Suspected illegal content is access-restricted, protected from redistribution, securely preserved, and routed to qualified safety/legal review.
- **Notifications**: see invariant above; safety class cannot be disabled, operational class may change channel but stays in-app, social class may be bundled/muted/quiet-hours (MG-07).

---

## Remaining OPEN decisions

Every remaining OPEN item is an **external policy / legal / implementation** matter protected by a conservative safe default so v1 can proceed. The full register (ID · owner · evidence required · safe default · affected workflows · blocking stage) is in `WORKFLOW-ARCHITECTURE-v2.md` §9.2. Categories: age-verification strength and rejected-attempt retention; join mechanism; account-deletion grace window; retention durations and deletion-vs-anonymisation; Event Coach delegation (candidate decision); profile field catalogue and per-field classification; media capture-time consent; multi-subject re-share **consent mechanism** (default: blocked); Head-Coach channel visibility (default: none); coach-athlete thread oversight (default: none); moderation staffing / SLA / classification thresholds; guardian standing and jurisdiction-specific duties; billing provider / prices / taxes / refunds / IAP / plan limits / trial / over-limit / grace (all Department 06, not approved here).

---

## Findings F-01…F-24 closure

<a name="closure"></a>

| ID | Sev | Status | How resolved |
|---|---|---|---|
| F-01 | BLOCKING | Closed | `profile/` category (PR-01…PR-03); visibility model made **normative** in v2 (not publicly discoverable; peers min identity; coach = role+scope; DOB/age restricted). |
| F-02 | BLOCKING | Closed | IT-09 Team Closure — v2 five-state archive-first lifecycle + DD-DEPARTED-CONTENT. |
| F-03 | BLOCKING | Closed | VS-02: coach share = in-scope only (**normative**); athlete-to-athlete disabled; multi-subject onward re-share blocked by default. |
| F-04 | BLOCKING | Closed | MG-05: visibility-broadening attachment creates a formal VS-02 / MD-06 record, inherits that transition's controls, pending until server-confirmed. |
| F-05 | MAJOR | Closed | G2 routed to an **independent** `architecture-reviewer`. Architectural judgement sound; the review's register defects (6 rows missing fields, 4 unregistered seams, broken pointer) were then fixed — the authoritative matrix `stridelab-ai/application-map/cross-context-contracts.md` now has **14 contracts**, each with all 8 fields. G2 = PASS WITH CONDITIONS, register **COMPLETE**, not `PENDING` (supporting spec §8c). |
| F-06 | MAJOR | Closed | **Independent** Department 06 review of BE-01…BE-06 (§8b) — PASS WITH CONDITIONS; commercial content not approved and correctly deferred. |
| F-07 | MAJOR | Closed | PS-07 corrected: `restricted_pending_review` first (use stops, data preserved), Platform Safety Administrator determination, governed closure on confirmation, audited restoration. Immediate global termination is **not** the first consequence. |
| F-08 | MAJOR | Closed | SE-09 reconciliation workflow (state machine + non-loss/attribution guarantees; UX is `OQ-SE-RECONCILE-UX`). |
| F-09 | MAJOR | Closed | PS-08 Data Subject Request Intake (access/export/correction/deletion; guardian-initiated). |
| F-10 | MAJOR | Closed | Canonical `Platform Safety Administrator` (least-privilege, Department 04); Head-Coach-implicated bypass; PS-09 access-restrict + protect-from-redistribution + securely-preserve + route to safety/legal. |
| F-11 | MAJOR | Closed | VS-01 = **explicit, server-authoritative grant** (renamed "Grant Tagged Athlete Vault Access"); not automatic; per-athlete deliberate grants for multi-subject media. |
| F-12 | MAJOR | Closed | Every literal "guaranteed delivery" replaced with the transactional-state / durable-retry / idempotent / delivery-ack / audited-terminal-failure / human-escalation model (invariant #14); safety class cannot be disabled (MG-07). |
| F-13 | MINOR | Closed | All navigation-shaped "Entry point" fields replaced with capability-based "Capability / trigger" phrasing across all 13 category files. |
| F-14 | MINOR | Closed | TA-07 / PW-01…03 "assumes yes" / "potentially edit" language removed; personal-workout-on-disable behaviour is now **normative** (block new create/execute; retain existing; allow private correction/export). |
| F-15 | MINOR | Closed | TP-06 scope-narrowing, AN-07 feedback-scope, PF-01 current-scope-only made **normative**; duplicate confirmation questions removed. |
| F-16 | MINOR | Closed | Single `DD-DEPARTED-CONTENT` decision in `identity-team/WORKFLOWS.md`, referenced from IT-06, IT-08, IT-09, TA-01, MD-07. |
| F-17 | MAJOR (reclassified) | Closed | Blocking behaviour specified normatively across MG-01/02/03/06 (stops DM/mention/tag/share/discovery; preserves evidence; mute/collapse when safe; safety path preserved; minor→coach private report path; restricted telemetry, no auto-punishment, no disclosure to Team leadership). |
| F-18 | MINOR | Closed | Event Coach removed from TA-04 (and TA-02/TA-03/IT-03/IT-06) authority; Actor Matrix aligned; future delegation = `CD-EC-DELEGATION`. |
| F-19 | MINOR | Closed | MG-07 Notification Preferences (safety / operational / social classes; safety un-disable-able; social bundle/mute/quiet-hours). |
| F-20 | INFORMATIONAL | Closed | Governed baseline (`docs/product/product-baseline.md`), registry records (`stridelab-ai/registry/`), and minimum application-map (`stridelab-ai/application-map/`) created. |
| F-21 | INFORMATIONAL | Closed | Canonical output location reconciled: **this file** is authoritative; the `stridelab-ai/knowledge/workflows/` tree is the supporting spec; `docs/product/domain-model.md` companion stub created. |
| F-22 | INFORMATIONAL | Closed | The overstated v1 "Department 04 confirmed no other open question was incorrectly treated as settled" is corrected — the independent D04 re-review (§8a.2) supersedes it and enumerates what it found. |
| F-23 | MAJOR (reclassified) | Closed | SE-10 Athlete Post-Finalization Correction — audited amendment, original preserved, reason mandatory, finalized history never silently rewritten. |
| F-24 | INFORMATIONAL | Closed | Preservation checklist below; all listed v1 strengths verified intact. |

### F-24 preservation checklist (verified intact after the v2 pass)

- [x] **payment ≠ authorization** — BE-* has no arrow into any authorization-sensitive category (§3 of supporting spec); independent D06 review confirms (§8b).
- [x] **tag ≠ grant ≠ share ≠ publish** — five independently representable/auditable transitions; VS-04 checkpoint updated to name the explicit VS-01 grant.
- [x] **Vault visibility only from an explicit grant/share** — never from membership, group assignment, or tag presence (invariant #8; VS-01 rewrite).
- [x] **prescription/performance separation** — TP-04 vs SE-05/06/07/SE-10 kept distinct; SE-09/SE-10 authorization assumptions forbid a coach overwriting athlete-logged data.
- [x] **personal-workout structural isolation** — PW-* never merges into training-planning/session-execution; disable behaviour normative and non-destructive.
- [x] **destructive-transition discipline** — invariant #12 list extended (IT-09 stages, PS-07 closure, PS-09 hold, SE-10 amendment).
- [x] **age-13 hard gate** — IT-01/PS-01 unchanged; PS-07 adds the discovered-under-age response (restricted-first).
- [x] **offline honesty** — invariant #13; SE-09 for divergence; offline grants/attachments pending until server-confirmed.
- [x] **coach cannot edit athlete-owned data** — invariant #4; extended to make SE-08 finalization lock the prescribed structure only.
- [x] **no revoked navigation revived; no navigation designed** — F-13 capability phrasing; §10 implications-only.

---

## Independent reviews & Gate summary

<a name="gate-summary"></a>

Four **independent** reviews were run for the v2 continuation (each by a separate reviewer, not the authoring agent), plus a workflow-owner completeness check: (1) `architecture-reviewer` / G2; (2) Department 04 authorization/privacy/youth-safety / G3; (3) Department 06 billing; (4) final cross-department + workflow-owner completeness. Every reviewer cited inspected-artifact evidence (file + line). All four returned **PASS WITH CONDITIONS** (or, for the completeness check, *APPROVE-WITH-CONDITIONS-recommendable*); their conditions have been folded into the artifacts (14-contract register completed; F-16 back-references added; broken `§G2` pointer fixed; `OQ-PS07-JURISDICTION` given an explicit default; billing OPEN rows split out; residual "guaranteed" wording removed). No reviewer found a hard architecture, safety, privacy, or authorization boundary violation.

| Gate | Owner | Disposition | Evidence |
|---|---|---|---|
| G0 — Authority & Context | orchestrator | `PASS_WITH_CONDITIONS` | governed baseline + `stridelab-ai/registry/` + `stridelab-ai/application-map/` now exist; this file is the established authoritative entry point. |
| G1 — Product / Workflow | 01-product-experience | `PASS_WITH_CONDITIONS` | Final independent cross-department + workflow-owner completeness review verified all F-01…F-24 against file content, 86 contiguous IDs, normative decisions, the §9.2 OPEN register format, invariant spot-checks, and Actor-Matrix consistency — verdict *APPROVE-WITH-CONDITIONS-recommendable*, remaining items being the documentation-accuracy fixes now applied. Conditions = the §9.2 register. |
| G2 — Architecture / Contracts | architecture-reviewer (independent) | `PASS_WITH_CONDITIONS` | Register **COMPLETE**, not pending (`WORKFLOW-ARCHITECTURE-v2.md` §8c; authoritative matrix `stridelab-ai/application-map/cross-context-contracts.md`, 14 contracts × 8 fields). Architectural judgement sound; no bounded-context boundary changed; no service extraction. Conditions: contract *shapes* (schemas/transport) by D02/D03 at implementation-design time; `OQ-MEDIA-CACHE-INVALIDATION` (D03); BE-05 flag-interface shape (contract 6); a separate approved D06 entitlement artifact before any BE-05 implementation. |
| G3 — Security / Privacy / Compliance | 04-security-identity-compliance | `PASS_WITH_CONDITIONS` | Independent re-review (`WORKFLOW-ARCHITECTURE-v2.md` §8a.2). No hard youth-safety/privacy/authorization boundary violated; every safe default is protective; residual OPEN items are genuine external policy/legal (retention durations, jurisdiction duties, moderation staffing/SLA, the multi-subject consent *mechanism*), each defaulted conservatively (e.g. multi-subject re-share **blocked** by default). |
| G-D06 — Commercial / Governance | 06-business-operations-governance (independent) | `PASS_WITH_CONDITIONS` | Independent review (`WORKFLOW-ARCHITECTURE-v2.md` §8b) by a separate non-authoring reviewer. `payment ≠ authorization` confirmed intact (no BE-* arrow into any authorization-sensitive context; authority flows into billing only). provider/prices/taxes/refunds/IAP/plan limits/trial/grace explicitly **not approved** — each now its own §9.2 register row, deferred to a separate approved D06 artifact. Additional conditions: explicit D06 ratification of the Free/Mid/Top structure; billing-owner decision; consolidated refund/dunning policy. |
| G4 / G5 / G6 / G8 | 02–05 | `NOT_APPLICABLE` | no code/config/data change; not a release candidate; no production change. |
| G7 — Human Approval | human | `PENDING` | Cannot be self-approved by an AI agent. |

**Overall recommendation:** `AWAITING HUMAN APPROVAL`. All four independently-reviewed gates (G1, G2, G3, G-D06) pass with conditions that are genuinely external policy / legal / commercial-governance / D02-D03 implementation-design matters, each protected by a conservative safe default; G2's register is complete (not `PENDING`); no hard boundary is violated. Human approval (G7) remains outstanding; G7 was not executed and no merge was performed.

---

## IA implications

<a name="ia-implications"></a>

Implications only — not a navigation design, screen inventory, or IA proposal. See `WORKFLOW-ARCHITECTURE-v2.md` §10 for the full list: two independent lenses (manage vs reach) not merged; planned-vs-happened kept distinct with a visible amendment history on finalized sessions; multi-state media visibility with a distinct "grant access" affordance; profile surfaces render per the normative visibility model (no discoverability, DOB/age never shown to peers/coaches); an explicit archive-first recoverable Team-closure flow; conflict-/amendment-surfacing interactions for SE-09/SE-10 that never let a coach edit athlete-logged data; universal report/block affordances with a minor→coach private report path; three visible notification classes. None revives a revoked navigation decision.
