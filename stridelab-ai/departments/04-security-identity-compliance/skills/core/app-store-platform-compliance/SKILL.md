---
name: app-store-platform-compliance
description: Translate current Apple App Review, privacy manifest/label, permissions, account deletion, UGC, subscription/IAP, age-rating, and release rules into StrideLab requirements and evidence. Not final release approval.
---

# App Store & Platform Compliance

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Prevent avoidable App Store rejection and platform-policy drift by maintaining a current, evidence-backed compliance matrix tied to implemented behavior.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- general release mechanics
- legal advice beyond platform policy
- assuming old App Review rules remain current

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Current app behavior, binary dependencies, data collection, permissions, UGC, accounts, and monetization
- Target Apple platforms and distribution method
- Current App Store Connect metadata and release candidate evidence

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Current Apple App Review Guidelines and Apple Developer/App Store Connect documentation
2. Observed release binary, privacy manifests, SDK inventory, permission prompts, and product behavior
3. Accepted privacy, youth-safety, identity, billing, and legal requirements

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Record the review date and current official Apple sources; compare them with the target OS/SDK and App Store Connect state.
2. Inventory permissions, required-reason APIs, SDK manifests, collected/linked/tracking data, nutrition-label answers, and purpose strings.
3. Map account creation to in-app deletion, export/support paths, authentication methods, and reviewer access.
4. Map UGC/media/messaging behavior to filtering, reporting, blocking, contact, age-rating, and safety requirements.
5. Analyze subscriptions, digital features, Team billing, web purchase, trial, restore, manage, and entitlement flows against current IAP rules.
6. Build a rule-to-evidence matrix and identify screenshots, demo account/data, notes, legal links, and reviewer instructions.
7. Validate the release candidate and metadata; route implementation, legal, privacy, billing, or safety gaps to owners and do not approve release.

## Decision rules and StrideLab invariants

- Current official Apple documentation outranks embedded package knowledge.
- Privacy labels and manifests describe actual app and third-party SDK behavior.
- Permission prompts are purpose-specific, timely, and have functional denial paths.
- Apps with account creation expose compliant in-app deletion behavior as required by current rules.
- Platform compliance evidence informs but does not replace release gates or legal review.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/compliance/app-store-platform-compliance.md` with:

- Review scope/date/source register
- Permissions/privacy manifest/label
- Accounts and deletion
- UGC/youth/age rating
- Subscriptions and IAP
- Rule-to-evidence matrix
- Open blockers and owner handoffs

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Each applicable current Apple rule maps to observed binary/metadata behavior and concrete review evidence; non-applicable rules include rationale.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `ios-ipados-engineering`, `privacy-data-governance`, `youth-safeguarding-trust-safety`, `identity-account-lifecycle`.

Complementary skills, loaded only when relevant and actually available: `platform-release`, `security-identity`.

Consumed artifacts:

- release candidate behavior
- privacy/identity/safety/billing requirements
- SDK and permission inventory

Produced artifacts:

- App Store compliance matrix
- privacy metadata requirements
- review evidence plan
- release blockers

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 06 Business Operations & Governance

Downstream Departments:

- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Current Apple policy is ambiguous or conflicts with planned monetization
- The release binary or App Store Connect state is unavailable
- A gap requires legal, privacy, safety, or security exception authority

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- static checklist with no review date
- privacy label copied from intent
- purpose string without denial path
- UGC requirement deferred until rejection
- skill approves release

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
