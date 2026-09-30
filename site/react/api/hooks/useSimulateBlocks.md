---
title: useSimulateBlocks
description: Hook for simulating calls across one or more blocks.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'simulateBlocks'
const typeName = 'SimulateBlocks'
const TData = 'SimulateBlocksData'
const TError = 'SimulateBlocksErrorType'
</script>

# useSimulateBlocks

Hook for simulating calls across one or more blocks.

## Import

```ts
import { useSimulateBlocks } from 'wagmi'
```

## Usage

::: code-group
```tsx twoslash [index.tsx]
// @twoslash-cache: {"v":1,"hash":"ab75562fb1148976d79623fe1846cdb33773fb10a8a55968dce033ec24f52aac","data":"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"}
import { useSimulateBlocks } from 'wagmi'

function App() {
  const result = useSimulateBlocks({
    blocks: [{
      calls: [{
        to: '0x6b175474e89094c44da98b954eedeac495271d0f',
        data: '0x70a08231000000000000000000000000d2135cfb216b74109775236e36d4b433f1df507b',
      }],
    }],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSimulateBlocksParameters } from 'wagmi'
```

### blocks

`readonly { calls: readonly Call[]; blockOverrides?: BlockOverrides; stateOverrides?: StateOverride }[] | undefined`

Blocks to simulate. Each block requires `calls`. `blockOverrides` changes block fields, while `stateOverrides` changes account balance, nonce, code, or storage. The query does not run until `blocks` is provided.

### blockNumber / blockTag

`bigint | BlockTag | undefined`

Block number or tag to simulate against. They are mutually exclusive; `blockTag` defaults to `'latest'`.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use. Defaults to the current chain.

### returnFullTransactions

`boolean | undefined`

Whether returned blocks include full transactions.

### traceTransfers

`boolean | undefined`

Whether to trace ETH transfers as logs.

### validation

`boolean | undefined`

Whether to enable validation mode.

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of the nearest [`WagmiProvider`](/react/api/WagmiProvider).

### scopeKey

`string | undefined`

Scopes the cache to a given context.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseSimulateBlocksReturnType } from 'wagmi'
```

The `data` property contains simulated blocks and typed call results, including status, result, return data, gas used, logs, and errors.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`simulateBlocks`](/core/api/actions/simulateBlocks)

## Viem

- [`simulateBlocks`](https://viem.sh/docs/actions/public/simulateBlocks)
