# Gate Execution

For every task, the orchestrator produces a gate plan:

```text
gate
required? yes/no
owner
input artifact/evidence
status: PENDING | PASS | PASS_WITH_CONDITIONS | FAIL | NOT_APPLICABLE
conditions/blockers
```

Rules:
- `FAIL` on a mandatory gate blocks completion.
- `PASS_WITH_CONDITIONS` is allowed only when conditions are explicit, owned, and do not violate a hard security/compliance/release boundary.
- `NOT_APPLICABLE` requires a reason.
- G7 cannot be self-approved by an AI agent.
