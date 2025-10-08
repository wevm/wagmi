---
title: useSendCallsSync
description: Hook that requests for the wallet to sign and broadcast a batch of calls (transactions) to the network. 
---

<script setup>
const packageName = 'wagmi'
const actionName = 'sendCallsSync'
const typeName = 'SendCallsSync'
const mutate = 'sendCallsSync'
const TData = 'SendCallsSyncData'
const TError = 'SendCallsSyncErrorType'
const TVariables = 'SendCallsSyncVariables'
</script>

# useSendCallsSync

Hook that requests for the wallet to sign and broadcast a batch of calls (transactions) to the network. 

[Read more.](https://github.com/ethereum/EIPs/blob/815028dc634463e1716fc5ce44c019a6040f0bef/EIPS/eip-5792.md#wallet_sendcallsSync)

## Import

```ts
import { useSendCallsSync } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSendCallsSync } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const { sendCallsSync } = useSendCallsSync()

  return (
    <button
      onClick={() =>
        sendCallsSync({
          calls: [
            {
              to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
              value: parseEther('1')
            },
            {
              data: '0xdeadbeef',
              to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            },
          ]
        })
      }
    >
      Send calls
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSendCallsSyncParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSendCallsSync } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSendCallsSync({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSendCallsSyncReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`sendCallsSync`](/core/api/actions/sendCallsSync)
