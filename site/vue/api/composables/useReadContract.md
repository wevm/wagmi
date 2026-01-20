---
title: useReadContract
description: Composable for calling a read-only function on a contract, and returning the response.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'readContract'
const typeName = 'ReadContract'
const TData = 'ReadContractReturnType'
const TError = 'ReadContractErrorType'
</script>

# useReadContract

Composable for calling a **read-only** function on a contract, and returning the response.

A **read-only** function (constant function) on a Solidity contract is denoted by a pure or view keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.

## Import

```ts
import { useReadContract } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseReadContractParameters } from '@wagmi/vue'
```

### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/vue/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi' // [!code focus]

const result = useReadContract({
  abi, // [!code focus]
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

### account

`Account | undefined`

Account to use when calling the contract (`msg.sender`).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
  account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

### address

`Address | undefined`

The contract's address.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
  functionName: 'totalSupply',
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  args: ['0x6b175474e89094c44da98b954eedeac495271d0f'], // [!code focus]
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to call contract at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
  blockNumber: 17829139n, // [!code focus]
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to call contract at.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
  blockTag: 'safe', // [!code focus]
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
  chainId: mainnet.id, // [!code focus]
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'
import { config } from './config' // [!code focus]

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
  config, // [!code focus]
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf', // [!code focus]
  args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Composables that have identical context will share the same cache.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { abi } from './abi'

const result = useReadContract({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
  scopeKey: 'foo', // [!code focus]
})
</script>
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseReadContractReturnType } from '@wagmi/vue'
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/vue/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/query-result.md-->

## Type Inference

With [`abi`](#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](#functionname), [`args`](#args), and the return type. See the Wagmi [TypeScript docs](/vue/typescript) for more information.

::: code-group
```ts twoslash [Inline]
// @twoslash-cache: {"v":1,"hash":"c9cd30cf155368eb52dff62473381dfcdf7018daabaed2ca4c58019bdbc995a3","data":"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"}
import { createConfig, http, useReadContract } from '@wagmi/vue'
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
// @twoslash-cache: {"v":1,"hash":"b21638ef6d0df571da0457691c07531820bda58a8bf70cddee1ce9852f692ff4","data":"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"}
import { createConfig, http, useReadContract } from '@wagmi/vue'
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
