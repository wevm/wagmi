---
"@wagmi/core": patch
---

Fixed `simulateContractQueryOptions` requiring a connector when `account` is provided, which kept `useSimulateContract` disabled for an explicit `account` without a connected wallet.
