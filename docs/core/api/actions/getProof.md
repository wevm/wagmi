<script setup>
const packageName = '@wagmi/core'
const actionName = 'getProof'
const typeName = 'getProof'
</script>

# getProof

Action for return the account and storage values of the specified account including the Merkle-proof.

## Import

```ts
import { getProof } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getProof } from '@wagmi/core'
import { config } from './config'

await getProof(config, {
  address: '0x4200000000000000000000000000000000000016',
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetProofParameters } from '@wagmi/core'
```

### address

`Address`

The account address to get the proof for.

::: code-group
```ts [index.ts]
import { getProof } from '@wagmi/core'
import { config } from './config'

await getProof(config, {
  address: '0x4200000000000000000000000000000000000016', // [!code focus]
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### storageKeys

`` `0x${string}`[] ``

Array of storage-keys that should be proofed and included.

::: code-group
```ts [index.ts]
import { getProof } from '@wagmi/core'
import { config } from './config'

await getProof(config, {
  address: '0x4200000000000000000000000000000000000016',
  storageKeys: [ // [!code focus:3]
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

Proof at a given block number.

::: code-group
```ts [index.ts]
import { getProof } from '@wagmi/core'
import { config } from './config'

await getProof(config, {
  address: '0x4200000000000000000000000000000000000016',
  blockNumber: 42069n, // [!code focus]
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Proof at a given block tag.

::: code-group
```ts [index.ts]
import { getProof } from '@wagmi/core'
import { config } from './config'

await getProof(config, {
  address: '0x4200000000000000000000000000000000000016',
  blockTag: 'latest', // [!code focus]
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The ID of chain to get the proof for.

::: code-group
```ts [index.ts]
import { getProof } from '@wagmi/core'
import { config } from './config'
import { optimism } from '@wagmi/core/chains'

await getProof(config, {
  chainId: optimism.id, // [!code focus]
  address: '0x4200000000000000000000000000000000000016',
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetProofReturnType } from '@wagmi/core'
```

`Proof`

Proof data.

## Error

```ts
import { type GetProofErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getProof`](https://viem.sh/docs/actions/public/getProof.html)
