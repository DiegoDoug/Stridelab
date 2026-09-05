# Orchestration Artifact Registry

The machine-readable canonical artifact types live in `stridelab-ai/registry/artifacts.yaml`.

Orchestration additionally tracks:
- task work package;
- gate plan;
- handoff;
- review disposition;
- approval record;
- verification evidence;
- project-state update.

Artifacts should reference upstream versions/IDs rather than copy their contents.
