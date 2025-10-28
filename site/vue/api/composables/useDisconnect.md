---
title: useDisconnect
description: Composable for disconnecting connections.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'disconnect'
const typeName = 'Disconnect'
const mutate = 'mutate'
const TData = 'void'
const TError = 'DisconnectErrorType'
const TVariables = '{ connector?: Connector | undefined; }'
</script>

# useDisconnect

Composable for disconnecting connections.

## Import

```ts
import { useDisconnect } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useDisconnect } from '@wagmi/vue'

const { disconnect } = useDisconnect()
</script>

<template>
  <button @click="disconnect()">
    Disconnect
  </button>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseDisconnectParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useDisconnect } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const result = useDisconnect({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseDisconnectReturnType } from '@wagmi/vue'
```

### connectors

`readonly Connector[]`

Connectors that are currently connected. Useful for rendering a list of connectors to disconnect.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useDisconnect } from '@wagmi/vue'
import { mainnet } from 'wagmi/chains'

const { connectors, disconnect } = useDisconnect()
</script>

<template>
  <div>
    <button v-for="connector in connectors" :key="connector.id" @click="disconnect({ connector })">
      {{ connector.name }}
    </button>
  </div>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`disconnect`](/core/api/actions/connect)
