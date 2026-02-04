# gemini

Connector for [Gemini Wallet](https://www.gemini.com/).

## Import

```ts
import { gemini } from '@wagmi/solid/connectors'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'
import { gemini } from '@wagmi/solid/connectors'

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [gemini()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` gemini connector docs](/core/api/connectors/gemini#parameters) for more information on the available parameters.
