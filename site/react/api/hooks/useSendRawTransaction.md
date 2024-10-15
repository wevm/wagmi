---
title: useSendRawTransaction
description: Hook for sending a signed transaction to the network.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'sendRawTransaction'
const typeName = 'SendRawTransaction'
const mutate = 'sendRawTransaction'
const TData = 'SendRawTransactionData'
const TError = 'SendRawTransactionErrorType'
const TVariables = 'SendRawTransactionVariables'
</script>

# useSendRawTransaction

Hook for sending a signed transaction to the network.

## Import

```ts
import { useSendRawTransaction } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSendRawTransaction } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const { sendRawTransaction } = useSendRawTransaction()

  return (
    <button
      onClick={() =>
        sendRawTransaction({
          serializedTransaction: '0x02f870018203118085065e22cad982520894d2135cfb216b74109775236e36d4b433f1df507b872386f26fc1000080c080a0af0d6c8691aae5ecfe11b40f69ea580980175ce3a242b431f65c6192c5f59663a0016d0a36a9b3100da6a45d818a4261d64ad5276d07f6313e816777705e619b91',
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
import { type UseSendRawTransactionParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSendRawTransaction } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSendRawTransaction({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSendRawTransactionReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`sendRawTransaction`](/core/api/actions/sendRawTransaction)
