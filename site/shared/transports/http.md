<!-- <script setup>
const packageName = 'wagmi'
</script> -->

# http

The `http` Transport connects to a JSON-RPC API via HTTP. Wraps Viem's [`http` Transport](https://viem.sh/docs/clients/transports/http.html).

## Import

```ts-vue
import { http } from '{{packageName}}'
```

## Usage

```ts-vue
import { 
  createConfig, 
  http // [!code hl]
} from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/...'), // [!code hl]
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'), // [!code hl]
  },
})
```

::: warning
If no URL is provided, then the transport will fall back to a public RPC URL on the chain. It is highly recommended to provide an authenticated RPC URL to prevent rate-limiting.
:::

### Batch JSON-RPC

The `http` Transport supports Batch JSON-RPC. This means that multiple JSON-RPC requests can be sent in a single HTTP request.

The Transport will batch up Actions over a given period and execute them in a single Batch JSON-RPC HTTP request. By default, this period is a [zero delay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#zero_delays) meaning that the batch request will be executed at the end of the current [JavaScript message queue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#queue). Consumers can specify a custom time period `wait` (in ms).

You can enable Batch JSON-RPC by setting the `batch` flag to `true`:

```ts 
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  batch: true // [!code hl]
})
```

## Parameters

### url

`string`

URL of the JSON-RPC API. Defaults to `chain.rpcUrls.default.http[0]`.

```ts
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...')
```

### batch

`boolean | BatchOptions`

Toggle to enable Batch JSON-RPC. Defaults to `false`

```ts 
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  batch: true // [!code focus]
})
```

### batch.batchSize

`number`

The maximum number of JSON-RPC requests to send in a batch. Defaults to `1_000`.

```ts 
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  batch: {
    batchSize: 2_000 // [!code focus]
  }
})
```

### batch.wait

`number`

The maximum number of milliseconds to wait before sending a batch. Defaults to `0` ([zero delay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#zero_delays)).

```ts 
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  batch: {
    wait: 16 // [!code focus]
  }
})
```

### fetchOptions

[`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

[Fetch options](https://developer.mozilla.org/en-US/docs/Web/API/fetch) to pass to the internal `fetch` function. Useful for passing auth headers or cache options.

```ts
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  fetchOptions: { // [!code focus:5]
    headers: {
      'Authorization': 'Bearer ...'
    }
  }
})
```

### key

`string`

A key for the Transport. Defaults to `"http"`.

```ts
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  key: 'alchemy', // [!code focus]
})
```

### name

`string`

A name for the Transport. Defaults to `"HTTP JSON-RPC"`.

```ts
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  name: 'Alchemy HTTP Provider', // [!code focus]
})
```

### retryCount

`number`

The max number of times to retry when a request fails. Defaults to `3`.

```ts
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  retryCount: 5, // [!code focus]
})
```

### retryDelay

`number`

The base delay (in ms) between retries. By default, the Transport will use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) (`~~(1 << count) * retryDelay`), which means the time between retries is not constant.

```ts
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  retryDelay: 100, // [!code focus]
})
```

### timeout

`number`

The timeout for requests. Defaults to `10_000`.

```ts
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  timeout: 60_000, // [!code focus]
})
```