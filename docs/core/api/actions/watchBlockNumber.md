# watchBlockNumber

Action that watches for block number changes.

## Import

```ts
import { watchBlockNumber } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  onBlockNumber(blockNumber) {
    console.log('Block number changed!', blockNumber)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchBlockNumberParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  chainId: mainnet.id, // [!code focus]
  onBlockNumber(blockNumber) {
    console.log('Block number changed!', blockNumber)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### emitOnBegin

`boolean | undefined`

Whether or not to emit the latest block number to the callback when the subscription opens.

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  emitOnBegin: true, // [!code focus]
  onBlockNumber(blockNumber) {
    console.log('Block number changed!', blockNumber)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### emitMissed

`boolean | undefined`

Whether or not to emit the missed block numbers to the callback.

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  emitMissed: true, // [!code focus]
  onBlockNumber(blockNumber) {
    console.log('Block number changed!', blockNumber)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::


### onBlockNumber

`(blockNumber: bigint, prevBlockNumber: bigint | undefined) => void`

Callback for when block number changes.

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  onBlockNumber(blockNumber) { // [!code focus]
    console.log('Block number changed!', blockNumber) // [!code focus]
  }, // [!code focus]
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onError

`((error: Error) => void) | undefined`

Error thrown from getting the block number.

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  onBlockNumber(blockNumber) { 
    console.log('Block number changed!', blockNumber) 
  }, 
  onError(error) { // [!code focus]
    console.error('Block number error', error) // [!code focus]
  }, // [!code focus]
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new blocks instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  onBlockNumber(blockNumber) { 
    console.log('Block number changed!', blockNumber) 
  }, 
  poll: true, // [!code focus]
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  onBlockNumber(blockNumber) { 
    console.log('Block number changed!', blockNumber) 
  }, 
  pollingInterval: 1_000, // [!code focus]
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlockNumber(config, {
  onBlockNumber(blockNumber) {
    console.log('Block number changed!', blockNumber)
  },
  syncConnectedChain: false, // [!code focus]
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WatchBlockNumberReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.

## Viem

- [`watchBlockNumber`](https://viem.sh/docs/actions/public/watchBlockNumber.html)
