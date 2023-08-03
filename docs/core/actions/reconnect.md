<script setup>
const packageName = '@wagmi/core'
const actionName = 'reconnect'
const typeName = 'Reconnect'
</script>

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
- Defaults to [`Config['connectors']`](/core/createConfig#connectors).

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

`Connection[]`

[Connections](/core/createConfig#connection) that were successfully reconnected.

## Error

```ts
import { type ReconnectError } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->
