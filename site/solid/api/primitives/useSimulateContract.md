---
title: useSimulateContract
description: Primitive for simulating/validating a contract interaction.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'simulateContract'
const typeName = 'SimulateContract'
const TData = 'SimulateContractData'
const TError = 'SimulateContractErrorType'
</script>

# useSimulateContract

Primitive for simulating/validating a contract interaction.

## Import

```ts
import { useSimulateContract } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from '@wagmi/solid'
import { abi } from './abi'

function App() {
  const result = useSimulateContract(() => ({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

::: details Composing with `useWriteContract`

`useSimulateContract` can be combined with [`useWriteContract`](/solid/api/primitives/useWriteContract) to reduce the amount of validation required by wallets.

```tsx [index.tsx]
import { useSimulateContract, useWriteContract } from '@wagmi/solid'
import { abi } from './abi'

function App() {
  const { data } = useSimulateContract(() => ({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  }))
  const writeContract = useWriteContract()
  const request = data?.request
  // Call writeContract.mutate(request) when ready
}
```
:::

## Parameters

```ts
import { useSimulateContract } from '@wagmi/solid'

useSimulateContract.Parameters
useSimulateContract.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useSimulateContract(() => ({
  abi,
  address: '0x...',
  functionName: 'transferFrom',
  args: ['0x...', '0x...', 123n],
  // other parameters...
}))
```

### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/solid/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

### account

`Account | undefined`

Account to use when calling the contract (`msg.sender`). Throws if account is not found on [`connector`](#connector).

### address

`Address | undefined`

The contract's address.

### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### connector

`Connector | undefined`

[Connector](/solid/api/connectors) to simulate transaction with.

### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

### scopeKey

`string | undefined`

Scopes the cache to a given context. Primitives that have identical context will share the same cache.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useSimulateContract } from '@wagmi/solid'

useSimulateContract.ReturnType
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/solid/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`simulateContract`](/core/api/actions/simulateContract)
