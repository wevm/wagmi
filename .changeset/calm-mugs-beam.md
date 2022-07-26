---
'@wagmi/core': minor
---

**Breaking**: The configuration passed to the `sendTransaction` action now needs to be:

- prepared with the `prepareSendTransaction` action **(new functionality)**, or
- recklessly unprepared **(previous functionality)**

> Why? [Read here](https://wagmi.sh/docs/prepare-hooks/intro)

### Prepared usage

```diff
import { prepareSendTransaction, sendTransaction } from '@wagmi/core'

+const config = await prepareSendTransaction({
+  request: {
+    to: 'moxey.eth',
+    value: parseEther('1'),
+  }
+})

const result = await sendTransaction({
- request: {
-   to: 'moxey.eth',
-   value: parseEther('1')
- }
+ ...config
})
```

### Recklessly unprepared usage

It is possible to use `sendTransaction` without preparing the configuration first by passing `mode: 'recklesslyUnprepared'`.

```diff
import { sendTransaction } from '@wagmi/core'

const result = await sendTransaction({
+ mode: 'recklesslyUnprepared',
  request: {
    to: 'moxey.eth',
    value: parseEther('1'),
  }
})
```
