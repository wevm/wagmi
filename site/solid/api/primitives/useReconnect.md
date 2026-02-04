---
title: useReconnect
description: Primitive for reconnecting to previously connected connectors.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'reconnect'
const typeName = 'Reconnect'
const TData = 'readonly Connection[]'
const TError = 'ReconnectErrorType'
const TVariables = '{ connectors?: readonly Connector[] | undefined; }'
</script>

# useReconnect

Primitive for reconnecting to previously connected connectors.

## Import

```ts
import { useReconnect } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReconnect } from '@wagmi/solid'

function App() {
  const reconnect = useReconnect()
  
  return (
    <button onClick={() => reconnect.mutate()}>
      Reconnect
    </button>
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
useReconnect(() => ({
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

`(variables?: { connectors?: readonly Connector[] }) => void`

Function to trigger reconnection. Optionally pass specific connectors to reconnect.

### mutateAsync

`(variables?: { connectors?: readonly Connector[] }) => Promise<readonly Connection[]>`

Async version of `mutate` that returns a promise with the reconnected connections.

### data

`readonly Connection[] | undefined`

The reconnected connections.

### error

`ReconnectErrorType | null`

The error object if the reconnection failed.

### isError / isIdle / isPending / isSuccess

`boolean`

Boolean flags indicating the mutation status.

### reset

`() => void`

Function to reset the mutation state.

## Action

- [`reconnect`](/core/api/actions/reconnect)
