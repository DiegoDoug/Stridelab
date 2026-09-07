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

A dedicated domain model at this path — aggregate boundaries, entity/value-object catalogue, an explicit ubiquitous-language glossary, and the invariant-to-aggregate mapping — is a distinct future work package.

| Attribute | Value |
|---|---|
| **Downstream owner** | Department 01 `domain-workflow-architect` (skill: `domain-modeling`), with Department 03 (`database-engineer`) for the persistence-adjacent parts (aggregate/transaction boundaries). |
| **Precise blocking stage** (conservative default — see note) | The orchestrator's conservative reading of the G4 contract ("approved contracts implemented"): the consolidated domain model should exist before **G4 (Implementation Integrity) sign-off for any bounded context** — before a schema, API contract shape, or client-feature design is *approved* for that context. It does **not** block G7 approval of Workflow Architecture v2, and it does **not** block the *seam identification* already completed at G2 (the 14 cross-context contract seams in `stridelab-ai/application-map/cross-context-contracts.md`); it is an input to turning those seams into concrete shapes at G4. This sequencing is a safe default offered for human ratification, not an approved decision — Department 01 may confirm, relax, or tighten it. |
| **Why it is a stub, not a gap** | Per the `workflow-architecture` SKILL output contract, lifecycle-scale work must produce `docs/product/workflow-architecture.md`; a separate `domain-model.md` is not a required Phase 01 deliverable. The domain concepts, ownership rules, invariants, lifecycles, and workflow states exist in full in the artifacts listed above — this file marks where the *consolidated* model will live, and is not claimed as complete. |
| **Evidence to close** | An authored domain model at this path covering the four items above, reviewed by Department 01 and (for persistence-adjacent boundaries) Department 03. |
