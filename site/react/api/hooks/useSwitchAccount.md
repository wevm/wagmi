---
title: useSwitchAccount
description: Hook for switching the current account.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'switchAccount'
const typeName = 'SwitchAccount'
const mutate = 'switchAccount'
const TData = 'SwitchAccountData'
const TError = 'SwitchAccountErrorType'
const TVariables = 'SwitchAccountVariables'
</script>

# useSwitchAccount

Hook for switching the current account.

## Import

```ts
import { useSwitchAccount } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSwitchAccount } from 'wagmi'

function App() {
  const { connectors, switchAccount } = useSwitchAccount()

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => switchAccount({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSwitchAccountParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSwitchAccount } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSwitchAccount({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSwitchAccountReturnType } from 'wagmi'
```

### connectors

`readonly Connector[]`

Globally configured and actively connected connectors. Useful for rendering a list of available connectors to switch to.

::: code-group
```tsx [index.tsx]
import { useSwitchAccount } from 'wagmi'

function App() {
  const { connectors, switchAccount } = useSwitchAccount()

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => switchAccount({ connector })}>
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

<!--@include: @shared/mutation-imports.md-->

## Action

- [`switchAccount`](/core/api/actions/switchAccount)
