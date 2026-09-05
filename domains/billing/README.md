# billing

StrideLab bounded context.

## Ownership
This module owns its domain semantics and public contracts. Other bounded contexts should consume exposed contracts/services instead of reaching into internal implementation details.

## Standard internal layout
- `domain/` — entities, value objects, invariants, pure domain behavior
- `application/` — use cases and orchestration
- `contracts/` — public interfaces/events/types
- `infrastructure/` — adapters/persistence implementations
- `mobile/` — mobile-facing adapters/components when domain-owned
- `web/` — web-facing adapters/components when domain-owned
- `tests/` — domain/application verification
