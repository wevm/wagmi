---
'@wagmi/core': patch
---

Added `fetchTransaction` action:

```ts
import { fetchTransaction } from '@wagmi/core'

const transaction = await fetchTransaction({
  hash: '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060',
})
```
