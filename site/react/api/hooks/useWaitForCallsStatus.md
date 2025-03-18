---
title: useWaitForCallsStatus
description: Waits for a call bundle to be confirmed & included on a block.
---

<script setup>
const packageName = 'wagmi/experimental'
const actionName = 'waitForCallsStatus'
const typeName = 'WaitForCallsStatus'
const TData = 'WaitForCallsStatusReturnType'
const TError = 'WaitForCallsStatusErrorType'
</script>

# useWaitForCallsStatus

Waits for a call bundle to be confirmed & included on a block before returning the status & receipts.

::: warning
This is an experimental action that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { useWaitForCallsStatus } from 'wagmi/experimental'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWaitForCallsStatus } from 'wagmi/experimental'

function App() {
  const result = useWaitForCallsStatus({
    id: '0x...', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWaitForCallsStatusParameters } from 'wagmi/experimental'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useWaitForCallsStatus } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const result = useWaitForCallsStatus({
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
import { useWaitForCallsStatus, useConnections } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const connections = useConnections()
  const result = useWaitForCallsStatus({
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
import { useWaitForCallsStatus } from '@wagmi/core'
import { config } from './config'

const status = await useWaitForCallsStatus({
  id: '0x1234567890abcdef', // [!code focus]
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

### pollingInterval

`number | undefined`

Polling interval in milliseconds.

::: code-group
```ts [index.ts]
import { useWaitForCallsStatus } from '@wagmi/core'
import { config } from './config'

const status = await useWaitForCallsStatus({
  id: '0x1234567890abcdef',
  pollingInterval: 1_000, // [!code focus]
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { useWaitForCallsStatus } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const result = useWaitForCallsStatus({
    id: '0x...',
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### timeout

`number | undefined`

Timeout in milliseconds.

::: code-group
```ts [index.ts]
import { useWaitForCallsStatus } from '@wagmi/core'
import { config } from './config'

const status = await useWaitForCallsStatus({
  id: '0x1234567890abcdef',
  timeout: 10_000, // [!code focus]
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseWaitForCallsStatusReturnType } from 'wagmi/experimental'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`waitForCallsStatus`](https://viem.sh/experimental/eip5792/waitForCallsStatus)