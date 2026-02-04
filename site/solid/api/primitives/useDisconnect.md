---
title: useDisconnect
description: Primitive for disconnecting connections.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'disconnect'
const typeName = 'Disconnect'
const TData = 'void'
const TError = 'DisconnectErrorType'
const TVariables = '{ connector?: Connector | undefined; }'
</script>

# useDisconnect

Primitive for disconnecting connections.

## Import

```ts
import { useDisconnect } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useDisconnect } from '@wagmi/solid'

function App() {
  const disconnect = useDisconnect()
  
  return (
    <button onClick={() => disconnect.mutate()}>
      Disconnect
    </button>
  )
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useDisconnect } from '@wagmi/solid'

useDisconnect.Parameters
useDisconnect.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useDisconnect(() => ({
  config,
  // mutation options...
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { useDisconnect } from '@wagmi/solid'

useDisconnect.ReturnType
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`disconnect`](/core/api/actions/disconnect)
