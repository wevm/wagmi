---
title: useConnections
description: Composable for getting active connections.
---

# useConnections

Composable for getting active connections.

## Import

```ts
import { useConnections } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnections } from '@wagmi/vue'

const connections = useConnections()
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseConnectionsParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnections } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const connections = useConnections({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseConnectionsReturnType } from '@wagmi/vue'
```

## Action

- [`getConnections`](/core/api/actions/getConnections)
- [`watchConnections`](/core/api/actions/watchConnections)
