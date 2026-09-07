# Profile Workflows

**Category:** profile
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification. (Category added for independent-review finding **F-01**; visibility model made normative in the v2 correction pass.)
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Cross-department dependency:** Department 04 review mandatory — profile data includes minor PII (date-of-birth / age assertion, contact identifier) and the "coach cannot edit athlete-owned personal profile" boundary is an approved authorization invariant.
**Depends on:** identity-team (IT-01 creates the initial profile shell; IT-04 establishes the Team-membership context).

**v2 normative Profile decisions (previously authorized product defaults — no longer OPEN):**
1. Profiles are **user-owned**.
2. Coaches (and administrators) **cannot** edit an athlete's personal profile.
3. Administrative roster/assignment metadata (role, Event Group/Subgroup assignment) is **separate** from personal-profile data.
4. Profiles are **not publicly discoverable** (no directory, no search-by-profile outside an established Team context).
5. Peers (other athletes on the same Team) receive only **minimum Team identity information** (e.g., display name and role) — not contact details, not date-of-birth/age.
6. Coach access to a member's profile follows the coach's **current role and management scope** (an Event Coach sees the minimum Team identity for any Team member but fuller profile detail only for currently-managed athletes; a Head Coach's scope is Team-wide). The MG-04 communication-reach precedent does **not** widen profile access.
7. Exact **date-of-birth / age evidence** is restricted to the identity subsystem and authorized safety functions (PS-01, PS-07, Platform Safety Administrator). It is not exposed to coaches or peers.
8. Other contexts (session, messaging, performance, rosters) receive only a **derived eligibility flag or an approved age band**, never the raw date of birth.

Still OPEN: the **exact profile field catalogue** beyond the IT-01 shell, and implementation details (storage, per-field display formatting). These do not block the visibility model above.

---

## PR-01 — Establish / Populate Profile

**Purpose:** Populate the profile shell created at IT-01 with the owner's own descriptive data, as an Athlete or a Coach.

**Actors:** Account owner (prospective or active Athlete or Coach), acting on their own profile only.

**Capability / trigger:** Available to an account owner completing or updating their own profile after IT-01.

**Preconditions:** Account is `active` (IT-01). A profile shell exists.

**Authorization assumptions (normative v2):**
- Only the account owner may populate their own profile. No role — including Head Coach / Team Creator — may populate or complete another member's personal profile.
- Populating a profile grants no Team-scoped authority and is independent of any Team role.
- The **exact field catalogue** beyond the IT-01 shell (display name, contact identifier, date-of-birth / age assertion) is OPEN; ownership, the visibility model, and the DOB-restriction rule are **not** open — see the category header.

**Owned resources:** Profile record (owner ↔ profile field values), owned outright by the account owner.

**States:** `shell → partially_populated → populated`. No field is mandatory beyond what IT-01 already required; `populated` is not a gate on any other workflow.

**State transitions:** Owner enters/updates field values; the profile is usable by dependent workflows at any state.

**Happy path:** After verifying their account, the user adds their display name and other permitted self-descriptive fields and saves.

**Alternate paths:** User skips optional completion entirely and proceeds; dependent surfaces must tolerate a minimally-populated profile.

**Errors/failures:** Invalid field values rejected at input; no partial-write state that leaves the profile internally inconsistent.

**Recovery:** Fields are re-editable via PR-02; nothing destructive occurs.

**Offline behavior:** Local edit drafting is acceptable; authoritative persistence requires connectivity, because other members may read the profile (subject to PR-03).

**Synchronization implications:** Profile changes must propagate before other members' views (PR-03) reflect them; a stale cached profile must never be treated as authoritative for an authorization-relevant field (notably age).

**Notifications:** None required for routine population.

**Audit requirements:** Not independently audit-critical for routine self-population; changes to the date-of-birth / age-assertion field are security/safety-relevant and audited (they interact with PS-01 age enforcement and PS-07).

**Exit condition:** Profile reflects the owner's confirmed self-entered data, owned solely by the account owner.

**Downstream artifacts:** Consumed by PR-02, PR-03, and any surface that displays a member (MG-04, PF-01, roster views — those consume, they do not own).

**Open questions:** `OQ-PR-FIELDS` (owner: Department 01 with Department 04 review; safe default: only the IT-01 shell fields exist in v1, all optional except what IT-01 already requires; evidence required: a proposed field with its visibility class under the normative model; affected: PR-01/02/03; blocking stage: adding any new profile field). `OQ-PR-DOB-EDIT` (owner: Department 04; safe default: the date-of-birth / age-assertion field is **frozen after IT-01 verification** and can only be changed through an audited identity/safety path, not ordinary PR-02; affected: PR-01/02, PS-01, PS-07; blocking stage: any self-service DOB edit).

---

## PR-02 — Edit Own Profile

**Purpose:** Let a member change their own already-populated profile data.

**Actors:** Account owner only (Athlete or Coach), on their own profile.

**Capability / trigger:** Available to an account owner editing their own profile.

**Preconditions:** Account is `active`; profile exists.

**Authorization assumptions (normative v2):**
- **Hard approved invariant:** no coach or administrator may edit an athlete's personal profile data through any coach/admin path. Editing is strictly self-scoped.
- A Head Coach changing Team-membership metadata (role via TA-01, group assignment via TA-04/TA-05) acts on distinct records — membership/assignment metadata is not profile data (approved hierarchy invariant). This workflow does not touch membership metadata.
- The date-of-birth / age-assertion field is not editable through ordinary PR-02 (`OQ-PR-DOB-EDIT`, safe default frozen-after-verification).

**Owned resources:** The profile record's field values.

**States:** `populated(v1) → populated(v2)` per field.

**State transitions:** Owner confirms field changes.

**Happy path:** Athlete updates their display name; the change persists and propagates.

**Alternate paths:** Coach edits their own coach profile — same self-scoped rule.

**Errors/failures:** Attempt to edit another member's athlete-owned profile → rejected (authorization failure, audited as an attempted boundary violation). Invalid values rejected at input.

**Recovery:** Re-editable; prior values recoverable for audit where the field is security/safety-relevant (age assertion).

**Offline behavior:** Local drafting acceptable; authoritative persistence requires connectivity.

**Synchronization implications:** As PR-01 — propagation before dependent views; no stale authoritative read of age.

**Notifications:** A change to the contact identifier or the age-assertion field triggers a security notification to the owner's verified channel(s), consistent with IT-07's posture for credential-adjacent changes.

**Audit requirements:** Edits to date-of-birth / age-assertion and to the contact identifier are audited; routine descriptive edits are not independently audit-critical.

**Exit condition:** Profile reflects the owner's confirmed edits, still owned solely by the owner.

**Downstream artifacts:** Same as PR-01; feeds PS-08 (a data-subject correction request is fulfilled through this workflow for profile fields).

**Open questions:** `OQ-PR-SUPPORT-EDIT` (owner: Department 06 support-operations + Department 04 privacy; safe default: **no** operations/support profile-edit path in v1 — the account owner is the only editor; a support-assisted correction, if ever added, is fully audited and owner-consented; affected: PR-02, PS-08; blocking stage: only a support-tool build). `OQ-PR-DOB-EDIT` (stated at PR-01).

---

## PR-03 — Profile Visibility Resolution

**Purpose:** Resolve which other members may view which parts of a given member's profile, per the normative v2 visibility model.

**Actors:** Profile owner (subject); other Team members (potential viewers); Department 04 (policy owner for any refinement).

**Capability / trigger:** Consumed by any surface that renders another member (roster, message entry, history header). Those surfaces call this resolution; they never define or cache it.

**Preconditions:** Viewer and subject are members of the same Team (cross-Team profile visibility does not exist — Team-context isolation invariant, IT-05).

**Authorization assumptions (normative v2):**
- **Not publicly discoverable.** There is no profile directory or search-by-profile; a profile is only resolvable inside an established shared-Team context.
- **Peers** (other athletes on the same Team) receive **minimum Team identity information only** — display name and role. They do **not** receive the contact identifier, the date of birth, or an age value.
- **Coaches** receive:
  - for **any** Team member: the minimum Team identity (display name, role);
  - for athletes **currently within their management scope** (Event Coach: assigned groups; Head Coach: Team-wide): the fuller profile detail the field catalogue defines as coach-visible.
  - Coaches never receive the raw date of birth or age-assertion evidence; they receive at most a derived eligibility flag or approved age band (decision 8).
- **Date-of-birth / age evidence** is restricted to the identity subsystem and authorized safety functions (PS-01, PS-07, Platform Safety Administrator). No coach or peer path returns it.
- Profile visibility is **never** derived from billing/tier state and is evaluated only within the viewer's currently active Team context (IT-05).
- The MG-04 Team-wide communication-reach precedent must **not** be extended to profile visibility by analogy.
- Coaches gain **no** profile-edit capability from any level of view access (PR-02 is independent of PR-03).

**Owned resources:** Profile-visibility resolution (a computed authorization result, not a durable user-authored record).

**States:** N/A (evaluated per viewer / subject / field); freshness state is `stale ↔ current` relative to sync.

**State transitions:** N/A.

**Happy path:** A viewer opens a surface showing another member; the resolution returns exactly the fields their relationship (peer / in-scope coach / Head Coach) permits.

**Alternate paths:** A coach whose management scope was just narrowed loses fuller-detail access to the now-out-of-scope athlete on the next authoritative check; minimum Team identity remains.

**Errors/failures:** A surface requesting a field the viewer is not permitted to see → the field is withheld server-side, not returned-then-hidden client-side (defense against over-fetch).

**Recovery:** N/A (read/derived).

**Offline behavior:** A cached profile view may be shown offline but must be treated as provisional; any coach-scope-gated field must be re-validated against the current authoritative scope before display, and DOB/age is never in a client cache.

**Synchronization implications:** A scope narrowing that reduces a coach's profile access is an authorization-sensitive propagation — a stale cache must not keep showing fuller detail after scope is lost.

**Notifications:** None.

**Audit requirements:** Not independently audited for ordinary reads; the resolution logic is a Department 04 authorization control point.

**Exit condition:** N/A (standing resolution) — enforced on every profile read.

**Downstream artifacts:** Consumed by every member-rendering surface; an explicit review criterion for Department 04 and for later information-architecture work.

**Open questions:** `OQ-PR-FIELDS` (which catalogue fields are classed coach-visible vs owner-only — owner: Department 01 with Department 04; safe default: only display name + role are coach-visible for in-scope athletes until a field is explicitly classified; affected: PR-03; blocking stage: adding a coach-visible field). `OQ-PR-AGE-BAND` (the exact derived value other contexts receive — owner: Department 04; safe default: a boolean `is_minor` eligibility flag only, no age band, until a band is approved; affected: PR-03, PS-01; blocking stage: exposing anything richer than the boolean).
