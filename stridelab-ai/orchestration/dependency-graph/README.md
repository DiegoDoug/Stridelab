# Cross-Department Dependency Graph

Primary flow for a material feature:

```text
D01 requirements/workflow
   ↓
D04 policy requirements ─────┐
   ↓                         │
D02 client implementation    │
D03 platform/data implementation
   ↓
D05 verification/readiness
   ↓
D06 knowledge/release records where applicable
```

D06 billing/entitlement requirements may feed D02/D03.
D04 may gate every downstream stage when protected data, minors, identity, UGC, or compliance are affected.
