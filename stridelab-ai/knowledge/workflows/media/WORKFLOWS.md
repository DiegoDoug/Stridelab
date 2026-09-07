# Media Capture & Library Workflows

**Category:** media
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Cross-department dependency:** Department 04 review mandatory — this category involves youth media, tagging, and visibility scope (risk-sensitive routing per ORCHESTRATOR.md).

**Governing invariant (approved baseline):** Recording, tagging, explicit sharing,
Vault visibility, and Team publication are five separate transitions. Tagging
never implies publication. Media capture defaults to private/draft; broader
visibility is always an explicit, subsequent, attributable act.

**v2 normative decisions applied to this category:**
- **Team-wide communication permission (MG-04) does NOT grant media access.**
- **Tagging (MD-05) is metadata only and NEVER grants Vault access.**
- **Vault access requires a distinct, server-authoritative grant** by the media owner (VS-01) — it is **not** automatic on tag. (Resolves finding F-11: the decision is *explicit grant*.)
- **Multi-subject youth media** (an artifact tagging/depicting athletes other than the actor) **cannot be peer-reshared or broadly published by default** — VS-02 re-share to a third party and MD-06 publication are blocked by default when other depicted athletes have not consented.
- **Event Coaches** may tag and share media **only within their current management scope**; **athlete-to-athlete media sharing is disabled in v1** (VS-02).

---

## MD-01 — Record Practice Video

**Purpose:** Capture video of practice/training activity for later attachment, tagging, and analysis.

**Actors:** Coach or Athlete with device camera access, acting within a Team context.

**Capability / trigger:** Available to an active Team member with device camera access, capturing media of Team activity they are permitted to be present at.

**Preconditions:** Actor is an active Team member; device camera permission granted at the OS level.

**Authorization assumptions:**
- Any Coach or Athlete may record media of Team activity they are permitted to be present at; recording authority is not itself scoped by Event Group (an Event Coach recording at a shared facility may capture athletes outside their managed group, but capture is not the same as tagging/attaching — see MD-05).
- The recording actor is the initial owner of the raw media artifact until/unless it is explicitly attached (MD-04), tagged (MD-05), or published (MD-06).

**Owned resources:** Raw media artifact (recording actor's private draft by default).

**States:** `nonexistent → recording → draft`.

**State transitions:** `nonexistent → recording`: capture begins. `recording → draft`: capture ends, artifact saved locally as a private draft owned by the recording actor.

**Happy path:** Actor records a clip during/after practice → recording ends → artifact is saved as a private, unpublished draft (MD-03) owned solely by the recorder.

**Alternate paths:** Recording interrupted (app backgrounded, call received) — partial capture is preserved as a draft rather than silently discarded, consistent with the "honest terminal state" failure-mode requirement.

**Errors/failures:** Camera permission denied → capture cannot start; storage exhausted mid-recording → honest partial-save, not silent data loss.

**Recovery:** A failed/interrupted recording is recoverable as a partial draft where technically possible; otherwise fails cleanly with no orphaned state.

**Offline behavior:** Fully offline-capable — capture and local draft storage require no connectivity.

**Synchronization implications:** A private draft is not synchronized to any server or other Team member until an explicit subsequent action (MD-04 attach, MD-05 tag, or MD-06 publish) initiates that transition — recording alone must never cause background upload to shared storage without a further explicit act, given the youth-media sensitivity of this category.

**Notifications:** None — capture is private by default.

**Audit requirements:** Capture events are not independently audited beyond standard device-local logging; downstream tagging/sharing/publication actions (MD-05/MD-06, VS-*) carry the audit weight since those are the actual visibility-changing transitions.

**Exit condition:** Media artifact exists as a private draft owned by the recording actor, or capture is cleanly abandoned.

**Downstream artifacts:** Feeds MD-03 (draft state), MD-04 (attach to Session), MD-05 (tagging), and, for coaches, AN-01 (analysis).

**Open questions:** `OQ-MD-CAPTURE-NOTICE` (owner: Department 04 `youth-safeguarding-trust-safety`; safe default: no in-the-moment consent/notice step in v1 for capture itself — capture stays a private draft (MD-03) and every downstream visibility transition is separately gated; evidence required: a youth-safety assessment of shared-facility capture; affected: MD-01, MD-05, MD-06; blocking stage: any capture-time consent feature). Flagged for mandatory Department 04 review.

---

## MD-02 — Import Video

**Purpose:** Bring externally captured media (e.g., a video shot outside the app, from a camera roll) into the media library under the same ownership/visibility rules as MD-01.

**Actors:** Coach or Athlete.

**Capability / trigger:** Available to an active Team member importing an external media file into the app library.

**Preconditions:** Actor is an active Team member; device grants media-library read permission.

**Authorization assumptions:** Imported media is subject to the exact same default-private-draft posture as recorded media (MD-01) — the import mechanism does not create a shortcut to broader visibility.

**Owned resources:** Imported media artifact (importing actor's private draft by default).

**States:** `nonexistent → importing → draft` (mirrors MD-01).

**State transitions:** `nonexistent → importing`: file selected. `importing → draft`: import completes.

**Happy path:** Actor selects an external file → it is copied into the app's media library as a private draft.

**Alternate paths:** Import of an unsupported format/corrupted file → explicit failure, not a silently broken draft.

**Errors/failures:** Permission denied; unsupported format; storage exhaustion — all fail honestly.

**Recovery:** Failed import can be retried; no partial/corrupt draft is left in an ambiguous state.

**Offline behavior:** Fully offline-capable if the source file is already on-device.

**Synchronization implications:** Same as MD-01 — private until an explicit subsequent transition.

**Notifications:** None.

**Audit requirements:** Same posture as MD-01.

**Exit condition:** Imported artifact exists as a private draft, or import cleanly fails.

**Downstream artifacts:** Same as MD-01 (MD-03, MD-04, MD-05, AN-01).

**Open questions:** Provenance/authenticity of imported media (e.g., is it actually of this Team's practice) is not verified by the system — treated as an accepted product limitation, not an open decision.

---

## MD-03 — Local / Private Draft

**Purpose:** Define the default resting state of all captured/imported media prior to any visibility-expanding action — this is a state, not an action, but is modeled explicitly because it is the safety-critical default the rest of the category depends on.

**Actors:** Owning actor (Coach or Athlete).

**Capability / trigger:** Automatic outcome of MD-01/MD-02.

**Preconditions:** Media artifact exists.

**Authorization assumptions:** Only the owning actor can view, edit metadata on, or act upon a draft; no other Team member — including a Head Coach — has visibility into another actor's private draft. This is the enforcement point for the "tagging does not mean Team-wide publication" and "capture defaults to private" invariants.

**Owned resources:** The media artifact in its unshared state.

**States:** `draft` (terminal-until-acted-upon; the only exits are MD-04, MD-05, MD-06, or deletion via MD-07).

**State transitions:** `draft → attached` (MD-04), `draft → tagged` (MD-05), `draft → published` (MD-06), or `draft → deleted` (MD-07).

**Happy path:** Media sits in `draft` until the owner deliberately acts on it.

**Alternate paths:** Owner deletes a draft they never intend to use further.

**Errors/failures:** N/A — this is a resting state, not an action with failure modes.

**Recovery:** N/A.

**Offline behavior:** Drafts may persist locally indefinitely without requiring connectivity.

**Synchronization implications:** A draft does not require server sync at all unless/until the owner acts on it; local-only storage is an acceptable permanent state for a draft the owner never shares.

**Notifications:** None.

**Audit requirements:** None — no visibility change has occurred.

**Exit condition:** N/A (state, not a completed workflow) — exits only via MD-04/MD-05/MD-06/MD-07.

**Downstream artifacts:** N/A directly; this state gates all other media transitions.

**Open questions:** None — this is the anchor invariant, not an open item.

---

## MD-04 — Attach to Session

**Purpose:** Associate a media artifact with a specific coach-prescribed Session (TP-04/SE-*) for training/context record-keeping, independent of who can ultimately see the media itself.

**Actors:** Owning actor (Coach or Athlete).

**Capability / trigger:** Available to the owner of a `draft` media artifact who has visibility into the target Session (TP-07 assignment or authorship).

**Preconditions:** Media artifact is `draft`; target Session exists and the actor has visibility into it (per TP-07 assignment or authorship).

**Authorization assumptions:** Attaching media to a Session records a *contextual association* only — it does **not** by itself change who can view the media artifact. Attachment visibility and media-content visibility are separate concerns; the media remains governed by MD-05/MD-06/VS-* for who can actually see it.

**Owned resources:** Session-media association record (link, not the media's visibility rule).

**States:** `unattached → attached`.

**State transitions:** `unattached → attached`: owner confirms the association with a specific Session.

**Happy path:** Coach or athlete attaches a clip to today's Session so it is discoverable in that Session's context, while its actual visibility remains governed separately.

**Alternate paths:** Detaching a clip from a Session (reversible; does not delete the media itself).

**Errors/failures:** Attaching to a Session outside the actor's visibility scope → rejected.

**Recovery:** Detachment is non-destructive.

**Offline behavior:** Attachment may be created offline against a locally cached Session reference; reconciled on sync.

**Synchronization implications:** The association must propagate consistently with the media's actual visibility rule — a Session-attachment record must never be used by a client as an implicit visibility grant beyond what MD-05/MD-06/VS-* actually authorize.

**Notifications:** Not required by attachment alone.

**Audit requirements:** Not independently audit-critical; the underlying visibility-changing actions (MD-05/MD-06) carry the audit weight.

**Exit condition:** Media is associated with the Session for contextual discovery, with visibility unchanged by this action alone.

**Downstream artifacts:** Feeds AN-01 (analysis project context) and coaching review workflows keyed off a Session.

**Open questions:** None material; the critical constraint (attachment ≠ visibility grant) is the load-bearing rule here.

---

## MD-05 — Tag Athlete(s)

**Purpose:** Identify which athlete(s) appear in or are the subject of a media artifact — a metadata/identification act, explicitly distinct from granting visibility.

**Actors:** Owning actor (Coach or Athlete).

**Capability / trigger:** Available to the media owner (Coach or Athlete) identifying which Team member(s) appear in or are the subject of the artifact, within the owner's tagging scope.

**Preconditions:** Media artifact exists; target athlete(s) are members of the same Team.

**Authorization assumptions (normative v2):**
- **Tagging is metadata / identification only.** It never means Team-wide publication and it **never** grants the tagged athlete Vault access — Vault access is a separate, explicit, server-authoritative grant (VS-01).
- **Tag authority is bounded to the tagger's current scope:** a Head Coach may tag any Team member; an Event Coach may tag only athletes within their current management scope (TA-04/TA-05); an athlete may tag teammates with whom they share a group. The Team-wide *communication* allowance (MG-04) does **not** widen tag authority.
- Tagging an athlete outside the tagger's scope → rejected.

**Owned resources:** Tag record (media artifact ↔ tagged athlete identity).

**States:** `untagged → tagged`.

**State transitions:** `untagged → tagged`: owner adds one or more athlete tags. Tags may be removed (`tagged → untagged`) by the owner.

**Happy path:** Coach records a clip of an athlete's drill → tags that athlete for identification. The tag does **not** grant Vault access; if the coach wants the athlete to see the clip they perform the separate, explicit VS-01 grant.

**Alternate paths:** Multiple athletes tagged in one clip (e.g., a relay handoff) — each is identified; the owner must deliberately and separately grant Vault access per athlete (VS-01) if desired. The clip is **multi-subject youth media**: VS-02 re-share and MD-06 publication are blocked by default until every depicted athlete has consented.

**Errors/failures:** Tagging a non-Team-member → rejected. Tagging an athlete outside the tagger's management/visibility scope → rejected.

**Recovery:** Tags are removable by the owner; removal does not retroactively revoke a Vault-access grant already made under VS-01 (that requires an explicit VS-03 revoke) — "untagging" is not "revoking access."

**Offline behavior:** Tagging may occur offline against locally cached Team roster data; reconciled on sync.

**Synchronization implications:** Tag records must propagate before a VS-01 grant against a tag can be evaluated.

**Notifications:** Tagged athlete is notified they were tagged (transparency; safety class). This is distinct from any VS-01 Vault-access notification, which only fires if the owner makes that separate grant.

**Audit requirements:** Tagging is a privacy-relevant event (identifies a minor in media) and is audited.

**Exit condition:** Tag record(s) exist and accurately identify the subject(s) of the media, with **no** visibility change.

**Downstream artifacts:** A tag is the *identification* that a later, separate VS-01 grant may reference; it is not itself a grant.

**Open questions:** `OQ-MD05-ATHLETE-TAG-EDGE` (owner: Department 01 with Department 04; safe default: an athlete may tag only teammates they currently share a group with; evidence required: whether a broader/narrower athlete-tagging boundary is wanted; affected: MD-05; blocking stage: any change to the athlete-tag boundary). Tag→access being *explicit grant* (not automatic) is a **normative v2 decision**, not an open item.

---

## MD-06 — Team Media Publication Where Explicitly Allowed

**Purpose:** Make a media artifact visible to the broader Team (or a defined Team-wide audience) as an explicit, separate act from tagging or attachment.

**Actors:** Owning actor; Head Coach (authority / approval gate).

**Capability / trigger:** Available to a media owner on an artifact when the Team's policy permits publication, the actor holds publication authority, and — for any tagged minor — the consent/notice condition is satisfied.

**Preconditions:** Media artifact exists; the Team's policy explicitly permits publication; actor holds publication authority; for **multi-subject youth media**, every depicted/tagged athlete's consent/notice condition is satisfied.

**Authorization assumptions (normative v2):**
- Publication is the broadest-visibility transition and is **never** an implicit consequence of recording, importing, attaching, or tagging.
- **Multi-subject youth media cannot be broadly published by default.** Publication of an artifact that tags/depicts athletes other than the publisher is **blocked** until each such athlete's consent/notice condition is met.
- **Known limitation:** the system can only enforce this on the *tag* — an untagged-but-depicted minor is not system-detectable. The block therefore depends on tagging accuracy; capture-time notice (`OQ-MD-CAPTURE-NOTICE`) and the publication-authority gate (`OQ-MD06-AUTHORITY`) are the compensating controls, and a publisher attesting "no other minors depicted" is on record for that attestation.
- `OQ-MD06-AUTHORITY` (owner: Department 04 with Department 01; **safe default: publication requires Head Coach authority or Head-Coach approval, plus an explicit per-tagged-minor consent/notice step; if any required consent is missing, publication is blocked**; evidence required: the consent model — who consents for a minor, how it is recorded; affected: MD-06, MG-05; blocking stage: enabling publication in a Team).

**Owned resources:** Publication state on the media artifact; audience scope (e.g., whole Team vs. an Event Group).

**States:** `draft|tagged → published`.

**State transitions:** `draft|tagged → published`: owner (or authorized approver) confirms publication with a defined audience scope.

**Happy path:** Owner explicitly publishes a highlight clip to the Team → all Team members within the defined audience scope can now view it.

**Alternate paths:** Publication scoped to an Event Group/Subgroup rather than the whole Team.

**Errors/failures:** Attempting to publish where Team policy disallows publication entirely → rejected. Attempting to publish media of a tagged minor without the required consent/notice → **blocked** (normative default), pending that condition.

**Recovery:** Published media can be unpublished (reverting visibility), which is itself a destructive/consequential transition requiring the same rigor as publication (who can see the "unpublish" event, whether cached copies persist on other devices).

**Offline behavior:** Publication requires connectivity to take effect for other Team members; a locally queued "publish" action is not authoritative until the server confirms and propagates it.

**Synchronization implications:** This is a broad-visibility, youth-media-sensitive transition — propagation must be atomic from an authorization standpoint (no device should render the media as Team-visible before the server has actually authorized that visibility).

**Notifications:** Team (or scoped audience) notified of new published media (social class). Each tagged athlete is specifically notified (safety class) — backed by the F-12 state model: transactionally-created authoritative in-app state, durable retry, idempotent processing, delivery + acknowledgement state, an audited terminal-failure record, and human escalation if a safety-critical notice stays undelivered. Push/email are secondary and fallible.

**Audit requirements:** Publication is a mandatory audit event (broadest visibility change of youth-relevant media) and is explicitly in Department 04 scope.

**Exit condition:** Media is visible to the defined audience with an explicit, attributable publication record (and recorded per-minor consent), or the publish attempt is cleanly rejected/blocked.

**Downstream artifacts:** Feeds MD-07 (lifecycle/retention) and general Team-facing media browsing.

**Open questions:**
- `OQ-MD06-AUTHORITY` (stated above; safe default: Head-Coach-gated + per-minor consent, else blocked).
- `OQ-MD06-UNPUBLISH` (owner: Department 04/03; safe default: "unpublish" removes the artifact from the authoritative audience view and best-effort-invalidates already-cached copies; guaranteed local-cache removal is the same open item as VS-03; affected: MD-06, MD-07, VS-03; blocking stage: an unpublish feature).

---

## MD-07 — Media Lifecycle

**Purpose:** Govern retention, archival, and deletion of media artifacts across their draft/attached/tagged/published states.

**Actors:** Owning actor (deletion of their own draft); Head Coach / Team Creator (Team-level retention policy); Department 04 (retention/legal requirements, preservation holds).

**Capability / trigger:** An explicit deletion by the owner, or a Department-04-owned retention/legal-hold action.

**Preconditions:** Media artifact exists in any state.

**Authorization assumptions:**
- The owning actor may delete their own draft media unilaterally.
- Deleting media that has been published (MD-06) and/or is subject to a retention/legal hold (e.g., relevant to an active PS-03/PS-09 case) is **blocked** until Department 04 releases the hold (contract 11, governance safety-enforcement seam).
- Deleting media does not retroactively alter historical audit records of tagging/publication/sharing events that referenced it (the event happened; the artifact's later deletion is a separate fact).
- On a member's departure or Team closure, media disposition follows **DD-DEPARTED-CONTENT** (`identity-team/WORKFLOWS.md`): athlete-owned media stays with the athlete; Team-context media (e.g., published Team highlights) stays with the Team subject to any hold; no cascading deletion.

**Owned resources:** Media artifact's existence and all states/associations (tags, attachments, publication, Vault shares) that depend on it.

**States:** `draft|attached|tagged|published → deleted | archived`.

**State transitions:** `any → deleted`: owner or authorized policy action removes the artifact (destructive; downstream tag/publication/share records must be resolved — e.g., marked as referencing removed media, not silently orphaned). `any → archived`: retained in a reduced-visibility state for compliance/history without ongoing general visibility (OPEN whether this state is adopted).

**Happy path:** Owner deletes a draft they no longer want → removed cleanly with no downstream dependents (since a draft, by definition, has no tags/publication/shares yet).

**Alternate paths:** Deleting already-tagged/published/shared media — must cleanly resolve VS-01/VS-02 (Vault access, shares) and MD-06 (publication) records, revoking access rather than leaving dangling references to a nonexistent artifact.

**Errors/failures:** Deletion attempted on media under an active legal/moderation hold (if adopted) → blocked with explicit reason, per Department 04 policy.

**Recovery:** Whether deletion has an undo/grace window is OPEN, mirroring the equivalent open question in IT-08 (account deletion).

**Offline behavior:** Deletion of a purely local, never-synced draft is immediate and fully offline. Deletion of already-synced/shared/published media requires connectivity to properly revoke access on other devices.

**Synchronization implications:** Revocation of access (when deleting shared/published/tagged-with-Vault-access media) must propagate at least as reliably as the original grant did — a device that already cached the media offline may retain a local copy after server-side deletion; the extent to which this is acceptable is a Department 04 privacy/security question, not assumed here.

**Notifications:** Athletes who had Vault access or were tagged in deleted media should be notified their access/tag no longer applies, where feasible.

**Audit requirements:** Deletion of tagged/published/shared media is a privacy-sensitive, audited event.

**Exit condition:** Media artifact reaches `deleted` (or `archived`, if adopted) with all dependent tag/publication/share records cleanly resolved, or deletion is blocked with an explicit, actionable reason.

**Downstream artifacts:** Terminates or transforms the basis for AN-* (analysis) and VS-* (vault-sharing) records that referenced the media.

**Open questions:**
- `OQ-MD07-RETENTION` (owner: Department 04; safe default: media relevant to an open PS-03/PS-09 case is under a preservation hold and cannot be deleted until Department 04 releases the hold; other media follows the account-level retention policy on IT-08/IT-09; affected: MD-07, PS-09; blocking stage: a retention implementation).
- `OQ-MD07-ARCHIVE-STATE` (owner: Department 01; safe default: hard deletion only in v1, no separate `archived` soft-retained state unless a legal hold requires it; affected: MD-07; blocking stage: an archive feature).
- `OQ-MEDIA-CACHE-INVALIDATION` (owner: Department 03/04; safe default: server-side deletion revokes authoritative access and best-effort-purges cached copies; a hard guarantee of local-cache removal is a Department 03 design item shared with VS-03; affected: MD-06, MD-07, VS-03; blocking stage: the sync/caching design).
