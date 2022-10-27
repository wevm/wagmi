---
'@wagmi/core': patch
'wagmi': patch
---

Fixed an issue where `client.chains` (active connector chains) would be populated when there is no active connector (disconnected user).
