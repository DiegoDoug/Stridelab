---
name: infrastructure-devops
description: Engineer StrideLab local/dev/staging/prod environments, CI/CD, secrets plumbing, workers, deployment topology, monorepo infrastructure, and environment parity. Not release approval or application-domain design.
---

# Infrastructure & DevOps

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Provide reproducible, least-privilege environments and delivery paths for apps, domains, platform components, and independently deployable media workers.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- deciding product behavior
- handling production secrets outside approved secret systems
- declaring release quality

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Monorepo architecture and deployable composition roots
- Environment, provider, network, secret, worker, data, and compliance requirements
- Current CI/CD, infrastructure code, accounts, and authorization

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed repository, provider, build, and deployment state within authorization
2. Accepted architecture, security, reliability, and release requirements
3. Current official provider and tool documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Inventory apps, services, packages, data stores, queues, object storage, external providers, regions, and environment boundaries.
2. Define local/dev/staging/prod parity and intentional differences, including seeded data and privacy restrictions.
3. Model build artifacts, provenance, CI checks, deployment units, worker scaling, migrations, networking, and runtime configuration.
4. Implement infrastructure as code and secret references with least privilege, separation of duties, reversible changes, and preview/diff behavior.
5. Design CI/CD ordering for build, test, security, migration, deploy, verification, and rollback without bypassing release gates.
6. Validate fresh setup, repeatability, environment isolation, secret non-exposure, worker deployment, and failure recovery in non-production first.
7. Record topology, commands/config changes, evidence, required human/provider actions, costs, and operational handoffs.

## Decision rules and StrideLab invariants

- apps/ are composition roots, domains/ business capabilities, platform/ technical infrastructure, services/ independent workloads, and packages/ reusable libraries.
- Secrets are referenced, never committed, printed, or copied into artifacts.
- Production mutation requires explicit authorization and passes release gates.
- Media workers can deploy and scale independently without dissolving domain contracts.
- Environment differences are documented and tested rather than accidental.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/platform/infrastructure-devops.md` with:

- Deployable inventory and topology
- Environment model/parity
- Build and artifact provenance
- CI/CD and migration ordering
- Secrets/networking/least privilege
- Infrastructure changes
- Setup/deploy/recovery evidence

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Fresh-environment and non-production deployment exercises prove reproducibility, isolation, secret handling, migration ordering, worker health, and rollback readiness.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `backend-api-engineering`, `database-engineering`, `security-engineering`.

Complementary skills, loaded only when relevant and actually available: `platform-release`, `production-operations`, `vercel:deployments-cicd`, `vercel:env-vars`, `vercel:turborepo`, `vercel:vercel-services`.

Consumed artifacts:

- application architecture
- environment and security requirements
- deployable code
- provider constraints

Produced artifacts:

- infrastructure/configuration changes
- CI/CD pipeline
- environment topology
- deployment evidence

Upstream Departments:

- 02 Client & Feature Engineering
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance

Downstream Departments:

- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Provider account, credential, billing authority, or production mutation is required
- Architecture does not define a safe deployable boundary
- Infrastructure change is irreversible or exceeds agreed cost/risk

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- click-only infrastructure
- shared production/dev data
- secret echoed in CI
- deploy before migration compatibility
- monorepo means single deployment

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
