# Video Analysis Workflows

**Category:** analysis
**Status:** AWAITING HUMAN APPROVAL (Workflow Architecture v2). Authoritative entry point: `docs/product/workflow-architecture.md`. This file is a supporting specification.
**Owning Department:** 01 Product & Experience (domain-workflow-architect)
**Skills applied:** domain-modeling, workflow-architecture
**Depends on:** media (a media artifact must exist; analysis never changes the media's underlying visibility rules from the media category)

**v2 normative decision (was "flagged for confirmation" in v1):** structured
coaching feedback (AN-07) and any analysis authority require the coach's
**current management scope** over the target athlete. Team-wide *communication*
reach (MG-04) does **not** widen feedback, analysis, media, profile, or
management scope. (Findings F-15, F-06 cross-cutting scope rule.)

Analysis tooling (markers, drawings, clips, comparisons) operates on top of a
media artifact but never itself changes who can see the underlying media —
visibility remains governed entirely by the media and vault-sharing
categories. An analysis project's own outputs (drawings, clips, notes) inherit
the same tagging-is-not-sharing discipline: creating an analysis artifact does
not publish or share it.

---

## AN-01 — Open Analysis Project

**Purpose:** Begin a structured analysis session against one or more media artifacts.

**Actors:** Coach or Athlete with visibility into the source media (per media/vault-sharing rules).

**Capability / trigger:** Available to a Coach or Athlete who already has visibility into the source media, to open a structured analysis project against it.

**Preconditions:** Actor has visibility into the source media artifact (own draft, tagged-with-Vault-access, explicitly shared, or published, per media/vault-sharing categories); device supports the analysis tooling.

**Authorization assumptions:** Opening an analysis project requires the same visibility the actor already has into the source media — analysis tooling is never a backdoor to media the actor could not otherwise see.

**Owned resources:** Analysis-project record (references source media, owned by the actor who opened it).

**States:** `nonexistent → open → saved | discarded`.

**State transitions:** `nonexistent → open`: actor opens the tool against source media. `open → saved`: actor saves progress (AN-06). `open → discarded`: actor exits without saving.

**Happy path:** Coach opens an athlete's tagged clip in the analysis tool to begin review.

**Alternate paths:** Opening multiple source clips at once for side-by-side comparison (AN-05) from the start.

**Errors/failures:** Attempting to open media the actor cannot see → rejected, consistent with media/vault-sharing visibility rules.

**Recovery:** A discarded (unsaved) project leaves no residual artifact.

**Offline behavior:** Fully offline-capable provided the source media is already cached locally.

**Synchronization implications:** No new synchronization requirement beyond the source media's own caching; the analysis project itself only requires sync once saved (AN-06).

**Notifications:** Not required.

**Audit requirements:** Not independently audit-critical; visibility enforcement is inherited from the media category.

**Exit condition:** Analysis project is `open` and ready for tool interaction, or the open attempt is cleanly rejected.

**Downstream artifacts:** Feeds AN-02 through AN-07.

**Open questions:** None beyond inherited media-visibility questions.

---

## AN-02 — Slow Motion / Frame-by-Frame

**Purpose:** Provide variable-speed and single-frame-stepped playback of the source media within an open analysis project.

**Actors:** Actor with an open analysis project (AN-01).

**Capability / trigger:** Available to the actor with an open analysis project (AN-01), as a non-durable playback control.

**Preconditions:** Analysis project is `open`.

**Authorization assumptions:** No additional authorization beyond AN-01 — this is a playback-control capability, not a visibility or data-ownership transition.

**Owned resources:** None beyond ephemeral playback state (not persisted as its own record unless captured into a clip, AN-04).

**States:** `normal_speed ↔ slow_motion ↔ frame_step` (freely toggled, no durable state machine).

**State transitions:** User-driven toggles; non-durable.

**Happy path:** Coach scrubs to a takeoff frame, steps frame-by-frame to review foot strike.

**Alternate paths:** N/A — purely a viewing control.

**Errors/failures:** Playback failure due to unsupported codec/corrupted source — honest error, not silent freeze.

**Recovery:** N/A (ephemeral state).

**Offline behavior:** Fully offline-capable against locally cached media.

**Synchronization implications:** None (ephemeral, local-only state).

**Notifications:** None.

**Audit requirements:** None.

**Exit condition:** N/A — a viewing mode, not a completed workflow.

**Downstream artifacts:** Feeds AN-03 (markers/drawings are typically placed against a specific paused frame) and AN-04 (clips).

**Open questions:** None.

---

## AN-03 — Markers, Drawings, Apple Pencil Interaction, Notes

**Purpose:** Let the analyzing actor annotate specific frames/moments with markers, freehand drawings (including Apple Pencil input), and text notes.

**Actors:** Actor with an open analysis project.

**Capability / trigger:** Available to the actor with an open analysis project, to annotate frames/moments they own within that project.

**Preconditions:** Analysis project is `open`; for Apple Pencil interaction, a supported device/input is present.

**Authorization assumptions:** Annotations are owned by the analyzing actor and are private to their analysis project by default — the same tagging-is-not-sharing discipline applies: creating an annotation does not share it with the athlete or Team until an explicit VS-02 share occurs.

**Owned resources:** Annotation records (marker position/frame reference, drawing vector data, note text) attached to the analysis project.

**States:** `none → annotated` (per annotation item); items are individually addable/removable.

**State transitions:** Actor adds/edits/removes annotation items freely while the project remains `open` or after reopening a `saved` project.

**Happy path:** Coach pauses on a frame, draws a joint-angle line, adds a marker, and types a note ("hips dropping here").

**Alternate paths:** Apple Pencil pressure/tilt-based drawing on supported iPad hardware — a richer input modality for the same drawing-annotation capability, not a separate workflow.

**Errors/failures:** Unsupported input hardware for Pencil-specific features → falls back to touch-based drawing rather than failing outright.

**Recovery:** Individual annotations are freely editable/removable before AN-06 save.

**Offline behavior:** Fully offline-capable; annotation data is local until saved/synced.

**Synchronization implications:** Annotation data syncs with the saved analysis project (AN-06); no independent sync path.

**Notifications:** None at creation time; notification only occurs if/when the finding is explicitly shared (AN-07/VS-02).

**Audit requirements:** Not independently audit-critical while private; becomes relevant only upon sharing (VS-02).

**Exit condition:** Annotation set reflects the actor's current analysis, pending save.

**Downstream artifacts:** Feeds AN-06 (save), AN-07 (coaching finding/feedback), and VS-02 (explicit share) if the actor chooses to share a specific annotated frame/drawing.

**Open questions:** None beyond general device-capability fallback behavior, which is an implementation detail.

---

## AN-04 — Notes / Clips

**Purpose:** Extract a bounded clip (time range) from the source media, optionally with attached notes, as a standalone reviewable unit.

**Actors:** Actor with an open analysis project.

**Capability / trigger:** Available to the actor with an open analysis project, to extract a bounded clip from the source media.

**Preconditions:** Analysis project is `open`.

**Authorization assumptions:** A clip is derived media and inherits the same default-private posture as the source (media category invariant) — extracting a clip is not itself a sharing or publication act.

**Owned resources:** Clip record (time range reference into source media, or an extracted standalone file, plus optional notes) owned by the analyzing actor.

**States:** `nonexistent → extracted → saved`.

**State transitions:** `nonexistent → extracted`: actor defines in/out points. `extracted → saved`: actor confirms as part of AN-06.

**Happy path:** Coach marks a 5-second clip of a specific rep and attaches a note, saving it as part of the analysis project.

**Alternate paths:** Multiple clips extracted from one longer source recording.

**Errors/failures:** Invalid time range (out point before in point) → rejected at input.

**Recovery:** Clips can be re-trimmed or removed before save.

**Offline behavior:** Fully offline-capable against locally cached source media.

**Synchronization implications:** Syncs as part of the analysis project (AN-06); a clip that is later explicitly shared (VS-02) or published (MD-06-equivalent for derived clips) then inherits that category's synchronization requirements.

**Notifications:** None at extraction time.

**Audit requirements:** Not independently audit-critical while private.

**Exit condition:** Clip exists within the analysis project pending save, accurately bounded and optionally annotated.

**Downstream artifacts:** Feeds AN-06, AN-07, and VS-02 if shared.

**Open questions:** None.

---

## AN-05 — Side-by-Side Comparison

**Purpose:** Compare two (or more) media sources — e.g., two attempts by the same athlete, or an athlete against a reference — within one analysis project.

**Actors:** Actor with visibility into all source media being compared.

**Capability / trigger:** Available to the actor with an open analysis project who has independent visibility into every source being compared.

**Preconditions:** Actor has independent visibility into every source media artifact used in the comparison — comparison never aggregates visibility across sources the actor could not otherwise see individually.

**Authorization assumptions:** Each source retains its own visibility rule; opening a comparison does not create a new, broader-visibility artifact by merely referencing multiple sources together (the comparison view itself is still private to the analyzing actor's project unless later shared/saved and explicitly shared per VS-02).

**Owned resources:** Comparison-layout record referencing two or more source media artifacts.

**States:** `single_source → comparison_configured`.

**State transitions:** Actor adds a second (or further) source to an existing analysis project.

**Happy path:** Coach compares an athlete's current start against a prior meet's start, side by side, annotating differences.

**Alternate paths:** Comparing two different athletes' technique (still requires the actor to have independent visibility into both).

**Errors/failures:** Attempting to add a comparison source the actor cannot see → rejected per the authorization assumption above.

**Recovery:** A comparison source can be removed/swapped freely before save.

**Offline behavior:** Fully offline-capable if all sources are locally cached.

**Synchronization implications:** Same as AN-01/AN-06 — no new requirement beyond the constituent sources' own caching and the project's own save/sync.

**Notifications:** None.

**Audit requirements:** Not independently audit-critical.

**Exit condition:** Comparison layout reflects the actor's configured sources, each independently visible to them.

**Downstream artifacts:** Feeds AN-06, AN-07.

**Open questions:** None.

---

## AN-06 — Save Analysis

**Purpose:** Persist the analysis project (annotations, clips, comparison layout, notes) as a durable, reopenable artifact.

**Actors:** Actor who opened/edited the analysis project.

**Capability / trigger:** Available to the actor who opened/edited the analysis project, to persist it.

**Preconditions:** Analysis project is `open` with at least one meaningful edit (or the actor chooses to explicitly save an empty/initial state — allowed, not blocked).

**Authorization assumptions:** The saved analysis project is private to the analyzing actor by default, consistent with the same tagging/sharing discipline applied elsewhere — saving is not sharing.

**Owned resources:** Persisted analysis-project record (all annotations/clips/comparisons bundled).

**States:** `open → saved`.

**State transitions:** `open → saved`: actor confirms save; the project remains reopenable and further editable (`saved → open` on reopen), not a one-way terminal state.

**Happy path:** Actor finishes annotating and saves the project for later reference or for building a coaching finding (AN-07).

**Alternate paths:** Auto-save of in-progress work to prevent data loss (implementation detail; the workflow-level requirement is that meaningful edits are not lost to an app crash/interruption).

**Errors/failures:** Save interrupted by connectivity loss — must succeed locally first (offline-first) and sync opportunistically; save must never require connectivity to complete for the owning actor's own device.

**Recovery:** A failed sync (post local save) is retried without data loss.

**Offline behavior:** Fully offline-capable; local save is authoritative for the owning actor immediately, with server sync as an eventual-consistency step for cross-device access.

**Synchronization implications:** Cross-device access to the same saved project (e.g., coach reviews on iPad, continues on iPhone) requires sync; until synced, the project is only available on the device it was saved on.

**Notifications:** None (still private).

**Audit requirements:** Not independently audit-critical while private.

**Exit condition:** Analysis project persists durably and is reopenable, at minimum on the originating device, with eventual cross-device availability once synced.

**Downstream artifacts:** Feeds AN-07 (coaching finding/feedback) and, if a specific frame/drawing/clip is explicitly shared, VS-02.

**Open questions:** None.

---

## AN-07 — Coaching Finding / Feedback

**Purpose:** Convert private analysis work into an explicit, athlete-facing coaching finding or feedback item — this is the deliberate "sharing" boundary for analysis output, mirroring the media category's tagging-vs-sharing discipline.

**Actors:** Coach (primary author of feedback intended for an athlete); Athlete (recipient).

**Capability / trigger:** Available to a Coach with a saved analysis project, to deliver a finding to an athlete within the coach's current management scope.

**Preconditions:** Analysis project is `saved`; the target athlete is **within the coach's current management scope** (an Event Coach may deliver structured feedback only to athletes in their assigned Event Groups/Subgroups; a Head Coach may deliver to any Team athlete). This is narrower than, and independent of, the Team-wide private-messaging reach in MG-04.

**Authorization assumptions (normative v2):**
- Sharing a finding is a distinct, explicit act from having created the underlying annotations/clips (AN-03/AN-04) — this is the workflow-level enforcement of "tagging does not mean publication," applied to coaching analysis output.
- This is functionally a specialized instance of VS-02 (explicit share) scoped to coaching feedback delivery; it obeys the same explicit-share and revocation rules as VS-02/VS-03.
- **Team-wide communication authority (MG-04) does not widen feedback or analysis authority.** An Event Coach cannot deliver structured feedback to, or build analysis findings for, an athlete outside their management scope, even though they could send that athlete an ordinary private message.

**Owned resources:** Feedback record (references the analysis project/specific clip-or-drawing, target athlete, coach's written commentary).

**States:** `private_analysis → shared_feedback`.

**State transitions:** `private_analysis → shared_feedback`: coach confirms sharing specific content with a named athlete.

**Happy path:** Coach finishes annotating a start-technique issue → shares the specific clip and drawing with the athlete as feedback with written commentary → athlete gains Vault/feedback-inbox visibility into that specific shared item only (not the coach's entire analysis project).

**Alternate paths:** Feedback shared with a group (e.g., all sprinters) rather than one athlete — still an explicit, bounded share, not a Team-wide publication.

**Errors/failures:** Sharing with, or building a structured finding for, an athlete outside the coach's **current management scope** → rejected (even if the coach could message that athlete under MG-04). Attempting to share the entire private analysis project (rather than the specific selected content) → not supported by design; only explicitly selected clips/drawings/notes are shared, preserving the rest of the coach's private analysis.

**Recovery:** A shared finding can be revoked (VS-03 semantics) if shared in error.

**Offline behavior:** Sharing requires connectivity to notify/grant access to the recipient athlete; the coach may compose the feedback offline but the share does not take effect for the athlete until synced.

**Synchronization implications:** Same as VS-02 — access grant is not authoritative until server-confirmed.

**Notifications:** Athlete notified of new coaching feedback.

**Audit requirements:** Sharing coaching feedback with a specific athlete is an authorization-sensitive, audited event (it grants new Vault-equivalent visibility).

**Exit condition:** Athlete has visibility into exactly the shared content, with the coach's broader private analysis project remaining private.

**Downstream artifacts:** Feeds VS-01/VS-02 (Vault visibility for the shared item) and PF-03 (performance context, if the athlete's history references coaching feedback).

**Open questions:** None. Feedback delivery is bounded by current management scope (normative v2); Team-wide messaging reach does not extend it.
