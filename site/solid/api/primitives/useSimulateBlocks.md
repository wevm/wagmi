---
title: useSimulateBlocks
description: Primitive for simulating calls across one or more blocks.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'simulateBlocks'
const typeName = 'SimulateBlocks'
const TData = 'SimulateBlocksData'
const TError = 'SimulateBlocksErrorType'
</script>

# useSimulateBlocks

Primitive for simulating calls across one or more blocks.

## Import

```ts
import { useSimulateBlocks } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSimulateBlocks } from '@wagmi/solid'

function App() {
  const result = useSimulateBlocks(() => ({
    blocks: [{
      calls: [{
        to: '0x6b175474e89094c44da98b954eedeac495271d0f',
        data: '0x70a08231000000000000000000000000d2135cfb216b74109775236e36d4b433f1df507b',
      }],
    }],
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useSimulateBlocks } from '@wagmi/solid'

useSimulateBlocks.Parameters
useSimulateBlocks.SolidParameters
```

Parameters are passed as a getter to maintain Solid reactivity.

### blocks

`readonly { calls: readonly Call[]; blockOverrides?: BlockOverrides; stateOverrides?: StateOverride }[] | undefined`

Blocks to simulate. Each block requires `calls`. `blockOverrides` changes block fields, while `stateOverrides` changes account balance, nonce, code, or storage. The query does not run until `blocks` is provided.

### blockNumber / blockTag

`bigint | BlockTag | undefined`

Mutually exclusive block number or tag to simulate against. `blockTag` defaults to `'latest'`.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use. Defaults to the current chain.

### returnFullTransactions

`boolean | undefined`

Whether returned blocks include full transactions.

### traceTransfers / validation

`boolean | undefined`

Whether to trace ETH transfers as logs, and whether to enable validation mode, respectively.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### scopeKey

`string | undefined`

Scopes the cache to a given context.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useSimulateBlocks } from '@wagmi/solid'

useSimulateBlocks.ReturnType
```

The `data` property contains simulated blocks and typed call results, including status, result, return data, gas used, logs, and errors.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`simulateBlocks`](/core/api/actions/simulateBlocks)

## Viem

- [`simulateBlocks`](https://viem.sh/docs/actions/public/simulateBlocks)
