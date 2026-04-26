---
'@wagmi/core': patch
---

`prepareTransactionRequest` now resolves the account via `getConnectorClient` when no `account` is provided. This lets connectors that implement `getClient` (e.g. `webAuthn`) supply a local signing account instead of falling back to a json-rpc account. Also updated the `webAuthn` connector's `getClient` to return a signable account via `provider.getAccount({ signable: true })`.
