---
title: useCallsStatus
description: Hook for fetching the number of the most recent block seen.
---

<script setup>
const packageName = 'wagmi/experimental'
const actionName = 'getCallsStatus'
const typeName = 'GetCallsStatus'
const TData = 'GetCallsStatusReturnType'
const TError = 'GetCallsStatusErrorType'
</script>

# useCallsStatus

Hook to fetch the status and receipts of a call batch that was sent via [`useSendCalls`](/react/api/hooks/useSendCalls).

::: warning
This is an experimental action that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { useCallsStatus } from 'wagmi/experimental'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useCallsStatus } from 'wagmi/experimental'

function App() {
  const result = useCallsStatus({
    id: '0x...', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseCallsStatusParameters } from 'wagmi/experimental'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useCallsStatus } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const result = useCallsStatus({
    config, // [!code focus]
    id: '0x...',
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
import { useCallsStatus, useConnections } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const connections = useConnections()
  const result = useCallsStatus({
    connector: connections[0]?.connector, // [!code focus]
    id: '0x...',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### id

`string`

Identifier of the call batch.

::: code-group
```ts [index.ts]
import { useCallsStatus } from '@wagmi/core'
import { config } from './config'

const status = await useCallsStatus({
  id: '0x1234567890abcdef', // [!code focus]
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { useCallsStatus } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const result = useCallsStatus({
    id: '0x...',
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseCallsStatusReturnType } from 'wagmi/experimental'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getCallsStatus`](https://viem.sh/experimental/eip5792/getCallsStatus)