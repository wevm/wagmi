---
'wagmi': minor
---

**Breaking**: `args` config option must now be an array for the following hooks: `useContractRead`, `useContractWrite`, `usePrepareContractWrite`, `useContractReads`, and `useContractInfiniteReads`.

```diff
import { useContractRead } from 'wagmi'

const { data } = useContractRead({
  address: '0x…',
  abi: […],
  functionName: 'balanceOf',
- args: '0x…',
+ args: ['0x…'],
})
```
