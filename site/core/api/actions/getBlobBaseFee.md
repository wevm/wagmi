<script setup>
const packageName = '@wagmi/core'
const actionName = 'getBlobBaseFee'
const typeName = 'GetBlobBaseFee'
</script>

# getBlobBaseFee

Action for fetching the current blob base fee (in wei).

## Import

```ts
import { getBlobBaseFee } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getBlobBaseFee } from '@wagmi/core'
import { config } from './config'

const blobBaseFee = await getBlobBaseFee(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetBlobBaseFeeParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getBlobBaseFee } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const blobBaseFee = await getBlobBaseFee(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetBlobBaseFeeReturnType } from '@wagmi/core'
```

`bigint`

Current blob base fee (in wei).

## Error

```ts
import { type GetBlobBaseFeeErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getBlobBaseFee`](https://viem.sh/docs/actions/public/getBlobBaseFee)
