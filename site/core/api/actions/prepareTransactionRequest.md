<script setup>
const packageName = '@wagmi/core'
const actionName = 'prepareTransactionRequest'
const typeName = 'prepareTransactionRequest'
</script>

# prepareTransactionRequest

Action for preparing a transaction request for signing by populating a nonce, gas limit, fee values, and a transaction type.

## Import

```ts
import { prepareTransactionRequest } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type PrepareTransactionRequestParameters } from '@wagmi/core'
```

### account

`Account | Address | undefined`

The Account to send the transaction from. 

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### to

`` `0x${string}` | undefined ``

The transaction recipient or contract address.

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',  // [!code focus]
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### accessList

`AccessList | undefined`

The access list.

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  accessList: [ // [!code focus:6]
    {
      address: '0x1',
      storageKeys: ['0x1'],
    },
  ],
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

Chain ID to prepare the transaction request for.

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  chainId: mainnet.id, // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### data

`` `0x${string}` | undefined ``

A contract hashed method call with encoded args.

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### gasPrice

`bigint | undefined`

The price (in wei) to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms.html#legacy-transaction).

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas (in wei), inclusive of `maxPriorityFeePerGas`. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  maxFeePerGas: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas (in wei). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### nonce

`number | undefined`

Unique number identifying this transaction.

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
  nonce: 5, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### parameters

`("fees" | "gas" | "nonce" | "type")[] | undefined`

Parameters to prepare.

For instance, if `["gas", "nonce"]` is provided, then only the `gas` and `nonce` parameters will be prepared.

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  parameters: ['gas', 'nonce'], // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### value

`bigint | undefined`

The transaction recipient or contract address.

::: code-group
```ts [index.ts]
import { prepareTransactionRequest } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await prepareTransactionRequest(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'), // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type PrepareTransactionRequestReturnType } from '@wagmi/core'
```

[`TransactionRequest`](https://viem.sh/docs/glossary/types.html#transactionrequest)

The transaction request.

## Error

```ts
import { type PrepareTransactionRequestErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest.html)
