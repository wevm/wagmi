---
'wagmi': minor
---

**Breaking**: Removed the `wait` config option on `useWaitForTransaction`. Use the transaction `hash` instead.

```diff
const { data } = useWaitForTransaction({
- wait: transaction.wait
+ hash: transaction.hash
})
```
