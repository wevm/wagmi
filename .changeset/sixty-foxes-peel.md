---
'wagmi': minor
---

**Breaking**: `addressOrName` and `contractInterface` renamed to `address` and `abi` respectively for contract hooks: `useContract`, `useContractEvent`, `useContractRead`, `useContractReads`, `useContractInfiniteReads`, `useContractWrite`, `usePrepareContractWrite`.

```diff
import { useContractRead } from 'wagmi'

const result = useContractRead({
- addressOrName: '0x…',
+ address: '0x…',
- contractInterface: […] as const,
+ abi: […] as const,
  functionName: 'balanceOf',
  args: ['0x…'],
})
```

If you were using an ENS name instead of an address, you can resolve the name to an address before passing it to the action.

```diff
- import { useContractRead } from 'wagmi'
+ import { useContractRead, useEnsAddress } from 'wagmi'

+ const { data: address} = useEnsAddress({ name: 'example.eth'})
const result = useContractRead({
- addressOrName: 'example.eth',
+ address,
  abi: […],
  functionName: 'balanceOf',
  args: ['0x…'],
})
```
