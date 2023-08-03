<script setup>
const packageName = 'wagmi'
const actionName = 'reconnect'
const typeName = 'Reconnect'
const mutate = 'reconnect'
const TData = '{ accounts: readonly Address[]; chainId: number; connector: Connector }'
const TError = 'ReconnectError'
const TVariables = '{ connectors?: (CreateConnectorFn | Connector)[] | undefined; }'
</script>

# useReconnect

Hook for reconnecting [connectors](/core/connectors).

## Import

```ts
import { useReconnect } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReconnect } from 'wagmi'
import { useEffect } from 'react'

function App() {
  const { reconnect } = useReconnect()

  useEffect(() => {
    reconnect()
  }, [])
}
```
:::

::: tip
When [`Config['reconnectOnMount']`](/react/createConfig#reconnectonmount) is `true`, `reconnect` is called automatically on mount.
:::

## Parameters

```ts
import { type UseReconnectParameters } from 'wagmi'
```

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseReconnectReturnType } from 'wagmi'
```

### connectors

`readonly Connector[]`

Globally configured connectors via [`createConfig`](/react/createConfig#connectors).

::: code-group
```tsx [index.tsx]
import { useReconnect } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { useEffect } from 'react'

function App() {
  const { reconnect, connectors } = useReconnect()

  useEffect(() => {
    reconnect({ connectors })
  }, [])
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

[`reconnect`](/core/actions/reconnect)