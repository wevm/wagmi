<script setup>
const packageName = '@wagmi/core'
const actionName = 'getBlockTransactionCount'
const typeName = 'GetBlockTransactionCount'
</script>

# getBlockTransactionCount

Action for fetching the number of Transactions at a block number, hash or tag.

## Import

```ts
import { getBlockTransactionCount } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getBlockTransactionCount } from '@wagmi/core'
import { config } from './config'

const blockTransactionCount = await getBlockTransactionCount(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetBlockTransactionCountParameters } from '@wagmi/core'
```

### cacheTime

`number | undefined`

Time in milliseconds that cached block transaction count will remain in memory.

::: code-group
```ts [index.ts]
import { getBlockTransactionCount } from '@wagmi/core'
import { config } from './config'

const blockTransactionCount = await getBlockTransactionCount(config, {
  cacheTime: 4_000, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getBlockTransactionCount } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const blockTransactionCount = await getBlockTransactionCount(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetBlockTransactionCountReturnType } from '@wagmi/core'
```

`number`

The number of Transactions at a block number

## Error

```ts
import { type GetBlockTransactionCountErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getBlockTransactionCount`](https://viem.sh/docs/actions/public/getBlockTransactionCount)
