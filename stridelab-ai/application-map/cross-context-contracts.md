# Public cross-context contract seams

The Workflow Architecture v2 implies the **fourteen** public contract seams below between bounded contexts. They are **seams, not shapes** — the schema/transport is produced by Departments 02/03 at implementation-design time. No bounded-context boundary is changed; all are extraction-friendly, consistent with `ARCHITECTURE.md`.

This register was evaluated by an independent `architecture-reviewer` for G2 (see `WORKFLOW-ARCHITECTURE-v2.md` §8c and `docs/product/workflow-architecture.md` — the **authoritative matrix is this file**). The v2 correction pass completed the register against its own 8-field schema (contracts 4, 6, 7, 8, 9, 10) and added the four seams the G2 review found missing (contracts 11–14).

For each seam: **owner** (produces the contract) · **consumers** (downstream) · **authorization checkpoint** · **failure behaviour** · **idempotency/replay expectation** · **audit requirement** · **minimization constraint** · **deferred implementation choice**.

---

## 1. Media tag → explicit Vault grant

- **Owner:** media context. **Consumers:** vault context; recipient athlete's Vault view.
- **Checkpoint:** grantor authority + tag existence, evaluated server-side (VS-01).
- **Failure:** grant not effective until server-confirmed; a queued offline grant loses to a concurrent revoke.
- **Idempotency/replay:** keyed by (grantor, recipient, artifact); re-submitting an identical grant is a no-op.
- **Audit:** mandatory (youth-media visibility control point).
- **Minimization:** a grant conveys exactly one artifact; never the grantor's other drafts/tags/library.
- **Deferred:** cache-invalidation guarantee (`OQ-MEDIA-CACHE-INVALIDATION`, D03).

## 2. Media / Vault revocation

- **Owner:** vault context (+ governance / Platform Safety Administrator for moderation revocation — see contract 11). **Consumers:** media, analysis, messaging read paths.
- **Checkpoint:** revoker = original grantor, or moderation authority.
- **Failure:** server-authoritative; best-effort cache purge; a device that already cached the media offline may retain a local copy — the extent tolerated is `OQ-MEDIA-CACHE-INVALIDATION`.
- **Idempotency/replay:** revoking an already-revoked grant is a no-op.
- **Audit:** mandatory.
- **Minimization:** revocation affects one (recipient, item) pair; a moderation revocation is scoped to the specific case artifacts.
- **Deferred:** hard local-cache-removal guarantee (`OQ-MEDIA-CACHE-INVALIDATION`).

## 3. Analysis → Vault sharing (AN-07)

- **Owner:** analysis context. **Consumers:** vault context; recipient athlete's Vault / feedback inbox.
- **Checkpoint:** sharer owns the finding AND recipient is within the sharer's **current** management scope.
- **Failure:** share not effective until confirmed.
- **Idempotency/replay:** keyed by (finding, recipient); re-share of the same selection is a no-op.
- **Audit:** mandatory (grants new Vault-equivalent visibility).
- **Minimization:** only explicitly selected clips/drawings/notes — never the whole analysis project.
- **Deferred:** view-only vs recipient-analysis rights (`OQ-VS02-RIGHTS`, safe default view-only).

## 4. Messaging → media / Vault access (MG-05)

- **Owner:** media + vault contexts. **Consumers:** messaging context; the recipient(s) of the hosting message.
- **Rule:** messaging calls the media/vault contracts to effect and revoke grants; it never persists parallel visibility state.
- **Checkpoint:** the **stricter** of VS-02 (private thread) / MD-06 (Team/group channel), including MD-06's per-depicted-minor consent gate.
- **Failure:** pending until server-confirmed; broadened visibility never shown as effective on any device until then; if the queued attachment collides with an interim revoke/hold it resolves in favour of the revoke/hold.
- **Idempotency/replay:** the created grant inherits its transition's key — VS-02 `(finding|item, recipient)` or MD-06 `(artifact, audience)`; re-sending an identical attachment must not mint a second grant/publication record.
- **Audit:** inherits VS-02 / MD-06 (mandatory).
- **Minimization:** visibility to exactly the attached item, never the hosting channel's other content or the sharer's library.
- **Deferred:** multi-subject consent mechanism (`OQ-VS02-MULTISUBJECT`, `OQ-MD06-AUTHORITY`).

## 5. Performance/reporting read models → sessions / training / workouts / teams

- **Owner:** each source context (sessions, training, workouts, teams). **Consumers:** performance, reporting.
- **Checkpoint:** the **source** context supplies the viewer's per-athlete individual-visibility set; the consumer **must not** aggregate beyond that set and **must not** re-derive scope. This is an obligation on the source contexts, not a reporting-side filter.
- **Personal-workout constraint:** the sessions/training/**workouts** → performance seam carries `OQ-PW-COACH-VISIBILITY` — personal workouts are **never** visible to any coach; only the owning athlete's own performance views include them.
- **Failure:** honest "insufficient data" / stale-freshness marker, never a fabricated or re-identifying metric.
- **Idempotency/replay:** recompute is idempotent over the same underlying records.
- **Audit:** inherits from source records; no independent read audit.
- **Minimization:** suppress any aggregate whose cohort is small enough to be re-identifying; aggregate only over athletes the viewer can already see individually (`OQ-PF-AGG-METHOD`, D03).
- **Deferred:** aggregation method (`OQ-PF-AGG-METHOD`).

## 6. Entitlement source of truth (BE-05)

- **Owner:** billing/entitlements context. **Consumers:** every feature-gated context.
- **Checkpoint:** consumers read **feature-availability flags** only, never raw billing/subscription state. No identity / teams / vault / profile authorization path may take a BE-05 input.
- **Failure:** recompute fails toward the more restrictive state; periodic / on-connect revalidation of cached entitlements; stale cache never grants paid-tier access indefinitely.
- **Idempotency/replay:** recompute is idempotent for a given commercial state.
- **Audit:** commercial record-keeping (Department 06).
- **Minimization:** consumers receive only the flags relevant to their features; never subscription identity, price, or provider data.
- **Deferred:** (a) `OQ-BE-TIER-MAP` — the feature→tier mapping; **(b) a separate D06-approved entitlement artifact (§8b condition A) is a hard precondition to any BE-05 implementation** (provider, prices, taxes, refunds, IAP mechanics, plan limits, trial, over-limit, grace); (c) the flag-interface *shape* (contract 6 note C-5): a feature-availability flag must be structurally distinguishable from, and never consumable as, an authorization predicate — flags typed/namespaced separately from role/scope checks, with a documented, testable rule that no authorization path consumes a BE-05 flag.
- **Ratified** by `architecture-reviewer` as the single entitlement-derivation point (endorsed by the independent D06 review, §8b).

## 7. Identity / Team lifecycle handoffs

- **Owner:** identity + teams contexts. **Consumers:** every Team-scoped context.
- **Contracts:** active-Team-context resolution (IT-05); membership/role/assignment state (IT-04, TA-01, TA-04, TA-05); IT-06 / IT-09 termination semantics; DD-DEPARTED-CONTENT disposition.
- **Checkpoint:** consumers evaluate against **current authoritative** state, never a per-context copy; a stale cache must never grant broader access.
- **Failure:** on IT-06/IT-09, queued offline writes racing a termination resolve in favour of the termination; membership-derived access ends immediately at `closure_pending`.
- **Idempotency/replay:** re-evaluation against the same authoritative membership/role state is idempotent; a termination applied twice is a no-op.
- **Audit:** authorization-sensitive membership/role/closure events (mandatory).
- **Minimization:** consumers receive only role / scope / active-Team-context / closure-state — **never** profile PII or date-of-birth (DOB is contract 8's channel only).
- **Deferred:** retention durations (`OQ-DD-RETENTION`, D04/legal); grace window (`OQ-IT08-GRACE`).

## 8. Profile visibility resolution (PR-03)

- **Owner:** profile context (inside identity). **Consumers:** every member-rendering surface (messaging, performance, rosters).
- **Checkpoint:** server-side per-field withholding, keyed on the viewer's relationship (peer / in-scope coach / Head Coach).
- **Failure:** a field the viewer is not permitted to see is withheld **server-side**, never returned-then-hidden client-side; a cached profile view is provisional and every coach-scope-gated field is re-validated against current scope before display; DOB/age is **never** in a client cache.
- **Idempotency/replay:** N/A (stateless read resolution).
- **Audit:** ordinary reads not audited; an attempted over-fetch / boundary violation is audited, consistent with PR-02's "attempted boundary violation" audit.
- **Minimization:** peers get display name + role only; in-scope coaches get the scope-gated fields the catalogue defines; DOB/age evidence never leaves the identity/safety subsystem — other contexts get only a derived `is_minor` flag.
- **Deferred:** field catalogue + per-field classification (`OQ-PR-FIELDS`); age-band richness (`OQ-PR-AGE-BAND`, safe default: boolean only).

## 9. Offline / session reconciliation (SE-09 / SE-10)

- **Owner:** sessions context. **Consumers:** performance, reporting (PF-05/PF-06), governance (PS-08 — a data-subject correction request for session data is fulfilled via SE-10).
- **Checkpoint:** reconciliation/amendment operates only on already-authorized data; a coach can never overwrite an athlete-owned record.
- **Failure:** a conflict that cannot be presented to its owning actor (e.g. that athlete has left the Team) is **held and flagged unresolved to the coach**, never auto-resolved; the athlete's last authoritative self-logged state stands unaltered.
- **Idempotency/replay:** superseded values retained; late-arriving offline amendments layered by timestamp, never last-write-wins; a re-applied identical amendment is a no-op.
- **Audit:** every conflict, resolution, and SE-10 amendment (original + new + timestamp + actor + reason) — mandatory.
- **Minimization:** only diverging records are exchanged/resurfaced; a reconciliation payload carries the conflicting fields, not the whole session.
- **Deferred:** reconciliation UX (`OQ-SE-RECONCILE-UX`); device-to-device propagation (`OQ-SE-OFFLINE-P2P`, D03).

## 10. Durable safety-notification state

- **Owner:** a platform notification capability (`platform/notifications/`). **Consumers:** the enumerated safety-emitting workflows (MG-06, PS-03, PS-07, PS-09, MD-05, VS-01, MD-06).
- **Checkpoint:** **only** the enumerated safety-emitting workflows may create safety-class notification state; the safety class cannot be self-asserted by any other workflow; each notification is scoped to the specific entitled recipient.
- **Contract:** transactionally-created authoritative in-app state; durable retry; idempotent processing; explicit delivery + acknowledgement state; audited terminal failure; human escalation for unresolved safety-critical failure.
- **Failure:** push/email/device delivery is a fallible secondary; the in-app authoritative state is the source of truth; a terminal failure is recorded and escalated to a human.
- **Idempotency/replay:** processing is idempotent by (workflow, event, recipient); a redelivered event does not double-notify or double-audit.
- **Audit:** terminal failures and escalations are audited; the notification itself carries the audit reference of its triggering safety event.
- **Minimization:** payload carries only what the recipient needs to act; no incident detail beyond that; push/email carry a pointer, not content.
- **Deferred:** delivery/transport choice, retry/backoff policy, acknowledgement mechanism, and human-escalation SLA are D03 items; escalation staffing is `OQ-PS-MOD-STAFFING`.

---

## 11. Governance safety-enforcement & preservation-hold seam

*(Added for the G2 review — the highest-authority cross-context seam in a youth-safety product.)*

- **Owner:** governance context / Platform Safety Administrator (Department 04). **Consumers:** media, vault, messaging, sessions, identity (account restriction / closure), billing (teardown).
- **Contracts:** authoritative access-restriction of a case artifact; forced VS-03 revocation on a moderation basis; legal/preservation holds that **block** MD-07 media deletion and IT-09 hard-deletion past `deletion_eligible`; PS-07 `restricted_pending_review` account restriction; PS-09 preservation + inaccessibility.
- **Checkpoint:** only the Platform Safety Administrator may place, maintain, or release a hold, or force a moderation revocation / account restriction; a Team-level actor cannot.
- **Failure:** holds fail **safe** — if the hold state cannot be confirmed, deletion/closure is blocked, not allowed; a stale device must not retain access to held content.
- **Idempotency/replay:** re-applying an existing hold is a no-op; releasing an already-released hold is a no-op.
- **Audit:** mandatory and comprehensive — placement, maintenance, release, and every blocked deletion attempt; retained per legal guidance regardless of ordinary retention policy.
- **Minimization:** a hold is scoped to the specific artifacts / account / thread under the case, never Team-wide by default.
- **Deferred:** `OQ-PS09-HOLD` (duration, storage, access controls), `OQ-MD07-RETENTION`, `OQ-PS07-RETENTION`.

## 12. Data-subject erasure & portability orchestration seam (PS-05 / PS-08)

- **Owner:** governance context (PS-08 intake; Department 04 policy). **Consumers:** identity, profile, sessions (via SE-10), workouts, media, messaging, performance, reporting.
- **Contracts:** fan-out of an access/export request to each context that holds the subject's data; fan-out of an erasure request with each context reporting fulfilled / `partially_fulfilled` (with reason) / refused; correction routed to PR-02 (profile) or the owning workflow (e.g. SE-10 for session data).
- **Checkpoint:** the request is honoured only after requester identity + standing verification (`OQ-PS08-STANDING`); fulfilment never exceeds the data subject's own authorization scope.
- **Failure:** data under a preservation/legal hold (contract 11) or that another member structurally depends on is returned as `partially_fulfilled` **with a recorded reason** — never a silent skip (`OQ-PS08-HOLD-INTERACTION`).
- **Idempotency/replay:** a re-submitted request for the same subject/type is de-duplicated against the open case; a completed erasure is not re-run.
- **Audit:** mandatory — who requested what, standing basis, per-context outcome and reason, timing.
- **Minimization:** an export returns the subject's data only; media depicting other athletes follows the MD-*/VS-* boundaries.
- **Deferred:** per-context erasure-vs-anonymisation responsibility (`OQ-DD-RETENTION`, `OQ-PS07-RETENTION`); guardian standing (`OQ-PS08-STANDING`); jurisdiction matrix (`OQ-PS08-JURISDICTION`).

## 13. Reporting → export egress seam (PF-06)

- **Owner:** reporting context. **Consumers:** external recipients (files leaving the system); governance (audit).
- **Checkpoint:** export never expands the exporting actor's in-app authorization scope; an athlete may always export their own data; a coach may export only within current management scope.
- **Failure:** a request that exceeds scope is rejected **before** generation, not filtered after; a partially-synced export is marked with its freshness/completeness.
- **Idempotency/replay:** re-exporting produces a fresh artifact + a fresh audit event; there is no "unexport".
- **Audit:** mandatory — who exported what, when, at what scope; this is the point in-app visibility becomes data outside the system's access controls.
- **Minimization:** the export contains only data within the actor's authorized scope for the requested period.
- **Deferred:** `OQ-PF-MINOR-EXPORT` — whether a coach-initiated external export of a minor's identifiable performance data needs additional consent/notice and any jurisdiction-specific restriction.

## 14. Training → sessions prescription & modification seam (TP-04 / TP-07 / TP-08)

- **Owner:** training context. **Consumers:** sessions context; performance (PF-02 training history).
- **Contracts:** delivery of a published, assigned Session (TP-04/TP-07) to the athlete's device for offline execution; propagation of a TP-08/SE-04 mid-stream modification; a durable **executed-prescription-version marker** binding each athlete's performed-work log to the exact prescription version they executed against.
- **Checkpoint:** an athlete receives only prescriptions assigned to them (TP-07); an Event Coach modifies only artifacts within their authorship/management scope.
- **Failure:** a device that never synced an assignment cannot fabricate prescribed content — it fails honestly and prompts reconnection; a modification made close to/into practice while athletes are offline creates a reconciliation window that is **surfaced** (→ contract 9 / SE-09), never silently last-write-wins.
- **Idempotency/replay:** a re-delivered identical prescription version does not create a second execution binding; a modification carries a monotonic version so replays are ordered, not merged.
- **Audit:** TP-08 modification is a mandatory-audit event with actor, timestamp, and diff-level traceability sufficient to explain a later prescribed-vs-performed discrepancy.
- **Minimization:** an athlete's device receives only their assigned prescriptions, not the whole plan hierarchy.
- **Deferred:** `OQ-SE-RECONCILE-UX` (the reconciliation interface); `OQ-SE-OFFLINE-P2P` (offline propagation mechanism).

---

## Downstream consumer summary

| Producing context | Consumed by |
|---|---|
| media | vault, analysis, messaging, reporting |
| vault | media read paths, analysis, messaging, performance |
| analysis | vault |
| identity / teams | every Team-scoped context |
| profile | messaging, performance, rosters |
| billing (entitlements) | every feature-gated context |
| training | sessions, performance |
| sessions | performance, reporting, governance (SE-10 → PS-08) |
| reporting | external export recipients, governance (audit) |
| governance / Platform Safety Administrator | media, vault, messaging, sessions, identity, billing |
| notification capability | every safety-emitting workflow |
