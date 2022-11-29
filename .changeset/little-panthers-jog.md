---
'@wagmi/core': minor
---

**Breaking**: Removed the `wait` argument on `waitForTransaction`. Use the transaction `hash` instead.

```diff
const data = await waitForTransaction({
- wait: transaction.wait
+ hash: transaction.hash
})
```
