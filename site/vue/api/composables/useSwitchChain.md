---
title: useSwitchChain
description: Composable for switching the target chain for a connector or the Wagmi `Config`.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'switchChain'
const typeName = 'SwitchChain'
const mutate = 'switchChain'
const TData = 'SwitchChainData'
const TError = 'SwitchChainErrorType'
const TVariables = 'SwitchChainVariables'
</script>

# useSwitchChain

Composable for switching the target chain for a connector or the Wagmi [`Config`](/vue/api/createConfig#config).

## Import

```ts
import { useSwitchChain } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useChains, useSwitchChain } from '@wagmi/vue'

const { switchChain } = useSwitchChain()
const chains = useSwitchChains()
</script>

<template>
  <div>
    <button 
      v-for="chain in chains" 
      :key="chain.id" 
      @click="switchChain({ chainId: chain.id })"
    >
      {{ chain.name }}
    </button>
  </div>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

::: tip
When connected, `switchChain` will switch the target chain for the connector. When not connected, `switchChain` will switch the target chain for the Wagmi [`Config`](/vue/api/createConfig#config).
:::

## Parameters

```ts
import { type UseSwitchChainParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSwitchChain } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const result = useSwitchChain({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSwitchChainReturnType } from '@wagmi/vue'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`switchChain`](/core/api/actions/switchChain)
