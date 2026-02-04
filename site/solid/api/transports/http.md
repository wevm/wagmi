# http

HTTP JSON-RPC transport.

## Import

```ts
import { http } from '@wagmi/solid'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

## Parameters

See the [`@wagmi/core` http transport docs](/core/api/transports/http#parameters) for more information on the available parameters.
