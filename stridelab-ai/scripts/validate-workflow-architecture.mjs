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
 *     the supporting spec, and the registry (parsed, not text-matched)
 *   - every workflow section carries the required workflow-artifact contract fields
 *   - the cross-context contract register has 14 seams, each with its 8 fields
 *   - internal repo paths referenced by the canonical documents resolve
 *   - the canonical status string is consistent and no superseded v1 filename is
 *     referenced as a live pointer
 *   - the 16 cross-workflow invariants are all present
 *   - the DD-DEPARTED-CONTENT decision is back-referenced from every workflow that
 *     claims it
 *   - the registry / gate / routing machine-readable files parse as YAML and carry
 *     the expected top-level shape
 *
 * Exit code 0 = PASS, 1 = FAIL. Warnings never fail the build.
 */

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();
const errors = [];
const warnings = [];

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

/** Parse a YAML (or JSON-in-.yaml) file; record a hard error and return null on failure. */
function parseYaml(file) {
  if (!exists(file)) {
    errors.push(`Missing machine-readable file: ${file}`);
    return null;
  }
  try {
    const doc = YAML.parse(read(file), { prettyErrors: true });
    if (doc === undefined || doc === null) {
      errors.push(`${file}: parsed to an empty document`);
      return null;
    }
    return doc;
  } catch (e) {
    errors.push(`${file}: YAML parse error — ${e.message.split('\n')[0]}`);
    return null;
  }
}

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
  'stridelab-ai/project-memory/current-state/product-baseline.md',
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
// 3. Registry — parsed, structural, and reconciled against the 86 IDs
// ---------------------------------------------------------------------------

const artifactsDoc = parseYaml('stridelab-ai/registry/artifacts.yaml');
let waArtifact = null;
if (artifactsDoc) {
  if (!Array.isArray(artifactsDoc.artifacts)) {
    errors.push('artifacts.yaml: top-level "artifacts" is not a list');
  } else {
    waArtifact = artifactsDoc.artifacts.find((a) => a && a.id === 'workflow-architecture');
    if (!waArtifact) {
      errors.push('artifacts.yaml: no artifact with id "workflow-architecture"');
    } else {
      if (waArtifact.workflow_count !== EXPECTED_TOTAL) {
        errors.push(`artifacts.yaml: workflow-architecture.workflow_count = ${JSON.stringify(waArtifact.workflow_count)}, expected ${EXPECTED_TOTAL}`);
      }
      if (waArtifact.category_count !== CATEGORIES.length) {
        errors.push(`artifacts.yaml: workflow-architecture.category_count = ${JSON.stringify(waArtifact.category_count)}, expected ${CATEGORIES.length}`);
      }
      // Post-G7: the workflow-architecture artifact is APPROVED. If it is ever
      // moved back to AWAITING_HUMAN_APPROVAL the docs must agree — see the
      // canonical-status cross-check below.
      const VALID_STATUS = ['AWAITING_HUMAN_APPROVAL', 'APPROVED', 'SUPERSEDED'];
      if (!VALID_STATUS.includes(waArtifact.status)) {
        errors.push(`artifacts.yaml: workflow-architecture.status = ${JSON.stringify(waArtifact.status)}, expected one of ${VALID_STATUS.join(' / ')}`);
      }
      if (waArtifact.status === 'APPROVED') {
        for (const k of ['approved_by', 'approved_date', 'approval_record']) {
          if (!waArtifact[k]) errors.push(`artifacts.yaml: workflow-architecture is APPROVED but "${k}" is missing`);
        }
        if (typeof waArtifact.approval_record === 'string' && !exists(waArtifact.approval_record)) {
          errors.push(`artifacts.yaml: workflow-architecture.approval_record -> "${waArtifact.approval_record}" does not resolve`);
        }
      }
      if (waArtifact.canonical_entry_point !== 'docs/product/workflow-architecture.md') {
        errors.push(`artifacts.yaml: workflow-architecture.canonical_entry_point = ${JSON.stringify(waArtifact.canonical_entry_point)}`);
      }
    }
    // every referenced path key on every artifact must resolve
    for (const a of artifactsDoc.artifacts) {
      for (const key of ['path', 'canonical_entry_point', 'supporting_spec_index', 'current_state_record', 'approval_record']) {
        const v = a && a[key];
        if (typeof v === 'string' && !v.includes('*') && !exists(v.replace(/\/$/, ''))) {
          errors.push(`artifacts.yaml: ${a.id}.${key} -> "${v}" does not resolve`);
        }
      }
    }
  }
}

const ownersDoc = parseYaml('stridelab-ai/registry/bounded-context-owners.yaml');
if (ownersDoc) {
  if (!Array.isArray(ownersDoc.bounded_contexts)) {
    errors.push('bounded-context-owners.yaml: top-level "bounded_contexts" is not a list');
  } else {
    const regIds = new Set();
    for (const bc of ownersDoc.bounded_contexts) {
      if (!bc || typeof bc.context !== 'string') {
        errors.push(`bounded-context-owners.yaml: a bounded_contexts entry has no "context" key`);
        continue;
      }
      if (!bc.product_owner) errors.push(`bounded-context-owners.yaml: ${bc.context} has no product_owner`);
      if (typeof bc.directory === 'string') {
        const d = bc.directory.split('#')[0].trim().replace(/\/$/, '');
        if (d && !exists(d)) errors.push(`bounded-context-owners.yaml: ${bc.context}.directory "${bc.directory}" does not resolve`);
      }
      if (Array.isArray(bc.workflow_ids)) {
        for (const id of bc.workflow_ids) regIds.add(String(id));
      }
    }
    for (const id of allIds) {
      if (!regIds.has(id)) errors.push(`bounded-context-owners.yaml: workflow ${id} is not mapped to any bounded context`);
    }
    for (const id of regIds) {
      if (!/^[A-Z]{2}-\d{2}$/.test(id)) {
        errors.push(`bounded-context-owners.yaml: malformed workflow id "${id}"`);
      } else if (!allIds.has(id)) {
        errors.push(`bounded-context-owners.yaml: references unknown workflow ${id}`);
      }
    }
  }
}

// Prose reconciliation in the two narrative documents.
function assertMentions(file, needle, label) {
  if (!exists(file)) return;
  if (!read(file).includes(needle)) {
    errors.push(`${file}: expected to state ${label} ("${needle}")`);
  }
}
assertMentions('docs/product/workflow-architecture.md', '86 workflows, 13 categories', 'inventory 86/13');
assertMentions('stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md', '86 workflows, 13 categories', 'inventory 86/13');

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
  if (!/fourteen|14 contract/.test(text)) {
    warnings.push(`${CC}: prose does not state the seam count`);
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
  'stridelab-ai/project-memory/current-state/product-baseline.md',
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
    let probe = p.replace(/#.*$/, '');
    if (probe.endsWith('/')) probe = probe.slice(0, -1);
    if (probe.endsWith('/*')) probe = probe.slice(0, -2);
    if (probe.includes('*')) probe = probe.split('*')[0].replace(/\/$/, '');
    if (!probe) continue;
    if (!exists(probe)) errors.push(`${doc}: unresolved path reference "${p}"`);
  }
}

// ---------------------------------------------------------------------------
// 6. Status consistency + no live v1 filename pointer
// ---------------------------------------------------------------------------

// The three narrative docs each declare a status on/near their first "Status"
// line. That declared status must match the registry's workflow-architecture
// status (single source of truth) — so an approval, or a roll-back, can never
// leave the documents disagreeing with the register.
const registryStatus = waArtifact && typeof waArtifact.status === 'string' ? waArtifact.status : null;
const STATUS_FILES = [
  'docs/product/workflow-architecture.md',
  'stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md',
  'stridelab-ai/project-memory/current-state/workflow-architecture-v2.md',
];
const KNOWN_STATUSES = ['AWAITING_HUMAN_APPROVAL', 'APPROVED', 'SUPERSEDED'];
// Returns { line: string|null, value: 'AWAITING_HUMAN_APPROVAL'|'APPROVED'|'SUPERSEDED'|null }.
// `line` is null only when no "Status" line exists at all; `value` is null when a
// Status line exists but carries no recognised token (both are hard errors for
// artifacts that must fail closed).
function declaredStatusInfo(text) {
  const line = text.split('\n').find((l) => /status[:*\s]/i.test(l) && /`[^`]+`|AWAITING[ _]HUMAN[ _]APPROVAL|AWAITING APPROVAL|APPROVED|SUPERSEDED/i.test(l));
  if (!line) return { line: null, value: null };
  const tok = (line.match(/`([^`]+)`/) || [])[1] || line;
  if (/AWAITING[ _]HUMAN[ _]APPROVAL|AWAITING APPROVAL/i.test(tok)) return { line, value: 'AWAITING_HUMAN_APPROVAL' };
  if (/\bAPPROVED\b/i.test(tok)) return { line, value: 'APPROVED' };
  if (/\bSUPERSEDED\b/i.test(tok)) return { line, value: 'SUPERSEDED' };
  return { line, value: null };
}
function declaredStatus(text) {
  return declaredStatusInfo(text).value;
}
// product-baseline is a separate governed artifact with its own lifecycle status.
// This check must FAIL CLOSED: a missing Status line, an unrecognised token, a
// missing/invalid registry entry, or APPROVED without approval-record fields are
// all errors — not silent passes. (Negative-tested; see the corrective PR.)
{
  const PB_DOC = 'docs/product/product-baseline.md';
  const PB_STATE = 'stridelab-ai/project-memory/current-state/product-baseline.md';
  const pb = artifactsDoc && Array.isArray(artifactsDoc.artifacts)
    ? artifactsDoc.artifacts.find((a) => a && a.id === 'product-baseline')
    : null;

  if (!pb) {
    errors.push('artifacts.yaml: no artifact with id "product-baseline"');
  } else if (typeof pb.status !== 'string' || !KNOWN_STATUSES.includes(pb.status)) {
    errors.push(`artifacts.yaml: product-baseline.status = ${JSON.stringify(pb.status)}, expected one of ${KNOWN_STATUSES.join(' / ')}`);
  } else if (pb.status === 'APPROVED') {
    for (const k of ['approved_by', 'approved_date', 'approval_record']) {
      if (!pb[k]) errors.push(`artifacts.yaml: product-baseline is APPROVED but "${k}" is missing`);
    }
    if (typeof pb.approval_record === 'string' && !exists(pb.approval_record)) {
      errors.push(`artifacts.yaml: product-baseline.approval_record -> "${pb.approval_record}" does not resolve`);
    }
  }

  const pbRegStatus = pb && KNOWN_STATUSES.includes(pb.status) ? pb.status : null;
  for (const f of [PB_DOC, PB_STATE]) {
    if (!exists(f)) {
      errors.push(`Missing product-baseline status file: ${f}`);
      continue;
    }
    const info = declaredStatusInfo(read(f));
    if (info.line === null) {
      errors.push(`${f}: could not find a declared status on a "Status" line`);
    } else if (info.value === null) {
      errors.push(`${f}: "Status" line carries no recognised status token (expected one of ${KNOWN_STATUSES.join(' / ')})`);
    } else if (pbRegStatus && info.value !== pbRegStatus) {
      errors.push(`${f}: declared status "${info.value}" != registry product-baseline.status "${pbRegStatus}"`);
    }
  }
}

for (const f of STATUS_FILES) {
  if (!exists(f)) continue;
  const ds = declaredStatus(read(f));
  if (!ds) {
    errors.push(`${f}: could not find a declared status on its first "Status" line`);
  } else if (registryStatus && ds !== registryStatus) {
    errors.push(`${f}: declared status "${ds}" != registry workflow-architecture.status "${registryStatus}"`);
  }
}

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
// 9. Machine-readable orchestration files parse as YAML with the expected shape
// ---------------------------------------------------------------------------

const gates = parseYaml('stridelab-ai/orchestration/phase-gates/gates.yaml');
if (gates) {
  if (!Array.isArray(gates.gates)) {
    errors.push('gates.yaml: top-level "gates" is not a list');
  } else {
    const ids = gates.gates.map((g) => g && g.id);
    for (const need of ['G0', 'G1', 'G2', 'G3', 'G4', 'G7']) {
      if (!ids.includes(need)) errors.push(`gates.yaml: gate ${need} not defined`);
    }
    const g7 = gates.gates.find((g) => g && g.id === 'G7');
    if (g7 && g7.owner !== 'human') errors.push(`gates.yaml: G7.owner = ${JSON.stringify(g7.owner)}, expected "human"`);
    const g4 = gates.gates.find((g) => g && g.id === 'G4');
    if (g4 && !/code|configuration|data/i.test(String(g4.required_when))) {
      warnings.push('gates.yaml: G4.required_when no longer mentions code/configuration/data');
    }
  }
}

const routing = parseYaml('stridelab-ai/orchestration/routing/routing-table.yaml');
if (routing) {
  if (!Array.isArray(routing.rules) || routing.rules.length === 0) {
    errors.push('routing-table.yaml: top-level "rules" is not a non-empty list');
  } else {
    routing.rules.forEach((r, i) => {
      if (!r || typeof r.id !== 'string') errors.push(`routing-table.yaml: rules[${i}] has no string "id"`);
      if (!r || typeof r.primary !== 'string' || !/^0\d-[a-z-]+$/.test(r.primary)) {
        errors.push(`routing-table.yaml: rules[${i}].primary = ${JSON.stringify(r && r.primary)} is not a department slug`);
      }
    });
  }
}

const approvals = parseYaml('stridelab-ai/orchestration/approvals/approval-matrix.yaml');
if (approvals) {
  if (!Array.isArray(approvals.actions)) {
    errors.push('approval-matrix.yaml: top-level "actions" is not a list');
  } else {
    for (const need of ['approve_product_or_architecture_lock', 'configure_repository_administration']) {
      const row = approvals.actions.find((a) => a && a.action === need);
      if (!row || row.human_approval !== true) {
        errors.push(`approval-matrix.yaml: "${need}" must be present with human_approval: true`);
      }
    }
  }
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
  registry_workflow_count: waArtifact ? waArtifact.workflow_count : null,
  errors,
  warnings,
};
console.log(JSON.stringify(result, null, 2));
process.exit(errors.length ? 1 : 0);
