import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ai = path.join(root,'stridelab-ai');
const errors = [];
const warnings = [];

const departments = {
  '01-product-experience': {
    skills:['product-strategy','domain-modeling','workflow-architecture','information-architecture','user-research-usability','interaction-design','visual-ui-design','accessibility-design'],
    agents:['product-experience-lead','product-strategist','domain-workflow-architect','ux-architect','product-designer','ux-research-accessibility-reviewer']
  },
  '02-client-feature-engineering': {
    skills:['ios-ipados-engineering','web-engineering','media-engineering','video-analysis-engineering','training-planning-engineering','workout-performance-engineering'],
    agents:['client-feature-lead','ios-ipados-engineer','web-client-engineer','media-engineer','video-analysis-engineer','training-planning-engineer','workout-performance-engineer','client-verification-reviewer']
  },
  '03-platform-data-engineering': {
    skills:['backend-api-engineering','database-engineering','offline-local-first-engineering','realtime-messaging-notifications','search-retrieval-engineering','reporting-analytics-engineering'],
    agents:['platform-data-lead','backend-api-engineer','database-engineer','sync-offline-engineer','realtime-messaging-engineer','search-retrieval-engineer','reporting-analytics-engineer','platform-data-reviewer']
  },
  '04-security-identity-compliance': {
    skills:['authorization-tenancy','identity-account-lifecycle','security-engineering','privacy-data-governance','youth-safeguarding-trust-safety','legal-regulatory-compliance','app-store-platform-compliance'],
    agents:['security-compliance-lead','identity-access-engineer','application-security-engineer','privacy-data-governance-specialist','youth-trust-safety-specialist','legal-compliance-researcher','apple-platform-compliance-specialist','security-compliance-reviewer']
  },
  '05-quality-infrastructure-release': {
    skills:['quality-engineering','performance-engineering','infrastructure-devops','reliability-disaster-recovery','observability-incident-response','release-engineering'],
    agents:['quality-release-lead','quality-engineer','performance-engineer','devops-infrastructure-engineer','site-reliability-engineer','observability-incident-engineer','release-engineer','production-readiness-reviewer']
  },
  '06-business-operations-governance': {
    skills:['billing-entitlements','cost-engineering','internal-admin-support','documentation-knowledge-management','ai-engineering-governance'],
    agents:['business-operations-governance-lead','billing-entitlements-engineer','finops-cost-engineer','internal-tools-engineer','support-operations-specialist','documentation-knowledge-manager','ai-governance-engineer','operations-governance-reviewer']
  }
};

function exists(rel){ return fs.existsSync(path.join(root,rel)); }
function read(rel){ return fs.readFileSync(path.join(root,rel),'utf8'); }
function allFiles(dir){
  if (!fs.existsSync(dir)) return [];
  let out=[];
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name);
    if (e.isDirectory()) out=out.concat(allFiles(p));
    else if (e.isFile()) out.push(p);
  }
  return out;
}

// Root/orchestration prerequisites.
[
  'stridelab-ai/orchestration/ORCHESTRATOR.md',
  'stridelab-ai/orchestration/routing/routing-table.yaml',
  'stridelab-ai/orchestration/phase-gates/gates.yaml',
  'stridelab-ai/orchestration/approvals/approval-matrix.yaml',
  'stridelab-ai/agents/stridelab-orchestrator.md',
  'stridelab-ai/agents/architecture-reviewer.md',
  'stridelab-ai/agents/cross-department-reviewer.md',
  'stridelab-ai/agents/project-memory-manager.md'
].forEach(rel => { if(!exists(rel)) errors.push(`Missing ${rel}`); });

// Department counts and skill population.
let skillCount=0, agentCount=0, commandCount=0;
for (const [dept,spec] of Object.entries(departments)) {
  const base=`stridelab-ai/departments/${dept}`;

  for (const skill of spec.skills) {
    skillCount++;
    const dir=path.join(root,base,'skills','core',skill);
    if (!fs.existsSync(dir)) {
      errors.push(`Missing skill directory ${base}/skills/core/${skill}`);
      continue;
    }
    const real=allFiles(dir).filter(p => path.basename(p) !== '.gitkeep');
    if (real.length === 0) {
      errors.push(`Core skill not installed: ${base}/skills/core/${skill}`);
    }
  }

  for (const agent of spec.agents) {
    agentCount++;
    const rel=`${base}/agents/${agent}.md`;
    if(!exists(rel)){ errors.push(`Missing agent ${rel}`); continue; }
    const t=read(rel);
    if(t.includes('Placeholder Department agent definition')) errors.push(`Agent still placeholder: ${rel}`);
    for (const marker of ['## Mission','## Skill loading','## Ownership','## Operating procedure','## Expected outputs']) {
      if(!t.includes(marker)) errors.push(`Agent missing ${marker}: ${rel}`);
    }
  }

  const cmdRoot=path.join(root,base,'commands');
  const cmds=allFiles(cmdRoot).filter(p=>p.endsWith('.md'));
  commandCount += cmds.length;
  for (const p of cmds) {
    const t=fs.readFileSync(p,'utf8');
    const rel=path.relative(root,p).replaceAll('\\','/');
    if(t.includes('Placeholder command definition')) errors.push(`Command still placeholder: ${rel}`);
    for (const marker of ['**Owning agent:**','## Required skills','## Preconditions','## Procedure','## Verification','## Failure behavior']) {
      if(!t.includes(marker)) errors.push(`Command missing ${marker}: ${rel}`);
    }

    const m=t.match(/\*\*Owning agent:\*\* `([^`]+)`/);
    if(m){
      const owner=m[1];
      const ownerExists = Object.entries(departments).some(([d,s]) =>
        s.agents.includes(owner) && exists(`stridelab-ai/departments/${d}/agents/${owner}.md`)
      );
      if(!ownerExists) errors.push(`Command owner not found: ${rel} -> ${owner}`);
    }
  }
}

// Canonical counts.
if(skillCount !== 38) errors.push(`Expected 38 skills, counted ${skillCount}`);
if(agentCount !== 46) errors.push(`Expected 46 agents, counted ${agentCount}`);
if(commandCount !== 256) errors.push(`Expected 256 commands, found ${commandCount}`);

// Gate/routing validation.
if(exists('stridelab-ai/orchestration/phase-gates/gates.yaml')){
  const gates=JSON.parse(read('stridelab-ai/orchestration/phase-gates/gates.yaml')).gates;
  if(gates.length!==9) errors.push(`Expected 9 orchestration gates, found ${gates.length}`);
  if(!gates.some(g=>g.id==='G7')) errors.push('Human approval gate G7 missing');
}
if(exists('stridelab-ai/orchestration/routing/routing-table.yaml')){
  const rules=JSON.parse(read('stridelab-ai/orchestration/routing/routing-table.yaml')).rules;
  if(rules.length!==7) errors.push(`Expected 7 routing rules, found ${rules.length}`);
}

// Critical invariant presence.
const invariantFiles = [
  'stridelab-ai/project-memory/decisions/DEC-0003-event-coach-scope-and-profile-privacy.md',
  'stridelab-ai/project-memory/decisions/DEC-0006-personal-workouts-setting.md',
  'stridelab-ai/project-memory/decisions/DEC-0007-media-vault-visibility.md',
  'stridelab-ai/project-memory/decisions/DEC-0009-application-architecture.md'
];
for(const rel of invariantFiles){
  if(!exists(rel)) warnings.push(`Recommended project-memory invariant file not found: ${rel}`);
}

// Summarize.
const result={
  status: errors.length ? 'FAIL' : 'PASS',
  departments:Object.keys(departments).length,
  core_skills:skillCount,
  agents:agentCount,
  commands:commandCount,
  errors,
  warnings
};
console.log(JSON.stringify(result,null,2));
process.exit(errors.length ? 1 : 0);
