---
title: useWalletClient
description: Hook for getting a Viem `WalletClient` object for the current or provided connector.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getWalletClient'
const typeName = 'GetWalletClient'
const TData = 'WalletClient'
const TError = 'GetWalletClientErrorType'
const hideQueryOptions = ['gcTime', 'staleTime']
</script>

# useWalletClient

Hook for getting a Viem [`WalletClient`](https://viem.sh/docs/clients/wallet.html) object for the current or provided connector.

## Import

```ts
import { useWalletClient } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWalletClient } from 'wagmi'

function App() {
  const result = useWalletClient()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

::: warning
If you want to optimize bundle size, you should use [`useConnectorClient`](/react/api/hooks/useConnectorClient) along with Viem's [tree-shakable actions](https://viem.sh/docs/clients/custom.html#tree-shaking) instead. Since Wallet Client has all wallet actions attached directly to it.
:::

## Parameters

```ts
import { type UseWalletClientParameters } from 'wagmi'
```

### account

`Address | Account | undefined`

Account to use with client. Throws if account is not found on [`connector`](#connector).

```ts
import { useWalletClient } from 'wagmi'

function App() {
  const result = useWalletClient({
    account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  })
}
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use with client.

```ts
import { useWalletClient } from 'wagmi'

function App() {
  const result = useWalletClient({
    chainId: mainnet.id, // [!code focus]
  })
}
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useWalletClient } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useWalletClient({
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
import { useConnections, useWalletClient } from 'wagmi'

function App() {
  const connections = useConnections(config)
  const result = useWalletClient({
    connector: connections[0]?.connector, // [!code focus]
  })
}
```

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseWalletClientReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getWalletClient`](/core/api/actions/getWalletClient)
