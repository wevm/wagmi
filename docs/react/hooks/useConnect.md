# useConnect

Hook for connecting accounts with [connectors](/core/connectors) using the [`connect`](/core/actions/connect) action.

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
<<< snippets/core/config.ts[config.ts]
:::

### mutation

## Return Type

```ts
import { type UseConnectReturnType } from 'wagmi'
```

### connect
### connectAsync
### connectors

`readonly Connector[]`

[Connectors](/core/connectors) configured by the [config](/TODO).

::: code-group
```tsx [index.tsx]
import { useConnect } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { config } from './config'

function App() {
  const { connect, connectors } = useConnect()

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </button>
  )
}
```
<<< snippets/core/config.ts[config.ts]
:::

### data
### error
### isError
### isIdle
### isLoading
### isPaused
### isSuccess
### failureCount
### failureReason
### reset
### status