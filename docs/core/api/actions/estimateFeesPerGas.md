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

const result = await estimateFeesPerGas(config)
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

const result = await estimateFeesPerGas(config, {
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

`'legacy' | 'eip1559'`

- Fee value type.
- Defaults to `'eip1559'`

::: code-group
```ts [index.ts]
import { estimateFeesPerGas } from '@wagmi/core'
import { config } from './config'

const result = estimateFeesPerGas(config, {
  type: 'legacy', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type EstimateFeesPerGasReturnType } from '@wagmi/core'
```

[`FeeValues`](https://viem.sh/docs/glossary/types.html#feevalues)

An estimate (in wei) for the fees per gas.

### formatted
 
`{ gasPrice: string | undefined; maxFeePerGas: string | undefined; maxPriorityFeePerGas: string | undefined; }`

Object of formatted values using [`formatUnits`](#formatunits).

### gasPrice

`bigint | undefined`

- Gas price.
- When [`type`](#type) is `'eip1559'`, value is `undefined`.

### maxFeePerGas

`bigint | undefined`

- Max fee per gas.
- When [`type`](#type) is `'legacy'`, value is `undefined`.

### maxPriorityFeePerGas

`bigint | undefined`

- Max priority fee per gas.
- When [`type`](#type) is `'legacy'`, value is `undefined`.

## Error

```ts
import { type EstimateFeesPerGasErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`estimateFeesPerGas`](https://viem.sh/docs/actions/public/estimateFeesPerGas.html)
