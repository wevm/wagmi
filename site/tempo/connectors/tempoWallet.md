# `tempoWallet`

Connector for the Tempo Wallet dialog.

## Usage

```ts [wagmi.config.ts]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { tempoWallet } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [tempoWallet()], // [!code focus]
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```

`tempoWallet` is a thin wagmi wrapper around the root `accounts` dialog adapter. Install the optional `accounts` dependency alongside `wagmi` to use it. It is also re-exported from `wagmi/connectors` and `@wagmi/connectors`.

## Parameters

### host (optional)

- **Type:** `string`

Override the Tempo Wallet dialog host.

### dialog (optional)

- **Type:** `Window | HTMLElement | ShadowRoot | string`

Override where the dialog mounts.

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
