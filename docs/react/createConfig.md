# createConfig

Creates new [`Config`](#return-type).

## Import

```ts
import { createConfig } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.ts]
import { mainnet, sepolia } from 'viem/chains'
import { createConfig } from 'wagmi'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```
:::

## Parameters

```ts
import { type CreateConfigParameters } from 'wagmi'
```

## Return Type

The wagmi `Config` is a framework agnostic object that manages connections and state.

```ts
import { type Config } from 'wagmi'
```