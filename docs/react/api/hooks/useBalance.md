---
title: useBalance
description: Hook for fetching native currency or token balance.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getBalance'
const typeName = 'GetBalance'
const TData = '{ decimals: number; formatted: string; symbol: string; value: bigint; }'
const TError = 'GetBalanceErrorType'
</script>

# useBalance

Hook for fetching native currency or token balance.

## Import

```ts
import { useBalance } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBalance } from 'wagmi'

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBalanceParameters } from 'wagmi'
```

### address

`Address | undefined`

Address to get balance for. [`enabled`](#enabled) set to `false` if `address` is `undefined`.

::: code-group
```tsx [index.tsx]
import { useBalance } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to get balance at.

::: code-group
```ts [index.ts]
import { useBalance } from 'wagmi'

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    blockNumber: 17829139n, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get balance at.

::: code-group
```ts [index.ts]
import { useBalance } from 'wagmi'

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    blockTag: 'latest', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useBalance } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useBalance } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { useBalance } from 'wagmi'

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### token

`Address | undefined`

ERC-20 token address to get balance for.

::: warning Deprecated
See [deprecation notices](/react/guides/migrate-from-v1-to-v2#deprecated-usebalance-token-parameter) for more info.
:::

::: code-group
```ts [index.ts]
import { useBalance } from 'wagmi'

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    token: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### unit

`'ether' | 'gwei' | 'wei' | number | undefined`

- Units to use when formatting result.
- Defaults to `'ether'`.

::: warning Deprecated
See [deprecation notices](/react/guides/migrate-from-v1-to-v2#deprecated-usebalance-unit-parameter-and-formatted-return-value) for more info.
:::

::: code-group
```ts [index.ts]
import { useBalance } from 'wagmi'

function App() {
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    unit: 'ether', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBalanceReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBalance`](/core/api/actions/getBalance)
