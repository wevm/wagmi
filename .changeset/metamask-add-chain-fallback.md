---
'@wagmi/connectors': patch
---

Added a MetaMask switch-chain fallback that requests `wallet_addEthereumChain` when the target chain is missing.
