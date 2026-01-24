---
title: useConnectionEffect
description: Composable for listening to connection lifecycle events.
---

# useConnectionEffect

Composable for listening to connection lifecycle events.

## Import

```ts
import { useConnectionEffect } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnectionEffect } from '@wagmi/vue'

useConnectionEffect({
  onConnect(data) {
    console.log('Connected!', data)
  },
  onDisconnect() {
    console.log('Disconnected!')
  },
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type useConnectionEffectParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnectionEffect } from '@wagmi/vue'
import { config } from './config' // [!code focus]

useConnectionEffect({
  config, // [!code focus]
  onConnect(data) {
    console.log('Connected!', data)
  },
  onDisconnect() {
    console.log('Disconnected!')
  },
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### onConnect

`` MaybeRef<((data: { address: `0x${string}`; addresses: readonly [`0x${string}`, ...`0x${string}`[]]; chain: Chain | undefined chainId: number; connector: Connector; isReconnected: boolean }) => void)> | undefined ``

Callback that is called when connection is made.

::: code-group
```tsx [index.tsx]
import { useConnectionEffect } from '@wagmi/vue'

function App() {
  useConnectionEffect({
    onConnect(data) { // [!code focus]
      console.log('Connected!', data) // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### onDisconnect

`MaybeRef<(() => void)> | undefined`

Callback that is called when there no more connections.

::: code-group
```tsx [index.tsx]
import { useConnectionEffect } from '@wagmi/vue'

function App() {
  useConnectionEffect({
    onDisconnect() { // [!code focus]
      console.log('Disconnected!') // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Action

- [`getConnection`](/core/api/actions/getConnection)
- [`watchConnection`](/core/api/actions/watchConnection)
