---
"@wagmi/core": patch
"wagmi": patch
---

Fixed an issue where `eth_requestAccounts` would be called upon reconnect instead of `eth_accounts`.
