---
title: useChainId
description: Composable for getting current chain ID.
---

# useChainId

Composable for getting current chain ID.

## Import

```ts
import { useChainId } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useChainId } from '@wagmi/vue'

const chainId = useChainId()
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseChainIdParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useChainId } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const chainId = useChainId({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseChainIdReturnType } from '@wagmi/vue'
```

`number`

Current chain ID from [`config.state.chainId`](/vue/api/createConfig#chainid).

::: info
Only returns chain IDs for chains configured via `createConfig`'s [`chains`](/vue/api/createConfig#chains) parameter.

If the active [connection](/vue/api/createConfig#connection) [`chainId`](/vue/api/createConfig#chainid-1) is not from a chain included in your Wagmi `Config`, `useChainId` will return the last configured chain ID.
:::

## Action

- [`getChainId`](/core/api/actions/getChainId)
- [`watchChainId`](/core/api/actions/watchChainId)
