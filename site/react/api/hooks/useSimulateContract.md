---
title: useSimulateContract
description: Hook for simulating/validating a contract interaction.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'simulateContract'
const typeName = 'SimulateContract'
const TData = 'SimulateContractReturnType'
const TError = 'SimulateContractErrorType'
</script>

# useSimulateContract

Hook for simulating/validating a contract interaction.

## Import

```ts
import { useSimulateContract } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useSimulateContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

<!-- TODO: Usage for combining with useWriteContract -->

## Parameters

```ts
import { type UseSimulateContractParameters } from 'wagmi'
```

### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi' // [!code focus]

function App() {
  const result = useSimulateContract({
    abi, // [!code focus]
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### accessList

`AccessList | undefined`

The access list.

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### account

`Account | undefined`

Account to use when calling the contract (`msg.sender`). Throws if account is not found on [`connector`](#connector).

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### address

`Address | undefined`

The contract's address.

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useSimulateContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useSimulateContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom',
    args: [ // [!code focus]
      '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
      123n, // [!code focus]
    ], // [!code focus]
  })
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to call contract at.

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to call contract at.

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { abi } from './abi'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'
import { config } from './config' // [!code focus]

function App() {
  const result = useSimulateContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
    config, // [!code focus]
  })
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### connector

`Connector | undefined`

[Connector](/react/api/connectors) to simulate transaction with.

::: code-group
```tsx [index.ts]
import { useConnectorClient, useSimulateContract } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const { data: connector } = useConnectorClient()
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### dataSuffix

`` `0x${string}` | undefined ``

Data to append to the end of the calldata. Useful for adding a ["domain" tag](https://opensea.notion.site/opensea/Seaport-Order-Attributions-ec2d69bf455041a5baa490941aad307f).

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group
```tsx [index.tsx]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useSimulateContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom', // [!code focus]
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### gas

`bigint | undefined`

Gas provided for transaction execution.

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

---

### gasPrice

`bigint | undefined`

The price in wei to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms.html#legacy-transaction).

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas in wei, inclusive of [`maxPriorityFeePerGas`](#maxPriorityFeePerGas). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas in wei. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms.html#eip-1559-transaction).

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

---

### nonce

`number`

Unique number identifying this transaction.

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### type

`'legacy' | 'eip1559' | 'eip2930' | undefined`

Optional transaction request type to narrow parameters.

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### value

`bigint | undefined`

Value in wei sent with this transaction.

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { parseEther } from 'viem'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
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
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.ts]
import { useSimulateContract } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useSimulateContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseSimulateContractReturnType } from 'wagmi'
```

The return type's [`data`](#data) property is inferable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/query-result.md-->

## Type Inference

With [`abi`](#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](#functionname), [`args`](#args), and [`value`](#value). See the Wagmi [TypeScript docs](/react/typescript) for more information.

<!--@include: @shared/query-imports.md-->

## Action

- [`simulateContract`](/core/api/actions/simulateContract)
