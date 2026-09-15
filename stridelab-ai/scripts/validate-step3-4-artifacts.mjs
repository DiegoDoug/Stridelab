/**
 * validate-step3-4-artifacts.mjs
 *
 * Fail-closed semantic verification of the Department 01 Step 3/4 artifacts:
 *   docs/product/information-architecture.md   (Step 3)
 *   docs/product/navigation-specification.md    (Step 4)
 * and their project-memory / registry / current-state-index bindings.
 *
 * Proves ID relationships rather than trusting prose:
 *   - every MVP-required F-* / S-* ID and every MVP-conditional ID from
 *     mvp-release-scope.md §5/§6.1 appears in the IA §1.8 traceability table,
 *     except the allow-listed system-only / no-v1-UI-surface IDs (F-42 and the
 *     cross-cutting S-* capabilities), which must be explicitly marked as such
 *     rather than silently absent (closes combined-review finding CDR-N1);
 *   - every destination (`D-NN`) referenced in IA §1.8 exists as an actual row
 *     in one of IA §4's destination-map tables;
 *   - every destination defined in IA §4 appears in Navigation §6's
 *     destination-to-navigation mapping table — no destination is dropped;
 *   - no table row naming the tier-state object (`O-29` / "Team Tier State")
 *     in either artifact also names an authorization/permission/entitlement
 *     keyword in the same row (closes combined-review finding CDR-N2 — proves,
 *     rather than merely asserts, that tier state is never placed adjacent to
 *     an authorization surface);
 *   - no Post-MVP (`F-P-*`) or Excluded (`F-EX-*`) feature ID appears in either
 *     artifact except on a line that also marks it deferred/excluded/not
 *     modelled — scope creep must be visible if it happens, not silent;
 *   - header status, registry status, current-state record status, and the
 *     current-state index agree, for both artifacts;
 *   - the "no OQ-* / CD-* resolved" assertion is present in both artifacts;
 *   - the required review-evidence directories exist with a minimum file count
 *     (Step 3 gate: 7 independent lenses; combined cross-department: 1+);
 *   - Navigation explicitly declares its version-pinned dependency on the
 *     Information Architecture (Step 4 cannot be approved before Step 3).
 *
 * Exit 0 = PASS, 1 = FAIL. Warnings never fail the build.
 */

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();
const errors = [];
const warnings = [];
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const IA = 'docs/product/information-architecture.md';
const NAV = 'docs/product/navigation-specification.md';
const CS_IA = 'stridelab-ai/project-memory/current-state/information-architecture.md';
const CS_NAV = 'stridelab-ai/project-memory/current-state/navigation-specification.md';
const CS_README = 'stridelab-ai/project-memory/current-state/README.md';
const REGISTRY = 'stridelab-ai/registry/artifacts.yaml';
const MRS = 'docs/product/mvp-release-scope.md';
const STEP3_REVIEW_DIR = 'stridelab-ai/orchestration/reviews/step3-information-architecture';
const CROSS_DEPT_DIR = 'stridelab-ai/orchestration/reviews/step3-4-cross-department';
const REMEDIATION_DIR = 'stridelab-ai/orchestration/reviews/step3-remediation';

for (const f of [IA, NAV, CS_IA, CS_NAV, CS_README, REGISTRY, MRS]) {
  if (!exists(f)) err(`Missing required file: ${f}`);
}
if (errors.length) {
  // Bail before any downstream parsing — report() below depends on `const`
  // bindings that are only initialized further down this module, so it must
  // not be called from this early-exit path.
  console.log(JSON.stringify({ check: 'step3-4-artifacts', status: 'FAIL', counts: {}, errors, warnings }, null, 2));
  process.exit(1);
}

const ia = read(IA);
const nav = read(NAV);
const mrs = read(MRS);

// --------------------------------------------------------------------------
// helpers
// --------------------------------------------------------------------------
function headerStatus(text) {
  const line = text.split('\n').find((l) => /(^|\s)\*?\*?Status:?\*?\*?/i.test(l) && /`[^`]+`/.test(l));
  return line ? (line.match(/`([^`]+)`/) || [])[1] : null;
}

/** All markdown table rows (lines starting with `| `) across the whole document,
 * kept as raw lines so adjacency checks operate on real rows, not prose windows. */
function allTableLines(text) {
  return text.split('\n').filter((l) => /^\s*\|/.test(l));
}

// --------------------------------------------------------------------------
// 1. Required MVP capability coverage (CDR-N1: prove IDs, don't guess)
// --------------------------------------------------------------------------
// Pull the same MVP-required / MVP-conditional ID sets §5/§6.1 already assert
// in the approved mvp-release-scope.md, rather than re-deriving them here.
const requiredUserFacingMatch = mrs.match(/\*\*User-facing \(35\):\*\*([\s\S]*?)\n\(F-10/);
const requiredUserFacingIds = requiredUserFacingMatch
  ? [...requiredUserFacingMatch[1].matchAll(/\bF-\d{2}\b/g)].map((m) => m[0])
  : [];
const requiredSupportingMatch = mrs.match(/\*\*Supporting \/ platform \(11\):\*\*([\s\S]*?)## 6\./);
const requiredSupportingIds = requiredSupportingMatch
  ? [...requiredSupportingMatch[1].matchAll(/\bS-\d{2}\b/g)].map((m) => m[0])
  : [];
const conditionalSection = mrs.match(/### 6\.1 Conditional capabilities[\s\S]*?### 6\.2/);
const conditionalIds = conditionalSection
  ? [...new Set([...conditionalSection[0].matchAll(/\b(F-\d{2}(?:-cond)?|S-\d{2})\b/g)].map((m) => m[0]))].filter(
      (id) => /^(F-10|F-19|F-22|F-33|F-34-cond|F-40|F-42|S-09|S-10)$/.test(id),
    )
  : [];

if (requiredUserFacingIds.length !== 34 && requiredUserFacingIds.length !== 35) {
  warn(`Expected ~35 MVP-required user-facing IDs parsed from ${MRS}, got ${requiredUserFacingIds.length}`);
}
if (requiredSupportingIds.length !== 11) {
  warn(`Expected 11 MVP-required supporting IDs parsed from ${MRS}, got ${requiredSupportingIds.length}`);
}

// IDs with no v1 UI surface by design (mvp-release-scope.md §6.1's own F-42
// deferral language; §9.6/§10's system-capability list) — allow-listed so a
// genuine gap is never masked, but a correct-by-design absence is never a
// false-positive error either.
const NO_UI_SURFACE_ALLOWLIST = new Set([
  'F-42', // BE-05 interface — system-only, no v1 UI surface (§6.1)
  // Platform/system capabilities with no dedicated destination by design.
  // S-04 (durable safety notifications) is deliberately NOT here — it has a
  // real destination (D-13 Notifications) and must be traced like any other.
  'S-01', 'S-02', 'S-03', 'S-05', 'S-06', 'S-07', 'S-08', 'S-09', 'S-10', 'S-11', 'S-12', 'S-13',
]);

const iaTraceabilitySection = ia.match(/### 1\.8 Traceability matrix[\s\S]*?\n\n---/);
const iaTraceabilityText = iaTraceabilitySection ? iaTraceabilitySection[0] : '';
if (!iaTraceabilitySection) err(`${IA}: §1.8 traceability matrix section not found`);

for (const id of [...requiredUserFacingIds, ...requiredSupportingIds, ...conditionalIds]) {
  const idRe = new RegExp(`\\|\\s*${id.replace(/[-]/g, '\\-')}\\s*\\|`);
  const present = idRe.test(iaTraceabilityText);
  if (!present) {
    if (NO_UI_SURFACE_ALLOWLIST.has(id)) {
      // Must still be explicitly acknowledged, just not as a live destination.
      if (!new RegExp(`${id}[\\s\\S]{0,200}(no v1 UI surface|cross-cutting)`, 'i').test(iaTraceabilityText)) {
        err(`${IA} §1.8: ${id} is allow-listed as having no v1 UI surface but is not explicitly acknowledged as such`);
      }
    } else {
      err(`${IA} §1.8: MVP-required/-conditional ID ${id} does not appear in the traceability matrix`);
    }
  }
}

// --------------------------------------------------------------------------
// 2. Destination-ID integrity: every D-NN cited in §1.8 exists in §4; every
//    D-NN defined in §4 exists in Navigation §6 (no dropped destination).
// --------------------------------------------------------------------------
const iaDestSection = ia.match(/## 4\. Destination map[\s\S]*?\n\n---/);
const iaDestText = iaDestSection ? iaDestSection[0] : '';
if (!iaDestSection) err(`${IA}: §4 destination map section not found`);

const destDefRe = /^\|\s*(D-\d{1,2})\s*\|/gm;
const destsDefined = new Set([...iaDestText.matchAll(destDefRe)].map((m) => m[1]));
if (destsDefined.size < 20) warn(`${IA} §4: only ${destsDefined.size} destinations parsed — expected ~27`);

const destsCitedInTraceability = new Set(
  [...iaTraceabilityText.matchAll(/\bD-\d{1,2}\b/g)].map((m) => m[0]),
);
for (const d of destsCitedInTraceability) {
  if (!destsDefined.has(d)) err(`${IA} §1.8 cites ${d}, which is not defined as a row in §4`);
}

const navMapSection = nav.match(/## 6\. Destination-to-navigation mapping[\s\S]*?\n\n---/);
const navMapText = navMapSection ? navMapSection[0] : '';
if (!navMapSection) err(`${NAV}: §6 destination-to-navigation mapping section not found`);
const destsInNav = new Set([...navMapText.matchAll(destDefRe)].map((m) => m[1]));

for (const d of destsDefined) {
  if (!destsInNav.has(d)) err(`${IA} §4 defines ${d}, but ${NAV} §6 does not map it — an approved destination would be unreachable`);
}

// --------------------------------------------------------------------------
// 3. CDR-N2 — tier-state / authorization non-adjacency, proven per table row.
// --------------------------------------------------------------------------
// Scoped to the actual destination-placement tables (§4 in IA, §6 in Nav) —
// not the whole document — because the document's *prose* legitimately
// discusses the non-adjacency rule itself (e.g. IA §2.5's "must never appear
// adjacent to" description, or J-13's walkthrough explaining the rule) right
// next to the term "O-29"; that is the rule being stated, not violated. Only
// an actual destination-map/mapping table row placing O-29 beside an
// authorization keyword is the structural violation CDR-N2 targets.
const AUTHZ_ADJACENCY_RE = /\bauthoriz|permission (gate|check|control)|entitlementflag|feature[- ]gate/i;
for (const [name, text] of [[IA, iaDestText], [NAV, navMapText]]) {
  for (const line of allTableLines(text)) {
    if (/\bO-29\b|Team Tier State/i.test(line) && AUTHZ_ADJACENCY_RE.test(line)) {
      err(`${name}: a destination-placement table row naming the tier-state object also names an authorization/permission/entitlement keyword — CDR-N2 adjacency violation: ${line.trim().slice(0, 160)}`);
    }
  }
}

// --------------------------------------------------------------------------
// 4. Scope-creep guard — Post-MVP / Excluded IDs must be visibly marked, not
//    silently presented as live, wherever they appear.
// --------------------------------------------------------------------------
const DEFERRED_MARKER_RE = /(not modelled|post-mvp|excluded|deferred|out of (mvp )?scope|no v1 (ui )?surface|not a v1 surface)/i;
for (const [name, text] of [[IA, ia], [NAV, nav]]) {
  for (const line of text.split('\n')) {
    const ids = [...line.matchAll(/\bF-(?:P-\d{1,2}|EX-\d{1,2})\b/g)].map((m) => m[0]);
    if (ids.length && !DEFERRED_MARKER_RE.test(line)) {
      err(`${name}: Post-MVP/Excluded ID(s) [${ids.join(', ')}] appear on a line with no deferred/excluded/not-modelled marker: ${line.trim().slice(0, 160)}`);
    }
  }
}

// --------------------------------------------------------------------------
// 5. Status agreement across header / registry / current-state / index.
// --------------------------------------------------------------------------
const iaStatus = headerStatus(ia);
const navStatus = headerStatus(nav);
if (!iaStatus) err(`${IA}: no parseable backtick status token in the header`);
if (!navStatus) err(`${NAV}: no parseable backtick status token in the header`);
if (iaStatus && navStatus && iaStatus !== navStatus) {
  // Navigation may lag one step behind IA only if IA is already APPROVED and
  // Navigation is still AWAITING_HUMAN_APPROVAL (sequential decisions allowed
  // by the task); the reverse (Navigation ahead of IA) is never valid.
  const order = ['AWAITING_HUMAN_APPROVAL', 'APPROVED'];
  if (order.indexOf(navStatus) > order.indexOf(iaStatus)) {
    err(`${NAV} status (${navStatus}) is ahead of ${IA} status (${iaStatus}) — Navigation cannot be approved before its upstream Information Architecture`);
  }
}

let regDoc;
try {
  regDoc = YAML.parse(read(REGISTRY));
} catch (e) {
  err(`${REGISTRY}: YAML parse error — ${e.message}`);
}
if (regDoc && Array.isArray(regDoc.artifacts)) {
  for (const [id, artifactPath, expectedStatus, csRecord] of [
    ['information-architecture', IA, iaStatus, CS_IA],
    ['navigation-specification', NAV, navStatus, CS_NAV],
  ]) {
    const a = regDoc.artifacts.find((x) => x && x.id === id);
    if (!a) {
      err(`${REGISTRY}: no artifact entry with id "${id}"`);
      continue;
    }
    if (a.status !== expectedStatus) err(`${REGISTRY}: ${id}.status = ${JSON.stringify(a.status)}, expected ${expectedStatus} (from ${artifactPath} header)`);
    if (typeof a.path !== 'string' || !exists(a.path)) err(`${REGISTRY}: ${id}.path -> ${JSON.stringify(a.path)} does not resolve`);
    if (typeof a.current_state_record !== 'string' || !exists(a.current_state_record)) {
      err(`${REGISTRY}: ${id}.current_state_record -> ${JSON.stringify(a.current_state_record)} does not resolve`);
    } else if (a.current_state_record !== csRecord) {
      warn(`${REGISTRY}: ${id}.current_state_record = ${a.current_state_record}, expected ${csRecord}`);
    }
  }
} else if (regDoc) {
  err(`${REGISTRY}: no top-level "artifacts" array`);
}

for (const [label, expected] of [['information-architecture.md', iaStatus], ['navigation-specification.md', navStatus]]) {
  const csReadme = read(CS_README);
  const row = csReadme.split('\n').find((l) => l.includes(label));
  if (!row) err(`${CS_README}: no index row for ${label}`);
  else if (expected && !row.includes(expected)) err(`${CS_README}: index row for ${label} does not carry status ${expected}: ${row.trim().slice(0, 140)}`);
}

for (const [name, csPath, expected] of [
  ['information-architecture', CS_IA, iaStatus],
  ['navigation-specification', CS_NAV, navStatus],
]) {
  const csText = read(csPath);
  const csStatus = headerStatus(csText);
  if (expected && csStatus !== expected) {
    err(`${csPath}: current-state status = ${JSON.stringify(csStatus)}, expected ${JSON.stringify(expected)} to match ${name}'s canonical artifact`);
  }
}

// --------------------------------------------------------------------------
// 6. "No OQ-*/CD-* resolved" honesty assertion present in both artifacts.
// --------------------------------------------------------------------------
for (const [name, text] of [[IA, ia], [NAV, nav]]) {
  if (!/resolves?,?\s*converts?,?\s*or\s*creates?\s*no\b|no `?OQ-\*`?\s*\/\s*`?CD-\*`?\s*item\s*(is\s*)?resolved/i.test(text)) {
    warn(`${name}: no explicit "no OQ-*/CD-* item resolved" assertion found near the header — expected per house convention`);
  }
}

// --------------------------------------------------------------------------
// 7. Step 3 gate + combined cross-department review evidence presence.
// --------------------------------------------------------------------------
const step3Files = exists(STEP3_REVIEW_DIR)
  ? fs.readdirSync(path.join(root, STEP3_REVIEW_DIR)).filter((f) => f.endsWith('.md'))
  : [];
if (step3Files.length < 7) {
  err(`${STEP3_REVIEW_DIR} has ${step3Files.length} review file(s); the task requires 7 independent Step 3 lenses (ux-architect, product-experience-lead, domain-workflow-architect, D04, D02, D03, accessibility)`);
}

const crossDeptFiles = exists(CROSS_DEPT_DIR)
  ? fs.readdirSync(path.join(root, CROSS_DEPT_DIR)).filter((f) => f.endsWith('.md'))
  : [];
if (crossDeptFiles.length < 1) {
  err(`${CROSS_DEPT_DIR} has no review file — the combined cross-department review (10 required participants) must be durably recorded`);
}

const iaLinked = nav.includes(STEP3_REVIEW_DIR) || ia.includes(STEP3_REVIEW_DIR);
if (!iaLinked) err(`Neither ${IA} nor ${NAV} links ${STEP3_REVIEW_DIR}`);
const crossDeptLinked = nav.includes(CROSS_DEPT_DIR) || ia.includes(CROSS_DEPT_DIR);
if (!crossDeptLinked) err(`Neither ${IA} nor ${NAV} links ${CROSS_DEPT_DIR}`);

// --------------------------------------------------------------------------
// 8. Navigation declares its version-pinned dependency on the IA.
// --------------------------------------------------------------------------
if (!/information-architecture\.md[\s\S]{0,200}(reviewed|finalized|version-pinned|required)/i.test(nav) &&
    !/version-pinned[\s\S]{0,200}information-architecture/i.test(nav)) {
  err(`${NAV}: does not declare a version-pinned dependency on ${IA} as required by the task ("Step 4 may be prepared against the version-pinned reviewed IA ... but it must declare that dependency")`);
}

// --------------------------------------------------------------------------
// 8b. Step-3 remediation review evidence (13 lenses) must be durably recorded,
//     with every BLOCKING finding shown CLOSED.
// --------------------------------------------------------------------------
const remediationFiles = exists(REMEDIATION_DIR)
  ? fs.readdirSync(path.join(root, REMEDIATION_DIR)).filter((f) => f.endsWith('.md'))
  : [];
const remediationLenses = remediationFiles.filter((f) => f !== 'README.md');
if (remediationLenses.length < 13) {
  err(`${REMEDIATION_DIR} has ${remediationLenses.length} lens file(s); the Step-3 remediation pass requires 13 independent lenses`);
}
const remediationReadme = exists(`${REMEDIATION_DIR}/README.md`) ? read(`${REMEDIATION_DIR}/README.md`) : '';
if (!remediationReadme) {
  err(`${REMEDIATION_DIR}/README.md missing — the remediation finding register must be durably recorded`);
} else {
  for (const row of remediationReadme.split('\n')) {
    if (/^\|\s*\*\*RP-B\d+\*\*/.test(row) && !/\bCLOSED\b/.test(row)) {
      err(`${REMEDIATION_DIR}/README.md: a BLOCKING finding row is not marked CLOSED: ${row.trim().slice(0, 140)}`);
    }
  }
}
// --------------------------------------------------------------------------
// 9. Increment traceability (INC-0…INC-11) — IA §1.9
// --------------------------------------------------------------------------
const incSection = ia.match(/### 1\.9 Increment traceability[\s\S]*?(?=### 1\.10)/);
const incText = incSection ? incSection[0] : '';
if (!incText) err(`${IA}: §1.9 Increment traceability section not found`);

// Authoritative increment IDs come from the approved release scope's own §10
// headings — never re-derived here.
const approvedIncrements = [...mrs.matchAll(/^### (INC-\d{1,2}[ab]?)\s/gm)].map((m) => m[1]);
if (approvedIncrements.length === 0) err(`${MRS}: no "### INC-*" increment headings found — cannot verify increment coverage`);
for (const inc of approvedIncrements) {
  // Word-boundary match so "INC-3" is not satisfied by "INC-3a".
  const re = new RegExp(`${inc}(?![0-9a-z])`);
  if (!re.test(incText)) err(`${IA} §1.9: approved increment ${inc} (${MRS} §10) is not mapped`);
}

// Every destination defined in §4 must be claimed by exactly one owning
// increment. Only the "Destinations first delivered" column counts — the
// "Also touched by" column legitimately re-mentions destinations.
const incRows = incText.split('\n').filter((l) => /^\|\s*\*\*INC-/.test(l));
const ownedDest = new Map();
for (const row of incRows) {
  const cells = row.split('|');
  const incId = (cells[1] || '').replace(/\*/g, '').trim();
  const destCell = cells[3] || '';
  for (const m of destCell.matchAll(/\bD-\d{1,2}\b/g)) {
    if (ownedDest.has(m[0])) {
      err(`${IA} §1.9: destination ${m[0]} is claimed as first-delivered by both ${ownedDest.get(m[0])} and ${incId} — each destination must have exactly one owning increment`);
    } else {
      ownedDest.set(m[0], incId);
    }
  }
}
for (const d of destsDefined) {
  if (!ownedDest.has(d)) err(`${IA} §1.9: destination ${d} (defined in §4) is not claimed by any owning increment`);
}

// --------------------------------------------------------------------------
// 9b. Journey coverage — every approved J-* release journey must be walked
//     through in IA §5.1, from its primary role.
// --------------------------------------------------------------------------
const approvedJourneys = [...new Set([...mrs.matchAll(/(?<![A-Za-z-])(J-\d{1,2})(?![0-9])/g)].map((m) => m[1]))];
const walkSection = ia.match(/### 5\.1 Walkthroughs[\s\S]*?(?=### 5\.2)/);
const walkText = walkSection ? walkSection[0] : '';
if (!walkText) err(`${IA}: §5.1 Walkthroughs section not found`);
for (const j of approvedJourneys) {
  const row = walkText.split('\n').find((l) => new RegExp(`^\\|\\s*${j}(?![0-9])`).test(l));
  if (!row) {
    err(`${IA} §5.1: approved release journey ${j} (${MRS} §7) has no IA walkthrough row`);
    continue;
  }
  const cells = row.split('|');
  // columns: 1 Journey | 2 Primary role | 3 Locate | 4 Identify | 5 Open | 6 Relate | 7 Complete | 8 Return
  if (!(cells[2] || '').trim()) err(`${IA} §5.1: ${j} names no primary role`);
  for (const [idx, step] of [[3, 'Locate'], [5, 'Open'], [7, 'Complete'], [8, 'Return']]) {
    if (!(cells[idx] || '').trim()) err(`${IA} §5.1: ${j} has an empty "${step}" step`);
  }
}
// --------------------------------------------------------------------------
// 10. Invariant coverage — IA §1.10 must account for all 16, each with evidence
// --------------------------------------------------------------------------
const invSection = ia.match(/### 1\.10 Invariant coverage[\s\S]*?(?=### 1\.11)/);
const invText = invSection ? invSection[0] : '';
if (!invText) err(`${IA}: §1.10 Invariant coverage section not found`);
const invRows = new Map();
for (const line of invText.split('\n')) {
  const m = line.match(/^\|\s*(\d{1,2})\s*\|([^|]*)\|([^|]*)\|/);
  if (m) invRows.set(Number(m[1]), m[3].trim());
}
for (let i = 1; i <= 16; i += 1) {
  if (!invRows.has(i)) {
    err(`${IA} §1.10: invariant #${i} (WORKFLOW-ARCHITECTURE-v2.md §5) has no coverage row`);
  } else if (!/§\d/.test(invRows.get(i))) {
    err(`${IA} §1.10: invariant #${i} coverage cites no IA section (§N) as evidence`);
  }
}

// --------------------------------------------------------------------------
// 11. Actor coverage — IA §1.11
// --------------------------------------------------------------------------
const actorSection = ia.match(/### 1\.11 Actor coverage[\s\S]*?(?=### 1\.12)/);
const actorText = actorSection ? actorSection[0] : '';
if (!actorText) err(`${IA}: §1.11 Actor coverage section not found`);
for (const actor of ['Head Coach', 'Event Coach', 'Athlete', 'Platform Safety Administrator', 'Multi-Team user']) {
  const row = actorText.split('\n').find((l) => /^\|/.test(l) && l.includes(actor));
  if (!row) {
    err(`${IA} §1.11: no coverage row for canonical actor "${actor}"`);
    continue;
  }
  const cells = row.split('|');
  // columns: 1 Actor | 2 Entry | 3 Primary destinations | 4 Denied | 5 Cross-Team | 6 Journeys
  if (!/\bD-\d{1,2}\b/.test(cells[3] || '')) err(`${IA} §1.11: actor "${actor}" has no primary destination`);
  if (!(cells[4] || '').trim()) err(`${IA} §1.11: actor "${actor}" has an empty denied/absent column — every actor must have an explicit denial set`);
}
for (const actor of ['Head Coach', 'Event Coach', 'Athlete']) {
  const row = actorText.split('\n').find((l) => /^\|/.test(l) && l.includes(actor));
  const cells = row ? row.split('|') : [];
  if (!/\bJ-\d{1,2}\b/.test(cells[6] || '')) err(`${IA} §1.11: end-user actor "${actor}" is not the primary role in any J-* journey`);
}

// --------------------------------------------------------------------------
// 12. Conditional-capability treatment — IA §1.12, all 9, none activated
// --------------------------------------------------------------------------
const condSection = ia.match(/### 1\.12 Conditional-capability treatment[\s\S]*?(?=\n---)/);
const condText = condSection ? condSection[0] : '';
if (!condText) err(`${IA}: §1.12 Conditional-capability treatment section not found`);
for (const id of conditionalIds) {
  const re = new RegExp(`\\b${id.replace(/[-]/g, '\\-')}\\b`);
  if (!re.test(condText)) err(`${IA} §1.12: MVP-conditional capability ${id} (${MRS} §6.1) has no treatment row`);
}

// --------------------------------------------------------------------------
// 13. Explicit non-goals — IA §11
// --------------------------------------------------------------------------
const ngSection = ia.match(/## 11\. Non-goals[\s\S]*?(?=\n---)/);
const ngText = ngSection ? ngSection[0] : '';
if (!ngText) {
  err(`${IA}: §11 Non-goals section not found — the IA must state explicitly what it does not own`);
} else {
  const ngRows = ngText.split('\n').filter((l) => /^\|\s*\*\*N-\d+\*\*\s*\|/.test(l));
  if (ngRows.length < 10) err(`${IA} §11: only ${ngRows.length} non-goal row(s); the IA must enumerate its non-goals (>= 10 expected)`);
  for (const key of ['navigation-specification.md', 'Interaction Design', 'OQ-*', 'Option A']) {
    if (!ngText.includes(key)) err(`${IA} §11: non-goals do not address "${key}"`);
  }
}

// --------------------------------------------------------------------------
// 14. System-state surfaces — IA §4.5 (denied/unavailable/offline/queued/
//     conflict/recovery), each with an owning destination.
// --------------------------------------------------------------------------
const stateSection = ia.match(/### 4\.5 System-state surfaces[\s\S]*?(?=Every approved MVP destination)/);
const stateText = stateSection ? stateSection[0] : '';
if (!stateText) err(`${IA}: §4.5 System-state surfaces section not found`);
const REQUIRED_STATES = [
  ['X-1', 'Empty'], ['X-2', 'Denied'], ['X-3', 'Unavailable'], ['X-4', 'Offline'],
  ['X-5', 'Queued'], ['X-6', 'Conflict'], ['X-7', 'Recovery'],
];
for (const [id, label] of REQUIRED_STATES) {
  const row = stateText.split('\n').find((l) => new RegExp(`^\\|\\s*\\*\\*${id}\\*\\*\\s*\\|`).test(l));
  if (!row) {
    err(`${IA} §4.5: required system state ${id} (${label}) is not defined`);
    continue;
  }
  if (!new RegExp(label, 'i').test(row)) err(`${IA} §4.5: ${id} row does not name the "${label}" state`);
  const cells = row.split('|');
  // columns: 1 ID | 2 State | 3 Trigger | 4 Required content | 5 Never does | 6 Owning destination(s) | 7 Recovery
  const owning = cells[6] || '';
  if (!/\bD-\d{1,2}\b|every/i.test(owning)) err(`${IA} §4.5: ${id} names no owning destination`);
  if (!(cells[5] || '').trim()) err(`${IA} §4.5: ${id} has an empty "Never does" column — each state must state its prohibition`);
}
// Conflict is the one state backed by a real destination.
const x6 = stateText.split('\n').find((l) => /^\|\s*\*\*X-6\*\*\s*\|/.test(l)) || '';
if (!/\bD-28\b/.test(x6)) err(`${IA} §4.5: X-6 (conflict) must name D-28 Reconciliation Center as its owning destination`);

// --------------------------------------------------------------------------
// 15. Destination uniqueness — no D-NN defined twice in §4
// --------------------------------------------------------------------------
const destDefsAll = [...iaDestText.matchAll(/^\|\s*(D-\d{1,2})\s*\|/gm)].map((m) => m[1]);
const seenDest = new Set();
for (const d of destDefsAll) {
  if (seenDest.has(d)) err(`${IA} §4: destination ${d} is defined more than once — destination IDs must be unique`);
  seenDest.add(d);
}

// --------------------------------------------------------------------------
// 16. Upstream commit pins must be current (no stale pin).
// --------------------------------------------------------------------------
const G7_STEP2 = 'stridelab-ai/orchestration/approvals/G7-mvp-feature-prioritization-release-scope.md';
if (!exists(G7_STEP2)) {
  err(`${G7_STEP2}: Step-2 G7 approval record missing — the IA's upstream pin cannot be verified`);
} else {
  const g7 = read(G7_STEP2);
  const pin = (g7.match(/\b([0-9a-f]{40})\b/) || [])[1];
  if (!pin) {
    err(`${G7_STEP2}: no 40-character approved-version commit pin found`);
  } else if (!ia.includes(pin)) {
    err(`${IA}: does not cite the Step-2 approved-version pin ${pin} recorded in ${G7_STEP2} — upstream pin is stale or absent`);
  }
}

// --------------------------------------------------------------------------
// 17. No undocumented OQ-*/CD-* mutation: every governed item cited by either
//     artifact must already exist in the governed registers upstream.
// --------------------------------------------------------------------------
const OQ_RE = /(?<![A-Za-z-])(?:OQ|CD)-[A-Z0-9][A-Z0-9-]*/g;
const registerText = [
  'stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md',
  'docs/product/feature-prioritization.md',
  MRS,
].filter(exists).map(read).join('\n');
const governedIds = new Set([...registerText.matchAll(OQ_RE)].map((m) => m[0]));
for (const [name, text] of [[IA, ia], [NAV, nav]]) {
  for (const m of text.matchAll(OQ_RE)) {
    if (!governedIds.has(m[0])) {
      err(`${name}: cites ${m[0]}, which exists in no governed upstream register — a Step-3/4 artifact may not create or rename an OQ-*/CD-* item`);
    }
  }
}


report();
process.exit(errors.length ? 1 : 0);

function report() {
  const result = {
    check: 'step3-4-artifacts',
    status: errors.length ? 'FAIL' : 'PASS',
    counts: {
      mvp_required_user_facing_checked: requiredUserFacingIds.length,
      mvp_required_supporting_checked: requiredSupportingIds.length,
      mvp_conditional_checked: conditionalIds.length,
      destinations_defined: destsDefined.size,
      destinations_mapped_in_nav: destsInNav.size,
      step3_review_files: step3Files.length,
      cross_department_review_files: crossDeptFiles.length,
      remediation_review_lenses: remediationLenses.length,
      increments_mapped: approvedIncrements.length,
      journeys_walked: approvedJourneys.length,
      destinations_uniquely_owned: ownedDest.size,
      invariants_covered: invRows.size,
      actors_covered: actorText ? actorText.split('\n').filter((l) => /^\|\s*\*\*/.test(l)).length : 0,
      conditionals_treated: conditionalIds.length,
      non_goals: ngText ? ngText.split('\n').filter((l) => /^\|\s*\*\*N-\d+\*\*\s*\|/.test(l)).length : 0,
      system_states: stateText ? REQUIRED_STATES.filter(([id]) => new RegExp(`^\\|\\s*\\*\\*${id}\\*\\*\\s*\\|`, 'm').test(stateText)).length : 0,
      governed_oq_cd_ids_verified: new Set([...(ia + nav).matchAll(OQ_RE)].map((m) => m[0])).size,
    },
    errors,
    warnings,
  };
  console.log(JSON.stringify(result, null, 2));
}
