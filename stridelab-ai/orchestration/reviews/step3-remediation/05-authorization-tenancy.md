# Step 3 remediation review — `authorization-tenancy`

- **Scope:** confirms the new actor matrix, state surfaces and increment map create no path that widens authorization, leaks cross-Team state, or lets entitlement state gate a capability.
- **Authoritative inputs:** `product-baseline.md` §3/§5; `domain-model.md` §6; invariants 2, 3, 4, 8, 9, 15.
- **Evidence inspected:** §1.11 per-actor denial sets; §4.5 X-2/X-3/X-7; §1.12 F-40/F-42; §11 N-7/N-8.
- **Checks performed:**
  - **Event Coach ≠ Head Coach.** §1.11 denies the Event Coach **D-15 entirely** and records the scope/reach asymmetry explicitly (management bounded by `ManagementScope`; private-thread reach Team-wide; feedback delivery still scope-bounded). Invariant 3 and 15 both cited in §1.10.
  - **Coaches cannot edit profiles.** §1.11 states it in both coach rows' denial column; §1.10 row 4 cites §2.1 O-05 and the "no rendered edit control" rule on O-08.
  - **Cross-Team isolation.** §1.11's cross-Team column is populated for every actor; the multi-Team row (after RP-B2) names D-18 and restates that a Team-A link never silently switches context.
  - **Entitlement never widens authorization.** §1.12 F-40 ships the field only; §11 N-8; the CDR-N2 adjacency assertion still passes, and §1.9 note 4 confirms INC-11 adds no surface.
  - **Denial never leaks existence.** §4.5 X-2's "Never does" column forbids lock icons and greyed placeholders and binds X-2/X-3 to §7's counting rule.
- **Blocking findings:**
  - **RP-B2** — the multi-Team actor row named no primary destination, leaving the actor with no coherent entry point and no place where the isolation guarantee is anchored. *Remediation applied:* D-18 named as the actor's own destination. *Re-verified:* `09-reverify.md`; machine-asserted by validator check 11.
- **Non-blocking findings:** none outstanding.
- **Disposition:** **`PASS WITH CONDITIONS`** — no boundary crossed; the delta tightens rather than relaxes.
- **Reviewer identity:** Department 04 authorization/tenancy reviewer (independent pass).
