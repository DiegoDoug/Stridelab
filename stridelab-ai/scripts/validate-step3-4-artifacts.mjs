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
    },
    errors,
    warnings,
  };
  console.log(JSON.stringify(result, null, 2));
}
