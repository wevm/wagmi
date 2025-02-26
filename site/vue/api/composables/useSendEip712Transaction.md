---
title: useSendTransaction
description: Composable for creating, signing, and sending transactions to networks.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'sendEip712Transaction'
const typeName = 'SendEip712Transaction'
const mutate = 'sendEip712Transaction'
const TData = 'SendEip712TransactionData'
const TError = 'SendEip712TransactionErrorType'
const TVariables = 'SendEip712TransactionVariables'
</script>

# useSendEip712Transaction

Composable for creating, signing, and sending transactions to ZKsync networks.

## Import

```ts
import { useSendEip712Transaction } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSendEip712Transaction } from '@wagmi/vue'
import { parseEther } from 'viem'

const { sendEip712Transaction } = useSendEip712Transaction()
</script>

<template>
  <button
    @click="sendEip712Transaction({
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
      paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021',
      paymasterInput: '0x8c5a...',
    })"
  >
    Send transaction
  </button>
</template>
```
<<< @/snippets/vue/config-zksync.ts[config.ts]
:::

## Parameters

```ts
import { type UseSendEip712TransactionParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSendEip712Transaction } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const result = useSendEip712Transaction({
  config, // [!code focus]
})
</script>
```

```ts [config.ts]
import { http, createConfig } from '@wagmi/core'
import { zksync, zkSyncSepoliaTestnet } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [zksync, zkSyncSepoliaTestnet],
  transports: {
    [zksync.id]: http(),
    [zkSyncSepoliaTestnet.id]: http(),
  },
})
```
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSendEip712TransactionReturnType } from '@wagmi/vue'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`sendEip712Transaction`](/core/api/actions/sendEip712Transaction)
