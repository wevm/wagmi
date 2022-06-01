---
'@wagmi/core': patch
---

Added `chainId` config option to the `connect` action.

Example:

```tsx
import { connect } from '@wagmi/core'

await connect({ chainId: 69 })
```
