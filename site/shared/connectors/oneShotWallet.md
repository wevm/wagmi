<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
const connectorDependencyVersion = 'x.y.z'
</script> -->

# oneShotWallet

Connector for the [1Shot Wallet](https://1shotapi.com/docs/quickstarts/1shot-wallet), a non-custodial passkey wallet embedded as an iframe (no browser extension, no API key).

## Import

```ts-vue
import { oneShotWallet } from '{{connectorsPackageName}}'
```

## Install

<PackageMetadata package="@1shotapi/ows-provider" repo="1Shot-API/prf-wallet" isOsiLicense licenseUrl="https://github.com/1Shot-API/prf-wallet/blob/main/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @1shotapi/ows-provider@{{connectorDependencyVersion}}
```

```bash-vue [npm]
npm install @1shotapi/ows-provider@{{connectorDependencyVersion}}
```

```bash-vue [yarn]
yarn add @1shotapi/ows-provider@{{connectorDependencyVersion}}
```

```bash-vue [bun]
bun add @1shotapi/ows-provider@{{connectorDependencyVersion}}
```
:::

## Usage

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { base, mainnet } from '{{packageName}}/chains'
import { oneShotWallet } from '{{connectorsPackageName}}' // [!code hl]

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [oneShotWallet()], // [!code hl]
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
```

The wallet iframe is created lazily on the first `connect` (or reconnect) in the browser, so the connector is safe to use with server-side rendering. Disconnecting revokes the app's account permission (EIP-2255 `wallet_revokePermissions`), so the user approves again on the next connect.

## Parameters

```ts-vue
import { type OneShotWalletParameters } from '{{connectorsPackageName}}'
```

### walletUrl

`string | undefined`

- Wallet origin to embed.
- Defaults to `'https://wallet.1shotapi.com'`.

```ts-vue
import { oneShotWallet } from '{{connectorsPackageName}}'

const connector = oneShotWallet({
  walletUrl: 'https://wallet.1shotapi.com', // [!code focus]
})
```

### container

`HTMLElement | (() => HTMLElement) | undefined`

- Element the wallet iframe is mounted into. Do not move it after connecting.
- Defaults to a `div` appended to `document.body`.

```ts-vue
import { oneShotWallet } from '{{connectorsPackageName}}'

const connector = oneShotWallet({
  container: () => document.getElementById('wallet')!, // [!code focus]
})
```

### presentationMode

`'flyout' | 'inline' | undefined`

- `'flyout'` shows the wallet as a lower-right panel (full-screen drawer on narrow viewports) only when it needs the user.
- `'inline'` fills `container` and stays visible.
- Defaults to `'flyout'`.

```ts-vue
import { oneShotWallet } from '{{connectorsPackageName}}'

const connector = oneShotWallet({
  container: () => document.getElementById('wallet')!,
  presentationMode: 'inline', // [!code focus]
})
```

### walletSizeX / walletSizeY

`number | undefined`

- Flyout width and height in CSS pixels.
- Defaults to `360` × `600`.

```ts-vue
import { oneShotWallet } from '{{connectorsPackageName}}'

const connector = oneShotWallet({
  walletSizeX: 400, // [!code focus]
  walletSizeY: 640, // [!code focus]
})
```

### configure

`Record<string, unknown> | undefined`

Wallet theme and copy, applied once after the iframe loads. See [1Shot Wallet customization](https://1shotapi.com/docs/embedded-wallet/customization).

```ts-vue
import { oneShotWallet } from '{{connectorsPackageName}}'

const connector = oneShotWallet({
  configure: { // [!code focus]
    copy: { productName: 'My Wagmi App' }, // [!code focus]
    theme: { primary: '#0f766e' }, // [!code focus]
  }, // [!code focus]
})
```
