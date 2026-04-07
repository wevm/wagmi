---
title: useWriteContractSync
description: Primitive for executing a write function on a contract and waiting for the transaction receipt.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'writeContractSync'
const typeName = 'WriteContractSync'
const mutate = 'writeContractSync'
const TData = 'WriteContractSyncData'
const TError = 'WriteContractSyncErrorType'
const TVariables = 'WriteContractSyncVariables'
</script>

# useWriteContractSync

Primitive for executing a write function on a contract and waiting for the transaction receipt.

Unlike [`useWriteContract`](/solid/api/primitives/useWriteContract), this primitive waits for the transaction to be included in a block before resolving, returning a `TransactionReceipt` instead of just a transaction hash.

## Import

```ts
import { useWriteContractSync } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWriteContractSync } from '@wagmi/solid'
import { abi } from './abi'

function App() {
  const writeContractSync = useWriteContractSync()

  const handleMint = () => {
    writeContractSync.mutate({
      abi,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      functionName: 'mint',
    })
  }

  // writeContractSync.data contains the TransactionReceipt when successful
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useWriteContractSync } from '@wagmi/solid'

useWriteContractSync.Parameters
useWriteContractSync.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { useWriteContractSync } from '@wagmi/solid'

useWriteContractSync.ReturnType
```

The return type's [`data`](#data) property is a `TransactionReceipt` containing the full receipt of the confirmed transaction.

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`writeContract`](/core/api/actions/writeContract)
