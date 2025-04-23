<script setup>
const packageName = '@wagmi/core'
const actionName = 'sendCalls'
const typeName = 'SendCalls'
</script>

# sendCalls

Action that requests for the wallet to sign and broadcast a batch of calls (transactions) to the network. 

[Read more.](https://github.com/ethereum/EIPs/blob/815028dc634463e1716fc5ce44c019a6040f0bef/EIPS/eip-5792.md#wallet_sendcalls)

 

## Import

```ts
import { sendCalls } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { sendCalls } from '@wagmi/core'
import { config } from './config'

const id = await sendCalls(config, {
  calls: [
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: parseEther('1')
    },
    {
      data: '0xdeadbeef',
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    },
  ]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SendCallsParameters } from '@wagmi/core'
```

### account

`Account | Address | null | undefined`

Account to execute the calls. 

If set to `null`, it is assumed that the wallet will handle filling the sender of the calls.

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { sendCalls } from '@wagmi/core'
import { config } from './config'

const id = await sendCalls(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  calls: [
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: parseEther('1')
    },
    {
      data: '0xdeadbeef',
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    },
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### calls

`{ to: Hex, data?: Hex, value?: bigint }[]`

Calls to execute.

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { sendCalls } from '@wagmi/core'
import { config } from './config'

const id = await sendCalls(config, {
  calls: [ // [!code focus]
    { // [!code focus]
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
      value: parseEther('1') // [!code focus]
    }, // [!code focus]
    { // [!code focus]
      data: '0xdeadbeef', // [!code focus]
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### capabilities

`WalletCapabilities | undefined`

Capability metadata for the calls (e.g. specifying a paymaster).

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { sendCalls } from '@wagmi/core'
import { config } from './config'

const id = await sendCalls(config, {
  calls: [
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: parseEther('1')
    },
    {
      data: '0xdeadbeef',
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    },
  ],
  capabilities: { // [!code focus]
    paymasterService: { // [!code focus]
      url: 'https://...' // [!code focus]
    } // [!code focus]
  } // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`number | undefined`

The target chain ID to broadcast the calls.

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { sendCalls } from '@wagmi/core'
import { config } from './config'

const id = await sendCalls(config, {
  calls: [
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: parseEther('1')
    },
    {
      data: '0xdeadbeef',
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    },
  ],
  chainId: 10, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

Connector to get send the calls with.

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { getConnections } from '@wagmi/core'
import { sendCalls } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
const id = await sendCalls(config, {
  calls: [
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: parseEther('1')
    },
    {
      data: '0xdeadbeef',
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    },
  ],
  connector: connections[0]?.connector, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type SendCallsReturnType } from '@wagmi/core'
```

`bigint`

Most recent block number seen.

## Error

```ts
import { type SendCallsErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`sendCalls`](https://viem.sh/experimental/eip5792/sendCalls)
