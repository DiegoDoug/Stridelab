# Cross-skill boundary review

The approved 38-skill list is preserved. The following refinements prevent overlapping ownership:

| Producer | Owns | Explicitly hands off |
|---|---|---|
| `domain-modeling` | Product semantics, identity, relationships, invariants, lifecycle meaning | Tables/indexes to `database-engineering`; module boundaries to external `software-architecture` |
| `workflow-architecture` | End-to-end actors, states, transitions, failures, recovery | Micro-interactions to `interaction-design`; enforcement to `authorization-tenancy` and engineering |
| `information-architecture` | Hierarchy, destinations, discovery, labels | Ranking/indexing to `search-retrieval-engineering`; presentation to `visual-ui-design` |
| `interaction-design` | Task flow, controls, feedback, state behavior | Visual language to `visual-ui-design`; code to client skills |
| `visual-ui-design` | Visual system, composition, tokens, rendered design | Semantics/flows upstream; production code to client skills; audit to `accessibility-design` and quality |
| `ios-ipados-engineering` | Apple client shell, lifecycle, native interop | Media pipeline to `media-engineering`; analysis semantics to `video-analysis-engineering` |
| `media-engineering` | Capture/import/files/cache/upload/media lifecycle | Analysis data to `video-analysis-engineering`; audience to `authorization-tenancy` |
| `training-planning-engineering` | Coach hierarchy, templates, assignments, schedule editing | Execution/performed records to `workout-performance-engineering` |
| `backend-api-engineering` | Application services, contracts, transactions, jobs | Physical persistence to `database-engineering`; policy semantics to Department 04 |
| `database-engineering` | Schema/constraints/indexes/migrations/query correctness | Authorization meaning to `authorization-tenancy` |
| `offline-local-first-engineering` | Local durability, outbox, sync, conflict machinery | Business conflict winners to domain owners |
| `realtime-messaging-notifications` | Persistence/delivery/read/push mechanics | Moderation and safeguarding to `youth-safeguarding-trust-safety` |
| `authorization-tenancy` | Security access decisions and enforcement requirements | Identity proof/lifecycle to `identity-account-lifecycle`; commercial model to `billing-entitlements` |
| `billing-entitlements` | Commercial state, plans, quotas, entitlements | Security access to `authorization-tenancy`; plan value/pricing to product/cost owners |
| `privacy-data-governance` | Data lifecycle, minimization, purpose, retention, DSAR | Legal interpretation to `legal-regulatory-compliance` |
| `app-store-platform-compliance` | Current Apple rule-to-evidence mapping | Release execution to `release-engineering` |
| `quality-engineering` | Test method, traceability, evidence assessment | Domain invariants and implementation fixes to specialist owners |
| `reliability-disaster-recovery` | Failure model, SLO/RPO/RTO inputs, backup/restore | Signals and response to `observability-incident-response` |
| `release-engineering` | Candidate provenance, gates, rollout, rollback | Apple rules upstream; final release approval to an authorized human |
| `documentation-knowledge-management` | Canonical records and synchronization | Domain decisions remain with the owning skill/Department |
| `ai-engineering-governance` | AI permissions, evidence, routing, approval, audit policy | No application feature ownership and no autonomous legal/security/release approval |

## Package-wide semantic invariants

- Team → Event Group → Subgroup → Athlete is the organization hierarchy; roles are Team-scoped.
- One role per Team membership; different roles across Teams are allowed.
- Event Coach management scope differs from Team-wide communication scope.
- Coaches cannot modify athlete-owned personal profiles.
- Personal workouts depend on the Team Creator setting; athletes never plan training cycles.
- Recording, tagging, explicit sharing, Vault visibility, and Team publication remain distinct.
- Prescription and performed workout records remain distinct.
- Offline local durability, queued sync, server acknowledgement, and processing completion remain distinct.
- Age 13+ does not eliminate youth-safeguarding, privacy, school, or jurisdiction-specific legal review.
