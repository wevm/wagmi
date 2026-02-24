---
title: useConnectors
description: Primitive for getting configured connectors.
---

# useConnectors

Primitive for getting configured connectors.

## Import

```ts
import { useConnectors } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConnect, useConnectors } from '@wagmi/solid'
import { For } from 'solid-js'

function App() {
  const connectors = useConnectors()
  const connect = useConnect()
  
  return (
    <ul>
      <For each={connectors()}>
        {(connector) => (
          <li>
            <button onClick={() => connect.mutate({ connector })}>
              {connector.name}
            </button>
          </li>
        )}
      </For>
    </ul>
  )
}
```
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'
import { injected, walletConnect } from '@wagmi/solid/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected(), walletConnect({ projectId: '...' })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

## Parameters

```ts
import { useConnectors } from '@wagmi/solid'

useConnectors.Parameters
useConnectors.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useConnectors(() => ({
  config,
}))
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

## Return Type

```ts
import { useConnectors } from '@wagmi/solid'

useConnectors.ReturnType
```

`Accessor<readonly Connector[]>`

Returns an accessor containing all configured connectors.

## Action

- [`getConnectors`](/core/api/actions/getConnectors)
