---
title: useEnsName
description: Composable for fetching primary ENS name for address.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'getEnsName'
const typeName = 'GetEnsName'
const TData = 'string | null'
const TError = 'GetEnsNameErrorType'
</script>

# useEnsName

Composable for fetching primary ENS name for address.

## Import

```ts
import { useEnsName } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsName } from '@wagmi/vue'

const result = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseEnsNameParameters } from '@wagmi/vue'
```

### address

`Address | undefined`

Name to get the resolver for. [`enabled`](#enabled) set to `false` if `address` is `undefined`.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsName } from '@wagmi/vue'

const result = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to get ENS name at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsName } from '@wagmi/vue'

const result = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  blockNumber: 17829139n, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get ENS name at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsName } from '@wagmi/vue'

const result = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
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
import { useEnsName } from '@wagmi/vue'
import { mainnet } from 'wagmi/chains' // [!code focus]

const result = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
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
import { useEnsName } from '@wagmi/vue'
import { normalize } from 'viem/ens'
import { config } from './config' // [!code focus]

const result = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Composables that have identical context will share the same cache.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsName } from '@wagmi/vue'

const result = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  scopeKey: 'foo', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### universalResolverAddress

`Address | undefined`

- Address of ENS Universal Resolver Contract.
- Defaults to current chain's Universal Resolver Contract address.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsName } from '@wagmi/vue'

const result = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseEnsNameReturnType } from '@wagmi/vue'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getEnsName`](/core/api/actions/getEnsName)
