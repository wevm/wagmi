---
title: useChainId
description: Composable for getting current chain ID.
---

# useChainId

Composable for getting current chain ID.

This method returns chain IDs only for chains configured in your Wagmi 
Config (via [createConfig#chains](/vue/api/createConfig#chains)). If the connector 
uses an unsupported chain, `useChainId` will return the last configured 
chain ID. To retrieve the currently connected chain, including those not 
specified in the Wagmi Config, use [useAccount#chainId](/vue/api/composables/useAccount#chainid) instead.

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

## Action

- [`getChainId`](/core/api/actions/getChainId)
- [`watchChainId`](/core/api/actions/watchChainId)
