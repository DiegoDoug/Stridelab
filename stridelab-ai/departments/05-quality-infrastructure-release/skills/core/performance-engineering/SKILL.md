---
name: performance-engineering
description: Measure and improve StrideLab startup, rendering, responsiveness, memory, battery, media, API, database, transfer, and load behavior against explicit budgets. Not speculative micro-optimization.
---

# Performance Engineering

Portable target: OpenAI-compatible and Claude Code-compatible Agent Skills.

Reuse posture: **CREATE**. This is the StrideLab-specific capability contract. When a broader complementary skill is available, use it for general methodology or tooling while this skill remains authoritative for the StrideLab boundary and invariants below.

## Purpose and boundary

Protect user-visible speed, sustained analysis quality, battery/memory safety, transfer reliability, and backend capacity with reproducible measurements.

Use this skill when the request matches the frontmatter description and needs decisions, implementation, review, or evidence inside this owned domain.

Do not use it as the primary skill for:

- optimization without a measured bottleneck or budget
- capacity cost modeling alone
- functional correctness replacement

Preserve accepted upstream decisions. Challenge them with evidence and route a decision-change request to the owner instead of silently revising them.

## Inputs and authoritative evidence

Required inputs:

- Critical journeys, target devices/networks, expected data/media scale, and performance budgets
- Representative builds, datasets, media, environments, and telemetry
- Architecture and recent change context

Useful optional inputs:

- Existing implementation and tests
- Prior decisions, ADRs, research, analytics, and production evidence

Use evidence in this order:

1. Reproducible traces, profiles, benchmarks, query plans, and load tests
2. Accepted user-experience budgets and workload assumptions
3. Current platform and profiling-tool documentation

For any claim that may have changed—platform APIs, SDK behavior, provider limits/pricing, law, regulation, standards, or store policy—verify current official or primary sources at execution time and record the source plus access date. Do not make embedded package knowledge authoritative for volatile facts.

If required context is missing, inspect available artifacts and implementation first. Proceed with labeled assumptions only when the choice is reversible and low risk. Otherwise stop the affected branch and request the smallest missing decision, evidence, permission, device, environment, or credential capability; never request secret values in project artifacts.

## Operating procedure

1. Define user-visible metric, percentile, workload, device/network/environment, warm/cold state, duration, and acceptance budget.
2. Establish a repeatable baseline and separate measurement noise from regression.
3. Trace across client render/JS/native, media decode/draw, file I/O, network, API, database, queue, worker, and storage as applicable.
4. Identify the dominant constraint using evidence; form one testable hypothesis at a time.
5. Implement the smallest change that improves the constrained metric without violating quality, battery, memory, privacy, or correctness.
6. Re-measure baseline and changed build, inspect secondary regressions, and test sustained rather than only burst behavior.
7. Record budgets, method, raw evidence path, interpretation, change, residual limits, and monitoring requirements.

## Decision rules and StrideLab invariants

- A performance claim includes environment, workload, metric, percentile, baseline, and variance.
- Frame scrubbing and drawing are evaluated under sustained real-device load.
- Memory and battery regressions cannot be traded invisibly for latency.
- Database and API optimization preserve authorization and result correctness.
- Media quality changes are explicit product decisions, not hidden performance fixes.

## Output contract

Deliver the smallest task-appropriate combination of owned decision record, specification, research/design artifact, implementation change where this skill owns implementation, tests, and verification evidence. For lifecycle-scale work, create or update the canonical artifact at `docs/quality/performance-engineering.md` with:

- Journey and budget
- Method/environment/workload
- Baseline evidence
- Bottleneck analysis
- Change and tradeoffs
- Re-measurement/regressions
- Production monitoring thresholds

Every material output must identify accepted inputs, consequential assumptions, owned decisions, unresolved questions, changed paths when implementation occurred, verification performed, evidence locations, and downstream consumers. Do not include secrets, unnecessary personal data, or unverifiable completion claims.

## Validate and review

- Every material conclusion traces to an accepted input, observed repository evidence, or an explicitly cited current source.
- The result distinguishes facts, assumptions, proposals, and unresolved decisions.
- Owned decisions stay inside this skill's boundary and dependencies are handed to the named owner.
- Tests or review evidence exercise the highest-risk invariant, including a denied, failed, empty, or offline path when relevant.
- Repeated measurements on representative hardware/data demonstrate the target percentile and no unacceptable memory, battery, quality, or correctness regression.

Report one production assessment:

- **PASS** — the requested contract and evidence are complete with no material unresolved issue.
- **PASS WITH CONDITIONS** — usable, but named external/environmental limits remain and their effect is explicit.
- **FAIL** — a critical invariant, evidence requirement, or safety boundary is unmet.

Do not label generated files PASS merely because they exist or compile.

## Handoffs and dependencies

Core StrideLab dependencies: `quality-engineering`, `media-engineering`, `video-analysis-engineering`, `offline-local-first-engineering`.

Complementary skills, loaded only when relevant and actually available: `production-operations`, `vercel:observability`.

Consumed artifacts:

- performance budgets
- critical journeys
- representative workload
- implementation/runtime evidence

Produced artifacts:

- benchmark/profile evidence
- performance fixes
- budget verification
- monitoring thresholds

Upstream Departments:

- 01 Product & Experience
- 02 Client & Feature Engineering
- 03 Platform & Data Engineering

Downstream Departments:

- 05 Quality, Infrastructure & Release
- 06 Business Operations & Governance

An optional dependency may improve execution but must not be fabricated. If it is unavailable, continue with the capability encoded here unless its absence prevents required evidence; then report the limitation precisely.

## Escalation conditions

- No representative device, data, network, or environment exists
- Meeting the budget requires product-quality or architecture tradeoffs
- Load testing could affect a shared or production system without authority

AI may research, propose, design, implement, test, review, and document within granted scope. AI must not finalize legal interpretations, approve security exceptions, weaken authorization, change production secrets, perform irreversible production actions without approval, release to production without gates, or promote hypotheses into approved decisions.

## Failure modes and anti-patterns

Reject or correct:

- single stopwatch result
- average hides tail latency
- simulator proves device performance
- optimization before profiling
- media degradation undisclosed

When blocked, preserve safe completed work, identify the exact affected branch, state why available evidence is insufficient, and hand off to the decision or capability owner. Do not simulate unavailable production, participant, provider, hardware, legal, or security evidence.
