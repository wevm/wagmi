<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
const connectorDependencyVersion = 'x.y.z'
</script> -->

# tempoWallet

Connector for the Tempo Wallet dialog.

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
import { tempo } from '{{packageName}}/chains'
import { tempoWallet } from '{{connectorsPackageName}}' // [!code hl]

export const config = createConfig({
  chains: [tempo],
  connectors: [tempoWallet()], // [!code hl]
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

`tempoWallet` is a thin Wagmi wrapper around the `accounts` dialog adapter.

## Parameters

```ts-vue
import { type TempoWalletParameters } from '{{connectorsPackageName}}'
```

`tempoWallet` accepts the Tempo Accounts dialog parameters together with provider options like [`authorizeAccessKey`](#authorizeaccesskey).

### host (optional)

`string`

Override the Tempo Wallet dialog host.

```ts-vue
import { tempoWallet } from '{{connectorsPackageName}}'

const connector = tempoWallet({
  host: 'https://wallet.tempo.xyz', // [!code focus]
})
```

### dialog (optional)

`Window | HTMLElement | ShadowRoot | string`

Override where the dialog mounts.

```ts-vue
import { tempoWallet } from '{{connectorsPackageName}}'

const connector = tempoWallet({
  dialog: '#tempo-wallet-root', // [!code focus]
})
```

### icon (optional)

`` `data:image/${string}` ``

Optional connector icon override.

```ts-vue
import { tempoWallet } from '{{connectorsPackageName}}'

const connector = tempoWallet({
  icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>', // [!code focus]
})
```

### name (optional)

`string`

Optional connector display name.

```ts-vue
import { tempoWallet } from '{{connectorsPackageName}}'

const connector = tempoWallet({
  name: 'My Tempo Wallet', // [!code focus]
})
```

### rdns (optional)

`string`

Optional reverse-DNS identifier.

```ts-vue
import { tempoWallet } from '{{connectorsPackageName}}'

const connector = tempoWallet({
  rdns: 'com.example.tempo-wallet', // [!code focus]
})
```

### authorizeAccessKey (optional)

`() => { expiry: number, ... }`

Default access-key authorization parameters to attach to `wallet_connect`.

```ts-vue
import { tempoWallet } from '{{connectorsPackageName}}'

const connector = tempoWallet({
  authorizeAccessKey() {
    return {
      expiry: 60 * 60,
    }
  }, // [!code focus]
})
```

See the [Accounts SDK docs](https://docs.tempo.xyz/accounts) for more info on Tempo Wallet flows and access-key authorization.
