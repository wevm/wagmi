---
'wagmi': minor
---

**Breaking**: The `useContractRead` hook parameters have been consolidated into a singular config parameter.

Before:

```tsx
useContractRead(
  {
    addressOrName: wagmigotchiContractAddress,
    contractInterface: wagmigotchiABI,
  },
  'love',
  { args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c' },
)
```

After:

```tsx
useContractRead({
  addressOrName: wagmigotchiContractAddress,
  contractInterface: wagmigotchiABI,
  functionName: 'love',
  args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
})
```
