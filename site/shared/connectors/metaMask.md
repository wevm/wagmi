<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
const connectorDependencyVersion = 'x.y.z'
</script> -->

# metaMask

Connector for [MetaMask SDK](https://github.com/MetaMask/metamask-sdk).

## Import

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'
```

## Install

<PackageMetadata package="@metamask/sdk" repo="MetaMask/metamask-sdk" licenseUrl="https://github.com/MetaMask/metamask-sdk/blob/main/packages/sdk/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @metamask/sdk@{{connectorDependencyVersion}}
```

```bash-vue [npm]
npm install @metamask/sdk@{{connectorDependencyVersion}}
```

```bash-vue [yarn]
yarn add @metamask/sdk@{{connectorDependencyVersion}}
```

```bash-vue [bun]
bun add @metamask/sdk@{{connectorDependencyVersion}}
```
:::

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

Metadata is used to fill details for the UX on confirmation screens in MetaMask, including the following fields:

- `name`: `string` - The name of the dapp.
- `url`: `string` - URL of the dapp (defaults to `window.location.origin`).
- `iconUrl`: `string` - URL to the dapp's favicon or icon.

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

Enables SDK-side logging to provide visibility into:

- RPC methods being called.
- Events received for syncing the chain or active account.
- Raw RPC responses.

In this context, this is especially useful to observe what calls are made through Wagmi hooks.

Relevant options:

```ts
{
  developerMode: boolean, // Enables developer mode logs
  sdk: boolean           // Enables SDK-specific logs
}
```

```ts
import { metaMask } from '{{connectorsPackageName}}'

const connector = metaMask({
  logging: { developerMode: true, sdk: true } // [!code focus]
})
```

### headless

`boolean | undefined`

- Enables headless mode, disabling MetaMask's built-in modal.
- Allows developers to create their own modal, such as for displaying a QR code.

This is particularly relevant for web-only setups using Wagmi, where developers want complete control over the UI.

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

EIP-6963 defines a standard way for dapps to interact with multiple wallets simultaneously by injecting providers into the browser. Wallets that implement this standard can make their presence known to dapps in a consistent and predictable manner.

When MetaMask SDK detects an EIP-6963-compliant provider (such as MetaMask itself), the connector will automatically replace the default injected provider (like `window.ethereum`) with the one provided by MetaMask SDK.

See the [`rdns` property](https://wagmi.sh/dev/creating-connectors#properties) for more information.
