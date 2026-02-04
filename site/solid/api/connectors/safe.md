# safe

Connector for [Safe](https://safe.global/) (formerly Gnosis Safe) multi-sig wallets.

## Import

```ts
import { safe } from '@wagmi/solid/connectors'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'
import { safe } from '@wagmi/solid/connectors'

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [safe()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` safe connector docs](/core/api/connectors/safe#parameters) for more information on the available parameters.
