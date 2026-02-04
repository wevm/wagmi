# injected

Connector for [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compatible browser-injected wallets like MetaMask.

## Import

```ts
import { injected } from '@wagmi/solid/connectors'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'
import { injected } from '@wagmi/solid/connectors'

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` injected connector docs](/core/api/connectors/injected#parameters) for more information on the available parameters.
