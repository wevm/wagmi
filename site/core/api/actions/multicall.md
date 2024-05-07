# multicall

Action for batching up multiple functions on a contract in a single RPC call via the [Multicall3 contract](https://github.com/mds1/multicall).

## Import

```ts
import { multicall } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { multicall } from '@wagmi/core'
import { config } from './config'

const wagmigotchiContract = {
  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  abi: wagmigotchiABI,
} as const
const mlootContract = {
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi: mlootABI,
} as const

const result = await multicall(config, {
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
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type MulticallParameters } from '@wagmi/core'
```

### contracts

`readonly Contract[]`

Set of contracts to call.

#### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
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
```
<<< @/snippets/react/config.ts[config.ts]
:::

#### address

`Address | undefined`

The contract's address.

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
  contracts: [
    {
      address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df', // [!code hl]
      abi: mlootABI,
      functionName: 'getChest',
      args: [69],
    },
    // ...
  ],
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

#### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
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
```
<<< @/snippets/react/config.ts[config.ts]
:::

#### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
  contracts: [
    {
      address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      abi: mlootABI,
      functionName: 'getChest',
      args: [69],
      chainId: 1, // [!code hl]
    },
    // ...
  ],
})
```
<<< @/snippets/react/config.ts[config.ts]
:::


#### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
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
```
<<< @/snippets/react/config.ts[config.ts]
:::

### allowFailure

`boolean`

Whether or not the Hook should throw if a call reverts. If set to `true` (default), and a call reverts, then `multicall` will fail silently and its error will be logged in the results array. Defaults to `true`.

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
  allowFailure: false, // [!code hl]
  contracts: [
    {
      address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      abi: mlootABI,
      functionName: 'getChest',
      args: [69],
    },
    // ...
  ],
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

### batchSize

`number`

The maximum size (in bytes) for each calldata chunk. Set to `0` to disable the size limit. Defaults to `1024`.

> Note: Some RPC Providers limit the amount of calldata (`data`) that can be sent in a single `eth_call` request. It is best to check with your RPC Provider to see if there are any calldata size limits to `eth_call` requests.

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
  batchSize: 1_024, // [!code hl]
  contracts: [
    {
      address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      abi: mlootABI,
      functionName: 'getChest',
      args: [69],
    },
    // ...
  ],
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`number`

The block number to perform the read against.

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
  blockNumber: 69420n, // [!code hl]
  contracts: [
    {
      address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      abi: mlootABI,
      functionName: 'getChest',
      args: [69],
    },
    // ...
  ],
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to read against.

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
  blockTag: 'safe', // [!code hl]
  contracts: [
    {
      address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      abi: mlootABI,
      functionName: 'getChest',
      args: [69],
    },
    // ...
  ],
})
```
<<< @/snippets/react/config.ts[config.ts]
:::

### multicallAddress

`Address`

Address of multicall contract.

::: code-group
```tsx [index.tsx]
import { multicall } from '@wagmi/core'
import { config } from './config'

const result = await multicall(config, {
  contracts: [
    {
      address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      abi: mlootABI,
      functionName: 'getChest',
      args: [69],
    },
    // ...
  ],
  multicallAddress: '0xca11bde05977b3631167028862be2a173976ca11', // [!code hl]
})
```
<<< @/snippets/react/config.ts[config.ts]
:::


## Return Type

```ts
import { type MulticallReturnType } from '@wagmi/core'
```

## Type Inference

With [`contracts[number]['abi']`](#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](#functionname), [`args`](#args), and the return type. See the Wagmi [TypeScript docs](/core/typescript) for more information.

## Error

```ts
import { type MulticallErrorType } from '@wagmi/core'
```

## Viem

- [`multicall`](https://viem.sh/docs/actions/public/multicall.html)
