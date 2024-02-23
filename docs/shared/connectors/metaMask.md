<!-- <script setup>
const docsPath = 'react'
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# metaMask

Connector for the [MetaMask SDK](https://github.com/MetaMask/metamask-sdk).

## Import

>[!WARNING]  
> This connector has a large file size due to the underlying @metamask/sdk.

>[!WARNING]  
> MetaMask SDK can be used for mobile and desktop support.

>[!WARNING]  
> MetaMask SDK supports EIP-6963, which prevents other injected wallets to conflict with the connector.

>[!WARNING]
> Due to a limitation in iOS, Safari cancels deep link connections if they do not happen within 500ms. It's recommended to use a direct RPC method for transactions to avoid this issue. Instead of using `getSigner` and `sendTransaction`, directly invoke the `send` method with `'eth_sendTransaction'` and wait for the transaction using `waitForTransaction`. This approach avoids the deep link timeout issue on iOS Safari.
>
> **Implementation with potential timeout issue:**
> ```js
> const signer = provider.getSigner()
> const txSubmitRes = await signer.sendTransaction(transactionData)
> ```
>
> **Recommended Implementation (to avoid timeout):**
> ```js
> const hash = await provider.send('eth_sendTransaction', [transactionData])
> const txReceipt = await provider.waitForTransaction(hash as string)
> const txSubmitRes = await provider.getTransaction(txReceipt.transactionHash)
> ```

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

### forceDeleteProvider

`boolean | undefined`

If true, the SDK will force delete the provider from the global `window` object.


### forceInjectProvider

`boolean | undefined`

If true, the SDK will force inject the provider into the global `window` object.

### infuraAPIKey

`string | undefined`

The Infura API key to use for RPC requests.

### injectProvider

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

### useDeeplink

`boolean | undefined`

- If `true`, the SDK will use deeplinks to connect with MetaMask Mobile. If `false`, the SDK will use universal links to connect with MetaMask Mobile.
- Defaults to `true`.

### wakeLockType

`WakeLockStatus | undefined`

The type of wake lock to use when the SDK is running in the background.
