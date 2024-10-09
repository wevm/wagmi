<script setup>
const packageName = '@wagmi/core'
const actionName = 'sendRawTransaction'
const typeName = 'SendRawTransaction'
</script>

# sendRawTransaction

Action for sending a signed transaction to the network.

## Import

```ts
import { sendRawTransaction } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { sendRawTransaction, signTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const serializedTransaction = await signTransaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})

const result = await sendRawTransaction(config, {
  serializedTransaction
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SendRawTransactionParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

Chain ID to validate against before sending transaction.

::: code-group
```ts [index.ts]
import { sendRawTransaction, signTransaction } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { parseEther } from 'viem'
import { config } from './config'

const serializedTransaction = await signTransaction(config, {
  chainId: mainnet.id,
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})

const result = await sendRawTransaction(config, {
  chainId: mainnet.id, // [!code focus]
  serializedTransaction
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

- Connector to send the raw transaction with.
- Defaults to current connector.

::: code-group
```ts [index.ts]
import { getConnections, sendRawTransaction, signTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const connections = getConnections(config)

const serializedTransaction = await signTransaction(config, {
  connector: connections[0]?.connector,
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})

const result = await sendRawTransaction(config, {
  connector: connections[0]?.connector, // [!code focus]
  serializedTransaction
})

```
<<< @/snippets/core/config.ts[config.ts]
:::

### serializedTransaction

`` `0x${string}` ``

The signed serialized transaction.

::: code-group
```ts [index.ts]
import { sendRawTransaction, signTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

const serializedTransaction = await signTransaction(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})

const result = await sendRawTransaction(config, {
  serializedTransaction // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type SendRawTransactionReturnType } from '@wagmi/core'
```

[`Hash`](https://viem.sh/docs/glossary/types.html#hash)

Transaction hash.

## Error

```ts
import { type SendRawTransactionErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction.html)
