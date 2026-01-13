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

<PackageMetadata package="@metamask/connect-evm" repo="MetaMask/connect-monorepo" licenseUrl="https://github.com/MetaMask/connect-monorepo/blob/main/packages/connect-evm/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @metamask/connect-evm@{{connectorDependencyVersion}}
```

```bash-vue [npm]
npm install @metamask/connect-evm@{{connectorDependencyVersion}}
```

```bash-vue [yarn]
yarn add @metamask/connect-evm@{{connectorDependencyVersion}}
```

```bash-vue [bun]
bun add @metamask/connect-evm@{{connectorDependencyVersion}}
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

### dapp

`DappMetadata | undefined`

Metadata is used to fill details for the UX on confirmation screens in MetaMask, including the following fields:

- `name`: `string` - The name of the dapp.
- `url`: `string` - URL of the dapp (defaults to `window.location.origin`).
- `iconUrl`: `string` - URL to the dapp's favicon or icon.

Defaults to `{ name: window.location.hostname }`.

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'

const connector = metaMask({
  dapp: { // [!code focus]
    name: 'My Wagmi App', // [!code focus]
    url: 'https://example.com', // [!code focus]
    iconUrl: 'https://example.com/favicon.ico', // [!code focus]
  }
})
```

### debug

`boolean | undefined`

Enables debug mode for the MetaMask SDK. When enabled, provides additional logging and debugging information.

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'

const connector = metaMask({
  debug: true // [!code focus]
})
```

### connectAndSign

`string | undefined`

Shortcut to connect and sign a message in a single operation. When provided, the connector will connect to MetaMask and immediately prompt the user to sign the specified message.

This parameter is mutually exclusive with `connectWith` - only one can be used at a time.

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'

const connector = metaMask({
  connectAndSign: 'Sign this message to connect', // [!code focus]
})
```

### connectWith

`{ method: string; params: unknown[] } | undefined`

Allows connecting with any RPC method. When provided, the connector will connect to MetaMask and immediately call the specified RPC method with the given parameters.

This parameter is mutually exclusive with `connectAndSign` - only one can be used at a time.

```ts-vue
import { metaMask } from '{{connectorsPackageName}}'

const connector = metaMask({
  connectWith: { // [!code focus]
    method: 'eth_requestAccounts', // [!code focus]
    params: [], // [!code focus]
  }
})
```

## Advanced

By default, if the EIP-6963 MetaMask injected provider is detected, this connector will replace it.

EIP-6963 defines a standard way for dapps to interact with multiple wallets simultaneously by injecting providers into the browser. Wallets that implement this standard can make their presence known to dapps in a consistent and predictable manner.

When MetaMask SDK detects an EIP-6963-compliant provider (such as MetaMask itself), the connector will automatically replace the default injected provider (like `window.ethereum`) with the one provided by MetaMask SDK.

See the [`rdns` property](https://wagmi.sh/dev/creating-connectors#properties) for more information.
