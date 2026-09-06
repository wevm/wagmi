---
"@wagmi/core": patch
---

Fixed reconnect getting stranded when `isAuthorized` rejects, so status cleanup runs and later reconnect attempts can proceed.
