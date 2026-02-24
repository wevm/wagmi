---
title: useConnection
description: Primitive for getting current connection.
---

# useConnection

Primitive for getting current connection.

## Import

```ts
import { useConnection } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnection } from '@wagmi/solid'
import { Show } from 'solid-js'

function App() {
  const connection = useConnection()
  
  return (
    <Show when={connection.isConnected} fallback={<p>Not connected</p>}>
      <p>Address: {connection.address}</p>
      <p>Chain ID: {connection.chainId}</p>
    </Show>
  )
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useConnection } from '@wagmi/solid'

useConnection.Parameters
useConnection.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useConnection(() => ({
  config,
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

## Return Type

```ts
import { useConnection } from '@wagmi/solid'

useConnection.ReturnType
```

### address

`Address | undefined`

The connected account address.

### addresses

`readonly Address[] | undefined`

All connected account addresses.

### chain

`Chain | undefined`

The connected chain.

### chainId

`number | undefined`

The connected chain ID.

### connector

`Connector | undefined`

The active connector.

### isConnected

`boolean`

Whether an account is connected.

### isConnecting

`boolean`

Whether a connection is in progress.

### isDisconnected

`boolean`

Whether the account is disconnected.

### isReconnecting

`boolean`

Whether a reconnection is in progress.

### status

`'connected' | 'connecting' | 'disconnected' | 'reconnecting'`

The current connection status.

## Action

- [`getConnection`](/core/api/actions/getConnection)
