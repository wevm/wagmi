---
title: useChains
description: Composable for getting configured chains
---

# useChains

Composable for getting configured chains

## Import

```ts
import { useChains } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useChains } from '@wagmi/vue'

const chains = useChains()
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseChainsParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useChains } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const chains = useChains({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseChainsReturnType } from '@wagmi/vue'
```

`readonly [Chain, ...Chain[]]`

Chains from [`config.chains`](/vue/api/createConfig#chains).

## Action

- [`getChains`](/core/api/actions/getChains)
