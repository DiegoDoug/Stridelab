/**
 * validate-step2-artifacts.mjs
 *
 * Fail-closed semantic verification of the Department 01 Step 2 artifacts:
 *   docs/product/feature-prioritization.md   (Phase A)
 *   docs/product/mvp-release-scope.md         (Phase B)
 * and their project-memory / registry / current-state-index bindings.
 *
 * The pre-existing `ai:validate` chain did not catch a wrong feature count or a
 * missing journey. This check proves the underlying ID relationships:
 *   - the feature master table is contiguous F-01..F-NN with no dup/gap and the
 *     prose "N candidate features" matches the real count;
 *   - the S-01..S-13 supporting table is contiguous;
 *   - the §5 class tallies (required user-facing / required supporting / total /
 *     conditional / excluded) are computed from the master table, not trusted;
 *   - every MVP-required user-facing feature appears in a §7 journey;
 *   - every MVP-required supporting capability is in a journey or the section-12
 *     acceptance table;
 *   - every cross-workflow invariant #1..#16 is exercised by a journey;
 *   - every feature / supporting token referenced by a journey exists and is not
 *     Post-MVP or Excluded;
 *   - every referenced aggregate A1..A35 and contract seam 1..14 exists in the
 *     authoritative registers (domain-model §4 / cross-context-contracts.md);
 *   - every OQ- / CD- token referenced exists in the authoritative OPEN register
 *     or workflow knowledge tree and none is asserted resolved/approved/closed;
 *   - every MVP-required capability is assigned to an implementation increment
 *     and the increment dependency graph is acyclic and references real INCs;
 *   - header status, registry status, lifecycle-record status and the
 *     current-state index agree on AWAITING_HUMAN_APPROVAL;
 *   - the "no OQ/CD resolved" assertion is present in both artifacts;
 *   - the C-IND independent-review condition is only claimed closed when the
 *     durable review-evidence directory actually exists and is linked.
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

const FP = 'docs/product/feature-prioritization.md';
const MRS = 'docs/product/mvp-release-scope.md';
const CS_FP = 'stridelab-ai/project-memory/current-state/feature-prioritization.md';
const CS_MRS = 'stridelab-ai/project-memory/current-state/mvp-release-scope.md';
const CS_README = 'stridelab-ai/project-memory/current-state/README.md';
const REGISTRY = 'stridelab-ai/registry/artifacts.yaml';
const REVIEW_DIR = 'stridelab-ai/orchestration/reviews/step2-dept01';

for (const f of [FP, MRS, CS_FP, CS_MRS, CS_README, REGISTRY]) {
  if (!exists(f)) err(`Missing required file: ${f}`);
}
if (errors.length) { report(); process.exit(1); }

const fp = read(FP);
const mrs = read(MRS);

// --------------------------------------------------------------------------
// helpers
// --------------------------------------------------------------------------
/** Return the text of a section from `## <startHeading>` (exclusive of the heading
 * line's trailing content is kept) up to the next heading at `level` or shallower. */
function section(text, startRe, endRe) {
  const s = text.search(startRe);
  if (s < 0) return null;
  const rest = text.slice(s);
  const e = rest.slice(1).search(endRe);
  return e < 0 ? rest : rest.slice(0, e + 1);
}
function tableRows(sectionText) {
  return (sectionText || '')
    .split('\n')
    .filter((l) => /^\s*\|/.test(l) && !/^\s*\|[\s:|-]+\|\s*$/.test(l));
}
function cells(row) {
  return row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
}
const uniq = (a) => [...new Set(a)];
function tokens(str, re) { return uniq([...(str || '').matchAll(re)].map((m) => m[0])); }

// --------------------------------------------------------------------------
// 1. Feature master table (FP §3) + supporting table (FP §3.1)
// --------------------------------------------------------------------------
const secMaster = section(fp, /## 3\. Candidate feature inventory/, /\n### 3\.1/);
const secSupport = section(fp, /### 3\.1 Cross-cutting supporting capabilities/, /\n## 4\. Per-feature records/);
const secSummary = section(fp, /## 5\. Prioritization summary/, /\n## 6\./);
const secPostMvp = section(fp, /\n### Post-MVP\n/, /\n### Excluded from the current release/);
const secExcluded = section(fp, /### Excluded from the current release/, /\n## 5\. Prioritization summary/);

const master = {}; // id -> classRaw
for (const r of tableRows(secMaster)) {
  const c = cells(r);
  if (!/^F-\d{2}$/.test(c[0])) continue;
  master[c[0]] = c[c.length - 1];
}
const masterIds = Object.keys(master).sort();
if (masterIds.length === 0) err('FP §3: no feature rows parsed from the master table');

// contiguity F-01..F-NN
const nums = masterIds.map((id) => parseInt(id.slice(2), 10)).sort((a, b) => a - b);
const maxN = nums[nums.length - 1];
for (let i = 1; i <= maxN; i++) {
  if (!nums.includes(i)) err(`FP §3: master table is missing F-${String(i).padStart(2, '0')} (non-contiguous)`);
}
const dupF = masterIds.filter((id, i) => masterIds.indexOf(id) !== i);
if (dupF.length) err(`FP §3: duplicate feature id(s): ${dupF.join(', ')}`);
const realCandidateCount = nums.length;

// declared "N candidate features"
const declaredCount = (secMaster.match(/(\d+)\s+candidate features/i) || [])[1];
if (!declaredCount) err('FP §3: could not find a "<N> candidate features" statement');
else if (parseInt(declaredCount, 10) !== realCandidateCount)
  err(`FP §3: prose says "${declaredCount} candidate features" but the master table has ${realCandidateCount} rows (F-01..F-${String(maxN).padStart(2, '0')})`);

// supporting table
const support = {}; // id -> classRaw
for (const r of tableRows(secSupport)) {
  const c = cells(r);
  if (!/^S-\d{2}$/.test(c[0])) continue;
  support[c[0]] = c[c.length - 1];
}
const supIds = Object.keys(support).sort();
const supNums = supIds.map((id) => parseInt(id.slice(2), 10)).sort((a, b) => a - b);
const supMax = supNums[supNums.length - 1] || 0;
for (let i = 1; i <= supMax; i++)
  if (!supNums.includes(i)) err(`FP §3.1: missing S-${String(i).padStart(2, '0')} (non-contiguous)`);
if (supMax !== 13) warn(`FP §3.1: expected S-01..S-13, highest is S-${String(supMax).padStart(2, '0')}`);

// --------------------------------------------------------------------------
// 2. Classification model + computed tallies
// --------------------------------------------------------------------------
const SUPPORTING_FEATURE_IDS = ['F-42']; // the one master-table row that is a system interface, not user-facing
function classify(raw) {
  const t = raw.toLowerCase();
  const req = /mvp required/.test(t);
  const cond = /conditional/.test(t);
  const post = /post-mvp/.test(t);
  if (post && !req) return 'postmvp';
  if (req) return 'required';        // F-34 ("MVP required (athlete self) / conditional (...)") => required + slice
  if (cond) return 'conditional';
  return 'other';
}
const cls = {};
for (const [id, raw] of Object.entries(master)) cls[id] = classify(raw);

const requiredAll = masterIds.filter((id) => cls[id] === 'required');
const requiredUserFacing = requiredAll.filter((id) => !SUPPORTING_FEATURE_IDS.includes(id));
const conditionalF = masterIds.filter((id) => cls[id] === 'conditional');
const postmvpF = masterIds.filter((id) => cls[id] === 'postmvp');

const supRequired = supIds.filter((id) => /mvp required/i.test(support[id]) && !/conditional/i.test(support[id]));
const supConditional = supIds.filter((id) => /conditional/i.test(support[id]));

// F-34 conditional slice
const hasF34cond = /\*\*F-34-cond/.test(fp);
if (!hasF34cond) warn('FP §4: expected an "F-34-cond" sub-entry for the coach-external-export slice');

const requiredUserFacingCount = requiredUserFacing.length;
const requiredSupportingCount =
  supRequired.length + SUPPORTING_FEATURE_IDS.filter((id) => cls[id] === 'required').length;
const requiredTotal = requiredUserFacingCount + requiredSupportingCount;   // 48
const conditionalTotal = conditionalF.length + (hasF34cond ? 1 : 0) + supConditional.length; // expect 7
const excludedIds = tokens(secExcluded, /\bF-EX-\d+\b/g);
const excludedCount = excludedIds.length; // expect 10

// --------------------------------------------------------------------------
// 3. §5 summary table agreement (numbers computed, prose must contain them)
// --------------------------------------------------------------------------
const sumRows = tableRows(secSummary);
function sumRow(label) { return sumRows.find((r) => r.includes(label)); }
const reqRow = sumRow('MVP required');
if (!reqRow) err('FP §5: no "MVP required" summary row');
else {
  for (const needle of [`${requiredUserFacingCount} user-facing`, `${requiredSupportingCount} supporting`, `= ${requiredTotal}`]) {
    if (!reqRow.includes(needle))
      err(`FP §5 "MVP required" row must state "${needle}" (computed from the master table). Row: ${reqRow.trim().slice(0, 160)}`);
  }
}
const condRow = sumRow('MVP conditional');
if (condRow && !cells(condRow).some((c) => c.trim() === String(conditionalTotal)))
  err(`FP §5 "MVP conditional" count cell must be ${conditionalTotal} (computed: ${conditionalF.length} F + ${hasF34cond ? 1 : 0} F-34-cond + ${supConditional.length} S). Row: ${condRow.trim().slice(0, 160)}`);
const exclRow = sumRow('Excluded from current release');
if (exclRow && !cells(exclRow).some((c) => c.trim() === String(excludedCount)))
  err(`FP §5 "Excluded" count cell must be ${excludedCount}. Row: ${exclRow.trim().slice(0, 160)}`);

// every F/S token in §5 ID cells must exist
for (const tok of tokens(secSummary, /\b[FS]-\d+\b/g)) {
  if (tok.startsWith('F-') && !(tok in master) && !excludedIds.includes(tok) && !/^F-P-/.test(tok))
    err(`FP §5: references undefined feature id ${tok}`);
  if (tok.startsWith('S-') && !(tok in support))
    err(`FP §5: references undefined supporting id ${tok}`);
}

// --------------------------------------------------------------------------
// 4. Journeys (MRS §7) — feature + invariant coverage
// --------------------------------------------------------------------------
const secJourneys = section(mrs, /## 7\. End-to-end release journeys/, /\n### 7\.1/);
const secCovMatrix = section(mrs, /### 7\.1 Coverage matrix/, /\n## 8\./);
const jRows = tableRows(secJourneys).filter((r) => /^\|\s*J-\d+\s*\|/.test(r));
if (jRows.length < 11) err(`MRS §7: expected ≥11 journeys, parsed ${jRows.length}`);

const journeyFeatureTokens = [];
const journeyInvariants = [];
for (const r of jRows) {
  const c = cells(r);
  const featCell = c[3] || '';
  const invCell = c[4] || '';
  journeyFeatureTokens.push(...tokens(featCell, /\b(?:F-\d+|S-\d+|F-EX-\d+|F-P-\d+)\b/g));
  journeyInvariants.push(...tokens(invCell, /#\d+\b/g));
}
const jFeat = uniq(journeyFeatureTokens);
const jInv = uniq(journeyInvariants);

// every journey token exists + is not Post-MVP / Excluded
for (const tok of jFeat) {
  if (/^F-EX-/.test(tok)) err(`MRS §7: a journey references Excluded id ${tok}`);
  else if (/^F-P-/.test(tok)) err(`MRS §7: a journey references Post-MVP id ${tok}`);
  else if (/^F-\d+$/.test(tok)) {
    if (!(tok in master)) err(`MRS §7: a journey references undefined feature id ${tok}`);
    else if (cls[tok] === 'postmvp') err(`MRS §7: a journey depends on Post-MVP feature ${tok}`);
  } else if (/^S-\d+$/.test(tok) && !(tok in support)) {
    err(`MRS §7: a journey references undefined supporting id ${tok}`);
  }
}
// every MVP-required user-facing feature covered
for (const id of requiredUserFacing) {
  if (!jFeat.includes(id)) err(`MRS §7: MVP-required user-facing feature ${id} appears in NO journey (Features-exercised column)`);
}
// a master-table row treated as a supporting capability, IF still MVP-required, must be journey-covered
for (const id of SUPPORTING_FEATURE_IDS) {
  if (cls[id] === 'required' && !jFeat.includes(id))
    err(`MRS §7: MVP-required capability ${id} appears in NO journey`);
}
// every invariant #1..#16 covered by a journey OR (for the no-navigation meta-invariant #11)
// by an explicit statement in the §7.1 coverage matrix.
const matrixInv = tokens(secCovMatrix, /#\d+\b/g);
const invCovered = new Set([...jInv, ...matrixInv]);
for (let n = 1; n <= 16; n++) {
  if (!invCovered.has(`#${n}`)) err(`MRS §7 / §7.1: invariant #${n} has no journey or coverage-matrix evidence`);
}
if (!secCovMatrix) err('MRS §7.1: coverage matrix subsection not found');
// #11 (no navigation designed) — also assert neither artifact contains a navigation/IA design surface
for (const [name, text] of [[FP, fp], [MRS, mrs]]) {
  if (/^\s*#{1,4}\s+(Navigation|Information Architecture|Screen inventory|Wireframe)/im.test(text))
    err(`${name}: contains a navigation / IA / screen-inventory design section — invariant #11 forbids designing navigation at this layer`);
}

// required supporting capabilities: journey OR §12 acceptance table
const secAccept = section(mrs, /## 12\. Acceptance criteria for every included capability/, /\n## 13\./);
const acceptIds = [];
for (const r of tableRows(secAccept)) {
  const c = cells(r);
  if (/^(F|S)-\d+$/.test(c[0])) acceptIds.push(c[0]);
}
for (const id of [...supRequired, ...SUPPORTING_FEATURE_IDS.filter((x) => cls[x] === 'required')]) {
  if (!jFeat.includes(id) && !acceptIds.includes(id))
    err(`MRS: MVP-required supporting capability ${id} is neither in a §7 journey nor a §12 acceptance-table row`);
}

// --------------------------------------------------------------------------
// 5. Aggregates (MRS §8.2) and contract seams (MRS §8.3) vs authoritative registers
// --------------------------------------------------------------------------
const DM = 'docs/product/domain-model.md';
const CC = 'stridelab-ai/application-map/cross-context-contracts.md';
if (exists(DM)) {
  const dm = read(DM);
  const dmAgg = new Set(tokens(dm, /\bA\d+\b/g).filter((t) => {
    const n = parseInt(t.slice(1), 10);
    return n >= 1 && n <= 60;
  }));
  const dmMax = Math.max(...[...dmAgg].map((t) => parseInt(t.slice(1), 10)));
  const secAgg = section(mrs, /### 8\.2 Required aggregates/, /\n### 8\.3/);
  for (const t of tokens(secAgg, /\bA\d+\b/g)) {
    if (!dmAgg.has(t)) err(`MRS §8.2: references aggregate ${t} which is not in ${DM} (highest real aggregate is A${dmMax})`);
  }
} else warn(`${DM} not found — aggregate cross-check skipped`);

if (exists(CC)) {
  const cc = read(CC);
  const seamCount = (cc.match(/^## \d+\.\s/gm) || []).length;
  const secSeams = section(mrs, /### 8\.3 Cross-context contract seams/, /\n## 9\./);
  for (const r of tableRows(secSeams)) {
    const c = cells(r);
    const m = c[0].match(/^(\d+)\b/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n < 1 || n > seamCount) err(`MRS §8.3: references contract seam ${n} but ${CC} defines ${seamCount}`);
    }
  }
} else warn(`${CC} not found — seam cross-check skipped`);

// --------------------------------------------------------------------------
// 6. OQ-*/CD- tokens exist in the authoritative universe; none asserted resolved
// --------------------------------------------------------------------------
function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.isFile() && p.endsWith('.md')) acc.push(p);
  }
  return acc;
}
const universeFiles = [
  ...walk(path.join(root, 'stridelab-ai/knowledge/workflows')),
  path.join(root, 'docs/product/product-baseline.md'),
  path.join(root, 'docs/product/workflow-architecture.md'),
  path.join(root, 'docs/product/domain-model.md'),
].filter((p) => fs.existsSync(p));
const TOK_RE = /\b(?:OQ|CD)-[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+\b/g;
const universe = new Set();
for (const f of universeFiles) for (const t of read(path.relative(root, f)).match(TOK_RE) || []) universe.add(t);

const step2Tokens = uniq([...(fp.match(TOK_RE) || []), ...(mrs.match(TOK_RE) || [])]);
const unknownTokens = step2Tokens.filter((t) => !universe.has(t));
if (unknownTokens.length)
  err(`Step-2 artifacts reference OQ-*/CD- item(s) not found in the authoritative OPEN register / workflow knowledge tree: ${unknownTokens.join(', ')}`);

for (const [name, text] of [[FP, fp], [MRS, mrs]]) {
  for (const line of text.split('\n')) {
    if (/`(?:OQ|CD)-[A-Z0-9-]+`\s*(?:→|:|=|-)\s*\*{0,2}(APPROVED|RESOLVED|CLOSED)\b/i.test(line))
      err(`${name}: a line asserts an OQ-*/CD- item is APPROVED/RESOLVED/CLOSED — no Step-2 artifact may resolve an OPEN item: "${line.trim().slice(0, 140)}"`);
  }
  if (!/is resolved, converted, or created/.test(text))
    err(`${name}: missing the required assertion that "no OQ-*/CD- item is resolved, converted, or created"`);
}

// --------------------------------------------------------------------------
// 7. Increments (MRS §10) — assignment + acyclic dependency graph
// --------------------------------------------------------------------------
const secInc = section(mrs, /## 10\. Ordered implementation sequence/, /\n## 11\./);
const incHeaders = [...secInc.matchAll(/^### (INC-\d+)\b.*$/gm)];
const incNames = incHeaders.map((m) => m[1]);
const incAssigned = new Set();
const incDeps = {};
for (let i = 0; i < incHeaders.length; i++) {
  const start = incHeaders[i].index;
  const end = i + 1 < incHeaders.length ? incHeaders[i + 1].index : secInc.length;
  const body = secInc.slice(start, end);
  const inc = incHeaders[i][1];
  const includedLine = (body.match(/\*\*Included:\*\*[^\n]*(?:\n(?!\s*[-*] \*\*)[^\n]*)*/) || [''])[0];
  for (const t of tokens(includedLine, /\b(?:F-\d+|S-\d+)\b/g)) incAssigned.add(t);
  const depLine = (body.match(/\*\*Upstream dependencies?:\*\*[^\n]*/) || [''])[0];
  incDeps[inc] = tokens(depLine, /\bINC-\d+\b/g);
  for (const d of incDeps[inc]) if (!incNames.includes(d)) err(`MRS §10: ${inc} depends on ${d} which is not a defined increment`);
}
// every MVP-required capability assigned to some increment
for (const id of [...requiredUserFacing, ...supRequired, ...SUPPORTING_FEATURE_IDS.filter((x) => cls[x] === 'required')]) {
  if (!incAssigned.has(id)) err(`MRS §10: MVP-required capability ${id} is not assigned to any increment`);
}
// acyclic
const WHITE = 0, GREY = 1, BLACK = 2;
const color = Object.fromEntries(incNames.map((n) => [n, WHITE]));
let cyclic = false;
function dfs(n) {
  color[n] = GREY;
  for (const d of incDeps[n] || []) {
    if (color[d] === GREY) { cyclic = true; }
    else if (color[d] === WHITE) dfs(d);
  }
  color[n] = BLACK;
}
for (const n of incNames) if (color[n] === WHITE) dfs(n);
if (cyclic) err('MRS §10: the increment dependency graph contains a cycle');

// --------------------------------------------------------------------------
// 8. Status agreement across header / registry / lifecycle / index
// --------------------------------------------------------------------------
const STATUS = 'AWAITING_HUMAN_APPROVAL';
function headerStatus(text) {
  const line = text.split('\n').find((l) => /(^|\s)\*?\*?Status:?\*?\*?/i.test(l) && /`[^`]+`/.test(l));
  return line ? (line.match(/`([^`]+)`/) || [])[1] : null;
}
for (const [name, text] of [[FP, fp], [MRS, mrs], [CS_FP, read(CS_FP)], [CS_MRS, read(CS_MRS)]]) {
  const s = headerStatus(text);
  if (s !== STATUS) err(`${name}: header Status is ${JSON.stringify(s)}, expected \`${STATUS}\``);
}
let regDoc = null;
try { regDoc = YAML.parse(read(REGISTRY)); } catch (e) { err(`${REGISTRY}: YAML parse error — ${e.message.split('\n')[0]}`); }
if (regDoc && Array.isArray(regDoc.artifacts)) {
  for (const id of ['feature-prioritization', 'mvp-release-scope']) {
    const a = regDoc.artifacts.find((x) => x && x.id === id);
    if (!a) { err(`${REGISTRY}: no artifact entry with id "${id}"`); continue; }
    if (a.status !== STATUS) err(`${REGISTRY}: ${id}.status = ${JSON.stringify(a.status)}, expected ${STATUS}`);
    for (const k of ['path', 'current_state_record']) {
      if (typeof a[k] !== 'string' || !exists(a[k])) err(`${REGISTRY}: ${id}.${k} -> ${JSON.stringify(a[k])} does not resolve`);
    }
  }
} else if (regDoc) err(`${REGISTRY}: top-level "artifacts" is not a list`);

const idx = read(CS_README);
for (const label of ['feature-prioritization.md', 'mvp-release-scope.md']) {
  const row = idx.split('\n').find((l) => l.includes(`\`${label}\``) || l.endsWith(`| \`${label}\` |`) || l.includes(label));
  if (!row) err(`${CS_README}: index has no row for ${label}`);
  else if (!row.includes(STATUS)) err(`${CS_README}: index row for ${label} does not carry status ${STATUS}: ${row.trim().slice(0, 140)}`);
}

// --------------------------------------------------------------------------
// 9. C-IND independent-review honesty guard
// --------------------------------------------------------------------------
// Tolerate markdown emphasis in the row id (`| **C-IND** |`). C-IND counts as
// "closed" only on an explicit closure token — never on the substring "closed"
// appearing inside a phrase like "is not closed".
const cindRow = (mrs.split('\n').find((l) => /^\|\s*\*{0,2}C-IND\*{0,2}\s*\|/.test(l)) || '');
const cindClosed =
  !!cindRow &&
  /(status:\s*\*{0,2}closed\b|\*\*closed\*\*|✓\s*closed|C-IND\s+(is\s+)?(now\s+)?(closed|discharged|complete)\b)/i.test(cindRow);
const cindOpen = !cindClosed;
const reviewFiles = exists(REVIEW_DIR)
  ? fs.readdirSync(path.join(root, REVIEW_DIR)).filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
  : [];
const reviewLinked = fp.includes(REVIEW_DIR) || mrs.includes(REVIEW_DIR);

if (cindClosed) {
  if (reviewFiles.length < 8)
    err(`C-IND is marked closed but ${REVIEW_DIR} has ${reviewFiles.length} review file(s) (need ≥8: one per Department + architecture + cross-department)`);
  if (!reviewLinked)
    err(`C-IND is marked closed but neither Step-2 artifact links ${REVIEW_DIR}`);
}
if (cindRow && !reviewLinked)
  err(`${MRS}: §13.10 lists C-IND but neither Step-2 artifact links the review-evidence directory ${REVIEW_DIR}`);
if (!cindRow)
  err(`${MRS}: §13.10 has no C-IND row (independent specialist review condition)`);

// "only unresolved / remaining step is G7" honesty — never true while C-IND is open.
// Negation-aware: ignore a match inside a clause that DENIES the claim
// ("does not claim …", "not … until all …", "pending", "partial", "near-final").
for (const [name, text] of [[FP, fp], [MRS, mrs], [CS_FP, read(CS_FP)], [CS_MRS, read(CS_MRS)]]) {
  const re = /(?:G7|human [a-z-]+ (?:approval|decision|step)) (?:is|as|becomes) the (?:sole|only) (?:remaining|unresolved|open)[^.\n]{0,40}(?:step|item|decision)/gi;
  for (const m of text.matchAll(re)) {
    const before = text.slice(Math.max(0, m.index - 80), m.index);
    const around = before + m[0];
    if (cindOpen && !/\b(not|never|no longer|pending|partial|near-final|once|until|when|neither)\b/i.test(around))
      err(`${name}: asserts "${m[0].trim().slice(0, 90)}" while condition C-IND (independent specialist review) is still open`);
  }
}
// Accessibility (S-12) must be a per-increment G5 exit gate, not deferred (D02-IND-B1 / D05-IND-N4)
{
  const g5row = mrs.split('\n').find((l) => /\bG5 Quality/.test(l)) || '';
  if (!/accessib/i.test(g5row) || !/G5/.test(g5row))
    err('MRS §11.1: the G5 exit criteria do not name accessibility (S-12) as a per-increment exit gate (D02-IND-B1)');
  const secShared = section(mrs, /## 10\. Ordered implementation sequence/, /\n### INC-0/);
  if (!/ux-research-accessibility-reviewer/.test(secShared || '') || !/per-increment G5/i.test(secShared || ''))
    err('MRS §10: the shared per-increment fields do not make S-12 accessibility a per-increment G5 gate verified by ux-research-accessibility-reviewer');
}

// --------------------------------------------------------------------------
// 10. Decision-surface consistency — stale-count guard across §15, lifecycle records, registry
// (cross-department review B2/B3: the reclassification must be propagated everywhere, not just the bodies)
// --------------------------------------------------------------------------
const STALE = [
  /36 user-facing/i,
  /=\s*48\b/,
  /\b12 supporting capabilities\b/i,
  /\bseven MVP conditional\b/i,
  /\bthe 7 conditional capabilities\b/i,
  /\b40-feature master table\b/i,
  /\b40 candidate features\b/i,
  /J-1\s*(?:…|\.\.\.?|-)\s*J-11\b/,
  /journeys \(J-1\s*(?:…|\.\.\.?)\s*J-11\)/i,
  /the seven MVP conditional/i,
];
for (const rel of [FP, MRS, CS_FP, CS_MRS, REGISTRY]) {
  const t = read(rel);
  for (const re of STALE) {
    const line = t.split('\n').find((l) => re.test(l));
    if (line) err(`${rel}: stale pre-reclassification count/range — "${line.trim().slice(0, 120)}" (expect 42 candidate / 35 user-facing + 11 supporting = 46 / 9 conditional / J-1…J-13)`);
  }
}
// §15 decision package must carry the computed numbers verbatim
const secDP = section(mrs, /## 15\. Decision package/, /\n## 16\./);
if (secDP) {
  for (const needle of [`${requiredUserFacingCount} user-facing`, `${requiredSupportingCount} supporting`, `= ${requiredTotal}`, `${conditionalTotal} conditional`]) {
    if (!secDP.includes(needle)) err(`MRS §15: decision package must state "${needle}" (computed from the master table)`);
  }
}
// the two safety gate phrases must be present (load-bearing, per D04-B1 / D02-N1)
for (const [label, re] of [
  ['INC-9 completes before any external user exposure of media/messaging', /INC-9[^.\n]{0,120}(before|prior to)[^.\n]{0,60}(external|user)[^.\n]{0,40}(media|messaging)/i],
  ['INC-3a is not externally exposed until INC-3b passes', /INC-3a[^.\n]{0,80}(not|no)[^.\n]{0,40}exposed[^.\n]{0,40}INC-3b/i],
]) {
  if (!re.test(mrs)) err(`MRS: the load-bearing gate "${label}" is not stated`);
}
// current-state records + registry notes must carry the corrected inventory
for (const rel of [CS_FP, CS_MRS, REGISTRY]) {
  const t = read(rel);
  if (!/42[- ](candidate )?feature/i.test(t)) err(`${rel}: does not state the 42-feature inventory`);
  if (!/35 user-facing/i.test(t)) err(`${rel}: does not state "35 user-facing" MVP-required`);
}

// --------------------------------------------------------------------------
report();
process.exit(errors.length ? 1 : 0);

function report() {
  const result = {
    check: 'step2-artifacts',
    status: errors.length ? 'FAIL' : 'PASS',
    counts: {
      candidate_features: typeof realCandidateCount === 'number' ? realCandidateCount : null,
      supporting_capabilities: typeof supMax === 'number' ? supMax : null,
      mvp_required_user_facing: typeof requiredUserFacingCount === 'number' ? requiredUserFacingCount : null,
      mvp_required_supporting: typeof requiredSupportingCount === 'number' ? requiredSupportingCount : null,
      mvp_required_total: typeof requiredTotal === 'number' ? requiredTotal : null,
      mvp_conditional_total: typeof conditionalTotal === 'number' ? conditionalTotal : null,
      post_mvp_features: postmvpF ? postmvpF.length : null,
      excluded: typeof excludedCount === 'number' ? excludedCount : null,
      journeys: jRows ? jRows.length : null,
      increments: incNames ? incNames.length : null,
    },
    errors,
    warnings,
  };
  console.log(JSON.stringify(result, null, 2));
}
