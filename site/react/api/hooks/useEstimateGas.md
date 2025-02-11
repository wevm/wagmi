---
title: useEstimateGas
description: Hook for estimating the gas necessary to complete a transaction without submitting it to the network.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'estimateGas'
const typeName = 'EstimateGas'
const TData = 'bigint'
const TError = 'EstimateGasErrorType'
</script>

# useEstimateGas

Hook for estimating the gas necessary to complete a transaction without submitting it to the network.

## Import

```ts
import { useEstimateGas } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useEstimateGas } from 'wagmi'

function App() {
  const result = useEstimateGas()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseEstimateGasParameters } from 'wagmi'
```

### accessList

`AccessList | undefined`

The access list.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    accessList: [{ // [!code focus]
      address: '0x1', // [!code focus]
      storageKeys: ['0x1'], // [!code focus]
    }], // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### account

`Address | Account | undefined`

Account to use when estimating gas.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

Chain ID to target when estimating gas.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    chainId: mainnet.id, // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### connector

`Connector | undefined`

Connector to estimate with. If no [`account`](#account) is provided, will use default account from connector.

::: code-group
```ts [index.ts]
import { getConnections, estimateGas } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const connections = getConnections(config)
  const result = useEstimateGas({
    connector: connections[0]?.connector, // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### data

`` `0x${string}` | undefined ``

A contract hashed method call with encoded function data.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### gas

`bigint | undefined`

Gas provided for transaction execution.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    gas: parseGwei('20'), // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

---

### gasPrice

`bigint | undefined`

The price in wei to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms.html#legacy-transaction).

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    gasPrice: parseGwei('20'), // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas in wei, inclusive of [`maxPriorityFeePerGas`](#maxPriorityFeePerGas). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    maxFeePerGas: parseGwei('20'), // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas in wei. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther, parseGwei } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    maxFeePerGas: parseGwei('20'),
    maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

---

### nonce

`number`

Unique number identifying this transaction.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    nonce: 123, // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    scopeKey: 'foo', // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### to

`Address | undefined`

The transaction recipient or contract address.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### type

`'legacy' | 'eip1559' | 'eip2930' | undefined`

Optional transaction request type to narrow parameters.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    type: 'eip1559', // [!code focus]
    value: parseEther('0.01'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### value

`bigint | undefined`

Value in wei sent with this transaction.

::: code-group
```ts [index.ts]
import { useEstimateGas } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = useEstimateGas({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
    value: parseEther('0.01'), // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseEstimateGasReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`estimateGas`](/core/api/actions/estimateGas)
