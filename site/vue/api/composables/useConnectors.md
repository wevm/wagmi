---
title: useConnectors
description: Composable for getting configured connectors.
---

# useConnectors

Composable for getting configured connectors.

## Import

```ts
import { useConnectors } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnectors } from '@wagmi/vue'

const connectors = useConnectors()
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseConnectorsReturnType } from '@wagmi/vue'
```

`readonly Connector[]`

Connectors from [`config.connectors`](/vue/api/createConfig#connectors-1).

## Action

- [`getConnectors`](/core/api/actions/getConnectors)
