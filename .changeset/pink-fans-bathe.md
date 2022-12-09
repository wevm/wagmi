---
'@wagmi/core': patch
'wagmi': patch
---

Fixed an issue where the wagmi client wouldn't rehydrate the store in local storage when `autoConnect` is truthy.
