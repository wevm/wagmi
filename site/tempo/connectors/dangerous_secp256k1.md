# `dangerous_secp256k1`

Connector for a Secp256k1 EOA.
 
:::warning
NOT RECOMMENDED FOR PRODUCTION USAGE. This connector stores private keys in clear text, and are bound to the session length of the storage used. Instead, use this connector for testing workflows, like end-to-end tests.
:::

## Usage

```ts [wagmi.config.ts]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { dangerous_secp256k1 } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [dangerous_secp256k1()], // [!code focus]
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```

## Parameters

### privateKey

- **Type:** `Hex`

Optional fixed private key to expose through the connector. If omitted, the connector generates and persists one for you.
