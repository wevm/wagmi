---
'@wagmi/core': patch
'wagmi': patch
---

Import providers from `ethers` peer dependency rather than `@ethersproject/providers` to avoid multiple conflicting versions being installed
