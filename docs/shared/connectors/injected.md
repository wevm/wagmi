<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# injected

Connector for [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) Ethereum Providers.

## Import

```ts-vue
import { injected } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { injected } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type InjectedParameters } from '{{connectorsPackageName}}'
```

### shimDisconnect

`boolean | undefined`

- MetaMask and other injected providers do not support programmatic disconnect.
- This flag simulates the disconnect behavior by keeping track of connection status in storage. See [GitHub issue](https://github.com/MetaMask/metamask-extension/issues/10353) for more info.
- Defaults to `true`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { injected } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected({ // [!code focus]
      shimDisconnect: false, // [!code focus]
    }), // [!code focus]
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

### target

`TargetId | (TargetMap[TargetId] & { id: string }) | (() => (TargetMap[TargetId] & { id: string }) | undefined) | undefined`

- [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) Ethereum Provider to target.
- [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) supported via `createConfig`'s <a :href="`/${docsPath}/api/connectors/injected`">`multiInjectedProviderDiscovery`</a> property.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { injected } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected({ // [!code focus]
      target() { // [!code focus]
        return window.ethereum // [!code focus]
      }, // [!code focus]
    }), // [!code focus]
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

### unstable_shimAsyncInject

`boolean | number | undefined`

Watches for async provider injection via the `ethereum#initialized` event. When `true`, defaults to `1_000` milliseconds. Otherwise, uses a provided value of milliseconds.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { injected } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected({ // [!code focus]
      unstable_shimAsyncInject: 2_000, // [!code focus]
    }), // [!code focus]
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
