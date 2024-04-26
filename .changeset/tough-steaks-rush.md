---
"@wagmi/core": patch
---

Added workaround to injected connector for MetaMask bug, where chain switching does not work if target chain RPC `'net_version'` request fails.
