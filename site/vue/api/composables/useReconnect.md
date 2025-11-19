---
title: useReconnect
description: Composable for reconnecting connectors.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'reconnect'
const typeName = 'Reconnect'
const mutate = 'reconnect'
const TData = '{ accounts: readonly [Address, ...Address[]]; chainId: number; connector: Connector }'
const TError = 'ReconnectErrorType'
const TVariables = '{ connectors?: (CreateConnectorFn | Connector)[] | undefined; }'
</script>

# useReconnect

Composable for reconnecting [connectors](/core/api/connectors).

## Import

```ts
import { useReconnect } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReconnect } from '@wagmi/vue'
import { useEffect } from 'react'

const { reconnect } = useReconnect()

reconnect()
</script>
```

:::

::: tip
When [`WagmiPlugin['reconnectOnMount']`](/vue/api/WagmiPlugin#reconnectonmount) is `true`, `reconnect` is called automatically on mount.
:::

## Parameters

```ts
import { type UseReconnectParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReconnect } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const result = useReconnect({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseReconnectReturnType } from '@wagmi/vue'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`reconnect`](/core/api/actions/reconnect)
