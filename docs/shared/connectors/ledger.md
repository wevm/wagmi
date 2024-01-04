<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# ledger

Connector for connecting with a Ledger device using the [Ledger Connect Kit](https://developers.ledger.com/docs/connect/introduction/).

## Import

```ts
import { LedgerConnector } from 'wagmi/connectors/ledger'
```

## Usage

To get started with Ledger + WalletConnect v2, you will need to retrieve a Project ID. You can find your Project ID [here](https://cloud.walletconnect.com/sign-in).

```ts{3,8-10}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { ledger } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    ledger({
      projectId: '...',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts
import { type LedgerParameters } from '{{connectorsPackageName}}'
```

Check out the [Coinbase Wallet SDK docs](https://github.com/coinbase/coinbase-wallet-sdk) for more info.

### projectId

WalletConnect Cloud Project ID. You can find your Project ID [here](https://cloud.walletconnect.com/sign-in).

```ts {5}
export const config = createConfig({
  // ...
  connectors: [
    ledger({
      projectId: '...',
    }),
  ],
  // ...
})
```

### enableDebugLogs (optional)

Toggle debug logging for Ledger Connect Kit.

```ts {6}
export const config = createConfig({
  // ...
  connectors: [
    ledger({
      projectId: '...',
      enableDebugLogs: true,
    }),
  ],
  // ...
})
```