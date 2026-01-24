---
title: useWatchAsset
description: Hook for requesting user tracks the token in their wallet. Returns a boolean indicating if the token was successfully added.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'watchAsset'
const typeName = 'WatchAsset'
const mutate = 'watchAsset'
const TData = 'WatchAssetData'
const TError = 'WatchAssetErrorType'
const TVariables = 'WatchAssetVariables'
</script>

# useWatchAsset

Hook for requesting user tracks the token in their wallet. Returns a boolean indicating if the token was successfully added.

## Import

```ts
import { useWatchAsset } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchAsset } from 'wagmi'

function App() {
  const { watchAsset } = useWatchAsset()

  return (
    <button
      onClick={() => watchAsset({
        type: 'ERC20',
        options: {
          address: '0x0000000000000000000000000000000000000000',
          symbol: 'WAGMI',
          decimals: 18,
        },
      })}
    >
      Watch asset
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchAssetParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useWatchAsset } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useWatchAsset({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseWatchAssetReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`watchAsset`](/core/api/actions/watchAsset)
