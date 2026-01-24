---
title: useConnection
description: Hook for getting current connection.
---

# useConnection

Hook for getting current connection.

## Import

```ts
import { useConnection } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnection } from 'wagmi'

function App() {
  const connection = useConnection()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseConnectionParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useConnection } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const connection = useConnection({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseConnectionReturnType } from 'wagmi'
```

<!--@include: @shared/getConnection-return-type.md-->

## Action

- [`getConnection`](/core/api/actions/getConnection)
