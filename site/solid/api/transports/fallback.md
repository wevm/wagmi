# fallback

Fallback transport for reliability. Tries transports in order until one succeeds.

## Import

```ts
import { fallback } from '@wagmi/solid'
```

## Usage

```ts
import { createConfig, fallback, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: fallback([
      http('https://mainnet.example.com'),
      http('https://mainnet-backup.example.com'),
    ]),
    [sepolia.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` fallback transport docs](/core/api/transports/fallback#parameters) for more information on the available parameters.
