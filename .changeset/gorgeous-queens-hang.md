---
'wagmi': minor
---

**Breaking**: `usePrepareContractWrite` now throws when a `chainId` is specified and the end-user is on a different chain id (the wrong network).

If you wish to defer this check until the click handler is pressed, you can place `chainId` in `useContractWrite` instead:

```diff
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { optimism } from 'wagmi/chains'

// ...

const { config } = usePrepareContractWrite({
  addressOrName: '0xaf0326d92b97df1221759476b072abfd8084f9be',
  contractInterface: ['function mint()'],
  functionName: 'mint',
})
const { write } = useContractWrite({ 
  ...config,
+ chainId: optimism.id
})

```