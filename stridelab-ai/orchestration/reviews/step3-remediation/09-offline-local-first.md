# Step 3 remediation review — `offline-local-first-engineering`

- **Scope:** confirms the new state model states offline honesty correctly and completely — that no queued write is presented as durable, and that every offline-capable surface is covered.
- **Authoritative inputs:** invariant 13; `WORKFLOW-ARCHITECTURE-v2.md` §6 (offline-critical workflows); `mvp-release-scope.md` §9 offline-capability table; IA §2.5 O-30, §6.
- **Evidence inspected:** §4.5 X-4/X-5/X-6/X-7 rows; §1.9's INC-0 row and gate 2; §1.10 row 13.
- **Checks performed:**
  - **Local success is never server durability.** X-5's "Never does" column carries the load-bearing rule verbatim in effect: `Saved on this device` is never worded or styled as `Saved`; a queued grant, publication, attachment or message is never rendered as effective; **a queued grant loses to a concurrent revoke**. This matches invariant 13 and the domain model's VS-04 posture.
  - **No last-write-wins.** X-6 requires both sides preserved and attributed, with the `as executed — version changed` marker persisting permanently — not merely during the conflict.
  - **The exposure gate is modelled, not assumed.** §1.9 gate 2 correctly records that INC-3a's execution surface has no externally exposed state until INC-3b delivers X-6 — "offline honesty is dishonest without reconciliation," matching §10's own condition.
  - **INC-0 ships no destination.** Correct: the sync substrate is a capability, not a screen; a partial UI shell would not count as a completed increment.
- **Blocking findings:** none.
- **Non-blocking findings:**
  - **RP-N2** — X-5's owning-destination set omitted **D-03**, although §2.2 O-06 states authoring drafts may be created offline and sync on publish. A coach drafting a Season offline would have had no specified queued-state surface. *Remediation applied:* D-03 added to X-5 with the §2.2 citation.
- **Conditions:** **RP-C1** — the on-device index-freshness threshold (§9 scenario 10) remains a D03 G4 item, carried unchanged; no new `OQ-*` created.
- **Disposition:** **`PASS WITH CONDITIONS`**.
- **Reviewer identity:** Department 03 `sync-offline-engineer` lens (independent pass).
