---
title: useDisconnect
description: Primitive for disconnecting connections.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'disconnect'
const typeName = 'Disconnect'
const TData = 'void'
const TError = 'DisconnectErrorType'
const TVariables = '{ connector?: Connector | undefined; }'
</script>

# useDisconnect

Primitive for disconnecting connections.

## Import

```ts
import { useDisconnect } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useDisconnect } from '@wagmi/solid'

function App() {
  const disconnect = useDisconnect()
  
  return (
    <button onClick={() => disconnect.mutate()}>
      Disconnect
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
useDisconnect(() => ({
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

`(variables?: { connector?: Connector }) => void`

Function to trigger the disconnection. Optionally pass a specific connector to disconnect.

### mutateAsync

`(variables?: { connector?: Connector }) => Promise<void>`

Async version of `mutate` that returns a promise.

### error

`DisconnectErrorType | null`

The error object if the disconnection failed.

### isError / isIdle / isPending / isSuccess

`boolean`

Boolean flags indicating the mutation status.

### reset

`() => void`

Function to reset the mutation state.

## Action

- [`disconnect`](/core/api/actions/disconnect)
