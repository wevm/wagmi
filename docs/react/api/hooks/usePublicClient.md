---
title: usePublicClient
description: Hook for getting Viem `PublicClient` instance.
---

# usePublicClient

Hook for getting Viem [`PublicClient`](https://viem.sh/docs/clients/public.html) instance.

## Import

```ts
import { usePublicClient } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { usePublicClient } from 'wagmi'

function App() {
  const client = usePublicClient()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

::: warning
If you want to optimize bundle size, you should use [`useClient`](/react/api/hooks/useClient) along with Viem's [tree-shakable actions](https://viem.sh/docs/clients/custom.html#tree-shaking) instead. Since Public Client has all public actions attached directly to it.
:::

## Parameters

```ts
import { type UsePublicClientParameters } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when getting Viem Public Client.

::: code-group
```ts [index.ts]
import { usePublicClient } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { config } from './config'

function App() {
  const client = usePublicClient({
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { usePublicClient } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const client = usePublicClient({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UsePublicClientReturnType } from 'wagmi'
```

`PublicClient`

Viem [`PublicClient`](https://viem.sh/docs/clients/public.html) instance.

## Action

- [`getPublicClient`](/core/api/actions/getPublicClient)
- [`watchPublicClient`](/core/api/actions/watchPublicClient)
