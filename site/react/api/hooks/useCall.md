---
title: useCall
description: Hook for executing a new message call immediately without submitting a transaction to the network.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'call'
const typeName = 'Call'
const TData = 'CallData'
const TError = 'CallErrorType'
</script>

# useCall

Hook for executing a new message call immediately without submitting a transaction to the network.

## Import

```ts
import { useCall } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseCallParameters } from 'wagmi'
```

### account

`Account | Address | undefined`

The Account to call from.

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### data

`0x${string} | undefined`

A contract hashed method call with encoded args.

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### to

`Address | undefined`

The contract address or recipient.

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
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
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    accessList: [ // [!code focus:6] 
      {
        address: '0x1',
        storageKeys: ['0x1'],
      },
    ],
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### gas

`bigint | undefined`

The gas provided for transaction execution.

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    gas: 1_000_000n, // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### gasPrice

`bigint | undefined`

The price (in wei) to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms.html#legacy-transaction).

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    gasPrice: parseGwei('20'), // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas (in wei), inclusive of `maxPriorityFeePerGas`. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    maxFeePerGas: parseGwei('20'), // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas (in wei). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    maxFeePerGas: parseGwei('20'),
    maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
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
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    nonce: 420, // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### value

`bigint | undefined`

Value (in wei) sent with this transaction.

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'), // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`number | undefined`

The block number to perform the call against.

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    blockNumber: 15121123n, // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

The block tag to perform the call against.

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'

function App() {
  const result = useCall({
    blockTag: 'safe', // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The block tag to perform the call against.

::: code-group
```tsx [index.tsx]
import { useCall } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'

function App() {
  const result = useCall({
    chainId: mainnet.id, // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
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
import { useCall } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useCall({
    config, // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
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
import { useCall } from 'wagmi'
import { config } from './config'

function App() {
  const result = useCall({
    scopeKey: 'foo' // [!code focus]
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseCallReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`call`](/core/api/actions/call)
