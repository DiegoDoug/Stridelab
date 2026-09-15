# StrideLab Navigation Specification

**Status:** `AWAITING_HUMAN_APPROVAL` — Department 01 Step 4. Authored 2026-09-11 by Department 01 Product & Experience (`ux-architect`, skills `workflow-architecture` + `information-architecture` + `interaction-design`), orchestrated per `stridelab-ai/commands/orchestrate/orchestrate-task.md` and executed per `stridelab-ai/departments/01-product-experience/commands/ux/design-navigation.md`.
**Owning Department:** 01 Product & Experience. **Primary specialist:** `ux-architect`. **Department lead:** `product-experience-lead`.
**Upstream (Step 3, required, version-pinned):** `docs/product/information-architecture.md` — this artifact consumes its §2 object inventory, §3 hierarchy model, and §4 destination map **as reviewed and finalized** (Step 3 gate: zero BLOCKING findings, `stridelab-ai/orchestration/reviews/step3-information-architecture/`). This artifact does not redefine any object, hierarchy, or destination purpose established there — it defines the **navigation shell, chrome, state model, and platform structure** around them.

This artifact is a **proposal**, not an approved decision. It resolves, converts, or creates no `OQ-*` / `CD-*` item; changes no product invariant; designs no visual styling or production code.

**Canonical-path note.** `docs/product/navigation-specification.md` is used because it follows the exact naming/location convention already established by `feature-prioritization.md`, `mvp-release-scope.md`, `domain-model.md`, and `information-architecture.md` (all under `docs/product/`, registered in `stridelab-ai/registry/artifacts.yaml`) — no other documented convention or template names a different canonical path for this artifact, so none is overridden.

---

## 1. Provenance & traceability

| Attribute | Value |
|---|---|
| Registry id | `navigation-specification` (`stridelab-ai/registry/artifacts.yaml`) |
| Canonical path | `docs/product/navigation-specification.md` (this file) |
| Lifecycle record | `stridelab-ai/project-memory/current-state/navigation-specification.md` |
| Upstream (required, version-pinned) | `information-architecture` — this same repository commit, Step 3 gate passed (`stridelab-ai/orchestration/reviews/step3-information-architecture/`) |
| Upstream (approved) | `feature-prioritization`, `mvp-release-scope`, `domain-model`, `product-baseline`, `workflow-architecture` v2, `architecture-decision` |
| Downstream consumers | Department 02 (client implementation), Department 05 (test/acceptance harness), `architecture-reviewer`, every future interaction-design / visual-UI work package |
| Owns | navigation shell/chrome, state model, destination-to-navigation mapping, creation/start-action resolution, context/orientation signaling, restricted/administrative navigation placement |
| Does not own | destination/object purpose or hierarchy (Step 3), visual styling, gesture microstates, backend implementation |

---

## 2. Navigation principles

| Principle | Statement |
|---|---|
| Role clarity | Every navigation surface is built from what the current role/scope can actually reach (IA §2/§4/§5) — never a generic shell with items disabled or hidden after the fact. A destination that a role cannot reach does not render as a greyed-out item; it does not render at all (IA §5.2). |
| Team context | The active Team is always visible in the persistent chrome (§7) and is never implicit; switching Teams (§4) always re-derives the entire navigation surface from the new Team's authoritative scope — nothing carries over silently (IA §3.9, J-12). |
| Object identity | A destination or control is always named after the IA object it represents (IA §2) — never a bare verb (task instruction; IA §1.5). |
| Task frequency | Placement favors the objects/actions exercised most often in the approved journeys (`mvp-release-scope.md` §7): Today, Practice, and Messages sit at the top navigation level on every platform; administrative and safety actions, used rarely, are deliberately placed one level deeper (§8). |
| Safe access boundaries | No navigation affordance ever implies access beyond the current authoritative scope (management scope vs. communication reach, invariant #3/#15) — a coach can always message any Team athlete (IA §2.4) but the navigation never offers a tag/share/feedback/analysis action for an out-of-scope athlete from any surface. |
| iPad information density | iPad uses a persistent multi-column split view (§3.1) so several IA primary destinations are visible concurrently without a tab-budget constraint (HIG source: Split views, §3.4). |
| iPhone depth | iPhone groups the same destinations behind fewer top-level tabs (§3.2), adding one extra navigation level rather than dropping or renaming any object (IA §8.2/§8.3). |
| Accessibility | Every chrome element (tab, sidebar row, context marker, status chip) carries a VoiceOver-accessible label distinct from its visual treatment (IA §2 accessibility convention, A11Y-IA-N1); Dynamic Type, minimum hit targets, and pointer-free operability apply to every navigation control, not only content controls (S-12). |
| Offline honesty | A navigation surface never implies a local-only action is server-durable (IA §2.5 O-30); sync-state chips and the aggregate sync indicator (§7) are truthful at every navigation level, not only inside a detail screen. |
| Predictable backtracking | Every destination's "current context" (§7) determines exactly where Back/Close returns to (IA §6) — the same detail reached from three different parents (e.g., D-22 Session Detail) always returns to whichever parent was actually used, never a fixed default. |
| Separation of normal, destructive, and administrative actions | Ordinary content actions (view, log, message, analyze) never share a menu, icon family, or confirmation pattern with destructive/administrative actions (Team closure, role removal, moderation revocation, account deletion) — §8 makes this a structural placement rule, not a visual-styling afterthought. |

---

## 3. Navigation model by role

Built directly from `information-architecture.md` §4 (destination map) and §2 (role-based visibility). "Level" = primary / secondary / contextual / modal / administrative, per IA's own typing (unchanged here — Step 4 places IA's destinations into chrome, it does not re-type them).

### 3.1 Head Coach / Team Creator

| Concern | Navigation |
|---|---|
| Primary destinations | D-01 Today, D-02 Team, D-03 Plan, D-04 Practice, D-06 Media, D-08 Analysis, D-09 Messages, D-10 Performance |
| Secondary destinations | D-11 Reports, D-13 Notifications, D-14 Settings |
| Contextual destinations | D-22 Session Detail, D-24 Media Detail, D-25 Channel/Thread Detail, D-26 Analysis Workspace, D-27 Group Report Detail (conditional), D-28 Reconciliation Center |
| Creation/start actions | new Team (D-18), new Event Group/Subgroup + invite (D-15), new Season/Block/Week/Session (D-03), start practice (D-04), record/import media (D-06), start analysis (D-08) |
| Administrative destinations | **D-15 Team Administration** (full: invite, assign, settings, closure, tier-state display) — structurally separated from D-02 (§8) |
| Settings | D-14 (own profile + notification preferences + account) |
| Notifications | D-13, all three classes |
| Search | available from D-01/D-02/D-06/D-09/D-10 (IA §7); resolved here as a toolbar/nav-bar affordance, not a consumed tab slot (IA-OQ-2, resolved) |
| Team and role switching | D-18, full access to every Team the Account belongs to |
| Vault entry points | none as a recipient (Vault is Athlete-only, IA §4.3) — the Head Coach's equivalent is the "Shared with" list on D-06/D-24 (grantor side) |
| Planning and execution entry points | D-03 (Team-wide authoring authority), D-04 (any group) |
| Media and analysis entry points | D-06, D-08, D-26 |
| Communication entry points | D-09 (Team-wide reach), D-25 |

### 3.2 Event Coach

| Concern | Navigation |
|---|---|
| Primary destinations | D-01, D-02 (scope-limited), D-03 (assigned groups only), D-04 (managed athletes only), D-06, D-08, D-09, D-10 (in-scope only) |
| Secondary destinations | D-11 (own reports; group reports only within managed scope, conditional), D-13, D-14 |
| Contextual destinations | D-22, D-24, D-25, D-26, D-27 (conditional), D-28 — all scope-limited to managed athletes |
| Creation/start actions | new Season/Block/Week/Session within assigned scope (D-03), start practice for managed groups (D-04), record/import media (D-06), start analysis (D-08) |
| Administrative destinations | **none** — D-15 does not render for an Event Coach at all (IA §2.1 O-02a/b role-based visibility; not a disabled item, an absent one) |
| Settings | D-14 (own only) |
| Notifications | D-13 |
| Search | same affordance as Head Coach, results filtered to current `ManagementScope` (IA §7) |
| Team and role switching | D-18, full access to every Team the Account belongs to (a person may hold a different role on each) |
| Vault entry points | grantor side only, scope-limited to managed athletes (D-06/D-24) |
| Planning and execution entry points | D-03/D-04, assigned scope only |
| Media and analysis entry points | D-06, D-08, D-26 |
| Communication entry points | D-09 — **reach is Team-wide** (any Team athlete, per baseline §3), a structurally different rule from every other row in this table, which is scope-limited; the navigation must not visually imply the same limitation applies to messaging (§7 makes this an explicit, separate context marker) |

### 3.3 Athlete

| Concern | Navigation |
|---|---|
| Primary destinations | D-01, D-04 (own logging), D-05 Personal Workouts (conditional on `personal_workouts_allowed`), D-06 (own capture/import), D-07 Vault, D-08 (own analysis), D-09, D-10 (own, full) |
| Secondary destinations | D-11 (own-data reports only), D-13, D-14, D-21 Feedback |
| Contextual destinations | D-22 (own log + correction), D-24 (own media), D-26 (own analysis), D-28 (own log conflicts only) |
| Creation/start actions | log a session (D-04, against an assigned Session only), create a personal workout (D-05, gated), record/import media (D-06), start analysis on visible media (D-08) |
| Administrative destinations | **none** — D-02 is read-only for an Athlete (own group placement only), D-15 does not exist for this role at all |
| Settings | D-14, plus D-19 Data Export & Deletion (self-service) |
| Notifications | D-13 |
| Search | same affordance, results filtered to the Athlete's own authorized set (own history, own Vault, channels they belong to) |
| Team and role switching | D-18, full access; a person's role on each Team is independent (IT-05) |
| Vault entry points | **D-07 is the sole Vault surface** — no other destination substitutes for it (IA §2.3) |
| Planning and execution entry points | D-01 (today's assignment), D-04 (execution/logging), D-05 (personal, isolated) |
| Media and analysis entry points | D-06 (own capture), D-07 (received), D-08/D-26 (own analysis) |
| Communication entry points | D-09 (channels they belong to + coach-initiated threads), D-16 Report & Block (overflow, always available) |

### 3.4 Multi-Team user (different role per Team)

- The navigation surface is **entirely re-derived** on Team switch (D-18) from whichever of §3.1/§3.2/§3.3 applies to that Team — there is no fourth, blended navigation model. A person who is Head Coach on Team X and Athlete on Team Y sees the full §3.1 surface under Team X and the full §3.3 surface under Team Y, never a merged menu.
- **Never merged:** no destination, badge count, notification, or search result from Team X is visible while Team Y is active (IA §3.9, J-12) — this is verified in §9.
- An offline-created local object (a draft Session, a personal-workout log) is bound to its originating Team's navigation context and is invisible under any other Team, even the same person's other Teams, until synced and only then within its own Team (IA §6 "unsynchronized local objects").
- A **role change** (e.g., promoted to Event Coach on a Team where the person was previously unassigned) re-derives the navigation surface on the next authoritative check, not merely at next app launch (IA §6 role-change-behavior rule).

---

## 4. Navigation model by platform

### 4.1 Sources and rationale

Per the task instruction to evaluate current Apple guidance before selecting structures, the following were consulted (same sources as `information-architecture.md` §8.1, access date 2026-09-11):

| Source | URL | Guidance applied here |
|---|---|---|
| HIG — Split views | `https://developer.apple.com/design/human-interface-guidelines/split-views` | iPad: prefer a split view over a tab bar; a three-column split view (sidebar → supplementary list → detail) fits a leading-pane-of-top-level-items pattern (the guidance's own example: Mail's accounts/mailboxes → messages → detail); avoid more than two hierarchy levels **inside the sidebar itself** — deeper hierarchy goes in the supplementary column |
| HIG — Tab bars | `https://developer.apple.com/design/human-interface-guidelines/tab-bars` | iPhone: 3–5 tabs recommended; a few more tolerated on iPad, but iPad already uses a sidebar here, not a tab bar (the two are alternative root patterns for the same "flat navigation" division, per the Navigation-and-search guidance) |
| HIG — Navigation and search | `https://developer.apple.com/design/human-interface-guidelines/navigation-and-search` | the "flat navigation pattern" divides the hierarchy at the root level as a tab bar (iPhone) or sidebar (iPad) — StrideLab's `information-architecture.md` §4 primary-type destinations are exactly this root-level division |

**Decision (IA-OQ-2, resolved here):** Search is **not** a consumed sidebar/tab slot on either platform — it is a toolbar/nav-bar affordance reachable from every primary destination, consistent with the HIG's toolbar-hosts-search guidance referenced in `information-architecture.md` §8.1.

### 4.2 iPad (portrait and landscape)

- **Shell:** a three-column `NavigationSplitView` — **Sidebar** (root-level destinations, ≤2 levels of hierarchy per HIG) → **Supplementary column** (the selected section's list — e.g., selecting "Plan" lists Seasons/Blocks/Weeks/Sessions; selecting "Team" lists Event Groups/Subgroups/roster) → **Detail column** (the selected item — D-22, D-24, D-25, D-26, D-23, D-27).
- **Sidebar sections (role-filtered per §3):** Today · Team · Plan (coach) / — (athlete: folded into Today/Practice) · Practice · Personal Workouts (athlete, conditional) · Media · Vault (athlete) · Analysis · Messages · Performance · Reports · Settings — followed by a **visually separated** "Administration" section (divider + distinct icon treatment, Head Coach only) containing D-15. D-16 Report & Block and D-17 Platform Safety Console are **never sidebar items** (§4.4, §8).
- **Landscape vs. portrait:** the three columns are all visible in landscape; portrait collapses the sidebar behind a leading-edge toggle (standard `NavigationSplitView` adaptive behavior) while preserving the same object identity and relationships (IA §8.2) — collapsing the sidebar changes *visibility*, never *meaning*.
- **Team/role context:** a persistent header control above the sidebar shows the active Team name + role badge and opens D-18 on tap (§7).
- **Search:** a search field in the supplementary column's toolbar, scoped to whatever section is active, with an explicit "Search everywhere I can see" widen action (IA §7 query-context rule).
- **Destructive/administrative separation:** the Administration section's rows use a distinct (non-content) icon family and every destructive action (Team closure, member removal) requires a confirmation sheet that names the consequence — never a swipe-to-delete pattern shared with ordinary content rows (§8).

### 4.3 iPhone

- **Shell:** a `TabView` with **5 tabs** (within the HIG's 3–5 recommendation): **Today · Training · Media · Messages · More.**
  - **Training** merges D-03 (coach) / D-04+D-05 (athlete) — the same object identities, one navigation level deeper than iPad's separate sidebar rows (IA §8.2's authorized trade).
  - **Media** merges D-06, D-07 (athlete), D-08 into one tab with an internal segmented/list structure — these three are already tightly related in the IA hierarchy (§3.4) and are used less frequently than Today/Training/Messages.
  - **More** hosts D-02 (read-only Team browsing), D-10, D-11, D-14, D-15 (Head Coach; visually separated within More, §8), D-19, D-21 (Athlete). This is the "greater navigation depth" the task explicitly authorizes for iPhone — every object inside More keeps its IA identity, owner, and relationships unchanged.
- **Team/role context:** a persistent header control across every tab, identical function to the iPad header (§7).
- **Search:** a search field surfaced via the navigation bar on Today/Training/Media/Messages, matching the iPad query-context rule.
- **Destructive/administrative separation:** identical placement rule as iPad — Administration lives inside More but under its own clearly separated row group with a confirmation-sheet pattern for destructive actions; D-16/D-17 are never tabs (§8).

### 4.4 Web / internal admin

Out of MVP scope (`mvp-release-scope.md` §4; F-P-14). No navigation structure is defined — there is no v1 surface to structure. `domains/*/web/` scaffold directories remain a later, separately-decided D02 release scope.

---

## 5. Navigation state model

Grouped by concern. Every state names: entry condition · visible context · available actions · disabled actions · exit destination · back behavior · recovery behavior · privacy-safe fallback.

### 5.1 Session and authentication states

**Cold launch**
- Entry: app opens with no active session. Visible context: D-00 sign-in, no Team chrome. Available: sign in, sign up, recover. Disabled: everything Team-scoped. Exit: D-01 on success. Back: n/a (root). Recovery: cached-credential auto-continue where a still-valid local session exists. Privacy-safe fallback: no Team name, role, or content is ever shown before authentication succeeds.

**Returning session**
- Entry: a valid local session exists. Visible context: last active Team's D-01, re-validated. Available: full role-appropriate surface once scope is re-confirmed. Disabled: nothing beyond normal scope. Exit: n/a. Back: n/a. Recovery: if re-validation fails (e.g., removed while away), degrades to the "role-change" state below, not a stale view. Privacy-safe fallback: content renders only after re-validation, never optimistically from cache for authorization-sensitive surfaces (IA §6 resume-behavior rule).

**Authentication transition (recovery, re-verification)**
- Entry: credential reset or re-verification in progress. Visible context: D-00 sub-flow. Available: the specific recovery step. Disabled: all Team content. Exit: D-01 on success, D-00 on abandon. Back: returns to the prior recovery step. Recovery: rate-limited retry. Privacy-safe fallback: no hint of which credential field failed beyond the minimum needed to proceed (avoids account enumeration).

**Team selection (first Team) / Team switching / Role switching across Teams**
- Entry: no Team yet, or D-18 invoked, or a role changed on the active Team. Visible context: D-18 (switch/selection) or the freshly re-derived D-01 (post-switch/role-change). Available: create/join (first-time), switch, re-enter. Disabled: nothing hidden — a Team the Account left simply is not listed. Exit: D-01 under the resolved Team/role. Back: to the previous Team's last state if switching was cancelled; to D-00 if no Team exists yet. Recovery: n/a. Privacy-safe fallback: switching never flashes the previous Team's content while the new Team's authorization is still resolving — a brief neutral loading state is shown instead (never "last frame of Team X" bleeding into "Team Y" — this is the concrete anti-leak mechanism behind J-12).

**Sign-out**
- Entry: explicit user action (D-14). Visible context: confirmation. Available: confirm/cancel. Disabled: n/a. Exit: D-00. Back: cancel returns to D-14. Recovery: n/a. Privacy-safe fallback: all cached authorization-sensitive content (profile fields, Vault items, DOB-adjacent data) is cleared from any in-memory/display cache on confirmed sign-out, not merely the session token.

### 5.2 Discovery-entry states

**Deep link**
- Entry: a link is opened (from a notification, a share, or an external source). Visible context: resolved per IA §6's deep-link-resolution rule (deleted/revoked/moved/inaccessible/cross-Team/offline-never-synced, each with its own named message). Available: whatever the resolved destination allows normally. Disabled: nothing beyond normal scope. Exit: the resolved destination's own return behavior. Back: to wherever the app was before the link was opened, or to D-01 if launched cold via the link. Recovery: a failed link offers "Go to Today" rather than a dead end. Privacy-safe fallback: an inaccessible target's message is identical whether the object was deleted or the viewer merely lacks access (IA §6).

**Notification**
- Entry: a notification is tapped (D-13 or push/email pointer). Visible context: the underlying object's own destination, opened directly. Available: the object's normal actions. Disabled: n/a. Exit: the object's normal return, defaulting to D-13 if opened from the notification list itself. Back: D-13 or the prior screen, matching how it was opened. Recovery: a notification pointing to a since-removed object resolves per the deep-link rule above. Privacy-safe fallback: a push/email notification body never includes content requiring authorization beyond what the lock-screen/preview context already permits (contract 10 minimization).

**Search results**
- Entry: a query is submitted from any search-enabled destination (§4.1). Visible context: results labelled by type + parent context (IA §7). Available: open a result (navigates to its normal destination). Disabled: n/a. Exit: back to the search field/prior destination. Back: to the destination search was launched from, query preserved. Recovery: "No results" for both zero-match and unauthorized-match cases (IA §7). Privacy-safe fallback: no result, count, or facet ever reveals an object the searcher could not otherwise see (IA §7, D04-IA-N2).

### 5.3 Task-flow states

**Modal presentation** (D-00 flows, D-18, D-16, confirmation sheets)
- Entry: an explicit action invoking a bounded, focused task. Visible context: the modal only; underlying navigation is dimmed/inert. Available: the modal's own actions. Disabled: everything behind it. Exit: dismiss on completion or cancel. Back: n/a inside a modal (a modal is dismissed, not "backed" through — consistent with §2's close-behavior rule). Recovery: an interrupted modal (e.g., backgrounded mid-flow) resumes at its last step, not restarted, unless the underlying data has since changed (then it re-validates). Privacy-safe fallback: a modal never pre-fills a field with data the current role could not otherwise see.

**Task cancellation**
- Entry: explicit cancel during authoring/creation (D-03, D-06, D-15 invite, etc.). Visible context: a confirmation only if meaningful work would be lost. Available: confirm cancel / keep editing. Disabled: n/a. Exit: the origin destination, unchanged. Back: n/a (this is the terminal action). Recovery: a local draft may be preserved per the object's own IA empty/offline rules (e.g., O-06 authoring drafts). Privacy-safe fallback: n/a.

**Successful task completion**
- Entry: a create/modify/deliver/publish action succeeds. Visible context: the resulting object's own detail destination, with a transient success acknowledgment distinct from a server-durable claim if the success was only local-so-far (IA §2.5 O-30 honesty rule). Available: the object's normal actions. Disabled: n/a. Exit: the destination the action was launched from, or the new object's detail, per the specific action's own IA "primary actions" definition. Back: to the launch origin. Recovery: n/a. Privacy-safe fallback: n/a.

### 5.4 Object/data-integrity states

**Deleted object**
- Entry: navigating to (or deep-linking into) an object that no longer exists. Visible context: "This no longer exists." Available: return action only. Disabled: everything else. Exit: the parent list/destination. Back: same as exit. Recovery: n/a (deletion is not reversible from navigation; any undo window is the object's own IA-defined lifecycle, e.g., Team's 30-day grace). Privacy-safe fallback: identical wording regardless of *why* it no longer exists (avoids leaking moderation/legal action).

**Revoked access**
- Entry: navigating to an object the viewer no longer has a grant/share/assignment for. Visible context: "You no longer have access to this" (or the object-type-specific neutral wording, IA §6). Available: return only. Disabled: everything else. Exit: parent list. Back: same. Recovery: n/a from navigation (a new grant would need to be issued again by its owner). Privacy-safe fallback: Vault-specific revocations collapse to one neutral message that never confirms the item still exists elsewhere (IA §6).

**Permission denial**
- Entry: an in-scope-looking action is attempted outside actual authorization (e.g., an Event Coach trying to open D-15). Visible context: the destination simply is not offered (§2 role-clarity principle) — this state exists for the narrower case of a **scope change occurring while a screen is already open** (mid-session denial). Available: return only. Disabled: the now-unauthorized controls, replaced by the denial message, not merely greyed out. Exit: the last authorized parent. Back: same. Recovery: n/a (a fresh scope grant would need to be re-established by its owner). Privacy-safe fallback: the denial names the scope rule violated only in role-appropriate terms ("You don't manage this group") never in a way that reveals another person's role/data.

**Offline state**
- Entry: connectivity is lost while inside any destination. Visible context: a persistent, honest connectivity indicator in the chrome (§7); already-cached content remains visible with its staleness marker. Available: every offline-capable action (IA §4/§9.3 of `mvp-release-scope.md`) remains available; connectivity-required actions are visibly disabled with the reason. Disabled: administrative/destructive actions requiring connectivity (invite, remove, closure, publish, grant/share, export). Exit: normal navigation continues offline. Back: unaffected. Recovery: automatic reconnect re-validates and syncs queued work; no user action is required to "restore" navigation. Privacy-safe fallback: an offline cached view of an authorization-sensitive object (e.g., a Profile) is provisional and re-validates before any coach-scope-gated field is trusted (IA §2.1 O-05).

**Stale state**
- Entry: a cached view is older than the freshness threshold for its object type (IA §9 scenario 10, IA-OQ-1). Visible context: an explicit "last updated `<time>`" marker. Available: manual refresh; all normal offline-capable actions. Disabled: n/a beyond the offline rules above. Exit: normal. Back: normal. Recovery: refresh on reconnect. Privacy-safe fallback: staleness never implies a false sense of currency for an authorization-sensitive field.

**Pending synchronization**
- Entry: a local write exists that has not yet been server-confirmed. Visible context: the O-30 status chip ("Saved on this device" / "Syncing…") on the specific object, plus the aggregate sync indicator in chrome (§7). Available: continue working; the pending item remains locally visible and editable per its own object rules. Disabled: nothing extra beyond the object's own pending-state rules (e.g., a `grant_pending` Vault grant is not yet effective for the recipient). Exit: normal. Back: normal. Recovery: automatic on reconnect. Privacy-safe fallback: a pending grant/share/publication is never shown as effective to the recipient before server confirmation (invariant #13).

**Conflict**
- Entry: an offline divergence is detected on reconnect (F-17/SE-09). Visible context: **D-28 Reconciliation Center** badge/banner, surfaced from D-01/D-04 immediately, never buried (IA §2.2 O-09). Available: review, resolve (coach: session/attendance conflicts; athlete: own log conflicts only). Disabled: resolving another person's conflict. Exit: the affected D-22. Back: D-28 list or the affected session. Recovery: re-entrant — a further stale device can re-open reconciliation without overwriting prior resolutions. Privacy-safe fallback: a departed athlete's conflict is held and flagged to the coach only, never shown to any other athlete.

**Failed upload or processing**
- Entry: a media upload or processing step (services/media-worker) fails terminally. Visible context: an explicit failure state on the specific O-11, naming the failure and offering retry — never a silent drop (IA §2.5 O-30). Available: retry, delete the failed local draft. Disabled: downstream actions that depend on the processed result (attach/tag/grant/analyze) until it succeeds or the draft is discarded. Exit: D-06. Back: D-06. Recovery: retry re-attempts the same operation idempotently. Privacy-safe fallback: n/a.

---

## 6. Destination-to-navigation mapping

Every destination from `information-architecture.md` §4. "iPad level" / "iPhone level" use §4.2/§4.3's placement. Empty/denied/offline behavior is **owned by IA** (cited by section, not restated) unless a platform-specific addendum applies.

| Destination | Roles | iPad level | iPhone level | Parent context | Entry method | Return behavior | Deep-link behavior | Empty/denied/offline |
|---|---|---|---|---|---|---|---|---|
| D-00 | all | modal (pre-Team) | modal (pre-Team) | none | cold launch | → D-01 | n/a | IA §4.1 |
| D-01 | all | sidebar (top) | tab (Today) | active Team | launch, Team switch | root | resolves to root, re-scoped | IA §4.1 |
| D-02 | all (scoped) | sidebar | inside More | active Team | sidebar/More row | D-01 | IA §6 | IA §4.1 |
| D-23 | all (scope-limited) | supplementary/detail column | pushed screen | D-02, D-10, D-09 | tap-through from a roster/message/performance row | actual parent used | scope-checked, PR-03-resolved at open time | IA §4.1 |
| D-15 | Head Coach | sidebar, separated section | inside More, separated group | D-02 | separated entry, never inline | D-02 | Head-Coach-only, else denied | IA §4.1 + §5.4 closure-under-hold addendum |
| D-18 | all | header control | header control | global chrome | tap Team/role header | previous destination, re-scoped | n/a | IA §4.1 |
| D-14 | all | sidebar (bottom) | inside More | global chrome | sidebar/More row | previous destination | n/a | IA §4.1 |
| D-19 | all (self) | inside Settings | inside More → Settings | D-14 | from D-14 | D-14 | n/a | IA §4.1 + IA-OQ-4 (suspended during PS-07 restriction) |
| D-20 | all (self-submit) | inside Settings | inside More → Settings | D-19 | from D-19 | D-19 | n/a | IA §4.1 |
| D-03 | Coach | sidebar | tab (Training) | active Team | sidebar/tab | D-01 | IA §6 | IA §4.2 |
| D-22 | Coach + Athlete | detail column | pushed screen | D-03/D-04/D-01/D-10 | tap-through | the actual parent used | scope-checked | IA §4.2 |
| D-04 | Coach + Athlete | sidebar | tab (Training) | active Team | sidebar/tab | D-01 | n/a | IA §4.2 |
| D-28 | Coach + Athlete | reachable from sidebar badge | reachable from Today/Training badge | D-01, D-04 | badge/banner | affected D-22 | into the specific conflict | IA §4.2 |
| D-05 | Athlete | sidebar (conditional) | tab (Training), conditional | active Team | sidebar/tab | D-01 | athlete-owner-only | IA §4.2 |
| D-06 | Coach + Athlete | sidebar | tab (Media) | active Team | sidebar/tab | D-01 | n/a | IA §4.3 |
| D-24 | owner + authorized | detail column | pushed screen | D-06, D-07, D-08 | tap-through | actual parent | re-resolved at open | IA §4.3 |
| D-07 | Athlete | sidebar | inside Media tab | active Team | sidebar/tab section | D-01 | recipient-only | IA §4.3 |
| D-08 | Coach + Athlete | sidebar | inside Media tab | active Team | sidebar/tab section | D-01 | n/a | IA §4.3 |
| D-26 | project author | detail column | pushed screen | D-08 | from D-08 or "Analyze" action | D-08 | author-only | IA §4.3 |
| D-21 | Athlete | sidebar (secondary) | inside More | active Team | sidebar/More row | D-01 | n/a | IA §4.3 |
| D-09 | all | sidebar | tab (Messages) | active Team | sidebar/tab | D-01 | membership-checked | IA §4.4 |
| D-25 | conversation members | detail column | pushed screen | D-09 | tap-through | D-09 | membership-checked | IA §4.4 |
| D-16 | any member | overflow action only, never a sidebar/tab item | overflow action only | any person/content | "…" menu | origin destination | n/a | IA §4.4 |
| D-13 | all | header control | header control | global chrome | bell icon | previous destination | resolves to underlying object | IA §4.4 |
| D-10 | Athlete (full) + Coach (scoped) | sidebar | inside More | active Team | sidebar/More row | D-01 | scope-checked | IA §4.4 |
| D-11 | Athlete (own) + Coach (scoped) | inside Performance section | inside More → Performance | D-10 | from D-10 | D-10 | scope-checked | IA §4.4 + F-34-cond gating |
| D-27 | Coach | detail column | pushed screen | D-11 | from D-11 | D-11 | conditional (F-33) | IA §4.4 |
| D-17 | Platform Safety Administrator | **separate app root — not part of this table's shell at all** | **same** | none | PSA sign-in | n/a | none into Team surfaces | IA §4.4 |

No approved MVP destination is unreachable — every row above has at least one non-modal, non-administrative entry method reachable from a role that is authorized to use it (verified in §9).

---

## 7. Creation and start-action model

Every action below states which of **planning, execution, recording, analysis, sharing, or communication** it begins, so the user is never ambiguous about mode before activation (task requirement).

| Task | Destination | Action label pattern | Mode entered | Disambiguation rule |
|---|---|---|---|---|
| Create/manage Team structures | D-15 | "Add Event Group" / "Add Subgroup" / "Invite" | administrative configuration | never shares a button style or icon with any content-creation action (§8) |
| Plan training | D-03 | "New Season/Block/Week/Session" | **planning** | the button always names the object being planned, never a bare "Create" |
| Assign work | D-03 / D-22 | "Assign to…" | planning (a targeting sub-step of planning, not a new mode) | explicitly distinct from "Start" — assigning never begins execution |
| Start or log a session | D-04 | "Start Practice" (coach) / "Log Today's Session" (athlete) | **execution** | distinct verb from "Plan" — a coach can never confuse authoring with running practice |
| Create a personal workout | D-05 | "New Personal Workout" | execution (self-directed) | carries the "Personal" chip (IA §2.2) from the first screen, so it is never mistaken for coach-assigned planning |
| Record media | D-06 | "Record" | **recording** | opens the device camera/recorder directly — never a form that could be confused with import |
| Import media | D-06 | "Import" | recording (an alternate ingestion path to the same private-draft state) | visually distinct entry point from "Record," same resulting object type |
| Start analysis | D-08 / D-06 contextual "Analyze" | "Start Analysis" | **analysis** | only offered on media the actor can already see; never offered as a generic "Analyze" with no source object selected |
| Tag a permitted Team member | D-06/D-24 contextual | "Tag" | identification only, explicitly **not sharing** | the tag flow's confirmation screen states "Tagging does not share this — you'll need to grant access separately," directly countering the most likely user misconception (domain-model §2.3) |
| Share an approved asset | D-24 contextual | "Give Access" (Vault grant) / "Share" (coach share) | **sharing** | separate, explicitly labelled action from "Tag," never offered as a single combined step |
| Send a message | D-09 / D-25 / contextual "Message" from a roster row | "Message" | **communication** | never the same control as "Give Feedback" (analysis) or "Assign" (planning), even when targeting the same person |
| Produce or view feedback/reporting | D-26 "Deliver as Feedback" (produce) / D-21 (view, athlete) / D-11 (produce/view reports) | "Deliver as Feedback" / "Generate Report" / "View Report" | **analysis-derived sharing** (feedback) or **reporting** (reports) — two distinct modes, never merged into one "Share results" button | feedback delivery and report generation use different entry points and different target-selection UI, because one is a bounded clip/note selection (analysis-scoped) and the other is a time/metric-scoped aggregate (performance-scoped) |

---

## 8. Context and orientation

| Signal | How it is communicated |
|---|---|
| Current Team | Persistent header control on every platform (§4.2/§4.3), always visible, never only inferable from content |
| Current role | Role badge beside the Team name in the same header control (never a separate screen the user must visit to find out "am I Head Coach or Event Coach here") |
| Current Event Group / Subgroup | Breadcrumb (`Team ▸ Event Group ▸ Subgroup`) on every destination scoped below Team level (IA §2.1 O-02a/b) |
| Current athlete | Named in the detail column/pushed-screen header whenever a destination is scoped to one athlete (D-22, D-23, D-24, D-27) |
| Current Season/Block/Week/Session | Breadcrumb (`Season ▸ Block ▸ Week ▸ Session`) on D-03/D-22 (IA §2.2 O-06) |
| Media ownership | The visibility-reason indicator (IA §2.3) renders on every media view that is not the owner's own — "Because you own it" is itself shown to the owner, so ownership is never ambiguous even to the person who created it |
| Vault visibility reason | Same indicator, mandatory on every D-07/D-24 render (IA §2.3, IA-OQ-3 for exact wording) |
| Offline/sync state | The aggregate sync indicator in the header control (a single at-a-glance state: "All synced" / "Syncing…" / "Needs attention") plus the per-object O-30 chip (§5.3/§5.4 states) |
| Unsaved or local-only state | The O-30 chip, worded honestly per object type ("Saved on this device," never "Saved" alone) — this is the single most safety-relevant orientation signal in the product (invariant #13) and is never suppressed to reduce visual clutter |

**Label discipline:** per the task instruction, no label is reused across different object types without explicit context — e.g., "Assign" always means a planning-targeting action (O-06→O-04), never reused for Team-role assignment (which is always labelled "Assign role" or "Assign to group" in D-15, a distinct string in a distinct destination).

---

## 9. Restricted and administrative navigation

| Concern | Placement | Discoverability rule |
|---|---|---|
| Team configuration | D-15, structurally separated (§4.2/§4.3) | Never inline with D-02 ordinary roster browsing; Event Coach never sees this section render at all |
| Role and assignment management | D-15 | Same separation; an Athlete never sees any entry point toward it |
| `personal_workouts_allowed` | D-15 (Head Coach sets it); its **effect** is visible to the Athlete only as D-05's own empty/denied state (§4.2 IA cross-reference) — the toggle control itself never appears outside D-15 |
| Membership management | D-15 | Same separation |
| Safety or moderation functions (report/block; Platform Safety Administrator tooling) | D-16 (member-facing, overflow-only, never a sidebar/tab item) and D-17 (PSA-facing, an entirely separate navigation root) | D-16 is *always* available (every member, every role, every tier — baseline §5) precisely because it is a safety action, not an administrative privilege — its placement rule is "always reachable, never prominent," distinct from D-15's "reachable only by the Head Coach." D-17 is unreachable from any Team-scoped session at all — there is no menu item, deep link, or settings toggle that exposes it to a non-PSA account, consistent with the Platform Safety Administrator being structurally outside every Team hierarchy (domain-model §2.4). |
| Tier-state visibility (DR-A5 Option A) | D-15, read-only display for all members, edit surface for Head Coach only | Placed with other Team settings, **never** adjacent to, or inside, any permission/feature-availability control (IA §2.5 O-29 non-negotiable rule) — Step 4 confirms no control anywhere in §3–§8 violates this; the validator (§13) checks it structurally |

**Unauthorized discovery check:** no destination name, count, search result, or disabled control anywhere in §3–§8 exposes a restricted object's existence to an unauthorized viewer — cross-checked against every IA §5.2 privacy-safe-discoverability rule and re-verified in §10 (combined cross-department review).

---

## 10. Navigation validation

Reusing J-1…J-13 (per IA §5.0's justified method — exhaustive coverage by construction) against the required validation groups.

| # | Journey | Reachability | Role correctness | Team isolation | Orientation | Backtracking | Deep-link recovery | Offline behavior | Accessibility | No dead ends | No ambiguous create/start | No inaccessible-object leakage | No gesture-only reliance |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| J-1 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS (§7 "Add Event Group"/"Invite" named) | PASS | PASS |
| J-2 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS ("New Session" vs "Assign to…" distinct) | PASS | PASS |
| J-3 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS ("Start Practice" vs "Log" distinct per role) | PASS | PASS (Reconciliation/Amendment UI pointer-free per A11Y-IA-N2) |
| J-4 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| J-5 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS ("Tag" vs "Give Access" distinct, §7) | PASS | PASS |
| J-6 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS ("Start Analysis" vs "Deliver as Feedback" distinct) | PASS | PASS |
| J-7 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| J-8 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS (D-16 never confused with ordinary content actions) | PASS (PSA routing invisible to the reporter) | PASS |
| J-9 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | n/a (administrative, not offline-capable) | PASS | PASS | n/a | PASS (fixed restricted-state screen, §5.1 cold-launch-adjacent) | PASS |
| J-10 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS ("Generate Report" vs "Export" distinct) | PASS | PASS |
| J-11 | PASS | PASS | n/a | PASS | PASS | PASS | PASS | n/a | PASS | PASS | n/a | PASS | PASS |
| J-12 | PASS | PASS | **PASS — the specific target of this journey; §5.1 Team-switching state's "no bleed" rule is the direct mechanism** | PASS | PASS | PASS | PASS | PASS | n/a | PASS | n/a | PASS | n/a |
| J-13 | PASS | PASS | n/a | **PASS — §8 tier-state placement rule is the direct mechanism (never adjacent to a permission control)** | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a |

**Overall Step 4 navigation-validation disposition: PASS.** No FAIL and no PASS WITH CONDITIONS row — every condition surfaced during drafting was resolved structurally (§4.1 IA-OQ-2; §6 the two ratified D04/domain-model conditions) rather than carried forward as a live gap. The one item still requiring downstream confirmation — D02's iPhone tab/grouping and minimum-OS decisions, and D03's offline-index-freshness threshold — are IA-owned conditions already carried at their correct G4 stage (`information-architecture.md` §1.6, §9 scenario 10) and are not re-opened as Step 4 gaps, since Step 4 has honored them structurally (§4.3's 5-tab grouping already resolves D02-IA-N1's concern; §5.4's stale-state rule already resolves IA-OQ-1's concern pending D03's exact threshold).

---

## 11. Review disposition summary

Combined Step 3+4 cross-department review evidence: `stridelab-ai/orchestration/reviews/step3-4-cross-department/01-combined-review.md`.

| Reviewer | Disposition |
|---|---|
| Department 01 `product-experience-lead` | PASS WITH CONDITIONS |
| Department 01 `ux-architect` | PASS WITH CONDITIONS |
| Department 01 `domain-workflow-architect` | PASS WITH CONDITIONS |
| Department 01 `ux-research-accessibility-reviewer` | PASS WITH CONDITIONS |
| Department 02 (iOS/iPadOS client engineer) | PASS WITH CONDITIONS |
| Department 03 (backend/search/data) | PASS WITH CONDITIONS |
| Department 04 (authorization/privacy/youth-safety) | PASS WITH CONDITIONS |
| Department 05 (quality) | PASS WITH CONDITIONS |
| `architecture-reviewer` | PASS WITH CONDITIONS |
| Cross-department adversarial reviewer | PASS WITH CONDITIONS |

**Zero BLOCKING findings remain open.** Every non-blocking condition carries a named owner and stage (§12).

---

## 12. Decision package (for human approval — combined G7, IA + Navigation)

Per `stridelab-ai/orchestration/approvals/approval-policy.md` and the task's guidance to prepare one combined package for tightly coupled artifacts: `docs/product/information-architecture.md` (Step 3) and this file (Step 4) are presented as **one** decision because Step 4 has no independent content — it is entirely a consumer of Step 3's destination map — and approving one without the other would leave an orphaned half of the pair.

| Field | Value |
|---|---|
| **Artifacts** | `docs/product/information-architecture.md` (Step 3) and `docs/product/navigation-specification.md` (Step 4 — this file). |
| **Versions** | Both `AWAITING_HUMAN_APPROVAL`, authored 2026-09-11; Step 3 gate review + combined cross-department review both complete with zero BLOCKING findings. |
| **Repository state to approve** | The head commit of branch `phase-1/dept01-step3-step4-ia-navigation` (built on the approved Step 2 artifacts — approved version pinned to commit `9893c1d4dd0166fd0c55f1950e601e5f8737946c`, merged to `main` via PR #9 as commit `39f42d5`, and merged into this branch by a normal merge commit). Exact SHA recorded in the completion report and pinned into both artifacts' headers + the registry in the immediately following commit, per the established repository convention (`domain-model.md` §12, `feature-prioritization.md` §1). |
| **Review dispositions** | Step 3 gate (§10 of `information-architecture.md`): 7/7 `PASS WITH CONDITIONS`, zero BLOCKING. Combined cross-department review (§11 above; full evidence `stridelab-ai/orchestration/reviews/step3-4-cross-department/01-combined-review.md`): 10/10 `PASS WITH CONDITIONS`, zero BLOCKING. |
| **What this approval covers** | The information architecture (object inventory, hierarchy model, destination map, discovery/cross-linking, search model, platform-continuity rules) and the navigation specification (principles, per-role and per-platform navigation model, state model, destination-to-navigation mapping, creation/start-action model, context/orientation, restricted/administrative placement) as the governed input to interaction-design and client implementation. |
| **Non-blocking conditions carried forward** | IA-OQ-1 (D03 offline-index-freshness threshold, G4) · IA-OQ-2 (resolved in this artifact, §4.1 — no longer open) · IA-OQ-3 (`user-research-usability` Vault-wording follow-up) · IA-OQ-4 (D04-confirmed: D-19 suspended during PS-07 restriction) · D02-IA-N1 (resolved in this artifact, §4.3 — no longer open) · D02-IA-N2 / D03-IA-N1 (D03 index-maintenance technique, G4) · A11Y-IA-N2 (pointer-free operability of D-28/D-22, a Step 4 completion gate now satisfied structurally and re-verified at G4 against the actual controls). |
| **Open decisions (NOT resolved by this approval)** | Every `WORKFLOW-ARCHITECTURE-v2.md` §9.2 OPEN item keeps its owner and safe default; nothing about IA/Navigation resolves, converts, or creates one. Minimum OS versions and the exact iPad/iPhone grouping's engineering feasibility remain a D02 G4 confirmation (already anticipated, not contradicted, by §4.2/§4.3 above). |
| **Exact approval statement requested** | *"G7 APPROVED — the StrideLab Information Architecture (`docs/product/information-architecture.md`) and the StrideLab Navigation Specification (`docs/product/navigation-specification.md`), at commit `<SHA>`, are approved as the governed information-architecture and navigation input to interaction-design and client implementation for the approved MVP scope. The object inventory, hierarchy model, and destination map in the Information Architecture, and the navigation principles, per-role and per-platform navigation model, state model, destination-to-navigation mapping, creation/start-action model, and restricted/administrative placement rules in the Navigation Specification, are adopted. Every `WORKFLOW-ARCHITECTURE-v2.md` §9.2 OPEN item referenced by either artifact remains open under its named owner with its conservative safe default accepted; no OPEN item is resolved, converted, or created. This approval authorises interaction-design and implementation-design against this navigation model only; it is not a legal or compliance sign-off, does not authorise any production release, and does not alter the separately approved product baseline, workflow architecture, domain model, feature prioritization, or MVP release scope."* |

**Approval boundary:** the statement above locks the information-architecture and navigation model for **design and implementation purposes only**. It does not merge any pull request, authorize launch or production release, substitute for qualified legal/compliance review, or resolve any `OQ-*` / `CD-*` item. Until Diego records this statement, both artifacts remain `AWAITING_HUMAN_APPROVAL` and no downstream Department may treat the navigation model as locked.

---

## 13. Provenance footer

- Canonical path: `docs/product/navigation-specification.md` (this file)
- Lifecycle record: `stridelab-ai/project-memory/current-state/navigation-specification.md`
- Registry: `stridelab-ai/registry/artifacts.yaml` → `navigation-specification`
- Review evidence: `stridelab-ai/orchestration/reviews/step3-information-architecture/`, `stridelab-ai/orchestration/reviews/step3-4-cross-department/`
- Upstream: `docs/product/information-architecture.md` (Step 3, required, version-pinned), `mvp-release-scope.md`, `feature-prioritization.md`, `domain-model.md`, `product-baseline.md`, `workflow-architecture.md`
- Next steps explicitly **not** started: `/design-user-flow`, `/design-system`, `/design-surface`, or any production implementation — these are separate, later work packages that consume this navigation specification as their required input.
