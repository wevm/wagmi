---
'@wagmi/core': patch
'wagmi': patch
---

Fixed an issue where `useProvider` & `getProvider` were not returning referentially equal providers.