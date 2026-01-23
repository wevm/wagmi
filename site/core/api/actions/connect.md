<script setup>
const packageName = '@wagmi/core'
const actionName = 'connect'
const typeName = 'Connect'
</script>

# connect

Action for connecting accounts with [connectors](/core/api/connectors).

## Import

```ts
import { connect } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await connect(config, { connector: injected() })
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type ConnectParameters } from '@wagmi/core'
```

### chainId

`number | undefined`

Chain ID to connect to.

Not all connectors support connecting directly to a `chainId` (e.g. they don't support programmatic chain switching). In those cases, the connector will connect to whatever chain the connector's provider is connected to.

::: code-group
```ts [index.ts]
import { connect } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await connect(config, {
  chainId: mainnet.id, // [!code focus]
  connector: injected(),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`CreateConnectorFn | Connector`

[Connector](/core/api/connectors) to connect with.

::: code-group
```ts [index.ts]
import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors' // [!code focus]
import { config } from './config'

const result = await connect(config, {
  connector: injected(), // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### withCapabilities

`boolean | undefined`

- Exposes [capabilities](https://eips.ethereum.org/EIPS/eip-7846#capabilities) on return type.
- Defaults to `false`.

::: code-group
```ts [index.ts]
import { connect } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await connect(config, {
  connector: injected(),
  withCapabilities: true, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type ConnectReturnType } from '@wagmi/core'
```

::: tip
When [`withCapabilities: false | undefined`](#withcapabilities):
```ts
type ConnectReturnType = {
  accounts: readonly Address[]
  // ...
}
```
When [`withCapabilities: true`](#withcapabilities):
```ts
type ConnectReturnType = {
  accounts: readonly { address: Address; capabilities: Record<string, unknown> }[]
  // ...
}
```
:::

### accounts

`readonly [Address, ...Address[]]`

Connected accounts from connector.

### chainId

`number`

Connected chain ID from connector.

## Error

```ts
import { type ConnectErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->
