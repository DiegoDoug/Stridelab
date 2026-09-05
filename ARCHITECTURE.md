# StrideLab Architecture

## Decision

StrideLab uses a **domain-driven modular monolith in a monorepo**, with independently deployable media-processing workers and a native iOS media subsystem. Bounded contexts are designed so service extraction remains possible when operational evidence justifies it.

## Repository boundaries

```text
apps/       deployable composition roots
domains/    product bounded contexts and business capabilities
platform/   technical infrastructure
services/   independently deployable workloads
packages/   reusable cross-cutting libraries
```

## Dependency direction

Applications may compose domain modules and platform adapters. Domain modules must not depend on application shells. Cross-domain access should use public contracts/application services rather than internal persistence details.

## Native media subsystem

Advanced iOS capture/playback/annotation capabilities may use Swift modules surfaced to the React Native product layer. The native layer remains a subsystem, not a second product architecture.

## AI system

`stridelab-ai/` is development-time infrastructure only. It must never become production runtime code.
