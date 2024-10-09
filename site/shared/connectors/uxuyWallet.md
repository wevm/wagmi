<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# uxuyWallet

Connector for the [Uxuy Wallet SDK](https://docs.uxuy.com/uxuy-connect/guide/).

## Import

```ts-vue
import { uxuyWallet } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { uxuyWallet } from '{{connectorsPackageName}}' // [!code hl]

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [uxuyWallet()], // [!code hl]
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
import { type UxuyWalletParameters } from '{{connectorsPackageName}}'
```

Check out the [Uxuy Wallet SDK docs](https://docs.uxuy.com/uxuy-connect/guide/) for more info.

### appName

`string`

Application name.

```ts-vue
import { uxuyWallet } from '{{connectorsPackageName}}'

const connector = uxuyWallet({
  appName: 'My Wagmi App', // [!code focus]
})
```

### appLogoUrl

`string | null | undefined`

Application logo image URL; favicon is used if unspecified.

```ts-vue
import { uxuyWallet } from '{{connectorsPackageName}}'

const connector = uxuyWallet({
  appName: 'My Wagmi App',
  appLogoUrl: 'https://example.com/myLogoUrl.png', // [!code focus]
})
```
