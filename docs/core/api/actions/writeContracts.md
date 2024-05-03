<script setup>
const packageName = '@wagmi/core/experimental'
const actionName = 'writeContracts'
const typeName = 'WriteContracts'
</script>

# writeContracts

Action that requests for the wallet to sign and broadcast a batch of write contract calls (transactions) to the network.

[Read more.](https://github.com/ethereum/EIPs/blob/815028dc634463e1716fc5ce44c019a6040f0bef/EIPS/eip-5792.md#wallet_sendcalls)

::: warning
This is an experimental action that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { writeContracts } from '@wagmi/core/experimental'
```

## Usage

::: code-group
```ts [index.ts]
import { parseAbi } from 'viem'
import { writeContracts } from '@wagmi/core/experimental'
import { config } from './config'

const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])

const id = await writeContracts(config, {
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'approve',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 
        100n
      ],
    },
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'transferFrom',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        '0x0000000000000000000000000000000000000000',
        100n
      ],
    },
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WriteContractsParameters } from '@wagmi/core/experimental'
```

### account

`Account | Address | undefined`

Account to execute the calls.

::: code-group
```ts [index.ts]
import { parseAbi } from 'viem'
import { writeContracts } from '@wagmi/core/experimental'
import { config } from './config'

const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])

const id = await writeContracts(config, {
  account: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'approve',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 
        100n
      ],
    },
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'transferFrom',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        '0x0000000000000000000000000000000000000000',
        100n
      ],
    },
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### contracts

`{ to: Hex, data?: Hex, value?: bigint }[]`

Calls to execute.

::: code-group
```ts [index.ts]
import { parseAbi } from 'viem'
import { writeContracts } from '@wagmi/core/experimental'
import { config } from './config'

const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])

const id = await writeContracts(config, {
  contracts: [ // [!code focus]
    { // [!code focus]
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
      abi, // [!code focus]
      functionName: 'approve', // [!code focus]
      args: [ // [!code focus]
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
        100n // [!code focus]
      ], // [!code focus]
    }, // [!code focus]
    { // [!code focus]
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
      abi, // [!code focus]
      functionName: 'transferFrom', // [!code focus]
      args: [ // [!code focus]
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
        '0x0000000000000000000000000000000000000000', // [!code focus]
        100n // [!code focus]
      ], // [!code focus]
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
import { parseAbi } from 'viem'
import { writeContracts } from '@wagmi/core/experimental'
import { config } from './config'

const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])

const id = await writeContracts(config, {
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'approve',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 
        100n
      ],
    },
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'transferFrom',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        '0x0000000000000000000000000000000000000000',
        100n
      ],
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
import { parseAbi } from 'viem'
import { writeContracts } from '@wagmi/core/experimental'
import { config } from './config'

const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])

const id = await writeContracts(config, {
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'approve',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 
        100n
      ],
    },
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'transferFrom',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        '0x0000000000000000000000000000000000000000',
        100n
      ],
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
import { parseAbi } from 'viem'
import { getConnections } from '@wagmi/core'
import { writeContracts } from '@wagmi/core/experimental'
import { config } from './config'

const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])

const connections = getConnections(config)
const id = await writeContracts(config, {
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'approve',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 
        100n
      ],
    },
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'transferFrom',
      args: [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        '0x0000000000000000000000000000000000000000',
        100n
      ],
    },
  ],
  connector: connections[0]?.connector, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WriteContractsReturnType } from '@wagmi/core/experimental'
```

`bigint`

Most recent block number seen.

## Error

```ts
import { type WriteContractsErrorType } from '@wagmi/core/experimental'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`writeContracts`](https://viem.sh/experimental/eip5792/writeContracts)
