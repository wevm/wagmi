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
useSwitchConnection(() => ({
  config,
  // mutation options...
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### mutation

TanStack Query mutation options. See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/solid/reference/createMutation) for more info.

## Return Type

```ts
import { type CreateMutationResult } from '@tanstack/solid-query'
```

### mutate

`(variables: { connector: Connector }) => void`

Function to trigger the connection switch.

### mutateAsync

`(variables: { connector: Connector }) => Promise<void>`

Async version of `mutate` that returns a promise.

### error

`SwitchConnectionErrorType | null`

The error object if the connection switch failed.

### isError / isIdle / isPending / isSuccess

`boolean`

Boolean flags indicating the mutation status.

### reset

`() => void`

Function to reset the mutation state.

## Action

- [`switchConnection`](/core/api/actions/switchConnection)
