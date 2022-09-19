---
'wagmi': patch
---

The `useSigner` hook now accepts an optional `chainId` to use for signer initialization as an argument.

```tsx
import { useSigner } from 'wagmi'
import { optimism } from 'wagmi/core'

// ...

useSigner({ chainId: optimism.id })
```
