---
'@wagmi/core': patch
'wagmi': patch
---

Added `switchChainOnConnect` option to `CoinbaseWalletConnector`, `InjectedConnector` and `MetaMaskConnector`.

This option allows the consumer to prompt the user to switch chain on connection. If the user is connected to an unsupported chain, they will be prompted to switch chain.

Example:

```tsx
import { chain } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const connector = new MetaMaskConnector({
  chains: [chain.mainnet, chain.optimism],
  switchChainOnConnect: true,
})
```
