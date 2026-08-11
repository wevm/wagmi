---
title: useSignTransaction
description: Hook for signing transactions.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'signTransaction'
const typeName = 'SignTransaction'
const mutate = 'signTransaction'
const TData = 'SignTransactionData'
const TError = 'SignTransactionErrorType'
const TVariables = 'SignTransactionVariables'
</script>

# useSignTransaction

Hook for signing transactions.

## Import

```ts
import { useSignTransaction } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSignTransaction } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const signTransaction = useSignTransaction()
  return (
    <button
      onClick={() =>
        signTransaction.mutate({
          to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
          value: parseEther('0.01'),
        })
      }
    >
      Sign transaction
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSignTransactionParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSignTransaction } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const signTransaction = useSignTransaction({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSignTransactionReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`signTransaction`](/core/api/actions/signTransaction)
