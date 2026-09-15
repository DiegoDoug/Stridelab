# Step 3 remediation review — `training-planning-engineering`

- **Scope:** confirms the delta keeps prescription, execution and personal training in separate hierarchies and grants no athlete planning authority.
- **Authoritative inputs:** invariants 5 and 6; `domain-model.md` A5–A12, A14; `mvp-release-scope.md` §10 INC-2/INC-3/INC-4.
- **Evidence inspected:** §1.9 INC-2/INC-3a/INC-3b/INC-4 rows; §1.11 Athlete row; §1.12 F-10/F-19; §11 N-7; §1.10 rows 5 and 6.
- **Checks performed:**
  - **Athletes have no planning surface.** §1.11's Athlete denial column states **no D-03**, with assigned work reaching them via D-01/D-04. §11 N-7 makes it a named non-goal and ties F-19 to the Head Coach's Team setting explicitly.
  - **Personal workouts stay isolated.** §1.9 gives O-10 its own increment (INC-4) and marks both D-05 and O-10 conditional; §1.10 row 6 cites the disable semantics — existing records retained, correction and export preserved, only new creation blocked with the reason stated.
  - **Prescription ≠ performance.** §1.9 splits O-06 (INC-2) from O-07/O-08 (INC-3a) across increment boundaries; §1.10 row 5 cites the `PrescriptionVersionMarker` and the A8/A11/A12 separation.
  - **Templates stay inert and author-private.** §1.12 F-10 preserves the INC-2 G4 activation condition and explicitly excludes a shared library (`CD-TEMPLATE-LIBRARY` / F-P-1).
  - **Offline drafting is now covered** — see RP-N2, raised by the offline lens and applicable here: D-03 is a genuine offline authoring surface and now carries the queued state.
- **Blocking findings:** none.
- **Non-blocking findings:** none outstanding.
- **Disposition:** **`PASS`**.
- **Reviewer identity:** Department 01 training-planning lens, with Department 02 client-feasibility concurrence.
