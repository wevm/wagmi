---
title: useSwitchAccount
description: Composable for switching the current account.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'switchAccount'
const typeName = 'SwitchAccount'
const mutate = 'switchAccount'
const TData = 'SwitchAccountData'
const TError = 'SwitchAccountErrorType'
const TVariables = 'SwitchAccountVariables'
</script>

# useSwitchAccount

Composable for switching the current account.

## Import

```ts
import { useSwitchAccount } from 'wagmi'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSwitchAccount } from 'wagmi'

const { connectors, switchAccount } = useSwitchAccount()
</script>

<template>
  <div>
    <button 
      v-for="connector in connectors" 
      :key="connector.id" 
      @click="switchAccount({ connector })"
    >
      {{ connector.name }}
    </button>
  </div>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSwitchAccountParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSwitchAccount } from 'wagmi'
import { config } from './config' // [!code focus]

const result = useSwitchAccount({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSwitchAccountReturnType } from 'wagmi'
```

### connectors

`readonly Connector[]`

Globally configured and actively connected connectors. Useful for rendering a list of available connectors to switch to.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSwitchAccount } from 'wagmi'

const { connectors, switchAccount } = useSwitchAccount()
</script>

<template>
  <div>
    <button 
      v-for="connector in connectors" 
      :key="connector.id" 
      @click="switchAccount({ connector })"
    >
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

- [`switchAccount`](/core/api/actions/switchAccount)
