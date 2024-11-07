---
"@wagmi/core": patch
---

Fixed `injected` connector race condition after calling `'wallet_addEthereumChain'` in `switchChain`.
