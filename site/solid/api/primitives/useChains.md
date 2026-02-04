---
title: useChains
description: Primitive for getting configured chains.
---

# useChains

Primitive for getting configured chains.

## Import

```ts
import { useChains } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useChains } from '@wagmi/solid'
import { For } from 'solid-js'

function App() {
  const chains = useChains()
  
  return (
    <ul>
      <For each={chains()}>
        {(chain) => <li>{chain.name}</li>}
      </For>
    </ul>
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
useChains(() => ({
  config,
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

## Return Type

`Accessor<readonly Chain[]>`

Returns an accessor containing the configured chains.

## Action

- [`getChains`](/core/api/actions/getChains)
