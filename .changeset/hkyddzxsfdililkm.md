---
"@wagmi/connectors": patch
---

Fixed WalletConnect connector silently ignoring an empty or whitespace-only `projectId`. Now throws a `BaseError` with a helpful message at connector creation time rather than failing silently during connection.
