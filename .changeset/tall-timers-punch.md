---
'@wagmi/core': minor
---

**Breaking**: `args` config option must now be an array for the following actions: `readContract`, `writeContract`, `prepareWriteContract`, `multicall`, `readContracts`, `watchMulticall`, `watchReadContracts`.

```diff
import { readContract } from '@wagmi/core'

const result = await readContract({
  addressOrName: '0x…',
  contractInterface: […],
  functionName: 'balanceOf',
- args: '0x…',
+ args: ['0x…'],
})
```
