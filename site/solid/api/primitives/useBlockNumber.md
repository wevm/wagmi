---
title: useBlockNumber
description: Primitive for fetching the current block number.
---

# useBlockNumber

Primitive for fetching the current block number.

## Import

```ts
import { useBlockNumber } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBlockNumber } from '@wagmi/solid'

function App() {
  const blockNumber = useBlockNumber()
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useBlockNumber } from '@wagmi/solid'

useBlockNumber.Parameters
useBlockNumber.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useBlockNumber(() => ({
  chainId: 1,
  // other parameters...
}))
```

### cacheTime

`number | undefined`

Time in milliseconds that cached block number will remain in memory.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### scopeKey

`string | undefined`

Scopes the cache to a given context. Primitives that have identical context will share the same cache.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useBlockNumber } from '@wagmi/solid'

useBlockNumber.ReturnType
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBlockNumber`](/core/api/actions/getBlockNumber)
