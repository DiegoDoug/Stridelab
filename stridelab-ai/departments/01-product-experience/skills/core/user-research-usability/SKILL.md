---
name: user-research-usability
description: Plan and synthesize StrideLab user research, interviews, observation, hypothesis tests, and usability studies with evidence grading and finding severity. Not for inventing unsupported user preferences.
---

# User Research & Usability

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Reduce product and interaction uncertainty through ethical, decision-linked evidence from coaches and athletes, with heightened care for participants under 18.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- market claims without research
- visual styling decisions unsupported by study goals
- contacting or recruiting participants without authorization

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Research question and decision it will inform
- Target participant profile
- Constraints on recruitment, consent, privacy, and timing

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Direct study evidence and research artifacts
2. Accepted product hypotheses and analytics
3. Current institutional, privacy, and youth-research requirements where applicable

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Convert the product uncertainty into research questions, falsifiable hypotheses, and decisions that evidence could change.
2. Choose the least burdensome valid method and define participant segments without treating convenience samples as representative.
3. Create protocol, tasks, consent/assent plan, data-minimization rules, stopping rules, and moderator safeguards.
4. Collect observations separately from interpretation; never fabricate participants, quotes, completion rates, or study outcomes.
5. Synthesize patterns, counterexamples, confidence, transfer limits, and segment differences.
6. Rate findings by user impact, frequency/evidence, recoverability, and safety—not stakeholder preference.
7. Recommend decisions and follow-up evidence, preserving disagreement and unresolved uncertainty.

## Decision rules and StrideLab invariants

- Research involving minors requires an approved consent/assent and safeguarding path before recruitment.
- Synthetic personas and AI-generated responses are hypotheses, never participant evidence.
- Quotes remain verbatim, attributable under the consent model, and stripped of unnecessary personal data.
- A usability issue distinguishes observed breakdown, inferred cause, and proposed remedy.
- No external outreach, recording, or data upload occurs without explicit authority.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/research/user-research-usability.md` with:

- Decision and research questions
- Method and participant plan
- Protocol and safeguards
- Evidence register
- Findings and severity
- Recommendations
- Limitations and next research

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Every finding links to evidence and states confidence, affected segment, severity rationale, and decision impact.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `product-strategy`.

Complementary skills, loaded only when relevant and actually available: `evidence-based-ui-ux`, `deep-research-work:deep-research`.

Consumed artifacts:

- product hypotheses
- workflow prototypes
- participant and ethics constraints

Produced artifacts:

- research plan
- evidence register
- usability findings
- decision recommendations

Upstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance

Downstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- The study would involve minors without an approved safeguard process
- Consent, recording, incentive, or data handling authority is unclear
- A requested conclusion is not supported by the available evidence

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- fabricated interviews
- leading tasks
- small sample presented as population truth
- severity based on stakeholder loudness
- raw sensitive recordings embedded in reports

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
