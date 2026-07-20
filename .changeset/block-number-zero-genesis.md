---
"@wagmi/core": patch
---

Fixed `getBalance` and `getTransactionCount` querying the wrong block for `blockNumber: 0n` (genesis), which is a valid input but was treated as falsy and fell back to `blockTag: 'latest'`.
