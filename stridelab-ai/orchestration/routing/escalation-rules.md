# Escalation Rules

Escalate to the Department lead or root orchestrator when:
- upstream approved artifacts are missing or contradictory;
- more than one Department claims primary ownership;
- a bounded-context boundary or deployable-service topology would change;
- implementation conflicts with security/privacy/legal requirements;
- a release gate fails;
- a volatile external claim cannot be verified from authoritative sources;
- the requested action is irreversible or production-sensitive;
- an agent would need authority it does not have.

Escalation output must state:
- blocker;
- affected artifact/work;
- owning authority;
- evidence;
- smallest decision needed to resume.
