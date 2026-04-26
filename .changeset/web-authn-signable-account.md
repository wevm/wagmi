---
'@wagmi/core': patch
---

Updated `webAuthn` connector's `getClient` to return a signable account via `provider.getAccount({ signable: true })`.
