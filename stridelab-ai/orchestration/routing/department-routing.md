# Department Routing

| Request / artifact | Primary Department |
|---|---|
| product definition, scope, priorities, tiers | 01 Product & Experience |
| domain semantics, invariants, workflows | 01 Product & Experience |
| information architecture, navigation, UX flows, design | 01 Product & Experience |
| iPhone/iPad/web implementation | 02 Client & Feature Engineering |
| media capture/playback/analysis client implementation | 02 Client & Feature Engineering |
| planner/workout/performance client implementation | 02 Client & Feature Engineering |
| API/application services/database/sync | 03 Platform & Data Engineering |
| realtime/chat delivery/search/report pipelines | 03 Platform & Data Engineering |
| identity/authentication/authorization/RLS policy | 04 Security, Identity & Compliance |
| security/privacy/youth safety/legal/App Store compliance | 04 Security, Identity & Compliance |
| testing/performance/infrastructure/reliability/observability | 05 Quality, Infrastructure & Release |
| production readiness/release/rollback | 05 Quality, Infrastructure & Release |
| billing/entitlements/cost/internal support | 06 Business Operations & Governance |
| project knowledge / AI governance | 06 Business Operations & Governance |

## Tie-breaker

When a task could belong to multiple Departments, choose the Department that owns the **decision contract**. Other Departments become collaborators.

Example:
`Add role-based visibility to athlete videos` is not primarily a UI task. D04 owns the access policy; D02/D03 implement against it.
