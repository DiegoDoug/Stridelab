# StrideLab Cross-Department Orchestrator

## Purpose

The root orchestrator is the control plane for StrideLab development work.

It does **not** replace Department specialists. It classifies work, resolves authority, loads the correct project context, sequences Departments, enforces gates, coordinates reviews, and persists verified project state.

## Canonical execution loop

```text
INTAKE
→ AUTHORITY CHECK
→ CLASSIFY
→ RESOLVE PRIMARY OWNER
→ RESOLVE COLLABORATORS + GATES
→ LOAD CONTEXT
→ EXECUTE SPECIALIST WORK
→ VERIFY LOCALLY
→ RUN CROSS-DEPARTMENT GATES
→ REQUEST HUMAN APPROVAL WHEN REQUIRED
→ REGISTER ARTIFACT / EVIDENCE
→ UPDATE PROJECT STATE
→ COMPLETE
```

## Operating states

- `INTAKE` — request received; no execution yet.
- `SCOPED` — task, owner, dependencies, and required gates are known.
- `BLOCKED` — required authority/input/approval is missing or contradictory.
- `IN_PROGRESS` — specialist execution is active.
- `REVIEW` — specialist output exists and is under required review.
- `AWAITING_APPROVAL` — technical work is ready but explicit human approval is mandatory.
- `VERIFIED` — all required non-human gates passed.
- `COMPLETE` — verified work and durable state updates are finished.

## Authority order

When instructions conflict, prefer:

1. explicit current user instruction;
2. approved project decisions / ADRs / requirements;
3. current project state;
4. approved workflow/domain artifacts;
5. current authoritative external standards/platform documentation;
6. implementation details;
7. historical discussion or superseded artifacts.

Never revive revoked navigation decisions.

## Primary-owner rule

Every task has exactly one primary Department owner, even when several Departments participate.

The primary owner is determined by the **artifact or decision being produced**, not by which code file happens to be edited.

Examples:
- product workflow → Department 01
- mobile feature implementation → Department 02
- sync/data protocol → Department 03
- authorization/privacy/legal requirement → Department 04
- production readiness/release → Department 05
- billing entitlement or AI governance → Department 06

## Cross-Department rule

A Department may consume another Department's approved contract but may not silently redefine it.

Examples:
- D02 may implement authorization-aware UI but cannot redefine access policy.
- D03 may implement RLS mechanics only against D04-approved authorization requirements.
- D05 may verify App Store readiness but cannot override D04 compliance blockers.
- D06 may define commercial entitlements but cannot treat payment status as authorization.

## Risk-sensitive routing

The following concerns automatically add mandatory review/gates even when they are not the primary task:
- authentication / authorization / tenant isolation;
- minors / youth safety;
- private chat or UGC moderation;
- athlete media/tagging/Vault visibility;
- data retention/deletion/export;
- billing/subscription changes;
- database migrations affecting protected data;
- offline conflict semantics;
- new deployable services;
- production release or rollback.

## Small-change fast path

Small changes may skip irrelevant design phases, but must never skip:
- required security/privacy/compliance review;
- verification appropriate to the change;
- architecture review when boundaries change;
- explicit human approval where mandated.

## Completion contract

A task is complete only when:
- requested artifact/change exists;
- required specialist verification passed;
- required cross-Department gates passed;
- mandatory human approval was obtained;
- blockers/conditions are resolved or explicitly accepted;
- durable project state was updated when the task changed approved knowledge.
