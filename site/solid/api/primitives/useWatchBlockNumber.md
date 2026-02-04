---
title: useWatchBlockNumber
description: Primitive for watching block number changes.
---

# useWatchBlockNumber

Primitive for watching block number changes.

## Import

```ts
import { useWatchBlockNumber } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchBlockNumber } from '@wagmi/solid'
import { createSignal } from 'solid-js'

function App() {
  const [blockNumber, setBlockNumber] = createSignal<bigint>()
  
  useWatchBlockNumber(() => ({
    onBlockNumber(blockNumber) {
      setBlockNumber(blockNumber)
    },
  }))
  
  return <p>Block number: {blockNumber()?.toString()}</p>
}
```
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

## Parameters

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useWatchBlockNumber(() => ({
  onBlockNumber(blockNumber) {
    // Handle new block number
  },
}))
```

### onBlockNumber

`(blockNumber: bigint, prevBlockNumber: bigint | undefined) => void`

Callback function called when the block number changes.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when watching.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### emitMissed

`boolean | undefined`

Whether or not to emit missed block numbers to the callback. Defaults to `false`.

Missed block numbers may occur in instances where internet connection is lost, or the block time is lesser than the polling interval of the client.

### emitOnBegin

`boolean | undefined`

Whether or not to emit the current block number when the watcher starts. Defaults to `false`.

### enabled

`boolean | undefined`

Whether or not to enable the watcher. Defaults to `true`.

### onError

`((error: Error) => void) | undefined`

Error handler called when an error occurs.

### poll

`boolean | undefined`

Whether or not to use polling. Defaults to the transport's `pollingInterval`.

### pollingInterval

`number | undefined`

Polling frequency (in ms). Defaults to the transport's `pollingInterval`.

### syncConnectedChain

`boolean | undefined`

Whether or not to sync the chain with the connected chain. Defaults to `true`.

## Return Type

`void`

## Action

- [`watchBlockNumber`](/core/api/actions/watchBlockNumber)
