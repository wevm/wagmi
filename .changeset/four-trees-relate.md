---
'@wagmi/core': patch
'wagmi': patch
---

Fixed race condition between `switchNetwork` and mutation Actions that use `chainId` (e.g. `sendTransaction`). Thanks @DanInTheD4rk!