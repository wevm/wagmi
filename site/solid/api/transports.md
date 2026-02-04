# Transports

Transports define how requests are made to Ethereum nodes.

## Import

```ts
import { http, webSocket, fallback } from '@wagmi/solid'
```

## Available Transports

- [`http`](/solid/api/transports/http) - HTTP JSON-RPC transport
- [`webSocket`](/solid/api/transports/webSocket) - WebSocket transport
- [`fallback`](/solid/api/transports/fallback) - Fallback transport for reliability
- [`custom`](/solid/api/transports/custom) - Custom EIP-1193 transport

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

## More Information

See the [`@wagmi/core` Transports docs](/core/api/transports) for more information on transports.
