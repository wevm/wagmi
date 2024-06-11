<script setup>
const packageName = '@wagmi/core/experimental'
const actionName = 'getCallsStatus'
const typeName = 'GetCallsStatus'
</script>

# getCallsStatus

Action to fetch the status and receipts of a call batch that was sent via [`sendCalls`](/core/api/actions/sendCalls).

[Read more.](https://github.com/ethereum/EIPs/blob/1663ea2e7a683285f977eda51c32cec86553f585/EIPS/eip-5792.md#wallet_getcallsstatus)

::: warning
This is an experimental action that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { getCallsStatus } from '@wagmi/core/experimental'
```

## Usage

::: code-group
```ts [index.ts]
import { getCallsStatus } from '@wagmi/core/experimental'
import { config } from './config'

const status = await getCallsStatus(config, {
  id: '0x1234567890abcdef',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetCallsStatusParameters } from '@wagmi/core/experimental'
```

### connector

`Connector | undefined`

Connector to get call statuses with.

::: code-group
```ts [index.ts]
import { getConnections, getCallsStatus } from '@wagmi/core/experimental'
import { config } from './config'

const connections = getConnections(config)
const status = await getCallsStatus(config, {
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
import { getCallsStatus } from '@wagmi/core/experimental'
import { config } from './config'

const status = await getCallsStatus(config, {
  id: '0x1234567890abcdef', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetCallsStatusReturnType } from '@wagmi/core/experimental'
```

`bigint`

Most recent block number seen.

## Error

```ts
import { type GetCallsStatusErrorType } from '@wagmi/core/experimental'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getCallsStatus`](https://viem.sh/experimental/eip5792/getCallsStatus)
