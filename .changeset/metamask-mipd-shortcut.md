---
"@wagmi/connectors": patch
---

Improved the `metaMask` connector to answer pre-connect probe methods from an announced EIP-6963 MetaMask provider when available, avoiding an SDK import just to check extension state.
