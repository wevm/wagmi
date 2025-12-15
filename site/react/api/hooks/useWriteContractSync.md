---
title: useWriteContractSync
description: Action for executing a write function on a contract synchronously.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'writeContractSync'
const typeName = 'WriteContractSync'
const mutate = 'writeContractSync'
const TData = 'WriteContractSyncReturnType'
const TError = 'WriteContractSyncErrorType'
const TVariables = 'WriteContractSyncVariables'
</script>

# useWriteContractSync

Hook for executing a write function on a contract synchronously. Waits for the transaction to be included in a block before returning.

## Import

```ts
import { useWriteContractSync } from 'wagmi'
```

## Usage

::: code-group

```tsx [index.tsx]
import { useWriteContractSync } from 'wagmi'
import { abi } from './abi'

function App() {
  const writeContractSync = useWriteContractSync()
  return (
    <button 
      onClick={() => 
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
import { type UseWriteContractSyncParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group

```tsx [index.tsx]
import { useWriteContractSync } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const writeContractSync = useWriteContractSync({
    config, // [!code focus]
  })
}
```

<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseWriteContractSyncReturnType } from 'wagmi'
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/mutation-result.md-->

## Type Inference

With [`abi`](/core/api/actions/writeContractSync#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](/core/api/actions/writeContractSync#functionname), [`args`](/core/api/actions/writeContractSync#args), and the [`value`](/core/api/actions/writeContractSync##value). See the Wagmi [TypeScript docs](/react/typescript) for more information.

<!--@include: @shared/mutation-imports.md-->

## Action

- [`writeContractSync`](/core/api/actions/writeContractSync)
