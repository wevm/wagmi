---
'@wagmi/core': minor
---

**Breaking**: `watchContractEvent` now accepts a single configuration object instead of position arguments.

```diff
import { watchContractEvent } from '@wagmi/core'

- const unsubscribe = watchContractEvent(
-   {
-     addressOrName: '0x…',
-     contractInterface: […],
-   },
-   'Transfer',
-   (from, to, tokenId) => {
-     // ...
-   },
-   { once: true },
- )
+ const unsubscribe = watchContractEvent({
+   addressOrName: '0x…',
+   contractInterface: […],
+   eventName: 'Transfer',
+   listener(from, to, tokenId) {
+     // ...
+   },
+   once: true,
+ })
```
