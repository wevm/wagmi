---
'wagmi': minor
---

**Breaking:** The `sendTransaction`/`sendTransactionAsync` configuration object has now been altered to only accept "dangerous" configuration. If one or more of these values are set, it can lead to [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).

```diff
<button
  onClick={() => {
    sendTransaction({
-     request: {
+     dangerouslySetRequest:
        to: 'moxey.eth',
        value: parseEther('1')
      }
    })
  }}
>
  Send
</button>
```
