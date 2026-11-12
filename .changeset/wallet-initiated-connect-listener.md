---
"@wagmi/core": patch
---

Fixed wallet-initiated connections leaving the `connect` listener attached, so a later account change on that connector was handled as a new connection and could replace the active connector.
