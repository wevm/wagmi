---
"@wagmi/core": patch
"wagmi": patch
---

Fixed Tempo token queries (`getAllowance`, `getBalance`, `getMetadata`, `getRoleAdmin`, `hasRole`, `amm.getPool`) and token watch hooks staying disabled when passed token ID `0n` (pathUSD).
