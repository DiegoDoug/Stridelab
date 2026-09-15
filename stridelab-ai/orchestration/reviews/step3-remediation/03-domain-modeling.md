# Step 3 remediation review — `domain-modeling`

- **Scope:** confirms the delta's object→increment and object→invariant claims match the approved consolidated domain model's aggregate ownership, and that no hierarchy is collapsed by the new sections.
- **Authoritative inputs:** `domain-model.md` §3/§4/§4.1/§5/§6/§7; `WORKFLOW-ARCHITECTURE-v2.md` §5.
- **Evidence inspected:** §1.9's "Objects first delivered" column against the aggregate catalogue (A1…A35); §1.10's 16 rows against §5; §4.5's state vocabulary against O-30 and the A13 reconciliation aggregate.
- **Checks performed:** O-30 correctly lands in **INC-0** (it is the sync substrate's state vocabulary, not a user object). O-07/O-08 correctly split across INC-3a as *separate* aggregates (A11 vs A12) — the delta does not re-merge them. O-14/O-15 correctly land in **INC-6**, not INC-5, preserving "tag ≠ grant." O-05 Profile lands in INC-1 with F-08, and §1.10 row 4 cites the no-coach-write-path evidence.
- **Blocking findings:** none.
- **Non-blocking findings:**
  - **RP-N1** — §1.9 used `INC-3a`/`INC-3b` row keys while `mvp-release-scope.md` §10 uses a single `INC-3` heading with named sub-increments; the relationship was implicit. *Remediation applied:* §1.9 note 5 states `INC-3` = `INC-3a` ∪ `INC-3b` and that no increment is added, removed, or re-scoped. Accepted: the sub-increment split is load-bearing for the IA because the INC-3a→INC-3b exposure gate is modelled as state X-6.
- **Disposition:** **`PASS WITH CONDITIONS`** — no aggregate boundary implied, moved, or merged.
- **Reviewer identity:** `domain-workflow-architect`, Department 01.
- **Downstream effect:** none; the domain model is unchanged.
