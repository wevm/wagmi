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

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

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

::: info
Only returns chain IDs for chains configured via `createConfig`'s [`chains`](/react/api/createConfig#chains) parameter.

If the active [connection](/react/api/createConfig#connection) [`chainId`](/react/api/createConfig#chainid-1) is not from a chain included in your Wagmi `Config`, `useChainId` will return the last configured chain ID.
:::

## Action

- [`getChainId`](/core/api/actions/getChainId)
- [`watchChainId`](/core/api/actions/watchChainId)
