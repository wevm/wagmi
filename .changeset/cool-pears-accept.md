---
'@wagmi/core': minor
---

**Breaking**: `prepareSendTransaction` now throws when a `chainId` is specified and the end-user is on a different chain id (the wrong network).