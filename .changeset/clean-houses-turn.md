---
'@wagmi/core': minor
---

**Breaking**: `watchSigner` now requires an arguments object (that accepts an optional `chainId`) as it's first parameter.

```diff
import { watchSigner } from `@wagmi/core`

-watchSigner(signer => {
+watchSigner({}, signer => {
  console.log('new signer!', signer)
})
```