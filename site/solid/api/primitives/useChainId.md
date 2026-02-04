---
title: useChainId
description: Primitive for getting current chain ID.
---

# useChainId

Primitive for getting current chain ID.

## Import

```ts
import { useChainId } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useChainId } from '@wagmi/solid'

function App() {
  const chainId = useChainId()
  
  return <p>Chain ID: {chainId()}</p>
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useChainId } from '@wagmi/solid'

useChainId.Parameters
useChainId.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useChainId(() => ({
  config,
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

## Return Type

```ts
import { useChainId } from '@wagmi/solid'

useChainId.ReturnType
```

`Accessor<number>`

Returns an accessor containing the current chain ID from the config state.

::: info
Only returns chain IDs for chains configured via `createConfig`'s [`chains`](/solid/api/createConfig#chains) parameter.

If the active [connection](/solid/api/createConfig#connection) [`chainId`](/solid/api/createConfig#chainid-1) is not from a chain included in your Wagmi `Config`, `useChainId` will return the last configured chain ID.
:::

## Action

- [`getChainId`](/core/api/actions/getChainId)
- [`watchChainId`](/core/api/actions/watchChainId)
