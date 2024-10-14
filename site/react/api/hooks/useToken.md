---
title: useToken
description: Hook for fetching token info.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getToken'
const typeName = 'GetToken'
const TData = '{ address: Address; decimals: number; name: string | undefined; symbol: string | undefined; totalSupply: { formatted: string; value: bigint; }; }'
const TError = 'GetTokenErrorType'
</script>

# useToken <Badge type="warning">[deprecated](/react/guides/migrate-from-v1-to-v2#deprecated-usetoken)</Badge>

Hook for fetching token info. 

## Import

```ts
import { useToken } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useToken } from 'wagmi'

function App() {
  const result = useToken({
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseTokenParameters } from 'wagmi'
```

### address

`Address | undefined`

Address to get token for. [`enabled`](#enabled) set to `false` if `address` is `undefined`.

::: code-group
```tsx [index.tsx]
import { useToken } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useToken({
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useToken } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useToken({
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useToken } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useToken({
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### formatUnits

`'ether' | 'gwei' | 'wei' | number | undefined`

- Units to use when formatting result.
- Defaults to `'ether'`.

::: code-group
```ts [index.ts]
import { useToken } from 'wagmi'

function App() {
  const result = useToken({
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    formatUnits: 'ether', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```ts [index.ts]
import { useToken } from 'wagmi'

function App() {
  const result = useToken({
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseTokenReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getToken`](/core/api/actions/getToken)
