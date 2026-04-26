---
'@wagmi/core': patch
---

Resolved `account` in `prepareTransactionRequest` via `getConnectorClient` so connectors with a `getClient` method can supply a signable account.
