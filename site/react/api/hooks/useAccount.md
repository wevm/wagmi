---
title: useAccount
description: Hook for getting current account.
---

# useAccount

Hook for getting current account.

## Import

```ts
import { useAccount } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useAccount } from 'wagmi'

function App() {
  const account = useAccount()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseAccountParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useAccount } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const account = useAccount({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseAccountReturnType } from 'wagmi'
```

<!--@include: @shared/getAccount-return-type.md-->

## Action

- [`getAccount`](/core/api/actions/getAccount)
