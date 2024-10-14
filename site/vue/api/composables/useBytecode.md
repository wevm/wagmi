---
title: useBytecode
description: Composable for retrieving the bytecode at an address.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'getBytecode'
const typeName = 'GetBytecode'
const TData = 'GetBytecodeData'
const TError = 'GetBytecodeErrorType'
</script>

# useBytecode

Composable for retrieving the bytecode at an address.

## Import

```ts
import { useBytecode } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBytecode } from '@wagmi/vue'

const { data: byteCode } = useBytecode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
})
</script>

<template>
  Byte Code: {{ byteCode }}
</template>
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBytecodeParameters } from '@wagmi/vue'
```

### address

`Address | undefined`

The contract address.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBytecode } from '@wagmi/vue'

const { data: byteCode } = useBytecode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
})
</script>

<template>
  Byte Code: {{ byteCode }}
</template>
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

The block number to check the bytecode at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBytecode } from '@wagmi/vue'

const { data: byteCode } = useBytecode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  blockNumber: 16280770n, // [!code focus]
})
</script>

<template>
  Byte Code: {{ byteCode }}
</template>
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

The block tag to check the bytecode at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBytecode } from '@wagmi/vue'

const { data: byteCode } = useBytecode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  blockTag: 'safe', // [!code focus]
})
</script>

<template>
  Byte Code: {{ byteCode }}
</template>
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The chain ID to check the bytecode at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBytecode } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains'

const { data: byteCode } = useBytecode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  chainId: mainnet.id, // [!code focus]
})
</script>

<template>
  Byte Code: {{ byteCode }}
</template>
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBytecode } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const { data: byteCode } = useBytecode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  config, // [!code focus]
})
</script>

<template>
  Byte Code: {{ byteCode }}
</template>
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBytecode } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const { data: byteCode } = useBytecode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  scopeKey: 'foo', // [!code focus]
})
</script>

<template>
  Byte Code: {{ byteCode }}
</template>
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBytecodeReturnType } from '@wagmi/vue'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBytecode`](/core/api/actions/getBytecode)
