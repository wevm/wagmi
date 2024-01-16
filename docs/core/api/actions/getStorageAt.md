<script setup>
const packageName = '@wagmi/core'
const actionName = 'getStorageAt'
const typeName = 'getStorageAt'
</script>

# getStorageAt

Action for returning the value from a storage slot at a given address.

## Import

```ts
import { getStorageAt } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getStorageAt } from '@wagmi/core'
import { config } from './config'

await getStorageAt(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  slot: '0x0',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetStorageAtParameters } from '@wagmi/core'
```

### address

`Address`

The contract address.

::: code-group
```ts [index.ts]
import { getStorageAt } from '@wagmi/core'
import { config } from './config'

await getStorageAt(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  slot: '0x0',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### slot

`Hex`

The storage position (as a hex encoded value).

::: code-group
```ts [index.ts]
import { getStorageAt } from '@wagmi/core'
import { config } from './config'

await getStorageAt(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  slot: '0x0', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

The block number to check the storage at.

::: code-group
```ts [index.ts]
import { getStorageAt } from '@wagmi/core'
import { config } from './config'

await getStorageAt(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  blockNumber: 16280770n, // [!code focus]
  slot: '0x0',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

The block tag to check the storage at.

::: code-group
```ts [index.ts]
import { getStorageAt } from '@wagmi/core'
import { config } from './config'

await getStorageAt(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  blockTag: 'safe', // [!code focus]
  slot: '0x0',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The chain ID to check the storage at.

::: code-group
```ts [index.ts]
import { getStorageAt } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

await getStorageAt(config, {
  chainId: mainnet.id, // [!code focus]
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  slot: '0x0',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetStorageAtReturnType } from '@wagmi/core'
```

`Hex`

The value of the storage slot.

## Error

```ts
import { type GetStorageAtErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getStorageAt`](https://viem.sh/docs/contract/getStorageAt)
