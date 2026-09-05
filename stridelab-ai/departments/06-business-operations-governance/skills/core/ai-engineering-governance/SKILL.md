---
name: ai-engineering-governance
description: Define and audit StrideLab AI-development policies, permissions, skill loading, evidence/source rules, artifact contracts, routing, approval gates, verification loops, prohibited actions, and generated-change traceability.
---

# AI Engineering Governance

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Let AI research, propose, design, implement, test, review, and document while preserving human authority, least privilege, domain ownership, and verifiable change history.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- building product AI features
- granting agents unrestricted production authority
- replacing domain owners with one orchestrator

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- AI use cases, tools, skills, agents, repositories, connectors, and target environments
- Decision ownership, risk classes, data sensitivity, and approval policy
- Existing prompts/policies, generated-change evidence, incidents, and exceptions

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Accepted StrideLab governance and decision-ownership policy
2. Observed agent/tool behavior and generated artifacts
3. Current platform capability, permission, and safety documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inventory AI actors, models, skills, tools/connectors, data access, write surfaces, external effects, and human owners.
2. Classify actions by reversibility, environment, data sensitivity, financial/security/legal impact, and required approval.
3. Define routing boundaries so Departments and skills retain decision ownership and no agent silently absorbs unrelated capability.
4. Specify input/source trust, prompt-injection handling, evidence standards, artifact contracts, provenance, and context-minimization rules.
5. Define pre-action authorization, verification loops, stop conditions, human gates, exception expiry, and prohibited autonomous actions.
6. Require generated changes to record model/tool context as appropriate, affected paths, tests, evidence, reviewer, and approval outcome without storing secrets or unnecessary prompts.
7. Run adversarial governance simulations for malicious sources, missing tools, permission denial, production requests, legal claims, security exceptions, and false PASS evidence.

## Decision rules and StrideLab invariants

- AI may research, propose, design, implement, test, review, and document within granted scope.
- AI does not finalize legal interpretation, approve security exceptions, weaken authorization, change production secrets, take irreversible production action, or release without gates.
- A hypothesis never becomes an approved decision because an agent repeated it.
- Tool or connector availability is verified and minimum permission is requested only when required.
- Verification evidence is independent of the claim it supports where risk warrants.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/governance/ai-engineering-governance.md` with:

- AI capability/access inventory
- Risk and action classes
- Routing/ownership model
- Source/evidence/artifact policy
- Approval/verification/stop controls
- Audit and exception model
- Adversarial simulation results

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Adversarial simulations demonstrate denied unsafe actions, correct owner routing, evidence requirements, permission minimization, and recoverable stop behavior.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `documentation-knowledge-management`, `security-engineering`, `quality-engineering`, `release-engineering`.

Complementary skills, loaded only when relevant and actually available: `security-identity`, `platform-release`, `vercel:verification`.

Consumed artifacts:

- decision ownership
- AI/tool inventory
- risk and approval policy
- generated-change evidence

Produced artifacts:

- AI governance policy
- permission/approval matrix
- artifact/evidence contract
- AI audit and simulation record

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

Downstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A requested AI action expands production, legal, security, financial, or personal-data authority
- Platform permissions cannot enforce the intended boundary
- A governance exception would weaken tenant or youth safeguards

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- one omnipotent agent
- prompt says approved
- self-attested verification
- connector installed just in case
- production secret in context
- permanent exception

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
