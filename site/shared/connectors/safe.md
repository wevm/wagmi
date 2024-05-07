<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# safe

Connector for [Safe Apps SDK](https://github.com/safe-global/safe-apps-sdk).

## Import

```ts-vue
import { safe } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue{3,7}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { safe } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [safe()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type SafeParameters } from '{{connectorsPackageName}}'
```

Check out the [Safe docs](https://github.com/safe-global/safe-apps-sdk/tree/main/packages/safe-apps-sdk) for more info.
### allowedDomains

`RegExp[] | undefined`

```ts-vue
import { safe } from '{{connectorsPackageName}}'

const connector = safe({
  allowedDomains: [/app.safe.global$/], // [!code focus]
})
```

### debug

`boolean | undefined`

```ts-vue
import { safe } from '{{connectorsPackageName}}'

const connector = safe({
  debug: true, // [!code focus]
})
```

### shimDisconnect

`boolean | undefined`

- This flag simulates disconnect behavior by keeping track of connection status in storage.
- Defaults to `false`.

```ts-vue
import { safe } from '{{connectorsPackageName}}'

const connector = safe({
  shimDisconnect: true, // [!code focus]
})
```
