<script setup>
const packageName = '@wagmi/core'
const actionName = 'getBlockNumber'
const typeName = 'GetBlockNumber'
</script>

# getBlockNumber

Action for fetching the number of the most recent block seen.

## Import

```ts
import { getBlockNumber } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getBlockNumber } from '@wagmi/core'
import { config } from './config'

const blockNumber = await getBlockNumber(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetBlockNumberParameters } from '@wagmi/core'
```

### cacheTime

`number | undefined`

Time in milliseconds that cached block number will remain in memory.

::: code-group
```ts [index.ts]
import { getBlockNumber } from '@wagmi/core'
import { config } from './config'

const blockNumber = await getBlockNumber(config, {
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
import { getBlockNumber } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const blockNumber = await getBlockNumber(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetBlockNumberReturnType } from '@wagmi/core'
```

`bigint`

Most recent block number seen.

## Error

```ts
import { type GetBlockNumberError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## watchBlockNumber

Subscribe to block number changes.

### Import

```ts
import { watchBlockNumber } from '@wagmi/core'
```

### Usage

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

### Parameters

```ts
import { type WatchBlockNumberParameters } from '@wagmi/core'
```

#### chainId

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

#### onBlockNumber

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

#### onError

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

#### syncConnectedChain

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

### Return Type

```ts
import { type WatchBlockNumberReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.

## Viem

- [`getBlockNumber`](https://viem.sh/docs/actions/public/getBlockNumber.html)
- [`watchBlockNumber`](https://viem.sh/docs/actions/public/watchBlockNumber.html)
