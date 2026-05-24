---
"@wagmi/core": patch
---

fix(core): prevent distributive conditional type in `GetClientReturnType`

Wrap the conditional in `GetClientReturnType` with tuple types to prevent TypeScript from distributing over multi-chain `resolvedChainId` unions. This allows the client returned by `getClient` to be passed directly into viem actions like `waitForTransactionReceipt`, `getBlock`, and `getTransaction` when the config has multiple chains.
