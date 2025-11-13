---
title: usePrepareTransactionRequest
description: Hook for preparing a transaction request for signing by populating a nonce, gas limit, fee values, and a transaction type.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'prepareTransactionRequest'
const typeName = 'PrepareTransactionRequest'
const TData = 'PrepareTransactionRequestData'
const TError = 'PrepareTransactionRequestErrorType'
</script>

# usePrepareTransactionRequest

Hook for preparing a transaction request for signing by populating a nonce, gas limit, fee values, and a transaction type.

## Import

```ts
import { usePrepareTransactionRequest } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UsePrepareTransactionRequestParameters } from 'wagmi'
```

### account

`Account | Address | undefined`

The Account to send the transaction from. 

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### to

`` `0x${string}` | undefined ``

The transaction recipient or contract address.

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',  // [!code focus]
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### accessList

`AccessList | undefined`

The access list.

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
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
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

Chain ID to prepare the transaction request for.

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    chainId: mainnet.id, // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### data

`` `0x${string}` | undefined ``

A contract hashed method call with encoded args.

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### gasPrice

`bigint | undefined`

The price (in wei) to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms#legacy-transaction).

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther, parseGwei } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    gasPrice: parseGwei('20'), // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas (in wei), inclusive of `maxPriorityFeePerGas`. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms#eip-1559-transaction).

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther, parseGwei } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    maxFeePerGas: parseGwei('20'), // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas (in wei). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms#eip-1559-transaction).

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther, parseGwei } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    maxFeePerGas: parseGwei('20'),
    maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### nonce

`number | undefined`

Unique number identifying this transaction.

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
    nonce: 5, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### parameters

`("fees" | "gas" | "nonce" | "type")[] | undefined`

Parameters to prepare.

For instance, if `["gas", "nonce"]` is provided, then only the `gas` and `nonce` parameters will be prepared.

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    parameters: ['gas', 'nonce'], // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### value

`bigint | undefined`

Value in wei sent with this transaction.

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const result = usePrepareTransactionRequest({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'), // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::


### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config' // [!code focus]

function App() {
  const result = usePrepareTransactionRequest({
    config, // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { usePrepareTransactionRequest } from 'wagmi'
import { parseEther } from 'viem'
import { config } from './config'

function App() {
  const result = usePrepareTransactionRequest({
    scopeKey: 'foo' // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UsePrepareTransactionRequestReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`prepareTransactionRequest`](/core/api/actions/prepareTransactionRequest)
