---
title: useConnectorClient
description: Hook for getting a Viem `Client` object for the current or provided connector.
---

# useConnectorClient

Hook for getting a Viem [`Client`](https://viem.sh/docs/clients/custom.html) object for the current or provided connector.

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

## Return Type

```ts
import { type UseConnectorClientReturnType } from 'wagmi'
```

## Action

- [`getConnectorClient`](/core/api/actions/getConnectorClient)
