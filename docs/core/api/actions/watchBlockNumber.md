# watchBlockNumber

Subscribe to block number changes.

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
    console.error("Block number error", error) // [!code focus]
  }, // [!code focus]
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/createConfig#syncconnectedchain).

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
