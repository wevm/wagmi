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
// @twoslash-cache: {"v":1,"hash":"914af31f2d67af9b6a0eb3594b780105455023fedc851e1b259e6312534bc63b","data":"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"}
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
