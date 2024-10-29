<!-- <script setup>
const packageName = 'wagmi'
</script> -->

# custom

The `custom` Transport connects to a JSON-RPC API via custom. Wraps Viem's [`custom` Transport](https://viem.sh/docs/clients/transports/custom.html).

## Import

```ts-vue
import { custom } from '{{packageName}}'
```

## Usage

:::code-group
```ts-vue [config.ts]
import { 
  createConfig, 
  custom // [!code hl]
} from '{{packageName}}'
import { mainnet } from '{{packageName}}/chains'
import { customRpc } from './rpc'

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: custom({ // [!code hl]
      async request({ method, params }) { // [!code hl]
        const response = await customRpc.request(method, params) // [!code hl]
        return response // [!code hl]
      } // [!code hl]
    }) // [!code hl]
  },
})
```
:::
### Example: Conditional RPCs
:::code-group
```ts-vue [customRpc.ts]
import { http, custom } from "viem";
const rpc1 = http(`https://rpc1.url`)({});
const rpc2 = http(`https://rpc2.url`)({});

export const combinedTransport = custom({
	request: (request) => {
		return request.method === "eth_sendRawTransaction"
			? rpc1(request)
			: rpc2(request);
	},
});
```
```ts-vue [config.ts]
import { createConfig } from "@wagmi/core";
import { mainnet } from "@wagmi/core/chains";
import { combinedTransport } from "./customRpc.ts";
import { injected } from "@wagmi/connectors";

export const config = createConfig({
	chains: [mainnet],
	connectors: [injected()],
	transports: {
		[mainnet.id]: combinedTransport,
	},
});
```
:::

## Parameters

### provider

`{ request({ method: string, params: unknown[] }): Promise<unknown> }`

An [EIP-1193 `request` function](https://eips.ethereum.org/EIPS/eip-1193#request) function.

```ts
import { customRpc } from './rpc'

const transport = custom({
  async request({ method, params }) { // [!code focus:3]
    const response = await customRpc.request(method, params)
    return response
  }
})
```

### key (optional)

`string`

A key for the Transport. Defaults to `"custom"`.

```ts
const transport = custom(
  provider,
  { 
    key: 'windowProvider', // [!code focus]
  }
)
```

### name (optional)

`string`

A name for the Transport. Defaults to `"Ethereum Provider"`.

```ts
const transport = custom(
  provider,
  { 
    name: 'Window Ethereum Provider', // [!code focus]
  }
)
```

### retryCount (optional)

`number`

The max number of times to retry when a request fails. Defaults to `3`.

```ts
const transport = custom(provider, {
  retryCount: 5, // [!code focus]
})
```

### retryDelay (optional)

`number`

The base delay (in ms) between retries. By default, the Transport will use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) (`~~(1 << count) * retryDelay`), which means the time between retries is not constant.

```ts
const transport = custom(provider, {
  retryDelay: 100, // [!code focus]
})
```