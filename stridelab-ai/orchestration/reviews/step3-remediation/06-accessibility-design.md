# Step 3 remediation review — `accessibility-design`

- **Scope:** confirms the new state vocabulary is perceivable without colour, announced to assistive technology, and consistent with S-12 as a per-increment G5 exit gate.
- **Authoritative inputs:** `mvp-release-scope.md` §10 (S-12 per-increment G5 gate), §12 S-12 checklist; IA §2 accessibility convention (A11Y-IA-N1).
- **Evidence inspected:** §4.5's accessibility bullet and every state row's "Required content" column; §1.9 note 7; §1.10 rows 13/14; §11 N-3.
- **Checks performed:** every X-state's meaning is carried by text, not colour or icon shape. The O-30 vocabulary (`Saved on this device` / `Uploading…` / `Synced` / `Needs attention`) is wording, not styling — so it survives a monochrome or high-contrast rendering. §1.9 note 7 correctly ties S-12 to **every** increment shipping an interactive surface (INC-1…INC-10), matching §10 rather than deferring accessibility to a late pass.
- **Blocking findings:** none.
- **Non-blocking findings:**
  - **RP-N3** — §4.5 required a static accessible *label* per state but said nothing about the state **transition**. A VoiceOver user whose write silently moves from `Synced` to `Needs attention`, or whose session lapses mid-task, would have to re-explore the screen to discover it. *Remediation applied:* §4.5 now requires entering/leaving any of X-1…X-7 to be announced to assistive technology (accessible status/live-region announcement); the mechanism and wording are correctly deferred to Step 4/5 (§11 N-3) rather than designed here.
- **Conditions:** the S-12 checklist remains a per-increment G5 exit gate owned by `ux-research-accessibility-reviewer`; this pass does not discharge it for any increment.
- **Disposition:** **`PASS WITH CONDITIONS`**.
- **Reviewer identity:** `ux-research-accessibility-reviewer`, Department 01.
