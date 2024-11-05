---
title: useSignMessage
description: Hook for signing messages.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'signMessage'
const typeName = 'SignMessage'
const mutate = 'signMessage'
const TData = 'SignMessageData'
const TError = 'SignMessageErrorType'
const TVariables = 'SignMessageVariables'
</script>

# useSignMessage

Hook for signing messages.

## Import

```ts
import { useSignMessage } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSignMessage } from 'wagmi'

function App() {
  const { signMessage } = useSignMessage()

  return (
    <button onClick={() => signMessage({ message: 'hello world' })}>
      Sign message
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSignMessageParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSignMessage } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSignMessage({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSignMessageReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`signMessage`](/core/api/actions/signMessage)
