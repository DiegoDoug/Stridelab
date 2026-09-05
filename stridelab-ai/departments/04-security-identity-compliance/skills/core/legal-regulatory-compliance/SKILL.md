---
name: legal-regulatory-compliance
description: Research and translate applicable StrideLab privacy, youth, school, COPPA-boundary, FERPA, state-law, consent, likeness, and contract questions into traceable requirements. Never substitutes for licensed counsel.
---

# Legal & Regulatory Compliance

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Provide jurisdiction-specific, source-cited legal research and an implementation-ready issue map while keeping legal advice and final risk acceptance with qualified humans.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- presenting legal advice or guaranteed compliance
- research without jurisdiction and product facts
- silently treating school use as FERPA applicability

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Jurisdictions, launch locations, entity/customer model, and user ages
- Data, media, communication, school/club, billing, vendor, and contract facts
- Specific legal questions and decision deadlines

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Current statutory/regulatory text and official regulator or agency guidance
2. Binding contracts and accepted product facts
3. Qualified legal counsel for final interpretation and risk acceptance

For legal questions, record jurisdiction, effective date, official citation or URL, access date, product facts, interpretation, uncertainty, and counsel-required decisions. Do not present legal research as legal advice.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Frame the question with jurisdiction, actor, data/content, transaction, institutional role, age, and product behavior.
2. Separate threshold applicability, duties, exceptions, preemption, enforcement, contractual allocation, and unresolved facts.
3. Research current primary law and official guidance first; record effective date, jurisdiction, source URL/citation, and access date.
4. Distinguish source text, reasoned interpretation, implementation implication, uncertainty, and questions reserved for counsel.
5. Analyze COPPA's under-13 boundary without assuming an age-13+ statement alone resolves actual-knowledge or child-directed-service questions.
6. Analyze FERPA/school use only after identifying whether an educational agency/institution and education records are involved.
7. Translate supported conclusions into requirement candidates, evidence needs, owners, deadlines, and counsel decision requests; never mark final legal approval.

## Decision rules and StrideLab invariants

- Every conclusion states jurisdiction, effective date or currency check, authority, product facts, and confidence.
- Legal research and legal advice are labeled distinctly.
- Speculative interpretation is never presented as settled law.
- Media/likeness, communications, privacy, school, consumer, and contract questions remain separate unless authority connects them.
- Qualified counsel approves material legal interpretations and risk acceptance.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/compliance/legal-regulatory-research.md` with:

- Question, facts, and jurisdictions
- Authority and source table
- Applicability analysis
- Duties/exceptions/uncertainty
- Requirement candidates
- Counsel questions and decisions
- Update triggers and evidence log

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Primary citations directly support each material proposition and all unresolved factual or interpretive gaps are visible.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `product-strategy`, `privacy-data-governance`, `youth-safeguarding-trust-safety`.

Complementary skills, loaded only when relevant and actually available: `deep-research-work:deep-research`.

Consumed artifacts:

- product/data/workflow facts
- jurisdictions and customer model
- contracts and vendor terms
- specific legal questions

Produced artifacts:

- legal research memorandum
- authority table
- requirement candidates
- counsel decision log

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 06 Business Operations & Governance

Downstream Departments:

- 01 Product & Experience
- 04 Security, Identity & Compliance
- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- A material interpretation affects youth safety, consent, deletion, media rights, contracts, or launch eligibility
- Jurisdiction or institutional role is unknown
- Sources conflict or current primary authority cannot be verified

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- legal conclusion without jurisdiction
- blog cited instead of law
- COPPA reduced to age gate
- FERPA assumed from school audience
- AI approval of compliance

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
