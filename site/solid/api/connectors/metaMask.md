# metaMask

Connector for [MetaMask](https://metamask.io/).

## Import

```ts
import { metaMask } from '@wagmi/solid/connectors'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'
import { metaMask } from '@wagmi/solid/connectors'

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` metaMask connector docs](/core/api/connectors/metaMask#parameters) for more information on the available parameters.
