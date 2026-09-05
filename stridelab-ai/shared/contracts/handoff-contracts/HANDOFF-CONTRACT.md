# Cross-Department Handoff Contract

Every material handoff must include:

```yaml
handoff_id:
from_department:
from_agent:
to_department:
to_agent_or_role:
upstream_artifacts:
scope:
approved_constraints:
required_work:
security_privacy_requirements:
acceptance_criteria:
verification_required:
open_questions:
blockers:
status:
```

## Rules

- Handoffs transfer work, not policy ownership.
- Downstream agents may not silently reinterpret approved constraints.
- If an upstream artifact changes, invalidate or re-review dependent handoffs as necessary.
- Open questions must not be treated as approved assumptions.
