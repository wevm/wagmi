---
title: useReadContracts
description: Primitive for calling multiple read methods across contracts.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'readContracts'
const typeName = 'ReadContracts'
const TData = 'ReadContractsData'
const TError = 'ReadContractsErrorType'
</script>

# useReadContracts

Primitive for calling multiple read methods across contracts.

## Import

```ts
import { useReadContracts } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReadContracts } from '@wagmi/solid'

const wagmigotchiContract = {
  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  abi: wagmigotchiABI,
} as const
const mlootContract = {
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi: mlootABI,
} as const

function App() {
  const result = useReadContracts(() => ({
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
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

::: warning
`useReadContracts` uses the [`readContracts`](/core/api/actions/readContracts) action. If the multicall operation throws an error other than `ContractFunctionExecutionError`, `readContracts` retries each call with individual [`readContract`](https://viem.sh/docs/contract/readContract) calls. `ContractFunctionExecutionError` is thrown instead.
:::

## Parameters

```ts
import { useReadContracts } from '@wagmi/solid'

useReadContracts.Parameters
useReadContracts.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useReadContracts(() => ({
  contracts: [...],
  // other parameters...
}))
```

### contracts

`readonly Contract[]`

Set of contracts to call. Each contract includes `abi`, `address`, `functionName`, `args`, and optional `chainId`.

### allowFailure

`boolean`

Whether or not the query should fail if a call reverts. Defaults to `true`.

- When `true`, `data` contains `{ status: 'success', result }` or `{ status: 'failure', error, result: undefined }` for each call. Fallback reads run in parallel with `Promise.allSettled`.
- When `false`, `data` contains the results directly and the query fails if a call fails. Fallback reads run in parallel with `Promise.all`.

### batchSize

`number`

The maximum size (in bytes) for each calldata chunk. Set to `0` to disable the size limit. Defaults to `1024`.

### blockNumber

`number`

The block number to perform the read against.

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to read against.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### multicallAddress

`Address`

Address of multicall contract.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useReadContracts } from '@wagmi/solid'

useReadContracts.ReturnType
```

<!--@include: @shared/query-result.md-->

## Type Inference

With each contract ABI in [`contracts`](#contracts) setup correctly, TypeScript will infer the correct types for each contract's `functionName`, `args`, and the return type. See the Wagmi [TypeScript docs](/solid/typescript) for more information.

<!--@include: @shared/query-imports.md-->

## Action

- [`readContracts`](/core/api/actions/readContracts)
