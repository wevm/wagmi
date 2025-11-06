<script setup>
const packageName = '@wagmi/core'
const actionName = 'waitForCallsStatus'
const typeName = 'WaitForCallsStatus'
</script>

# waitForCallsStatus

Waits for a call bundle to be confirmed & included on a block before returning the status & receipts.

 

## Import

```ts
import { waitForCallsStatus } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { sendCalls, waitForCallsStatus } from '@wagmi/core'
import { config } from './config'

const id = await sendCalls(config, {
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }]
})

const { status, receipts } = await waitForCallsStatus(config, { // [!code focus]
  id, // [!code focus]
}) // [!code focus]
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WaitForCallsStatusParameters } from '@wagmi/core'
```

### connector

`Connector | undefined`

Connector to get call statuses with.

::: code-group
```ts [index.ts]
import { getConnections, waitForCallsStatus } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
const status = await waitForCallsStatus(config, {
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
import { waitForCallsStatus } from '@wagmi/core'
import { config } from './config'

const status = await waitForCallsStatus(config, {
  id: '0x1234567890abcdef', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### pollingInterval

`number`

Polling interval in milliseconds.

::: code-group
```ts [index.ts]
import { waitForCallsStatus } from '@wagmi/core'
import { config } from './config'

const status = await waitForCallsStatus(config, {
  id: '0x1234567890abcdef',
  pollingInterval: 1_000, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### timeout

`number`

Timeout in milliseconds before `waitForCallsStatus` stops polling.

::: code-group
```ts [index.ts]
import { waitForCallsStatus } from '@wagmi/core'
import { config } from './config'

const status = await waitForCallsStatus(config, {
  id: '0x1234567890abcdef',
  timeout: 10_000, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WaitForCallsStatusReturnType } from '@wagmi/core'
```

`{ status: 'PENDING' | 'CONFIRMED', receipts: TransactionReceipt[] }`

The status and receipts of the call batch.

## Error

```ts
import { type WaitForCallsStatusErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`waitForCallsStatus`](https://viem.sh/docs/actions/wallet/waitForCallsStatus)
