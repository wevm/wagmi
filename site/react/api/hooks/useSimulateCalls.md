---
title: useSimulateCalls
description: Hook for simulating a batch of calls.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'simulateCalls'
const typeName = 'SimulateCalls'
const TData = 'SimulateCallsData'
const TError = 'SimulateCallsErrorType'
</script>

# useSimulateCalls

Hook for simulating a batch of calls and optionally tracing asset changes.

## Import

```ts
import { useSimulateCalls } from 'wagmi'
```

## Usage

::: code-group
```tsx twoslash [index.tsx]
// @twoslash-cache: {"v":1,"hash":"aff2f3ab7b02700d23bb7c37de2ce9d4da776b66392b5ed31e4390cfafafa86c","data":"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"}
import { useSimulateCalls } from 'wagmi'

function App() {
  const result = useSimulateCalls({
    calls: [{
      to: '0x6b175474e89094c44da98b954eedeac495271d0f',
      data: '0x70a08231000000000000000000000000d2135cfb216b74109775236e36d4b433f1df507b',
    }],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSimulateCallsParameters } from 'wagmi'
```

### calls

`readonly Call[] | undefined`

Calls to simulate. Supports ABI contract calls and transaction request fields. The query does not run until `calls` is provided.

### account

`Account | Address | undefined`

Account attached to calls (`msg.sender`). Defaults to the connected address. Required when `traceAssetChanges` is `true`.

### connector

`Connector | undefined`

Connector used to resolve `account` when it is omitted. Defaults to the active connector.

### blockNumber / blockTag

`bigint | BlockTag | undefined`

Block number or tag to simulate against. They are mutually exclusive; `blockTag` defaults to `'latest'`.

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

[`Config`](/react/api/createConfig#config) to use instead of the nearest [`WagmiProvider`](/react/api/WagmiProvider).

### scopeKey

`string | undefined`

Scopes the cache to a given context.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseSimulateCallsReturnType } from 'wagmi'
```

The `data` property contains `assetChanges`, the simulated `block`, and typed call `results` with status, result, return data, gas used, logs, and errors.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`simulateCalls`](/core/api/actions/simulateCalls)

## Viem

- [`simulateCalls`](https://viem.sh/docs/actions/public/simulateCalls)
