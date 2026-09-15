# Step 3 review — Department 02 (iOS/iPadOS client feasibility)

- **Scope:** whether the §4 destination map and §8 platform-continuity rules are implementable as a coherent client information model without forcing an infeasible shell.
- **Authoritative inputs:** `mvp-release-scope.md` §4 (devices/platforms), §9.3 (offline classes); Apple HIG sources cited in `information-architecture.md` §8.1.
- **Evidence inspected:** the primary-destination count in §4.1–§4.4 (11 `primary`-type rows: D-01, D-02, D-03, D-04, D-05, D-06, D-07, D-08, D-09, D-10, D-17) against the iPhone tab-bar guidance (§8.2: "3–5 recommended"); §9 scenario 10 (offline discovery, PASS WITH CONDITIONS).
- **Blocking findings:** none.
- **Non-blocking findings:**
  - **D02-IA-N1** — 11 primary-type destinations (10 Team-scoped + the separate D-17 root) is well beyond the iPhone tab-bar budget; §8.2 already names this and defers the grouping decision to Step 4, which is the correct boundary (IA owns "what exists," Step 4 owns "how it's arranged into chrome"). Flagged here only to make the condition explicit and trackable rather than an implicit assumption. *Condition:* Step 4 must produce an iPhone grouping (e.g., a "More"/grouped tab) that keeps every object's identity/ownership/relationships unchanged per §8.3 — this is a Step 4 completion gate, not an IA defect.
  - **D02-IA-N2** — §9 scenario 10's condition (D03 confirms an offline-index-freshness threshold at G4) is correctly non-blocking for Step 3 but must not be silently dropped at Step 4; recorded as a condition carried forward.
- **Conditions:** D02-IA-N1 (Step 4 iPhone grouping), D02-IA-N2 (carried from IA §9 scenario 10).
- **Disposition:** **`PASS WITH CONDITIONS`**.
- **Reviewer identity:** Department 02 client-feasibility reviewer (independent pass).
- **Downstream effect:** no artifact edit required; both conditions are explicit Step 4 inputs, already anticipated in `information-architecture.md` §8.2 and §9.
