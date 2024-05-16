<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# coinbaseWallet

Connector for the [Coinbase Wallet SDK](https://github.com/coinbase/coinbase-wallet-sdk).

## Import

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { coinbaseWallet } from '{{connectorsPackageName}}' // [!code hl]

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [coinbaseWallet()], // [!code hl]
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
import { type CoinbaseWalletParameters } from '{{connectorsPackageName}}'
```

Check out the [Coinbase Wallet SDK docs](https://github.com/coinbase/coinbase-wallet-sdk) for more info.

### appName

`string`

Application name.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App', // [!code focus]
})
```

### appLogoUrl

`string | null | undefined`

Application logo image URL; favicon is used if unspecified.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  appLogoUrl: 'https://example.com/myLogoUrl.png', // [!code focus]
})
```

### headlessMode <Badge type="warning" text="deprecated" />

`boolean | undefined`

- Whether or not onboarding overlay popup should be displayed.
- `headlessMode` will be removed in the next major version. Upgrade to [`version: '4'`](#version).

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  headlessMode: false, // [!code focus]
})
```

### preference <Badge text=">=2.9.0" />

`"all" | "eoaOnly" | "smartWalletOnly"`

Preference for the type of wallet to display.

- `'eoaOnly'`: Uses EOA Browser Extension or Mobile Coinbase Wallet.
- `'smartWalletOnly'`: Displays Smart Wallet popup.
- `'all'` (default): Supports both `'eoaOnly'` and `'smartWalletOnly'` based on context.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  preference: 'smartWalletOnly', // [!code focus]
})
```

### version <Badge text=">=2.9.0" />

- Coinbase Wallet SDK version
- Defaults to `'4'`. If [`headlessMode: true`](#headlessmode), defaults to `'3'`.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  version: '4', // [!code focus]
})
```

