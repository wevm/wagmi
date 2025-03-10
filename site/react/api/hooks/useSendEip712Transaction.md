---
title: useSendTransaction
description: Hook for creating, signing, and sending transactions to networks.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'sendEip712Transaction'
const typeName = 'SendEip712Transaction'
const mutate = 'sendEip712Transaction'
const TData = 'SendEip712TransactionData'
const TError = 'SendEip712TransactionErrorType'
const TVariables = 'SendEip712TransactionVariables'
</script>

# useSendEip712Transaction

Hook for creating, signing, and sending transactions to ZKsync networks.

## Import

```ts
import { useSendEip712Transaction } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSendEip712Transaction } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const { sendEip712Transaction } = useSendEip712Transaction()

  return (
    <button
      onClick={() =>
        sendEip712Transaction({
          to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
          value: parseEther('0.01'),
          paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021',
          paymasterInput: '0x8c5a...'  
        })
      }
    >
      Send transaction
    </button>
  )
}
```
<<< @/snippets/react/config-zksync.ts[config.ts]
:::

## Parameters

```ts
import { type UseSendEip712TransactionParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSendEip712Transaction } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSendEip712Transaction({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config-zksync.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSendEip712TransactionReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`sendEip712Transaction`](/core/api/actions/sendEip712Transaction)
