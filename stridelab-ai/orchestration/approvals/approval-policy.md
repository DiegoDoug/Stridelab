# Approval Policy

## Explicit human approval required

- locking, changing, or superseding major product/architecture decisions;
- accepting a security exception or weakened security boundary;
- accepting unresolved legal/compliance risk as final;
- changing production secrets/credentials;
- destructive or irreversible production data/account operations;
- production release/promotion;
- disabling required safety/privacy/compliance controls.

## AI may perform without separate approval when authorized by the task

- research;
- draft artifacts;
- implementation in non-production workspaces;
- tests and reviews;
- reversible local/dev/staging changes within approved scope.

## Approval record

An approval must identify:
- artifact/action;
- approver;
- scope;
- conditions;
- date/version when available.

Silence is not approval.
