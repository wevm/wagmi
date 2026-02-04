# webSocket

WebSocket transport for real-time updates.

## Import

```ts
import { webSocket } from '@wagmi/solid'
```

## Usage

```ts
import { createConfig, webSocket } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: webSocket('wss://mainnet.example.com'),
    [sepolia.id]: webSocket('wss://sepolia.example.com'),
  },
})
```

## Parameters

See the [`@wagmi/core` webSocket transport docs](/core/api/transports/webSocket#parameters) for more information on the available parameters.
