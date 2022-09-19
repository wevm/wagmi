---
'@wagmi/core': patch
---

The `fetchSigner` action now accepts an optional `chainId` to use for signer initialization as an argument.

```tsx
import { fetchSigner } from '@wagmi/core'
import { optimism } from '@wagmi/core/chains'

// ...

fetchSigner({ chainId: optimism.id })
```