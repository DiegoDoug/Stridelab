import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const cases=JSON.parse(fs.readFileSync(path.join(root,'stridelab-ai/tests/routing/orchestration-routing-cases.yaml'),'utf8')).cases;
const rules=JSON.parse(fs.readFileSync(path.join(root,'stridelab-ai/orchestration/routing/routing-table.yaml'),'utf8')).rules;

if(cases.length < 10) {
  console.error(`Expected at least 10 routing cases, found ${cases.length}`);
  process.exit(1);
}
if(rules.length !== 7) {
  console.error(`Expected 7 routing rules, found ${rules.length}`);
  process.exit(1);
}
console.log(`validate-routing-cases: PASS (${cases.length} cases registered, ${rules.length} primary rules)`);
