# useWatchBlockNumber

Composable that watches for block number changes.

## Import

```ts
import { useWatchBlockNumber } from '@wagmi/vue'
```

## Usage

::: code-group
```ts [index.vue]
<script setup lang="ts">
import { useWatchBlockNumber } from '@wagmi/vue'

useWatchBlockNumber({
  onBlockNumber(blockNumber) {
    console.log('Block number changed!', blockNumber)
  },
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchBlockNumberParameters } from '@wagmi/vue'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to watch blocks at.

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

### emitMissed

`boolean`

Whether or not to emit missed blocks to the callback. Defaults to `false`.

Missed blocks may occur in instances where internet connection is lost, or the block time is lesser than the polling interval of the client.

### emitOnBegin

`boolean`

Whether or not to emit the block to the callback when the subscription opens. Defaults to `false`.

### enabled

`boolean`

Whether or not to watch for blocks. Defaults to `true`.

### onBlockNumber

`(block: Block, prevblock: Block | undefined) => void`

Callback for when block changes.

### onError

`((error: Error) => void) | undefined`

Error thrown from getting the block.

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new blocks instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

## Return Type

```ts
import { type UseWatchBlockNumberReturnType } from '@wagmi/vue'
```

Function for cleaning up watcher.

## Action

- [`watchBlockNumber`](/core/api/actions/watchBlockNumber)
