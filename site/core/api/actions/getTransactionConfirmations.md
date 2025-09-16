<script setup>
const packageName = '@wagmi/core'
const actionName = 'getTransactionConfirmations'
const typeName = 'GetTransactionConfirmations'
</script>

# getTransactionConfirmations

Action for fetching the number of blocks passed (confirmations) since the transaction was processed on a block. If confirmations is 0, then the Transaction has not been confirmed & processed yet.

## Import

```ts
import { getTransactionConfirmations } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getTransactionConfirmations } from '@wagmi/core'
import { config } from './config'

const transaction = getTransactionConfirmations(config, {
  hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetTransactionConfirmationsParameters } from '@wagmi/core'
```

---

### hash

`` `0x${string}` | undefined ``

The hash of the transaction.

::: code-group
```ts [index.ts]
import { getTransactionConfirmations } from '@wagmi/core'
import { config } from './config'

const transaction = getTransactionConfirmations(config, {
  hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### transactionReceipt

`TransactionReceipt | undefined`

The transaction receipt.

::: code-group
```ts [index.ts]
import { getTransactionConfirmations } from '@wagmi/core'
import { config } from './config'

const transaction = getTransactionConfirmations(config, {
  transactionReceipt: { ... }, // [!code focus]
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
import { getTransactionConfirmations } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const transaction = await getTransactionConfirmations(config, {
  chainId: mainnet.id, // [!code focus]
  hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetTransactionConfirmationsReturnType } from '@wagmi/core'
```

`bigint`

The number of blocks passed since the transaction was processed. If confirmations is 0, then the Transaction has not been confirmed & processed yet.

## Error

```ts
import { type GetTransactionConfirmationsErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getTransactionConfirmations`](https://viem.sh/docs/actions/public/getTransactionConfirmations)
