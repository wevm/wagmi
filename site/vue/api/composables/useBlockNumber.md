---
title: useBlockNumber
description: Composable for fetching the number of the most recent block seen.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'getBlockNumber'
const typeName = 'GetBlockNumber'
const TData = 'bigint'
const TError = 'GetBlockNumberErrorType'
</script>

# useBlockNumber

Composable for fetching the number of the most recent block seen.

## Import

```ts
import { useBlockNumber } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBlockNumber } from '@wagmi/vue'

const { data: blockNumber } = useBlockNumber()
</script>

<template>
  Block Number: {{ blockNumber }}
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBlockNumberParameters } from '@wagmi/vue'
```

### cacheTime

`MaybeRef<number> | undefined`

Time in milliseconds that cached block number will remain in memory.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBlockNumber } from '@wagmi/vue'

const { data: blockNumber } = useBlockNumber({
  cacheTime: 4_000 // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### chainId

`MaybeRef<config['chains'][number]['id']> | undefined`

ID of chain to use when fetching data.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBlockNumber } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains' // [!code focus]

const { data: blockNumber } = useBlockNumber({
  chainId: mainnet.id, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBlockNumber } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const { data: blockNumber } = useBlockNumber({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### scopeKey

`MaybeRef<string> | undefined`

Scopes the cache to a given context. Composables that have identical context will share the same cache.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBlockNumber } from '@wagmi/vue'

const { data: blockNumber } = useBlockNumber({
  scopeKey: 'foo', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### watch

`MaybeRef<boolean | UseWatchBlockNumberParameters> | undefined`

- Enables/disables listening for block number changes.
- Can pass a subset of [`UseWatchBlockNumberParameters`](/vue/api/composables/useWatchBlockNumber#parameters) directly to [`useWatchBlockNumber`](/vue/api/composables/useWatchBlockNumber).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBlockNumber } from '@wagmi/vue'

const { data: blockNumber } = useBlockNumber({
  watch: true, // [!code focus]
})
</script>
```

```vue [index-2.vue]
<script setup lang="ts">
import { useBlockNumber } from '@wagmi/vue'

const { data: blockNumber } = useBlockNumber({
  watch: { // [!code focus]
    pollingInterval: 4_000 // [!code focus]
  }, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBlockNumberReturnType } from '@wagmi/vue'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBlockNumber`](/core/api/actions/getBlockNumber)
- [`watchBlockNumber`](/core/api/actions/watchBlockNumber)
