---
'wagmi': minor
---

Added the `usePrepareSendTransaction` hook that eagerly fetches the parameters required for sending a transaction such as the gas estimate and resolving an ENS address (if required).

It returns config to be passed through to `useSendTransaction`.

```ts
import { usePrepareSendTransaction, useSendTransaction } from '@wagmi/core'

const { config } = usePrepareSendTransaction({
  request: {
    to: 'moxey.eth',
    value: parseEther('1'),
  },
})
const { sendTransaction } = useSendTransaction(config)
```
