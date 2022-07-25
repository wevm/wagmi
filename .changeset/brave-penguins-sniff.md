---
'wagmi': minor
---

**Breaking:** The `useSendTransaction` hook's `data` now returns an object only consisting of `hash` & `wait`, and not the full [`TransactionResponse`](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse).

If you require the full `TransactionResponse`, you can use `useWaitForTransaction` with `confirmations: 0`:

```diff
import { useSendTransaction, useWaitForTransaction } from 'wagmi'

const {
  data: {
    hash,
    wait,
-   ...transaction
  }
} = useSendTransaction(...)

+const { data: transaction } = useWaitForTransaction({ confirmations: 0, hash })
```

> Why? The old implementation of `useSendTransaction` created a long-running async task, causing [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks) when invoked in a click handler.
