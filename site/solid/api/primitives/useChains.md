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
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useChains } from '@wagmi/solid'

useChains.Parameters
useChains.SolidParameters
```

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

```ts
import { useChains } from '@wagmi/solid'

useChains.ReturnType
```

`Accessor<readonly Chain[]>`

Returns an accessor containing the configured chains.

## Action

- [`getChains`](/core/api/actions/getChains)
