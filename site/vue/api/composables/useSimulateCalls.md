---
title: useSimulateCalls
description: Composable for simulating a batch of calls.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'simulateCalls'
const typeName = 'SimulateCalls'
const TData = 'SimulateCallsData'
const TError = 'SimulateCallsErrorType'
</script>

# useSimulateCalls

Composable for simulating a batch of calls and optionally tracing asset changes.

## Import

```ts
import { useSimulateCalls } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSimulateCalls } from '@wagmi/vue'

const result = useSimulateCalls({
  calls: [{
    to: '0x6b175474e89094c44da98b954eedeac495271d0f',
    data: '0x70a08231000000000000000000000000d2135cfb216b74109775236e36d4b433f1df507b',
  }],
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSimulateCallsParameters } from '@wagmi/vue'
```

The parameters object and its properties may be Vue refs.

### calls

`readonly Call[] | undefined`

Calls to simulate. Supports ABI contract calls and transaction request fields. The query does not run until `calls` is provided.

### account / connector

`Account | Address | Connector | undefined`

`account` is attached to calls as `msg.sender` and defaults to the connected address. When omitted, `connector` resolves the account and defaults to the active connector. An account is required when `traceAssetChanges` is `true`.

### blockNumber / blockTag

`bigint | BlockTag | undefined`

Mutually exclusive block number or tag to simulate against. `blockTag` defaults to `'latest'`.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use. Defaults to the current chain.

### stateOverrides

`StateOverride | undefined`

Overrides account balance, nonce, code, or storage during simulation.

### traceAssetChanges

`boolean | undefined`

Whether to trace asset balance changes. Requires an account directly, from `connector`, or from the active connection.

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
import { type UseSimulateCallsReturnType } from '@wagmi/vue'
```

The `data` ref contains `assetChanges`, the simulated `block`, and typed call `results` with status, result, return data, gas used, logs, and errors.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`simulateCalls`](/core/api/actions/simulateCalls)

## Viem

- [`simulateCalls`](https://viem.sh/docs/actions/public/simulateCalls)
