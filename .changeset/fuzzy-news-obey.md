---
'wagmi': minor
---

Added the `usePrepareContractWrite` hook that eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate.

It returns config to be passed through to `useContractWrite`.

```ts
const { config } = usePrepareContractWrite({
  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  contractInterface: wagmigotchiABI,
  functionName: 'feed',
})
const { write } = useContractWrite(config)
```
