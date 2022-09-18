---
'wagmi': minor
---

**Breaking**: `usePrepareSendTransaction` now throws when a `chainId` is specified and the end-user is on a different chain id (the wrong network).

If you wish to defer this check until the click handler is pressed, you can place `chainId` in `useContractWrite` instead:

```diff
import { usePrepareSendTransaction, useContractWrite } from 'wagmi'
import { optimism } from 'wagmi/chains'

// ...

const { config } = usePrepareSendTransaction({
  request: {
    to: 'moxey.eth',
    value: parseEther('1'),
  },
})
const { sendTransaction } = useSendTransaction({ 
  ...config,
+ chainId: optimism.id
})

```
