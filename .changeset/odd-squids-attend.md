---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking:** Removed the `chainId` parameter from `connectors` function on `createClient`.

```diff
const client = createClient({
- connectors({ chainId }) {
+ connectors() {
    ...
  }
})
```

If you previously derived RPC URLs from the `chainId` on `connectors`, you can now remove that logic as `wagmi` now handles RPC URLs internally when used with `configureChains`.

```diff
import {
  chain,
+  configureChains,
  createClient
} from 'wagmi';

+import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

+const { chains } = configureChains(
+  [chain.mainnet],
+  [publicProvider()]
+);

const client = createClient({
-  connectors({ chainId }) {
-    const chain = chains.find((x) => x.id === chainId) ?? defaultChain
-    const rpcUrl = chain.rpcUrls.alchemy
-      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
-      : chain.rpcUrls.default
-    return [
+  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
-       chainId: chain.id,
-       jsonRpcUrl: rpcUrl,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
-       rpc: { [chain.id]: rpcUrl },
      },
    }),
    new InjectedConnector({
      chains,
      options: { name: 'Injected' },
    }),
  ]
-  },
})
```
