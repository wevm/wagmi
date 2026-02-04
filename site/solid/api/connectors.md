# Connectors

Connectors allow you to connect to different wallets. They are used with the [`useConnect`](/solid/api/primitives/useConnect) primitive.

## Import

```ts
import { injected } from '@wagmi/solid/connectors'
```

## Available Connectors

- [`baseAccount`](/solid/api/connectors/baseAccount) - Connect to Base Account smart accounts
- [`gemini`](/solid/api/connectors/gemini) - Connect to Gemini Wallet
- [`injected`](/solid/api/connectors/injected) - Connect to browser-injected wallets like MetaMask
- [`metaMask`](/solid/api/connectors/metaMask) - Connect to MetaMask wallet
- [`mock`](/solid/api/connectors/mock) - Mock connector for testing
- [`porto`](/solid/api/connectors/porto) - Connect to Porto wallet
- [`safe`](/solid/api/connectors/safe) - Connect to Safe multi-sig wallets
- [`walletConnect`](/solid/api/connectors/walletConnect) - Connect using WalletConnect protocol

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'
import { injected, metaMask, walletConnect } from '@wagmi/solid/connectors'

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: '...' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## More Connectors

See the [`@wagmi/core` Connectors docs](/core/api/connectors) for more available connectors.
