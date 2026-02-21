---
title: useReadContracts
description: Primitive for calling multiple read methods on a contract.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'readContracts'
const typeName = 'ReadContracts'
const TData = 'ReadContractsData'
const TError = 'ReadContractsErrorType'
</script>

# useReadContracts

Primitive for calling multiple read methods on a contract.

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

Whether or not the primitive should throw if a call reverts. If set to `true` (default), and a call reverts, then `useReadContracts` will fail silently and its error will be logged in the results array. Defaults to `true`.

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

<!--@include: @shared/query-imports.md-->

## Action

- [`readContracts`](/core/api/actions/readContracts)
