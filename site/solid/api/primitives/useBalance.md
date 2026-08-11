---
title: useBalance
description: Primitive for fetching native currency balance.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'getBalance'
const typeName = 'GetBalance'
const TData = '{ decimals: number; symbol: string; value: bigint; }'
const TError = 'GetBalanceErrorType'
</script>

# useBalance

Primitive for fetching native currency balance.

## Import

```ts
import { useBalance } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBalance } from '@wagmi/solid'

function App() {
  const balance = useBalance(() => ({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useBalance } from '@wagmi/solid'

useBalance.Parameters
useBalance.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useBalance(() => ({
  address: '0x...',
  // other parameters...
}))
```

### address

`Address | undefined`

Address to get balance for. [`enabled`](#enabled) set to `false` if `address` is `undefined`.

### blockNumber

`bigint | undefined`

Block number to get balance at.

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get balance at.

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
import { useBalance } from '@wagmi/solid'

useBalance.ReturnType
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBalance`](/core/api/actions/getBalance)
