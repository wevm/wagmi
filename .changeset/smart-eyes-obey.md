---
'wagmi': minor
---

**Breaking**: Updated TypeScript generics for contract and typed data hooks.

Adding a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to `abi` allows TypeScript to infer `functionName`, `args`, `overrides`, and return types for functions, and `eventName` and `listener` types for events.

```diff
import { useContractRead } from 'wagmi'

const result = useContractRead({
  address: '0x…',
- abi: […],
+ abi: […] as const,
  functionName: 'balanceOf', // will autocomplete and catch typos
  args: ['0x…'], // inferred based on `abi`, `functionName`, `args`
})
result.data // inferred based on `functionName`
```

This works for the following actions: `useContractRead`, `useContractWrite`, `usePrepareContractWrite`, `useContractReads`, `useContractInfiniteReads`, and `useContractEvent`.

Adding a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to `useSignTypedData`'s config option, `types`, allows TypeScript to infer `value`.

```diff
import { useSignTypedData } from 'wagmi'

const result = useSignTypedData({
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
- },
+ } as const,
  value: { // `value` is inferred based on `types`
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```
