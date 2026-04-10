<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
const connectorDependencyVersion = 'x.y.z'
</script> -->

# tempoWallet

Connector for Tempo Wallet via the [Accounts SDK](https://docs.tempo.xyz/accounts).

## Import

```ts-vue
import { tempoWallet } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { tempoTestnet } from '{{packageName}}/chains'
import { tempoWallet } from '{{connectorsPackageName}}' // [!code hl]

export const config = createConfig({
  chains: [tempoTestnet],
  connectors: [tempoWallet()], // [!code hl]
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type TempoWalletParameters } from '{{connectorsPackageName}}'
```

See the [Accounts SDK docs](https://docs.tempo.xyz/accounts) for more info.
