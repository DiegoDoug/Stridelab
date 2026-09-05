---
name: media-engineering
description: Engineer StrideLab camera capture, video import, high-FPS playback assets, thumbnails, local files, caching, metadata, resumable upload, and media lifecycle. Not for analysis annotations or authorization policy ownership.
---

# Media Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Create a loss-aware, observable client media pipeline that remains usable offline and makes capture, local durability, upload, processing, availability, and deletion states explicit.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- frame-analysis semantics, drawings, or comparison UX
- deciding who may access media
- provider storage policy without platform/data ownership

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Supported capture/import workflows and device matrix
- Media quality, metadata, storage, privacy, and offline requirements
- Current client stack and backend/worker contracts

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed device, file-system, codec, and repository behavior
2. Current Apple AVFoundation/Photos, Expo, React Native, and selected upload/storage documentation
3. Accepted media, privacy, authorization, and lifecycle contracts

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Map media states from requested capture/import through local durable file, metadata extraction, thumbnailing, queued upload, remote durability, processing, availability, and deletion.
2. Inspect device APIs, codecs, frame rates, orientations, color metadata, file lifetimes, quotas, and background constraints.
3. Choose stable asset identity and metadata provenance before moving or transcoding bytes.
4. Implement capture/import and local caching with atomic handoff, cancellation, interruption, retry, and low-storage behavior.
5. Implement resumable, idempotent transfer and checksum or equivalent integrity validation according to the backend contract.
6. Preserve originals and derivatives according to approved retention; never infer access from filenames or bucket paths.
7. Test representative devices and media, including high FPS, rotation, large files, interruption, duplicate import, failed upload, and deletion.

## Decision rules and StrideLab invariants

- A captured file is not acknowledged as safe until it has a durable local location or an explicit failure state.
- Original, proxy, thumbnail, clip, and exported derivative have distinct identity and provenance.
- Local cleanup never removes the only durable copy.
- Upload completion and server processing completion are different states.
- Tagging metadata does not broaden media visibility.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/media-pipeline.md` with:

- Requirements and device matrix
- Media state machine
- File identity and metadata
- Capture/import/cache pipeline
- Upload and worker contracts
- Retention/deletion behavior
- Device and failure evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Golden media fixtures and physical-device tests verify metadata, frame rate, orientation, integrity, interruption, retry, and cleanup invariants.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `ios-ipados-engineering`, `interaction-design`.

Complementary skills, loaded only when relevant and actually available: `client-engineering`, `backend-data-engineering`.

Consumed artifacts:

- capture/import workflow
- media lifecycle requirements
- storage and worker contracts
- privacy and authorization requirements

Produced artifacts:

- client media pipeline
- media state model
- transfer contract
- device validation evidence

Upstream Departments:

- 01 Product & Experience
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A codec, frame-rate, storage, or background behavior cannot be verified on target hardware
- Retention or deletion requirements conflict
- Provider limits or pricing materially change the product contract

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- temporary URI treated as durable asset
- upload success treated as processing success
- silent recompression
- deleting local media before remote verification
- access encoded only in object path

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
