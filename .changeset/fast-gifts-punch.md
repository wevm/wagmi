---
'@wagmi/core': patch
---

**Breaking**: The `readContract` & `watchReadContract` function parameters have been consolidated into a singular config parameter.

Before:

```tsx
readContract(
  {
    addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    contractInterface: wagmigotchiABI,
  },
  'getHunger',
  { args: [0] },
)

watchReadContract(
  {
    addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    contractInterface: wagmigotchiABI,
  },
  'getHunger',
  { args: [0] },
  (result) => {},
)
```

After:

```tsx
readContract({
  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  contractInterface: wagmigotchiABI,
  functionName: 'getHunger',
  args: [0],
})

watchReadContract(
  {
    addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    contractInterface: wagmigotchiABI,
    functionName: 'getHunger',
    args: [0],
  },
  (result) => {},
)
```
