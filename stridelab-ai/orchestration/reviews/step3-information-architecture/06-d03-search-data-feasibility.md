# Step 3 review — Department 03 (search/data feasibility)

- **Scope:** whether the §7 information-level search model and the §2/§4 object read-model implications are implementable without weakening the authorization/scoping rules the model requires.
- **Authoritative inputs:** `mvp-release-scope.md` §8.3 contract 5 (performance/reporting read models — scope-bounded); `domain-model.md` §3.8 `VaultVisibilityResolution` (query-time, no denormalised flag).
- **Evidence inspected:** §7's scoping rule ("search executes only over objects the searcher could already see individually"); §2.3 O-11/O-14/O-15's "resolved query-time, never cached as a flag" requirement as it extends to a search index; §9 scenario 10 (offline discovery).
- **Blocking findings:** none. The search model as specified (index scoped per-Team, per-role, re-validated — not a separately-cached "visible" flag) is consistent with the domain-model's VS-04 checkpoint and does not ask for a search index that would itself become the kind of denormalised visibility shortcut VS-04 forbids.
- **Non-blocking findings:**
  - **D03-IA-N1** — a naive per-query re-authorization of every candidate result (rather than a maintained, authorization-aware index) could be too slow for a roster/media search at Team scale; this is an implementation-technique question, not an IA defect — the IA correctly specifies the *outcome* ("never shows an unauthorized result") and leaves the *mechanism* (a periodically-revalidated authorization-aware index vs. per-query filtering) to D03 at G4, consistent with the `information-architecture` SKILL boundary ("hand ranking implementation downstream").
  - **D03-IA-N2** — confirms and adopts **IA-OQ-1** (§9 scenario 10) as the correct place to carry the offline-index-freshness-threshold decision; no new item needed.
- **Conditions:** D03-IA-N1 (index-maintenance technique, G4), IA-OQ-1 (offline freshness threshold, G4).
- **Disposition:** **`PASS WITH CONDITIONS`**.
- **Reviewer identity:** Department 03 search/data feasibility reviewer (independent pass — engaged because §7 affects indexing, per the task's "where search or indexing is affected" trigger).
- **Downstream effect:** no artifact edit required; both conditions are already correctly scoped to D03's G4 ownership in `information-architecture.md` §1.6/§9.
