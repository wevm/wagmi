---
title: usePermissions
description: Hook for getting the connected wallet's current permissions.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getPermissions'
const typeName = 'GetPermissions'
const TData = 'GetPermissionsData'
const TError = 'GetPermissionsErrorType'
</script>

# usePermissions

Hook for getting the connected wallet's current permissions.

## Import

```ts
import { usePermissions } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { usePermissions } from 'wagmi'

function App() {
  const result = usePermissions()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UsePermissionsParameters } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

The ID of chain to get the wallet's permissions for.

::: code-group
```tsx [index.tsx]
import { usePermissions } from 'wagmi'
import { optimism } from 'wagmi/chains'

function App() {
  const result = usePermissions({
    chainId: optimism.id, // [!code focus]
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
import { usePermissions } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = usePermissions({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### connector

`Connector | undefined`

[Connector](/react/api/connectors) to get permissions with.

::: code-group
```tsx [index.tsx]
import { useConnections, usePermissions } from 'wagmi'

function App() {
  const connections = useConnections()
  const result = usePermissions({
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
import { usePermissions } from 'wagmi'
import { config } from './config'

function App() {
  const result = usePermissions({
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UsePermissionsReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getPermissions`](/core/api/actions/getPermissions)
