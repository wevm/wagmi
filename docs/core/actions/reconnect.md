# reconnect

Action for reconnecting [connectors](/core/connectors).

## Import

```ts
import { reconnect } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { reconnect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await reconnect(
  config,
  { connectors: [injected()] },
)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type ReconnectParameters } from '@wagmi/core'
```

### connectors

`(CreateConnectorFn | Connector)[] | undefined`

- [Connectors](/core/connectors) to reconnect to.
- Defaults to [config](/core/createConfig) connectors.

::: code-group
```ts [index.ts]
import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await reconnect(
  config,
  {
    connectors: [injected()], // [!code focus]
  },
)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type ReconnectReturnType } from '@wagmi/core'
```

[Connections](/TODO) that were successfully reconnected.

## Error

```ts
import { type ConnectError } from '@wagmi/core'
```

## TanStack Query

```ts
import {
  type ConnectMutationData,
  type ConnectMutationVariables,
  type ConnectMutationParameters,
  connectMutationOptions,
} from '@wagmi/core'
```