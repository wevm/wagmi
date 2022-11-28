---
'@wagmi/core': patch
---

Added `getProvider` to `InjectedConnector` options.

Example: 

```ts
import { InjectedConnector } from '@wagmi/core/connectors/injected'

const connector = new InjectedConnector({
  options: {
    name: 'SubWallet',
    getProvider: () =>
      typeof window !== 'undefined' ? window.SubWallet : undefined,
  },
})
