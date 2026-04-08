# `tempoWallet`

Connector for Tempo Wallet via the [Accounts SDK](https://docs.tempo.xyz/accounts).

## Import

```ts
import { tempoWallet } from 'wagmi/tempo'
```

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

## Parameters

```ts
import { type TempoWalletParameters } from 'wagmi/connectors'
```

See the [Accounts SDK docs](https://docs.tempo.xyz/accounts) for more info.
