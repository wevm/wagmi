---
title: useConnect
description: Hook for connecting accounts with connectors.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'connect'
const typeName = 'Connect'
const mutate = 'connect'
const TData = '{ accounts: readonly [Address, ...Address[]]; chainId: number; }'
const TError = 'ConnectErrorType'
const TVariables = '{ chainId?: number | undefined; connector?: CreateConnectorFn | Connector | undefined; withCapabilities?: boolean | undefined }'
</script>

# useConnect

Hook for connecting accounts with [connectors](/react/api/connectors).

## Import

```ts
import { useConnect } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

function App() {
  const { connect } = useConnect()

  return (
    <button onClick={() => connect({ connector: injected() })}>
      Connect
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseConnectParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useConnect } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useConnect({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseConnectReturnType } from 'wagmi'
```

### connectors

`readonly Connector[]`

Globally configured connectors via [`createConfig`](/react/api/createConfig#connectors). Useful for rendering a list of available connectors.

::: code-group
```tsx [index.tsx]
import { useConnect } from 'wagmi'

function App() {
  const { connect, connectors } = useConnect()

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
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

::: tip
Not all connectors support connecting directly to a `chainId` (e.g. they don't support programmatic chain switching). In those cases, the connector will connect to whatever chain the connector's provider (e.g. wallet) is connected to.
:::

<!--@include: @shared/mutation-imports.md-->

## Action

- [`connect`](/core/api/actions/connect)
