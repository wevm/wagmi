---
title: useGasPrice
description: Hook for fetching the current price of gas (in wei).
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getGasPrice'
const typeName = 'GetGasPrice'
const TData = 'bigint'
const TError = 'GetGasPriceErrorType'
</script>

# useGasPrice

Hook for fetching the current price of gas (in wei).

## Import

```ts
import { useGasPrice } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useGasPrice } from 'wagmi'

function App() {
  const result = useGasPrice()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseGasPriceParameters } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useGasPrice } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useGasPrice({
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useGasPrice } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useGasPrice({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { useGasPrice } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useGasPrice({
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseGasPriceReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getGasPrice`](/core/api/actions/getGasPrice)
