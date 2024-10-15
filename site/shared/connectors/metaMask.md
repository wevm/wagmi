<!-- <script setup>
const docsPath = 'react'
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# metaMask

Connector for the [MetaMask SDK](https://github.com/MetaMask/metamask-sdk).

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
Check out the [MetaMask SDK docs](https://github.com/MetaMask/metamask-sdk?tab=readme-ov-file#sdk-options) for more info. A few options are omitted that Wagmi manages internally.

### communicationLayerPreference

`CommunicationLayerPreference | undefined`

The preferred communication layer to use for the SDK.

### communicationServerUrl

`string | undefined`

The URL of the communication server to use for the SDK.

### dappMetadata

`DappMetadata | undefined`

- Metadata about the dapp using the SDK.
- Defaults to `{ name: 'wagmi' }`.

### enableAnalytics

`boolean | undefined`

- Send anonymous analytics to MetaMask to help us improve the SDK.
- Defaults to `false`.

### extensionOnly

`boolean | undefined`

- If MetaMask browser extension is detected, directly use it.
- Defaults to `true`.

### forceDeleteProvider <Badge type="warning">deprecated</Badge>

`boolean | undefined`

If true, the SDK will force delete the provider from the global `window` object.


### forceInjectProvider <Badge type="warning">deprecated</Badge>

`boolean | undefined`

If true, the SDK will force inject the provider into the global `window` object.

### infuraAPIKey

`string | undefined`

The Infura API key to use for RPC requests.

### injectProvider <Badge type="warning">deprecated</Badge>

`boolean | undefined`

If true, the SDK will inject the provider into the global `window` object.

### logging

`SDKLoggingOptions | undefined`

Options for customizing the logging behavior of the SDK.

### modals

`RemoteConnectionProps['modals'] | undefined`

An object that allows you to customize or translate each of the displayed modals. See the nodejs example for more information.

### openDeeplink

`((arg: string) => void) | undefined`

A function that will be called to open a deeplink to the MetaMask Mobile app.

### preferDesktop

`boolean | undefined`

If true, the SDK will prefer the desktop version of MetaMask over the mobile version.

### shouldShimWeb3

`boolean | undefined`

If true, the SDK will shim the window.web3 object with the provider returned by the SDK (useful for compatibility with older browser).

### storage

`StorageManagerProps | undefined`

Options for customizing the storage manager used by the SDK.

### timer

`any | undefined`

A timer object to use for scheduling tasks.

### transports

`string[] | undefined`

An array of transport protocols to use for communication with the MetaMask wallet.

### ui

`SDKUIOptions | undefined`

Options for customizing the SDK UI.

### useDeeplink <Badge type="warning">deprecated</Badge>

`boolean | undefined`

- If `true`, the SDK will use deeplinks to connect with MetaMask Mobile. If `false`, the SDK will use universal links to connect with MetaMask Mobile.
- Defaults to `true`.

::: warning
Setting `useDeeplink` to `false` can negatively impact performance on iOS Safari as Universal Link connections are canceled if they do not occur within ~500ms of an interaction (e.g. button press).
:::

### wakeLockType

`WakeLockStatus | undefined`

The type of wake lock to use when the SDK is running in the background.
