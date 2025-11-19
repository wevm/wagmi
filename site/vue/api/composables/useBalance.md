---
title: useBalance
description: Composable for fetching native currency balance.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'getBalance'
const typeName = 'GetBalance'
const TData = '{ decimals: number; symbol: string; value: bigint; }'
const TError = 'GetBalanceErrorType'
</script>

# useBalance

Composable for fetching native currency balance.

## Import

```ts
import { useBalance } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBalance } from '@wagmi/vue'

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBalanceParameters } from '@wagmi/vue'
```

### address

`Address | undefined`

Address to get balance for. [`enabled`](#enabled) set to `false` if `address` is `undefined`.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBalance } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains'

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to get balance at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBalance } from '@wagmi/vue'

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  blockNumber: 17829139n, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get balance at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBalance } from '@wagmi/vue'

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  blockTag: 'latest', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBalance } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains' // [!code focus]

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
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
import { useBalance } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useBalance } from '@wagmi/vue'

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  scopeKey: 'foo', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBalanceReturnType } from '@wagmi/vue'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBalance`](/core/api/actions/getBalance)
