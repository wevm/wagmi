---
"@wagmi/core": patch
---

Fixed `waitForTransactionReceipt` staying pending on a reverted transaction. The revert-reason lookup (`getTransaction` + replay `eth_call`) is now bounded by a timeout — the caller's `timeout` when provided, otherwise a default — so a lookup that fails, errors, or hangs (e.g. a `fallback` transport advancing to an unhealthy RPC) still settles the reverted-transaction path instead of leaving the query pending. The success path is unchanged and makes no extra calls, and a revert reason is still surfaced when the lookup returns one (wevm/wagmi#4972).
