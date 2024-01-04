---
title: useConfig
description: Hook for getting `Config` from nearest `WagmiProvider`.
---

# useConfig

Hook for getting [`Config`](/react/api/createConfig#config) from nearest [`WagmiProvider`](/react/api/WagmiProvider).

## Import

```ts
import { useConfig } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useConfig } from 'wagmi'

function App() {
  const config = useConfig()
}
```

:::

## Return Type

```ts
import { type UseConfigReturnType } from 'wagmi'
```

If you use TypeScript and [register your `Config`](/react/typescript#register-config), the return type will be inferred.

::: code-group
```ts twoslash [index.tsx]
import { type Config } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: Config<readonly [typeof mainnet, typeof sepolia]>
  }
}
// ---cut---
import { useConfig } from 'wagmi'

function App() {
  const config = useConfig()
  //    ^?
}
```

```ts [config.ts]
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

:::
