<script setup>
const packageName = '@wagmi/core'
const actionName = 'getBytecode'
const typeName = 'getBytecode'
</script>

# getBytecode

Action for retrieving the bytecode at an address.

## Import

```ts
import { getBytecode } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getBytecode } from '@wagmi/core'
import { config } from './config'

await getBytecode(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetBytecodeParameters } from '@wagmi/core'
```

### address

`Address`

The contract address.

::: code-group
```ts [index.ts]
import { getBytecode } from '@wagmi/core'
import { config } from './config'

await getBytecode(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

The block number to check the bytecode at.

::: code-group
```ts [index.ts]
import { getBytecode } from '@wagmi/core'
import { config } from './config'

await getBytecode(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  blockNumber: 16280770n, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

The block tag to check the bytecode at.

::: code-group
```ts [index.ts]
import { getBytecode } from '@wagmi/core'
import { config } from './config'

await getBytecode(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  blockTag: 'safe', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The chain ID to check the bytecode at.

::: code-group
```ts [index.ts]
import { getBytecode } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

await getBytecode(config, {
  chainId: mainnet.id, // [!code focus]
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetBytecodeReturnType } from '@wagmi/core'
```

`Hex`

The contract's bytecode.

## Error

```ts
import { type GetBytecodeErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getCode`](https://viem.sh/docs/contract/getCode)
