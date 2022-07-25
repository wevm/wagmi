---
'wagmi': patch
---

Added `useTransaction` hook:

```ts
import { useTransaction } from 'wagmi'

const result = useTransaction({
  hash: '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060',
})
```
