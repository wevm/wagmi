---
"@wagmi/cli": patch
---

Fixed `foundry` plugin `includeBroadcasts` skipping the contracts listed under a transaction's `additionalContracts`. Foundry writes their address as `address`, not `contractAddress`.
