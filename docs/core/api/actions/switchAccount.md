<script setup>
const packageName = '@wagmi/core'
const actionName = 'switchAccount'
const typeName = 'SwitchAccount'
</script>

# switchAccount

Action for switching the current account.

## Import

```ts
import { switchAccount } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getConnections, switchAccount } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
const result = await switchAccount(config, {
  connector: connections[0]?.connector,
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SwitchAccountParameters } from '@wagmi/core'
```

### connector

`Connector`

[Connector](/core/api/connectors) to switch to.

::: code-group
```ts [index.ts]
import { getConnections, switchAccount } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
const result = await switchAccount(config, {
  connector: connections[0]?.connector, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type SwitchAccountReturnType } from '@wagmi/core'
```

### accounts

`readonly [Address, ...Address[]]`
  
Connected accounts from connector.

### chainId

`number`

Connected chain ID from connector.

## Error

```ts
import { type SwitchAccountErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->
