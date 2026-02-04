---
title: useReconnect
description: Primitive for reconnecting to previously connected connectors.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'reconnect'
const typeName = 'Reconnect'
const TData = 'readonly Connection[]'
const TError = 'ReconnectErrorType'
const TVariables = '{ connectors?: readonly Connector[] | undefined; }'
</script>

# useReconnect

Primitive for reconnecting to previously connected connectors.

## Import

```ts
import { useReconnect } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReconnect } from '@wagmi/solid'

function App() {
  const reconnect = useReconnect()
  
  return (
    <button onClick={() => reconnect.mutate()}>
      Reconnect
    </button>
  )
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useReconnect } from '@wagmi/solid'

useReconnect.Parameters
useReconnect.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useReconnect(() => ({
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
import { useReconnect } from '@wagmi/solid'

useReconnect.ReturnType
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`reconnect`](/core/api/actions/reconnect)
