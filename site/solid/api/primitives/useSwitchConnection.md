---
title: useSwitchConnection
description: Primitive for switching between connections.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'switchConnection'
const typeName = 'SwitchConnection'
const TData = 'void'
const TError = 'SwitchConnectionErrorType'
const TVariables = '{ connector: Connector; }'
</script>

# useSwitchConnection

Primitive for switching between connections when multiple wallets are connected.

## Import

```ts
import { useSwitchConnection } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnections, useSwitchConnection } from '@wagmi/solid'
import { For } from 'solid-js'

function App() {
  const connections = useConnections()
  const switchConnection = useSwitchConnection()
  
  return (
    <div>
      <For each={connections()}>
        {(connection) => (
          <button
            onClick={() => switchConnection.mutate({ connector: connection.connector })}
          >
            Switch to {connection.connector.name}
          </button>
        )}
      </For>
    </div>
  )
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useSwitchConnection } from '@wagmi/solid'

useSwitchConnection.Parameters
useSwitchConnection.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useSwitchConnection(() => ({
  config,
  // mutation options...
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { useSwitchConnection } from '@wagmi/solid'

useSwitchConnection.ReturnType
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`switchConnection`](/core/api/actions/switchConnection)
