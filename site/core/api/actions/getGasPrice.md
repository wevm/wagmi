<script setup>
const packageName = '@wagmi/core'
const actionName = 'getGasPrice'
const typeName = 'GetGasPrice'
</script>

# getGasPrice

Action for fetching the current price of gas (in wei).

## Import

```ts
import { getGasPrice } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getGasPrice } from '@wagmi/core'
import { config } from './config'

const gasPrice = await getGasPrice(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetGasPriceParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getGasPrice } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const gasPrice = await getGasPrice(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetGasPriceReturnType } from '@wagmi/core'
```

`bigint`

Current price of gas (in wei).

## Error

```ts
import { type GetGasPriceErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getGasPrice`](https://viem.sh/docs/actions/public/getGasPrice.html)
