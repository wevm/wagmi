# useConnections

Hook for getting active connections.

## Import

```ts
import { useConnections } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnections } from 'wagmi'

function App() {
  const connections = useConnections()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseConnectionsReturnType } from 'wagmi'
```

## Action

- [`getConnections`](/core/actions/getConnections)
- [`watchConnections`](/core/actions/getConnections#watchconnections)