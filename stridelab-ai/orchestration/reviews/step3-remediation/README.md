# Step 3 — Information Architecture remediation pass (independent review)

**Subject:** the Step-3 remediation applied to `docs/product/information-architecture.md` on
top of the reviewed version that passed the original 7-lens Step 3 gate
(`../step3-information-architecture/`) and the combined cross-department review
(`../step3-4-cross-department/`).

**Why a second pass:** the original Step 3 gate reviewed an artifact that did not yet
carry increment traceability, invariant coverage, actor coverage, conditional-capability
treatment, system-state surfaces, or explicit non-goals. Those sections are new, so they
have not previously been reviewed by anyone. This pass reviews **the delta**, not the
already-gated body.

**Scope of the delta reviewed**

| Added / changed | Location |
|---|---|
| Increment traceability `INC-0…INC-11` | IA §1.9 |
| Invariant coverage (all 16) | IA §1.10 |
| Actor coverage | IA §1.11 |
| Conditional-capability treatment (9, none activated) | IA §1.12 |
| System-state surfaces `X-1…X-7` | IA §4.5 |
| Explicit non-goals `N-1…N-13` | IA §11 (footer renumbered to §12) |
| Upstream commit pins refreshed | IA §1.1, `navigation-specification.md` §12 |
| Destination count corrected 27 → 28 | registry + both current-state records |
| Validator extended (checks 9, 9b, 10–17) + coverage counts | `stridelab-ai/scripts/validate-step3-4-artifacts.mjs` |

**Lenses (13).** `information-architecture` (owner self-check), `product-strategy`,
`domain-modeling`, `workflow-architecture`, `authorization-tenancy`, `accessibility-design`,
`youth-safeguarding-trust-safety`, `privacy-data-governance`, `offline-local-first-engineering`,
`media-engineering`, `training-planning-engineering`, `workout-performance-engineering`,
`quality-engineering`.

## Finding register

| ID | Severity | Lens | Owner | Status | Closure evidence |
|---|---|---|---|---|---|
| **RP-B1** | **BLOCKING** | workflow-architecture | `ux-architect` | **CLOSED** | D-15 was claimed as first-delivered by both INC-1 and INC-11. Caught by the new §1.9 uniqueness check *before commit*; INC-11's cell reworded to claim no destination. Re-verified: `destinations_uniquely_owned: 28`. |
| **RP-B2** | **BLOCKING** | authorization-tenancy | `ux-architect` | **CLOSED** | The multi-Team actor row named no primary destination, leaving the actor with no coherent entry. Caught by the new §1.11 check *before commit*; D-18 named explicitly. Re-verified: `actors_covered: 7`, check passes. |
| **RP-B3** | **BLOCKING** | product-strategy | `ux-architect` | **CLOSED** | §1.9 assigned **F-22 / O-13 an owning increment (INC-8)** that the approved `mvp-release-scope.md` §10 never schedules — an unapproved extension of the governed sequence. Remediated: O-13 assigned to **no** increment; §1.9 note 6 and §1.12 record why. Verified against §10: F-22 appears there only as an inherited *block*, never as a deliverable. |
| **RP-N1** | non-blocking | domain-modeling | `ux-architect` | **CLOSED** | §1.9 used `INC-3a`/`INC-3b` row keys without stating their relationship to §10's `INC-3` heading. §1.9 note 5 added: `INC-3` = `INC-3a` ∪ `INC-3b`; no increment added, removed, or re-scoped. |
| **RP-N2** | non-blocking | offline-local-first-engineering | `ux-architect` | **CLOSED** | X-5 (Queued) omitted **D-03**, although §2.2 O-06 states drafts may be authored offline and sync on publish. D-03 added to X-5's owning set with the §2.2 citation. |
| **RP-N3** | non-blocking | accessibility-design | `ux-research-accessibility-reviewer` | **CLOSED** | §4.5 required a static accessible label per state but not an announcement on state *entry*. Added: entering/leaving X-1…X-7 must be announced to assistive technology; mechanism deferred to Step 4/5 (§11 N-3). |
| **RP-N4** | non-blocking | quality-engineering | `quality-release-lead` | **CLOSED** | The validator proved feature/destination coverage but not **journey** coverage. Check 9b added; `journeys_walked: 13`; negative-tested (dropping J-12 → exit 1). |
| **RP-C1** | condition (carried) | offline-local-first-engineering | D03 | **OPEN — carried, not new** | The offline-index-freshness threshold (IA §9 scenario 10) remains a D03 G4 item. Unchanged by this pass; no new `OQ-*` created. |

**Zero open BLOCKING findings.** RP-B1…RP-B3 are closed and independently re-verified (§`09-reverify.md`).

**No upstream artifact was changed.** The approved product baseline, workflow architecture,
domain model, feature prioritization, and MVP release scope are byte-identical to `main`
after the merge — asserted in `09-reverify.md`.
