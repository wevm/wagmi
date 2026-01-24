---
title: useClient
description: Hook for getting Viem `Client` instance.
---

# useClient

Hook for getting Viem [`Client`](https://viem.sh/docs/clients/custom) instance.

## Import

```ts
import { useClient } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useClient } from 'wagmi'

function App() {
  const client = useClient()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseClientParameters } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when getting Viem Client.

::: code-group
```ts [index.ts]
import { useClient } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { config } from './config'

function App() {
  const client = useClient({
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useClient } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const client = useClient({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseClientReturnType } from 'wagmi'
```

`Client | undefined`

Viem [`Client`](https://viem.sh/docs/clients/custom) instance.

## Action

- [`getClient`](/core/api/actions/getClient)
- [`watchClient`](/core/api/actions/watchClient)
