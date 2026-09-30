<script setup>
const packageName = '@wagmi/core'
const actionName = 'simulateCalls'
const typeName = 'SimulateCalls'
</script>

# simulateCalls

Simulates a batch of calls and returns their results and optional asset changes.

## Import

```ts
import { simulateCalls } from '@wagmi/core'
```

## Usage

::: code-group
```ts twoslash [index.ts]
// @twoslash-cache: {"v":1,"hash":"25a029f847549202de41ae41b7e8760eef1ab06234628a271359c261c6045cc4","data":"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"}
// @filename: config.ts
import { createConfig, http } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
export const config = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
})
// @filename: index.ts
// ---cut---
import { simulateCalls } from '@wagmi/core'
import { config } from './config'

const result = await simulateCalls(config, {
  calls: [{
    to: '0x6b175474e89094c44da98b954eedeac495271d0f',
    data: '0x70a08231000000000000000000000000d2135cfb216b74109775236e36d4b433f1df507b',
  }],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SimulateCallsParameters } from '@wagmi/core'
```

### calls

`readonly Call[]`

Calls to simulate. Supports contract calls (`abi`, `address`, `functionName`, and `args`) and transaction request fields such as `to`, `data`, and `value`. See Viem's [`calls` documentation](https://viem.sh/docs/actions/public/simulateCalls#calls).

### account (optional)

`Account | Address | undefined`

Account attached to the calls (`msg.sender`). Required when `traceAssetChanges` is `true`. If omitted and `connector` is provided, the connector's account is used.

### connector (optional)

`Connector | undefined`

Connector whose account is used when `account` is omitted. The connector is not used to execute the simulation; the configured client for `chainId` performs it.

### blockNumber (optional)

`bigint | undefined`

Block number to simulate against. Cannot be used with `blockTag`.

### blockTag (optional)

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to simulate against. Defaults to `'latest'`. Cannot be used with `blockNumber`.

### chainId (optional)

`config['chains'][number]['id'] | undefined`

ID of chain to use.

### stateOverrides (optional)

`StateOverride | undefined`

Overrides account state such as balance, nonce, code, and storage during simulation.

### traceAssetChanges (optional)

`boolean | undefined`

Whether to trace token and native asset balance changes. Requires `account` (directly or from `connector`).

### traceTransfers (optional)

`boolean | undefined`

Whether to trace ETH transfers as logs.

### validation (optional)

`boolean | undefined`

Whether to enable validation mode.

## Return Type

```ts
import { type SimulateCallsReturnType } from '@wagmi/core'
```

```ts
type ReturnType = {
  assetChanges: readonly AssetChange[]
  block: Block
  results: readonly CallResult[]
}
```

`assetChanges` contains each token and its pre-, post-, and differential balances. Each call result includes status, decoded result (when an ABI call is provided), return data, gas used, optional logs, and an error for failed calls.

## Error

```ts
import { type SimulateCallsErrorType } from '@wagmi/core'
```

## Viem

- [`simulateCalls`](https://viem.sh/docs/actions/public/simulateCalls)
