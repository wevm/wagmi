---
title: useConfig
description: Primitive for getting Wagmi Config.
---

# useConfig

Primitive for getting the current Wagmi [`Config`](/solid/api/createConfig#config).

## Import

```ts
import { useConfig } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConfig } from '@wagmi/solid'

function App() {
  const config = useConfig()
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
useConfig(() => ({
  config: customConfig,
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

## Return Type

`Accessor<Config>`

Returns an accessor containing the Wagmi Config.
