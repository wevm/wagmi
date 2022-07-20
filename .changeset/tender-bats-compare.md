---
'wagmi': minor
---

**Breaking:** When `useContractWrite` is in "prepare mode" (used with `usePrepareContractWrite`), `write`/`writeAsync` will be `undefined` until the configuration has been prepared. Ensure that your usage reflects this.

```tsx
const { config } = usePrepareContractWrite({ ... })
const { write } = useContractWrite(config)

<button
  disabled={!write}
  onClick={() => write?.()}
>
  Send
</button>
```
