---
title: useSimulateCalls
description: Primitive for simulating a batch of calls.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'simulateCalls'
const typeName = 'SimulateCalls'
const TData = 'SimulateCallsData'
const TError = 'SimulateCallsErrorType'
</script>

# useSimulateCalls

Primitive for simulating a batch of calls and optionally tracing asset changes.

## Import

```ts
import { useSimulateCalls } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSimulateCalls } from '@wagmi/solid'

function App() {
  const result = useSimulateCalls(() => ({
    calls: [{
      to: '0x6b175474e89094c44da98b954eedeac495271d0f',
      data: '0x70a08231000000000000000000000000d2135cfb216b74109775236e36d4b433f1df507b',
    }],
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useSimulateCalls } from '@wagmi/solid'

useSimulateCalls.Parameters
useSimulateCalls.SolidParameters
```

Parameters are passed as a getter to maintain Solid reactivity.

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

[`Config`](/solid/api/createConfig#config) to use instead of the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### scopeKey

`string | undefined`

Scopes the cache to a given context.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useSimulateCalls } from '@wagmi/solid'

useSimulateCalls.ReturnType
```

The `data` property contains `assetChanges`, the simulated `block`, and typed call `results` with status, result, return data, gas used, logs, and errors.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`simulateCalls`](/core/api/actions/simulateCalls)

## Viem

- [`simulateCalls`](https://viem.sh/docs/actions/public/simulateCalls)
