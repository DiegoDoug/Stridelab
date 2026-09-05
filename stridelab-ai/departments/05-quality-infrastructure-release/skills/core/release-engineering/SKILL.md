---
name: release-engineering
description: Engineer StrideLab versioning, feature flags, TestFlight, release preparation, gates, staged rollout, production verification, rollback, and release records. Consumes App Store compliance; never autonomously approves production release.
---

# Release Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Turn an immutable candidate into a traceable, gated, reversible rollout whose exact code, configuration, migrations, metadata, and evidence are known.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- defining App Store policy
- declaring quality without evidence
- deploying or releasing to production without required authorization

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Immutable release candidate and version/change set
- Quality, security, privacy, App Store, reliability, and migration gate evidence
- Distribution accounts, signing, feature-flag, rollout, verification, and rollback plan

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed build, CI, signing, distribution, deployment, and runtime evidence
2. Accepted gate requirements and App Store compliance matrix
3. Current official Apple and provider release documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Identify the exact commit, dependency lock, native build, server/worker artifacts, database migrations, configuration, flags, and App Store metadata in the candidate.
2. Verify required checks and collect unresolved conditions from quality, security, privacy, compliance, performance, and reliability owners.
3. Define versioning, compatibility window, migration order, flag defaults, TestFlight cohort, staged rollout, abort thresholds, and rollback/roll-forward paths.
4. Build and sign reproducibly using approved secret/signing systems; preserve provenance and release notes.
5. Exercise non-production/TestFlight install, upgrade, migration, login, offline, media, notification, entitlement, and rollback paths.
6. Request the required human release decision; execute only authorized distribution/deployment scope.
7. Verify production with bounded checks, monitor thresholds, record outcome, and stop/rollback/escalate when gates fail.

## Decision rules and StrideLab invariants

- The released artifacts correspond to the exact reviewed commit and configuration.
- Database/client/server compatibility exists for staged and partially upgraded populations.
- Feature flags are not authorization or safety controls.
- Rollback accounts for migrations and user-created data, not only binary redeployment.
- AI does not grant final release approval.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/releases/release-record.md` with:

- Candidate identity and provenance
- Gate evidence/conditions
- Version/migration/compatibility plan
- TestFlight/staged rollout
- Verification and abort thresholds
- Rollback/roll-forward
- Human decision and release outcome

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Install/upgrade/rollback and production-verification evidence is bound to the exact candidate; every gate and condition has an owner.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `quality-engineering`, `infrastructure-devops`, `observability-incident-response`, `app-store-platform-compliance`.

Complementary skills, loaded only when relevant and actually available: `platform-release`, `vercel:deployments-cicd`, `vercel:vercel-flags`, `vercel:vercel-cli`.

Consumed artifacts:

- immutable release candidate
- gate evidence
- App Store matrix
- migration and rollback plan

Produced artifacts:

- release plan and record
- TestFlight/staged rollout
- production verification evidence
- rollback outcome

Upstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release

Downstream Departments:

- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Any mandatory gate fails or is stale
- Production, signing, App Store, or secret authority is absent
- Rollback cannot safely preserve migrations or user data

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- latest branch released
- green CI equals approval
- flag used to bypass authorization
- rollback plan ignores schema
- unbounded production smoke test

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
