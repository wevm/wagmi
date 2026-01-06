---
title: useSignTypedData
description: Hook for signing typed data and calculating an Ethereum-specific EIP-712 signature.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'signTypedData'
const typeName = 'SignTypedData'
const mutate = 'signTypedData'
const TData = 'SignTypedDataData'
const TError = 'SignTypedDataErrorType'
const TVariables = 'SignTypedDataVariables'
</script>

# useSignTypedData

Hook for signing typed data and calculating an Ethereum-specific [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature.

## Import

```ts
import { useSignTypedData } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSignTypedData } from 'wagmi'

function App() {
  const signTypedData = useSignTypedData()
  return (
    <button
      onClick={() =>
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
        })
      }
    >
      Sign message
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSignTypedDataParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSignTypedData } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const signTypedData = useSignTypedData({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSignTypedDataReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

## Type Inference

With [`types`](/core/api/actions/signTypedData#types) setup correctly, TypeScript will infer the correct types for [`domain`](/core/api/actions/signTypedData#domain), [`message`](/core/api/actions/signTypedData#message), and [`primaryType`](/core/api/actions/signTypedData#primarytype). See the Wagmi [TypeScript docs](/react/typescript) for more information.

::: code-group
```ts twoslash [Inline]
// @twoslash-cache: {"v":1,"hash":"d2bde2039b22db2dad4de0b0b1a903198c36d1f3885f32042523a928c54eac6c","data":"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"}
import { useSignTypedData } from 'wagmi'
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
// @twoslash-cache: {"v":1,"hash":"8427c5e54a9e414e6af6101fcf5a4a859fe80517a66aac11a86d69f45d4b46b5","data":"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"}
import { useSignTypedData } from 'wagmi'
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
