---
"@wagmi/core": patch
---

Fixed `reconnect` getting stuck in `reconnecting` when a connector's `isAuthorized` rejects.
