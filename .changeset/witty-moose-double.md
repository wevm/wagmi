---
'wagmi': patch
---

Fixed an issue where transforming `useContractRead`, `useContractReads` or `useContractInfiniteReads`'s return data via `select` wasn't inferring the type.
