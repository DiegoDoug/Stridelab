---
name: reliability-disaster-recovery
description: Model StrideLab failures, define SLOs, RPO/RTO, backups, restores, graceful degradation, recovery procedures, and resilience tests. Not monitoring implementation alone.
---

# Reliability & Disaster Recovery

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Keep critical user work and sensitive data recoverable through client, network, provider, database, object-storage, queue, worker, and operator failures.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- dashboards and alerts without recovery design
- business-continuity promises without tested evidence
- silent acceptance of provider defaults

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Critical journeys, data classes, dependencies, failure modes, and impact tolerance
- Architecture, sync, storage, backup, provider, and operational constraints
- Business-approved SLO, RPO, RTO, retention, and recovery ownership inputs

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Observed architecture/provider behavior and restore/resilience tests
2. Accepted product, data, privacy, security, and operational requirements
3. Current official provider backup, durability, and recovery documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Map critical journeys to dependencies and enumerate component, correlated, regional, credential, human, and data-corruption failures.
2. Define service indicators and proposed SLOs plus business-approved RPO/RTO by data class and journey.
3. Design prevention, redundancy, backpressure, retry, circuit breaking, graceful degradation, and manual recovery.
4. Inventory backups for database, object storage, configuration, secrets references, queues, and critical external state; verify what provider backups exclude.
5. Write restore order, authorization, verification, communication, fallback, and abort criteria.
6. Execute bounded restore and fault tests in isolated/non-production environments; measure actual recovery and data loss.
7. Record gaps, owners, accepted residual risk, test cadence, and observability/release handoffs.

## Decision rules and StrideLab invariants

- A backup claim is incomplete until an authorized restore is tested and verified.
- Database backup does not imply object-storage media backup.
- Client/offline data and in-flight operations are included in failure modeling.
- RPO/RTO are approved business constraints backed by measured recovery evidence.
- Graceful degradation preserves authorization, privacy, and user truthfulness.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/operations/reliability-disaster-recovery.md` with:

- Critical journeys/dependency map
- Failure model
- SLI/SLO and RPO/RTO
- Resilience/degradation design
- Backup inventory
- Restore/runbook
- Exercise evidence and residual risk

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Restore and fault exercises measure actual RPO/RTO, validate media plus database state, preserve isolation, and verify user-visible recovery.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `infrastructure-devops`, `offline-local-first-engineering`, `database-engineering`.

Complementary skills, loaded only when relevant and actually available: `production-operations`, `vercel:observability`, `vercel:investigation-mode`.

Consumed artifacts:

- critical journeys
- architecture/dependency map
- data classifications
- provider backup behavior

Produced artifacts:

- failure model
- SLO/RPO/RTO proposal
- backup/restore design
- resilience exercise evidence

Upstream Departments:

- 01 Product & Experience
- 03 Platform & Data Engineering
- 04 Security, Identity & Compliance
- 06 Business Operations & Governance

Downstream Departments:

- 05 Quality, Infrastructure & Release

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- Business owners have not approved RPO/RTO or loss tolerance
- A restore/fault test could affect production or incur material cost
- Provider backup limitations leave unrecoverable sensitive data

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- backup checkbox
- database restored without media consistency
- SLO chosen from industry habit
- retry storm
- degraded mode bypasses auth

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
