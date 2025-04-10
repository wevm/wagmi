<!-- <script setup>
const packageName = 'wagmi'
</script> -->

# webSocket

The `webSocket` Transport connects to a JSON-RPC API via a WebSocket. Wraps Viem's [`webSocket` Transport](https://viem.sh/docs/clients/transports/websocket).

## Import

```ts-vue
import { webSocket } from '{{packageName}}'
```

## Usage

```ts-vue
import { 
  createConfig, 
  webSocket // [!code hl]
} from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: webSocket('wss://foo-bar-baz.quiknode.pro/...'), // [!code hl]
    [sepolia.id]: webSocket('wss://foo-bar-sep.quiknode.pro/...'), // [!code hl]
  },
})
```

::: warning
If no URL is provided, then the transport will fall back to a public RPC URL on the chain. It is highly recommended to provide an authenticated RPC URL to prevent rate-limiting.
:::

## Parameters

### url

`string`

URL of the JSON-RPC API.

```ts
const transport = webSocket('wss://foo-bar-baz.quiknode.pro/...')
```

### key (optional)

`string`

A key for the Transport. Defaults to `"webSocket"`.

```ts
const transport = webSocket('wss://foo-bar-baz.quiknode.pro/...', { 
  key: 'alchemy',  // [!code focus]
})
```

### name (optional)

`string`

A name for the Transport. Defaults to `"WebSocket JSON-RPC"`.

```ts
const transport = webSocket('wss://foo-bar-baz.quiknode.pro/...', { 
  name: 'Alchemy WebSocket Provider',  // [!code focus]
})
```

### retryCount (optional)

`number`

The max number of times to retry when a request fails. Defaults to `3`.

```ts
const transport = webSocket('wss://foo-bar-baz.quiknode.pro/...', {
  retryCount: 5, // [!code focus]
})
```

### retryDelay (optional)

`number`

The base delay (in ms) between retries. By default, the Transport will use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) (`~~(1 << count) * retryDelay`), which means the time between retries is not constant.

```ts
const transport = webSocket('wss://foo-bar-baz.quiknode.pro/...', {
  retryDelay: 100, // [!code focus]
})
```

### timeout (optional)

`number`

The timeout for async WebSocket requests. Defaults to `10_000`.

```ts
const transport = webSocket('wss://foo-bar-baz.quiknode.pro/...', {
  timeout: 60_000, // [!code focus]
})
```
