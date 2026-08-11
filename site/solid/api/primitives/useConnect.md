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
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useConnect } from '@wagmi/solid'

useConnect.Parameters
useConnect.SolidParameters
```

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

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { useConnect } from '@wagmi/solid'

useConnect.ReturnType
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

::: tip
Not all connectors support connecting directly to a `chainId` (e.g. they don't support programmatic chain switching). In those cases, the connector will connect to whatever chain the connector's provider (e.g. wallet) is connected to.
:::

## Action

- [`connect`](/core/api/actions/connect)
