---
'@wagmi/core': minor
---

**Breaking:** The `sendTransaction` action now returns an object only consisting of `hash` & `wait`, and not the full [`TransactionResponse`](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse).

If you require the full `TransactionResponse`, you can use `waitForTransaction` with `confirmations: 0`:

```diff
import { sendTransaction, waitForTransaction } from '@wagmi/core'

const {
  hash,
  wait,
- ...transaction
} = sendTransaction(...)

+const transaction = waitForTransaction({ confirmations: 0, hash })
```

> Why? The old implementation of `sendTransaction` created a long-running async task, causing [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks) when invoked in a click handler.
