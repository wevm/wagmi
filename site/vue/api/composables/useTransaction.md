---
title: useTransaction
description: Composable for fetching transactions given hashes or block identifiers.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'getTransaction'
const typeName = 'GetTransaction'
const TData = 'GetTransactionData'
const TError = 'GetTransactionErrorType'
</script>

# useTransaction

Composable for fetching transactions given hashes or block identifiers.

## Import

```ts
import { useTransaction } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useTransaction } from '@wagmi/vue'

const result = useTransaction({
  hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseTransactionParameters } from '@wagmi/vue'
```

---

### blockHash

`bigint | undefined`

Block hash to get transaction at (with [`index`](#index)).

```vue
<script setup lang="ts">
import { useTransaction } from '@wagmi/vue'

const result = useTransaction({
  blockHash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
  index: 0,
})
</script>
```

### blockNumber

`bigint | undefined`

Block number to get transaction at (with [`index`](#index)).

```vue
<script setup lang="ts">
import { useTransaction } from '@wagmi/vue'

const result = useTransaction({
  blockNumber: 17829139n, // [!code focus]
  index: 0,
})
</script>
```

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get transaction at (with [`index`](#index)).

```vue
<script setup lang="ts">
import { useTransaction } from '@wagmi/vue'

const result = useTransaction({
  blockTag: 'safe', // [!code focus]
  index: 0,
})
</script>
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

```vue
<script setup lang="ts">
import { useTransaction } from '@wagmi/vue'
import { mainnet } from 'wagmi/chains'

const result = useTransaction({
  chainId: mainnet.id, // [!code focus]
  hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
})
</script>
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useTransaction } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const result = useTransaction({
  hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### hash

`` `0x${string}` | undefined ``

Hash to get transaction. [`enabled`](#enabled) set to `false` if `hash` and [`index`](#index) are `undefined`.

```vue
<script setup lang="ts">
import { useTransaction } from '@wagmi/vue'

const result = useTransaction({
  hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5', // [!code focus]
})
</script>
```

### index

`number | undefined`

An index to be used with a block identifier ([hash](#blockhash), [number](#blocknumber), or [tag](#blocktag)). [`enabled`](#enabled) set to `false` if `index` and [`hash`](#hash) are `undefined`.

```vue
<script setup lang="ts">
import { useTransaction } from '@wagmi/vue'

const result = useTransaction({
  blockTag: 'safe',
  index: 0  // [!code focus]
})
</script>
```

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseTransactionReturnType } from '@wagmi/vue'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getTransaction`](/core/api/actions/getTransaction)
