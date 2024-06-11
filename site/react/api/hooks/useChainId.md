---
title: useChainId
description: Hook for getting current chain ID.
---

# useChainId

Hook for getting current chain ID.

## Import

```ts
import { useChainId } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useChainId } from 'wagmi'

function App() {
  const chainId = useChainId()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseChainIdParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useChainId } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const chainId = useChainId({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseChainIdReturnType } from 'wagmi'
```

`number`

Current chain ID from [`config.state.chainId`](/react/api/createConfig#chainid).

## Action

- [`getChainId`](/core/api/actions/getChainId)
- [`watchChainId`](/core/api/actions/watchChainId)
