<script setup>
const packageName = '@wagmi/core'
const actionName = 'sendEip712Transaction'
const typeName = 'SendEip712Transaction'
</script>

# sendEip712Transaction

Action for creating, signing, and sending transactions to ZKsync networks.

## Import

```ts
import { sendEip712Transaction } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

## Parameters

```ts
import { type SendEip712TransactionParameters } from '@wagmi/core'
```

### account

`Address | Account | undefined`

Account to use when sending transaction. Throws if account is not found on [`connector`](#connector).

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

Chain ID to validate against before sending transaction.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { zksync } from '@wagmi/core/chains'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  chainId: zksync.id, // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### connector

`Connector | undefined`

- Connector to send transaction with.
- Defaults to current connector.

::: code-group
```ts [index.ts]
import { getConnections, sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const connections = getConnections(config)
const result = await sendEip712Transaction(config, {
  connector: connections[0]?.connector, // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### data

`` `0x${string}` | undefined ``

A contract hashed method call with encoded args.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### factoryDeps

`[0x${string}]`

Contains bytecode of the deployed contract.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
  factoryDeps: ['0xcde...'], // [!code focus]  
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### gas

`bigint | undefined | null`

Gas provided for transaction execution.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  gas: parseGwei('20'), // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

---

### gasPrice

`bigint | undefined`

The price in wei to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms.html#legacy-transaction).

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### gasPerPubdata

`bigint`

The amount of gas for publishing one byte of data on Ethereum.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  gasPerPubdata: 50_000n, // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas in wei, inclusive of [`maxPriorityFeePerGas`](#maxPriorityFeePerGas). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  maxFeePerGas: parseGwei('20'), // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas in wei. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

---

### nonce

`number`

Unique number identifying this transaction.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  nonce: 123, // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### to

`Address`

The transaction recipient or contract address.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### type

`'legacy' | 'eip1559' | 'eip2930' | 'eip712' | undefined`

Optional transaction request type to narrow parameters.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  type: 'eip1559', // [!code focus]
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### value

`bigint | undefined`

Value in wei sent with this transaction.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
  value: parseEther('0.01'), // [!code focus]
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### paymaster

`Account | Address`

Address of the paymaster account that will pay the fees. The `paymasterInput` field is required with this one.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
  value: parseEther('0.01'),
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]  
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

### paymasterInput

`0x${string}`

Input data to the paymaster. The `paymaster` field is required with this one.

::: code-group
```ts [index.ts]
import { sendEip712Transaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendEip712Transaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
  value: parseEther('0.01'),
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]  
})
```
<<< @/snippets/core/config-zksync.ts[config.ts]
:::

## Return Type

```ts
import { type SendEip712TransactionReturnType } from '@wagmi/core'
```

[`Hash`](https://viem.sh/docs/glossary/types.html#hash)

Transaction hash.

## Error

```ts
import { type SendEip712TransactionErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`sendTransaction`](https://viem.sh/zksync/actions/sendTransaction.html)
