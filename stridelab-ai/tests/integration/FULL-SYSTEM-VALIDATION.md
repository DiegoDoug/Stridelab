# Full StrideLab AI System Validation

This validation layer checks that the installed AI development system is structurally coherent after all overlays are applied.

Expected installed system:
- 6 Departments
- 38 populated core skill directories
- 46 finalized Department agent files
- 256 finalized Department command files
- cross-Department orchestration layer
- 9 phase gates
- root orchestration agents/commands

Run from `/StrideLab/`:

```bash
node stridelab-ai/scripts/validate-ai-system.mjs
```

A structural PASS does not prove every skill is behaviorally correct; SKILL MAKER's skill validation remains authoritative for the 38 core skills.
