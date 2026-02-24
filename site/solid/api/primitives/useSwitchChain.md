---
title: useSwitchChain
description: Primitive for switching chains.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'switchChain'
const typeName = 'SwitchChain'
const TData = 'Chain'
const TError = 'SwitchChainErrorType'
const TVariables = '{ chainId: number; connector?: Connector | undefined; }'
</script>

# useSwitchChain

Primitive for switching chains.

## Import

```ts
import { useSwitchChain } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSwitchChain } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'
import { For } from 'solid-js'

function App() {
  const switchChain = useSwitchChain()
  
  return (
    <div>
      <For each={[mainnet, sepolia]}>
        {(chain) => (
          <button
            disabled={switchChain.isPending}
            onClick={() => switchChain.mutate({ chainId: chain.id })}
          >
            {chain.name}
          </button>
        )}
      </For>
    </div>
  )
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useSwitchChain } from '@wagmi/solid'

useSwitchChain.Parameters
useSwitchChain.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useSwitchChain(() => ({
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
import { useSwitchChain } from '@wagmi/solid'

useSwitchChain.ReturnType
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`switchChain`](/core/api/actions/switchChain)
