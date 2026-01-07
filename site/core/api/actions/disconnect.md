<script setup>
const packageName = '@wagmi/core'
const actionName = 'disconnect'
const typeName = 'Disconnect'
</script>

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

await disconnect(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type DisconnectParameters } from '@wagmi/core'
```

### connector

`Connector | undefined`

[Connector](/core/api/connectors) to disconnect with.

::: code-group
```ts [index.ts]
import { disconnect, getConnection } from '@wagmi/core'
import { config } from './config'

const { connector } = getConnection(config)
const result = await disconnect(config, {
  connector, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Error

```ts
import { type DisconnectErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->
