<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# ledger

Connector for [Ledger Connect Kit](https://github.com/LedgerHQ/connect-kit).

## Import

```ts-vue
import { ledger } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue{3,7}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { ledger } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [ledger()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type LedgerParameters } from '{{connectorsPackageName}}'
```

### enableDebugLogs

`boolean | undefined`

Enables debug messages on the browser console in case you need to diagnose a possible problem.

```ts-vue
import { ledger } from '{{connectorsPackageName}}'

const connector = ledger({
  enableDebugLogs: true, // [!code focus]
})
```

### optionalEvents

Optional events for the connection.

`string[] | undefined`

```ts-vue
import { ledger } from '{{connectorsPackageName}}'

const connector = ledger({
  optionalEvents: [ // [!code focus]
    "message", // [!code focus]
  ], // [!code focus]
})
```

### optionalMethods

`string[] | undefined`

Optional methods for the connection.

```ts-vue
import { ledger } from '{{connectorsPackageName}}'

const connector = ledger({
  optionalMethods: [ // [!code focus]
    "wallet_switchEthereumChain", // [!code focus]
    "wallet_addEthereumChain", // [!code focus]
    "wallet_getPermissions", // [!code focus]
  ], // [!code focus]
})
```

### projectId

`string | undefined`

WalletConnect Cloud project identifier. You can find your `projectId` on your [WalletConnect dashboard](https://cloud.walletconnect.com/sign-in).

```ts-vue
import { ledger } from '{{connectorsPackageName}}'

const connector = ledger({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68', // [!code focus]
})
```

### requiredChains

`number[] | undefined`

Chain IDs the connection must support, otherwise the connection will be rejected.

```ts-vue
import { ledger } from '{{connectorsPackageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const connector = ledger({
  requiredChains: [mainnet.id, sepolia.id], // [!code focus]
})
```

### requiredEvents

`string[] | undefined`

Events the connection must support, otherwise the connection will be rejected.

```ts-vue
import { ledger } from '{{connectorsPackageName}}'

const connector = ledger({
  requiredEvents: [ // [!code focus]
    "accountsChanged", // [!code focus]
    "chainChanged", // [!code focus]
    "connect", // [!code focus]
    "disconnect", // [!code focus]
  ], // [!code focus]
})
```

### requiredMethods

`string[] | undefined`

Methods the connection must support, otherwise the connection will be rejected.

```ts-vue
import { ledger } from '{{connectorsPackageName}}'

const connector = ledger({
  requiredMethods: [ // [!code focus]
    "eth_sendTransaction", // [!code focus]
    "personal_sign", // [!code focus]
  ], // [!code focus]
})
```
