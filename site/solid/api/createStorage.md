# createStorage

Creates a new Wagmi [`Storage`](#storage) object.

## Import

```ts
import { createStorage } from '@wagmi/solid'
```

## Usage

```ts
import { createConfig, createStorage, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  storage: createStorage({ storage: localStorage }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` createStorage docs](/core/api/createStorage#parameters) for more information on the available parameters.

## Return Type

```ts
import { type Storage } from '@wagmi/solid'
```

See the [`@wagmi/core` createStorage docs](/core/api/createStorage#return-type) for more information on the return type.
