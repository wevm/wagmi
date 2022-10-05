---
'@wagmi/core': minor
---

**Breaking**: `addressOrName` and `contractInterface` renamed to `address` and `abi` respectively for contract actions: `getContract`, `multicall`, `prepareWriteContract`, `readContract`, `readContracts`, `watchContractEvent`, `watchMulticall`, `watchReadContract`, `watchReadContracts`, `writeContract`.

```diff
import { readContract } from '@wagmi/core'

const result = await readContract({
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
- import { readContract } from '@wagmi/core'
+ import { fetchEnsAddress, readContract } from '@wagmi/core'

+ const address = await fetchEnsAddress('example.eth')
const result = await readContract({
- addressOrName: 'example.eth',
+ address,
  abi: […] as const,
  functionName: 'balanceOf',
  args: ['0x…'],
})
```
