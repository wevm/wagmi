---
title: useConnectionEffect
description: Hook for listening to connection lifecycle events.
---

# useConnectionEffect

Hook for listening to connection lifecycle events.

## Import

```ts
import { useConnectionEffect } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnectionEffect } from 'wagmi'

function App() {
  useConnectionEffect({
    onConnect(data) {
      console.log('Connected!', data)
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseConnectionEffectParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useConnectionEffect } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  useConnectionEffect({
    config, // [!code focus]
    onConnect(data) {
      console.log('Connected!', data)
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### onConnect

`` ((data: { address: `0x${string}`; addresses: readonly [`0x${string}`, ...`0x${string}`[]]; chain: Chain | undefined chainId: number; connector: Connector; isReconnected: boolean }) => void) | undefined ``

Callback that is called when connection is made.

::: code-group
```tsx [index.tsx]
import { useConnectionEffect } from 'wagmi'

function App() {
  useConnectionEffect({
    onConnect(data) { // [!code focus]
      console.log('Connected!', data) // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### onDisconnect

`(() => void) | undefined`

Callback that is called when there no more connections.

::: code-group
```tsx [index.tsx]
import { useConnectionEffect } from 'wagmi'

function App() {
  useConnectionEffect({
    onDisconnect() { // [!code focus]
      console.log('Disconnected!') // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Action

- [`getConnection`](/core/api/actions/getConnection)
- [`watchConnection`](/core/api/actions/watchConnection)
