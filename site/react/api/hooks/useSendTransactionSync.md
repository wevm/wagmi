---
title: useSendTransactionSync
description: Hook for creating, signing, and sending transactions to the network synchronously.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'sendTransactionSync'
const typeName = 'SendTransactionSync'
const mutate = 'sendTransactionSync'
const TData = 'SendTransactionSyncData'
const TError = 'SendTransactionSyncErrorType'
const TVariables = 'SendTransactionSyncVariables'
</script>

# useSendTransactionSync

Hook for creating, signing, and sending transactions to the network synchronously.
Waits for the transaction to be included in a block before returning.

## Import

```ts
import { useSendTransactionSync } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSendTransactionSync } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const { sendTransactionSync } = useSendTransactionSync()

  return (
    <button
      onClick={() =>
        sendTransactionSync({
          to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
          value: parseEther('0.01'),
        })
      }
    >
      Send transaction
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSendTransactionSyncParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSendTransactionSync } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSendTransactionSync({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSendTransactionSyncReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`sendTransactionSync`](/core/api/actions/sendTransactionSync)
