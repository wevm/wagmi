<script setup>
const packageName = '@wagmi/core'
const actionName = 'estimateMaxPriorityFeePerGas'
const typeName = 'EstimateFeesPerGas'
</script>

# estimateMaxPriorityFeePerGas

Returns an estimate for the max priority fee per gas (in wei) for a transaction to be likely included in the next block.

## Import

```ts
import { estimateMaxPriorityFeePerGas } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { estimateMaxPriorityFeePerGas } from '@wagmi/core'
import { config } from './config'

const result = await estimateMaxPriorityFeePerGas(config)
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
import { estimateMaxPriorityFeePerGas } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const result = await estimateMaxPriorityFeePerGas(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type EstimateFeesPerGasReturnType } from '@wagmi/core'
```

`bigint`

An estimate (in wei) for the max priority fee per gas.

## Error

```ts
import { type EstimateFeesPerGasErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`estimateMaxPriorityFeePerGas`](https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas.html)
