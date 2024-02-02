<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# xdefiWallet

Connector for the [XDEFI](https://github.com/XDeFi-tech/).

## Import

```ts-vue
import { xdefiWallet } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue{3,8-10}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { xdefiWallet } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    coinbaseWallet({
      appName: 'My Wagmi App',
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
import { type XDEFIWalletParameters } from '{{connectorsPackageName}}'
```

Check out the [XDEFI docs](https://docs.xdefi.io/docs/technical-documentation/xdefi-extension-integration) for more info.
