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

```ts-vue{3,8-10}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { coinbaseWallet } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    coinbaseWallet({
      appName: 'My Wagmi App',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

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

### chainId

`number | undefined`

Fallback Ethereum Chain ID. Defaults to `1` (Mainnet).

```ts-vue
import { mainnet } from '{{packageName}}/chains'
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  chainId: mainnet.id, // [!code focus]
})
```

### darkMode

`boolean | undefined`

Use dark theme.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  darkMode: true, // [!code focus]
})
```

### diagnosticLogger

`DiagnosticLogger | undefined`

A diagnostic tool for debugging; for most, leave it unspecified.

### enableMobileWalletLink

`boolean | undefined`

Whether to connect mobile web app via WalletLink, defaults to `false`.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  enableMobileWalletLink: true, // [!code focus]
})
```

### headlessMode

`boolean | undefined`

Whether or not onboarding overlay popup should be displayed.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  headlessMode: false, // [!code focus]
})
```

### jsonRpcUrl

`string | undefined`

Fallback Ethereum JSON RPC URL.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  jsonRpcUrl: 'https://cloudflare-eth.com', // [!code focus]
})
```

### linkApiUrl

`string | undefined`

Coinbase Wallet link server URL; for most, leave it unspecified.

### overrideIsCoinbaseBrowser / overrideIsCoinbaseWallet / overrideIsMetaMask

`boolean | undefined`

Whether wallet link provider should override the `isCoinbaseBrowser`, `isCoinbaseWallet`, and/or `isMetaMask` property.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  isCoinbaseBrowser: true, // [!code focus]
  isCoinbaseWallet: true, // [!code focus]
  isMetaMask: true, // [!code focus]
})
```

### reloadOnDisconnect

`boolean | undefined`

Whether or not to reload dapp automatically after disconnect, defaults to `false`.

```ts-vue
import { coinbaseWallet } from '{{connectorsPackageName}}'

const connector = coinbaseWallet({
  appName: 'My Wagmi App',
  reloadOnDisconnect: true, // [!code focus]
})
```

### uiConstructor

`((options: Readonly<WalletUIOptions>) => WalletUI) | undefined`

An implementation of WalletUI; for most, leave it unspecified.