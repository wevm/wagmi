---
'wagmi': minor
---

**Breaking**: Updated `paginatedIndexesConfig` `fn` parameter return type. `fn` now returns an array instead of a single object.

```diff
import { BigNumber } from 'ethers'
import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi'

useContractInfiniteReads({
  cacheKey: 'contracts',
  ...paginatedIndexesConfig(
-    (index) => ({
+    (index) => [{
      ...mlootContractConfig,
      functionName: 'tokenURI',
      args: [BigNumber.from(index)] as const,
-    }),
+    }],
    { start: 0, perPage: 10, direction: 'increment' },
  ),
})
```
