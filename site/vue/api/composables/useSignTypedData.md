---
title: useSignTypedData
description: Composable for signing typed data and calculating an Ethereum-specific EIP-712 signature.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'signTypedData'
const typeName = 'SignTypedData'
const mutate = 'signTypedData'
const TData = 'SignTypedDataData'
const TError = 'SignTypedDataErrorType'
const TVariables = 'SignTypedDataVariables'
</script>

# useSignTypedData

Composable for signing typed data and calculating an Ethereum-specific [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature.

## Import

```ts
import { useSignTypedData } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSignTypedData } from '@wagmi/vue'

const signTypedData = useSignTypedData()
</script>

<template>
  <button
    @click="signTypedData.mutate({
      types: {
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' },
        ],
      },
      primaryType: 'Mail',
      message: {
        from: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
      },
    })"
  >
    Sign message
  </button>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSignTypedDataParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSignTypedData } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const signTypedData = useSignTypedData({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSignTypedDataReturnType } from '@wagmi/vue'
```

<!--@include: @shared/mutation-result.md-->

## Type Inference

With [`types`](/core/api/actions/signTypedData#types) setup correctly, TypeScript will infer the correct types for [`domain`](/core/api/actions/signTypedData#domain), [`message`](/core/api/actions/signTypedData#message), and [`primaryType`](/core/api/actions/signTypedData#primarytype). See the Wagmi [TypeScript docs](/vue/typescript) for more information.

::: code-group
```ts twoslash [Inline]
// @twoslash-cache: {"v":1,"hash":"d347b35c1f3533593f8f8fd4f638678cdbe6746b6703290029ec262c44dffe62","data":"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"}
import { useSignTypedData } from '@wagmi/vue'
// ---cut---
const signTypedData = useSignTypedData()

signTypedData.mutate({
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  // ^?


  message: {
  // ^?












    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```
```ts twoslash [Const-Asserted]
// @twoslash-cache: {"v":1,"hash":"eaf9c3d409bf800893a6c4a9064554dc68fdcaaccc9fdd1dd7d8f8bf1a066ba2","data":"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"}
import { useSignTypedData } from '@wagmi/vue'
// ---cut---
const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const

const signTypedData = useSignTypedData()

signTypedData.mutate({
  types,
  primaryType: 'Mail',
  // ^?


  message: {
  // ^?












    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```
:::

<!--@include: @shared/mutation-imports.md-->

## Action

- [`signTypedData`](/core/api/actions/signTypedData)
