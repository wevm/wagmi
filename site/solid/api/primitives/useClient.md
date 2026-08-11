---
title: useClient
description: Primitive for getting Viem Client.
---

# useClient

Primitive for getting [Viem Client](https://viem.sh/docs/clients/intro) instance.

## Import

```ts
import { useClient } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useClient } from '@wagmi/solid'

function App() {
  const client = useClient()
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useClient } from '@wagmi/solid'

useClient.Parameters
useClient.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useClient(() => ({
  chainId: 1,
}))
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when getting the client.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

## Return Type

```ts
import { useClient } from '@wagmi/solid'

useClient.ReturnType
```

`Accessor<Client | undefined>`

Returns an accessor containing the Viem Client instance, or `undefined` if not available.

## Action

- [`getClient`](/core/api/actions/getClient)
