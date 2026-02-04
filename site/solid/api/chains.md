# Chains

A collection of popular EVM-compatible chains.

## Import

```ts
import { mainnet, sepolia } from '@wagmi/solid/chains'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Chains

See the [`@wagmi/core` Chains docs](/core/api/chains) for the full list of available chains.

## Custom Chains

You can also define custom chains. See the [Viem documentation](https://viem.sh/docs/chains/introduction#custom-chains) for more information.
