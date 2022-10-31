---
'wagmi': minor
---

**Breaking**: `addressOrName` renamed to `address` for `useBalance` and `useEnsAvatar`.

```diff
const result = useBalance({
- addressOrName: '0x…',
+ address: '0x…',
})
```

If you were using an ENS name instead of an address, you can resolve the name to an address before passing it to the action.

```diff
+ const { data: address } = useEnsAddress({ name: 'example.eth' })
const result = useBalance({
- addressOrName: 'example.eth',
+ address,
})
```
