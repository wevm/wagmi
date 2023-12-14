# `@wagmi/connectors`

Collection of connectors for wagmi.

## Installation

Install the `@wagmi/connectors` package.

```
npm i @wagmi/connectors
```

## Usage

Configure your wagmi config with connectors!

```tsx
import { configureChains, createConfig } from 'wagmi'

import { InjectedConnector } from '@wagmi/connectors/injected'

const { chains, provider } = configureChains(...)

const config = createConfig({
  connectors: [
    new InjectedConnector({ chains }),
  ],
  provider,
})
```

> If your bundler supports tree-shaking (most likely), only the used connectors will be included in the bundle, so you don't have to worry about bundle size. 😊

## Connectors

- [`CoinbaseWalletConnector`](/packages/connectors/src/coinbaseWallet.ts)
- [`InjectedConnector`](/packages/connectors/src/injected.ts)
- [`MetaMaskConnector`](/packages/connectors/src/metaMask.ts)
- [`MockConnector`](/packages/connectors/src/mock.ts)
- [`SafeConnector`](/packages/connectors/src/safe.ts)
- [`WalletConnectConnector`](/packages/connectors/src/walletConnect.ts)

## Contributing

Want to add another chain to the list? Make sure you read the [contributing guide](../../.github/CONTRIBUTING.md) first.
