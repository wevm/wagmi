<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# porto

Connector for [Porto](https://porto.sh).

## Import

```ts-vue
import { porto } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { porto } from '{{connectorsPackageName}}' // [!code hl]

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [porto()], // [!code hl]
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type PortoParameters } from '{{connectorsPackageName}}'
```

See [`Porto.create` Parameters](https://porto.sh/sdk/api/porto/create#parameters)
