---
"@wagmi/core": patch
---

Added timeout to internal call of `'wallet_revokePermissions'` request during `injected#disconnect` as some wallets that do not support this method hang.
