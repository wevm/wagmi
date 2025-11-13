---
title: useConnectorClient
description: Hook for getting a Viem `Client` object for the current or provided connector.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getConnectorClient'
const typeName = 'GetConnectorClient'
const TData = 'Client'
const TError = 'GetConnectorClientErrorType'
const hideQueryOptions = ['gcTime', 'staleTime']
</script>

# useConnectorClient

Hook for getting a Viem [`Client`](https://viem.sh/docs/clients/custom) object for the current or provided connector.

## Import

```ts
import { useConnectorClient } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnectorClient } from 'wagmi'

function App() {
  const result = useConnectorClient()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseConnectorClientParameters } from 'wagmi'
```

### account

`Address | Account | undefined`

Account to use with client. Throws if account is not found on [`connector`](#connector).

```ts
import { useConnectorClient } from 'wagmi'

function App() {
  const result = useConnectorClient({
    account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  })
}
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use with client.

```ts
import { useConnectorClient } from 'wagmi'

function App() {
  const result = useConnectorClient({
    chainId: mainnet.id, // [!code focus]
  })
}
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useConnectorClient } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useConnectorClient({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### connector

`Connector | undefined`

- Connector to get client for.
- Defaults to current connector.

```ts
import { useConnections, useConnectorClient } from 'wagmi'

function App() {
  const connections = useConnections(config)
  const result = useConnectorClient({
    connector: connections[0]?.connector, // [!code focus]
  })
}
```

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseConnectorClientReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getConnectorClient`](/core/api/actions/getConnectorClient)
