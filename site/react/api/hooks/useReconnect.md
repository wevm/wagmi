---
title: useReconnect
description: Hook for reconnecting connectors.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'reconnect'
const typeName = 'Reconnect'
const mutate = 'reconnect'
const TData = '{ accounts: readonly [Address, ...Address[]]; chainId: number; connector: Connector }'
const TError = 'ReconnectErrorType'
const TVariables = '{ connectors?: (CreateConnectorFn | Connector)[] | undefined; }'
</script>

# useReconnect

Hook for reconnecting [connectors](/core/api/connectors).

## Import

```ts
import { useReconnect } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReconnect } from 'wagmi'
import { useEffect } from 'react'

function App() {
  const { reconnect } = useReconnect()

  useEffect(() => {
    reconnect()
  }, [])
}
```

:::

::: tip
When [`WagmiProvider['reconnectOnMount']`](/react/api/WagmiProvider#reconnectonmount) is `true`, `reconnect` is called automatically on mount.
:::

## Parameters

```ts
import { type UseReconnectParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useReconnect } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useReconnect({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseReconnectReturnType } from 'wagmi'
```

### connectors <Badge type="warning">[deprecated](/react/guides/migrate-from-v2-to-v3#removed-useconnect-connectors-usereconnect-connectors)</Badge>

`readonly Connector[]`

Globally configured connectors via [`createConfig`](/react/api/createConfig#connectors).

::: code-group
```tsx [index.tsx]
import { useReconnect } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { useEffect } from 'react'

function App() {
  const { reconnect, connectors } = useReconnect()

  useEffect(() => {
    reconnect({ connectors })
  }, [])
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`reconnect`](/core/api/actions/reconnect)
