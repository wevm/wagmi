<!--
<script setup>
const packageName = 'wagmi'
</script>
-->

# cookieToInitialState

Helper to convert a cookie string into [initial state](/react/api/WagmiProvider#initialstate).

## Import

```ts-vue
import { cookieToInitialState } from '{{packageName}}'
```

## Usage

::: code-group

```ts-vue [server.ts]
import { cookieToInitialState } from '{{packageName}}'
import config from './config'

function handler(req: Request) {
  const initialState = cookieToInitialState(config, req.headers.cookie)
  // ...
}
```

```ts-vue [config.ts]
import { 
  createConfig, 
  http, 
  cookieStorage,
  createStorage
} from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  storage: createStorage({ 
    storage: cookieStorage,
  }), 
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

:::

## Parameters

### config

`Config`

Wagmi Config


### cookie

`string | null | undefined`

The cookie string.

## Return Type

`State`

Initial state.