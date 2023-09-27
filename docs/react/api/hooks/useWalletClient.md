---
title: useWalletClient
description: Hook for getting a Viem `WalletClient` object for the current or provided connector.
---

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

## Return Type

```ts
import { type UseWalletClientReturnType } from 'wagmi'
```

## Action

- [`getWalletClient`](/core/api/actions/getWalletClient)
