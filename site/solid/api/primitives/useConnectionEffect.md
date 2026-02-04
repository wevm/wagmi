---
title: useConnectionEffect
description: Primitive for reacting to connection state changes.
---

# useConnectionEffect

Primitive for reacting to connection state changes.

## Import

```ts
import { useConnectionEffect } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnectionEffect } from '@wagmi/solid'

function App() {
  useConnectionEffect(() => ({
    onConnect(data) {
      console.log('Connected!', data)
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  }))

  return <div>...</div>
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useConnectionEffect } from '@wagmi/solid'

useConnectionEffect.Parameters
useConnectionEffect.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useConnectionEffect(() => ({
  onConnect(data) { /* ... */ },
  onDisconnect() { /* ... */ },
}))
```

### onConnect

`((data: { address: Address; addresses: readonly Address[]; chain: Chain | undefined; chainId: number; connector: Connector; isReconnected: boolean }) => void) | undefined`

Callback that is called when accounts are connected.

### onDisconnect

`(() => void) | undefined`

Callback that is called when no more accounts are connected.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

## Return Type

```ts
import { useConnectionEffect } from '@wagmi/solid'

useConnectionEffect.ReturnType
```

`void`

## Action

- [`watchConnection`](/core/api/actions/watchConnection)
