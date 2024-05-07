# watchBlocks

Action that watches for block changes.

## Import

```ts
import { watchBlocks } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  onBlock(block) {
    console.log('Block changed!', block)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchBlocksParameters } from '@wagmi/core'
```

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

Watch for new blocks on a given tag. Defaults to `'latest'`.

::: code-group
```ts [index.ts]
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  blockTag: 'pending', // [!code focus]
  onBlock(block) {
    console.log('Block changed!', block)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { watchBlocks } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const unwatch = watchBlocks(config, {
  chainId: mainnet.id, // [!code focus]
  onBlock(block) {
    console.log('Block changed!', block)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### emitMissed

`boolean`

Whether or not to emit missed blocks to the callback. Defaults to `false`.

Missed blocks may occur in instances where internet connection is lost, or the block time is lesser than the polling interval of the client.

::: code-group
```ts [index.ts]
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  emitMissed: true, // [!code focus]
  onBlock(block) {
    console.log('Block changed!', block)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### emitOnBegin

`boolean`

Whether or not to emit the block to the callback when the subscription opens. Defaults to `false`.

::: code-group
```ts [index.ts]
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  emitOnBegin: true, // [!code focus]
  onBlock(block) {
    console.log('Block changed!', block)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onBlock

`(block: Block, prevblock: Block | undefined) => void`

Callback for when block changes.

::: code-group
```ts [index.ts]
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  onBlock(block) { // [!code focus]
    console.log('Block changed!', block) // [!code focus]
  }, // [!code focus]
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onError

`((error: Error) => void) | undefined`

Error thrown from getting the block.

::: code-group
```ts [index.ts]
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  onBlock(block) { 
    console.log('Block changed!', block) 
  }, 
  onError(error) { // [!code focus]
    console.error('Block error', error) // [!code focus]
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
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  poll: true, // [!code focus]
  onBlock(block) {
    console.log('Block changed!', block)
  },
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
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  pollingInterval: 1_000, // [!code focus]
  onBlock(block) {
    console.log('Block changed!', block)
  },
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
import { watchBlocks } from '@wagmi/core'
import { config } from './config'

const unwatch = watchBlocks(config, {
  onBlock(block) {
    console.log('Block changed!', block)
  },
  syncConnectedChain: false, // [!code focus]
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WatchBlocksReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.

## Viem

- [`watchBlocks`](https://viem.sh/docs/actions/public/watchBlocks.html)
