<script setup>
const packageName = '@wagmi/core'
const actionName = 'estimateFeesPerGas'
const typeName = 'EstimateFeesPerGas'
</script>

# estimateFeesPerGas

Returns an estimate for the fees per gas (in wei) for a transaction to be likely included in the next block.

## Import

```ts
import { estimateFeesPerGas } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { estimateFeesPerGas } from '@wagmi/core'
import { config } from './config'

const {
  maxFeePerGas,
  maxPriorityFeePerGas
} = await estimateFeesPerGas(config)
/**
 * {
 *   maxFeePerGas: 15_000_000_000n,
 *   maxPriorityFeePerGas: 1_000_000_000n,
 * }
 */

const { gasPrice } = await estimateFeesPerGas(config, {
  type: 'legacy'
})
/** 
 * { gasPrice: 15_000_000_000n } 
 */
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type EstimateFeesPerGasParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { estimateFeesPerGas } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const feesPerGas = await estimateFeesPerGas(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### formatUnits

`'ether' | 'gwei' | 'wei' | number | undefined`

- Units to use when formatting result.
- Defaults to `'ether'`.

::: code-group
```ts [index.ts]
import { estimateFeesPerGas } from '@wagmi/core'
import { config } from './config'

const feesPerGas = estimateFeesPerGas(config, {
  formatUnits: 'ether', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### type

`"legacy" | "eip1559"`

- Defaults to `"eip1559"`

::: code-group
```ts [index.ts]
import { estimateFeesPerGas } from '@wagmi/core'
import { config } from './config'

const feesPerGas = estimateFeesPerGas(config, {
  type: 'legacy', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type EstimateFeesPerGasReturnType } from '@wagmi/core'
```

### formatted

`{ gasPrice: string | undefined; maxFeePerGas: string | undefined; maxPriorityFeePerGas: string | undefined; }`

Object of formatted values using [`formatUnits`](#formatunits).

### gasPrice

`bigint | undefined`

> Value is `undefined` if [`type`](#type) is `"eip1559"`.

Gas price.

### maxFeePerGas

`bigint | undefined`

> Value is `undefined` if [`type`](#type) is `"legacy"`.

Max fee per gas.

### maxPriorityFeePerGas

`bigint | undefined`

> Value is `undefined` if [`type`](#type) is `"legacy"`.

Max priority fee per gas.

## Error

```ts
import { type EstimateFeesPerGasError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

[`estimateFeesPerGas`](https://viem.sh/docs/actions/public/estimateFeesPerGas.html)
