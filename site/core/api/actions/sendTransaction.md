<script setup>
const packageName = '@wagmi/core'
const actionName = 'sendTransaction'
const typeName = 'SendTransaction'
</script>

# sendTransaction

Action for creating, signing, and sending transactions to networks.

## Import

```ts
import { sendTransaction } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SendTransactionParameters } from '@wagmi/core'
```

### accessList

`AccessList | undefined`

The access list.

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  accessList: [{ // [!code focus]
    address: '0x1', // [!code focus]
    storageKeys: ['0x1'], // [!code focus]
  }], // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### account

`Address | Account | undefined`

Account to use when sending transaction. Throws if account is not found on [`connector`](#connector).

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

Chain ID to validate against before sending transaction.

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  chainId: mainnet.id, // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

- Connector to send transaction with.
- Defaults to current connector.

::: code-group
```ts [index.ts]
import { getConnections, sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const connections = getConnections(config)
const result = await sendTransaction(config, {
  connector: connections[0]?.connector, // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### data

`` `0x${string}` | undefined ``

A contract hashed method call with encoded args.

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### gas

`bigint | undefined | null`

Gas provided for transaction execution.

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  gas: parseGwei('20'), // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

---

### gasPrice

`bigint | undefined`

The price in wei to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms#legacy-transaction).

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas in wei, inclusive of [`maxPriorityFeePerGas`](#maxPriorityFeePerGas). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  maxFeePerGas: parseGwei('20'), // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas in wei. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

---

### nonce

`number`

Unique number identifying this transaction.

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  nonce: 123, // [!code focus]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### to

`Address`

The transaction recipient or contract address.

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### type

`'legacy' | 'eip1559' | 'eip2930' | undefined`

Optional transaction request type to narrow parameters.

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  type: 'eip1559', // [!code focus]
  value: parseEther('0.01'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### value

`bigint | undefined`

Value in wei sent with this transaction.

::: code-group
```ts [index.ts]
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const result = await sendTransaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
  value: parseEther('0.01'), // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type SendTransactionReturnType } from '@wagmi/core'
```

[`Hash`](https://viem.sh/docs/glossary/types#hash)

Transaction hash.

## Error

```ts
import { type SendTransactionErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`sendTransaction`](https://viem.sh/docs/actions/wallet/sendTransaction)
