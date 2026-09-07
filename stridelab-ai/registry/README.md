# StrideLab Registry

Machine- and human-readable index of canonical project artifacts and the ownership records needed to locate them. Created in the Workflow Architecture v2 correction pass to close independent-review finding **F-20** (root `CLAUDE.md` step 3 references this directory for Department resolution / artifact lookup; it previously did not exist).

Department **routing** continues to be performed via `stridelab-ai/orchestration/routing/` (`department-routing.md`, `routing-table.yaml`), which is the mechanism `ORCHESTRATOR.md` describes and populates. This registry indexes **artifacts and their owners**, not routing rules.

## Contents

| File | Purpose |
|---|---|
| `artifacts.yaml` | Canonical artifact register — id, type, path, status, owner, upstream refs. |
| `bounded-context-owners.yaml` | Bounded context → owning Department / lead → `domains/*` directory. |

Artifacts reference upstream versions/IDs rather than copying their contents.
