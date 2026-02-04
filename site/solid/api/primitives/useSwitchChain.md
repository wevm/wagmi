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
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

## Parameters

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

### mutation

TanStack Query mutation options. See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/solid/reference/createMutation) for more info.

## Return Type

```ts
import { type CreateMutationResult } from '@tanstack/solid-query'
```

### mutate

`(variables: { chainId: number; connector?: Connector }) => void`

Function to trigger the chain switch.

### mutateAsync

`(variables: { chainId: number; connector?: Connector }) => Promise<Chain>`

Async version of `mutate` that returns a promise with the switched chain.

### data

`Chain | undefined`

The chain that was switched to.

### error

`SwitchChainErrorType | null`

The error object if the chain switch failed.

### isError / isIdle / isPending / isSuccess

`boolean`

Boolean flags indicating the mutation status.

### reset

`() => void`

Function to reset the mutation state.

## Action

- [`switchChain`](/core/api/actions/switchChain)
