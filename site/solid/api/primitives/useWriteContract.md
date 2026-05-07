---
title: useWriteContract
description: Primitive for executing a write function on a contract.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'writeContract'
const typeName = 'WriteContract'
const mutate = 'writeContract'
const TData = 'WriteContractData'
const TError = 'WriteContractErrorType'
const TVariables = 'WriteContractVariables'
</script>

# useWriteContract

Primitive for executing a write function on a contract.

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.

## Import

```ts
import { useWriteContract } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWriteContract } from '@wagmi/solid'
import { abi } from './abi'

function App() {
  const writeContract = useWriteContract()

  const handleTransfer = () => {
    writeContract.mutate({
      abi,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      functionName: 'transferFrom',
      args: [
        '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        123n,
      ],
    })
  }
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

### Synchronous Usage

If you want to wait for the transaction to be included in a block, you can use `useWriteContractSync`:

::: code-group
```tsx [index.tsx]
import { useWriteContractSync } from '@wagmi/solid'
import { abi } from './abi'

function App() {
  const writeContractSync = useWriteContractSync()

  const handleTransfer = () => {
    writeContractSync.mutate({
      abi,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      functionName: 'transferFrom',
      args: [
        '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        123n,
      ],
    })
  }
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useWriteContract } from '@wagmi/solid'

useWriteContract.Parameters
useWriteContract.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { useWriteContract } from '@wagmi/solid'

useWriteContract.ReturnType
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/solid/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/mutation-result.md-->

## Type Inference

With [`abi`](/core/api/actions/writeContract#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](/core/api/actions/writeContract#functionname), [`args`](/core/api/actions/writeContract#args), and the [`value`](/core/api/actions/writeContract##value). See the Wagmi [TypeScript docs](/solid/typescript) for more information.

<!--@include: @shared/mutation-imports.md-->

## Action

- [`writeContract`](/core/api/actions/writeContract)
