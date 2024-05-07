<script setup>
const packageName = '@wagmi/core'
const actionName = 'getTransactionCount'
const typeName = 'GetTransactionCount'
</script>

# getTransactionCount

Action for fetching the number of transactions an Account has broadcast / sent.

## Import

```ts
import { getTransactionCount } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getTransactionCount } from '@wagmi/core'
import { config } from './config'

const transactionCount = getTransactionCount(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetTransactionCountParameters } from '@wagmi/core'
```

---

### address

`Address`

The address of the account.

::: code-group
```ts [index.ts]
import { getTransactionCount } from '@wagmi/core'
import { config } from './config'

const transactionCount = getTransactionCount(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Get the count at a block number.

::: code-group
```ts [index.ts]
import { getTransactionCount } from '@wagmi/core'
import { config } from './config'

const transactionCount = getTransactionCount(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  blockNumber: 17829139n, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Get the count at a block tag.

::: code-group
```ts [index.ts]
import { getTransactionCount } from '@wagmi/core'
import { config } from './config'

const transactionCount = getTransactionCount(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  blockTag: 'latest', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getTransactionCount } from '@wagmi/core'
import { config } from './config'

const transactionCount = getTransactionCount(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::


## Return Type

```ts
import { type GetTransactionCountReturnType } from '@wagmi/core'
```

`number`

The number of transactions an account has sent.

## Error

```ts
import { type GetTransactionCountErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getTransactionCount`](https://viem.sh/docs/actions/public/getTransactionCount.html)
