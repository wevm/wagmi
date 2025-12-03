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
