---
"@wagmi/core": patch
---

Fixed `getTransaction` query being disabled for transaction `index: 0`, which is a valid input (the first transaction in a block) but was treated as falsy.
