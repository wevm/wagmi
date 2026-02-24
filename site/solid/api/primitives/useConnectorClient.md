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
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useConnectorClient } from '@wagmi/solid'

useConnectorClient.Parameters
useConnectorClient.SolidParameters
```

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

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useConnectorClient } from '@wagmi/solid'

useConnectorClient.ReturnType
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getConnectorClient`](/core/api/actions/getConnectorClient)
