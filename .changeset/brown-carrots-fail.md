---
'wagmi': patch
---

Added an `isDataEqual` config option to `useContractRead`, `useContractReads` & `useContractInfiniteReads` to define whether or not that data has changed. Defaults to `deepEqual`.
