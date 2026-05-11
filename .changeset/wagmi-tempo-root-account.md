---
'@wagmi/core': patch
'wagmi': patch
---

Fixed Tempo connectors leaking access-key flavored accounts into viem's transaction prep. `getClient` now passes `accessKey: false` to `provider.getAccount` so viem always sees the root account; the SDK provider continues to perform access-key orchestration internally before signing. The unused `signable` setup parameter has been removed.
