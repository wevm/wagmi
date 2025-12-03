---
"wagmi": minor
"@wagmi/vue": patch
---

Deprecated custom mutate function names and renamed to `mutate`/`mutateAsync` to reduce destructure key renaming fatigue and align with TanStack Query terminology.

**Before**

Had to destructure hook result and often rename keys when using multiple of the same hook. Could decide not to destructure, but syntax becomes awkward for mutate functions (e.g. `connect.connect` or `connect.connectAsync`).

```ts
const { connect, isPending: connectIsPending } = useConnect()
const { writeContract: transfer, error: transferError, isPending: transferIsPending } = useWriteContract()
const { writeContract: approve, error: approveError } = useWriteContract()
```

**After**

Allows you to name the hook result whatever you want and not worry about also renaming properties.

```ts
const connect = useConnect() // connect.isPending
const transfer = useWriteContract() // transfer.mutate, transfer.error, transfer.isPending
const approve = useWriteContract() // approve.mutate, approve.error
```
