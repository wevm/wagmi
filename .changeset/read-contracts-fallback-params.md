---
"@wagmi/core": patch
---

Fixed `readContracts` dropping `account`, `stateOverride`, `blockHash` and other call parameters when falling back to individual `readContract` calls (e.g. on chains without Multicall3).
