---
title: useCapabilities
description: Hook for fetching the number of the most recent block seen.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getCapabilities'
const typeName = 'GetCapabilities'
const TData = 'GetCapabilitiesReturnType'
const TError = 'GetCapabilitiesErrorType'
</script>

# useCapabilities

Hook to extract capabilities (grouped by chain ID) that a connected wallet supports (e.g. paymasters, session keys, etc).

[Read more.](https://github.com/ethereum/EIPs/blob/815028dc634463e1716fc5ce44c019a6040f0bef/EIPS/eip-5792.md#wallet_getcapabilities)

::: warning
This is an experimental Hook that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { useCapabilities } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useCapabilities } from 'wagmi'

function App() {
  const result = useCapabilities()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseCapabilitiesParameters } from 'wagmi'
```

### account

`Account | Address | undefined`

Fetch capabilities for the provided account.

::: code-group
```ts [index.ts]
import { useCapabilities } from '@wagmi/core'
import { config } from './config'

const status = await useCapabilities({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useCapabilities } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useCapabilities({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### connector

`Connector | undefined`

Connector to get call statuses with.

::: code-group
```tsx [index.tsx]
import { useCapabilities, useConnections } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const connections = useConnections()
  const result = useCapabilities({
    connector: connections[0]?.connector, // [!code focus]
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
import { useCapabilities } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useCapabilities({
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseCapabilitiesReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getCapabilities`](https://viem.sh/experimental/eip5792/getCapabilities)