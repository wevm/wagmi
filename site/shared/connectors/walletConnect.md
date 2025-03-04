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
import { type WalletConnectParameters } from '{{connectorsPackageName}}'
```

Check out the [WalletConnect docs](https://github.com/WalletConnect/walletconnect-monorepo/tree/v2.0/providers/ethereum-provider) for more info. A few options are omitted that Wagmi manages internally.

### customStoragePrefix <Badge :text="`${packageName === '@wagmi/core' ? '@wagmi/connectors@>=5.1.8' : `${packageName}@>=${packageName === 'wagmi' ? '2.12.8' : packageName === '@wagmi/vue' ? '0.0.40' : ''}`}`" />

`string | undefined`

Custom storage prefix for persisting provider state.

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  customStoragePrefix: 'wagmi', // [!code focus]
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
```

### disableProviderPing

`boolean | undefined`

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  disableProviderPing: false, // [!code focus]
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
```

### isNewChainsStale

`boolean | undefined`

- If a new chain is added to a previously existing configured connector `chains`, this flag
will determine if that chain should be considered as stale. A stale chain is a chain that
WalletConnect has yet to establish a relationship with (e.g. the user has not approved or
rejected the chain).
- Defaults to `true`.

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  isNewChainsStale: true, // [!code focus]
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
```

::: details More info
Preface: Whereas WalletConnect v1 supported dynamic chain switching, WalletConnect v2 requires
the user to pre-approve a set of chains up-front. This comes with consequent UX nuances (see below) when
a user tries to switch to a chain that they have not approved.

This flag mainly affects the behavior when a wallet does not support dynamic chain authorization
with WalletConnect v2.

If `true` (default), the new chain will be treated as a stale chain. If the user
has yet to establish a relationship (approved/rejected) with this chain in their WalletConnect
session, the connector will disconnect upon the dapp auto-connecting, and the user will have to
reconnect to the dapp (revalidate the chain) in order to approve the newly added chain.
This is the default behavior to avoid an unexpected error upon switching chains which may
be a confusing user experience (e.g. the user will not know they have to reconnect
unless the dapp handles these types of errors).

If `false`, the new chain will be treated as a validated chain. This means that if the user
has yet to establish a relationship with the chain in their WalletConnect session, wagmi will successfully
auto-connect the user. This comes with the trade-off that the connector will throw an error
when attempting to switch to the unapproved chain. This may be useful in cases where a dapp constantly
modifies their configured chains, and they do not want to disconnect the user upon
auto-connecting. If the user decides to switch to the unapproved chain, it is important that the
dapp handles this error and prompts the user to reconnect to the dapp in order to approve
the newly added chain.
:::

### metadata

`CoreTypes.Metadata | undefined`

Metadata related to the app requesting the connection.

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
  metadata: { // [!code focus]
    name: 'Example', // [!code focus]
    description: 'Example website', // [!code focus]
    url: 'https://example.com', // [!code focus]
  }, // [!code focus]
})
```

### projectId

`string`

WalletConnect Cloud project identifier. You can find your `projectId` on your [WalletConnect dashboard](https://cloud.reown.com/sign-in).

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68', // [!code focus]
})
```

### qrModalOptions

`QrModalOptions | undefined`

Options for rendering QR modal.

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
  qrModalOptions: { // [!code focus]
    themeMode: 'dark', // [!code focus]
  }, // [!code focus]
})
```

### relayUrl

`string | undefined`

- WalletConnect relay URL to use.
- Defaults to `'wss://relay.walletconnect.com'`.

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
  relayUrl: 'wss://relay.walletconnect.org', // [!code focus]
})
```

### storageOptions

`KeyValueStorageOptions | undefined`

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
  storageOptions: {}, // [!code focus]
})
```

### showQrModal

`boolean | undefined`

- Whether to show the QR code modal upon calling `connector.connect()`.
- Defaults to `true`.

```ts-vue
import { walletConnect } from '{{connectorsPackageName}}'

const connector = walletConnect({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
  showQrModal: true, // [!code focus]
})
```

::: tip
This can be disabled and you can listen for a `'message'` event with payload `{ type: 'display_uri'; data: string }` if you want to render your own QR code.
:::
