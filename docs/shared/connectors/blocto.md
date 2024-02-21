<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# blocto

Connector for [Blocto SDK](https://github.com/blocto/blocto-sdk).

## Import

```ts-vue
import { blocto } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue{3,7}
import { createConfig, http } from '{{packageName}}'
import { mainnet, polygon } from '{{packageName}}/chains'
import { blocto } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, polygon],
  connectors: [blocto()],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type BloctoParameters } from '{{connectorsPackageName}}'
```
### appId

`string | undefined`

```ts-vue
import { blocto } from '{{connectorsPackageName}}'

const connector = blocto({
  appId: 'REPLACE_WITH_YOUR_DAPP_ID'
})
```
Check out the [Blocto docs](https://docs.blocto.app/blocto-sdk/register-app-id) for more info.

