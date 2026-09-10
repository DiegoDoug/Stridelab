# Independent D04 specialist review — Step 2 (feature prioritization + MVP release scope)

**Reviewer identity:** Independent D04 specialist reviewer (subagent), 2026-09-10 — did not author the artifacts.
**Disposition:** `PASS_WITH_CONDITIONS`. **No hard youth-safety, privacy, or authorization boundary is crossed, and product-scope approval is not conflated with legal or launch approval.**

## Scope

Media/messaging exposure vs the safety spine; S-08 preservation-hold fail-safe as an INC-0 dependency of F-01 deletion; invariant #9 genuinely exercised; DOB/age never on a coach/peer path and never client-cached; athlete↔athlete exclusion + multi-subject youth-media block; production-launch legal sign-offs unresolved and not implied covered; no product-scope / legal-or-launch conflation; no `OQ-*`/`CD-*` silently resolved.

## Authoritative inputs

`product-baseline.md` §2–§5, §6A; `WORKFLOW-ARCHITECTURE-v2.md` §5 (#1–#16), §7, §8, §8a.2, §9.1, §9.2; `domain-model.md` §6; `cross-context-contracts.md` 6, 8, 10, 11, 12, 13; `REVIEW-CONTRACT.md`.

## Evidence inspected

`mvp-release-scope.md` §2, §6.3, J-12, J-13, §7.1, §9.1, §9.2, §9.5, INC-0/INC-1/INC-3/INC-5/INC-6/INC-8/INC-9, §10.1, §11.1–§11.4, §13.4/§13.8/§13.9, §14, §15; `feature-prioritization.md` §4 records F-08, F-21, F-22, F-23, F-27, F-28, F-29, F-34/F-34-cond, F-35, F-36, F-37, F-38, F-39, F-42.

## Verified

- The three historically-raised BLOCKING findings are independently confirmed remediated and load-bearing: **D04-B1** (INC-9 + D04 G3 sign-off before any external exposure of INC-5–INC-8, repeated in §10, §10.1, §11.1 G3/G6, §11.3 clause 3); **D04-B2** (S-08 moved to INC-0, INC-1 depends on it, §12 F-01 tests deletion-blocked-under-unconfirmed-hold); **CDR-B1** (§11.2 legal sign-offs + §11.3 clause 7 + §15).
- Invariant #9 is genuinely exercised, not asserted (J-13 — tier flip returns identical results; downgrade revokes no data; build-time rule + audit-trail absence).
- DOB/age never coach/peer/client-cached is consistent (§9.1, §12 F-08, contract 8, F-08 record).
- Athlete↔athlete DMs/media excluded; multi-subject youth media blocked by default.
- No `OQ-*`/`CD-*` silently resolved (§1, §14, §11.3 clause 6; `CD-EC-DELEGATION` → F-P-2, `CD-TEMPLATE-LIBRARY` → F-P-1, both deferred).
- No product-scope / legal / launch conflation — §11.4 and §15 explicitly deny it; the §15 approval statement grants "governed input to MVP implementation" only.

## Blocking findings

None open.

## Non-blocking findings

- **D04-IND-N1.** The INC-9-before-external-media/messaging gate and the INC-3a/INC-3b gate live in gate exit criteria + the completion definition, but no *named enforced control* (feature flag / deploy guard) or S-13 harness / G6-checklist assertion operationalizes "external user exposure"; it rests on D04 sign-off + D05 process.
- **D04-IND-N2.** F-01 deletion (INC-1) and F-37 DSR (INC-9) erasure fan-out into media / vault / messaging is a latent integration obligation not captured as an explicit per-increment G3 condition for INC-5 / INC-6 / INC-8.
- **D04-IND-N3.** The build-time "no BE-05 flag on an authorization path" static check enumerated only `identity`/`teams`/`vault`/`profile`; J-13 also asserts a `performance`-scope check — `performance` was not named in the static rule.
- **D04-IND-N4.** The F-22 record cites capture-time notice (`OQ-MD-CAPTURE-NOTICE`) as a compensating control for an untagged-but-depicted minor, but that control is itself deferred in v1.

## Conditions

| Condition | Owner | Stage | Safe default | Consequence if unmet |
|---|---|---|---|---|
| Operationalize the INC-9 / INC-3a exposure gates with an enforced control + a G6 release-checklist assertion, not sign-off alone | D05 + D04 | G6 | media/messaging surfaces ship flag-disabled for external users until INC-9 D04 G3 sign-off | a 13+ user reaches UGC/media with no report/block/escalation recipient (baseline §5, invariant #14) |
| Each of INC-5 / INC-6 / INC-8 G3 verifies the F-01 / F-37 deletion & DSR erasure fan-out extends into the new context | D04 | G3 per increment | DD-DEPARTED-CONTENT disposition applied per context | minor data orphaned in media / vault / messaging after account deletion |
| Extend the S-02 static typing rule to the `performance` authorization path | architecture-reviewer + D06 | INC-0 / INC-10 / INC-11 G2 | performance scope evaluated by S-02 only, no entitlement input | entitlement state could grow into a performance-visibility predicate |
| G7 approval records the §11.2 legal sign-offs + `OQ-PS-MOD-STAFFING` as explicitly acknowledged launch conditions | D04 + legal-compliance-researcher + Diego | G7 / G6 | conservative defaults in force; no launch | youth product launches with age-verification / jurisdiction / illegal-content duties defaulted and unacknowledged |
| F-22 activation must not rely on a compensating control (capture-time notice) that is not built | D04 | F-22 activation | F-22 disabled; multi-subject re-share + Team publication blocked | untagged-but-depicted minor exposed on publication |
| C-IND — independent per-department confirmation before G7 (this file discharges the D04 lens) | root orchestrator + Department leads | pre-G7 | — | dispositions unconfirmed by an independent reviewer |

## Downstream effect

The two artifacts are sound as the governed input to MVP implementation from a youth-safety, authorization, privacy, retention, deletion, and export standpoint; no hard boundary is crossed and product-scope approval is not conflated with legal or launch approval. D04-IND-N1 and N2 must be discharged at G3/G6 of the media/messaging increments; the §11.2 legal sign-offs and `OQ-PS-MOD-STAFFING` remain open under D04/legal and must be explicit in the G7 record. Feeds the §15 decision package; resolves, converts, and creates no `OQ-*`/`CD-*` item.

## Orchestrator disposition of this review (2026-09-10)

Findings **accepted**. D04-IND-N3 **applied** (`performance` added to the S-02 build-time rule everywhere: feature-prioritization.md §3.1 S-02, mvp-release-scope.md §8.3 contract 6, §9.1, INC-0, INC-11, §12 S-02). D04-IND-N1, N2, N4 recorded as tracked non-blocking conditions in `mvp-release-scope.md` §13.10 with owner + stage + safe default + consequence. The three historic BLOCKING remediations are confirmed intact.
