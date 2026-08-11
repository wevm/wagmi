# Viem

[Viem](https://viem.sh) is a TypeScript interface for Ethereum that provides low-level primitives for interacting with Ethereum. `@wagmi/solid` is built on top of Viem.

## Overview

Wagmi uses Viem internally to perform blockchain operations like sending transactions, reading from contracts, and more. You can also use Viem directly alongside Wagmi when you need lower-level control.

## Using Viem with Wagmi

### Getting the Viem Client

You can get a Viem Public Client or Wallet Client using Wagmi primitives:

```tsx
import { useClient, useConnectorClient } from '@wagmi/solid'

function Example() {
  // Get a Public Client for read operations
  const publicClient = useClient()

  // Get a Wallet Client for write operations (requires connected account)
  const walletClient = useConnectorClient()

  // Use the clients...
}
```

### Using Viem Actions Directly

Once you have a client, you can use Viem actions directly:

```tsx
import { useClient } from '@wagmi/solid'
import { getBlockNumber } from 'viem/actions'
import { createEffect } from 'solid-js'

function Example() {
  const client = useClient()

  createEffect(async () => {
    const clientValue = client()
    if (clientValue) {
      const blockNumber = await getBlockNumber(clientValue)
      console.log('Block number:', blockNumber)
    }
  })

  // ...
}
```

## Viem Concepts

### Public Client vs Wallet Client

- **Public Client**: Used for read-only operations (e.g., getting block numbers, reading contract state)
- **Wallet Client**: Used for write operations that require signing (e.g., sending transactions, signing messages)

### Transports

Wagmi uses Viem's transport system to communicate with Ethereum nodes. Common transports include:

- `http`: HTTP JSON-RPC transport
- `webSocket`: WebSocket transport for real-time updates
- `fallback`: Fallback transport for reliability

## Further Reading

For more information about Viem, check out:

- [Viem Documentation](https://viem.sh)
- [Viem Actions](https://viem.sh/docs/actions/public/introduction)
- [Viem Clients](https://viem.sh/docs/clients/intro)
