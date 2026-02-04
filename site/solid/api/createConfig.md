# createConfig

Creates a new Wagmi [`Config`](#config) object.

## Import

```ts
import { createConfig } from '@wagmi/solid'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` createConfig docs](/core/api/createConfig#parameters) for more information on the available parameters.

## Return Type

```ts
import { type Config } from '@wagmi/solid'
```

See the [`@wagmi/core` createConfig docs](/core/api/createConfig#return-type) for more information on the return type.
