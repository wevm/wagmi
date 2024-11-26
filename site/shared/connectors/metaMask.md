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

Metadata about the dapp using the SDK, including `name`, `url`, and `iconUrl`.
By default, `name` is set to `'wagmi'`.

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
Setting this to `true` allows you to [display custom modals](https://docs.metamask.io/wallet/how-to/display/custom-modals/).
The default is `false`.

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'

const connector = metaMask({
  headless: true // [!code focus]
})
```
