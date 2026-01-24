<!--
<script setup>
const docsPath = 'react'
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script>
-->

# createConfig

Creates new [`Config`](#config) object.

## Import

```ts-vue
import { createConfig } from '{{packageName}}'
```

## Usage

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

::: tip Integrating a Viem Client

Instead of using [`transports`](#transports), it's possible to provide a function that returns a Viem [`Client`](https://viem.sh/docs/clients/custom) via the [`client`](#client) property for more fine-grained control over Wagmi's internal `Client` creation.

```ts-vue {3,7-9}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { createClient } from 'viem'

const config = createConfig({
  chains: [mainnet, sepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
```
:::

## Parameters

```ts-vue
import { type CreateConfigParameters } from '{{packageName}}'
```

### chains

`readonly [Chain, ...Chain[]]`

- Chains used by the `Config`.
- See <a :href="`/${docsPath}/api/chains`">Chains</a> for more details about built-in chains and the `Chain` type.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia], // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

### connectors

`CreateConnectorFn[] | undefined`

<a :href="`/${docsPath}/api/connectors`">Connectors</a> used by the `Config`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { injected } from '{{connectorsPackageName}}' // [!code focus]

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()], // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

### multiInjectedProviderDiscovery

`boolean | undefined`

- Enables discovery of injected providers via [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) using the [`mipd`](https://github.com/wevm/mipd) library and converting to <a :href="`/${docsPath}/api/connectors/injected`">injected</a> connectors.
- Defaults to `true`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  multiInjectedProviderDiscovery: false, // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

### ssr

`boolean | undefined`

Flag to indicate if the config is being used in a server-side rendering environment. Defaults to `false`.

```ts-vue
import { createConfig, http } from '{{packageName}}' // [!code focus]
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true, // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

### storage

`Storage | null | undefined`

- <a :href="`/${docsPath}/api/createStorage#storage`">`Storage`</a> used by the config. Persists `Config`'s [`State`](#state-1) between sessions.
- Defaults to `createStorage({ storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : noopStorage })`.

```ts-vue
import { createConfig, createStorage, http } from '{{packageName}}' // [!code focus]
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  storage: createStorage({ storage: window.localStorage }), // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

### syncConnectedChain

`boolean | undefined`

- Keep the [`State['chainId']`](#chainid) in sync with the current connection.
- Defaults to `true`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  syncConnectedChain: false, // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

---

### batch

`{ multicall?: boolean | { batchSize?: number | undefined; wait?: number | undefined } | undefined } | { [_ in chains[number]["id"]]?: { multicall?: boolean | { batchSize?: number | undefined; wait?: number | undefined } | undefined } | undefined } | undefined`

- Batch settings. See [Viem docs](https://viem.sh/docs/clients/custom#batch-optional) for more info.
- Defaults to `{ multicall: true }`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  batch: { multicall: true }, // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

### cacheTime

`number | { [_ in chains[number]['id']]?: number | undefined } | undefined`

- Frequency in milliseconds for polling enabled features. See [Viem docs](https://viem.sh/docs/clients/public#cachetime-optional) for more info.
- Defaults to [`pollingInterval`](#pollinginterval) or `4_000`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  cacheTime: 4_000, // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

### pollingInterval

`number | { [_ in chains[number]['id']]?: number | undefined } | undefined`

- Frequency in milliseconds for polling enabled features. See [Viem docs](https://viem.sh/docs/clients/custom#pollinginterval-optional) for more info.
- Defaults to `4_000`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  pollingInterval: 4_000, // [!code focus]
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

### transports

`Record<chains[number]['id'], Transport>`

Mapping of [chain IDs](#chains) to <a :href="`/${docsPath}/api/transports`">`Transport`</a>s. This mapping is used internally when creating chain-aware Viem [`Client`](https://viem.sh/docs/clients/custom) objects. See the <a :href="`/${docsPath}/api/transports`">Transport docs</a> for more info.

```ts-vue
import { createConfig, fallback, http } from '{{packageName}}' // [!code focus]
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: { // [!code focus]
    [mainnet.id]: fallback([ // [!code focus]
      http('https://...'), // [!code focus]
      http('https://...'), // [!code focus]
    ]), // [!code focus]
    [sepolia.id]: http('https://...'), // [!code focus]
  }, // [!code focus]
})
```

---

### client

`(parameters: { chain: chains[number] }) => Client<Transport, chains[number]>`

Function for creating new Viem [`Client`](https://viem.sh/docs/clients/custom) to be used internally. Exposes more control over the internal `Client` creation logic versus using the [`transports`](#transports) property.

```ts-vue
import { createClient, http } from 'viem' // [!code focus]
import { createConfig } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  client({ chain }) { // [!code focus]
    return createClient({ chain, transport: http('https://...') }) // [!code focus]
  }, // [!code focus]
})
```

::: warning
When using this option, you likely want to pass `parameters.chain` straight through to [`createClient`](https://viem.sh/docs/clients/custom#createclient) to ensure the Viem `Client` is in sync with any active connections.
:::

## Return Type

```ts-vue
import { type Config } from '{{packageName}}'
```

## Config

Object responsible for managing Wagmi state and internals.

```ts-vue
import { type Config } from '{{packageName}}'
```

### chains

`readonly [Chain, ...Chain[]]`

[`chains`](#chains) passed to `createConfig`.

### connectors

`readonly Connector[]`

Connectors set up from passing [`connectors`](#connectors) and [`multiInjectedProviderDiscovery`](#multiinjectedproviderdiscovery) to `createConfig`.

### state

`State<chains>`

The `Config` object's internal state. See [`State`](#state-1) for more info.

### storage

`Storage | null`

[`storage`](#storage) passed to `createConfig`.

### getClient

`(parameters?: { chainId?: chainId | chains[number]['id'] | undefined }): Client<transports[chainId], Extract<chains[number], { id: chainId }>>`

Creates new Viem [`Client`](https://viem.sh/docs/clients/custom) object.

::: code-group
```ts-vue [index.ts]
import { config } from './config'

const client = config.getClient({ chainId: 1 })
```

```ts-vue [config.ts]
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

:::

### setState

`(value: State<chains> | ((state: State<chains>) => State<chains>)) => void`

Updates the `Config` object's internal state. See [`State`](#state-1) for more info.

::: code-group
```ts-vue [index.ts]
import { mainnet } from '{{packageName}}/chains'
import { config } from './config'

config.setState((x) => ({
  ...x,
  chainId: x.current ? x.chainId : mainnet.id,
}))
```

```ts-vue [config.ts]
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

:::

::: warning
Exercise caution when using this method. It is intended for internal and advanced use-cases only. Manually setting state can cause unexpected behavior.
:::

### subscribe

`(selector: (state: State<chains>) => state, listener: (selectedState: state, previousSelectedState: state) => void, options?: { emitImmediately?: boolean | undefined; equalityFn?: ((a: state, b: state) => boolean) | undefined } | undefined) => (() => void)`

Listens for state changes matching the `selector` function. Returns a function that can be called to unsubscribe the listener.

::: code-group
```ts-vue [index.ts]
import { config } from './config'

const unsubscribe = config.subscribe(
  (state) => state.chainId,
  (chainId) => console.log(`Chain ID changed to ${chainId}`),
)
unsubscribe()
```

```ts-vue [config.ts]
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

:::

## State

```ts-vue
import { type State } from '{{packageName}}'
```

### chainId

`chains[number]['id']`

Current chain ID. When `syncConnectedChain` is `true`, `chainId` is kept in sync with the current connection. Defaults to first chain in [`chains`](#chains).

### connections

`Map<string, Connection>`

Mapping of unique connector identifier to [`Connection`](#connection) object.

### current

`string | undefined`

Unique identifier of the current connection.

### status

`'connected' | 'connecting' | 'disconnected' | 'reconnecting'`

Current connection status.

- `'connecting'` attempting to establish connection.
- `'reconnecting'` attempting to re-establish connection to one or more connectors.
- `'connected'` at least one connector is connected.
- `'disconnected'` no connection to any connector.

## Connection

```ts-vue
import { type Connection } from '{{packageName}}'
```

### accounts

`readonly [Address, ...Address[]]`

Array of addresses associated with the connection.

### chainId

`number`

Chain ID associated with the connection.

### connector

`Connector`

Connector associated with the connection.
