<script setup>
const packageName = '@wagmi/core'
const actionName = 'getBlock'
const typeName = 'GetBlock'
</script>

# getBlock

Action for fetching information about a block at a block number, hash or tag.

## Import

```ts
import { getBlock } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getBlock } from '@wagmi/core'
import { config } from './config'

const blockNumber = await getBlock(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetBlockParameters } from '@wagmi/core'
```

### blockHash

`` `0x${string}` ``

Information at a given block hash.

::: code-group
```ts [index.ts]
import { getBlock } from '@wagmi/core'
import { config } from './config'

const blockNumber = await getBlock(config, {
  blockHash: '0x89644bbd5c8d682a2e9611170e6c1f02573d866d286f006cbf517eec7254ec2d' // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockNumber

`` bigint ``

Information at a given block number.

::: code-group
```ts [index.ts]
import { getBlock } from '@wagmi/core'
import { config } from './config'

const blockNumber = await getBlock(config, {
  blockNumber: 42069n // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`` 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' ``

Information at a given block tag. Defaults to `'latest'`.

::: code-group
```ts [index.ts]
import { getBlock } from '@wagmi/core'
import { config } from './config'

const blockNumber = await getBlock(config, {
  blockTag: 'pending' // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getBlock } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const blockNumber = await getBlock(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### includeTransactions

`boolean`

Whether or not to include transactions as objects.

::: code-group
```ts [index.ts]
import { getBlock } from '@wagmi/core'
import { config } from './config'

const blockNumber = await getBlock(config, {
  includeTransactions: true // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetBlockReturnType } from '@wagmi/core'
```

[`Block`](https://viem.sh/docs/glossary/types.html#block)

Information about the block.

## Error

```ts
import { type GetBlockErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getBlock`](https://viem.sh/docs/actions/public/getBlock.html)
