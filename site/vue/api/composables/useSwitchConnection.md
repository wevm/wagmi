---
title: useSwitchConnection
description: Composable for switching the current connection.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'switchConnection'
const typeName = 'SwitchConnection'
const mutate = 'switchConnection'
const TData = 'SwitchConnectionData'
const TError = 'SwitchConnectionErrorType'
const TVariables = 'SwitchConnectionVariables'
</script>

# useSwitchConnection

Composable for switching the current connection.

## Import

```ts
import { useSwitchConnection } from 'wagmi'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnections, useSwitchConnection } from 'wagmi'

const { switchConnection } = useSwitchConnection()
const connections = useConnections()
</script>

<template>
  <div>
    <button 
      v-for="connection in connections" 
      :key="connection.id" 
      @click="switchConnection({ connector: connection.connector })"
    >
      {{ connection.connector.name }}
    </button>
  </div>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSwitchConnectionParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSwitchConnection } from 'wagmi'
import { config } from './config' // [!code focus]

const result = useSwitchConnection({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSwitchConnectionReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`switchConnection`](/core/api/actions/switchConnection)
