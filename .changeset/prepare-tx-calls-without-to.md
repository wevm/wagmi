---
'@wagmi/core': patch
---

fix: allow `prepareTransactionRequest` with `calls` and no top-level `to`

`prepareTransactionRequest` (both the action and query options) previously required a top-level `to` parameter, which made it impossible to use with batched `calls` where each call carries its own `to`. This aligns with viem's `prepareTransactionRequest` which does not require `to` when `calls` is provided.
