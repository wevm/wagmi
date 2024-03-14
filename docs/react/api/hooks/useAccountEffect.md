---
title: useAccountEffect
description: Hook for listening to account lifecycle events.
---

# useAccountEffect

Hook for listening to account lifecycle events.

## Import

```ts
import { useAccountEffect } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useAccountEffect } from 'wagmi'

function App() {
  useAccountEffect({
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
import { type UseAccountEffectParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useAccountEffect } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  useAccountEffect({
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

Callback that is called when accounts are connected.

::: code-group
```tsx [index.tsx]
import { useAccountEffect } from 'wagmi'

function App() {
  useAccountEffect({
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

Callback that is called when no more accounts are connected.

::: code-group
```tsx [index.tsx]
import { useAccountEffect } from 'wagmi'

function App() {
  useAccountEffect({
    onDisconnect() { // [!code focus]
      console.log('Disconnected!') // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Action

- [`getAccount`](/core/api/actions/getAccount)
- [`watchAccount`](/core/api/actions/watchAccount)
