---
title: useAccountEffect
description: Composable for listening to account lifecycle events.
---

# useAccountEffect

Composable for listening to account lifecycle events.

## Import

```ts
import { useAccountEffect } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useAccountEffect } from '@wagmi/vue'

useAccountEffect({
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
import { type useAccountEffectParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useAccountEffect } from '@wagmi/vue'
import { config } from './config' // [!code focus]

useAccountEffect({
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

Callback that is called when accounts are connected.

::: code-group
```tsx [index.tsx]
import { useAccountEffect } from '@wagmi/vue'

function App() {
  useAccountEffect({
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

Callback that is called when no more accounts are connected.

::: code-group
```tsx [index.tsx]
import { useAccountEffect } from '@wagmi/vue'

function App() {
  useAccountEffect({
    onDisconnect() { // [!code focus]
      console.log('Disconnected!') // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Action

- [`getAccount`](/core/api/actions/getAccount)
- [`watchAccount`](/core/api/actions/watchAccount)
