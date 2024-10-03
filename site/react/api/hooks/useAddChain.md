---
title: useAddChain
description: Hook for requesting the user to add an EVM chain to the wallet.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'addChain'
const typeName = 'AddChain'
const mutate = 'addChain'
const TData = 'AddChainData'
const TError = 'AddChainErrorType'
const TVariables = 'AddChainVariables'
</script>

# useAddChain

Hook for requesting the user to add an EVM chain to the wallet.

## Import

```ts
import { useAddChain } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { avalanche } from 'viem/chains'
import { useAddchain } from 'wagmi'

function App() {
  const { addChain } = useAddChain()

  return (
    <button
      onClick={() => addChain({
        chain: avalanche,
      })}
    >
      Add Chain
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseAddChainParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { avalanche } from 'viem/chains'
import { useAddChain } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useAddChain({
    config, // [!code focus]
    chain: avalanche,
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseAddChainReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`addChain`](/core/api/actions/addChain)
