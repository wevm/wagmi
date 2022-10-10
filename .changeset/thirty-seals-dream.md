---
'@wagmi/core': minor
---

**Breaking**: `watchContractEvent` now accepts a configuration object and callback instead of positional arguments.

```diff
import { watchContractEvent } from '@wagmi/core'

- const unsubscribe = watchContractEvent(
-   {
-     address: '0x…',
-     abi: […],
-   },
-   'Transfer',
-   (from, to, tokenId) => {
-     // ...
-   },
-   { once: true },
- )
+ const unsubscribe = watchContractEvent(
+   {
+     address: '0x…',
+     abi: […],
+     eventName: 'Transfer',
+     once: true,
+   },
+   (from, to, tokenId) => {
+     // ...
+   },
+ )
```
