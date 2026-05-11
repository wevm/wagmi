---
'@wagmi/core': patch
---

**Breaking(`wagmi/tempo`):** Removed the `signable` setup parameter from Tempo connectors. The connector now always hands viem the root account in `getClient` and the SDK provider performs signing orchestration internally.
