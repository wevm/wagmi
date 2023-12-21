<!-- <script setup>
const docsPath = 'core'
const packageName = 'wagmi'
</script> -->

# unstable_connector

The `unstable_connector` Transport connects to a JSON-RPC API via the provided <a :href="`/${docsPath}/api/connectors`">Connector</a>. 

For example, if the provided Connector is <a :href="`/${docsPath}/api/connectors/injected`">`injected`</a> and the end-user uses MetaMask, then outgoing JSON-RPC requests will be sent via the MetaMask EIP-1193 Provider (`window.ethereum`).

## Import

```ts-vue
import { unstable_connector } from '{{packageName}}'
```

## Usage

```ts-vue
import { 
  createConfig, 
  fallback,
  unstable_connector, // [!code hl]
} from '{{packageName}}'
import { mainnet } from '{{packageName}}/chains'

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: fallback([
      unstable_connector(injected), // [!code hl]
      http('https://eth-mainnet.g.alchemy.com/v2/...')
    ])
  },
})
```

::: warning
It is **highly recommended** to use the `unstable_connector` Transport inside of a <a :href="`/${docsPath}/api/transports/fallback`">`fallback` Transport</a>. This ensures that if the Connector request fails, the Transport will fall back to a different Transport in the fallback set. 

Some common cases for a Connector request to fail are: 

- Chain ID mismatches,
- Connector RPC not supporting the requested method and/or only supporting a subset of methods for connected accounts,
- Rate-limiting of Connector RPC.
:::

## Parameters

### connector

`Connector`

The Connector to use for the Transport.

```ts
import { unstable_connector } from 'wagmi'
import { safe } from 'wagmi/connectors'

const transport = unstable_connector(safe) // [!code focus]
```

### key (optional)

`string`

A key for the Transport. Defaults to `"connector"`.

```ts
import { unstable_connector } from 'wagmi'
import { injected } from 'wagmi/connectors'

const transport = unstable_connector(injected, { 
  key: 'injected',  // [!code focus]
})
```

### name (optional)

`string`

A name for the Transport. Defaults to `"Connector"`.

```ts
import { unstable_connector } from 'wagmi'
import { injected } from 'wagmi/connectors'

const transport = unstable_connector(injected, { 
  name: 'Injected',  // [!code focus]
})
```

### retryCount (optional)

`number`

The max number of times to retry when a request fails. Defaults to `3`.

```ts
import { unstable_connector } from 'wagmi'
import { injected } from 'wagmi/connectors'

const transport = unstable_connector(injected, {
  retryCount: 5, // [!code focus]
})
```

### retryDelay (optional)

`number`

The base delay (in ms) between retries. By default, the Transport will use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) (`~~(1 << count) * retryDelay`), which means the time between retries is not constant.

```ts
import { unstable_connector } from 'wagmi'
import { injected } from 'wagmi/connectors'

const transport = unstable_connector(injected, {
  retryDelay: 100, // [!code focus]
})
```
