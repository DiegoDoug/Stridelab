# Step 3 review — Department 04 (authorization, privacy, youth-safety)

- **Scope:** confirms no destination, object, or discovery path in the IA exposes an inaccessible person/object, conflates payment/tier with authorization, treats Vault as a Team-wide feed, or narrows a coach-edit/authorization boundary.
- **Authoritative inputs:** `product-baseline.md` §3/§5; `domain-model.md` §6 invariant map; `mvp-release-scope.md` §9.1/§9.2.
- **Evidence inspected:** §2.1 O-05 Profile visibility rows (PR-03); §2.3 O-11/O-14/O-15 Vault rules (VS-04); §2.5 O-29 Team Tier State "non-negotiable design rule" (invariant #9); §5.2 privacy-safe discoverability rules; §7 search scoping and the "empty results identical whether zero-match or unauthorized" rule; the new **IA-OQ-4** from the domain-workflow-architect review (03).
- **Blocking findings:** none.
- **Non-blocking findings:**
  - **D04-IA-N1** — confirms and **ratifies IA-OQ-4** (03's finding) as the correct conservative safe default: an account in `restricted_pending_review` should not be able to self-export or self-delete while a credible under-13 determination is pending, because (a) deletion could destroy evidence the Platform Safety Administrator needs, and (b) `mvp-release-scope.md` §9.5 already treats preservation holds as fail-safe-blocking; this is consistent, not a new burden. **Not** a BLOCKING finding because the existing IA text already defaulted this way after DWA-N1/N2 remediation — D04 is ratifying, not correcting.
  - **D04-IA-N2** — §7's "empty results identical whether zero-match or unauthorized" rule is exactly right, but the artifact should say explicitly that this also applies to the **count** shown anywhere a count is rendered (e.g., a roster "12 members" count must never include members outside the viewer's authorized visibility in a way that lets the viewer infer a hidden member exists). *Remediation applied:* added an explicit clause to §7's privacy/authorization requirements bullet.
- **Conditions:** IA-OQ-4 stands as a confirmed, D04-owned safe default (not open for reversal without a D04 decision).
- **Disposition:** **`PASS WITH CONDITIONS`** — no boundary crossed; both findings tighten an already-correct default rather than fixing a violation.
- **Reviewer identity:** Department 04 authorization/privacy/youth-safety reviewer (independent pass).
- **Downstream effect:** D04-IA-N2 applied to `information-architecture.md` §7; IA-OQ-4 carried into `mvp-release-scope.md`-adjacent tracking (§14-style register maintained in the IA's own §1.6, not re-opening the approved Step 2 artifacts).
