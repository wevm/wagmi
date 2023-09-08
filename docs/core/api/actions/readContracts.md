<script setup>
const packageName = '@wagmi/core'
const actionName = 'readContracts'
const typeName = 'ReadContracts'
</script>

# readContracts

Action for calling multiple read methods on a contract.

## Import

```ts
import { readContracts } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { readContracts } from '@wagmi/core'
import { config } from './config'
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type ReadContractsParameters } from '@wagmi/core'
```

## Return Type

```ts
import { type ReadContractsReturnType } from '@wagmi/core'
```

## Type Inference

## Error

```ts
import { type ReadContractsError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`multicall`](https://viem.sh/docs/actions/public/multicall.html) when supported by current chain.
- [`readContract`](https://viem.sh/docs/contract/readContract.html) when multicall is not supported.
