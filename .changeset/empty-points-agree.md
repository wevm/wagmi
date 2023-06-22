---
'@wagmi/core': patch
'wagmi': patch
---

Fixed an issue where synchronous switch chain behavior (WalletConnect v2) would encounter chain id race conditions in `watchWalletClient`.
