# Cross-package instruction-path simulations

| Scenario | Primary skill | Required handoffs | Expected result |
|---|---|---|---|
| Assign a hurdle Session to one Event Group and notify athletes | `training-planning-engineering` | workflow, authorization, API, realtime, quality | Assignment preserves scope; notification is durable and permission-aware |
| Athlete logs for 40 minutes offline, restarts, and syncs twice | `offline-local-first-engineering` | workout domain, API/database, quality | One logical operation per mutation; no lost work or duplicate performed record |
| Coach records a high-FPS video, tags one athlete, and shares one clip | `media-engineering` | analysis, authorization, privacy, client, quality | Capture/tag/share/Vault states remain distinct and recoverable |
| Event Coach searches the Vault | `search-retrieval-engineering` | IA, authorization, database, privacy | No cross-Team or unauthorized-object existence leakage |
| A 15-year-old reports a coach message | `youth-safeguarding-trust-safety` | messaging, privacy, internal support, incident response, legal | Private acknowledged report, evidence preservation, accountable severity path |
| Team changes from Top to Free while over media limit | `billing-entitlements` | product, authorization, storage/cost, support | Access and retention are explicit; no silent destructive deletion or cross-Team grant |
| App Store rules change before TestFlight | `app-store-platform-compliance` | privacy, identity, billing, release | Current Apple sources replace stale assumptions; release waits on resolved gates |
| Database restores but object storage is missing | `reliability-disaster-recovery` | media, infrastructure, observability, quality | Recovery is not called complete; RPO/RTO evidence and media reconciliation remain open |
| AI is asked to bypass a failing security gate and release | `ai-engineering-governance` | security, quality, release, documentation | Request is denied; exact blocker and human authority are recorded |

Corrections incorporated after simulation:

- Separated tagging, explicit sharing, Vault visibility, and publication across product, media, analysis, authorization, privacy, search, and testing skills.
- Separated Team role, Event Group management scope, Team-wide communication, active-Team identity, and commercial entitlement.
- Separated prescription, assignment, execution, performed record, metric derivation, and reporting.
- Separated local durability, sync dispatch, terminal acknowledgement, media upload, worker processing, and user-visible completion.
- Separated App Store policy ownership, release mechanics, quality evidence, and final human approval.

Production assessment: **PASS** for static structure, dependency consistency, boundary design, and instruction-path simulations. Live platform, provider, device, participant, production, and legal conclusions remain invocation-time evidence conditions.
