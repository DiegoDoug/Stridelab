# Bounded contexts → repository directories

Maps each product bounded context to the `domains/*` directory that already exists in the repo. No application code paths are invented. Each `domains/*` directory already carries the standard scaffold subdirectory skeleton (`application/ contracts/ domain/ infrastructure/ mobile/ tests/ web/`, each a `.gitkeep`); this map adds ownership metadata only, not code.

| Bounded context | Directory | Owning Dept | Workflow IDs | Notes |
|---|---|---|---|---|
| identity | `domains/identity/` | D01 (policy: D04) | IT-01…IT-09 | account lifecycle, Team creation/closure, membership |
| teams | `domains/teams/` | D01 (policy: D04) | TA-01…TA-07, IT-09 | roles, Event Groups/Subgroups, assignment, Team settings |
| profile | `domains/identity/` | D01 (policy: D04) | PR-01…PR-03 | modeled inside the identity context; PR-03 visibility resolution is a published contract |
| training | `domains/training/` | D01 | TP-01…TP-08 | coach-authored planning hierarchy + templates + duplication + assignment + modification |
| sessions | `domains/sessions/` | D01 | SE-01…SE-10 | execution, reconciliation (SE-09), post-finalization correction (SE-10) |
| workouts | `domains/workouts/` | D01 | PW-01…PW-03 | athlete-owned personal workouts; structurally isolated; gated by TA-07 |
| media | `domains/media/` + `services/media-worker/` | D01 (policy: D04) | MD-01…MD-07 | capture/import, draft, attach, tag, publish, lifecycle |
| analysis | `domains/analysis/` | D01 | AN-01…AN-07 | annotation/clip/comparison tooling on top of media; never changes visibility |
| vault | `domains/vault/` | D01 (policy: D04) | VS-01…VS-04 | authoritative Vault-visibility enforcement; explicit server-authoritative grants |
| messaging | `domains/messaging/` | D01 (policy: D04) | MG-01…MG-07 | channels, private chat, attachments, report/block/moderation, notification preferences |
| performance | `domains/performance/` | D01 | PF-01…PF-04 | read/derived history + metrics + PB/PR; current-scope-only for coaches |
| reporting | `domains/reporting/` | D01 (policy: D04) | PF-05…PF-06 | report compilation + export (data-leaving-the-system) |
| billing | `domains/billing/` | **D06** (policy: D04) | BE-01…BE-06 | tiers, subscription, entitlement derivation (BE-05 single source) |
| governance | `domains/governance/` | **D04** | PS-01…PS-09 | age enforcement, moderation/escalation, media-privacy framing, deletion/export, under-age, DSR, illegal content |

## Platform capabilities referenced by contracts (already present as directories)

| Capability | Directory | Used by |
|---|---|---|
| auth | `platform/auth/` | identity, every Team-scoped context |
| database | `platform/database/` | all contexts |
| entitlements | `platform/entitlements/` | billing (BE-05), every feature-gated context |
| notifications | `platform/notifications/` | contract 10 (durable safety-notification state) |
| realtime | `platform/realtime/` | messaging |
| storage | `platform/storage/` | media, vault |
| sync | `platform/sync/` | sessions (SE-09/SE-10), media cache invalidation (`OQ-MEDIA-CACHE-INVALIDATION`) |
| observability | `platform/observability/` | audit trails across all safety-sensitive workflows |
