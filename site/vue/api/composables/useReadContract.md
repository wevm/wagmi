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
