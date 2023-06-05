# disconnect

Action for disconnecting connections.

## Import

```ts
import { disconnect } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { disconnect } from '@wagmi/core'
import { config } from './config'

const result = await disconnect(config)
```
<<< snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type DisconnectParameters } from '@wagmi/core'
```

### connector

`Connector | undefined`

[Connector](/core/connectors) to disconnect with.

::: code-group
```ts [index.ts]
import { disconnect } from '@wagmi/core'
import { config } from './config'

const { connections, current } = config.state.connections
const result = await disconnect(
  config,
  {
    connector: connections.get(current!)?.connector, // [!code focus]
  },
)
```
<<< snippets/core/config.ts[config.ts]
:::

## Return Type

`void`

## Error

```ts
import { type DisconnectError } from '@wagmi/core'
```

## Query

```ts
import {
  type DisconnectMutationData,
  type DisconnectMutationVariables,
  type DisconnectMutationParameters,
  disconnectMutationOptions,
} from '@wagmi/core'
```