---
title: useConnections
description: Primitive for getting all active connections.
---

# useConnections

Primitive for getting all active connections.

## Import

```ts
import { useConnections } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnections } from '@wagmi/solid'
import { For } from 'solid-js'

function App() {
  const connections = useConnections()
  
  return (
    <ul>
      <For each={connections()}>
        {(connection) => (
          <li>
            {connection.connector.name}: {connection.accounts[0]}
          </li>
        )}
      </For>
    </ul>
  )
}
```
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

## Parameters

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useConnections(() => ({
  config,
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

## Return Type

`Accessor<readonly Connection[]>`

Returns an accessor containing all active connections. Each connection includes:

- `accounts`: Connected account addresses
- `chainId`: Connected chain ID
- `connector`: The connector instance

## Action

- [`getConnections`](/core/api/actions/getConnections)
