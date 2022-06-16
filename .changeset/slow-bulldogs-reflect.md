---
'@wagmi/core': patch
---

Fixed an issue where the wagmi client's `status` would not update from `"disconnected"` to `"connecting" -> "connected"` when the `connect` action is invoked.
