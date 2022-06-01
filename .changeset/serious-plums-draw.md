---
'@wagmi/core': minor
---

**Breaking**: The `writeContract` function parameters have been consolidated into a singular config parameter.

Before:

```tsx
writeContract(
  {
    addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    contractInterface: wagmigotchiABI,
  },
  'feed',
)
```

After:

```tsx
readContract({
  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  contractInterface: wagmigotchiABI,
  functionName: 'feed',
})
```
