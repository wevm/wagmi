# getConnectors

Action for getting configured connectors.

## Import

```ts
import { getConnectors } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getConnectors } from '@wagmi/core'
import { config } from './config'

const connectors = getConnectors(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetConnectorsReturnType } from '@wagmi/core'
```

`readonly Connector[]`

Connectors from [`config.connectors`](/core/api/createConfig#connectors-1).
