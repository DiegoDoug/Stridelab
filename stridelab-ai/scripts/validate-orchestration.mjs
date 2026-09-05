import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'stridelab-ai/orchestration/ORCHESTRATOR.md',
  'stridelab-ai/orchestration/routing/routing-table.yaml',
  'stridelab-ai/orchestration/phase-gates/gates.yaml',
  'stridelab-ai/orchestration/dependency-graph/departments.yaml',
  'stridelab-ai/orchestration/approvals/approval-matrix.yaml',
  'stridelab-ai/shared/contracts/handoff-contracts/HANDOFF-CONTRACT.md',
  'stridelab-ai/shared/contracts/review-contracts/REVIEW-CONTRACT.md',
  'stridelab-ai/agents/stridelab-orchestrator.md',
  'stridelab-ai/commands/orchestrate/orchestrate-task.md'
];

for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) {
    console.error('Missing:', rel);
    process.exit(1);
  }
}

const gates = JSON.parse(fs.readFileSync(path.join(root,'stridelab-ai/orchestration/phase-gates/gates.yaml'),'utf8')).gates;
if (gates.length !== 9) {
  console.error(`Expected 9 gates, found ${gates.length}`);
  process.exit(1);
}
const ids = gates.map(g => g.id);
if (new Set(ids).size !== ids.length) {
  console.error('Duplicate gate IDs');
  process.exit(1);
}
if (!ids.includes('G7')) {
  console.error('Missing human approval gate G7');
  process.exit(1);
}

const routing = JSON.parse(fs.readFileSync(path.join(root,'stridelab-ai/orchestration/routing/routing-table.yaml'),'utf8')).rules;
if (routing.length !== 7) {
  console.error(`Expected 7 primary routing rules, found ${routing.length}`);
  process.exit(1);
}

console.log('validate-orchestration: PASS');
