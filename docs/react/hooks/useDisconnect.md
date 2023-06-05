<script setup>
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
import { config } from './config'

function App() {
  const { disconnect } = useDisconnect()

  return (
    <button onClick={() => disconnect()}>
      Disconnect
    </button>
  )
}
```
<<< snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseDisconnectParameters } from 'wagmi'
```

### connector

`Connector | undefined`

[Connector](/react/connectors) to disconnect with.

::: code-group
```tsx [index.tsx]
import { mainnet } from 'viem/chains'
import { useAccount, useDisconnect } from 'wagmi'
import { config } from './config'

function App() {
  const { connector } = useAccount()
  const { disconnect } = useDisconnect({
    connector, // [!code focus]
  })

  return (
    <button onClick={() => disconnect()}>
      Disconnect
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
import { mainnet } from 'viem/chains'
import { useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

function App() {
  const { disconnect } = useDisconnect({
    mutation: { // [!code focus:5]
      onSuccess() {
        console.log('Disconnected!')
      }
    },
  })

  return (
    <button onClick={() => disconnect()}>
      Disconnect
    </button>
  )
}
```
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseDisconnectReturnType } from 'wagmi'
```

### connectors

`readonly Connector[]`

Connectors that are currently connected.

<!--@include: @shared/mutation-result.md-->