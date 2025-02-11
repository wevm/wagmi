---
title: useDisconnect
description: Hook for disconnecting connections.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'disconnect'
const typeName = 'Disconnect'
const mutate = 'disconnect'
const TData = 'void'
const TError = 'DisconnectErrorType'
const TVariables = '{ connector?: Connector | undefined; }'
</script>

# useDisconnect

Hook for disconnecting connections.

## Import

```ts
import { useDisconnect } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useDisconnect } from 'wagmi'

function App() {
  const { disconnect } = useDisconnect()

  return (
    <button onClick={() => disconnect()}>
      Disconnect
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseDisconnectParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useDisconnect } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useDisconnect({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseDisconnectReturnType } from 'wagmi'
```

### connectors

`readonly Connector[]`

Connectors that are currently connected. Useful for rendering a list of connectors to disconnect.

::: code-group
```tsx [index.tsx]
import { useDisconnect } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const { connectors, disconnect } = useDisconnect()

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => disconnect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`disconnect`](/core/api/actions/disconnect)
