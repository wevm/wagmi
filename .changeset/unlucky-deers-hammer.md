---
'@wagmi/core': minor
'wagmi': minor
---

Add `configureChains` API.

The `configureChains` function allows you to configure your chains with a selected API provider (Alchemy, Infura, JSON RPC, Public RPC URLs). This means you don't have to worry about deriving your own RPC URLs for each chain, or instantiating a Ethereum Provider.

`configureChains` accepts 3 parameters: an array of chains, and an array of API providers, and a config object.

[Learn more about configuring chains & API providers.](https://wagmi.sh/docs/api-providers/configuring-chains)

### Before

```tsx
import { providers } from 'ethers'
import { Provider, chain, createClient, defaultChains } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const alchemyId = process.env.ALCHEMY_ID

const chains = defaultChains
const defaultChain = chain.mainnet

const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain
    const rpcUrl = chain.rpcUrls.alchemy
      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
      : chain.rpcUrls.default
    return [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
          chainId: chain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          rpc: { [chain.id]: rpcUrl },
        },
      }),
      new InjectedConnector({
        chains,
        options: { name: 'Injected' },
      }),
    ]
  },
  provider: ({ chainId }) => new providers.AlchemyProvider(chainId, alchemyId),
})
```

### After

```tsx
import { Provider, chain, createClient, defaultChains } from 'wagmi'

import { alchemyProvider } from 'wagmi/apiProviders/alchemy'
import { publicProvider } from 'wagmi/apiProviders/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const alchemyId = process.env.ALCHEMY_ID

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: { name: 'Injected' },
    }),
  ],
  provider,
  webSocketProvider,
})
```
