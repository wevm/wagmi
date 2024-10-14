---
title: useSwitchChain
description: Hook for switching the target chain for a connector or the Wagmi `Config`.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'switchChain'
const typeName = 'SwitchChain'
const mutate = 'switchChain'
const TData = 'SwitchChainData'
const TError = 'SwitchChainErrorType'
const TVariables = 'SwitchChainVariables'
</script>

# useSwitchChain

Hook for switching the target chain for a connector or the Wagmi [`Config`](/react/api/createConfig#config).

## Import

```ts
import { useSwitchChain } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSwitchChain } from 'wagmi'

function App() {
  const { chains, switchChain } = useSwitchChain()

  return (
    <div>
      {chains.map((chain) => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          {chain.name}
        </button>
      ))}
    </div>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

::: tip
When connected, `switchChain` will switch the target chain for the connector. When not connected, `switchChain` will switch the target chain for the Wagmi [`Config`](/react/api/createConfig#config).
:::

## Parameters

```ts
import { type UseSwitchChainParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSwitchChain } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSwitchChain({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSwitchChainReturnType } from 'wagmi'
```

### chains

`readonly [Chain, ...Chain[]]`

Globally configured chains. Useful for rendering a list of available chains to switch to.

::: code-group
```tsx [index.tsx]
import { useSwitchChain } from 'wagmi'

function App() {
  const { chains, switchChain } = useSwitchChain()

  return (
    <div>
      {chains.map((chain) => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          {chain.name}
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

- [`switchChain`](/core/api/actions/switchChain)
