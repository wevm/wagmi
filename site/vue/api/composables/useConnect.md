---
title: useConnect
description: Composable for connecting accounts with connectors.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'connect'
const typeName = 'Connect'
const mutate = 'connect'
const TData = '{ accounts: readonly [Address, ...Address[]]; chainId: number; }'
const TError = 'ConnectErrorType'
const TVariables = '{ chainId?: number | undefined; connector?: CreateConnectorFn | Connector | undefined; withCapabilities?: boolean | undefined }'
</script>

# useConnect

Composable for connecting accounts with [connectors](/vue/api/connectors).

## Import

```ts
import { useConnect } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnect } from '@wagmi/vue'
import { injected } from '@wagmi/connectors'

const connect = useConnect()
</script>

<template>
  <button @click="connect.mutate({ connector: injected() })">
    Connect
  </button>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseConnectParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnect } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const connect = useConnect({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseConnectReturnType } from '@wagmi/vue'
```

<!--@include: @shared/mutation-result.md-->

::: tip
Not all connectors support connecting directly to a `chainId` (e.g. they don't support programmatic chain switching). In those cases, the connector will connect to whatever chain the connector's provider (e.g. wallet) is connected to.
:::

<!--@include: @shared/mutation-imports.md-->

## Action

- [`connect`](/core/api/actions/connect)
