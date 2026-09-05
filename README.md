# StrideLab

StrideLab is an iOS-first track-and-field coaching platform for planning, practice execution, video analysis, communication, workout logging, and performance review.

## Repository architecture

- `apps/` — deployable composition roots
- `domains/` — product bounded contexts
- `platform/` — shared technical infrastructure
- `services/` — independently deployable workloads
- `packages/` — reusable cross-cutting libraries
- `stridelab-ai/` — AI development/orchestration system
- `docs/` — maintainable project documentation
- `infrastructure/` — deployment/environment configuration

## Architectural rule

Apps compose. Domains own features. Platform provides infrastructure. Services isolate independently scalable workloads.

Production implementation is intentionally minimal in this scaffold.
