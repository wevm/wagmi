<!-- <script setup>
const docsPath = 'react'
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# metaMask

Connector for [MetaMask SDK](https://github.com/MetaMask/metamask-sdk).

## Import

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue{3,7}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { metaMask } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type MetaMaskParameters } from '{{connectorsPackageName}}'
```

Check out the [MetaMask SDK docs](https://docs.metamask.io/wallet/connect/3rd-party-libraries/wagmi/) for more info. A few options are omitted that Wagmi manages internally.

### dappMetadata

`DappMetadata | undefined`

Metadata about the dapp using the SDK, including:

- `name` - The name of the dapp.
  The default is `'wagmi'`.
- `url` - The URL of the dapp.
  The default is `'window.location.origin'`.
- `iconUrl` - The URL of the dapp's icon.

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'

const connector = metaMask({
  dappMetadata: { // [!code focus]
    name: 'My Wagmi App', // [!code focus]
    url: 'https://example.com', // [!code focus]
    iconUrl: 'https://example.com/favicon.ico', // [!code focus]
  }
})
```

### logging

`SDKLoggingOptions | undefined`

Options for customizing the logging behavior of the SDK.

### headless

`boolean | undefined`

Enables or disables headless mode.
Setting this to `true` disables the MetaMask modal, allowing you to create your own UI.
To get the deeplink to display in the QR code, listen to the `display_uri` event.

The default is `false`.

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'

const connector = metaMask({
  headless: true // [!code focus]
})
```

## Advanced

By default, if the EIP-6963 MetaMask injected provider is detected, this connector will replace it.
See the [`rdns` property](https://wagmi.sh/dev/creating-connectors#properties) for more information.
