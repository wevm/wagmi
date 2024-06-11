---
title: useConfig
description: Composable for getting `Config` from the `WagmiPlugin`.
---

# useConfig

Composable for getting [`Config`](/vue/api/createConfig#config) from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

## Import

```ts
import { useConfig } from 'wagmi'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConfig } from 'wagmi'

const config = useConfig()
</script>
```

:::

## Return Type

```ts
import { type UseConfigReturnType } from 'wagmi'
```
