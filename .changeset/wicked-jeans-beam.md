---
'wagmi': minor
---

**Breaking**: The configuration passed to the `useContractWrite` hook now needs to be either:

- prepared with the `usePrepareContractWrite` hook **(new)**, or
- dangerously prepared **(previous functionality)**

> Why? [Read here](https://wagmi.sh/docs/prepare-hooks/intro)

### Prepared usage

```diff
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

+const { config } = usePrepareContractWrite({
+ addressOrName: '0x...',
+ contractInterface: wagmiAbi,
+ functionName: 'mint',
+ args: [tokenId]
+})

const { data } = useContractWrite({
- addressOrName: '0x...',
- contractInterface: wagmiAbi,
- functionName: 'mint',
- args: [tokenId],
+ ...config
})
```

### Dangerously unprepared usage

If you are not ready to upgrade to `usePrepareContractWrite`, it is possible to use `useContractWrite` without preparing the configuration first by passing `mode: 'dangerouslyUnprepared'`.

```diff
import { useContractWrite } from 'wagmi'

const { data } = useContractWrite({
+ mode: 'dangerouslyUnprepared',
  addressOrName: '0x...',
  contractInterface: wagmiAbi,
  functionName: 'mint',
  args: [tokenId],
})
```
