---
title: useConnectorClient
description: Primitive for getting Viem Wallet Client from the active connector.
---

# useConnectorClient

Primitive for getting a [Viem Wallet Client](https://viem.sh/docs/clients/wallet) from the active connector.

## Import

```ts
import { useConnectorClient } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnectorClient } from '@wagmi/solid'

function App() {
  const client = useConnectorClient()
  
  // client() returns the Wallet Client when connected
}
```
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

## Parameters

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useConnectorClient(() => ({
  chainId: 1,
  connector: myConnector,
}))
```

### account

`Address | undefined`

Account to use for the client.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use for the client.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### connector

`Connector | undefined`

Connector to get the client for. Defaults to the active connector.

### query

TanStack Query parameters. See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/solid/reference/createQuery) for more info.

## Return Type

```ts
import { type CreateQueryResult } from '@tanstack/solid-query'
```

### data

`WalletClient | undefined`

The Viem Wallet Client instance.

### error

`GetConnectorClientErrorType | null`

The error object if the query failed.

### isError / isPending / isSuccess

`boolean`

Boolean flags indicating the query status.

## Action

- [`getConnectorClient`](/core/api/actions/getConnectorClient)
