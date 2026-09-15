# Step 3 remediation review — `workout-performance-engineering`

- **Scope:** confirms the delta preserves athlete ownership of performed work, scope-bounded coach visibility, and honest derived-data semantics.
- **Authoritative inputs:** invariants 4, 5, 15; `domain-model.md` A11/A12/A13/A25–A27; `mvp-release-scope.md` §10 INC-3/INC-10.
- **Evidence inspected:** §1.9 INC-3a/INC-3b/INC-10 rows; §1.11 coach rows; §1.12 F-33/F-34-cond; §4.5 X-1/X-4/X-6; §1.10 rows 4 and 5.
- **Checks performed:**
  - **No coach write path into an athlete log.** §1.10 row 4 cites §2.2 O-07/O-08 — "the client literally does not render an edit control." The increment split (O-07 and O-08 both in INC-3a but on separate aggregates) does not blur this.
  - **Reconciliation never overwrites.** INC-3b owns O-09 and D-28; X-6 forbids last-write-wins and requires attribution. A departed athlete's conflict is held and flagged to the coach, never silently dropped (§1.10 row 16).
  - **Derived data stays derived.** §1.9 places O-23/O-24/O-25 in INC-10 downstream of INC-3b's reconciled records, matching §10's stated dependency; §3.8 (unchanged) keeps every level above source records re-computable.
  - **Aggregates cannot leak individuals.** §1.12 F-33 preserves the rule that a group aggregate may never let a coach infer an out-of-scope athlete's individual value; X-1's honest "not enough data yet" prevents a fabricated metric standing in for absent data.
  - **Scope narrowing is enforced at the next authoritative check**, not at next launch (§6 role-change rule, unchanged; §1.11 coach rows restate the in-scope-only visibility).
- **Blocking findings:** none.
- **Non-blocking findings:** none outstanding.
- **Disposition:** **`PASS`**.
- **Reviewer identity:** Department 01 workout/performance lens, with Department 03 read-model concurrence.
