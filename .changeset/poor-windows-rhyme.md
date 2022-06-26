---
'wagmi': patch
---

Added `chainId` config parameter for `useContractWrite` and `useSendTransaction`.

If `chainId` is provided, the connector will validate that `chainId` is the active chain before sending a transaction (and switch to `chainId` if necessary).
