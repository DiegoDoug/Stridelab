---
name: authorization-tenancy
description: Define, implement, or validate StrideLab Team isolation, Team roles, Event Group scope, ownership, object ACLs, explicit shares, entitlements, and RLS requirements. Not for login mechanics or commercial plan design.
---

# Authorization & Tenancy

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Make every protected action and object decision explicit under authenticated user × active Team × Team role × Event Group scope × ownership × explicit share × entitlement.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- authentication provider setup alone
- pricing or plan-limit design
- generic UI visibility rules without server enforcement

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Canonical roles, Team hierarchy, resources, actions, ownership, and sharing semantics
- Identity/session and multi-Team context
- Data/API/storage surfaces and subscription-entitlement inputs

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted product/domain/workflow and security decisions
2. Observed API, database, storage, realtime, and client enforcement
3. Current platform authorization and database documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inventory actors, active-Team selection, roles, Event Group/Subgroup assignments, resource types, operations, ownership, audience, and commercial entitlements.
2. Build an allow/deny matrix and object-level decision function using all relevant dimensions; state precedence and default-deny behavior.
3. Separate Team membership, management scope, communication scope, recording/tagging permission, explicit share, and Vault visibility.
4. Specify trusted context derivation, API checks, RLS/grants, storage access, realtime subscription, job, and internal-admin enforcement.
5. Define multi-Team switching, invitation/claim, membership removal, role change, stale token, cache, offline, and revocation behavior.
6. Implement or hand off policy-specific controls without allowing database/client layers to invent semantics.
7. Test every operation with same-Team allowed, same-Team denied, cross-Team, wrong Event Group, owner/non-owner, share/no-share, entitlement/no-entitlement, and removed-member cases.

## Decision rules and StrideLab invariants

- A user has at most one role within a Team but may have different roles across Teams.
- Event Coaches manage only athletes assigned to their Event Groups but may communicate with any athlete on the Team.
- Coaches cannot modify athlete-owned personal profiles.
- Tagging never implies Team-wide publication; Vault visibility follows tag or explicit share semantics defined by the resource.
- Client UI, object paths, cached claims, and subscription tier never replace server-side authorization.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/security/authorization-tenancy.md` with:

- Actors, tenants, resources, and actions
- Decision function and precedence
- Allow/deny matrix
- Ownership/share/Vault semantics
- Enforcement map
- Revocation/offline behavior
- Allow/deny verification evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Policy tests prove cross-Team isolation and every operation's positive and negative cases at API, RLS/storage, realtime, and job boundaries.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `domain-modeling`, `workflow-architecture`.

Complementary skills, loaded only when relevant and actually available: `security-identity`, `backend-data-engineering`.

Consumed artifacts:

- domain/workflow rules
- identity context
- resource ownership/share semantics
- entitlement inputs

Produced artifacts:

- authorization decision model
- allow/deny matrix
- RLS/enforcement requirements
- isolation evidence

Upstream Departments:

- 01 Product & Experience
- 06 Business Operations & Governance

Downstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Accepted rules conflict or leave an audience ambiguous
- A requested exception weakens tenant isolation
- Commercial entitlement and security access cannot be safely separated

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- role-only authorization
- active Team supplied as trusted client field
- RLS inferred from UI
- tagging treated as sharing
- service-role path exposed to clients

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
