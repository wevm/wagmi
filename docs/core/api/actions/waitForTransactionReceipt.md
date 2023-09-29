<script setup>
const packageName = '@wagmi/core'
const actionName = 'waitForTransactionReceipt'
const typeName = 'WaitForTransactionReceipt'
</script>

# waitForTransactionReceipt

Action that waits for the transaction to be included on a block, and then returns the transaction receipt. If the transaction reverts, then the action will throw an error. Replacement detection (e.g. sped up transactions) is also supported.

## Import

```ts
import { waitForTransactionReceipt } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from './config'

const transactionReceipt = waitForTransactionReceipt(config, {
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WaitForTransactionReceiptParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { waitForTransactionReceipt } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const transactionReceipt = await waitForTransactionReceipt(config, {
  chainId: mainnet.id, // [!code focus]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### confirmations

### onReplaced

### pollingInterval

### hash

## Return Type

```ts
import { type WaitForTransactionReceiptReturnType } from '@wagmi/core'
```

## Error

```ts
import { type WaitForTransactionReceiptErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`waitForTransactionReceipt`](https://viem.sh/docs/actions/public/waitForTransactionReceipt.html) for token balances
