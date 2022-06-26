---
'@wagmi/core': patch
---

Added `chainId` config parameter for `writeContract` and `sendTransaction`.

If `chainId` is provided, the connector will validate that `chainId` is the active chain before sending a transaction (and switch to `chainId` if necessary).
