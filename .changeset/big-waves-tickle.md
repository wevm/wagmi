---
'@wagmi/core': patch
'wagmi': patch
---

Added `allowConnectToUnsupportedChain` option to `CoinbaseWalletConnector`, `InjectedConnector` and `MetaMaskConnector`.

This option allows the consumer to restrict a user to connecting to an unsupported chain on connection. If the user is connected to an unsupported chain, they will be prompted to switch chain.

Example:

```tsx
import { chain } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const connector = new MetaMaskConnector({
  allowConnectToUnsupportedChain: false,
  chains: [chain.mainnet, chain.optimism],
})
```
