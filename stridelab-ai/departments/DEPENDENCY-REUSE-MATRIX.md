# Dependency and reuse matrix

All complementary capabilities are optional. The StrideLab core skill stays executable when an optional skill is absent; it reports any evidence limitation instead of fabricating the capability.

| Department | Core skill | Classification | Core dependencies | Complementary skills observed |
|---|---|---|---|---|
| 01 | `product-strategy` | EXTEND | — | `deep-research-work:deep-research` |
| 01 | `domain-modeling` | CREATE | `product-strategy` | `software-architecture` |
| 01 | `workflow-architecture` | CREATE | `product-strategy`, `domain-modeling` | `evidence-based-ui-ux`, `software-architecture`, `security-identity` |
| 01 | `information-architecture` | CREATE | `domain-modeling`, `workflow-architecture` | `evidence-based-ui-ux` |
| 01 | `user-research-usability` | CREATE | `product-strategy` | `evidence-based-ui-ux`, `deep-research-work:deep-research` |
| 01 | `interaction-design` | CREATE | `workflow-architecture`, `information-architecture` | `evidence-based-ui-ux`, `client-engineering` |
| 01 | `visual-ui-design` | EXTEND | `information-architecture`, `interaction-design` | `evidence-based-ui-ux` |
| 01 | `accessibility-design` | CREATE | `interaction-design`, `visual-ui-design` | `evidence-based-ui-ux` |
| 02 | `ios-ipados-engineering` | CREATE | `interaction-design`, `visual-ui-design`, `accessibility-design` | `client-engineering`, `software-architecture` |
| 02 | `web-engineering` | CREATE | `information-architecture`, `interaction-design`, `visual-ui-design`, `accessibility-design` | `client-engineering`, `vercel:react-best-practices`, `vercel:nextjs`, `vercel:shadcn`, `vercel:agent-browser-verify` |
| 02 | `media-engineering` | CREATE | `ios-ipados-engineering`, `interaction-design` | `client-engineering`, `backend-data-engineering` |
| 02 | `video-analysis-engineering` | CREATE | `media-engineering`, `interaction-design`, `accessibility-design` | `client-engineering`, `software-architecture` |
| 02 | `training-planning-engineering` | CREATE | `domain-modeling`, `workflow-architecture`, `interaction-design`, `ios-ipados-engineering`, `web-engineering` | `client-engineering`, `backend-data-engineering`, `software-architecture` |
| 02 | `workout-performance-engineering` | CREATE | `domain-modeling`, `workflow-architecture`, `training-planning-engineering`, `ios-ipados-engineering` | `client-engineering`, `backend-data-engineering` |
| 03 | `backend-api-engineering` | CREATE | `domain-modeling`, `workflow-architecture` | `backend-data-engineering`, `software-architecture`, `vercel:vercel-functions`, `vercel:workflow`, `vercel:vercel-queues` |
| 03 | `database-engineering` | CREATE | `domain-modeling`, `backend-api-engineering` | `backend-data-engineering`, `security-identity`, `vercel:vercel-storage` |
| 03 | `offline-local-first-engineering` | CREATE | `backend-api-engineering`, `database-engineering`, `workflow-architecture` | `backend-data-engineering`, `client-engineering` |
| 03 | `realtime-messaging-notifications` | CREATE | `backend-api-engineering`, `database-engineering`, `offline-local-first-engineering`, `workflow-architecture` | `backend-data-engineering`, `security-identity`, `vercel:vercel-queues`, `vercel:workflow` |
| 03 | `search-retrieval-engineering` | CREATE | `backend-api-engineering`, `database-engineering`, `information-architecture` | `backend-data-engineering`, `security-identity`, `vercel:marketplace` |
| 03 | `reporting-analytics-engineering` | CREATE | `database-engineering`, `backend-api-engineering`, `domain-modeling`, `workout-performance-engineering` | `backend-data-engineering`, `vercel:observability` |
| 04 | `authorization-tenancy` | CREATE | `domain-modeling`, `workflow-architecture` | `security-identity`, `backend-data-engineering` |
| 04 | `identity-account-lifecycle` | CREATE | `authorization-tenancy`, `workflow-architecture` | `security-identity` |
| 04 | `security-engineering` | CREATE | `authorization-tenancy`, `identity-account-lifecycle`, `backend-api-engineering` | `security-identity`, `vercel:vercel-firewall`, `vercel:investigation-mode` |
| 04 | `privacy-data-governance` | CREATE | `domain-modeling`, `authorization-tenancy`, `security-engineering` | `security-identity`, `deep-research-work:deep-research` |
| 04 | `youth-safeguarding-trust-safety` | CREATE | `workflow-architecture`, `authorization-tenancy`, `identity-account-lifecycle`, `privacy-data-governance` | `security-identity`, `deep-research-work:deep-research` |
| 04 | `legal-regulatory-compliance` | CREATE | `product-strategy`, `privacy-data-governance`, `youth-safeguarding-trust-safety` | `deep-research-work:deep-research` |
| 04 | `app-store-platform-compliance` | CREATE | `ios-ipados-engineering`, `privacy-data-governance`, `youth-safeguarding-trust-safety`, `identity-account-lifecycle` | `platform-release`, `security-identity` |
| 05 | `quality-engineering` | EXTEND | `product-strategy`, `workflow-architecture` | `vercel:verification`, `vercel:agent-browser-verify`, `vercel:investigation-mode` |
| 05 | `performance-engineering` | CREATE | `quality-engineering`, `media-engineering`, `video-analysis-engineering`, `offline-local-first-engineering` | `production-operations`, `vercel:observability` |
| 05 | `infrastructure-devops` | CREATE | `backend-api-engineering`, `database-engineering`, `security-engineering` | `platform-release`, `production-operations`, `vercel:deployments-cicd`, `vercel:env-vars`, `vercel:turborepo`, `vercel:vercel-services` |
| 05 | `reliability-disaster-recovery` | CREATE | `infrastructure-devops`, `offline-local-first-engineering`, `database-engineering` | `production-operations`, `vercel:observability`, `vercel:investigation-mode` |
| 05 | `observability-incident-response` | CREATE | `reliability-disaster-recovery`, `security-engineering`, `infrastructure-devops` | `production-operations`, `vercel:observability`, `vercel:investigation-mode`, `vercel:vercel-api` |
| 05 | `release-engineering` | CREATE | `quality-engineering`, `infrastructure-devops`, `observability-incident-response`, `app-store-platform-compliance` | `platform-release`, `vercel:deployments-cicd`, `vercel:vercel-flags`, `vercel:vercel-cli` |
| 06 | `billing-entitlements` | CREATE | `product-strategy`, `authorization-tenancy`, `backend-api-engineering`, `app-store-platform-compliance` | `vercel:payments`, `backend-data-engineering`, `security-identity` |
| 06 | `cost-engineering` | CREATE | `billing-entitlements`, `media-engineering`, `infrastructure-devops` | `vercel:observability`, `vercel:vercel-storage`, `vercel:marketplace` |
| 06 | `internal-admin-support` | CREATE | `authorization-tenancy`, `privacy-data-governance`, `youth-safeguarding-trust-safety`, `billing-entitlements` | `security-identity`, `production-operations`, `vercel:vercel-api` |
| 06 | `documentation-knowledge-management` | CREATE | `product-strategy` | `notion:notion-knowledge-capture`, `notion:notion-research-documentation`, `notion:notion-spec-to-implementation`, `vercel:geistdocs` |
| 06 | `ai-engineering-governance` | CREATE | `documentation-knowledge-management`, `security-engineering`, `quality-engineering`, `release-engineering` | `security-identity`, `platform-release`, `vercel:verification` |

## Existing capability reuse

- The SKILL Maker full-stack-development reference package supplied its artifact, evidence, ownership, validation, and PASS/PASS WITH CONDITIONS/FAIL conventions.
- Its broader `product-strategy`, `visual-ui-design`, and `quality-engineering` capabilities were not copied. The same-named StrideLab skills are narrow Department adapters with project-specific invariants and outputs.
- `client-engineering`, `backend-data-engineering`, `software-architecture`, `security-identity`, `platform-release`, and `production-operations` remain optional general capabilities rather than duplicated core knowledge.
- Installed Work capabilities are referenced with their observed namespaced names, including Vercel, Notion, and explicit-only Deep Research skills.
