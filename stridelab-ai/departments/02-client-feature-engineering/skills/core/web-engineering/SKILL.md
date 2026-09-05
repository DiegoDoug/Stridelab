---
name: web-engineering
description: Implement or validate StrideLab's React/TypeScript web client for planning, administration, and reporting, including dense responsive surfaces, forms, state, accessibility, and browser behavior. Not for server-domain ownership.
---

# Web Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Deliver a usable, accessible web surface optimized for coach planning, administration, reporting, and support tasks while preserving domain and authorization contracts.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- backend services or database policy as the primary task
- visual redesign without accepted design inputs
- mobile-native camera or Pencil behavior

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Approved web requirements, IA, interaction, and visual specifications
- Actual framework, component, routing, state, and test stack
- API, authorization, accessibility, and browser-support contracts

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed repository and browser behavior
2. Current official framework, browser, TypeScript, and W3C documentation
3. Accepted product, design, API, and security artifacts

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inspect routes, rendering boundaries, data flow, component system, forms, tests, and supported browsers.
2. Model server, URL, client, form, and transient UI state explicitly; choose the narrowest owner for each.
3. Implement an end-to-end slice with typed contracts, permission-aware rendering, and realistic loading, empty, error, stale, and retry states.
4. Adapt information density for wide, narrow, keyboard, pointer, and touch contexts without hiding required relationships.
5. Use semantic HTML and accessible component behavior before custom interaction.
6. Verify navigation, refresh/deep-link behavior, forms, authorization denial, responsiveness, and browser console/network evidence.
7. Record implementation, test evidence, unresolved API/design constraints, and release implications.

## Decision rules and StrideLab invariants

- Client hiding is never the authorization boundary.
- URL-addressable planning/reporting state survives refresh when the product expects shareable or restorable context.
- Dense tables and calendars retain keyboard, screen-reader, and narrow-screen alternatives.
- Mutations expose pending, failure, retry, and reconciliation state.
- Framework-specific advice is verified against installed versions and official documentation.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/engineering/web-implementation.md` with:

- Scope and contracts
- Framework and repository evidence
- Routing and state model
- Implementation changes
- Responsive and accessibility behavior
- Browser verification
- Risks and handoffs

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Typecheck, component/integration tests, and browser verification cover deep links, forms, denial, failure, and responsive layouts.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `information-architecture`, `interaction-design`, `visual-ui-design`, `accessibility-design`.

Complementary skills, loaded only when relevant and actually available: `client-engineering`, `vercel:react-best-practices`, `vercel:nextjs`, `vercel:shadcn`, `vercel:agent-browser-verify`.

Consumed artifacts:

- web requirements
- design specifications
- API contracts
- authorization matrix

Produced artifacts:

- web client changes
- browser test evidence
- web implementation record

Upstream Departments:

- 01 Product & Experience
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- The API contract cannot represent an approved workflow
- A browser or accessibility requirement conflicts with accepted design
- Production data or external credentials are required for validation

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- authorization by hidden button
- client state duplicated across URL/cache/form stores
- desktop table squeezed onto mobile
- mock success presented as integration evidence

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
