# walletConnect

Connector for the [WalletConnect](https://walletconnect.com) protocol.

## Import

```ts
import { walletConnect } from '@wagmi/solid/connectors'
```

## Usage

```ts
import { createConfig, http } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'
import { walletConnect } from '@wagmi/solid/connectors'

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    walletConnect({
      projectId: '...', // Get your projectId at https://cloud.walletconnect.com
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

See the [`@wagmi/core` walletConnect connector docs](/core/api/connectors/walletConnect#parameters) for more information on the available parameters.
