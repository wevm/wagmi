<script setup>
const packageName = '@wagmi/core'
const actionName = 'getFeeData'
const typeName = 'GetFeeData'
</script>

# getFeeData

Action for fetching current network fee info.

## Import

```ts
import { getFeeData } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getFeeData } from '@wagmi/core'
import { config } from './config'

const feeData = getFeeData(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetFeeDataParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getFeeData } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const feeData = await getFeeData(config, {
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
import { getFeeData } from '@wagmi/core'
import { config } from './config'

const feeData = getFeeData(config, {
  formatUnits: 'ether', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetFeeDataReturnType } from '@wagmi/core'
```

### formatted

`{ gasPrice: string | null; maxFeePerGas: string | null; maxPriorityFeePerGas: string | null; }`

Object of formatted values using [`formatUnits`](#formatUnits).

### gasPrice

`bigint | null`

Gas price.

### lastBaseFeePerGas

`bigint | null`

Last base fee per gas.

### maxFeePerGas

`bigint | null`

Max fee per gas.

### maxPriorityFeePerGas

`bigint | null`

Max priority fee per gas.

## Error

```ts
import { type GetFeeDataError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getBlock`](https://viem.sh/docs/actions/public/getBlock.html) for base fee
- [`getGasPrice`](https://viem.sh/docs/actions/public/getGasPrice.html) for gas price
