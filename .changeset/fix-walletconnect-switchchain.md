---
"@wagmi/connectors": patch
---

fix(WalletConnect): validate projectId at creation and remove change event listener on switchChain error

- Reject empty/whitespace projectId with clear error message immediately at connector creation
- Remove change event listener on all switchChain error paths (user rejection, network error, RPC timeout)

Fixes #5033
Fixes #5032
Fixes #5031 (closes #5030)
