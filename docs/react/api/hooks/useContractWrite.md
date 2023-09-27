---
title: useContractWrite
description: Action for executing a write function on a contract.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'writeContract'
const typeName = 'WriteContract'
const mutate = 'writeContract'
const TData = 'WriteContractReturnType'
const TError = 'WriteContractError'
const TVariables = 'WriteContractVariables'
</script>

# useContractWrite

Action for executing a write function on a contract.

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.

## Import

```ts
import { useContractWrite } from 'wagmi'
```

## Usage

::: code-group

```tsx [index.tsx]
import { useContractWrite } from 'wagmi'
import { abi } from './abi'

function App() {
  const { writeContract } = useContractWrite()

  return (
    <button 
      onClick={() => 
        writeContract({ 
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
    >
      Transfer
    </button>
  )
}
```

<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

<!-- TODO: Usage for simulating before -->

<!-- TODO: Usage for estimating gas before -->

## Parameters

```ts
import { type UseContractWriteParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/WagmiProvider).

::: code-group

```tsx [index.tsx]
import { useContractWrite } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useContractWrite({
    config, // [!code focus]
  })
}
```

<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseContractWriteReturnType } from 'wagmi'
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Type Inference

With [`abi`](/core/api/actions/writeContract#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](/core/api/actions/writeContract#functionname), [`args`](/core/api/actions/writeContract#args), and the [`value`](/core/api/actions/writeContract##value). See the Wagmi [TypeScript docs](/react/typescript) for more information.

## Action

- [`writeContract`](/core/api/actions/writeContract)
