---
title: useConnections
description: Hook for getting active connections.
---

# useConnections

Hook for getting active connections.

## Import

```ts
import { useConnections } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnections } from 'wagmi'

function App() {
  const connections = useConnections()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseConnectionsParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useConnections } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const connections = useConnections({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseConnectionsReturnType } from 'wagmi'
```

## Action

- [`getConnections`](/core/api/actions/getConnections)
- [`watchConnections`](/core/api/actions/watchConnections)
