---
'@wagmi/core': patch
---

Added the `prepareSendTransaction` hook that prepares the parameters required for sending a transaction.

It returns config to be passed through to `sendTransaction`.

```ts
import { prepareSendTransaction, sendTransaction } from '@wagmi/core'

const config = await prepareSendTransaction({
  request: {
    to: 'moxey.eth',
    value: parseEther('1'),
  },
})
const result = await sendTransaction(config)
```
