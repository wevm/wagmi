<script setup>
const packageName = '@wagmi/core'
const actionName = 'switchConnection'
const typeName = 'SwitchConnection'
</script>

# switchConnection

Action for switching the current account.

## Import

```ts
import { switchConnection } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getConnections, switchConnection } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
const result = await switchConnection(config, {
  connector: connections[0]?.connector,
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SwitchConnectionParameters } from '@wagmi/core'
```

### connector

`Connector`

[Connector](/core/api/connectors) to switch to.

::: code-group
```ts [index.ts]
import { getConnections, switchConnection } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
const result = await switchConnection(config, {
  connector: connections[0]?.connector, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type SwitchConnectionReturnType } from '@wagmi/core'
```

### accounts

`readonly [Address, ...Address[]]`
  
Connected accounts from connector.

### chainId

`number`

Connected chain ID from connector.

## Error

```ts
import { type SwitchConnectionErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->
