# /prioritize-features

**Department:** Product & Experience  
**Command group:** `strategy`  
**Owning agent:** `product-strategist`  
**Command class:** `workflow`

## Intent

Execute the approved StrideLab workflow for **prioritize features** using the owning agent and required core skills.

## Required skills

- `product-strategy`
- `user-research-usability`

Load core skills from:

`stridelab-ai/departments/01-product-experience/skills/core/<skill-name>/`

## Preconditions

Before execution:
- read `stridelab-ai/project-memory/current-state/`;
- resolve relevant approved decisions, requirements, ADRs, workflows, and reviews;
- inspect `stridelab-ai/application-map/` if application code or module ownership is affected;
- confirm the task falls within `product-strategist` ownership;
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

1. Resolve intent, owner, inputs, and required upstream artifacts.
2. Execute the owning skill's workflow without crossing Department policy boundaries.
3. Verify outputs against the artifact contract and downstream acceptance criteria.
4. Record blockers and required handoffs explicitly.

## StrideLab constraints

- Use approved project-memory artifacts and current application-map boundaries.
- Do not redefine policy owned by another Department; consume an explicit handoff.
- Do not mark the task complete without the owning skill's required validation.
- Do not use revoked navigation decisions as authority; navigation must derive from approved workflows and information architecture.

## Output contract

A task-appropriate artifact or code change matching the owning skill's output contract.

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
