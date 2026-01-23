---
title: useWriteContract
description: Composable for executing a write function on a contract.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'writeContract'
const typeName = 'WriteContract'
const mutate = 'writeContract'
const TData = 'WriteContractReturnType'
const TError = 'WriteContractErrorType'
const TVariables = 'WriteContractVariables'
</script>

# useWriteContract

Composable for executing a write function on a contract.

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.

## Import

```ts
import { useWriteContract } from '@wagmi/vue'
```

## Usage

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { useWriteContract } from '@wagmi/vue'
import { abi } from './abi'

const writeContract = useWriteContract()
</script>

<template>
  <button @click="writeContract.mutate({ 
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })">
    Transfer
  </button>
</template>
```

<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

<!-- TODO: Usage for simulating before -->

<!-- TODO: Usage for estimating gas before -->

## Parameters

```ts
import { type UseWriteContractParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { useWriteContract } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const writeContract = useWriteContract({
  config, // [!code focus]
})
</script>
```

<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseWriteContractReturnType } from '@wagmi/vue'
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/vue/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/mutation-result.md-->

## Type Inference

With [`abi`](/core/api/actions/writeContract#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](/core/api/actions/writeContract#functionname), [`args`](/core/api/actions/writeContract#args), and the [`value`](/core/api/actions/writeContract##value). See the Wagmi [TypeScript docs](/vue/typescript) for more information.

<!--@include: @shared/mutation-imports.md-->

## Action

- [`writeContract`](/core/api/actions/writeContract)
