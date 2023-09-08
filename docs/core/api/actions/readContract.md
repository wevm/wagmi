<script setup>
const packageName = '@wagmi/core'
const actionName = 'readContract'
const typeName = 'ReadContract'
</script>

# readContract

Action for calling read-only contract functions.

## Import

```ts
import { readContract } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { readContract } from '@wagmi/core'
import { config } from './config'
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type ReadContractParameters } from '@wagmi/core'
```

## Return Type

```ts
import { type ReadContractReturnType } from '@wagmi/core'
```

## Type Inference

## Error

```ts
import { type ReadContractError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

[`readContract`](https://viem.sh/docs/contract/readContract.html)
