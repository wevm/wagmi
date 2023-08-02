<script setup>
const packageName = 'wagmi'
const mutate = 'disconnect'
const TData = 'void'
const TError = 'DisconnectError'
const TVariables = '{ connector?: Connector | undefined; }'
</script>

# useDisconnect

Hook for disconnecting connections.

## Import

```ts
import { useDisconnect } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useDisconnect } from 'wagmi'

function App() {
  const { disconnect } = useDisconnect()

  return (
    <button onClick={() => disconnect()}>
      Disconnect
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseDisconnectParameters } from 'wagmi'
```

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseDisconnectReturnType } from 'wagmi'
```

### connectors

`readonly Connector[]`

Connectors that are currently connected. Useful for rendering a list of connectors to disconnect.

::: code-group
```tsx [index.tsx]
import { useDisconnect } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const { connectors, disconnect } = useDisconnect()

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => disconnect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/query/disconnect.md-->

## Actions

[`disconnect`](/core/actions/connect)