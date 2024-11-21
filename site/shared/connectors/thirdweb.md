<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# thirdweb in-app wallet

Connector for [thirdweb in-app wallets](https://portal.thirdweb.com/connect/in-app-wallet/overview).

## Import

```ts-vue
import { inAppWallet } from '{{connectorsPackageName}}'
```

## Usage

You will need a free clientId from [thirdweb](https://thirdweb.com) to use this connector.

```ts-vue{3,7}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { inAppWallet } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [inAppWallet({ clientId: "...", strategy: "google" })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type InAppWalletConnectionOptions } from 'thirdweb/wallets'
```

Check out the [thirdweb developer portal](https://portal.thirdweb.com/typescript/v5/inAppWallet) for more info.

### client

The `clientId` to use for authentication. Obtain one from [thirdweb](https://thirdweb.com).

```ts-vue
import { inAppWallet } from '{{connectorsPackageName}}'

const connector = inAppWallet({
  clientId: "...", // [!code focus]
  strategy: "google",
})
```

### strategy

The strategy to use for authentication, options include `"email"`, `"phone"`, `"google"`, `"github"`. `"discord"` and more.

```ts-vue
import { inAppWallet } from '{{connectorsPackageName}}'

const connector = inAppWallet({
  clientId: "...",
  strategy: "google", // [!code focus]
})
```

Some strategies can have additional required parameters, check out the [thirdweb developer portal](https://portal.thirdweb.com/typescript/v5/inAppWallet) for more info.
