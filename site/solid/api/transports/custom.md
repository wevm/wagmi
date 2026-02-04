# custom

Custom EIP-1193 transport.

## Import

```ts
import { custom } from '@wagmi/solid'
```

## Usage

```ts
import { createConfig, custom } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: custom(window.ethereum),
    [sepolia.id]: custom(window.ethereum),
  },
})
```

## Parameters

See the [`@wagmi/core` custom transport docs](/core/api/transports/custom#parameters) for more information on the available parameters.
