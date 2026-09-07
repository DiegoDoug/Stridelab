# Vault & Sharing Workflows

**Category:** vault-sharing
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Cross-department dependency:** Department 04 review mandatory — youth media visibility is the single highest-sensitivity surface in the product.
**Depends on:** media (MD-05 tagging), analysis (AN-07 coaching findings)

This category is the authoritative enforcement point for the approved
invariant: **Athlete Vault visibility is restricted to explicitly-granted
authorized media/artifacts.** Visibility is never inferred from Team
membership, group assignment, tag presence, or mere media existence.

**v2 normative decisions applied to this category:**
- **Vault access requires a distinct, server-authoritative grant** by the media owner (VS-01) — being tagged (MD-05) is identification only and does **not** itself grant access. (Resolves finding F-11 — the decision is *explicit grant*, not automatic.)
- **A coach may VS-02-share only within their current management scope.** Team-wide communication reach (MG-04) does not widen sharing, feedback, analysis, profile, or management scope.
- **Athlete-to-athlete media sharing is disabled in v1.**
- **Multi-subject youth media** (an artifact tagging/depicting athletes other than the sharer) **cannot be peer-reshared or broadly published by default** — VS-02 onward-share to a third party is blocked until each other depicted athlete's consent condition is met.

---

## VS-01 — Grant Tagged Athlete Vault Access

**Purpose:** Let a media owner make an **explicit, server-authoritative** grant of Vault visibility to a specific tagged athlete for one specific artifact. (Renamed and re-scoped in the v2 pass: the grant is a deliberate owner action, not an automatic consequence of MD-05 — finding F-11.)

**Actors:** Media owner (grantor); tagged athlete (recipient).

**Capability / trigger:** Available to a media owner on an artifact that tags an athlete, when the owner chooses to let that athlete see the artifact in their Vault.

**Preconditions:** A tag record exists (MD-05) associating the athlete with the media artifact; the owner controls the artifact.

**Authorization assumptions (normative v2):**
- The grant is **not automatic**. Being tagged is identification only. The owner must take a distinct action to grant Vault access, and the grant is confirmed **server-side** before any device treats it as effective.
- A grant conveys Vault visibility into **that specific artifact only** — never the owner's other drafts, other tags, or the broader library.
- The grant is independent of the athlete's Event Group/Subgroup assignment.
- For **multi-subject youth media**, the owner grants **per athlete, deliberately**; there is no bulk "grant to everyone tagged". Onward re-share of such an artifact by a recipient is governed by VS-02's multi-subject rule.
- Each grant is independently auditable and revocable (VS-03).

**Owned resources:** Vault-access grant record (grantor ↔ recipient athlete ↔ specific media artifact).

**States:** `no_access → grant_pending → vault_access_granted`; `vault_access_granted → revoked` (VS-03) or `→ no_access` on MD-07 deletion of the underlying media.

**State transitions:**
1. `no_access → grant_pending`: owner initiates the grant (offline: queued, not effective).
2. `grant_pending → vault_access_granted`: server confirms and persists the grant; the recipient's authoritative Vault view now includes the artifact.
3. `vault_access_granted → revoked`: VS-03.

**Happy path:** Coach tags an athlete in a practice clip → decides the athlete should review it → grants Vault access (VS-01) → server confirms → the athlete sees exactly that clip in their Vault.

**Alternate paths:** Multiple athletes tagged in one clip — the owner grants access to each one individually and deliberately; not granting is the default state.

**Errors/failures:** Granting to an athlete who is not tagged in the artifact and not otherwise authorized → rejected (use VS-02 for an untagged recipient). A queued offline grant that collides with a revocation → resolves in favour of the revocation.

**Recovery:** A grant made in error is reversed via VS-03.

**Offline behavior:** A grant is not effective until server-confirmed; an athlete's device must not display Vault access from a queued or stale local grant, and must validate against the current authoritative grant rather than a cached flag.

**Synchronization implications:** Authorization-sensitive. A device showing access it no longer authoritatively has is the more serious youth-privacy failure and must be defended against more strictly — favour an online check for Vault content over trusting a long-lived local cache.

**Notifications:** Athlete notified they now have Vault access to the specific item (safety class, invariant #14 state model).

**Audit requirements:** Mandatory audit event — grants of youth-media visibility are a core safety/privacy control point.

**Exit condition:** The grant record accurately reflects the owner's deliberate, server-confirmed decision for that athlete/artifact pair.

**Downstream artifacts:** Feeds the athlete's Vault view and AN-01 (athlete may open the granted media in analysis if their role/scope permits).

**Open questions:** `OQ-MD05-ATHLETE-TAG-EDGE` (owned in MD-05). The tag→access model (explicit grant, not automatic) is **resolved normatively** (F-11).

---

## VS-02 — Explicitly Share Clip / Frame / Drawing / Video

**Purpose:** Grant Vault-equivalent visibility into a specific artifact (or a specific derived piece of one, such as a single annotated frame or clip) to a named recipient, independent of tagging.

**Actors:** Owner of the source artifact (Coach only in v1; athlete-to-athlete sharing is disabled); recipient (an athlete within the sharing coach's current management scope, or another coach authorized for the content).

**Capability / trigger:** Available to a coach who owns or is share-authorized for a specific artifact/derived item and wants a specific in-scope recipient to see exactly that item.

**Preconditions:** Source artifact/derived item exists and is owned (or otherwise share-authorized) by the sharing coach; the recipient athlete is **within the sharing coach's current management scope**; for multi-subject youth media, the other depicted athletes' consent condition is satisfied.

**Authorization assumptions (normative v2):**
- Sharing is fully explicit and item-scoped — access to exactly the shared item, never the sharer's broader library or unrelated items.
- Sharing does not require the recipient to have been tagged — it is the second, independent path to Vault-equivalent visibility alongside VS-01.
- **A coach may VS-02-share only within their current management scope.** The Team-wide *communication* allowance (MG-04) does **not** widen sharing authority. A Head Coach's scope is Team-wide; an Event Coach's is their assigned groups.
- **Athlete-to-athlete media sharing is disabled in v1** — an athlete cannot use VS-02 to grant another athlete access to media.
- **Multi-subject youth media** (the artifact tags/depicts athletes other than the sharer): onward VS-02 share to a third party is **blocked by default** until each other depicted athlete's consent condition is met (`OQ-VS02-MULTISUBJECT`, safe default: blocked). VS-01/VS-04's tag-notification model does not cover this — the block is the safe default.
- **Known limitation:** enforcement keys on *tags*; an untagged-but-depicted minor is not system-detectable, so the block's effectiveness depends on tagging accuracy (same limitation as MD-06).
- The sharer must own or be authorized to redistribute the underlying media (a coach cannot share another coach's private draft without that owner's action).

**Owned resources:** Share-grant record (recipient ↔ specific item).

**States:** `not_shared → shared`.

**State transitions:** `not_shared → shared`: sharer confirms recipient(s) and item.

**Happy path:** An in-scope coach shares a specific annotated clip with one of their managed athletes as feedback (the general form of AN-07) → the athlete gains Vault-equivalent access to that item only.

**Alternate paths:** A coach shares an item with another coach who is authorized for that content (e.g., a co-coach of the same group).

**Errors/failures:** Sharing an item the sharer does not own/control → rejected. Sharing with an athlete **outside the sharing coach's current management scope** → rejected (even though the coach could message that athlete). An athlete attempting VS-02 → rejected (athlete-to-athlete sharing disabled in v1). Onward-sharing multi-subject youth media without the other depicted athletes' consent → blocked. Sharing with a non-Team-member → rejected.

**Recovery:** A share made in error is reversible via VS-03.

**Offline behavior:** Sharing requires connectivity to take effect for the recipient; a locally queued share is not authoritative until server-confirmed, consistent with the offline-behavior invariant applied throughout.

**Synchronization implications:** Same integrity requirement as VS-01 — access must be validated against the current authoritative grant, not a stale cache, given the safety sensitivity of the category.

**Notifications:** Recipient notified of the new shared item.

**Audit requirements:** Mandatory audit event, same rationale as VS-01.

**Exit condition:** Share-grant record accurately reflects exactly the shared item and recipient(s).

**Downstream artifacts:** Feeds the recipient's Vault view; may feed AN-01 if the recipient opens the shared item for their own analysis (subject to the rights the share conveys — `OQ-VS02-RIGHTS`).

**Open questions:**
- `OQ-VS02-RIGHTS` (owner: Department 01; safe default: a VS-02 share is **view-only** in v1 — the recipient can view but cannot build their own analysis project against a shared item unless separately authorized; affected: VS-02, AN-01; blocking stage: a recipient-analysis feature).
- `OQ-VS02-MULTISUBJECT` (owner: Department 04; **safe default: onward VS-02 share of an artifact depicting other tagged athletes to a third party is BLOCKED until each such athlete's consent condition is met**; the OPEN part is the consent mechanism — who consents for a minor, how it is recorded, whether a coach with authority can proceed on a documented basis; affected: VS-02, MD-06, MG-05; blocking stage: any onward-share of multi-subject media).
- Coach-sharing-outside-scope and athlete-to-athlete sharing are **resolved normatively** (in-scope-coach only; athlete-to-athlete disabled), not open.

---

## VS-03 — Revoke Share

**Purpose:** Terminate a previously granted Vault-equivalent access (from VS-01 or VS-02) for a specific recipient/item pair.

**Actors:** Original granting actor (VS-01 grantor or VS-02 sharer); Platform Safety Administrator (on a moderation/safety basis, via PS-03/PS-09).

**Capability / trigger:** Available to the actor who made a grant, to terminate it for a specific recipient/item pair; also reachable as a moderation action.

**Preconditions:** An active grant exists (VS-01 or VS-02).

**Authorization assumptions (normative v2):** Ordinary revocation authority mirrors grant authority — whoever granted can revoke. `OQ-VS03-HC-REVOKE` (owner: Department 04; **safe default: a Head Coach does NOT get an ordinary unilateral revoke of another member's grant — a Head-Coach safety concern about a grant routes through the MG-06 → PS-03 moderation path, where the Platform Safety Administrator can revoke**; evidence required: whether teams need an in-hierarchy Head-Coach revoke; affected: VS-03, PS-03; blocking stage: a Head-Coach revoke feature).

**Owned resources:** The grant record itself (terminated, not merely hidden).

**States:** `vault_access_granted → revoked`.

**State transitions:** `vault_access_granted → revoked`: granting actor confirms revocation (destructive/consequential transition — requires the same rigor as any other: authority, confirmation, downstream effects).

**Happy path:** Owner realizes a share was made in error, or a relationship/context changes, and revokes the specific grant → recipient loses access to that item.

**Alternate paths:** Revoking one of several grants on the same item (e.g., one of three athletes tagged in a relay clip) affects only that recipient's access, not the others'.

**Errors/failures:** Attempting to revoke a grant the actor did not create and has no authority over → rejected.

**Recovery:** A revoked grant can be re-granted from scratch (a fresh VS-01 tag or VS-02 share) if appropriate; revocation itself is not "undone" as a distinct action.

**Offline behavior:** Revocation requires connectivity to propagate; until propagated, a recipient's device that already cached the item locally may still display it — this is the sharpest privacy risk in the category and should be minimized by favoring online-validated Vault access over long-lived local caching wherever feasible (Department 04/03 implementation concern, flagged here as a workflow-level requirement, not resolved as an implementation choice).

**Synchronization implications:** Revocation propagation speed and local-cache handling are the most safety-critical synchronization property in the entire product given the youth-media context — this must be treated as a first-class requirement, not an afterthought, wherever Department 03 designs the actual sync/caching mechanism.

**Notifications:** `OQ-VS03-NOTICE` (owner: Department 01 with Department 04; safe default: an ordinary revocation is applied silently — the item simply leaves the recipient's Vault view — to avoid distress over a routine correction; a revocation that is part of a moderation action follows PS-03's notification policy; affected: VS-03; blocking stage: none — default can ship).

**Audit requirements:** Mandatory audit event, especially important for demonstrating that access was correctly terminated if ever questioned.

**Exit condition:** Grant record is `revoked` and the recipient no longer has authorized access to the item.

**Downstream artifacts:** Removes the item from the recipient's authoritative Vault view.

**Open questions:**
- `OQ-VS03-HC-REVOKE` (stated above; safe default: no ordinary Head-Coach revoke — safety concerns go via moderation).
- `OQ-MEDIA-CACHE-INVALIDATION` (shared with MD-06/MD-07; owner: Department 03/04; safe default: server-side revocation is authoritative and best-effort-purges cached copies; a hard local-cache-removal guarantee is a Department 03 design item; blocking stage: the sync/caching design).
- `OQ-VS03-NOTICE` (stated above).

---

## VS-04 — Distinguish Tagging from Sharing / Publication (Invariant Enforcement Checkpoint)

**Purpose:** This is not a user-facing action but a mandatory cross-cutting checkpoint: every workflow that touches media visibility (MD-05 tagging, MD-06 publication, VS-01 derived access, VS-02 explicit share) must be independently verifiable against the rule that these are four distinct, non-overlapping transitions. This entry exists so the distinction is traceable as its own architectural artifact rather than only implied within each individual workflow.

**Actors:** N/A (architectural/verification concern, not a user action) — enforced by Department 01 (design) and verified by Department 04 (review) and, at implementation time, Department 03/02 (data model and UI must not conflate these states).

**Capability / trigger:** N/A.

**Preconditions:** N/A.

**Authorization assumptions:** No single boolean or combined field may represent "is this media visible to the Team" by conflating tag-count, grant-count, share-count, and publication status. Each transition — **tag** (MD-05, identification only), **grant Vault access to a tagged athlete** (VS-01, explicit, server-authoritative), **explicit share** (VS-02, item-scoped, in-scope-coach-only), **revoke** (VS-03), **publish** (MD-06, consent-gated for tagged minors) — must be independently representable and independently auditable. Tagging never implies a grant; a grant never implies publication.

**Owned resources:** N/A directly — this checkpoint governs the data-model and workflow boundary across MD-05, MD-06, VS-01, VS-02, VS-03.

**States:** N/A.

**State transitions:** N/A.

**Happy path:** N/A.

**Alternate paths:** N/A.

**Errors/failures:** A design or implementation that infers Vault access from Event Group/Subgroup assignment, or infers Team publication from tag count, or treats "untagged" as equivalent to "revoked," is a **failure of this checkpoint** and must be corrected before release, regardless of which category introduced it.

**Recovery:** N/A.

**Offline behavior:** N/A.

**Synchronization implications:** N/A.

**Notifications:** N/A.

**Audit requirements:** The four transitions must each leave an independent audit trail (already specified individually in MD-05, MD-06, VS-01, VS-02, VS-03).

**Exit condition:** N/A — this is a standing verification obligation for every future change to media/vault-sharing workflows, not a one-time completed task.

**Downstream artifacts:** Serves as an explicit review criterion for Department 04 and cross-department review of this Workflow Architecture and any future implementation built from it.

**Open questions:** None — this entry itself is the answer to a potential ambiguity, not an open question.
