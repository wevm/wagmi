---
title: useEnsAvatar
description: Composable for fetching ENS avatar for name.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'getEnsAvatar'
const typeName = 'GetEnsAvatar'
const TData = 'string | null'
const TError = 'GetEnsAvatarErrorType'
</script>

# useEnsAvatar

Composable for fetching ENS avatar for name.

## Import

```ts
import { useEnsAvatar } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsAvatar } from '@wagmi/vue'
import { normalize } from 'viem/ens'

const result = useEnsAvatar({
  name: normalize('wevm.eth'),
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

::: warning
Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `useEnsAvatar`. You can use Viem's built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
:::

## Parameters

```ts
import { type UseEnsAvatarParameters } from '@wagmi/vue'
```

---

### assetGatewayUrls <Badge text="viem@>=2.3.1" />

`{ ipfs?: string | undefined; arweave?: string | undefined } | undefined`

Gateway urls to resolve IPFS and/or Arweave assets.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { getEnsAvatar } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const result = useEnsAvatar({
  assetGatewayUrls: { // [!code focus]
    ipfs: 'https://cloudflare-ipfs.com', // [!code focus]
  }, // [!code focus]
  name: normalize('wevm.eth'),
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

Block number to get ENS avatar at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsAvatar } from '@wagmi/vue'
import { normalize } from 'viem/ens'

const result = useEnsAvatar({
  blockNumber: 17829139n, // [!code focus]
  name: normalize('wevm.eth'),
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get ENS avatar at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsAvatar } from '@wagmi/vue'
import { normalize } from 'viem/ens'

const result = useEnsAvatar({
  name: normalize('wevm.eth'),
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
import { useEnsAvatar } from '@wagmi/vue'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { normalize } from 'viem/ens'

const result = useEnsAvatar({
  chainId: mainnet.id, // [!code focus],
  name: normalize('wevm.eth'),
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
import { useEnsAvatar } from '@wagmi/vue'
import { normalize } from 'viem/ens'
import { config } from './config' // [!code focus]

const result = useEnsAvatar({
  config, // [!code focus]
  name: normalize('wevm.eth'),
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### gatewayUrls

`string[] | undefined`

A set of Universal Resolver gateways, used for resolving CCIP-Read requests made through the ENS Universal Resolver Contract.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsAvatar } from '@wagmi/vue'
import { normalize } from 'viem/ens'

const result = useEnsAvatar({
  gatewayUrls: ['https://cloudflare-ipfs.com'], // [!code focus]
  name: normalize('wevm.eth'),
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### name

`string | undefined`

Name to get the avatar for. [`enabled`](#enabled) set to `false` if `name` is `undefined`.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useEnsAvatar } from '@wagmi/vue'
import { normalize } from 'viem/ens'

const result = useEnsAvatar({
  name: normalize('wevm.eth'), // [!code focus]
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
import { useEnsAvatar } from '@wagmi/vue'
import { normalize } from 'viem/ens'

const result = useEnsAvatar({
  name: normalize('wevm.eth'),
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
import { useEnsAvatar } from '@wagmi/vue'
import { normalize } from 'viem/ens'

const result = useEnsAvatar({
  name: normalize('wevm.eth'),
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseEnsAvatarReturnType } from '@wagmi/vue'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getEnsAvatar`](/core/api/actions/getEnsAvatar)
