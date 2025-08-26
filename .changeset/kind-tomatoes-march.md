---
"@wagmi/connectors": patch
---

Fixed `walletConnect#connect` by moving chain switch directly inside instead of relying on `getProvider`.
