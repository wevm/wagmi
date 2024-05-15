---
title: useClient
description: Composable for getting Viem `Client` instance.
---

# useClient

Composable for getting Viem [`Client`](https://viem.sh/docs/clients/custom.html) instance.

## Import

```ts
import { useClient } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useClient } from '@wagmi/vue'

const client = useClient()
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseClientParameters } from '@wagmi/vue'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when getting Viem Client.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useClient } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains' // [!code focus]
import { config } from './config'

const client = useClient({
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
import { useClient } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const client = useClient({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseClientReturnType } from '@wagmi/vue'
```

`Client | undefined`

Viem [`Client`](https://viem.sh/docs/clients/custom.html) instance.

## Action

- [`getClient`](/core/api/actions/getClient)
- [`watchClient`](/core/api/actions/watchClient)
