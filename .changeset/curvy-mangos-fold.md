---
'wagmi': minor
---

**Breaking**: The `useContractEvent` hook parameters have been consolidated into a singular config parameter.

Before:

```tsx
useContractEvent(
  {
    addressOrName: uniContractAddress,
    contractInterface: erc20ABI,
  },
  'Transfer',
  listener,
),
```

After:

```tsx
useContractEvent({
  addressOrName: uniContractAddress,
  contractInterface: erc20ABI,
  eventName: 'Transfer',
  listener,
})
```
