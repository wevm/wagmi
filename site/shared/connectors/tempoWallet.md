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

## Install

<PackageMetadata package="accounts" repo="tempoxyz/accounts" isOsiLicense licenseUrl="https://github.com/tempoxyz/accounts/blob/main/LICENSE-MIT" />

::: code-group
```bash-vue [pnpm]
pnpm add accounts@{{connectorDependencyVersion}}
```

```bash-vue [npm]
npm install accounts@{{connectorDependencyVersion}}
```

```bash-vue [yarn]
yarn add accounts@{{connectorDependencyVersion}}
```

```bash-vue [bun]
bun add accounts@{{connectorDependencyVersion}}
```
:::

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
