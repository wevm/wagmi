---
title: useSwitchConnection
description: Hook for switching the current connection.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'switchConnection'
const typeName = 'SwitchConnection'
const mutate = 'switchConnection'
const TData = 'SwitchConnectionData'
const TError = 'SwitchConnectionErrorType'
const TVariables = 'SwitchConnectionVariables'
</script>

# useSwitchConnection

Hook for switching the current connection.

## Import

```ts
import { useSwitchConnection } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnections, useSwitchConnection } from 'wagmi'

function App() {
  const switchConnection = useSwitchConnection()
  const connections = useConnections()
  return (
    <div>
      {connections.map((connection) => (
        <button key={connection.id} onClick={() => switchConnection.mutate({ connector: connection.connector })}>
          {connection.connector.name}
        </button>
      ))}
    </div>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSwitchConnectionParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSwitchConnection } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSwitchConnection({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSwitchConnectionReturnType } from 'wagmi'
```

### connectors <Badge type="warning">[deprecated](/react/guides/migrate-from-v2-to-v3#removed-usedisconnect-connectors-useswitchconnection-connectors)</Badge>

`readonly Connector[]`

Globally configured and actively connected connectors. Useful for rendering a list of available connectors to switch to.

::: code-group
```tsx [index.tsx]
import { useSwitchConnection } from 'wagmi'

function App() {
  const switchConnection = useSwitchConnection()

  return (
    <div>
      {switchConnection.connectors.map((connector) => (
        <button key={connector.id} onClick={() => switchConnection.mutate({ connector })}>
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

- [`switchConnection`](/core/api/actions/switchConnection)
