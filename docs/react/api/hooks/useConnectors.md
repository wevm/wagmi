---
title: useConnectors
description: Hook for getting configured connectors.
---

# useConnectors

Hook for getting configured connectors.

## Import

```ts
import { useConnectors } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnectors } from 'wagmi'

function App() {
  const connectors = useConnectors()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseConnectorsReturnType } from 'wagmi'
```

`readonly Connector[]`

Connectors from [`config.connectors`](/react/api/createConfig#connectors-1).

## Action

- [`getConnectors`](/core/api/actions/getConnectors)
