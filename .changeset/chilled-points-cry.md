---
'wagmi': minor
---

**Breaking**: The configuration passed to the `useSendTransaction` hook now needs to be either:

- prepared with the `usePrepareSendTransaction` hook **(new)**, or
- dangerously prepared **(previous functionality)**

> Why? [Read here](https://wagmi.sh/docs/prepare-hooks/intro)

### Prepared usage

```diff
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'

+const { config } = usePrepareSendTransaction({
+  request: {
+    to: 'moxey.eth',
+    value: parseEther('1'),
+  }
+})

const { data } = useSendTransaction({
- request: {
-   to: 'moxey.eth',
-   value: parseEther('1')
- }
+ ...config
})
```

### Dangerously unprepared usage

If you are not ready to upgrade to `usePrepareSendTransaction`, it is possible to use `useSendTransaction` without preparing the configuration first by passing `mode: 'dangerouslyUnprepared'`.

```diff
import { useSendTransaction } from 'wagmi'

const { data } = useSendTransaction({
+ mode: 'dangerouslyUnprepared',
  request: {
    to: 'moxey.eth',
    value: parseEther('1'),
  }
})
```
