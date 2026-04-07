---
title: useReadContract
description: Primitive for calling a read-only function on a contract, and returning the response.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'readContract'
const typeName = 'ReadContract'
const TData = 'ReadContractData'
const TError = 'ReadContractErrorType'
</script>

# useReadContract

Primitive for calling a **read-only** function on a contract, and returning the response.

A **read-only** function (constant function) on a Solidity contract is denoted by a pure or view keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.

## Import

```ts
import { useReadContract } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReadContract } from '@wagmi/solid'
import { abi } from './abi'

function App() {
  const result = useReadContract(() => ({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useReadContract } from '@wagmi/solid'

useReadContract.Parameters
useReadContract.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useReadContract(() => ({
  abi,
  address: '0x...',
  functionName: 'totalSupply',
  // other parameters...
}))
```

### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/solid/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

### address

`Address | undefined`

The contract's address.

### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

### blockNumber

`bigint | undefined`

Block number to call contract at.

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to call contract at.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

### scopeKey

`string | undefined`

Scopes the cache to a given context. Primitives that have identical context will share the same cache.

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useReadContract } from '@wagmi/solid'

useReadContract.ReturnType
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/solid/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`readContract`](/core/api/actions/readContract)
