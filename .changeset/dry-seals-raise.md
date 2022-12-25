---
'@wagmi/core': patch
'wagmi': patch
---

All Providers (ie. Alchemy, Infura, Public) now use the ENS Registry address on the wagmi `Chain` object (`chain.contracts.ensRegistry`).
