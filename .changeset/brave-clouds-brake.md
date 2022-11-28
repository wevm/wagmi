---
'@wagmi/core': patch
'wagmi': patch
---

Fixed an issue where `persister` would still use `window.localStorage` instead of the wagmi `storage`.
