<script setup>
const packageName = '@wagmi/core'
const actionName = 'readContract'
const typeName = 'ReadContract'
</script>

# readContract

Action for calling a **read-only** function on a contract, and returning the response.

A **read-only** function (constant function) on a Solidity contract is denoted by a pure or view keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.

## Import

```ts
import { readContract } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await readContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type ReadContractParameters } from '@wagmi/core'
```

### abi

`Abi`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { abi } from './abi' // [!code focus]
import { config } from './config'

const result = await readContract(config, {
  abi, // [!code focus]
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### account

`Account | undefined`

Account to use when calling the contract (`msg.sender`).

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await readContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
  account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### address

`Address`

The contract's address.

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await readContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
  functionName: 'totalSupply',
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await readContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'], // [!code focus]
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to call contract at.

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await readContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
  blockNumber: 17829139n, // [!code focus]
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to call contract at.

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await readContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
  blockTag: 'safe', // [!code focus]
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { abi } from './abi'
import { config } from './config'

const result = await readContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'totalSupply',
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### functionName

`string`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await readContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf', // [!code focus]
  args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
})
```
<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type ReadContractReturnType } from '@wagmi/core'
```

`unknown`

- Result of contract read-only function.
- Inferred from [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args).

## Type Inference

With [`abi`](#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](#functionname), [`args`](#args), and the return type. See the Wagmi [TypeScript docs](/core/typescript) for more information.

## Error

```ts
import { type ReadContractErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`readContract`](https://viem.sh/docs/contract/readContract)
