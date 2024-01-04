# getConnections

Action for getting active connections.

## Import

```ts
import { getConnections } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getConnections } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetConnectionsReturnType } from '@wagmi/core'
```

[`Connection[]`](/core/api/createConfig#connection)

Active connections.
