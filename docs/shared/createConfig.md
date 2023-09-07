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
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```

## Parameters

```ts-vue
import { type CreateConfigParameters } from '{{packageName}}'
```

### chains

`readonly [Chain, ...Chain[]]`

- Chains used by the `Config`.
- See <a :href="`/${docsPath}/chains`">Chains</a> for more details about built-in chains and the `Chain` type.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia], // [!code focus]
  transports: {
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```

### connectors

`CreateConnectorFn[] | undefined`

<a :href="`/${docsPath}/connectors`">Connectors</a> used by the `Config`. These connectors are considered global and are used when attempting to reconnect when [`reconnectOnMount`](#reconnectOnMount) is enabled.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { injected } from '{{connectorsPackageName}}' // [!code focus]

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()], // [!code focus]
  transports: {
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```

### reconnectOnMount

`boolean | undefined`

- Whether or not to reconnect previously connected [`connectors`](#connectors) on mount.
- Defaults to `true`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  reconnectOnMount: false, // [!code focus]
  transports: {
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```

### storage

`Storage | null | undefined`

- <a :href="`/${docsPath}/createStorage#storage`">`Storage`</a> used by the config. Persists `Config`'s [`State`](#state-1) between sessions.
- Defaults to `createStorage({ storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : noopStorage })`.

```ts-vue
import { createConfig, createStorage, http } from '{{packageName}}' // [!code focus]
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  storage: createStorage({ storage: window.localStorage }), // [!code focus]
  transports: {
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
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
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```

---

### batch

`{ multicall?: boolean | { batchSize?: number | undefined; wait?: number | undefined } | undefined } | { [_ in chains[number]["id"]]?: { multicall?: boolean | { batchSize?: number | undefined; wait?: number | undefined } | undefined } | undefined } | undefined`

- Batch settings. See [Viem docs](https://viem.sh/docs/clients/custom.html#batch-optional) for more info.
- Defaults to `{ multicall: true }`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  batch: { multicall: true }, // [!code focus]
  transports: {
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```

### cacheTime

`number | { [_ in chains[number]['id']]?: number | undefined } | undefined`

- Frequency in milliseconds for polling enabled features. See [Viem docs](https://viem.sh/docs/clients/public.html#cachetime-optional) for more info.
- Defaults to [`pollingInterval`](#pollinginterval) or `4_000`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  cacheTime: 4_000, // [!code focus]
  transports: {
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```

### pollingInterval

`number | { [_ in chains[number]['id']]?: number | undefined } | undefined`

- Frequency in milliseconds for polling enabled features. See [Viem docs](https://viem.sh/docs/clients/custom.html#pollinginterval-optional) for more info.
- Defaults to `4_000`.

```ts-vue
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  pollingInterval: 4_000, // [!code focus]
  transports: {
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```

### transports

`Record<chains[number]['id'], Transport>`

Mapping of [chain IDs](#chains) to Viem [`Transport`](https://viem.sh/docs/clients/intro.html#transports). This mapping is used internally when creating chain-aware Viem [`Client`](https://viem.sh/docs/clients/custom.html) objects. See the [Viem docs](https://viem.sh/docs/clients/intro.html#transports) for more info on Transports.

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

Function for creating new Viem [`Client`](https://viem.sh/docs/clients/custom.html) to be used internally. Exposes more control over the internal `Client` creation logic versus using the [`transports`](#transports) property.

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
When using this option, you likely want to pass `parameters.chain` straight through to [`createClient`](https://viem.sh/docs/clients/custom.html#createclient) to ensure the Viem `Client` is in sync with any active connections.
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

Connectors set up from passing [`connectors`](#connectors) to `createConfig`.

### state

`State<chains>`

The `Config` object's internal state. See [`State`](#state) for more info.

### storage

`Storage | null`

[`storage`](#storage) passed to `createConfig`.

### getClient

`(parameters?: { chainId?: chainId | chains[number]['id'] | undefined }): Client<transports[chainId], Extract<chains[number], { id: chainId }>>`

Creates new Viem [`Client`](https://viem.sh/docs/clients/custom.html) object.

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
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```
:::

### setState

`(value: State<chains> | ((state: State<chains>) => State<chains>)) => void`

Updates the `Config` object's internal state. See [`State`](#state) for more info.

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
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
  },
})
```
:::

::: warning
Exercise caution when using this method. It is intended for internal and advanced use-cases only. Manually setting state can cause unexpected behavior.
:::

### subscribe

`(selector: (state: State<chains>) => state, listener: (selectedState: state, previousSelectedState: state) => void, options?: { equalityFn?: (a: state, b: state) => boolean; fireImmediately?: boolean })=> (() => void)`

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
    [mainnet.id]: http('https://...'),
    [sepolia.id]: http('https://...'),
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