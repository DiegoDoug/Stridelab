# Agent Routing

## Selection algorithm

1. Resolve the primary Department.
2. Resolve the narrowest specialist agent whose ownership matches the requested artifact.
3. Use the Department lead when:
   - ownership is ambiguous inside the Department;
   - multiple specialists must be sequenced;
   - a Department-level conflict exists.
4. Use an independent reviewer after material implementation where one exists.
5. Use root agents only for cross-Department coordination, architecture-wide review, or project-memory governance.

## Root agents

- `stridelab-orchestrator` — routing/sequencing/gates
- `architecture-reviewer` — cross-cutting architecture boundaries
- `cross-department-reviewer` — consolidated multi-Department review
- `project-memory-manager` — durable project state

## Independence

Do not use the same specialist as the sole independent reviewer of its own material work when a reviewer agent exists.
