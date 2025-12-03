---
title: useSendTransaction
description: Hook for creating, signing, and sending transactions to networks.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'sendTransaction'
const typeName = 'SendTransaction'
const mutate = 'sendTransaction'
const TData = 'SendTransactionData'
const TError = 'SendTransactionErrorType'
const TVariables = 'SendTransactionVariables'
</script>

# useSendTransaction

Hook for creating, signing, and sending transactions to networks.

## Import

```ts
import { useSendTransaction } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const sendTransaction = useSendTransaction()
  return (
    <button
      onClick={() =>
        sendTransaction.mutate({
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
import { type UseSendTransactionParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSendTransaction } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const sendTransaction = useSendTransaction({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSendTransactionReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`sendTransaction`](/core/api/actions/sendTransaction)
