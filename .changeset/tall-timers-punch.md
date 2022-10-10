---
'@wagmi/core': minor
---

**Breaking**: `args` config option must now be an array for the following actions: `readContract`, `writeContract`, `prepareWriteContract`, `multicall`, `readContracts`, `watchMulticall`, and `watchReadContracts`.

```diff
import { readContract } from '@wagmi/core'

const result = await readContract({
  address: '0x…',
  abi: […],
  functionName: 'balanceOf',
- args: '0x…',
+ args: ['0x…'],
})
```
