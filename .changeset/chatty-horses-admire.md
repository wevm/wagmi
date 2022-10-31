---
'@wagmi/core': minor
---

**Breaking**: `addressOrName` renamed to `address` for `fetchBalance` and `fetchEnsAvatar`.

```diff
const result = await fetchBalance({
- addressOrName: '0x…',
+ address: '0x…',
})
```

If you were using an ENS name instead of an address, you can resolve the name to an address before passing it to the action.

```diff
+ const { data: address } = await fetchEnsAddress({ name: 'example.eth' })
const result = await fetchBalance({
- addressOrName: 'example.eth',
+ address,
})
```
