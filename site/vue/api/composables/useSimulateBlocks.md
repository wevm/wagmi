---
title: useSimulateBlocks
description: Composable for simulating calls across one or more blocks.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'simulateBlocks'
const typeName = 'SimulateBlocks'
const TData = 'SimulateBlocksData'
const TError = 'SimulateBlocksErrorType'
</script>

# useSimulateBlocks

Composable for simulating calls across one or more blocks.

## Import

```ts
import { useSimulateBlocks } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSimulateBlocks } from '@wagmi/vue'

const result = useSimulateBlocks({
  blocks: [{
    calls: [{
      to: '0x6b175474e89094c44da98b954eedeac495271d0f',
      data: '0x70a08231000000000000000000000000d2135cfb216b74109775236e36d4b433f1df507b',
    }],
  }],
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSimulateBlocksParameters } from '@wagmi/vue'
```

The parameters object and its properties may be Vue refs.

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

[`Config`](/vue/api/createConfig#config) to use instead of the nearest [`WagmiPlugin`](/vue/api/WagmiPlugin).

### scopeKey

`string | undefined`

Scopes the cache to a given context.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseSimulateBlocksReturnType } from '@wagmi/vue'
```

The `data` ref contains simulated blocks and typed call results, including status, result, return data, gas used, logs, and errors.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`simulateBlocks`](/core/api/actions/simulateBlocks)

## Viem

- [`simulateBlocks`](https://viem.sh/docs/actions/public/simulateBlocks)
