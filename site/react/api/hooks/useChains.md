---
title: useChains
description: Hook for getting configured chains
---

# useChains

Hook for getting configured chains

## Import

```ts
import { useChains } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useChains } from 'wagmi'

function App() {
  const chains = useChains()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseChainsParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useChains } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const chains = useChains({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseChainsReturnType } from 'wagmi'
```

`readonly [Chain, ...Chain[]]`

Chains from [`config.chains`](/react/api/createConfig#chains).

## Action

- [`getChains`](/core/api/actions/getChains)
