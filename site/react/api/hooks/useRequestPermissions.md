---
title: useRequestPermissions
description: Hook for requesting permissions for a wallet.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'requestPermissions'
const typeName = 'RequestPermissions'
const mutate = 'requestPermissions'
const TData = 'RequestPermissionsData'
const TError = 'RequestPermissionsErrorType'
const TVariables = 'RequestPermissionsVariables'
</script>

# useRequestPermissions

Hook for requesting permissions for a wallet.

## Import

```ts
import { useRequestPermissions } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useRequestPermissions } from 'wagmi'

function App() {
  const { requestPermissions } = useRequestPermissions()

  return (
    <button
      onClick={() => requestPermissions({
        eth_accounts: {}
      })}
    >
      Request permissions
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseRequestPermissionsParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useRequestPermissions } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useRequestPermissions({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseRequestPermissionsReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`requestPermissions`](/core/api/actions/requestPermissions)
