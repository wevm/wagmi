# `webAuthn`

Connector for a WebAuthn EOA.

## Usage

```ts [wagmi.config.ts]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { webAuthn } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [webAuthn()], // [!code focus]
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```

Use `webAuthn({ authUrl: '/api/webauthn' })` if you want registration and authentication challenges to come from a server endpoint instead of the default local browser ceremony.

`webAuthn` is a thin wagmi wrapper around the root `accounts` package. Install the optional `accounts` dependency alongside `wagmi` to use it.

## Parameters

### authUrl (optional)

- **Type:** `string`

URL of a server-backed WebAuthn handler.

### ceremony (optional)

- **Type:** `WebAuthnCeremony`

Custom WebAuthn ceremony implementation.

### icon (optional)

- **Type:** `` `data:image/${string}` ``

Optional connector icon override.

### name (optional)

- **Type:** `string`

Optional connector display name.

### rdns (optional)

- **Type:** `string`

Optional reverse-DNS identifier.

### authorizeAccessKey (optional)

- **Type:** `() => { expiry: number, ... }`

Default access-key authorization parameters to attach to `wallet_connect`.
