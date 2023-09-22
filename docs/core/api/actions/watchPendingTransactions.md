<script setup>
const packageName = '@wagmi/core'
const actionName = 'watchPendingTransactions'
const typeName = 'WatchPendingTransactions'
</script>

# watchPendingTransactions

Action that watches and returns pending transaction hashes.

## Import

```ts
import { watchPendingTransactions } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'
import { config } from './config'

const unwatch = watchPendingTransactions(config, {
  onTransactions(transactions) {
    console.log("New transactions!", transactions)
  },
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchPendingTransactionsParameters } from '@wagmi/core'
```

### batch

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const unswatch = watchPendingTransactions(config, {
  chainId: mainnet.id, // [!code focus]
  onTransactions(transactions) {
    console.log("New transactions!", transactions)
  },
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onError

### poll

### pollInterval

### syncConnectedChain

## Return Type

```ts
import { type WatchPendingTransactionsReturnType } from '@wagmi/core'
```

## Error

```ts
import { type WatchPendingTransactionsError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`watchPendingTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions.html)
