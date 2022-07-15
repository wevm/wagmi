---
'@wagmi/core': patch
---

Added the `prepareWriteContract` hook that prepares the parameters required for a contract write transaction.

It returns config to be passed through to `writeContract`.

Example:

```tsx
import { prepareWriteContract, writeContract } from '@wagmi/core'

const config = await prepareWriteContract({
  addressOrName: '0x...',
  contractInterface: wagmiAbi,
  functionName: 'mint',
})
const result = await writeContract(config)
```
