# baseAccount

Connector for [Base Account](https://www.base.org/) smart accounts.

## Import

```ts
import { baseAccount } from '@wagmi/solid/connectors'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, base } from '@wagmi/solid/chains'
import { baseAccount } from '@wagmi/solid/connectors'

const config = createConfig({
  chains: [mainnet, base],
  connectors: [baseAccount()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` baseAccount connector docs](/core/api/connectors/baseAccount#parameters) for more information on the available parameters.
