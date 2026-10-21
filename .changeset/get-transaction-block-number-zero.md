---
"@wagmi/core": patch
---

Fixed `getTransaction` query being disabled for `blockNumber: 0n` (genesis), which is a valid input but was treated as falsy alongside a valid `index`.
