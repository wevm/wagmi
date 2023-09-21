# useSwitchAccount

Hook for switching accounts with [connectors](/core/api/connectors).

## Import

```ts
import { useSwitchAccount } from 'wagmi'
```

## Usage

::: code-group

```tsx [index.tsx]
import { useSwitchAccount } from 'wagmi'

function App() {
  const { switchAccount } = useSwitchAccount()
}
```

:::

## Parameters

```ts
import { type UseSwitchAccountParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/WagmiProvider).

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

## Return Type

```ts
import { type UseSwitchAccountReturnType } from 'wagmi'
```

## Action

[`switchAccount`](/core/api/actions/switchAccount)
