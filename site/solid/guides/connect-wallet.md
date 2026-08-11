# Connect Wallet

This guide covers how to connect and disconnect wallets using `@wagmi/solid`.

## Overview

Connecting a wallet allows your app to interact with the user's Ethereum accounts. Wagmi provides primitives to handle the entire connection flow.

## Connecting

Use the `useConnect` primitive to connect a wallet:

```tsx
import { useConnect } from '@wagmi/solid'
import { injected } from '@wagmi/solid/connectors'

function Connect() {
  const connect = useConnect()

  return (
    <button
      disabled={connect.isPending}
      onClick={() => connect.mutate({ connector: injected() })}
    >
      {connect.isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
```

## Displaying Available Connectors

Use the `useConnectors` primitive to get a list of configured connectors:

```tsx
import { useConnect, useConnectors } from '@wagmi/solid'
import { For } from 'solid-js'

function Connect() {
  const connect = useConnect()
  const connectors = useConnectors()

  return (
    <div>
      <For each={connectors()}>
        {(connector) => (
          <button
            disabled={connect.isPending}
            onClick={() => connect.mutate({ connector })}
          >
            {connector.name}
          </button>
        )}
      </For>
    </div>
  )
}
```

## Checking Connection Status

Use the `useConnection` primitive to check if a wallet is connected:

```tsx
import { useConnection } from '@wagmi/solid'
import { Show } from 'solid-js'

function ConnectionStatus() {
  const connection = useConnection()

  return (
    <Show
      when={connection.isConnected}
      fallback={<p>Not connected</p>}
    >
      <p>Connected to {connection.address}</p>
    </Show>
  )
}
```

## Disconnecting

Use the `useDisconnect` primitive to disconnect:

```tsx
import { useDisconnect } from '@wagmi/solid'

function Disconnect() {
  const disconnect = useDisconnect()

  return (
    <button
      disabled={disconnect.isPending}
      onClick={() => disconnect.mutate()}
    >
      Disconnect
    </button>
  )
}
```

## Complete Example

Here's a complete example combining all the pieces:

```tsx
import { useConnect, useConnection, useConnectors, useDisconnect } from '@wagmi/solid'
import { For, Show } from 'solid-js'

function WalletConnection() {
  const connection = useConnection()
  const connectors = useConnectors()
  const connect = useConnect()
  const disconnect = useDisconnect()

  return (
    <div>
      <Show
        when={connection.isConnected}
        fallback={
          <div>
            <p>Connect your wallet:</p>
            <For each={connectors()}>
              {(connector) => (
                <button
                  disabled={connect.isPending}
                  onClick={() => connect.mutate({ connector })}
                >
                  {connector.name}
                </button>
              )}
            </For>
            {connect.isError && <p>Error: {connect.error?.message}</p>}
          </div>
        }
      >
        <div>
          <p>Connected: {connection.address}</p>
          <p>Chain ID: {connection.chainId}</p>
          <button onClick={() => disconnect.mutate()}>
            Disconnect
          </button>
        </div>
      </Show>
    </div>
  )
}
```

## Connection Effects

Use `useConnectionEffect` to react to connection state changes:

```tsx
import { useConnectionEffect } from '@wagmi/solid'

function ConnectionLogger() {
  useConnectionEffect(() => ({
    onConnect(data) {
      console.log('Connected!', data)
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  }))

  return null
}
```

## Next Steps

- [useConnect](/solid/api/primitives/useConnect) - Learn more about the connect primitive
- [useDisconnect](/solid/api/primitives/useDisconnect) - Learn more about the disconnect primitive
- [useConnection](/solid/api/primitives/useConnection) - Learn more about connection state
