<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# walletConnect

Connector for [WalletConnect](https://walletconnect.com).

## Import

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue{3,8-10}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { walletConnect } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    walletConnect({
      projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type WalletConnectParameters } from '{{connectorsPackageName}}'
```

### isNewChainsStale

`boolean | undefined`

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  isNewChainsStale: true, // [!code focus]
})
```

### projectId

`string`

WalletConnect Cloud project identifier. You can find your `projectId` on your [WalletConnect dashboard](https://cloud.walletconnect.com/sign-in).

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68', // [!code focus]
})
```

### metadata

`CoreTypes.Metadata | undefined`

### qrModalOptions

`QrModalOptions | undefined`

### disableProviderPing

`boolean | undefined`

### relayUrl

`string | undefined`

### storageOptions

`KeyValueStorageOptions | undefined`

### showQrModal

`boolean | undefined`
