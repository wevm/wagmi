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
    console.log('New transactions!', transactions)
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

`boolean | undefined`

- Whether or not the transactions should be batched on each invocation.
- Defaults to `true`.

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'

const unwatch = watchPendingTransactions(config, {
  batch: false, // [!code focus]
  onTransactions(transactions) {
    console.log('New transactions!', transactions)
  },
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const unwatch = watchPendingTransactions(config, {
  chainId: mainnet.id, // [!code focus]
  onTransactions(transactions) {
    console.log('New transactions!', transactions)
  },
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onError

`((error: Error) => void) | undefined`

Error thrown from watching pending transactions.

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'
import { config } from './config'

const unwatch = watchPendingTransactions(config, {
  onError(error) { // [!code focus]
    console.log('Error', error) // [!code focus]
  }, // [!code focus]
  onTransactions(transactions) {
    console.log('New transactions!', transactions)
  },
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onTransactions

`(transactions: Hash[], prevTransactions: Hash[] | undefined) => void`

Callback when new incoming pending transactions are detected.

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'
import { config } from './config'

const unwatch = watchPendingTransactions(config, {
  onTransactions(transactions) { // [!code focus]
    console.log('New transactions!', transactions) // [!code focus]
  }, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new pending transactions instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'
import { config } from './config'

const unwatch = watchPendingTransactions(config, {
  onTransactions(transactions) {
    console.log('New transactions!', transactions)
  },
  poll: false, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'
import { config } from './config'

const unwatch = watchPendingTransactions(config, {
  onTransactions(transactions) {
    console.log('New transactions!', transactions)
  },
  pollingInterval: 1_000, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

::: code-group
```ts [index.ts]
import { watchPendingTransactions } from '@wagmi/core'
import { config } from './config'

const unwatch = watchPendingTransactions(config, {
  onTransactions(transactions) {
    console.log('New transactions!', transactions)
  },
  syncConnectedChain: false, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WatchPendingTransactionsReturnType } from '@wagmi/core'
```

Function to unsubscribe from pending transaction listener.

## Error

```ts
import { type WatchPendingTransactionsError } from '@wagmi/core'
```

## Viem

- [`watchPendingTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions.html)
