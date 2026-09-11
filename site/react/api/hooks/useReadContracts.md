---
title: useReadContracts
description: Hook for calling multiple read methods across contracts.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'readContracts'
const typeName = 'ReadContracts'
const TData = 'ReadContractsReturnType'
const TError = 'ReadContractsErrorType'
</script>

# useReadContracts

Hook for calling multiple read methods across contracts.

## Import

```ts
import { useReadContracts } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

const wagmigotchiContract = {
  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  abi: wagmigotchiABI,
} as const
const mlootContract = {
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi: mlootABI,
} as const

function App() {
  const result = useReadContracts({
    contracts: [
      {
        ...wagmigotchiContract,
        functionName: 'getAlive',
      },
      {
        ...wagmigotchiContract,
        functionName: 'getBoredom',
      },
      {
        ...mlootContract,
        functionName: 'getChest',
        args: [69],
      },
      {
        ...mlootContract,
        functionName: 'getWaist',
        args: [69],
      },
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

::: warning
`useReadContracts` uses the [`readContracts`](/core/api/actions/readContracts) action. If the multicall operation throws an error other than `ContractFunctionExecutionError`, `readContracts` retries each call with individual [`readContract`](https://viem.sh/docs/contract/readContract) calls. `ContractFunctionExecutionError` is thrown instead.
:::

## Parameters

```ts
import { type UseReadContractsParameters } from 'wagmi'
```

### contracts

`readonly Contract[]`

Set of contracts to call.

#### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI, // [!code hl]
        functionName: 'getChest',
        args: [69],
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

#### address

`Address | undefined`

The contract's address.

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',  // [!code hl]
        abi: mlootABI,
        functionName: 'getChest',
        args: [69],
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

#### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest', // [!code hl]
        args: [69],
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

#### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest',
        args: [69], // [!code hl]
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

#### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest',
        args: [69],
        chainId: 1  // [!code hl]
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::


### allowFailure

`boolean`

Whether or not the query should fail if a call reverts. Defaults to `true`.

- When `true`, `data` contains `{ status: 'success', result }` or `{ status: 'failure', error, result: undefined }` for each call. Fallback reads run in parallel with `Promise.allSettled`.
- When `false`, `data` contains the results directly and the query fails if a call fails. Fallback reads run in parallel with `Promise.all`.

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    allowFailure: false, // [!code hl]
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest',
        args: [69]
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::


### batchSize

`number`

The maximum size (in bytes) for each calldata chunk. Set to `0` to disable the size limit. Defaults to `1024`.

> Note: Some RPC Providers limit the amount of calldata (`data`) that can be sent in a single `eth_call` request. It is best to check with your RPC Provider to see if there are any calldata size limits to `eth_call` requests.

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    batchSize: 1024, // [!code hl]
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest',
        args: [69]
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`number`

The block number to perform the read against.

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    blockNumber: 69420n, // [!code hl]
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest',
        args: [69]
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to read against.

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    blockTag: 'safe', // [!code hl]
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest',
        args: [69]
      },
      // ...
    ],
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
import { useReadContracts } from 'wagmi'
import { config } from './config'

function App() {
  const result = useReadContracts({
    config, // [!code hl]
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest',
        args: [69]
      },
      // ...
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### multicallAddress

`Address`

Address of multicall contract.

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts({
    contracts: [
      {
        address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        abi: mlootABI,
        functionName: 'getChest',
        args: [69]
      },
      // ...
    ],
    multicallAddress: '0xca11bde05977b3631167028862be2a173976ca11', // [!code hl]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseReadContractsReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`readContracts`](/core/api/actions/readContracts)
