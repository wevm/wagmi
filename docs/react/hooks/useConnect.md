<script setup>
const mutate = 'connect'
const TData = '{ accounts: readonly Address[]; chainId: number; }'
const TError = 'ConnectError'
const TVariables = '{ chainId?: number | undefined; connector?: CreateConnectorFn | Connector | undefined; }'
</script>

# useConnect

Hook for connecting accounts with [connectors](/core/connectors) using the [connect](/core/actions/connect) action.

## Import

```ts
import { useConnect } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnect } from 'wagmi/core'
import { injected } from 'wagmi/connectors'
import { config } from './config'

function App() {
  const { connect } = useConnect({
    connector: injected(),
  })

  return (
    <button onClick={() => connect()}>
      Connect
    </button>
  )
}
```
<<< snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseConnectParameters } from 'wagmi'
```

### chainId

`number | undefined`

Chain ID to connect to.

Not all connectors support connecting directly to a `chainId` (e.g. they don't support programmatic chain switching). In those cases, the connector will connect to whatever chain the connector's provider is connected to.

::: code-group
```tsx [index.tsx]
import { useConnect } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { config } from './config'

function App() {
  const { connect } = useConnect({
    connector: injected(),
    chainId: mainnet.id,  // [!code focus]
  })

  return (
    <button onClick={() => connect()}>
      Connect
    </button>
  )
}
```
<<< snippets/react/config.ts[config.ts]
:::

### connector

`CreateConnectorFn | Connector`

[Connector](/core/connectors) to connect with.

::: code-group
```tsx [index.tsx]
import { useConnect } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { config } from './config'

function App() {
  const { connect } = useConnect({
    connector: injected(), // [!code focus]
  })

  return (
    <button onClick={() => connect()}>
      Connect
    </button>
  )
}
```
<<< snippets/react/config.ts[config.ts]
:::

### mutation

Options passed to underlying [`useMutation`](https://tanstack.com/query/v5/docs/react/reference/useMutation) hook.

::: code-group
```tsx [index.tsx]
import { useConnect } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { config } from './config'

function App() {
  const { connect } = useConnect({
    connector: injected(),
    mutation: { // [!code focus:4]
      gcTime: 0,
      retry: 2,
    },
  })

  return (
    <button onClick={() => connect()}>
      Connect
    </button>
  )
}
```
<<< snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseConnectReturnType } from 'wagmi'
```

### connectors

`readonly Connector[]`

Globally configured connectors. Useful for rendering a list of available connectors.

<!--@include: @shared/mutation-result.md-->