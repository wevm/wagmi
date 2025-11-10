<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
const connectorDependencyVersion = 'x.y.z'
</script> -->

# baseAccount

Connector for the [Base Account SDK](https://github.com/base/account-sdk).

## Import

```ts-vue
import { baseAccount } from '{{connectorsPackageName}}'
```

## Install

<PackageMetadata package="@base-org/account" repo="base/account-sdk" isOsiLicense licenseUrl="https://github.com/base/account-sdk/blob/master/packages/account-sdk/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @base-org/account@{{connectorDependencyVersion}}
```

```bash-vue [npm]
npm install @base-org/account@{{connectorDependencyVersion}}
```

```bash-vue [yarn]
yarn add @base-org/account@{{connectorDependencyVersion}}
```

```bash-vue [bun]
bun add @base-org/account@{{connectorDependencyVersion}}
```
:::

## Usage

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { baseAccount } from '{{connectorsPackageName}}' // [!code hl]

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [baseAccount()], // [!code hl]
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

:::warning
Before going to production, it is highly recommended to set an [`appName`](#appname) and [`appLogoUrl`](#applogourl) for your application that can be displayed upon connection to the wallet.
:::

## Parameters

```ts-vue
import { type baseAccountParameters } from '{{connectorsPackageName}}'
```

Check out the [Base Account SDK docs](https://www.base.org/build/base-account) for more info.

### appName

`string`

Application name.

```ts-vue
import { baseAccount } from '{{connectorsPackageName}}'

const connector = baseAccount({
  appName: 'My Wagmi App', // [!code focus]
})
```

### appLogoUrl

`string | null | undefined`

Application logo image URL; favicon is used if unspecified.

```ts-vue
import { baseAccount } from '{{connectorsPackageName}}'

const connector = baseAccount({
  appName: 'My Wagmi App',
  appLogoUrl: 'https://example.com/myLogoUrl.png', // [!code focus]
})
```

