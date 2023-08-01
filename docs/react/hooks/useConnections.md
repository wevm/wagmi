# useConnections

Hook for getting active connections. Uses the [`getConnections`](/core/actions/getConnections) action.

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