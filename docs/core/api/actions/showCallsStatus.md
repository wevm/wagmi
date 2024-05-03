<script setup>
const packageName = '@wagmi/core/experimental'
const actionName = 'showCallsStatus'
const typeName = 'ShowCallsStatus'
</script>

# showCallsStatus

Action to request for the wallet to show information about a call batch that was sent via `showCalls`.

[Read more.](https://github.com/ethereum/EIPs/blob/1663ea2e7a683285f977eda51c32cec86553f585/EIPS/eip-5792.md#wallet_showcallsstatus)

::: warning
This is an experimental action that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { showCallsStatus } from '@wagmi/core/experimental'
```

## Usage

::: code-group
```ts [index.ts]
import { showCallsStatus } from '@wagmi/core/experimental'
import { config } from './config'

await showCallsStatus(config, {
  id: '0x1234567890abcdef',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type ShowCallsStatusParameters } from '@wagmi/core/experimental'
```

### connector

`Connector | undefined`

Connector to show call statuses with.

::: code-group
```ts [index.ts]
import { getConnections, showCallsStatus } from '@wagmi/core/experimental'
import { config } from './config'

const connections = getConnections(config)
await showCallsStatus(config, {
  connector: connections[0]?.connector, // [!code focus]
  id: '0x1234567890abcdef',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### id

`string`

Identifier of the call batch.

::: code-group
```ts [index.ts]
import { showCallsStatus } from '@wagmi/core/experimental'
import { config } from './config'

await showCallsStatus(config, {
  id: '0x1234567890abcdef', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type ShowCallsStatusReturnType } from '@wagmi/core/experimental'
```

`bigint`

Most recent block number seen.

## Error

```ts
import { type ShowCallsStatusErrorType } from '@wagmi/core/experimental'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`showCallsStatus`](https://viem.sh/experimental/eip5792/showCallsStatus)
