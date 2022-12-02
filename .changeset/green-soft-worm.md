---
'wagmi': patch
---

Function for selecting the [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) Ethereum Provider to target. Defaults to `() => typeof window !== 'undefined' ? window.ethereum : undefined`.

```ts
import { InjectedConnector } from 'wagmi/connectors/injected'

const connector = new InjectedConnector({
  options: {
    name: 'My Injected Wallet',
    getProvider: () =>
      typeof window !== 'undefined' ? window.myInjectedWallet : undefined,
  },
})
```
