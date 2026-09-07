# StrideLab Domain Model (companion stub)

**Status:** stub. Created in the v2 correction pass so the SKILL output-contract location exists and is cross-linked (finding F-21). The domain model has **not** been authored as a separate artifact; the domain concepts, ownership rules, invariants, lifecycles, and workflow states currently live inside the Workflow Architecture.

## Where the domain model currently lives

| Concern | Location |
|---|---|
| Entities, ownership rules, invariants | `docs/product/product-baseline.md` §2–§6, and `stridelab-ai/knowledge/workflows/WORKFLOW-ARCHITECTURE-v2.md` §5 (cross-workflow invariants) |
| Lifecycles | `WORKFLOW-ARCHITECTURE-v2.md` §4 (major lifecycle relationships) |
| Workflow states / transitions / failure paths | the 13 `stridelab-ai/knowledge/workflows/*/WORKFLOWS.md` category files |
| Bounded-context ownership | `stridelab-ai/application-map/bounded-contexts.md` |
| Cross-context contracts | `stridelab-ai/application-map/cross-context-contracts.md` and `WORKFLOW-ARCHITECTURE-v2.md` §8c |

## Follow-up (not blocking Workflow Architecture v2 approval)

A dedicated domain model at this path — aggregate boundaries, entity/value-object catalogue, an explicit ubiquitous-language glossary, and the invariant-to-aggregate mapping — is recommended before implementation begins (Department 01 `domain-workflow-architect`, with Department 03 for the persistence-adjacent parts). It is tracked as a distinct future work package.
