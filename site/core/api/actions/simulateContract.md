<script setup>
const packageName = '@wagmi/core'
const actionName = 'simulateContract'
const typeName = 'SimulateContract'
</script>

# simulateContract

Action for simulating/validating a contract interaction.

## Import

```ts
import { simulateContract } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SimulateContractParameters } from '@wagmi/core'
```

### abi

`Abi`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi' // [!code focus]
import { config } from './config'

const result = await simulateContract(config, {
  abi, // [!code focus]
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### accessList

`AccessList | undefined`

The access list.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  accessList: [{ // [!code focus]
    address: '0x1', // [!code focus]
    storageKeys: ['0x1'], // [!code focus]
  }], // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### account

`Address | Account | undefined`

Account to use when signing data. Throws if account is not found on [`connector`](#connector).

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### address

`Address`

The contract's address.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::


### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [ // [!code focus]
    '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
    123n, // [!code focus]
  ], // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to simulate against.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  blockNumber: 17829139n, // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to simulate against.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  blockTag: 'safe', // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

Chain ID to validate against before sending transaction.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

[Connector](/core/api/connectors) to simulate transaction with.

::: code-group
```ts [index.ts]
import { getAccount, simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const { connector } = getAccount(config)
const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  connector, // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### dataSuffix

`` `0x${string}` | undefined ``

Data to append to the end of the calldata. Useful for adding a ["domain" tag](https://opensea.notion.site/opensea/Seaport-Order-Attributions-ec2d69bf455041a5baa490941aad307f).

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  dataSuffix: '0xdeadbeef', // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### functionName

`string`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'approve', // [!code focus]
  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 123n]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### gas

`bigint | undefined`

Gas provided for transaction execution.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  gas: parseGwei('20'), // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

---

### gasPrice

`bigint | undefined`

The price in wei to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms#legacy-transaction).

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  gasPrice: parseGwei('20'), // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas in wei, inclusive of [`maxPriorityFeePerGas`](#maxPriorityFeePerGas). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  maxFeePerGas: parseGwei('20'), // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas in wei. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

---

### nonce

`number`

Unique number identifying this transaction.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  nonce: 123, // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### type

`'legacy' | 'eip1559' | 'eip2930' | undefined`

Optional transaction request type to narrow parameters.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  type: 'eip1559', // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### value

`bigint | undefined`

Value in wei sent with this transaction.

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { parseEther } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  value: parseEther('0.01'), // [!code focus]
})
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type SimulateContractReturnType } from '@wagmi/core'
```

The simulation result and write request.

### request

Write request that includes [parameters](#parameters).

### response

`unknown`

- Result of contract simulation.
- Inferred from [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args).

## Type Inference

With [`abi`](#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](#functionname), [`args`](#args), and [`value`](#value). See the Wagmi [TypeScript docs](/core/typescript) for more information.

## Error

```ts
import { type SimulateContractErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`simulateContract`](https://viem.sh/docs/contract/simulateContract)
