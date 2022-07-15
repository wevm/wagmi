---
'wagmi': minor
---

**Breaking:** When `useSendTransaction` is in "prepare mode" (used with `usePrepareSendTransaction`), `sendTransaction`/`sendTransactionAsync` will be `undefined` until the configuration has been prepared. Ensure that your usage reflects this.

```tsx
const { config } = usePrepareSendTransaction({ ... })
const { sendTransaction } = useSendTransaction(config)

<button
  disabled={!sendTransaction}
  onClick={() => sendTransaction?.()}
>
  Send
</button>
```
