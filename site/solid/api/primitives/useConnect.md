---
title: useConnect
description: Primitive for connecting accounts with connectors.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'connect'
const typeName = 'Connect'
const TData = '{ accounts: readonly [Address, ...Address[]]; chainId: number; }'
const TError = 'ConnectErrorType'
const TVariables = '{ chainId?: number | undefined; connector?: CreateConnectorFn | Connector | undefined; }'
</script>

# useConnect

Primitive for connecting accounts with [connectors](/solid/api/connectors).

## Import

```ts
import { useConnect } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnect } from '@wagmi/solid'
import { injected } from '@wagmi/solid/connectors'

function App() {
  const connect = useConnect()
  
  return (
    <button onClick={() => connect.mutate({ connector: injected() })}>
      Connect
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
useConnect(() => ({
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

`(variables: { chainId?: number; connector?: Connector }) => void`

Function to trigger the connection.

### mutateAsync

`(variables: { chainId?: number; connector?: Connector }) => Promise<{ accounts: Address[]; chainId: number }>`

Async version of `mutate` that returns a promise.

### data

`{ accounts: Address[]; chainId: number } | undefined`

The connection data after successful connection.

### error

`ConnectErrorType | null`

The error object if the connection failed.

### isError / isIdle / isPending / isSuccess

`boolean`

Boolean flags indicating the mutation status.

### reset

`() => void`

Function to reset the mutation state.

::: tip
Not all connectors support connecting directly to a `chainId` (e.g. they don't support programmatic chain switching). In those cases, the connector will connect to whatever chain the connector's provider (e.g. wallet) is connected to.
:::

## Action

- [`connect`](/core/api/actions/connect)
