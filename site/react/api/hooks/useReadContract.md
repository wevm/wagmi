---
title: useReadContract
description: Hook for calling a read-only function on a contract, and returning the response.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'readContract'
const typeName = 'ReadContract'
const TData = 'ReadContractReturnType'
const TError = 'ReadContractErrorType'
</script>

# useReadContract

Hook for calling a **read-only** function on a contract, and returning the response.

A **read-only** function (constant function) on a Solidity contract is denoted by a pure or view keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.

## Import

```ts
import { useReadContract } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseReadContractParameters } from 'wagmi'
```

### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi' // [!code focus]

function App() {
  const result = useReadContract({
    abi, // [!code focus]
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### account

`Account | undefined`

Account to use when calling the contract (`msg.sender`).

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### address

`Address | undefined`

The contract's address.

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
    functionName: 'totalSupply',
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'], // [!code focus]
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to call contract at.

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
    blockNumber: 17829139n, // [!code focus]
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to call contract at.

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
    blockTag: 'safe', // [!code focus]
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'
import { config } from './config' // [!code focus]

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
    config, // [!code focus]
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf', // [!code focus]
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { useReadContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseReadContractReturnType } from 'wagmi'
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/query-result.md-->

## Type Inference

With [`abi`](#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](#functionname), [`args`](#args), and the return type. See the Wagmi [TypeScript docs](/react/typescript) for more information.

::: code-group
```ts twoslash [Inline]
// @twoslash-cache: {"v":1,"hash":"8bfa3d1e805ee2d7a8b83c91b1e75f961b748f9d5c3b79a8bca9b7494b57cb8e","data":"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"}
import { createConfig, http, useReadContract } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
// ---cut---
const result = useReadContract({
  abi: [
    {
      type: 'function',
      name: 'balanceOf',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'totalSupply',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: 'supply', type: 'uint256' }],
    },
  ],
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  // ^?


  args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
  // ^?
})

result.data
//     ^?
```
```ts twoslash [Const-Asserted]
// @twoslash-cache: {"v":1,"hash":"9f8b59d36cf11dedf27c45ac2abd580ec38459b071c6641a3e4025c048f71072","data":"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"}
import { createConfig, http, useReadContract } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
// ---cut---
const abi = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'supply', type: 'uint256' }],
  },
] as const

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  // ^?


  args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
  // ^?
})

result.data
//     ^?
```
:::

<!--@include: @shared/query-imports.md-->

## Action

- [`readContract`](/core/api/actions/readContract)
