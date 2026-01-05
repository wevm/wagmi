# `KeyManager.localStorage`

Manages public key registrations in local storage on the client device.

:::warning
The `KeyManager.localStorage()` implementation is not recommended for production use as it stores public keys on the client device, meaning it cannot be re-extracted when the user's storage is cleared or if the user is on another device. 

For production, you should opt for a remote key manager such as [`KeyManager.http`](/tempo/keyManagers/http).
:::

## Usage

```ts [wagmi.config.ts]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [webAuthn({
    keyManager: KeyManager.localStorage(), // [!code focus]
  })],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```
