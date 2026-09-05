# /implement-billing-webhooks

**Department:** Business Operations & Governance  
**Command group:** `billing`  
**Owning agent:** `billing-entitlements-engineer`  
**Command class:** `implementation`

## Intent

Execute the approved StrideLab workflow for **implement billing webhooks** using the owning agent and required core skills.

## Required skills

- `billing-entitlements`

Load core skills from:

`stridelab-ai/departments/06-business-operations-governance/skills/core/<skill-name>/`

## Preconditions

Before execution:
- read `stridelab-ai/project-memory/current-state/`;
- resolve relevant approved decisions, requirements, ADRs, workflows, and reviews;
- inspect `stridelab-ai/application-map/` if application code or module ownership is affected;
- confirm the task falls within `billing-entitlements-engineer` ownership;
- identify required cross-Department handoffs or blocking gates.

If a required upstream artifact is missing or materially ambiguous, do not invent it. Escalate through the Department lead/root orchestrator.

## Inputs

Accept the minimum task-specific inputs needed to identify:
- target subject/resource/feature;
- requested scope;
- relevant release/team/platform/environment when applicable;
- supplied artifacts or constraints.

Do not require the user to restate information already available in current project context.

## Procedure

1. Resolve the approved design/requirement and affected application modules.
2. Inspect existing implementation before editing; preserve established architecture and contracts.
3. Implement the smallest coherent change, including required tests/configuration/migrations.
4. Run targeted verification plus relevant broader checks before reporting completion.

## StrideLab constraints

- Use approved project-memory artifacts and current application-map boundaries.
- Do not redefine policy owned by another Department; consume an explicit handoff.
- Do not mark the task complete without the owning skill's required validation.
- Commercial entitlement must remain separate from security authorization.
- Do not promote unapproved proposals into project memory as approved decisions.

## Output contract

A coherent code/configuration change plus tests and implementation notes.

Every material result must state:
- scope completed;
- authoritative inputs used;
- affected artifacts/modules;
- verification performed;
- blockers, conditions, or required handoffs;
- whether durable project memory must be updated.

## Verification

Use the owning skill's validation procedure first. Then run task-specific checks appropriate to the command.

A PASS/complete claim must be backed by observed evidence. If verification is partial, state the exact coverage limitation.

## Cross-Department behavior

When another Department owns a required decision or gate:
1. preserve that Department's authority;
2. consume its approved artifact if available;
3. otherwise produce a handoff/blocker instead of embedding an assumption.

Security, privacy, legal/compliance, and release gates cannot be bypassed by this command.

## Failure behavior

Stop or return a conditional result when:
- required authority/input is missing;
- implementation would violate an approved invariant;
- a required verification fails;
- the requested action exceeds the owning agent's permissions;
- an irreversible/production-sensitive action lacks approval.

Do not silently weaken scope, security, privacy, or verification to force completion.
