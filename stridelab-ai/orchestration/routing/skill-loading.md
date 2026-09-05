# Skill Loading Policy

## Rules

- Load the owning agent's primary core skill(s) first.
- Load secondary core skills only when the task actually crosses those responsibilities.
- Load complementary skills only when they improve correctness or execution.
- Do not fabricate missing complementary skill content.
- Do not use a complementary skill to override a StrideLab core skill.
- For volatile platform/legal/security facts, use current authoritative sources as required by the core skill.

## Context minimization

Agents should load only:
- current project state;
- directly relevant decisions/requirements/ADRs;
- affected application-map sections;
- required core skills;
- necessary implementation files/evidence.

Avoid indiscriminate repository-wide context loading.
