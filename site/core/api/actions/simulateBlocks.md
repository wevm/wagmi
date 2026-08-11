<script setup>
const packageName = '@wagmi/core'
const actionName = 'simulateBlocks'
const typeName = 'SimulateBlocks'
</script>

# simulateBlocks

Simulates calls across one or more blocks, with optional block and state overrides.

## Import

```ts
import { simulateBlocks } from '@wagmi/core'
```

## Usage

::: code-group
```ts twoslash [index.ts]
// @twoslash-cache: {"v":1,"hash":"c3d4666de2f2a44af4106ade18aad45a262eced63b5380cbab1f81f430ff05a9","data":"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"}
// @filename: config.ts
import { createConfig, http } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
export const config = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
})
// @filename: index.ts
// ---cut---
import { simulateBlocks } from '@wagmi/core'
import { config } from './config'

const result = await simulateBlocks(config, {
  blocks: [{
    calls: [{
      to: '0x6b175474e89094c44da98b954eedeac495271d0f',
      data: '0x70a08231000000000000000000000000d2135cfb216b74109775236e36d4b433f1df507b',
    }],
  }],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SimulateBlocksParameters } from '@wagmi/core'
```

### blocks

`readonly { calls: readonly Call[]; blockOverrides?: BlockOverrides; stateOverrides?: StateOverride }[]`

Blocks to simulate. Each block requires a `calls` array. Calls support contract calls (`abi`, `to`, `functionName`, and `args`) and transaction request fields such as `account`, `data`, and `value`.

- `blockOverrides` overrides block fields such as number, timestamp, base fee, gas limit, fee recipient, and randomness for that simulated block.
- `stateOverrides` overrides account state such as balance, nonce, code, and storage for that simulated block.

See Viem's [`simulateBlocks` parameters](https://viem.sh/docs/actions/public/simulateBlocks#parameters) for the complete call and override shapes.

### blockNumber (optional)

`bigint | undefined`

Block number to simulate against. Cannot be used with `blockTag`.

### blockTag (optional)

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to simulate against. Defaults to `'latest'`. Cannot be used with `blockNumber`.

### chainId (optional)

`config['chains'][number]['id'] | undefined`

ID of chain to use.

### returnFullTransactions (optional)

`boolean | undefined`

Whether returned blocks include full transactions instead of transaction hashes.

### traceTransfers (optional)

`boolean | undefined`

Whether to trace ETH transfers as logs.

### validation (optional)

`boolean | undefined`

Whether to enable validation mode.

## Return Type

```ts
import { type SimulateBlocksReturnType } from '@wagmi/core'
```

`readonly (Block & { calls: readonly CallResult[] })[]`

Simulated blocks and their call results. Each call result includes status, decoded result (when an ABI call is provided), return data, gas used, optional logs, and an error for failed calls.

## Error

```ts
import { type SimulateBlocksErrorType } from '@wagmi/core'
```

## Viem

- [`simulateBlocks`](https://viem.sh/docs/actions/public/simulateBlocks)
