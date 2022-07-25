---
'@wagmi/core': minor
---

**Breaking:** The `sendTransaction` action now returns an object only consisting of `hash` & `wait`, and not the full [`TransactionResponse`](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse).

If you require the full `TransactionResponse`, you can use `fetchTransaction`:

```diff
import { sendTransaction, fetchTransaction } from '@wagmi/core'

const {
  hash,
  wait,
- ...transaction
} = sendTransaction(...)

+const transaction = fetchTransaction({ hash })
```

> Why? The old implementation of `sendTransaction` created a long-running async task, causing [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks) when invoked in a click handler.
