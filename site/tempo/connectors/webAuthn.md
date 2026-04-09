# `webAuthn`

Connector for a WebAuthn EOA.

## Usage

```ts [wagmi.config.ts]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { webAuthn } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [
    webAuthn(), // [!code focus]
  ],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```

## Parameters

See the [Accounts SDK docs](https://docs.tempo.xyz/accounts) for more info on available parameters.
