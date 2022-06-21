---
'wagmi': minor
---

**Breaking**: The `useContractWrite` hook parameters have been consolidated into a singular config parameter.

Before:

```tsx
useContractWrite(
  {
    addressOrName: mlootContractAddress,
    contractInterface: mlootABI,
  },
  'claim',
)
```

After:

```tsx
useContractWrite({
  addressOrName: mlootContractAddress,
  contractInterface: mlootABI,
  functionName: 'claim',
})
```
