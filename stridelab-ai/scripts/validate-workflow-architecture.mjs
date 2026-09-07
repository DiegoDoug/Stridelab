/**
 * validate-workflow-architecture.mjs
 *
 * Documentation-phase verification for the StrideLab Workflow Architecture (Phase 01).
 *
 * This is a documentation artifact, not application code. The check therefore
 * validates structural consistency only:
 *   - the 13 category files exist and parse
 *   - all workflow IDs are unique and contiguous within their category
 *   - the stated inventory count (86) reconciles across the canonical entry point,
 *     the supporting spec, and the registry
 *   - every workflow section carries the required workflow-artifact contract fields
 *   - the cross-context contract register has 14 seams, each with its 8 fields
 *   - internal repo paths referenced by the canonical documents resolve
 *   - the canonical status string is consistent and no superseded v1 filename is
 *     referenced as a live pointer
 *   - the 16 cross-workflow invariants are all present
 *   - the DD-DEPARTED-CONTENT decision is back-referenced from every workflow that
 *     claims it
 *   - the registry / gate / routing machine-readable files parse
 *
 * Exit code 0 = PASS, 1 = FAIL. Warnings never fail the build.
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

const rel = (p) => path.relative(root, p).replaceAll('\\', '/');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

// ---------------------------------------------------------------------------
// 1. Canonical artifact set
// ---------------------------------------------------------------------------

const CANONICAL = [
  'docs/product/workflow-architecture.md',
  'docs/product/product-baseline.md',
  'docs/product/domain-model.md',
  'stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md',
  'stridelab-ai/application-map/bounded-contexts.md',
  'stridelab-ai/application-map/cross-context-contracts.md',
  'stridelab-ai/registry/artifacts.yaml',
  'stridelab-ai/registry/bounded-context-owners.yaml',
  'stridelab-ai/project-memory/current-state/workflow-architecture-v2.md',
];
for (const p of CANONICAL) {
  if (!exists(p)) errors.push(`Missing canonical artifact: ${p}`);
}

// ---------------------------------------------------------------------------
// 2. Workflow inventory — IDs unique, contiguous, count == 86
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { dir: 'identity-team', prefix: 'IT', count: 9 },
  { dir: 'profile', prefix: 'PR', count: 3 },
  { dir: 'team-administration', prefix: 'TA', count: 7 },
  { dir: 'training-planning', prefix: 'TP', count: 8 },
  { dir: 'session-execution', prefix: 'SE', count: 10 },
  { dir: 'personal-workouts', prefix: 'PW', count: 3 },
  { dir: 'media', prefix: 'MD', count: 7 },
  { dir: 'analysis', prefix: 'AN', count: 7 },
  { dir: 'vault-sharing', prefix: 'VS', count: 4 },
  { dir: 'messaging', prefix: 'MG', count: 7 },
  { dir: 'performance', prefix: 'PF', count: 6 },
  { dir: 'billing-entitlements', prefix: 'BE', count: 6 },
  { dir: 'privacy-safety', prefix: 'PS', count: 9 },
];
const EXPECTED_TOTAL = 86;

const WF_BASE = 'stridelab-ai/knowledge/workflows';
const REQUIRED_FIELDS = [
  'Purpose',
  'Actors',
  'Capability / trigger',
  'Preconditions',
  'Owned resources',
  'Exit condition',
  'Downstream artifacts',
];
// Behavioural fields — may appear as their own bold label or be folded into a
// combined "States/transitions/happy path/..." header used by the cross-cutting
// checkpoint / framing entries. Missing => warning, not error.
const BEHAVIOURAL_FIELDS = [
  ['States', /\bstates?\b/i],
  ['State transitions', /\btransitions?\b/i],
  ['Happy path', /\bhappy path\b/i],
  ['Errors/failures', /\berrors?\b/i],
  ['Recovery', /\brecovery\b/i],
  ['Offline behavior', /\boffline\b/i],
  ['Audit requirements', /\baudit\b/i],
];
// The supporting spec (§1) states these are cross-cutting framing / checkpoint
// entries that deliberately reference another workflow's mechanism instead of
// restating it — behavioural-field warnings are suppressed for them.
const FRAMING_ENTRIES = new Set(['PS-01', 'PS-02', 'PS-03', 'PS-04', 'PS-05', 'PS-06', 'VS-04', 'MG-03']);

const allIds = new Set();
let countedTotal = 0;

for (const cat of CATEGORIES) {
  const file = `${WF_BASE}/${cat.dir}/WORKFLOWS.md`;
  if (!exists(file)) {
    errors.push(`Missing category file: ${file}`);
    continue;
  }
  const text = read(file);

  // Split into workflow sections on "## XX-NN — ..." headers.
  const headerRe = new RegExp(`^## (${cat.prefix}-\\d{2}) [—-]`, 'gm');
  const headers = [...text.matchAll(headerRe)];
  const nums = [];

  for (let i = 0; i < headers.length; i++) {
    const id = headers[i][1];
    if (allIds.has(id)) errors.push(`Duplicate workflow ID: ${id}`);
    allIds.add(id);
    nums.push(parseInt(id.slice(cat.prefix.length + 1), 10));

    const start = headers[i].index;
    const end = i + 1 < headers.length ? headers[i + 1].index : text.length;
    const section = text.slice(start, end);

    for (const f of REQUIRED_FIELDS) {
      if (!section.includes(`**${f}:**`)) {
        errors.push(`${id}: missing required contract field "${f}"`);
      }
    }
    const combinedHeader = /\*\*[A-Za-z]+(?:\/[A-Za-z ]+)+:\*\*/.test(section);
    if (!FRAMING_ENTRIES.has(id)) {
      for (const [label, kw] of BEHAVIOURAL_FIELDS) {
        const hasOwn = section.includes(`**${label}:**`);
        const hasCombined = combinedHeader && kw.test(section);
        if (!hasOwn && !hasCombined) {
          warnings.push(`${id}: behavioural field "${label}" not found as a labelled field`);
        }
      }
    }
    if (!/\*\*Authorization assumptions/.test(section)) {
      warnings.push(`${id}: no "Authorization assumptions" block`);
    }
  }

  countedTotal += headers.length;

  if (headers.length !== cat.count) {
    errors.push(
      `${cat.dir}: expected ${cat.count} workflows, found ${headers.length} (${nums.map((n) => cat.prefix + '-' + String(n).padStart(2, '0')).join(', ')})`
    );
  }
  // Contiguity 1..count
  const sorted = [...nums].sort((a, b) => a - b);
  for (let k = 0; k < sorted.length; k++) {
    if (sorted[k] !== k + 1) {
      errors.push(`${cat.dir}: non-contiguous IDs — expected ${cat.prefix}-${String(k + 1).padStart(2, '0')}, saw ${cat.prefix}-${String(sorted[k]).padStart(2, '0')}`);
      break;
    }
  }
}

if (countedTotal !== EXPECTED_TOTAL) {
  errors.push(`Total workflow count: expected ${EXPECTED_TOTAL}, counted ${countedTotal}`);
}

// ---------------------------------------------------------------------------
// 3. Count reconciliation across documents
// ---------------------------------------------------------------------------

function assertMentions(file, needle, label) {
  if (!exists(file)) return;
  if (!read(file).includes(needle)) {
    errors.push(`${file}: expected to state ${label} ("${needle}")`);
  }
}
assertMentions('docs/product/workflow-architecture.md', '86 workflows, 13 categories', 'inventory 86/13');
assertMentions('stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md', '86 workflows, 13 categories', 'inventory 86/13');
assertMentions('stridelab-ai/registry/artifacts.yaml', 'workflow_count: 86', 'registry workflow_count');
assertMentions('stridelab-ai/registry/artifacts.yaml', 'category_count: 13', 'registry category_count');

// Registry union of workflow_ids must cover exactly the 86 IDs.
if (exists('stridelab-ai/registry/bounded-context-owners.yaml')) {
  const y = read('stridelab-ai/registry/bounded-context-owners.yaml');
  const regIds = new Set([...y.matchAll(/\b([A-Z]{2}-\d{2})\b/g)].map((m) => m[1]));
  for (const id of allIds) {
    if (!regIds.has(id)) errors.push(`bounded-context-owners.yaml: workflow ${id} not mapped to any bounded context`);
  }
  for (const id of regIds) {
    if (!allIds.has(id)) errors.push(`bounded-context-owners.yaml: references unknown workflow ${id}`);
  }
}

// ---------------------------------------------------------------------------
// 4. Cross-context contract register — 14 seams, 8 fields each
// ---------------------------------------------------------------------------

const CC = 'stridelab-ai/application-map/cross-context-contracts.md';
if (exists(CC)) {
  const text = read(CC);
  const secs = [...text.matchAll(/^## (\d+)\.\s+(.+)$/gm)];
  if (secs.length !== 14) errors.push(`${CC}: expected 14 contract seams, found ${secs.length}`);
  secs.forEach((m, i) => {
    const n = parseInt(m[1], 10);
    if (n !== i + 1) errors.push(`${CC}: contract seams not contiguous at "${m[0]}"`);
    const start = m.index;
    const end = i + 1 < secs.length ? secs[i + 1].index : text.length;
    const body = text.slice(start, end);
    const fields = ['Owner:', 'Checkpoint:', 'Failure:', 'Idempotency/replay:', 'Audit:', 'Minimization:', 'Deferred:'];
    for (const f of fields) {
      if (!body.includes(`**${f}**`)) errors.push(`${CC}: contract ${n} missing field "${f.replace(':', '')}"`);
    }
    if (!/consumers?:/i.test(body)) errors.push(`${CC}: contract ${n} missing "Consumers"`);
  });
  if (!text.includes('**fourteen**') && !text.includes('14 contract') && !text.includes('fourteen')) {
    warnings.push(`${CC}: prose does not state the seam count in words`);
  }
}

// ---------------------------------------------------------------------------
// 5. Internal path references resolve
// ---------------------------------------------------------------------------

const DOCS_WITH_PATHS = [
  'docs/product/workflow-architecture.md',
  'docs/product/product-baseline.md',
  'docs/product/domain-model.md',
  'stridelab-ai/application-map/README.md',
  'stridelab-ai/application-map/bounded-contexts.md',
  'stridelab-ai/application-map/cross-context-contracts.md',
  'stridelab-ai/registry/README.md',
  'stridelab-ai/registry/artifacts.yaml',
  'stridelab-ai/registry/bounded-context-owners.yaml',
  'stridelab-ai/project-memory/current-state/workflow-architecture-v2.md',
  'stridelab-ai/project-memory/current-state/README.md',
];
const PATH_RE = /`?((?:docs|stridelab-ai|domains|platform|services|packages|apps|infrastructure|\.github)\/[A-Za-z0-9_.\/-]+)`?/g;

for (const doc of DOCS_WITH_PATHS) {
  if (!exists(doc)) continue;
  const text = read(doc);
  const seen = new Set();
  for (const m of text.matchAll(PATH_RE)) {
    let p = m[1].replace(/[.,:;)]+$/, '');
    if (seen.has(p)) continue;
    seen.add(p);
    // normalise: strip trailing slash, strip a glob tail, strip a #anchor
    let probe = p.replace(/#.*$/, '');
    if (probe.endsWith('/')) probe = probe.slice(0, -1);
    if (probe.endsWith('/*')) probe = probe.slice(0, -2);
    if (probe.includes('*')) {
      // glob like stridelab-ai/knowledge/workflows/*/WORKFLOWS.md — check the fixed prefix dir
      probe = probe.split('*')[0].replace(/\/$/, '');
    }
    if (!probe) continue;
    if (!exists(probe)) {
      errors.push(`${doc}: unresolved path reference "${p}"`);
    }
  }
}

// ---------------------------------------------------------------------------
// 6. Status consistency + no live v1 filename pointer
// ---------------------------------------------------------------------------

const STATUS_FILES = [
  'docs/product/workflow-architecture.md',
  'docs/product/product-baseline.md',
  'stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md',
  'stridelab-ai/project-memory/current-state/workflow-architecture-v2.md',
];
for (const f of STATUS_FILES) {
  if (!exists(f)) continue;
  const t = read(f);
  if (!/AWAITING[ _]HUMAN[ _]APPROVAL/i.test(t)) {
    errors.push(`${f}: canonical status "AWAITING HUMAN APPROVAL" not found`);
  }
  if (/\bstatus\b[^\n]*\bAPPROVED\b/i.test(t) && !/AWAITING[ _]HUMAN[ _]APPROVAL/i.test(t)) {
    errors.push(`${f}: status appears to read APPROVED before G7`);
  }
}
// registry yaml must not say APPROVED for the workflow-architecture artifact
if (exists('stridelab-ai/registry/artifacts.yaml')) {
  const y = read('stridelab-ai/registry/artifacts.yaml');
  const waBlock = y.slice(y.indexOf('id: workflow-architecture'));
  const waStatus = (waBlock.match(/status:\s*(\S+)/) || [])[1];
  if (waStatus && waStatus !== 'AWAITING_HUMAN_APPROVAL') {
    errors.push(`artifacts.yaml: workflow-architecture status is "${waStatus}", expected AWAITING_HUMAN_APPROVAL (G7 pending)`);
  }
}

// A live pointer to a superseded v1 filename is a defect. Prose that documents
// the rename ("was renamed", "v1-named ... renamed to v2") is allowed.
const V1_PTR_FILES = [
  ...CANONICAL,
  'stridelab-ai/application-map/README.md',
  'stridelab-ai/registry/README.md',
];
for (const f of new Set(V1_PTR_FILES)) {
  if (!exists(f)) continue;
  for (const line of read(f).split('\n')) {
    if (/WORKFLOW-ARCHITECTURE-v1\.md|workflow-architecture-v1\.md/.test(line)) {
      const documented = /(renamed|superseded|never committed|version history|was\s+the\s+v1|→\s*v2|-> v2)/i.test(line);
      if (!documented) errors.push(`${f}: live reference to a superseded v1 filename — "${line.trim().slice(0, 120)}"`);
    }
  }
}

// ---------------------------------------------------------------------------
// 7. Sixteen cross-workflow invariants present
// ---------------------------------------------------------------------------

const SPEC = 'stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md';
if (exists(SPEC)) {
  const t = read(SPEC);
  const s5 = t.slice(t.indexOf('## 5. Cross-Workflow Invariants'));
  const s5end = s5.indexOf('\n## 6.');
  const body = s5end > 0 ? s5.slice(0, s5end) : s5;
  for (let n = 1; n <= 16; n++) {
    if (!new RegExp(`^${n}\\.\\s`, 'm').test(body)) {
      errors.push(`${SPEC} §5: invariant #${n} not found`);
    }
  }
  if (/^17\.\s/m.test(body)) warnings.push(`${SPEC} §5: an invariant #17 appears — the docs claim 16`);
}

// ---------------------------------------------------------------------------
// 8. DD-DEPARTED-CONTENT back-references
// ---------------------------------------------------------------------------

const DD_REFS = [
  ['stridelab-ai/knowledge/workflows/identity-team/WORKFLOWS.md', ['IT-06', 'IT-08', 'IT-09']],
  ['stridelab-ai/knowledge/workflows/team-administration/WORKFLOWS.md', ['TA-01']],
  ['stridelab-ai/knowledge/workflows/media/WORKFLOWS.md', ['MD-07']],
];
for (const [file, ids] of DD_REFS) {
  if (!exists(file)) continue;
  const t = read(file);
  if (!t.includes('DD-DEPARTED-CONTENT')) {
    errors.push(`${file}: expected a DD-DEPARTED-CONTENT reference`);
    continue;
  }
  const heads = [...t.matchAll(/^## ([A-Z]{2}-\d{2}) [—-]/gm)];
  for (const id of ids) {
    const idx = heads.findIndex((h) => h[1] === id);
    if (idx < 0) {
      warnings.push(`${file}: ${id} not found`);
      continue;
    }
    const start = heads[idx].index;
    const end = idx + 1 < heads.length ? heads[idx + 1].index : t.length;
    if (!t.slice(start, end).includes('DD-DEPARTED-CONTENT')) {
      warnings.push(`${file}: ${id} section does not mention DD-DEPARTED-CONTENT (claimed as a back-reference)`);
    }
  }
}

// ---------------------------------------------------------------------------
// 9. Machine-readable orchestration files parse
// ---------------------------------------------------------------------------

for (const jf of [
  'stridelab-ai/orchestration/phase-gates/gates.yaml',
  'stridelab-ai/orchestration/routing/routing-table.yaml',
  'stridelab-ai/orchestration/approvals/approval-matrix.yaml',
]) {
  if (!exists(jf)) continue;
  try {
    JSON.parse(read(jf));
  } catch (e) {
    errors.push(`${jf}: not valid JSON (${e.message})`);
  }
}

// Light YAML sanity for the registry files (no full parser dependency): no tabs,
// no trailing whitespace on key lines, top-level key present.
for (const yf of ['stridelab-ai/registry/artifacts.yaml', 'stridelab-ai/registry/bounded-context-owners.yaml']) {
  if (!exists(yf)) continue;
  const lines = read(yf).split('\n');
  lines.forEach((ln, i) => {
    if (ln.includes('\t')) errors.push(`${yf}:${i + 1}: tab character in YAML`);
  });
  const topKeys = lines.filter((l) => /^[A-Za-z_][\w-]*:/.test(l));
  if (topKeys.length === 0) errors.push(`${yf}: no top-level mapping key found`);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const result = {
  check: 'workflow-architecture',
  status: errors.length ? 'FAIL' : 'PASS',
  workflows_found: countedTotal,
  unique_ids: allIds.size,
  categories: CATEGORIES.length,
  errors,
  warnings,
};
console.log(JSON.stringify(result, null, 2));
process.exit(errors.length ? 1 : 0);
